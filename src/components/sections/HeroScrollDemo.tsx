"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";

// Preserving the original implementation with the tilt effect, but fixing the cutting issue 
export function HeroScrollDemo() {
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Trigger scroll events to ensure animations work properly
    const triggerScrollEvents = () => {
      window.dispatchEvent(new Event('scroll'));
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 200);
    };
    
    triggerScrollEvents();
    window.addEventListener('resize', triggerScrollEvents);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener('resize', triggerScrollEvents);
    };
  }, []);

  // Increased tilt for both mobile and desktop
  const rotate = useTransform(scrollYProgress, [0, 0.5], isMobile ? [35, 0] : [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.05]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Common iframe and mute button for both mobile and desktop
  const videoContent = (
    <div className="relative w-full h-full video-content">
      <iframe
        src={`https://www.youtube.com/embed/YzFK7x_LGKk?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&controls=0&showinfo=0&rel=0&playlist=YzFK7x_LGKk&enablejsapi=1`}
        title="Hackathon Showcase"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="w-full h-full"
        style={{ border: 'none' }}
      ></iframe>
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </button>
    </div>
  );

  if (isMobile) {
    // Mobile view - maintain current size with tilt
    return (
      <div 
        ref={containerRef}
        className="w-[90%] mx-auto"
        style={{ perspective: "1000px" }}
      >
        <motion.div 
          className="w-full bg-black/80 overflow-hidden video-container"
          style={{
            aspectRatio: "16/9", 
            maxHeight: "220px",
            rotateX: rotate,
            scale: scale,
            transformOrigin: "center 15%",
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0.6, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="a l"></div>
          <div className="a r"></div>
          <div className="a t"></div>
          <div className="a b"></div>
          {videoContent}
        </motion.div>
        
        {/* SVG filter for animated borders */}
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

        <style jsx>{`
          .video-container {
            position: relative;
            transition: all 0.3s ease;
            box-shadow: 0 15px 35px -12px rgba(0, 0, 0, 0.9);
          }

          .video-content {
            position: relative;
            z-index: 1;
          }

          .a {
            pointer-events: none;
            position: absolute;
            --w: 2.5px;
            --t: -20px;
            --s: calc(var(--t) * -1);
            --e: calc(100% + var(--t));
            --g: #fff0, #fff5 var(--s), #fffc var(--s), #fff, #fffc var(--e),
              #fff5 var(--e), #fff0;
            z-index: 30;
          }

          .a::before {
            content: "";
            position: absolute;
            inset: 0;
            background: inherit;
            filter: blur(3px) url(#unopaq);
            z-index: 25;
          }

          .a::after {
            content: "";
            position: absolute;
            inset: 0;
            background: inherit;
            filter: blur(8px) url(#unopaq);
            opacity: 0;
            z-index: 25;
            transition: 0.3s;
          }

          .video-container:hover .a::after {
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
      </div>
    );
  }

  // Desktop view - reduced size but maintaining ratio and preventing cutting
  return (
    <div 
      ref={containerRef}
      className="w-full mx-auto pt-8 pb-16" // Added padding top and bottom to prevent cutting
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX: rotate,
          scale: scale,
          transformOrigin: "center 35%",
          transformStyle: "preserve-3d",
          width: "78%", // Increased from 68%
          margin: "0 auto",
          aspectRatio: "16/9",
          maxHeight: "566px", // Increased from 500px
        }}
        className="bg-black/80 overflow-hidden video-container"
      >
        <div className="a l"></div>
        <div className="a r"></div>
        <div className="a t"></div>
        <div className="a b"></div>
        {videoContent}
      </motion.div>
      
      {/* SVG filter for animated borders */}
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

      <style jsx>{`
        .video-container {
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9);
        }

        .video-content {
          position: relative;
          z-index: 1;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2.5px;
          --t: -20px;
          --s: calc(var(--t) * -1);
          --e: calc(100% + var(--t));
          --g: #fff0, #fff5 var(--s), #fffc var(--s), #fff, #fffc var(--e),
            #fff5 var(--e), #fff0;
          z-index: 30;
        }

        .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(3px) url(#unopaq);
          z-index: 25;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(8px) url(#unopaq);
          opacity: 0;
          z-index: 25;
          transition: 0.3s;
        }

        .video-container:hover .a::after {
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
    </div>
  );
} 