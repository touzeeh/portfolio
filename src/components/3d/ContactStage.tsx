'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactStageProps {
  particleCount?: number;
  reducedMotion?: boolean;
}

export const ContactStage: React.FC<ContactStageProps> = ({
  particleCount = 500,
  reducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const init = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const pseudo1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const pseudo2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const pseudo3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;

      const radius = 1.5 + pseudo1 * 3.5;
      const theta = pseudo2 * Math.PI * 2;
      const y = (pseudo3 - 0.5) * 3;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      init[i * 3] = pos[i * 3];
      init[i * 3 + 1] = pos[i * 3 + 1];
      init[i * 3 + 2] = pos[i * 3 + 2];
    }
    return [pos, init];
  }, [particleCount]);

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    // Calm convergence toward center
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Breathe inward/outward slowly
      const breathe = 1 + Math.sin(time * 0.5 + i * 0.1) * 0.12;
      arr[idx] = initialPositions[idx] * breathe;
      arr[idx + 1] = initialPositions[idx + 1] + Math.sin(time * 0.4 + i) * 0.08;
      arr[idx + 2] = initialPositions[idx + 2] * breathe;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <group position={[0, -17.0, 0]}>
      {/* Central Gentle Aura Sphere */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.2}
          metalness={0.8}
          emissive="#6366f1"
          emissiveIntensity={0.8}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Converging Slow Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#06b6d4"
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Warm gentle illumination */}
      <pointLight color="#8b5cf6" intensity={2.5} distance={7} />
      <pointLight color="#06b6d4" intensity={2} distance={7} position={[0, -1, 1]} />
    </group>
  );
};
