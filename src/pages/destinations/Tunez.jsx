import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { allTours } from '../../data/tours';
import TourCard from '../../components/tour/TourCard';

const Tunez = () => {
  const { t, i18n } = useTranslation();

  // Filter the Tunisia tours and only show the one for the current language if applicable, 
  // or "multi" which means it handles all languages via i18n keys
  const tunisiaToursList = allTours.filter(
    (tour) => tour.destination === 'tunisia' && (tour.language === 'multi' || tour.language === i18n.language)
  );

  return (
    <div className="w-full min-h-screen bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('dest.tunisia.seoTitle', 'Luxury Tunisia Tours & Vacations | Dunas Travel')}</title>
        <meta name="description" content={t('dest.tunisia.seoDesc', 'Explore luxury journeys in Tunisia. From ancient Roman ruins to the Sahara Desert, discover our exclusive travel experiences.')} />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-obsidian-900 text-center px-6">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl text-ivory-50 mb-4 font-display"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('dest.tunisia.title', 'Tunisia')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-gold-400 font-medium tracking-wide max-w-2xl mx-auto"
          >
            {t('dest.tunisia.subtitle', 'Where ancient history meets the boundless Sahara in ultimate luxury.')}
          </motion.p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tunisiaToursList.length > 0 ? (
            tunisiaToursList.map((tour, idx) => (
              <Suspense key={tour.id} fallback={<div className="h-[400px] bg-obsidian-100 rounded-xl animate-pulse"></div>}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TourCard tour={tour} />
                </motion.div>
              </Suspense>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-body-lg text-obsidian-500">{t('dest.tunisia.noTours', 'Tours are currently being updated. Please check back soon.')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tunez;
