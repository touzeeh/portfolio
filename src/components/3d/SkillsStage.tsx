'use client';

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TECH_CONSTELLATION } from '@/data/portfolioData';

interface SkillsStageProps {
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export const SkillsStage: React.FC<SkillsStageProps> = ({
  reducedMotion = false,
  isMobile = false,
}) => {
  const ringGroup1 = useRef<THREE.Group>(null!);
  const ringGroup2 = useRef<THREE.Group>(null!);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const ring1Nodes = useMemo(() => TECH_CONSTELLATION.filter((n) => n.ring === 1), []);
  const ring2Nodes = useMemo(() => TECH_CONSTELLATION.filter((n) => n.ring === 2), []);

  // Geometric laser constellation filaments connecting Ring 1 nodes and center anchor
  const constellationLines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const radius = 2.5;
    for (let i = 0; i < ring1Nodes.length; i++) {
      const cur = ring1Nodes[i];
      const next = ring1Nodes[(i + 1) % ring1Nodes.length];
      const p1 = new THREE.Vector3(Math.cos(cur.angle) * radius, 0, Math.sin(cur.angle) * radius);
      const p2 = new THREE.Vector3(Math.cos(next.angle) * radius, 0, Math.sin(next.angle) * radius);
      pts.push(p1, p2);
      // Filament to center anchor
      pts.push(new THREE.Vector3(0, 0, 0), p1);
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [ring1Nodes]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (ringGroup1.current) {
      ringGroup1.current.rotation.y += delta * (isMobile ? 0.12 : 0.18);
    }
    if (ringGroup2.current) {
      ringGroup2.current.rotation.y -= delta * (isMobile ? 0.09 : 0.14);
    }
  });

  const constellationScale = isMobile ? 0.75 : 1.1;

  return (
    <group position={[0, -6.2, isMobile ? -5.0 : -2.8]} scale={constellationScale}>
      {/* Central Constellation Anchor Core */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial
          color="#06b6d4"
          roughness={0.2}
          metalness={0.8}
          emissive="#06b6d4"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh scale={1.3}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.4}
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Orbit Hairline Ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.008, 16, isMobile ? 48 : 96]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>

      {/* Orbit Hairline Ring 2 */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[3.6, 0.008, 16, isMobile ? 48 : 96]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
      </mesh>

      {/* Ring 1 Orbit Group with Laser Filaments (No 3D Text Quads to prevent clipping artifacts) */}
      <group ref={ringGroup1}>
        <lineSegments geometry={constellationLines}>
          <lineBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

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
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isHovered ? 1.6 : 0.8}
                  roughness={0.2}
                />
              </mesh>
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
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isHovered ? 1.6 : 0.8}
                  roughness={0.2}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Central Lights */}
      <pointLight color="#06b6d4" intensity={3} distance={9} />
      <pointLight color="#8b5cf6" intensity={2.5} distance={9} position={[0, 1, 0]} />
    </group>
  );
};
