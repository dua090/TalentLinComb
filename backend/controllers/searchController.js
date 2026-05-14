const Candidate =
  require("../models/Candidate");

const {
  GoogleGenerativeAI,
} = require(
  "@google/generative-ai"
);

const {
  generateEmbedding,
} = require(
  "../services/embeddingService"
);

const {
  calculateCandidateRanking,
} = require(
  "../utils/rankingEngine"
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

      // ================= VALIDATION =================

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

Extract structured data from the recruiter query below.

Rules:
- Always return valid JSON only
- Skills must be array
- Experience must be number or null
- Extract technical skills only
- Remove unnecessary words like developer, engineer, expert, candidate, etc.

Recruiter Query:
"${prompt}"

Return Format:
{
  "skills": ["React"],
  "experience": 3
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

      console.log(
        "Generating embedding..."
      );

      const queryEmbedding =
        await generateEmbedding(
          semanticQuery
        );

      console.log(
        "Embedding generated successfully"
      );

      // ================= FETCH ALL CANDIDATES =================

      const candidates =
        await Candidate.find(
          {}
        );

      // ================= AI RANKING ENGINE =================

      const scoredCandidates =
        candidates.map(
          (
            candidate
          ) => {

            const ranking =
              calculateCandidateRanking({

                candidate,

                parsedQuery:
                  parsed,

                queryEmbedding,
              });

            console.log({

              candidate:
                candidate.name,

              semanticScore:
                ranking.semanticScore,

              matchPercentage:
                ranking.matchPercentage,
            });

            return {

              ...candidate.toObject(),

              semanticScore:
                Number(
                  ranking.semanticScore
                ),

              skillScore:
                Number(
                  ranking.skillScore
                ),

              experienceScore:
                Number(
                  ranking.experienceScore
                ),

              projectScore:
                Number(
                  ranking.projectScore
                ),

              matchPercentage:
                ranking.matchPercentage,

              rankingReasons:
                ranking.rankingReasons,
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

        parsed: {

          ...parsed,

          originalQuery:
            prompt,
        },

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