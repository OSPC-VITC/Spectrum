'use client';

import { useEffect } from 'react';

// Scroll optimization manager
// This centralizes all scroll events to improve performance but avoids interfering with framer-motion

type ScrollCallback = (scrollY: number, delta: number) => void;

class ScrollManager {
  private lastScrollY: number = 0;
  private ticking: boolean = false;
  private callbacks: Set<ScrollCallback> = new Set();
  private rafId: number | null = null;
  private enabled: boolean = true;
  
  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize with current scroll position
      this.lastScrollY = window.scrollY;
      
      // Setup passive scroll listener for better performance
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      
      // Add resize handling
      window.addEventListener('resize', this.triggerCallbacks, { passive: true });
    }
  }
  
  private handleScroll = () => {
    if (!this.enabled) return;
    
    if (!this.ticking) {
      // Use requestAnimationFrame to throttle scroll events
      this.rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - this.lastScrollY;
        
        // Copy callbacks to avoid issues if callbacks modify the set
        const callbacksArray = Array.from(this.callbacks);
        
        // Only process if there's a meaningful change (improves performance)
        if (Math.abs(delta) > 0) {
          callbacksArray.forEach(callback => {
            try {
              callback(currentScrollY, delta);
            } catch (error) {
              console.error('Error in scroll callback:', error);
            }
          });
          
          this.lastScrollY = currentScrollY;
        }
        
        this.ticking = false;
      });
      
      this.ticking = true;
    }
  };
  
  public triggerCallbacks = () => {
    const callbacksArray = Array.from(this.callbacks);
    callbacksArray.forEach(callback => {
      try {
        callback(this.lastScrollY, 0);
      } catch (error) {
        console.error('Error in scroll callback:', error);
      }
    });
  };
  
  public subscribe = (callback: ScrollCallback): (() => void) => {
    this.callbacks.add(callback);
    
    // Safely call with current position
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        try {
          callback(window.scrollY, 0);
        } catch (error) {
          console.error('Error in initial scroll callback:', error);
        }
      }, 50);
    }
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  };
  
  public pauseScrollHandling() {
    this.enabled = false;
  }
  
  public resumeScrollHandling() {
    this.enabled = true;
  }
  
  public destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.triggerCallbacks);
      
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
      }
      
      this.callbacks.clear();
    }
  }
}

// Create singleton instance only on client side
export const scrollManager = typeof window !== 'undefined' 
  ? new ScrollManager() 
  : null;

// Hook to use the scroll manager
export function useScrollPosition(callback: ScrollCallback) {
  useEffect(() => {
    if (!scrollManager) return;
    
    const unsubscribe = scrollManager.subscribe(callback);
    return unsubscribe;
  }, [callback]);
} 