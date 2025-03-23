'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { ExternalLink } from 'lucide-react';

type SponsorTier = 'kernel' | 'stack' | 'script';
type Sponsor = {
  name: string;
  tier: SponsorTier;
  logo?: string;
  website?: string;
  description?: string;
};

type Partner = {
  name: string;
  logo?: string;
  website?: string;
  description?: string;
};

const SponsorsSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const hoverVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 } 
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const sponsors: Sponsor[] = [
    { 
      name: "Radisson BLU", 
      tier: "kernel", 
      logo: "/radissonblu.jpeg",
      website: "https://www.radissonhotels.com/en-us/destination/india/chennai"
    },
    { 
      name: "Devfolio", 
      tier: "kernel", 
      logo: "/Devfolio.png",
      website: "https://devfolio.co/"
    },
    { 
      name: "EthIndia", 
      tier: "stack", 
      logo: "/ethindia.svg",
      website: "https://ethindia.co"
    },
    { 
      name: "Aptos", 
      tier: "stack", 
      logo: "/aptos.png",
      website: "https://www.aptos.com/"
    },
    { 
      name: "polygon", 
      tier: "stack", 
      logo: "/polygon.png",
      website: "https://polygon.technology/"
    },
    { 
      name: "BlackBoxAI", 
      tier: "script", 
      logo: "/BlackBoxAI.png", 
      website: "https://www.blackbox.ai/"
    },
  ];

  const partners: Partner[] = [
    { 
      name: "Vertex", 
      logo: "/vertex.png", 
      website: "https://www.instagram.com/vertex_innovate/" 
    },
    { 
      name: "IBM Z", 
      logo: "/IBMz.jpg", 
      website: "https://ibm.com/ibmz" 
    },
  ];

  const getSponsorsByTier = (tier: SponsorTier): Sponsor[] => {
    return sponsors.filter(sponsor => sponsor.tier === tier);
  };

  const tierConfigs = {
    kernel: { 
      title: "Kernel 🥇", 
      subtitle: "Gold Sponsors", 
      titleColor: "from-amber-400 to-orange-500"
    },
    stack: { 
      title: "Stack 🥈", 
      subtitle: "Silver Sponsors", 
      titleColor: "from-slate-300 to-slate-500"
    },
    script: { 
      title: "Script 🥉", 
      subtitle: "Bronze Sponsors", 
      titleColor: "from-rose-400 to-amber-700"
    }
  };

  // Unified card renderer for both sponsors and partners
  const renderCard = (item: Sponsor | Partner, index: number) => {
    const hasLogo = !!item.logo;
    const hasWebsite = !!item.website;
    
    // Card content with centered logo and text
    const renderCardContent = () => (
      <CardContent className="p-6 h-full flex flex-col items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          {hasLogo ? (
            <div className="relative h-64 w-64 mb-4 flex items-center justify-center">
              <Image 
                src={item.logo || '/default-logo.png'}
                alt={`${item.name} logo`}
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="h-32 w-32 mb-4 flex items-center justify-center bg-gray-800 rounded-full">
              <span className="text-2xl font-bold text-gray-400">{item.name.charAt(0)}</span>
            </div>
          )}
          
          <h3 className="text-lg font-bold text-center text-gray-100">{item.name}</h3>
          
          {hasWebsite && (
            <div className="flex items-center justify-center text-blue-400 text-xs hover:text-blue-300 transition-colors mt-4">
              <ExternalLink size={14} className="mr-1" />
              <span>Visit website</span>
            </div>
          )}
        </div>
      </CardContent>
    );

    return (
      <motion.div 
        key={item.name}
        className="flex justify-center"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        custom={index}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                variants={hoverVariants}
                initial="initial"
                whileHover="hover"
                className="w-full max-w-xs mx-auto"
              >
                <Card className="backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden aspect-square shadow-lg w-full hover:shadow-xl hover:shadow-primary/20 transition-all">
                  {hasWebsite ? (
                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {renderCardContent()}
                    </a>
                  ) : renderCardContent()}
                </Card>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              {hasWebsite ? `Visit ${item.name}` : `Learn more about ${item.name}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    );
  };

  // Function to get the appropriate grid class based on item count
  const getGridClass = (itemCount: number) => {
    switch (itemCount) {
      case 1:
        return "grid-cols-1 place-items-center";
      case 2:
        return "grid-cols-1 md:grid-cols-2 place-items-center";
      case 3:
        return "grid-cols-1 md:grid-cols-3 place-items-center";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center";
    }
  };

  const renderTierSection = (tier: SponsorTier) => {
    const tierSponsors = getSponsorsByTier(tier);
    if (tierSponsors.length === 0) return null;
    const config = tierConfigs[tier];
    const gridClass = getGridClass(tierSponsors.length);
    
    return (
      <motion.div className="mb-16 w-full" variants={containerVariants}>
        <motion.div
          className="relative flex flex-col items-center mb-10"
          variants={titleVariants}
        >
          <div className="max-w-4xl w-full text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${config.titleColor}`}>
                {config.title}
              </span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">{config.subtitle}</p>
            <div className="h-px w-32 bg-gray-400 mx-auto"></div>
          </div>
        </motion.div>
        
        {/* Center align grid with equal spacing */}
        <div className="flex justify-center w-full">
          <div className={`${gridClass} grid max-w-5xl w-full gap-8 px-8 mx-auto`}>
            {tierSponsors.map((sponsor, index) => renderCard(sponsor, index))}
            {/* Add placeholder divs to ensure centering with odd numbers of items */}
            {tierSponsors.length === 1 && <div className="hidden md:block"></div>}
            {tierSponsors.length === 3 && tier !== 'script' && <div className="hidden lg:block"></div>}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderPartnersSection = () => {
    if (partners.length === 0) return null;
    const gridClass = getGridClass(partners.length);
    
    return (
      <motion.div className="mb-16 w-full" variants={containerVariants}>
        <motion.div
          className="relative flex flex-col items-center mb-10"
          variants={titleVariants}
        >
          <div className="max-w-4xl w-full text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Our Partners
              </span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">Collaborating to make Spectrum a success</p>
            <div className="h-px w-32 bg-gray-400 mx-auto"></div>
          </div>
        </motion.div>
        
        {/* Center align grid with equal spacing */}
        <div className="flex justify-center w-full">
          <div className={`${gridClass} grid max-w-5xl w-full gap-8 px-8 mx-auto`}>
            {partners.map((partner, index) => renderCard(partner, index))}
            {/* Add placeholder divs to ensure centering with odd numbers of items */}
            {partners.length === 1 && <div className="hidden md:block"></div>}
            {partners.length === 3 && <div className="hidden lg:block"></div>}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.section 
      id="sponsors" 
      className="py-20 bg-gradient-to-b from-gray-900 via-black to-black text-white relative overflow-hidden"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Background gradient effects */}
      <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-40 right-1/4 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div variants={titleVariants} className="text-center mb-16">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              OUR SPONSORS
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg">
              Meet the organizations empowering innovation at Spectrum. Our sponsors are the backbone of this hackathon, making incredible prizes and experiences possible.
            </p>
          </div>
        </motion.div>
        
        <div className="space-y-16 w-full">
          {renderTierSection('kernel')}
          {renderTierSection('stack')}
          {renderTierSection('script')}
          {renderPartnersSection()}
        </div>

        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SponsorsSection;