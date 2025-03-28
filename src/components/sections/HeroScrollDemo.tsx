"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

// Simplified version without problematic framer-motion hooks
export function HeroScrollDemo() {
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Calculate scroll ratio manually
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const offsetTop = rect.top;
      const windowHeight = window.innerHeight;
      
      // Calculate progress (0 to 1 as element transitions from bottom to top of viewport)
      let progress = 1 - (offsetTop / windowHeight);
      progress = Math.max(0, Math.min(0.5, progress));
      
      setScrollRatio(progress);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if the device is mobile
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

  // Setup YouTube API
  useEffect(() => {
    // Add YouTube API script if it doesn't exist
    const windowWithYT = window as unknown as { YT?: unknown };
    if (!windowWithYT.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
    
    // Ensure iframe has correct API initialization
    const iframe = iframeRef.current;
    if (iframe && iframe.src.indexOf('enablejsapi=1') === -1) {
      iframe.src += iframe.src.indexOf('?') === -1 ? '?enablejsapi=1' : '&enablejsapi=1';
    }
  }, []);

  // Calculate transform values based on scroll ratio
  const getTransformValues = () => {
    // Map scroll ratio (0-0.5) to rotation (35/30-0)
    const rotateValue = isMobile 
      ? 35 * (1 - (scrollRatio * 2)) 
      : 30 * (1 - (scrollRatio * 2));
    
    // Map scroll ratio to scale
    const scaleValue = 0.95 + (scrollRatio * 2 * 0.1); // 0.95 to 1.05
    
    return { rotateValue, scaleValue };
  };

  const { rotateValue, scaleValue } = getTransformValues();

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      const iframe = iframeRef.current as HTMLIFrameElement;
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: !isMuted ? "mute" : "unMute",
          }),
          "*"
        );
      }
    }
  };

  const videoContent = (
    <div className="relative overflow-hidden w-full h-full">
      <iframe
        ref={iframeRef}
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/YzFK7x_LGKk?autoplay=1&mute=0&controls=0&loop=1&modestbranding=1&showinfo=0&enablejsapi=1&playlist=YzFK7x_LGKk&playsinline=1`}
        allow="autoplay; encrypted-media; microphone; camera; fullscreen"
        allowFullScreen
      ></iframe>
      <div className="absolute bottom-2 right-2 text-2xl bg-black/50 p-2 rounded-full backdrop-blur-sm cursor-pointer z-10"
        onClick={toggleMute}>
        {isMuted ? <FaVolumeMute className="text-white" /> : <FaVolumeUp className="text-white" />}
      </div>
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
        <div 
          className="w-full bg-black/80 overflow-hidden video-container"
          style={{
            aspectRatio: "16/9", 
            maxHeight: "180px",
            transform: `rotateX(${rotateValue}deg) scale(${scaleValue})`,
            transformOrigin: "center 15%",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="a l"></div>
          <div className="a r"></div>
          <div className="a t"></div>
          <div className="a b"></div>
          {videoContent}
        </div>
        
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

  // Desktop view - large immersive view with tilt
  return (
    <div 
      ref={containerRef}
      className="w-full py-6"
      style={{ perspective: "1000px" }}
    >
      <div
        className="mx-auto w-full max-w-5xl overflow-hidden video-container"
        style={{
          aspectRatio: "16/9",
          transform: `rotateX(${rotateValue}deg) scale(${scaleValue})`,
          transformOrigin: "center 15%",
          transformStyle: "preserve-3d",
          maxHeight: "80vh",
        }}
      >
        <div className="a l"></div>
        <div className="a r"></div>
        <div className="a t"></div>
        <div className="a b"></div>
        {videoContent}
      </div>
      
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