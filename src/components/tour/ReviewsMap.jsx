import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaCheckCircle } from 'react-icons/fa';
import { fadeInUp } from '../../animations/variants';

const seedReviews = [
  { name: 'Carlos García', country: 'Spain', rating: 5, textKey: 'reviews.r1' },
  { name: 'Sofia Conti', country: 'Italy', rating: 5, textKey: 'reviews.r2' },
  { name: 'Martín Fernández', country: 'Argentina', rating: 5, textKey: 'reviews.r3' },
  { name: 'Ana Lucía Hernández', country: 'Mexico', rating: 5, textKey: 'reviews.r4' },
  { name: 'João Silva', country: 'Portugal', rating: 5, textKey: 'reviews.r5' },
  { name: 'Rafael Oliveira', country: 'Brazil', rating: 5, textKey: 'reviews.r6' },
  { name: 'Jennifer Adams', country: 'USA', rating: 5, textKey: 'reviews.r7' },
  { name: 'James Mitchell', country: 'Australia', rating: 5, textKey: 'reviews.r8' },
];

const StarRating = ({ rating, onRate, readonly }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={readonly}
        onClick={() => onRate?.(star)}
        className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
      >
        {star <= rating ? (
          <FaStar className="w-5 h-5 text-gold-500" />
        ) : (
          <FaRegStar className="w-5 h-5 text-gray-300 hover:text-gold-400" />
        )}
      </button>
    ))}
  </div>
);

const ReviewsMap = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState(seedReviews);
  const [newReview, setNewReview] = useState({ name: '', country: '', rating: 5, text: '' });
  const [success, setSuccess] = useState(false);

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    const newReviewData = { name: newReview.name, country: newReview.country, rating: parseInt(newReview.rating), text: newReview.text };
    setReviews(prev => [newReviewData, ...prev]);
    setNewReview({ name: '', country: '', rating: 5, text: '' });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="reviews-section py-16 bg-ivory-50">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Reviews Section */}
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
          <div className="text-center mb-10">
            <h2 className="text-display-lg text-obsidian-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('reviews.title', 'Guest Reviews')}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <StarRating rating={Math.round(parseFloat(avgRating))} readonly />
              <span className="text-display-sm text-gold-500 font-bold">{avgRating}</span>
            </div>
            <p className="text-obsidian-500 text-body-md">
              {t('reviews.count', 'Based on {{count}} reviews', { count: reviews.length })}
            </p>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-4"></div>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-card border border-obsidian-900/5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-obsidian-900">{rev.name}</p>
                    {rev.country && (
                      <p className="text-body-sm text-obsidian-400">{rev.country}</p>
                    )}
                  </div>
                  <StarRating rating={rev.rating} readonly />
                </div>
                <p className="text-obsidian-700 text-body-md leading-relaxed italic font-light">"{rev.textKey ? t(rev.textKey) : rev.text}"</p>
              </motion.div>
            ))}
          </div>

          {/* Write Review Form */}
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-card border border-obsidian-900/5">
            <h3 className="text-display-sm text-obsidian-900 mb-6 text-center">
              {t('tour.leaveReview', 'Write a Review')}
            </h3>
            {success && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-3 mb-6 text-body-md">
                <FaCheckCircle />
                {t('reviews.reviewSuccess', 'Review submitted successfully!')}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-body-sm font-semibold text-obsidian-700 mb-1.5">{t('reviews.yourName', 'Your Name')} *</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview(p => ({ ...p, name: e.target.value }))}
                    className="w-full p-3 bg-ivory-50 border border-obsidian-900/10 rounded-xl focus:border-gold-500 outline-none text-obsidian-900"
                  />
                </div>
                <div>
                  <label className="block text-body-sm font-semibold text-obsidian-700 mb-1.5">{t('reviews.country', 'Country')}</label>
                  <input
                    type="text"
                    value={newReview.country}
                    onChange={(e) => setNewReview(p => ({ ...p, country: e.target.value }))}
                    className="w-full p-3 bg-ivory-50 border border-obsidian-900/10 rounded-xl focus:border-gold-500 outline-none text-obsidian-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-body-sm font-semibold text-obsidian-700 mb-1.5">{t('reviews.rating', 'Rating')}</label>
                <StarRating rating={newReview.rating} onRate={(val) => setNewReview(p => ({ ...p, rating: val }))} />
              </div>
              <div>
                <label className="block text-body-sm font-semibold text-obsidian-700 mb-1.5">{t('reviews.reviewText', 'Your Review')} *</label>
                <textarea
                  required
                  rows="3"
                  value={newReview.text}
                  onChange={(e) => setNewReview(p => ({ ...p, text: e.target.value }))}
                  className="w-full p-3 bg-ivory-50 border border-obsidian-900/10 rounded-xl focus:border-gold-500 outline-none text-obsidian-900 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#C9A227] to-[#E8C97A] text-obsidian-900 font-semibold tracking-widest uppercase text-xs rounded-full shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:shadow-[0_0_36px_rgba(201,162,39,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                {t('tour.submitReview', 'Submit Review')}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsMap;
