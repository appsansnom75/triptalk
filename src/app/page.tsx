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
  { id: "essentials", label: "✨ Les Bases", icon: "⭐" },
  { id: "transport", label: "🚕 Transport", icon: "✈️" },
  { id: "food", label: "🍝 Resto & Bar", icon: "🍷" },
  { id: "emergency", label: "🚨 Urgences", icon: "🆘" }
];

const survivalData: Record<string, any> = {
  "en": {
    essentials: [
      { fr: "Bonjour / Salut", tr: "Hello / Hi", ph: "Hélo / Haï" },
      { fr: "Merci beaucoup", tr: "Thank you so much", ph: "Tanc you so motch" },
      { fr: "S'il vous plaît", tr: "Please", ph: "Pliz" },
      { fr: "Pardon / Excusez-moi", tr: "Excuse me / Sorry", ph: "Ex-kiouze mi / Sory" }
    ],
    transport: [
      { fr: "Où est le taxi / bus ?", tr: "Where is the taxi / bus?", ph: "Wère iz ze taksi / beusse" },
      { fr: "Où sont les toilettes ?", tr: "Where are the toilets?", ph: "Wère are ze toïlettes" },
      { fr: "À gauche / À droite", tr: "Left / Right", ph: "Left / Raït" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { fr: "L'eau du robinet / Bouteille", tr: "Tap water / Bottle", ph: "Tap woteur / Boteul" }
    ],
    emergency: [
      { fr: "Aidez-moi s'il vous plaît", tr: "Help me please", ph: "Helpe mi pliz" },
      { fr: "Je suis perdu", tr: "I am lost", ph: "Aïe am lost" },
      { fr: "Appelez un docteur", tr: "Call a doctor", ph: "Col ey docteur" }
    ]
  },
  "es": {
    essentials: [
      { fr: "Bonjour / Salut", tr: "Hola", ph: "Ola" },
      { fr: "Merci", tr: "Gracias", ph: "Grassia-ss" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" },
      { fr: "La gare / L'aéroport", tr: "La estación / El aeropuerto", ph: "La essta-ssion / El aéro-pou-erto" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "La cuenta por favor", ph: "La kouennta por fabor" },
      { fr: "Santé !", tr: "¡Salud!", ph: "Salou-de" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Ayúdeme", ph: "Ayoudémé" },
      { fr: "Je suis perdu", tr: "Estoy perdido", ph: "Esstoy perdido" }
    ]
  },
  "it": {
    essentials: [
      { fr: "Bonjour / Salut", tr: "Buongiorno / Ciao", ph: "Bouone-djor-no / Tchao" },
      { fr: "Merci", tr: "Grazie", ph: "Grat-sié" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" }
    ],
    food: [
      { fr: "L'addition", tr: "Il conto", ph: "Il konnt-o" }
    ],
    emergency: [
      { fr: "Au secours", tr: "Aiuto", ph: "A-you-to" }
    ]
  },
  "ja": {
    essentials: [
      { fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { fr: "Merci", tr: "Arigatō", ph: "A-ri-ga-to" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Takushī wa doko?", ph: "Takouchi wa doko" }
    ],
    food: [
      { fr: "L'addition", tr: "O-kaikei", ph: "O-kaï-keï" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Tasukete", ph: "Ta-sou-ké-té" }
    ]
  },
  "pt": {
    essentials: [
      { fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { fr: "Merci", tr: "Obrigado", ph: "Obri-ga-dou" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Onde está o táxi?", ph: "Onndé eshta ou taksi" }
    ],
    food: [
      { fr: "L'addition", tr: "A conta", ph: "A konnt-a" }
    ],
    emergency: [
      { fr: "Au secours", tr: "Socorro", ph: "Sou-ko-rou" }
    ]
  },
  "ar": {
    essentials: [
      { fr: "Bonjour", tr: "Marhaba", ph: "Mar-ha-ba" },
      { fr: "Merci", tr: "Shukran", ph: "Chou-krane" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Ayna al-taxi?", ph: "Ay-na al-taksi" }
    ],
    food: [
      { fr: "L'addition", tr: "Al-hisab", ph: "Al-hi-sab" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Sa'iduni", ph: "Sa-i-dou-ni" }
    ]
  }
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);

  const selectedLang = languages.find(l => l.code === target);
  const data = survivalData[target] || {};

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
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
                className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-orange-500 hover:text-white rounded-[2rem] transition-all border border-slate-100 group"
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
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* Nav Bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md py-4 border-b border-slate-100">
              <button onClick={() => setShowPlan(false)} className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center font-bold">←</button>
              <div className="text-center">
                <h2 className="font-black text-lg italic text-orange-500">{selectedLang?.name}</h2>
              </div>
              <span className="text-2xl">{selectedLang?.flag}</span>
            </div>

            {/* Contenu par Catégories */}
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-4">
                <div className="flex items-center gap-2 ml-2">
                  <span>{cat.icon}</span>
                  <h3 className="font-black uppercase text-xs tracking-widest text-slate-400">{cat.label}</h3>
                </div>
                
                <div className="grid gap-3">
                  {data[cat.id]?.map((p: any, i: number) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xl font-black text-slate-900 mb-1">{p.fr}</p>
                        <div className="flex flex-col">
                          <p className="text-orange-500 font-bold text-lg">{p.tr}</p>
                          <p className="text-slate-400 text-sm italic">Prononcez : {p.ph}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => speak(p.tr)} 
                        className="w-12 h-12 bg-white shadow-sm text-orange-500 rounded-full flex items-center justify-center text-xl active:scale-90 transition-transform"
                      >
                        🔊
                      </button>
                    </div>
                  ))}
                  {(!data[cat.id] || data[cat.id].length === 0) && (
                    <p className="text-xs italic text-slate-300 ml-4">En cours de traduction...</p>
                  )}
                </div>
              </div>
            ))}

            <button 
              onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setShowPlan(false); }}
              className="w-full py-8 text-slate-300 font-black text-xs uppercase tracking-widest"
            >
              Changer de langue
            </button>
          </div>
        )}
      </div>
    </main>
  );
}