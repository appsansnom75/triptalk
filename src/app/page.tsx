"use client";
import { useState } from 'react';

const popularDestinations = [
  { name: "Espagne", lang: "Espagnol", flag: "🇪🇸" },
  { name: "Italie", lang: "Italien", flag: "🇮🇹" },
  { name: "Japon", lang: "Japonais", flag: "🇯🇵" },
  { name: "Portugal", lang: "Portugais", flag: "🇵🇹" },
  { name: "Angleterre", lang: "Anglais", flag: "🇬🇧" },
  { name: "Thaïlande", lang: "Thaï", flag: "🇹🇭" },
  { name: "Grèce", lang: "Grec", flag: "🇬🇷" },
  { name: "Corée", lang: "Coréen", flag: "🇰🇷" },
  { name: "Brésil", lang: "Portugais", flag: "🇧🇷" },
  { name: "Allemagne", lang: "Allemand", flag: "🇩🇪" },
];

export default function Triptalk() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [targetLang, setTargetLang] = useState("");

  const generatePlan = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      alert("Oups, l'IA est fatiguée. Réessaie !");
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
        <h1 className="text-5xl font-black text-blue-600 tracking-tight mb-2">Triptalk</h1>
        <p className="text-slate-500 mb-8 font-medium italic">"Parle comme un local, même si tu es arrivé hier."</p>

        {!plan ? (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Pays rapides */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {popularDestinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => setTargetLang(dest.lang)}
                  className={`px-4 py-2 rounded-full border-2 transition-all font-semibold flex items-center gap-2 ${
                    targetLang === dest.lang ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                  }`}
                >
                  <span>{dest.flag}</span> {dest.name}
                </button>
              ))}
            </div>

            {/* Formulaire */}
            <form onSubmit={generatePlan} className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-blue-100 space-y-5 border border-slate-100">
              <div className="text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-2">Ta langue maternelle</label>
                <input name="sourceLang" defaultValue="Français" className="w-full p-4 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition" required />
              </div>
              
              <div className="text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-2">Langue à apprendre</label>
                <input 
                  name="targetLang" 
                  value={targetLang} 
                  onChange={(e) => setTargetLang(e.target.value)}
                  placeholder="Ex: Japonais, Italien..." 
                  className="w-full p-4 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition text-lg font-semibold" 
                  required 
                />
              </div>

              <div className="text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-2">Temps restant</label>
                <select name="time" className="w-full p-4 mt-1 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition font-medium">
                  <option value="24 heures">🚨 Je pars dans 24 heures</option>
                  <option value="1 semaine">📅 Je pars dans 1 semaine</option>
                  <option value="1 mois">⏳ Je pars dans 1 mois</option>
                </select>
              </div>

              <button 
                disabled={loading} 
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Génération du guide..." : "CRÉER MON PLAN 🚀"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500">
            <button onClick={() => setPlan(null)} className="font-bold text-blue-600 hover:underline">← Modifier mon voyage</button>
            <h2 className="text-3xl font-extrabold text-slate-800">{plan.planTitle}</h2>
            
            <div className="grid gap-6">
              {plan.days?.map((day: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] shadow-lg text-left border border-slate-100">
                  <h3 className="text-blue-600 font-black text-xl mb-6 flex items-center gap-2">
                    <span className="bg-blue-100 px-3 py-1 rounded-lg text-sm">DAY {i+1}</span>
                    {day.title}
                  </h3>
                  <div className="space-y-4">
                    {day.phrases.map((p: any, j: number) => (
                      <div key={j} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition group">
                        <div className="flex-1">
                          <p className="font-bold text-lg text-slate-800">{p.translated}</p>
                          <p className="text-slate-500 text-sm">
                            <span className="font-medium text-blue-400">{p.pronunciation}</span> • {p.original}
                          </p>
                        </div>
                        <button 
                          onClick={() => speak(p.translated)} 
                          className="bg-white p-3 rounded-xl shadow-sm text-2xl group-hover:scale-110 transition"
                        >🔊</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}