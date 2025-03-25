"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { ParallaxStars } from '@/components/ui/parallax-stars';
import { motion } from 'framer-motion';

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
    <AuroraBackground className="w-full overflow-hidden bg-black pt-20">
      {/* Parallax Stars Background - Hidden on mobile */}
      <div className="hidden md:block">
        <ParallaxStars />
      </div>
      
      {/* SVG filter for timer containers */}
      <svg className="hidden">
        <filter id="unopaq">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 3 0"
          ></feColorMatrix>
        </filter>
      </svg>
      
      {/* Main content */}
      <motion.div 
        className={`relative z-20 w-full h-full flex flex-col items-center justify-start px-4 md:px-8`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Logo/title centered with enhanced styling and increased size */}
        <div className="w-full text-center mb-14 md:mb-20 relative pt-6 md:pt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-radial from-purple-600/30 via-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          
          <h1 className="text-7xl md:text-9xl lg:text-9xl font-black tracking-tight relative inline-block">
            <Image
              className="w-[400px] md:w-[700px] lg:w-[800px] drop-shadow-2xl transform transition-all duration-700 hover:scale-105 -mt-16 md:mt-0"
              src="/logo.png"
              alt="Hackathon Logo"
              width={800}
              height={800}
            />
            {/* Enhanced animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-blue-500/40 to-cyan-400/40 rounded-lg blur-3xl opacity-70 animate-pulse"></div>
          </h1>
          
          {/* Tagline with animation */}
          <p className="text-white mt-0 md:mt-4 font-light tracking-wider text-2xl md:text-xl animate-fadeIn">Not Your Average Hackathon! <br />Innovate Through Dimensions!</p>
        </div>
        
        <div className="w-full max-w-4xl flex flex-col items-center justify-center">
          <div className="grid grid-cols-4 gap-4 md:gap-8 text-center">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="timer-container">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="timer-content p-4 flex items-center justify-center">
                  <span className="text-4xl font-mono font-bold text-white">
                    {countdown.days.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-sm text-white uppercase tracking-wider mt-2">Days</span>
            </div>
            
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="timer-container">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="timer-content p-4 flex items-center justify-center">
                  <span className="text-4xl font-mono font-bold text-white">
                    {countdown.hours.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-sm text-white uppercase tracking-wider mt-2">Hours</span>
            </div>
            
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="timer-container">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="timer-content p-4 flex items-center justify-center">
                  <span className="text-4xl font-mono font-bold text-white">
                    {countdown.minutes.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-sm text-white uppercase tracking-wider mt-2">Minutes</span>
            </div>
            
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="timer-container">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="timer-content p-4 flex items-center justify-center">
                  <span className="text-4xl font-mono font-bold text-white">
                    {countdown.seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              <span className="text-sm text-white uppercase tracking-wider mt-2">Seconds</span>
            </div>
          </div>
          
          {/* Event date */}
          <div className="mt-6 text-center">
            <span className="text-white text-lg">
              April 11-12, 2025
            </span>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .timer-container {
          position: relative;
          background: #111;
          width: 100%;
          min-height: 85px;
          aspect-ratio: 1;
        }

        .timer-content {
          position: relative;
          z-index: 1;
          color: white;
          width: 100%;
          height: 100%;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --t: -40px;
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
          filter: blur(4px) url(#unopaq);
          z-index: -2;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(10px) url(#unopaq);
          opacity: 0;
          z-index: -2;
          transition: 0.3s;
        }

        .timer-container:hover .a::after {
          opacity: 1;
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