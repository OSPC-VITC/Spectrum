"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Define proper types for the component
interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  brightness: number;
  speed: number;
}

interface OrbitingElement {
  angle: number;
  distance: number;
  radius: number;
  speed: number;
  color: string;
}

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState<boolean>(false);

  // Calculate countdown to April 11, 2025
  useEffect(() => {
    const hackathonDate = new Date('April 11, 2025 09:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = hackathonDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
      
      if (distance < 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Entrance animation
  useEffect(() => {
    setMounted(true);
  }, []);

  // Starry background animation with shooting stars
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create stars for the space background
    const starCount = window.innerWidth < 768 ? 300 : 600;
    const stars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1
      });
    }
    
    // Create shooting stars
    const shootingStars: {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      active: boolean;
      ttl: number;
    }[] = [];
    
    const createShootingStar = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height / 2); // More coverage
      
      shootingStars.push({
        x,
        y,
        length: Math.random() * 100 + 70, // Longer trails
        speed: Math.random() * 12 + 10, // Faster
        angle: Math.PI / 4 + Math.random() * Math.PI / 6,
        active: true,
        ttl: Math.random() * 60 + 60 // Live longer
      });
    };
    
    // Create multiple shooting stars to start
    for (let i = 0; i < 3; i++) {
      createShootingStar();
    }
    
    // Create orbiting elements around the title
    const orbitingElements: OrbitingElement[] = [];
    const orbitRadius = 220; // Increased distance from the center
    const orbitCount = 10; // More orbiting elements
    
    for (let i = 0; i < orbitCount; i++) {
      orbitingElements.push({
        angle: (i / orbitCount) * Math.PI * 2, // Evenly spaced angles
        distance: orbitRadius + Math.random() * 60 - 30,
        radius: Math.random() * 4 + 2,
        speed: Math.random() * 0.02 + 0.008,
        color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${200 + Math.random() * 55}, 0.8)`
      });
    }
    
    // Animation loop
    let lastUpdateTime = 0;
    const framesPerSecond = 60;
    const frameInterval = 1000 / framesPerSecond;
    let shootingStarTimer = 0;
    
    function animate(currentTime: number): void {
      requestAnimationFrame(animate);
      
      // Throttle frame rate
      if (currentTime - lastUpdateTime < frameInterval || !ctx) return;
      lastUpdateTime = currentTime;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with enhanced twinkling
      stars.forEach(star => {
        // Move stars downward very slowly
        star.y += star.speed * 0.5;
        
        // Enhanced twinkling effect
        star.brightness += (Math.random() - 0.5) * 0.08;
        star.brightness = Math.max(0.3, Math.min(1, star.brightness));
        
        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Draw star with slight glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
        
        // Add glow for some stars
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(
            star.x, star.y, star.radius * 0.5,
            star.x, star.y, star.radius * 2
          );
          glow.addColorStop(0, `rgba(255, 255, 255, ${star.brightness * 0.5})`);
          glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });
      
      // Handle shooting stars - more frequent
      // Handle shooting stars - more frequent
      shootingStarTimer++;
      if (shootingStarTimer > 30 && Math.random() > 0.9) { 
        createShootingStar();
        shootingStarTimer = 0;
      }

      
      shootingStars.forEach((shootingStar, index) => {
        if (!shootingStar.active) return;
        
        // Update position
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        
        // Draw shooting star
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        
        // Calculate tail end point
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;
        
        // Create gradient for the tail with more vibrant colors
        const gradient = ctx.createLinearGradient(
          shootingStar.x, shootingStar.y, tailX, tailY
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.2, 'rgba(155, 190, 255, 0.6)');
        gradient.addColorStop(0.6, 'rgba(120, 140, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
        
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3; // Thicker line
        ctx.stroke();
        
        // Add a more pronounced glowing head
        ctx.beginPath();
        ctx.arc(shootingStar.x, shootingStar.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        
        // Add a subtle glow around the head
        ctx.beginPath();
        ctx.arc(shootingStar.x, shootingStar.y, 6, 0, Math.PI * 2);
        const headGlow = ctx.createRadialGradient(
          shootingStar.x, shootingStar.y, 1,
          shootingStar.x, shootingStar.y, 6
        );
        headGlow.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
        headGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = headGlow;
        ctx.fill();
        
        // Decrease time to live
        shootingStar.ttl--;
        
        // Remove if off screen or expired
        if (
          shootingStar.x < 0 ||
          shootingStar.x > canvas.width ||
          shootingStar.y < 0 ||
          shootingStar.y > canvas.height ||
          shootingStar.ttl <= 0
        ) {
          shootingStar.active = false;
          shootingStars.splice(index, 1);
        }
      });
      
      // Draw orbiting elements around the title
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const centerX = titleRect.left + titleRect.width / 2;
        const centerY = titleRect.top + titleRect.height / 2;
        
        orbitingElements.forEach(element => {
          // Update angle for revolution
          element.angle += element.speed;
          
          // Calculate position with slight wobble effect
          const wobble = Math.sin(currentTime * 0.001 + element.angle) * 15;
          const x = centerX + Math.cos(element.angle) * (element.distance + wobble);
          const y = centerY + Math.sin(element.angle) * (element.distance + wobble);
          
          // Draw orbiting element with enhanced glow
          ctx.beginPath();
          ctx.arc(x, y, element.radius, 0, Math.PI * 2);
          ctx.fillStyle = element.color;
          ctx.fill();
          
          // Add stronger glow
          ctx.beginPath();
          ctx.arc(x, y, element.radius * 3.5, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            x, y, element.radius,
            x, y, element.radius * 3.5
          );
          gradient.addColorStop(0, element.color);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Draw a longer and more pronounced trail
          const trailLength = 12;
          for (let i = 0; i < trailLength; i++) {
            const trailX = centerX + Math.cos(element.angle - i * 0.08) * (element.distance + Math.sin((currentTime * 0.001) - i * 0.1) * 15);
            const trailY = centerY + Math.sin(element.angle - i * 0.08) * (element.distance + Math.sin((currentTime * 0.001) - i * 0.1) * 15);
            ctx.beginPath();
            ctx.arc(trailX, trailY, element.radius * (1 - i / trailLength), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${element.color.slice(5, -1)}, ${0.8 * (1 - i / trailLength)})`;
            ctx.fill();
          }
        });
      }
    }
    
    animate(0);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative w-full bg-black overflow-hidden pt-20">
      {/* Canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      
      {/* Enhanced light rays effect */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute -inset-[200px] bg-gradient-radial from-purple-900/40 via-transparent to-transparent blur-3xl transform translate-x-1/4 translate-y-1/4 animate-pulse"></div>
        <div className="absolute -inset-[200px] bg-gradient-radial from-blue-900/30 via-transparent to-transparent blur-3xl transform -translate-x-1/4 -translate-y-1/4 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -inset-[150px] bg-gradient-radial from-cyan-900/20 via-transparent to-transparent blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Main content */}
      <div className={`relative z-10 w-full h-full flex flex-col items-center justify-start px-4 md:px-8 transition-all duration-1500 ease-in-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo/title centered with enhanced styling and increased size */}
        <div className="w-full text-center mb-14 md:mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-radial from-purple-600/30 via-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
          
          <h1 
            ref={titleRef}
            className="text-7xl md:text-9xl lg:text-9xl font-black tracking-tight relative inline-block animate-float3"
          >
            <Image
              className="w-[450px] md:w-[700px] lg:w-[800px] drop-shadow-2xl transform transition-all duration-700 hover:scale-105 animate-float3"
              src="/logo.png"
              alt="Hackathon Logo"
              width={800}
              height={800}
            />
            {/* Enhanced animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-blue-500/40 to-cyan-400/40 rounded-lg blur-3xl opacity-70 animate-pulse"></div>
          </h1>
          
          {/* Tagline with animation */}
          <p className="text-cyan-300/90 mt-4 font-light tracking-wider text-lg md:text-xl animate-fadeIn">INNOVATION • TECHNOLOGY • ENTREPRENEURSHIP</p>
        </div>
        
        <div className="w-full max-w-4xl flex flex-col items-center justify-center">
  <div className="grid grid-cols-4 gap-4 md:gap-8 text-center">
    {/* Days */}
    <div className="flex flex-col items-center">
      <div className="bg-black border border-gray-700 p-4 w-24 h-24 flex items-center justify-center mb-2 rounded-lg">
        <span className="text-4xl font-mono font-bold text-white">
          {countdown.days.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm text-gray-300 uppercase tracking-wider">Days</span>
    </div>
    
    {/* Hours */}
    <div className="flex flex-col items-center">
      <div className="bg-black border border-gray-700 p-4 w-24 h-24 flex items-center justify-center mb-2 rounded-lg">
        <span className="text-4xl font-mono font-bold text-white">
          {countdown.hours.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm text-gray-300 uppercase tracking-wider">Hours</span>
    </div>
    
    {/* Minutes */}
    <div className="flex flex-col items-center">
      <div className="bg-black border border-gray-700 p-4 w-24 h-24 flex items-center justify-center mb-2 rounded-lg">
        <span className="text-4xl font-mono font-bold text-white">
          {countdown.minutes.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm text-gray-300 uppercase tracking-wider">Minutes</span>
    </div>
    
    {/* Seconds */}
    <div className="flex flex-col items-center">
      <div className="bg-black border border-gray-700 p-4 w-24 h-24 flex items-center justify-center mb-2 rounded-lg">
        <span className="text-4xl font-mono font-bold text-white">
          {countdown.seconds.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm text-gray-300 uppercase tracking-wider">Seconds</span>
    </div>
  </div>
  
  {/* Register Now button */}
  <div className="mt-12">
    <button className="bg-black border border-white text-white hover:bg-white hover:text-black transition-colors px-10 py-3 font-medium rounded-lg">
      Register Now
    </button>
  </div>
  
  {/* Event date */}
  <div className="mt-6 text-center">
    <span className="text-white text-lg">
      April 11-12, 2025
    </span>
  </div>
</div>
              </div>
            </div>
            );
          };

          export default HeroSection;