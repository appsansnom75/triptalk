export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Clé API manquante sur Vercel" }), { status: 500 });
    }

    // ON PASSE EN VERSION v1 (STABLE) ET NON v1beta
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = {
      contents: [{
        parts: [{
          text: `Act as a travel coach. Create a JSON survival guide for a ${sourceLang} speaker going to a country where they speak ${targetLang}. Trip is in ${time}.
          Return ONLY this JSON structure:
          {
            "planTitle": "Pack de survie : ${targetLang}",
            "days": [
              {
                "title": "JOUR 1",
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
      // Si ça échoue encore, on affiche tout le message de Google
      return new Response(JSON.stringify({ 
        error: `Google dit: ${data.error?.message || "Erreur inconnue"} (Code: ${data.error?.code})` 
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