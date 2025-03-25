"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { ParallaxStars } from '@/components/ui/parallax-stars';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// Define proper types for the component
interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const HeroSection: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate countdown to April 11, 2025
  useEffect(() => {
    const hackathonDate = new Date('April 11, 2025 09:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = hackathonDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
      
      if (distance < 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <AuroraBackground className="w-full overflow-hidden bg-black pt-4 pb-0 md:py-12 md:pt-4 h-[100vh] md:min-h-[90vh] flex flex-col justify-start md:justify-between">
      {/* Parallax Stars Background - Hidden on mobile */}
      <div className="hidden md:block">
        <ParallaxStars />
      </div>
      
      {/* SVG filter for timer containers */}
      <svg className="hidden">
        <filter id="unopaq" width="3000%" x="-1000%" height="3000%" y="-1000%">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 2 0"
          ></feColorMatrix>
        </filter>
      </svg>
      
      {/* Main content */}
      <motion.div 
        className={`relative z-20 w-full h-full flex flex-col items-center justify-between px-4 md:px-8 pt-2 md:pt-0 pb-4`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Logo/title centered with enhanced styling and increased size */}
        <div className="w-full text-center relative pt-0 md:pt-0 mb-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-radial from-purple-600/30 via-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          
          <h1 className="text-7xl md:text-9xl lg:text-9xl font-black tracking-tight relative inline-block mb-0">
            <Image
              className="w-[95vw] max-w-[500px] md:max-w-none md:w-[650px] lg:w-[750px] drop-shadow-2xl transform transition-all duration-700 hover:scale-105 mt-2 md:mt-0"
              src="/logo.png"
              alt="Hackathon Logo"
              width={1000}
              height={1000}
            />
            {/* Enhanced animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-blue-500/40 to-cyan-400/40 rounded-lg blur-3xl opacity-70 animate-pulse"></div>
          </h1>
          
          {/* Tagline with animation */}
          <p className="text-white -mt-6 md:-mt-12 lg:-mt-16 font-light tracking-wider text-xl md:text-xl animate-fadeIn">Not Your Average Hackathon! <br />Innovate Through Dimensions!</p>
        </div>
        
        {/* Main container with evenly distributed elements */}
        <div className="w-full flex-1 flex flex-col justify-evenly items-center">
          {/* Middle section with countdown */}
          <div className="w-full max-w-4xl flex flex-col items-center">
            <div className="grid grid-cols-4 gap-4 md:gap-8 text-center w-full px-2 md:px-0">
              {/* Days */}
              <div className="flex flex-col items-center w-full">
                <div className="timer-container w-full">
                  <div className="a l"></div>
                  <div className="a r"></div>
                  <div className="a t"></div>
                  <div className="a b"></div>
                  <div className="timer-content p-4 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-mono text-gray-200">
                      {countdown.days.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <span className="text-sm md:text-sm text-white uppercase tracking-wider mt-2">Days</span>
              </div>
              
              {/* Hours */}
              <div className="flex flex-col items-center w-full">
                <div className="timer-container w-full">
                  <div className="a l"></div>
                  <div className="a r"></div>
                  <div className="a t"></div>
                  <div className="a b"></div>
                  <div className="timer-content p-4 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-mono text-gray-200">
                      {countdown.hours.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <span className="text-sm md:text-sm text-white uppercase tracking-wider mt-2">Hours</span>
              </div>
              
              {/* Minutes */}
              <div className="flex flex-col items-center w-full">
                <div className="timer-container w-full">
                  <div className="a l"></div>
                  <div className="a r"></div>
                  <div className="a t"></div>
                  <div className="a b"></div>
                  <div className="timer-content p-4 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-mono text-gray-200">
                      {countdown.minutes.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <span className="text-sm md:text-sm text-white uppercase tracking-wider mt-2">Minutes</span>
              </div>
              
              {/* Seconds */}
              <div className="flex flex-col items-center w-full">
                <div className="timer-container w-full">
                  <div className="a l"></div>
                  <div className="a r"></div>
                  <div className="a t"></div>
                  <div className="a b"></div>
                  <div className="timer-content p-4 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-mono text-gray-200">
                      {countdown.seconds.toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <span className="text-sm md:text-sm text-white uppercase tracking-wider mt-2">Seconds</span>
              </div>
            </div>
          </div>
            
          {/* Event details and register button with equal spacing */}
          <div className="w-full flex flex-col items-center justify-center gap-0 md:gap-0 -mt-12 md:mt-0">
            {/* Calendar and Location Container - pushed up further in mobile */}
            <div className="flex flex-col items-center gap-3 md:gap-2">
              <motion.div 
                className="flex items-center justify-center space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <FaCalendarAlt className="text-purple-400 text-2xl md:text-2xl" />
                <span className="text-white text-xl md:text-xl font-medium">
                  April 11-12, 2025
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <FaMapMarkerAlt className="text-purple-400 text-2xl md:text-2xl" />
                <span className="text-white text-xl md:text-xl font-medium">
                  MG Auditorium, VIT Chennai
                </span>
              </motion.div>
            </div>
            
            {/* Register Button - separated to maintain spacing */}
            <motion.div
              className="mt-6 md:mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a 
                href="https://spectrum25.devfolio.co/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block relative group"
              >
                <div className="timer-container register-btn">
                  <div className="a l"></div>
                  <div className="a r"></div>
                  <div className="a t"></div>
                  <div className="a b"></div>
                  <div className="timer-content p-4 flex items-center justify-center">
                    <span className="text-xl md:text-2xl text-gray-200">
                      REGISTER NOW
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .timer-container {
          position: relative;
          cursor: pointer;
          background: #111;
          aspect-ratio: 1;
        }

        @media (max-width: 767px) {
          .timer-container {
            width: 100%;
            height: auto;
            min-width: calc(100% - 8px);
          }
        }

        @media (min-width: 768px) {
          .timer-container {
            min-height: 85px;
            max-height: 85px;
          }
        }

        .register-btn {
          min-height: auto;
          aspect-ratio: auto;
          width: 220px;
        }

        .timer-content {
          position: relative;
          z-index: 1;
          color: rgba(255, 255, 255, 0.85);
          width: 100%;
          height: 100%;
        }

        .timer-container::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(
              circle at 50% 50%,
              #0000 0,
              #0000 20%,
              #111111aa 50%
            ),
            radial-gradient(ellipse 100% 100%, #fff, #fff0);
          background-size:
            3px 3px,
            auto auto;
          transition: 0.3s;
        }

        .timer-container:hover::before {
          opacity: 0.2;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -20px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
            #fff3 var(--e), #fff0;
        }

        .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(2px) url(#unopaq);
          z-index: -2;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(6px) url(#unopaq);
          opacity: 0;
          z-index: -2;
          transition: 0.3s;
        }

        .timer-container:hover .a::after {
          opacity: 0.8;
        }

        .l {
          left: -2px;
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .r {
          right: -2px;
          background: linear-gradient(var(--g));
          top: var(--t);
          bottom: var(--t);
          width: var(--w);
        }

        .t {
          top: -2px;
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }

        .b {
          bottom: -2px;
          background: linear-gradient(90deg, var(--g));
          left: var(--t);
          right: var(--t);
          height: var(--w);
        }
      `}</style>
    </AuroraBackground>
  );
};

export default HeroSection;