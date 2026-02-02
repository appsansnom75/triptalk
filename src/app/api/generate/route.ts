import { GoogleGenerativeAI } from "@google/generative-ai";

// On s'assure que la clé est bien lue
const API_KEY = "AIzaSyDD7EyLk-vSXInKE2rkIbbyCCjafuq1kOU";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();

    // Utilisation du modèle flash (le plus rapide et stable)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Génère un plan de survie pour un voyageur. 
    Source: ${sourceLang}, Destination: ${targetLang}, Temps: ${time}.
    Réponds uniquement avec ce JSON :
    {"planTitle": "Voyage en ${targetLang}", "days": [{"title": "Jour 1", "phrases": [{"original": "Bonjour", "translated": "Hello", "pronunciation": "Hélo"}]}]}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Nettoyage manuel si l'IA ajoute du texte
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    // On affiche l'erreur précise dans les logs Vercel
    console.error("Détail Erreur Google:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}