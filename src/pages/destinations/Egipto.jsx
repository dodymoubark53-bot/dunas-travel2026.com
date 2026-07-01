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