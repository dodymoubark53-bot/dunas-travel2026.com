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
            <Logo theme="light" height={85} />
          </Link>
          <p className="text-white text-base sm:text-lg font-bold leading-snug">
            {t('footer.desc', 'Curating award-winning DUNAS TRAVEL experiences across Egypt, Jordan, and Turkey since 2010.')}
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://www.facebook.com/share/1EsALYq8cg/" aria-label="Visit our Facebook page" className="footer-social w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110">
              <FaFacebook size={16} />
            </a>
            <a href="https://www.instagram.com/dunas_travel?igsh=bWkyb2FhY2hoNnN" aria-label="Visit our Instagram page" className="footer-social w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110">
              <FaInstagram size={16} />
            </a>
            <a href="tel:+3374664302" aria-label="Call us" className="footer-social w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-[#F5A623] hover:text-[#1A1A2E] transition-all duration-300 hover:scale-110">
              <FaPhone size={16} />
            </a>
          </div>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mt-12 sm:mt-0 shrink-0">
          <div className="relative flex flex-col items-center">
            <img
              src="/imgs/tito-mascot.webp"
              alt="TiT0"
              width="150"
              height="150"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Quick Links (left) */}
          <div>
            <h3 className="text-white mb-4 text-lg font-bold">{t('footer.quickLinks', 'Quick Links')}</h3>
            <ul className="flex flex-col gap-2 text-base font-bold">
              <li><Link to="/about" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/programs" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/blogs" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.blogs')}</Link></li>
              <li><Link to="/contact" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/faq" className="text-white hover:text-[#F5A623] transition-colors">{t('footer.faq', 'FAQs')}</Link></li>
              <li><Link to="/invoice" className="text-white hover:text-[#F5A623] transition-colors">{t('booking.invoice', 'Invoice')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4 text-lg font-bold">{t('nav.services')}</h3>
            <ul className="flex flex-col gap-2 text-base font-bold">
              <li><Link to="/programs/hotels" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.hotelsTab', 'Hotels')}</Link></li>
              <li><Link to="/programs/transportation" className="text-white hover:text-[#F5A623] transition-colors">{t('nav.transportation', 'Transportation')}</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white mb-4 text-lg font-bold">{t('nav.destinations')}</h3>
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

          {/* Contact - replaced by FloatingContact button */}

        </div>

        {/* Credits */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-body-md text-white font-semibold tracking-wide">
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
