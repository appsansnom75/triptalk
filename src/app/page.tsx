"use client";
import { useState, useMemo } from 'react';

// --- CONFIGURATION DES DONNÉES ---
const languages = [
  { name: "Anglais", code: "en", flag: "🇬🇧", desc: "Global Bridge" },
  { name: "Espagnol", code: "es", flag: "🇪🇸", desc: "Vibrante & Social" },
  { name: "Italien", code: "it", flag: "🇮🇹", desc: "Stile & Passione" },
  { name: "Japonais", code: "ja", flag: "🇯🇵", desc: "Respect & Tradition" },
  { name: "Portugais", code: "pt", flag: "🇵🇹", desc: "Calor & Ritmo" },
  { name: "Arabe", code: "ar", flag: "🇲🇦", desc: "Poésie & Accueil" }
];

const categories = [
  { id: "essentials", label: "Bases", icon: "✨" },
  { id: "transport", label: "Mobilité", icon: "🚕" },
  { id: "food", label: "Gastronomie", icon: "🍝" },
  { id: "hotel", label: "Séjour", icon: "🏨" },
  { id: "shopping", label: "Achats", icon: "💸" },
  { id: "emergency", label: "Secours", icon: "🆘" }
];

const survivalData: Record<string, any> = {
  "en": {
    essentials: [
      { fr: "Bonjour", tr: "Hello", ph: "Hélo" },
      { fr: "S'il vous plaît", tr: "Please", ph: "Pliz" },
      { fr: "Merci beaucoup", tr: "Thank you so much", ph: "Tanc you so motch" },
      { fr: "Comment ça va ?", tr: "How are you?", ph: "Haou are you" },
      { fr: "Je ne comprends pas", tr: "I don't understand", ph: "Aïe donnt onndeur-stannd" },
      { fr: "Parlez-vous français ?", tr: "Do you speak French?", ph: "Dou you spik frentch" },
      { fr: "Je m'appelle...", tr: "My name is...", ph: "Maï né-ime iz" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Where is the taxi?", ph: "Wère iz ze taksi" },
      { fr: "La gare la plus proche", tr: "The nearest station", ph: "Ze nir-est sté-cheun" },
      { fr: "À droite / À gauche", tr: "Right / Left", ph: "Raït / Left" },
      { fr: "Tout droit", tr: "Straight ahead", ph: "Stré-ite a-hed" },
      { fr: "Où sont les toilettes ?", tr: "Where are the toilets?", ph: "Wère are ze toïlettes" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { fr: "C'est délicieux", tr: "It's delicious", ph: "Its délicheu-ce" },
      { fr: "Eau plate / pétillante", tr: "Still / Sparkling water", ph: "Stil / Sparking woteur" }
    ],
    hotel: [
      { fr: "Le Wi-Fi ?", tr: "The Wi-Fi password?", ph: "Ze waï-faï pass-weurd" },
      { fr: "Serviettes propres", tr: "Clean towels", ph: "Kline taou-els" },
      { fr: "Check-out ?", tr: "What time is check-out?", ph: "Wote taïme iz tchek-aout" }
    ],
    shopping: [
      { fr: "Combien ça coûte ?", tr: "How much is it?", ph: "Haou motch iz it" },
      { fr: "C'est trop cher", tr: "It's too expensive", ph: "Its tou ex-penn-siv" },
      { fr: "Puis-je payer par carte ?", tr: "Can I pay by card?", ph: "Kanne aï pé baï card" }
    ],
    emergency: [
      { fr: "Aidez-moi !", tr: "Help me!", ph: "Helpe mi" },
      { fr: "Hôpital", tr: "Hospital", ph: "O-spi-teul" },
      { fr: "Appelez la police", tr: "Call the police", ph: "Col ze poliss" }
    ]
  },
  "es": {
    essentials: [
      { fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { fr: "Merci beaucoup", tr: "Muchas gracias", ph: "Moutcha-ss grassia-ss" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" },
      { fr: "Comment ça va ?", tr: "¿Cómo estás?", ph: "Como essta-ss" },
      { fr: "Je ne comprends pas", tr: "No entiendo", ph: "No enntienndo" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" },
      { fr: "À gauche / À droite", tr: "Izquierda / Derecha", ph: "Iss-ki-erda / dé-rétcha" },
      { fr: "Où sont les toilettes ?", tr: "¿Dónde están los baños?", ph: "Donndé esstane loss bagnoss" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "La cuenta por favor", ph: "La kouennta por fabor" },
      { fr: "C'est délicieux", tr: "Está muy rico", ph: "Essta mouy riko" },
      { fr: "Santé !", tr: "¡Salud!", ph: "Salou-de" }
    ],
    hotel: [
      { fr: "Le Wi-Fi", tr: "El Wi-Fi", ph: "El waï-faï" },
      { fr: "La clé", tr: "La llave", ph: "La yabé" }
    ],
    shopping: [
      { fr: "Combien ?", tr: "¿Cuánto cuesta?", ph: "Kouannto kouessta" },
      { fr: "C'est cher", tr: "Es caro", ph: "Ess karo" }
    ],
    emergency: [
      { fr: "Au secours !", tr: "¡Socorro!", ph: "Sokorro" },
      { fr: "Police", tr: "Policía", ph: "Polissia" }
    ]
  }
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>("essentials");
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);

  const selectedLang = languages.find(l => l.code === target);
  
  // Filtrage intelligent
  const filteredData = useMemo(() => {
    if (!target) return {};
    const langData = survivalData[target] || survivalData["en"];
    if (!search) return langData;

    const filtered: any = {};
    Object.keys(langData).forEach(cat => {
      const matches = langData[cat].filter((p: any) => 
        p.fr.toLowerCase().includes(search.toLowerCase()) || 
        p.tr.toLowerCase().includes(search.toLowerCase())
      );
      if (matches.length > 0) filtered[cat] = matches;
    });
    return filtered;
  }, [target, search]);

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = target || 'en';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#121212] text-white' : 'bg-[#FAF9F6] text-[#2D2D2D]'} p-4 md:p-8 font-sans`}>
      <div className="max-w-md mx-auto">
        
        {/* Top Control Bar */}
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-600 animate-pulse" />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Live Survival Kit</span>
            </div>
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-xl transition-all ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-white shadow-sm text-slate-400'}`}
            >
                {isDark ? '☀️' : '🌙'}
            </button>
        </div>

        <header className="text-center mb-10">
          <h1 className={`text-6xl font-black tracking-tighter italic ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
            TRIPTALK<span className="text-orange-600 not-italic">.</span>
          </h1>
        </header>

        {!showPlan ? (
          <div className="grid gap-3 animate-in fade-in duration-500">
            <p className="text-[10px] font-black uppercase text-center mb-4 text-orange-600/60 tracking-[0.4em]">Séléctionnez une destination</p>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setTarget(lang.code); setShowPlan(true); }}
                className={`group flex items-center gap-4 p-5 rounded-[2rem] transition-all border ${isDark ? 'bg-slate-800/50 border-slate-700 hover:bg-orange-600' : 'bg-white border-slate-100 shadow-sm hover:bg-[#1A1A1A] hover:text-white hover:-translate-y-1'}`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                <div className="text-left">
                  <p className="text-lg font-bold leading-none">{lang.name}</p>
                  <p className={`text-[9px] font-bold mt-1 uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-400 group-hover:text-slate-500'}`}>{lang.desc}</p>
                </div>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-all font-black text-xl mr-2">→</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
            {/* Nav Bar Sticky */}
            <div className={`sticky top-2 z-30 space-y-4 ${isDark ? 'bg-[#121212]/90' : 'bg-[#FAF9F6]/90'} backdrop-blur-md pb-4`}>
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-white shadow-sm'}`}>
                    <button onClick={() => {setShowPlan(false); setSearch("");}} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg transition-colors ${isDark ? 'bg-slate-700 hover:bg-orange-600' : 'bg-[#F5F5F0] hover:bg-orange-600 hover:text-white'}`}>←</button>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{selectedLang?.flag}</span>
                        <span className="font-black text-[11px] uppercase tracking-widest">{selectedLang?.name}</span>
                    </div>
                    <div className="w-10"></div>
                </div>

                {/* Search Bar - LA nouveauté */}
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Rechercher une phrase..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`w-full p-4 pl-12 rounded-2xl text-sm font-bold outline-none transition-all border ${isDark ? 'bg-slate-800 border-slate-700 focus:border-orange-600' : 'bg-white border-slate-100 shadow-sm focus:border-orange-600'}`}
                    />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                </div>
            </div>

            <div className="space-y-3">
              {categories.map((cat) => (
                filteredData[cat.id] && (
                    <div key={cat.id} className={`rounded-[1.8rem] border overflow-hidden shadow-sm transition-all ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-100'}`}>
                        <button 
                            onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
                            className={`w-full flex items-center justify-between p-5 font-bold transition-all ${openCat === cat.id ? (isDark ? 'bg-orange-600 text-white' : 'bg-[#1A1A1A] text-white') : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-3">
                            <span className="text-xl">{cat.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cat.label}</span>
                            </div>
                            <span className="text-xl font-light">{openCat === cat.id ? '−' : '+'}</span>
                        </button>

                        {openCat === cat.id && (
                            <div className={`p-3 space-y-2 animate-in slide-in-from-top-2 duration-300 ${isDark ? 'bg-slate-900/50' : 'bg-[#FBFBFA]'}`}>
                            {filteredData[cat.id]?.map((p: any, i: number) => (
                                <div key={i} className={`p-5 rounded-[1.4rem] border flex items-center justify-between gap-4 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-50 hover:border-orange-100 shadow-sm'}`}>
                                <div className="flex-1">
                                    <p className={`text-[9px] font-black uppercase mb-2 tracking-wider leading-none ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{p.fr}</p>
                                    <h4 className={`text-xl font-[900] italic leading-tight mb-3 tracking-tight ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>{p.tr}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter ${isDark ? 'bg-orange-600/20 text-orange-400' : 'bg-orange-50 text-orange-700'}`}>Prononcer</span>
                                        <span className={`text-xs font-bold italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{p.ph}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => speak(p.tr)} 
                                    className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl active:scale-90 transition-all shadow-md ${isDark ? 'bg-orange-600 text-white' : 'bg-[#1A1A1A] text-white hover:bg-orange-600'}`}
                                >
                                    🔊
                                </button>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                )
              ))}
              
              {Object.keys(filteredData).length === 0 && (
                  <div className="py-20 text-center opacity-40 italic">
                      Aucun résultat pour "{search}"...
                  </div>
              )}
            </div>

            <footer className="py-12 text-center">
              <button onClick={() => {setShowPlan(false); setSearch("");}} className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-orange-600 transition-colors">
                Terminer le voyage
              </button>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}