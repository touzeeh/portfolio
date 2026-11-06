'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactStageProps {
  particleCount?: number;
  reducedMotion?: boolean;
}

export const ContactStage: React.FC<ContactStageProps> = ({
  particleCount = 650,
  reducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const init = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const pseudo1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const pseudo2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const pseudo3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;

      const radius = 1.6 + pseudo1 * 4.0;
      const theta = pseudo2 * Math.PI * 2;
      const y = (pseudo3 - 0.5) * 3.5;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      init[i * 3] = pos[i * 3];
      init[i * 3 + 1] = pos[i * 3 + 1];
      init[i * 3 + 2] = pos[i * 3 + 2];
    }
    return [pos, init];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.35;
      ringRef1.current.rotation.y = time * 0.25;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = -time * 0.3;
      ringRef2.current.rotation.z = time * 0.2;
    }

    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;

      // Swirling gravitational vortex motion
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const breathe = 1 + Math.sin(time * 0.6 + i * 0.1) * 0.14;
        arr[idx] = initialPositions[idx] * breathe;
        arr[idx + 1] = initialPositions[idx + 1] + Math.sin(time * 0.5 + i) * 0.1;
        arr[idx + 2] = initialPositions[idx + 2] * breathe;
      }
      posAttr.needsUpdate = true;
      pointsRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group position={[0, -21.0, -2.5]}>
      {/* Central Gravitational Singularity Core */}
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.15}
          metalness={0.85}
          emissive="#6366f1"
          emissiveIntensity={1.0}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Singularity Gyro Energy Band 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.8, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Singularity Gyro Energy Band 2 */}
      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Swirling Vortex Particle Accretion Disk */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#38bdf8"
          transparent
          opacity={0.75}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Singularity Illumination */}
      <pointLight color="#8b5cf6" intensity={3.5} distance={9} />
      <pointLight color="#06b6d4" intensity={2.8} distance={8} position={[0, -1, 1]} />
    </group>
  );
};
