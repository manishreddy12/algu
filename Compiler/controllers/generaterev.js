const { GoogleGenAI } = require('@google/genai')
const dotenv = require('dotenv')
dotenv.config();


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateReview(code) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a code review expert. Given the code write short review of the code given ${code}`,
  });
  return response.text;
}

module.exports = { generateReview, };