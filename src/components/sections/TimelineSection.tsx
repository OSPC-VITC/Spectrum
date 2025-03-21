"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineEvent {
  time: string;
  title: string;
}

interface RainEffectBoxProps {
  title: string;
  time: string;
}

// This is a simplified version of your RainEffectBox component
const RainEffectBox: React.FC<RainEffectBoxProps> = ({ title, time }) => {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 overflow-hidden relative group hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-purple-300">{time}</p>
      </CardContent>
    </Card>
  );
};

const TimelineSection: React.FC = () => {
  const events: TimelineEvent[] = [
    { time: "10:00 AM", title: "Opening Ceremony" },
    { time: "11:00 AM", title: "Team Formation" },
    { time: "12:00 PM", title: "Hacking Begins" },
    { time: "3:00 PM", title: "Mentor Sessions" },
    { time: "6:00 PM", title: "First Checkpoint" },
    { time: "10:00 PM", title: "Midnight Surprise Event" },
    { time: "8:00 AM", title: "Final Submissions" },
    { time: "10:00 AM", title: "Judging Starts" },
    { time: "12:00 PM", title: "Closing Ceremony" },
  ];

  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="timeline" className="min-h-screen py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Megrim'] text-6xl md:text-7xl lg:text-8xl text-white mb-2">TIMELINE</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto"></div>
        </motion.div>
        
        <div ref={timelineRef} className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-blue-600"></div>
          
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
                className={`mb-12 flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline item */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                  <RainEffectBox title={event.title} time={event.time} />
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-purple-500 z-10"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
                
                {/* Empty space for the other side */}
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;