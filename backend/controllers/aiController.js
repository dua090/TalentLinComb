const {
  GoogleGenerativeAI,
} = require(
  "@google/generative-ai"
);

const genAI =
  new GoogleGenerativeAI(
    process.env
      .GEMINI_API_KEY
  );

// ================= AI CANDIDATE SUMMARY =================

exports.generateCandidateSummary =
  async (req, res) => {

    try {

      const {
        candidate,
        recruiterQuery,
      } = req.body;

      if (
        !candidate
      ) {

        return res
          .status(400)
          .json({
            success: false,
            msg: "Candidate data required",
          });
      }

      const model =
        genAI.getGenerativeModel({
          model:
            "gemini-3-flash-preview",
        });

      // ================= PROMPT =================

      const prompt = `
You are an expert AI technical recruiter.

Analyze the following candidate profile against the recruiter hiring requirement.

Recruiter Requirement:
"${recruiterQuery || "General technical hiring"}"

Candidate Information:

Name:
${candidate.name}

Experience:
${candidate.experience} years

Skills:
${candidate.skills?.join(", ")}

Projects:
${candidate.projects?.join(", ")}

Education:
${candidate.education?.join(", ")}

Generate concise recruiter insights in JSON format ONLY.

Return:
{
  "summary": "",
  "strengths": [],
  "gaps": [],
  "recommendation": ""
}

Rules:
- Keep summary recruiter-friendly
- Keep strengths concise
- Keep gaps realistic
- Recommendation should be professional
- Do not use markdown
`;

      // ================= GEMINI =================

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      // ================= EXTRACT JSON =================

      const match =
        response.match(
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

      res.json({

        success: true,

        insights: parsed,
      });

    } catch (error) {

      console.error(
        "AI SUMMARY ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        msg: "Failed to generate AI summary",
      });
    }
  };