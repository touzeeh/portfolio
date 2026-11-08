'use client';

import React, { useEffect, useRef, useMemo, useSyncExternalStore } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

interface CosmicUniverseProps {
  particleCount: number;
  reducedMotion: boolean;
  isPaused: boolean;
  isMobile: boolean;
}

// 1. Gyroscopic Cyber Core (Left Margin)
const GyroscopicCore: React.FC<{ isMobile: boolean; reducedMotion: boolean }> = ({ isMobile, reducedMotion }) => {
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const crystalRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.35;
      outerRingRef.current.rotation.y = t * 0.22;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -t * 0.3;
      innerRingRef.current.rotation.z = t * 0.28;
    }
    if (crystalRef.current) {
      crystalRef.current.rotation.x = t * 0.45;
      crystalRef.current.rotation.y = t * 0.55;
      crystalRef.current.position.y = Math.sin(t * 1.4) * 0.12;
    }
  });

  const position: [number, number, number] = isMobile ? [-2.6, 2.5, -4] : [-6.2, 1.0, -2.5];
  const scale = isMobile ? 0.65 : 1;

  return (
    <group position={position} scale={scale}>
      {/* Outer Torus */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.7, 0.025, 16, 64]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.65} />
      </mesh>
      {/* Inner Torus */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.25, 0.02, 16, 64]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.6} />
      </mesh>
      {/* Central Floating Crystal */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Localized Emissive Core Light */}
      <pointLight color="#22d3ee" intensity={1.8} distance={6} />
    </group>
  );
};

// 2. Celestial Geode & Orbiting Satellites (Right Margin)
const CelestialGeode: React.FC<{ isMobile: boolean; reducedMotion: boolean }> = ({ isMobile, reducedMotion }) => {
  const geodeRef = useRef<THREE.Group>(null!);
  const outerIcosaRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const satellitesRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (geodeRef.current) {
      geodeRef.current.position.y = (isMobile ? -2.8 : -1.2) + Math.sin(t * 0.75) * 0.22;
    }
    if (outerIcosaRef.current) {
      outerIcosaRef.current.rotation.x = t * 0.18;
      outerIcosaRef.current.rotation.y = t * 0.32;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.35;
      coreRef.current.rotation.z = t * 0.25;
    }
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = t * 0.55;
    }
  });

  const position: [number, number, number] = isMobile ? [2.6, -2.8, -4] : [6.2, -1.2, -3];
  const scale = isMobile ? 0.65 : 1;

  return (
    <group ref={geodeRef} position={position} scale={scale}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={outerIcosaRef}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.65} />
      </mesh>
      {/* Pulsing Luminous Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={0.85}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
      {/* Orbiting Satellite Prisms */}
      <group ref={satellitesRef}>
        <mesh position={[2.2, 0.4, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial color="#22d3ee" wireframe />
        </mesh>
        <mesh position={[-2.0, -0.5, 0.8]}>
          <tetrahedronGeometry args={[0.22, 0]} />
          <meshBasicMaterial color="#e879f9" wireframe />
        </mesh>
      </group>
      {/* Localized Emissive Core Light */}
      <pointLight color="#c084fc" intensity={1.8} distance={6} />
    </group>
  );
};

