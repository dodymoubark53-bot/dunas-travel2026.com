import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../animations/variants';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-[#F8F9FF] pb-24">
      <Helmet>
        <title>{t('about.seoTitle', 'About Us | Dunas Travel')}</title>
        <meta name="description" content={t('about.seoDesc', 'Discover our story. Redefining luxury travel since 2010 through bespoke journeys in Egypt, Jordan, and Turkey.')} />
      </Helmet>
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1600&q=80" alt="About Us Hero" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-primary-900/70"></div>
        </div>
        <motion.div className="relative z-10 text-center" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.span variants={fadeInUp} className="text-gold-500 uppercase tracking-widest text-caption block mb-4">{t('about.legacy', 'Our Legacy')}</motion.span>
          <motion.h1 variants={fadeInUp} className="text-display-xl text-white">{t('about.title', 'About Us')}</motion.h1>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-24">
        <motion.div className="max-w-4xl mx-auto text-center" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 variants={fadeInUp} className="text-display-lg text-[#1A1A2E] mb-8">{t('about.subtitle', 'Redefining Dunas Travel Since 2010')}</motion.h2>
          <motion.p variants={fadeInUp} className="text-body-lg text-[#2A2A4E] leading-relaxed mb-12">
            {t('about.desc', 'We believe that travel is an art form. For over a decade, we have dedicated ourselves to curating the most extraordinary, bespoke journeys through the ancient landscapes of Egypt, Jordan, and Turkey. Our mission is to seamlessly blend world-class luxury with authentic cultural immersion.')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {[
            { title: t('about.storyTitle', 'Our Story'), desc: t('about.storyDesc', 'Born from a passion for ancient history and refined hospitality.') },
            { title: t('about.teamTitle', 'Our Team'), desc: t('about.teamDesc', 'A dedicated family of elite concierges, expert Egyptologists, and guides.') },
            { title: t('about.valuesTitle', 'Our Values'), desc: t('about.valuesDesc', 'Excellence, authenticity, and uncompromising comfort in every detail.') }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-2xl shadow-card text-center">
              <div className="w-16 h-16 bg-gold-50 mx-auto rounded-full flex items-center justify-center text-gold-500 mb-6 text-2xl font-display">{idx + 1}</div>
              <h3 className="text-display-md text-[#1A1A2E] mb-4">{item.title}</h3>
              <p className="text-body-md text-[#4A4A6E]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
