import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import { staggerContainer, fadeInUp, accordionContent } from '../animations/variants';

const FAQ = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(null);

  const categories = [
    { id: 'all', label: t('faq.catAll', 'All Questions') },
    { id: 'booking', label: t('faq.catBooking', 'Booking') },
    { id: 'payments', label: t('faq.catPayments', 'Payments & Pricing') },
    { id: 'cancellations', label: t('faq.catCancellations', 'Cancellations') },
    { id: 'travel', label: t('faq.catTravel', 'Travel & Transport') },
  ];

  const faqItems = [
    {
      id: 'booking-tailor',
      category: 'booking',
      question: t('faq.qBookingTailor', 'How do I book a tailor-made luxury tour with Dunas Travel?'),
      answer: t('faq.aBookingTailor', 'You can start by visiting our "Tailor a Tour" page where you can choose your desired destinations and specify your travel details. Alternatively, you can contact our luxury travel planners directly through our Contact Us page or via WhatsApp. Once we receive your request, a dedicated concierge will work with you to draft a bespoke itinerary tailored to your preferences.')
    },
    {
      id: 'booking-visa',
      category: 'booking',
      question: t('faq.qBookingVisa', 'Can Dunas Travel assist with visa applications?'),
      answer: t('faq.aBookingVisa', 'While guests are ultimately responsible for securing their own visas, we provide official booking confirmations and supporting documents required for your visa application. Our concierge team can also offer expert guidance on the visa requirements for Egypt, Jordan, Turkey, and other destinations.')
    },
    {
      id: 'payments-methods',
      category: 'payments',
      question: t('faq.qPaymentsMethods', 'What payment methods do you accept, and what are the payment terms?'),
      answer: t('faq.aPaymentsMethods', 'We accept secure online credit card payments (Visa, MasterCard, American Express), bank transfers, and PayPal. For most bespoke bookings, a deposit of 30% is required to secure reservations, with the remaining balance due 30 days prior to your departure date.')
    },
    {
      id: 'cancellations-policy',
      category: 'cancellations',
      question: t('faq.qCancellationsPolicy', 'What is your cancellation and refund policy?'),
      answer: t('faq.aCancellationsPolicy', 'We understand that plans can change. Cancellations made more than 60 days before the departure date will receive a full refund minus a non-refundable booking fee. Cancellations made between 30 and 60 days before departure are subject to a 50% cancellation fee, while cancellations within 30 days of departure are non-refundable. We highly recommend purchasing comprehensive travel insurance to protect your investment.')
    },
    {
      id: 'cancellations-insurance',
      category: 'cancellations',
      question: t('faq.qCancellationsInsurance', 'Is travel insurance included in my package, or do I need to purchase it separately?'),
      answer: t('faq.aCancellationsInsurance', 'Travel insurance is not automatically included in our custom itineraries. We strongly advise all guests to obtain comprehensive travel insurance covering trip cancellation, medical emergencies, evacuation, and baggage loss prior to travel.')
    },
    {
      id: 'travel-transport',
      category: 'travel',
      question: t('faq.qTravelTransport', 'How does the airport transfer and local transportation work?'),
      answer: t('faq.aTravelTransport', 'All our tour packages feature premium private airport transfers. We operate a fleet of luxury sedans, SUVs, and executive coaches. Your professional driver will meet you at the airport arrivals gate with a personalized name board and assist with your luggage, ensuring a seamless and comfortable transition to your hotel.')
    }
  ];

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-ivory-50 pb-24 font-body">
      <Helmet>
        <title>{t('faq.seoTitle', 'Frequently Asked Questions | Dunas Travel')}</title>
        <meta
          name="description"
          content={t('faq.seoDesc', 'Have questions about booking, payments, cancellations, or travel requirements? Find comprehensive answers in our FAQ center.')}
        />
      </Helmet>

      {/* Header Banner */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80" 
            alt="FAQ Support" 
            className="w-full h-full object-cover" 
            loading="lazy" 
          />
          <div className="absolute inset-0 bg-[#1A1A2E]/80 backdrop-blur-[2px]"></div>
        </div>
        <motion.div className="relative z-10 text-center px-4" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.span variants={fadeInUp} className="text-gold-500 uppercase tracking-widest text-caption block mb-4">
            {t('faq.helpCenter', 'HELP CENTER')}
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-display-xl text-white font-display">
            {t('faq.heading', 'Frequently Asked Questions')}
          </motion.h1>
          <motion.div variants={fadeInUp} className="w-24 h-1 bg-gold-500 mx-auto mt-6"></motion.div>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-lg mx-auto -mt-20 z-30 mb-12"
        >
          <div className="relative flex items-center bg-white shadow-xl rounded-full border border-obsidian-900/5 overflow-hidden">
            <FaSearch className="text-gray-400 ml-6 mr-3 w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder', 'Search for questions...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pr-6 bg-transparent outline-none text-obsidian-900 text-body-md"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenId(null);
              }}
              className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-medium tracking-wide text-sm ${
                activeCategory === cat.id
                  ? 'bg-gold-500 text-[#1A1A2E] border-gold-500 shadow-md'
                  : 'bg-white text-obsidian-700 border-obsidian-900/10 hover:border-gold-500 hover:text-gold-500 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Accordion List */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-card overflow-hidden border border-obsidian-900/5 transition-all duration-300 hover:shadow-md"
                >
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-display text-lg font-semibold text-[#1A1A2E] pr-6 hover:text-gold-600 transition-colors duration-200">
                      {item.question}
                    </span>
                    <span className={`w-8 h-8 rounded-full bg-gold-50 flex items-center justify-center flex-shrink-0 text-gold-600 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-gold-500 text-white' : ''}`}>
                      <FaChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        variants={accordionContent}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-50 text-obsidian-700 text-body-md leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              variants={fadeInUp}
              className="text-center py-16 bg-white rounded-2xl border border-obsidian-900/5 shadow-card"
            >
              <p className="text-obsidian-500 text-body-lg">
                {t('faq.noResults', 'No questions found matching your search.')}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default FAQ;
