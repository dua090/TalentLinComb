// controllers/searchController.js

const Candidate = require("../models/Candidate");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

exports.smartSearch = async (
  req,
  res
) => {

  try {

    const { prompt } =
      req.body;

    if (!prompt) {

      return res
        .status(400)
        .json({
          msg: "Prompt is required",
        });
    }

    const model =
      genAI.getGenerativeModel({
        model:
          "gemini-3-flash-preview",
      });

    const result =
      await model.generateContent(`
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

    let text =
      result.response.text();

    // =========================
    // SAFE JSON EXTRACTION
    // =========================

    const match =
      text.match(/\{[\s\S]*\}/);

    if (!match) {

      throw new Error(
        "Invalid AI response"
      );
    }

    const parsed =
      JSON.parse(match[0]);

    console.log(
      "✅ AI Parsed:",
      parsed
    );

    // =========================
    // BUILD MONGO QUERY
    // =========================

    let query = {};

    if (parsed.skills?.length) {

      query.$or =
        parsed.skills.map(
          (skill) => ({
            skills: {
              $regex: skill,
              $options: "i",
            },
          })
        );
    }

    if (
      parsed.experience !==
        null &&
      parsed.experience !==
        undefined &&
      !isNaN(
        parsed.experience
      )
    ) {

      query.experience = {
        $gte: Number(
          parsed.experience
        ),
      };
    }

    const candidates =
      await Candidate.find(
        query
      );

    // =========================
    // DOMAIN SKILLS
    // =========================

    const frontendSkills = [
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
    ];

    const backendSkills = [
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
    ];

    const cloudSkills = [
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
    ];

    const aiSkills = [
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
    ];

    // =========================
    // SMART MATCH SCORING
    // =========================

    const scoredCandidates =
      candidates.map(
        (candidate) => {

          let totalScore = 0;

          // =========================
          // SKILL SCORE (50%)
          // =========================

          let skillScore = 0;

          if (
            parsed.skills?.length
          ) {

            const matchedSkills =
              parsed.skills.filter(
                (skill) =>

                  candidate.skills?.some(
                    (
                      candidateSkill
                    ) =>

                      candidateSkill
                        .toLowerCase()
                        .includes(
                          skill.toLowerCase()
                        )
                  )
              );

            skillScore =
              matchedSkills.length /
              parsed.skills.length;
          }

          // =========================
          // EXPERIENCE SCORE (20%)
          // =========================

          let experienceScore =
            1;

          if (
            parsed.experience !==
              null &&
            parsed.experience !==
              undefined &&
            !isNaN(
              parsed.experience
            )
          ) {

            const difference =
              parsed.experience -
              candidate.experience;

            if (
              difference <= 0
            ) {

              experienceScore =
                1;

            } else if (
              difference === 1
            ) {

              experienceScore =
                0.7;

            } else if (
              difference === 2
            ) {

              experienceScore =
                0.5;

            } else {

              experienceScore =
                0.2;
            }
          }

          // =========================
          // DOMAIN SCORE (15%)
          // =========================

          let domainScore =
            0.5;

          const candidateSkills =
            candidate.skills ||
            [];

          const hasFrontend =
            candidateSkills.some(
              (skill) =>
                frontendSkills.includes(
                  skill
                )
            );

          const hasBackend =
            candidateSkills.some(
              (skill) =>
                backendSkills.includes(
                  skill
                )
            );

          const hasCloud =
            candidateSkills.some(
              (skill) =>
                cloudSkills.includes(
                  skill
                )
            );

          const hasAI =
            candidateSkills.some(
              (skill) =>
                aiSkills.includes(
                  skill
                )
            );

          if (
            parsed.skills?.some(
              (skill) =>
                frontendSkills.includes(
                  skill
                )
            ) &&
            hasFrontend
          ) {

            domainScore = 1;

          } else if (
            parsed.skills?.some(
              (skill) =>
                backendSkills.includes(
                  skill
                )
            ) &&
            hasBackend
          ) {

            domainScore = 1;

          } else if (
            parsed.skills?.some(
              (skill) =>
                cloudSkills.includes(
                  skill
                )
            ) &&
            hasCloud
          ) {

            domainScore = 1;

          } else if (
            parsed.skills?.some(
              (skill) =>
                aiSkills.includes(
                  skill
                )
            ) &&
            hasAI
          ) {

            domainScore = 1;
          }

          // =========================
          // PROJECT SCORE (15%)
          // =========================

          let projectScore =
            0.5;

          if (
            candidate.projects
              ?.length
          ) {

            const projectText =
              candidate.projects
                .join(" ")
                .toLowerCase();

            const projectMatches =
              parsed.skills?.filter(
                (skill) =>
                  projectText.includes(
                    skill.toLowerCase()
                  )
              ).length || 0;

            if (
              parsed.skills
                ?.length
            ) {

              projectScore =
                projectMatches /
                parsed.skills.length;
            }
          }

          // =========================
          // FINAL WEIGHTED SCORE
          // =========================

          totalScore =
            (
              skillScore *
                0.5 +
              experienceScore *
                0.2 +
              domainScore *
                0.15 +
              projectScore *
                0.15
            ) * 100;

          let matchPercentage =
            Math.round(
              totalScore
            );

          // =========================
          // REALISTIC SCORE CAPS
          // =========================

          if (
            matchPercentage > 95
          ) {

            matchPercentage =
              95;
          }

          if (
            matchPercentage < 35
          ) {

            matchPercentage =
              35;
          }

          return {

            ...candidate.toObject(),

            matchPercentage,
          };
        }
      );

    // =========================
    // SORT BEST → WORST
    // =========================

    scoredCandidates.sort(
      (a, b) =>
        b.matchPercentage -
        a.matchPercentage
    );

    // =========================
    // FINAL RESPONSE
    // =========================

    res.json({

      success: true,

      parsed,

      count:
        scoredCandidates.length,

      candidates:
        scoredCandidates,
    });

  } catch (err) {

    console.error(
      "❌ SEARCH ERROR:",
      err.message
    );

    res.status(500).json({

      success: false,

      msg: "AI Search failed",

      error: err.message,
    });
  }
};