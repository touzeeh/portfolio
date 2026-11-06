'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectsStageProps {
  reducedMotion?: boolean;
}

export const ProjectsStage: React.FC<ProjectsStageProps> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const frame1 = useRef<THREE.Mesh>(null!);
  const frame2 = useRef<THREE.Mesh>(null!);
  const frame3 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (frame1.current) frame1.current.rotation.z += delta * 0.08;
    if (frame2.current) frame2.current.rotation.z -= delta * 0.06;
    if (frame3.current) frame3.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -9.8, 0]}>
      {/* Depth Portal 1 (Closest) */}
      <mesh ref={frame1} position={[0, 0, 1.5]}>
        <torusGeometry args={[3.2, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe={false}
          emissive="#06b6d4"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Depth Portal 2 (Mid) */}
      <mesh ref={frame2} position={[0, 0, -1]}>
        <torusGeometry args={[2.7, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe={false}
          emissive="#8b5cf6"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Depth Portal 3 (Far) */}
      <mesh ref={frame3} position={[0, 0, -3.5]}>
        <torusGeometry args={[2.2, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe={false}
          emissive="#38bdf8"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Ambient glow particles along depth tunnel */}
      <pointLight color="#8b5cf6" intensity={2} distance={8} position={[0, 0, -1]} />
    </group>
  );
};
