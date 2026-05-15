const fs =
  require("fs");

const pdfParse =
  require("pdf-parse");

const mammoth =
  require("mammoth");

const Candidate =
  require(
    "../models/Candidate"
  );

const {
  parseResumeWithAI,
} = require(
  "../services/aiService"
);

const {
  generateEmbedding,
} = require(
  "../services/embeddingService"
);

// ================= EXTRACT TEXT =================

const extractText =
  async (
    filePath,
    mimetype
  ) => {

    // ================= PDF =================

    if (
      mimetype ===
      "application/pdf"
    ) {

      const dataBuffer =
        fs.readFileSync(
          filePath
        );

      const data =
        await pdfParse(
          dataBuffer
        );

      return data.text;
    }

    // ================= DOCX =================

    if (
      mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {

      const result =
        await mammoth.extractRawText({

          path:
            filePath,
        });

      return result.value;
    }

    return "";
  };

// ================= FALLBACK PARSER =================

const fallbackParser =
  (text) => {

    const email =
      text.match(
        /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
      );

    const phone =
      text.match(
        /\b\d{10}\b/
      );

    return {

      name:
        text.split("\n")[0] ||
        "Unknown",

      email:
        email
          ? email[0]
          : "Not found",

      phone:
        phone
          ? phone[0]
          : "Not found",

      skills: [],

      experience: 0,

      education: [],

      projects: [],
    };
  };

// ================= SEARCHABLE TEXT =================

const buildSearchableText =
  ({
    name,
    skills,
    projects,
    education,
    experience,
  }) => {

    return `

${name}

${skills.join(" ")}

${projects.join(" ")}

${education.join(" ")}

${experience}
years experience

`;
  };

// ================= UPLOAD RESUME =================

exports.uploadResume =
  async (req, res) => {

    try {

      // ================= FILE VALIDATION =================

      if (!req.file) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "No file uploaded",
          });
      }

      // ================= FILE TYPE =================

      if (
        req.file.mimetype !==
        "application/pdf"
      ) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "Only PDF files are allowed",
          });
      }

      // ================= FILE SIZE =================

      const MAX_FILE_SIZE =
        5 * 1024 * 1024;

      if (
        req.file.size >
        MAX_FILE_SIZE
      ) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "File size should not exceed 5MB",
          });
      }

      const filePath =
        req.file.path;

      // ================= EXTRACT TEXT =================

      const text =
        await extractText(

          filePath,

          req.file.mimetype
        );

      if (!text) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "Could not extract text",
          });
      }

      // ================= AI PARSING =================

      let parsedData =
        null;

      try {

        parsedData =
          await parseResumeWithAI(
            text
          );

      } catch (err) {

        console.log(
          "AI parsing failed. Using fallback parser."
        );
      }

      // ================= FALLBACK =================

      if (!parsedData) {

        parsedData =
          fallbackParser(
            text
          );
      }

      // ================= SAFE DEFAULTS =================

      parsedData.name =
        parsedData.name ||
        "Unknown";

      parsedData.email =
        parsedData.email ||
        "Not found";

      parsedData.phone =
        parsedData.phone ||
        "Not found";

      parsedData.skills =
        parsedData.skills ||
        [];

      parsedData.experience =
        parsedData.experience ||
        0;

      parsedData.education =
        parsedData.education ||
        [];

      parsedData.projects =
        parsedData.projects ||
        [];

      // ================= SEARCHABLE TEXT =================

      const searchableText =
        buildSearchableText({

          name:
            parsedData.name,

          skills:
            parsedData.skills,

          projects:
            parsedData.projects,

          education:
            parsedData.education,

          experience:
            parsedData.experience,
        });

      // ================= EMBEDDING =================

      const embedding =
        await generateEmbedding(
          searchableText
        );

      // ================= SAVE CANDIDATE =================

      const candidate =
        await Candidate.create({

          name:
            parsedData.name,

          email:
            parsedData.email,

          phone:
            parsedData.phone,

          skills:
            parsedData.skills,

          experience:
            parsedData.experience,

          education:
            parsedData.education,

          projects:
            parsedData.projects,

          resumeUrl:
            filePath,

          embedding,

          source:
            "ai",

          organizationId:
            req.user.organizationId,
        });

      // ================= RESPONSE =================

      res.status(201).json({

        success: true,

        msg:
          "Resume uploaded & parsed successfully",

        candidate,
      });

    } catch (error) {

      console.error(
        "UPLOAD RESUME ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        msg:
          "Server error",
      });
    }
  };

