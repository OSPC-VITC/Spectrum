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
  const top = targetSection.offsetTop - offset;
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
  
  // After scrolling completes, mark the target section to apply the blend effect
  setTimeout(() => {
    // Add the target pseudo class
    targetSection.setAttribute('id', `${sectionId}-target`);
    setTimeout(() => {
      targetSection.setAttribute('id', sectionId);
      targetSection.classList.remove('scrolling-to');
    }, 50);
  }, 700); // This timing should match the scroll duration
}
