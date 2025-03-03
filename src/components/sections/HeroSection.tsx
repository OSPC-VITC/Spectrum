'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing';
import { LUTCubeLoader } from 'postprocessing';
import { Beam } from '../hero3d/Beam';
import { Rainbow } from '../hero3d/Rainbow';
import { Prism } from '../hero3d/Prism';
import { Flare } from '../hero3d/Flare';
import { Box } from '../hero3d/Box';
import { calculateRefractionAngle, lerp, lerpV3 } from '../hero3d/utils';
import { RayEvent, RayMoveEvent } from '../hero3d/types';

interface RainbowMesh extends THREE.Group {
  material: THREE.ShaderMaterial & {
    speed: number;
    emissiveIntensity: number;
  };
}

interface SceneProps {
  onLogoHitChange: (isHit: boolean) => void;
}

function Scene({ onLogoHitChange }: SceneProps) {
  const [isPrismHit, hitPrism] = useState(false);
  const flare = useRef<THREE.Group>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const spot = useRef<THREE.SpotLight>(null);
  const boxreflect = useRef<THREE.Group & { setRay: (start: [number, number, number], end: [number, number, number]) => void }>(null);
  const rainbow = useRef<RainbowMesh>(null);

  const rayOut = useCallback(() => {
    hitPrism(false);
    onLogoHitChange(false);
  }, [onLogoHitChange]);

  const rayOver = useCallback((e: RayEvent) => {
    e.stopPropagation();
    hitPrism(true);
    if (rainbow.current) {
      rainbow.current.material.speed = 1;
      rainbow.current.material.emissiveIntensity = 20;
    }
  }, []);

  const vec = new THREE.Vector3();
  const rayMove = useCallback((e: RayMoveEvent) => {
    if (!e.normal || !flare.current || !spot.current || !rainbow.current) return;
    
    const { position, direction, normal } = e;
    vec.copy(position);
    
    flare.current.position.set(position.x, position.y, -0.5);
    flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y));
    
    const angleScreenCenter = Math.atan2(-position.y, -position.x);
    const normalAngle = Math.atan2(normal.y, normal.x);
    const incidentAngle = Math.acos(direction.dot(normal));
    const refractionAngle = calculateRefractionAngle(incidentAngle, 2.4);
    
    rainbow.current.rotation.z = angleScreenCenter + refractionAngle;

    // Check if rainbow is hitting the logo area (top center of screen)
    const rainbowAngle = angleScreenCenter + refractionAngle;
    // Adjust angle to make upward = 0
    const normalizedAngle = ((rainbowAngle - Math.PI/2 + Math.PI) % (2 * Math.PI)) - Math.PI;
    // Check if angle is pointing upward within a 60-degree arc (±30 degrees from vertical)
    const isPointingToLogo = normalizedAngle > -Math.PI/3 && normalizedAngle < Math.PI/3;
    onLogoHitChange(isPrismHit && isPointingToLogo);
    
    if (spot.current.target instanceof THREE.Object3D) {
      lerpV3(spot.current.target.position, [Math.cos(angleScreenCenter + refractionAngle), Math.sin(angleScreenCenter + refractionAngle), 0], 0.05);
      spot.current.target.updateMatrixWorld();
    }
  }, [isPrismHit, onLogoHitChange]);

  useFrame((state) => {
    if (!boxreflect.current || !rainbow.current || !spot.current || !ambient.current) return;
    
    const x = (state.pointer.x * state.viewport.width) / 2;
    const y = (state.pointer.y * state.viewport.height) / 2;
    
    boxreflect.current.setRay([x, y, 0], [0, 0, 0]);
    
    lerp(rainbow.current.material, 'emissiveIntensity', isPrismHit ? 2.5 : 0, 0.1);
    spot.current.intensity = rainbow.current.material.emissiveIntensity;
    lerp(ambient.current, 'intensity', 0, 0.025);
  });

  const texture = useLoader(LUTCubeLoader, '/lut/F-6800-STD.cube') as THREE.DataTexture;

  return (
    <>
      <ambientLight ref={ambient} intensity={0} />
      <pointLight position={[10, -10, 0]} intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.05} />
      <pointLight position={[-10, 0, 0]} intensity={0.05} />
      <spotLight ref={spot} intensity={1} distance={7} angle={1} penumbra={1} position={[0, 0, 1]}>
        <object3D position={[0, 0, 0]} />
      </spotLight>
      
      <Beam ref={boxreflect} bounce={10} far={20}>
        <Prism position={[0, -0.25, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
      </Beam>
      
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
      <Flare ref={flare} visible={isPrismHit} renderOrder={10} scale={1.25} streak={[12.5, 20, 1]} />
      
      <EffectComposer>
        <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
        <LUT lut={texture} />
      </EffectComposer>
    </>
  );
}

