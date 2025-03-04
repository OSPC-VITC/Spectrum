"use client";
import Image from "next/image";
import { motion } from "framer-motion";

type Sponsor = {
  src: string;
  alt: string;
  website?: string;
};

const goldSponsors: Sponsor[] = [
  { 
    src: '/img/Logo/Devfolio_Logo-White.png', 
    alt: "DEVFOLIO LOGO",
    website: "https://devfolio.co"
  },
  { 
    src: '/img/Logo/devdock.png', 
    alt: "DEVDOCK LOGO",
    website: "https://devdock.io"
  },
  { 
    src: '/img/Logo/llmware.png', 
    alt: "LLMWARE AI LOGO",
    website: "https://llmware.ai"
  },
];

const silverSponsors: Sponsor[] = [
  { 
    src: '/img/Logo/polygonlogo.png', 
    alt: "POLYGON LOGO",
    website: "https://polygon.technology"
  },
  { 
    src: '/img/Logo/aptos.png', 
    alt: "APTOS LOGO",
    website: "https://aptos.dev"
  },
  { 
    src: '/img/Logo/ethindialogo.png', 
    alt: "ETHINDIA LOGO",
    website: "https://ethindia.co"
  },
];

const bronzeSponsors: Sponsor[] = [
  { 
    src: '/img/Logo/appwritelogo.png', 
    alt: "AppWrite LOGO",
    website: "https://appwrite.io"
  },
  { 
    src: '/img/Logo/interviewbuddy.png', 
    alt: "INTERVIEW BUDDY LOGO",
    website: "https://interviewbuddy.net"
  },
  { 
    src: '/img/Logo/xyz.png', 
    alt: "XYZ LOGO",
    website: "https://xyz.com"
  },
];

const SponsorCard = ({ sponsor, tier }: { sponsor: Sponsor, tier: 'gold' | 'silver' | 'bronze' }) => {
  const tierStyles = {
    gold: {
      border: "border-yellow-400/30 hover:border-yellow-400/60",
      gradient: "from-yellow-900/20 to-yellow-700/20",
      scale: "hover:scale-105"
    },
    silver: {
      border: "border-gray-300/30 hover:border-gray-300/60",
      gradient: "from-gray-800/20 to-gray-700/20",
      scale: "hover:scale-[1.03]"
    },
    bronze: {
      border: "border-orange-600/30 hover:border-orange-600/60",
      gradient: "from-orange-900/20 to-orange-700/20",
      scale: "hover:scale-[1.02]"
    }
  };

  return (
    <motion.a 
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        relative group flex justify-center items-center 
        p-4 rounded-2xl border 
        bg-gradient-to-br ${tierStyles[tier].border} ${tierStyles[tier].gradient}
        transition-all duration-300 ease-in-out
        ${tierStyles[tier].scale}
        transform-gpu backdrop-blur-sm
      `}
      whileHover={{ 
        boxShadow: tier === 'gold' 
          ? "0 0 20px rgba(255, 215, 0, 0.5)" 
          : tier === 'silver' 
          ? "0 0 20px rgba(192, 192, 192, 0.5)" 
          : "0 0 20px rgba(255, 165, 0, 0.5)"
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={sponsor.src}
        alt={sponsor.alt}
        width={200}
        height={200}
        className={`
          drop-shadow-lg object-contain 
          transition-transform duration-300 
          group-hover:brightness-110
          max-h-[120px] max-w-[200px]
        `}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
        bg-black/20 rounded-2xl flex items-center justify-center">
        <span className="text-white text-sm font-medium">Visit Website</span>
      </div>
    </motion.a>
  );
};

const SponsorSection = ({ title, sponsors, textColor, tier }: { 
  title: string; 
  sponsors: Sponsor[]; 
  textColor: string; 
  tier: 'gold' | 'silver' | 'bronze' 
}) => {
  return (
    <motion.div 
      className="text-center py-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className={`
        text-3xl font-extrabold mb-6 
        ${textColor} 
        tracking-wide 
        drop-shadow-lg
      `}>
        {title}
      </h2>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {sponsors.map((sponsor, index) => (
          <SponsorCard key={index} sponsor={sponsor} tier={tier} />
        ))}
      </div>
    </motion.div>
  );
};

export default function Sponsors() {
  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto px-4"
      >
        <SponsorSection 
          title="Gold Sponsors" 
          sponsors={goldSponsors} 
          textColor="text-yellow-400" 
          tier="gold" 
        />
        <SponsorSection 
          title="Silver Sponsors" 
          sponsors={silverSponsors} 
          textColor="text-gray-300" 
          tier="silver" 
        />
        <SponsorSection 
          title="Bronze Sponsors" 
          sponsors={bronzeSponsors} 
          textColor="text-orange-600" 
          tier="bronze" 
        />
      </motion.div>
    </div>
  );
}