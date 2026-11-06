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
  const floatingArtifactsRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  // Particle count optimized for mobile vs desktop
  const particleCount = isMobile ? 750 : 1800;

  // Generate continuous cosmic dust & starfield covering the full scroll depth
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    // Color palette: Violet, Cyan, Electric Blue, Bright Starlight White
    const palette = [
      new THREE.Color('#8b5cf6'), // violet
      new THREE.Color('#06b6d4'), // cyan
      new THREE.Color('#38bdf8'), // sky
      new THREE.Color('#c084fc'), // purple
      new THREE.Color('#ffffff'), // pure starlight
      new THREE.Color('#a5b4fc'), // indigo tint
    ];

    for (let i = 0; i < particleCount; i++) {
      // Deterministic pseudorandom for reproducible gorgeous distribution
      const p1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const p2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const p3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;
      const p4 = Math.abs(Math.sin(i * 31.8471 + 91.231) * 31245.9231) % 1;

      // X: spread across screen width with soft clustering
      pos[i * 3] = (p1 - 0.5) * (isMobile ? 18 : 28);
      // Y: covers whole height from top (+8) to bottom of site (-24)
      pos[i * 3 + 1] = 8 - p2 * 32;
      // Z: depth range from deep background to subtle foreground
      pos[i * 3 + 2] = -14 + p3 * 16;

      // Choose color
      const colorIndex = Math.floor(p4 * palette.length);
      const chosenColor = palette[colorIndex];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [particleCount, isMobile]);

  // Cyber Grid wireframe geometry
  const gridSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = isMobile ? 30 : 50;
    const divisions = isMobile ? 20 : 36;
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

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [isMobile]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const time = state.clock.getElapsedTime();

    // 1. Cosmic starfield gentle breathing and drift
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015;
      pointsRef.current.rotation.x = Math.sin(time * 0.08) * 0.03;

      // Subtle desktop cursor parallax
      if (!isMobile) {
        pointsRef.current.position.x = THREE.MathUtils.lerp(
          pointsRef.current.position.x,
          pointer.x * 0.5,
          0.04
        );
        pointsRef.current.position.y = THREE.MathUtils.lerp(
          pointsRef.current.position.y,
          pointer.y * 0.35,
          0.04
        );
      }
    }

    // 2. Cyber Horizon Grid gentle undulation
    if (gridGroupRef.current) {
      gridGroupRef.current.position.z = -8 + Math.sin(time * 0.4) * 0.5;
      gridGroupRef.current.rotation.z = Math.sin(time * 0.2) * 0.02;
    }

    // 3. Floating gutter artifacts tumble slowly
    if (floatingArtifactsRef.current) {
      floatingArtifactsRef.current.children.forEach((child, idx) => {
        child.rotation.x += delta * (0.15 + (idx % 3) * 0.05);
        child.rotation.y += delta * (0.2 + (idx % 2) * 0.08);
        child.position.y += Math.sin(time * 0.8 + idx) * 0.003;
      });
    }
  });

  return (
    <group>
      {/* Continuous Cosmic Dust Starfield across entire site */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.045 : 0.038}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Deep Cyber Horizon Grid Floor */}
      <group
        ref={gridGroupRef}
        position={[0, -10, -6]}
        rotation={[-Math.PI / 2.35, 0, 0]}
      >
        <lineSegments geometry={gridSegments}>
          <lineBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.16}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>

      {/* Floating Gutter 3D Relics along the scroll journey */}
      <group ref={floatingArtifactsRef}>
        {/* Artifact 1: Gyroscopic Ring in About gutter (Left) */}
        <group position={isMobile ? [-2.8, -3.0, -1] : [-4.6, -3.2, 0]}>
          <mesh>
            <torusGeometry args={[0.7, 0.015, 16, 48]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.012, 16, 48]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.6}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Artifact 2: Crystalline Octahedron in Skills gutter (Right) */}
        <group position={isMobile ? [2.8, -6.8, -1] : [4.5, -6.5, -0.5]}>
          <mesh>
            <octahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#8b5cf6"
              emissiveIntensity={0.7}
              roughness={0.1}
              metalness={0.8}
              wireframe
            />
          </mesh>
          <mesh scale={0.5}>
            <octahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1.0}
            />
          </mesh>
        </group>

        {/* Artifact 3: Holographic Warp Ring in Projects gutter (Left) */}
        <group position={isMobile ? [-2.8, -10.8, -1] : [-4.8, -10.5, 0]}>
          <mesh>
            <torusGeometry args={[0.9, 0.018, 16, 64]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.9}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color="#8b5cf6"
              wireframe
              emissive="#8b5cf6"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>

        {/* Artifact 4: Quantum Beacon Cage in Experience gutter (Right) */}
        <group position={isMobile ? [2.8, -14.6, -1] : [4.6, -14.2, -0.5]}>
          <mesh>
            <icosahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color="#38bdf8"
              wireframe
              emissive="#38bdf8"
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh scale={0.4}>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial
              color="#c084fc"
              emissive="#c084fc"
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>

        {/* Artifact 5: Orbital Ring Cluster in Contact gutter (Left) */}
        <group position={isMobile ? [-2.8, -18.2, -1] : [-4.4, -18.0, 0]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.8, 0.015, 16, 48]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.9}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.6, 0.012, 16, 48]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};
