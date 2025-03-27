'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Card } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';

type SponsorTier = 'kernel' | 'stack' | 'script';
type Sponsor = {
  name: string;
  tier: SponsorTier;
  logo?: string;
  website?: string;
};

const SponsorsSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

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
      name: "BlackBoxAI", 
      tier: "kernel", 
      logo: "/BlackBoxAI.png", 
      website: "https://www.blackbox.ai/"
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
  ];

  const tierConfigs = {
    kernel: { 
      title: "Kernel 🥇", 
      subtitle: "Gold Sponsors", 
      titleColor: "from-amber-400 to-orange-500",
      glowColor: "rgba(251, 191, 36, 0.8)" // Amber/gold glow
    },
    stack: { 
      title: "Stack 🥈", 
      subtitle: "Silver Sponsors", 
      titleColor: "from-slate-300 to-slate-500",
      glowColor: "rgba(203, 213, 225, 0.8)" // Slate/silver glow
    },
    script: { 
      title: "Script 🥉", 
      subtitle: "Bronze Sponsors", 
      titleColor: "from-rose-400 to-amber-700",
      glowColor: "rgba(251, 113, 133, 0.8)" // Rose/bronze glow
    }
  };

  const tiers: SponsorTier[] = ['kernel', 'stack', 'script'];
    
    return (
    <section id="sponsors" className="text-white py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
            
          <h2 className="mb-10 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
              <span className="text-white">OUR </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">SPONSORS</span>
            </h2>
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "8rem", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We are grateful for the support of our sponsors who make this event possible.
            </p>
        </motion.div>
        
        {tiers.map(tier => {
          const sponsorsInTier = sponsors.filter(sponsor => sponsor.tier === tier);
          
          if (sponsorsInTier.length === 0) return null;
          
          return (
            <div key={tier} className="mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6 } 
                  }
                }}
                className="text-center mb-12"
              >
                <h3 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${tierConfigs[tier].titleColor}`}>
                  {tierConfigs[tier].title}
                </h3>
                <p className="text-gray-400 mt-1">{tierConfigs[tier].subtitle}</p>
              </motion.div>

              <div className={`
                grid gap-6 mx-auto px-3 
                ${tier === 'kernel' ? 'grid-cols-1 max-w-[320px] md:max-w-[38rem] lg:max-w-[58rem] md:grid-cols-3 justify-items-center' : ''} 
                ${tier === 'stack' ? 'grid-cols-1 max-w-[320px] md:max-w-[38rem] lg:max-w-[58rem] md:grid-cols-3 justify-items-center' : ''} 
                ${tier === 'script' ? 'grid-cols-1 max-w-[320px] justify-items-center' : ''}
              `}>
                {sponsorsInTier.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={controls}
                    variants={{
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1,
                          duration: 0.5 
                        } 
                      }
                    }}
                    className={`glow-wrapper glow-${tier} w-full md:w-auto`}
                    style={{
                      "--glow-color": tierConfigs[tier].glowColor
                    } as React.CSSProperties}
                  >
                    <Card className={`relative bg-black/20 hover:bg-black/30 transition-colors overflow-hidden 
                      shadow-xl hover:shadow-2xl card-container !rounded-none aspect-square w-full md:w-[18rem] h-auto
                      ${sponsor.name === "BlackBoxAI" ? "blackbox-sponsor" : ""}`}>
                      <div className={`a l ${tier}`}></div>
                      <div className={`a r ${tier}`}></div>
                      <div className={`a t ${tier}`}></div>
                      <div className={`a b ${tier}`}></div>
                      <div className="p-4 space-y-3">
                        <div className="relative flex items-center justify-center h-36 w-full">
                          <div className={`relative ${sponsor.name === "BlackBoxAI" ? "w-full h-full" : "w-[95%] h-full"}`}>
                            <OptimizedImage
                              src={sponsor.logo || '/placeholder-logo.png'}
                              alt={sponsor.name}
                              fill
                              className={`object-contain brightness-200 ${sponsor.name === "BlackBoxAI" ? "scale-90" : ""}`}
                              mobileQuality={60}
                              desktopQuality={85}
                              mobileSizes="(max-width: 768px) 100vw, 33vw"
                              priority={tier === 'kernel'}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="space-y-1">
                            <h3 className="text-xl font-bold text-white tracking-wide text-center">{sponsor.name}</h3>
                          </div>

                          <div className="flex justify-center mt-1">
                            {sponsor.website && (
                              <a
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-black/40 px-3 py-1.5 rounded font-medium text-white border border-solid transition-colors flex items-center gap-2 ${
                                  tier === 'kernel' 
                                    ? 'border-amber-400 hover:bg-amber-950/40' 
                                    : tier === 'stack' 
                                    ? 'border-slate-400 hover:bg-slate-950/40' 
                                    : 'border-rose-400 hover:bg-rose-950/40'
                                }`}
                              >
                                <span className="text-sm whitespace-nowrap">Visit website</span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
        </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* SVG filter for animated borders */}
      <svg className="hidden">
        <filter id="unopaq" width="3000%" x="-1000%" height="3000%" y="-1000%">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 2 0"
          ></feColorMatrix>
        </filter>
      </svg>

      <style jsx>{`
        .glow-wrapper {
          position: relative;
        }

        .glow-wrapper::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: transparent;
          box-shadow: 0 0 30px 8px var(--glow-color);
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .card-container {
          position: relative;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
        }

        .card-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 70%);
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          z-index: 30;
          filter: drop-shadow(0 0 5px var(--glow-color));
          transition: all 0.3s ease;
        }

        .a::before {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: url(#unopaq);
          z-index: 25;
        }

        .a::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          filter: url(#unopaq);
          opacity: 0;
          z-index: 25;
          transition: 0.3s;
        }

        .card-container:hover .a::after {
          opacity: 1;
        }

        .l {
          left: 0;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            var(--glow-color) 15%, 
            var(--glow-color) 85%, 
            transparent 100%
          );
          top: 0;
          bottom: 0;
          width: var(--w);
          box-shadow: 0 0 15px 2px var(--glow-color);
        }

        .r {
          right: 0;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            var(--glow-color) 15%, 
            var(--glow-color) 85%, 
            transparent 100%
          );
          top: 0;
          bottom: 0;
          width: var(--w);
          box-shadow: 0 0 15px 2px var(--glow-color);
        }

        .t {
          top: 0;
          background: linear-gradient(to right, 
            transparent 0%, 
            var(--glow-color) 15%, 
            var(--glow-color) 85%, 
            transparent 100%
          );
          left: 0;
          right: 0;
          height: var(--w);
          box-shadow: 0 0 15px 2px var(--glow-color);
        }

        .b {
          bottom: 0;
          background: linear-gradient(to right, 
            transparent 0%, 
            var(--glow-color) 15%, 
            var(--glow-color) 85%, 
            transparent 100%
          );
          left: 0;
          right: 0;
          height: var(--w);
          box-shadow: 0 0 15px 2px var(--glow-color);
        }

        .card-container {
          border-radius: 0 !important;
        }

        .card-container > div:first-child {
          border-radius: 0 !important;
        }

        .card-container:hover {
          box-shadow: none;
        }
        
        .glow-wrapper:hover::before {
          opacity: 0;
        }

        .card-container:hover::before {
          opacity: 0;
        }

        .card-container:hover .a {
          filter: none;
        }

        .card-container:hover .l,
        .card-container:hover .r,
        .card-container:hover .t,
        .card-container:hover .b {
          box-shadow: none;
          background: linear-gradient(to bottom, 
            transparent 0%, 
            var(--glow-color) 15%, 
            var(--glow-color) 85%, 
            transparent 100%
          );
        }

        .card-container:hover .t,
        .card-container:hover .b {
          background: linear-gradient(to right, 
            transparent 0%, 
            var(--glow-color) 15%, 
            var(--glow-color) 85%, 
            transparent 100%
          );
        }

        /* Tier-specific glow colors */
        .glow-kernel {
          --glow-color: rgba(251, 191, 36, 0.8); /* Amber/gold */
        }
        .glow-stack {
          --glow-color: rgba(203, 213, 225, 0.8); /* Slate/silver */
        }
        .glow-script {
          --glow-color: rgba(251, 113, 133, 0.8); /* Rose/bronze */
        }
      `}</style>

      <style jsx global>{`
        /* Glow effects for each tier */
        .glow-kernel:hover {
          filter: none;
        }
        .glow-stack:hover {
          filter: none;
        }
        .glow-script:hover {
          filter: none;
        }
        
        /* Card container hover effects */
        .card-container:hover .a::after {
          opacity: 0 !important;
        }
        
        .card-container:hover .a {
          filter: none !important;
          box-shadow: none !important;
        }
        
        .card-container .a::before {
          filter: blur(2px) url(#unopaq);
        }
        
        .card-container:hover .a::before {
          filter: none;
        }
        
        /* Special styles for BlackBoxAI sponsor */
        .blackbox-sponsor img {
          object-fit: contain !important;
          padding: 5px;
        }
        
        @media (max-width: 768px) {
          .blackbox-sponsor {
            min-height: 280px;
            max-height: 320px;
            width: 100% !important;
          }
          
          .blackbox-sponsor .p-4 {
            padding: 1rem !important;
          }
          
          .blackbox-sponsor img {
            object-fit: contain !important;
            max-width: 90% !important;
            margin: 0 auto;
            transform: scale(0.9);
          }
          
          .blackbox-sponsor h3 {
            font-size: 1.5rem !important;
          }
          
          .blackbox-sponsor a {
            margin-top: 0.5rem;
          }
        }
        
        /* Animated borders for each tier */
        .a.kernel::before,
        .a.kernel::after {
          background: linear-gradient(var(--g));
          background-image: linear-gradient(to right, rgba(251, 191, 36, 0) 0%, rgba(251, 191, 36, 0.3) 20%, rgba(251, 191, 36, 0.8) 50%, rgba(251, 191, 36, 0.3) 80%, rgba(251, 191, 36, 0) 100%);
        }
        
        .a.stack::before,
        .a.stack::after {
          background: linear-gradient(var(--g));
          background-image: linear-gradient(to right, rgba(203, 213, 225, 0) 0%, rgba(203, 213, 225, 0.3) 20%, rgba(203, 213, 225, 0.8) 50%, rgba(203, 213, 225, 0.3) 80%, rgba(203, 213, 225, 0) 100%);
        }
        
        .a.script::before,
        .a.script::after {
          background: linear-gradient(var(--g));
          background-image: linear-gradient(to right, rgba(251, 113, 133, 0) 0%, rgba(251, 113, 133, 0.3) 20%, rgba(251, 113, 133, 0.8) 50%, rgba(251, 113, 133, 0.3) 80%, rgba(251, 113, 133, 0) 100%);
        }
      `}</style>
    </section>
  );
};

export default SponsorsSection;