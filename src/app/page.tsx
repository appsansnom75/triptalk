"use client";
import { useState } from 'react';

const languages = [
  { name: "Français", code: "Français" },
  { name: "Anglais", code: "Anglais" },
  { name: "Espagnol", code: "Espagnol" },
  { name: "Italien", code: "Italien" },
  { name: "Japonais", code: "Japonais" },
  { name: "Portugais", code: "Portugais" },
  { name: "Grec", code: "Grec" },
  { name: "Thaï", code: "Thaï" },
  { name: "Arabe", code: "Arabe" }
].sort((a, b) => a.name.localeCompare(a.name));

export default function Triptalk() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

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

      if (!res.ok) {
        // Affiche l'erreur réelle venant du serveur (ex: "Clé invalide")
        alert(`Détail technique : ${data.error || "Erreur inconnue"}`);
      } else {
        setPlan(data);
      }
    } catch (err) {
      // Erreur si le dossier /api/ n'est pas trouvé
      alert("Impossible de joindre le serveur. Vérifie que ton dossier 'api' est bien placé dans 'app'.");
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 p-6 md:p-12 font-sans selection:bg-orange-200">
      <div className="max-w-xl mx-auto">
        
        <header className="text-center mb-10 animate-in fade-in zoom-in duration-1000">
          <span className="inline-block px-4 py-1 bg-white/50 backdrop-blur-sm rounded-full text-orange-600 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
            ☀️ Ready for take off?
          </span>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 tracking-tighter mb-2">
            Triptalk
          </h1>
          <p className="text-sky-800/60 font-medium italic">Ton kit de survie pour briller en vacances 🌴</p>
        </header>

        {!plan ? (
          <form onSubmit={generatePlan} className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl shadow-orange-200/50 space-y-8 border border-white animate-in slide-in-from-bottom-8 duration-700">
            
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-sm font-black text-orange-400 ml-4 mb-2 block uppercase tracking-tighter">Je parle</label>
                <select name="sourceLang" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-orange-300 focus:ring-0 shadow-inner text-slate-700 font-bold transition-all appearance-none cursor-pointer">
                  {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
                <div className="absolute right-5 bottom-5 pointer-events-none text-orange-300 text-xs">▼</div>
              </div>

              <div className="relative group">
                <label className="text-sm font-black text-sky-400 ml-4 mb-2 block uppercase tracking-tighter">Destination (Langue)</label>
                <select name="targetLang" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-sky-300 focus:ring-0 shadow-inner text-slate-700 font-bold transition-all appearance-none cursor-pointer">
                  {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
                <div className="absolute right-5 bottom-5 pointer-events-none text-sky-300 text-xs">▼</div>
              </div>

              <div className="relative group">
                <label className="text-sm font-black text-amber-400 ml-4 mb-2 block uppercase tracking-tighter">On décolle quand ?</label>
                <select name="time" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-amber-300 focus:ring-0 shadow-inner text-slate-700 font-bold transition-all appearance-none cursor-pointer">
                  <option value="24 heures">🚀 Demain (Mode Panique !)</option>
                  <option value="1 semaine">📅 Dans 1 semaine</option>
                  <option value="1 mois">⏳ On a le temps</option>
                </select>
                <div className="absolute right-5 bottom-5 pointer-events-none text-amber-300 text-xs">▼</div>
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-6 rounded-2xl font-black text-xl shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "On prépare tes valises... ✈️" : "C'EST PARTI ! 🥥"}
            </button>
          </form>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-12 duration-700">
            <button onClick={() => setPlan(null)} className="flex items-center gap-2 font-black text-sky-600 hover:text-sky-700 transition mx-auto bg-sky-50 px-6 py-2 rounded-full shadow-sm">
              ← Changer de voyage
            </button>
            
            <h2 className="text-4xl font-black text-slate-800 text-center leading-tight">
               {plan.planTitle}
            </h2>
            
            <div className="grid gap-8">
              {plan.days?.map((day: any, i: number) => (
                <div key={i} className="bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-white">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl">🍹</span>
                    <h3 className="text-2xl font-black text-orange-500 uppercase tracking-tighter italic border-b-4 border-orange-100">{day.title}</h3>
                  </div>
                  
                  <div className="space-y-5">
                    {day.phrases.map((p: any, j: number) => (
                      <div key={j} className="flex justify-between items-center p-5 bg-gradient-to-r from-slate-50 to-white rounded-3xl border border-slate-100 group hover:shadow-md transition-all">
                        <div className="flex-1">
                          <p className="font-black text-xl text-slate-800 mb-1">{p.translated}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-sky-100 text-sky-600 text-[10px] font-black rounded uppercase tracking-tighter">Prononcer</span>
                            <p className="text-sky-500 font-bold text-sm italic">{p.pronunciation}</p>
                          </div>
                          <p className="text-slate-300 text-xs mt-1 font-medium italic">({p.original})</p>
                        </div>
                        <button 
                          onClick={() => speak(p.translated)} 
                          className="ml-4 bg-orange-100 hover:bg-orange-200 text-orange-600 p-4 rounded-2xl shadow-inner transition-transform active:scale-90"
                          title="Écouter la prononciation"
                        >
                          <span className="text-2xl">🔊</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <footer className="mt-12 text-center text-sky-900/30 text-xs font-bold uppercase tracking-widest">
        Made with ☀️ for u
      </footer>
    </main>
  );
}