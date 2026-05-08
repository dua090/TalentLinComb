const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const Candidate = require("../models/Candidate");
const { parseResumeWithAI } = require("../services/aiService");

const FILE_CLEANUP_DELAY_MS = 100;

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

const extractTextFromDOCX = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

const extractTextFromFile = async (filePath, mimetype) => {
  const isPDF = mimetype === "application/pdf";
  if (isPDF) {
    return await extractTextFromPDF(filePath);
  }

  const isDOCX = mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (isDOCX) {
    return await extractTextFromDOCX(filePath);
  }

  return "";
};

const fallbackParser = (text) => {
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phoneRegex = /\b\d{10}\b/;
  
  const email = text.match(emailRegex);
  const phone = text.match(phoneRegex);

  return {
    name: text.split("\n")[0] || "Unknown",
    email: email ? email[0] : "Not found",
    phone: phone ? phone[0] : "Not found",
    skills: [],
    experience: 0,
    education: [],
    projects: [],
  };
};

const normalizeParsedData = (data) => ({
  name: data.name || "Unknown",
  email: data.email || "Not found",
  phone: data.phone || "Not found",
  skills: data.skills || [],
  experience: data.experience || 0,
  education: data.education || [],
  projects: data.projects || [],
});

const cleanupFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`File cleanup failed for ${filePath}:`, error);
  }
};

const validateManualCandidate = (data) => {
  const required = ["name", "email", "phone", "skills"];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    return { valid: false, missing };
  }
  
  if (data.experience === undefined) {
    return { valid: false, missing: ["experience"] };
  }
  
  return { valid: true };
};

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const filePath = req.file.path;
    const extractedText = await extractTextFromFile(filePath, req.file.mimetype);

    if (!extractedText) {
      cleanupFile(filePath);
      return res.status(400).json({ msg: "Could not extract text" });
    }

    let parsedData = null;
    
    try {
      parsedData = await parseResumeWithAI(extractedText);
    } catch (err) {
      console.log("AI parsing failed, using fallback parser");
    }

    if (!parsedData) {
      parsedData = fallbackParser(extractedText);
    }

    const normalizedData = normalizeParsedData(parsedData);

    const candidate = await Candidate.create({
      ...normalizedData,
      resumeUrl: filePath,
      source: "ai",
    });

    setTimeout(() => cleanupFile(filePath), FILE_CLEANUP_DELAY_MS);

    res.status(201).json({
      success: true,
      msg: "Resume uploaded & parsed successfully",
      candidate,
    });
  } catch (error) {
    console.error("Upload resume error:", error);
    
    if (req.file && req.file.path) {
      cleanupFile(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

exports.addCandidateManual = async (req, res) => {
  try {
    const { name, email, phone, skills, experience, education, projects } = req.body;
    
    const validation = validateManualCandidate({ name, email, phone, skills, experience });
    
    if (!validation.valid) {
      return res.status(400).json({
        msg: `${validation.missing.join(", ")} are required`,
      });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      skills,
      experience,
      education: education || [],
      projects: projects || [],
      source: "manual",
    });

    res.status(201).json({
      msg: "Candidate added manually",
      candidate,
    });
  } catch (error) {
    console.error("Add manual candidate error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.searchCandidates = async (req, res) => {
  try {
    const { skill } = req.query;
    const query = skill ? { skills: { $regex: skill, $options: "i" } } : {};
    
    const candidates = await Candidate.find(query);
    res.json(candidates);
  } catch (error) {
    console.error("Search candidates error:", error);
    res.status(500).json({ msg: "Search error" });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Get candidates error:", error);
    res.status(500).json({ message: "Failed to fetch candidates" });
  }
};