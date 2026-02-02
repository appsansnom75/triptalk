export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Clé API manquante sur Vercel" }), { status: 500 });
    }

    // URL Directe Google sans passer par la librairie
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = {
      contents: [{
        parts: [{
          text: `Tu es un coach de voyage. Crée un guide de survie JSON pour un voyageur parlant ${sourceLang} vers ${targetLang} (${time}). 
          Réponds UNIQUEMENT avec ce format JSON strict :
          {
            "planTitle": "Guide ${targetLang}",
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
      }],
      generationConfig: {
        response_mime_type: "application/json",
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prompt)
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || "Erreur Google" }), { status: 500 });
    }

    const text = data.candidates[0].content.parts[0].text;
    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}