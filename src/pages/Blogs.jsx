import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, cardHover } from '../animations/variants';
import Button from '../components/ui/Button';
import { blogs } from '../data/blogs';

const Blogs = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-obsidian-50 pb-24">
      <Helmet>
        <title>{t('blogs.seoTitle', 'Travel Journal & Blogs | Luxury Travel')}</title>
        <meta name="description" content={t('blogs.seoDesc', 'Read our latest travel tips, stories, and guides for exploring the Middle East in pure luxury.')} />
      </Helmet>
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-obsidian-900"></div>
        <motion.div className="relative z-10 text-center" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.h1 variants={fadeInUp} className="text-display-xl text-ivory-50">{t('blogs.title', 'Travel Journal')}</motion.h1>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-24">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogs.map(blog => (
            <motion.article key={blog.id} variants={fadeInUp}>
              <motion.div className="bg-ivory-50 rounded-2xl overflow-hidden shadow-card group h-full flex flex-col" variants={cardHover} initial="rest" whileHover="hover" animate="rest">
                <Link to={`/blogs/${blog.slug}`} className="relative block" style={{ height: '220px', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
                  <div className="absolute top-4 left-4 z-10 bg-gold-500 text-obsidian-900 text-caption uppercase px-3 py-1 rounded-full shadow-md">{t(`blogs.cat.${blog.category}`, blog.category)}</div>
                  <img src={blog.img.includes('?') ? blog.img : blog.img} alt={t(`blogs.${blog.title}`, blog.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" style={{ borderRadius: '12px 12px 0 0' }} />
                </Link>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-center text-caption text-obsidian-300 mb-3">
                    <span>{t(`blogs.${blog.date}`, blog.date)}</span>
                    <span>{t(`blogs.${blog.readTime}`, blog.readTime)}</span>
                  </div>
                  <Link to={`/blogs/${blog.slug}`}>
                    <h3 className="text-display-md text-obsidian-900 mb-3 text-xl line-clamp-2 hover:text-gold-500 transition-colors cursor-pointer">{t(`blogs.${blog.title}`, blog.title)}</h3>
                  </Link>
                  <p className="text-body-sm text-obsidian-500 line-clamp-3 mb-6">{t(`blogs.${blog.excerpt}`, blog.excerpt)}</p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link to={`/blogs/${blog.slug}`} className="inline-block text-body-md text-gold-500 hover:text-gold-700 hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.5)] font-semibold transition-all">
                      {t('blogs.readMore', 'Read More →')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-2">
          <Button variant="outline-gold" className="px-4 opacity-50 cursor-not-allowed">&larr;</Button>
          <Button variant="gold-glow" className="px-5">1</Button>
          <Button variant="outline-gold" className="px-4 opacity-50 cursor-not-allowed">&rarr;</Button>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
