import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGlobe, FaChevronDown, FaUserCircle, FaSignOutAlt, FaBookmark } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../auth/LoginModal';
import Logo from '../ui/Logo';
import CurrencySelector from '../ui/CurrencySelector';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [mobileActiveSubDropdown, setMobileActiveSubDropdown] = useState(null);
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileActiveDropdown(null);
        setMobileActiveSubDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileDropdownToggle = (name) => {
    setMobileActiveDropdown(mobileActiveDropdown === name ? null : name);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.blogs'), path: '/blogs' },
    {
      name: t('nav.programs', { defaultValue: 'Programs' }),
      dropdown: [
        {
          name: t('nav.classic', { defaultValue: 'Classic' }),
          path: '/programs/classic',
          subItems: [
            { name: t('nav.classicProgram', { defaultValue: 'Classic Program' }), path: '/programs/classic/classic-program' }
          ]
        },
        {
          name: t('nav.hotelsTab', { defaultValue: 'Hotels' }),
          path: '/programs/hotels',
          subItems: [
            { name: 'Sol Pyramid Hotel', path: '/programs/hotels/sol-pyramid-hotel' }
          ]
        },
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

  const mobileDropdownVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0, overflow: 'hidden' },
    visible: { opacity: 1, height: 'auto', marginTop: 12, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.2, ease: 'easeInOut' } }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 h-16 lg:h-20 flex items-center ${scrolled ? 'shadow-lg border-b border-white/5 bg-[#1A1A2E]/95' : 'bg-[#1A1A2E]/90'
        }`}
      style={{
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
    >
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center z-50" onClick={() => setMobileMenuOpen(false)}>
          <Logo theme="dark" height={60} />
        </Link>

        {/* Desktop Nav (Hover) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <button className="flex items-center gap-1 text-white hover:text-[#F5A623] transition-colors text-body-md font-medium py-2">
                  {link.name} <FaChevronDown className={`text-xs transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link to={link.path} className="text-white hover:text-[#F5A623] transition-colors text-body-md font-medium py-2">
                  {link.name}
                </Link>
              )}

              {/* Dropdown Panel Desktop */}
              <AnimatePresence>
                {link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-56 bg-[#1A1A2E] border border-white/10 rounded-lg overflow-hidden shadow-xl"
                  >
                    {link.dropdown.map((item) => (
                      <div key={item.name} className="relative group/sub">
                        {item.subItems ? (
                          <>
                            <Link
                              to={item.path}
                              className="px-4 py-3 text-white hover:text-[#1A1A2E] hover:bg-[#F5A623] transition-colors text-body-md border-b border-white/5 last:border-0 flex justify-between items-center w-full"
                            >
                              <span>{item.name}</span>
                              <FaChevronDown className="-rotate-90 text-[10px] opacity-70 group-hover/sub:text-[#1A1A2E] group-hover/sub:rotate-0 transition-transform duration-200" />
                            </Link>
                            <div className="absolute left-full top-0 ml-0.5 hidden group-hover/sub:block w-56 bg-[#1A1A2E] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-[9999]">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  className="block px-4 py-3 text-white hover:text-[#1A1A2E] hover:bg-[#F5A623] transition-colors text-body-md border-b border-white/5 last:border-0"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            className="block px-4 py-3 text-white hover:text-[#1A1A2E] hover:bg-[#F5A623] transition-colors text-body-md border-b border-white/5 last:border-0"
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Currency Selector */}
        <div className="hidden md:flex items-center z-50">
          <CurrencySelector />
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 z-50">
          {/* Profile Dropdown */}
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
                      <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="w-full text-left px-4 py-3 text-white hover:text-[#1A1A2E] hover:bg-[#F5A623] transition-colors text-body-md border-b border-white/5 flex items-center gap-2">
                        <FaUserCircle /> {t('nav.myProfile', 'My Profile')}
                      </Link>
                      <Link to="/bookings" onClick={() => setProfileDropdownOpen(false)} className="w-full text-left px-4 py-3 text-white hover:text-[#1A1A2E] hover:bg-[#F5A623] transition-colors text-body-md border-b border-white/5 flex items-center gap-2">
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
              >
                <FaUserCircle size={20} />
              </button>
            )}
          </div>

          {/* Lang Dropdown */}
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
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="lg:hidden flex items-center gap-3 z-50">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="text-white hover:text-[#F5A623] p-2 transition-colors"
          >
            <FaGlobe size={20} />
          </button>

          {!user ? (
            <button onClick={() => setIsLoginModalOpen(true)} className="text-white hover:text-[#F5A623] p-2 transition-colors">
              <FaUserCircle size={22} />
            </button>
          ) : (
            <Link to="/profile" className="w-9 h-9 rounded-full border border-[#F5A623]/50 flex items-center justify-center text-white bg-white/5 text-sm font-semibold">
              {user.avatar}
            </Link>
          )}

          {/* Hamburger Icon */}
          <button
            className="text-white p-2 hover:text-[#F5A623] transition-colors z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={26} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Full Screen Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              className="fixed inset-0 bg-[#1A1A2E] z-40 flex flex-col px-8 pt-24 pb-8 overflow-y-auto lg:hidden h-screen w-screen"
            >
              <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
                {navLinks.map((link) => (
                  <div key={link.name} className="w-full border-b border-white/5 pb-4 last:border-0">
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => handleMobileDropdownToggle(link.name)}
                          className="w-full flex justify-between items-center text-left text-2xl text-white hover:text-[#F5A623] font-semibold py-2 transition-colors"
                        >
                          <span className={mobileActiveDropdown === link.name ? 'text-[#F5A623]' : ''}>
                            {link.name}
                          </span>
                          <FaChevronDown
                            className={`text-base transition-transform duration-300 ${mobileActiveDropdown === link.name ? 'rotate-180 text-[#F5A623]' : 'text-gray-400'
                              }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {mobileActiveDropdown === link.name && (
                            <motion.div
                              variants={mobileDropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="flex flex-col gap-1 pl-4 bg-white/[0.03] rounded-2xl overflow-hidden mt-2 border border-white/5"
                            >
                              {link.dropdown.map(item => (
                                <div key={item.name} className="w-full">
                                  {item.subItems ? (
                                    <>
                                      <div className="flex justify-between items-center text-lg text-gray-300 py-3.5 px-4 border-b border-white/5 last:border-0">
                                        <Link
                                          to={item.path}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="hover:text-[#F5A623] transition-colors flex-grow"
                                        >
                                          {item.name}
                                        </Link>
                                        <button
                                          onClick={() => setMobileActiveSubDropdown(mobileActiveSubDropdown === item.name ? null : item.name)}
                                          className="p-2 -mr-2 text-gray-400 hover:text-[#F5A623] transition-colors"
                                        >
                                          <FaChevronDown
                                            className={`text-xs transition-transform duration-200 ${mobileActiveSubDropdown === item.name ? 'rotate-180 text-[#F5A623]' : ''}`}
                                          />
                                        </button>
                                      </div>
                                      <AnimatePresence initial={false}>
                                        {mobileActiveSubDropdown === item.name && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="pl-4 bg-white/[0.02] border-l border-white/10"
                                          >
                                            {item.subItems.map(sub => (
                                              <Link
                                                key={sub.name}
                                                to={sub.path}
                                                onClick={() => {
                                                  setMobileMenuOpen(false);
                                                  setMobileActiveSubDropdown(null);
                                                }}
                                                className="text-body-md text-gray-400 hover:text-[#F5A623] py-3 px-4 block transition-colors border-b border-white/5 last:border-0"
                                              >
                                                {sub.name}
                                              </Link>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </>
                                  ) : (
                                    <Link
                                      key={item.name}
                                      to={item.path}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="text-lg text-gray-300 hover:text-[#F5A623] hover:bg-white/5 py-3.5 px-4 block transition-all border-b border-white/5 last:border-0 font-medium"
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-2xl text-white block hover:text-[#F5A623] transition-colors font-semibold py-2"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Currency Selector */}
                <div className="flex md:hidden flex-col gap-2 mt-4 pt-4 border-t border-white/5">
                  <span className="text-white/40 text-xs font-semibold tracking-wider uppercase">{t('nav.currency', 'Currency')}</span>
                  <div className="flex">
                    <CurrencySelector />
                  </div>
                </div>

                {user && (
                  <div className="flex flex-col gap-3 mt-4">
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 px-4 bg-white/5 text-white rounded-xl text-lg font-medium flex items-center gap-3 border border-white/10">
                      <FaUserCircle className="text-[#F5A623]" /> {t('nav.myProfile', 'My Profile')}
                    </Link>
                    <Link to="/bookings" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 px-4 bg-white/5 text-white rounded-xl text-lg font-medium flex items-center gap-3 border border-white/10">
                      <FaBookmark className="text-[#F5A623]" /> {t('nav.myBookings', 'My Bookings')}
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full py-3.5 bg-red-500/10 text-red-400 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 border border-red-500/20 transition-colors active:bg-red-500/20"
                    >
                      <FaSignOutAlt /> {t('nav.logout', 'Logout')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Navbar;