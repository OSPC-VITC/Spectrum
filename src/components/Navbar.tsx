'use client';

import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, smoothScrollToSection } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'About Us', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Organisers', href: '#organisers' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Contact Us', href: '#contact' },
];

// Throttle function to limit the rate at which a function can fire
const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, limit: number) => {
  let inThrottle = false;
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    smoothScrollToSection(targetId);
    setIsOpen(false);
    setActiveSection(targetId);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleScrollSpy = useCallback(() => {
    // Check if scrolled past a threshold to change navbar style
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    
    // Skip scroll spy if menu is open or on mobile
    if (isOpen || window.innerWidth <= 768) return;

    const sections = navItems.map(item => item.href.replace('#', ''));
    let currentSection = '';

    // Find the current section
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section;
          break;
        }
      }
    }
    
    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection, isOpen]);

  useEffect(() => {
    const throttledScrollSpy = throttle(handleScrollSpy, 200);
    window.addEventListener('scroll', throttledScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollSpy);
  }, [handleScrollSpy]);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-black/70 backdrop-blur-md shadow-lg" 
          : "bg-black/30 backdrop-blur-[2px]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <button
            className="flex items-center space-x-2"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              // Reset section fade effects
              document.querySelectorAll('section[id]').forEach(section => {
                section.classList.remove('section-fade-out');
                section.classList.add('section-fade-in');
              });
            }}
          >
            <Image 
              src="/logo.png" 
              alt="Spectrum Logo" 
              width={140} 
              height={40} 
              className="h-10 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            <TooltipProvider>
              {navItems.map((item, index) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "relative px-3 py-2 rounded-md text-sm font-medium",
                          activeSection === item.href.replace('#', '')
                            ? "text-purple-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-blue-500"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        )}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleScroll(e, item.href)}
                      >
                        <span className="z-10">{item.name}</span>
                        {activeSection === item.href.replace('#', '') && (
                          <div className="absolute inset-0 bg-purple-900/20 rounded-md backdrop-blur-sm" />
                        )}
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-black/80 backdrop-blur-md border-purple-800/50 text-white">
                    Navigate to {item.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="ml-4"
            >
              <div 
                className="apply-button" 
                data-hackathon-slug="spectrum25" 
                data-button-theme="light"
                style={{ height: '44px', width: '180px' }}
              ></div>
            </motion.div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white hover:bg-purple-900/20 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-16 bg-black/90 backdrop-blur-lg z-50 border-t border-purple-900/30"
          >
            <motion.div 
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                  className={cn(
                    "block w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors duration-200",
                    activeSection === item.href.replace('#', '')
                      ? "text-white bg-purple-900/30 border-l-2 border-purple-400"
                      : "text-gray-300 hover:bg-black/40 hover:text-white"
                  )}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                className="px-4 py-4"
              >
                <div 
                  className="apply-button" 
                  data-hackathon-slug="spectrum25" 
                  data-button-theme="light"
                  style={{ height: '44px', width: '100%' }}
                ></div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}