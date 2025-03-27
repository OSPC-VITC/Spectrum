'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';
import Image from 'next/image';

// Image URLs from your request
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const COVERS = [
  "https://i.scdn.co/image/ab67616d00001e020ecc8c4fd215d9eb83cbfdb3",
  "https://i.scdn.co/image/ab67616d00001e02d9194aa18fa4c9362b47464f",
  "https://i.scdn.co/image/ab67616d00001e02a7ea08ab3914c5fb2084a8ac",
  "https://i.scdn.co/image/ab67616d00001e0213ca80c3035333e5a6fcea59",
  "https://i.scdn.co/image/ab67616d00001e02df04e6071763615d44643725",
  "https://i.scdn.co/image/ab67616d00001e0239c7302c04f8d06f60e14403"
];

// Judge data
const JUDGES = [
  {
    name: "Mr. Senthil Nathan",
    image: "/judges/senthil.jpeg",
    role: "Head of Product, DevOps, IBM Z",
    linkedin: "https://www.linkedin.com/in/reachsenthilnathan/"
  },
  {
    name: "Mr. Suresh Kumar",
    image: "/judges/suresh.png",
    role: "Senior Specialist, PayPal",
    linkedin: "https://www.linkedin.com/in/suresh-kumar-c-56083a135/"
  },
  {
    name: "Mr. Abdul Hadi",
    image: "/judges/abdul.jpeg",
    role: "Senior Software Engineer, PayPal",
    linkedin: "https://www.linkedin.com/in/abdul-hadi-n-66792b22/"
  },
  {
    name: "Mrs. Janani",
    image: "/judges/janani.jpeg",
    role: "Technical Evangelist, PayPal",
    linkedin: "https://www.linkedin.com/in/janani-velmurugan-b9214521/"
  },
  {
    name: "Mr. Santhosh Kumar",
    image: "/judges/santosh.jpeg",
    role: "Compliance Lead, PayPal",
    linkedin: "https://www.linkedin.com/in/santhosh-kumar-profile/"
  },
  {
    name: "Mr. Ajith M",
    image: "/judges/ajith.jpeg",
    role: "Lead Analytics professional, PayPal",
    linkedin: "https://www.linkedin.com/in/ajith-m-97278b147/"
  }
];

