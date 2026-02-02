"use client";
import { useState } from 'react';

// Liste des langues supportées
const languages = [
  { name: "Français", code: "Français" },
  { name: "Anglais", code: "Anglais" },
  { name: "Espagnol", code: "Espagnol" },
  { name: "Italien", code: "Italien" },
  { name: "Allemand", code: "Allemand" },
  { name: "Japonais", code: "Japonais" },
  { name: "Portugais", code: "Portugais" },
  { name: "Chinois", code: "Chinois" },
  { name: "Arabe", code: "Arabe" },
  { name: "Russe", code: "Russe" },
  { name: "Coréen", code: "Coréen" },
  { name: "Néerlandais", code: "Néerlandais" },
  { name: "Grec", code: "Grec" },
  { name: "Thaï", code: "Thaï" }
].sort((a, b) => a.name.localeCompare(a.name));

const popularDestinations = [
  { name: "Espagne", lang: "Espagnol", flag: "🇪🇸" },
  { name: "Italie", lang: "Italien", flag: "🇮🇹" },
  { name: "Japon", lang: "Japonais", flag: "🇯🇵" },
  { name: "Angleterre", lang: "Anglais", flag: "🇬🇧" },
  { name: "Thaïlande", lang: "Thaï", flag: "🇹🇭" },
  { name: "Corée", lang: "Coréen", flag: "🇰🇷" },
];

export default function Triptalk() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [targetLang, setTargetLang] = useState("Anglais");
  const [sourceLang, setSourceLang] = useState("Français");

  const generatePlan = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceLang, targetLang, time: e.target.time.value }),
      });
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      alert("Erreur de connexion avec l'IA.");
    }
    setLoading(false);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-black text-blue-600 tracking-tight mb-2 italic">Triptalk</h1>
        <p className="text-slate-500 mb-8 font-medium">L'essentiel pour survivre à l'étranger.</p>

        {!plan ? (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Boutons Rapides */}
            <div className="flex flex-wrap justify-center gap-2">
              {popularDestinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => setTargetLang(dest.lang)}
                  type="button"
                  className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-bold ${
                    targetLang === dest.lang ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 bg-white"
                  }`}
                >
                  {dest.flag} {dest.name}
                </button>
              ))}
            </div>

            {/* Formulaire avec Menus Déroulants */}
            <form onSubmit={generatePlan} className="bg-white p-8 rounded-[2.5rem] shadow-2xl space-y-6 border border-slate-100 text-left">
              
              <div>
                <label className="text-xs font-black uppercase text-slate-400 ml-2">Je parle</label>
                <select 
                  value={sourceLang} 
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full p-4 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-400 ml-2">Je veux apprendre</label>
                <select 
                  value={targetLang} 
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full p-4 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-blue-600"
                >
                  {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-slate-400 ml-2">Départ prévu</label>
                <select name="time" className="w-full p-4 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium">
                  <option value="24 heures">🚨 Demain (Urgence)</option>
                  <option value="1 semaine">📅 Dans 1 semaine</option>
                  <option value="1 mois">⏳ Dans 1 mois</option>
                </select>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {loading ? "Préparation du voyage..." : "GÉNÉRER MON GUIDE"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500 text-left">
            <button onClick={() => setPlan(null)} className="font-bold text-blue-600 underline">← Nouveau voyage</button>
            <h2 className="text-3xl font-black text-slate-800">{plan.planTitle}</h2>
            
            {plan.days?.map((day: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] shadow-lg border border-slate-100">
                <h3 className="text-blue-600 font-black text-xl mb-4 italic underline">{day.title}</h3>
                <div className="space-y-4">
                  {day.phrases.map((p: any, j: number) => (
                    <div key={j} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl group">
                      <div>
                        <p className="font-bold text-lg">{p.translated}</p>
                        <p className="text-slate-500 text-sm">Prononciation : <span className="text-blue-500">{p.pronunciation}</span></p>
                      </div>
                      <button onClick={() => speak(p.translated)} className="bg-white p-3 rounded-xl shadow-sm text-2xl group-active:scale-90 transition">🔊</button>
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