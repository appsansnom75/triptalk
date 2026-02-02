import { GoogleGenerativeAI } from "@google/generative-ai";

// On privilégie la variable d'environnement, sinon on utilise ta clé en secours
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDD7EyLk-vSXInKE2rkIbbyCCjafuq1kOU";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();

    // Configuration du modèle pour forcer une réponse plus stable
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" } // Force le format JSON
    });
    
    const prompt = `Act as a language survival coach for an app called Triptalk. 
    Create a survival plan for a ${sourceLang} speaker going to a country speaking ${targetLang} in ${time}.
    FOCUS: High-utility phrases only (Taxi, Hotel, Restaurant, Help). No grammar.
    Return ONLY this JSON structure:
    {
      "planTitle": "Pack de survie : ${targetLang}",
      "days": [
        {
          "title": "JOUR 1 : L'arrivée et l'essentiel",
          "phrases": [
            { "original": "Phrase in ${sourceLang}", "translated": "Phrase in ${targetLang}", "pronunciation": "Phonetic sounds" }
          ]
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Nettoyage ultra-robuste du texte pour ne garder que le JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }

    return new Response(text, {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Évite les erreurs de blocage navigateur
      },
    });
  } catch (error) {
    console.error("Erreur API Triptalk:", error);
    return new Response(JSON.stringify({ error: "Échec de génération", details: error }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}