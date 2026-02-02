import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Clé API manquante sur Vercel" }), { status: 500 });
    }

    // On initialise avec la version stable
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Changement ici : On s'assure d'utiliser le nom exact du modèle
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Tu es un coach de voyage. Crée un guide de survie JSON pour un voyageur parlant ${sourceLang} vers un pays parlant ${targetLang}. 
    Le voyage est dans ${time}. 
    Réponds UNIQUEMENT avec ce format JSON strict :
    {
      "planTitle": "Pack de survie : ${targetLang}",
      "days": [
        {
          "title": "JOUR 1 : L'essentiel",
          "phrases": [
            { "original": "Bonjour", "translated": "...", "pronunciation": "..." }
          ]
        }
      ]
    }`;

    // On utilise generateContent de manière simple
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Nettoyage au cas où l'IA met des balises Markdown
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Erreur détaillée:", error);
    return new Response(JSON.stringify({ 
      error: "Erreur de configuration du modèle. Vérifie ta clé sur AI Studio." 
    }), { status: 500 });
  }
}