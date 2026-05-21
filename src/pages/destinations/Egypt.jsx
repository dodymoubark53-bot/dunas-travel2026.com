import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import TourCard from '../../components/tour/TourCard';
import { tours } from '../../data/tours';

const Egypt = () => {
  const { t } = useTranslation();
  // Get only Egypt tours
  const egyptTours = tours.filter(tour => tour.destination === 'egypt');

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('dest.egypt.seoTitle', 'Luxury Egypt Tours & Vacations | Luxury Travel')}</title>
        <meta name="description" content={t('dest.egypt.seoDesc', "Discover Egypt. From the timeless Pyramids to the magnificent temples of Luxor and Aswan, embark on an unforgettable luxury journey.")} />
      </Helmet>

      {/* Destination Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/imgs/egypt/pharaohs & pyramid.jpg"
            alt="Egypt Pyramids Hero"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-obsidian-900/60"></div>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center mt-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeInUp} className="inline-block font-body text-gold-500 tracking-[0.2em] uppercase text-sm mb-4">
            {t('dest.egypt.subtitle', 'Cradle of Civilization')}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-display-xl text-ivory-50 mb-6">
            {t('dest.egypt.title', 'Discover Egypt')}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 max-w-2xl mx-auto">
            {t('dest.egypt.desc', 'From the timeless Pyramids to the magnificent temples of Luxor and Aswan, embark on an unforgettable journey through the land of the Pharaohs.')}
          </motion.p>
        </motion.div>
      </section>

      {/* Tours Grid Section */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-ivory-50 rounded-2xl p-8 md:p-12 shadow-card mb-12 text-center">
          <h2 className="text-display-lg text-obsidian-900 mb-4">{t('dest.egypt.gridTitle', 'Our Curated Egypt Journeys')}</h2>
          <p className="text-body-md text-obsidian-500 max-w-2xl mx-auto">
            {t('dest.egypt.gridDesc', { count: egyptTours.length, defaultValue: `Explore our exclusive selection of ${egyptTours.length} luxury itineraries designed to provide an immersive and premium experience of Egypt's greatest wonders.` })}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {egyptTours.map((tour, index) => (
            <motion.div key={tour.id} variants={fadeInUp}>
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Egypt;
