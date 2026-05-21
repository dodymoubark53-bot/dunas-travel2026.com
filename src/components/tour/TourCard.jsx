import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { variants } from '../../animations/variants';
import Button from '../ui/Button';

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-gold-500" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-gold-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-obsidian-300" />);
    }
  }
  return <div className="flex items-center gap-1 text-sm">{stars}</div>;
};

const TourCard = ({ tour }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="bg-ivory-50 rounded-xl overflow-hidden flex flex-col h-full group shadow-card border border-gold-500/10"
      variants={variants.cardLift}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Image Container */}
      <div className="relative h-[280px] overflow-hidden">
        <div className="absolute top-4 left-4 z-10 bg-obsidian-900/80 backdrop-blur-md text-gold-500 text-caption px-4 py-1.5 rounded-full border border-gold-500/30 shadow-glass">
          {t(`data.${tour.type}`, tour.type)} · {t(`data.${tour.duration.split('/')[0].trim()}`, tour.duration.split('/')[0].trim())}
        </div>
        <img
          src={tour.images[0]}
          alt={`${tour.title} in ${tour.destination}`}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.06] cinematic-transition"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        
        <Link to={`/tours/${tour.slug}`}>
          <h3 className="text-display-md text-obsidian-900 mb-3 line-clamp-2 group-hover:text-gold-700 transition-colors">
            {t(`data.${tour.title}`, tour.title)}
          </h3>
        </Link>

        <p className="text-body-sm text-obsidian-500 line-clamp-2 mb-4 flex-grow">
          {t(`data.${tour.description}`, tour.description)}
        </p>

        <div className="flex items-center gap-2 mb-6">
          {renderStars(tour.rating)}
          <span className="text-caption text-obsidian-900 font-semibold ml-1">{tour.rating}</span>
          <span className="text-caption text-obsidian-300">({tour.reviewCount} {t('tourCard.reviews')})</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gold-500/10 mt-auto">
          <div>
            <span className="block text-caption text-obsidian-300 mb-1">{t('tourCard.from')}</span>
            <span className="text-display-md text-gold-700">${tour.price}</span>
          </div>
          <Link to={`/tours/${tour.slug}`}>
            <Button variant="outline-gold" className="px-6 py-2 flex items-center gap-2">
              {t('tourCard.book')} <span className="rtl-flip">&rarr;</span>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
