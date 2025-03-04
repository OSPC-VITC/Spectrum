"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Code, Server, Database, Cpu, Layers, Share2, 
  Zap, Hexagon, Bolt, Anchor, Rocket, Radio 
} from 'lucide-react';

const TechIcon = ({ icon, x, y, rotation, scale, delay }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0,
        x: 0,
        y: 0,
        rotate: 0
      }}
      animate={{ 
        opacity: [0, 1, 0.7, 1, 0],
        scale: [0, 1.2, 1, 0.8, 0],
        x: [0, x, x, 0],
        y: [0, y, y, 0],
        rotate: [0, rotation, -rotation, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay: delay,
        repeatType: "loop",
        ease: "easeInOut"
      }}
      className="absolute will-change-transform"
    >
      {React.cloneElement(icon, {
        className: "opacity-70 hover:opacity-100 transition-opacity",
        size: 32
      })}
    </motion.div>
  );
};

const HackathonVisualization = () => {
  const techIcons = [
    { icon: <Zap className="text-yellow-400" />, x: 200, y: 100, rotation: 45, scale: 1.2, delay: 0 },
    { icon: <Hexagon className="text-green-400" />, x: -150, y: -80, rotation: -30, scale: 1, delay: 0.5 },
    { icon: <Bolt className="text-blue-400" />, x: 180, y: -120, rotation: 60, scale: 0.9, delay: 1 },
    { icon: <Anchor className="text-red-400" />, x: -200, y: 90, rotation: -45, scale: 1.1, delay: 1.5 },
    { icon: <Rocket className="text-purple-400" />, x: 150, y: 180, rotation: 30, scale: 1.3, delay: 2 },
    { icon: <Radio className="text-indigo-400" />, x: -100, y: -150, rotation: -60, scale: 0.8, delay: 2.5 }
  ];

  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      w-[600px] h-[600px] rounded-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.7, 1, 0.7],
        scale: [0.8, 1, 0.8],
        rotate: [0, 360]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }}
    >
      {/* Pulsing Gradient Background */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-br 
        from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Orbital Path Lines */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/20 animate-pulse" />
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/20 rotate-45 animate-pulse" />

      {/* Dynamic Tech Icons */}
      <div className="absolute inset-0">
        {techIcons.map((iconData, index) => (
          <TechIcon key={index} {...iconData} />
        ))}
      </div>

      {/* Central Glowing Core */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 
        rounded-full shadow-2xl shadow-indigo-500/50"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 0 0 rgba(99,102,241,0.4)',
            '0 0 30px 10px rgba(99,102,241,0.6)',
            '0 0 0 0 rgba(99,102,241,0.4)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

const AboutSpectrum = () => {
  const [isHovered, setIsHovered] = useState(false);
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
          className="w-1/2 pr-16 z-20"
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
            Dive into a transformative experience where innovation meets impact. Spectrum is not just a hackathon—it's a launchpad for groundbreaking ideas that challenge the status quo and redefine technological possibilities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button 
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 
              text-white px-8 py-3 rounded-full text-lg font-bold
              hover:from-indigo-700 hover:to-purple-700
              transition-all duration-300 
              transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Rocket className="mr-2" size={20} />
                    Launch
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.span
                animate={{ opacity: isHovered ? 0 : 1 }}
                className="block"
              >
                Join Hackathon
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        <HackathonVisualization />
      </div>

      {/* Subtle Background Noise */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
};

export default AboutSpectrum;