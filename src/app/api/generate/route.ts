export async function POST(req: Request) {
  try {
    const { sourceLang, targetLang, time } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Clé API absente de Vercel" }), { status: 500 });
    }

    // On utilise "gemini-1.5-flash-latest" qui est le nom technique universel
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const prompt = {
      contents: [{
        parts: [{
          text: `Tu es un guide. Génère un JSON pour apprendre le ${targetLang} (voyage de ${time}). 
          Format: {"planTitle": "Guide", "days": [{"title": "J1", "phrases": [{"original": "Salut", "translated": "Hi", "pronunciation": "Hai"}]}]}`
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
        error: `Erreur Google (${response.status}) : ${data.error?.message}` 
      }), { status: 500 });
    }

    const text = data.candidates[0].content.parts[0].text.replace(/```json/g, "").replace(/```/g, "").trim();
    return new Response(text, { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}