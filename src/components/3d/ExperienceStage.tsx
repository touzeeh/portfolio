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
  const photonBeam = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (beacon1.current) {
      beacon1.current.position.y = 1.3 + Math.sin(time * 1.2) * 0.08;
    }
    if (beacon2.current) {
      beacon2.current.position.y = 0 + Math.sin(time * 1.2 + 1) * 0.08;
    }
    if (beacon3.current) {
      beacon3.current.position.y = -1.3 + Math.sin(time * 1.2 + 2) * 0.08;
    }

    // Photon pulse traveling up and down the data spine
    if (photonBeam.current) {
      photonBeam.current.position.y = Math.sin(time * 1.6) * 1.8;
    }
  });

  return (
    <group ref={groupRef} position={[0, -17.2, -3.5]}>
      {/* Central Glowing Vertical Data Spine */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 5.0, 16]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>

      {/* Traveling Photon Pulse on Spine */}
      <mesh ref={photonBeam} position={[0, 0, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Timeline Beacon Node 1 (Top) */}
      <mesh ref={beacon1} position={[-1.2, 1.3, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* Timeline Beacon Node 2 (Center) */}
      <mesh ref={beacon2} position={[1.2, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* Timeline Beacon Node 3 (Bottom) */}
      <mesh ref={beacon3} position={[-1.2, -1.3, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.9}
          roughness={0.2}
        />
      </mesh>

      <pointLight color="#06b6d4" intensity={2} distance={8} position={[0, 0, 1]} />
    </group>
  );
};
