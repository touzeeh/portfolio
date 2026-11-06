'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface GlobalBackground3DProps {
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export const GlobalBackground3D: React.FC<GlobalBackground3DProps> = ({
  reducedMotion = false,
  isMobile = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const gridGroupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  // Particle count optimized for mobile vs desktop
  const particleCount = isMobile ? 500 : 1200;

  // Generate continuous cosmic dust starfield strictly in the deep background layer (Z <= -7)
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    // Disciplined palette: Cyan, Violet, Starlight White, Deep Indigo
    const palette = [
      new THREE.Color('#06b6d4'), // cyan
      new THREE.Color('#38bdf8'), // sky
      new THREE.Color('#8b5cf6'), // violet
      new THREE.Color('#c084fc'), // purple
      new THREE.Color('#ffffff'), // pure starlight
      new THREE.Color('#64748b'), // muted slate stardust
    ];

    for (let i = 0; i < particleCount; i++) {
      const p1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const p2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const p3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;
      const p4 = Math.abs(Math.sin(i * 31.8471 + 91.231) * 31245.9231) % 1;

      // X: spread wide across screen
      pos[i * 3] = (p1 - 0.5) * (isMobile ? 22 : 36);
      // Y: covers full vertical height (+8 to -26)
      pos[i * 3 + 1] = 8 - p2 * 34;
      // Z: strictly deep background layer (-24 to -7)
      pos[i * 3 + 2] = -24 + p3 * 17;

      const colorIndex = Math.floor(p4 * palette.length);
      const chosenColor = palette[colorIndex];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [particleCount, isMobile]);

  // Cyber Grid wireframe geometry in deep floor plane
  const gridSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = isMobile ? 32 : 54;
    const divisions = isMobile ? 18 : 30;
    const step = size / divisions;
    const half = size / 2;

    for (let i = 0; i <= divisions; i++) {
      const coord = -half + i * step;
      // Along X lines
      points.push(new THREE.Vector3(-half, 0, coord));
      points.push(new THREE.Vector3(half, 0, coord));
      // Along Z lines
      points.push(new THREE.Vector3(coord, 0, -half));
      points.push(new THREE.Vector3(coord, 0, half));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [isMobile]);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    // 1. Cosmic starfield gentle slow drift
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.01;
      pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.015;

      // Subtle desktop cursor parallax
      if (!isMobile) {
        pointsRef.current.position.x = THREE.MathUtils.lerp(
          pointsRef.current.position.x,
          pointer.x * 0.3,
          0.04
        );
        pointsRef.current.position.y = THREE.MathUtils.lerp(
          pointsRef.current.position.y,
          pointer.y * 0.2,
          0.04
        );
      }
    }

    // 2. Cyber Horizon Grid floor undulation
    if (gridGroupRef.current) {
      gridGroupRef.current.position.z = -8.5 + Math.sin(time * 0.25) * 0.3;
    }
  });

  return (
    <group>
      {/* Continuous Cosmic Dust Starfield in deep background */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.034 : 0.028}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Deep Cyber Horizon Grid Floor */}
      <group
        ref={gridGroupRef}
        position={[0, -12, -8.5]}
        rotation={[-Math.PI / 2.3, 0, 0]}
      >
        <lineSegments geometry={gridSegments}>
          <lineBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>
    </group>
  );
};
