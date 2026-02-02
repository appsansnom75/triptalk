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
      { id: "en17", fr: "Où sont les toilettes ?", tr: "Where are the toilets?", ph: "Wère are ze toï-let-s" }
    ],
    food: [
      { id: "en18", fr: "L'addition s'il vous plaît", tr: "The bill please", ph: "Ze bil pliz" },
      { id: "en19", fr: "Une table pour deux", tr: "A table for two", ph: "Ey tebeul for tou" },
      { id: "en20", fr: "Une bière s'il vous plaît", tr: "A beer please", ph: "Ey bir pliz" },
      { id: "en21", fr: "C'est délicieux", tr: "It's delicious", ph: "Its dé-licheu-ce" },
      { id: "en22", fr: "J'ai une allergie", tr: "I have an allergy", ph: "Aï hav ane alér-dji" },
      { id: "en23", fr: "C'est piquant ?", tr: "Is it spicy?", ph: "Iz it spaï-si" }
    ],
    hotel: [
      { id: "en24", fr: "Le code Wi-Fi ?", tr: "The Wi-Fi password?", ph: "Ze waï-faï pass-weurd" },
      { id: "en25", fr: "Petit-déjeuner", tr: "Breakfast", ph: "Breuk-feust" },
      { id: "en26", fr: "Plus de serviettes", tr: "More towels", ph: "More taou-el-z" }
    ],
    shopping: [
      { id: "en27", fr: "Combien ça coûte ?", tr: "How much is it?", ph: "Haou motch iz it" },
      { id: "en28", fr: "C'est trop cher", tr: "It's too expensive", ph: "Its tou ex-penn-siv" },
      { id: "en29", fr: "Je regarde juste", tr: "I'm just looking", ph: "Aïm djosst lou-king" }
    ],
    emergency: [
      { id: "en30", fr: "Aidez-moi !", tr: "Help me!", ph: "Helpe mi" },
      { id: "en31", fr: "Où est l'hôpital ?", tr: "Where is the hospital?", ph: "Wère iz ze os-pital" },
      { id: "en32", fr: "Appelez la police", tr: "Call the police", ph: "Col ze po-liss" }
    ]
  },
  "es-ES": {
    essentials: [
      { id: "es1", fr: "Bonjour", tr: "Hola", ph: "Ola" },
      { id: "es2", fr: "Merci beaucoup", tr: "Muchas gracias", ph: "Moutcha-ss grassia-ss" },
      { id: "es3", fr: "S'il vous plaît", tr: "Por favor", ph: "Por fabor" },
      { id: "es4", fr: "Comment ça va ?", tr: "¿Cómo estás?", ph: "Como essta-ss" },
      { id: "es5", fr: "Je ne comprends pas", tr: "No entiendo", ph: "No enn-ti-enndo" },
      { id: "es6", fr: "Parlez-vous français ?", tr: "¿Habla francés?", ph: "Abla fran-céss" },
      { id: "es7", fr: "Je m'appelle...", tr: "Me llamo...", ph: "Mé ya-mo" },
      { id: "es8", fr: "Pardon", tr: "Perdón / Disculpe", ph: "Per-donne / Diss-koul-pé" },
      { id: "es9", fr: "De rien", tr: "De nada", ph: "Dé nada" },
      { id: "es10", fr: "Oui / Non", tr: "Sí / No", ph: "Si / No" }
    ],
    transport: [
      { id: "es11", fr: "Où est le taxi ?", tr: "¿Dónde está el taxi?", ph: "Donndé essta el taksi" },
      { id: "es12", fr: "La gare", tr: "La estación de tren", ph: "La essta-ssion dé trenn" },
      { id: "es13", fr: "À droite / À gauche", tr: "A la derecha / izquierda", ph: "A la dé-rétcha / iss-ki-erda" },
      { id: "es14", fr: "Tout droit", tr: "Todo recto", ph: "Todo rek-to" },
      { id: "es15", fr: "Un ticket s'il vous plaît", tr: "Un billete por favor", ph: "Oun bi-yé-té por fabor" },
      { id: "es16", fr: "Est-ce loin ?", tr: "¿Está lejos?", ph: "Essta lé-hoss" },
      { id: "es17", fr: "Toilettes", tr: "¿Dónde están los baños?", ph: "Donndé esstan loss ba-nioss" }
    ],
    food: [
      { id: "es18", fr: "L'addition s'il vous plaît", tr: "La cuenta por favor", ph: "La kouennta por fabor" },
      { id: "es19", fr: "Une table pour deux", tr: "Una mesa para dos", ph: "Ouna messa para doss" },
      { id: "es20", fr: "Une bière", tr: "Una cerveza", ph: "Ouna cer-bé-sa" },
      { id: "es21", fr: "C'est délicieux", tr: "Está delicioso", ph: "Essta dé-liss-io-so" },
      { id: "es22", fr: "J'ai une allergie", tr: "Tengo una alergia", ph: "Tenngo ouna alér-hia" },
      { id: "es23", fr: "C'est piquant ?", tr: "¿Es picante?", ph: "Ess pi-kannt-é" }
    ],
    hotel: [
      { id: "es24", fr: "Le Wi-Fi", tr: "La clave del Wi-Fi", ph: "La kla-bé del waï-faï" },
      { id: "es25", fr: "Petit-déjeuner", tr: "El desayuno", ph: "El dé-sa-you-no" },
      { id: "es26", fr: "Serviettes", tr: "Toallas", ph: "To-a-yass" }
    ],
    shopping: [
      { id: "es27", fr: "Combien ça coûte ?", tr: "¿Cuánto cuesta?", ph: "Kouannto kouessta" },
      { id: "es28", fr: "C'est cher", tr: "Es caro", ph: "Ess karo" },
      { id: "es29", fr: "Je regarde juste", tr: "Solo estoy mirando", ph: "Solo esstoy mi-ranndo" }
    ],
    emergency: [
      { id: "es30", fr: "Au secours !", tr: "¡Socorro!", ph: "Sokorro" },
      { id: "es31", fr: "L'hôpital", tr: "El hospital", ph: "El oss-pi-tal" },
      { id: "es32", fr: "La policía", tr: "La policía", ph: "La po-li-ssia" }
    ]
  },
  "it-IT": {
    essentials: [
      { id: "it1", fr: "Bonjour", tr: "Buongiorno", ph: "Bouone-djor-no" },
      { id: "it2", fr: "Merci beaucoup", tr: "Grazie mille", ph: "Grat-sié mil-lé" },
      { id: "it3", fr: "S'il vous plaît", tr: "Per favore", ph: "Per favoré" },
      { id: "it4", fr: "Comment ça va ?", tr: "Come sta?", ph: "Komé essta" },
      { id: "it5", fr: "Je ne comprends pas", tr: "Non capisco", ph: "Non ka-pis-ko" },
      { id: "it6", fr: "Parlez-vous français ?", tr: "Parla francese?", ph: "Par-la fran-tchè-zé" },
      { id: "it7", fr: "Je m'appelle...", tr: "Mi chiamo...", ph: "Mi kia-mo" },
      { id: "it8", fr: "Pardon", tr: "Scusi", ph: "Skou-zi" },
      { id: "it9", fr: "De rien", tr: "Prego", ph: "Prè-go" },
      { id: "it10", fr: "Oui / Non", tr: "Sì / No", ph: "Si / No" }
    ],
    transport: [
      { id: "it11", fr: "Où est le taxi ?", tr: "Dov'è il taxi?", ph: "Dov-è il taksi" },
      { id: "it12", fr: "La gare", tr: "La stazione", ph: "La stat-si-oné" },
      { id: "it13", fr: "À gauche / À droite", tr: "A sinistra / destra", ph: "A si-nistra / des-tra" },
      { id: "it14", fr: "Tout droit", tr: "Sempre dritto", ph: "Sèm-pré drit-to" },
      { id: "it15", fr: "Un ticket", tr: "Un biglietto", ph: "Oun bi-yi-èt-to" },
      { id: "it16", fr: "Est-ce loin ?", tr: "È lontano?", ph: "È lonn-ta-no" },
      { id: "it17", fr: "Toilettes", tr: "Dove sono i bagni?", ph: "Do-vé so-no i ba-nyi" }
    ],
    food: [
      { id: "it18", fr: "L'addition", tr: "Il conto per favore", ph: "Il konnt-o per favoré" },
      { id: "it19", fr: "Une table pour deux", tr: "Un tavolo per due", ph: "Oun ta-vo-lo per dou-é" },
      { id: "it20", fr: "Un café", tr: "Un caffè", ph: "Oun kaf-é" },
      { id: "it21", fr: "C'est délicieux", tr: "È delizioso", ph: "È dé-li-tsio-zo" },
      { id: "it22", fr: "J'ai une allergie", tr: "Ho un'allergia", ph: "O oun al-lèr-dji-a" },
      { id: "it23", fr: "C'est piquant ?", tr: "È piccante?", ph: "È pi-kann-té" }
    ],
    hotel: [
      { id: "it24", fr: "Wi-Fi", tr: "La password del Wi-Fi", ph: "La pass-word del waï-faï" },
      { id: "it25", fr: "Petit-déjeuner", tr: "La colazione", ph: "La ko-la-tsi-o-né" },
      { id: "it26", fr: "La clé", tr: "La chiave", ph: "La kia-vé" }
    ],
    shopping: [
      { id: "it27", fr: "Combien ?", tr: "Quanto costa?", ph: "Kouan-to kos-ta" },
      { id: "it28", fr: "C'est cher", tr: "È caro", ph: "È ka-ro" },
      { id: "it29", fr: "Je regarde juste", tr: "Sto solo guardando", ph: "Sto solo gou-ar-dann-do" }
    ],
    emergency: [
      { id: "it30", fr: "Au secours !", tr: "Aiuto!", ph: "A-you-to" },
      { id: "it31", fr: "Un médecin", tr: "Un medico", ph: "Oun mé-di-ko" },
      { id: "it32", fr: "Police", tr: "Polizia", ph: "Po-li-tsia" }
    ]
  },
  "ja-JP": {
    essentials: [
      { id: "ja1", fr: "Bonjour", tr: "Konnichiwa", ph: "Kon-ni-tchi-wa" },
      { id: "ja2", fr: "Merci beaucoup", tr: "Dōmo arigatō", ph: "Do-mo a-ri-ga-to" },
      { id: "ja3", fr: "S'il vous plaît", tr: "Onegaishimasu", ph: "O-né-ga-ï-chi-mass" },
      { id: "ja4", fr: "Comment ça va ?", tr: "O-genki desu ka?", ph: "O-guenn-ki dess ka" },
      { id: "ja5", fr: "Je ne comprends pas", tr: "Wakarimasen", ph: "Wa-ka-ri-ma-sen" },
      { id: "ja6", fr: "Parlez-vous français ?", tr: "Furansugo o hanasemasu ka?", ph: "Fou-ran-sou-go o ha-na-sé-mass ka" },
      { id: "ja7", fr: "Je m'appelle...", tr: "Watashi no namae wa...", ph: "Wa-ta-chi no na-ma-é wa" },
      { id: "ja8", fr: "Pardon", tr: "Sumimasen", ph: "Sou-mi-ma-sen" },
      { id: "ja9", fr: "De rien", tr: "Dōitashimashite", ph: "Do-ï-ta-chi-ma-chi-té" },
      { id: "ja10", fr: "Oui / Non", tr: "Hai / Iie", ph: "Ha-ï / I-ié" }
    ],
    transport: [
      { id: "ja11", fr: "Où est le taxi ?", tr: "Takushī wa doko?", ph: "Takou-shi wa doko" },
      { id: "ja12", fr: "La gare", tr: "Eki wa doko desu ka?", ph: "É-ki wa doko dess ka" },
      { id: "ja13", fr: "À droite / À gauche", tr: "Migi / Hidari", ph: "Mi-gui / Hi-da-ri" },
      { id: "ja14", fr: "Tout droit", tr: "Massugu", ph: "Mass-gou" },
      { id: "ja15", fr: "Un ticket", tr: "Kippu", ph: "Kip-pou" },
      { id: "ja16", fr: "Est-ce loin ?", tr: "Tōi desu ka?", ph: "To-ï dess ka" },
      { id: "ja17", fr: "Toilettes", tr: "Toire wa doko?", ph: "To-ï-ré wa doko" }
    ],
    food: [
      { id: "ja18", fr: "L'addition", tr: "O-kaikei o kudasai", ph: "O-kaï-keï o kou-da-saï" },
      { id: "ja19", fr: "Table pour deux", tr: "Futari desu", ph: "Fou-ta-ri dess" },
      { id: "ja20", fr: "De l'eau s'il vous plaît", tr: "Mizu o kudasai", ph: "Mi-zou o kou-da-saï" },
      { id: "ja21", fr: "C'est délicieux", tr: "Oishii desu", ph: "Oï-chi dess" },
      { id: "ja22", fr: "Allergie", tr: "Arerugī ga arimasu", ph: "A-ré-rou-gui ga a-ri-mass" },
      { id: "ja23", fr: "C'est piquant ?", tr: "Karai desu ka?", ph: "Ka-ra-ï dess ka" }
    ],
    hotel: [
      { id: "ja24", fr: "Wi-Fi", tr: "Waï-faï", ph: "Wa-ï-fa-ï" },
      { id: "ja25", fr: "Petit-déjeuner", tr: "Chōshoku", ph: "Tcho-cho-kou" },
      { id: "ja26", fr: "La chambre", tr: "Heya", ph: "Hé-ya" }
    ],
    shopping: [
      { id: "ja27", fr: "Combien ?", tr: "Ikura desu ka?", ph: "I-kou-ra dess ka" },
      { id: "ja28", fr: "C'est cher", tr: "Takai desu", ph: "Ta-ka-ï dess" },
      { id: "ja29", fr: "Je regarde juste", tr: "Mite iru dake desu", ph: "Mi-té i-rou da-ké dess" }
    ],
    emergency: [
      { id: "ja30", fr: "Aidez-moi !", tr: "Tasukete!", ph: "Ta-sou-ké-té" },
      { id: "ja31", fr: "Hôpital", tr: "Byōin", ph: "Byo-inn" },
      { id: "ja32", fr: "Police", tr: "Keisatsu", ph: "Keï-sa-tsou" }
    ]
  },
  "pt-PT": {
    essentials: [
      { id: "pt1", fr: "Bonjour", tr: "Bom dia", ph: "Bon dji-a" },
      { id: "pt2", fr: "Merci", tr: "Muito obrigado", ph: "Mou-ï-tou o-bri-ga-dou" },
      { id: "pt3", fr: "S'il vous plaît", tr: "Por favor", ph: "Por fa-bor" },
      { id: "pt4", fr: "Comment ça va ?", tr: "Como está?", ph: "Komo es-ta" },
      { id: "pt5", fr: "Je ne comprends pas", tr: "Não entendo", ph: "Na-on en-tenn-dou" },
      { id: "pt6", fr: "Parlez-vous français ?", tr: "Fala francês?", ph: "Fa-la fran-céss" },
      { id: "pt7", fr: "Je m'appelle...", tr: "Chamo-me...", ph: "Cha-mo-mé" },
      { id: "pt8", fr: "Pardon", tr: "Desculpe", ph: "Des-koul-pé" },
      { id: "pt9", fr: "De rien", tr: "De nada", ph: "Dé nada" },
      { id: "pt10", fr: "Oui / Non", tr: "Sim / Não", ph: "Sin / Na-on" }
    ],
    transport: [
      { id: "pt11", fr: "Où est le taxi ?", tr: "Onde está o táxi?", ph: "Onndé es-ta ou tak-si" },
      { id: "pt12", fr: "La gare", tr: "A estação de comboios", ph: "A es-ta-ssion dé kon-bo-yoss" },
      { id: "pt13", fr: "À droite / À gauche", tr: "Direita / Esquerda", ph: "Di-ré-ta / Es-ker-da" },
      { id: "pt14", fr: "Tout droit", tr: "Sempre em frente", ph: "Sem-pré em frenn-té" },
      { id: "pt15", fr: "Un ticket", tr: "Um bilhete", ph: "Oun bi-yé-té" },
      { id: "pt16", fr: "Est-ce loin ?", tr: "É longe?", ph: "É lonn-jé" },
      { id: "pt17", fr: "Toilettes", tr: "Onde são os banheiros?", ph: "Onndé sa-on oss ba-nié-rouss" }
    ],
    food: [
      { id: "pt18", fr: "L'addition", tr: "A conta por favor", ph: "A konnt-a por fa-bor" },
      { id: "pt19", fr: "Une table", tr: "Uma mesa para dois", ph: "Ouna mé-za para do-ï-sh" },
      { id: "pt20", fr: "Un café", tr: "Um café", ph: "Oun ka-fé" },
      { id: "pt21", fr: "Délicieux", tr: "Está delicioso", ph: "Es-ta dé-li-si-o-zou" },
      { id: "pt22", fr: "Allergie", tr: "Tenho uma alergia", ph: "Te-niou ouna a-lér-ji-a" },
      { id: "pt23", fr: "C'est piquant ?", tr: "É picante?", ph: "É pi-kannt-é" }
    ],
    hotel: [
      { id: "pt24", fr: "Wi-Fi", tr: "A senha do Wi-Fi", ph: "A sé-ni-a dou waï-faï" },
      { id: "pt25", fr: "Petit-déjeuner", tr: "O pequeno-almoço", ph: "Ou pé-ké-no al-mo-sou" },
      { id: "pt26", fr: "La clé", tr: "A chave", ph: "A cha-bé" }
    ],
    shopping: [
      { id: "pt27", fr: "Combien ?", tr: "Quanto custa?", ph: "Kouan-tou kous-ta" },
      { id: "pt28", fr: "C'est cher", tr: "É caro", ph: "É ka-ro" },
      { id: "pt29", fr: "Je regarde", tr: "Só estou a ver", ph: "So es-toy a bér" }
    ],
    emergency: [
      { id: "pt30", fr: "Au secours !", tr: "Socorro!", ph: "Sou-ko-rou" },
      { id: "pt31", fr: "Hôpital", tr: "O hospital", ph: "Ou oss-pi-tal" },
      { id: "pt32", fr: "Police", tr: "A polícia", ph: "A po-li-si-a" }
    ]
  },
  "ar-SA": {
    essentials: [
      { id: "ar1", fr: "Bonjour", tr: "Marhaba", ph: "Mar-ha-ba" },
      { id: "ar2", fr: "Merci", tr: "Shukran", ph: "Chou-krane" },
      { id: "ar3", fr: "S'il vous plaît", tr: "Min fadlak", ph: "Minn fad-lak" },
      { id: "ar4", fr: "Comment ça va ?", tr: "Kayfa halak?", ph: "Kay-fa ha-lak" },
      { id: "ar5", fr: "Je ne comprends pas", tr: "La afham", ph: "La af-ham" },
      { id: "ar6", fr: "Parlez-vous français ?", tr: "Hal tatakallam al-faransiya?", ph: "Hal ta-ta-ka-lam al-fa-ran-si-ya" },
      { id: "ar7", fr: "Je m'appelle...", tr: "Ismi...", ph: "Iss-mi" },
      { id: "ar8", fr: "Pardon", tr: "Afwan", ph: "Af-wane" },
      { id: "ar9", fr: "De rien", tr: "Ahlan bika", ph: "Ah-lane bi-ka" },
      { id: "ar10", fr: "Oui / Non", tr: "Na'am / La", ph: "Na-am / La" }
    ],
    transport: [
      { id: "ar11", fr: "Où est le taxi ?", tr: "Ayna al-taxi?", ph: "Ay-na al-tak-si" },
      { id: "ar12", fr: "La gare", tr: "Al-mahatta", ph: "Al-ma-ha-ta" },
      { id: "ar13", fr: "À droite / À gauche", tr: "Yamin / Yasar", ph: "Ya-mine / Ya-sar" },
      { id: "ar14", fr: "Tout droit", tr: "Ilal amam", ph: "I-lal a-mam" },
      { id: "ar15", fr: "Un ticket", tr: "Tadhkira", ph: "Tad-ki-ra" },
      { id: "ar16", fr: "Est-ce loin ?", tr: "Hal huwa ba'id?", ph: "Hal hou-wa ba-id" },
      { id: "ar17", fr: "Toilettes", tr: "Ayna al-hammam?", ph: "Ay-na al-ha-mam" }
    ],
    food: [
      { id: "ar18", fr: "L'addition", tr: "Al-hisab min fadlak", ph: "Al-hi-sab minn fad-lak" },
      { id: "ar19", fr: "Table pour deux", tr: "Tawila li shakhsayn", ph: "Ta-wi-la li chak-say-ne" },
      { id: "ar20", fr: "De l'eau", tr: "Ma'a min fadlak", ph: "Ma-a minn fad-lak" },
      { id: "ar21", fr: "Délicieux", tr: "Ladhidh jiddan", ph: "La-dize dji-dane" },
      { id: "ar22", fr: "Allergie", tr: "Hasasiya", ph: "Ha-sa-si-ya" },
      { id: "ar23", fr: "C'est piquant ?", tr: "Hal huwa harr?", ph: "Hal hou-wa har" }
    ],
    hotel: [
      { id: "ar24", fr: "Wi-Fi", tr: "Kalimat al-sir", ph: "Ka-li-mat al-sir" },
      { id: "ar25", fr: "Petit-déjeuner", tr: "Al-futur", ph: "Al-fou-tour" },
      { id: "ar26", fr: "Ma chambre", tr: "Ghurfati", ph: "Gour-fa-ti" }
    ],
    shopping: [
      { id: "ar27", fr: "Combien ?", tr: "Bikam hadha?", ph: "Bi-kam ha-da" },
      { id: "ar28", fr: "C'est cher", tr: "Ghalli", ph: "Gal-li" },
      { id: "ar29", fr: "Je regarde", tr: "Unzur faqat", ph: "Oun-zour fa-kat" }
    ],
    emergency: [
      { id: "ar30", fr: "Aidez-moi !", tr: "Sa'iduni!", ph: "Sa-i-dou-ni" },
      { id: "ar31", fr: "Hôpital", tr: "Mustashfa", ph: "Mouss-tach-fa" },
      { id: "ar32", fr: "Police", tr: "Shorta", ph: "Chor-ta" }
    ]
  }
};

