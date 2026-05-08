const Candidate = require("../models/Candidate");

const DOMAIN_SKILLS_MAP = {
  Frontend: [
    "React",
    "React.js",
    "Next.js",
    "Vue",
    "Vue.js",
    "Angular",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "SCSS",
    "Bootstrap",
    "Tailwind CSS",
    "Redux",
    "Redux Toolkit",
    "Material UI",
    "UI/UX",
    "Figma",
    "Responsive Design",
  ],
  Backend: [
    "Node.js",
    "Node",
    "Express",
    "Express.js",
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "Flask",
    "PHP",
    "Laravel",
    "REST APIs",
    "GraphQL",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "SQL",
    "Firebase",
    "Redis",
    "API Development",
    "Microservices",
  ],
  Cloud: [
    "AWS",
    "Azure",
    "Google Cloud",
    "GCP",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Jenkins",
    "Terraform",
    "Linux",
    "Nginx",
    "DevOps",
    "Cloud Computing",
    "Serverless",
  ],
  AI_ML: [
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "TensorFlow",
    "PyTorch",
    "NLP",
    "Computer Vision",
    "LLM",
    "OpenAI",
    "LangChain",
    "Generative AI",
    "Data Science",
    "Data Analysis",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "AI",
  ],
};

const calculateTotalProfiles = (candidates) => candidates.length;

const calculateAverageExperience = (candidates, totalProfiles) => {
  const totalExperience = candidates.reduce(
    (sum, candidate) => sum + (candidate.experience || 0),
    0
  );

  return totalProfiles > 0 ? Number((totalExperience / totalProfiles).toFixed(1)) : 0;
};

const findMostPopularSkill = (candidates) => {
  const skillFrequency = {};

  candidates.forEach((candidate) => {
    candidate.skills?.forEach((skill) => {
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
    });
  });

  const sortedSkills = Object.entries(skillFrequency).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedSkills.length > 0 ? sortedSkills[0][0] : "N/A";
};

const findTopHiringDomain = (candidates) => {
  const domainCounts = {
    Frontend: 0,
    Backend: 0,
    Cloud: 0,
    AI_ML: 0,
  };

  candidates.forEach((candidate) => {
    candidate.skills?.forEach((skill) => {
      Object.keys(DOMAIN_SKILLS_MAP).forEach((domain) => {
        if (DOMAIN_SKILLS_MAP[domain].includes(skill)) {
          domainCounts[domain]++;
        }
      });
    });
  });

  const topDomain = Object.entries(domainCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return topDomain ? topDomain[0] : "N/A";
};

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    const totalProfiles = calculateTotalProfiles(candidates);
    const avgExperience = calculateAverageExperience(candidates, totalProfiles);
    const mostPopularSkill = findMostPopularSkill(candidates);
    const topHiringDomain = findTopHiringDomain(candidates);

    res.json({
      totalProfiles,
      avgExperience,
      mostPopularSkill,
      topHiringDomain,
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);

    res.status(500).json({
      message: "Analytics fetch failed",
    });
  }
};