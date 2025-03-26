'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PrizesSection() {
  return (
    <section id="prizes" className="min-h-screen py-16 text-white relative overflow-hidden bg-black">
      {/* All background gradients removed */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          <h2 className="mb-10 text-center font-bold tracking-wider leading-tight" style={{ fontSize: "clamp(40px, 10vw, 70px)" }}>
             <span className="text-white">INTERSTELLAR </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">PRIZES</span>
          </h2>
          <motion.div 
            className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "8rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-black border-indigo-800/30 backdrop-blur-md mb-12 max-w-3xl mx-auto shadow-lg">
            <CardContent className="pt-6">
              <p className="text-center text-gray-200 text-base sm:text-lg mb-2">
                Get ready for an <span className="text-cyan-300">out-of-this-world</span> prize pool! Our sponsors are preparing something extraordinary for the most innovative and impactful projects.
              </p>
              <p className="text-center text-gray-300 text-sm sm:text-base">
                Winners will launch their careers into new dimensions.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-5xl mx-auto">
          {/* First Prize Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 0 0 0 transparent" }}
            >
              <Card className="bg-black border-indigo-800/30 backdrop-blur-md aspect-square w-full max-w-xs mx-auto overflow-hidden relative shadow-lg">
                {/* Border glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>
                
                <CardContent className="flex flex-col items-center justify-center h-full text-center p-6 z-10">
                  <motion.div 
                    className="text-5xl sm:text-6xl mb-3 sm:mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    🏆
                  </motion.div>
                  <CardTitle className="text-xl sm:text-2xl mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">First Prize</CardTitle>
                  <Badge className="bg-indigo-900/40 hover:bg-indigo-900/60 text-gray-200">Coming Soon</Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Second Prize Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 0 0 0 transparent" }}
            >
              <Card className="bg-black border-indigo-800/30 backdrop-blur-md aspect-square w-full max-w-xs mx-auto overflow-hidden relative shadow-lg">
                {/* Border glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
                
                <CardContent className="flex flex-col items-center justify-center h-full text-center p-6 z-10">
                  <motion.div 
                    className="text-5xl sm:text-6xl mb-3 sm:mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    🥈
                  </motion.div>
                  <CardTitle className="text-xl sm:text-2xl mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-400">Second Prize</CardTitle>
                  <Badge className="bg-indigo-900/40 hover:bg-indigo-900/60 text-gray-200">Coming Soon</Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Third Prize Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="group"
          >
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 0 0 0 transparent" }}
            >
              <Card className="bg-black border-indigo-800/30 backdrop-blur-md aspect-square w-full max-w-xs mx-auto overflow-hidden relative shadow-lg">
                {/* Border glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                
                <CardContent className="flex flex-col items-center justify-center h-full text-center p-6 z-10">
                  <motion.div 
                    className="text-5xl sm:text-6xl mb-3 sm:mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    🥉
                  </motion.div>
                  <CardTitle className="text-xl sm:text-2xl mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-600">Third Prize</CardTitle>
                  <Badge className="bg-indigo-900/40 hover:bg-indigo-900/60 text-gray-200">Coming Soon</Badge>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="inline-block bg-black border-indigo-800/30 backdrop-blur-md shadow-lg">
            <CardContent className="py-4">
              <p className="text-base sm:text-lg text-cyan-100">
                More exciting prizes and <span className="text-cyan-300">cosmic surprises</span> to be announced!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}