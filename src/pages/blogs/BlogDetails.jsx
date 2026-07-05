import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import { blogs } from '../../data/blogs';
import { FaChevronRight, FaCalendarAlt, FaClock, FaTag, FaShareAlt } from 'react-icons/fa';

const BlogDetails = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

  const tourLinks = [
    { names: ['Cairo Express', 'Cairo Express com Alexandria'], path: '/programs/egypt' },
    { names: ['Egito Clássico', 'Egito Clássico II'], path: '/programs/egypt' },
    { names: ['Egito Histórico'], path: '/programs/egypt' },
    { names: ['O GRANDE RAMSES', 'Grande Ramses'], path: '/programs/egypt' },
    { names: ['Tesouros do Egito com Alexandria'], path: '/programs/egypt' },
    { names: ['Lo Mejor de Grecia'], path: '/programs/greece' },
    { names: ['Turquía Legendaria', 'Legendary Turkey'], path: '/programs/turkey' },
    { names: ['Tunisia 8 Days Desert & Sea'], path: '/programs/tunisia' },
    { names: ['Estrellas del Medio Oriente'], path: '/programs/multi-country' },
    { names: ['Cairo and Athens 11 Days'], path: '/programs/multi-country' },
    { names: ['Essences of Egypt and Turkey'], path: '/programs/multi-country' },
    { names: ['Marvels of Dubai and Turkey'], path: '/programs/multi-country' },
    { names: ['Petra by Night', 'Petra'], path: '/programs/jordan' },
    { names: ['Wadi Rum Desert'], path: '/programs/jordan' },
    { names: ['Dead Sea Experience'], path: '/programs/jordan' },
    { names: ['Hot Air Balloon', 'hot air balloon'], path: '/programs/turkey' },
    { names: ['Nile Cruise', 'Nile River', 'Cruzeiro no Nilo', 'felucca'], path: '/tours/egypt' },
    { names: ['DUNAS TRAVEL', 'DUNAS TRAVELer', 'DUNAS TRAVELers'], path: '/' },
  ];

  const renderContent = (text) => {
    let result = text;
    tourLinks.forEach(({ names, path }) => {
      names.forEach(name => {
        const regex = new RegExp(`(\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`, 'gi');
        result = result.replace(regex, `<a href="${path}" class="text-gold-500 hover:text-gold-700 font-semibold underline decoration-gold-500/30 hover:decoration-gold-500 transition-all">$1</a>`);
      });
    });
    return result;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian-50">
        <h1 className="text-display-lg text-obsidian-900">{t('blogs.notFound', 'Article not found')}</h1>
      </div>
    );
  }

  const currentIndex = blogs.findIndex(b => b.slug === slug);
  const relatedArticles = [];
  for (let i = 1; i <= 3; i++) {
    relatedArticles.push(blogs[(currentIndex + i) % blogs.length]);
  }

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t(`blogs.${blog.title}`, blog.title)} | {t('blogs.seoJournal', 'Luxury Travel Journal')}</title>
        <meta name="description" content={t(`blogs.${blog.excerpt}`, blog.excerpt)} />
      </Helmet>

      {/* Hero Section — Tours Style */}
      <section className="relative min-h-[50vh] md:min-h-[65vh] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={blog.img}
            alt={t(`blogs.${blog.title}`, blog.title)}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/50 to-obsidian-900/20" />
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-6 pb-12 md:pb-20">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 text-caption text-gold-500 mb-4 uppercase tracking-wider">
                <Link to="/" className="hover:text-ivory-50 transition-colors">{t('nav.home', 'Home')}</Link>
                <FaChevronRight className={`text-[10px] ${isRtl ? 'rotate-180' : ''}`} />
                <Link to="/blogs" className="hover:text-ivory-50 transition-colors">{t('blogs.title', 'Journal')}</Link>
                <FaChevronRight className={`text-[10px] ${isRtl ? 'rotate-180' : ''}`} />
                <span className="text-ivory-300 truncate max-w-[200px]">{t(`blogs.${blog.title}`, blog.title)}</span>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 md:gap-5 mb-4 text-caption text-ivory-400">
                <span className="flex items-center gap-1.5 bg-obsidian-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                  <FaCalendarAlt size={10} className="text-gold-500" />
                  {t(`blogs.${blog.date}`, blog.date)}
                </span>
                <span className="flex items-center gap-1.5 bg-obsidian-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                  <FaClock size={10} className="text-gold-500" />
                  {blog.readTime || '5 min read'}
                </span>
                <span className="flex items-center gap-1.5 bg-obsidian-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                  <FaTag size={10} className="text-gold-500" />
                  {t(`blogs.cat.${blog.category}`, blog.category)}
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-display-lg md:text-display-xl text-ivory-50 mb-4 max-w-4xl leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t(`blogs.${blog.title}`, blog.title)}
              </motion.h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="container mx-auto px-6 mt-12 md:mt-16 mb-24 max-w-3xl">
        <motion.div
          className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-obsidian-900 prose-p:text-obsidian-600 prose-p:font-body prose-a:text-gold-500 hover:prose-a:text-gold-700 prose-strong:text-obsidian-900 prose-strong:font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {blog.content.map((paragraph, idx) => {
            const translated = t(`blogs.${paragraph}`, paragraph);
            if (translated.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-bold font-display text-obsidian-900 mt-10 mb-4">
                  {translated.replace('### ', '')}
                </h3>
              );
            }
            if (translated.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl md:text-3xl font-bold font-display text-obsidian-900 mt-12 mb-6 border-b border-gold-500/20 pb-3">
                  {translated.replace('## ', '')}
                </h2>
              );
            }
            return (
              <p key={idx} className="mb-6 leading-relaxed text-body-lg text-obsidian-700" dangerouslySetInnerHTML={{ __html: renderContent(translated) }} />
            );
          })}
        </motion.div>

        {/* Share / Tags */}
        <div className="mt-12 pt-8 border-t border-obsidian-900/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-ivory-50 rounded-full text-caption text-obsidian-500 shadow-sm border border-obsidian-900/5 hover:border-gold-300 transition-colors cursor-pointer flex items-center gap-1.5">
              <FaTag size={10} className="text-gold-500" />
              #{t(`blogs.cat.${blog.category}`, blog.category).replace(/\s+/g, '')}
            </span>
            <span className="px-4 py-2 bg-ivory-50 rounded-full text-caption text-obsidian-500 shadow-sm border border-obsidian-900/5 hover:border-gold-300 transition-colors cursor-pointer flex items-center gap-1.5">
              <FaTag size={10} className="text-gold-500" />
              #LuxuryTravel
            </span>
          </div>
          <button className="flex items-center gap-2 text-gold-500 hover:text-gold-700 font-medium text-body-sm transition-colors px-4 py-2 bg-ivory-50 rounded-full border border-obsidian-900/5 shadow-sm hover:border-gold-300">
            <FaShareAlt size={12} />
            {t('blogs.share', 'Share Article')}
          </button>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-ivory-50 py-16 md:py-24 border-t border-obsidian-900/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-display-lg text-obsidian-900" style={{ fontFamily: "'Playfair Display', serif" }}>{t('blogs.related', 'Related Articles')}</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {relatedArticles.map((relBlog) => (
              <motion.article key={relBlog.id} variants={fadeInUp}>
                <div className="bg-white rounded-2xl overflow-hidden group h-full flex flex-col border border-gray-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                  <Link to={`/blogs/${relBlog.slug}`} className="relative h-52 md:h-56 overflow-hidden block">
                    <div className="absolute top-4 left-4 z-10 bg-gold-500 text-obsidian-900 text-caption uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md font-semibold text-[10px]">
                      {t(`blogs.cat.${relBlog.category}`, relBlog.category)}
                    </div>
                    <img
                      src={relBlog.img}
                      alt={t(`blogs.${relBlog.title}`, relBlog.title)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <Link to={`/blogs/${relBlog.slug}`}>
                      <h3 className="text-lg font-bold text-obsidian-900 mb-3 line-clamp-2 hover:text-gold-500 transition-colors cursor-pointer leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {t(`blogs.${relBlog.title}`, relBlog.title)}
                      </h3>
                    </Link>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link to={`/blogs/${relBlog.slug}`} className="inline-flex items-center gap-2 text-body-sm text-gold-500 hover:text-gold-700 font-semibold uppercase tracking-wider transition-all">
                        <span className={isRtl ? 'rtl-flip' : ''}>{t('blogs.readMore', 'Read More →')}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;
