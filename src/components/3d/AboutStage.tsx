'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AboutStageProps {
  reducedMotion?: boolean;
}

export const AboutStage: React.FC<AboutStageProps> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const shape1 = useRef<THREE.Mesh>(null!);
  const shape2 = useRef<THREE.Mesh>(null!);
  const shape3 = useRef<THREE.Mesh>(null!);
  const shape4 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (shape1.current) {
      shape1.current.rotation.x += delta * 0.2;
      shape1.current.rotation.y += delta * 0.25;
      shape1.current.position.y = 0.5 + Math.sin(time * 0.8) * 0.2;
    }
    if (shape2.current) {
      shape2.current.rotation.y -= delta * 0.15;
      shape2.current.rotation.z += delta * 0.2;
      shape2.current.position.y = -0.6 + Math.cos(time * 0.7) * 0.25;
    }
    if (shape3.current) {
      shape3.current.rotation.x += delta * 0.18;
      shape3.current.rotation.z -= delta * 0.12;
      shape3.current.position.y = 0.2 + Math.sin(time * 0.6 + 1) * 0.18;
    }
    if (shape4.current) {
      shape4.current.rotation.y += delta * 0.22;
      shape4.current.position.y = -0.3 + Math.sin(time * 0.9 + 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>
      {/* Shape 1: Floating Glass Octahedron */}
      <mesh ref={shape1} position={[-2.4, 0.5, -0.5]}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          roughness={0.1}
          metalness={0.2}
          transmission={0.65}
          ior={1.4}
          thickness={0.5}
          wireframe={false}
        />
      </mesh>

      {/* Shape 2: Floating Metallic Dodecahedron */}
      <mesh ref={shape2} position={[2.6, -0.6, 0.2]}>
        <dodecahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.2}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>

      {/* Shape 3: Floating Wireframe Icosahedron */}
      <mesh ref={shape3} position={[-1.2, -1.2, 1]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.4}
          emissive="#38bdf8"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Shape 4: Floating Torus Ring */}
      <mesh ref={shape4} position={[1.8, 1.2, -1]}>
        <torusGeometry args={[0.75, 0.12, 16, 48]} />
        <meshStandardMaterial
          color="#c084fc"
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Local lighting */}
      <pointLight color="#06b6d4" intensity={2} distance={7} position={[-2, 1, 1]} />
      <pointLight color="#8b5cf6" intensity={2} distance={7} position={[2, -1, 1]} />
    </group>
  );
};