// 3. Deep Space Constellation Relics Distributed Vertically for Multi-Section Depth
const DeepConstellations: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const relics = useMemo(
    () => [
      { pos: [-4.8, 5.5, -9], rotSpeed: [0.2, 0.3, 0.1], scale: 0.85, type: 'octa', color: '#06b6d4' },
      { pos: [5.2, 6.5, -11], rotSpeed: [-0.15, 0.25, 0.2], scale: 0.9, type: 'icosa', color: '#8b5cf6' },
      { pos: [-5.5, -5.5, -8], rotSpeed: [0.3, -0.2, 0.15], scale: 0.75, type: 'tetra', color: '#38bdf8' },
      { pos: [5.6, -7.5, -10], rotSpeed: [-0.2, -0.3, 0.1], scale: 0.85, type: 'octa', color: '#c084fc' },
      { pos: [-4.2, -15.0, -12], rotSpeed: [0.22, 0.18, -0.15], scale: 0.95, type: 'icosa', color: '#22d3ee' },
      { pos: [4.6, -18.5, -11], rotSpeed: [-0.25, 0.2, 0.3], scale: 0.9, type: 'octa', color: '#a855f7' },
      { pos: [-5.0, -25.0, -10], rotSpeed: [0.18, 0.24, -0.2], scale: 0.85, type: 'tetra', color: '#38bdf8' },
      { pos: [4.8, -28.0, -12], rotSpeed: [-0.2, -0.22, 0.18], scale: 0.95, type: 'icosa', color: '#c084fc' },
    ],
    []
  );

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, idx) => {
      const r = relics[idx];
      if (r) {
        child.rotation.x = t * r.rotSpeed[0];
        child.rotation.y = t * r.rotSpeed[1];
        child.rotation.z = t * r.rotSpeed[2];
      }
    });
  });

  return (
    <group ref={groupRef}>
      {relics.map((r, i) => (
        <mesh key={i} position={r.pos as [number, number, number]} scale={r.scale}>
          {r.type === 'octa' ? (
            <octahedronGeometry args={[0.9, 0]} />
          ) : r.type === 'icosa' ? (
            <icosahedronGeometry args={[0.9, 0]} />
          ) : (
            <tetrahedronGeometry args={[0.95, 0]} />
          )}
          <meshBasicMaterial color={r.color} wireframe transparent opacity={0.45} />
        </mesh>
      ))}
    </group>
  );
};

