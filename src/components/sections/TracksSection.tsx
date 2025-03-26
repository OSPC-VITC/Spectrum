'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
    <section id="tracks" className="min-h-screen py-16 bg-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Megrim'] text-6xl md:text-7xl lg:text-8xl text-white mb-2">TRACKS</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto"></div>
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
              className="relative overflow-hidden rounded-lg border border-purple-500/30 bg-black/80 backdrop-blur-sm flex-1 cursor-pointer"
              style={{ flexGrow: index === activeIndex ? 10 : 1 }}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Background images */}
              {'images' in track ? (
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 w-1/2 h-full">
                    <Image
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
                      priority={index === 0}
                    />
                  </div>
                  <div className="absolute right-0 w-1/2 h-full">
                    <Image
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
                      priority={index === 0}
                    />
                  </div>
                </div>
              ) : (
                <Image
                  src={track.image}
                  alt={track.title}
                  fill
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                    opacity: index === activeIndex ? 0.9 : 0.7,
                    filter: index === activeIndex ? 'brightness(0.9)' : 'brightness(0.7)'
                  }}
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
                      <p className="text-sm leading-tight text-gray-300 italic">
                        <span className="text-purple-300 font-semibold">Outcome:</span> {track.outcome}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" 
          className="sm:hidden flex flex-col gap-4 max-w-full px-4"
        >
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              layout
              className="relative overflow-hidden rounded-lg border border-purple-500/30 bg-black/80 backdrop-blur-sm cursor-pointer"
              animate={{ 
                height: index === activeIndex ? 400 : 80 
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setActiveIndex(index)}
            >
              {/* Background images */}
              {'images' in track ? (
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 w-1/2 h-full">
                    <Image
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
                      priority={index === 0}
                    />
                  </div>
                  <div className="absolute right-0 w-1/2 h-full">
                    <Image
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
                      priority={index === 0}
                    />
                  </div>
                </div>
              ) : (
                <Image
                  src={track.image}
                  alt={track.title}
                  fill
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                    opacity: index === activeIndex ? 0.9 : 0.7,
                    filter: index === activeIndex ? 'brightness(0.9)' : 'brightness(0.7)',
                    objectPosition: track.title === "IoT & Smart Technologies" ? '80% center' : 'center'
                  }}
                  priority={index === 0}
                />
              )}

              <div className="absolute inset-0 bg-black/50 z-10"></div>

              {/* Mobile Content */}
              <div className="relative z-20 flex flex-col h-full p-4">
                <AnimatePresence>
                  {index === activeIndex ? (
                    <motion.div
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="flex flex-col h-full"
                    >
                      <h3 className="font-['Megrim'] text-base sm:text-lg uppercase tracking-wider font-medium text-white mb-3"
                        style={{
                          textShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 2px 5px rgba(0, 0, 0, 0.9)'
                        }}
                      >
                        {track.title}
                      </h3>
                      <div className="mt-auto">
                        <Badge className="bg-purple-600/80 hover:bg-purple-600 w-fit mb-3">Track {index + 1}</Badge>
                        <p className="text-sm leading-tight text-gray-200 mb-3">{track.description}</p>
                        <p className="text-sm leading-tight text-gray-300 italic">
                          <span className="text-purple-300 font-semibold">Outcome:</span> {track.outcome}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <h3 className="font-['Megrim'] text-base sm:text-lg uppercase tracking-wider font-medium text-white"
                      style={{
                        textShadow: '0 0 15px rgba(255, 255, 255, 0.5), 0 2px 5px rgba(0, 0, 0, 0.9)'
                      }}
                    >
                      {track.title}
                    </h3>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}