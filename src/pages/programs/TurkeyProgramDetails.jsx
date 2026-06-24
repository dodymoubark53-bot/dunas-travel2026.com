import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaMapMarkerAlt, FaBed, FaClock, FaTag, FaChevronRight } from 'react-icons/fa';
import { fadeInUp } from '../../animations/variants';
import Button from '../../components/ui/Button';
import BookingForm from '../../components/booking/BookingForm';
import { useTurkeyProgram } from '../../hooks/useTurkeyPrograms';

const TurkeyProgramDetails = () => {
  const { t, i18n } = useTranslation();
  const { programId } = useParams();
  const program = useTurkeyProgram(programId);
  const [activeImage, setActiveImage] = useState(null);
  const [transportChoice, setTransportChoice] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [programId]);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian-50">
        <h1 className="text-display-lg text-obsidian-900">{t('programs.notFound', 'Program not found')}</h1>
      </div>
    );
  }

  const { title, overview, duration, highlights, days, images, code, minPax, transportOptions } = program;

  return (
    <div className="w-full bg-obsidian-50 min-h-screen">
      <Helmet>
        <title>{title} | Dunas Travel</title>
        <meta name="description" content={overview} />
      </Helmet>

      {/* 1. Breadcrumb & Title */}
      <section className="pt-32 pb-10 bg-obsidian-900 text-center px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <Link to="/destinations/turkey" className="hover:text-ivory-50 transition-colors">{t('dest.turkey.title', 'Turkey')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <span className="text-ivory-300">{title}</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-xl text-ivory-50 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-body-lg text-gold-400 font-medium tracking-wide"
          >
            {code}
          </motion.p>
        </div>
      </section>

      {/* 2. Photo Gallery */}
      <section className="relative w-full h-[50vh] lg:h-[70vh] overflow-hidden group cursor-pointer" onClick={() => setActiveImage(0)}>
        <motion.img
          key={activeImage}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={images[activeImage || 0]}
          alt={title}
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
              <span className="text-body-md font-semibold text-obsidian-900">{duration}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaBed className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.tourType', 'Program')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">{minPax}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaTag className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.code', 'Code')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">{code}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2">
              <FaMapMarkerAlt className="text-gold-500 text-2xl mb-1" />
              <span className="text-caption text-obsidian-500 uppercase">{t('tour.destination', 'Destination')}</span>
              <span className="text-body-md font-semibold text-obsidian-900">{t('dest.turkey.title', 'Turkey')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transport Options Selector */}
      {transportOptions && (
        <section className="container mx-auto px-6 pt-12">
          <div className="bg-gradient-to-r from-gold-50 via-gold-100/50 to-gold-50 border-2 border-gold-400 rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-display-md text-obsidian-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {program.transportOptions}
              </h3>
              <p className="text-body-sm text-obsidian-500">
                {t('tour.transportNote', 'Choose your preferred transport between Istanbul and Ankara')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => setTransportChoice('train')}
                className={`flex-1 p-5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                  transportChoice === 'train'
                    ? 'border-gold-500 bg-gold-500/10 shadow-lg shadow-gold-500/20 scale-[1.02]'
                    : 'border-gold-300/50 bg-white/60 hover:border-gold-400 hover:bg-gold-50/80'
                }`}
              >
                <span className="text-4xl block mb-2">🚄</span>
                <span className={`text-body-md font-bold block ${transportChoice === 'train' ? 'text-gold-700' : 'text-obsidian-700'}`}>
                  {t('tour.highSpeedTrain', 'High-Speed Train')}
                </span>
                <span className={`text-caption block mt-1 ${transportChoice === 'train' ? 'text-gold-600' : 'text-obsidian-400'}`}>
                  ~4 {t('tour.hours', 'hours')}
                </span>
                {transportChoice === 'train' && (
                  <span className="inline-block mt-2 text-[11px] font-semibold text-gold-700 bg-gold-200 px-3 py-1 rounded-full">
                    ✓ {t('tour.selected', 'Selected')}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setTransportChoice('bus')}
                className={`flex-1 p-5 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer ${
                  transportChoice === 'bus'
                    ? 'border-gold-500 bg-gold-500/10 shadow-lg shadow-gold-500/20 scale-[1.02]'
                    : 'border-gold-300/50 bg-white/60 hover:border-gold-400 hover:bg-gold-50/80'
                }`}
              >
                <span className="text-4xl block mb-2">🚌</span>
                <span className={`text-body-md font-bold block ${transportChoice === 'bus' ? 'text-gold-700' : 'text-obsidian-700'}`}>
                  {t('tour.bus', 'Bus')}
                </span>
                <span className={`text-caption block mt-1 ${transportChoice === 'bus' ? 'text-gold-600' : 'text-obsidian-400'}`}>
                  ~6 {t('tour.hours', 'hours')} · {t('tour.viaGrandBazaar', 'via Grand Bazaar')}
                </span>
                {transportChoice === 'bus' && (
                  <span className="inline-block mt-2 text-[11px] font-semibold text-gold-700 bg-gold-200 px-3 py-1 rounded-full">
                    ✓ {t('tour.selected', 'Selected')}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="container mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Overview */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-display-lg text-obsidian-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('tourDetail.overview', 'Overview')}
              </h2>
              <p className="text-body-lg text-obsidian-500 leading-relaxed">{overview}</p>
            </motion.div>

            {/* Highlights */}
            {Array.isArray(highlights) && highlights.length > 0 && (
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
                  {highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-ivory-50 p-4 rounded-xl shadow-sm border border-gold-500/10">
                      <FaCheckCircle className="text-gold-500 mt-1 shrink-0" />
                      <span className="text-body-sm text-obsidian-700">{hl}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

          </div>

          {/* Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <div>
              <BookingForm tourTitle={title} transportChoice={transportChoice} />
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
                  {days.map((day) => (
                    <div key={day.day} className="relative pl-10 md:pl-12">
                      <div className="absolute left-[0.1rem] top-1 w-8 h-8 rounded-full bg-gold-500 text-white flex items-center justify-center text-sm font-bold shadow-md z-10">
                        {day.day}
                      </div>
                      <div className="bg-ivory-50 rounded-2xl p-6 shadow-sm border border-gold-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-semibold text-obsidian-900">{t('tour.day', 'Day')} {day.day}</span>
                          {day.meals && (
                            <span className="text-caption text-obsidian-400 flex items-center gap-1 ml-auto">
                              <FaBed className="text-gold-500" /> {day.meals}
                            </span>
                          )}
                        </div>
                        <p className="text-body-sm text-obsidian-500 leading-relaxed">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Contact / Customize Trip CTA */}
      <section className="relative py-24 mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${images[0]})` }} />
        <div className="absolute inset-0 bg-obsidian-900/75" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold block mb-4">
            {t('programs.customizeLabel', 'DIDN\'T FIND WHAT YOU\'RE LOOKING FOR?')}
          </span>
          <h2 className="text-display-xl text-ivory-50 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('programs.customizeTitle', 'Let us design your perfect Turkey journey')}
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
    </div>
  );
};

export default TurkeyProgramDetails;
