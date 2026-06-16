import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaClock, FaGlobe, FaStar, FaChevronRight, FaUserFriends, 
  FaCompass, FaFilter, FaMapMarkerAlt, FaCalendarAlt 
} from 'react-icons/fa';
import { multiCountryTours } from '../../data/multiCountryTours';
import Button from '../../components/ui/Button';
import { useCurrency } from '../../context/CurrencyContext';
import { staggerContainer, fadeInUp, cardHover } from '../../animations/variants';

const MultiCountryTours = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Extract all unique countries from our multi-country tours data to build filter options
  const filterCountries = useMemo(() => {
    const list = new Set();
    multiCountryTours.forEach(tour => {
      tour.countries.forEach(country => list.add(country));
    });
    return ['All', ...Array.from(list)];
  }, []);

  // Filter tours based on the selected country
  const filteredTours = useMemo(() => {
    if (selectedCountry === 'All') return multiCountryTours;
    return multiCountryTours.filter(tour => 
      tour.countries.includes(selectedCountry)
    );
  }, [selectedCountry]);

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('nav.multiCountry', 'Multi-Country Tours')} | {t('site.luxuryTravel', 'Dunas Travel')}</title>
        <meta name="description" content={t('programs.multiCountryDesc', 'Explore our grand multi-country itineraries. Discover ancient secrets of Egypt, majestic Petra in Jordan, vibrant markets of Turkey, and the luxury of Dubai in a single journey.')} />
      </Helmet>

      {/* 1. Parallax Hero Section */}
      <section className="relative w-full h-[450px] md:h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Grand Tour Experience"
            className="w-full h-full object-cover object-center scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-obsidian-900/60 via-obsidian-900/75 to-obsidian-950"
          ></div>
        </div>
        
        <motion.div 
          className="relative z-10 text-center px-6 mt-20 max-w-4xl"
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible"
        >
          <motion.span 
            variants={fadeInUp} 
            className="text-gold-500 uppercase tracking-widest text-caption font-semibold block mb-4"
          >
            {t('programs.multiCountrySubtitle', 'Epic Cross-Border Odysseys')}
          </motion.span>
          
          <motion.h1
            variants={fadeInUp}
            className="text-display-xl md:text-display-2xl text-ivory-50 font-display mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('nav.multiCountry', 'Multi-Country Tours')}
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp} 
            className="text-body-lg md:text-xl text-ivory-200 max-w-2xl mx-auto leading-relaxed"
          >
            {t('programs.multiCountryLead', 'Seamless journeys bridging ancient civilizations, timeless deserts, and futuristic cities. Carefully designed for absolute luxury, premium comfort, and complete immersion with dedicated Spanish guides.')}
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Breadcrumb Navigation */}
      <div className="bg-obsidian-950 border-y border-gold-500/10 py-4 px-6 text-caption text-ivory-300">
        <div className="container mx-auto flex items-center gap-2">
          <Link to="/" className="hover:text-gold-500 transition-colors">{t('nav.home', 'Home')}</Link>
          <span className="rtl-flip text-[10px] text-gold-500/50"><FaChevronRight /></span>
          <span className="hover:text-gold-500 transition-colors">{t('nav.programs', 'Programs')}</span>
          <span className="rtl-flip text-[10px] text-gold-500/50"><FaChevronRight /></span>
          <span className="text-gold-500 font-medium">{t('nav.multiCountry', 'Multi-Country Tours')}</span>
        </div>
      </div>

      <section className="container mx-auto px-6 py-16">
        {/* 3. Dynamic Interactive Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-card border border-gray-100 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">
                <FaFilter size={16} />
              </div>
              <div>
                <h3 className="text-body-lg font-semibold text-obsidian-900">{t('programs.filterTitle', 'Filter Destinations')}</h3>
                <p className="text-body-sm text-obsidian-500">{t('programs.filterDesc', 'Select a country to discover multi-country combinations')}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filterCountries.map(country => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-4 py-2 rounded-full text-caption font-semibold tracking-wide uppercase transition-all duration-300 border ${
                    selectedCountry === country
                      ? 'bg-gold-500 text-obsidian-900 border-gold-500 shadow-md shadow-gold-500/25'
                      : 'bg-white text-obsidian-700 border-gray-200 hover:border-gold-500 hover:text-gold-600'
                  }`}
                >
                  {country === 'All' 
                    ? t('programs.allDestinations', 'All Combos') 
                    : t(`data.${country}`, country)
                  }
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Tours Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour) => (
              <motion.div
                layout
                key={tour.id}
                variants={fadeInUp}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover border border-gray-100 group flex flex-col h-full"
              >
                {/* Image Container with Badges */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.images[0]}
                    alt={t(`data.${tour.title}`, tour.title)}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
                  
                  {/* Badges */}
                  {tour.badge && (
                    <span className="absolute top-4 left-4 z-10 bg-gold-500 text-obsidian-900 text-caption font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                      {t(`data.${tour.badge}`, tour.badge)}
                    </span>
                  )}
                  
                  {/* Rating Badge */}
                  <span className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md text-gold-500 text-caption font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-500/20">
                    <FaStar size={11} className="text-gold-500" />
                    <span>{tour.rating}</span>
                  </span>

                  {/* Floating Flags Box */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                    {tour.countries.map((country, idx) => (
                      <span 
                        key={idx} 
                        className="bg-obsidian-950/80 backdrop-blur-sm border border-gold-500/20 text-ivory-50 text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm"
                      >
                        <span>{tour.flags[idx]}</span>
                        <span className="font-medium">{t(`data.${country}`, country)}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-caption text-gold-600 font-bold uppercase tracking-widest mb-2">
                    {t(`data.${tour.type}`, tour.type)}
                  </span>
                  
                  <h3 
                    className="text-display-md text-obsidian-900 text-2xl mb-2 font-display line-clamp-1 group-hover:text-gold-700 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t(`data.${tour.title}`, tour.title)}
                  </h3>
                  
                  <p className="text-body-sm text-gold-600 font-medium mb-3 italic">
                    {t(`data.${tour.subtitle}`, tour.subtitle)}
                  </p>
                  
                  <p className="text-body-md text-obsidian-600 line-clamp-3 mb-6 leading-relaxed">
                    {t(`data.${tour.description}`, tour.description)}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <span className="text-[11px] uppercase tracking-wider text-obsidian-400 block mb-3 font-semibold">
                      {t('programs.tourHighlights', 'Key Highlights')}
                    </span>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      {tour.highlights.slice(0, 4).map((hl, idx) => (
                        <li key={idx} className="text-[12px] text-obsidian-700 flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></span>
                          <span>{t(`data.${hl}`, hl)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta Details & Price Footer */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                    <div>
                      <span className="text-caption text-obsidian-400 block uppercase tracking-wider">
                        {t('tourCard.startingFrom', 'Starting from')}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-display-md text-gold-600 font-display text-2xl font-bold">
                          {formatPrice(tour.price)}
                        </span>
                        <span className="text-caption text-obsidian-400">/pax</span>
                      </div>
                    </div>

                    <Link to={`/programs/multi-country/${tour.slug}`}>
                      <Button 
                        variant="outline-gold" 
                        className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider group-hover:bg-gold-500 group-hover:text-obsidian-900 group-hover:shadow-lg group-hover:shadow-gold-500/20 transition-all duration-300"
                      >
                        {t('tourCard.viewDetails', 'View Details')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTours.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 shadow-card">
            <FaCompass size={48} className="text-gold-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-display-md text-2xl text-obsidian-900 font-display mb-2">{t('programs.noToursFound', 'No Combinations Found')}</h3>
            <p className="text-body-md text-obsidian-500 max-w-md mx-auto mb-6">
              {t('programs.noToursDesc', 'We do not have any active packages matching that specific country combination right now. Let us customize an itinerary just for you!')}
            </p>
            <Link to="/tailor-tour">
              <Button variant="gold-glow">{t('nav.tailorMade', 'Request Tailor-Made Tour')}</Button>
            </Link>
          </div>
        )}
      </section>

      {/* 5. Custom Call-To-Action (CTA) */}
      <section className="bg-obsidian-900 text-ivory-50 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80')" }}></div>
        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          <span className="text-gold-500 uppercase tracking-widest text-caption font-semibold block mb-4">
            {t('programs.customOdyssey', 'Tailor-Made Multiverse Journey')}
          </span>
          <h2 className="text-display-lg text-4xl font-display mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('programs.ctaTitle', 'Didn’t find the exact combination you wanted?')}
          </h2>
          <p className="text-body-lg text-ivory-300 mb-10 leading-relaxed">
            {t('programs.ctaDesc', 'Whether you want to combine Egypt with Turkey, Jordan with Greece, or cross-border travel through all five, our expert travel designers will orchestrate a custom itinerary, managing all visas, transfers, premium flights, and boutique hotels.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tailor-tour">
              <Button variant="gold-glow" className="w-full sm:w-auto px-8 py-4">{t('nav.tailorMade', 'Design Your Tour')}</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline-gold" className="w-full sm:w-auto px-8 py-4">{t('nav.contact', 'Contact Our Team')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultiCountryTours;
