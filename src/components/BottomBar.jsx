"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Social media data with actual image URLs
const socials = [
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/theknowledge.network/', 
    icon: 'https://res.cloudinary.com/due7t0ksr/image/upload/v1756147940/insta_givq0w.png', 
    color: 'hover:shadow-orange-500/30' 
  },
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/the-knowledge-network-858b73329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ', 
    icon: 'https://res.cloudinary.com/due7t0ksr/image/upload/v1756147940/linkedin_l04xw8.png', 
    color: 'hover:shadow-blue-500/30' 
  },
  // { 
  //   name: 'WhatsApp', 
  //   href: 'https://whatsapp.com', 
  //   icon: 'https://res.cloudinary.com/due7t0ksr/image/upload/v1756147940/whatsapp_hjbwxs.png', 
  //   color: 'hover:shadow-green-500/30' 
  // },
  { 
    name: 'Mail', 
    href: 'mailto:knowledge.network@mitaoe.ac.in', 
    icon: 'https://res.cloudinary.com/due7t0ksr/image/upload/v1756147940/gmail_o12czg.png', 
    color: 'hover:shadow-red-500/30' 
  },
];

function BottomBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed s:w-[80vw] lg:w-[35vw] bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative flex justify-center">
        {/* --- Enhanced Animated Social Icons --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-full right-0 mb-4 flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30, scale: 0.3, rotate: -180 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotate: 0,
                    transition: { 
                      delay: index * 0.1, 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 25,
                      duration: 0.6
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 30, 
                    scale: 0.3,
                    rotate: 180,
                    transition: { 
                      delay: (socials.length - index - 1) * 0.05,
                      duration: 0.3
                    }
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 bg-white/95 backdrop-blur-md text-gray-800 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 ${social.color} border border-gray-100`}
                >
                  <img 
                    src={social.icon} 
                    alt={social.name} 
                    className="w-6 h-6 object-contain"
                  />
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Enhanced Main Bar --- */}
        <motion.div 
          className="bg-[#262626] text-white rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-xl shadow-black/30 border border-gray-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 text-sm font-light">
            <motion.span 
              className="text-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              👋
            </motion.span>
            <div className="overflow-hidden">
              <span className="tracking-wide inline-block">
                {'Welcome to The Knowledge Network'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: [20, -10, 0], 
                      opacity: [0, 1, 1] 
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.05,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </span>
            </div>
          </div>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex items-center justify-center text-white transition-all duration-300 rounded-full border border-gray-600 hover:bg-gray-700 hover:border-gray-500 hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              animate={{ rotate: isOpen ? 45 : 0 }} 
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default BottomBar;
