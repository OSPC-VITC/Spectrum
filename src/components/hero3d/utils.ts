import * as THREE from 'three';

export function lerp(object: any, prop: string, goal: number, speed = 0.1) {
  object[prop] = THREE.MathUtils.lerp(object[prop], goal, speed);
}

const color = new THREE.Color();
export function lerpC(value: THREE.Color, goal: string | number | THREE.Color, speed = 0.1) {
  value.lerp(color.set(goal), speed);
}

const vector = new THREE.Vector3();
export function lerpV3(value: THREE.Vector3, goal: [number, number, number], speed = 0.1) {
  value.lerp(vector.set(...goal), speed);
}

export function calculateRefractionAngle(incidentAngle: number, glassIor = 2.5, airIor = 1.000293) {
  const theta = Math.asin((airIor * Math.sin(incidentAngle)) / glassIor) || 0;
  return theta;
} 