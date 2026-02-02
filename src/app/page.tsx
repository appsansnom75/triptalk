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

const survivalData: Record<string, any> = {
  "en": [
    { q: "Bonjour / Salut", a: "Hello / Hi", p: "Hélo / Haï" },
    { q: "S'il vous plaît", a: "Please", p: "Pliz" },
    { q: "Merci beaucoup", a: "Thank you so much", p: "Tanc you so motch" },
    { q: "Où sont les toilettes ?", a: "Where are the toilets?", p: "Wère are ze toïlettes" },
    { q: "Où est le taxi / bus ?", a: "Where is the taxi / bus?", p: "Wère iz ze taksi / beusse" },
    { q: "Je ne comprends pas", a: "I don't understand", p: "Aïe donnt onndeur-stannd" },
    { q: "Parlez-vous français ?", a: "Do you speak French?", p: "Dou you spik frentch" },
    { q: "L'addition s'il vous plaît", a: "The bill please", p: "Ze bil pliz" },
    { q: "Combien ça coûte ?", a: "How much is it?", p: "Haou motch iz it" },
    { q: "Où est l'hôpital ?", a: "Where is the hospital?", p: "Wère iz ze ospital" },
    { q: "Une table pour deux", a: "A table for two", p: "Ey tebeul for tou" },
    { q: "Eau s'il vous plaît", a: "Water please", p: "Woteur pliz" },
    { q: "Aidez-moi", a: "Help me", p: "Helpe mi" },
    { q: "Je suis perdu", a: "I am lost", p: "Aïe am lost" },
    { q: "Excusez-moi / Pardon", a: "Excuse me / Sorry", p: "Ex-kiouze mi / Sory" }
  ],
  "es": [
    { q: "Bonjour / Salut", a: "Hola", p: "Ola" },
    { q: "S'il vous plaît", a: "Por favor", p: "Por fabor" },
    { q: "Merci beaucoup", a: "Muchas gracias", p: "Moutcha-ss grassia-ss" },
    { q: "Où sont les toilettes ?", a: "¿Dónde están los baños?", p: "Donndé esstane loss bagnoss" },
    { q: "Où est le taxi ?", a: "¿Dónde está el taxi?", p: "Donndé essta el taksi" },
    { q: "Je ne comprends pas", a: "No entiendo", p: "No enntienndo" },
    { q: "Parlez-vous français ?", a: "¿Habla francés?", p: "Abla frain-sésse" },
    { q: "L'addition s'il vous plaît", a: "La cuenta por favor", p: "La kouennta por fabor" },
    { q: "Combien ça coûte ?", a: "¿Cuánto cuesta?", p: "Kouannto kouessta" },
    { q: "Où est l'hôpital ?", a: "¿Dónde está el hospital?", p: "Donndé essta el ospital" },
    { q: "Une table pour deux", a: "Una mesa para dos", p: "Ouna messa para doss" },
    { q: "Eau s'il vous plaît", a: "Agua por favor", p: "Agwa por fabor" },
    { q: "Aidez-moi", a: "Ayúdeme", p: "Ayoudémé" },
    { q: "Je suis perdu", a: "Estoy perdido", p: "Esstoy perdido" },
    { q: "Pardon", a: "Perdón / Disculpe", p: "Perdonne / Diss-koul-pé" }
  ],
  "it": [
    { q: "Bonjour / Salut", a: "Buongiorno / Ciao", p: "Bouone-djor-no / Tchao" },
    { q: "S'il vous plaît", a: "Per favore", p: "Per favoré" },
    { q: "Merci beaucoup", a: "Grazie mille", p: "Grat-sié mil-lé" },
    { q: "Où sont les toilettes ?", a: "Dove sono i bagni?", p: "Dov-é sono i ba-nyi" },
    { q: "Où est le taxi ?", a: "Dov'è il taxi?", p: "Dov-è il taksi" },
    { q: "Je ne comprends pas", a: "Non capisco", p: "Non ka-pis-ko" },
    { q: "Parlez-vous français ?", a: "Parla francese?", p: "Par-la fran-tché-zé" },
    { q: "L'addition s'il vous plaît", a: "Il conto per favore", p: "Il konnt-o per favoré" },
    { q: "Combien ça coûte ?", a: "Quanto costa?", p: "Kouan-to kos-ta" },
    { q: "Où est l'hôpital ?", a: "Dov'è l'ospedale?", p: "Dov-è l-os-pé-da-lé" },
    { q: "Une table pour deux", a: "Un tavolo per due", p: "Oun ta-vo-lo per dou-é" },
    { q: "Eau s'il vous plaît", a: "Acqua per favore", p: "Ak-koua per favoré" },
    { q: "Aidez-moi", a: "Aiutatemi", p: "A-you-ta-té-mi" },
    { q: "Je suis perdu", a: "Mi sono perso", p: "Mi so-no per-so" },
    { q: "Pardon", a: "Scusi", p: "Skou-zi" }
  ],
  "ja": [
    { q: "Bonjour", a: "Konnichiwa", p: "Kon-ni-tchi-wa" },
    { q: "S'il vous plaît", a: "Onegaishimasu", p: "O-né-ga-ï-chi-mass" },
    { q: "Merci", a: "Arigatō gozaimasu", p: "A-ri-ga-to go-za-ï-mass" },
    { q: "Où sont les toilettes ?", a: "Toire wa doko?", p: "To-ï-ré wa do-ko" },
    { q: "Taxi", a: "Takushī", p: "Takou-chi" },
    { q: "Je ne comprends pas", a: "Wakarimasen", p: "Wa-ka-ri-ma-senn" },
    { q: "L'addition s'il vous plaît", a: "O-kaikei kudasai", p: "O-kaï-keï kou-da-saï" },
    { q: "Aidez-moi", a: "Tasukete kudasai", p: "Ta-sou-ké-té kou-da-saï" }
  ]
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);

  const selectedLang = languages.find(l => l.code === target);
  const phrases = survivalData[target] || [];

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-md mx-auto">
        
        {/* Header simple & efficace */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-black text-orange-500 tracking-tighter italic">TRIPTALK</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Survival Guide v2.0</p>
        </header>

        {!showPlan ? (
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
            <label className="block text-xs font-black uppercase text-slate-400 mb-4 ml-2">Choisis ta destination</label>
            <div className="space-y-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setTarget(lang.code); setShowPlan(true); }}
                  className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-orange-500 hover:text-white rounded-2xl transition-all group border border-slate-100"
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-black text-lg">{lang.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-all">→</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <button onClick={() => setShowPlan(false)} className="text-2xl">←</button>
              <h2 className="font-black text-xl uppercase italic text-orange-500">{selectedLang?.name}</h2>
              <span className="text-2xl">{selectedLang?.flag}</span>
            </div>

            <div className="grid gap-3">
              {phrases.map((p: any, i: number) => (
                <div key={i} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center justify-between group active:scale-[0.98] transition-all">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-slate-300 mb-1">{p.q}</p>
                    <p className="text-xl font-black text-slate-800 leading-tight">{p.a}</p>
                    <p className="text-orange-500 font-bold text-sm italic mt-1">{p.p}</p>
                  </div>
                  <button 
                    onClick={() => speak(p.a)} 
                    className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-xl hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="w-full py-4 text-slate-300 font-bold text-xs uppercase tracking-widest"
            >
              Retour en haut ↑
            </button>
          </div>
        )}
      </div>
    </main>
  );
}