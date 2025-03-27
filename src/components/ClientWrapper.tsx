'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PyramidLoader } from './ui/PyramidLoader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This will run only on the client side
    document.documentElement.removeAttribute('data-headlessui-focus-visible');
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <PyramidLoader onLoadComplete={handleLoadComplete} duration={2500} />
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={isLoading ? 'invisible' : 'visible'}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
} 