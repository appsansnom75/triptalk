import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDD7EyLk-vSXInKE2rkIbbyCCjafuq1kOU");

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Act as a language survival coach for an app called Triptalk. 
    Create a survival plan for a ${sourceLang} speaker going to a country speaking ${targetLang} in ${time}.
    FOCUS: High-frequency phrases, zero grammar, travel survival.
    Return ONLY a JSON object with this structure:
    {
      "planTitle": "Pack de survie : ${targetLang}",
      "days": [
        {
          "title": "JOUR 1 : L'arrivée et l'essentiel",
          "phrases": [
            { "original": "Phrase in ${sourceLang}", "translated": "Phrase in ${targetLang}", "pronunciation": "Phonetic sounds for ${sourceLang} speaker" }
          ]
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
    return new Response(JSON.stringify({ error: "Échec de génération" }), { status: 500 });
  }
}