export default function Triptalk() {
  const [target, setTarget] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [openCat, setOpenCat] = useState<string | null>("essentials");
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Définition indispensable de selectedLang
  const selectedLang = useMemo(() => languages.find(l => l.code === target), [target]);

  useEffect(() => {
    const savedDark = localStorage.getItem('tt_v5_dark') === 'true';
    const savedFavs = JSON.parse(localStorage.getItem('tt_v5_favs') || '[]');
    setIsDark(savedDark);
    setFavorites(savedFavs);
    window.speechSynthesis.getVoices();
  }, []);

  useEffect(() => localStorage.setItem('tt_v5_dark', isDark.toString()), [isDark]);
  useEffect(() => localStorage.setItem('tt_v5_favs', JSON.stringify(favorites)), [favorites]);

  const speak = (text: string) => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = target;
      utterance.rate = 0.85;
      utterance.pitch = 1.1; 

      const voices = window.speechSynthesis.getVoices();
      // Sélection stricte de la voix féminine
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
        
        {/* Toggle Mode Nuit */}
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
            
            {/* Header avec SelectedLang */}
            <div className={`sticky top-0 z-30 space-y-4 py-2 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#FAF9F6]'}`}>
                <div className={`flex items-center justify-between p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <button onClick={() => {setShowPlan(false); setSearch("");}} className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl font-black">←</button>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{selectedLang?.flag}</span>
                        <span className="font-black text-[11px] uppercase tracking-widest">{selectedLang?.name}</span>
                    </div>
                    <div className="w-10"></div>
                </div>
                <input type="text" placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full p-4 pl-6 rounded-[1.5rem] border outline-none focus:border-orange-600 transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`} />
            </div>

            {/* Favoris */}
            {myFavorites.length > 0 && !search && (
                <div className="animate-in slide-in-from-top-4">
                    <h3 className="text-[10px] font-black uppercase text-orange-600 mb-4 tracking-[0.3em] px-2 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-orange-600/30"></span> Favoris ⭐
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

            {/* Catégories */}
            <div className="space-y-4">
              {categories.map((cat) => (
                filteredData[cat.id] && (
                    <div key={cat.id} className={`rounded-[2.2rem] border overflow-hidden ${isDark ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <button onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)} className={`w-full flex items-center justify-between p-6 transition-colors ${openCat === cat.id ? 'bg-orange-600 text-white' : 'text-slate-500'}`}>
                            <div className="flex items-center gap-3"><span>{cat.icon}</span><span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span></div>
                            <span className="text-2xl">{openCat === cat.id ? '−' : '+'}</span>
                        </button>
                        {openCat === cat.id && (
                            <div className="p-4 space-y-3">
                            {filteredData[cat.id]?.map((p: any) => (
                                <div key={p.id} className={`p-5 rounded-[1.8rem] border flex items-center justify-between gap-4 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-50'}`}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <button onClick={() => toggleFav(p.id)} className="text-xl">{favorites.includes(p.id) ? '⭐' : '☆'}</button>
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