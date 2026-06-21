import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes, FaStar, FaMapMarkerAlt, FaChevronDown, FaBed, FaClock, FaTag } from 'react-icons/fa';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import Button from '../../components/ui/Button';
import InquiryForm from '../../components/booking/InquiryForm';
import { useTurkeyProgram } from '../../hooks/useTurkeyPrograms';

const TurkeyProgramDetails = () => {
  const { t } = useTranslation();
  const { programId } = useParams();
  const program = useTurkeyProgram(programId);
  const [activeImage, setActiveImage] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [expandedDay, setExpandedDay] = useState(1);

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

  const { title, overview, duration, highlights, days, images, code, minPax } = program;

  return (
    <div className="w-full bg-obsidian-50 min-h-screen">
      <Helmet>
        <title>{title} | Dunas Travel</title>
        <meta name="description" content={overview} />
      </Helmet>

      {/* Hero */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={images[0]} alt={title} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent"></div>
        </div>
        <motion.div
          className="relative z-10 container mx-auto px-6 text-center mt-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeInUp} className="inline-block font-body text-gold-500 tracking-[0.2em] uppercase text-sm mb-4">
            {code}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-display-xl text-ivory-50 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </motion.h1>
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6 text-ivory-300 text-sm">
            <span className="flex items-center gap-2"><FaClock className="text-gold-500" /> {duration}</span>
            <span className="flex items-center gap-2"><FaTag className="text-gold-500" /> {minPax}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 py-16">
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

            {/* Itinerary */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16"
            >
              <h2 className="text-display-lg text-obsidian-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('tourDetail.itinerary', 'Itinerary')}
              </h2>
              <div className="w-24 h-1 bg-gold-500 mb-8"></div>

              <div className="space-y-4">
                {days.map((day) => (
                  <div
                    key={day.day}
                    className="bg-ivory-50 rounded-xl border border-gold-500/10 overflow-hidden shadow-sm"
                  >
                    <button
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-obsidian-50/50 transition-colors"
                      onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 rounded-full bg-gold-500 text-obsidian-900 font-bold flex items-center justify-center text-sm">
                          {String(day.day).padStart(2, '0')}
                        </span>
                        <span className="font-semibold text-obsidian-900">
                          {t('tour.day', 'Day')} {day.day}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {day.meals && (
                          <span className="text-caption text-obsidian-400 flex items-center gap-1">
                            <FaBed className="text-gold-500" /> {day.meals}
                          </span>
                        )}
                        <FaChevronDown
                          className={`text-gold-500 transition-transform duration-300 ${expandedDay === day.day ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedDay === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0 border-t border-gold-500/10">
                            <p className="text-body-sm text-obsidian-500 leading-relaxed mt-3">{day.description}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-obsidian-900 text-ivory-50 rounded-2xl shadow-card p-8 border border-gold-500/10">
                <div className="text-center mb-8 border-b border-ivory-50/10 pb-8">
                  <span className="block text-body-md text-ivory-300 mb-2">{t('tourCard.duration', 'Duration')}</span>
                  <div className="text-display-md text-gold-500">{duration}</div>
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

      {/* Inquiry Modal */}
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
              <InquiryForm onClose={() => setActiveForm(null)} tourTitle={title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TurkeyProgramDetails;
