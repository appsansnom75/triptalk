"use client";
import { useState } from 'react';

// Liste limitée à 6 langues pour plus de clarté
const languages = [
  { name: "Anglais", code: "en" },
  { name: "Espagnol", code: "es" },
  { name: "Italien", code: "it" },
  { name: "Japonais", code: "ja" },
  { name: "Portugais", code: "pt" },
  { name: "Arabe", code: "ar" }
];

// Base de données locale (Le "Cerveau" de ton appli)
const survivalData: Record<string, any> = {
  "en": [
    { original: "Bonjour / Salut", translated: "Hello / Hi", pronunciation: "Hélo / Haï" },
    { original: "Où est le taxi ?", translated: "Where is the taxi?", pronunciation: "Wère iz ze taksi" },
    { original: "L'addition s'il vous plaît", translated: "The bill please", pronunciation: "Ze bil pliz" },
    { original: "Pouvez-vous m'aider ?", translated: "Can you help me?", pronunciation: "Kanne you helpe mi" }
  ],
  "es": [
    { original: "Bonjour / Salut", translated: "Hola", pronunciation: "Ola" },
    { original: "Où est le taxi ?", translated: "¿Dónde está el taxi?", pronunciation: "Donndé essta el taksi" },
    { original: "L'addition s'il vous plaît", translated: "La cuenta por favor", pronunciation: "La kouennta por fabor" },
    { original: "Pouvez-vous m'aider ?", translated: "¿Puedes ayudarme?", pronunciation: "Pouédess ayoudarmé" }
  ],
  "it": [
    { original: "Bonjour / Salut", translated: "Buongiorno / Ciao", pronunciation: "Bouone-djor-no / Tchao" },
    { original: "Où est le taxi ?", translated: "Dov'è il taxi?", pronunciation: "Dov-è il taksi" },
    { original: "L'addition s'il vous plaît", translated: "Il conto per favore", pronunciation: "Il konnt-o per favoré" },
    { original: "Pouvez-vous m'aider ?", translated: "Puoi aiutarmi?", pronunciation: "Pou-oï ayou-tar-mi" }
  ],
  "ja": [
    { original: "Bonjour", translated: "Konnichiwa", pronunciation: "Kon-ni-tchi-wa" },
    { original: "Où est le taxi ?", translated: "Takushī wa doko desu ka?", pronunciation: "Takouchi wa doko dess ka" },
    { original: "L'addition s'il vous plaît", translated: "O-kaikei o onegaishimasu", pronunciation: "O-kaï-keï o oné-ga-ï-chi-mass" },
    { original: "Merci beaucoup", translated: "Arigatō gozaimasu", pronunciation: "A-ri-ga-to go-za-ï-mass" }
  ],
  "pt": [
    { original: "Bonjour / Salut", translated: "Olá / Oi", pronunciation: "O-la / O-ï" },
    { original: "Où est le taxi ?", translated: "Onde fica o táxi?", pronunciation: "Onndé fika ou taksi" },
    { original: "L'addition s'il vous plaît", translated: "A conta, por favor", pronunciation: "A konnt-a por fabor" },
    { original: "S'il vous plaît", translated: "Por favor", pronunciation: "Por fa-bor" }
  ],
  "ar": [
    { original: "Bonjour / Salut", translated: "Marhaba / Salam", pronunciation: "Mar-ha-ba / Sa-lam" },
    { original: "Où est le taxi ?", translated: "Ayna al-taxi?", pronunciation: "Ay-na al-taksi" },
    { original: "L'addition s'il vous plaît", translated: "Al-hisab min fadlak", pronunciation: "Al-hi-sab mine fad-lak" },
    { original: "Merci", translated: "Shukran", pronunciation: "Chou-krane" }
  ]
};

export default function Triptalk() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const targetCode = formData.get("targetLang") as string;
    const targetName = languages.find(l => l.code === targetCode)?.name;

    // Simulation de chargement pour l'expérience utilisateur
    setTimeout(() => {
      const phrases = survivalData[targetCode] || [];

      setPlan({
        planTitle: `Guide de survie : ${targetName} 🌴`,
        days: [
          { 
            title: "JOUR 1 : Arrivée & Premiers pas", 
            phrases: phrases.slice(0, 2) 
          },
          { 
            title: "JOUR 2 : Restaurant & Vie locale", 
            phrases: phrases.slice(2, 4) 
          }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 p-6 md:p-12 font-sans selection:bg-orange-200">
      <div className="max-w-xl mx-auto">
        
        <header className="text-center mb-10 animate-in fade-in duration-1000">
          <span className="inline-block px-4 py-1 bg-white/50 backdrop-blur-sm rounded-full text-orange-600 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
            ☀️ Mode Ultra-Rapide Activé
          </span>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 tracking-tighter mb-2">
            Triptalk
          </h1>
          <p className="text-sky-800/60 font-medium italic">Ton kit de survie instantané sans bug 🌴</p>
        </header>

        {!plan ? (
          <form onSubmit={generatePlan} className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl shadow-orange-200/50 space-y-8 border border-white animate-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-sm font-black text-orange-400 ml-4 mb-2 block uppercase tracking-tighter">Je parle</label>
                <select name="sourceLang" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-orange-300 shadow-inner text-slate-700 font-bold appearance-none cursor-pointer">
                  <option value="fr">Français</option>
                </select>
                <div className="absolute right-5 bottom-5 pointer-events-none text-orange-300 text-xs">▼</div>
              </div>

              <div className="relative group">
                <label className="text-sm font-black text-sky-400 ml-4 mb-2 block uppercase tracking-tighter">Destination</label>
                <select name="targetLang" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-sky-300 shadow-inner text-slate-700 font-bold appearance-none cursor-pointer">
                  {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
                <div className="absolute right-5 bottom-5 pointer-events-none text-sky-300 text-xs">▼</div>
              </div>

              <div className="relative group">
                <label className="text-sm font-black text-amber-400 ml-4 mb-2 block uppercase tracking-tighter">Durée du séjour</label>
                <select name="time" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-amber-300 shadow-inner text-slate-700 font-bold appearance-none cursor-pointer">
                  <option value="24h">🚀 Demain (Mode Panique !)</option>
                  <option value="1semaine">📅 Dans 1 semaine</option>
                </select>
                <div className="absolute right-5 bottom-5 pointer-events-none text-amber-300 text-xs">▼</div>
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-6 rounded-2xl font-black text-xl shadow-xl shadow-orange-200 hover:shadow-orange-300 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Génération... ⚡" : "C'EST PARTI ! 🥥"}
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
                      <div key={j} className="flex justify-between items-center p-5 bg-gradient-to-r from-slate-50 to-white rounded-3xl border border-slate-100 group">
                        <div className="flex-1">
                          <p className="font-black text-xl text-slate-800 mb-1">{p.translated}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-sky-100 text-sky-600 text-[10px] font-black rounded uppercase">Prononcer</span>
                            <p className="text-sky-500 font-bold text-sm italic">{p.pronunciation}</p>
                          </div>
                          <p className="text-slate-300 text-xs mt-1 font-medium italic">({p.original})</p>
                        </div>
                        <button 
                          onClick={() => speak(p.translated)} 
                          className="ml-4 bg-orange-100 hover:bg-orange-200 text-orange-600 p-4 rounded-2xl shadow-inner transition-transform active:scale-90"
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