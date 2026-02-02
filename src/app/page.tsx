"use client";
import { useState } from 'react';

const languages = [
  { name: "Anglais", code: "en" },
  { name: "Espagnol", code: "es" },
  { name: "Italien", code: "it" },
  { name: "Japonais", code: "ja" },
  { name: "Portugais", code: "pt" },
  { name: "Arabe", code: "ar" }
];

// Base de données enrichie
const survivalData: Record<string, any> = {
  "en": {
    essentials: [
      { original: "Bonjour", translated: "Hello", pronunciation: "Hélo" },
      { original: "Merci", translated: "Thank you", pronunciation: "Tanc you" },
      { original: "S'il vous plaît", translated: "Please", pronunciation: "Pliz" },
      { original: "Où sont les toilettes ?", translated: "Where are the toilets?", pronunciation: "Wère are ze toïlettes" }
    ],
    transport: [
      { original: "Un ticket s'il vous plaît", translated: "One ticket please", pronunciation: "Wone tiquet pliz" },
      { original: "Où est le taxi ?", translated: "Where is the taxi?", pronunciation: "Wère iz ze taksi" },
      { original: "À gauche / À droite", translated: "Left / Right", pronunciation: "Left / Raït" }
    ],
    food: [
      { original: "L'addition s'il vous plaît", translated: "The bill please", pronunciation: "Ze bil pliz" },
      { original: "Une table pour deux", translated: "A table for two", pronunciation: "Ey tebeul for tou" },
      { original: "C'est délicieux", translated: "It's delicious", pronunciation: "Its délicheu-ce" }
    ],
    emergency: [
      { original: "Aidez-moi", translated: "Help me", pronunciation: "Helpe mi" },
      { original: "Je suis perdu", translated: "I am lost", pronunciation: "Aïe am lost" },
      { original: "Appelez un docteur", translated: "Call a doctor", pronunciation: "Col ey docteur" }
    ]
  },
  "es": {
    essentials: [
      { original: "Bonjour", translated: "Hola", pronunciation: "Ola" },
      { original: "Merci", translated: "Gracias", pronunciation: "Grassia-ss" },
      { original: "S'il vous plaît", translated: "Por favor", pronunciation: "Por fabor" },
      { original: "Où sont les toilettes ?", translated: "¿Dónde están los baños?", pronunciation: "Donndé esstane loss bagnoss" }
    ],
    transport: [
      { original: "Un ticket s'il vous plaît", translated: "Un billete por favor", pronunciation: "Oun biyété por fabor" },
      { original: "Où est le taxi ?", translated: "¿Dónde está el taxi?", pronunciation: "Donndé essta el taksi" },
      { original: "Tout droit", translated: "Todo recto", pronunciation: "Todo rek-to" }
    ],
    food: [
      { original: "L'addition s'il vous plaît", translated: "La cuenta por favor", pronunciation: "La kouennta por fabor" },
      { original: "Eau s'il vous plaît", translated: "Agua por favor", pronunciation: "Agwa por fabor" },
      { original: "Santé !", translated: "¡Salud!", pronunciation: "Salou-de" }
    ],
    emergency: [
      { original: "Aidez-moi", translated: "Ayúdeme", pronunciation: "Ayoudémé" },
      { original: "Je suis perdu", translated: "Estoy perdido", pronunciation: "Esstoy perdido" },
      { original: "Police", translated: "Policía", pronunciation: "Polissia" }
    ]
  },
  "it": {
    essentials: [
      { original: "Bonjour", translated: "Buongiorno", pronunciation: "Bouone-djor-no" },
      { original: "Merci", translated: "Grazie", pronunciation: "Grat-sié" },
      { original: "S'il vous plaît", translated: "Per favore", pronunciation: "Per favoré" },
      { original: "Pardon", translated: "Scusi", pronunciation: "Skou-zi" }
    ],
    transport: [
      { original: "La gare", translated: "La stazione", pronunciation: "La stat-si-oné" },
      { original: "Où est le taxi ?", translated: "Dov'è il taxi?", pronunciation: "Dov-è il taksi" }
    ],
    food: [
      { original: "L'addition s'il vous plaît", translated: "Il conto per favore", pronunciation: "Il konnt-o per favoré" },
      { original: "Un café s'il vous plaît", translated: "Un caffè per favore", pronunciation: "Oun kaf-é per favoré" }
    ],
    emergency: [
      { original: "Aidez-moi", translated: "Aiutatemi", pronunciation: "A-you-ta-té-mi" },
      { original: "Hôpital", translated: "Ospedale", pronunciation: "Os-pé-da-lé" }
    ]
  },
  "ja": {
    essentials: [
      { original: "Bonjour", translated: "Konnichiwa", pronunciation: "Kon-ni-tchi-wa" },
      { original: "Merci", translated: "Arigatō", pronunciation: "A-ri-ga-to" },
      { original: "Oui / Non", translated: "Hai / Iie", pronunciation: "Haï / I-ié" }
    ],
    transport: [
      { original: "Train", translated: "Densha", pronunciation: "Denn-cha" },
      { original: "Où est le taxi ?", translated: "Takushī wa doko?", pronunciation: "Takouchi wa doko" }
    ],
    food: [
      { original: "L'addition s'il vous plaît", translated: "O-kaikei kudasai", pronunciation: "O-kaï-keï kou-da-saï" },
      { original: "Bon appétit", translated: "Itadakimasu", pronunciation: "I-ta-da-ki-mass" }
    ],
    emergency: [
      { original: "Aidez-moi", translated: "Tasukete", pronunciation: "Ta-sou-ké-té" },
      { original: "Médecin", translated: "Isha", pronunciation: "I-cha" }
    ]
  },
  "pt": {
    essentials: [
      { original: "Bonjour", translated: "Bom dia", pronunciation: "Bon dji-a" },
      { original: "Merci", translated: "Obrigado", pronunciation: "Obri-ga-dou" },
      { original: "Pardon", translated: "Desculpe", pronunciation: "Dech-koulp" }
    ],
    transport: [
      { original: "Aéroport", translated: "Aeroporto", pronunciation: "A-é-ro-por-tou" },
      { original: "Où est le taxi ?", translated: "Onde está o táxi?", pronunciation: "Onndé eshta ou taksi" }
    ],
    food: [
      { original: "L'addition s'il vous plaît", translated: "A conta, por favor", pronunciation: "A konnt-a por fabor" },
      { original: "Délicieux", translated: "Delicioso", pronunciation: "Déli-si-o-zou" }
    ],
    emergency: [
      { original: "Au secours", translated: "Socorro", pronunciation: "Sou-ko-rou" },
      { original: "Pharmacie", translated: "Farmácia", pronunciation: "Far-ma-si-a" }
    ]
  },
  "ar": {
    essentials: [
      { original: "Bonjour", translated: "Marhaba", pronunciation: "Mar-ha-ba" },
      { original: "Merci", translated: "Shukran", pronunciation: "Chou-krane" },
      { original: "S'il vous plaît", translated: "Min fadlak", pronunciation: "Mine fad-lak" }
    ],
    transport: [
      { original: "Ici / Là-bas", translated: "Huna / Hunak", pronunciation: "Hou-na / Hou-nak" },
      { original: "Où est le taxi ?", translated: "Ayna al-taxi?", pronunciation: "Ay-na al-taksi" }
    ],
    food: [
      { original: "L'addition s'il vous plaît", translated: "Al-hisab", pronunciation: "Al-hi-sab" },
      { original: "Pain / Eau", translated: "Khubz / Ma", pronunciation: "Khoubz / Ma" }
    ],
    emergency: [
      { original: "Aidez-moi", translated: "Sa'iduni", pronunciation: "Sa-i-dou-ni" },
      { original: "Danger", translated: "Khatar", pronunciation: "Kha-tar" }
    ]
  }
};

