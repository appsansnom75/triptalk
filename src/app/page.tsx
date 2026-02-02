"use client";
import { useState } from 'react';

export default function Triptalk() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      alert("Erreur lors de la génération");
    }
    setLoading(false);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-8">Triptalk ✈️</h1>
      
      {!plan ? (
        <form onSubmit={generatePlan} className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl space-y-6">
          <input name="sourceLang" placeholder="Ma langue (ex: Français)" className="w-full p-4 border rounded-2xl" required />
          <input name="targetLang" placeholder="Langue à apprendre" className="w-full p-4 border rounded-2xl" required />
          <select name="time" className="w-full p-4 border rounded-2xl">
            <option value="24 heures">Départ dans 24h</option>
            <option value="1 semaine">Départ dans 1 semaine</option>
            <option value="1 mois">Départ dans 1 mois</option>
          </select>
          <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg">
            {loading ? "Génération..." : "Créer mon plan"}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-md space-y-6">
          <button onClick={() => setPlan(null)} className="text-blue-600 font-bold mb-4 italic underline text-lg">← Recommencer</button>
          <h2 className="text-2xl font-bold text-slate-800 text-center">{plan.planTitle}</h2>
          {plan.days?.map((day: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-md border-l-4 border-blue-500">
              <h3 className="font-bold text-xl text-blue-600 mb-4">{day.title}</h3>
              {day.phrases.map((p: any, j: number) => (
                <div key={j} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-lg">{p.translated}</p>
                    <p className="text-slate-400 text-sm italic">{p.pronunciation} ({p.original})</p>
                  </div>
                  <button onClick={() => speak(p.translated)} className="ml-4 bg-blue-50 p-3 rounded-full text-2xl">🔊</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}