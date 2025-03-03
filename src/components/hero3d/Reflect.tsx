import * as THREE from 'three';
import { forwardRef, useRef, useMemo, useLayoutEffect, useImperativeHandle, ReactNode } from 'react';
import { invalidate } from '@react-three/fiber';

interface ReflectProps {
  children?: ReactNode;
  start?: [number, number, number];
  end?: [number, number, number];
  bounce?: number;
  far?: number;
  [key: string]: any;
}

interface RayEvent {
  api: any;
  object: THREE.Object3D;
  position: THREE.Vector3;
  direction: THREE.Vector3;
  reflect: THREE.Vector3;
  normal?: THREE.Vector3;
  intersect: THREE.Intersection;
  intersects: THREE.Intersection[];
  stopPropagation: () => void;
}

function isRayMesh(object: THREE.Object3D): boolean {
  return (object as any).isMesh && ((object as any).onRayOver || (object as any).onRayOut || (object as any).onRayMove);
}

function createEvent(api: any, hit: any, intersect: THREE.Intersection, intersects: THREE.Intersection[]): RayEvent {
  return {
    api,
    object: intersect.object,
    position: intersect.point as THREE.Vector3,
    direction: (intersect as any).direction,
    reflect: (intersect as any).reflect,
    normal: intersect.face?.normal,
    intersect,
    intersects,
    stopPropagation: () => (hit.stopped = true)
  };
}

export const Reflect = forwardRef<any, ReflectProps>(({ children, start: _start = [0, 0, 0], end: _end = [0, 0, 0], bounce = 10, far = 100, ...props }, fRef) => {
  bounce = (bounce || 1) + 1;

  const scene = useRef<THREE.Group>(null);
  const vStart = new THREE.Vector3();
  const vEnd = new THREE.Vector3();
  const vDir = new THREE.Vector3();
  const vPos = new THREE.Vector3();

  let intersect: THREE.Intersection | null = null;
  let intersects: THREE.Intersection[] = [];

  const api = useMemo(
    () => ({
      number: 0,
      objects: [] as THREE.Object3D[],
      hits: new Map(),
      start: new THREE.Vector3(),
      end: new THREE.Vector3(),
      raycaster: new THREE.Raycaster(),
      positions: new Float32Array(Array.from({ length: (bounce + 10) * 3 }, () => 0)),
      setRay: (_start: [number, number, number] = [0, 0, 0], _end: [number, number, number] = [0, 0, 0]) => {
        api.start.set(_start[0], _start[1], _start[2]);
        api.end.set(_end[0], _end[1], _end[2]);
      },
      update: () => {
        api.number = 0;
        intersects = [];

        vStart.copy(api.start);
        vEnd.copy(api.end);
        vDir.subVectors(vEnd, vStart).normalize();
        vStart.toArray(api.positions, api.number++ * 3);

        while (true) {
          api.raycaster.set(vStart, vDir);
          intersect = api.raycaster.intersectObjects(api.objects, false)[0];
          if (api.number < bounce && intersect && intersect.face) {
            intersects.push(intersect);
            (intersect as any).direction = vDir.clone();
            intersect.point.toArray(api.positions, api.number++ * 3);
            vDir.reflect(intersect.object.localToWorld(intersect.face.normal).sub(intersect.object.getWorldPosition(vPos)).normalize());
            (intersect as any).reflect = vDir.clone();
            vStart.copy(intersect.point);
          } else {
            vEnd.addVectors(vStart, vDir.multiplyScalar(far)).toArray(api.positions, api.number++ * 3);
            break;
          }
        }

        api.number = 1;
        api.hits.forEach((hit: any) => {
          if (!intersects.find((intersect) => intersect.object.uuid === hit.key)) {
            api.hits.delete(hit.key);
            if ((hit.intersect.object as any).onRayOut) {
              invalidate();
              (hit.intersect.object as any).onRayOut(createEvent(api, hit, hit.intersect, intersects));
            }
          }
        });

        for (intersect of intersects) {
          api.number++;
          if (!api.hits.has(intersect.object.uuid)) {
            const hit = { key: intersect.object.uuid, intersect, stopped: false };
            api.hits.set(intersect.object.uuid, hit);
            if ((intersect.object as any).onRayOver) {
              invalidate();
              (intersect.object as any).onRayOver(createEvent(api, hit, intersect, intersects));
            }
          }

          const hit = api.hits.get(intersect.object.uuid);

          if ((intersect.object as any).onRayMove) {
            invalidate();
            (intersect.object as any).onRayMove(createEvent(api, hit, intersect, intersects));
          }

          if (hit.stopped) break;
          if (intersect === intersects[intersects.length - 1]) api.number++;
        }
        return Math.max(2, api.number);
      }
    }),
    [bounce, far]
  );

  useLayoutEffect(() => void api.setRay(_start, _end), [..._start, ..._end]);
  useImperativeHandle(fRef, () => api, [api]);

  useLayoutEffect(() => {
    api.objects = [];
    if (scene.current) {
      scene.current.traverse((object) => {
        if (isRayMesh(object)) api.objects.push(object);
      });
      scene.current.updateWorldMatrix(true, true);
    }
  });

  return (
    <group ref={scene} {...props}>
      {children}
    </group>
  );
}); 