export default function HeroSection() {
  const [isLogoHit, setIsLogoHit] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Create target date in IST (UTC+5:30)
      const targetDate = new Date('2024-04-11T00:00:00+05:30');
      const now = new Date();

      // Convert current time to IST
      const nowIST = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

      // Get time difference in milliseconds
      const difference = targetDate.getTime() - nowIST.getTime();

      if (difference > 0) {
        // Convert to days, hours, minutes, seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If the target date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <section className="relative w-full h-screen bg-black">
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src="/logo.png" 
          alt="Spectrum Hackathon Logo" 
          className="h-auto w-auto max-h-[180px] object-contain transition-all duration-300" 
          style={{ 
            filter: `brightness(${isLogoHit ? 2 : 0.6})`,
            transition: 'filter 0.3s ease-out'
          }}
        />
      </div>
      <Canvas
        orthographic
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 100], zoom: 70 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
      >
        <color attach="background" args={['black']} />
        <Scene onLogoHitChange={setIsLogoHit} />
      </Canvas>

      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-12">
        <div className="flex gap-6">
          <div className="timer-container">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="timer-content">
              <div className="text-5xl font-bold">{timeLeft.days}</div>
              <div className="text-sm mt-2">DAYS</div>
            </div>
          </div>
          <div className="timer-container">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="timer-content">
              <div className="text-5xl font-bold">{timeLeft.hours}</div>
              <div className="text-sm mt-2">HOURS</div>
            </div>
          </div>
          <div className="timer-container">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="timer-content">
              <div className="text-5xl font-bold">{timeLeft.minutes}</div>
              <div className="text-sm mt-2">MINUTES</div>
            </div>
          </div>
          <div className="timer-container">
            <div className="a l"></div>
            <div className="a r"></div>
            <div className="a t"></div>
            <div className="a b"></div>
            <div className="timer-content">
              <div className="text-5xl font-bold">{timeLeft.seconds}</div>
              <div className="text-sm mt-2">SECONDS</div>
            </div>
          </div>
        </div>
        
        <button className="button">
          <div className="a l"></div>
          <div className="a r"></div>
          <div className="a t"></div>
          <div className="a b"></div>
          <div className="text">Register Now</div>
        </button>

        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="unopaq">
            <feColorMatrix
              values="1 0 0 0 0 
                      0 1 0 0 0 
                      0 0 1 0 0 
                      0 0 0 3 0"
            ></feColorMatrix>
          </filter>
        </svg>

        <style jsx>{`
          .button {
            position: relative;
            cursor: pointer;
            border: none;
            padding: 0.875rem 2.5rem;
            background: #111;
            color: #fff;
            min-width: 200px;
          }

          .timer-container {
            position: relative;
            background: #111;
            padding: 1.5rem 2rem;
            min-width: 140px;
            text-align: center;
          }

          .timer-content {
            position: relative;
            z-index: 1;
            color: white;
          }

          .text {
            position: relative;
            z-index: 1;
          }

          .button::before {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(
                circle at 50% 50%,
                #0000 0,
                #0000 20%,
                #111111aa 50%
              ),
              radial-gradient(ellipse 100% 100%, #fff, #fff0);
            background-size:
              3px 3px,
              auto auto;
            transition: 0.3s;
          }

          .button:hover::before {
            opacity: 0.3;
          }

          .a {
            pointer-events: none;
            position: absolute;
            --w: 2px;
            --t: -40px;
            --s: calc(var(--t) * -1);
            --e: calc(100% + var(--t));
            --g: #fff0, #fff3 var(--s), #fffa var(--s), #fff, #fffa var(--e),
              #fff3 var(--e), #fff0;
          }

          .a::before {
            content: "";
            position: absolute;
            inset: 0;
            background: inherit;
            filter: blur(4px) url(#unopaq);
            z-index: -2;
          }

          .a::after {
            content: "";
            position: absolute;
            inset: 0;
            background: inherit;
            filter: blur(10px) url(#unopaq);
            opacity: 0;
            z-index: -2;
            transition: 0.3s;
          }

          .button:hover .a::after {
            opacity: 1;
          }

          .l {
            left: -2px;
          }

          .r {
            right: -2px;
          }

          .l,
          .r {
            background: linear-gradient(var(--g));
            top: var(--t);
            bottom: var(--t);
            width: var(--w);
          }

          .t {
            top: -2px;
          }

          .b {
            bottom: -2px;
          }

          .t,
          .b {
            background: linear-gradient(90deg, var(--g));
            left: var(--t);
            right: var(--t);
            height: var(--w);
          }
        `}</style>
      </div>
    </section>
  );
} 