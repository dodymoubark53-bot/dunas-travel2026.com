import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../ui/Button';
import { fadeInUp } from '../../animations/variants';
import { useCurrency } from '../../context/CurrencyContext';

const AdvancedBooking = ({ onClose, tourTitle, basePricePerPerson }) => {
  const { t } = useTranslation();
  const { formatPrice } = useCurrency();
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  // Form State
  const [formData, setFormData] = useState({
    arrivalDate: '',
    departureDate: '',
    adults: 2,
    children: 0,
    infants: 0,
    email: ''
  });

  // Dynamic guest names
  const [guestNames, setGuestNames] = useState({});

  // Calculate live price
  const totalPrice = basePricePerPerson * (formData.adults + formData.children * 0.75);

  const handleGuestNameChange = (key, value) => {
    setGuestNames(prev => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['adults', 'children', 'infants'].includes(name) ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose && onClose();
      }, 3000);
    }, 1500);
  };

  // Generate Guest Fields Array with localized labels
  const guestFields = [
    ...Array.from({ length: Math.max(0, formData.adults) }, (_, i) => ({
      key: `Adult ${i + 1}`,
      label: t('booking.adultNumFullName', 'Adult {{num}} Full Name', { num: i + 1 }),
      placeholder: t('booking.adultNumFullName', 'Adult {{num}} Full Name', { num: i + 1 })
    })),
    ...Array.from({ length: Math.max(0, formData.children) }, (_, i) => ({
      key: `Child ${i + 1}`,
      label: t('booking.childNumFullName', 'Child {{num}} Full Name', { num: i + 1 }),
      placeholder: t('booking.childNumFullName', 'Child {{num}} Full Name', { num: i + 1 })
    })),
  ];

  return (
    <div className="relative mx-auto w-full box-border rounded-[20px] bg-[rgba(15,13,11,0.85)] backdrop-blur-[24px] border border-[rgba(201,162,39,0.2)] shadow-[0_0_40px_rgba(201,162,39,0.1)] px-4 py-8 md:p-8 lg:p-10 max-w-full md:max-w-[480px] lg:max-w-[560px] max-h-[90vh] overflow-y-auto no-scrollbar text-left" onClick={(e) => e.stopPropagation()}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <FaCheckCircle className="text-gold-500 text-6xl mb-4" />
            </motion.div>
            <h3 className="text-display-md text-ivory-50 mb-2 font-display">{t('booking.reservationConfirmed', 'Booking Confirmed')}</h3>
            <p className="text-body-md text-ivory-300">
              {t('booking.reservationSuccessDesc', 'Your reservation request for {{tourTitle}} has been received. Our team will contact you to finalize the payment and details.', { tourTitle: t(`data.${tourTitle}`, tourTitle) })}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full"
          >
            <div className="flex flex-col text-center border-b border-ivory-50/10 pb-6">
              <h3 className="text-display-md text-ivory-50 mb-1 font-display">{t('booking.advancedBookingTitle', 'Advanced Booking')}</h3>
              <p className="text-caption text-gold-500 mb-4">{t(`data.${tourTitle}`, tourTitle)}</p>
              <div>
                <span className="block text-caption text-ivory-300">{t('booking.totalPrice', 'Total Price')}</span>
                <span className="text-display-md text-gold-500 text-2xl">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 text-left w-full">
                <label className="text-caption text-gold-500 font-medium">{t('booking.arrivalDate', 'Arrival Date')}</label>
                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 rounded-lg outline-none transition-all text-[16px] bg-[rgba(255,252,247,0.05)] text-[#F5EDD6] placeholder:text-[rgba(245,237,214,0.4)] border border-[rgba(255,252,247,0.1)] focus:border-[rgba(201,162,39,0.4)] focus:shadow-[0_0_12px_rgba(201,162,39,0.15)] [color-scheme:dark]"
                />
              </div>
              <div className="flex flex-col gap-1 text-left w-full">
                <label className="text-caption text-gold-500 font-medium">{t('booking.departureDate', 'Departure Date')}</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 rounded-lg outline-none transition-all text-[16px] bg-[rgba(255,252,247,0.05)] text-[#F5EDD6] placeholder:text-[rgba(245,237,214,0.4)] border border-[rgba(255,252,247,0.1)] focus:border-[rgba(201,162,39,0.4)] focus:shadow-[0_0_12px_rgba(201,162,39,0.15)] [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1 text-left w-full">
                <label className="text-caption text-gold-500 font-medium">{t('booking.adults', 'Adults')}</label>
                <input
                  type="number"
                  name="adults"
                  min="1"
                  value={formData.adults}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg outline-none transition-all text-[16px] bg-[rgba(255,252,247,0.05)] text-[#F5EDD6] placeholder:text-[rgba(245,237,214,0.4)] border border-[rgba(255,252,247,0.1)] focus:border-[rgba(201,162,39,0.4)] focus:shadow-[0_0_12px_rgba(201,162,39,0.15)]"
                />
              </div>
              <div className="flex flex-col gap-1 text-left w-full">
                <label className="text-caption text-gold-500 font-medium">{t('booking.childrenAge', 'Children (2-12)')}</label>
                <input
                  type="number"
                  name="children"
                  min="0"
                  value={formData.children}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg outline-none transition-all text-[16px] bg-[rgba(255,252,247,0.05)] text-[#F5EDD6] placeholder:text-[rgba(245,237,214,0.4)] border border-[rgba(255,252,247,0.1)] focus:border-[rgba(201,162,39,0.4)] focus:shadow-[0_0_12px_rgba(201,162,39,0.15)]"
                />
              </div>
              <div className="flex flex-col gap-1 text-left w-full">
                <label className="text-caption text-gold-500 font-medium">{t('booking.infantsAge', 'Infants (<2)')}</label>
                <input
                  type="number"
                  name="infants"
                  min="0"
                  value={formData.infants}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-lg outline-none transition-all text-[16px] bg-[rgba(255,252,247,0.05)] text-[#F5EDD6] placeholder:text-[rgba(245,237,214,0.4)] border border-[rgba(255,252,247,0.1)] focus:border-[rgba(201,162,39,0.4)] focus:shadow-[0_0_12px_rgba(201,162,39,0.15)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 text-left w-full">
              <label className="text-caption text-gold-500 font-medium">{t('booking.emailAddress', 'Email Address')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder={t('booking.emailPlaceholder', 'Where should we send the confirmation?')}
                className="w-full p-4 rounded-lg outline-none transition-all text-[16px] bg-[rgba(255,252,247,0.05)] text-[#F5EDD6] placeholder:text-[rgba(245,237,214,0.4)] border border-[rgba(255,252,247,0.1)] focus:border-[rgba(201,162,39,0.4)] focus:shadow-[0_0_12px_rgba(201,162,39,0.15)]"
              />
            </div>

            {guestFields.length > 0 && (
              <div className="pt-6 border-t border-ivory-50/10 text-left w-full">
                <h4 className="text-caption font-semibold text-gold-500 mb-4 uppercase tracking-wide">{t('booking.guestDetails', 'Guest Details')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guestFields.map((field, idx) => (
                    <div key={idx} className="flex flex-col gap-1 w-full">
                      <label className="text-caption text-ivory-300 font-medium">{field.label}</label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        required
                        onChange={(e) => handleGuestNameChange(field.key, e.target.value)}
                        className="w-full p-4 rounded-lg outline-none transition-all text-[16px] bg-[rgba(255,252,247,0.05)] text-[#F5EDD6] placeholder:text-[rgba(245,237,214,0.4)] border border-[rgba(255,252,247,0.1)] focus:border-[rgba(201,162,39,0.4)] focus:shadow-[0_0_12px_rgba(201,162,39,0.15)]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 pt-6 border-t border-ivory-50/10 w-full">
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-auto px-6 py-3 rounded-full border border-ivory-300/30 text-ivory-300 hover:text-ivory-50 transition-colors text-[16px]"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full md:w-auto px-8 py-3 bg-gold-500 text-obsidian-900 font-semibold rounded-full shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:scale-105 transition-transform text-[16px]"
              >
                {status === 'submitting' ? t('common.processing', 'Processing...') : t('nav.bookNow', 'Book Now')}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedBooking;
