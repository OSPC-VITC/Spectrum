'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
import { useScrollPosition } from '@/lib/scroll-manager';

const navItems = [
  { name: 'About Us', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Judges', href: '#judges' },
  { name: 'Organisers', href: '#organisers' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Contact Us', href: '#contact' },
];

// Throttle function - keeping for future use but suppressing the unused variable warning
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, limit: number) => {
  let lastFunc: number;
  let lastRan: number;
  return ((...args: Parameters<T>) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = window.setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  }) as T;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const inThrottle = useRef<boolean>(false);

  // Use the optimized scroll position hook instead of window event listeners
  useScrollPosition((scrollY) => {
    // Update navbar background
    setScrolled(scrollY > 20);
    
    // Throttle section checks to improve performance
    requestAnimationFrame(() => {
      checkActiveSection();
    });
  });
  
  // Function to determine active section
  const checkActiveSection = useCallback(() => {
    if (!inThrottle.current) {
      inThrottle.current = true;
      
      // Check section positions safely
      try {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        let activeId = '';
        for (const section of sections) {
          const htmlSection = section as HTMLElement;
          if (htmlSection.offsetTop <= scrollPosition && 
              htmlSection.offsetTop + htmlSection.offsetHeight > scrollPosition) {
            activeId = section.id;
            break;
          }
        }
        
        if (activeId && activeId !== activeSection) {
          setActiveSection(activeId);
        }
      } catch (error) {
        console.error('Error checking active section:', error);
      }
      
      // Reset throttle flag after delay
      setTimeout(() => { 
        inThrottle.current = false;
      }, 100);
    }
  }, [activeSection]);
  
  // Desktop navigation handler - optimized version
  const handleScroll = useCallback((e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Small delay to allow UI to update
    requestAnimationFrame(() => {
      smoothScrollToSection(targetId);
      setActiveSection(targetId);
    });
  }, []);

  // Dedicated mobile navigation handler with longer delay - optimized version
  const handleMobileNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // First close the mobile menu
    setIsOpen(false);
    
    // Then scroll to the section after a delay to allow menu animation to complete
    setTimeout(() => {
      requestAnimationFrame(() => {
        smoothScrollToSection(targetId);
        setActiveSection(targetId);
      });
    }, 300);
  }, []);

  // Load Devfolio script
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

  // Animation variants for the mobile menu
  const menuVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const menuButtonVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

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
                data-button-theme="dark"
                style={{ height: '44px', width: '312px' }}
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
              aria-expanded={isOpen}
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
          <>
            {/* Add a touch-friendly overlay to close the menu */}
            <motion.div
              key="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-x-0 top-16 bg-black/90 backdrop-blur-lg z-50 border-t border-purple-900/30 max-h-[80vh] overflow-y-auto"
            >
              <motion.div 
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                variants={menuVariants}
                initial="hidden"
                animate="show"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleMobileNavClick(e, item.href)}
                    variants={menuItemVariants}
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
                  variants={menuButtonVariants}
                  className="px-4 py-4"
                >
                  <div 
                    className="apply-button" 
                    data-hackathon-slug="spectrum25" 
                    data-button-theme="light"
                    style={{ height: '44px', width: '312px' }}
                  ></div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}