import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import TourCard from '../../components/tour/TourCard';
import { tours } from '../../data/tours';

const Jordan = () => {
  const { t } = useTranslation();
  const jordanTours = tours.filter((tour) => tour.destination === 'jordan');

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('dest.jordan.seoTitle', 'Luxury Jordan Tours & Vacations | Luxury Travel')}</title>
        <meta name="description" content={t('dest.jordan.seoDesc', "Discover Jordan. From the rose-red city of Petra to the Martian landscapes of Wadi Rum, embark on an unforgettable luxury journey.")} />
      </Helmet>

      {/* Destination Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?auto=format&fit=crop&w=1600&q=80"
            alt="Jordan Petra Hero"
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
          <motion.span variants={fadeInUp} className="text-gold-500 uppercase tracking-widest text-caption block mb-4">
            {t('dest.jordan.subtitle', 'The Hashemite Kingdom')}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-display-xl text-ivory-50 mb-6">
            {t('dest.jordan.title', 'Jordan')}
          </motion.h1>
        </motion.div>
      </section>

      {/* Destination Brief & Tours Grid */}
      <section className="container mx-auto px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-body-lg text-obsidian-500 leading-relaxed">
            {t('dest.jordan.desc', 'A land of mesmerizing contrasts and ancient legends. From the Nabatean marvel of Petra carved entirely from sandstone cliffs to the vast, silent expanses of the Wadi Rum desert, Jordan offers a travel experience that transcends time. Immerse yourself in Bedouin hospitality and float effortlessly in the restorative waters of the Dead Sea on a curated, ultra-luxury expedition.')}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {jordanTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Jordan;
