"use client";
import { useState, useMemo, useEffect } from 'react';

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
      { id: "en13", fr: "Où est l'aéroport ?", tr: "Where is the airport?", ph: "Wère iz zi air-port" },
      { id: "en14", fr: "Un ticket s'il vous plaît", tr: "One ticket please", ph: "Wone tiquet pliz" },
      { id: "en15", fr: "Où sont les toilettes ?", tr: "Where are the toilets?", ph: "Wère are ze toïlettes" }
    ],
    food: [
      { id: "en16", fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { id: "en17", fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { id: "en18", fr: "Une bière s'il vous plaît", tr: "A beer please", ph: "Ey bir pliz" },
      { id: "en19", fr: "C'est délicieux", tr: "It's delicious", ph: "Its délicheu-ce" },
      { id: "en20", fr: "Santé !", tr: "Cheers!", ph: "Tchirs" },
      { id: "en21", fr: "J'ai une allergie", tr: "I have an allergy", ph: "Aï hav anne alé-rdji" }
    ],
    hotel: [
      { id: "en24", fr: "J'ai une réservation", tr: "I have a reservation", ph: "Aï hav ey réserva-cheun" },
      { id: "en25", fr: "Le code Wi-Fi ?", tr: "The Wi-Fi password?", ph: "Ze waï-faï pass-weurd" },
      { id: "en26", fr: "Petit-déjeuner", tr: "Breakfast", ph: "Breuk-feust" }
    ],
    shopping: [
      { id: "en29", fr: "Combien ça coûte ?", tr: "How much is it?", ph: "Haou motch iz it" },
      { id: "en30", fr: "C'est trop cher", tr: "It's too expensive", ph: "Its tou ex-penn-siv" }
    ],
    emergency: [
      { id: "en33", fr: "Aidez-moi !", tr: "Help me!", ph: "Helpe mi" },
      { id: "en34", fr: "Où est l'hôpital ?", tr: "Where is the hospital?", ph: "Wère iz ze ospital" }
    ]
  },
  "es-ES": {
    essentials: [
      { id: "es1", fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { id: "es2", fr: "Merci beaucoup", tr: "Muchas gracias", ph: "Moutcha-ss grassia-ss" },
      { id: "es3", fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" },
      { id: "es4", fr: "Comment ça va ?", tr: "¿Cómo estás?", ph: "Como essta-ss" }
    ],
    transport: [{ id: "es8", fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" }],
    food: [{ id: "es14", fr: "L'addition", tr: "La cuenta por favor", ph: "La kouennta por fabor" }],
    hotel: [{ id: "es21", fr: "Le Wi-Fi", tr: "El Wi-Fi", ph: "El waï-faï" }],
    shopping: [{ id: "es23", fr: "Combien ça coûte ?", tr: "¿Cuánto cuesta?", ph: "Kouannto kouessta" }],
    emergency: [{ id: "es28", fr: "Au secours !", tr: "¡Socorro!", ph: "Sokorro" }]
  },
  "it-IT": {
    essentials: [
      { id: "it1", fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
      { id: "it2", fr: "Salut", tr: "Ciao", ph: "Tchao" },
      { id: "it3", fr: "Merci beaucoup", tr: "Grazie mille", ph: "Grat-sié mil-lé" },
      { id: "it4", fr: "S'il vous plaît", tr: "Per favore", ph: "Per favoré" },
      { id: "it5", fr: "Comment ça va ?", tr: "Come sta?", ph: "Komé essta" },
      { id: "it6", fr: "Je ne comprends pas", tr: "Non capisco", ph: "Non ka-pis-ko" },
      { id: "it7", fr: "Je m'appelle...", tr: "Mi chiamo...", ph: "Mi kia-mo" }
    ],
    transport: [
      { id: "it8", fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" },
      { id: "it9", fr: "La gare", tr: "La stazione", ph: "La stat-si-oné" },
      { id: "it10", fr: "À gauche / À droite", tr: "A sinistra / destra", ph: "A si-nistra / des-tra" },
      { id: "it11", fr: "Tout droit", tr: "Sempre dritto", ph: "Sèm-pré drit-to" },
      { id: "it12", fr: "Toilettes", tr: "Dove sono i bagni?", ph: "Do-vé so-no i ba-nyi" }
    ],
    food: [
      { id: "it13", fr: "L'addition s'il vous plaît", tr: "Il conto per favore", ph: "Il konnt-o per favoré" },
      { id: "it14", fr: "Un café s'il vous plaît", tr: "Un caffè per favore", ph: "Oun kaf-é per favoré" },
      { id: "it15", fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" },
      { id: "it16", fr: "Santé !", tr: "Salute!", ph: "Sa-lou-té" }
    ],
    hotel: [
      { id: "it18", fr: "La clé", tr: "La chiave", ph: "La kia-vé" },
      { id: "it19", fr: "Wi-Fi", tr: "Il Wi-Fi", ph: "Il waï-faï" }
    ],
    shopping: [
      { id: "it21", fr: "Combien ça coûte ?", tr: "Quanto costa?", ph: "Kouan-to kos-ta" },
      { id: "it22", fr: "C'est cher", tr: "È caro", ph: "È ka-ro" }
    ],
    emergency: [
      { id: "it24", fr: "Au secours !", tr: "Aiuto!", ph: "A-you-to" },
      { id: "it25", fr: "Police", tr: "Polizia", ph: "Po-li-tsia" }
    ]
  },
  "ja-JP": {
    essentials: [
      { id: "ja1", fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { id: "ja2", fr: "Merci", tr: "Arigatō gozaimasu", ph: "A-ri-ga-to go-za-ï-mass" },
      { id: "ja3", fr: "S'il vous plaît", tr: "Onegaishimasu", ph: "O-né-ga-ï-chi-mass" }
    ],
    transport: [{ id: "ja5", fr: "Taxi ?", tr: "Takushī wa doko?", ph: "Takouchi wa doko" }],
    food: [{ id: "ja8", fr: "L'addition", tr: "O-kaikei", ph: "O-kaï-keï" }],
    hotel: [{ id: "ja12", fr: "Wi-Fi", tr: "Waï-faï", ph: "Wa-ï-fa-ï" }],
    shopping: [{ id: "ja13", fr: "Combien ?", tr: "Ikura desu ka?", ph: "I-kou-ra dess ka" }],
    emergency: [{ id: "ja15", fr: "Aidez-moi", tr: "Tasukete kudasai", ph: "Ta-sou-ké-té kou-da-saï" }]
  },
  "pt-PT": {
    essentials: [
      { id: "pt1", fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { id: "pt2", fr: "Merci", tr: "Muito obrigado", ph: "Mou-ï-tou o-bri-ga-dou" },
      { id: "pt3", fr: "S'il vous plaît", tr: "Por favor", ph: "Por fa-bor" }
    ],
    transport: [{ id: "pt4", fr: "Le taxi", tr: "O táxi", ph: "Ou taksi" }],
    food: [{ id: "pt6", fr: "L'addition", tr: "A conta", ph: "A konnt-a" }],
    hotel: [{ id: "pt8", fr: "Une chambre", tr: "Um quarto", ph: "Oun kouar-tou" }],
    shopping: [{ id: "pt9", fr: "Combien ?", tr: "Quanto custa?", ph: "Kouan-tou kous-ta" }],
    emergency: [{ id: "pt10", fr: "Au secours", tr: "Socorro!", ph: "Sou-ko-rou" }]
  },
  "ar-SA": {
    essentials: [
      { id: "ar1", fr: "Bonjour", tr: "Marhaba", ph: "Mar-ha-ba" },
      { id: "ar2", fr: "Merci", tr: "Shukran", ph: "Chou-krane" }
    ],
    transport: [{ id: "ar4", fr: "Taxi ?", tr: "Ayna al-taxi?", ph: "Ay-na al-tak-si" }],
    food: [{ id: "ar5", fr: "L'addition", tr: "Al-hisab", ph: "Al-hi-sab" }],
    hotel: [{ id: "ar6", fr: "Hôtel", tr: "Funduq", ph: "Foun-douk" }],
    shopping: [{ id: "ar7", fr: "Le prix ?", tr: "Al-thaman ?", ph: "Al-ta-mane" }],
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
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Initialisation LocalStorage + Voix
  useEffect(() => {
    const savedDark = localStorage.getItem('tt_dark') === 'true';
    const savedFavs = JSON.parse(localStorage.getItem('tt_favs') || '[]');
    setIsDark(savedDark);
    setFavorites(savedFavs);

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
      setVoicesLoaded(true);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => localStorage.setItem('tt_dark', isDark.toString()), [isDark]);
  useEffect(() => localStorage.setItem('tt_favs', JSON.stringify(favorites)), [favorites]);

  const selectedLang = languages.find(l => l.code === target);

  // Fonction Voix Féminine Verrouillée
  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = target;
      utterance.rate = 0.9;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      // On cherche une voix de femme premium spécifique à la langue
      const femaleVoice = voices.find(v => 
        v.lang.includes(target.split('-')[0]) && 
        (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman') || 
         v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('alice') || 
         v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google'))
      );

      if (femaleVoice) utterance.voice = femaleVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleFav = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const currentData = survivalData[target] || survivalData["en-US"];

  const myFavorites = useMemo(() => {
    const allPhrases = Object.values(currentData).flat();
    return allPhrases.filter((p: any) => favorites.includes(p.id));
  }, [target, favorites, currentData]);

  const filteredData = useMemo(() => {
    if (!target) return {};
    let result: any = {};
    Object.keys(currentData).forEach(cat => {
      const matches = currentData[cat].filter((p: any) => 
        p.fr.toLowerCase().includes(search.toLowerCase()) || 
        p.tr.toLowerCase().includes(search.toLowerCase())
      );
      if (matches.length > 0) result[cat] = matches;
    });
    return result;
  }, [target, search, currentData]);

  return (
    <main className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#FAF9F6] text-[#2D2D2D]'} p-4 md:p-8 font-sans`}>
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Studio Female Voice</span>
                <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">Premium Travel Kit</span>
            </div>
            <button onClick={() => setIsDark(!isDark)} className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 text-yellow-400 border border-slate-700' : 'bg-white shadow-sm text-slate-400 border border-slate-100'}`}>
                {isDark ? '☀️' : '🌙'}
            </button>
        </div>

        {!showPlan ? (
          <div className="animate-in fade-in duration-700">
            <h1 className="text-6xl font-[1000] italic text-center mb-12 tracking-tighter">TRIPTALK<span className="text-orange-600 not-italic">.</span></h1>
            <div className="grid gap-3">
                {languages.map((lang) => (
                <button key={lang.code} onClick={() => { setTarget(lang.code); setShowPlan(true); }} className={`group flex items-center gap-5 p-6 rounded-[2.5rem] border transition-all ${isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-orange-600' : 'bg-white border-slate-100 shadow-sm hover:bg-black hover:text-white hover:-translate-y-1'}`}>
                    <span className="text-4xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                    <div className="text-left"><p className="text-xl font-black leading-none">{lang.name}</p><p className="text-[9px] font-bold mt-1 uppercase tracking-widest opacity-40">{lang.desc}</p></div>
                </button>
                ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-500 pb-20">
            {/* Sticky Nav */}
            <div className={`sticky top-0 z-30 space-y-4 py-3 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FAF9F6]'}`}>
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <button onClick={() => {setShowPlan(false); setSearch("");}} className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-xl font-black">←</button>
                    <div className="flex items-center gap-2"><span className="text-xl">{selectedLang?.flag}</span><span className="font-black text-[11px] uppercase tracking-widest">{selectedLang?.name}</span></div>
                    <div className="w-10"></div>
                </div>
                <input type="text" placeholder="Rechercher une phrase..." value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full p-4 pl-6 rounded-[1.5rem] border outline-none focus:border-orange-600 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`} />
            </div>

            {/* Favoris */}
            {myFavorites.length > 0 && !search && (
                <div className="animate-in slide-in-from-top-4">
                    <h3 className="text-[10px] font-black uppercase text-orange-600 mb-4 tracking-[0.3em] px-2 flex items-center gap-2"><span className="w-4 h-[1px] bg-orange-600/30"></span> Mes Favoris ⭐</h3>
                    <div className="grid gap-3">
                        {myFavorites.map((p: any) => (
                            <div key={`fav-${p.id}`} className={`p-5 rounded-[2rem] border flex items-center justify-between gap-4 ${isDark ? 'bg-orange-600/10 border-orange-600/30' : 'bg-orange-50/50 border-orange-200'}`}>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1"><button onClick={() => toggleFav(p.id)} className="text-xl">⭐</button><p className="text-[9px] font-black uppercase opacity-30">{p.fr}</p></div>
                                    <h4 className="text-xl font-black italic">{p.tr}</h4>
                                </div>
                                <button onClick={() => speak(p.tr)} className="w-12 h-12 bg-orange-600 text-white rounded-[1.2rem] shadow-lg flex items-center justify-center text-xl active:scale-90 transition-all">🔊</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Catégories */}
            <div className="space-y-4">
              {categories.map((cat) => (
                filteredData[cat.id] && (
                    <div key={cat.id} className={`rounded-[2.2rem] border overflow-hidden ${isDark ? 'bg-slate-800/20 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <button onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)} className={`w-full flex items-center justify-between p-6 ${openCat === cat.id ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>
                            <div className="flex items-center gap-3"><span>{cat.icon}</span><span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span></div>
                            <span className="text-2xl font-light">{openCat === cat.id ? '−' : '+'}</span>
                        </button>
                        {openCat === cat.id && (
                            <div className="p-4 space-y-3">
                            {filteredData[cat.id]?.map((p: any) => (
                                <div key={p.id} className={`p-5 rounded-[1.8rem] border flex items-center justify-between gap-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-50'}`}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <button onClick={() => toggleFav(p.id)} className="text-xl active:scale-150 transition-transform">{favorites.includes(p.id) ? '⭐' : '☆'}</button>
                                            <p className="text-[9px] font-black text-slate-400 uppercase">{p.fr}</p>
                                        </div>
                                        <h4 className="text-xl font-black italic leading-tight">{p.tr}</h4>
                                        <span className="text-xs text-orange-600 font-bold italic">{p.ph}</span>
                                    </div>
                                    <button onClick={() => speak(p.tr)} className="shrink-0 w-12 h-12 bg-black dark:bg-orange-600 text-white rounded-[1.2rem] flex items-center justify-center text-xl shadow-lg active:scale-90 transition-all">🔊</button>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                )
              ))}
            </div>
            <footer className="py-12 text-center">
              <button onClick={() => {setShowPlan(false); setSearch("");}} className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400">Changer la langue</button>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}