'use client';

import React, { useState } from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type TrackWithSingleImage = {
  title: string;
  description: string;
  outcome: string;
  image: string;
  images?: never;
};

type TrackWithDualImages = {
  title: string;
  description: string;
  outcome: string;
  image?: never;
  images: { left: string; right: string };
};

type Track = TrackWithSingleImage | TrackWithDualImages;

export default function TracksSection() {
  const tracks: Track[] = [
    {
      title: "Blockchain & Decentralized Solutions",
      description: "Foster entrepreneurship through blockchain-driven, secure, and transparent business solutions.",
      outcome: "Innovative solutions in finance, governance, and digital security.",
      image: "/tracks/block.jpg"
    },
    {
      title: "AgriTech & MedTech",
      description: "Encourage entrepreneurial innovation in agriculture and healthcare using AI and IoT.",
      outcome: "Enhanced food security, precision farming, and accessible healthcare.",
      images: {
        left: "/tracks/agri.jpg",
        right: "/tracks/med.png"
      }
    },
    {
      title: "EdTech & Smart Learning",
      description: "Promote entrepreneurship in education through AI-driven and adaptive learning technologies.",
      outcome: "Improved learning accessibility, engagement, and skill development.",
      image: "/tracks/ed.avif"
    },
    {
      title: "Sustainability & Social Well-Being",
      description: "Inspire entrepreneurship for sustainability-focused and socially impactful tech solutions.",
      outcome: "Advancements in environmental conservation, clean energy, and social well-being.",
      images: {
        left: "/tracks/sust.webp",
        right: "/tracks/soc.jpg"
      }
    },
    {
      title: "IoT & Smart Technologies",
      description: "Enable entrepreneurship in smart tech through AI-powered, connected, and intelligent devices.",
      outcome: "Smarter automation, predictive analytics, and efficient infrastructure.",
      image: "/tracks/iot.jpg"
    },
    {
      title: "Open Innovation",
      description: "Cultivate an entrepreneurial mindset for groundbreaking, cross-domain tech innovations.",
      outcome: "Disruptive solutions addressing real-world challenges creatively.",
      image: "/tracks/open.jpg"
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const trackVariants = {
    expanded: (i: number) => ({
      flex: i === activeIndex ? 10 : 1,
      transition: {
        flex: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }
    }),
    collapsed: { 
      flex: 1,
      transition: {
        flex: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const titleVariants = {
    vertical: { 
      writingMode: "vertical-rl" as const,
      rotate: 180,
      x: "0%",
      textAlign: "center" as const,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    horizontal: { 
      writingMode: "horizontal-tb" as const,
      rotate: 0,
      x: "0%",
      textAlign: "left" as const,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section id="tracks" className="min-h-screen py-16 text-white bg-black">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mb-6 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
            <span className="text-white">SPECTRUM </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">TRACKS</span>
          </h2>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "8rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Desktop View */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden sm:flex h-[450px] gap-2 max-w-[95vw] lg:max-w-6xl mx-auto"
        >
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              custom={index}
              variants={trackVariants}
              initial="collapsed"
              animate="expanded"
              className="relative overflow-hidden bg-[#111] flex-1 cursor-pointer track-container"
              style={{ flexGrow: index === activeIndex ? 10 : 1 }}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>
              
              {/* Background images */}
              {'images' in track ? (
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 w-1/2 h-full">
                    <OptimizedImage
                      src={track.images!.left}
                      alt={`${track.title} - Left`}
                      fill
                      className="object-cover"
                      style={{
                        opacity: index === activeIndex ? 0.9 : 0.7,
                        filter: index === activeIndex ? 'brightness(0.9)' : 'brightness(0.7)',
                        objectPosition: track.title === "AgriTech & MedTech" ? '85% center' : 
                                       track.title === "Sustainability & Social Well-Being" ? 'center center' : 'center'
                      }}
                      mobileQuality={60}
                      desktopQuality={85}
                      priority={index === 0}
                    />
                  </div>
                  <div className="absolute right-0 w-1/2 h-full">
                    <OptimizedImage
                      src={track.images!.right}
                      alt={`${track.title} - Right`}
                      fill
                      className="object-cover"
                      style={{
                        opacity: index === activeIndex ? 0.9 : 0.7,
                        filter: index === activeIndex ? 'brightness(0.9)' : 'brightness(0.7)',
                        objectPosition: track.title === "AgriTech & MedTech" ? '95% center' : 
                                     track.title === "Sustainability & Social Well-Being" ? 'center center' : 'center'
                      }}
                      mobileQuality={60}
                      desktopQuality={85}
                      priority={index === 0}
                    />
                  </div>
                </div>
              ) : (
                <OptimizedImage
                  src={track.image}
                  alt={track.title}
                  fill
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                    opacity: index === activeIndex ? 0.9 : 0.7,
                    filter: index === activeIndex ? 'brightness(0.9)' : 'brightness(0.7)'
                  }}
                  mobileQuality={60}
                  desktopQuality={85}
                  priority={index === 0}
                />
              )}

              {/* Gradient overlay */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: index === activeIndex 
                    ? 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
                }}
              ></div>

              {/* Desktop View Content */}
              <div className={cn(
                "relative z-20 h-full p-6 flex flex-col",
                index === activeIndex ? "justify-between" : "justify-start"
              )}>
                <motion.h3 
                  variants={titleVariants}
                  initial="vertical"
                  animate={index === activeIndex ? "horizontal" : "vertical"}
                  className="font-['Megrim'] text-sm md:text-lg uppercase tracking-wider font-medium text-white mb-2"
                  style={{
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 2px 5px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  {track.title}
                </motion.h3>

                <AnimatePresence>
                  {index === activeIndex && (
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                      className="mt-auto"
                    >
                      <Badge className="bg-purple-600/80 hover:bg-purple-600 mb-3">Track {index + 1}</Badge>
                      <p className="text-sm leading-tight text-gray-200 mb-3">{track.description}</p>
                      <p className="text-sm leading-tight text-purple-300">
                        <span className="font-semibold">Outcome:</span> {track.outcome}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View */}
        <div className="sm:hidden space-y-6 max-w-md mx-auto">
          {tracks.map((track, index) => (
            <motion.div 
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                height: index === activeIndex ? 400 : 70 
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="track-container bg-[#111] overflow-hidden relative cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <div className="a l"></div>
              <div className="a r"></div>
              <div className="a t"></div>
              <div className="a b"></div>

              {/* Content layer */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Title always at top */}
                <h3 className="font-['Megrim'] text-base sm:text-lg uppercase tracking-wider font-medium text-white mb-2"
                  style={{
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 2px 5px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  {track.title}
                </h3>

                {/* Expandable content */}
                <AnimatePresence>
                  {index === activeIndex && (
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="flex-grow flex flex-col justify-end"
                    >
                      {/* All content at bottom */}
                      <div className="mt-auto">
                        <Badge className="bg-purple-600/80 hover:bg-purple-600 w-fit mb-3">Track {index + 1}</Badge>
                        <p className="text-sm leading-tight text-gray-200 mb-3">{track.description}</p>
                        <p className="text-sm leading-tight text-purple-300">
                          <span className="font-semibold">Outcome:</span> {track.outcome}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Background image with overlay */}
              <div className="absolute inset-0 z-0">
                {'images' in track ? (
                  <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 w-1/2 h-full">
                      <OptimizedImage
                        src={track.images!.left}
                        alt={`${track.title} - Left`}
                        fill
                        className="object-cover"
                        style={{
                          opacity: 0.7,
                          filter: 'brightness(0.7)'
                        }}
                        mobileQuality={60}
                        desktopQuality={85}
                      />
                    </div>
                    <div className="absolute right-0 w-1/2 h-full">
                      <OptimizedImage
                        src={track.images!.right}
                        alt={`${track.title} - Right`}
                        fill
                        className="object-cover"
                        style={{
                          opacity: 0.7,
                          filter: 'brightness(0.7)'
                        }}
                        mobileQuality={60}
                        desktopQuality={85}
                      />
                    </div>
                  </div>
                ) : (
                  <OptimizedImage
                    src={track.image}
                    alt={track.title}
                    fill
                    className="object-cover"
                    style={{
                      opacity: 0.7,
                      filter: 'brightness(0.7)'
                    }}
                    mobileQuality={60}
                    desktopQuality={85}
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SVG filter for animated borders - same as used in FAQs */}
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
        .track-container {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .track-container:hover {
          transform: translateY(-2px);
        }

        .track-container::before {
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
          z-index: 5;
        }

        .track-container:hover::before {
          opacity: 0.4;
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

        .track-container:hover .a::after {
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
    </section>
  );
}