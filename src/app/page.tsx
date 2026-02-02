"use client";
import { useState } from 'react';

const languages = [
  { name: "Anglais", code: "en", flag: "🇬🇧", desc: "Le passepartout mondial" },
  { name: "Espagnol", code: "es", flag: "🇪🇸", desc: "Idéal pour l'Amérique Latine" },
  { name: "Italien", code: "it", flag: "🇮🇹", desc: "La dolce vita sans barrière" },
  { name: "Japonais", code: "ja", flag: "🇯🇵", desc: "Essentiel au pays du soleil levant" },
  { name: "Portugais", code: "pt", flag: "🇵🇹", desc: "Du Portugal au Brésil" },
  { name: "Arabe", code: "ar", flag: "🇲🇦", desc: "L'essentiel du Maghreb à l'Orient" }
];

const categories = [
  { id: "essentials", label: "Les Bases", icon: "✨" },
  { id: "transport", label: "Transport", icon: "🚕" },
  { id: "food", label: "Manger & Boire", icon: "🍝" },
  { id: "hotel", label: "Dormir", icon: "🏨" },
  { id: "shopping", label: "Shopping", icon: "💸" },
  { id: "emergency", label: "Urgences", icon: "🆘" }
];

const survivalData: Record<string, any> = {
  "en": {
    essentials: [
      { fr: "Bonjour", tr: "Hello", ph: "Hélo" },
      { fr: "S'il vous plaît", tr: "Please", ph: "Pliz" },
      { fr: "Merci", tr: "Thank you", ph: "Tanc you" },
      { fr: "Je ne parle pas bien anglais", tr: "I don't speak English well", ph: "Aïe donnt spik inglich wel" },
      { fr: "Comment dit-on... ?", tr: "How do you say...?", ph: "Haou dou you sé" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Where is the taxi?", ph: "Wère iz ze taksi" },
      { fr: "Un ticket s'il vous plaît", tr: "One ticket please", ph: "Wone tiquet pliz" },
      { fr: "Est-ce loin ?", tr: "Is it far?", ph: "Iz it far" },
      { fr: "Arrêtez-vous ici", tr: "Stop here", ph: "Stop hir" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { fr: "Sans viande / Végétarien", tr: "No meat / Vegetarian", ph: "No mit / védjétérienne" },
      { fr: "C'était délicieux", tr: "It was delicious", ph: "It ouaz délicheu-ce" }
    ],
    hotel: [
      { fr: "J'ai une réservation", tr: "I have a reservation", ph: "Aïe hav ey réserva-cheun" },
      { fr: "Le code Wi-Fi ?", tr: "The Wi-Fi password?", ph: "Ze waï-faï pass-weurd" },
      { fr: "Où est l'ascenseur ?", tr: "Where is the elevator?", ph: "Wère iz zi élévé-teur" }
    ],
    shopping: [
      { fr: "C'est trop cher", tr: "It's too expensive", ph: "Its tou ex-penn-siv" },
      { fr: "Combien ça coûte ?", tr: "How much is it?", ph: "Haou motch iz it" },
      { fr: "Je regarde juste", tr: "I'm just looking", ph: "Aïm djuste lou-king" }
    ],
    emergency: [
      { fr: "Aidez-moi !", tr: "Help me!", ph: "Helpe mi" },
      { fr: "J'ai perdu mon sac", tr: "I lost my bag", ph: "Aïe lost maï bag" },
      { fr: "Où est la pharmacie ?", tr: "Where is the pharmacy?", ph: "Wère iz ze far-ma-ci" }
    ]
  },
  "es": {
    essentials: [
      { fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { fr: "Merci", tr: "Gracias", ph: "Grassia-ss" },
      { fr: "De rien", tr: "De nada", ph: "Dé nada" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" }
    ],
    transport: [
      { fr: "Où est la gare ?", tr: "¿Dónde está la estación?", ph: "Donndé essta la essta-ssion" },
      { fr: "À gauche / À droite", tr: "A la izquierda / derecha", ph: "A la iss-ki-erda / dé-rétcha" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "La cuenta por favor", ph: "La kouennta por fabor" },
      { fr: "Une bière / Un verre de vin", tr: "Una cerveza / Una copa de vino", ph: "Ser-vessa / Kopa dé vino" }
    ],
    hotel: [
      { fr: "Une chambre libre ?", tr: "¿Tienen habitaciones?", ph: "Ti-énène abita-ssioness" }
    ],
    shopping: [
        { fr: "Combien ça coûte ?", tr: "¿Cuánto cuesta?", ph: "Kouannto kouessta" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Ayúdeme", ph: "Ayoudémé" },
      { fr: "Police", tr: "Policía", ph: "Polissia" }
    ]
  },
  "it": {
    essentials: [
        { fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
        { fr: "Merci", tr: "Grazie", ph: "Grat-sié" },
        { fr: "S'il vous plaît", tr: "Per favore", ph: "Per favoré" }
    ],
    transport: [
        { fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" }
    ],
    food: [
        { fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" },
        { fr: "L'addition", tr: "Il conto", ph: "Il konnt-o" }
    ],
    hotel: [
        { fr: "Le Wi-Fi", tr: "Il Wi-Fi", ph: "Il waï-faï" }
    ],
    shopping: [
        { fr: "C'est cher", tr: "È caro", ph: "È ka-ro" }
    ],
    emergency: [
        { fr: "Aidez-moi", tr: "Aiutatemi", ph: "A-you-ta-té-mi" }
    ]
  },
  "ja": {
    essentials: [
      { fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { fr: "Merci", tr: "Arigatō", ph: "A-ri-ga-to" },
      { fr: "Pardon", tr: "Sumimasen", ph: "Sou-mi-ma-senn" }
    ],
    transport: [
      { fr: "Où sont les toilettes ?", tr: "Toire wa doko?", ph: "To-ï-ré wa do-ko" }
    ],
    food: [
      { fr: "Bon appétit", tr: "Itadakimasu", ph: "I-ta-da-ki-mass" }
    ],
    hotel: [
      { fr: "Chambre", tr: "Heya", ph: "Hé-ya" }
    ],
    shopping: [
        { fr: "Combien ?", tr: "Ikura desu ka?", ph: "I-kou-ra dess ka" }
    ],
    emergency: [
      { fr: "Au secours", tr: "Tasukete", ph: "Ta-sou-ké-té" }
    ]
  }
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>("essentials");

  const selectedLang = languages.find(l => l.code === target);
  const data = survivalData[target] || {};

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-orange-100">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        
        {/* Header Startup Style */}
        <header className="text-center mb-12 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            V2.0 • Offline First
          </div>
          <h1 className="text-6xl md:text-7xl font-[1000] tracking-tighter text-slate-900 mb-4 italic">
            TRIPTALK<span className="text-orange-500 not-italic">.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">Kit de survie ultime pour voyageurs.</p>
        </header>

        {!showPlan ? (
          <div className="grid gap-4 animate-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Choisissez une destination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setTarget(lang.code); setShowPlan(true); }}
                  className="group relative flex flex-col items-start p-6 bg-white hover:bg-slate-900 rounded-[2.5rem] transition-all duration-300 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1"
                >
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">{lang.flag}</span>
                  <span className="text-2xl font-black group-hover:text-white transition-colors">{lang.name}</span>
                  <span className="text-sm text-slate-400 group-hover:text-slate-500 transition-colors">{lang.desc}</span>
                  <div className="absolute right-6 bottom-6 w-10 h-10 rounded-full bg-slate-50 group-hover:bg-orange-500 flex items-center justify-center transition-colors">
                    <span className="text-slate-400 group-hover:text-white">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            {/* Nav Bar Sticky */}
            <div className="sticky top-4 z-20 flex items-center justify-between bg-white/70 backdrop-blur-xl p-4 rounded-3xl border border-white shadow-lg shadow-slate-200/50 mb-8">
              <button onClick={() => setShowPlan(false)} className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors font-bold text-xl">←</button>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedLang?.flag}</span>
                <span className="font-black text-xl tracking-tight">{selectedLang?.name}</span>
              </div>
              <div className="w-12"></div>
            </div>

            {/* Accordéons modernisés */}
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm">
                  <button 
                    onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
                    className={`w-full flex items-center justify-between p-7 font-black transition-all ${openCat === cat.id ? 'bg-orange-500 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-4 text-lg uppercase tracking-tight">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${openCat === cat.id ? 'bg-white/20' : 'bg-slate-100'}`}>{cat.icon}</span>
                      {cat.label}
                    </div>
                    <span className={`text-2xl transition-transform duration-300 ${openCat === cat.id ? 'rotate-180' : ''}`}>{openCat === cat.id ? '−' : '+'}</span>
                  </button>

                  {openCat === cat.id && (
                    <div className="p-4 space-y-4 animate-in fade-in zoom-in-95 duration-300 bg-white">
                      {data[cat.id]?.map((p: any, i: number) => (
                        <div key={i} className="group relative bg-slate-50 hover:bg-white hover:border-orange-200 p-6 rounded-[1.8rem] border-2 border-transparent transition-all">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-[0.1em]">{p.fr}</p>
                              <h4 className="text-2xl font-black text-slate-900 leading-tight mb-2 italic tracking-tight">{p.tr}</h4>
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
                                <span className="text-[10px] font-black text-orange-500 uppercase">Prononciation</span>
                                <span className="text-sm font-bold text-slate-600 italic">{p.ph}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => speak(p.tr)} 
                              className="shrink-0 w-14 h-14 bg-white shadow-xl shadow-slate-200 rounded-2xl flex items-center justify-center text-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-90"
                            >
                              🔊
                            </button>
                          </div>
                        </div>
                      ))}
                      {(!data[cat.id] || data[cat.id].length === 0) && (
                        <div className="text-center py-8 text-slate-400 font-medium">
                          Bientôt disponible pour cette langue... 🚧
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <footer className="py-12 text-center">
              <button 
                onClick={() => setShowPlan(false)}
                className="text-slate-400 hover:text-orange-500 font-black text-xs uppercase tracking-[0.3em] transition-colors"
              >
                Changer de langue
              </button>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}