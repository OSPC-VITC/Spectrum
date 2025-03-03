import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Reflect } from './Reflect';

interface BeamProps {
  children?: ReactNode;
  bounce?: number;
  far?: number;
  position?: [number, number, number];
  stride?: number;
  width?: number;
}

const Beam = forwardRef<THREE.Group & { setRay: (start: [number, number, number], end: [number, number, number]) => void }, BeamProps>(
  ({ children, bounce = 3, far = 60, position = [0, 0, 0], stride = 4, width = 8 }, ref) => {
    const streaks = useRef<THREE.InstancedMesh>(null);
    const glow = useRef<THREE.InstancedMesh>(null);
    const reflect = useRef<any>(null);
    const [streakTexture, glowTexture] = useTexture([
      '/textures/lensflare/lensflare2.png',
      '/textures/lensflare/lensflare0_bw.jpg'
    ]);

    const obj = new THREE.Object3D();
    const f = new THREE.Vector3();
    const t = new THREE.Vector3();
    const n = new THREE.Vector3();
    const config = {
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    };

    useFrame(() => {
      if (!streaks.current || !glow.current || !reflect.current) return;
      const range = reflect.current.update() - 1;

      for (let i = 0; i < range; i++) {
        // Position 1
        f.fromArray(reflect.current.positions, i * 3);
        // Position 2
        t.fromArray(reflect.current.positions, i * 3 + 3);
        // Calculate normal
        n.subVectors(t, f).normalize();
        // Calculate mid-point
        obj.position.addVectors(f, t).divideScalar(2);
        // Stretch by using the distance
        obj.scale.set(t.distanceTo(f) * stride, width, 1);
        // Convert rotation to euler z
        obj.rotation.set(0, 0, Math.atan2(n.y, n.x));
        obj.updateMatrix();
        streaks.current.setMatrixAt(i, obj.matrix);
      }

      streaks.current.count = range;
      if (streaks.current.instanceMatrix.updateRanges.length === 0) {
        streaks.current.instanceMatrix.updateRanges.push({
          start: 0,
          count: range * 16
        });
      } else {
        streaks.current.instanceMatrix.updateRanges[0].count = range * 16;
      }
      streaks.current.instanceMatrix.needsUpdate = true;

      // First glow isn't shown
      obj.scale.setScalar(0);
      obj.updateMatrix();
      glow.current.setMatrixAt(0, obj.matrix);

      for (let i = 1; i < range; i++) {
        obj.position.fromArray(reflect.current.positions, i * 3);
        obj.scale.setScalar(0.75);
        obj.rotation.set(0, 0, 0);
        obj.updateMatrix();
        glow.current.setMatrixAt(i, obj.matrix);
      }

      glow.current.count = range;
      if (glow.current.instanceMatrix.updateRanges.length === 0) {
        glow.current.instanceMatrix.updateRanges.push({
          start: 0,
          count: range * 16
        });
      } else {
        glow.current.instanceMatrix.updateRanges[0].count = range * 16;
      }
      glow.current.instanceMatrix.needsUpdate = true;
    });

    useImperativeHandle(ref, () => reflect.current, []);

    return (
      <group position={position}>
        <Reflect ref={reflect} bounce={bounce} far={far}>
          {children}
        </Reflect>
        <instancedMesh ref={streaks} args={[undefined, undefined, 100]} instanceMatrix-usage={THREE.DynamicDrawUsage}>
          <planeGeometry />
          <meshBasicMaterial map={streakTexture} opacity={1.5} {...config} transparent={false} />
        </instancedMesh>
        <instancedMesh ref={glow} args={[undefined, undefined, 100]} instanceMatrix-usage={THREE.DynamicDrawUsage}>
          <planeGeometry />
          <meshBasicMaterial map={glowTexture} {...config} />
        </instancedMesh>
      </group>
    );
  }
);

Beam.displayName = 'Beam';

export { Beam };
export type { BeamProps }; 