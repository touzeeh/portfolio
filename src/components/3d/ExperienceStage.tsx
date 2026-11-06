'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExperienceStageProps {
  reducedMotion?: boolean;
}

export const ExperienceStage: React.FC<ExperienceStageProps> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const beacon1 = useRef<THREE.Mesh>(null!);
  const beacon2 = useRef<THREE.Mesh>(null!);
  const beacon3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (beacon1.current) {
      beacon1.current.position.y = 1.2 + Math.sin(time * 1.2) * 0.1;
    }
    if (beacon2.current) {
      beacon2.current.position.y = 0 + Math.sin(time * 1.2 + 1) * 0.1;
    }
    if (beacon3.current) {
      beacon3.current.position.y = -1.2 + Math.sin(time * 1.2 + 2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -13.5, 0]}>
      {/* Vertical Data Spine */}
      <mesh position={[0, 0, -1]}>
        <cylinderGeometry args={[0.015, 0.015, 4.5, 16]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.4} />
      </mesh>

      {/* Timeline Beacon Node 1 */}
      <mesh ref={beacon1} position={[0, 1.2, -1]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Timeline Beacon Node 2 */}
      <mesh ref={beacon2} position={[0, 0, -1]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* Timeline Beacon Node 3 */}
      <mesh ref={beacon3} position={[0, -1.2, -1]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={0.9}
          roughness={0.2}
        />
      </mesh>

      <pointLight color="#8b5cf6" intensity={2} distance={6} position={[0, 0, 1]} />
    </group>
  );
};