// ================= MANUAL ADD =================

exports.addCandidateManual =
  async (req, res) => {

    try {

      const {

        name,

        email,

        phone,

        skills,

        experience,

        education,

        projects,
      } = req.body;

      // ================= VALIDATION =================

      if (

        !name ||

        !email ||

        !phone ||

        !skills ||

        experience ===
          undefined

      ) {

        return res
          .status(400)
          .json({

            success: false,

            msg:
              "name, email, phone, skills, experience are required",
          });
      }

      // ================= SEARCHABLE TEXT =================

      const searchableText =
        buildSearchableText({

          name,

          skills,

          projects:
            projects || [],

          education:
            education || [],

          experience,
        });

      // ================= EMBEDDING =================

      const embedding =
        await generateEmbedding(
          searchableText
        );

      // ================= SAVE =================

      const candidate =
        await Candidate.create({

          name,

          email,

          phone,

          skills,

          experience,

          education:
            education || [],

          projects:
            projects || [],

          embedding,

          source:
            "manual",

          organizationId:
            req.user.organizationId,
        });

      // ================= RESPONSE =================

      res.status(201).json({

        success: true,

        msg:
          "Candidate added manually",

        candidate,
      });

    } catch (error) {

      console.error(
        "MANUAL ADD ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        msg:
          "Server error",
      });
    }
  };

// ================= SEARCH CANDIDATES =================

exports.searchCandidates =
  async (req, res) => {

    try {

      const { skill } =
        req.query;

      let query = {

        organizationId:
          req.user.organizationId,
      };

      // ================= SKILL FILTER =================

      if (skill) {

        query.skills = {

          $regex: skill,

          $options: "i",
        };
      }

      const candidates =
        await Candidate.find(
          query
        ).sort({

          createdAt: -1,
        });

      res.status(200).json(
        candidates
      );

    } catch (err) {

      console.error(
        "SEARCH ERROR:",
        err
      );

      res.status(500).json({

        success: false,

        msg:
          "Search failed",
      });
    }
  };

// ================= GET CANDIDATES =================

exports.getCandidates =
  async (req, res) => {

    try {

      const candidates =
        await Candidate.find({

          organizationId:
            req.user.organizationId,
        }).sort({

          createdAt: -1,
        });

      res
        .status(200)
        .json(
          candidates
        );

    } catch (err) {

      console.error(
        "GET CANDIDATES ERROR:",
        err
      );

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch candidates",
      });
    }
  };

// ================= TOGGLE BOOKMARK =================

exports.toggleBookmark =
  async (req, res) => {

    try {

      const candidate =
        await Candidate.findOne({

          _id:
            req.params.id,

          organizationId:
            req.user.organizationId,
        });

      // ================= NOT FOUND =================

      if (!candidate) {

        return res
          .status(404)
          .json({

            success: false,

            msg:
              "Candidate not found",
          });
      }

      // ================= TOGGLE =================

      candidate.isBookmarked =
        !candidate.isBookmarked;

      await candidate.save();

      // ================= RESPONSE =================

      res.status(200).json({

        success: true,

        isBookmarked:
          candidate.isBookmarked,

        candidate,
      });

    } catch (error) {

      console.error(
        "BOOKMARK ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        msg:
          "Bookmark update failed",
      });
    }
  };