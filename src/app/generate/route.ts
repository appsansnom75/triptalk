import { GoogleGenerativeAI } from "@google/generative-ai";

// On initialise l'IA en dehors de la fonction
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();

    const prompt = `Act as a language survival coach. Create a plan for a ${sourceLang} speaker going to a country speaking ${targetLang} in ${time}.
    Rules: No grammar, only high-utility phrases.
    Return ONLY a JSON object with this exact structure:
    {
      "planTitle": "string",
      "days": [
        {
          "title": "string",
          "phrases": [{ "original": "string", "translated": "string", "pronunciation": "string" }]
        }
      ]
    }`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    return new Response(JSON.stringify(JSON.parse(text)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erreur de génération" }), { status: 500 });
  }
}