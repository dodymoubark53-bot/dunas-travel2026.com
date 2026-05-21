import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import TourCard from '../../components/tour/TourCard';
import { tours } from '../../data/tours';

const destinationsData = [
  {
    id: 'egypt',
    name: 'Egypt',
    tag: 'Cradle of Civilization',
    image: '/imgs/egypt/pharaohs & pyramid.jpg'
  },
  {
    id: 'jordan',
    name: 'Jordan',
    tag: 'The Hashemite Kingdom',
    image: 'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    tag: 'Where Continents Meet',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80'
  }
];

const Destinations = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('destinations.title', 'All Destinations | Luxury Travel')}</title>
        <meta name="description" content={t('destinations.metaDesc', 'Explore our handpicked luxury tours across Egypt, Jordan, and Turkey.')} />
      </Helmet>

      {/* Main Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=compress&cs=tinysrgb&w=1600&fit=crop"
            alt="Destinations Hero"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-obsidian-900/60 bg-gradient-to-t from-obsidian-900 to-transparent"></div>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center mt-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeInUp} className="inline-block font-body text-gold-500 tracking-[0.2em] uppercase text-sm mb-4">
            {t('destinations.worldCurated', 'The World, Curated')}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-display-xl text-ivory-50 mb-6">
            {t('destinations.heading', 'Our Destinations')}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 max-w-2xl mx-auto">
            {t('destinations.subHeading', 'Discover our exclusive portfolio of luxury journeys across the most mesmerizing landscapes of the Middle East and beyond.')}
          </motion.p>
        </motion.div>
      </section>

      {/* Destinations Iteration */}
      <div className="container mx-auto px-6 -mt-16 relative z-20">
        {destinationsData.map((dest, idx) => {
          const destTours = tours.filter(tour => tour.destination === dest.id);
          
          return (
            <motion.div 
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-24"
            >
              {/* Destination Card / Header */}
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12 shadow-card group">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-obsidian-900/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                  <span className="text-gold-500 uppercase tracking-widest text-caption mb-2">
                    {t(`data.${dest.tag}`, dest.tag)}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h2 className="text-display-xl text-ivory-50 m-0 leading-none">
                      {t(`data.${dest.name}`, dest.name)}
                    </h2>
                    <Link to={`/destinations/${dest.id}`} className="text-ivory-300 hover:text-gold-500 transition-colors uppercase tracking-widest text-sm font-semibold flex items-center gap-2">
                      {t('destinations.viewGuide', 'View Destination Guide')}
                      <span className="rtl-flip">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tours Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Destinations;
