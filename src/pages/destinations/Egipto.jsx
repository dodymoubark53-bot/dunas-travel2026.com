import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import Button from '../../components/ui/Button';
import TourCard from '../../components/tour/TourCard';
import { tours } from '../../data/tours';

const Egipto = () => {
  const { t } = useTranslation();
  const egyptTours = tours.filter((tour) => tour.destination === 'egypt');

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('dest.egypt.seoTitle', 'Luxury Egypt Tours & Vacations | Dunas Travel')}</title>
        <meta name="description" content={t('dest.egypt.seoDesc', 'Discover Egypt in grand style. From the majestic Pyramids of Giza to the temples of Luxor and the Red Sea coast, embark on an unforgettable luxury journey.')} />
      </Helmet>

      {/* Destination Hero */}
      <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/imgs/egyothero.png"
            alt="Pyramids of Giza Egypt Hero"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.65))' }}
          ></div>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center mt-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeInUp} className="inline-block font-body text-gold-500 tracking-[0.2em] uppercase text-sm mb-4">
            {t('dest.egypt.subtitle', 'Land of the Pharaohs')}
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-display-xl text-ivory-50 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('dest.egypt.title', 'Egypt')}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 max-w-2xl mx-auto">
            {t('dest.egypt.desc', 'From the timeless Pyramids of Giza to the golden temples of Luxor and the crystal waters of the Red Sea, Egypt offers a journey through history like no other.')}
          </motion.p>
        </motion.div>
      </section>

      {/* Destination Brief & Tours Grid */}
      <section className="container mx-auto px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-body-lg text-obsidian-500 leading-relaxed">
            {t('dest.egypt.brief', 'A civilisation that has captivated the world for millennia. Egypt blends monumental history with warm hospitality and breathtaking landscapes — from the iconic Pyramids and the Nile cruise to the coral reefs of the Red Sea. Every itinerary is crafted to deliver maximum comfort, luxury and authentic cultural immersion.')}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {egyptTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </motion.div>
      </section>

      {/* Egypt Programs Section */}
      <section className="container mx-auto px-6 mt-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="inline-block font-body text-gold-500 tracking-[0.2em] uppercase text-sm mb-4">
            {t('dest.egypt.programsSubtitle', 'Egypt Programs')}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-display-lg text-obsidian-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('dest.egypt.programsTitle', 'Exclusive Egypt Experiences')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-body-lg text-obsidian-500 max-w-2xl mx-auto">
            {t('dest.egypt.programsDesc', 'Discover our curated programs designed to make your Egypt journey truly unforgettable.')}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Classic Program */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-obsidian-200 hover:shadow-[0_12px_32px_rgba(245,166,35,0.25)] hover:border-gold-500 hover:-translate-y-2 transition-all duration-300 group">
            <Link to="/programs/classic/classic-program" className="block">
              <div className="h-48 overflow-hidden">
                <img src="/imgs/italy/Classic Program.jpg" alt="Classic Program" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="text-caption text-gold-600 uppercase tracking-widest font-semibold">{t('nav.classic', 'Classic')}</span>
                <h3 className="text-display-md text-obsidian-900 mt-1 mb-3 group-hover:text-gold-700 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('nav.classicProgram', 'Classic Program')}
                </h3>
                <p className="text-body-sm text-obsidian-500 line-clamp-3">
                  {t('classic.shortDesc', 'Experience the timeless beauty of Egypt with our signature classic itinerary covering all the iconic landmarks.')}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Honeymooners Package */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-obsidian-200 hover:shadow-[0_12px_32px_rgba(245,166,35,0.25)] hover:border-gold-500 hover:-translate-y-2 transition-all duration-300 group">
            <Link to="/programs/honeymooners" className="block">
              <div className="h-48 overflow-hidden">
                <img src="/imgs/gallery/15.jpeg" alt="Honeymooners" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="text-caption text-gold-600 uppercase tracking-widest font-semibold">{t('nav.honeymooners', 'Honeymooners Package')}</span>
                <h3 className="text-display-md text-obsidian-900 mt-1 mb-3 group-hover:text-gold-700 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('nav.honeymooners', 'Honeymooners Package')}
                </h3>
                <p className="text-body-sm text-obsidian-500 line-clamp-3">
                  {t('dest.egypt.honeymoonersDesc', 'Celebrate your love with intimate candlelit dinners, private yacht cruises, and unmatched romantic luxury.')}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Religious Programs */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-obsidian-200 hover:shadow-[0_12px_32px_rgba(245,166,35,0.25)] hover:border-gold-500 hover:-translate-y-2 transition-all duration-300 group">
            <Link to="/programs/religious" className="block">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80" alt="Religious Programs" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="text-caption text-gold-600 uppercase tracking-widest font-semibold">{t('nav.religious', 'Religious Programs')}</span>
                <h3 className="text-display-md text-obsidian-900 mt-1 mb-3 group-hover:text-gold-700 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('nav.religious', 'Religious Programs')}
                </h3>
                <p className="text-body-sm text-obsidian-500 line-clamp-3">
                  {t('dest.egypt.religiousDesc', 'A spiritual journey through Egypt tracing ancient Coptic monasteries and sacred sites.')}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Multi-Country Tours */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-obsidian-200 hover:shadow-[0_12px_32px_rgba(245,166,35,0.25)] hover:border-gold-500 hover:-translate-y-2 transition-all duration-300 group">
            <Link to="/programs/multi-country" className="block">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80" alt="Multi-Country Tours" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="text-caption text-gold-600 uppercase tracking-widest font-semibold">{t('nav.multiCountry', 'Multi-Country Tours')}</span>
                <h3 className="text-display-md text-obsidian-900 mt-1 mb-3 group-hover:text-gold-700 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('nav.multiCountry', 'Multi-Country Tours')}
                </h3>
                <p className="text-body-sm text-obsidian-500 line-clamp-3">
                  {t('dest.egypt.multiCountryDesc', 'Explore combined itineraries spanning Egypt, Jordan, Turkey and beyond for a truly grand adventure.')}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* EXTENSION */}
          <motion.div variants={fadeInUp} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-obsidian-200 hover:shadow-[0_12px_32px_rgba(245,166,35,0.25)] hover:border-gold-500 hover:-translate-y-2 transition-all duration-300 group">
            <Link to="/programs/extension" className="block">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=600&q=80" alt="Extension" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="text-caption text-gold-600 uppercase tracking-widest font-semibold">EXTENSION</span>
                <h3 className="text-display-md text-obsidian-900 mt-1 mb-3 group-hover:text-gold-700 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('dest.egypt.extensionTitle', 'Egypt Extensions')}
                </h3>
                <p className="text-body-sm text-obsidian-500 line-clamp-3">
                  {t('dest.egypt.extensionDesc', 'Extend your Egypt journey with added destinations like Hurghada, Sharm El Sheikh, or Siwa Oasis.')}
                </p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-24 mt-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/imgs/egyothero.png)' }} />
        <div className="absolute inset-0 bg-obsidian-900/75" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold block mb-4">
            {t('dest.egypt.ctaLabel', "DIDN'T FIND WHAT YOU'RE LOOKING FOR?")}
          </span>
          <h2 className="text-display-xl text-ivory-50 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('dest.egypt.ctaTitle', 'Let us design your perfect Egypt tour')}
          </h2>
          <p className="text-body-lg text-ivory-300 mb-10">
            {t('dest.egypt.ctaDesc', 'Tell us your preferences, and our expert travel designers will craft a bespoke itinerary tailored just for you.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tailor-a-tour">
              <Button variant="gold-glow" className="w-full sm:w-auto px-10 py-4">
                {t('home.tailorTour', 'Tailor Your Tour')}
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

export default Egipto;