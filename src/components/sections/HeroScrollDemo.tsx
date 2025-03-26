"use client";
import React, { useEffect, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export function HeroScrollDemo() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Function to trigger scroll events to ensure animations work properly
    const triggerScrollEvents = () => {
      // Initial scroll event to calculate positions
      window.dispatchEvent(new Event('scroll'));
      
      // Additional scroll events to handle animations during scrolling
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 200);
    };
    
    // Trigger on load and resize
    triggerScrollEvents();
    window.addEventListener('resize', triggerScrollEvents);
    window.addEventListener('scroll', () => {
      // This helps smooth out the animation during actual scrolling
    }, { passive: true });
    
    return () => {
      window.removeEventListener('resize', triggerScrollEvents);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col overflow-hidden w-[98%] md:w-[75%] mx-auto">
      <ContainerScroll
        titleComponent={<></>}
        mobileHeight="220px"
      >
        <div className="relative w-full h-full flex items-center justify-center bg-black/80 rounded-xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/YzFK7x_LGKk?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&controls=0&showinfo=0&rel=0&playlist=YzFK7x_LGKk&enablejsapi=1`}
            title="Hackathon Showcase"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-full h-full absolute top-0 left-0 bottom-0 right-0"
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
      </ContainerScroll>
    </div>
  );
} 