import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import Button from '../../components/ui/Button';
import { useTurkeyPrograms } from '../../hooks/useTurkeyPrograms';

const HERO_IMG = 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1920&q=80';

const Turquia = () => {
  const { t } = useTranslation();
  const programs = useTurkeyPrograms();

  return (
    <div className="w-full min-h-screen bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('dest.turkey.seoTitle', 'Luxury Turkey Tours & Vacations | Dunas Travel')}</title>
        <meta name="description" content={t('dest.turkey.seoDesc', 'Explore luxury journeys in Turkey. Custom itineraries coming soon.')} />
      </Helmet>

      {/* Hero */}
      <section className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt={t('dest.turkey.title', 'Turkey')} className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(15,13,11,0.3), rgba(15,13,11,0.65))' }}></div>
        </div>
        <motion.div className="relative z-10 container mx-auto px-6 text-center mt-20" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.span variants={fadeInUp} className="inline-block font-body text-gold-500 tracking-[0.2em] uppercase text-sm mb-4">
            {t('dest.turkey.subtitle', 'Where East meets West')}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-display-xl text-ivory-50 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('dest.turkey.title', 'Turkey')}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 max-w-2xl mx-auto">
            {t('dest.turkey.desc', 'From the majestic Hagia Sophia to the fairy chimneys of Cappadocia and the turquoise waters of the Aegean, Turkey bridges continents and millennia.')}
          </motion.p>
        </motion.div>
      </section>

      {/* Brief & Programs Grid */}
      <section className="container mx-auto px-6 mt-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-body-lg text-obsidian-500 leading-relaxed">
            {t('dest.turkey.brief', 'Turkey is where East meets West, offering a rich tapestry of history, culture, and natural beauty. Our programs span from Istanbul\'s imperial treasures to the surreal landscapes of Cappadocia, the thermal terraces of Pamukkale, and the ancient ruins of Ephesus and Troy.')}
          </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-display-lg text-obsidian-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('dest.turkey.ourPrograms', 'Our Programs')}
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-4"></div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {programs.map((prog) => (
            <motion.div
              key={prog.id}
              variants={fadeInUp}
              className="bg-ivory-50 rounded-xl overflow-hidden flex flex-col h-full group shadow-card border border-gold-500/10 hover:shadow-lg transition-shadow"
            >
              <Link to={`/programs/turkey/${prog.slug}`} className="block relative h-[240px] overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-obsidian-900/80 backdrop-blur-md text-gold-500 text-caption px-4 py-1.5 rounded-full border border-gold-500/30 shadow-glass">
                  {prog.minPax} · {prog.duration.split('/')[0].trim()}
                </div>
                <img
                  src={prog.images[0]}
                  alt={prog.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.06] transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <div className="p-6 flex flex-col flex-grow">
                <span className="text-caption text-gold-600 uppercase tracking-widest mb-1 block">{prog.code}</span>
                <Link to={`/programs/turkey/${prog.slug}`}>
                  <h3 className="text-display-md text-obsidian-900 mb-3 line-clamp-2 group-hover:text-gold-700 transition-colors">
                    {prog.title}
                  </h3>
                </Link>
                <p className="text-body-sm text-obsidian-500 line-clamp-3 mb-4 flex-grow">{prog.overview}</p>

                <div className="border-t border-gold-500/10 pt-4 mb-4">
                  <ul className="grid grid-cols-1 gap-y-1.5">
                    {(Array.isArray(prog.highlights) ? prog.highlights : []).slice(0, 3).map((hl, idx) => (
                      <li key={idx} className="text-[12px] text-obsidian-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></span>
                        <span className="truncate">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gold-500/10 mt-auto">
                  <span className="text-caption text-obsidian-300">{prog.duration}</span>
                  <Link to={`/programs/turkey/${prog.slug}`}>
                    <Button variant="outline-gold" className="px-6 py-2 flex items-center gap-2">
                      {t('tourCard.viewDetails', 'View Details')} <span className="rtl-flip">&rarr;</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative py-24 mt-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-obsidian-900/75" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <span className="text-gold-500 uppercase tracking-widest text-sm font-semibold block mb-4">
            {t('dest.turkey.ctaLabel', 'READY TO TRAVEL TO TURKEY?')}
          </span>
          <h2 className="text-display-xl text-ivory-50 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t('dest.turkey.ctaTitle', 'Your Turkish adventure starts here')}
          </h2>
          <p className="text-body-lg text-ivory-300 mb-10">
            {t('dest.turkey.ctaDesc', 'Explore our curated Turkey programs and book your dream journey today.')}
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

export default Turquia;
