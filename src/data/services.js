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
    images: ['/imgs/programs/classic-1.webp', '/imgs/programs/classic-2.webp'],
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
    images: ['/imgs/programs/trans-1.webp', '/imgs/programs/trans-2.webp'],
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
    images: ['/imgs/programs/ext-1.webp', '/imgs/programs/ext-2.webp'],
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

  // 4. MULTI-COUNTRY TOURS
  {
    id: 'prog-mul-1',
    category: 'multi-country',
    slug: 'cradle-of-civilization-egypt-jordan',
    title: 'The Grand Cradle: Egypt & Jordan',
    location: 'Egypt & Jordan',
    price: 3200,
    rating: 5.0,
    images: ['/imgs/programs/multi-1.webp', '/imgs/programs/multi-2.webp'],
    shortDesc: 'The ultimate regional journey combining the wonders of the Pharaohs with the rose-red city of Petra.',
    overview: [
      "Why settle for one country when you can witness two of the world's greatest historical gems? This Multi-Country Tour cross-references the highlights of Egypt and Jordan in one fluid luxury journey.",
      "Staze at the Great Pyramids of Giza and cruise the Nile, then take a short direct flight to Jordan to float in the mineral-rich Dead Sea and walk through the stunning Siq into Petra.",
      "With local operations handled flawlessly in both nations, you will experience consistent 5-star concierge service across international borders."
    ],
    highlights: ['Cross-border luxury tour coordination', 'Comprehensive sights coverage (Pyramids & Petra)', 'Dead Sea wellness glamping experience', 'VIP airport immigration assistance'],
    included: ['Inter-country flights', 'Luxury hotels & desert camps', 'All regional entrance visas', 'Private site guides'],
    excluded: ['International flights to/from origin', 'Personal spending']
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
    images: ['/imgs/programs/honey-1.webp', '/imgs/programs/honey-2.webp'],
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
    images: ['/imgs/programs/religious-1.webp', '/imgs/programs/religious-2.webp'],
    shortDesc: 'A spiritual pilgrimage tracing the historical paths and ancient monasteries of the Holy Family.',
    overview: [
      "Our Programas Religiosos offer deeply meaningful spiritual pilgrimages designed for individuals and church groups seeking to walk the sacred paths of history.",
      "Trace the flight of the Holy Family through Egypt, exploring the ancient Coptic churches of Old Cairo, the beautiful desert monasteries of Wadi El Natrun, and the sacred peak of Mount Sinai where Moses received the commandments.",
      "This program balances profound spiritual exploration with high-standard comfort, offering quiet reflection times led by expert spiritual and historical guides."
    ],
    highlights: ['Exclusive visits to Coptic and Biblical hubs', 'Guided midnight ascent of Mount Sinai', 'Private access to St. Catherine Monastery', 'Dedicated quiet times for group reflection'],
    included: ['Comfortable premium hotel lodging', 'Specialized cultural & spiritual guides', 'Air-conditioned group coaches', 'Half-board meals arrangement'],
    excluded: ['Personal offerings / donations', 'Optional camel hires at Mount Sinai']
  }
];