import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGlobe, FaChevronDown, FaUserCircle, FaSignOutAlt, FaBookmark } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../auth/LoginModal';
import Logo from '../ui/Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setLangDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تعديل: تبديل Services بـ Programs وإضافة الأقسام الستة الجديدة تماماً
  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.blogs'), path: '/blogs' },
    {
      name: t('nav.programs', { defaultValue: 'Programs' }),
      dropdown: [
        { name: t('nav.classic', { defaultValue: 'Classic' }), path: '/programs/classic' },
        { name: t('nav.transportation', { defaultValue: 'Transportation' }), path: '/programs/transportation' },
        { name: t('nav.extension', { defaultValue: 'Extension' }), path: '/programs/extension' },
        { name: t('nav.multiCountry', { defaultValue: 'Multi-Country Tours' }), path: '/programs/multi-country' },
        { name: t('nav.honeymooners', { defaultValue: 'Honeymooners Package' }), path: '/programs/honeymooners' },
        { name: t('nav.religious', { defaultValue: 'Programs Religiosos' }), path: '/programs/religious' },
      ]
    },
    {
      name: t('nav.destinations'),
      dropdown: [
        { name: t('nav.italy'), path: '/destinations/italy' },
        { name: t('nav.spain'), path: '/destinations/spain' },
        { name: t('nav.brazil'), path: '/destinations/brazil' },
        { name: t('nav.egypt'), path: '/destinations/egypt' },
        { name: t('nav.turkey'), path: '/destinations/turkey' },
        { name: t('nav.jordan'), path: '/destinations/jordan' },
        { name: t('nav.morocco'), path: '/destinations/morocco' },
        { name: t('nav.greece'), path: '/destinations/greece' },
        { name: t('nav.dubai'), path: '/destinations/dubai' },
        { name: t('nav.tunisia'), path: '/destinations/tunisia' },
        { name: t('nav.holyland'), path: '/destinations/holyland' },
      ]
    },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 h-16 lg:h-20 flex items-center ${scrolled ? 'shadow-lg border-b border-white/5' : ''
        }`}
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
    >
      <div
        className="container mx-auto px-6 h-full flex justify-between"
        style={{ alignItems: 'center' }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center z-50">
          <Logo theme="dark" height={40} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <button className="flex items-center gap-1 text-white hover:text-[#F5A623] transition-colors text-body-md font-medium">
                  {link.name} <FaChevronDown className="text-xs" />
                </button>
              ) : (
                <Link to={link.path} className="text-white hover:text-[#F5A623] transition-colors text-body-md font-medium">
                  {link.name}
                </Link>
              )}

              {/* Dropdown Panel */}
              <AnimatePresence>
                {link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-4 w-56 bg-[#1A1A2E] border border-white/10 rounded-lg overflow-hidden shadow-xl"
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-3 text-white hover:text-[#1A1A2E] hover:bg-[#F5A623] transition-colors text-body-md border-b border-white/5 last:border-0"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4 z-50">
          {/* User Auth */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-10 h-10 rounded-full border border-[#F5A623]/50 flex items-center justify-center text-white hover:text-[#F5A623] hover:border-[#F5A623] transition-all bg-white/5"
                >
                  <span className="font-display font-semibold text-sm">{user.avatar}</span>
                </button>
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full right-0 mt-4 w-48 bg-[#1A1A2E] border border-white/10 rounded-lg overflow-hidden shadow-xl"
                    >
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-caption text-white font-semibold">{user.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link to="/profile" className="w-full text-left px-4 py-3 text-white hover:text-[#1A1A2E] hover:bg-[#F5A623] transition-colors text-body-md border-b border-white/5 flex items-center gap-2">
                        <FaUserCircle /> {t('nav.myProfile', 'My Profile')}
                      </Link>
                      <Link to="/bookings" className="w-full text-left px-4 py-3 text-white hover:text-[#1A1A2E] hover:bg-[#F5A623] transition-colors text-body-md border-b border-white/5 flex items-center gap-2">
                        <FaBookmark /> {t('nav.myBookings', 'My Bookings')}
                      </Link>
                      <button onClick={() => { logout(); setProfileDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-red-400 hover:text-white hover:bg-red-500 transition-colors text-body-md flex items-center gap-2">
                        <FaSignOutAlt /> {t('nav.logout', 'Logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-white hover:text-[#F5A623] transition-colors p-2 flex items-center gap-2"
                title="Login"
              >
                <FaUserCircle size={20} />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="text-white hover:text-[#F5A623] transition-colors p-2 flex items-center gap-2"
            >
              <FaGlobe /> <span className="text-caption uppercase hidden sm:block font-medium">{
                i18n.language === 'ar' ? 'العربية' :
                  i18n.language === 'es' ? 'Español' :
                    i18n.language === 'pt' ? 'Português' :
                      i18n.language === 'it' ? 'Italiano' : 'English'
              }</span>
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-4 w-40 bg-[#1A1A2E] border border-white/10 rounded-lg overflow-hidden shadow-xl"
                >
                  {[
                    { code: 'en', label: 'English', flag: '🇬🇧' },
                    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
                    { code: 'es', label: 'Español', flag: '🇪🇸' },
                    { code: 'pt', label: 'Português', flag: '🇧🇷' },
                    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between text-body-md border-b border-white/5 last:border-0 transition-colors ${i18n.language === lang.code ? 'text-[#F5A623] font-semibold bg-white/5' : 'text-white hover:text-[#1A1A2E] hover:bg-[#F5A623]'}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {i18n.language === lang.code && <span className="text-[#F5A623]">✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Hamburger & Login */}
        <div className="lg:hidden flex items-center gap-4 z-50">
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="text-white hover:text-[#F5A623] transition-colors p-2 flex items-center gap-2"
            >
              <FaGlobe /> <span className="text-caption uppercase hidden sm:block font-medium">{
                i18n.language === 'ar' ? 'العربية' :
                  i18n.language === 'es' ? 'Español' :
                    i18n.language === 'pt' ? 'Português' :
                      i18n.language === 'it' ? 'Italiano' : 'English'
              }</span>
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-4 w-40 bg-[#1A1A2E] border border-white/10 rounded-lg overflow-hidden shadow-xl"
                >
                  {[
                    { code: 'en', label: 'English', flag: '🇬🇧' },
                    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
                    { code: 'es', label: 'Español', flag: '🇪🇸' },
                    { code: 'pt', label: 'Português', flag: '🇧🇷' },
                    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between text-body-md border-b border-white/5 last:border-0 transition-colors ${i18n.language === lang.code ? 'text-[#F5A623] font-semibold bg-white/5' : 'text-white hover:text-[#1A1A2E] hover:bg-[#F5A623]'}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {i18n.language === lang.code && <span className="text-[#F5A623]">✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!user ? (
            <button onClick={() => setIsLoginModalOpen(true)} className="text-white hover:text-[#F5A623] transition-colors">
              <FaUserCircle size={22} />
            </button>
          ) : (
            <span className="w-8 h-8 rounded-full border border-[#F5A623]/50 flex items-center justify-center text-white bg-white/5 font-display text-xs">{user.avatar}</span>
          )}
          <button
            className="text-white p-2 hover:text-[#F5A623]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '70px',
                background: 'rgba(26, 26, 46, 0.98)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)'
              }}
              className="gap-8"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ position: 'absolute', top: '16px', right: '16px' }}
                className="text-white hover:text-[#F5A623] transition-colors p-2"
              >
                <FaTimes size={24} />
              </button>
              {navLinks.map((link) => (
                <div key={link.name} className="text-center">
                  {link.dropdown ? (
                    <span className="text-display-sm text-gray-300 font-medium block mb-2">
                      {link.name}
                    </span>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-display-md text-white hover:text-[#F5A623] transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.dropdown && (
                    <div className="mt-2 flex flex-col gap-3 bg-white/5 p-4 rounded-xl min-w-[200px]">
                      {link.dropdown.map(item => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-body-lg text-gray-400 hover:text-[#F5A623] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Navbar;