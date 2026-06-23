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

  // 3. EXTENSION PROGRAMS
  {
    id: 'prog-ext-2',
    category: 'extension',
    slug: 'sharm-el-sheikh-extension',
    title: 'Sharm El Sheikh - 04 Days / 03 Nights',
    location: 'Sharm El Sheikh, Egypt',
    price: 600,
    rating: 4.8,
    images: ['/imgs/Brazil/cairo-with-cruise-sharm-el-sheikh-detail.jpg', '/imgs/Brazil/cairo-with-cruise-sharm-el-sheikh.jpg'],
    shortDesc: 'Extend your Egyptian adventure with a relaxing beach escape in Sharm El Sheikh, with all-inclusive stays and optional excursions.',
    overview: [
      'Extend your Egyptian adventure with a 4-day beach escape to Sharm El Sheikh, the jewel of the Red Sea. Relax at an all-inclusive resort and choose from optional excursions including a night trek up Mount Sinai or a desert 4x4 safari.',
      'With seamless airport transfers from Cairo, this extension offers the perfect balance of relaxation and adventure along the stunning Sinai coast.'
    ],
    highlights: [
      'sharm-03-nights-resort',
      'Optional Mount Sinai and St. Catherine Monastery night trek',
      'Optional Sinai desert 4x4 sunset safari with camel ride',
      'sharm-shared-transfers'
    ],
    included: [
      '03 nights of accommodation in Sharm El Sheikh in chosen hotel category with All Inclusive system and taxes',
      'sharm-airport-hotel-transfers'
    ],
    excluded: [
      'Domestic flights in economy class: Cairo / Sharm / Cairo'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Cairo / Sharm El Sheikh',
        morning: 'Transfer to Cairo Airport for your flight to Sharm El Sheikh. Arrival and transfer to the chosen hotel. Rest of the day free, dinner, and overnight stay.'
      },
      {
        day: 2,
        title: 'sharm-city',
        morning: 'Trip to Mount Sinai and St. Catherine Monastery. Departure around 22.30 towards the Sinai Peninsula, where you will do a night trek up Mount Sinai. After descending, coffee and cookies will be served, followed by a visit to St. Catherine Monastery. Return to the hotel around 02.30 the next day.'
      },
      {
        day: 3,
        title: 'sharm-city',
        morning: 'Sinai Desert tour in a 4x4 vehicle to watch the sunset, camel ride, and arrival at a Bedouin village where you can learn about their customs and traditions, followed by a typical dinner. Round-trip hotel transfers included.'
      },
      {
        day: 4,
        title: 'Sharm El Sheikh / Cairo',
        morning: 'Breakfast at the hotel and departure to Sharm El Sheikh Airport for your flight to Cairo International Airport. Return to your home country. End of our services.'
      }
    ]
  },
  {
    id: 'prog-ext-3',
    category: 'extension',
    slug: 'hurghada-extension',
    title: 'Hurghada - 04 Days / 03 Nights',
    location: 'Hurghada, Egypt',
    price: 550,
    rating: 4.7,
    images: ['/imgs/italy/Nile and Red Sea with Hurghada.jpg', '/imgs/italy/Nile and Red Sea with Sharm El Sheikh.jpg'],
    shortDesc: 'Extend your Egyptian adventure with a relaxing beach escape in Hurghada, with all-inclusive stays and optional excursions.',
    overview: [
      'Extend your Egyptian adventure with a 4-day beach escape to Hurghada, a premier Red Sea resort destination. Relax at an all-inclusive resort and choose from optional excursions including a desert quad bike safari or a boat trip to Giftun Island.',
      'With seamless airport transfers from Cairo, this extension offers the perfect mix of relaxation and adventure on the stunning Red Sea coast.'
    ],
    highlights: [
      '03 nights all-inclusive resort stay',
      'Optional desert quad bike safari with Bedouin dinner',
      'Optional boat trip to Giftun Island with snorkeling',
      'Shared airport/hotel transfers included'
    ],
    included: [
      '03 nights of accommodation in Hurghada in chosen hotel category with All Inclusive system and taxes',
      'Airport / Hotel / Airport transfers in regular shared service'
    ],
    excluded: [
      'Domestic flights in economy class: Cairo / Hurghada / Cairo'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Cairo / Hurghada',
        morning: 'Transfer to Cairo Airport for your flight to Hurghada. Arrival and transfer to your chosen hotel. Rest of the day free, dinner, and overnight stay.'
      },
      {
        day: 2,
        title: 'Hurghada',
        morning: 'Desert Safari tour with a Bedouin dinner. You will drive a quad bike yourself through the desert and then continue in a 4x4 vehicle to a Bedouin village, where you can ride a camel and watch a Bedouin dance show. Round-trip hotel transfers included.'
      },
      {
        day: 3,
        title: 'Hurghada',
        morning: 'Boat trip to Giftun Island, with a stop for snorkeling and lunch served on board. Round-trip hotel transfers included.'
      },
      {
        day: 4,
        title: 'Hurghada / Cairo',
        morning: 'Breakfast at the hotel and departure to Hurghada Airport for your flight to Cairo International Airport. Return to your home country. End of our services.'
      }
    ]
  },
  
  // 4. SIWA OASIS + ALEXANDRIA EXTENSION
  {
    id: 'prog-ext-4',
    category: 'extension',
    slug: 'siwa-alexandria-extension',
    title: 'Siwa Oasis + Alexandria - 05 Days / 04 Nights',
    location: 'Siwa & Alexandria, Egypt',
    price: 650,
    rating: 4.5,
    images: ['/imgs/gallery/15.jpeg', '/imgs/gallery/20.jpeg', '/imgs/Brazil/Treasures of Egypt with Alexandria.jpg'],
    shortDesc: 'Discover the magical Siwa Oasis and the historic city of Alexandria on this 5-day journey through Egypt\'s western desert and Mediterranean coast.',
    overview: [
      'Explore the breathtaking landscapes and ancient wonders of Egypt beyond the pyramids — from the serene salt lakes of Wadi El Natroun and the WWII memorials of El Alamein, to the remote Bedouin oasis of Siwa hidden in the Great Sand Sea.',
      'Travel along the stunning Mediterranean coast to the cosmopolitan city of Alexandria, where Greco-Roman history meets modern Egyptian culture, with expert guidance and seamless transportation throughout.'
    ],
    highlights: [
      'Round-trip transportation by bus or minibus between Cairo, Siwa, and Cairo',
      '01 night in Marsa Matrouh with breakfast and dinner',
      '03 nights in Siwa with full board',
      '01 night in Alexandria with breakfast and dinner',
      'Guided tours of Saint Bishoy Monastery and WWII Museum',
      'Desert 4x4 adventure to the Great Sand Sea',
      'All transfers in an air-conditioned vehicle',
      'Assistance from our team throughout the trip'
    ],
    included: [
      'Round-trip transportation by bus or minibus between the cities of Cairo – Siwa – Cairo',
      '01 night of accommodation in Marsa Matrouh with breakfast and dinner (drinks not included)',
      '03 nights of accommodation in Siwa with full board (breakfast, lunch, and dinner, drinks not included)',
      '01 night of accommodation in Alexandria with breakfast and dinner (drinks not included)',
      'Tour to the Saint Bishoy Monastery and the World War II Museum',
      'Tour to the Mountain of the Dead, Temple of Amun, Cleopatra\'s Bath, Great Sand Sea, Gebel Dakrour, and sunset at Fatnas Island',
      'All transfers mentioned in the itinerary in an air-conditioned vehicle',
      'Assistance from a representative of our team throughout the trip'
    ],
    excluded: [
      'International flights',
      'Tipping / Gratuities',
      'Personal travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Cairo / Wadi El Natroun / Marsa Matrouh',
        morning: 'After breakfast at the hotel, early departure towards the Wadi El Natroun Valley, named after the 8 different lakes in the region where natron salt is produced. Visit to the Monastery of Anba Bishoy (116KM), the most famous monastery of the Coptic Orthodox Church of Alexandria. Continue to El Alamein (176KM) on the shores of the Mediterranean, stop for lunch at a local restaurant (excluding drinks). In the afternoon, we will visit the WWII Museum and the Commonwealth Tombs, continuing along the Mediterranean coast to Marsa Matrouh (184KM). Arrival at the Marsa Matrouh Hotel. Dinner (excluding drinks) and overnight stay.'
      },
      {
        day: 2,
        title: 'Marsa Matrouh / Siwa',
        morning: 'After breakfast, check out from the hotel and visit Rommel\'s Cave, featuring rock paintings dating back more than 5,000 years. Continue to Siwa Oasis (307KM) crossing the Sahara Desert. Arrival and accommodation at the Siwa Shali Resort Hotel, where we will have some time to rest. Stop for lunch at a local restaurant (excluding drinks). Late afternoon, a walk through the Shali Old Village to contemplate the sunset. Return to the hotel, dinner (excluding drinks), and overnight stay.'
      },
      {
        day: 3,
        title: 'Siwa / Desert',
        morning: 'After breakfast, we will visit the Mountain of the Dead, the Temple of Amun, and Cleopatra\'s Baths. Stop for lunch (excluding drinks). In the afternoon, we will head out in a 4x4 vehicle to the Great Sand Sea, arriving at the desert tents. Dinner (excluding drinks) and overnight stay in the camp.'
      },
      {
        day: 4,
        title: 'Siwa / Alexandria',
        morning: 'After breakfast at the hotel, departure for Alexandria (598km). Stop in Marsa Matrouh for lunch at a local restaurant (excluding drinks). Afterwards, continue to Alexandria and check into the hotel. Dinner included (excluding drinks) and overnight stay.'
      },
      {
        day: 5,
        title: 'Alexandria / Cairo',
        morning: 'After breakfast at the hotel, we will visit the ancient capital of Egypt for over 1,000 years, famous for the Lighthouse of Alexandria (one of the 7 wonders of the ancient world). We will visit the Kom El Shoqafa catacombs, Pompey\'s Pillar (a monument carved from a single piece of red granite weighing 396 tons), Montazah Palace, and the Qaitbay Citadel, built on the exact site of the former lighthouse. We will also visit the famous Library of Alexandria (closed on Fridays), one of the largest and most important in the world. Stop for an included lunch at a local restaurant (excluding drinks). Next, we return to Cairo (218 km) directly to the airport or your chosen hotel. End of services.'
      }
    ]
  },

  // 5. HONEYMOONERS PACKAGE
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
  }
];