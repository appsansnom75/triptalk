"use client";
import { useState } from 'react';

const languages = [
  { name: "Anglais", code: "en", flag: "🇬🇧", desc: "Universal Connection" },
  { name: "Espagnol", code: "es", flag: "🇪🇸", desc: "Vibrante & Latino" },
  { name: "Italien", code: "it", flag: "🇮🇹", desc: "La Dolce Vita" },
  { name: "Japonais", code: "ja", flag: "🇯🇵", desc: "Tradition & Futur" },
  { name: "Portugais", code: "pt", flag: "🇵🇹", desc: "Energia Pura" },
  { name: "Arabe", code: "ar", flag: "🇲🇦", desc: "Hospitalité & Culture" }
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
      { fr: "Merci beaucoup", tr: "Thank you so much", ph: "Tanc you so motch" },
      { fr: "Comment ça va ?", tr: "How are you?", ph: "Haou are you" },
      { fr: "Je ne comprends pas", tr: "I don't understand", ph: "Aïe donnt onndeur-stannd" },
      { fr: "Parlez-vous français ?", tr: "Do you speak French?", ph: "Dou you spik frentch" },
      { fr: "Comment dit-on... ?", tr: "How do you say...?", ph: "Haou dou you sé" },
      { fr: "Je m'appelle...", tr: "My name is...", ph: "Maï né-ime iz" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Where is the taxi?", ph: "Wère iz ze taksi" },
      { fr: "La gare la plus proche", tr: "The nearest station", ph: "Ze nir-est sté-cheun" },
      { fr: "À droite / À gauche", tr: "Right / Left", ph: "Raït / Left" },
      { fr: "Tout droit", tr: "Straight ahead", ph: "Stré-ite a-hed" },
      { fr: "Où est l'aéroport ?", tr: "Where is the airport?", ph: "Wère iz zi air-port" },
      { fr: "Un ticket s'il vous plaît", tr: "One ticket please", ph: "Wone tiquet pliz" },
      { fr: "Où sont les toilettes ?", tr: "Where are the toilets?", ph: "Wère are ze toïlettes" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { fr: "C'est délicieux", tr: "It's delicious", ph: "Its délicheu-ce" },
      { fr: "Santé !", tr: "Cheers!", ph: "Tchirs" },
      { fr: "Sans viande / Végétarien", tr: "No meat / Vegetarian", ph: "No mit / védjétérienne" },
      { fr: "L'eau du robinet", tr: "Tap water", ph: "Tap woteur" },
      { fr: "J'ai une allergie", tr: "I have an allergy", ph: "Aï hav anne alé-rdji" }
    ],
    hotel: [
      { fr: "J'ai une réservation", tr: "I have a reservation", ph: "Aï hav ey réserva-cheun" },
      { fr: "Le code Wi-Fi ?", tr: "The Wi-Fi password?", ph: "Ze waï-faï pass-weurd" },
      { fr: "Petit-déjeuner", tr: "Breakfast", ph: "Breuk-feust" },
      { fr: "À quelle heure est le check-out ?", tr: "What time is check-out?", ph: "Wote taïme iz tchek-aout" }
    ],
    shopping: [
      { fr: "Combien ça coûte ?", tr: "How much is it?", ph: "Haou motch iz it" },
      { fr: "C'est trop cher", tr: "It's too expensive", ph: "Its tou ex-penn-siv" },
      { fr: "Où est le distributeur ?", tr: "Where is the ATM?", ph: "Wère iz zi é-ti-èm" },
      { fr: "Puis-je payer par carte ?", tr: "Can I pay by card?", ph: "Kanne aï pé baï card" }
    ],
    emergency: [
      { fr: "Aidez-moi !", tr: "Help me!", ph: "Helpe mi" },
      { fr: "Où est l'hôpital ?", tr: "Where is the hospital?", ph: "Wère iz ze ospital" },
      { fr: "J'ai perdu mon passeport", tr: "I lost my passport", ph: "Aï lost maï pass-port" },
      { fr: "Appelez la police", tr: "Call the police", ph: "Col ze poliss" }
    ]
  },
  "es": {
    essentials: [
      { fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { fr: "Merci beaucoup", tr: "Muchas gracias", ph: "Moutcha-ss grassia-ss" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" },
      { fr: "Comment ça va ?", tr: "¿Cómo estás?", ph: "Como essta-ss" },
      { fr: "Je ne comprends pas", tr: "No entiendo", ph: "No enntienndo" },
      { fr: "Parlez-vous français ?", tr: "¿Habla francés?", ph: "Abla frain-sésse" },
      { fr: "Enchanté", tr: "Mucho gusto", ph: "Moutcho gousto" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" },
      { fr: "La gare", tr: "La estación", ph: "La essta-ssion" },
      { fr: "Tout droit", tr: "Todo recto", ph: "Todo rek-to" },
      { fr: "À gauche / À droite", tr: "Izquierda / Derecha", ph: "Iss-ki-erda / dé-rétcha" },
      { fr: "Un billet s'il vous plaît", tr: "Un billete por favor", ph: "Oun biyété por fabor" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "La cuenta por favor", ph: "La kouennta por fabor" },
      { fr: "Une table pour deux", tr: "Una mesa para dos", ph: "Ouna messa para doss" },
      { fr: "Une bière s'il vous plaît", tr: "Una cerveza por favor", ph: "Ouna ser-vessa por fabor" },
      { fr: "C'est délicieux", tr: "Está muy rico", ph: "Essta mouy riko" },
      { fr: "Santé !", tr: "¡Salud!", ph: "Salou-de" }
    ],
    hotel: [
      { fr: "J'ai une réservation", tr: "Tengo una reserva", ph: "Tenngo ouna réserva" },
      { fr: "Le Wi-Fi", tr: "El Wi-Fi", ph: "El waï-faï" },
      { fr: "La clé de la chambre", tr: "La llave de la habitación", ph: "La yabé dé la abita-ssion" }
    ],
    shopping: [
      { fr: "Combien ça coûte ?", tr: "¿Cuánto cuesta?", ph: "Kouannto kouessta" },
      { fr: "C'est trop cher", tr: "Es muy caro", ph: "Ess mouy karo" },
      { fr: "Puis-je payer ?", tr: "¿Puedo pagar?", ph: "Pouédo pagar" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Ayúdeme", ph: "Ayoudémé" },
      { fr: "Hôpital", tr: "Hospital", ph: "O-spital" },
      { fr: "Au secours !", tr: "¡Socorro!", ph: "Sokorro" }
    ]
  },
  "it": {
    essentials: [
      { fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
      { fr: "Merci", tr: "Grazie", ph: "Grat-sié" },
      { fr: "S'il vous plaît", tr: "Per favore", ph: "Per favoré" },
      { fr: "Pardon", tr: "Scusi", ph: "Skou-zi" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" },
      { fr: "La gare", tr: "La stazione", ph: "La stat-si-oné" }
    ],
    food: [
      { fr: "L'addition", tr: "Il conto", ph: "Il konnt-o" },
      { fr: "Un café", tr: "Un caffè", ph: "Oun kaf-é" },
      { fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" }
    ],
    hotel: [
      { fr: "Une chambre", tr: "Una camera", ph: "Ouna ka-mé-ra" }
    ],
    shopping: [
      { fr: "C'est cher", tr: "È caro", ph: "È ka-ro" }
    ],
    emergency: [
      { fr: "Au secours", tr: "Aiuto", ph: "A-you-to" }
    ]
  },
  "ja": {
    essentials: [
      { fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { fr: "Merci", tr: "Arigatō", ph: "A-ri-ga-to" },
      { fr: "Pardon", tr: "Sumimasen", ph: "Sou-mi-ma-senn" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Takushī wa doko?", ph: "Takouchi wa doko" }
    ],
    food: [
      { fr: "L'addition", tr: "O-kaikei", ph: "O-kaï-keï" },
      { fr: "Bon appétit", tr: "Itadakimasu", ph: "I-ta-da-ki-mass" }
    ],
    hotel: [
      { fr: "Le Wi-Fi", tr: "Waï-faï", ph: "Wa-ï-fa-ï" }
    ],
    shopping: [
      { fr: "Combien ?", tr: "Ikura desu ka?", ph: "I-kou-ra dess ka" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Tasukete", ph: "Ta-sou-ké-té" }
    ]
  },
  "pt": {
    essentials: [
      { fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { fr: "Merci", tr: "Obrigado", ph: "O-bri-ga-dou" }
    ],
    transport: [
      { fr: "Taxi", tr: "Táxi", ph: "Taksi" }
    ],
    food: [
      { fr: "L'addition", tr: "A conta", ph: "A konnt-a" }
    ],
    hotel: [
      { fr: "Chambre", tr: "Quarto", ph: "Kouar-tou" }
    ],
    shopping: [
      { fr: "Combien ?", tr: "Quanto?", ph: "Kouan-tou" }
    ],
    emergency: [
      { fr: "Secours", tr: "Socorro", ph: "Sou-ko-rou" }
    ]
  },
  "ar": {
    essentials: [
      { fr: "Bonjour", tr: "Marhaba", ph: "Mar-ha-ba" },
      { fr: "Merci", tr: "Shukran", ph: "Chou-krane" }
    ],
    transport: [
      { fr: "Où est... ?", tr: "Ayna... ?", ph: "Ay-na" }
    ],
    food: [
      { fr: "L'addition", tr: "Al-hisab", ph: "Al-hi-sab" }
    ],
    hotel: [
      { fr: "Hôtel", tr: "Funduq", ph: "Foun-douk" }
    ],
    shopping: [
      { fr: "Prix", tr: "Al-thaman", ph: "Al-ta-mane" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Sa'iduni", ph: "Sa-i-dou-ni" }
    ]
  }
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>("essentials");

  const selectedLang = languages.find(l => l.code === target);
  const data = survivalData[target] || survivalData["en"];

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFBF0] text-[#2D2D2D] p-4 md:p-12 font-sans selection:bg-orange-100">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Startup Premium */}
        <header className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-[#1A1A1A] mb-2 italic">
            TRIPTALK<span className="text-orange-600 not-italic">.</span>
          </h1>
          <p className="text-xl font-bold text-orange-800/60 uppercase tracking-[0.3em] italic">Kit de survie ultime</p>
        </header>

        {!showPlan ? (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#A09A8E] mb-2 px-4 italic">Où partez-vous ?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setTarget(lang.code); setShowPlan(true); }}
                  className="group relative flex flex-col items-start p-10 bg-white hover:bg-[#1A1A1A] rounded-[3.5rem] transition-all duration-500 shadow-2xl shadow-orange-900/5 border border-white hover:-translate-y-3"
                >
                  <span className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">{lang.flag}</span>
                  <span className="text-4xl font-black group-hover:text-white transition-colors tracking-tighter mb-2">{lang.name}</span>
                  <span className="text-sm font-medium text-[#A09A8E] group-hover:text-slate-500 mb-6 italic">{lang.desc}</span>
                  <div className="w-14 h-14 rounded-3xl bg-orange-50 group-hover:bg-orange-600 flex items-center justify-center transition-all">
                    <span className="text-orange-600 group-hover:text-white font-bold text-xl">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
            {/* Header Floating */}
            <div className="sticky top-6 z-30 flex items-center justify-between bg-white/95 backdrop-blur-2xl p-6 rounded-[3rem] border border-white shadow-2xl shadow-orange-900/10 mb-12">
              <button onClick={() => setShowPlan(false)} className="w-16 h-16 flex items-center justify-center bg-[#FFFBF0] hover:bg-orange-600 hover:text-white rounded-[2rem] transition-all duration-300 font-black text-3xl shadow-inner">←</button>
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-1">{selectedLang?.flag}</span>
                <span className="font-black text-xl uppercase tracking-tighter">{selectedLang?.name}</span>
              </div>
              <div className="w-16"></div>
            </div>

            {/* Catégories Accordéons */}
            <div className="space-y-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white/70 backdrop-blur-md rounded-[3.5rem] border border-white overflow-hidden transition-all duration-500 shadow-xl">
                  <button 
                    onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
                    className={`w-full flex items-center justify-between p-10 font-black text-2xl transition-all ${openCat === cat.id ? 'bg-[#1A1A1A] text-white' : 'text-[#4A4A4A] hover:bg-white'}`}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center text-3xl ${openCat === cat.id ? 'bg-orange-600' : 'bg-[#FFFBF0] shadow-sm'}`}>{cat.icon}</span>
                      <span className="tracking-tighter uppercase">{cat.label}</span>
                    </div>
                    <span className={`text-4xl transition-transform duration-500 ${openCat === cat.id ? 'rotate-180' : ''}`}>{openCat === cat.id ? '−' : '+'}</span>
                  </button>

                  {openCat === cat.id && (
                    <div className="p-8 space-y-6 bg-white/50 animate-in fade-in slide-in-from-top-4 duration-500">
                      {data[cat.id]?.map((p: any, i: number) => (
                        <div key={i} className="group bg-white p-10 rounded-[3rem] border border-[#F5F0E5] shadow-sm hover:shadow-2xl hover:border-orange-200 transition-all duration-500">
                          <div className="flex justify-between items-start gap-8">
                            <div className="flex-1">
                              <p className="text-xs font-black uppercase text-[#A09A8E] mb-4 tracking-[0.2em]">{p.fr}</p>
                              <h4 className="text-4xl font-[1000] text-[#1A1A1A] leading-[0.95] mb-6 tracking-tighter italic">{p.tr}</h4>
                              <div className="inline-flex items-center gap-4 px-5 py-3 bg-[#FFFBF0] rounded-[1.5rem] border border-orange-100">
                                <span className="text-[11px] font-black text-orange-700 uppercase tracking-widest">Prononciation</span>
                                <span className="text-lg font-bold text-orange-900 italic">{p.ph}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => speak(p.tr)} 
                              className="shrink-0 w-20 h-20 bg-[#1A1A1A] text-white rounded-[2rem] flex items-center justify-center text-4xl hover:bg-orange-600 hover:scale-110 transition-all shadow-2xl active:scale-95"
                            >
                              🔊
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <footer className="py-24 text-center">
              <button 
                onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setShowPlan(false); }}
                className="group flex items-center gap-6 mx-auto px-12 py-6 bg-white rounded-full font-black text-sm uppercase tracking-[0.4em] text-[#A09A8E] hover:text-orange-600 transition-all shadow-2xl hover:-translate-y-1"
              >
                <span>Changer de langue</span>
                <span className="group-hover:translate-x-3 transition-transform text-xl">→</span>
              </button>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}