export default function JudgesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const nextJudge = () => {
    setActiveIndex((prev) => (prev + 1) % JUDGES.length);
  };

  const prevJudge = () => {
    setActiveIndex((prev) => (prev - 1 + JUDGES.length) % JUDGES.length);
  };

  // Calculate position for each album cover
  const getPositionStyles = (index: number) => {
    const diff = (index - activeIndex + JUDGES.length) % JUDGES.length;
    
    // Adjust these values to control the carousel appearance
    let zIndex = 6 - diff;
    let xPos = 0;
    let yPos = 0;
    let scale = 1;
    let rotate = 0;
    let opacity = 1;
    
    if (diff === 0) { // Active item
      xPos = 0;
      scale = 1;
      zIndex = 100;
      opacity = 1;
    } else if (diff === 1 || diff === JUDGES.length - 1) { // Items to left and right
      xPos = diff === 1 ? (isMobile ? 220 : 320) : (isMobile ? -220 : -320);
      yPos = isMobile ? 30 : 0;
      scale = isMobile ? 0.7 : 0.85;
      opacity = isMobile ? 0.5 : 0.8;
      rotate = diff === 1 ? 15 : -15;
      zIndex = isMobile ? 5 : 20;
    } else if (diff === 2 || diff === JUDGES.length - 2) { // Items further out
      xPos = diff === 2 ? (isMobile ? 320 : 520) : (isMobile ? -320 : -520);
      yPos = isMobile ? 50 : 10;
      scale = isMobile ? 0.5 : 0.7;
      opacity = isMobile ? 0.2 : 0.6;
      rotate = diff === 2 ? 30 : -30;
      zIndex = isMobile ? 1 : 10;
    } else { // Hide the rest
      opacity = 0;
      scale = 0.5;
      xPos = diff < JUDGES.length / 2 ? (isMobile ? 350 : 700) : (isMobile ? -350 : -700);
      zIndex = 1;
    }
    
    return {
      zIndex,
      x: xPos,
      y: yPos,
      scale,
      rotateY: rotate,
      opacity
    };
  };

  // Additional style properties that don't need to be animated
  const getAdditionalStyles = (index: number) => {
    const isActive = index === activeIndex;
    
    // Define styles with proper TypeScript typing for Framer Motion
    const styles: React.CSSProperties = {
      position: 'absolute',
      transformOrigin: 'center center',
      perspective: 1200,
      willChange: 'transform, opacity, z-index',
      pointerEvents: 'auto',
      isolation: isActive ? 'isolate' : 'auto',
      filter: isActive ? 'none' : (isMobile ? 'brightness(0.7) blur(1px)' : 'brightness(0.8)')
    };
    
    return styles;
  };

  return (
    <section id="judges" className="min-h-screen py-20 text-white relative overflow-hidden bg-black">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="mb-20 md:mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          <h2 className="mb-10 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
            <span className="text-white">MEET OUR </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">JUDGES</span>
          </h2>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "8rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* 3D Album Carousel */}
        <div className="relative h-[450px] md:h-[550px] w-full perspective-1000px flex justify-center items-center mt-10" ref={containerRef}>
          <div className="relative h-full w-full transform-style-3d">
            {JUDGES.map((judge, index) => (
              <motion.div
                key={index}
                className={`absolute top-1/2 left-1/2 h-[350px] md:h-[500px] w-[250px] md:w-[320px] -translate-x-1/2 -translate-y-1/2 transform-style-3d cursor-pointer hover:z-[500] ${index === activeIndex ? 'active-card' : ''}`}
                animate={getPositionStyles(index)}
                transition={{
                  type: "spring",
                  stiffness: 270,
                  damping: 40,
                  mass: 1.2
                }}
                onClick={() => setActiveIndex(index)}
                whileHover={{
                  scale: index === activeIndex ? 1.05 : (isMobile ? 0.75 : 0.85),
                  opacity: index === activeIndex ? 1 : 0.85,
                }}
                style={getAdditionalStyles(index)}
              >
                <div 
                  className="relative w-full h-full rounded-none shadow-xl overflow-hidden card-container"
                  style={{ 
                    transformStyle: "preserve-3d",
                    boxShadow: index === activeIndex ? 
                      "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 15px rgba(124, 58, 237, 0.5)" : 
                      "0 20px 25px -5px rgba(0, 0, 0, 0.8)",
                    WebkitBoxReflect: index === activeIndex ? 
                      "below 0.5vmin linear-gradient(transparent 0 70%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0.3) 100%)" :
                      "none",
                    textAlign: "center",
                    objectPosition: judge.role === "Head of Product, DevOps, IBM Z" ? "85% center" : 
                                  judge.role === "Senior Specialist, PayPal" ? "center center" : "center"
                   }}
                >
                  <div className="a l"></div>
                  <div className="a r"></div>
                  <div className="a t"></div>
                  <div className="a b"></div>
                  <Image 
                    src={judge.image} 
                    alt={judge.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Judge Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white">{judge.name}</h3>
                    <p className="text-purple-300 text-lg">{judge.role}</p>
                    <a 
                      href={judge.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">View Profile</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Controls - positioned below carousel */}
        <div className="flex justify-center mt-8 md:mt-12 gap-12 md:gap-16 items-center">
          <button
            onClick={prevJudge}
            className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-900/60 hover:bg-purple-700/70 transition-colors border border-purple-500/50"
            aria-label="Previous judge"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={nextJudge}
            className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-900/60 hover:bg-purple-700/70 transition-colors border border-purple-500/50"
            aria-label="Next judge"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
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
        .card-container {
          position: relative;
          transition: all 0.3s ease;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --g: #fff0, rgba(168, 85, 247, 0.8) 50%, rgba(168, 85, 247, 0.8) 50%, #fff0;
          z-index: 30;
          filter: drop-shadow(0 0 5px rgba(168, 85, 247, 0.5));
        }

        .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: url(#unopaq);
          z-index: 25;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: url(#unopaq);
          opacity: 0;
          z-index: 25;
          transition: 0.3s;
        }

        .card-container:hover .a::after {
          opacity: 1;
        }

        .l {
          left: 0;
          background: linear-gradient(to bottom, 
            rgba(168, 85, 247, 0) 0%, 
            rgba(168, 85, 247, 1) 15%, 
            rgba(168, 85, 247, 1) 85%, 
            rgba(168, 85, 247, 0) 100%
          );
          top: 0;
          bottom: 0;
          width: var(--w);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
        }

        .r {
          right: 0;
          background: linear-gradient(to bottom, 
            rgba(168, 85, 247, 0) 0%, 
            rgba(168, 85, 247, 1) 15%, 
            rgba(168, 85, 247, 1) 85%, 
            rgba(168, 85, 247, 0) 100%
          );
          top: 0;
          bottom: 0;
          width: var(--w);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
        }

        .t {
          top: 0;
          background: linear-gradient(to right, 
            rgba(168, 85, 247, 0) 0%, 
            rgba(168, 85, 247, 1) 15%, 
            rgba(168, 85, 247, 1) 85%, 
            rgba(168, 85, 247, 0) 100%
          );
          left: 0;
          right: 0;
          height: var(--w);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
        }

        .b {
          bottom: 0;
          background: linear-gradient(to right, 
            rgba(168, 85, 247, 0) 0%, 
            rgba(168, 85, 247, 1) 15%, 
            rgba(168, 85, 247, 1) 85%, 
            rgba(168, 85, 247, 0) 100%
          );
          left: 0;
          right: 0;
          height: var(--w);
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
        }

        .card-container {
          border-radius: 0 !important;
        }

        .card-container > div:first-child {
          border-radius: 0 !important;
        }

        .card-container:hover {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }
      `}</style>
    </section>
  );
} 