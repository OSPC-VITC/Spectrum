"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
}

interface GlassmorphicCardProps {
  title: string;
  time: string;
  description?: string;
  isLeft: boolean;
}

// Enhanced glassmorphic card component
const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ title, time, description, isLeft }) => {
  // Generate deterministic particles
  const particles = Array.from({ length: 5 }, (_, i) => {
    const seed = 54321 + i;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);
    const r4 = seededRandom(seed + 3);
    const r5 = seededRandom(seed + 4);
    
    return {
      width: `${r1 * 4 + 2}px`,
      height: `${r2 * 5 + 2}px`,
      top: `${r3 * 100}%`,
      left: `${r4 * 100}%`,
      duration: r5 * 10 + 10,
      opacity: r1 * 0.5 + 0.2
    };
  });

  return (
    <Card className="backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden relative group transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/30 rounded-xl">
      {/* Inner glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glass shine effect */}
      <div className="absolute -inset-full h-[200%] w-[200%] rotate-45 translate-x-1/2 -translate-y-1/2 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-1000 mix-blend-overlay"></div>
      
      {/* Subtle moving particles effect inside card */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {particles.map((particle, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: particle.width,
              height: particle.height,
              top: particle.top,
              left: particle.left,
              animation: `float ${particle.duration}s linear infinite`,
              opacity: particle.opacity
            }}
          />
        ))}
      </div>
      
      <CardContent className="p-6 relative z-10">
        <div className={`flex flex-col ${isLeft ? "items-end text-right" : "items-start text-left"}`}>
          <span className="text-purple-300 text-sm font-medium tracking-wider mb-2">{time}</span>
          <h3 className="text-xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">{title}</h3>
          {description && <p className="text-blue-100/80 text-sm">{description}</p>}
        </div>
      </CardContent>
      
      {/* Bottom highlight border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-60"></div>
    </Card>
  );
};

// Seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const TimelineSection: React.FC = () => {
  // Enhanced events with descriptions
  const events: TimelineEvent[] = [
    { 
      time: "10:00 AM", 
      title: "Opening Ceremony", 
      description: "Welcome address and introduction to the hackathon rules and prizes." 
    },
    { 
      time: "11:00 AM", 
      title: "Team Formation", 
      description: "Find teammates and brainstorm project ideas together." 
    },
    { 
      time: "12:00 PM", 
      title: "Hacking Begins", 
      description: "Start building your innovative solutions and prototypes." 
    },
    { 
      time: "3:00 PM", 
      title: "Mentor Sessions", 
      description: "Get guidance from industry experts to refine your projects." 
    },
    { 
      time: "6:00 PM", 
      title: "First Checkpoint", 
      description: "Share your progress and get early feedback from judges." 
    },
    { 
      time: "10:00 PM", 
      title: "Midnight Surprise Event", 
      description: "A special challenge with exclusive prizes for participants." 
    },
    { 
      time: "8:00 AM", 
      title: "Final Submissions", 
      description: "Complete your projects and prepare your presentations." 
    },
    { 
      time: "10:00 AM", 
      title: "Judging Starts", 
      description: "Present your solutions to our panel of expert judges." 
    },
    { 
      time: "12:00 PM", 
      title: "Closing Ceremony", 
      description: "Award announcements and celebration of achievements." 
    }
  ];

  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Generate deterministic rain drops
  const rainDrops = Array.from({ length: 20 }, (_, i) => {
    const seed = 12345 + i;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);
    const r4 = seededRandom(seed + 3);
    
    return {
      left: `${r1 * 100}%`,
      opacity: r2 * 0.5 + 0.1,
      duration: r3 * 10 + 10,
      delay: r4 * 10
    };
  });

  return (
    <section id="timeline" className="min-h-screen py-24 bg-black text-white overflow-hidden relative">
      {/* Subtle animated background with grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzNFQzUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoMnYyaC0yek0zMCAzNmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>
      
      {/* Main background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
      
      {/* Animated nebula-like background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Large blurred gradient areas */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: "4s" }}></div>
        <div className="absolute top-2/4 right-0 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
        
        {/* Subtle digital rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {rainDrops.map((drop, i) => (
            <div 
              key={i}
              className="absolute w-px h-16 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
              style={{
                left: drop.left,
                top: "-5%",
                opacity: drop.opacity,
                animation: `rain ${drop.duration}s linear infinite`,
                animationDelay: `${drop.delay}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="font-['Megrim'] text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 mb-4">TIMELINE</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          <p className="mt-6 text-blue-100/70 max-w-2xl mx-auto">Follow our event schedule to make the most of your hackathon experience</p>
        </motion.div>
        
        <div ref={timelineRef} className="relative">
          {/* Timeline center line with glowing effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-600 via-blue-500 to-purple-600 opacity-50"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-purple-600 via-blue-500 to-purple-600 blur-md opacity-30"></div>
          
          {/* Horizontal connecting lines */}
          {events.map((_, index) => (
            <div 
              key={`line-${index}`}
              className={`absolute left-1/2 w-12 h-0.5 ${index % 2 === 0 ? "-translate-x-full" : ""} top-[${(index * 124) + 24}px] bg-gradient-to-r ${index % 2 === 0 ? "from-transparent to-purple-500/50" : "from-purple-500/50 to-transparent"}`}
            />
          ))}
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`mb-16 flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline item */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <GlassmorphicCard 
                    title={event.title} 
                    time={event.time} 
                    description={event.description}
                    isLeft={index % 2 === 0}
                  />
                </div>
                
                {/* Enhanced timeline dot with pulse animation */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div 
                    className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute w-full h-full rounded-full bg-purple-500 animate-ping opacity-75"></div>
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </motion.div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex justify-center"
        >
          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </motion.div>
      </div>
      
     
    </section>
  );
};

export default TimelineSection;