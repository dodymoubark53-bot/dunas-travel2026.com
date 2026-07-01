import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from '../ui/Logo';
import TiT0Chat from '../ui/TiT0Chat';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 480);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative w-full text-white flex flex-col"
      style={{ background: 'linear-gradient(180deg, rgb(10,25,105) 0%, rgb(6,29,93) 50%, rgb(10,21,53) 100%)' }}
    >

      {/* Brand & Socials + TiT0 */}
      <style>{`
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes blink{50%{opacity:0}}
@keyframes dotSlideIn{from{opacity:0;transform:translateX(30px) scale(0.15)}to{opacity:1;transform:translateX(0) scale(1)}}
@keyframes arrowBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
#backToTop{
  position:fixed;left:28px;bottom:28px;
  width:54px;height:54px;border-radius:50%;
  border:1px solid var(--gold,#C9A227);
  background:var(--navy-deep,#081830);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;z-index:200;
  opacity:0;visibility:hidden;
  transform:translateY(16px);
  transition:opacity .35s ease,transform .35s ease,visibility .35s ease,border-color .3s ease,background .3s ease;
  box-shadow:0 14px 34px rgba(8,24,48,0.28);
}
#backToTop.show{opacity:1!important;visibility:visible!important;transform:translateY(0)!important}
#backToTop:hover{background:var(--gold,#C9A227);border-color:var(--gold,#C9A227)}
#backToTop svg{width:20px;height:20px;stroke:var(--gold-light,#E8CB72);transition:stroke .3s ease;animation:arrowBounce 1.6s ease-in-out infinite}
#backToTop:hover svg{stroke:var(--navy-deep,#081830)}
@media(max-width:640px){#backToTop{left:18px;bottom:18px;width:48px;height:48px}}
`}</style>
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pt-8 sm:pt-10 lg:pt-12 flex flex-col sm:flex-row justify-between items-start gap-6">
        <div className="max-w-lg">
          <Link to="/" className="flex items-center mb-3">
            <Logo theme="dark" height={85} />
          </Link>
          <p className="text-white text-base sm:text-lg font-bold leading-snug">
            {t('footer.desc', 'Curating award-winning DUNAS TRAVEL experiences across Egypt, Jordan, and Turkey since 2010.')}
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://www.facebook.com/share/1EsALYq8cg/" className="footer-social w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110">
              <FaFacebook size={16} />
            </a>
            <a href="https://www.instagram.com/dunas_travel?igsh=bWkyb2FhY2hoNnN" className="footer-social w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110">
              <FaInstagram size={16} />
            </a>
            <a href="tel:+3374664302" className="footer-social w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110">
              <FaPhone size={16} />
            </a>
          </div>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mt-12 sm:mt-0 shrink-0">
          <div className="relative flex flex-col items-center">
            <img
              src="/imgs/tito-mascot.png"
              alt="TiT0"
              className="w-[120px] sm:w-[150px] animate-[float_3s_ease-in-out_infinite] drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)]"
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 z-10">
              <TiT0Chat />
            </div>
          </div>
          <div className={`flex flex-col items-center sm:items-start text-center ${isRtl ? 'sm:text-right' : 'sm:text-left'} gap-1 pt-2 sm:pt-8`}>
            <p className="text-white text-base sm:text-lg font-bold max-w-[280px] leading-tight">
              {t('footer.titoTagline', 'Descubre la magia de Egipto y sus monumentos históricos de la mano de los Expertos')}
            </p>
          </div>
        </div>
      </div>

      {/* Columns: Quick Links | Programs | Destinations | Contact */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pt-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Quick Links (left) */}
          <div>
            <h4 className="text-white mb-4 text-lg font-bold">{t('footer.quickLinks', 'Quick Links')}</h4>
            <ul className="flex flex-col gap-2 text-base font-bold">
              <li><Link to="/about" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/programs" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.programs', 'Programs')}</Link></li>
              <li><Link to="/blogs" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.blogs')}</Link></li>
              <li><Link to="/contact" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/faq" className="text-white hover:text-[#F5A623] transition-colors">{t('footer.faq', 'FAQs')}</Link></li>
              <li><Link to="/invoice" className="text-white hover:text-[#F5A623] transition-colors">{t('booking.invoice', 'Invoice')}</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white mb-4 text-lg font-bold">{t('nav.programs', 'Programs')}</h4>
            <ul className="flex flex-col gap-2 text-base font-bold">
              <li><Link to="/programs/classic" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.classic', 'Classic')}</Link></li>
              <li><Link to="/programs/hotels" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.hotelsTab', 'Hotels')}</Link></li>
              <li><Link to="/programs/transportation" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.transportation', 'Transportation')}</Link></li>
              <li><Link to="/programs/honeymooners" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.honeymooners', 'Honeymooners Package')}</Link></li>
              <li><Link to="/programs/religious" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.religious', 'Programs Religiosos')}</Link></li>
              <li><Link to="/programs/multi-country" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.multiCountry', 'Multi-Country Tours')}</Link></li>
              <li><Link to="/programs/extension" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.extension', 'EXTENSION')}</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white mb-4 text-lg font-bold">{t('nav.destinations')}</h4>
            <ul className="flex flex-col gap-2 text-base font-bold">
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
                  <Link to={path} className="text-white hover:text-[#F5A623] transition-colors">{t(`nav.${key}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (right) */}
          <div>
            <h4 className="text-white mb-4 text-lg font-bold">{t('nav.contact')}</h4>
            <ul className="flex flex-col gap-2 text-base font-bold">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-[#F5A623] mt-1 flex-shrink-0" size={14} />
                <span className="text-white leading-snug">
                  5 Hussein Said St, Old Hadayk El Ahram, First floor, Flat 102 – 103, Haram - Giza – Egypt
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-[#F5A623] flex-shrink-0" size={14} />
                <div className="flex gap-3">
                  <a href="tel:+20233746643" className="text-white hover:text-[#F5A623] transition-colors">02 33746643</a>
                  <a href="tel:+20233746654" className="text-white hover:text-[#F5A623] transition-colors">02 33746654</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#F5A623] flex-shrink-0" size={14} />
                <a href="mailto:info@dunas-travel.com" className="text-white hover:text-[#F5A623] transition-colors">info@dunas-travel.com</a>
              </li>
            </ul>
            <Link
              to="/tailor-a-tour"
              className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-[#F5A623] to-[#C07D0A] text-[#1A1A2E] font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t('footer.customize', 'Customize Your Trip')}
            </Link>
          </div>

        </div>

        {/* Credits */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} Dunas Travel. {t('footer.rights', 'All rights reserved.')}
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <button id="backToTop" onClick={scrollToTop} aria-label="Back to top" className={showBackToTop ? 'show' : ''}>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5"></path>
          <path d="M5 12l7-7 7 7"></path>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
