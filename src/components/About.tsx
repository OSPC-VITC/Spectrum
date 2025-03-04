"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Code, Server, Database, Cpu, Layers, Share2, 
  Rocket, Star, Globe, Compass, Zap 
} from 'lucide-react';

// Galaxy Background Component
const GalaxyBackground: React.FC = () => {
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3,
      delay: Math.random() * 5
    }));
  };

  const stars = generateStars(150);

  return (
    <div 
      className="fixed inset-0 bg-black overflow-hidden z-0"
      style={{
        background: 'radial-gradient(ellipse at bottom, #1e2244 0%, #111827 100%)'
      }}
    >
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      ))}
    </div>
  );
};

// Animated Tech Icons
const AnimatedTechIcons: React.FC = () => {
  const icons = [
    { 
      icon: <Rocket className="text-purple-400" />, 
      label: "Innovative Tech",
      description: "Push the boundaries of what's possible"
    },
    { 
      icon: <Star className="text-yellow-400" />, 
      label: "Creative Solutions",
      description: "Transform ideas into groundbreaking projects"
    },
    { 
      icon: <Globe className="text-blue-400" />, 
      label: "Global Impact",
      description: "Solve real-world challenges"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-8 mt-12">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center 
          border border-white/10 hover:border-purple-500/50 transition-all duration-300
          group cursor-pointer"
        >
          <div className="flex justify-center mb-4">
            {React.cloneElement(item.icon, { 
              size: 48, 
              className: "group-hover:text-purple-400 transition-colors" 
            })}
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">{item.label}</h3>
          <p className="text-gray-300 text-sm">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// Hackathon Visualization Component
const HackathonVisualization: React.FC = () => {
  const codeSnippets = [
    "function innovate() {",
    "  const solution = createInnovation();",
    "  return solution.transform(world);",
    "}",
    "",
    "const hackathon = new Collaboration(",
    "  creators.map(genius => genius.ideas)",
    ");",
    "",
    "hackathon.solve(globalChallenges);"
  ];

  return (
    <motion.div 
      className="relative w-full h-[500px] overflow-hidden rounded-2xl bg-gray-900/70 backdrop-blur-xl border border-purple-900/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Code Particles */}
      {[
        { type: "</>", color: "text-blue-400" },
        { type: "{}", color: "text-green-400" },
        { type: "()=>", color: "text-pink-400" },
        { type: "class", color: "text-yellow-400" },
        { type: "new", color: "text-indigo-400" }
      ].map((particle, index) => (
        <motion.div
          key={index}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 300,
            y: Math.random() * 500,
            scale: 0.5 
          }}
          animate={{ 
            opacity: [0, 1, 0],
            x: [
              Math.random() * 300, 
              Math.random() * 300, 
              Math.random() * 300
            ],
            y: [
              Math.random() * 500, 
              Math.random() * 500, 
              Math.random() * 500
            ],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: index * 0.3,
            repeatType: "loop"
          }}
          className={`absolute text-2xl font-bold ${particle.color} opacity-50`}
        >
          {particle.type}
        </motion.div>
      ))}

      {/* Animated Code Snippet */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <motion.div 
          className="bg-gray-800/70 rounded-xl p-6 max-w-xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="font-mono text-sm leading-relaxed">
            {codeSnippets.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    delay: index * 0.2,
                    duration: 0.5
                  }
                }}
                className={`
                  ${line.trim().startsWith('//') ? 'text-gray-500' : 'text-white'}
                  ${line.includes('function') ? 'text-blue-400' : ''}
                  ${line.includes('const') ? 'text-green-400' : ''}
                `}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pulsing Hackathon Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 
        backdrop-blur-sm rounded-2xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

// Main Component
const AboutSpectrum: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Galaxy Background */}
      <GalaxyBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
        <motion.div 
          ref={ref}
          style={{ opacity, scale }}
          className="text-center"
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
            className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed mb-12"
          >
            Dive into a transformative experience where innovation meets impact. Spectrum is a launchpad for groundbreaking ideas that challenge the status quo and redefine technological possibilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <motion.button 
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(139,92,246,0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 
              text-white px-10 py-4 rounded-full text-lg font-bold
              hover:from-indigo-700 hover:to-purple-700
              transition-all duration-300 
              transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <AnimatePresence>
                {isHovered ? (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Zap className="mr-2" size={20} />
                    Launch Now
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="block"
                  >
                    Join Hackathon
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hackathon Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <HackathonVisualization />
        </motion.div>

        {/* Animated Tech Icons Section */}
        <AnimatedTechIcons />
      </div>
    </div>
  );
};

export default AboutSpectrum;