import { GoogleGenerativeAI } from "@google/generative-ai";

// Utilisation de ta clé directement pour le test
const genAI = new GoogleGenerativeAI("AIzaSyDD7EyLk-vSXInKE2rkIbbyCCjafuq1kOU");

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Act as a language survival coach. Create a survival plan for a ${sourceLang} speaker going to a country speaking ${targetLang} in ${time}. 
    Return ONLY a JSON object with this structure: 
    { "planTitle": "Triptalk Plan", "days": [{ "title": "Day 1", "phrases": [{ "original": "Hi", "translated": "Bonjour", "pronunciation": "Bon-zhour" }] }] }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    return new Response(text, { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}