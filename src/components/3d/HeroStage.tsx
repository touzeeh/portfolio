'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface HeroStageProps {
  particleCount?: number;
  reducedMotion?: boolean;
}

export const HeroStage: React.FC<HeroStageProps> = ({
  particleCount = 900,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const { pointer } = useThree();

  // Particle positions generated deterministically
  const [positions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const pseudo1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const pseudo2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const pseudo3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;

      const radius = 2.5 + pseudo1 * 4.5;
      const theta = pseudo2 * Math.PI * 2;
      const phi = Math.acos(2 * pseudo3 - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [pos];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    // Mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.35,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.25,
        0.05
      );
    }

    // Core slow rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.1;
    }

    // Gyro rings rotation
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.3;
      ringRef1.current.rotation.z = time * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -time * 0.25;
      ringRef2.current.rotation.x = time * 0.15;
    }

    // Orbit particles slow drift
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Kinetic Distorted Core Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.35, 48, 48]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          distort={reducedMotion ? 0 : 0.38}
          speed={reducedMotion ? 0 : 1.8}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Inner Wireframe Geometric Cage */}
      <mesh scale={1.65}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.3}
          emissive="#06b6d4"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Gyroscopic Hairline Ring 1 (Teal) */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.3, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          roughness={0.1}
          metalness={0.9}
          emissive="#06b6d4"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Gyroscopic Hairline Ring 2 (Violet) */}
      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.7, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#a78bfa"
          roughness={0.1}
          metalness={0.9}
          emissive="#8b5cf6"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Orbital Particle Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#c4b5fd"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Stage lights */}
      <pointLight color="#8b5cf6" intensity={3} distance={10} position={[2, 2, 2]} />
      <pointLight color="#06b6d4" intensity={2.5} distance={8} position={[-2, -2, -1]} />
    </group>
  );
};
