'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This will run only on the client side
    document.documentElement.removeAttribute('data-headlessui-focus-visible');
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 