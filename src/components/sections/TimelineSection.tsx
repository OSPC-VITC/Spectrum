"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Star, Award } from 'lucide-react';

interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
  backgroundImage?: string;
}

interface GlassmorphicCardProps {
  title: string;
  time: string;
  description?: string;
  isLeft: boolean;
  icon?: React.ReactNode;
  highlight?: boolean;
  backgroundImage?: string;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ 
  title, 
  time, 
  description, 
  isLeft, 
  icon,
  highlight = false,
  backgroundImage
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ 
        opacity: 1, 
        x: 0,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        rotate: isLeft ? 2 : -2,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="cursor-pointer"
    >
      <Card 
        className={`
          backdrop-blur-lg 
          border-2 
          overflow-hidden 
          relative 
          group 
          transition-all 
          duration-500 
          rounded-2xl
          ${highlight 
            ? 'bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-purple-500/50' 
            : 'bg-white/10 border-white/20'}
          ${highlight ? 'shadow-2xl shadow-purple-500/40' : 'hover:shadow-xl hover:shadow-purple-500/30'}
          h-full
        `}
      >
        {/* Background Image Layer */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-purple-900/60 mix-blend-overlay"></div>
      
      <CardContent className="p-6 relative z-10">
        <div className={`flex flex-col ${isLeft ? "items-end text-right" : "items-start text-left"}`}>
            {icon && (
              <div className={`mb-3 ${highlight ? 'text-purple-300' : 'text-blue-300'}`}>
                {icon}
              </div>
            )}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-sm font-medium tracking-wider mb-2 ${highlight ? 'text-purple-200' : 'text-purple-300'}`}
            >
              {time}
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`
                text-xl 
                font-bold 
                mb-2 
                bg-clip-text 
                text-transparent 
                bg-gradient-to-r 
                ${highlight 
                  ? 'from-purple-300 to-blue-300' 
                  : 'from-purple-400 to-blue-400'}
              `}
            >
              {title}
            </motion.h3>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-sm ${highlight ? 'text-blue-100' : 'text-blue-100/80'}`}
              >
                {description}
              </motion.p>
            )}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
};

// Seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const TimelineSection: React.FC = () => {
  const events: TimelineEvent[] = [
    { 
      time: "10:00 AM", 
      title: "Opening Ceremony", 
      description: "Welcome address and introduction to the hackathon rules and prizes.",
      icon: <Clock size={24} />,
      backgroundImage: "/api/placeholder/800/600?text=Opening+Ceremony"
    },
    { 
      time: "11:00 AM", 
      title: "Team Formation", 
      description: "Find teammates and brainstorm project ideas together.",
      backgroundImage: "/api/placeholder/800/600?text=Team+Formation"
    },
    { 
      time: "12:00 PM", 
      title: "Hacking Begins", 
      description: "Start building your innovative solutions and prototypes.",
      highlight: true,
      icon: <Star size={24} />,
      backgroundImage: "/api/placeholder/800/600?text=Hacking+Begins"
    },
    { 
      time: "3:00 PM", 
      title: "Mentor Sessions", 
      description: "Get guidance from industry experts to refine your projects.",
      backgroundImage: "/api/placeholder/800/600?text=Mentor+Sessions"
    },
    { 
      time: "6:00 PM", 
      title: "First Checkpoint", 
      description: "Share your progress and get early feedback from judges.",
      backgroundImage: "/api/placeholder/800/600?text=First+Checkpoint"
    },
    { 
      time: "10:00 PM", 
      title: "Midnight Surprise Event", 
      description: "A special challenge with exclusive prizes for participants.",
      icon: <Award size={24} />,
      backgroundImage: "/api/placeholder/800/600?text=Midnight+Event"
    },
    { 
      time: "8:00 AM", 
      title: "Final Submissions", 
      description: "Complete your projects and prepare your presentations.",
      backgroundImage: "/api/placeholder/800/600?text=Final+Submissions"
    },
    { 
      time: "10:00 AM", 
      title: "Judging Starts", 
      description: "Present your solutions to our panel of expert judges.",
      backgroundImage: "/api/placeholder/800/600?text=Judging+Begins"
    },
    { 
      time: "12:00 PM", 
      title: "Closing Ceremony", 
      description: "Award announcements and celebration of achievements.",
      backgroundImage: "/api/placeholder/800/600?text=Closing+Ceremony"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen py-24 bg-gradient-to-br from-black via-black to-purple-950 text-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="font-['Megrim'] text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 mb-4 tracking-tight">
            EVENT TIMELINE
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-blue-100/80 max-w-2xl mx-auto text-lg">
            Navigate through the exciting journey of our hackathon, from kickoff to celebration
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Enhanced timeline line with subtle glow */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-600/50 via-blue-500/50 to-purple-600/50 origin-top shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          />

          <AnimatePresence>
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    delay: index * 0.2 
                  }
                }}
                exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`mb-16 flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <GlassmorphicCard 
                    title={event.title} 
                    time={event.time} 
                    description={event.description}
                    isLeft={index % 2 === 0}
                    icon={event.icon}
                    highlight={event.highlight}
                    backgroundImage={event.backgroundImage}
                  />
                </div>
                
                {/* Animated timeline dot with more dynamic effect */}
                  <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    delay: index * 0.2 
                  }}
                  className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 z-10 flex items-center justify-center relative">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1.5 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        delay: index * 0.2 
                      }}
                      className="absolute w-full h-full rounded-full bg-purple-500 animate-ping opacity-50"
                    />
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                  </div>
                  </motion.div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Bottom decorative element with more subtle styling */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex justify-center"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500/70 to-blue-500/70 rounded-full"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TimelineSection;