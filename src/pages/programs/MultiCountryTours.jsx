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
        <div className="bg-ivory-50 backdrop-blur-md rounded-xl p-6 shadow-card border border-gold-500/10 mb-12">
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
                      : 'bg-ivory-50 text-obsidian-700 border-gold-500/20 hover:border-gold-500 hover:text-gold-600'
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
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate="rest"
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-ivory-50 rounded-xl overflow-hidden flex flex-col h-full group shadow-card border border-gold-500/10"
              >
                {/* Image Container with Badges */}
                <div className="relative h-[280px] overflow-hidden">
                  {/* Type · Duration badge (top-left) */}
                  <div className="absolute top-4 left-4 z-10 bg-obsidian-900/80 backdrop-blur-md text-gold-500 text-caption px-4 py-1.5 rounded-full border border-gold-500/30 shadow-glass">
                    {t(`data.${tour.type}`, tour.type)} · {tour.days}d
                  </div>

                  {/* Badge (Best Seller / Popular) */}
                  {tour.badge && (
                    <div className="absolute top-4 right-4 z-10 bg-gold-500 text-obsidian-900 text-caption font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {t(`data.${tour.badge}`, tour.badge)}
                    </div>
                  )}

                  <img
                    src={tour.images[0]}
                    alt={t(`data.${tour.title}`, tour.title)}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.06] cinematic-transition"
                    loading="lazy"
                  />

                  {/* Cinematic dark hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating Country Flags */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                    {tour.countries.map((country, idx) => (
                      <span
                        key={idx}
                        className="bg-obsidian-950/80 backdrop-blur-sm border border-gold-500/20 text-ivory-50 text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-glass"
                      >
                        <span>{tour.flags[idx]}</span>
                        <span className="font-medium">{t(`data.${country}`, country)}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-caption text-gold-600 uppercase tracking-widest mb-1 block">
                    {t(`data.${tour.subtitle}`, tour.subtitle)}
                  </span>

                  <Link to={`/programs/multi-country/${tour.slug}`}>
                    <h3
                      className="text-display-md text-obsidian-900 mb-3 line-clamp-2 group-hover:text-gold-700 transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {t(`data.${tour.title}`, tour.title)}
                    </h3>
                  </Link>

                  <p className="text-body-sm text-obsidian-500 line-clamp-3 mb-4 flex-grow">
                    {t(`data.${tour.description}`, tour.description)}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(tour.rating) ? 'text-gold-500' : 'text-obsidian-300'}
                          size={13}
                        />
                      ))}
                    </div>
                    <span className="text-caption text-obsidian-900 font-semibold ml-1">
                      {tour.rating.toFixed(1)}
                    </span>
                    <span className="text-caption text-obsidian-300">
                      ({tour.reviewCount} {t('tourCard.reviews', 'reviews')})
                    </span>
                  </div>

                  {/* Key Highlights */}
                  <div className="border-t border-gold-500/10 pt-4 mb-4">
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                      {tour.highlights.slice(0, 4).map((hl, idx) => (
                        <li key={idx} className="text-[12px] text-obsidian-500 flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0 flex-shrink-0"></span>
                          <span className="truncate">{t(`data.${hl}`, hl)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & CTA Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gold-500/10 mt-auto">
                    <div>
                      <span className="block text-caption text-obsidian-300 mb-1">
                        {t('tourCard.from', 'from')}
                      </span>
                      <span className="text-display-md text-gold-700">
                        {formatPrice(tour.price)}
                      </span>
                    </div>

                    <Link to={`/programs/multi-country/${tour.slug}`}>
                      <Button variant="outline-gold" className="px-6 py-2 flex items-center gap-2">
                        {t('tourCard.book', 'Book')} <span className="rtl-flip">&rarr;</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTours.length === 0 && (
          <div className="text-center py-20 bg-ivory-50 rounded-xl border border-gold-500/10 p-8 shadow-card">
            <FaCompass size={48} className="text-gold-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-display-md text-2xl text-obsidian-900 font-display mb-2">{t('programs.noToursFound', 'No Combinations Found')}</h3>
            <p className="text-body-md text-obsidian-500 max-w-md mx-auto mb-6">
              {t('programs.noToursDesc', 'We do not have any active packages matching that specific country combination right now. Let us customize an itinerary just for you!')}
            </p>
            <Link to="/tailor-a-tour">
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
            <Link to="/tailor-a-tour">
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
