import { useState, useEffect, useRef } from 'react';
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
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(false);
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
    mobileMenuRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (mobileMenuRef.current) {
        setHeaderVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 h-16 lg:h-20 flex items-center bg-[url('/imgs/header.jpeg')] bg-cover bg-center bg-no-repeat ${headerVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.12)]' : 'shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
        }`}
    >
      <div className="container mx-auto px-6 h-full flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center z-50 drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)] hover:drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] transition-all" onClick={() => setMobileMenuOpen(false)}>
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
                <button className="flex items-center gap-1 text-white hover:text-[#F5A623] transition-colors text-body-md font-medium py-2 [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_1px_2px_rgba(0,0,0,0.8)]">
                  {link.name} <FaChevronDown className={`text-xs transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link to={link.path} className="text-white hover:text-[#F5A623] transition-colors text-body-md font-medium py-2 [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_1px_2px_rgba(0,0,0,0.8)]">
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
                    className="absolute top-full left-0 mt-2 w-56 bg-white border border-obsidian-200 rounded-lg overflow-hidden shadow-xl"
                  >
                    {link.dropdown.map((item) => (
                      <div key={item.name} className="relative group/sub">
                        {item.subItems ? (
                          <>
                            <Link
                              to={item.path}
                              className="px-4 py-3 text-obsidian-900 hover:text-[#F5A623] hover:bg-amber-50 transition-colors text-body-md border-b border-obsidian-100 last:border-0 flex justify-between items-center w-full"
                            >
                              <span>{item.name}</span>
                              <FaChevronDown className="-rotate-90 text-[10px] opacity-40 group-hover/sub:text-[#F5A623] group-hover/sub:rotate-0 transition-transform duration-200" />
                            </Link>
                            <div className="absolute left-full top-0 ml-0.5 hidden group-hover/sub:block w-56 bg-white border border-obsidian-200 rounded-lg overflow-hidden shadow-2xl z-[9999]">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.name}
                                  to={sub.path}
                                  className="block px-4 py-3 text-obsidian-900 hover:text-[#F5A623] hover:bg-amber-50 transition-colors text-body-md border-b border-obsidian-100 last:border-0"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            to={item.path}
                            className="block px-4 py-3 text-obsidian-900 hover:text-[#F5A623] hover:bg-amber-50 transition-colors text-body-md border-b border-obsidian-100 last:border-0"
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

        {/* Currency Selector (Desktop) */}
        <div className="hidden lg:flex items-center z-50">
          <CurrencySelector />
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 z-50">
          {/* Profile */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-9 h-9 rounded-full border border-obsidian-200 flex items-center justify-center text-white hover:text-[#F5A623] hover:border-[#F5A623] transition-all bg-obsidian-900/60 hover:bg-obsidian-900/80 shadow-[0_0_8px_rgba(0,0,0,0.5)] backdrop-blur-md"
                >
                  <span className="font-display font-semibold text-xs">{user.avatar}</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-9 h-9 rounded-full border border-obsidian-200 flex items-center justify-center text-white hover:text-[#F5A623] hover:border-[#F5A623] transition-all bg-obsidian-900/60 hover:bg-obsidian-900/80 shadow-[0_0_8px_rgba(0,0,0,0.5)] backdrop-blur-md"
              >
                <FaUserCircle size={15} />
              </button>
            )}
          </div>

          {/* Lang (Desktop) */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="h-9 rounded-full border border-obsidian-200 flex items-center justify-center text-white hover:text-[#F5A623] hover:border-[#F5A623] transition-all bg-obsidian-900/60 hover:bg-obsidian-900/80 shadow-[0_0_8px_rgba(0,0,0,0.5)] backdrop-blur-md gap-1.5 px-3"
            >
              <FaGlobe size={13} />
              <span className="text-[11px] font-semibold uppercase">
                {i18n.language === 'ar' ? 'ع' :
                  i18n.language === 'es' ? 'es' :
                    i18n.language === 'pt' ? 'pt' :
                      i18n.language === 'it' ? 'it' : 'en'}
              </span>
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-2 w-40 bg-white border border-obsidian-200 rounded-xl overflow-hidden shadow-xl z-[10000]"
                >
                  {[
                    { code: 'en', label: 'English', flag: '🇬🇧' },
                    { code: 'ar', label: 'العربية', flag: '🇪🇬' },
                    { code: 'es', label: 'Español', flag: '🇪🇸' },
                    { code: 'pt', label: 'Português', flag: '🇧🇷' },
                    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between text-body-md border-b border-obsidian-100 last:border-0 transition-colors ${i18n.language === lang.code ? 'text-amber-600 font-semibold bg-amber-50' : 'text-obsidian-700 hover:text-amber-600 hover:bg-amber-50'}`}
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
        <div className="lg:hidden flex items-center gap-1.5 z-50">
          {/* Lang (Mobile) */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="w-9 h-9 rounded-full border border-obsidian-200 flex items-center justify-center text-white hover:text-[#F5A623] hover:border-[#F5A623] transition-all bg-obsidian-900/60 hover:bg-obsidian-900/80 shadow-[0_0_8px_rgba(0,0,0,0.5)] backdrop-blur-md gap-1.5 px-2.5"
            >
              <FaGlobe size={14} />
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-2 w-40 bg-white border border-obsidian-200 rounded-xl overflow-hidden shadow-xl z-[10000]"
                >
                  {[
                    { code: 'en', label: 'English', flag: '🇬🇧' },
                    { code: 'ar', label: 'العربية', flag: '🇪🇬' },
                    { code: 'es', label: 'Español', flag: '🇪🇸' },
                    { code: 'pt', label: 'Português', flag: '🇧🇷' },
                    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between text-body-md border-b border-obsidian-100 last:border-0 transition-colors ${i18n.language === lang.code ? 'text-amber-600 font-semibold bg-amber-50' : 'text-obsidian-700 hover:text-amber-600 hover:bg-amber-50'}`}
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

          {/* Profile */}
          {!user ? (
            <button onClick={() => setIsLoginModalOpen(true)} className="w-9 h-9 rounded-full border border-obsidian-200 flex items-center justify-center text-white hover:text-[#F5A623] hover:border-[#F5A623] transition-all bg-obsidian-900/60 hover:bg-obsidian-900/80 shadow-[0_0_8px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <FaUserCircle size={15} />
            </button>
          ) : (
            <Link to="/profile" className="w-9 h-9 rounded-full border border-obsidian-200 flex items-center justify-center text-white hover:text-[#F5A623] hover:border-[#F5A623] transition-all bg-obsidian-900/60 hover:bg-obsidian-900/80 shadow-[0_0_8px_rgba(0,0,0,0.5)] backdrop-blur-md text-xs font-semibold">
              {user.avatar}
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="w-9 h-9 rounded-full border border-obsidian-200 flex items-center justify-center text-white hover:text-[#F5A623] hover:border-[#F5A623] transition-all bg-obsidian-900/60 hover:bg-obsidian-900/80 shadow-[0_0_8px_rgba(0,0,0,0.5)] backdrop-blur-md z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
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
              className="fixed inset-0 bg-white z-40 flex flex-col px-8 pt-24 pb-8 overflow-y-auto lg:hidden h-screen w-screen"
            >
              <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
                {navLinks.map((link) => (
                    <div key={link.name} className="w-full border-b border-obsidian-100 pb-4 last:border-0">
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => handleMobileDropdownToggle(link.name)}
                          className="w-full flex justify-between items-center text-left text-2xl text-obsidian-900 hover:text-[#F5A623] font-semibold py-2 transition-colors"
                        >
                          <span className={mobileActiveDropdown === link.name ? 'text-[#F5A623]' : ''}>
                            {link.name}
                          </span>
                          <FaChevronDown
                            className={`text-base transition-transform duration-300 ${mobileActiveDropdown === link.name ? 'rotate-180 text-[#F5A623]' : 'text-obsidian-300'
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
                              className="flex flex-col gap-1 pl-4 bg-obsidian-50/50 rounded-2xl overflow-hidden mt-2 border border-obsidian-100"
                            >
                              {link.dropdown.map(item => (
                                <div key={item.name} className="w-full">
                                  {item.subItems ? (
                                    <>
                                      <div className="flex justify-between items-center text-lg text-obsidian-700 py-3.5 px-4 border-b border-obsidian-100 last:border-0">
                                        <Link
                                          to={item.path}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="hover:text-[#F5A623] transition-colors flex-grow"
                                        >
                                          {item.name}
                                        </Link>
                                        <button
                                          onClick={() => setMobileActiveSubDropdown(mobileActiveSubDropdown === item.name ? null : item.name)}
                                          className="p-2 -mr-2 text-obsidian-400 hover:text-[#F5A623] transition-colors"
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
                                            className="pl-4 bg-obsidian-50/30 border-l border-obsidian-200"
                                          >
                                            {item.subItems.map(sub => (
                                              <Link
                                                key={sub.name}
                                                to={sub.path}
                                                onClick={() => {
                                                  setMobileMenuOpen(false);
                                                  setMobileActiveSubDropdown(null);
                                                }}
                                                className="text-body-md text-obsidian-600 hover:text-[#F5A623] py-3 px-4 block transition-colors border-b border-obsidian-100 last:border-0"
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
                                      className="text-lg text-obsidian-700 hover:text-[#F5A623] hover:bg-obsidian-50 py-3.5 px-4 block transition-all border-b border-obsidian-100 last:border-0 font-medium"
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
                        className="text-2xl text-obsidian-900 block hover:text-[#F5A623] transition-colors font-semibold py-2"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Currency Selector */}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-obsidian-100">
                  <span className="text-obsidian-400 text-xs font-semibold tracking-wider uppercase">{t('nav.currency', 'Currency')}</span>
                  <div className="flex">
                    <CurrencySelector light />
                  </div>
                </div>

                  {user && (
                  <div className="flex flex-col gap-3 mt-4">
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 px-4 bg-obsidian-50 text-obsidian-900 rounded-xl text-lg font-medium flex items-center gap-3 border border-obsidian-100">
                      <FaUserCircle className="text-[#F5A623]" /> {t('nav.myProfile', 'My Profile')}
                    </Link>
                    <Link to="/bookings" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 px-4 bg-obsidian-50 text-obsidian-900 rounded-xl text-lg font-medium flex items-center gap-3 border border-obsidian-200">
                      <FaBookmark className="text-[#F5A623]" /> {t('nav.myBookings', 'My Bookings')}
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full py-3.5 bg-red-50 text-red-600 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 border border-red-200 transition-colors active:bg-red-100"
                    >
                      <FaSignOutAlt /> {t('nav.logout', 'Logout')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Profile Dropdown (shared between desktop & mobile) */}
        <AnimatePresence>
          {profileDropdownOpen && user && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full right-1 mt-5 w-48 bg-white border border-obsidian-200 rounded-xl overflow-hidden shadow-xl z-[10000]"
            >
              <div className="px-4 py-3 border-b border-obsidian-100">
                <p className="text-caption text-obsidian-900 font-semibold">{user.name}</p>
                <p className="text-[10px] text-obsidian-400 truncate">{user.email}</p>
              </div>
              <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="w-full text-left px-4 py-3 text-obsidian-700 hover:text-amber-600 hover:bg-amber-50 transition-colors text-body-md border-b border-obsidian-100 flex items-center gap-2">
                <FaUserCircle className="text-amber-500" size={15} /> {t('nav.myProfile', 'My Profile')}
              </Link>
              <Link to="/bookings" onClick={() => setProfileDropdownOpen(false)} className="w-full text-left px-4 py-3 text-obsidian-700 hover:text-amber-600 hover:bg-amber-50 transition-colors text-body-md border-b border-obsidian-100 flex items-center gap-2">
                <FaBookmark className="text-amber-500" size={15} /> {t('nav.myBookings', 'My Bookings')}
              </Link>
              <button onClick={() => { logout(); setProfileDropdownOpen(false); }} className="w-full text-left px-4 py-3 text-red-500 hover:text-white hover:bg-red-500 transition-colors text-body-md flex items-center gap-2">
                <FaSignOutAlt size={15} /> {t('nav.logout', 'Logout')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Navbar;
