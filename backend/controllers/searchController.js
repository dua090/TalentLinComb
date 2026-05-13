const Candidate =
  require("../models/Candidate");

const {
  GoogleGenerativeAI,
} = require(
  "@google/generative-ai"
);

const cosineSimilarity =
  require(
    "cosine-similarity"
  );

const {
  generateEmbedding,
} = require(
  "../services/embeddingService"
);

const genAI =
  new GoogleGenerativeAI(
    process.env
      .GEMINI_API_KEY
  );

exports.smartSearch =
  async (req, res) => {

    try {

      const { prompt } =
        req.body;

      if (!prompt) {

        return res
          .status(400)
          .json({
            msg:
              "Prompt is required",
          });
      }

      // ================= GEMINI QUERY PARSING =================

      const model =
        genAI.getGenerativeModel(
          {
            model:
              "gemini-3-flash-preview",
          }
        );

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

      const match =
        text.match(
          /\{[\s\S]*\}/
        );

      if (!match) {

        throw new Error(
          "Invalid AI response"
        );
      }

      const parsed =
        JSON.parse(
          match[0]
        );

      console.log(
        "✅ AI Parsed:",
        parsed
      );

      // ================= SEMANTIC QUERY =================

      const semanticQuery = `

${prompt}

${parsed.skills?.join(
  " "
)}

${
  parsed.experience ||
  ""
}

years experience

`;

      const queryEmbedding =
        await generateEmbedding(
          semanticQuery
        );

      // ================= FETCH ALL CANDIDATES =================

      const candidates =
        await Candidate.find({});

      // ================= SCORING =================

      const scoredCandidates =
        candidates.map(
          (
            candidate
          ) => {

            let totalScore =
              0;

            // ================= SKILL SCORE =================

            let skillScore =
              0;

            if (
              parsed.skills
                ?.length
            ) {

              const matchedSkills =
  parsed.skills.filter(
    (skill) => {

      const normalizedSkill =
        skill.toLowerCase();

      return candidate.skills?.some(
        (
          candidateSkill
        ) => {

          const normalizedCandidateSkill =
            candidateSkill.toLowerCase();

          // DIRECT MATCH

          if (
            normalizedCandidateSkill.includes(
              normalizedSkill
            )
          ) {

            return true;
          }

          // PARTIAL MATCH

          const queryWords =
            normalizedSkill.split(
              " "
            );

          return queryWords.some(
            (word) =>
              normalizedCandidateSkill.includes(
                word
              )
          );
        }
      );
    }
  );

              skillScore =
                matchedSkills.length /
                parsed.skills.length;
            }

            // ================= EXPERIENCE SCORE =================

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
                difference <=
                0
              ) {

                experienceScore =
                  1;

              } else if (
                difference ===
                1
              ) {

                experienceScore =
                  0.7;

              } else if (
                difference ===
                2
              ) {

                experienceScore =
                  0.5;

              } else {

                experienceScore =
                  0.2;
              }
            }

            // ================= PROJECT SCORE =================

            let projectScore =
              0.5;

            if (
              candidate
                .projects
                ?.length
            ) {

              const projectText =
                candidate.projects
                  .join(" ")
                  .toLowerCase();

              const projectMatches =
                parsed.skills?.filter(
                  (
                    skill
                  ) =>

                    projectText.includes(
                      skill.toLowerCase()
                    )
                ).length ||
                0;

              if (
                parsed.skills
                  ?.length
              ) {

                projectScore =
                  projectMatches /
                  parsed.skills.length;
              }
            }

            // ================= SEMANTIC SCORE =================

            let semanticScore =
              0;

            if (
              candidate
                .embedding
                ?.length &&
              queryEmbedding?.length
            ) {

              semanticScore =
                cosineSimilarity(
                  candidate.embedding,
                  queryEmbedding
                ) || 0;

              semanticScore =
                Math.max(
                  0,
                  semanticScore
                );
            }

            // ================= FINAL WEIGHTED SCORE =================

            totalScore =
              (
                skillScore *
                  0.35 +
                experienceScore *
                  0.15 +
                projectScore *
                  0.10 +
                semanticScore *
                  0.40
              ) *
              100;

            let matchPercentage =
              Math.round(
                totalScore
              );

            // ================= SCORE CAPS =================

            if (
              matchPercentage >
              95
            ) {

              matchPercentage =
                95;
            }

            if (
              matchPercentage <
              35
            ) {

              matchPercentage =
                35;
            }

            console.log({

              candidate:
                candidate.name,

              semanticScore:
                semanticScore.toFixed(
                  2
                ),

              matchPercentage,
            });

            return {

              ...candidate.toObject(),

              semanticScore:
                Number(
                  semanticScore.toFixed(
                    2
                  )
                ),

              matchPercentage,
            };
          }
        );

      // ================= SORT BEST → WORST =================

      scoredCandidates.sort(
        (a, b) =>
          b.matchPercentage -
          a.matchPercentage
      );

      // ================= RESPONSE =================

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

        msg:
          "AI Search failed",

        error:
          err.message,
      });
    }
  };