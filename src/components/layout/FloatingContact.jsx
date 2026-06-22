import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaPhone, FaCommentDots, FaTimes, FaEnvelope } from 'react-icons/fa';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { icon: FaFacebook, href: 'https://www.facebook.com/share/1BnRWtoUdo/', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://www.instagram.com/dunas_travel?igsh=bWkyb2FhY2hoNnNo', label: 'Instagram' },
    { icon: FaPhone, href: 'tel:+20233746643', label: 'Call us' },
    { icon: FaEnvelope, href: 'mailto:info@dunas-travel.com', label: 'Email' },
  ];

  // Animation variants for the child items to fan out radially
  const itemVariants = {
    closed: { opacity: 0, x: 0, y: 0, scale: 0 },
    open: (index) => {
      // Calculate radial positions (arc from top to left)
      // index 0: straight up
      // index 1: diagonal up-left
      // index 2: diagonal left-up
      // index 3: straight left
      const positions = [
        { x: 0, y: -75 },
        { x: -38, y: -65 },
        { x: -65, y: -38 },
        { x: -75, y: 0 }
      ];
      return {
        opacity: 1,
        x: positions[index].x,
        y: positions[index].y,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: index * 0.05
        }
      };
    }
  };

  return (
    <div id="floating-contact-container" className="floating-contact fixed bottom-6 right-6 z-50 flex items-center justify-center">
      <AnimatePresence>
        {isOpen && socials.map((social, idx) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={idx}
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              title={social.label}
              className="absolute w-12 h-12 bg-obsidian-900 border border-gold-500 rounded-full flex items-center justify-center text-gold-500 shadow-glass hover:bg-gold-500 hover:text-obsidian-900 transition-colors duration-300"
            >
              <Icon size={20} />
            </motion.a>
          );
        })}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-obsidian-900 bg-gradient-to-tr from-gold-700 via-gold-500 to-gold-300 shadow-[0_0_24px_rgba(201,162,39,0.35)] hover:shadow-[0_0_32px_rgba(201,162,39,0.5)] transition-shadow duration-300"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0.9 : 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={28} />}
        </motion.div>
      </button>
    </div>
  );
};

export default FloatingContact;
