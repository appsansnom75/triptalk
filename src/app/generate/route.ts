import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Act as a language survival coach. Create a plan for a ${sourceLang} speaker going to a country speaking ${targetLang} in ${time}.
    Return ONLY a JSON object with this exact structure:
    {
      "planTitle": "Survival Plan",
      "days": [
        {
          "title": "Day 1",
          "phrases": [{ "original": "Hi", "translated": "Bonjour", "pronunciation": "Bon-zhour" }]
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Generation failed" }), { status: 500 });
  }
}