'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TwitterLogoIcon, LinkedInLogoIcon, GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import { GlobeIcon } from 'lucide-react';


interface Organizer {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

interface Partner {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    website?: string;
  };
}

const organizers: Organizer[] = [
  {
    id: 1,
    name: "OSPC",
    role: "Lead Organizer",
    bio: "The Open Source Programming Club at VIT Chennai is dedicated to fostering innovation through open source collaboration and building a vibrant tech community on campus.",
    imageUrl: "/ospc.png",
    socialLinks: {
      twitter: "https://twitter.com/ospcvitc",
      linkedin: "https://www.linkedin.com/company/opensource-programming-club-vitc",
      github: "https://github.com/OSPC-VITC",
      website: "https://ospcvitc.club",
    }
  },
  {
    id: 2,
    name: "CSED",
    role: "Co-Organizer",
    bio: "The Centre for Social Entrepreneurship and Development (CSED) at VIT Chennai cultivates entrepreneurial leadership through social innovation, networking, and transformative learning. With dynamic events, workshops, and competitions, CSED empowers members to create sustainable impact.",
    imageUrl: "/csed.png",
    socialLinks: {
      twitter: "https://twitter.com/vitchennai",
      linkedin: "https://linkedin.com/school/vit-chennai"
    }
  },
];

const partners: Partner[] = [
  {
    id: 3,
    name: "Vertex Innovate",
    role: "Community Partner",
    bio: "Vertex Innovate is an EdTech entertainment platform connecting students across colleges, fostering collaboration, and bridging academia with industry—making learning fun and interactive!",
    imageUrl: "/vertex.png",
    socialLinks: {
      website: "https://www.instagram.com/vertex_innovate/"
    }
  },
  {
    id: 4,
    name: "IBM Z Community",
    role: "Technology Partner",
    bio: "IBM Z Community VIT Chennai unites tech enthusiasts to explore enterprise computing. We empower students through cutting-edge tech, challenges and industry mentorship.",
    imageUrl: "/IBMz.jpg",
    socialLinks: {
      website: "https://www.instagram.com/ibmzcommunity.vitc"
    }
  }
];

const OrganisersSection: React.FC = () => {
  return (
    <section id="organisers" className="text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          
          
          <h2 className="mb-10 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
            <span className="text-white">MEET OUR </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">ORGANISERS</span>
          </h2>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "8rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            SPECTRUM is powered by OSPC x CSED, with Vertex Innovate as our community partner, bringing together the best minds to create an electrifying innovation battlefield.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24 px-3">
          {organizers.map((organizer) => (
            <motion.div
              key={organizer.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glow-wrapper w-full"
            >
              <Card className="relative h-full bg-black/20 hover:bg-black/30 transition-colors overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 card-container !rounded-none">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="p-6 space-y-4">
                  <div className="relative h-44 w-full mb-4 flex items-center justify-center">
                    <div className="relative w-[90%] h-full">
                      <Image
                        src={organizer.imageUrl}
                        alt={organizer.name}
                        fill
                        className="object-contain brightness-200"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-white tracking-wide">{organizer.name}</h3>
                      <p className="text-purple-400 font-medium text-lg">{organizer.role}</p>
                      <p className="text-gray-300 leading-relaxed text-base">{organizer.bio}</p>
                    </div>

                    <div className="flex gap-4 mt-4">
                      {Object.entries(organizer.socialLinks).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <span className="sr-only">{platform}</span>
                          {platform === 'twitter' && <TwitterLogoIcon className="h-6 w-6" />}
                          {platform === 'linkedin' && <LinkedInLogoIcon className="h-6 w-6" />}
                          {platform === 'github' && <GitHubLogoIcon className="h-6 w-6" />}
                          {platform === 'website' && <GlobeIcon className="h-6 w-6" />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-center font-bold tracking-wider leading-tight">
            <span className="text-white">OUR </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">PARTNERS</span>
          </h2>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "8rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto px-3">
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glow-wrapper w-full"
            >
              <Card className="relative h-full bg-black/20 hover:bg-black/30 transition-colors overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 card-container !rounded-none">
                <div className="a l"></div>
                <div className="a r"></div>
                <div className="a t"></div>
                <div className="a b"></div>
                <div className="p-4 space-y-3">
                  <div className="relative h-36 w-full flex items-center justify-center">
                    <div className="relative w-[95%] h-full">
                      <Image
                        src={partner.imageUrl}
                        alt={partner.name}
                        fill
                        className="object-contain brightness-200"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white tracking-wide text-center">{partner.name}</h3>
                      <p className="text-purple-400 font-medium text-sm text-center">{partner.role}</p>
                      <p className="text-gray-300 leading-relaxed text-xs text-center">{partner.bio}</p>
                    </div>

                    <div className="flex justify-center mt-1">
                      {partner.socialLinks.website && (
                        <a
                          href={partner.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          <span className="sr-only">Instagram</span>
                          <InstagramLogoIcon className="h-5 w-5" />
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
          box-shadow: 0 0 30px 8px rgba(168, 85, 247, 0.4);
          z-index: -1;
        }

        .card-container {
          position: relative;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(0, 0, 0, 0.4));
        }

        .card-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(168, 85, 247, 0.2), transparent 70%);
          pointer-events: none;
        }

        .a {
          pointer-events: none;
          position: absolute;
          --w: 2px;
          --g: #fff0, #fff 50%, #fff 50%, #fff0;
          z-index: 30;
          filter: drop-shadow(0 0 5px rgba(168, 85, 247, 1));
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
            #fff0 0%, 
            #fff 15%, 
            #fff 85%, 
            #fff0 100%
          );
          top: 0;
          bottom: 0;
          width: var(--w);
          box-shadow: 0 0 15px 2px rgba(168, 85, 247, 0.8);
        }

        .r {
          right: 0;
          background: linear-gradient(to bottom, 
            #fff0 0%, 
            #fff 15%, 
            #fff 85%, 
            #fff0 100%
          );
          top: 0;
          bottom: 0;
          width: var(--w);
          box-shadow: 0 0 15px 2px rgba(168, 85, 247, 0.8);
        }

        .t {
          top: 0;
          background: linear-gradient(to right, 
            #fff0 0%, 
            #fff 15%, 
            #fff 85%, 
            #fff0 100%
          );
          left: 0;
          right: 0;
          height: var(--w);
          box-shadow: 0 0 15px 2px rgba(168, 85, 247, 0.8);
        }

        .b {
          bottom: 0;
          background: linear-gradient(to right, 
            #fff0 0%, 
            #fff 15%, 
            #fff 85%, 
            #fff0 100%
          );
          left: 0;
          right: 0;
          height: var(--w);
          box-shadow: 0 0 15px 2px rgba(168, 85, 247, 0.8);
        }

        .card-container {
          border-radius: 0 !important;
        }

        .card-container > div:first-child {
          border-radius: 0 !important;
        }

        .card-container:hover {
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.5);
        }

        .card-container:hover .a {
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 1));
        }

        .card-container:hover .l,
        .card-container:hover .r,
        .card-container:hover .t,
        .card-container:hover .b {
          box-shadow: 0 0 20px 3px rgba(168, 85, 247, 1);
        }

        .card-container:hover::before {
          box-shadow: 0 0 45px 10px rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </section>
  );
};

export default OrganisersSection;