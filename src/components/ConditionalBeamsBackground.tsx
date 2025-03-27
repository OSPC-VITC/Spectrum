'use client';

import React, { useEffect, useState } from 'react';
import { BeamsBackground } from '@/components/ui/beams-background';

interface ConditionalBeamsBackgroundProps {
  children: React.ReactNode;
}

// A component that only renders BeamsBackground on desktop devices
export default function ConditionalBeamsBackground({ children }: ConditionalBeamsBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if the device is mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only render after client-side hydration to avoid SSR mismatch
  if (!isClient) {
    return (
      <div className="bg-black">
        {children}
      </div>
    );
  }

  // For mobile devices, use a simple black background to improve performance
  if (isMobile) {
    return (
      <div className="bg-black">
        {children}
      </div>
    );
  }

  // For desktop devices, use the full BeamsBackground
  return (
    <BeamsBackground intensity="strong">
      {children}
    </BeamsBackground>
  );
} 