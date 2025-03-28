"use client";
import React, { useRef, useState, useEffect } from "react";
// Keeping this import for component registration, but not using motion features directly
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { motion } from "framer-motion";

// Simplified version without useTransform which is causing issues
export const ContainerScroll = ({
  titleComponent,
  children,
  mobileHeight,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  mobileHeight?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate scroll ratio manually instead of using useScroll
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Calculate values directly from scroll ratio
  const calculateValues = () => {
    // Map scroll ratio (0-0.5) to rotation (15/30-0)
    const rotateValue = isMobile 
      ? 15 * (1 - (scrollRatio * 2)) 
      : 30 * (1 - (scrollRatio * 2));
    
    // Map scroll ratio to scale
    const scaleValue = isMobile
      ? 0.7 + (scrollRatio * 2 * 0.2) // 0.7 to 0.9
      : 1.05 - (scrollRatio * 2 * 0.05); // 1.05 to 1
    
    // Map scroll ratio to translateY
    const translateValue = -50 * scrollRatio * 2; // 0 to -50
    
    return { rotateValue, scaleValue, translateValue };
  };

  const { rotateValue, scaleValue, translateValue } = calculateValues();
  const mobileStyle = isMobile && mobileHeight ? { height: mobileHeight } : {};

  return (
    <div
      ref={containerRef}
      className="h-[30rem] md:aspect-[16/8.5] md:h-auto flex items-center justify-center relative p-2 md:p-5 w-full"
      style={mobileStyle}
    >
      <div
        className="py-5 md:py-2 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <div 
          className="max-w-5xl mx-auto text-center"
          style={{ transform: `translateY(${translateValue}px)` }}
        >
          {titleComponent}
        </div>
        <div
          className="w-full h-[30rem] md:h-auto md:aspect-[16/9] bg-[#222222] rounded-[30px] p-2 md:p-8 overflow-hidden"
          style={{
            transform: `rotateX(${rotateValue}deg) scale(${scaleValue})`,
            boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Keep these interfaces for compatibility, but implement them without the problematic hooks
export const Header = ({ 
  titleComponent 
}: {
  translate?: unknown; // Marked as optional but kept for compatibility
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <div className="max-w-5xl mx-auto text-center">
      {titleComponent}
    </div>
  );
};

export const Card = ({ 
  children,
}: { 
  rotate?: unknown; // All made optional but kept for compatibility
  scale?: unknown;
  translate?: unknown;
  children: React.ReactNode;
  mobileHeight?: string;
}) => {
  return (
    <div className="w-full h-[30rem] md:h-auto md:aspect-[16/9] bg-[#222222] rounded-[30px] p-2 md:p-8 overflow-hidden">
      {children}
    </div>
  );
}; 