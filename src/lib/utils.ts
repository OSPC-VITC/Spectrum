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
  
  // Scroll to the section
  const top = targetSection.offsetTop - effectiveOffset;
  
  // On mobile, use a shorter, snappier animation
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
  
  // After scrolling completes, mark the target section to apply the blend effect
  // Adjust the timeout based on device - faster on mobile
  const scrollCompleteDelay = isMobile ? 500 : 700;
  
  setTimeout(() => {
    // Add the target pseudo class
    targetSection.setAttribute('id', `${sectionId}-target`);
    setTimeout(() => {
      targetSection.setAttribute('id', sectionId);
      targetSection.classList.remove('scrolling-to');
    }, 50);
  }, scrollCompleteDelay); // This timing should match the scroll duration
}
