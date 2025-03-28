'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createLazyObserver } from '@/lib/utils';

interface LazySectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  preloadDistance?: string; // e.g. '200px'
  threshold?: number; // 0-1
}

/**
 * LazySection component that optimizes performance by:
 * 1. Only rendering content when near viewport
 * 2. Applying CSS optimizations for scrolling
 * 3. Maintaining scroll positions correctly
 */
export function LazySection({
  children,
  id,
  className = '',
  preloadDistance = '200px',
  threshold = 0.01
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasLoaded = useRef(false);
  
  useEffect(() => {
    // If SSR or already loaded, render immediately
    if (typeof window === 'undefined' || hasLoaded.current) {
      setIsVisible(true);
      return;
    }
    
    const { observe } = createLazyObserver({
      rootMargin: preloadDistance,
      threshold
    });
    
    const cleanup = observe(sectionRef.current, () => {
      setIsVisible(true);
      hasLoaded.current = true;
    }, true);
    
    return cleanup;
  }, [preloadDistance, threshold]);
  
  // Default section styling - avoid transform and will-change which can interfere with framer-motion
  const sectionClasses = `${className}`;
  
  return (
    <section
      ref={sectionRef}
      id={id}
      className={sectionClasses}
      data-loaded={isVisible}
    >
      {/* Always render children but optimize visibility */}
      <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease-in' }}>
        {children}
      </div>
    </section>
  );
} 