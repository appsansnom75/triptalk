import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    
    // VERIFICATION 1 : La clé existe-t-elle ?
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "LA CLÉ GEMINI_API_KEY EST VIDE SUR VERCEL" }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Crée un guide de survie JSON pour un voyageur parlant ${sourceLang} vers ${targetLang}. 
    Structure: {"planTitle": "Voyage", "days": [{"title": "J1", "phrases": [{"original": "Salut", "translated": "Hi", "pronunciation": "Hai"}]}]}`;

    // VERIFICATION 2 : L'appel à Google
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    // On renvoie l'erreur réelle pour la voir dans l'alerte
    return new Response(JSON.stringify({ error: "ERREUR GOOGLE: " + error.message }), { status: 500 });
  }
}