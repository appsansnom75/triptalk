export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Clé API manquante sur Vercel" }), { status: 500 });
    }

    // ON CHANGE LE MODÈLE POUR GEMINI-1.0-PRO (Le plus compatible)
    // ET ON UTILISE LA VERSION v1beta (la plus flexible)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`;

    const prompt = {
      contents: [{
        parts: [{
          text: `Tu es un guide de voyage. Crée un plan de survie linguistique JSON pour un ${sourceLang} allant vers un pays parlant ${targetLang}. Trip: ${time}.
          Réponds UNIQUEMENT avec ce JSON strict :
          {
            "planTitle": "Pack de survie : ${targetLang}",
            "days": [
              {
                "title": "JOUR 1 : L'arrivée",
                "phrases": [
                  { "original": "Bonjour", "translated": "...", "pronunciation": "..." }
                ]
              }
            ]
          }`
        }]
      }]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prompt)
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ 
        error: `Google refuse ce modèle : ${data.error?.message || "Erreur"}` 
      }), { status: 500 });
    }

    const text = data.candidates[0].content.parts[0].text.replace(/```json/g, "").replace(/```/g, "").trim();
    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}