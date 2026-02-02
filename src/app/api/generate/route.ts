import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDD7EyLk-vSXInKE2rkIbbyCCjafuq1kOU");

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Tu es Triptalk, un coach de voyage. 
    Crée un plan de survie pour un voyageur parlant ${sourceLang} allant dans un pays parlant ${targetLang} (${time}).
    Retourne UNIQUEMENT un objet JSON strictement comme ceci, sans texte autour :
    {
      "planTitle": "Guide de survie : ${targetLang}",
      "days": [
        {
          "title": "JOUR 1 : L'arrivée",
          "phrases": [
            { "original": "Bonjour", "translated": "...", "pronunciation": "..." }
          ]
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 🛡️ NETTOYAGE ULTIME : On ne garde que ce qui est entre les premières et dernières accolades
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}') + 1;
    if (start !== -1 && end !== -1) {
      text = text.substring(start, end);
    }

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Bug IA" }), { status: 500 });
  }
}