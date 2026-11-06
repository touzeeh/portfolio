'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_CONSTELLATION } from '@/data/portfolioData';

interface SkillsStageProps {
  reducedMotion?: boolean;
}

export const SkillsStage: React.FC<SkillsStageProps> = ({ reducedMotion = false }) => {
  const ringGroup1 = useRef<THREE.Group>(null!);
  const ringGroup2 = useRef<THREE.Group>(null!);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const ring1Nodes = TECH_CONSTELLATION.filter((n) => n.ring === 1);
  const ring2Nodes = TECH_CONSTELLATION.filter((n) => n.ring === 2);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (ringGroup1.current) {
      ringGroup1.current.rotation.y += delta * 0.18;
    }
    if (ringGroup2.current) {
      ringGroup2.current.rotation.y -= delta * 0.14;
    }
  });

  return (
    <group position={[0, -6.0, 0]}>
      {/* Central Constellation Anchor */}
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.2}
          metalness={0.8}
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Orbit Hairline Ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.008, 16, 96]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>

      {/* Orbit Hairline Ring 2 */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[3.6, 0.008, 16, 96]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>

      {/* Ring 1 Orbit Group */}
      <group ref={ringGroup1}>
        {ring1Nodes.map((node) => {
          const radius = 2.5;
          const x = Math.cos(node.angle) * radius;
          const z = Math.sin(node.angle) * radius;
          const isHovered = hoveredNode === node.name;

          return (
            <group
              key={node.name}
              position={[x, 0, z]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNode(node.name);
              }}
              onPointerOut={() => setHoveredNode(null)}
            >
              <mesh scale={isHovered ? 1.4 : 1}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isHovered ? 1.5 : 0.6}
                  roughness={0.2}
                />
              </mesh>
              <Text
                position={[0, 0.38, 0]}
                fontSize={0.2}
                color={isHovered ? '#ffffff' : '#94a3b8'}
                anchorX="center"
                anchorY="middle"
              >
                {node.name}
              </Text>
            </group>
          );
        })}
      </group>

      {/* Ring 2 Orbit Group */}
      <group ref={ringGroup2} rotation={[0.2, 0, 0.2]}>
        {ring2Nodes.map((node) => {
          const radius = 3.6;
          const x = Math.cos(node.angle) * radius;
          const z = Math.sin(node.angle) * radius;
          const isHovered = hoveredNode === node.name;

          return (
            <group
              key={node.name}
              position={[x, 0, z]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredNode(node.name);
              }}
              onPointerOut={() => setHoveredNode(null)}
            >
              <mesh scale={isHovered ? 1.4 : 1}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isHovered ? 1.5 : 0.6}
                  roughness={0.2}
                />
              </mesh>
              <Text
                position={[0, 0.35, 0]}
                fontSize={0.18}
                color={isHovered ? '#ffffff' : '#94a3b8'}
                anchorX="center"
                anchorY="middle"
              >
                {node.name}
              </Text>
            </group>
          );
        })}
      </group>

      {/* Central Light */}
      <pointLight color="#8b5cf6" intensity={2.5} distance={8} />
      <pointLight color="#06b6d4" intensity={2} distance={8} position={[0, 1, 0]} />
    </group>
  );
};
