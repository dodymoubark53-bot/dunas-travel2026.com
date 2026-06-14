import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes, FaStar, FaMapMarkerAlt, FaTimesCircle } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import { services } from '../../data/services'; // ملاحظة: يمكنك لاحقاً تغيير اسم الفولدر أو الفايل لـ programs لتنظيم داتا الـ ساس
import InquiryForm from '../../components/booking/InquiryForm';
import { useCurrency } from '../../context/CurrencyContext';

const ServiceDetails = () => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  // تعديل: استقبال category و slug بما يتوافق مع الـ Navbar الجديد للبرامج
  const { category, slug } = useParams();
  const service = services.find((s) => s.category === category && s.slug === slug);
  const [activeImage, setActiveImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian-50">
        <h1 className="text-display-lg text-obsidian-900">{t('programs.notFound', 'Program not found')}</h1>
      </div>
    );
  }

  const relatedServices = services.filter((s) => s.category === category && s.id !== service.id).slice(0, 3);

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        {/* تعديل الترجمات في الـ Title من services إلى programs لتفادي الـ undefined */}
        <title>
          {t(`data.${service.title}`, service.title)} | {t('programs.luxuryCat', 'Luxury {{category}}', { category: t(`nav.${category}`, category.charAt(0).toUpperCase() + category.slice(1)) })}
        </title>
        <meta name="description" content={t(`data.${service.shortDesc}`, service.shortDesc)} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-end justify-center overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={service.images[0]}
            alt={t(`data.${service.title}`, service.title)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-obsidian-900/60 bg-gradient-to-t from-obsidian-900 via-obsidian-900/30 to-transparent"></div>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col md:flex-row justify-between items-end"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6 md:mb-0">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4 text-caption text-gold-500 uppercase tracking-widest font-medium">
              <span>{t(`nav.${category}`, category)}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
              <span className="flex items-center gap-1"><FaMapMarkerAlt /> {t(`data.${service.location}`, service.location)}</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-display-lg md:text-display-xl text-ivory-50 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t(`data.${service.title}`, service.title)}
            </motion.h1>
          </div>

          <motion.div variants={fadeInUp} className="flex flex-col items-start md:items-end bg-obsidian-900/80 backdrop-blur-md p-6 rounded-2xl border border-ivory-50/10">
            <div className="flex text-gold-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(service.rating) ? "text-gold-500" : "text-obsidian-300"} />
              ))}
              <span className="text-ivory-50 ml-2 text-body-sm font-medium">{service.rating}</span>
            </div>
            <div className="text-[#F5EDD6] text-caption uppercase tracking-wider mb-1">{t('tourCard.startingFrom', 'Starting From')}</div>
            <div className="text-display-md text-ivory-50">{formatPrice(service.price)}</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 mt-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">
            {/* Overview */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-display-md text-obsidian-900 mb-6 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('tourDetail.overview', 'Overview')}</h2>
              <div className="prose prose-lg prose-p:text-obsidian-500 prose-p:font-body prose-p:mb-6">
                {service.overview.map((para, idx) => (
                  <p key={idx}>{t(`data.${para}`, para)}</p>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12">
              <h2 className="text-display-md text-obsidian-900 mb-6 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('tourDetail.highlights', 'Key Highlights')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <FaCheckCircle className="text-gold-500 mt-1 flex-shrink-0" />
                    <span className="text-body-md text-obsidian-700">{t(`data.${highlight}`, highlight)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Included / Excluded */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 bg-ivory-50 p-8 rounded-2xl shadow-sm border border-obsidian-900/5">
              <h2 className="text-display-md text-obsidian-900 mb-8 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('tourDetail.incExc', "What's Included & Excluded")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-body-lg font-semibold text-sage-700 mb-4 flex items-center gap-2 font-display">{t('tourDetail.included', 'Included')}</h3>
                  <ul className="space-y-3">
                    {service.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-obsidian-500">
                        <FaCheckCircle className="text-sage-500 mt-1" />
                        <span>{t(`data.${item}`, item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-body-lg font-semibold text-red-700 mb-4 flex items-center gap-2 font-display">{t('tourDetail.excluded', 'Not Included')}</h3>
                  <ul className="space-y-3">
                    {service.excluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-obsidian-500">
                        <FaTimesCircle className="text-red-500 mt-1" />
                        <span>{t(`data.${item}`, item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Photo Gallery */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16">
              <h2 className="text-display-md text-obsidian-900 mb-6 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('tourDetail.gallery', 'Gallery')}</h2>
              <div className="grid grid-cols-3 gap-4">
                {service.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden cursor-pointer group relative ${idx === 0 ? 'col-span-3 h-80' : 'col-span-1 h-40'}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`${service.title} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-ivory-50 rounded-2xl shadow-card p-8 border border-gold-500/10">
                {/* تعديل الترجمات هنا بردو من services لـ programs */}
                <h3 className="text-display-sm text-obsidian-900 mb-2 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('programs.bookExperience', 'Book Your Experience')}</h3>
                <p className="text-body-sm text-obsidian-300 mb-6">{t('programs.conciergeAvailability', 'Our concierge team will confirm availability within 2 hours.')}</p>

                <Button variant="gold-glow" className="w-full py-4 mb-4" onClick={() => setIsModalOpen(true)}>
                  {t('programs.inquireNow', 'Inquire Now')}
                </Button>

                <div class="text-center">
                  <span className="text-caption text-obsidian-300 flex items-center justify-center gap-2">
                    <FaCheckCircle className="text-sage-500" /> {t('programs.bestPriceGuarantee', 'Best Price Guarantee')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="bg-ivory-50 py-24 mt-24 border-t border-obsidian-900/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              {/* تعديل الترجمة من services لـ programs */}
              <h2 className="text-display-lg text-obsidian-900" style={{ fontFamily: "'Playfair Display', serif" }}>{t('programs.moreCat', 'More {{category}}', { category: t(`nav.${category}`, category.charAt(0).toUpperCase() + category.slice(1)) })}</h2>
              <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relService) => (
                <div key={relService.id} className="bg-obsidian-50 rounded-2xl overflow-hidden group h-full flex flex-col shadow-sm border border-obsidian-900/5 hover:shadow-card transition-all">
                  <div className="relative h-60 overflow-hidden">
                    <div className="absolute top-4 left-4 z-10 bg-gold-500 text-obsidian-900 text-caption uppercase px-3 py-1 rounded-full">{t(`data.${relService.location}`, relService.location)}</div>
                    <img src={relService.images[0]} alt={t(`data.${relService.title}`, relService.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-display-md text-obsidian-900 mb-3 text-xl line-clamp-1">{t(`data.${relService.title}`, relService.title)}</h3>
                    <p className="text-body-sm text-obsidian-500 line-clamp-2 mb-6">{t(`data.${relService.shortDesc}`, relService.shortDesc)}</p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-obsidian-900/10">
                      <div>
                        <span className="text-caption text-obsidian-300 block">{t('tourCard.from', 'From')}</span>
                        <span className="text-body-lg font-semibold text-obsidian-900">{formatPrice(relService.price)}</span>
                      </div>
                      {/* تعديل مسار لينك التفاصيل ليتوافق مع الـ Route الجديد للبرامج */}
                      <Link to={`/programs/${relService.category}/${relService.slug}`}>
                        <Button variant="outline-gold" className="px-4 py-2 text-sm">{t('tourCard.viewDetails', 'View Details')}</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian-900/80 flex items-center justify-center backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* لمنع إغلاق المودال عند الضغط داخل الفورم نفسها */}
            <div onClick={(e) => e.stopPropagation()}>
              <InquiryForm onClose={() => setIsModalOpen(false)} tourTitle={service.title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian-900/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <button className="absolute top-6 right-6 text-ivory-50 hover:text-gold-500 z-50">
              <FaTimes size={32} />
            </button>
            <img src={activeImage} className="max-w-full max-h-[90vh] object-contain rounded-lg" alt="Gallery preview" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetails;