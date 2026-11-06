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
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const photonBeam = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (beacon1.current) {
      beacon1.current.position.y = 1.3 + Math.sin(time * 1.2) * 0.12;
    }
    if (ring1.current) {
      ring1.current.rotation.x = time * 0.4;
      ring1.current.rotation.y = time * 0.3;
    }

    if (beacon2.current) {
      beacon2.current.position.y = 0 + Math.sin(time * 1.2 + 1) * 0.12;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -time * 0.35;
      ring2.current.rotation.z = time * 0.25;
    }

    if (beacon3.current) {
      beacon3.current.position.y = -1.3 + Math.sin(time * 1.2 + 2) * 0.12;
    }
    if (ring3.current) {
      ring3.current.rotation.x = time * 0.3;
      ring3.current.rotation.z = -time * 0.4;
    }

    // Photon pulse traveling up and down the data spine
    if (photonBeam.current) {
      photonBeam.current.position.y = Math.sin(time * 1.8) * 1.8;
    }
  });

  return (
    <group ref={groupRef} position={[0, -13.5, 0]}>
      {/* Central Glowing Vertical Data Spine */}
      <mesh position={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.02, 0.02, 5.2, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Traveling Photon Pulse on Spine */}
      <mesh ref={photonBeam} position={[0, 0, -0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Timeline Beacon Node 1 (Top) */}
      <group position={[-1.2, 1.3, -0.5]}>
        <mesh ref={beacon1}>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={1.4}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={ring1}>
          <torusGeometry args={[0.55, 0.012, 16, 48]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Timeline Beacon Node 2 (Center) */}
      <group position={[1.4, 0, -0.5]}>
        <mesh ref={beacon2}>
          <sphereGeometry args={[0.24, 16, 16]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={1.3}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={ring2}>
          <torusGeometry args={[0.5, 0.012, 16, 48]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.9}
          />
        </mesh>
      </group>

      {/* Timeline Beacon Node 3 (Bottom) */}
      <group position={[-1.3, -1.3, -0.5]}>
        <mesh ref={beacon3}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={ring3}>
          <torusGeometry args={[0.48, 0.012, 16, 48]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      <pointLight color="#8b5cf6" intensity={2.5} distance={8} position={[0, 0, 1]} />
    </group>
  );
};
