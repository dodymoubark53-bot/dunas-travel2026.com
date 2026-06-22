import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronRight,
  FaCompass, FaFilter
} from 'react-icons/fa';
import { multiCountryTours } from '../../data/multiCountryTours';
import Button from '../../components/ui/Button';
import TourCard from '../../components/tour/TourCard';
import { staggerContainer, fadeInUp } from '../../animations/variants';

const MultiCountryTours = () => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Get localized tours data
  const toursData = useMemo(() => multiCountryTours(t), [t]);

  // Extract all unique countries from our multi-country tours data to build filter options
  const filterCountries = useMemo(() => {
    const list = new Set();
    toursData.forEach(tour => {
      tour.countries.forEach(country => list.add(country));
    });
    return ['All', ...Array.from(list)];
  }, [toursData]);

  // Filter tours based on the selected country
  const filteredTours = useMemo(() => {
    if (selectedCountry === 'All') return toursData;
    return toursData.filter(tour =>
      tour.countries.includes(selectedCountry)
    );
  }, [selectedCountry, toursData]);

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
                  className={`px-4 py-2 rounded-full text-caption font-semibold tracking-wide uppercase transition-all duration-300 border ${selectedCountry === country
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <TourCard
                  tour={tour}
                  linkBase="/programs/multi-country"
                  countries={tour.countries}
                  flags={tour.flags}
                  highlights={tour.highlights}
                />
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
