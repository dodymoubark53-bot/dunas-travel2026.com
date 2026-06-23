import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../animations/variants';
import { blogs } from '../../data/blogs';

const BlogDetails = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

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

  // Get 3 related articles (just picking the next 3 or wrapping around)
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

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end justify-center overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={blog.img.split('?')[0]}
            alt={t(`blogs.${blog.title}`, blog.title)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-obsidian-900/60 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent"></div>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center max-w-4xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-6 text-caption text-gold-500 uppercase tracking-widest font-medium">
            <span>{t(`blogs.cat.${blog.category}`, blog.category)}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
            <span>{t(`blogs.${blog.date}`, blog.date)}</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-display-lg md:text-display-xl text-ivory-50 mb-6 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t(`blogs.${blog.title}`, blog.title)}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-body-md text-ivory-300">
          </motion.p>
        </motion.div>
      </section>

      {/* Article Body */}
      <section className="container mx-auto px-6 mt-16 mb-24 max-w-3xl">
        <motion.div
          className="prose prose-lg prose-headings:font-display prose-headings:text-obsidian-900 prose-p:text-obsidian-500 prose-p:font-body prose-a:text-gold-500 hover:prose-a:text-gold-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {blog.content.map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed text-body-lg text-obsidian-700">
              {t(`blogs.${paragraph}`, paragraph)}
            </p>
          ))}
        </motion.div>

        {/* Share / Tags section (Optional placeholder) */}
        <div className="mt-12 pt-8 border-t border-obsidian-900/10 flex justify-between items-center">
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-ivory-50 rounded-full text-caption text-obsidian-500 shadow-sm border border-obsidian-900/5 hover:border-gold-300 transition-colors cursor-pointer">#{t(`blogs.cat.${blog.category}`, blog.category).replace(/\s+/g, '')}</span>
            <span className="px-4 py-2 bg-ivory-50 rounded-full text-caption text-obsidian-500 shadow-sm border border-obsidian-900/5 hover:border-gold-300 transition-colors cursor-pointer">#LuxuryTravel</span>
          </div>
          <button className="text-gold-500 hover:text-gold-700 font-medium text-body-sm transition-colors">{t('blogs.share', 'Share Article')}</button>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-ivory-50 py-24 border-t border-obsidian-900/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-display-lg text-obsidian-900" style={{ fontFamily: "'Playfair Display', serif" }}>{t('blogs.related', 'Related Articles')}</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {relatedArticles.map((relBlog) => (
              <motion.article key={relBlog.id} variants={fadeInUp}>
                <div className="bg-obsidian-50 rounded-2xl overflow-hidden group h-full flex flex-col border border-obsidian-900/5 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(10,8,4,0.08)]">
                  <Link to={`/blogs/${relBlog.slug}`} className="relative h-56 overflow-hidden block">
                    <div className="absolute top-4 left-4 z-10 bg-gold-500 text-obsidian-900 text-caption uppercase px-3 py-1 rounded-full shadow-md">{t(`blogs.cat.${relBlog.category}`, relBlog.category)}</div>
                    <img src={relBlog.img} alt={t(`blogs.${relBlog.title}`, relBlog.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </Link>
                  <div className="p-8 flex flex-col flex-grow">

                    <Link to={`/blogs/${relBlog.slug}`}>
                      <h3 className="text-display-md text-obsidian-900 mb-3 text-lg line-clamp-2 hover:text-gold-500 transition-colors cursor-pointer">{t(`blogs.${relBlog.title}`, relBlog.title)}</h3>
                    </Link>
                    <div className="mt-auto pt-4 border-t border-obsidian-900/10">
                      <Link to={`/blogs/${relBlog.slug}`} className="inline-block text-body-sm text-gold-500 hover:text-gold-700 font-semibold uppercase tracking-wider transition-colors">
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
