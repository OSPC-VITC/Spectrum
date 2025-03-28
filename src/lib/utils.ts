import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to a section with natural background transition
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Offset from the top (default: 64px for navbar)
 */
export function smoothScrollToSection(sectionId: string, offset: number = 64) {
  // Get the section element
  const targetSection = document.getElementById(sectionId);
  if (!targetSection) return;

  // Get all sections
  const allSections = document.querySelectorAll('section[id]');
  
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 768;
  
  // Use a smaller offset on mobile to account for the smaller navbar
  const effectiveOffset = isMobile ? 48 : offset;
  
  // First, remove any existing target from all sections
  allSections.forEach(section => {
    if (section.id !== sectionId) {
      section.classList.remove('target');
    }
  });
  
  // Apply class changes in a requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    // Create a subtle background transition by applying fade classes
    allSections.forEach(section => {
      if (section.id !== sectionId) {
        section.classList.add('section-fade-out');
        section.classList.remove('section-fade-in');
      } else {
        section.classList.add('section-fade-in');
        section.classList.remove('section-fade-out');
      }
    });

    // Apply a temporary class to the target section that will be removed after scrolling completes
    targetSection.classList.add('scrolling-to');
    
    // Calculate position once before scrolling
    const top = targetSection.getBoundingClientRect().top + window.pageYOffset - effectiveOffset;
    
    // Use native scroll with performance optimizations
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
    
    // After scrolling completes, mark the target section to apply the blend effect
    // Adjust the timeout based on device - faster on mobile
    const scrollCompleteDelay = isMobile ? 500 : 700;
    
    setTimeout(() => {
      // Use requestAnimationFrame for smoother callback handling
      requestAnimationFrame(() => {
        // Add the target pseudo class
        targetSection.setAttribute('id', `${sectionId}-target`);
        
        // Second RAF to handle the ID restoration
        requestAnimationFrame(() => {
          setTimeout(() => {
            targetSection.setAttribute('id', sectionId);
            targetSection.classList.remove('scrolling-to');
          }, 50);
        });
      });
    }, scrollCompleteDelay);
  });
}

/**
 * Creates a performant intersection observer for lazy loading content
 * This improves scroll performance by only rendering what's visible
 */
export function createLazyObserver(options: IntersectionObserverInit = {}) {
  // Default options optimized for performance
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '200px 0px',
    threshold: 0.01,
    ...options
  };
  
  // Observer instance that will be reused
  let observer: IntersectionObserver | null = null;
  
  // Map to track elements that have already been processed
  const processedElements = new WeakMap<Element, boolean>();
  
  // Function to observe elements
  const observe = (
    element: Element | null, 
    onIntersect: () => void,
    onlyOnce = true
  ) => {
    if (!element) return () => {};
    
    // Don't re-observe elements that have already been processed
    if (onlyOnce && processedElements.get(element)) return () => {};
    
    // Lazy initialize the observer
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            onIntersect();
            
            // Mark as processed and unobserve if only once
            if (onlyOnce) {
              processedElements.set(el, true);
              observer?.unobserve(el);
            }
          }
        });
      }, defaultOptions);
    }
    
    // Start observing
    observer.observe(element);
    
    // Return cleanup function
    return () => {
      observer?.unobserve(element);
    };
  };
  
  return { observe };
}
