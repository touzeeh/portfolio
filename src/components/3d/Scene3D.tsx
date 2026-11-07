'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CosmicUniverseProps {
  particleCount: number;
  reducedMotion: boolean;
  isPaused: boolean;
  isMobile: boolean;
}

const CosmicUniverse: React.FC<CosmicUniverseProps> = ({
  particleCount,
  reducedMotion,
  isPaused,
  isMobile,
}) => {
  const dustRef = useRef<THREE.Points>(null!);
  const beaconsRef = useRef<THREE.Points>(null!);
  const gridRef = useRef<THREE.LineSegments>(null!);
  const { pointer } = useThree();

  // 1. Ambient Stardust Field
  const [dustPositions, dustColors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#38bdf8'), // Sky
      new THREE.Color('#8b5cf6'), // Violet
      new THREE.Color('#a855f7'), // Purple
      new THREE.Color('#ffffff'), // Starlight White
      new THREE.Color('#64748b'), // Slate Stardust
    ];

    for (let i = 0; i < particleCount; i++) {
      const p1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const p2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const p3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;
      const p4 = Math.abs(Math.sin(i * 31.8471 + 91.231) * 31245.9231) % 1;

      pos[i * 3] = (p1 - 0.5) * 34;
      pos[i * 3 + 1] = (p2 - 0.5) * 28;
      pos[i * 3 + 2] = -14 + p3 * 12;

      const chosen = palette[Math.floor(p4 * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [particleCount]);

  // 2. Larger Luminous Energy Beacons (30-40 foreground nodes)
  const beaconCount = isMobile ? 18 : 38;
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

      pos[i * 3] = (p1 - 0.5) * 26;
      pos[i * 3 + 1] = (p2 - 0.5) * 20;
      pos[i * 3 + 2] = -8 + p3 * 8;

      const chosen = palette[i % palette.length];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [beaconCount]);

  // 3. Cyber Horizon Perspective Grid
  const gridSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = 36;
    const divisions = 22;
    const step = size / divisions;
    const half = size / 2;

    for (let i = 0; i <= divisions; i++) {
      const coord = -half + i * step;
      // Along X
      points.push(new THREE.Vector3(-half, -5.5, coord));
      points.push(new THREE.Vector3(half, -5.5, coord));
      // Along Z
      points.push(new THREE.Vector3(coord, -5.5, -half));
      points.push(new THREE.Vector3(coord, -5.5, half));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (reducedMotion || isPaused) return;
    const time = state.clock.getElapsedTime();

    // Sensitive mouse interactivity: smoothly tracks mouse on desktop
    if (!isMobile) {
      const targetX = pointer.x * 0.45;
      const targetY = pointer.y * 0.35;

      if (dustRef.current) {
        dustRef.current.position.x = THREE.MathUtils.lerp(dustRef.current.position.x, targetX, 0.05);
        dustRef.current.position.y = THREE.MathUtils.lerp(dustRef.current.position.y, targetY, 0.05);
      }
      if (beaconsRef.current) {
        beaconsRef.current.position.x = THREE.MathUtils.lerp(beaconsRef.current.position.x, targetX * 1.3, 0.06);
        beaconsRef.current.position.y = THREE.MathUtils.lerp(beaconsRef.current.position.y, targetY * 1.3, 0.06);
      }
      if (gridRef.current) {
        gridRef.current.rotation.z = THREE.MathUtils.lerp(gridRef.current.rotation.z, -pointer.x * 0.05, 0.04);
      }
    }

    // Gentle orbital flow & pulse
    if (dustRef.current) {
      dustRef.current.rotation.y = time * 0.02;
      dustRef.current.rotation.z = Math.sin(time * 0.08) * 0.02;
    }
    if (beaconsRef.current) {
      beaconsRef.current.rotation.y = -time * 0.015;
    }
    if (gridRef.current) {
      gridRef.current.position.z = -10 + (Math.sin(time * 0.4) * 0.6);
    }
  });

  return (
    <group>
      {/* Deep Cyber Horizon Grid */}
      <lineSegments ref={gridRef} geometry={gridSegments} position={[0, -5, -10]} rotation={[0.45, 0, 0]}>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.15}
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
          size={isMobile ? 0.035 : 0.042}
          vertexColors
          transparent
          opacity={0.7}
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
          size={isMobile ? 0.065 : 0.08}
          vertexColors
          transparent
          opacity={0.85}
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

export const Scene3D: React.FC<Scene3DProps> = ({ isMobile = false }) => {
  const [mobileState, setMobileState] = useState(isMobile);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    // 1. Mobile touch detection
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setMobileState(isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 2. Prefers-reduced-motion check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    // 3. Pause when tab is hidden
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlSupported(false);
    } catch {
      setWebGlSupported(false);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', motionHandler);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!webGlSupported) return null;

  // Responsive particle density
  const particleCount = mobileState ? 260 : 650;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden opacity-55 transition-opacity duration-700"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: mobileState ? 54 : 46 }}
        dpr={mobileState ? [1, 1.25] : [1, 1.5]} // Performance budget: capped at 1.5
        frameloop={isPaused ? 'never' : 'always'}
        gl={{
          antialias: !mobileState,
          alpha: true,
          powerPreference: 'high-performance',
          depth: false,
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 6]} intensity={1.5} color="#06b6d4" distance={20} />
        <pointLight position={[5, -4, 4]} intensity={1.2} color="#8b5cf6" distance={18} />
        <CosmicUniverse
          particleCount={particleCount}
          reducedMotion={reducedMotion}
          isPaused={isPaused}
          isMobile={mobileState}
        />
      </Canvas>
    </div>
  );
};
