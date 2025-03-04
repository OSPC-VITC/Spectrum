"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Server, Database, Cpu, Layers, Share2 } from 'lucide-react';

const HackathonVisualization = () => {
  return (
    <motion.div 
      className="absolute top-1/2 -translate-y-1/2 right-0 w-1/2 h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full h-full max-w-[500px] max-h-[500px]">
        {/* Rotating Code Blocks */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-64 h-64 rounded-xl bg-indigo-500/10 backdrop-blur-sm"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Inner Animated Elements */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              backgroundImage: [
                'radial-gradient(circle at 30% 80%, rgba(99,102,241,0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 20%, rgba(139,92,246,0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.2) 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          {/* Floating Tech Icons */}
          {[
            { icon: <Code className="text-indigo-400" size={32} />, x: 50, y: 30, delay: 0 },
            { icon: <Server className="text-purple-400" size={32} />, x: 220, y: 100, delay: 0.2 },
            { icon: <Database className="text-pink-400" size={32} />, x: 100, y: 220, delay: 0.4 },
            { icon: <Cpu className="text-blue-400" size={32} />, x: 230, y: 200, delay: 0.6 },
            { icon: <Layers className="text-green-400" size={32} />, x: 30, y: 150, delay: 0.8 },
            { icon: <Share2 className="text-orange-400" size={32} />, x: 250, y: 50, delay: 1 }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                x: item.x,
                y: item.y
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: item.delay,
                repeatType: "loop"
              }}
              className="absolute"
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutSpectrum = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div className="relative bg-[#0a0a0a] text-white min-h-screen flex items-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex items-center">
        <motion.div 
          ref={ref}
          style={{ opacity, scale }}
          className="w-1/2 pr-16"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl font-black bg-clip-text text-transparent 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            tracking-tighter mb-6 drop-shadow-[0_5px_10px_rgba(139,92,246,0.3)]"
          >
            SPECTRUM HACKATHON
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl text-gray-300 leading-relaxed mb-8"
          >
            Spectrum is a dynamic hackathon that brings together innovative minds to solve real-world challenges. Our mission is to create a collaborative ecosystem where creativity meets technology, empowering developers to transform bold ideas into groundbreaking solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 
              text-white px-8 py-3 rounded-full text-lg font-bold
              hover:from-indigo-700 hover:to-purple-700
              transition-all duration-300 
              transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Join Hackathon
            </button>
          </motion.div>
        </motion.div>

        <HackathonVisualization />
      </div>
    </div>
  );
};

export default AboutSpectrum;