'use client';

import { useState, useEffect } from 'react';
import { PyramidLoader } from './ui/PyramidLoader';

// Fixed version without using framer-motion's AnimatePresence
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
      
      <div
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
      >
        {children}
      </div>
    </>
  );
} 