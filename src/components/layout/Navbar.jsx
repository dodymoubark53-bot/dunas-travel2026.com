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
  const [activeDropdown, setActiveDropdown] = useState(null); // خاص بالـ Desktop (Hover)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null); // خاص بالـ Mobile (Click)
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

  // تهيئة الحالات عند تغيير حجم الشاشة لمنع التداخل
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileActiveDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // دالة للتحكم في فتح وإغلاق القوائم في الموبايل عند الضغط
  const handleMobileDropdownToggle = (name) => {
    setMobileActiveDropdown(mobileActiveDropdown === name ? null : name);
  };

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

  // أنيميشن القوائم المنسدلة للـ Desktop
  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } }
  };

  // أنيميشن فتح وإغلاق القوائم للموبايل بسلاسة (Accordion)
  const mobileDropdownVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0, overflow: 'hidden' },
    visible: { opacity: 1, height: 'auto', marginTop: 8, transition: { duration: 0.25, ease: 'easeInOut' } },
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
          <Logo theme="dark" height={40} />
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

        {/* Mobile Buttons */}
        <div className="lg:hidden flex items-center gap-3 z-50">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="text-white hover:text-[#F5A623] p-2 transition-colors"
          >
            <FaGlobe size={18} />
          </button>

          {/* Mobile Profile/Login */}
          {!user ? (
            <button onClick={() => setIsLoginModalOpen(true)} className="text-white hover:text-[#F5A623] p-2 transition-colors">
              <FaUserCircle size={20} />
            </button>
          ) : (
            <Link to="/profile" className="w-8 h-8 rounded-full border border-[#F5A623]/50 flex items-center justify-center text-white bg-white/5 text-xs font-semibold">
              {user.avatar}
            </Link>
          )}

          {/* Hamburger Menu Toggle */}
          <button
            className="text-white p-2 hover:text-[#F5A623] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Full Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-16 bottom-0 bg-[#1A1A2E]/98 backdrop-blur-xl z-40 flex flex-col px-6 py-6 overflow-y-auto lg:hidden gap-5"
            >
              {navLinks.map((link) => (
                <div key={link.name} className="w-full border-b border-white/5 pb-3 last:border-0">
                  {link.dropdown ? (
                    <>
                      {/* عنوان القائمة في الموبايل - يفتح ويغلق عند الضغط عليه */}
                      <button
                        onClick={() => handleMobileDropdownToggle(link.name)}
                        className="w-full flex justify-between items-center text-left text-lg text-white hover:text-[#F5A623] font-medium py-1.5 px-2 transition-colors"
                      >
                        <span className={mobileActiveDropdown === link.name ? 'text-[#F5A623]' : ''}>
                          {link.name}
                        </span>
                        <FaChevronDown
                          className={`text-sm transition-transform duration-300 ${mobileActiveDropdown === link.name ? 'rotate-180 text-[#F5A623]' : 'text-gray-400'
                            }`}
                        />
                      </button>

                      {/* العناصر الفرعية داخل الموبايل - تفتح وتغلق بسلاسة بفضل الأنيميشن */}
                      <AnimatePresence initial={false}>
                        {mobileActiveDropdown === link.name && (
                          <motion.div
                            variants={mobileDropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col gap-1 pl-4 bg-white/[0.03] rounded-xl overflow-hidden mt-1"
                          >
                            {link.dropdown.map(item => (
                              <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-base text-gray-300 hover:text-[#F5A623] py-2.5 px-3 block transition-colors border-b border-white/5 last:border-0"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    // الروابط العادية التي لا تحتوي على قوائم (مثل الرئيسية)
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg text-white block hover:text-[#F5A623] transition-colors font-medium px-2 py-1.5"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* زر تسجيل الخروج للموبايل في حال وجود مستخدم */}
              {user && (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="mt-auto w-full py-3 bg-red-500/10 text-red-400 rounded-xl font-medium flex items-center justify-center gap-2 border border-red-500/20"
                >
                  <FaSignOutAlt /> {t('nav.logout', 'Logout')}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Navbar;