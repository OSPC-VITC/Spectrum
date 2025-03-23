'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TwitterLogoIcon, LinkedInLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
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
    bio: "The Computer Science & Engineering Department at VIT Chennai provides cutting-edge education and research opportunities, supporting students in their technological and entrepreneurial endeavors.",
    imageUrl: "/csed.png",
    socialLinks: {
      twitter: "https://twitter.com/vitchennai",
      linkedin: "https://linkedin.com/school/vit-chennai"
    }
  },
];

const OrganisersSection: React.FC = () => {
  return (
    <section id="organisers" className="bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            MEET OUR ORGANISERS
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto" />
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            SPECTRUM is powered by OSPC x CSED, with Vertex Innovate as our community partner, bringing together the best minds to create an electrifying innovation battlefield.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {organizers.map((organizer) => (
            <motion.div
              key={organizer.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
       
              <Card className="h-full bg-black/20 hover:bg-black/30 transition-colors border-2 border-gray-800 hover:border-purple-500/30 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="p-8 space-y-6">
                  <div className="relative h-48 w-full">
                    <Image
                      src={organizer.imageUrl}
                      alt={organizer.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{organizer.name}</h3>
                      <p className="text-purple-400 font-medium">{organizer.role}</p>
                      <p className="text-gray-300 leading-relaxed">{organizer.bio}</p>
                    </div>

                    <div className="flex gap-4">
                      {Object.entries(organizer.socialLinks).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
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
      </div>
    </section>
  );
};

export default OrganisersSection;