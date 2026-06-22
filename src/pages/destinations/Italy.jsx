import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import TourCard from '../../components/tour/TourCard';
import { tours } from '../../data/tours';

const Italy = () => {
  const { t } = useTranslation();
  const italyTours = tours.filter(tour => tour.destination === 'italy');

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('dest.italy.seoTitle', 'Tour e Vacanze di Lusso in Italia | Viaggi di Lusso')}</title>
        <meta name="description" content={t('dest.italy.seoDesc', "Scopri l'Italia. Dalla splendida Costiera Amalfitana ai monumenti storici di Roma e Firenze, imbarcati in un viaggio indimenticabile di lusso.")} />
      </Helmet>

      {/* Destination Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80"
            alt="Amalfi Coast Italy Hero"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-obsidian-900/60"></div>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center mt-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeInUp} className="inline-block font-body text-gold-500 tracking-[0.2em] uppercase text-sm mb-4">
            {t('dest.italy.subtitle', 'La Dolce Vita')}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-display-xl text-ivory-50 mb-6">
            {t('dest.italy.title', "Scopri l'Italia")}
          </motion.h1>
        </motion.div>
      </section>

      {/* Tours Grid Section */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-ivory-50 rounded-2xl p-8 md:p-12 shadow-card mb-12 text-center">
          <h2 className="text-display-lg text-obsidian-900 mb-4">{t('dest.italy.gridTitle', 'I Nostri Itinerari in Italia')}</h2>
          <p className="text-body-md text-obsidian-500 max-w-2xl mx-auto">
            {t('dest.italy.gridDesc', "Esplora la nostra selezione esclusiva di itinerari di lusso progettati per offrire un'esperienza coinvolgente e premium delle più grandi meraviglie d'Italia.")}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {italyTours.map((tour) => (
            <motion.div key={tour.id} variants={fadeInUp}>
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Italy;
