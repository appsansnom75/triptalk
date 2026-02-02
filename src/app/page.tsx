"use client";
import { useState, useMemo } from 'react';

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
      { fr: "Merci", tr: "Thank you", ph: "Tanc you" },
      { fr: "Je ne comprends pas", tr: "I don't understand", ph: "Aï donnt onndeur-stannd" }
    ],
    transport: [{ fr: "Où est le taxi ?", tr: "Where is the taxi?", ph: "Wère iz ze taksi" }],
    food: [{ fr: "L'addition", tr: "The bill", ph: "Ze bil" }],
    hotel: [{ fr: "Le Wi-Fi", tr: "The Wi-Fi", ph: "Waï-Faï" }],
    shopping: [{ fr: "Le prix ?", tr: "How much?", ph: "Haou motch" }],
    emergency: [{ fr: "Aidez-moi", tr: "Help me", ph: "Helpe mi" }]
  },
  "es": {
    essentials: [
      { fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { fr: "Merci", tr: "Gracias", ph: "Grassia-ss" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" }
    ],
    transport: [{ fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" }],
    food: [{ fr: "L'addition", tr: "La cuenta", ph: "La kouennta" }],
    hotel: [{ fr: "Le Wi-Fi", tr: "El Wi-Fi", ph: "El waï-faï" }],
    shopping: [{ fr: "Combien ?", tr: "¿Cuánto cuesta?", ph: "Kouannto kouessta" }],
    emergency: [{ fr: "Au secours", tr: "¡Socorro!", ph: "Sokorro" }]
  },
  "it": {
    essentials: [
      { fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
      { fr: "Merci beaucoup", tr: "Grazie mille", ph: "Grat-sié mil-lé" },
      { fr: "S'il vous plaît", tr: "Per favore", ph: "Per fa-vor-é" },
      { fr: "Comment ça va ?", tr: "Come sta?", ph: "Ko-mé essta" },
      { fr: "Je m'appelle...", tr: "Mi chiamo...", ph: "Mi kia-mo" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" },
      { fr: "La gare", tr: "La stazione", ph: "La stat-si-o-né" },
      { fr: "À gauche / À droite", tr: "A sinistra / destra", ph: "Si-nis-tra / des-tra" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "Il conto, per favore", ph: "Il konn-to per fa-vor-é" },
      { fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" },
      { fr: "Un café s'il vous plaît", tr: "Un caffè per favore", ph: "Oun kaf-é" }
    ],
    hotel: [
      { fr: "Une chambre", tr: "Una camera", ph: "Ouna ka-mé-ra" },
      { fr: "La clé", tr: "La chiave", ph: "La kia-vé" }
    ],
    shopping: [
      { fr: "C'est cher", tr: "È caro", ph: "È ka-ro" },
      { fr: "Combien ça coûte ?", tr: "Quanto costa?", ph: "Kouan-to kos-ta" }
    ],
    emergency: [
      { fr: "Au secours !", tr: "Aiuto!", ph: "A-you-to" },
      { fr: "Médecin", tr: "Un medico", ph: "Oun mé-di-ko" }
    ]
  },
  "ja": {
    essentials: [
      { fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { fr: "Merci", tr: "Arigatō", ph: "A-ri-ga-to" },
      { fr: "S'il vous plaît", tr: "Onegaishimasu", ph: "O-né-ga-ï-chi-mass" }
    ],
    transport: [{ fr: "Où est le taxi ?", tr: "Takushī wa doko?", ph: "Takouchi wa doko" }],
    food: [{ fr: "L'addition", tr: "O-kaikei", ph: "O-kaï-keï" }],
    hotel: [{ fr: "Chambre", tr: "Heya", ph: "Hé-ya" }],
    shopping: [{ fr: "Le prix ?", tr: "Ikura desu ka?", ph: "I-kou-ra dess ka" }],
    emergency: [{ fr: "Aidez-moi", tr: "Tasukete!", ph: "Ta-sou-ké-té" }]
  },
  "pt": {
    essentials: [
      { fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { fr: "Merci", tr: "Obrigado", ph: "O-bri-ga-dou" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fa-bor" }
    ],
    transport: [{ fr: "Taxi", tr: "Táxi", ph: "Taksi" }],
    food: [{ fr: "L'addition", tr: "A conta", ph: "A konnt-a" }],
    hotel: [{ fr: "Chambre", tr: "Quarto", ph: "Kouar-tou" }],
    shopping: [{ fr: "Combien ?", tr: "Quanto custa?", ph: "Kouan-tou kous-ta" }],
    emergency: [{ fr: "Au secours", tr: "Socorro!", ph: "Sou-ko-rou" }]
  },
  "ar": {
    essentials: [
      { fr: "Bonjour", tr: "Marhaba", ph: "Mar-ha-ba" },
      { fr: "Merci", tr: "Shukran", ph: "Chou-krane" }
    ],
    transport: [{ fr: "Taxi", tr: "Taxi", ph: "Taksi" }],
    food: [{ fr: "L'addition", tr: "Al-hisab", ph: "Al-hi-sab" }],
    hotel: [{ fr: "Hôtel", tr: "Funduq", ph: "Foun-douk" }],
    shopping: [{ fr: "Prix", tr: "Al-thaman", ph: "Al-ta-mane" }],
    emergency: [{ fr: "Aidez-moi", tr: "Sa'iduni", ph: "Sa-i-dou-ni" }]
  }
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>("essentials");
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);

  const selectedLang = languages.find(l => l.code === target);
  
  const filteredData = useMemo(() => {
    if (!target) return {};
    const langData = survivalData[target];
    if (!langData) return {};
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
        
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Live Survival Kit</span>
            </div>
            <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-xl transition-all ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-white shadow-sm text-slate-400'}`}>
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
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
            <div className={`sticky top-2 z-30 space-y-4 ${isDark ? 'bg-[#121212]/95' : 'bg-[#FAF9F6]/95'} backdrop-blur-md pb-4`}>
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-white shadow-sm'}`}>
                    <button onClick={() => {setShowPlan(false); setSearch("");}} className="w-10 h-10 flex items-center justify-center bg-[#F5F5F0] dark:bg-slate-700 rounded-xl font-bold">←</button>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{selectedLang?.flag}</span>
                        <span className="font-black text-[11px] uppercase tracking-widest">{selectedLang?.name}</span>
                    </div>
                    <div className="w-10"></div>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full p-4 pl-12 rounded-2xl text-sm font-bold outline-none border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`} />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                </div>
            </div>

            <div className="space-y-3">
              {categories.map((cat) => (
                filteredData[cat.id] && (
                    <div key={cat.id} className={`rounded-[1.8rem] border overflow-hidden ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-100'}`}>
                        <button onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)} className={`w-full flex items-center justify-between p-5 font-bold ${openCat === cat.id ? (isDark ? 'bg-orange-600' : 'bg-[#1A1A1A] text-white') : 'text-slate-500'}`}>
                            <div className="flex items-center gap-3">
                                <span>{cat.icon}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                            </div>
                            <span>{openCat === cat.id ? '−' : '+'}</span>
                        </button>
                        {openCat === cat.id && (
                            <div className="p-3 space-y-2">
                            {filteredData[cat.id]?.map((p: any, i: number) => (
                                <div key={i} className={`p-5 rounded-[1.4rem] border flex items-center justify-between gap-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-50 shadow-sm'}`}>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{p.fr}</p>
                                        <h4 className="text-xl font-[900] italic leading-tight mb-2 tracking-tight">{p.tr}</h4>
                                        <span className="text-xs font-bold text-orange-600 italic">{p.ph}</span>
                                    </div>
                                    <button onClick={() => speak(p.tr)} className="w-11 h-11 bg-orange-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg active:scale-90 transition-transform">🔊</button>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                )
              ))}
            </div>
            <footer className="py-10 text-center">
              <button onClick={() => {setShowPlan(false); setSearch("");}} className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Changer de langue</button>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}