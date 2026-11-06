'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ScrollCameraProps {
  scrollProgress: number;
  reducedMotion?: boolean;
}

// Keyframe waypoint coordinates along the scroll path (t from 0 to 1)
const WAYPOINTS = [
  { t: 0.0, pos: new THREE.Vector3(0, 0, 6.8), target: new THREE.Vector3(0, 0, 0), fogColor: '#030712' },
  { t: 0.2, pos: new THREE.Vector3(2.2, -2.5, 6.0), target: new THREE.Vector3(0, -2.5, 0), fogColor: '#070b19' },
  { t: 0.42, pos: new THREE.Vector3(-2.0, -6.0, 6.2), target: new THREE.Vector3(0, -6.0, 0), fogColor: '#09071f' },
  { t: 0.65, pos: new THREE.Vector3(0, -9.8, 4.8), target: new THREE.Vector3(0, -9.8, 0), fogColor: '#04101d' },
  { t: 0.82, pos: new THREE.Vector3(1.6, -13.5, 5.6), target: new THREE.Vector3(0, -13.5, 0), fogColor: '#08081a' },
  { t: 1.0, pos: new THREE.Vector3(0, -17.0, 6.6), target: new THREE.Vector3(0, -17.0, 0), fogColor: '#030712' },
];

export const ScrollCamera: React.FC<ScrollCameraProps> = ({
  scrollProgress,
  reducedMotion = false,
}) => {
  const { camera, scene, pointer } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef(new THREE.Vector3(0, 0, 6.8));

  useFrame((_, delta) => {
    if (reducedMotion) {
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      return;
    }

    const t = Math.max(0, Math.min(1, scrollProgress));

    // Find interpolation segment
    let i = 0;
    while (i < WAYPOINTS.length - 2 && t > WAYPOINTS[i + 1].t) {
      i++;
    }

    const p0 = WAYPOINTS[i];
    const p1 = WAYPOINTS[i + 1];
    const segmentT = (t - p0.t) / (p1.t - p0.t);
    const easedT = THREE.MathUtils.smoothstep(segmentT, 0, 1);

    // Desired camera position & target
    const desiredPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, easedT);
    const desiredTarget = new THREE.Vector3().lerpVectors(p0.target, p1.target, easedT);

    // Subtle mouse parallax influence
    const parallaxX = pointer.x * 0.4;
    const parallaxY = pointer.y * 0.3;
    desiredPos.x += parallaxX;
    desiredPos.y += parallaxY;

    // Smooth camera lerp
    const lerpFactor = Math.min(delta * 4, 0.15);
    currentPos.current.lerp(desiredPos, lerpFactor);
    currentTarget.current.lerp(desiredTarget, lerpFactor);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    // Fog color transition
    if (scene.fog && 'color' in scene.fog) {
      const c0 = new THREE.Color(p0.fogColor);
      const c1 = new THREE.Color(p1.fogColor);
      (scene.fog as THREE.FogExp2).color.lerpColors(c0, c1, easedT);
    }
  });

  return null;
};
