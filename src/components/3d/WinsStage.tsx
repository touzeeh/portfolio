'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WinsStageProps {
  reducedMotion?: boolean;
}

export const WinsStage: React.FC<WinsStageProps> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const trophyCore = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = (i / particleCount) * Math.PI * 2;
      const r = 2.0 + (Math.sin(i * 11.23) * 0.5 + 0.5) * 2.0;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.sin(i * 45.1) - 0.5) * 2.5;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (trophyCore.current) {
      trophyCore.current.rotation.y += delta * 0.3;
      trophyCore.current.rotation.x = Math.sin(time * 0.8) * 0.15;
    }

    if (ring1.current) {
      ring1.current.rotation.x = time * 0.4;
      ring1.current.rotation.z = time * 0.25;
    }

    if (ring2.current) {
      ring2.current.rotation.y = -time * 0.35;
      ring2.current.rotation.x = time * 0.2;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -13.5, -2.5]}>
      {/* Central Holographic Victory Polyhedron */}
      <mesh ref={trophyCore}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.15}
          metalness={0.85}
          emissive="#d97706"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Inner Wireframe Diamond Shell */}
      <mesh scale={1.35}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#fde047"
          wireframe
          transparent
          opacity={0.5}
          emissive="#fde047"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Orbiting Victory Ring 1 (Gold) */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.5, 0.016, 16, 64]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Orbiting Victory Ring 2 (Cyan Accent) */}
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.9, 0.014, 16, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Orbiting Golden Stardust Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#fef08a"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Golden Stage Illumination */}
      <pointLight color="#f59e0b" intensity={3.5} distance={10} position={[0, 1, 1]} />
      <pointLight color="#38bdf8" intensity={2.0} distance={8} position={[0, -1, 1]} />
    </group>
  );
};
