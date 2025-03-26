"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

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
  
  // Change offset to ensure animation triggers when component is in view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  });
  
  const [isMobile, setIsMobile] = useState(false);

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

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // More pronounced initial tilt (40 degrees) that ends at 0 degrees when scrolled
  const rotate = useTransform(scrollYProgress, [0, 0.5], isMobile ? [5, 0] : [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Set mobile height style if provided
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
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} mobileHeight={mobileHeight} isMobile={isMobile}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ 
  translate, 
  titleComponent 
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
  mobileHeight,
  isMobile,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  mobileHeight?: string;
  isMobile?: boolean;
}) => {
  // Calculate appropriate height for the card when in mobile
  const mobileCardHeight = isMobile && mobileHeight ? 
    { height: `calc(${mobileHeight})` } : {};

  return (
    <motion.div
      style={{
        rotateX: rotate, // This controls the tilting effect
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        ...mobileCardHeight,
        transformOrigin: isMobile ? "center bottom" : "center center", // Changed origin point for mobile
        transformStyle: "preserve-3d", // Enable 3D effects
      }}
      className="max-w-6xl mt-0 md:-mt-0 mx-auto h-[20rem] md:aspect-[16/8.5] md:h-auto w-[98%] border-2 border-purple-500/30 p-1 md:p-2 bg-black/90 rounded-[20px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-lg bg-black md:rounded-lg md:p-2">
        {children}
      </div>
    </motion.div>
  );
}; 