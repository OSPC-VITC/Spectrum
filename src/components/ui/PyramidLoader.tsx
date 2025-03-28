'use client';

import React, { useEffect, useState } from 'react';

interface PyramidLoaderProps {
  onLoadComplete?: () => void;
  duration?: number;
}

export function PyramidLoader({ onLoadComplete, duration = 2000 }: PyramidLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run on mount and whenever window is resized
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set up the loader timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadComplete) onLoadComplete();
    }, duration);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [onLoadComplete, duration]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`pyramid-loader ${isMobile ? 'pyramid-loader-mobile' : ''}`}>
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>  
      </div>
      
      <style jsx>{`
        .pyramid-loader {
          position: relative;
          width: 300px;
          height: 300px;
          display: block;
          transform-style: preserve-3d;
          transform: rotateX(-20deg);
        }
        
        .pyramid-loader-mobile {
          width: 240px;
          height: 240px;
        }
        
        .wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: spin 4s linear infinite;
        }
        
        @keyframes spin {
          100% {
            transform: rotateY(360deg);
          }
        }
        
        @keyframes spin-mobile {
          100% {
            transform: rotateY(360deg);
          }
        }
        
        .pyramid-loader-mobile .wrapper {
          animation: spin-mobile 100s linear infinite;
        }
        
        .pyramid-loader .wrapper .side {
          width: 70px;
          height: 70px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform-origin: center top;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .pyramid-loader-mobile .wrapper .side {
          width: 65px;
          height: 65px;
        }
        
        .pyramid-loader .wrapper .side1 {
          transform: rotateZ(-30deg) rotateY(90deg);
          background: conic-gradient(#2BDEAC, #F028FD, #D8CCE6, #2F2585);
        }
        
        .pyramid-loader .wrapper .side2 {
          transform: rotateZ(30deg) rotateY(90deg);
          background: conic-gradient(#2F2585, #D8CCE6, #F028FD, #2BDEAC);
        }
        
        .pyramid-loader .wrapper .side3 {
          transform: rotateX(30deg);
          background: conic-gradient(#2F2585, #D8CCE6, #F028FD, #2BDEAC);
        }
        
        .pyramid-loader .wrapper .side4 {
          transform: rotateX(-30deg);
          background: conic-gradient(#2BDEAC, #F028FD, #D8CCE6, #2F2585);
        }
        
        .pyramid-loader .wrapper .shadow {
          width: 60px;
          height: 60px;
          background: #8B5AD5;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform: rotateX(90deg) translateZ(-40px);
          filter: blur(12px);
        }
        
        .pyramid-loader-mobile .wrapper .shadow {
          width: 55px;
          height: 55px;
          transform: rotateX(90deg) translateZ(-35px);
        }
      `}</style>
    </div>
  );
} 