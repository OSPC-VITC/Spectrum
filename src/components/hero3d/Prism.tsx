import { useLoader } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import { MeshWithRayEvents } from './types';

interface PrismProps {
  onRayOver?: (event: any) => void;
  onRayOut?: (event: any) => void;
  onRayMove?: (event: any) => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  [key: string]: any;
}

export function Prism({ onRayOver, onRayOut, onRayMove, ...props }: PrismProps) {
  const { nodes } = useLoader(GLTFLoader, '/gltf/prism.glb') as any;

  const raycasterMeshProps: MeshWithRayEvents = {
    visible: false,
    scale: 1.9,
    rotation: [Math.PI / 2, Math.PI, 0],
    onRayOver,
    onRayOut,
    onRayMove
  };

  return (
    <group {...props}>
      {/* A low-res, invisible representation of the prism that gets hit by the raycaster */}
      <mesh {...raycasterMeshProps}>
        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* The visible hi-res prism */}
      <mesh position={[0, 0, 0.6]} renderOrder={10} scale={2} dispose={null} geometry={nodes.Cone.geometry}>
        <MeshTransmissionMaterial
          clearcoat={1}
          transmission={1}
          thickness={0.9}
          roughness={0}
          anisotropy={0.1}
          chromaticAberration={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
} 