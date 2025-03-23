"use client"

import React, { useEffect, useRef, useState } from 'react';

// Define proper types for the component
interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Node {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  pulseSpeed: number;
  pulseSize: number;
  connectionsCount: number;
  lastPulseTime: number;
}

interface EnergyCenter {
  x: number;
  y: number;
  radius: number;
  color: string;
  pulseRadius: number;
  maxPulseRadius: number;
  pulseOpacity: number;
  pulseSpeed: number;
  lastPulseTime: number;
  pulseDuration: number;
}

interface DataFlow {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
  completed: boolean;
}

interface ColorRGB {
  r: number;
  g: number;
  b: number;
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

  // WebGL Neural Network Visualization
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
    
    // Create nodes for the neural network visualization
    const nodeCount = window.innerWidth < 768 ? 80 : 150;
    const nodes: Node[] = [];
    const connectionDistance = window.innerWidth < 768 ? 150 : 200;
    
    // Color palette
    const colors: ColorRGB[] = [
      { r: 112, g: 0, b: 255 },    // Purple
      { r: 0, g: 255, b: 255 },    // Cyan
      { r: 255, g: 0, b: 255 }     // Pink
    ];
    
    // Create neural network nodes
    for (let i = 0; i < nodeCount; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.random() * 0.5 + 0.3})`,
        velocity: {
          x: (Math.random() - 0.5) * 0.7,
          y: (Math.random() - 0.5) * 0.7
        },
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseSize: Math.random() * 0.5 + 0.5,
        connectionsCount: 0,
        lastPulseTime: Math.random() * 5000  // Random start time for pulse animation
      });
    }
    
    // Add energy centers (hubs) for the neural network
    const energyCenters: EnergyCenter[] = [];
    const centerCount = window.innerWidth < 768 ? 3 : 5;
    
    for (let i = 0; i < centerCount; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      
      energyCenters.push({
        x: canvas.width * (0.2 + Math.random() * 0.6), // Keep centers within middle 60% of screen
        y: canvas.height * (0.2 + Math.random() * 0.6),
        radius: Math.random() * 5 + 8,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`,
        pulseRadius: 0,
        maxPulseRadius: connectionDistance * 0.8,
        pulseOpacity: 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        lastPulseTime: 0,
        pulseDuration: 3000 + Math.random() * 2000
      });
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 200;
    
    // Track mouse position
    const trackMouse = (e: MouseEvent): void => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', trackMouse);
    
    // Data flows - energy packets traveling along neural paths
    const dataFlows: DataFlow[] = [];
    const maxDataFlows = window.innerWidth < 768 ? 10 : 20;
    
    const createDataFlow = (): void => {
      // Only create new flows if we're under the limit
      if (dataFlows.length >= maxDataFlows) return;
      
      // Select random source and target nodes
      const sourceIndex = Math.floor(Math.random() * nodes.length);
      let targetIndex;
      do {
        targetIndex = Math.floor(Math.random() * nodes.length);
      } while (targetIndex === sourceIndex);
      
      const source = nodes[sourceIndex];
      const target = nodes[targetIndex];
      
      // Only create flow if nodes are close enough
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < connectionDistance * 1.5) {
        // Choose a random color from the palette
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        
        dataFlows.push({
          sourceX: source.x,
          sourceY: source.y,
          targetX: target.x,
          targetY: target.y,
          progress: 0,
          speed: Math.random() * 0.01 + 0.005,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`,
          size: Math.random() * 2 + 1,
          completed: false
        });
      }
    };
    
    // Randomly create data flows
    setInterval(() => {
      if (Math.random() > 0.5) {
        createDataFlow();
      }
    }, 300);
    
    // Create energy pulse from center
    const createEnergyPulse = (centerIndex: number): void => {
      const center = energyCenters[centerIndex];
      
      // Reset pulse
      center.pulseRadius = 10;
      center.pulseOpacity = 0.5;
      center.lastPulseTime = Date.now();
    };
    
    // Regularly emit pulses from energy centers
    energyCenters.forEach((center, index) => {
      setInterval(() => {
        createEnergyPulse(index);
      }, center.pulseDuration);
    });
    
    // Animation loop
    let lastUpdateTime = 0;
    const framesPerSecond = 60;
    const frameInterval = 1000 / framesPerSecond;
    
    function animate(currentTime: number): void {
      requestAnimationFrame(animate);
      
      // Throttle frame rate
      if (currentTime - lastUpdateTime < frameInterval || !ctx) return;
      lastUpdateTime = currentTime;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create radial gradient for background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      gradient.addColorStop(0, 'rgba(30, 0, 60, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 0, 30, 0.8)');
      
      // Fill background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between close nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connectionsCount = 0;
        
        for (let j = i + 1; j < nodes.length; j++) {
          const node1 = nodes[i];
          const node2 = nodes[j];
          
          const dx = node2.x - node1.x;
          const dy = node2.y - node1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Increase connection counter
            node1.connectionsCount++;
            node2.connectionsCount++;
            
            // Calculate opacity based on distance
            const opacity = 1 - (distance / connectionDistance);
            
            // Draw line with gradient
            const gradient = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y);
            gradient.addColorStop(0, node1.color.replace(/[^,]+(?=\))/, (opacity * 0.5).toString()));
            gradient.addColorStop(1, node2.color.replace(/[^,]+(?=\))/, (opacity * 0.5).toString()));
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.min(opacity * 1.5, 1);
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Move nodes
        node.x += node.velocity.x;
        node.y += node.velocity.y;
        
        // Handle bounds
        if (node.x < 0 || node.x > canvas.width) node.velocity.x *= -1;
        if (node.y < 0 || node.y > canvas.height) node.velocity.y *= -1;
        
        // Mouse interaction - gentle repulsion
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (1 - distance / mouseRadius) * 0.05;
          node.velocity.x -= dx * force / distance;
          node.velocity.y -= dy * force / distance;
          
          // Limit velocity
          const maxVelocity = 1.5;
          const currentVelocity = Math.sqrt(node.velocity.x * node.velocity.x + node.velocity.y * node.velocity.y);
          if (currentVelocity > maxVelocity) {
            node.velocity.x = (node.velocity.x / currentVelocity) * maxVelocity;
            node.velocity.y = (node.velocity.y / currentVelocity) * maxVelocity;
          }
        }
        
        // Calculate pulsing effect
        const timeFactor = currentTime * node.pulseSpeed;
        const pulseSize = node.radius * (1 + Math.sin(timeFactor) * 0.3 * node.pulseSize);
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Draw glow for highly connected nodes
        if (node.connectionsCount > 3) {
          const glowSize = pulseSize * (1.5 + node.connectionsCount * 0.1);
          const glowOpacity = 0.1 + Math.min(node.connectionsCount * 0.02, 0.4);
          
          const glow = ctx.createRadialGradient(
            node.x, node.y, pulseSize,
            node.x, node.y, glowSize
          );
          
          // Extract RGB from node color
          const colorMatch = node.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (colorMatch) {
            const r = colorMatch[1];
            const g = colorMatch[2];
            const b = colorMatch[3];
            
            glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${glowOpacity})`);
            glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
          }
        }
      });
      
      // Update and draw energy centers
      energyCenters.forEach(center => {
        // Draw center node
        ctx.beginPath();
        ctx.arc(center.x, center.y, center.radius * (1 + Math.sin(currentTime * center.pulseSpeed) * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = center.color;
        ctx.fill();
        
        // Draw outer glow
        const glowSize = center.radius * 3;
        const glow = ctx.createRadialGradient(
          center.x, center.y, center.radius,
          center.x, center.y, glowSize
        );
        
        // Extract RGB from center color
        const colorMatch = center.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (colorMatch) {
          const r = colorMatch[1];
          const g = colorMatch[2];
          const b = colorMatch[3];
          
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);
          glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          
          ctx.beginPath();
          ctx.arc(center.x, center.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
        
        // Update and draw pulse wave
        if (center.pulseRadius > 0) {
          center.pulseRadius += 1.5;
          center.pulseOpacity = Math.max(0, 0.5 - (center.pulseRadius / center.maxPulseRadius) * 0.5);
          
          if (center.pulseRadius > center.maxPulseRadius) {
            center.pulseRadius = 0;
          }
          
          // Draw pulse wave
          if (center.pulseRadius > 0 && center.pulseOpacity > 0) {
            ctx.beginPath();
            ctx.arc(center.x, center.y, center.pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = center.color.replace(/[^,]+(?=\))/, center.pulseOpacity.toString());
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      });
      
      // Update and draw data flows
      for (let i = dataFlows.length - 1; i >= 0; i--) {
        const flow = dataFlows[i];
        
        // Update progress
        flow.progress += flow.speed;
        
        if (flow.progress >= 1) {
          flow.completed = true;
          dataFlows.splice(i, 1);
          continue;
        }
        
        // Calculate current position
        const x = flow.sourceX + (flow.targetX - flow.sourceX) * flow.progress;
        const y = flow.sourceY + (flow.targetY - flow.sourceY) * flow.progress;
        
        // Draw energy packet
        ctx.beginPath();
        ctx.arc(x, y, flow.size, 0, Math.PI * 2);
        ctx.fillStyle = flow.color;
        ctx.fill();
        
        // Draw trailing glow
        const trailLength = 0.1; // 10% of the path
        const trailStart = Math.max(0, flow.progress - trailLength);
        
        if (trailStart > 0) {
          const startX = flow.sourceX + (flow.targetX - flow.sourceX) * trailStart;
          const startY = flow.sourceY + (flow.targetY - flow.sourceY) * trailStart;
          
          const gradient = ctx.createLinearGradient(startX, startY, x, y);
          
          // Extract RGB from flow color
          const colorMatch = flow.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (colorMatch) {
            const r = colorMatch[1];
            const g = colorMatch[2];
            const b = colorMatch[3];
            
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
            gradient.addColorStop(1, flow.color);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = flow.size * 1.5;
            ctx.moveTo(startX, startY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
      }
    }
    
    animate(0);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', trackMouse);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black to-purple-950/30 overflow-hidden">
      {/* Canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      
      {/* Glass effect hero content */}
      <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-8 transition-opacity duration-1000 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* SPECTRUM title centered and larger */}
        <div className="w-full text-center mb-8 md:mb-12">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight relative inline-block"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 animate-pulse">
              SPECTRUM
            </span>
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-cyan-400/20 rounded-lg blur-xl opacity-30 animate-pulse"></div>
          </h1>
        </div>
        
        <div className="max-w-5xl w-full">
          <div className="bg-black/40 backdrop-blur-lg p-6 md:p-10 rounded-xl border border-purple-500/20 shadow-xl transform transition-all duration-700 ease-out hover:border-purple-500/40 hover:shadow-purple-500/5">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Left side: Content */}
              <div className="flex-1 space-y-4 md:space-y-6">
                {/* Subtitle with typing effect */}
                <div className="h-12 md:h-16">
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl relative overflow-hidden after:absolute after:right-0 after:top-0 after:bg-gradient-to-l after:from-black after:to-transparent after:w-8 after:h-full">
                    A 24-hour innovation battlefield where technology meets entrepreneurship, and bold ideas become game-changing solutions.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-400">
                  <span className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300">
                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping"></span>
                    OSPC x CSED
                  </span>
                  <span className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    Vertex Innovate
                  </span>
                  <span className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                    Blackbox AI
                  </span>
                  <span className="flex items-center gap-2 hover:text-pink-400 transition-colors duration-300">
                    <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                    IBM Z
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3 pt-2 md:pt-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold text-base hover:opacity-90 transform transition hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden group">
                    <span className="relative z-10">Register Now</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-purple-500/50 text-white rounded-lg font-bold text-base hover:bg-purple-500/10 transition hover:border-purple-400 relative overflow-hidden group">
                    <span className="relative z-10">Learn More</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
              
              {/* Right side: Countdown with animation */}
              <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 transform transition-all duration-700 ease-out hover:scale-105">
                <div className="bg-black/30 backdrop-blur-sm p-4 md:p-5 rounded-lg border border-cyan-500/20 relative overflow-hidden">
                  {/* Animated background glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 via-blue-500/10 to-cyan-400/10 rounded-lg blur-xl opacity-30 animate-pulse"></div>
                  
                  <h2 className="text-lg font-bold text-center mb-2 text-gray-100">Event Starts In</h2>
                  
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    <div className="flex flex-col items-center transform transition hover:scale-110 duration-300">
                      <div className="bg-gradient-to-b from-purple-900/60 to-black/60 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-1 border border-purple-500/10 relative overflow-hidden">
                        <span className="text-xl font-mono font-bold text-white relative z-10">{countdown.days.toString().padStart(2, '0')}</span>
                        <div className="absolute inset-0 bg-purple-600/20 animate-pulse opacity-30"></div>
                      </div>
                      <span className="text-xs text-gray-400">DAYS</span>
                    </div>
                    
                    <div className="flex flex-col items-center transform transition hover:scale-110 duration-300">
                      <div className="bg-gradient-to-b from-blue-900/60 to-black/60 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-1 border border-blue-500/10 relative overflow-hidden">
                        <span className="text-xl font-mono font-bold text-white relative z-10">{countdown.hours.toString().padStart(2, '0')}</span>
                        <div className="absolute inset-0 bg-blue-600/20 animate-pulse opacity-30 delay-75"></div>
                      </div>
                      <span className="text-xs text-gray-400">HOURS</span>
                    </div>
                    
                    <div className="flex flex-col items-center transform transition hover:scale-110 duration-300">
                      <div className="bg-gradient-to-b from-cyan-900/60 to-black/60 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-1 border border-cyan-500/10 relative overflow-hidden">
                        <span className="text-xl font-mono font-bold text-white relative z-10">{countdown.minutes.toString().padStart(2, '0')}</span>
                        <div className="absolute inset-0 bg-cyan-600/20 animate-pulse opacity-30 delay-150"></div>
                      </div>
                      <span className="text-xs text-gray-400">MINS</span>
                    </div>
                    
                    <div className="flex flex-col items-center transform transition hover:scale-110 duration-300">
                      <div className="bg-gradient-to-b from-pink-900/60 to-black/60 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-1 border border-pink-500/10 relative overflow-hidden">
                        <span className="text-xl font-mono font-bold text-white relative z-10">{countdown.seconds.toString().padStart(2, '0')}</span>
                        <div className="absolute inset-0 bg-pink-600/20 animate-pulse opacity-30 delay-200"></div>
                      </div>
                      <span className="text-xs text-gray-400">SECS</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <span className="text-cyan-400 font-semibold text-sm relative overflow-hidden inline-block">
                      April 11-12, 2025
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform translate-x-full animate-[shiftLeft_3s_ease-in-out_infinite]"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature highlights with float animation */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-purple-500/10 flex items-center gap-2 transform transition-all duration-500 hover:bg-black/50 hover:border-purple-500/30 hover:scale-105 animate-[float_6s_ease-in-out_infinite]">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                24
              </div>
              <span className="text-gray-300 text-sm">Hour Innovation</span>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-blue-500/10 flex items-center gap-2 transform transition-all duration-500 hover:bg-black/50 hover:border-blue-500/30 hover:scale-105 animate-[float_6s_ease-in-out_infinite_0.5s]">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                $
              </div>
              <span className="text-gray-300 text-sm">High-value Prizes</span>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/10 flex items-center gap-2 transform transition-all duration-500 hover:bg-black/50 hover:border-cyan-500/30 hover:scale-105 animate-[float_6s_ease-in-out_infinite_1s]">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                +
              </div>
              <span className="text-gray-300 text-sm">Unique Experience</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animation keyframes style */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shiftLeft {
          0%, 100% { transform: translateX(100%); }
          50% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;