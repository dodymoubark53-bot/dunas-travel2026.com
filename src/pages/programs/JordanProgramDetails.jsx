import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaBed, FaClock, FaTag, FaChevronRight } from 'react-icons/fa';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import Button from '../../components/ui/Button';
import InquiryForm from '../../components/booking/InquiryForm';
import { useJordanProgram } from '../../hooks/useJordanPrograms';

const JordanProgramDetails = () => {
  const { t } = useTranslation();
  const { programId } = useParams();
  const program = useJordanProgram(programId);
  const [activeImage, setActiveImage] = useState(null);
  const [activeForm, setActiveForm] = useState(null);

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

      {/* 1. Breadcrumb & Title */}
      <section className="pt-32 pb-10 bg-obsidian-900 text-center px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
            <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
            <span className="rtl-flip"><FaChevronRight className="text-[10px]" /></span>
            <Link to="/destinations/jordan" className="hover:text-ivory-50 transition-colors">{t('dest.jordan.title', 'Jordan')}</Link>
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
              <span className="text-body-md font-semibold text-obsidian-900">{t('dest.jordan.title', 'Jordan')}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-display-lg text-obsidian-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t('tourDetail.overview', 'Overview')}
              </h2>
              <p className="text-body-lg text-obsidian-500 leading-relaxed">{overview}</p>
            </motion.div>

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
                  {days.map((day) => (
                    <div key={day.day} className="relative">
                      <div className="absolute -left-10 top-[18px] w-3 h-3 bg-gold-500 rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(201,162,39,0.2)]" />

                      <div className="bg-ivory-50 rounded-xl border-l-2 border-[rgba(201,162,39,0.3)] overflow-hidden shadow-sm p-5">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="font-semibold text-obsidian-900">{t('tour.day', 'Day')} {day.day}</span>
                          {day.meals && (
                            <span className="text-caption text-obsidian-400 flex items-center gap-1">
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

      <section className="relative py-24 mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${images[0]})` }} />
        <div className="absolute inset-0 bg-obsidian-900/75" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold block mb-4">
            {t('programs.customizeLabel', "DIDN'T FIND WHAT YOU'RE LOOKING FOR?")}
          </span>
          <h2 className="text-display-xl text-ivory-50 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('programs.customizeTitle', 'Let us design your perfect Jordan journey')}
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

export default JordanProgramDetails;
