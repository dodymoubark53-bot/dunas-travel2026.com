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

  // 2. TRANSPORTATION PROGRAMS
  {
    id: 'prog-trn-1',
    category: 'transportation',
    slug: 'luxury-chauffeur-fleet',
    title: 'Elite Private Transportation Fleet',
    location: 'All Destinations',
    price: 300,
    rating: 4.9,
    images: ['/imgs/transportation/bus1.jpeg', '/imgs/transportation/bus2.jpeg'],
    shortDesc: 'Travel in absolute comfort with our premium, air-conditioned private luxury vehicles and professional drivers.',
    overview: [
      "Whether you need seamless airport transfers, inter-city travel, or a dedicated private chauffeur for your entire vacation, our luxury transportation program guarantees safety, punctuality, and style.",
      "Our fleet consists of the latest models of luxury sedans, SUVs, and high-top executive vans, all equipped with high-speed onboard Wi-Fi, refreshing drinks, and climate control to beat the heat.",
      "Our drivers are multi-lingual, highly vetted professionals with deep knowledge of local routes, ensuring your transit between hotels, airports, and sightseeing hubs is completely stress-free."
    ],
    highlights: ['Latest model luxury vehicles', 'Professional English-speaking chauffeurs', 'Onboard complimentary Wi-Fi & refreshments', '24/7 dispatch and flight-tracking support'],
    included: ['Fuel and toll fees', 'Airport meet-and-greet service', 'Passenger insurance', 'Luggage handling'],
    excluded: ['Driver overnight fees (for cross-country trips)', 'Extra-hours extension charges']
  },

  // 3. EXTENSION PROGRAMS
  {
    id: 'prog-ext-1',
    category: 'extension',
    slug: 'red-sea-luxury-extension',
    title: 'Red Sea Resort Extension Package',
    location: 'Hurghada & Sharm El Sheikh',
    price: 600,
    rating: 4.8,
    images: ['/imgs/italy/Nile and Red Sea with Hurghada.jpg', '/imgs/italy/Nile and Red Sea with Sharm El Sheikh.jpg'],
    shortDesc: 'Extend your historical tour with a relaxing beach and coral reef getaway along the beautiful Red Sea coast.',
    overview: [
      "After exploring temples and tombs, our Extension Program offers the perfect transition to tropical relaxation. Add 3 to 4 nights of blissful coastal luxury to any core itinerary.",
      "Unwind at an ultra-luxury all-inclusive beachfront resort where the desert mountains meet crystalline waters. Spend your days snorkeling in world-famous coral reefs or lounging by infinity pools.",
      "This package includes seamless transition transfers from your cultural tour directly to the resort, creating a beautifully balanced holiday experience."
    ],
    highlights: ['Seamless add-on to any classic tour', 'VIP beachfront resort allocation', 'Private guided boat and snorkeling safari', 'All-inclusive premium dining access'],
    included: ['Resort accommodation', 'Private point-to-point transfers', 'Snorkeling equipment rental', 'All meals and selected beverages'],
    excluded: ['Scuba diving certifications', 'Spa treatments']
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
    id: 'prog-rel-1',
    category: 'religious',
    slug: 'holy-family-trail',
    title: 'The Holy Family Trail & Mount Sinai',
    location: 'Cairo, Sinai & Holy Land',
    price: 1800,
    rating: 4.9,
    images: ['/imgs/gallery/12.jpeg', '/imgs/gallery/13.jpeg'],
    shortDesc: 'A spiritual pilgrimage tracing the historical paths and ancient monasteries of the Holy Family.',
    overview: [
      "Our Programas Religiosos offer deeply meaningful spiritual pilgrimages designed for individuals and church groups seeking to walk the sacred paths of history.",
      "Trace the flight of the Holy Family through Egypt, exploring the ancient Coptic churches of Old Cairo, the beautiful desert monasteries of Wadi El Natrun, and the sacred peak of Mount Sinai where Moses received the commandments.",
      "This program balances profound spiritual exploration with high-standard comfort, offering quiet reflection times led by expert spiritual and historical guides."
    ],
    highlights: ['Exclusive visits to Coptic and Biblical hubs', 'Guided midnight ascent of Mount Sinai', 'Private access to St. Catherine Monastery', 'Dedicated quiet times for group reflection'],
    included: ['Comfortable premium hotel lodging', 'Specialized cultural & spiritual guides', 'Air-conditioned group coaches', 'Half-board meals arrangement'],
    excluded: ['Personal offerings / donations', 'Optional camel hires at Mount Sinai']
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