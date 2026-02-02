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
      { id: "en7", fr: "Je m'appelle...", tr: "My name is...", ph: "Maï né-ime iz" },
      { id: "en8", fr: "Pardon / Excusez-moi", tr: "Excuse me", ph: "Ex-kiouze mi" },
      { id: "en9", fr: "De rien", tr: "You're welcome", ph: "Your wel-kom" },
      { id: "en10", fr: "Oui / Non", tr: "Yes / No", ph: "Yess / No" }
    ],
    transport: [
      { id: "en11", fr: "Où est le taxi ?", tr: "Where is the taxi?", ph: "Wère iz ze taksi" },
      { id: "en12", fr: "La gare la plus proche", tr: "The nearest station", ph: "Ze nir-est sté-cheun" },
      { id: "en13", fr: "À droite / À gauche", tr: "Right / Left", ph: "Raït / Left" },
      { id: "en14", fr: "Tout droit", tr: "Straight ahead", ph: "Stré-ite a-hed" },
      { id: "en15", fr: "Un ticket s'il vous plaît", tr: "One ticket please", ph: "Wone tiquet pliz" },
      { id: "en16", fr: "Est-ce loin ?", tr: "Is it far?", ph: "Iz it far" },
      { id: "en17", fr: "Arrêtez-vous ici", tr: "Stop here please", ph: "Stop hir pliz" }
    ],
    food: [
      { id: "en18", fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { id: "en19", fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { id: "en20", fr: "Une bière s'il vous plaît", tr: "A beer please", ph: "Ey bir pliz" },
      { id: "en21", fr: "C'est délicieux", tr: "It's delicious", ph: "Its délicheu-ce" },
      { id: "en22", fr: "J'ai une allergie", tr: "I have an allergy", ph: "Aï hav anne alé-rdji" },
      { id: "en23", fr: "C'est piquant ?", tr: "Is it spicy?", ph: "Iz it spaï-si" }
    ],
    hotel: [
      { id: "en24", fr: "J'ai une réservation", tr: "I have a reservation", ph: "Aï hav ey réserva-cheun" },
      { id: "en25", fr: "Le code Wi-Fi ?", tr: "The Wi-Fi password?", ph: "Ze waï-faï pass-weurd" },
      { id: "en26", fr: "Petit-déjeuner", tr: "Breakfast", ph: "Breuk-feust" },
      { id: "en27", fr: "Plus de serviettes", tr: "More towels", ph: "More taou-elz" }
    ],
    shopping: [
      { id: "en28", fr: "Combien ça coûte ?", tr: "How much is it?", ph: "Haou motch iz it" },
      { id: "en29", fr: "C'est trop cher", tr: "It's too expensive", ph: "Its tou ex-penn-siv" },
      { id: "en30", fr: "Je regarde juste", tr: "I'm just looking", ph: "Aï-m djosst louking" }
    ],
    emergency: [
      { id: "en31", fr: "Aidez-moi !", tr: "Help me!", ph: "Helpe mi" },
      { id: "en32", fr: "Où est l'hôpital ?", tr: "Where is the hospital?", ph: "Wère iz ze ospital" },
      { id: "en33", fr: "Appelez la police", tr: "Call the police", ph: "Col ze poliss" }
    ]
  },
  "es-ES": {
    essentials: [
      { id: "es1", fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { id: "es2", fr: "Merci beaucoup", tr: "Muchas gracias", ph: "Moutcha-ss grassia-ss" },
      { id: "es3", fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" },
      { id: "es4", fr: "Comment ça va ?", tr: "¿Cómo estás?", ph: "Como essta-ss" },
      { id: "es5", fr: "Je ne comprends pas", tr: "No entiendo", ph: "No enn-ti-enndo" },
      { id: "es6", fr: "Enchanté", tr: "Mucho gusto", ph: "Moutcho gousto" },
      { id: "es7", fr: "Pardon", tr: "Perdón / Disculpe", ph: "Per-donne / Diss-koul-pé" },
      { id: "es8", fr: "Oui / Non", tr: "Sí / No", ph: "Si / No" }
    ],
    transport: [
      { id: "es9", fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" },
      { id: "es10", fr: "La gare la plus proche", tr: "La estación más cercana", ph: "La essta-ssion mass cer-kana" },
      { id: "es11", fr: "À droite / À gauche", tr: "A la derecha / izquierda", ph: "A la dé-rétcha / iss-ki-erda" },
      { id: "es12", fr: "La plage", tr: "La playa", ph: "La pla-ya" },
      { id: "es13", fr: "Un ticket s'il vous plaît", tr: "Un billete por favor", ph: "Oun bi-yé-té por fabor" }
    ],
    food: [
      { id: "es14", fr: "L'addition s'il vous plaît", tr: "La cuenta por favor", ph: "La kouennta por fabor" },
      { id: "es15", fr: "Une table pour deux", tr: "Una mesa para dos", ph: "Ouna messa para doss" },
      { id: "es16", fr: "Une bière", tr: "Una cerveza", ph: "Ouna cer-bé-sa" },
      { id: "es17", fr: "C'est délicieux", tr: "Está delicioso", ph: "Essta dé-liss-io-so" },
      { id: "es18", fr: "J'ai une allergie", tr: "Tengo una alergia", ph: "Tenngo ouna alér-hia" }
    ],
    hotel: [
      { id: "es19", fr: "Le Wi-Fi", tr: "El Wi-Fi", ph: "El waï-faï" },
      { id: "es20", fr: "Tengo una reserva", tr: "J'ai une réservation", ph: "Tenngo ouna ré-ser-ba" },
      { id: "es21", fr: "La llave", tr: "La clé", ph: "La ya-bé" }
    ],
    shopping: [
      { id: "es22", fr: "Combien ça coûte ?", tr: "¿Cuánto cuesta?", ph: "Kouannto kouessta" },
      { id: "es23", fr: "Es muy caro", tr: "C'est très cher", ph: "Es mou-ï karo" },
      { id: "es24", fr: "Solo miro", tr: "Je regarde juste", ph: "Solo miro" }
    ],
    emergency: [
      { id: "es25", fr: "Au secours !", tr: "¡Socorro!", ph: "Sokorro" },
      { id: "es26", fr: "Necesito un médico", tr: "J'ai besoin d'un médecin", ph: "Né-cé-sito oun mé-di-ko" },
      { id: "es27", fr: "La policía", tr: "La police", ph: "La po-li-ssia" }
    ]
  },
  "it-IT": {
    essentials: [
      { id: "it1", fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
      { id: "it2", fr: "Merci", tr: "Grazie mille", ph: "Grat-sié mil-lé" },
      { id: "it3", fr: "S'il vous plaît", tr: "Per favore", ph: "Per favoré" },
      { id: "it4", fr: "Comment ça va ?", tr: "Come sta?", ph: "Komé essta" },
      { id: "it5", fr: "Je ne comprends pas", tr: "Non capisco", ph: "Non ka-pis-ko" },
      { id: "it6", fr: "Enchanté", tr: "Piacere", ph: "Pi-a-tchè-ré" },
      { id: "it7", fr: "Pardon", tr: "Scusi", ph: "Skou-zi" }
    ],
    transport: [
      { id: "it8", fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" },
      { id: "it9", fr: "La gare", tr: "La stazione", ph: "La stat-si-oné" },
      { id: "it10", fr: "À gauche / À droite", tr: "A sinistra / destra", ph: "A si-nistra / des-tra" },
      { id: "it11", fr: "Tout droit", tr: "Sempre dritto", ph: "Sèm-pré drit-to" },
      { id: "it12", fr: "Où sont les toilettes ?", tr: "Dove sono i bagni?", ph: "Do-vé so-no i ba-nyi" }
    ],
    food: [
      { id: "it13", fr: "L'addition s'il vous plaît", tr: "Il conto per favore", ph: "Il konnt-o per favoré" },
      { id: "it14", fr: "Un café", tr: "Un caffè", ph: "Oun kaf-é" },
      { id: "it15", fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" },
      { id: "it16", fr: "Santé !", tr: "Salute!", ph: "Sa-lou-té" },
      { id: "it17", fr: "Une table pour deux", tr: "Un tavolo per due", ph: "Oun ta-vo-lo per dou-é" }
    ],
    hotel: [
      { id: "it18", fr: "La clé", tr: "La chiave", ph: "La kia-vé" },
      { id: "it19", fr: "Le Wi-Fi", tr: "Il Wi-Fi", ph: "Il waï-faï" },
      { id: "it20", fr: "La clim", tr: "Aria condizionata", ph: "A-ri-a kon-di-tsio-na-ta" }
    ],
    shopping: [
      { id: "it21", fr: "Combien ça coûte ?", tr: "Quanto costa?", ph: "Kouan-to kos-ta" },
      { id: "it22", fr: "C'est cher", tr: "È caro", ph: "È ka-ro" }
    ],
    emergency: [
      { id: "it23", fr: "Au secours !", tr: "Aiuto!", ph: "A-you-to" },
      { id: "it24", fr: "Un médecin", tr: "Un medico", ph: "Oun mé-di-ko" },
      { id: "it25", fr: "Police", tr: "Polizia", ph: "Po-li-tsia" }
    ]
  },
  "ja-JP": {
    essentials: [
      { id: "ja1", fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { id: "ja2", fr: "Merci", tr: "Arigatō", ph: "A-ri-ga-to" },
      { id: "ja3", fr: "S'il vous plaît", tr: "Onegaishimasu", ph: "O-né-ga-ï-chi-mass" },
      { id: "ja4", fr: "Oui / Non", tr: "Hai / Iie", ph: "Ha-ï / I-ié" },
      { id: "ja5", fr: "Pardon", tr: "Sumimasen", ph: "Sou-mi-ma-sen" },
      { id: "ja6", fr: "Je ne comprends pas", tr: "Wakarimasen", ph: "Wa-ka-ri-ma-sen" }
    ],
    transport: [
      { id: "ja7", fr: "Où est le taxi ?", tr: "Takushī wa doko?", ph: "Takou-shi wa doko" },
      { id: "ja8", fr: "La gare", tr: "Eki", ph: "É-ki" },
      { id: "ja9", fr: "À gauche / À droite", tr: "Hidari / Migi", ph: "Hi-da-ri / Mi-gui" },
      { id: "ja10", fr: "Toilettes ?", tr: "Toire wa doko?", ph: "To-ï-ré wa doko" }
    ],
    food: [
      { id: "ja11", fr: "L'addition", tr: "O-kaikei", ph: "O-kaï-keï" },
      { id: "ja12", fr: "C'est délicieux", tr: "Oishii desu", ph: "Oï-chi dess" },
      { id: "ja13", fr: "De l'eau s'il vous plaît", tr: "Mizu o kudasai", ph: "Mi-zou o kou-da-saï" },
      { id: "ja14", fr: "Itadakimasu", tr: "Bon appétit", ph: "I-ta-da-ki-mass" }
    ],
    hotel: [
      { id: "ja15", fr: "Wi-Fi ?", tr: "Waï-faï wa?", ph: "Wa-ï-fa-ï wa" },
      { id: "ja16", fr: "La chambre", tr: "Heya", ph: "Hé-ya" }
    ],
    shopping: [
      { id: "ja17", fr: "Combien ?", tr: "Ikura desu ka?", ph: "I-kou-ra dess ka" },
      { id: "ja18", fr: "C'est cher", tr: "Takai desu", ph: "Ta-ka-ï dess" }
    ],
    emergency: [
      { id: "ja19", fr: "Aidez-moi !", tr: "Tasukete!", ph: "Ta-sou-ké-té" },
      { id: "ja20", fr: "Police", tr: "Keisatsu", ph: "Keï-sa-tsou" },
      { id: "ja21", fr: "Hôpital", tr: "Byōin", ph: "Byo-inn" }
    ]
  },
  "pt-PT": {
    essentials: [
      { id: "pt1", fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { id: "pt2", fr: "Merci", tr: "Muito obrigado", ph: "Mou-ï-tou o-bri-ga-dou" },
      { id: "pt3", fr: "S'il vous plaît", tr: "Por favor", ph: "Por fa-bor" },
      { id: "pt4", fr: "Pardon", tr: "Desculpe", ph: "Des-koul-pé" }
    ],
    transport: [
      { id: "pt5", fr: "Le taxi", tr: "O táxi", ph: "Ou tak-si" },
      { id: "pt6", fr: "La plage", tr: "A praia", ph: "A pra-ya" },
      { id: "pt7", fr: "À gauche", tr: "À esquerda", ph: "A es-ker-da" }
    ],
    food: [
      { id: "pt8", fr: "L'addition", tr: "A conta por favor", ph: "A konnt-a por fa-bor" },
      { id: "pt9", fr: "Un café", tr: "Um café", ph: "Oun ka-fé" },
      { id: "pt10", fr: "Délicieux", tr: "Delicioso", ph: "Dé-li-si-o-zou" }
    ],
    hotel: [{ id: "pt11", fr: "Wi-Fi", tr: "O Wi-Fi", ph: "O waï-faï" }],
    shopping: [{ id: "pt12", fr: "Combien ?", tr: "Quanto custa?", ph: "Kouan-tou kous-ta" }],
    emergency: [{ id: "pt13", fr: "Au secours", tr: "Socorro!", ph: "Sou-ko-rou" }]
  },
  "ar-SA": {
    essentials: [
      { id: "ar1", fr: "Bonjour", tr: "Marhaba", ph: "Mar-ha-ba" },
      { id: "ar2", fr: "Merci", tr: "Shukran", ph: "Chou-krane" },
      { id: "ar3", fr: "S'il vous plaît", tr: "Min fadlak", ph: "Minn fad-lak" },
      { id: "ar4", fr: "Oui / Non", tr: "Na'am / La", ph: "Na-am / La" }
    ],
    transport: [
      { id: "ar5", fr: "Où est le taxi ?", tr: "Ayna al-taxi?", ph: "Ay-na al-tak-si" },
      { id: "ar6", fr: "La gare", tr: "Al-mahatta", ph: "Al-ma-ha-ta" }
    ],
    food: [
      { id: "ar7", fr: "L'addition", tr: "Al-hisab", ph: "Al-hi-sab" },
      { id: "ar8", fr: "C'est délicieux", tr: "Ladhidh", ph: "La-di-ze" }
    ],
    hotel: [{ id: "ar9", fr: "Ma chambre", tr: "Ghurfati", ph: "Gour-fa-ti" }],
    shopping: [{ id: "ar10", fr: "Combien ?", tr: "Bikam ?", ph: "Bi-kam" }],
    emergency: [{ id: "ar11", fr: "Aidez-moi", tr: "Sa'iduni", ph: "Sa-i-dou-ni" }]
  }
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>("essentials");
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Correction de la variable manquante
  const selectedLang = useMemo(() => languages.find(l => l.code === target), [target]);

  useEffect(() => {
    const savedDark = localStorage.getItem('tt_v4_dark') === 'true';
    const savedFavs = JSON.parse(localStorage.getItem('tt_v4_favs') || '[]');
    setIsDark(savedDark);
    setFavorites(savedFavs);
    window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => localStorage.setItem('tt_v4_dark', isDark.toString()), [isDark]);
  useEffect(() => localStorage.setItem('tt_v4_favs', JSON.stringify(favorites)), [favorites]);

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = target;
      utterance.rate = 0.85;
      utterance.pitch = 1.1; 

      const voices = window.speechSynthesis.getVoices();
      // On force la recherche d'une voix de femme (Samantha, Alice, Google Woman, etc.)
      const femaleVoice = voices.find(v => 
        v.lang.includes(target.split('-')[0]) && 
        (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || 
         v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural') ||
         v.name.toLowerCase().includes('soft') || v.name.toLowerCase().includes('woman'))
      );

      if (femaleVoice) utterance.voice = femaleVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleFav = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const currentData = survivalData[target] || {};

  const myFavorites = useMemo(() => {
    const all = Object.values(currentData).flat();
    return all.filter((p: any) => favorites.includes(p.id));
  }, [target, favorites, currentData]);

  const filteredData = useMemo(() => {
    if (!target) return {};
    let res: any = {};
    Object.keys(currentData).forEach(cat => {
      const m = currentData[cat].filter((p: any) => 
        p.fr.toLowerCase().includes(search.toLowerCase()) || p.tr.toLowerCase().includes(search.toLowerCase())
      );
      if (m.length > 0) res[cat] = m;
    });
    return res;
  }, [target, search, currentData]);

  return (
    <main className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#FAF9F6] text-[#1A1A1A]'} font-sans`}>
      <div className="max-w-md mx-auto p-4 md:p-6">
        
        {/* Toggle Mode Nuit Compact en haut */}
        <div className="flex justify-end items-center gap-2 mb-8 px-2">
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Mode Nuit</span>
            <button 
                onClick={() => setIsDark(!isDark)} 
                className={`w-10 h-5 rounded-full relative transition-all ${isDark ? 'bg-orange-600' : 'bg-slate-200'}`}
            >
                <div className={`absolute top-1 w-3 h-3 rounded-full transition-all ${isDark ? 'right-1 bg-white' : 'left-1 bg-slate-400'}`}></div>
            </button>
        </div>

        {!showPlan ? (
          <div className="animate-in fade-in zoom-in-95 duration-700">
            <h1 className="text-7xl font-[1000] italic text-center mb-14 tracking-tighter">TRIPTALK<span className="text-orange-600">.</span></h1>
            <div className="grid gap-3">
                {languages.map((lang) => (
                <button key={lang.code} onClick={() => { setTarget(lang.code); setShowPlan(true); }} className={`flex items-center gap-5 p-6 rounded-[2.5rem] border transition-all ${isDark ? 'bg-slate-900/50 border-slate-800 hover:bg-orange-600' : 'bg-white border-slate-100 shadow-sm hover:bg-black hover:text-white'}`}>
                    <span className="text-4xl">{lang.flag}</span>
                    <div className="text-left">
                        <p className="text-xl font-black">{lang.name}</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">{lang.desc}</p>
                    </div>
                </button>
                ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-20">
            
            {/* Nav Barrettes */}
            <div className={`sticky top-0 z-30 space-y-4 py-2 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FAF9F6]'}`}>
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <button onClick={() => {setShowPlan(false); setSearch("");}} className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl font-black">←</button>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{selectedLang?.flag}</span>
                        <span className="font-black text-[11px] uppercase tracking-widest">{selectedLang?.name}</span>
                    </div>
                    <div className="w-10"></div>
                </div>
                <input type="text" placeholder="Rechercher une phrase..." value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full p-4 pl-6 rounded-[1.5rem] border outline-none focus:border-orange-600 transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`} />
            </div>

            {/* Favoris Dynamiques */}
            {myFavorites.length > 0 && !search && (
                <div className="animate-in slide-in-from-top-4">
                    <h3 className="text-[10px] font-black uppercase text-orange-600 mb-4 tracking-[0.3em] px-2 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-orange-600/30"></span> Mes Favoris ⭐
                    </h3>
                    <div className="grid gap-3">
                        {myFavorites.map((p: any) => (
                            <div key={`fav-${p.id}`} className={`p-5 rounded-[2rem] border flex items-center justify-between gap-4 ${isDark ? 'bg-orange-600/10 border-orange-600/20' : 'bg-orange-50/50 border-orange-100'}`}>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <button onClick={() => toggleFav(p.id)} className="text-xl">⭐</button>
                                        <p className="text-[9px] font-black uppercase opacity-30">{p.fr}</p>
                                    </div>
                                    <h4 className="text-xl font-black italic">{p.tr}</h4>
                                </div>
                                <button onClick={() => speak(p.tr)} className="w-12 h-12 bg-orange-600 text-white rounded-[1.2rem] flex items-center justify-center text-xl shadow-lg active:scale-90">🔊</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Catégories de survie */}
            <div className="space-y-4">
              {categories.map((cat) => (
                filteredData[cat.id] && (
                    <div key={cat.id} className={`rounded-[2.2rem] border overflow-hidden transition-all ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <button onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)} className={`w-full flex items-center justify-between p-6 transition-colors ${openCat === cat.id ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>
                            <div className="flex items-center gap-3"><span>{cat.icon}</span><span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span></div>
                            <span className="text-2xl">{openCat === cat.id ? '−' : '+'}</span>
                        </button>
                        {openCat === cat.id && (
                            <div className="p-4 space-y-3 bg-transparent">
                            {filteredData[cat.id]?.map((p: any) => (
                                <div key={p.id} className={`p-5 rounded-[1.8rem] border flex items-center justify-between gap-4 transition-all ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-50'}`}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <button onClick={() => toggleFav(p.id)} className="text-xl active:scale-125 transition-transform">{favorites.includes(p.id) ? '⭐' : '☆'}</button>
                                            <p className="text-[9px] font-black text-slate-400 uppercase">{p.fr}</p>
                                        </div>
                                        <h4 className="text-xl font-black italic leading-tight">{p.tr}</h4>
                                        <span className="text-xs text-orange-600 font-bold italic">{p.ph}</span>
                                    </div>
                                    <button onClick={() => speak(p.tr)} className="shrink-0 w-12 h-12 bg-black dark:bg-orange-600 text-white rounded-[1.2rem] flex items-center justify-center text-xl shadow-lg active:scale-95">🔊</button>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                )
              ))}
            </div>

            <footer className="py-12 text-center">
              <button onClick={() => {setShowPlan(false); setSearch(""); window.scrollTo(0,0);}} className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 hover:text-orange-600 transition-colors">Modifier Destination</button>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}