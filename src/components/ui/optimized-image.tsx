'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'quality' | 'loading' | 'alt'> {
  desktopQuality?: number;
  mobileQuality?: number;
  mobileSizes?: string;
  desktopSizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  alt?: string;
}

// eslint-disable-next-line jsx-a11y/alt-text
export function OptimizedImage({ 
  desktopQuality = 85,
  mobileQuality = 65, 
  mobileSizes = "(max-width: 768px) 100vw, 50vw",
  desktopSizes = "(max-width: 1200px) 50vw, 33vw",
  sizes,
  loading,
  priority,
  alt = '',
  ...props 
}: OptimizedImageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Determine the correct loading value
  // If priority is true, don't set loading (Next.js will use 'eager')
  // Otherwise use the provided loading value or default to 'lazy'
  const loadingValue = priority ? undefined : (loading || 'lazy');

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Server-side rendering or initial render
  if (!isClient) {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image 
        {...props}
        alt={alt}
        quality={desktopQuality}
        sizes={sizes || desktopSizes}
        priority={priority}
        loading={loadingValue}
      />
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image 
      {...props}
      alt={alt}
      quality={isMobile ? mobileQuality : desktopQuality}
      sizes={sizes || (isMobile ? mobileSizes : desktopSizes)}
      priority={priority}
      loading={loadingValue}
    />
  );
} 