// 4. Main Cosmic Universe Controller
const CosmicUniverse: React.FC<CosmicUniverseProps> = ({
  particleCount,
  reducedMotion,
  isPaused,
  isMobile,
}) => {
  const containerRef = useRef<THREE.Group>(null!);
  const dustRef = useRef<THREE.Points>(null!);
  const beaconsRef = useRef<THREE.Points>(null!);
  const gridRef = useRef<THREE.LineSegments>(null!);
  const scrollOffset = useRef(0);
  const { pointer } = useThree();

  // Scroll position synchronization
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollOffset.current = docHeight > 0 ? window.scrollY / docHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambient Stardust Field
  const [dustPositions, dustColors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#38bdf8'), // Sky Blue
      new THREE.Color('#8b5cf6'), // Violet
      new THREE.Color('#a855f7'), // Purple
      new THREE.Color('#ffffff'), // Starlight White
      new THREE.Color('#94a3b8'), // Slate Stardust
    ];

    for (let i = 0; i < particleCount; i++) {
      const p1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const p2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const p3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;
      const p4 = Math.abs(Math.sin(i * 31.8471 + 91.231) * 31245.9231) % 1;

      pos[i * 3] = (p1 - 0.5) * 36;
      pos[i * 3 + 1] = (p2 - 0.5) * 38;
      pos[i * 3 + 2] = -16 + p3 * 14;

      const chosen = palette[Math.floor(p4 * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [particleCount]);

  // Foreground Luminous Energy Beacons
  const beaconCount = isMobile ? 22 : 46;
  const [beaconPositions, beaconColors] = useMemo(() => {
    const pos = new Float32Array(beaconCount * 3);
    const col = new Float32Array(beaconCount * 3);

    const palette = [
      new THREE.Color('#22d3ee'), // Bright Cyan
      new THREE.Color('#c084fc'), // Bright Violet
      new THREE.Color('#ffffff'), // Pure Core
    ];

    for (let i = 0; i < beaconCount; i++) {
      const p1 = Math.abs(Math.sin(i * 23.123 + 45.67) * 34567.89) % 1;
      const p2 = Math.abs(Math.sin(i * 67.891 + 12.34) * 56789.01) % 1;
      const p3 = Math.abs(Math.sin(i * 89.012 + 34.56) * 78901.23) % 1;

      pos[i * 3] = (p1 - 0.5) * 28;
      pos[i * 3 + 1] = (p2 - 0.5) * 30;
      pos[i * 3 + 2] = -10 + p3 * 10;

      const chosen = palette[i % palette.length];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [beaconCount]);

  // Cyber Horizon Perspective Grid
  const gridSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = 40;
    const divisions = 24;
    const step = size / divisions;
    const half = size / 2;

    for (let i = 0; i <= divisions; i++) {
      const coord = -half + i * step;
      // Along X
      points.push(new THREE.Vector3(-half, -6, coord));
      points.push(new THREE.Vector3(half, -6, coord));
      // Along Z
      points.push(new THREE.Vector3(coord, -6, -half));
      points.push(new THREE.Vector3(coord, -6, half));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (reducedMotion || isPaused) return;
    const time = state.clock.getElapsedTime();

    // Sensitive mouse interactivity: smoothly tilts universe on desktop
    if (!isMobile && containerRef.current) {
      const targetRotX = -pointer.y * 0.12;
      const targetRotY = pointer.x * 0.15;
      containerRef.current.rotation.x = THREE.MathUtils.lerp(
        containerRef.current.rotation.x,
        targetRotX,
        0.05
      );
      containerRef.current.rotation.y = THREE.MathUtils.lerp(
        containerRef.current.rotation.y,
        targetRotY,
        0.05
      );
    }

    // Scroll Travel: universe glides through space as user reads the portfolio
    if (containerRef.current) {
      const targetTravelY = scrollOffset.current * 16;
      containerRef.current.position.y = THREE.MathUtils.lerp(
        containerRef.current.position.y,
        targetTravelY,
        0.05
      );
    }

    // Gentle orbital flow & pulse
    if (dustRef.current) {
      dustRef.current.rotation.y = time * 0.02;
      dustRef.current.rotation.z = Math.sin(time * 0.08) * 0.02;
    }
    if (beaconsRef.current) {
      beaconsRef.current.rotation.y = -time * 0.018;
    }
    if (gridRef.current) {
      gridRef.current.position.z = -10 + Math.sin(time * 0.4) * 0.8;
    }
  });

  return (
    <group ref={containerRef}>
      {/* 3D Geometric Margin Relics */}
      <GyroscopicCore isMobile={isMobile} reducedMotion={reducedMotion} />
      <CelestialGeode isMobile={isMobile} reducedMotion={reducedMotion} />
      <DeepConstellations reducedMotion={reducedMotion} />

      {/* Deep Cyber Horizon Grid */}
      <lineSegments
        ref={gridRef}
        geometry={gridSegments}
        position={[0, -5.5, -10]}
        rotation={[0.42, 0, 0]}
      >
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Main Ambient Stardust Field */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.038 : 0.046}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Luminous Core Beacons */}
      <points ref={beaconsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[beaconPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[beaconColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.07 : 0.09}
          vertexColors
          transparent
          opacity={0.88}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

interface Scene3DProps {
  scrollProgress?: number;
  isMobile?: boolean;
}

function subscribeVisibility(callback: () => void) {
  if (typeof document === 'undefined') return () => {};
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}

function getVisibilitySnapshot() {
  if (typeof document === 'undefined') return false;
  return document.hidden;
}

function subscribeMobile(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getMobileSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
}

function getWebGlSnapshot() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

export const Scene3D: React.FC<Scene3DProps> = ({ isMobile = false }) => {
  const isTouchMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, () => isMobile);
  const isHidden = useSyncExternalStore(subscribeVisibility, getVisibilitySnapshot, () => false);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const webGlSupported = useSyncExternalStore(() => () => {}, getWebGlSnapshot, () => true);

  if (!webGlSupported) return null;

  // Responsive particle density
  const particleCount = isTouchMobile ? 280 : 720;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden opacity-85 transition-opacity duration-700"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: isTouchMobile ? 54 : 46 }}
        dpr={isTouchMobile ? [1, 1.25] : [1, 1.5]} // Performance budget: capped at 1.5
        frameloop={isHidden ? 'never' : 'always'}
        gl={{
          antialias: !isTouchMobile,
          alpha: true,
          powerPreference: 'high-performance',
          depth: false,
        }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 0, 6]} intensity={1.6} color="#06b6d4" distance={20} />
        <pointLight position={[5, -4, 4]} intensity={1.4} color="#8b5cf6" distance={18} />
        <CosmicUniverse
          particleCount={particleCount}
          reducedMotion={shouldReduceMotion}
          isPaused={isHidden}
          isMobile={isTouchMobile}
        />
      </Canvas>
    </div>
  );
};
