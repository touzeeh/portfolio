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
  const prismLeft = useRef<THREE.Mesh>(null!);
  const prismRight = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (frame1.current) frame1.current.rotation.z += delta * 0.12;
    if (frame2.current) frame2.current.rotation.z -= delta * 0.09;
    if (frame3.current) frame3.current.rotation.z += delta * 0.08;

    if (prismLeft.current) {
      prismLeft.current.rotation.x += delta * 0.2;
      prismLeft.current.rotation.y += delta * 0.25;
    }
    if (prismRight.current) {
      prismRight.current.rotation.y -= delta * 0.22;
      prismRight.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[0, -9.8, -2.5]}>
      {/* Dimensional Depth Portal 1 */}
      <mesh ref={frame1} position={[0, 0, 0]}>
        <torusGeometry args={[3.6, 0.016, 16, 80]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Dimensional Depth Portal 2 */}
      <mesh ref={frame2} position={[0, 0, -2.2]}>
        <torusGeometry args={[3.0, 0.018, 16, 80]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Dimensional Depth Portal 3 */}
      <mesh ref={frame3} position={[0, 0, -4.5]}>
        <torusGeometry args={[2.5, 0.014, 16, 80]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.7}
          roughness={0.1}
        />
      </mesh>

      {/* Left Outer Margin: Floating Holographic Prism */}
      <group position={[-5.4, 0.4, 0]}>
        <mesh ref={prismLeft}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial
            color="#8b5cf6"
            wireframe
            emissive="#8b5cf6"
            emissiveIntensity={0.9}
          />
        </mesh>
        <mesh scale={0.5}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Right Outer Margin: Floating Quantum Prism */}
      <group position={[5.4, -0.4, -0.5]}>
        <mesh ref={prismRight}>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            wireframe
            emissive="#06b6d4"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh scale={0.45}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Ambient portal glow illumination */}
      <pointLight color="#8b5cf6" intensity={3} distance={12} position={[0, 0, 0]} />
      <pointLight color="#06b6d4" intensity={2.5} distance={10} position={[0, 0, -2]} />
    </group>
  );
};
