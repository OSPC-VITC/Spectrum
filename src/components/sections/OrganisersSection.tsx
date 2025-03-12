'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    instagram?: string;
  };
}

const organizers: Organizer[] = [
  {
    id: 1,
    name: "OSPC",
    role: "Lead Organizer",
    bio: "The Open Source Programming Club at VIT Chennai is dedicated to fostering innovation through open source collaboration and building a vibrant tech community on campus.",
    imageUrl: "/images/organisers/ospc.jpg",
    socialLinks: {
      twitter: "https://twitter.com/ospcvitc",
      linkedin: "https://www.linkedin.com/company/opensource-programming-club-vitc/",
      instagram: "http://instagram.com/ospc_vitc/",
    }
  },
  {
    id: 2,
    name: "CSED",
    role: "Co-Organizer",
    bio: "The Computer Science & Engineering Department at VIT Chennai provides cutting-edge education and research opportunities, supporting students in their technological and entrepreneurial endeavors.",
    imageUrl: "/images/organisers/csed.jpg",
    socialLinks: {
      twitter: "https://twitter.com/vitchennai",
      linkedin: "https://www.linkedin.com/company/centre-for-social-entrepreneurship-and-development-vitc/about/",
      instagram: "https://www.instagram.com/csed.vitc/"
    }
  },
  {
    id: 3,
    name: "Vertex Innovate",
    role: "Community Partner",
    bio: "Vertex Innovate serves as a catalyst for entrepreneurial excellence, connecting innovators with resources and mentorship to transform ideas into impactful ventures.",
    imageUrl: "/images/organisers/vertex.jpg",
    socialLinks: {
      twitter: "https://twitter.com/vertexinnovate",
      linkedin: "https://linkedin.com/company/vertexinnovate",
      instagram: "https://www.instagram.com/vertex_innovate/"
    }
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  },
  hover: { 
    scale: 1.2,
    transition: { duration: 0.2 }
  }
};

const Organizers: React.FC = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Meet Our Organizers
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            SPECTRUM is powered by OSPC x CSED, with Vertex Innovate as our community partner, bringing together the best minds to create an electrifying innovation battlefield.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {organizers.map((organizer) => (
            <motion.div
              key={organizer.id}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={organizer.imageUrl}
                  alt={organizer.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 w-full p-6">
                  <h3 className="text-2xl font-bold">{organizer.name}</h3>
                  <p className="text-purple-400 font-medium">{organizer.role}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-300 mb-6">{organizer.bio}</p>
                
                <div className="flex space-x-4">
                  
                  {organizer.socialLinks.linkedin && (
                    <motion.a
                      href={organizer.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </motion.a>
                  )}

                  {organizer.socialLinks.instagram && (
                    <motion.a
                      href={organizer.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-600"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163C8.756 0 8.332.012 7.052.07 5.77.128 4.548.334 3.5 1.382 2.452 2.43 2.246 3.652 2.188 4.934.012 8.332 0 8.756 0 12s.012 3.668.07 4.948c.058 1.282.264 2.504 1.312 3.552 1.048 1.048 2.27 1.254 3.552 1.312 1.28.058 1.704.07 4.948.07s3.668-.012 4.948-.07c1.282-.058 2.504-.264 3.552-1.312 1.048-1.048 1.254-2.27 1.312-3.552.058-1.28.07-1.704.07-4.948s-.012-3.668-.07-4.948c-.058-1.282-.264-2.504-1.312-3.552-1.048-1.048-2.27-1.254-3.552-1.312-1.28-.058-1.704-.07-4.948-.07zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                      </svg>
                    </motion.a>
                  )}
                  
                  {organizer.socialLinks.github && (
                    <motion.a
                      href={organizer.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Organizers;