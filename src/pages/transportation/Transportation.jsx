import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUserFriends, FaCog, FaCheck } from 'react-icons/fa';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import { transportation } from '../../data/transportation';
import TransportationForm from '../../components/booking/TransportationForm';
import { useCurrency } from '../../context/CurrencyContext';

const Transportation = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { id: 'All', label: t('transportation.filter.all', 'All') },
    { id: 'Sedans', label: t('transportation.filter.sedans', 'Sedans') },
    { id: 'SUVs', label: t('transportation.filter.suvs', 'SUVs') },
    { id: 'Buses', label: t('transportation.filter.buses', 'Buses') }
  ];

  const filteredVehicles = transportation.filter(vehicle => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Sedans') return vehicle.category === 'sedan';
    if (activeFilter === 'SUVs') return vehicle.category === 'suv';
    if (activeFilter === 'Buses') return vehicle.category === 'bus';
    return true;
  });

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('nav.transportation', 'Transportation')} | {t('services.seoServices', 'Luxury Services')}</title>
        <meta name="description" content={t('transportation.seoDesc', 'Premium vehicles with professional drivers across Italy, Spain & Brazil')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/imgs/transportation/oip (4).webp" 
            alt="Transportation Hero" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div 
            className="absolute inset-0" 
            style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.65))' }}
          ></div>
        </div>
        <motion.div className="relative z-10 text-center px-6 mt-20" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.span variants={fadeInUp} className="text-gold-500 uppercase tracking-widest text-caption block mb-4">{t('services.subtitle', 'Tailored Experiences')}</motion.span>
          <motion.h1 
            variants={fadeInUp} 
            className="text-display-xl text-ivory-50"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('nav.transportation', 'Transportation')}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 mt-4 max-w-2xl mx-auto">
            {t('transportation.heroDesc', 'Travel in Comfort & Style')}
          </motion.p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-8 py-3 rounded-full text-body-md font-semibold transition-all duration-300 ${
                activeFilter === filter.id 
                  ? 'bg-gold-500 text-obsidian-900 shadow-[0_0_20px_rgba(201,162,39,0.4)]' 
                  : 'bg-ivory-50 text-obsidian-700 hover:bg-gold-55 shadow-sm border border-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 text-left">
          {filteredVehicles.map((vehicle, index) => (
            <motion.div 
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 0 32px rgba(201,162,39,0.22)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              className="bg-ivory-50 rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group"
            >
              <Link to={`/transportation/${vehicle.id}`} className="block relative h-64 overflow-hidden">
                <img 
                  src={vehicle.heroImage || vehicle.image} 
                  alt={t(`data.${vehicle.name}`, vehicle.name)} 
                  className="w-full h-full object-cover cinematic-transition group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-ivory-50 font-semibold flex items-center gap-2">
                    {t('tourCard.viewDetails', 'View Details')} &rarr;
                  </span>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-caption text-gold-500 uppercase tracking-wider block mb-1">
                      {t(`transportation.cat.${vehicle.category}`, vehicle.category)}
                    </span>
                    <h3 className="text-display-md text-xl text-obsidian-900 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>
                      <Link to={`/transportation/${vehicle.id}`} className="hover:text-gold-500 transition-colors">
                        {t(`data.${vehicle.name}`, vehicle.name)}
                      </Link>
                    </h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-caption text-obsidian-700">
                    <FaUserFriends className="text-gold-500" />
                    {vehicle.seats} {t('transportation.seatsCount', 'Seats')}
                  </div>
                  <div className="flex items-center gap-2 text-caption text-obsidian-700">
                    <FaCog className="text-gold-500" />
                    {t(`data.${vehicle.transmission}`, vehicle.transmission)}
                  </div>
                </div>

                <ul className="mb-6 space-y-2">
                  {vehicle.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-caption text-obsidian-700">
                      <FaCheck className="text-sage-500 flex-shrink-0" size={12} />
                      <span className="truncate">{t(`data.${feature}`, feature)}</span>
                    </li>
                  ))}
                  {vehicle.features.length > 2 && (
                    <li className="text-caption text-obsidian-500 italic">
                      {t('transportation.moreFeatures', '+ {{count}} more features', { count: vehicle.features.length - 2 })}
                    </li>
                  )}
                </ul>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-body-lg font-bold text-obsidian-900">{formatPrice(vehicle.pricePerDay)}</span>
                    <span className="text-caption text-obsidian-500"> / {t('transportation.day', 'day')}</span>
                  </div>
                  <Link 
                    to={`/transportation/${vehicle.id}`}
                    className="text-body-md font-medium text-gold-500 hover:text-gold-600 transition-colors rounded-full"
                  >
                    {t('transportation.reserveNow', 'Reserve Now')} &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="container mx-auto px-6 max-w-4xl" id="reservation">
        <div className="text-center mb-12">
          <h2 className="text-display-lg text-obsidian-900 mb-4 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('transportation.makeReservation', 'Make a Reservation')}</h2>
          <p className="text-body-md text-obsidian-500 max-w-2xl mx-auto">
            {t('transportation.reservationDesc', 'Book your luxury transportation in advance. We provide professional chauffeurs and premium vehicles to ensure a comfortable and stylish journey.')}
          </p>
        </div>
        <TransportationForm />
      </section>
    </div>
  );
};

export default Transportation;
