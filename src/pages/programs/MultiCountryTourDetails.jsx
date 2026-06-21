import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronRight, FaClock, FaUserFriends, FaGlobe, FaTag,
  FaCheck, FaTimes, FaMapMarkerAlt,
  FaBed, FaInfoCircle
} from 'react-icons/fa';
import { multiCountryTours } from '../../data/multiCountryTours';
import Button from '../../components/ui/Button';
import InquiryForm from '../../components/booking/InquiryForm';
import AdvancedBooking from '../../components/booking/AdvancedBooking';
import { useCurrency } from '../../context/CurrencyContext';

const MultiCountryTourDetails = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { slug } = useParams();

  // Find the selected multi-country tour or default to the first one
  const toursData = multiCountryTours(t);
  const tour = toursData.find(tItem => tItem.slug === slug) || toursData[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  // Suggest other multi-country tours (excluding current)
  const suggestedTours = toursData.filter(tItem => tItem.slug !== tour.slug).slice(0, 3);

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t(`data.${tour.title}`, tour.title)} | {t('site.luxuryTravel', 'Dunas Travel')}</title>
        <meta name="description" content={t(`data.${tour.overview}`, tour.overview).substring(0, 150) + '...'} />
      </Helmet>

      {/* 1. Header & Breadcrumb */}
      <section className="pt-32 pb-10 bg-obsidian-900 text-center px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
            <span className="rtl-flip text-[10px]"><FaChevronRight /></span>
            <Link to="/programs/multi-country" className="hover:text-ivory-50 transition-colors">{t('nav.multiCountry', 'Multi-Country Tours')}</Link>
            <span className="rtl-flip text-[10px]"><FaChevronRight /></span>
            <span className="text-ivory-300">{t(`data.${tour.title}`, tour.title)}</span>
          </div>

          <span className="text-gold-500 font-semibold tracking-widest text-caption uppercase block mb-3">
            {t(`data.${tour.type}`, tour.type)}
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl md:text-display-2xl text-ivory-50 mb-4 font-display"
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
          key={activeImage}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={tour.images[activeImage] || '/images/tour-1.png'}
          alt={t(`data.${tour.title}`, tour.title)}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

        {/* Floating click to gallery indicator */}
        <div className="absolute bottom-6 right-6 bg-obsidian-900/80 backdrop-blur-md px-4 py-2 rounded-full text-ivory-50 text-caption border border-gold-500/20">
          {t('tour.clickGallery', 'Click to open gallery')}
        </div>

        {/* Overlay Flags indicator */}
        <div className="absolute top-6 left-6 flex gap-2">
          {tour.countries.map((country, idx) => (
            <span
              key={idx}
              className="bg-obsidian-950/90 backdrop-blur-sm border border-gold-500/20 text-ivory-50 text-[12px] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md"
            >
              <span>{tour.flags[idx]}</span>
              <span className="font-semibold">{t(`data.${country}`, country)}</span>
            </span>
          ))}
        </div>

        {/* Floating Thumbnails Overlay */}
        <div
          className="absolute bottom-6 left-6 z-30 flex gap-2"
          onClick={e => e.stopPropagation()}
        >
          {tour.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-gold-500 shadow-md scale-[0.98]' : 'border-white/40 opacity-70 hover:opacity-100'
                }`}
            >
              <img src={img} alt="Tour thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Main Details Section */}
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
              <span className="text-body-md font-semibold text-obsidian-900">{tour.groupSize || '2–16'}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaGlobe className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.languages', 'Languages')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">{t('languages.spanish', 'Español')}</span>
            </div>
          </div>

          <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-12">

            {/* Left Column (Content) */}
            <div className="lg:w-2/3">

              {/* 4. Tabs navigation */}
              <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                {[
                  { id: 'overview', label: t('tour.tabOverview', 'Overview') },
                  { id: 'highlights', label: t('tour.tabHighlights', 'Highlights') }
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

              {/* Tabs Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeTab === 'overview' && (
                    <div className="text-body-lg text-obsidian-750 leading-relaxed">
                      <p className="mb-6">{t(`data.${tour.overview}`, tour.overview)}</p>

                      <div className="bg-gold-500/5 border border-gold-500/20 p-5 rounded-xl flex items-start gap-4">
                        <FaInfoCircle className="text-gold-600 text-xl shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold text-obsidian-900 block mb-1">
                            {t('programs.luxGuarantee', 'Executive Service Included')}
                          </span>
                          <span className="text-body-md text-obsidian-700">
                            {t('programs.luxGuaranteeDesc', 'This multi-country catalog features premium flights, custom-vetted 4-star and 5-star hotels, luxury Nile cruisers, private 4x4 desert safaris, and certified Spanish-speaking local guides in every country.')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'highlights' && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tour.highlights && tour.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-body-lg text-obsidian-750 leading-snug">
                          <div className="w-5 h-5 rounded-full bg-gold-50 border border-gold-500/20 flex items-center justify-center text-gold-500 shrink-0 mt-0.5">
                            <FaCheck size={9} />
                          </div>
                          <span>{t(`data.${highlight}`, highlight)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Accommodation Table */}
              {tour.accommodations && (
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
                      <div className="p-4 border-r border-ivory-50/10">{t('accommodations.destination', 'Destination')}</div>
                      <div className="p-4 border-r border-ivory-50/10 text-center">{t('accommodations.nights', 'Nights')}</div>
                      <div className="p-4 text-center">{t('accommodations.regime', 'Board Basis')}</div>
                    </div>
                    {tour.accommodations.map((acc, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-3 border-b border-gold-500/10 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-obsidian-50/50'}`}
                      >
                        <div className="p-4 border-r border-gold-500/10 font-semibold text-obsidian-900 flex items-center gap-2 text-sm md:text-base">
                          <FaMapMarkerAlt className="text-gold-500 flex-shrink-0" />
                          {t(`data.${acc.destination}`, acc.destination)}
                        </div>
                        <div className="p-4 border-r border-gold-500/10 text-center font-bold text-gold-700 text-base md:text-lg">
                          {acc.nights} {acc.nights === 1 ? t('tour.night', 'Night') : t('tour.nights', 'Nights')}
                        </div>
                        <div className="p-4 text-center text-obsidian-700 flex items-center justify-center gap-2 text-sm md:text-base">
                          <FaBed className="text-gold-500 flex-shrink-0" />
                          {t(`data.${acc.regime}`, acc.regime)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Detailed Itinerary Section — always visible */}
              <div className="mt-16 pt-12 border-t border-gray-200">
                <div className="mb-10">
                  <span className="text-caption text-gold-600 uppercase tracking-widest font-bold block mb-2">
                    {t('tour.stepByStep', 'YOUR DETAILED ODYSSEY')}
                  </span>
                  <h2 className="text-display-md text-3xl text-obsidian-900 font-display font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {t('tour.detailedItinerary', 'Itinerary Schedule')}
                  </h2>
                </div>

                <div className="relative pl-6 md:pl-10">
                  <div className="absolute left-[11px] md:left-[19px] top-8 bottom-8 w-[2px] bg-[rgba(201,162,39,0.2)]"></div>

                  <div className="flex flex-col gap-6">
                    {tour.itinerary && tour.itinerary.map((day) => (
                      <div key={day.day} className="relative">
                        <div className="absolute -left-6 md:-left-10 top-[26px] w-3 h-3 bg-gold-500 rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(201,162,39,0.2)]" />

                        <div className="rounded-xl overflow-hidden group bg-[rgba(201,162,39,0.08)] border-l-2 border-[rgba(201,162,39,0.3)]">
                          <div className="p-6 text-left">
                            <h3 className="text-body-lg font-semibold text-obsidian-900 flex items-center gap-1 mb-4">
                              <span className="text-gold-600 font-display font-bold shrink-0">{t('tour.day', 'Day')} {day.day} —</span>
                              <span>{t(`data.${day.title}`, day.title)}</span>
                            </h3>

                            <div className="bg-obsidian-900 p-6 rounded-xl flex flex-col gap-4 shadow-inner">
                              {day.morning && (
                                <div className="flex items-start gap-4 pb-4 border-b border-[rgba(201,162,39,0.1)]">
                                  <span className="text-2xl mt-1" aria-hidden="true">🌅</span>
                                  <div>
                                    <span className="font-bold text-[#C9A227] block mb-1">{t('tour.morning', 'Morning')}</span>
                                    <p className="text-[#F5EDD6] text-body-md leading-relaxed">{t(`data.${day.morning}`, day.morning)}</p>
                                  </div>
                                </div>
                              )}
                              {day.afternoon && (
                                <div className="flex items-start gap-4 pb-4 border-b border-[rgba(201,162,39,0.1)]">
                                  <span className="text-2xl mt-1" aria-hidden="true">☀️</span>
                                  <div>
                                    <span className="font-bold text-[#C9A227] block mb-1">{t('tour.afternoon', 'Afternoon')}</span>
                                    <p className="text-[#F5EDD6] text-body-md leading-relaxed">{t(`data.${day.afternoon}`, day.afternoon)}</p>
                                  </div>
                                </div>
                              )}
                              {day.evening && (
                                <div className="flex items-start gap-4">
                                  <span className="text-2xl mt-1" aria-hidden="true">🌙</span>
                                  <div>
                                    <span className="font-bold text-[#C9A227] block mb-1">{t('tour.evening', 'Evening')}</span>
                                    <p className="text-[#F5EDD6] text-body-md leading-relaxed">{t(`data.${day.evening}`, day.evening)}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Included / Excluded sections */}
              <div className="mt-16 pt-12 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-display-md text-2xl mb-6">{t('tourDetail.included', 'What is Included')}</h3>
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
                  <h3 className="text-display-md text-2xl mb-6">{t('tourDetail.excluded', 'What is Excluded')}</h3>
                  <ul className="flex flex-col gap-3">
                    {tour.excluded && tour.excluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                        <FaTimes className="text-red-400 mt-1 flex-shrink-0" />
                        <span>{t(`data.${item}`, item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar Booking panel) */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 bg-obsidian-900 text-ivory-50 p-8 rounded-2xl shadow-card border border-gold-500/20">
                <div className="text-center mb-6 border-b border-ivory-50/10 pb-6">
                  <span className="block text-body-md text-ivory-300 mb-1">
                    {t('tourCard.startingFrom', 'Starting from')}
                  </span>
                  <div className="text-display-xl text-gold-500 font-bold text-4xl tracking-tight">
                    {formatPrice(tour.price)}
                  </div>
                  <span className="block text-[11px] text-ivory-300 mt-1.5 uppercase tracking-wider">
                    {t('tour.perPerson', 'per person')}
                  </span>
                </div>

                {/* 7. Supplements section (Renders dynamic supplement tables for packages that have multiple rates, like Tour 7) */}
                {tour.pricing && (
                  <div className="mb-6 bg-black/30 border border-gold-500/15 rounded-xl p-4 flex flex-col gap-3.5">
                    <span className="text-[10px] uppercase tracking-wider text-gold-500 font-bold">
                      {t('programs.pricingDetails', 'Rate Breakdown & Supplements')}
                    </span>
                    <div className="flex flex-col gap-3 text-caption">
                      {tour.pricing.map((pr, idx) => (
                        <div key={idx} className="flex flex-col gap-1 pb-2 border-b border-gold-500/5 last:border-b-0 last:pb-0">
                          <span className="text-ivory-100 font-semibold leading-tight">{t(`data.${pr.label}`, pr.label)}</span>
                          <div className="flex justify-between text-[11px] text-ivory-300 mt-0.5">
                            <span>{t('tour.double', 'Double')}: <b className="text-gold-500">{formatPrice(pr.priceDouble)}</b></span>
                            <span>{t('tour.single', 'Single')}: <b className="text-gold-500">{formatPrice(pr.priceSingle)}</b></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <Button
                    variant="gold-glow"
                    className="w-full py-4 text-sm font-bold uppercase tracking-wider"
                    onClick={() => setActiveForm('booking')}
                  >
                    {t('nav.bookNow', 'Book This Tour')}
                  </Button>
                  <Button
                    variant="glass"
                    className="w-full py-4 text-sm font-bold uppercase tracking-wider"
                    onClick={() => setActiveForm('inquiry')}
                  >
                    {t('tour.inquire', 'Inquire Availability')}
                  </Button>
                </div>

                {/* Additional custom traveler helper badges */}
                <div className="mt-8 pt-6 border-t border-ivory-50/10 flex flex-col gap-3.5 text-caption text-ivory-300">
                  <div className="flex items-center gap-2.5">
                    <FaCheck className="text-gold-500 shrink-0" />
                    <span>{t('programs.helperVisa', 'Guaranteed local visa assistance')}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FaCheck className="text-gold-500 shrink-0" />
                    <span>{t('programs.helperGuide', 'Certified Spanish guide in all locations')}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FaCheck className="text-gold-500 shrink-0" />
                    <span>{t('programs.helperFlights', 'Domestics flights fully included')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Suggested Tours Carousel */}
      <section className="container mx-auto px-6 py-24">
        <h2
          className="text-display-lg text-obsidian-900 mb-12 text-center font-display font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t('tour.youMayAlsoLike', 'You May Also Like')}
        </h2>
        <div className="flex gap-8 overflow-x-auto pb-8 snap-x no-scrollbar">
          {suggestedTours.map(tData => (
            <div key={tData.id} className="min-w-[300px] md:min-w-[380px] snap-center">
              <Link to={`/programs/multi-country/${tData.slug}`} className="block h-full group">
                <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-card border border-gray-100">
                  <img
                    src={tData.images[0]}
                    alt={t(`data.${tData.title}`, tData.title)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent"></div>

                  {/* Badges on Suggested Cards */}
                  <div className="absolute top-4 left-4 flex gap-1">
                    {tData.countries.slice(0, 2).map((c, i) => (
                      <span key={i} className="bg-obsidian-950/90 text-ivory-50 text-[10px] px-2 py-0.5 rounded-full border border-gold-500/10">
                        {tData.flags[i]} {t(`data.${c}`, c)}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] text-gold-500 uppercase tracking-widest block mb-1">
                      {t(`data.${tData.type}`, tData.type)}
                    </span>
                    <h3
                      className="text-display-md text-ivory-50 text-xl mb-2 font-display font-semibold line-clamp-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {t(`data.${tData.title}`, tData.title)}
                    </h3>
                    <div className="flex items-center justify-between text-caption text-ivory-300">
                      <span>{t(`data.${tData.duration}`, tData.duration)}</span>
                      <span className="text-gold-500 font-bold text-body-md">{formatPrice(tData.price)}</span>
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
            className="fixed inset-0 z-[100] bg-obsidian-950/80 flex items-start sm:items-center justify-center backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setActiveForm(null)}
          >
            {activeForm === 'inquiry' && <InquiryForm onClose={() => setActiveForm(null)} tourTitle={tour.title} />}
            {activeForm === 'booking' && <AdvancedBooking onClose={() => setActiveForm(null)} tourTitle={tour.title} basePricePerPerson={tour.price} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Gallery Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian-950/95 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-ivory-50 hover:text-gold-500 z-[101] transition-colors"
              aria-label="Close Lightbox"
            >
              <FaTimes size={32} />
            </button>
            <div className="relative flex flex-col items-center max-w-[90vw] max-h-[80vh]">
              <img
                src={tour.images[activeImage]}
                alt={t(`data.${tour.title}`, tour.title)}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-gold-500/20"
                onClick={e => e.stopPropagation()}
              />
              <div className="text-ivory-300 text-caption mt-4 bg-obsidian-900/60 backdrop-blur-sm px-4 py-1.5 rounded-full">
                {activeImage + 1} / {tour.images.length} — {t(`data.${tour.title}`, tour.title)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiCountryTourDetails;
