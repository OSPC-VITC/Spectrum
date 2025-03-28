'use client';

import { useEffect } from 'react';

/**
 * PerformanceOptimizer component
 * Applies global optimizations for smooth scrolling without changing backgrounds
 */
export function PerformanceOptimizer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Apply passive event listeners to all scroll events
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, listener, options) {
      let newOptions = options;
      
      // Make scroll events passive by default for better performance
      if (type === 'scroll' || type === 'touchstart' || type === 'touchmove') {
        if (typeof options === 'object') {
          newOptions = { ...options, passive: options.passive !== false };
        } else {
          newOptions = { passive: true };
        }
      }
      
      return originalAddEventListener.call(this, type, listener, newOptions);
    };
    
    // 2. Enable hardware acceleration only for specific elements
    // Avoid transformZ(0) on all elements to prevent framer-motion issues
    const style = document.createElement('style');
    style.innerHTML = `
      /* Apply selective hardware acceleration */
      section, 
      .main-content,
      header,
      footer,
      .scroll-container {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* Optimize scroll-snapping behavior for smoother scrolling */
      html {
        scroll-snap-type: y proximity;
        scroll-behavior: smooth;
        overscroll-behavior: none;
      }
      
      /* Optimize image rendering */
      img, video {
        backface-visibility: hidden;
      }
      
      /* Prevent browser paints during scrolling */
      html.is-scrolling .no-pointer-during-scroll {
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // 3. Detect active scrolling to optimize rendering
    let scrollTimeout: NodeJS.Timeout;
    const scrollHandler = () => {
      document.documentElement.classList.add('is-scrolling');
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling');
      }, 150);
    };
    
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // 4. Optimize images with loading="lazy" attribute
    const imgs = document.querySelectorAll('img:not([loading])');
    imgs.forEach(img => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
    
    return () => {
      // Cleanup
      EventTarget.prototype.addEventListener = originalAddEventListener;
      document.head.removeChild(style);
      window.removeEventListener('scroll', scrollHandler);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  // This component doesn't render anything
  return null;
} 