const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateFromGemini = async (userPrompt) => {
  try {
    const fullPrompt = `You are Galuxium AI assistant. Generate full SaaS MVP output based on the following:\n\n${userPrompt}`;
    const result = await model.generateContent(fullPrompt);
    const textOutput = result?.response?.text();
    if (!textOutput) {
      throw new Error("No content received from Gemini");
    }
    return textOutput;
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    throw new Error("Gemini generation failed.");
  }
};

module.exports = { generateFromGemini };
