import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronRight, FaClock, FaUserFriends, FaGlobe, FaTag,
  FaCheck, FaTimes, FaMapMarkerAlt, FaBed, FaCheckCircle
} from 'react-icons/fa';
import { multiCountryTours } from '../../data/multiCountryTours';
import Button from '../../components/ui/Button';
import { fadeInUp } from '../../animations/variants';
import BookingForm from '../../components/booking/BookingForm';
import { useCurrency } from '../../context/CurrencyContext';

const MultiCountryTourDetails = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const { slug } = useParams();

  const tour = multiCountryTours.find(t => t.slug === slug) || multiCountryTours[0];

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian-50">
        <h1 className="text-display-lg text-obsidian-900">{t('programs.notFound', 'Program not found')}</h1>
      </div>
    );
  }

  return (
    <div className="w-full bg-obsidian-50 min-h-screen">
      <Helmet>
        <title>{t(`data.${tour.title}`, tour.title)} | Dunas Travel</title>
        <meta name="description" content={t(`data.${tour.overview}`, tour.overview).substring(0, 150) + '...'} />
      </Helmet>

      {/* 1. Breadcrumb & Title */}
      <section className="pt-32 pb-10 bg-obsidian-900 text-center px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <Link to="/programs/multi-country" className="hover:text-ivory-50 transition-colors">
              {t('programs.multiCountryTitle', 'Multi-Country Tours')}
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
          src={(tour.images && tour.images[0]) || '/images/tour-1.png'}
          alt={t(`data.${tour.title}`, tour.title)}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          loading="eager"
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
              <FaGlobe className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.languages', 'Languages')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">
                {tour.language === 'es'
                  ? t('languages.spanish', 'Español')
                  : t('languages.english', 'English')}
              </span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaUserFriends className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.groupSize', 'Group Size')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">2-16</span>
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
              <p className="text-body-lg text-obsidian-500 leading-relaxed">{t(`data.${tour.overview}`, tour.overview)}</p>
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

          </div>

          {/* Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <div>
              <BookingForm tourTitle={tour.title} />
            </div>
          </div>
        </div>

        {/* Itinerary – Full Width */}
        <div className="relative mt-24 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-50 via-gold-50/30 to-obsidian-50 rounded-3xl"></div>
          <div className="relative z-10 px-4 md:px-12 py-16">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="mb-10 text-center">
                <span className="text-caption text-gold-500 uppercase tracking-[4px] font-semibold block mb-3">
                  {t('tour.journeyDayByDay', 'YOUR JOURNEY DAY BY DAY')}
                </span>
                <h2 className="text-display-lg text-obsidian-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('tourDetail.itinerary', 'Itinerary')}
                </h2>
                <div className="w-24 h-1 bg-gold-500 mx-auto mt-3"></div>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-[1.1rem] top-0 bottom-0 w-1 bg-gold-400"></div>
                <div className="space-y-6">
                  {tour.itinerary && tour.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-10 md:pl-12">
                      <div className="absolute left-[0.1rem] top-1 w-8 h-8 rounded-full bg-gold-500 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">
                        {day.day}
                      </div>
                      <div className="bg-ivory-50 rounded-2xl p-6 shadow-sm border border-gold-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-semibold text-obsidian-900">{t('tour.day', 'Day')} {day.day}</span>
                          {day.title && (
                            <span className="text-body-sm text-obsidian-500">{t(`data.${day.title}`, day.title)}</span>
                          )}
                        </div>
                        {day.description && (
                          <p className="text-body-sm text-obsidian-500 leading-relaxed">{t(`data.${day.description}`, day.description)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Included / Excluded - Country Split (mct-006) or Legacy */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 max-w-4xl mx-auto"
            >
              {tour.tunisiaIncluded ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-display-md text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {tour.tunisiaInclTitle ? t(`data.${tour.tunisiaInclTitle}`, tour.tunisiaInclTitle) : t('tourDetail.included', 'Included')}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {tour.tunisiaIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                          <FaCheck className="text-sage-500 mt-1 flex-shrink-0" />
                          <span>{t(`data.${item}`, item)}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-display-md text-2xl mt-8 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {tour.tunisiaExclTitle ? t(`data.${tour.tunisiaExclTitle}`, tour.tunisiaExclTitle) : t('tourDetail.excluded', 'Not Included')}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {tour.tunisiaExcluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                          <FaTimes className="text-red-400 mt-1 flex-shrink-0" />
                          <span>{t(`data.${item}`, item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-display-md text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {tour.egyptInclTitle ? t(`data.${tour.egyptInclTitle}`, tour.egyptInclTitle) : t('tourDetail.included', 'Included')}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {tour.egyptIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                          <FaCheck className="text-sage-500 mt-1 flex-shrink-0" />
                          <span>{t(`data.${item}`, item)}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-display-md text-2xl mt-8 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {tour.egyptExclTitle ? t(`data.${tour.egyptExclTitle}`, tour.egyptExclTitle) : t('tourDetail.excluded', 'Not Included')}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {tour.egyptExcluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-body-md text-obsidian-700">
                          <FaTimes className="text-red-400 mt-1 flex-shrink-0" />
                          <span>{t(`data.${item}`, item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                </div>
              )}
            </motion.div>

            {/* Selected Hotels */}
            {tour.selectedHotels && tour.selectedHotels.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-16 max-w-4xl mx-auto"
              >
                <h3 className="text-display-md text-2xl mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('tourDetail.selectedHotels', 'Selected Hotels')}
                </h3>
                <div className="bg-ivory-50 rounded-2xl overflow-hidden shadow-sm border border-gold-100">
                  <div className="overflow-x-auto">
                    <table className="w-full text-body-sm">
                      <thead>
                        <tr className="bg-gold-500 text-obsidian-900">
                          <th className="px-6 py-4 text-left font-semibold">{t('tour.hotelCity', 'City')}</th>
                          <th className="px-6 py-4 text-left font-semibold">{t('tour.hotelNights', 'Nights')}</th>
                          <th className="px-6 py-4 text-left font-semibold">{t('tour.hotelName', 'Hotel')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tour.selectedHotels.map((hotel, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-ivory-50' : 'bg-obsidian-50/50'}>
                            <td className="px-6 py-4 text-obsidian-700">{t(`data.${hotel.city}`, hotel.city)}</td>
                            <td className="px-6 py-4 text-obsidian-700">{t(`data.${hotel.nights}`, hotel.nights)}</td>
                            <td className="px-6 py-4 text-obsidian-900 font-medium">{t(`data.${hotel.name}`, hotel.name)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
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

export default MultiCountryTourDetails;
