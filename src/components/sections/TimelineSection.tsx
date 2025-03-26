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
            ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30' 
            : 'bg-black/30 border-white/10'}
          ${highlight ? 'shadow-xl shadow-purple-500/20' : 'hover:shadow-lg hover:shadow-purple-500/20'}
          h-full
        `}
      >
        {/* Background Image Layer */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-purple-900/40 mix-blend-overlay"></div>
      
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

const TimelineSection: React.FC = () => {
  const events: TimelineEvent[] = [
    { 
      time: "April 11, 8:00 AM", 
      title: "Registration", 
      description: "Check-in and registration begins for all participants.",
      icon: <Clock size={24} />,
      backgroundImage: "/api/placeholder/800/600?text=Registration"
    },
    { 
      time: "April 11, 10:00 AM", 
      title: "Inauguration", 
      description: "Opening ceremony and welcome address.",
      backgroundImage: "/api/placeholder/800/600?text=Inauguration"
    },
    { 
      time: "April 11, 11:00 AM", 
      title: "Hackathon Begins", 
      description: "Official start of the hackathon - begin working on your projects!",
      highlight: true,
      icon: <Star size={24} />,
      backgroundImage: "/api/placeholder/800/600?text=Hackathon+Begins"
    },
    { 
      time: "April 11, 3:00 PM", 
      title: "Speaker Session & Review", 
      description: "Inspiring talk from industry experts followed by project review.",
      backgroundImage: "/api/placeholder/800/600?text=Speaker+Session"
    },
    { 
      time: "April 11, 7:00 PM", 
      title: "Dinner Break", 
      description: "Time to recharge with dinner.",
      backgroundImage: "/api/placeholder/800/600?text=Dinner"
    },
    { 
      time: "April 11, 10:00 PM", 
      title: "Review Round 1", 
      description: "First project review milestone.",
      icon: <Award size={24} />,
      backgroundImage: "/api/placeholder/800/600?text=Review+1"
    },
    { 
      time: "April 12, 12:00 AM", 
      title: "Dance/Music Flashmob", 
      description: "Take a fun break with music and dance!",
      backgroundImage: "/api/placeholder/800/600?text=Flashmob"
    },
    { 
      time: "April 12, 10:00 AM", 
      title: "Final Judging", 
      description: "Present your projects to the panel of judges.",
      highlight: true,
      icon: <Award size={24} />,
      backgroundImage: "/api/placeholder/800/600?text=Final+Judging"
    },
    { 
      time: "April 12, 2:00 PM", 
      title: "Closing Ceremony", 
      description: "Results announcement and celebration of achievements.",
      highlight: true,
      icon: <Award size={24} />,
      backgroundImage: "/api/placeholder/800/600?text=Closing+Ceremony"
    }
];

  return (
    <div id="timeline">
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen py-24 text-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="mb-10 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
            <span className="text-white">EVENT</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"> TIMELINE</span>
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
    </div>
  );
};

export default TimelineSection;