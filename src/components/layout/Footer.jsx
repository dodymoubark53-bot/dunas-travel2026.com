import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from '../ui/Logo';

const Footer = () => {
  const { t } = useTranslation();

  // مسار الصورة (تم ضبطه ليعمل بشكل صحيح مع بيئة التشغيل)
  const backgroundImageUrl = "/imgs/pyramid-bg.webp";

  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat text-white pt-20 pb-8 border-t border-white/10"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* تم إزالة طبقة التعتيم (Overlay) تماماً من هنا بناءً على طلبك */}

      {/* المحتوى الأصلي */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand & Socials */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <Logo theme="dark" height={70} />
            </Link>
            <p className="text-body-md mb-6 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {t('footer.desc', 'Curating award-winning DUNAS TRAVEL experiences across Egypt, Jordan, and Turkey since 2010.')}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/share/1EsALYq8cg/" className="footer-social w-10 h-10 rounded-full bg-[#1A1A2E]/80 border border-white/20 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110 shadow-lg">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/dunas_travel?igsh=bWkyb2FhY2hoNnN" className="footer-social w-10 h-10 rounded-full bg-[#1A1A2E]/80 border border-white/20 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110 shadow-lg">
                <FaInstagram />
              </a>
              <a href="tel:+3374664302" className="footer-social w-10 h-10 rounded-full bg-[#1A1A2E]/80 border border-white/20 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110 shadow-lg" title="اتصل بنا على الرقم الأول">
                <FaPhone />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-6 text-lg font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul className="flex flex-col gap-3 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <li><Link to="/about" className="hover:text-[#F5A623] transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/programs" className="hover:text-[#F5A623] transition-colors">{t('nav.programs', 'Programs')}</Link></li>
              <li><Link to="/blogs" className="hover:text-[#F5A623] transition-colors">{t('nav.blogs')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#F5A623] transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/faq" className="hover:text-[#F5A623] transition-colors">{t('footer.faq', 'FAQs')}</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white mb-6 text-lg font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('nav.destinations')}</h4>
            <ul className="flex flex-col gap-3 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {[
                { key: 'egipto', path: '/destinations/egypt' },
                { key: 'turquia', path: '/destinations/turkey' },
                { key: 'jordania', path: '/destinations/jordan' },
                { key: 'marruecos', path: '/destinations/morocco' },
                { key: 'grecia', path: '/destinations/greece' },
                { key: 'dubai', path: '/destinations/dubai' },
                { key: 'tuniz', path: '/destinations/tunisia' },
                { key: 'tierrasanta', path: '/destinations/holyland' },
              ].map(({ key, path }) => (
                <li key={key}>
                  <Link to={path} className="hover:text-[#F5A623] transition-colors">{t(`nav.${key}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white mb-6 text-lg font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('nav.contact')}</h4>
            <ul className="flex flex-col gap-4 mb-8 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#F5A623] mt-1 flex-shrink-0 drop-shadow-md" />
                <span className="text-sm">
                  {t('footer.address', '5 Hussein Said St, Old Hadayk El Ahram, First floor, Flat 102 – 103, Haram - Giza – Egypt')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhone className="text-[#F5A623] mt-1 flex-shrink-0 drop-shadow-md" />
                <div className="flex flex-col gap-1 text-sm">
                  <a href="tel:+20233746643" className="hover:text-[#F5A623] transition-colors">02 33746643</a>
                  <a href="tel:+20233746654" className="hover:text-[#F5A623] transition-colors">02 33746654</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#F5A623] flex-shrink-0 drop-shadow-md" />
                <a href="mailto:info@dunas-travel.com" className="hover:text-[#F5A623] transition-colors text-sm">info@dunas-travel.com</a>
              </li>
            </ul>

            <div className="relative shadow-lg">
              <input
                type="email"
                placeholder={t('footer.newsletter', 'Subscribe to newsletter')}
                className="w-full bg-[#1A1A2E]/90 border border-white/30 rounded-full py-3 px-6 text-white outline-none focus:border-[#F5A623] transition-colors placeholder:text-white/60"
              />
              <Link
                to="/contact"
                className="absolute right-1 top-1 bottom-1 bg-[#F5A623] hover:bg-[#F5A623]/80 text-[#1A1A2E] rounded-full px-6 font-semibold transition-colors flex items-center justify-center"
              >
                {t('footer.join', 'Join')}
              </Link>
            </div>
          </div>

        </div>

        {/* Credits */}
        <div className="pt-8 border-t border-white/20 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            &copy; {new Date().getFullYear()} Dunas Travel. {t('footer.rights', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;