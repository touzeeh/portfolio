'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AboutStageProps {
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export const AboutStage: React.FC<AboutStageProps> = ({
  reducedMotion = false,
  isMobile = false,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const shape1 = useRef<THREE.Mesh>(null!);
  const shape1Cage = useRef<THREE.Mesh>(null!);
  const shape2 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (shape1.current) {
      shape1.current.rotation.x += delta * 0.2;
      shape1.current.rotation.y += delta * 0.25;
    }
    if (shape1Cage.current) {
      shape1Cage.current.rotation.x -= delta * 0.15;
      shape1Cage.current.rotation.z += delta * 0.18;
    }

    if (shape2.current) {
      shape2.current.rotation.y -= delta * 0.18;
      shape2.current.rotation.z += delta * 0.2;
    }
  });

  // Placed strictly in deep background (-4.5) and outer margins to eliminate text collisions
  const leftX = isMobile ? -2.0 : -5.4;
  const rightX = isMobile ? 2.0 : 5.4;
  const depthZ = isMobile ? -6.0 : -4.5;
  const scale = isMobile ? 0.6 : 0.9;

  return (
    <group ref={groupRef} position={[0, -13.5, depthZ]} scale={scale}>
      {/* Shape 1 (Left Margin): Floating Crystalline Octahedron */}
      <group position={[leftX, 0.4, 0]}>
        <mesh ref={shape1}>
          <octahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            roughness={0.15}
            metalness={0.7}
            emissive="#06b6d4"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh ref={shape1Cage} scale={1.3}>
          <octahedronGeometry args={[0.95, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.25}
            emissive="#38bdf8"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* Shape 2 (Right Margin): Floating Metallic Dodecahedron (No colliding outer rings) */}
      <group position={[rightX, -0.4, 0]}>
        <mesh ref={shape2}>
          <dodecahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            roughness={0.2}
            metalness={0.85}
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* Gentle local lights */}
      <pointLight color="#06b6d4" intensity={2.0} distance={8} position={[leftX, 0.4, 1]} />
      <pointLight color="#8b5cf6" intensity={2.0} distance={8} position={[rightX, -0.4, 1]} />
    </group>
  );
};
