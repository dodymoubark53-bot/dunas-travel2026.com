import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronRight, FaClock, FaUserFriends, FaGlobe, FaTag,
  FaCheck, FaTimes, FaMapMarkerAlt,
  FaBed, FaCheckCircle, FaCloudSun, FaSun, FaMoon
} from 'react-icons/fa';
import { fadeInUp } from '../../animations/variants';
import { multiCountryTours } from '../../data/multiCountryTours';
import Button from '../../components/ui/Button';
import InquiryForm from '../../components/booking/InquiryForm';
import AdvancedBooking from '../../components/booking/AdvancedBooking';
import { useCurrency } from '../../context/CurrencyContext';

const MultiCountryTourDetails = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { slug } = useParams();

  const toursData = multiCountryTours(t);
  const tour = toursData.find(tItem => tItem.slug === slug) || toursData[0];
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const suggestedTours = toursData.filter(tItem => tItem.slug !== tour.slug).slice(0, 3);

  return (
    <div className="w-full bg-obsidian-50 min-h-screen">
      <Helmet>
        <title>{t(`data.${tour.title}`, tour.title)} | {t('site.luxuryTravel', 'Dunas Travel')}</title>
        <meta name="description" content={t(`data.${tour.overview}`, tour.overview).substring(0, 150) + '...'} />
      </Helmet>

      {/* 1. Breadcrumb & Title */}
      <section className="pt-32 pb-10 bg-obsidian-900 text-center px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <Link to="/programs/multi-country" className="hover:text-ivory-50 transition-colors">{t('nav.multiCountry', 'Multi-Country Tours')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <span className="text-ivory-300">{t(`data.${tour.title}`, tour.title)}</span>
          </div>

          <span className="text-gold-500 font-semibold tracking-widest text-caption uppercase block mb-3">
            {t(`data.${tour.type}`, tour.type)}
          </span>
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
              className="text-body-lg text-gold-400 font-medium tracking-wide"
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

        {/* Click to open gallery */}
        <div className="absolute bottom-6 right-6 bg-obsidian-900/80 backdrop-blur-md px-4 py-2 rounded-full text-ivory-50 text-caption border border-gold-500/20">
          {t('tour.clickGallery', 'Click to open gallery')}
        </div>

        {/* Country Flags overlay */}
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

        {/* Floating Thumbnails */}
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
              <span className="text-body-md font-semibold text-obsidian-900">{tour.groupSize || '2\u201316'}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaGlobe className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.languages', 'Languages')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">{t('languages.spanish', 'Espa\u00f1ol')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Content Section */}
      <section className="container mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Column */}
          <div className="lg:col-span-2">

            {/* Overview */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-display-lg text-obsidian-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('tourDetail.overview', 'Overview')}
              </h2>
              <p className="text-body-lg text-obsidian-500 leading-relaxed">{t(`data.${tour.overview}`, tour.overview)}</p>
            </motion.div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
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

            {/* Accommodation Table */}
            {tour.accommodations && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-16 pt-12 border-t border-gray-200"
              >
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
              </motion.div>
            )}

            {/* Itinerary Timeline */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 pt-12 border-t border-gray-200"
            >
              <div className="mb-10">
                <span className="text-caption text-gold-600 uppercase tracking-widest font-bold block mb-2">
                  {t('tour.stepByStep', 'YOUR DETAILED ODYSSEY')}
                </span>
                <h2 className="text-display-md text-3xl text-obsidian-900 font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('tour.detailedItinerary', 'Itinerary Schedule')}
                </h2>
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
                        </div>
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
              className="mt-16 pt-12 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
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
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-obsidian-900 text-ivory-50 rounded-2xl shadow-card p-8 border border-gold-500/10">
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
      </section>

      {/* 5. CTA Section */}
      <section className="relative py-24 mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tour.images[0]})` }} />
        <div className="absolute inset-0 bg-obsidian-900/75" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold block mb-4">
            {t('programs.customizeLabel', "DIDN'T FIND WHAT YOU'RE LOOKING FOR?")}
          </span>
          <h2 className="text-display-xl text-ivory-50 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('programs.customizeTitle', 'Let us design your perfect multi-country journey')}
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

      {/* 6. Suggested Tours */}
      <section className="container mx-auto px-6 py-24">
        <h2
          className="text-display-lg text-obsidian-900 mb-12 text-center"
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