export default function Triptalk() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const targetCode = formData.get("targetLang") as string;
    const time = formData.get("time") as string;
    const targetName = languages.find(l => l.code === targetCode)?.name;

    setTimeout(() => {
      const data = survivalData[targetCode];
      let days = [];

      // Logique de génération selon la durée
      if (time === "24h") {
        days = [{ title: "KIT DE SURVIE EXPRESS", phrases: [...data.essentials, ...data.emergency.slice(0, 1)] }];
      } else if (time === "1semaine") {
        days = [
          { title: "JOUR 1 : Les bases", phrases: data.essentials },
          { title: "JOUR 2 : Se déplacer", phrases: data.transport },
          { title: "JOUR 3 : Manger & Sortir", phrases: data.food }
        ];
      } else {
        days = [
          { title: "SEMAINE 1 : Immersion", phrases: data.essentials },
          { title: "SEMAINE 2 : Logistique", phrases: data.transport },
          { title: "SEMAINE 3 : Gastronomie", phrases: data.food },
          { title: "SEMAINE 4 : Urgences & Sécurité", phrases: data.emergency }
        ];
      }

      setPlan({ planTitle: `Guide ${targetName} (${time})`, days });
      setLoading(false);
    }, 800);
  };

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-sky-100 p-6 md:p-12 font-sans">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 tracking-tighter mb-2">Triptalk</h1>
          <p className="text-sky-800/60 font-medium italic">Le mode "Zéro Bug" activé 🌴</p>
        </header>

        {!plan ? (
          <form onSubmit={generatePlan} className="bg-white/80 p-8 rounded-[3rem] shadow-2xl space-y-8 border border-white">
            <div className="space-y-6">
              <div className="relative">
                <label className="text-sm font-black text-orange-400 ml-4 mb-2 block uppercase">Destination</label>
                <select name="targetLang" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-sky-300 shadow-inner font-bold appearance-none">
                  {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>

              <div className="relative">
                <label className="text-sm font-black text-amber-400 ml-4 mb-2 block uppercase">Durée du séjour</label>
                <select name="time" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-amber-300 shadow-inner font-bold appearance-none">
                  <option value="24h">🚀 24 heures (Express)</option>
                  <option value="1semaine">📅 1 semaine (Complet)</option>
                  <option value="1mois">⏳ 1 mois (Immersion)</option>
                </select>
              </div>
            </div>

            <button disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-6 rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] transition-all">
              {loading ? "Chargement..." : "GÉNÉRER MON PLAN 🥥"}
            </button>
          </form>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-12">
            <button onClick={() => setPlan(null)} className="flex items-center gap-2 font-black text-sky-600 mx-auto bg-sky-50 px-6 py-2 rounded-full">← Retour</button>
            <h2 className="text-3xl font-black text-center">{plan.planTitle}</h2>
            {plan.days.map((day: any, i: number) => (
              <div key={i} className="bg-white/90 p-8 rounded-[2.5rem] shadow-lg border border-white">
                <h3 className="text-xl font-black text-orange-500 mb-6 uppercase tracking-tighter italic">🍹 {day.title}</h3>
                <div className="space-y-4">
                  {day.phrases.map((p: any, j: number) => (
                    <div key={j} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="font-black text-lg text-slate-800">{p.translated}</p>
                        <p className="text-sky-500 text-sm italic">Prononce : {p.pronunciation}</p>
                      </div>
                      <button onClick={() => speak(p.translated)} className="bg-orange-100 p-3 rounded-xl">🔊</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}