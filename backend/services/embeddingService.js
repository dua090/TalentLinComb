const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

exports.generateEmbedding =
  async (text) => {

    try {

      console.log(
        "Generating embedding..."
      );

      const model =
        genAI.getGenerativeModel({
          model:
            "gemini-embedding-001",
        });

      const result =
        await model.embedContent(
          text
        );

      console.log(
        "Embedding generated successfully"
      );

      return (
        result.embedding.values
      );

    } catch (error) {

      console.error(
        "❌ Embedding Error:",
        error
      );

      return [];
    }
  };