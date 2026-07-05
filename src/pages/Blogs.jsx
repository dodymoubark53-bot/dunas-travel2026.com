import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, cardHover } from '../animations/variants';
import Button from '../components/ui/Button';
import { blogs } from '../data/blogs';
import { FaChevronRight, FaClock, FaCalendarAlt } from 'react-icons/fa';

const Blogs = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const categoryColors = {
    'History': 'from-amber-600 to-yellow-500',
    'Travel Guide': 'from-emerald-600 to-teal-500',
    "Culture & Shopping": 'from-purple-600 to-pink-500',
    'Adventure': 'from-orange-600 to-red-500',
    'Nature & Camping': 'from-green-600 to-lime-500',
    'Food & Drink': 'from-rose-600 to-red-500',
    'Travel Tips': 'from-blue-600 to-cyan-500',
    'Wellness': 'from-violet-600 to-indigo-500',
  };

  const getCategoryGradient = (cat) => categoryColors[cat] || 'from-gold-500 to-amber-500';

  return (
    <div className="w-full bg-[#F8F9FF] pb-24">
      <Helmet>
        <title>{t('blogs.seoTitle', 'Travel Journal & Blogs | Dunas Travel')}</title>
        <meta name="description" content={t('blogs.seoDesc', 'Read our latest travel tips, stories, and guides for exploring the Middle East in pure luxury.')} />
      </Helmet>

      {/* Hero Section — Tours Style */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-obsidian-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(245,166,35,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 50%)' }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="text-center">
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
              <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
              <FaChevronRight className={`text-[10px] ${isRtl ? 'rotate-180' : ''}`} />
              <span className="text-ivory-300">{t('blogs.title', 'Travel Journal')}</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-display-xl md:text-display-2xl text-ivory-50 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('blogs.title', 'Travel Journal')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-ivory-300 max-w-2xl mx-auto">
              {t('blogs.subtitle', 'Stories, guides, and inspiration from the world of luxury travel')}
            </motion.p>
            <motion.div variants={fadeInUp} className="w-24 h-1 bg-gold-500 mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogs.map(blog => (
            <motion.article key={blog.id} variants={fadeInUp}>
              <motion.div
                className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] group h-full flex flex-col border border-gray-100/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1"
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Link to={`/blogs/${blog.slug}`} className="relative block overflow-hidden" style={{ height: '240px' }}>
                  <div className={`absolute top-4 left-4 z-10 bg-gradient-to-r ${getCategoryGradient(blog.category)} text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg font-semibold`}>
                    {t(`blogs.cat.${blog.category}`, blog.category)}
                  </div>
                  <img
                    src={blog.img}
                    alt={t(`blogs.${blog.title}`, blog.title)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-caption text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt size={10} />
                      {t(`blogs.${blog.date}`, blog.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock size={10} />
                      {blog.readTime || '5 min read'}
                    </span>
                  </div>

                  <Link to={`/blogs/${blog.slug}`}>
                    <h3 className="text-lg md:text-xl font-bold text-obsidian-900 mb-3 line-clamp-2 hover:text-gold-500 transition-colors cursor-pointer leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {t(`blogs.${blog.title}`, blog.title)}
                    </h3>
                  </Link>

                  <p className="text-body-sm text-[#4A4A6E] line-clamp-3 mb-4 leading-relaxed">
                    {t(`blogs.${blog.excerpt}`, blog.excerpt)}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link to={`/blogs/${blog.slug}`} className="inline-flex items-center gap-2 text-body-sm text-gold-500 hover:text-gold-700 font-semibold transition-all group/link">
                      <span>{t('blogs.readMore', 'Read More')}</span>
                      <FaChevronRight size={10} className={`transition-transform duration-300 group-hover/link:translate-x-1 ${isRtl ? 'rotate-180 group-hover/link:-translate-x-1' : ''}`} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-2">
          <Button variant="outline-gold" className={`px-4 opacity-50 cursor-not-allowed ${isRtl ? 'rotate-180' : ''}`}>
            <FaChevronRight size={12} className="rotate-180" />
          </Button>
          <Button variant="gold-glow" className="px-5">1</Button>
          <Button variant="outline-gold" className={`px-4 opacity-50 cursor-not-allowed ${isRtl ? 'rotate-180' : ''}`}>
            <FaChevronRight size={12} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
