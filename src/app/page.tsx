"use client";
import { useState } from 'react';

const languages = [
  { name: "Anglais", code: "en", flag: "🇬🇧" },
  { name: "Espagnol", code: "es", flag: "🇪🇸" },
  { name: "Italien", code: "it", flag: "🇮🇹" },
  { name: "Japonais", code: "ja", flag: "🇯🇵" },
  { name: "Portugais", code: "pt", flag: "🇵🇹" },
  { name: "Arabe", code: "ar", flag: "🇲🇦" }
];

const categories = [
  { id: "essentials", label: "Les Bases", icon: "✨" },
  { id: "transport", label: "Transport & Direction", icon: "🚕" },
  { id: "food", label: "Resto & Bar", icon: "🍝" },
  { id: "emergency", label: "Urgences", icon: "🚨" }
];

const survivalData: Record<string, any> = {
  "en": {
    essentials: [
      { fr: "Bonjour / Salut", tr: "Hello / Hi", ph: "Hélo / Haï" },
      { fr: "Merci beaucoup", tr: "Thank you so much", ph: "Tanc you so motch" },
      { fr: "S'il vous plaît", tr: "Please", ph: "Pliz" },
      { fr: "Pardon / Excusez-moi", tr: "Excuse me / Sorry", ph: "Ex-kiouze mi / Sory" },
      { fr: "Parlez-vous français ?", tr: "Do you speak French?", ph: "Dou you spik frentch" }
    ],
    transport: [
      { fr: "Où est le taxi / bus ?", tr: "Where is the taxi / bus?", ph: "Wère iz ze taksi / beusse" },
      { fr: "Où sont les toilettes ?", tr: "Where are the toilets?", ph: "Wère are ze toïlettes" },
      { fr: "À gauche / À droite", tr: "Left / Right", ph: "Left / Raït" },
      { fr: "La gare / L'aéroport", tr: "The station / The airport", ph: "Ze sté-cheun / Ze air-port" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { fr: "Je suis allergique à...", tr: "I am allergic to...", ph: "Aï am alé-djik tou" },
      { fr: "Eau du robinet / Bouteille", tr: "Tap water / Bottle", ph: "Tap woteur / Boteul" }
    ],
    emergency: [
      { fr: "Aidez-moi s'il vous plaît", tr: "Help me please", ph: "Helpe mi pliz" },
      { fr: "Je suis perdu", tr: "I am lost", ph: "Aïe am lost" },
      { fr: "Appelez la police", tr: "Call the police", ph: "Col ze poliss" },
      { fr: "Où est l'hôpital ?", tr: "Where is the hospital?", ph: "Wère iz ze ospital" }
    ]
  },
  "es": {
    essentials: [
      { fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { fr: "Merci", tr: "Gracias", ph: "Grassia-ss" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" },
      { fr: "Comment allez-vous ?", tr: "¿Cómo está?", ph: "Como essta" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" },
      { fr: "Tout droit", tr: "Todo recto", ph: "Todo rek-to" },
      { fr: "Où sont les toilettes ?", tr: "¿Dónde están los baños?", ph: "Donndé esstane loss bagnoss" }
    ],
    food: [
      { fr: "La cuenta por favor", tr: "L'addition s'il vous plaît", ph: "La kouennta por fabor" },
      { fr: "Une bière s'il vous plaît", tr: "Una cerveza por favor", ph: "Ouna ser-vessa por fabor" },
      { fr: "Santé !", tr: "¡Salud!", ph: "Salou-de" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Ayúdeme", ph: "Ayoudémé" },
      { fr: "J'ai besoin d'un médecin", tr: "Necesito un médico", ph: "Né-cé-sito oun médiko" },
      { fr: "Au secours !", tr: "¡Socorro!", ph: "Sokorro" }
    ]
  },
  "it": {
    essentials: [
      { fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
      { fr: "Salut / Ciao", tr: "Ciao", ph: "Tchao" },
      { fr: "Merci", tr: "Grazie", ph: "Grat-sié" },
      { fr: "S'il vous plaît", tr: "Per favore", ph: "Per favoré" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" },
      { fr: "Où sont les toilettes ?", tr: "Dove sono i bagni?", ph: "Dov-é sono i ba-nyi" },
      { fr: "La gare", tr: "La stazione", ph: "La stat-si-oné" }
    ],
    food: [
      { fr: "L'addition", tr: "Il conto", ph: "Il konnt-o" },
      { fr: "Un café s'il vous plaît", tr: "Un caffè per favore", ph: "Oun kaf-é per favoré" },
      { fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Aiutatemi", ph: "A-you-ta-té-mi" },
      { fr: "Où est la pharmacie ?", tr: "Dov'è la farmacia?", ph: "Dov-è la far-ma-tchia" }
    ]
  },
  "ja": {
    essentials: [
      { fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { fr: "Merci", tr: "Arigatō", ph: "A-ri-ga-to" },
      { fr: "S'il vous plaît", tr: "Onegaishimasu", ph: "O-né-ga-ï-chi-mass" },
      { fr: "Pardon", tr: "Sumimasen", ph: "Sou-mi-ma-senn" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Takushī wa doko?", ph: "Takouchi wa doko" },
      { fr: "Où sont les toilettes ?", tr: "Toire wa doko?", ph: "To-ï-ré wa do-ko" },
      { fr: "La gare", tr: "Eki", ph: "É-ki" }
    ],
    food: [
      { fr: "L'addition", tr: "O-kaikei", ph: "O-kaï-keï" },
      { fr: "Eau", tr: "Mizu", ph: "Mi-zou" },
      { fr: "C'est bon", tr: "Oishii", ph: "O-ï-chi" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Tasukete", ph: "Ta-sou-ké-té" },
      { fr: "Hôpital", tr: "Byōin", ph: "Byo-inn" }
    ]
  },
  "pt": {
    essentials: [
      { fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { fr: "Merci", tr: "Obrigado", ph: "Obri-ga-dou" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Onde está o táxi?", ph: "Onndé eshta ou taksi" },
      { fr: "Toilettes", tr: "Banheiro", ph: "Ba-nyé-rou" }
    ],
    food: [
      { fr: "L'addition", tr: "A conta", ph: "A konnt-a" },
      { fr: "Une bière", tr: "Uma cerveja", ph: "Ouma ser-vé-ja" }
    ],
    emergency: [
      { fr: "Au secours", tr: "Socorro", ph: "Sou-ko-rou" },
      { fr: "Police", tr: "Polícia", ph: "Po-li-sia" }
    ]
  },
  "ar": {
    essentials: [
      { fr: "Bonjour", tr: "Marhaba / Salam", ph: "Mar-ha-ba / Sa-lam" },
      { fr: "Merci", tr: "Shukran", ph: "Chou-krane" },
      { fr: "S'il vous plaît", tr: "Min fadlak", ph: "Mine fad-lak" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Ayna al-taxi?", ph: "Ay-na al-taksi" },
      { fr: "Toilettes", tr: "Hamman", ph: "Ha-mame" }
    ],
    food: [
      { fr: "L'addition", tr: "Al-hisab", ph: "Al-hi-sab" },
      { fr: "L'eau", tr: "Al-ma'", ph: "Al-ma" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Sa'iduni", ph: "Sa-i-dou-ni" },
      { fr: "Médecin", tr: "Tabib", ph: "Ta-bib" }
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

  const toggleCat = (id: string) => {
    setOpenCat(openCat === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-white p-4 md:p-8 font-sans">
      <div className="max-w-md mx-auto">
        
        <header className="text-center mb-8">
          <h1 className="text-5xl font-black text-orange-500 tracking-tighter italic">TRIPTALK</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Kit de survie ultime</p>
        </header>

        {!showPlan ? (
          <div className="grid gap-3">
            <p className="text-center text-xs font-black uppercase text-slate-400 mb-2">Choisissez votre destination</p>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setTarget(lang.code); setShowPlan(true); }}
                className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-orange-500 hover:text-white rounded-[2rem] transition-all border border-slate-100 group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{lang.flag}</span>
                  <span className="font-black text-xl">{lang.name}</span>
                </div>
                <span className="font-black opacity-30 group-hover:opacity-100">→</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            {/* Nav Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/90 backdrop-blur-md py-4 border-b border-slate-100 mb-6">
              <button onClick={() => setShowPlan(false)} className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center font-bold">←</button>
              <h2 className="font-black text-xl italic text-orange-500">{selectedLang?.name} {selectedLang?.flag}</h2>
              <div className="w-10"></div> {/* Spacer */}
            </div>

            {/* Accordéons des Catégories */}
            {categories.map((cat) => (
              <div key={cat.id} className="border border-slate-100 rounded-[2rem] overflow-hidden bg-slate-50 shadow-sm">
                <button 
                  onClick={() => toggleCat(cat.id)}
                  className={`w-full flex items-center justify-between p-6 font-black uppercase text-sm tracking-widest transition-colors ${openCat === cat.id ? 'bg-orange-500 text-white' : 'text-slate-500'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{cat.icon}</span>
                    {cat.label}
                  </div>
                  <span className="text-xl">{openCat === cat.id ? '−' : '+'}</span>
                </button>

                {openCat === cat.id && (
                  <div className="p-4 space-y-3 bg-white animate-in slide-in-from-top-2 duration-300">
                    {data[cat.id]?.map((p: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-[1.5rem] flex items-center justify-between border border-slate-50">
                        <div className="flex-1">
                          <p className="text-lg font-black text-slate-900 leading-tight mb-1">{p.fr}</p>
                          <p className="text-orange-500 font-bold text-lg">{p.tr}</p>
                          <p className="text-slate-400 text-xs italic mt-1 font-medium">Prononcez : {p.ph}</p>
                        </div>
                        <button 
                          onClick={() => speak(p.tr)} 
                          className="ml-4 w-12 h-12 bg-white shadow-md text-orange-500 rounded-full flex items-center justify-center text-xl active:scale-90 transition-transform"
                        >
                          🔊
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button 
              onClick={() => setShowPlan(false)}
              className="w-full py-12 text-slate-300 font-black text-xs uppercase tracking-widest text-center"
            >
              Changer de langue
            </button>
          </div>
        )}
      </div>
    </main>
  );
}