import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaChevronRight, FaUserFriends, FaCog, FaCheck, FaCar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { transportation } from '../../data/transportation';
import TransportationForm from '../../components/booking/TransportationForm';
import { useCurrency } from '../../context/CurrencyContext';

const TransportationDetails = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { slug } = useParams();
  // slug is the ID based on our setup (e.g., tr-001)
  const vehicle = transportation.find(v => v.id === slug) || transportation[0];

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t(`data.${vehicle.name}`, vehicle.name)} | {t('transportation.seoTitle', 'Luxury Transportation')}</title>
        <meta name="description" content={t('transportation.seoDesc', 'Reserve the {{name}} for your premium travel experience.', { name: t(`data.${vehicle.name}`, vehicle.name) })} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[500px] flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={vehicle.heroImage || vehicle.image}
            alt={`${t(`data.${vehicle.name}`, vehicle.name)} Hero`} 
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
          />
          <div 
            className="absolute inset-0" 
            style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.7))' }}
          ></div>
        </div>
        <div className="container mx-auto relative z-10 text-center px-6 flex flex-col items-center mt-8">
          <div className="flex items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <Link to="/transportation" className="hover:text-ivory-50 transition-colors">{t('nav.transportation', 'Transportation')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <span className="text-ivory-300">{t(`data.${vehicle.name}`, vehicle.name)}</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl text-ivory-50 mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t(`data.${vehicle.name}`, vehicle.name)}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-ivory-300 uppercase tracking-widest mb-4"
          >
            {vehicle.category === 'suv' ? 'SUV' : t(`transportation.cat.${vehicle.category}`, vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-display-sm text-gold-500"
          >
            {t('tourCard.from', 'from')} {formatPrice(vehicle.pricePerDay)} / {t('transportation.day', 'day')}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:w-2/3">
            <div className="bg-ivory-50 rounded-2xl p-6 shadow-card mb-8">
              <div 
                className="relative w-full h-[400px] mb-8 overflow-hidden" 
                style={{ borderRadius: '16px', boxShadow: '0 0 15px rgba(201,162,39,0.4)' }}
              >
                <img 
                  src={vehicle.heroImage || vehicle.image} 
                  alt={`${vehicle.name} Interior`} 
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '16px' }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 border-b border-gray-100 pb-8">
                <div className="flex flex-col gap-2">
                  <span className="text-caption text-obsidian-500 uppercase">{t('transportation.category', 'Category')}</span>
                  <div className="flex items-center gap-2 text-body-md font-semibold text-obsidian-900">
                    <FaCar className="text-gold-500" />
                    <span className="capitalize">{t(`transportation.cat.${vehicle.category}`, vehicle.category)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-caption text-obsidian-500 uppercase">{t('transportation.capacity', 'Capacity')}</span>
                  <div className="flex items-center gap-2 text-body-md font-semibold text-obsidian-900">
                    <FaUserFriends className="text-gold-500" />
                    <span>{vehicle.seats} {t('transportation.seatsCount', 'Seats')}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-caption text-obsidian-500 uppercase">{t('transportation.transmission', 'Transmission')}</span>
                  <div className="flex items-center gap-2 text-body-md font-semibold text-obsidian-900">
                    <FaCog className="text-gold-500" />
                    <span>{t(`data.${vehicle.transmission}`, vehicle.transmission)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-display-md text-2xl text-obsidian-900 mb-6 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('transportation.premiumFeatures', 'Premium Features')}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vehicle.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                      <div className="w-6 h-6 rounded-full bg-gold-50 flex items-center justify-center text-gold-500 mt-1 flex-shrink-0">
                        <FaCheck size={12} />
                      </div>
                      <span>{t(`data.${feature}`, feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-display-md text-2xl text-obsidian-900 mb-4 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('transportation.aboutVehicle', 'About this Vehicle')}</h3>
                <p className="text-body-lg text-obsidian-700 leading-relaxed">
                  {t('transportation.aboutVehicleDesc', 'Experience ultimate comfort and prestige with the {{name}}. Designed for those who appreciate the finer things in life, this premium vehicle comes with a professional chauffeur dedicated to providing a smooth, safe, and luxurious journey. Whether for airport transfers, inter-city travel, or VIP tours, expect nothing less than perfection.', { name: t(`data.${vehicle.name}`, vehicle.name) })}
                </p>
              </div>
            </div>
            
            {/* Mobile form renders here implicitly if order changed via flex on mobile, but let's just let it flow natively (it will be under the left column on mobile) */}
          </div>

          {/* Right Column: Sidebar Form */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <TransportationForm preSelectedVehicleId={vehicle.id} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransportationDetails;
