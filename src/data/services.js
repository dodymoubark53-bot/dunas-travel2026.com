// تغيير اسم الـ Array ليعبر عن الهوية الجديدة للموقع
export const services = [
  // 1. CLASSIC PROGRAMS
  {
    id: 'prog-cls-1',
    category: 'classic', // تطابق تماماً الرابط الجديد في الـ Navbar
    slug: 'pharaohs-splendor',
    title: 'Pharaohs Splendor Classic Tour',
    location: 'Cairo & Luxor, Egypt',
    price: 1500,
    rating: 5.0,
    images: ['/imgs/italy/Classic Program.jpg', '/imgs/gallery/pharaohs & pyramid.jpg'],
    shortDesc: 'Discover the timeless wonders of ancient Egypt with our signature classical luxury itinerary.',
    overview: [
      "Embark on a majestic journey through the cradle of civilization. Our Classic Program is meticulously tailored for travelers who wish to immerse themselves in the authentic history of Egypt, combining expert archeological guiding with elite 5-star accommodations.",
      "The tour begins in Cairo with an exclusive, crowd-free morning visit to the Giza Plateau and the Grand Egyptian Museum, followed by a luxury domestic flight to Luxor to walk among the monumental pillars of Karnak and the Valley of the Kings.",
      "Every detail, from private Egyptologist escorts to fine dining overlooking ancient monuments, is designed to give you a seamless, regal experience of Egypt's classical heritage."
    ],
    highlights: ['Private after-hours Giza Pyramids access', 'Expert certified Egyptologist guide', 'Luxury stay at historic properties', 'All internal private transfers included'],
    included: ['5-star Hotel stays', 'Domestic flights', 'All entrance tickets', 'Gourmet daily breakfast'],
    excluded: ['International flights', 'Tipping / Gratuities', 'Personal travel insurance']
  },

  // 4. HONEYMOONERS PACKAGE
  {
    id: 'prog-hon-1',
    category: 'honeymooners',
    slug: 'romantic-arabian-nights',
    title: 'Romantic Arabian Nights Package',
    location: 'Cairo, Nile Cruise & Sea',
    price: 2400,
    rating: 5.0,
    images: ['/imgs/gallery/15.jpeg', '/imgs/gallery/16.jpeg'],
    shortDesc: 'Celebrate your love with intimate candlelit dinners, private yacht cruises, and unmatched romantic luxury.',
    overview: [
      "Designed exclusively for newlyweds, our Honeymooners Package curates unforgettable, romantic moments amidst the majestic landscapes of the Middle East.",
      "Enjoy premium suites featuring private plunge pools, private candlelit dinners on a traditional Nile Dahabiya yacht, and couples' spa treatments utilizing authentic local essential oils.",
      "From complimentary champagne upon arrival to tailored private photography sessions by the monuments, we ensure your romantic milestone is genuinely magical."
    ],
    highlights: ['Guaranteed premium honeymoon suites upgrade', 'Private candlelit dinner under the stars', 'Couples massage and wellness packages', 'Private professional photography session'],
    included: ['Full board luxury cruise & resort stays', 'Welcome gifts & champagne', 'All private transfers', 'Special romantic setups'],
    excluded: ['Historical site entry fees', 'Extra spa treatments']
  },

  // 6. PROGRAMAS RELIGIOSOS
  {
    id: 'prog-rel-egypt-jordan',
    category: 'religious',
    slug: 'egypt-jordan-combined-14d',
    title: 'Combined EGYPT with Jordan - 14 DAYS / 13 Nights',
    location: 'Egypt & Jordan',
    price: 2490,
    rating: 5.0,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
      'https://images.unsplash.com/photo-1509822929464-92b5d5e8827b?w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80'
    ],
    shortDesc: 'A premium 14-day spiritual and historical journey tracing Coptic monasteries in Egypt and the ancient wonders of Jordan.',
    overview: [
      "Embark on an extraordinary 14-day combined tour spanning Egypt and Jordan. This carefully crafted itinerary takes you on a spiritual and historical pilgrimage, tracing the footsteps of the Holy Family through Egypt's ancient Coptic monasteries, and exploring the dramatic rose-red valleys of Petra and Wadi Rum in Jordan.",
      "Beginning in Cairo, you will witness the majestic Giza Pyramids and the newly opened Grand Egyptian Museum. You will then trace Coptic routes through historic sites like Tell Basta, Wadi El Natrun, and the Coptic Quarter, before driving south to El Minya and Asiut to explore sacred mountaintop monasteries.",
      "The second half of your journey takes you to Jordan, starting from Madaba's famous mosaic map and Mount Nebo to the legendary city of Petra and the Martian landscapes of Wadi Rum, finishing with premium services and absolute comfort throughout."
    ],
    highlights: [
      'Giza Pyramids, Sphinx and the Grand Egyptian Museum (GEM)',
      'Spiritual pilgrimage along the Coptic Route and Holy Family well',
      'Visits to historical desert monasteries of Wadi El Natrun, Asiut, and Mount Al Tair',
      'The Cave Church (Monastery of Saint Simon) in the Mokattam Mountain',
      'Famous Byzantine mosaic map of Palestine in Madaba and Mount Nebo',
      'Full-day private tour of the Rose-Red City of Petra',
      'Stargazing and 2-hour 4x4 Jeep tour in the red sands of Wadi Rum'
    ],
    accommodations: [
      { destination: 'Cairo', nights: 7, regime: 'Bed & Breakfast' },
      { destination: 'El Minya', nights: 2, regime: 'Half Board (Breakfast & Dinner)' },
      { destination: 'Amman', nights: 1, regime: 'Half Board (Breakfast & Dinner)' },
      { destination: 'Petra', nights: 2, regime: 'Half Board (Breakfast & Dinner)' },
      { destination: 'Wadi Rum', nights: 1, regime: 'Half Board (Desert Camp)' }
    ],
    included: [
      'All visits, entrance fees, and transfers as per itinerary',
      'Meet & assist at airports (arrival/departure)',
      'Portuguese-speaking tour guide during visits (or Spanish/English depending on availability)',
      'Land transport in modern, air-conditioned private vehicles',
      'Entrance tickets to all mentioned archaeological sites',
      '2-hour 4x4 Jeep tour in Wadi Rum'
    ],
    excluded: [
      'International flights (Cairo – Amman / Amman – Home destination)',
      'Mandatory entry visas for Egypt and Jordan',
      'Lunches (except where specified in the itinerary)',
      'All drinks during lunches and dinners (including hotel meals/cruises)',
      'Optional tours or activities',
      'Mandatory Port Taxes of USD 50 per person in Egypt',
      'Recommended tips for the Guide (USD 25.00 per person) and all general tips (driver, restaurants, porters)',
      'Personal expenses and health/travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'INTERNATIONAL ARRIVAL / CAIRO',
        morning: 'Arrival at Cairo International Airport. Reception, transfer to the hotel, and overnight.',
        afternoon: 'Assistance through customs and transfer to your luxury hotel.',
        evening: 'Check-in, evening briefing, and overnight stay in Cairo.'
      },
      {
        day: 2,
        title: 'CAIRO / GIZA PYRAMIDS / SPHINX / GRAND EGYPTIAN MUSEUM (GEM)',
        morning: 'Breakfast. Visit the Giza Complex (Cheops, Chephren, Mykerinus), Valley Temple, and Sphinx.',
        afternoon: 'Lunch at a local restaurant. Visit the Grand Egyptian Museum (GEM) featuring the complete Tutankhamun collection.',
        evening: 'Overnight in Cairo. (Note: Inside Great Pyramid entry requires an extra ticket, not included).'
      },
      {
        day: 3,
        title: 'CAIRO / TELL BASTA / TANIS / ISMAILIA / CAIRO',
        morning: 'Breakfast. Travel to Tell Basta (visit temple ruins and the Holy Family well).',
        afternoon: 'Continue to Tanis (ancient Pi-Ramses). Move to Ismailia for lunch and a panoramic city tour.',
        evening: 'Return to Cairo for overnight.'
      },
      {
        day: 4,
        title: 'CAIRO / EL MATARYA / MOSTOROD / CAIRO',
        morning: 'Breakfast. Visit El Matarya (Church of the Virgin and the Holy Family tree).',
        afternoon: 'Travel to Mostorod (Church of the Virgin) and Belbeis (Church of the Virgin Mary). Lunch at a local restaurant.',
        evening: 'Return to Cairo, free afternoon, overnight.'
      },
      {
        day: 5,
        title: 'CAIRO / WADI NATRUN / CAIRO',
        morning: 'Breakfast. Excursion to Wadi El Natrun to visit three Coptic monasteries: Deir Al Baramos, Deir Anba Bechoy, and Deir Santa Maria.',
        afternoon: 'Lunch at a local restaurant.',
        evening: 'Return to Cairo, free afternoon, overnight.'
      },
      {
        day: 6,
        title: 'CAIRO / COPTIC QUARTER / MONASTERY OF SAINT SIMON',
        morning: 'Breakfast. Visit the Coptic Quarter (Churches of Saint Sergius, Abu Seifein, and Santa Barbara). Lunch.',
        afternoon: 'Afternoon visit to Al Adra Al Adawia Church (El Maadi) and the Monastery of Saint Simon (Cave Church) carved in the Mokattam mountain.',
        evening: 'Return to hotel, overnight.'
      },
      {
        day: 7,
        title: 'CAIRO / EL MINYA',
        morning: 'Breakfast. Drive south to El Minya (250 km).',
        afternoon: 'Visit the Monastery of the Virgin at Mount Al Tair. Lunch, dinner, and overnight at the hotel in El Minya.',
        evening: 'Relax and settle in for the evening.'
      },
      {
        day: 8,
        title: 'EL MINYA / ASIUT / EL MINYA',
        morning: 'Breakfast. Excursion to Asiut (120 km south of El Minya) to visit the Al Moharrak Monastery (Mount Qusqam).',
        afternoon: 'Lunch, dinner, and overnight in El Minya.',
        evening: 'Evening devotions or rest at hotel.'
      },
      {
        day: 9,
        title: 'EL MINYA / CAIRO',
        morning: 'Breakfast. Return to Cairo via an alternative route, visiting the Holy Family Monastery at Mount Dronka.',
        afternoon: 'Picnic lunch on the way.',
        evening: 'Arrival in Cairo and overnight.'
      },
      {
        day: 10,
        title: 'CAIRO / AMMAN AIRPORT',
        morning: 'Breakfast. Transfer to Cairo Airport for an international flight to Amman.',
        afternoon: 'Meeting with the driver at Queen Alia Airport, transfer to the hotel.',
        evening: 'Dinner and overnight stay in Amman.'
      },
      {
        day: 11,
        title: 'AMMAN / MADABA / MOUNT NEBO / SHOBAK PANORAMIC / PETRA',
        morning: 'Breakfast. Visit St. George\'s Church in Madaba (famous mosaic map of Palestine) and Mount Nebo.',
        afternoon: 'Continue with a panoramic view of Shobak, then travel to Petra.',
        evening: 'Dinner and overnight in Petra.'
      },
      {
        day: 12,
        title: 'PETRA TOUR',
        morning: 'Breakfast. Full-day tour of Petra (The Rose City): Obelisk Tomb, the Siq, the Treasury, the street of facades, and the theater.',
        afternoon: 'Climb 850 steps to the "El Deir" Monastery.',
        evening: 'Dinner and overnight in Petra.'
      },
      {
        day: 13,
        title: 'PETRA / LITTLE PETRA / WADI RUM DESERT',
        morning: 'Breakfast. Visit Little Petra, then proceed to the Wadi Rum Desert.',
        afternoon: '2-hour 4x4 Jeep tour through the red sand formations.',
        evening: 'Dinner and overnight at a Bedouin camp.'
      },
      {
        day: 14,
        title: 'WADI RUM / AMMAN AIRPORT',
        morning: 'Breakfast at the Bedouin desert camp.',
        afternoon: 'Scheduled transfer to Amman International Airport for departure.',
        evening: 'End of services.'
      }
    ]
  },

  // 7. DUPLICATED CLASSIC PROGRAM (FROM EGYPT WATERFRONT / eg-it-001)
  {
    id: 'prog-cls-2',
    category: 'classic',
    slug: 'classic-program',
    title: 'Programma Classico',
    location: 'Cairo & Luxor, Egypt',
    price: 1890,
    rating: 4.8,
    reviewCount: 402,
    images: ['/imgs/italy/Classic Program.jpg'],
    shortDesc: "L'Egitto nella sua essenza più pura. Dalle Piramidi di Giza alle colonne di Karnak, passando per la crociera sul Nilo tra Aswan e Luxor, questo itinerario di otto giorni è il modo più elegante per scoprire la civiltà dei faraoni — con guida in italiano e trasferimenti inclusi.",
    overview: [
      "L'Egitto nella sua essenza più pura. Dalle Piramidi di Giza alle colonne di Karnak, passando per la crociera sul Nilo tra Aswan e Luxor, questo itinerario di otto giorni è il modo più elegante per scoprire la civiltà dei faraoni — con guida in italiano e trasferimenti inclusi.",
      "Un viaggio esclusivo curato nei minimi dettagli per il massimo comfort."
    ],
    highlights: [
      "Piramidi di Giza e Sfinge",
      "Crociera sul Nilo 5 stelle",
      "Templi di Karnak e Luxor",
      "Tempio di Philae ad Aswan"
    ],
    included: [
      "Tutti i trasporti interni e assistenza negli aeroporti",
      "Guida egiptologa ufficiale parlante italiano",
      "Biglietti d'ingresso per tutti i siti menzionati",
      "3 notti in crociera sul Nilo (Pensione Completa, bevande escluse)",
      "4 notti al Cairo in hotel di lusso (Formula B&B)",
      "Visto d'ingresso turistico (25€ pp)"
    ],
    excluded: [
      "Mance generali obbligatorie (45€ pp)",
      "Pasti e bevande non espressamente menzionati",
      "Voli nazionali e internazionali"
    ],
    itinerary: [
      { "day": 1, "title": "Arrivo al Cairo", "morning": "Arrivo all'Aeroporto Internazionale del Cairo, accoglienza VIP e assistenza per il visto.", "afternoon": "Trasferimento privato in hotel di lusso e sistemazione nelle camere.", "evening": "Briefing introduttivo sul viaggio e serata libera per il relax." },
      { "day": 2, "title": "Piramidi e Sfinge", "morning": "Visita guidata all'Altopiano di Giza con le leggendarie Piramidi e l'enigmatica Sfinge.", "afternoon": "Tempo per il pranzo e visita facoltativa consigliata alle rovine storiche di Memphis e Sakkara.", "evening": "Rientro in hotel e pernottamento al Cairo." },
      { "day": 3, "title": "Imbarco ad Aswan", "morning": "Trasferimento in aeroporto per il volo interno verso Aswan. All'arrivo, visita del bellissimo Tempio di Philae.", "afternoon": "Imbarco sulla nave da crociera ed elegatissimo pranzo a bordo. Giro in barca feluca sul Nilo.", "evening": "Cena gourmet e pernottamento a bordo ad Aswan." },
      { "day": 4, "title": "Abu Simbel (facoltativo) e Navigazione", "morning": "Mattinata libera o escursione facoltativa ai colossali templi di Abu Simbel via terra.", "afternoon": "Rientro sulla nave e inizio della navigazione verso Kom Ombo. Visita del Tempio di Sobek.", "evening": "Proseguimento della navigazione verso Edfu. Cena a bordo e intrattenimento serale." },
      { "day": 5, "title": "Edfu e Luxor", "morning": "Visita dello splendido Tempio di Edfu dedicato al dio Horus tramite carrozze tradizionali.", "afternoon": "Navigazione verso Luxor. All'arrivo, tour guidato dei monumentali Templi di Karnak e Luxor.", "evening": "Cena araba a bordo con sfilata in costumi tradizionali (Galabeya Party)." },
      { "day": 6, "title": "Luxor → Il Cairo", "morning": "Sbarco. Visita della sponda occidentale: Valle dei Re, Tempio di Hatshepsut e Colossi di Memnone.", "afternoon": "Trasferimento all'aeroporto di Hurghada o Luxor per il volo interno di rientro al Cairo.", "evening": "Arrivo al Cairo, trasferimento in hotel e serata a disposizione." },
      { "day": 7, "title": "Il Cairo Libero", "morning": "Colazione continentale in hotel.", "afternoon": "Giornata completamente libera per visite individuali, shopping o escursioni facoltative.", "evening": "Pernottamento in hotel." },
      { "day": 8, "title": "Partenza", "morning": "Prima colazione in hotel e check-out.", "afternoon": "Trasferimento privato assistito verso l'aeroporto del Cairo per il volo di rientro.", "evening": "Fine dei nostri servizi esclusive." }
    ]
  },

  // 8. NEW HOTELS SECTION - SOL PYRAMID HOTEL
  {
    id: 'prog-hot-1',
    category: 'hotels',
    slug: 'sol-pyramid-hotel',
    title: 'Sol Pyramid Hotel',
    location: 'Giza, Egypt',
    price: 85,
    rating: 5.0,
    reviewCount: 1,
    images: ['https://www.solpyramid-egypt.com/wp-content/uploads/2022/08/Hotel.jpg'],
    shortDesc: 'Solpyramid Hotel is a modern 3-star establishment designed for travellers who want to explore Egypt\'s major sights. Combining elegant room design with a family atmosphere, it offers complete, modern facilities steps away from the Pyramids.',
    overview: [
      'Solpyramid Hotel is a modern 3-star establishment designed for travellers who want to explore Egypt\'s major sights. Combining elegant room design with a family atmosphere, it offers complete, modern facilities with personal and qualified service — all located steps away from the Pyramids of Giza.'
    ],
    highlights: [
      'Elegant room design with a family atmosphere',
      'Steps away from the Pyramids of Giza',
      'Complete, modern facilities',
      'Personal and qualified service'
    ],
    included: [
      'Free Wi-Fi',
      'Air conditioning (cold & heat)',
      'Private bathroom with amenities',
      'In-room safe box'
    ],
    excluded: [
      'Mini bar refrigerated stocked items (against charge)',
      'Room service extra charges'
    ]
  },


  // 10. HURGHADA EXTENSION
  {
    id: 'hurghada-4d3n',
    category: 'extension',
    slug: 'hurghada-4d3n',
    title: 'trip.hurghada.title',
    location: 'trip.hurghada.title',
    price: 500,
    rating: 5.0,
    images: ['/imgs/italy/Nile and Red Sea with Hurghada - Classic Version.jpg'],
    shortDesc: 'trip.hurghada.day1.desc',
    overview: [
      'trip.hurghada.day1.desc',
      'trip.hurghada.day2.desc',
      'trip.hurghada.day3.desc'
    ],
    highlights: [
      'trip.hurghada.day2.optional.title',
      'trip.hurghada.day3.optional.title'
    ],
    included: [
      'trip.hurghada.includes.item1',
      'trip.hurghada.includes.item2'
    ],
    excluded: [
      'trip.hurghada.excludes.item1'
    ],
    itinerary: [
      {
        day: 1,
        title: 'trip.hurghada.day1.title',
        morning: 'trip.hurghada.day1.desc',
        afternoon: '',
        evening: ''
      },
      {
        day: 2,
        title: 'trip.hurghada.day2.title',
        morning: 'trip.hurghada.day2.desc',
        afternoon: 'trip.hurghada.day2.optional.title',
        evening: 'trip.hurghada.day2.optional.desc'
      },
      {
        day: 3,
        title: 'trip.hurghada.day3.title',
        morning: 'trip.hurghada.day3.desc',
        afternoon: 'trip.hurghada.day3.optional.title',
        evening: 'trip.hurghada.day3.optional.desc'
      },
      {
        day: 4,
        title: 'trip.hurghada.day4.title',
        morning: 'trip.hurghada.day4.desc',
        afternoon: '',
        evening: ''
      }
    ]
  },

  // 11. SHARM EL SHEIKH EXTENSION (LOCALIZED)
  {
    id: 'sharm-4d3n',
    category: 'extension',
    slug: 'sharm-4d3n',
    title: 'trip.sharm.title',
    location: 'trip.sharm.title',
    price: 600,
    rating: 5.0,
    images: ['https://images.unsplash.com/photo-1596178060671-7a80dc8053ed?auto=format&fit=crop&w=800&q=80'],
    shortDesc: 'trip.sharm.day1.desc',
    overview: [
      'trip.sharm.day1.desc',
      'trip.sharm.day2.desc',
      'trip.sharm.day3.desc'
    ],
    highlights: [
      'trip.sharm.day2.optional.title',
      'trip.sharm.day3.optional.title'
    ],
    included: [
      'trip.sharm.includes.item1',
      'trip.sharm.includes.item2'
    ],
    excluded: [
      'trip.sharm.excludes.item1'
    ],
    itinerary: [
      {
        day: 1,
        title: 'trip.sharm.day1.title',
        morning: 'trip.sharm.day1.desc',
        afternoon: '',
        evening: ''
      },
      {
        day: 2,
        title: 'trip.sharm.day2.title',
        morning: 'trip.sharm.day2.desc',
        afternoon: 'trip.sharm.day2.optional.title',
        evening: 'trip.sharm.day2.optional.desc'
      },
      {
        day: 3,
        title: 'trip.sharm.day3.title',
        morning: 'trip.sharm.day3.desc',
        afternoon: 'trip.sharm.day3.optional.title',
        evening: 'trip.sharm.day3.optional.desc'
      },
      {
        day: 4,
        title: 'trip.sharm.day4.title',
        morning: 'trip.sharm.day4.desc',
        afternoon: '',
        evening: ''
      }
    ]
  },

  // 12. SIWA OASIS + ALEXANDRIA EXTENSION (LOCALIZED)
  {
    id: 'siwa-oasis-alexandria',
    category: 'extension',
    slug: 'siwa-oasis-alexandria',
    title: 'tour_siwa_title',
    location: 'tour_siwa_destination',
    price: 750,
    rating: 5.0,
    images: ['https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80'],
    shortDesc: 'tour_siwa_summary',
    overview: [
      'tour_siwa_summary'
    ],
    highlights: [],
    included: [
      'tour_siwa_includes_1',
      'tour_siwa_includes_2',
      'tour_siwa_includes_3',
      'tour_siwa_includes_4',
      'tour_siwa_includes_5',
      'tour_siwa_includes_6',
      'tour_siwa_includes_7',
      'tour_siwa_includes_8'
    ],
    excluded: [],
    itinerary: [
      {
        day: 1,
        title: 'tour_siwa_day1_title',
        body: 'tour_siwa_day1_body'
      },
      {
        day: 2,
        title: 'tour_siwa_day2_title',
        body: 'tour_siwa_day2_body'
      },
      {
        day: 3,
        title: 'tour_siwa_day3_title',
        body: 'tour_siwa_day3_body'
      },
      {
        day: 4,
        title: 'tour_siwa_day4_title',
        body: 'tour_siwa_day4_body'
      },
      {
        day: 5,
        title: 'tour_siwa_day5_title',
        body: 'tour_siwa_day5_body'
      }
    ]
  }
];