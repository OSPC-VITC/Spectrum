"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bolt, Shield, Clipboard, Eye, Mic, ChevronRight, Zap, Calendar, Users, Award } from "lucide-react";

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-50px', '50px']);
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
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
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.3,
        ease: "easeOut",
        yoyo: 10
      }
    },
    tap: { scale: 0.98 }
  };

  return (
    <section id="about" className="relative bg-black text-white py-36 overflow-hidden" ref={ref}>
      {/* Dynamic background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"
        style={{ y: parallaxY, opacity }}
      />
      
      <motion.div 
        className="absolute -top-80 -left-80 w-[40rem] h-[40rem] rounded-full bg-purple-600/10 blur-[100px]"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['-50px', '50px']),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3])
        }}
      />
      
      <motion.div 
        className="absolute -bottom-80 -right-80 w-[40rem] h-[40rem] rounded-full bg-blue-600/10 blur-[100px]"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['50px', '-50px']),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3])
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {isInView && (
            <>
              {[...Array(20)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full bg-white opacity-20"
                  style={{
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    y: [0, -100 - Math.random() * 100],
                    opacity: [0, 0.3, 0],
                    scale: [0, 1, 0.5]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
      
      {/* Grid pattern overlay with parallax */}
      <motion.div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['0px', '30px']),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])
        }}
      />
      
      {/* Glowing orbital lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="20"
            fill="none"
            stroke="url(#gradientLine1)"
            strokeWidth="0.2"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.3, rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="30"
            fill="none"
            stroke="url(#gradientLine2)"
            strokeWidth="0.2"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.2, rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="gradientLine1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="gradientLine2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
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
              <motion.div 
                className="relative inline-flex items-center justify-center"
                animate={{ 
                  y: [0, -10, 0], 
                  rotate: [0, 2, 0, -2, 0], 
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50 scale-[1.2] group-hover:opacity-70 duration-500 animate-pulse"></div>
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-black bg-opacity-50 backdrop-blur-md border border-purple-500/20">
                  <Zap className="h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-[10px] font-bold">24H</span>
                </div>
              </motion.div>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-center font-bold tracking-wider leading-tight">
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 px-3 md:px-0 mx-auto max-w-lg md:max-w-none mb-16"
            variants={cardContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="relative rounded-xl border-0 bg-gradient-to-br from-purple-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-purple-900/20 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-purple-500/10 group-hover:border-purple-500/20 rounded-xl transition-colors duration-300"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full group-hover:bg-purple-500/10 transition-all duration-300"></div>
                <CardContent className="p-8">
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
                    Presented to you by <span className="text-purple-400 font-medium">OSPC x CSED</span>, with <span className="text-blue-400 font-medium">Vertex Innovate</span> and <span className="text-purple-400 font-medium">IBMz</span> as our community partners, this electrifying event on <span className="text-white font-semibold">April 11-12</span> is built to ignite disruptors. Backed by <span className="text-blue-400 font-medium">Blackbox AI</span>, we're creating a platform for groundbreaking innovation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
              
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="relative rounded-xl border-0 bg-gradient-to-br from-blue-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-blue-900/20 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-blue-500/10 group-hover:border-blue-500/20 rounded-xl transition-colors duration-300"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-all duration-300"></div>
                <CardContent className="p-8">
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
                    <h3 className="text-2xl font-['Megrim'] ml-5 font-semibold tracking-wide  text-white">Our Approach</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    With <span className="text-blue-400 font-medium">high-impact tracks</span>, SPECTRUM pushes participants to think like founders, build scalable solutions, and create real-world impact. But it&apos;s more than problem-solving—we&apos;re redefining hackathons with <span className="text-white font-semibold">music, flash mobs, and immersive experiences</span> that ignite creativity and boundless energy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 px-3 md:px-0 mx-auto max-w-lg md:max-w-none"
            variants={cardContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="relative rounded-xl border-0 bg-gradient-to-br from-indigo-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-indigo-900/20 h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-indigo-500/10 group-hover:border-indigo-500/20 rounded-xl transition-colors duration-300"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-all duration-300"></div>
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center mb-5">
                    <motion.span 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-indigo-900/20 backdrop-blur-sm group-hover:from-indigo-500/30 group-hover:to-indigo-900/30 transition-all duration-300 shadow-md overflow-hidden"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Eye className="h-7 w-7 text-indigo-400" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-indigo-500/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.8 }}
                      />
                    </motion.span>
                    <h3 className="text-2xl font-['Megrim'] ml-5 font-semibold tracking-wide  text-white">Innovation Battlefield</h3>
                  </div>
                  <p className="text-base text-gray-300 leading-relaxed mb-5 flex-1">
                    SPECTRUM brings together technology and entrepreneurship in a 24-hour innovation battlefield where bold ideas transform into game-changing solutions with real-world impact and vision meets execution.
                  </p>
                  <motion.div
                    className="flex justify-end mt-auto"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button variant="ghost" className="text-white p-0 h-auto hover:text-indigo-300 transition-colors flex items-center gap-2 group/btn">
                      <span>Learn More</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="relative rounded-xl border-0 bg-gradient-to-br from-purple-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-purple-900/20 h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-purple-500/10 group-hover:border-purple-500/20 rounded-xl transition-colors duration-300"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full group-hover:bg-purple-500/10 transition-all duration-300"></div>
                <CardContent className="p-8 flex-1 flex flex-col">
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
                        <Users className="h-7 w-7 text-purple-400" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-purple-500/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3.2 }}
                      />
                    </motion.span>
                    <h3 className="text-2xl font-['Megrim'] ml-5 font-semibold tracking-wide  text-white">Powerful Partnerships</h3>
                  </div>
                  <p className="text-base text-gray-300 leading-relaxed mb-5 flex-1">
                    Backed by OSPC x CSED, Vertex Innovate, Blackbox AI, and IBM Z, SPECTRUM brings together industry leaders to support the next generation of innovators and disruptors.
                  </p>
                  <motion.div
                    className="flex justify-end mt-auto"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button variant="ghost" className="text-white p-0 h-auto hover:text-purple-300 transition-colors flex items-center gap-2 group/btn">
                      <span>Our Partners</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="relative rounded-xl border-0 bg-gradient-to-br from-blue-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-blue-900/20 h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-blue-500/10 group-hover:border-blue-500/20 rounded-xl transition-colors duration-300"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-all duration-300"></div>
                <CardContent className="p-8 flex-1 flex flex-col">
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
                        <Award className="h-7 w-7 text-blue-400" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-blue-500/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3.8 }}
                      />
                    </motion.span>
                    <h3 className="text-2xl font-['Megrim'] ml-5 font-semibold tracking-wide  text-white">IBM Z Speaker Session</h3>
                  </div>
                  <p className="text-base text-gray-300 leading-relaxed mb-5 flex-1">
                    IBM Z adds to the thrill with an exclusive speaker session, delivering expert insights, cutting-edge trends, and guidance to fuel your entrepreneurial journey and empower your innovative solutions.
                  </p>
                  <motion.div
                    className="flex justify-end mt-auto"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                                      <Button variant="ghost" className="text-white p-0 h-auto hover:text-blue-300 transition-colors flex items-center gap-2 group/btn">
                      <span>Explore Session</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          {/* Call-to-action button */}
          <motion.div 
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button 
                className="relative rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
              >
                <span className="relative z-10">Join SPECTRUM Now</span>
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1.2 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;