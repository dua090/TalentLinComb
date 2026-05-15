const Candidate =
  require(
    "../models/Candidate"
  );

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

// ================= GEMINI =================

const genAI =
  new GoogleGenerativeAI(

    process.env
      .GEMINI_API_KEY
  );

// ================= EXTRACT JSON =================

const extractJSON =
  (text) => {

    const match =
      text.match(
        /\{[\s\S]*\}/
      );

    if (!match) {

      throw new Error(
        "Invalid AI response"
      );
    }

    return JSON.parse(
      match[0]
    );
  };

// ================= BUILD SEMANTIC QUERY =================

const buildSemanticQuery =
  ({
    prompt,
    skills,
    experience,
  }) => {

    return `

${prompt}

${skills?.join(
  " "
)}

${
  experience || ""
}

years experience

`;
  };

// ================= SMART SEARCH =================

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

            success: false,

            msg:
              "Prompt is required",
          });
      }

      // ================= GEMINI MODEL =================

      const model =
        genAI.getGenerativeModel({

          model:
            "gemini-3-flash-preview",
        });

      // ================= AI QUERY PARSING =================

      const result =
        await model.generateContent(`

You are an AI recruiter assistant.

Extract structured data from the recruiter query below.

RULES:
- Always return valid JSON only
- Skills must be array
- Experience must be number or null
- Extract technical skills only
- Remove generic words:
  developer,
  engineer,
  expert,
  candidate,
  resource,
  profile

Recruiter Query:
"${prompt}"

Return Format:
{
  "skills": ["React"],
  "experience": 3
}

`);

      // ================= RAW RESPONSE =================

      const rawText =
        result.response.text();

      // ================= PARSED JSON =================

      const parsed =
        extractJSON(
          rawText
        );

      console.log(
        "✅ AI Parsed:",
        parsed
      );

      // ================= SEMANTIC QUERY =================

      const semanticQuery =
        buildSemanticQuery({

          prompt,

          skills:
            parsed.skills,

          experience:
            parsed.experience,
        });

      console.log(
        "Generating query embedding..."
      );

      // ================= QUERY EMBEDDING =================

      const queryEmbedding =
        await generateEmbedding(
          semanticQuery
        );

      console.log(
        "Query embedding generated"
      );

      // ================= MULTI-TENANT CANDIDATES =================

      const candidates =
        await Candidate.find({

          organizationId:
            req.user.organizationId,
        });

      console.log(

        `Fetched ${candidates.length} candidates`
      );

      // ================= AI RANKING =================

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

      // ================= SORT =================

      scoredCandidates.sort(
        (a, b) =>

          b.matchPercentage -
          a.matchPercentage
      );

      // ================= RESPONSE =================

      res.status(200).json({

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
        "SMART SEARCH ERROR:",
        err
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