import { GoogleGenerativeAI } from "@google/generative-ai";

// Clé API directe
const genAI = new GoogleGenerativeAI("AIzaSyDD7EyLk-vSXInKE2rkIbbyCCjafuq1kOU");

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Crée un plan de survie pour un voyageur parlant ${sourceLang} allant dans un pays parlant ${targetLang} (${time}).
    Retourne UNIQUEMENT un objet JSON valide. Pas de texte avant, pas de texte après.
    Structure : {"planTitle": "...", "days": [{"title": "...", "phrases": [{"original": "...", "translated": "...", "pronunciation": "..."}]}]}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // 🛡️ NETTOYAGE FORCE : Supprime les balises ```json et ``` si elles existent
    text = text.replace(/^```json/gm, "").replace(/^```/gm, "").trim();

    // On vérifie si c'est bien du JSON avant d'envoyer
    try {
      JSON.parse(text);
    } catch (e) {
      // Si l'IA a quand même mis du texte, on cherche les accolades
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}') + 1;
      text = text.substring(start, end);
    }

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Erreur Serveur:", error);
    return new Response(JSON.stringify({ error: "L'IA a fait une erreur interne" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}