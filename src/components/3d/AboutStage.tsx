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
  const shape3 = useRef<THREE.Mesh>(null!);
  const shape4 = useRef<THREE.Mesh>(null!);

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

    if (shape3.current) {
      shape3.current.rotation.x += delta * 0.18;
      shape3.current.rotation.z -= delta * 0.14;
      shape3.current.position.y = -1.2 + Math.sin(time * 0.7 + 1) * 0.2;
    }

    if (shape4.current) {
      shape4.current.rotation.y += delta * 0.22;
      shape4.current.position.y = 1.2 + Math.sin(time * 0.85 + 2) * 0.2;
    }
  });

  // Spread wider on desktop to sit beautifully in the side gutters
  const leftX = isMobile ? -2.4 : -3.8;
  const rightX = isMobile ? 2.4 : 3.8;

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>
      {/* Shape 1 (Left Gutter): Floating Crystalline Octahedron with Wireframe Shell */}
      <group position={[leftX, 0.5, -0.2]}>
        <mesh ref={shape1}>
          <octahedronGeometry args={[isMobile ? 0.8 : 1.1, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            roughness={0.1}
            metalness={0.7}
            emissive="#06b6d4"
            emissiveIntensity={0.6}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh ref={shape1Cage} scale={1.35}>
          <octahedronGeometry args={[isMobile ? 0.8 : 1.1, 0]} />
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

      {/* Shape 2 (Right Gutter): Floating Metallic Dodecahedron with Gyro Ring */}
      <group position={[rightX, -0.5, 0]}>
        <mesh ref={shape2}>
          <dodecahedronGeometry args={[isMobile ? 0.75 : 1.0, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            roughness={0.15}
            metalness={0.85}
            emissive="#8b5cf6"
            emissiveIntensity={0.7}
          />
        </mesh>
        <mesh ref={shape2Ring}>
          <torusGeometry args={[isMobile ? 1.1 : 1.45, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* Shape 3 (Deep Left): Floating Wireframe Icosahedron */}
      <mesh ref={shape3} position={[leftX + 0.8, -1.5, -2]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.45}
          emissive="#38bdf8"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Shape 4 (Deep Right): Floating Torus */}
      <mesh ref={shape4} position={[rightX - 0.8, 1.4, -2.5]}>
        <torusGeometry args={[0.85, 0.08, 16, isMobile ? 32 : 48]} />
        <meshStandardMaterial
          color="#a78bfa"
          roughness={0.15}
          metalness={0.9}
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Local stage lights */}
      <pointLight color="#06b6d4" intensity={2.5} distance={8} position={[leftX, 0.5, 1]} />
      <pointLight color="#8b5cf6" intensity={2.5} distance={8} position={[rightX, -0.5, 1]} />
    </group>
  );
};
