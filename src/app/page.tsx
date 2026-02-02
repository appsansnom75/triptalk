"use client";
import { useState, useMemo } from 'react';

const languages = [
  { name: "Anglais", code: "en-US", flag: "🇬🇧", desc: "Global Bridge" },
  { name: "Espagnol", code: "es-ES", flag: "🇪🇸", desc: "Vibrante & Social" },
  { name: "Italien", code: "it-IT", flag: "🇮🇹", desc: "Stile & Passione" },
  { name: "Japonais", code: "ja-JP", flag: "🇯🇵", desc: "Respect & Tradition" },
  { name: "Portugais", code: "pt-PT", flag: "🇵🇹", desc: "Calor & Ritmo" },
  { name: "Arabe", code: "ar-SA", flag: "🇲🇦", desc: "Poésie & Accueil" }
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
  "en-US": {
    essentials: [
      { id: "en1", fr: "Bonjour", tr: "Hello", ph: "Hélo" },
      { id: "en2", fr: "S'il vous plaît", tr: "Please", ph: "Pliz" },
      { id: "en3", fr: "Merci beaucoup", tr: "Thank you so much", ph: "Tanc you so motch" },
      { id: "en4", fr: "Comment ça va ?", tr: "How are you?", ph: "Haou are you" },
      { id: "en5", fr: "Je ne comprends pas", tr: "I don't understand", ph: "Aï donnt onndeur-stannd" },
      { id: "en6", fr: "Parlez-vous français ?", tr: "Do you speak French?", ph: "Dou you spik frentch" },
      { id: "en7", fr: "Comment dit-on... ?", tr: "How do you say...?", ph: "Haou dou you sé" },
      { id: "en8", fr: "Je m'appelle...", tr: "My name is...", ph: "Maï né-ime iz" }
    ],
    transport: [
      { id: "en9", fr: "Où est le taxi ?", tr: "Where is the taxi?", ph: "Wère iz ze taksi" },
      { id: "en10", fr: "La gare la plus proche", tr: "The nearest station", ph: "Ze nir-est sté-cheun" },
      { id: "en11", fr: "À droite / À gauche", tr: "Right / Left", ph: "Raït / Left" },
      { id: "en12", fr: "Tout droit", tr: "Straight ahead", ph: "Stré-ite a-hed" },
      { id: "en13", fr: "Où sont les toilettes ?", tr: "Where are the toilets?", ph: "Wère are ze toïlettes" }
    ],
    food: [
      { id: "en14", fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { id: "en15", fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { id: "en16", fr: "C'est délicieux", tr: "It's delicious", ph: "Its délicheu-ce" },
      { id: "en17", fr: "Santé !", tr: "Cheers!", ph: "Tchirs" },
      { id: "en18", fr: "J'ai une allergie", tr: "I have an allergy", ph: "Aï hav anne alé-rdji" }
    ],
    hotel: [
      { id: "en19", fr: "Le code Wi-Fi ?", tr: "The Wi-Fi password?", ph: "Ze waï-faï pass-weurd" },
      { id: "en20", fr: "Petit-déjeuner", tr: "Breakfast", ph: "Breuk-feust" },
      { id: "en21", fr: "Serviettes propres", tr: "Clean towels", ph: "Kline taou-els" }
    ],
    shopping: [
      { id: "en22", fr: "Combien ça coûte ?", tr: "How much is it?", ph: "Haou motch iz it" },
      { id: "en23", fr: "C'est trop cher", tr: "It's too expensive", ph: "Its tou ex-penn-siv" }
    ],
    emergency: [
      { id: "en24", fr: "Aidez-moi !", tr: "Help me!", ph: "Helpe mi" },
      { id: "en25", fr: "Où est l'hôpital ?", tr: "Where is the hospital?", ph: "Wère iz ze ospital" },
      { id: "en26", fr: "Appelez la police", tr: "Call the police", ph: "Col ze poliss" }
    ]
  },
  "es-ES": {
    essentials: [
      { id: "es1", fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { id: "es2", fr: "Merci beaucoup", tr: "Muchas gracias", ph: "Moutcha-ss grassia-ss" },
      { id: "es3", fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" },
      { id: "es4", fr: "Comment ça va ?", tr: "¿Cómo estás?", ph: "Como essta-ss" },
      { id: "es5", fr: "Je ne comprends pas", tr: "No entiendo", ph: "No enntienndo" }
    ],
    transport: [
      { id: "es6", fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" },
      { id: "es7", fr: "La gare", tr: "La estación", ph: "La essta-ssion" },
      { id: "es8", fr: "Tout droit", tr: "Todo recto", ph: "Todo rek-to" },
      { id: "es9", fr: "À gauche / À droite", tr: "Izquierda / Derecha", ph: "Iss-ki-erda / dé-rétcha" }
    ],
    food: [
      { id: "es10", fr: "L'addition", tr: "La cuenta por favor", ph: "La kouennta por fabor" },
      { id: "es11", fr: "C'est délicieux", tr: "Está muy rico", ph: "Essta mouy riko" },
      { id: "es12", fr: "Santé !", tr: "¡Salud!", ph: "Salou-de" }
    ],
    hotel: [
      { id: "es13", fr: "La clé", tr: "La llave", ph: "La yabé" },
      { id: "es14", fr: "Le Wi-Fi", tr: "El Wi-Fi", ph: "El waï-faï" }
    ],
    shopping: [
      { id: "es15", fr: "Combien ça coûte ?", tr: "¿Cuánto cuesta?", ph: "Kouannto kouessta" },
      { id: "es16", fr: "C'est trop cher", tr: "Es muy caro", ph: "Ess mouy karo" }
    ],
    emergency: [
      { id: "es17", fr: "Aidez-moi", tr: "Ayúdeme", ph: "Ayoudémé" },
      { id: "es18", fr: "Au secours !", tr: "¡Socorro!", ph: "Sokorro" }
    ]
  },
  "it-IT": {
    essentials: [
      { id: "it1", fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
      { id: "it2", fr: "Salut", tr: "Ciao", ph: "Tchao" },
      { id: "it3", fr: "Merci beaucoup", tr: "Grazie mille", ph: "Grat-sié mil-lé" },
      { id: "it4", fr: "S'il vous plaît", tr: "Per favore", ph: "Per fa-vor-é" },
      { id: "it5", fr: "Comment ça va ?", tr: "Come sta?", ph: "Ko-mé essta" },
      { id: "it6", fr: "Je ne comprends pas", tr: "Non capisco", ph: "Non ka-pis-ko" },
      { id: "it7", fr: "Je m'appelle...", tr: "Mi chiamo...", ph: "Mi kia-mo" }
    ],
    transport: [
      { id: "it8", fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" },
      { id: "it9", fr: "La gare", tr: "La stazione", ph: "La stat-si-o-né" },
      { id: "it10", fr: "À gauche / À droite", tr: "A sinistra / destra", ph: "A si-nis-tra / des-tra" },
      { id: "it11", fr: "Tout droit", tr: "Sempre dritto", ph: "Sèm-pré drit-to" },
      { id: "it12", fr: "Où sont les toilettes ?", tr: "Dove sono i bagni?", ph: "Do-vé so-no i ba-nyi" }
    ],
    food: [
      { id: "it13", fr: "L'addition s'il vous plaît", tr: "Il conto, per favore", ph: "Il konn-to per fa-vor-é" },
      { id: "it14", fr: "Une table pour deux", tr: "Un tavolo per due", ph: "Oun ta-vo-lo per dou-é" },
      { id: "it15", fr: "Un café", tr: "Un caffè", ph: "Oun kaf-é" },
      { id: "it16", fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" },
      { id: "it17", fr: "Santé !", tr: "Salute!", ph: "Sa-lou-té" }
    ],
    hotel: [
      { id: "it18", fr: "Une chambre", tr: "Una camera", ph: "Ouna ka-mé-ra" },
      { id: "it19", fr: "La clé", tr: "La chiave", ph: "La kia-vé" },
      { id: "it20", fr: "Wi-Fi", tr: "Il Wi-Fi", ph: "Il waï-faï" }
    ],
    shopping: [
      { id: "it21", fr: "Combien ça coûte ?", tr: "Quanto costa?", ph: "Kouan-to kos-ta" },
      { id: "it22", fr: "C'est cher", tr: "È caro", ph: "È ka-ro" },
      { id: "it23", fr: "Puis-je payer par carte ?", tr: "Posso pagare con carta?", ph: "Pos-so pa-ga-ré kon kar-ta" }
    ],
    emergency: [
      { id: "it24", fr: "Au secours !", tr: "Aiuto!", ph: "A-you-to" },
      { id: "it25", fr: "Un médecin", tr: "Un medico", ph: "Oun mé-di-ko" },
      { id: "it26", fr: "Appelez la police", tr: "Chiami la polizia", ph: "Kia-mi la po-li-tsia" }
    ]
  },
  "ja-JP": {
    essentials: [
      { id: "ja1", fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { id: "ja2", fr: "Merci", tr: "Arigatō", ph: "A-ri-ga-to" },
      { id: "ja3", fr: "S'il vous plaît", tr: "Onegaishimasu", ph: "O-né-ga-ï-chi-mass" },
      { id: "ja4", fr: "Pardon", tr: "Sumimasen", ph: "Sou-mi-ma-senn" }
    ],
    transport: [{ id: "ja5", fr: "Où est le taxi ?", tr: "Takushī wa doko?", ph: "Takouchi wa doko" }],
    food: [{ id: "ja6", fr: "L'addition", tr: "O-kaikei", ph: "O-kaï-keï" }],
    hotel: [{ id: "ja7", fr: "Wi-Fi", tr: "Waï-faï", ph: "Wa-ï-fa-ï" }],
    shopping: [{ id: "ja8", fr: "Combien ?", tr: "Ikura desu ka?", ph: "I-kou-ra dess ka" }],
    emergency: [{ id: "ja9", fr: "Aidez-moi", tr: "Tasukete!", ph: "Ta-sou-ké-té" }]
  },
  "pt-PT": {
    essentials: [
      { id: "pt1", fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { id: "pt2", fr: "Merci", tr: "Obrigado", ph: "O-bri-ga-dou" },
      { id: "pt3", fr: "S'il vous plaît", tr: "Por favor", ph: "Por fa-bor" }
    ],
    transport: [{ id: "pt4", fr: "Taxi", tr: "Táxi", ph: "Taksi" }],
    food: [{ id: "pt5", fr: "L'addition", tr: "A conta", ph: "A konnt-a" }],
    hotel: [{ id: "pt6", fr: "Chambre", tr: "Quarto", ph: "Kouar-tou" }],
    shopping: [{ id: "pt7", fr: "Combien ?", tr: "Quanto custa?", ph: "Kouan-tou kous-ta" }],
    emergency: [{ id: "pt8", fr: "Au secours", tr: "Socorro!", ph: "Sou-ko-rou" }]
  },
  "ar-SA": {
    essentials: [
      { id: "ar1", fr: "Bonjour", tr: "Marhaba", ph: "Mar-ha-ba" },
      { id: "ar2", fr: "Merci", tr: "Shukran", ph: "Chou-krane" },
      { id: "ar3", fr: "S'il vous plaît", tr: "Min fadlak", ph: "Mine fad-lak" }
    ],
    transport: [{ id: "ar4", fr: "Où est le taxi ?", tr: "Ayna al-taxi?", ph: "Ay-na al-tak-si" }],
    food: [{ id: "ar5", fr: "L'addition", tr: "Al-hisab", ph: "Al-hi-sab" }],
    hotel: [{ id: "ar6", fr: "Hôtel", tr: "Funduq", ph: "Foun-douk" }],
    shopping: [{ id: "ar7", fr: "Prix", tr: "Al-thaman", ph: "Al-ta-mane" }],
    emergency: [{ id: "ar8", fr: "Aidez-moi", tr: "Sa'iduni", ph: "Sa-i-dou-ni" }]
  }
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>("essentials");
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const selectedLang = languages.find(l => l.code === target);

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = target || 'en-US';
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.lang.includes(target.split('-')[0]) && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('alice') || v.name.toLowerCase().includes('google it') || v.name.toLowerCase().includes('elsa')));
      if (femaleVoice) utterance.voice = femaleVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleFav = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredData = useMemo(() => {
    if (!target) return {};
    const langData = survivalData[target] || survivalData["en-US"];
    let result: any = {};
    Object.keys(langData).forEach(cat => {
      const matches = langData[cat].filter((p: any) => p.fr.toLowerCase().includes(search.toLowerCase()) || p.tr.toLowerCase().includes(search.toLowerCase()));
      if (matches.length > 0) result[cat] = matches;
    });
    return result;
  }, [target, search]);

  return (
    <main className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-[#121212] text-white' : 'bg-[#FAF9F6] text-[#2D2D2D]'} p-4 md:p-8 font-sans`}>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-600">Female Voice Active 🎙️</span>
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border dark:border-slate-700">{isDark ? '☀️' : '🌙'}</button>
        </div>

        {!showPlan ? (
          <div className="grid gap-3 animate-in fade-in duration-700">
            <h1 className="text-6xl font-[1000] italic text-center mb-10 tracking-tighter">TRIPTALK<span className="text-orange-600 not-italic">.</span></h1>
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => { setTarget(lang.code); setShowPlan(true); }} className={`group flex items-center gap-4 p-6 rounded-[2.5rem] border transition-all ${isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-orange-600' : 'bg-white border-slate-100 shadow-sm hover:bg-black hover:text-white hover:-translate-y-1'}`}>
                <span className="text-4xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                <div className="text-left"><p className="text-lg font-black leading-none">{lang.name}</p><p className="text-[9px] font-bold mt-1 uppercase tracking-widest opacity-50">{lang.desc}</p></div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
            <div className={`sticky top-2 z-30 space-y-3 ${isDark ? 'bg-[#121212]/95' : 'bg-[#FAF9F6]/95'} backdrop-blur-md pb-4`}>
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <button onClick={() => {setShowPlan(false); setSearch("");}} className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-xl font-bold">←</button>
                    <div className="flex items-center gap-2"><span className="text-xl">{selectedLang?.flag}</span><span className="font-black text-[11px] uppercase tracking-widest">{selectedLang?.name}</span></div>
                    <div className="w-10"></div>
                </div>
                <div className="relative">
                    <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full p-4 pl-12 rounded-2xl border outline-none focus:border-orange-600 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`} />
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                </div>
            </div>

            <div className="space-y-3 pb-10">
              {categories.map((cat) => (
                filteredData[cat.id] && (
                    <div key={cat.id} className={`rounded-[2rem] border overflow-hidden transition-all ${isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <button onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)} className={`w-full flex items-center justify-between p-5 font-bold transition-all ${openCat === cat.id ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>
                            <div className="flex items-center gap-3"><span>{cat.icon}</span><span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span></div>
                            <span className="text-2xl font-light">{openCat === cat.id ? '−' : '+'}</span>
                        </button>
                        {openCat === cat.id && (
                            <div className="p-3 space-y-2 animate-in slide-in-from-top-2">
                            {filteredData[cat.id]?.map((p: any) => (
                                <div key={p.id} className={`p-5 rounded-[1.6rem] border flex items-center justify-between gap-4 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-50'}`}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <button onClick={() => toggleFav(p.id)} className="text-lg leading-none transition-transform active:scale-150">{favorites.includes(p.id) ? '⭐' : '☆'}</button>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{p.fr}</p>
                                        </div>
                                        <h4 className="text-xl font-black italic tracking-tight leading-tight mb-2">{p.tr}</h4>
                                        <span className="text-xs text-orange-600 font-bold italic">{p.ph}</span>
                                    </div>
                                    <button onClick={() => speak(p.tr)} className="shrink-0 w-12 h-12 bg-[#1A1A1A] dark:bg-orange-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg active:scale-90 transition-all">🔊</button>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                )
              ))}
            </div>
            <footer className="py-6 text-center">
              <button onClick={() => {setShowPlan(false); setSearch("");}} className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-orange-600 transition-colors">Terminer le voyage</button>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}