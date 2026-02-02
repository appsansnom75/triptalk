"use client";
import { useState } from 'react';

export default function SurvivalApp() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const data = await res.json();
    setPlan(data);
    setLoading(false);
  };

  const speak = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">TripTalk ✈️</h1>

        {!plan ? (
          <form onSubmit={generatePlan} className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ma langue</label>
              <input name="sourceLang" className="w-full p-3 border rounded-xl" placeholder="Ex: Français" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Langue cible</label>
              <input name="targetLang" className="w-full p-3 border rounded-xl" placeholder="Ex: Japonais" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Départ dans...</label>
              <select name="time" className="w-full p-3 border rounded-xl">
                <option value="24 heures">24 Heures (Urgent)</option>
                <option value="1 semaine">1 Semaine</option>
                <option value="1 mois">1 Mois</option>
              </select>
            </div>
            <button disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition">
              {loading ? "Génération en cours..." : "Créer mon plan de survie"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <button onClick={() => setPlan(null)} className="text-blue-600 font-medium">← Recommencer</button>
            <h2 className="text-xl font-bold">{plan.planTitle}</h2>
            {plan.days.map((day: any, i: number) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm">
                <h3 className="font-bold text-blue-500 mb-3">{day.title}</h3>
                <div className="space-y-3">
                  {day.phrases.map((p: any, j: number) => (
                    <div key={j} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <p className="font-bold text-lg">{p.translated}</p>
                        <p className="text-slate-500 text-sm italic">{p.pronunciation}</p>
                      </div>
                      <button onClick={() => speak(p.translated, 'ja')} className="bg-slate-100 p-2 rounded-full">🔊</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}