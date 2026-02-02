import { GoogleGenerativeAI } from "@google/generative-ai";

// On utilise ta clé directement ici pour garantir le fonctionnement
const genAI = new GoogleGenerativeAI("AIzaSyDD7EyLk-vSXInKE2rkIbbyCCjafuq1kOU");

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });
    
    const prompt = `Tu es un coach de voyage expert. Crée un plan de survie linguistique pour un utilisateur parlant ${sourceLang} qui part en vacances dans un pays parlant ${targetLang} dans ${time}.
    Focalise-toi sur l'essentiel : Taxi, Hôtel, Restaurant, Urgences.
    Retourne UNIQUEMENT un objet JSON avec cette structure exacte :
    {
      "planTitle": "Mon Guide de Survie : ${targetLang} 🌴",
      "days": [
        {
          "title": "JOUR 1 : Premiers pas",
          "phrases": [
            { "original": "Phrase en ${sourceLang}", "translated": "Phrase en ${targetLang}", "pronunciation": "Prononciation phonétique" }
          ]
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Nettoyage au cas où l'IA ajoute des caractères parasites
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? jsonMatch[0] : text;

    return new Response(cleanJson, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erreur Triptalk:", error);
    return new Response(JSON.stringify({ error: "L'IA est restée sur la plage..." }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}