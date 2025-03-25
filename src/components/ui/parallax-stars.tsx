"use client";

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

// Seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export const ParallaxStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if device supports touch
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Set canvas size and initialize stars
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      
      // Reinitialize stars when canvas size changes
      initStars();
    };

    // Initialize stars with deterministic values
    const initStars = () => {
      const stars: Star[] = [];
      // Adjust number of stars based on screen size
      const numStars = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000));
      const seed = 12345; // Fixed seed for deterministic values

      for (let i = 0; i < numStars; i++) {
        const r1 = seededRandom(seed + i);
        const r2 = seededRandom(seed + i + 1);
        const r3 = seededRandom(seed + i + 2);
        const r4 = seededRandom(seed + i + 3);
        const r5 = seededRandom(seed + i + 4);

        stars.push({
          x: r1 * canvas.width,
          y: r2 * canvas.height,
          size: r3 * (isTouchDevice.current ? 1.5 : 2) + 1, // Slightly larger stars on mobile
          speed: r4 * 0.2 + 0.05,
          opacity: r5 * 0.5 + 0.2,
        });
      }
      starsRef.current = stars;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Handle both mouse and touch events
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const event = e instanceof MouseEvent ? e : e.touches[0];
      
      if (!event) return;
      
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    // Add touch event listeners
    if (isTouchDevice.current) {
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchstart', handlePointerMove);
    } else {
      window.addEventListener('mousemove', handlePointerMove);
    }

    // Animation
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      starsRef.current.forEach((star) => {
        // Only apply parallax effect on non-touch devices
        if (!isTouchDevice.current) {
          // Calculate parallax effect based on pointer position
          const parallaxX = (mouseX - centerX) * 0.005;
          const parallaxY = (mouseY - centerY) * 0.005;

          // Update star position with parallax
          star.x += parallaxX * star.speed;
          star.y += parallaxY * star.speed;

          // Wrap around screen with proper boundaries
          if (star.x < 0) star.x = rect.width;
          if (star.x > rect.width) star.x = 0;
          if (star.y < 0) star.y = rect.height;
          if (star.y > rect.height) star.y = 0;
        }

        // Draw star with anti-aliasing
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      // Only remove mouse event listener if not a touch device
      if (!isTouchDevice.current) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: isTouchDevice.current ? 0.3 : 0.5 }} // Slightly reduce opacity on mobile for better visibility
    />
  );
}; 