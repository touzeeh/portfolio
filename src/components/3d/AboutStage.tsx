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
  const shape2Ring = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (shape1.current) {
      shape1.current.rotation.x += delta * 0.25;
      shape1.current.rotation.y += delta * 0.3;
      shape1.current.position.y = 0.5 + Math.sin(time * 0.9) * 0.25;
    }
    if (shape1Cage.current) {
      shape1Cage.current.rotation.x -= delta * 0.15;
      shape1Cage.current.rotation.z += delta * 0.2;
    }

    if (shape2.current) {
      shape2.current.rotation.y -= delta * 0.2;
      shape2.current.rotation.z += delta * 0.25;
      shape2.current.position.y = -0.5 + Math.cos(time * 0.8) * 0.3;
    }
    if (shape2Ring.current) {
      shape2Ring.current.rotation.x = time * 0.35;
      shape2Ring.current.rotation.y = time * 0.25;
    }
  });

  // Placed in outer margins on desktop; pushed into deep background on mobile
  const leftX = isMobile ? -1.8 : -5.4;
  const rightX = isMobile ? 1.8 : 5.4;
  const depthZ = isMobile ? -6.0 : -2.5;
  const scale = isMobile ? 0.65 : 1.0;

  return (
    <group ref={groupRef} position={[0, -2.5, depthZ]} scale={scale}>
      {/* Shape 1 (Left Margin): Floating Crystalline Octahedron with Wireframe Shell */}
      <group position={[leftX, 0.5, 0]}>
        <mesh ref={shape1}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            roughness={0.1}
            metalness={0.7}
            emissive="#06b6d4"
            emissiveIntensity={0.7}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh ref={shape1Cage} scale={1.35}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            transparent
            opacity={0.4}
            emissive="#38bdf8"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Shape 2 (Right Margin): Floating Metallic Dodecahedron with Gyro Ring */}
      <group position={[rightX, -0.5, 0]}>
        <mesh ref={shape2}>
          <dodecahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            roughness={0.15}
            metalness={0.85}
            emissive="#8b5cf6"
            emissiveIntensity={0.75}
          />
        </mesh>
        <mesh ref={shape2Ring}>
          <torusGeometry args={[1.45, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* Local stage lights */}
      <pointLight color="#06b6d4" intensity={2.5} distance={10} position={[leftX, 0.5, 2]} />
      <pointLight color="#8b5cf6" intensity={2.5} distance={10} position={[rightX, -0.5, 2]} />
    </group>
  );
};
