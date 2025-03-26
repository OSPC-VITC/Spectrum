"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield } from "lucide-react"; // Only keep the icons you use

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-50px', '50px']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  const titleText = "SPECTRUM";
  const titleLetters = titleText.split("");

  // Staggered card animations
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1, 
      rotate: 5, 
      transition: { 
        repeat: Infinity, 
        repeatType: "mirror" as const, 
        duration: 1 
      } 
    }
  };

  return (
    <section id="about" className="relative text-white py-36 overflow-hidden" ref={ref}>
      {/* Dynamic background elements removed */}
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-24"
          >
            <motion.div 
              className="inline-block mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.div animate={floatingAnimation} className="inline-block mb-5">
              <div className="relative">
                <div className="inline-block h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-md opacity-70"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold tracking-wide text-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">24H</span>
                </div>
              </div>
            </motion.div>
            </motion.div>
            
            
          <h2 className="mb-10 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
            <span className="text-white">ABOUT </span>
              <motion.span 
                className="relative inline-block"
                variants={titleVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <span className="absolute -inset-1 rounded-lg blur-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-50"></span>
                <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  {titleLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className="inline-block"
                      style={{ 
                        textShadow: "0 0 25px rgba(139, 92, 246, 0.3)" 
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.span>
            </h2>
            
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "8rem", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            
            <motion.div 
              className="text-gray-300 text-xl md:text-2xl text-center max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="mb-4">
                SPECTRUM isn&apos;t just a hackathon—it&apos;s a dynamic fusion of innovation, technology, and entrepreneurship. We challenge participants to push boundaries, craft groundbreaking solutions, and transform bold ideas into reality. With a focus on real-world impact, Spectrum is where vision meets execution.
              </p>
              <p className="text-purple-400 font-semibold italic">
                Get ready to innovate, collaborate, and shape the future—one breakthrough at a time!
              </p>
            </motion.div>
          </motion.div>
          
          {/* Featured highlight cards with animations */}
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-3"
          >
            {/* First Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative"
            >
              <Card className="relative bg-gradient-to-br from-purple-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-purple-900/20 h-full card-container !rounded-none">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <CardContent className="p-8 !rounded-none">
                  <div className="flex items-center mb-5">
                    <motion.span 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-900/20 backdrop-blur-sm group-hover:from-purple-500/30 group-hover:to-purple-900/30 transition-all duration-300 shadow-md overflow-hidden"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Calendar className="h-7 w-7 text-purple-400" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-purple-500/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                    </motion.span>
                    <h3 className="text-2xl font-['Megrim'] ml-5 font-semibold tracking-wide text-white">The Event</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    With high-impact tracks, we push participants to think like founders, craft scalable solutions, and tackle pressing challenges. But it doesn&apos;t stop there—we&apos;re redefining the hackathon experience with live music, flash mobs, and immersive activities that ignite creativity and energy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Second Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative"
            >
              <Card className="relative bg-gradient-to-br from-blue-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-blue-900/20 h-full card-container !rounded-none">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <CardContent className="p-8 !rounded-none">
                  <div className="flex items-center mb-5">
                    <motion.span 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-900/20 backdrop-blur-sm group-hover:from-blue-500/30 group-hover:to-blue-900/30 transition-all duration-300 shadow-md overflow-hidden"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Shield className="h-7 w-7 text-blue-400" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-blue-500/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3.5 }}
                      />
                    </motion.span>
                    <h3 className="text-2xl font-['Megrim'] ml-5 font-semibold tracking-wide text-white">Our Approach</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    Elevating the excitement, IBM Z presents an exclusive speaker session, offering expert insights, cutting-edge trends, and practical guidance to empower your entrepreneurial journey.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
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
          --glow-color: rgba(168, 85, 247, 0.8);
          z-index: 30;
          filter: drop-shadow(0 0 5px var(--glow-color));
          transition: all 0.3s ease;
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
            transparent 0%, 
            rgba(168, 85, 247, 0.8) 15%, 
            rgba(168, 85, 247, 0.8) 85%, 
            transparent 100%
          );
          top: 0;
          bottom: 0;
          width: var(--w);
          box-shadow: 0 0 15px 2px rgba(168, 85, 247, 0.8);
        }

        .r {
          right: 0;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(168, 85, 247, 0.8) 15%, 
            rgba(168, 85, 247, 0.8) 85%, 
            transparent 100%
          );
          top: 0;
          bottom: 0;
          width: var(--w);
          box-shadow: 0 0 15px 2px rgba(168, 85, 247, 0.8);
        }

        .t {
          top: 0;
          background: linear-gradient(to right, 
            transparent 0%, 
            rgba(168, 85, 247, 0.8) 15%, 
            rgba(168, 85, 247, 0.8) 85%, 
            transparent 100%
          );
          left: 0;
          right: 0;
          height: var(--w);
          box-shadow: 0 0 15px 2px rgba(168, 85, 247, 0.8);
        }

        .b {
          bottom: 0;
          background: linear-gradient(to right, 
            transparent 0%, 
            rgba(168, 85, 247, 0.8) 15%, 
            rgba(168, 85, 247, 0.8) 85%, 
            transparent 100%
          );
          left: 0;
          right: 0;
          height: var(--w);
          box-shadow: 0 0 15px 2px rgba(168, 85, 247, 0.8);
        }

        .card-container {
          border-radius: 0 !important;
        }

        .card-container > div:first-child {
          border-radius: 0 !important;
        }

        .card-container:hover .a {
          filter: none;
          box-shadow: none;
        }

        .card-container:hover .l,
        .card-container:hover .r,
        .card-container:hover .t,
        .card-container:hover .b {
          box-shadow: none;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            rgba(168, 85, 247, 0.8) 15%, 
            rgba(168, 85, 247, 0.8) 85%, 
            transparent 100%
          );
        }

        .card-container:hover .t,
        .card-container:hover .b {
          background: linear-gradient(to right, 
            transparent 0%, 
            rgba(168, 85, 247, 0.8) 15%, 
            rgba(168, 85, 247, 0.8) 85%, 
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
};

export default AboutSection;