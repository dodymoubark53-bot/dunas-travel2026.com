import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronRight, FaClock, FaUserFriends, FaGlobe, FaTag,
  FaCheck, FaTimes, FaStar, FaMapMarkerAlt, FaBed, FaCheckCircle,
  FaCloudSun, FaSun, FaMoon
} from 'react-icons/fa';
import { tours } from '../../data/tours';
import Button from '../../components/ui/Button';
import { fadeInUp } from '../../animations/variants';
import InquiryForm from '../../components/booking/InquiryForm';
import AdvancedBooking from '../../components/booking/AdvancedBooking';
import { useCurrency } from '../../context/CurrencyContext';

const TourDetails = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { slug } = useParams();

  const tour = tours.find(t => t.slug === slug) || tours[0];

  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const reviews = [
    { id: 1, name: 'Eleanor R.', date: 'October 2025', rating: 5, comment: 'Absolutely breathtaking experience. The VIP access to the temples made it unforgettable.' },
    { id: 2, name: 'James W.', date: 'September 2025', rating: 5, comment: 'The luxurious cruise was the highlight. Impeccable service.' }
  ];

  return (
    <div className="w-full bg-obsidian-50 min-h-screen">
      <Helmet>
        <title>{t(`data.${tour.title}`, tour.title)} | {t('site.luxuryTravel', 'Luxury Travel')}</title>
        <meta name="description" content={t(`data.${tour.overview}`, tour.overview).substring(0, 150) + '...'} />
      </Helmet>

      {/* 1. Breadcrumb & Title */}
      <section className="pt-32 pb-10 bg-obsidian-900 text-center px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <Link to={`/destinations/${tour.destination}`} className="hover:text-ivory-50 transition-colors">
              {t(`data.${tour.destination}`, tour.destination)}
            </Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <span className="text-ivory-300">{t(`data.${tour.title}`, tour.title)}</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl text-ivory-50 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t(`data.${tour.title}`, tour.title)}
          </motion.h1>
          {tour.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-body-lg text-gold-400 font-medium tracking-wide mb-6"
            >
              {t(`data.${tour.subtitle}`, tour.subtitle)}
            </motion.p>
          )}
        </div>
      </section>

      {/* 2. Photo Gallery */}
      <section className="relative w-full h-[50vh] lg:h-[70vh] overflow-hidden group cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
        <motion.img
          src={tour.images[activeImage] || '/images/tour-1.png'}
          alt={t(`data.${tour.title}`, tour.title)}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className="absolute bottom-6 right-6 bg-obsidian-900/80 backdrop-blur-md px-4 py-2 rounded-full text-ivory-50 text-caption border border-gold-500/20">
          {t('tour.clickGallery', 'Click to open gallery')}
        </div>
      </section>

      {/* 3. Quick Info Bar */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-ivory-50 rounded-2xl shadow-card overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 border-b border-gray-100 bg-obsidian-50">
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaClock className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.duration', 'Duration')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">{t(`data.${tour.duration}`, tour.duration)}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaTag className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.tourType', 'Tour Type')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">{t(`data.${tour.type}`, tour.type)}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaUserFriends className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.groupSize', 'Group Size')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">{tour.market === 'Brasil' ? '2-16' : '2-12'}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaGlobe className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.languages', 'Languages')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">
                {tour.language === 'pt-BR'
                  ? t('languages.portuguese', 'Português')
                  : tour.language === 'es'
                    ? t('languages.spanish', 'Español')
                    : t('languages.italian', 'Italiano')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Content Section */}
      <section className="container mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">

            {/* Overview */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-display-lg text-obsidian-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('tourDetail.overview', 'Overview')}
              </h2>
              <p className="text-body-lg text-obsidian-500 leading-relaxed mb-6">{t(`data.${tour.overview}`, tour.overview)}</p>
              <p className="text-body-lg text-obsidian-500 leading-relaxed">
                {tour.language === 'pt-BR'
                  ? t('tour.premiumImmersion', 'Imersão premium sob medida com serviços de classe executiva.')
                  : tour.language === 'es'
                    ? t('tour.spanishImmersion', 'Una inmersión premium diseñada a la medida con servicios de primera clase.')
                    : t('tour.exclusiveJourney', 'Un viaggio esclusivo curato nei minimi dettagli per il massimo comfort.')}
              </p>
            </motion.div>

            {/* Highlights */}
            {Array.isArray(tour.highlights) && tour.highlights.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-16"
              >
                <h2 className="text-display-lg text-obsidian-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('tourDetail.highlights', 'Key Highlights')}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-ivory-50 p-4 rounded-xl shadow-sm border border-gold-500/10">
                      <FaCheckCircle className="text-gold-500 mt-1 shrink-0" />
                      <span className="text-body-sm text-obsidian-700">{t(`data.${highlight}`, highlight)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Pricing Tiers */}
            {tour.pricingTiers && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-16"
              >
                <h2 className="text-display-lg text-obsidian-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('tour.pricingTiers', 'Group Pricing Tiers')}
                </h2>
                <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gold-500/10">
                  <div className="bg-obsidian-900 px-6 py-4 text-ivory-50 font-display font-semibold text-lg tracking-wider">
                    {t('tour.pricingTiers', 'Group Pricing Tiers')}
                  </div>
                  <div className="grid grid-cols-2 bg-obsidian-50 text-obsidian-700 text-sm font-semibold uppercase tracking-wider">
                    <div className="p-4 border-r border-gold-500/10">{t('tour.groupSize', 'Group Size')}</div>
                    <div className="p-4 text-center">{t('tour.pricePerPerson', 'Price Per Person')}</div>
                  </div>
                  {tour.pricingTiers.map((tier, idx) => (
                    <div key={idx} className={`grid grid-cols-2 border-b border-gold-500/10 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-obsidian-50/30'}`}>
                      <div className="p-4 border-r border-gold-500/10 font-medium text-obsidian-900 flex items-center">
                        {tier.minPax === tier.maxPax ? `${tier.minPax} Pax` : `${tier.minPax} - ${tier.maxPax} Pax`}
                      </div>
                      <div className="p-4 text-center font-bold text-gold-700">
                        {formatPrice(tier.pricePerPax)}
                      </div>
                    </div>
                  ))}
                  {tour.optionalExcursionsPricing && (
                    <div className="p-6 bg-obsidian-50/50 border-t border-gold-500/10 text-body-sm text-obsidian-500">
                      * {t('tour.excursionsCurrency', 'Optional excursions are priced in')} {tour.optionalExcursionsPricing.currency}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Accommodation Table */}
            {tour.accommodation && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-16"
              >
                <div className="mb-8">
                  <span className="text-caption text-gold-500 uppercase tracking-widest font-semibold block mb-2">
                    {t('tour.accommodation', 'ALOJAMIENTO')}
                  </span>
                  <h2 className="text-display-md text-3xl text-obsidian-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('dest.greece.accTitle', 'Resumen de Alojamientos')}
                  </h2>
                </div>
                <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-gold-500/10">
                  <div className="grid grid-cols-3 bg-obsidian-900 text-ivory-50 text-xs md:text-sm font-semibold uppercase tracking-wider">
                    <div className="p-4 border-r border-ivory-50/10">{t('tour.destination', 'Destino')}</div>
                    <div className="p-4 border-r border-ivory-50/10 text-center">{t('tour.nights', 'Noches')}</div>
                    <div className="p-4 text-center">{t('tour.regime', 'Régimen')}</div>
                  </div>
                  {tour.accommodation.map((row, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-3 border-b border-gold-500/10 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-obsidian-50/50'}`}
                    >
                      <div className="p-4 border-r border-gold-500/10 font-semibold text-obsidian-900 flex items-center gap-2 text-sm md:text-base">
                        <FaMapMarkerAlt className="text-gold-500 flex-shrink-0" />
                        {t(`data.${row.destination}`, row.destination)}
                      </div>
                      <div className="p-4 border-r border-gold-500/10 text-center font-bold text-gold-700 text-base md:text-lg">
                        {row.nights}
                      </div>
                      <div className="p-4 text-center text-obsidian-700 flex items-center justify-center gap-2 text-sm md:text-base">
                        <FaBed className="text-gold-500 flex-shrink-0" />
                        {t(`data.${row.regime}`, row.regime)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Itinerary */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16"
            >
              <div className="mb-10">
                <h2 className="text-display-lg text-obsidian-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('tourDetail.itinerary', 'Itinerary')}
                </h2>
                <div className="w-24 h-1 bg-gold-500 mt-2"></div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-[15px] top-8 bottom-8 w-[2px] bg-[rgba(201,162,39,0.2)]"></div>
                <div className="space-y-6">
                  {tour.itinerary && tour.itinerary.map((day) => (
                    <div key={day.day} className="relative">
                      <div className="absolute -left-10 top-[18px] w-3 h-3 bg-gold-500 rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(201,162,39,0.2)]" />

                      <div className="bg-ivory-50 rounded-xl border-l-2 border-[rgba(201,162,39,0.3)] overflow-hidden shadow-sm p-5">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="font-semibold text-obsidian-900">{t('tour.day', 'Day')} {day.day}</span>
                          {day.title && (
                            <span className="text-body-sm text-obsidian-500">{t(`data.${day.title}`, day.title)}</span>
                          )}
                          {day.meals && (
                            <span className="text-caption text-obsidian-400 flex items-center gap-1 ml-auto">
                              <FaBed className="text-gold-500" /> {t(`data.${day.meals}`, day.meals)}
                            </span>
                          )}
                        </div>

                        {day.description && (
                          <p className="text-body-sm text-obsidian-500 leading-relaxed">{t(`data.${day.description}`, day.description)}</p>
                        )}

                        {!day.description && (
                          <div className="space-y-2">
                            {day.morning && (
                              <div className="flex items-start gap-3">
                                <span className="flex items-center gap-2 text-caption text-gold-600 uppercase tracking-wider font-semibold shrink-0 w-24">
                                  <FaCloudSun className="text-gold-500" size={14} /> {t('tour.morning', 'Morning')}
                                </span>
                                <p className="text-body-sm text-obsidian-500 leading-relaxed">{t(`data.${day.morning}`, day.morning)}</p>
                              </div>
                            )}
                            {day.afternoon && (
                              <div className="flex items-start gap-3">
                                <span className="flex items-center gap-2 text-caption text-amber-600 uppercase tracking-wider font-semibold shrink-0 w-24">
                                  <FaSun className="text-amber-500" size={14} /> {t('tour.afternoon', 'Afternoon')}
                                </span>
                                <p className="text-body-sm text-obsidian-500 leading-relaxed">{t(`data.${day.afternoon}`, day.afternoon)}</p>
                              </div>
                            )}
                            {day.evening && (
                              <div className="flex items-start gap-3">
                                <span className="flex items-center gap-2 text-caption text-indigo-600 uppercase tracking-wider font-semibold shrink-0 w-24">
                                  <FaMoon className="text-indigo-400" size={14} /> {t('tour.evening', 'Evening')}
                                </span>
                                <p className="text-body-sm text-obsidian-500 leading-relaxed">{t(`data.${day.evening}`, day.evening)}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Included / Excluded */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16"
            >
              <div className={`grid grid-cols-1 md:grid-cols-${tour.excursions && tour.excursions.length > 0 ? '3' : '2'} gap-8`}>
                <div>
                  <h3 className="text-display-md text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {tour.included && tour.included.length > 0 ? (tour.inclusionsTitle ? t(`data.${tour.inclusionsTitle}`, tour.inclusionsTitle) : t('tourDetail.included', 'What is Included')) : ''}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {tour.included && tour.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                        <FaCheck className="text-sage-500 mt-1 flex-shrink-0" />
                        <span>{t(`data.${item}`, item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-display-md text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {tour.excluded && tour.excluded.length > 0 ? (tour.exclusionsTitle ? t(`data.${tour.exclusionsTitle}`, tour.exclusionsTitle) : t('tourDetail.excluded', 'What is Excluded')) : ''}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {tour.excluded && tour.excluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                        <FaTimes className="text-red-400 mt-1 flex-shrink-0" />
                        <span>{t(`data.${item}`, item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {tour.excursions && tour.excursions.length > 0 && (
                  <div>
                    <h3 className="text-display-md text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {t('tour.optionalExcursions', 'Optional Excursions')}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {tour.excursions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                          <FaCheck className="text-gold-500 mt-1 flex-shrink-0" />
                          <span>{t(`data.${item}`, item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Hotels */}
            {tour.hotels && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-16"
              >
                <div className="mb-8">
                  <span className="text-caption text-gold-500 uppercase tracking-widest font-semibold block mb-2">
                    {t('tour.hotelCategory', 'CATEGORÍA')} — {t(`data.${tour.hotelCategory}`, tour.hotelCategory)}
                  </span>
                  <h2 className="text-display-md text-3xl text-obsidian-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('dest.greece.hotelsTitle', 'Hoteles de Primera Clase')}
                  </h2>
                  <p className="text-body-md text-obsidian-500 mt-2">
                    {t('dest.greece.hotelsDesc', 'En función de la disponibilidad, alojamiento en uno de los siguientes hoteles de primera clase en cada destino.')}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(tour.hotels).map(([city, hotelList]) => (
                    <div
                      key={city}
                      className="bg-white rounded-2xl shadow-card border border-gold-500/10 overflow-hidden"
                    >
                      <div className="bg-obsidian-900 px-4 py-3">
                        <h3 className="text-gold-500 font-semibold text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                          <FaMapMarkerAlt className="flex-shrink-0 text-xs" />
                          {t(`data.${city}`, city)}
                        </h3>
                      </div>
                      <ul className="p-4 flex flex-col gap-1.5">
                        {Array.isArray(hotelList) && hotelList.map((hotel, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-body-sm text-obsidian-700 py-1 border-b border-gold-500/5 last:border-0"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                            {t(`data.${hotel}`, hotel)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          {/* Sidebar Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-obsidian-900 text-ivory-50 rounded-2xl shadow-card p-8 border border-gold-500/10">
                <div className="text-center mb-8 border-b border-ivory-50/10 pb-8">
                  <span className="block text-body-md text-ivory-300 mb-2">{t('tourCard.duration', 'Duration')}</span>
                  <div className="text-display-md text-gold-500">{t(`data.${tour.duration}`, tour.duration)}</div>
                </div>
                <div className="flex flex-col gap-4">
                  <Button variant="gold-glow" className="w-full py-4 text-lg font-medium" onClick={() => setActiveForm('inquiry')}>
                    {t('tour.inquire', 'Inquire Now')}
                  </Button>
                  <Link to="/tailor-a-tour">
                    <Button variant="glass" className="w-full py-4 text-lg font-medium">
                      {t('home.tailorTour', 'Customize This Tour')}
                    </Button>
                  </Link>
                </div>
                <div className="text-center mt-6">
                  <span className="text-caption text-ivory-300 flex items-center justify-center gap-2">
                    <FaCheckCircle className="text-sage-500" /> {t('programs.bestPriceGuarantee', 'Best Price Guarantee')}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="relative py-24 mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tour.images[0] || '/images/tour-1.png'})` }} />
        <div className="absolute inset-0 bg-obsidian-900/75" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold block mb-4">
            {t("programs.customizeLabel", "DIDN'T FIND WHAT YOU'RE LOOKING FOR?")}
          </span>
          <h2 className="text-display-xl text-ivory-50 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('programs.customizeTitle', 'Let us design your perfect journey')}
          </h2>
          <p className="text-body-lg text-ivory-300 mb-10">
            {t('programs.customizeDesc', 'Tell us your preferences, and our expert travel designers will craft a bespoke itinerary tailored just for you.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tailor-a-tour">
              <Button variant="gold-glow" className="w-full sm:w-auto px-10 py-4">
                {t('programs.customizeBtn', 'Customize Your Trip')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="glass" className="w-full sm:w-auto px-10 py-4">
                {t('nav.contact', 'Contact Us')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modals */}
      <AnimatePresence>
        {activeForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian-900/80 flex items-start sm:items-center justify-center backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setActiveForm(null)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              {activeForm === 'inquiry' && <InquiryForm onClose={() => setActiveForm(null)} tourTitle={tour.title} />}
              {activeForm === 'booking' && <AdvancedBooking onClose={() => setActiveForm(null)} tourTitle={tour.title} basePricePerPerson={tour.price} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian-900/95 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 text-ivory-50 hover:text-gold-500 z-[101]"><FaTimes size={32} /></button>
            <img src={tour.images[0]} alt={t(`data.${tour.title}`, tour.title)} className="max-w-[90vw] max-h-[90vh] object-contain" onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TourDetails;
