"use client";

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
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
  const timeRef = useRef(0);

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

    // Star colors with more variations
    const starColors = [
      'rgba(255, 255, 255, opacity)', // White
      'rgba(173, 216, 230, opacity)', // Light Blue
      'rgba(255, 223, 186, opacity)', // Light Orange
      'rgba(205, 180, 219, opacity)', // Light Purple
      'rgba(176, 224, 230, opacity)', // Powder Blue
      'rgba(240, 248, 255, opacity)', // Alice Blue
      'rgba(230, 230, 250, opacity)', // Lavender
    ];

    // Initialize stars with deterministic values
    const initStars = () => {
      const stars: Star[] = [];
      // Adjust number of stars based on device type
      const numStars = isTouchDevice.current 
        ? Math.min(250, Math.floor((canvas.width * canvas.height) / 4000)) // Fewer stars for mobile
        : Math.min(350, Math.floor((canvas.width * canvas.height) / 3000)); // More stars for desktop
      
      const seed = 12345; // Fixed seed for deterministic values

      // Create a grid-based distribution for more even coverage
      const gridCols = Math.ceil(Math.sqrt(numStars * (canvas.width / canvas.height)));
      const gridRows = Math.ceil(numStars / gridCols);
      const cellWidth = canvas.width / gridCols;
      const cellHeight = canvas.height / gridRows;

      let starCount = 0;
      
      // Place stars in a grid with some randomness for natural appearance
      for (let row = 0; row < gridRows && starCount < numStars; row++) {
        for (let col = 0; col < gridCols && starCount < numStars; col++) {
          const i = starCount;
          
          const r1 = seededRandom(seed + i);
          const r2 = seededRandom(seed + i + 1);
          const r3 = seededRandom(seed + i + 2);
          const r4 = seededRandom(seed + i + 3);
          const r5 = seededRandom(seed + i + 4);
          const r6 = seededRandom(seed + i + 5);
          const r7 = seededRandom(seed + i + 6);
          const r8 = seededRandom(seed + i + 7);
          const r9 = seededRandom(seed + i + 8);
          
          // Calculate position within the cell, with some randomness
          const cellX = col * cellWidth;
          const cellY = row * cellHeight;
          const xOffset = r1 * cellWidth;
          const yOffset = r2 * cellHeight;
          
          const colorIndex = Math.floor(r8 * starColors.length);
          
          // Adjust star properties based on device type
          const sizeMultiplier = isTouchDevice.current
            ? (r3 < 0.85 ? r3 * 1.2 : r3 * 2.5) // Slightly larger stars on average for mobile
            : (r3 < 0.8 ? r3 * 1.5 : r3 * 3);   // Size distribution for desktop
          
          // Speed adjustments for different devices - make desktop stars much faster
          const speedFactor = isTouchDevice.current ? 0.15 : 0.35; // Significantly increased speed factor for desktop
          const speedBase = isTouchDevice.current ? 0.1 : 0.25;   // Significantly increased base speed for desktop
          
          stars.push({
            x: cellX + xOffset,
            y: cellY + yOffset,
            size: sizeMultiplier + 1, // Ensure minimum size
            speed: r4 * speedFactor + speedBase,
            opacity: r5 * 0.5 + 0.3,
            rotation: r6 * Math.PI * 2,
            rotationSpeed: (r7 - 0.5) * (isTouchDevice.current ? 0.02 : 0.015), // Increased rotation for desktop
            color: starColors[colorIndex],
            twinkleSpeed: r8 * (isTouchDevice.current ? 0.03 : 0.025) + (isTouchDevice.current ? 0.02 : 0.015), // Increased twinkling for desktop
            twinklePhase: r9 * Math.PI * 2
          });
          
          starCount++;
        }
      }
      
      starsRef.current = stars;
    };

    // Handle viewport resizing and maintain star distribution
    const handleResize = () => {
      if (!canvas) return;
      
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      
      setCanvasSize();
      
      // Adjust existing star positions when resizing
      if (starsRef.current.length > 0) {
        starsRef.current = starsRef.current.map(star => {
          // Scale star positions proportionally to the new canvas size
          return {
            ...star,
            x: (star.x / oldWidth) * canvas.width,
            y: (star.y / oldHeight) * canvas.height,
          };
        });
      }
    };

    setCanvasSize();
    window.addEventListener('resize', handleResize);

    // Handle both mouse and touch events
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const event = e instanceof MouseEvent ? e : e.touches[0];
      
      if (!event) return;
      
      // For desktop, apply an immediate small movement to make the effect more responsive
      if (!isTouchDevice.current && starsRef.current.length > 0) {
        const oldMouseX = mouseRef.current.x;
        const oldMouseY = mouseRef.current.y;
        const newMouseX = event.clientX - rect.left;
        const newMouseY = event.clientY - rect.top;
        
        // Calculate the movement vector
        const moveX = newMouseX - oldMouseX;
        const moveY = newMouseY - oldMouseY;
        
        // Apply a small immediate movement to stars for extra responsiveness
        // Only do this for significant mouse movements
        if (Math.abs(moveX) > 5 || Math.abs(moveY) > 5) {
          const normalizedMoveX = moveX / rect.width * 2;
          const normalizedMoveY = moveY / rect.height * 2;
          
          starsRef.current.forEach(star => {
            star.x += normalizedMoveX * star.speed * 10; // Immediate small shift
            star.y += normalizedMoveY * star.speed * 10;
          });
        }
      }
      
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

    // Draw a star shape
    const drawStar = (
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number, 
      rotation: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      
      // Star with 5 points
      const outerRadius = size;
      const innerRadius = size / 2;
      
      for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI * 2 * i) / 10;
        
        if (i === 0) {
          ctx.moveTo(radius, 0);
        } else {
          ctx.lineTo(
            radius * Math.cos(angle),
            radius * Math.sin(angle)
          );
        }
      }
      
      ctx.closePath();
      
      // Use the star's color with its current opacity
      const fillColor = color.replace('opacity', opacity.toString());
      ctx.fillStyle = fillColor;
      
      // Add glow effect
      ctx.shadowColor = fillColor;
      ctx.shadowBlur = size * 2;
      
      ctx.fill();
      ctx.restore();
    };

    // Animation
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      // Update time reference for smooth animations
      timeRef.current = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      starsRef.current.forEach((star) => {
        // Calculate twinkling effect
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinklePhase);
        const currentOpacity = Math.max(0.1, star.opacity * (0.7 + 0.3 * twinkle));
        
        // Update rotation
        star.rotation += star.rotationSpeed;

        // Different movement behavior based on device type
        if (isTouchDevice.current) {
          // For mobile: faster random movement for a more dynamic effect
          const time = timeRef.current * 0.0003; // Increased speed for mobile
          star.x += Math.sin(time + star.twinklePhase * 3) * 0.5;
          star.y += Math.cos(time + star.twinklePhase * 2) * 0.5;
          
          // Ensure stars wrap around screen
          if (star.x < -star.size * 2) star.x = canvas.width + star.size;
          if (star.x > canvas.width + star.size * 2) star.x = -star.size;
          if (star.y < -star.size * 2) star.y = canvas.height + star.size;
          if (star.y > canvas.height + star.size * 2) star.y = -star.size;
        } else {
          // For desktop: parallax effect based on mouse position
          // Apply a gentle base movement regardless of mouse
          const time = timeRef.current * 0.0006; // Further increased speed for desktop
          star.x += Math.sin(time + star.twinklePhase) * 0.4; // Further increased base movement
          star.y += Math.cos(time + star.twinklePhase * 2) * 0.4;
          
          // Calculate parallax based on mouse position
          const distanceFromCenter = {
            x: (mouseX - centerX) / centerX,
            y: (mouseY - centerY) / centerY
          };
          
          // Apply stronger parallax movement with increased responsiveness
          star.x += distanceFromCenter.x * star.speed * 5.0; // Further increased multiplier for faster response
          star.y += distanceFromCenter.y * star.speed * 5.0;
          
          // Ensure stars wrap around screen
          if (star.x < -star.size * 2) star.x = canvas.width + star.size;
          if (star.x > canvas.width + star.size * 2) star.x = -star.size;
          if (star.y < -star.size * 2) star.y = canvas.height + star.size;
          if (star.y > canvas.height + star.size * 2) star.y = -star.size;
        }

        // Draw the star
        drawStar(
          ctx,
          star.x,
          star.y,
          star.size,
          star.rotation,
          star.color,
          currentOpacity
        );
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
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
      style={{ opacity: isTouchDevice.current ? 0.5 : 0.8 }} // Increased opacity for better visibility on desktop
    />
  );
}; 