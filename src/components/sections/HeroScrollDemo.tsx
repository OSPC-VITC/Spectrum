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
    <div className="relative w-full h-full">
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
        className="w-[85%] mx-auto"
        style={{ perspective: "1000px" }}
      >
        <motion.div 
          className="w-full bg-black/80 rounded-xl border-2 border-purple-500/30 shadow-2xl overflow-hidden"
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
          {videoContent}
        </motion.div>
      </div>
    );
  }

  // Desktop view - increased size while maintaining ratio
  return (
    <div 
      ref={containerRef}
      className="w-full mx-auto pb-16 -mt-8"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX: rotate,
          scale: scale,
          transformOrigin: "center 15%",
          transformStyle: "preserve-3d",
          width: "75%",
          margin: "0 auto",
          aspectRatio: "16/9",
          maxHeight: "550px",
        }}
        className="bg-black/80 rounded-xl border-2 border-purple-500/30 shadow-2xl overflow-hidden"
      >
        {videoContent}
      </motion.div>
    </div>
  );
} 