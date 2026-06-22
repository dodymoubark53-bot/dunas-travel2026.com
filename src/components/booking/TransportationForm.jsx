import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { fadeInUp } from '../../animations/variants';
import { transportation } from '../../data/transportation';

const TransportationForm = ({ preSelectedVehicleId = '' }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const todayStr = getTodayString();

  const [formData, setFormData] = useState({
    vehicleId: preSelectedVehicleId,
    tripDate: '',
    pickupTime: '',
    adults: 1,
    children: 0,
    pickupLocation: '',
    dropoffLocation: '',
    fullName: '',
    phone: '',
    email: '',
    specialRequest: ''
  });

  useEffect(() => {
    if (preSelectedVehicleId) {
      setFormData(prev => ({ ...prev, vehicleId: preSelectedVehicleId }));
    }
  }, [preSelectedVehicleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.tripDate && formData.tripDate < todayStr) {
      return;
    }
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset form after a delay or just leave success state
      setTimeout(() => {
        setStatus('idle');
        setFormData(prev => ({
          ...prev,
          tripDate: '', pickupTime: '', pickupLocation: '', dropoffLocation: '',
          fullName: '', phone: '', email: '', specialRequest: ''
        }));
      }, 4000);
    }, 1500);
  };

  return (
    <div className="relative mx-auto md:mx-0 bg-[rgb(35,35,191)] rounded-2xl p-8 w-full shadow-card">
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
            <h3 className="text-display-md text-obsidian-900 mb-2 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('booking.reservationConfirmed', 'Reservation Confirmed')}</h3>
            <p className="text-body-md text-obsidian-500">
              {t('booking.reservationSuccessDesc', 'Thank you for your booking. Our DUNAS TRAVEL concierges will contact you shortly to finalize the details.')}
            </p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="mb-2">
              <h3 className="text-display-md text-obsidian-900 mb-2 font-display" style={{ fontFamily: "'Playfair Display', serif" }}>{t('booking.bookYourTransfer', 'Book Your Transfer')}</h3>
              <p className="text-caption text-obsidian-500">{t('booking.transferDesc', 'Reserve your premium vehicle and professional driver.')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select 
                name="vehicleId" 
                value={formData.vehicleId} 
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors bg-white md:col-span-2 text-[16px]"
              >
                <option value="" disabled>{t('booking.selectVehicle', 'Select Vehicle')}</option>
                {transportation.map(v => (
                  <option key={v.id} value={v.id}>{t(`data.${v.name}`, v.name)}</option>
                ))}
              </select>

              <input 
                type="date" 
                name="tripDate"
                value={formData.tripDate}
                min={todayStr}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors text-[16px]"
              />
              <input 
                type="time" 
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors text-[16px]"
              />

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-caption text-obsidian-500 mb-1">{t('booking.adults', 'Adults')}</label>
                  <input 
                    type="number" 
                    name="adults"
                    min="1" max="20"
                    value={formData.adults}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors text-[16px]"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-caption text-obsidian-500 mb-1">{t('booking.children', 'Children')}</label>
                  <input 
                    type="number" 
                    name="children"
                    min="0" max="20"
                    value={formData.children}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors text-[16px]"
                  />
                </div>
              </div>

              <input 
                type="text" 
                name="pickupLocation"
                placeholder={t('booking.pickupLocation', 'Pick Up Location')}
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors text-[16px]"
              />
              <input 
                type="text" 
                name="dropoffLocation"
                placeholder={t('booking.dropoffLocation', 'Drop Off Location')}
                value={formData.dropoffLocation}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors md:col-span-2 text-[16px]"
              />

              <input 
                type="text" 
                name="fullName"
                placeholder={t('booking.fullName', 'Full Name')} 
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors text-[16px]"
              />
              <input 
                type="tel" 
                name="phone"
                placeholder={t('booking.phone', 'Phone Number')} 
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors text-[16px]"
              />
              <input 
                type="email" 
                name="email"
                placeholder={t('booking.email', 'Email Address')} 
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors md:col-span-2 text-[16px]"
              />
            </div>

            <textarea 
              name="specialRequest"
              placeholder={t('booking.specialRequestPlaceholder', 'Special Request...')} 
              value={formData.specialRequest}
              onChange={handleChange}
              rows="3"
              className="w-full p-4 border border-gray-200 rounded-lg focus:border-gold-500 outline-none transition-colors resize-none text-[16px]"
            ></textarea>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="gold-glow" 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 text-lg rounded-full"
              >
                {status === 'submitting' ? t('common.processing', 'Processing...') : t('transportation.reserveNow', 'Reserve Now')}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransportationForm;
