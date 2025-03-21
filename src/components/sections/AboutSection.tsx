"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bolt, Shield, Clipboard } from "lucide-react";

const AboutSection: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="relative bg-black text-white py-24 overflow-hidden">
      {/* Glassmorphism background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl mb-4 text-center font-['Megrim'] text-white">
              ABOUT SPECTRUM
            </h2>
            
            <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto mb-8"></div>
            
            <p className="text-gray-300 text-xl text-center max-w-3xl mx-auto leading-relaxed">
              SPECTRUM isn&apos;t just a hackathon—it&apos;s a 24-hour innovation battlefield where technology meets entrepreneurship, and bold ideas become game-changing solutions.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 px-3 md:px-0 mx-auto max-w-lg md:max-w-none"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card className="relative rounded-xl border-0 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none"></div>
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm">
                      <Bolt className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-2xl font-['Megrim'] ml-4">The Event</h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    Powered by OSPC x CSED, with Vertex Innovate as our community partner and backing from Blackbox AI, and IBM Z, this electrifying event on April 11-12 is built to ignite disruptors.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
              
            <motion.div variants={itemVariants}>
              <Card className="relative rounded-xl border-0 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none"></div>
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm">
                      <Shield className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-2xl font-['Megrim'] ml-4">Our Approach</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    With high-impact tracks, SPECTRUM pushes participants to think like founders, build scalable solutions, and create real-world impact. But it&apos;s more than problem-solving—we&apos;re redefining hackathons with music, flash mobs, and immersive experiences.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-3 md:px-0 mx-auto max-w-lg md:max-w-none"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card className="relative rounded-xl border-0 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md group h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none"></div>
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                <CardContent className="p-6 flex-1">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </span>
                    <h3 className="text-2xl font-['Megrim'] ml-4">Innovation Battlefield</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    SPECTRUM brings together technology and entrepreneurship in a 24-hour innovation battlefield where bold ideas transform into game-changing solutions.
                  </p>
                  <div className="flex justify-end mt-4">
                    <Button variant="link" className="text-white p-0 h-auto hover:text-blue-300 transition-colors flex items-center gap-1">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="relative rounded-xl border-0 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md group h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none"></div>
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                <CardContent className="p-6 flex-1">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </span>
                    <h3 className="text-2xl font-['Megrim'] ml-4">Powerful Partnerships</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Backed by OSPC x CSED, Vertex Innovate, Blackbox AI, and IBM Z, SPECTRUM brings together industry leaders to support the next generation of innovators.
                  </p>
                  <div className="flex justify-end mt-4">
                    <Button variant="link" className="text-white p-0 h-auto hover:text-blue-300 transition-colors flex items-center gap-1">
                      Our Partners
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="relative rounded-xl border-0 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md group h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none"></div>
                <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                <CardContent className="p-6 flex-1">
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm">
                      <Clipboard className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="text-2xl font-['Megrim'] ml-4">IBM Z Speaker Session</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    IBM Z adds to the thrill with an exclusive speaker session, delivering expert insights, cutting-edge trends, and guidance to fuel your entrepreneurial journey.
                  </p>
                  <div className="flex justify-end mt-4">
                    <Button variant="link" className="text-white p-0 h-auto hover:text-blue-300 transition-colors flex items-center gap-1">
                      Session Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          {/* Call to Action Button */}
          <motion.div 
            className="flex justify-center mt-16"
            variants={itemVariants}
          >
            <Button className="group relative inline-flex items-center justify-center px-8 py-6 rounded-full text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="relative flex items-center gap-2">
                Get Ready to Build, Disrupt, and Celebrate Innovation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;