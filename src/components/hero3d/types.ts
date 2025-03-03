import { ReactNode } from 'react';
import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    rainbowMaterial: any;
  }
}

export type MeshWithRayEvents = {
  onRayOver?: (event: RayEvent) => void;
  onRayOut?: (event: RayEvent) => void;
  onRayMove?: (event: RayMoveEvent) => void;
  visible?: boolean;
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  renderOrder?: number;
  dispose?: null;
  ref?: React.RefObject<THREE.Mesh>;
};

export interface BeamProps {
  children?: ReactNode;
  start?: [number, number, number];
  end?: [number, number, number];
  bounce?: number;
  far?: number;
  position?: [number, number, number];
  stride?: number;
  width?: number;
  [key: string]: any;
}

export interface RainbowProps {
  startRadius?: number;
  endRadius?: number;
  emissiveIntensity?: number;
  fade?: number;
  [key: string]: any;
}

export interface FlareProps {
  streak?: [number, number, number];
  visible?: boolean;
  [key: string]: any;
}

export interface BoxProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  [key: string]: any;
}

export interface PrismProps {
  onRayOver?: (event: RayEvent) => void;
  onRayOut?: (event: RayEvent) => void;
  onRayMove?: (event: RayMoveEvent) => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  [key: string]: any;
}

export interface RayEvent {
  stopPropagation: () => void;
}

export interface RayMoveEvent {
  api: {
    positions: Float32Array;
    number: number;
  };
  position: THREE.Vector3;
  direction: THREE.Vector3;
  normal: THREE.Vector3;
} 