const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fallbackParser = (text) => {
  // Ensure text is a string; if it's null/undefined, use an empty string
  const cleanText = String(text || ""); 

  const email = cleanText.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
  const phone = cleanText.match(/\b\d{10}\b/);

  return {
    name: cleanText.split("\n")[0]?.trim() || "Unknown",
    email: email ? email[0] : "Not found",
    phone: phone ? phone[0] : "Not found",
    skills: [],
    experience: 0,
    education: [],
    projects: []
  };
};

exports.parseResumeWithAI = async (text) => {
  if (!text || text.trim().length < 10) {
    console.error("Text is too short or empty");
    return fallbackParser(text);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      // Force the model to output valid JSON
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `
      Extract the following information from the resume text into a JSON object:
      {
        "name": "Full Name",
        "email": "Email Address",
        "phone": "Phone Number",
        "skills": ["Skill 1", "Skill 2"],
        "experience": number_of_years,
        "education": ["Degree/School"],
        "projects": ["Project Names"]
      }

      Resume Text:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    return JSON.parse(responseText);

  } catch (error) {
    console.error("Gemini failed:", error.message);
    // Now fallbackParser will have actual text to work with!
    return fallbackParser(text);
  }
};
