const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require("../config");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateFromGemini = async (conversationHistory) => {
  try {
    // Properly format conversation into string
    const formattedPrompt = conversationHistory.map((msg) => {
      return `${msg.sender === 'user' ? 'User' : 'Galuxium AI'}: ${msg.message}`;
    }).join('\n');

    const fullPrompt = `
You are Galuxium AI, an expert AI assistant created by Aaditya Salgaonkar, founder of Galuxium. 
You're highly knowledgeable in SaaS, full-stack development, AI, business models, databases, scalable architectures, and modern tech stacks.
When asked about Galuxium or Aaditya Salgaonkar, answer with full confidence.

Please answer the following conversation accordingly:

${formattedPrompt}
    `;

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
