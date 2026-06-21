import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronRight, FaClock, FaUserFriends, FaGlobe, FaTag,
  FaCheck, FaTimes, FaStar, FaChevronDown, FaMapMarkerAlt, FaBed
} from 'react-icons/fa';
import { tours } from '../../data/tours';
import Button from '../../components/ui/Button';
import { accordionContent, fadeInUp, staggerContainer } from '../../animations/variants';
import InquiryForm from '../../components/booking/InquiryForm';
import AdvancedBooking from '../../components/booking/AdvancedBooking';
import { useCurrency } from '../../context/CurrencyContext';

const TourDetails = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { slug } = useParams();

  // البحث عن الجولة الفاخرة المطابقة للـ slug
  const tour = tours.find(t => t.slug === slug) || tours[0];

  const [activeTab, setActiveTab] = useState('overview');
  const [expandedDay, setExpandedDay] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  // جولات مقترحة من نفس السلسلة المحدثة
  const suggestedTours = tours.filter(t => t.slug !== tour.slug).slice(0, 3);

  const reviews = [
    { id: 1, name: 'Eleanor R.', date: 'October 2025', rating: 5, comment: 'Absolutely breathtaking experience. The VIP access to the temples made it unforgettable.' },
    { id: 2, name: 'James W.', date: 'September 2025', rating: 5, comment: 'The luxurious cruise was the highlight. Impeccable service.' }
  ];

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t(`data.${tour.title}`, tour.title)} | {t('site.luxuryTravel', 'Luxury Travel')}</title>
        <meta name="description" content={t(`data.${tour.overview}`, tour.overview).substring(0, 150) + '...'} />
      </Helmet>

      {/* 1. Tour Name & Breadcrumb */}
      <section className="pt-32 pb-10 bg-obsidian-900 text-center px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home')}</Link>
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
            className={`text-display-xl text-ivory-50 ${tour.subtitle ? 'mb-2' : 'mb-6'}`}
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
        <div className="absolute bottom-6 right-6 bg-obsidian-900/80 backdrop-blur-md px-4 py-2 rounded-full text-ivory-50 text-caption">
          {t('tour.clickGallery', 'Click to open gallery')}
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-ivory-50 rounded-2xl shadow-card overflow-hidden">

          {/* 3. Quick Info Bar */}
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

          <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              {/* 4. Tabs */}
              <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                {[
                  { id: 'overview', label: t('tour.tabOverview', 'Overview') },
                  { id: 'highlights', label: t('tour.tabHighlights', 'Highlights') },
                  ...(tour.pricingTiers ? [{ id: 'pricing', label: t('tour.tabPricing', 'Pricing') }] : [])
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 text-body-md font-semibold uppercase tracking-wider relative transition-colors ${activeTab === tab.id ? 'text-gold-700' : 'text-obsidian-300 hover:text-obsidian-700'
                      }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'overview' && (
                    <div className="text-body-lg text-obsidian-700 leading-relaxed">
                      <p className="mb-6">{t(`data.${tour.overview}`, tour.overview)}</p>
                      <p>
                        {tour.language === 'pt-BR'
                          ? t('tour.premiumImmersion', 'Imersão premium sob medida com serviços de classe executiva.')
                          : tour.language === 'es'
                            ? t('tour.spanishImmersion', 'Una inmersión premium diseñada a la medida con servicios de primera clase.')
                            : t('tour.exclusiveJourney', 'Un viaggio esclusivo curato nei minimi dettagli per il massimo comfort.')}
                      </p>
                    </div>
                  )}

                  {activeTab === 'highlights' && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tour.highlights && tour.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-body-lg text-obsidian-700">
                          <div className="w-6 h-6 rounded-full bg-gold-50 flex items-center justify-center text-gold-500">
                            <FaCheck size={12} />
                          </div>
                          {t(`data.${highlight}`, highlight)}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'pricing' && tour.pricingTiers && (
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
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Accommodation Table */}
              {tour.accommodation && (
                <div className="mt-16 pt-12 border-t border-gray-200">
                  <div className="mb-8">
                    <span className="text-caption text-gold-500 uppercase tracking-widest font-semibold block mb-2">
                      {t('tour.accommodation', 'ALOJAMIENTO')}
                    </span>
                    <h2 className="text-display-md text-3xl text-obsidian-900 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                </div>
              )}

              {/* Itinerary Section */}
              <div className="mt-16 pt-12 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                  <div>
                    <span className="text-caption text-gold-500 uppercase tracking-widest font-semibold block mb-2">
                      {t('tour.stepByStep', 'SUA JORNADA PASSO A PASSO')}
                    </span>
                    <h2 className="text-display-md text-3xl text-obsidian-900 font-display font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {t('tour.detailedItinerary', 'Detailed Itinerary')}
                    </h2>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setExpandedDay('all')}
                      className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider border border-gray-200 hover:border-gold-500 hover:text-gold-600 rounded-lg bg-white transition-colors"
                    >
                      {t('tour.expandAll', 'Expand All')}
                    </button>
                    <button 
                      onClick={() => setExpandedDay(null)}
                      className="px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider border border-gray-200 hover:border-gold-500 hover:text-gold-600 rounded-lg bg-white transition-colors"
                    >
                      {t('tour.collapseAll', 'Collapse All')}
                    </button>
                  </div>
                </div>

                <div className="relative pl-6 md:pl-10">
                  <div className="absolute left-[11px] md:left-[19px] top-8 bottom-8 w-[2px] bg-[rgba(201,162,39,0.2)]"></div>
                  <div className="flex flex-col gap-6">
                    {tour.itinerary && tour.itinerary.map((day) => {
                      const isExpanded = expandedDay === 'all' || expandedDay === day.day;
                      return (
                        <div key={day.day} className="relative">
                          <motion.div
                            animate={{ boxShadow: isExpanded ? ['0 0 0 0 rgba(201,162,39,0.4)', '0 0 0 8px rgba(201,162,39,0)', '0 0 0 0 rgba(201,162,39,0.4)'] : 'none' }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -left-6 md:-left-10 top-[26px] w-3 h-3 bg-gold-500 rounded-full transform -translate-x-1/2 z-10"
                          />

                          <div
                            className="rounded-xl overflow-hidden group"
                            style={{
                              backgroundColor: isExpanded ? 'rgba(201,162,39,0.08)' : 'rgba(201,162,39,0.04)',
                              borderLeft: '2px solid rgba(201,162,39,0.3)',
                              boxShadow: isExpanded ? '-3px 0 12px rgba(201,162,39,0.3)' : 'none',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <button
                              onClick={() => {
                                if (expandedDay === 'all') {
                                  setExpandedDay(day.day);
                                } else {
                                  setExpandedDay(expandedDay === day.day ? null : day.day);
                                }
                              }}
                              className="w-full flex items-center justify-between p-6 text-left"
                            >
                              <h3 className="text-body-lg font-semibold text-obsidian-900">
                                <span className="text-gold-600 mr-2 font-display">{t('tour.day', 'Day')} {day.day} &mdash;</span> {t(`data.${day.title}`, day.title)}
                              </h3>
                              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                                <FaChevronDown className="text-gold-500" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                                  exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
                                  className="px-6 pb-6 overflow-hidden"
                                >
                                  <div className="bg-obsidian-900 p-6 rounded-xl flex flex-col gap-4 shadow-inner">
                                    {day.description ? (
                                      <>
                                        <div className="flex items-start gap-4 pb-4 border-b border-[rgba(201,162,39,0.1)]">
                                          <span className="text-2xl mt-1">📍</span>
                                          <div>
                                            <p className="text-[#F5EDD6] text-body-md leading-relaxed">{t(`data.${day.description}`, day.description)}</p>
                                          </div>
                                        </div>
                                        {day.meals && (
                                          <div className="flex items-start gap-4">
                                            <span className="text-2xl mt-1">🍽️</span>
                                            <div>
                                              <span className="font-bold text-[#C9A227] block mb-1">{t('tour.meals', 'Meals')}</span>
                                              <p className="text-[#F5EDD6] text-body-md leading-relaxed">{t(`data.${day.meals}`, day.meals)}</p>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <div className="flex items-start gap-4 pb-4 border-b border-[rgba(201,162,39,0.1)]">
                                          <span className="text-2xl mt-1">🌅</span>
                                          <div>
                                            <span className="font-bold text-[#C9A227] block mb-1">{t('tour.morning', 'Morning')}</span>
                                            <p className="text-[#F5EDD6] text-body-md leading-relaxed">{t(`data.${day.morning}`, day.morning)}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-4 pb-4 border-b border-[rgba(201,162,39,0.1)]">
                                          <span className="text-2xl mt-1">☀️</span>
                                          <div>
                                            <span className="font-bold text-[#C9A227] block mb-1">{t('tour.afternoon', 'Afternoon')}</span>
                                            <p className="text-[#F5EDD6] text-body-md leading-relaxed">{t(`data.${day.afternoon}`, day.afternoon)}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                          <span className="text-2xl mt-1">🌙</span>
                                          <div>
                                            <span className="font-bold text-[#C9A227] block mb-1">{t('tour.evening', 'Evening')}</span>
                                            <p className="text-[#F5EDD6] text-body-md leading-relaxed">{t(`data.${day.evening}`, day.evening)}</p>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Included / Excluded / Excursions */}
              <div className={`mt-16 pt-12 border-t border-gray-200 grid grid-cols-1 md:grid-cols-${tour.excursions && tour.excursions.length > 0 ? '3' : '2'} gap-8`}>
                <div>
                  <h3 className="text-display-md text-2xl mb-6">{tour.included && tour.included.length > 0 ? (tour.inclusionsTitle ? t(`data.${tour.inclusionsTitle}`, tour.inclusionsTitle) : t('tourDetail.included', 'What is Included')) : ''}</h3>
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
                  <h3 className="text-display-md text-2xl mb-6">{tour.excluded && tour.excluded.length > 0 ? (tour.exclusionsTitle ? t(`data.${tour.exclusionsTitle}`, tour.exclusionsTitle) : t('tourDetail.excluded', 'What is Excluded')) : ''}</h3>
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
                    <h3 className="text-display-md text-2xl mb-6">{t('tour.optionalExcursions', 'Optional Excursions')}</h3>
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

              {/* Accommodation list / Hotels section */}
              {tour.hotels && (
                <div className="mt-16 pt-12 border-t border-gray-200">
                  <div className="mb-8">
                    <span className="text-caption text-gold-500 uppercase tracking-widest font-semibold block mb-2">
                      {t('tour.hotelCategory', 'CATEGORÍA')} — {t(`data.${tour.hotelCategory}`, tour.hotelCategory)}
                    </span>
                    <h2 className="text-display-md text-3xl text-obsidian-900 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                </div>
              )}
            </div>

            {/* Sidebar Booking */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 bg-obsidian-900 text-ivory-50 p-8 rounded-2xl shadow-card">
                <div className="text-center mb-8 border-b border-ivory-50/10 pb-8">
                  <span className="block text-body-md text-ivory-300 mb-2">{t('tourCard.startingFrom', 'Starting from')}</span>
                  <div className="text-display-xl text-gold-500">{formatPrice(tour.price)}</div>
                  <span className="block text-caption text-ivory-300 mt-2">{t('tour.perPerson', 'per person')}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <Button variant="gold-glow" className="w-full py-4 text-lg" onClick={() => setActiveForm('booking')}>
                    {t('nav.bookNow', 'Book Now')}
                  </Button>
                  <Button variant="glass" className="w-full py-4 text-lg" onClick={() => setActiveForm('inquiry')}>
                    {t('tour.inquire', 'Inquire Availability')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Tours */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-display-lg text-obsidian-900 mb-12 text-center font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('tour.youMayAlsoLike', 'You May Also Like')}</h2>
        <div className="flex gap-8 overflow-x-auto pb-8 snap-x no-scrollbar">
          {suggestedTours.map(tData => (
            <div key={tData.id} className="min-w-[320px] md:min-w-[400px] snap-center">
              <Link to={`/tours/${tData.slug}`} className="block h-full group">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-card">
                  <img src={tData.images[0]} alt={t(`data.${tData.title}`, tData.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-display-md text-ivory-50 mb-2 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t(`data.${tData.title}`, tData.title)}</h3>
                    <div className="flex items-center justify-between text-caption text-ivory-300">
                      <span>{t(`data.${tData.duration}`, tData.duration)}</span>
                      <span className="text-gold-500">{formatPrice(tData.price)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modals */}
      <AnimatePresence>
        {activeForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian-900/80 flex items-start sm:items-center justify-center backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setActiveForm(null)}
          >
            {activeForm === 'inquiry' && <InquiryForm onClose={() => setActiveForm(null)} tourTitle={tour.title} />}
            {activeForm === 'booking' && <AdvancedBooking onClose={() => setActiveForm(null)} tourTitle={tour.title} basePricePerPerson={tour.price} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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