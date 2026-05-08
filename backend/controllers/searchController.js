const Candidate = require("../models/Candidate");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const DOMAIN_SKILLS = {
  frontend: [
    "React", "React.js", "Next.js", "Vue", "Vue.js", "Angular",
    "JavaScript", "TypeScript", "HTML", "CSS", "SCSS", "Bootstrap",
    "Tailwind CSS", "Redux", "Redux Toolkit", "Material UI",
    "UI/UX", "Figma", "Responsive Design",
  ],
  backend: [
    "Node.js", "Node", "Express", "Express.js", "Java", "Spring Boot",
    "Python", "Django", "Flask", "PHP", "Laravel", "REST APIs",
    "GraphQL", "MongoDB", "MySQL", "PostgreSQL", "SQL", "Firebase",
    "Redis", "API Development", "Microservices",
  ],
  cloud: [
    "AWS", "Azure", "Google Cloud", "GCP", "Docker", "Kubernetes",
    "CI/CD", "Jenkins", "Terraform", "Linux", "Nginx", "DevOps",
    "Cloud Computing", "Serverless",
  ],
  ai_ml: [
    "Machine Learning", "Deep Learning", "Artificial Intelligence",
    "TensorFlow", "PyTorch", "NLP", "Computer Vision", "LLM",
    "OpenAI", "LangChain", "Generative AI", "Data Science",
    "Data Analysis", "Pandas", "NumPy", "Scikit-learn", "AI",
  ],
};

const WEIGHTS = {
  SKILL: 0.5,
  EXPERIENCE: 0.2,
  DOMAIN: 0.15,
  PROJECT: 0.15,
};

const generateSearchQuery = async (prompt) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  const result = await model.generateContent(`
You are an AI recruiter assistant.

Extract structured data from the query below.

Rules:
- Always return JSON
- Skills must be array
- If experience not mentioned → null

Query: "${prompt}"

Return:
{
  "skills": ["React"],
  "experience": 2
}
`);

  const text = result.response.text();
  const match = text.match(/\{[\s\S]*\}/);
  
  if (!match) {
    throw new Error("Invalid AI response format");
  }

  return JSON.parse(match[0]);
};

const buildMongoQuery = (parsed) => {
  const query = {};

  if (parsed.skills?.length) {
    query.$or = parsed.skills.map((skill) => ({
      skills: { $regex: skill, $options: "i" },
    }));
  }

  if (parsed.experience !== null && parsed.experience !== undefined && !isNaN(parsed.experience)) {
    query.experience = { $gte: Number(parsed.experience) };
  }

  return query;
};

const calculateSkillScore = (requiredSkills, candidateSkills) => {
  if (!requiredSkills?.length) return 1;

  const matchedSkills = requiredSkills.filter((requiredSkill) =>
    candidateSkills.some((candidateSkill) =>
      candidateSkill.toLowerCase().includes(requiredSkill.toLowerCase())
    )
  );

  return matchedSkills.length / requiredSkills.length;
};

const calculateExperienceScore = (requiredExperience, candidateExperience) => {
  if (requiredExperience === null || requiredExperience === undefined || isNaN(requiredExperience)) {
    return 1;
  }

  const difference = requiredExperience - candidateExperience;

  if (difference <= 0) return 1;
  if (difference === 1) return 0.7;
  if (difference === 2) return 0.5;
  return 0.2;
};

const detectCandidateDomain = (skills) => {
  const domainChecks = {
    frontend: (skill) => DOMAIN_SKILLS.frontend.includes(skill),
    backend: (skill) => DOMAIN_SKILLS.backend.includes(skill),
    cloud: (skill) => DOMAIN_SKILLS.cloud.includes(skill),
    ai_ml: (skill) => DOMAIN_SKILLS.ai_ml.includes(skill),
  };

  for (const [domain, checkFn] of Object.entries(domainChecks)) {
    if (skills.some(checkFn)) {
      return domain;
    }
  }
  return null;
};

const calculateDomainScore = (requiredSkills, candidateSkills) => {
  if (!requiredSkills?.length) return 0.5;

  const requiredDomain = (() => {
    if (requiredSkills.some(skill => DOMAIN_SKILLS.frontend.includes(skill))) return "frontend";
    if (requiredSkills.some(skill => DOMAIN_SKILLS.backend.includes(skill))) return "backend";
    if (requiredSkills.some(skill => DOMAIN_SKILLS.cloud.includes(skill))) return "cloud";
    if (requiredSkills.some(skill => DOMAIN_SKILLS.ai_ml.includes(skill))) return "ai_ml";
    return null;
  })();

  if (!requiredDomain) return 0.5;

  const candidateDomain = detectCandidateDomain(candidateSkills);
  return candidateDomain === requiredDomain ? 1 : 0.5;
};

const calculateProjectScore = (requiredSkills, candidateProjects) => {
  if (!requiredSkills?.length || !candidateProjects?.length) return 0.5;

  const projectText = candidateProjects.join(" ").toLowerCase();
  const matchedProjects = requiredSkills.filter((skill) =>
    projectText.includes(skill.toLowerCase())
  ).length;

  return matchedProjects / requiredSkills.length;
};

const calculateMatchScore = (candidate, parsed) => {
  const candidateSkills = candidate.skills || [];

  const skillScore = calculateSkillScore(parsed.skills, candidateSkills);
  const experienceScore = calculateExperienceScore(parsed.experience, candidate.experience);
  const domainScore = calculateDomainScore(parsed.skills, candidateSkills);
  const projectScore = calculateProjectScore(parsed.skills, candidate.projects);

  const totalScore = (
    skillScore * WEIGHTS.SKILL +
    experienceScore * WEIGHTS.EXPERIENCE +
    domainScore * WEIGHTS.DOMAIN +
    projectScore * WEIGHTS.PROJECT
  ) * 100;

  return Math.round(totalScore);
};

const scoreCandidates = (candidates, parsed) => {
  return candidates
    .map((candidate) => ({
      ...candidate.toObject(),
      matchPercentage: calculateMatchScore(candidate, parsed),
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
};

exports.smartSearch = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ msg: "Prompt is required" });
    }

    const parsed = await generateSearchQuery(prompt);
    console.log("AI parsed:", parsed);

    const query = buildMongoQuery(parsed);
    const candidates = await Candidate.find(query);

    const scoredCandidates = scoreCandidates(candidates, parsed);

    res.json({
      success: true,
      parsed,
      count: scoredCandidates.length,
      candidates: scoredCandidates,
    });
  } catch (error) {
    console.error("Smart search error:", error.message);
    
    res.status(500).json({
      success: false,
      msg: "AI Search failed",
      error: error.message,
    });
  }
};