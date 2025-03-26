'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="text-white pt-0 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            OSPC X CSED
          </motion.p>

          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            © 2025 Spectrum Hackathon. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
} 