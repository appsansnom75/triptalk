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
      { fr: "Serviettes propres", tr: "Clean towels", ph: "Kline taou-els" },
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
      { fr: "Appelez la police", tr: "Call the police", ph: "Col ze poliss" },
      { fr: "Je suis malade", tr: "I am sick", ph: "Aïe am sik" }
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
      { fr: "Un billet s'il vous plaît", tr: "Un billete por favor", ph: "Oun biyété por fabor" },
      { fr: "Où sont les toilettes ?", tr: "¿Dónde están los baños?", ph: "Donndé esstane loss bagnoss" }
    ],
    food: [
      { fr: "L'addition s'il vous plaît", tr: "La cuenta por favor", ph: "La kouennta por fabor" },
      { fr: "Une table pour deux", tr: "Una mesa para dos", ph: "Ouna messa para doss" },
      { fr: "Une bière s'il vous plaît", tr: "Una cerveza por favor", ph: "Ouna ser-vessa por fabor" },
      { fr: "C'est délicieux", tr: "Está muy rico", ph: "Essta mouy riko" },
      { fr: "Santé !", tr: "¡Salud!", ph: "Salou-de" },
      { fr: "Sin picante", tr: "Sans piment", ph: "Sine pikanté" }
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
      { fr: "Au secours !", tr: "¡Socorro!", ph: "Sokorro" },
      { fr: "Police", tr: "Policía", ph: "Polissia" }
    ]
  },
  "it": {
    essentials: [
      { fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
      { fr: "Salut / Ciao", tr: "Ciao", ph: "Tchao" },
      { fr: "Merci beaucoup", tr: "Grazie mille", ph: "Grat-sié mil-lé" },
      { fr: "S'il vous plaît", tr: "Per favore", ph: "Per favoré" },
      { fr: "Comment ça va ?", tr: "Come sta?", ph: "Komé essta" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" },
      { fr: "La gare", tr: "La stazione", ph: "La stat-si-oné" },
      { fr: "À gauche / À droite", tr: "A sinistra / destra", ph: "A si-nistra / des-tra" }
    ],
    food: [
      { fr: "L'addition", tr: "Il conto", ph: "Il konnt-o" },
      { fr: "Un café s'il vous plaît", tr: "Un caffè per favore", ph: "Oun kaf-é per favoré" },
      { fr: "Une table pour deux", tr: "Un tavolo per due", ph: "Oun ta-vo-lo per dou-é" },
      { fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" }
    ],
    hotel: [
      { fr: "Une chambre", tr: "Una camera", ph: "Ouna ka-mé-ra" },
      { fr: "La clé", tr: "La chiave", ph: "La kia-vé" }
    ],
    shopping: [
      { fr: "C'est cher", tr: "È caro", ph: "È ka-ro" },
      { fr: "Combien ?", tr: "Quanto?", ph: "Kouan-to" }
    ],
    emergency: [
      { fr: "Au secours", tr: "Aiuto", ph: "A-you-to" },
      { fr: "Un médecin", tr: "Un medico", ph: "Oun mé-di-ko" }
    ]
  },
  "ja": {
    essentials: [
      { fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { fr: "Merci", tr: "Arigatō gozaimasu", ph: "A-ri-ga-to go-za-ï-mass" },
      { fr: "S'il vous plaît", tr: "Onegaishimasu", ph: "O-né-ga-ï-chi-mass" },
      { fr: "Pardon / Excusez-moi", tr: "Sumimasen", ph: "Sou-mi-ma-senn" }
    ],
    transport: [
      { fr: "Où est le taxi ?", tr: "Takushī wa doko desu ka?", ph: "Takouchi wa doko dess ka" },
      { fr: "Où sont les toilettes ?", tr: "Toire wa doko desu ka?", ph: "To-ï-ré wa do-ko dess ka" },
      { fr: "La gare", tr: "Eki", ph: "É-ki" }
    ],
    food: [
      { fr: "L'addition", tr: "O-kaikei", ph: "O-kaï-keï" },
      { fr: "C'est délicieux", tr: "Oishii desu", ph: "O-ï-chi dess" },
      { fr: "Bon appétit", tr: "Itadakimasu", ph: "I-ta-da-ki-mass" }
    ],
    hotel: [
      { fr: "Chambre", tr: "Heya", ph: "Hé-ya" },
      { fr: "Le Wi-Fi", tr: "Waï-faï", ph: "Wa-ï-fa-ï" }
    ],
    shopping: [
      { fr: "Combien ça coûte ?", tr: "Ikura desu ka?", ph: "I-kou-ra dess ka" },
      { fr: "C'est cher", tr: "Takai desu", ph: "Ta-ka-ï dess" }
    ],
    emergency: [
      { fr: "Aidez-moi", tr: "Tasukete kudasai", ph: "Ta-sou-ké-té kou-da-saï" },
      { fr: "Police", tr: "Keisatsu", ph: "Keï-sa-tsou" }
    ]
  },
  "pt": {
    essentials: [
      { fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { fr: "Merci beaucoup", tr: "Muito obrigado", ph: "Mou-ï-tou o-bri-ga-dou" },
      { fr: "S'il vous plaît", tr: "Por favor", ph: "Por fa-bor" }
    ],
    transport: [
      { fr: "Le taxi", tr: "O táxi", ph: "Ou taksi" },
      { fr: "Toilettes", tr: "O banheiro", ph: "Ou ba-nyé-rou" }
    ],
    food: [
      { fr: "L'addition", tr: "A conta", ph: "A konnt-a" },
      { fr: "Une bière", tr: "Uma cerveja", ph: "Ou-ma ser-vé-ja" }
    ],
    hotel: [
      { fr: "Une chambre", tr: "Um quarto", ph: "Oun kouar-tou" }
    ],
    shopping: [
      { fr: "Combien ?", tr: "Quanto custa?", ph: "Kouan-tou kous-ta" }
    ],
    emergency: [
      { fr: "Au secours", tr: "Socorro", ph: "Sou-ko-rou" }
    ]
  },
  "ar": {
    essentials: [
      { fr: "Bonjour", tr: "Marhaba", ph: "Mar-ha-ba" },
      { fr: "Merci", tr: "Shukran", ph: "Chou-krane" },
      { fr: "S'il vous plaît", tr: "Min fadlak", ph: "Mine fad-lak" }
    ],
    transport: [
      { fr: "Taxi", tr: "Taxi", ph: "Taksi" },
      { fr: "Où est... ?", tr: "Ayna... ?", ph: "Ay-na" }
    ],
    food: [
      { fr: "L'addition", tr: "Al-hisab", ph: "Al-hi-sab" }
    ],
    hotel: [
      { fr: "Hôtel", tr: "Funduq", ph: "Foun-douk" }
    ],
    shopping: [
      { fr: "Le prix ?", tr: "Al-thaman ?", ph: "Al-ta-mane" }
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
    <main className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D] p-4 md:p-8 font-sans selection:bg-orange-100">
      <div className="max-w-md mx-auto">
        
        <header className="text-center mt-6 mb-10">
          <h1 className="text-5xl font-black tracking-tighter text-[#1A1A1A] italic">
            TRIPTALK<span className="text-orange-600 not-italic">.</span>
          </h1>
          <p className="text-[10px] font-black text-orange-800/40 uppercase tracking-[0.3em]">Kit de survie ultime</p>
        </header>

        {!showPlan ? (
          <div className="grid gap-3 animate-in fade-in duration-500">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setTarget(lang.code); setShowPlan(true); }}
                className="group flex items-center gap-4 p-5 bg-white hover:bg-[#1A1A1A] rounded-[2rem] transition-all shadow-sm border border-slate-100 hover:-translate-y-1"
              >
                <span className="text-3xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="text-lg font-bold group-hover:text-white leading-none">{lang.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{lang.desc}</p>
                </div>
                <span className="ml-auto text-orange-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
            <div className="sticky top-2 z-30 flex items-center justify-between bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white shadow-sm mb-6">
              <button onClick={() => setShowPlan(false)} className="w-10 h-10 flex items-center justify-center bg-[#F5F5F0] rounded-xl font-bold text-lg hover:bg-orange-600 hover:text-white transition-colors">←</button>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedLang?.flag}</span>
                <span className="font-black text-[11px] uppercase tracking-[0.1em]">{selectedLang?.name}</span>
              </div>
              <div className="w-10"></div>
            </div>

            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-[1.8rem] border border-slate-100 overflow-hidden shadow-sm transition-all">
                  <button 
                    onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
                    className={`w-full flex items-center justify-between p-5 font-bold transition-all ${openCat === cat.id ? 'bg-[#1A1A1A] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-xs font-black uppercase tracking-widest">{cat.label}</span>
                    </div>
                    <span className="text-xl font-light">{openCat === cat.id ? '−' : '+'}</span>
                  </button>

                  {openCat === cat.id && (
                    <div className="p-3 space-y-2 bg-[#FBFBFA] animate-in slide-in-from-top-2 duration-300">
                      {data[cat.id]?.map((p: any, i: number) => (
                        <div key={i} className="bg-white p-5 rounded-[1.4rem] border border-slate-50 flex items-center justify-between gap-4 hover:border-orange-100 transition-colors">
                          <div className="flex-1">
                            <p className="text-[9px] font-black uppercase text-slate-400 mb-2 tracking-wider leading-none">{p.fr}</p>
                            <h4 className="text-xl font-[900] text-[#1A1A1A] italic leading-tight mb-3 tracking-tight">{p.tr}</h4>
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] font-black bg-orange-50 text-orange-700 px-2 py-1 rounded-lg uppercase tracking-tighter">Prononcer</span>
                                <span className="text-xs text-slate-500 font-bold italic">{p.ph}</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => speak(p.tr)} 
                            className="shrink-0 w-11 h-11 bg-[#1A1A1A] text-white rounded-2xl flex items-center justify-center text-xl active:scale-90 transition-all shadow-md hover:bg-orange-600"
                          >
                            🔊
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <footer className="py-10 text-center">
              <button onClick={() => setShowPlan(false)} className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-orange-600 transition-colors">
                Changer de destination
              </button>
            </footer>
          </div>
        )}
      </div>
    </main>
  );
}