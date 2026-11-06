'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbientStarfieldProps {
  particleCount: number;
  reducedMotion: boolean;
  isPaused: boolean;
}

const AmbientStarfield: React.FC<AmbientStarfieldProps> = ({
  particleCount,
  reducedMotion,
  isPaused,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    // Subtle ambient palette: Cyan, Violet, Starlight White, Slate Stardust
    const palette = [
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#8b5cf6'), // Violet
      new THREE.Color('#ffffff'), // Soft white
      new THREE.Color('#64748b'), // Muted slate
    ];

    for (let i = 0; i < particleCount; i++) {
      const p1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const p2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const p3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;
      const p4 = Math.abs(Math.sin(i * 31.8471 + 91.231) * 31245.9231) % 1;

      // Spread evenly in view volume
      pos[i * 3] = (p1 - 0.5) * 32;
      pos[i * 3 + 1] = (p2 - 0.5) * 26;
      pos[i * 3 + 2] = -12 + p3 * 10;

      const chosen = palette[Math.floor(p4 * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [particleCount]);

  useFrame((_, delta) => {
    if (reducedMotion || isPaused || !pointsRef.current) return;
    // Gentle ambient drift without any mouse parallax or sudden camera movements
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
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

    // 3. Pause when tab is hidden or off-screen
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

  // Fewer particles on mobile: 160 vs 420 on desktop
  const particleCount = mobileState ? 160 : 420;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden opacity-30 transition-opacity duration-500"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: mobileState ? 52 : 45 }}
        dpr={mobileState ? [1, 1.25] : [1, 1.5]} // Capped at 1.5 max
        frameloop={isPaused ? 'never' : 'always'}
        gl={{
          antialias: !mobileState,
          alpha: true,
          powerPreference: 'high-performance',
          depth: false,
        }}
      >
        <ambientLight intensity={0.5} />
        <AmbientStarfield
          particleCount={particleCount}
          reducedMotion={reducedMotion}
          isPaused={isPaused}
        />
      </Canvas>
    </div>
  );
};
