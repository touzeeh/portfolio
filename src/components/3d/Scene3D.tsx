'use client';

import React, { useEffect, useRef, useMemo, useSyncExternalStore } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { useTheme } from '@/components/ui/ThemeProvider';

interface InnerSightBuildingProps {
  isMobile: boolean;
  reducedMotion: boolean;
  scrollRef: React.MutableRefObject<number>;
  isDark: boolean;
}

// 1. Hero Object: InnerSight 3-Floor Blueprint with A* Path Routing
const InnerSightBuilding: React.FC<InnerSightBuildingProps> = ({
  isMobile,
  reducedMotion,
  scrollRef,
  isDark,
}) => {
  const buildingGroup = useRef<THREE.Group>(null!);
  const pulseNodeRef = useRef<THREE.Mesh>(null!);
  const wireframeMatRef = useRef<THREE.LineBasicMaterial>(null!);
  const floorMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  // A* path coordinates across 3 floors
  const pathPoints = useMemo(
    () => [
      new THREE.Vector3(-1.4, -1.3, 1.0),
      new THREE.Vector3(-0.6, -1.3, 1.0),
      new THREE.Vector3(-0.6, -1.3, -0.4),
      new THREE.Vector3(-0.1, -1.3, -0.4),
      new THREE.Vector3(-0.1, 0.0, -0.4),
      new THREE.Vector3(0.8, 0.0, -0.4),
      new THREE.Vector3(0.8, 0.0, 0.6),
      new THREE.Vector3(1.1, 0.0, 0.6),
      new THREE.Vector3(1.1, 1.3, 0.6),
      new THREE.Vector3(0.2, 1.3, 0.6),
      new THREE.Vector3(-0.8, 1.3, -0.5),
    ],
    []
  );

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(pathPoints, false, 'catmullrom', 0.2),
    [pathPoints]
  );

  const pathGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)),
    [curve]
  );

  const floorGridSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const floors = [-1.3, 0.0, 1.3];
    const width = 3.6;
    const depth = 2.8;
    const halfW = width / 2;
    const halfD = depth / 2;

    floors.forEach((y) => {
      // Perimeter
      points.push(new THREE.Vector3(-halfW, y, -halfD), new THREE.Vector3(halfW, y, -halfD));
      points.push(new THREE.Vector3(halfW, y, -halfD), new THREE.Vector3(halfW, y, halfD));
      points.push(new THREE.Vector3(halfW, y, halfD), new THREE.Vector3(-halfW, y, halfD));
      points.push(new THREE.Vector3(-halfW, y, halfD), new THREE.Vector3(-halfW, y, -halfD));

      // Corridors
      points.push(new THREE.Vector3(-halfW, y, 0), new THREE.Vector3(halfW, y, 0));
      points.push(new THREE.Vector3(0, y, -halfD), new THREE.Vector3(0, y, halfD));
    });

    // Vertical structural shafts
    const corners = [
      [-halfW, -halfD], [halfW, -halfD], [halfW, halfD], [-halfW, halfD],
      [-0.1, -0.4], [1.1, 0.6],
    ];
    corners.forEach(([x, z]) => {
      points.push(new THREE.Vector3(x, -1.3, z), new THREE.Vector3(x, 1.3, z));
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const pathLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: isDark ? '#22d3ee' : '#0e7490',
      transparent: true,
      opacity: isDark ? 0.85 : 0.95,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    return new THREE.Line(pathGeometry, mat);
  }, [pathGeometry, isDark]);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    // Tie A* path progress to scroll progress or gentle animation
    if (pulseNodeRef.current) {
      const scrollInfluence = (scrollRef.current * 4) % 1;
      const progress = (t * 0.2 + scrollInfluence * 0.3) % 1;
      const pos = curve.getPoint(progress);
      pulseNodeRef.current.position.copy(pos);
    }

    // Scroll descent: Building descends smoothly out of view when scrolling down past Hero
    if (buildingGroup.current) {
      const baseOffsetY = isMobile ? 0.6 : 0.15;
      const targetY = baseOffsetY - scrollRef.current * 20;
      buildingGroup.current.position.y = THREE.MathUtils.lerp(
        buildingGroup.current.position.y,
        targetY,
        0.08
      );

      // Subtle architectural isometric sway
      buildingGroup.current.rotation.y = -0.65 + Math.sin(t * 0.25) * 0.03;
      buildingGroup.current.rotation.x = 0.52 + Math.cos(t * 0.2) * 0.02;
    }

    // Smoothly lerp material colors on theme toggle without remount
    const targetWireColor = new THREE.Color(isDark ? '#22d3ee' : '#0e7490');
    if (wireframeMatRef.current) {
      wireframeMatRef.current.color.lerp(targetWireColor, 0.1);
      wireframeMatRef.current.opacity = THREE.MathUtils.lerp(
        wireframeMatRef.current.opacity,
        isDark ? 0.35 : 0.45,
        0.1
      );
    }
  });

  const basePos: [number, number, number] = isMobile ? [0, 0.6, -3.6] : [0, 0.15, -2.6];
  const scale = isMobile ? 0.58 : 0.92;

  return (
    <group ref={buildingGroup} position={basePos} scale={scale} rotation={[0.52, -0.65, 0]}>
      {/* Floor Plate Wireframes */}
      <lineSegments geometry={floorGridSegments}>
        <lineBasicMaterial
          ref={wireframeMatRef}
          color={isDark ? '#22d3ee' : '#0e7490'}
          transparent
          opacity={isDark ? 0.35 : 0.45}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </lineSegments>

      {/* Translucent Slabs */}
      {[-1.3, 0.0, 1.3].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.6, 2.8]} />
          <meshBasicMaterial
            ref={floorMatRef}
            color={isDark ? '#0891b2' : '#cbd5e1'}
            transparent
            opacity={isDark ? 0.06 : 0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Active A* Path */}
      <primitive object={pathLine} />

      {/* Traveling Path Packet */}
      <mesh ref={pulseNodeRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={isDark ? '#ffffff' : '#0b1220'} />
      </mesh>
    </group>
  );
};

// 2. Side Gutter Architectural Relics (Pushed to Far Outer Gutters, |x| >= 9.0)
const GutterRelic: React.FC<{
  position: [number, number, number];
  isDark: boolean;
  reducedMotion: boolean;
}> = ({ position, isDark, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.9, 0]} />
      <meshBasicMaterial
        color={isDark ? '#a78bfa' : '#6d28d9'}
        wireframe
        transparent
        opacity={isDark ? 0.22 : 0.25}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  );
};

interface CosmicSceneProps {
  isMobile: boolean;
  reducedMotion: boolean;
  isPaused: boolean;
  scrollRef: React.MutableRefObject<number>;
  isDark: boolean;
}

const CosmicScene: React.FC<CosmicSceneProps> = ({
  isMobile,
  reducedMotion,
  isPaused: _isPaused,
  scrollRef,
  isDark,
}) => {
  // Ambient Starfield Particles ONLY in Dark mode (per light mode rules: NO starfield specks on paper)
  const particleCount = isMobile ? 120 : 350;

  const [dustPositions, dustColors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < particleCount; i++) {
      const p1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const p2 = Math.abs(Math.sin(i * 93.9898 + 67.345) * 24634.6345) % 1;
      const p3 = Math.abs(Math.sin(i * 45.1234 + 12.987) * 58923.1234) % 1;
      const p4 = Math.abs(Math.sin(i * 31.8471 + 91.231) * 31245.9231) % 1;

      pos[i * 3] = (p1 - 0.5) * 36;
      pos[i * 3 + 1] = (p2 - 0.5) * 36;
      pos[i * 3 + 2] = -14 + p3 * 12;

      const chosen = palette[Math.floor(p4 * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return [pos, col];
  }, [particleCount]);

  return (
    <group>
      {/* Hero Visual: InnerSight 3-Floor Blueprint */}
      <InnerSightBuilding
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        scrollRef={scrollRef}
        isDark={isDark}
      />

      {/* Far Gutters Relics (Desktop only, strictly outside content bounds at x = -9.2 and x = 9.2) */}
      {!isMobile && (
        <>
          <GutterRelic position={[-9.2, 0.5, -3.5]} isDark={isDark} reducedMotion={reducedMotion} />
          <GutterRelic position={[9.2, -1.5, -3.5]} isDark={isDark} reducedMotion={reducedMotion} />
        </>
      )}

      {/* Subtle Dust Particles in Dark Mode ONLY */}
      {isDark && (
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
            <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.03 : 0.038}
            vertexColors
            transparent
            opacity={0.45}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </group>
  );
};

export const Scene3D: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const shouldReduceMotion = Boolean(useReducedMotion());
  const scrollRef = useRef(0);

  // Tab visibility listener for pausing rendering
  const isHidden = useSyncExternalStore(
    (callback) => {
      document.addEventListener('visibilitychange', callback);
      return () => document.removeEventListener('visibilitychange', callback);
    },
    () => (typeof document !== 'undefined' ? document.hidden : false),
    () => false
  );

  // Window resize check
  const isTouchMobile = useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => (typeof window !== 'undefined' ? window.innerWidth < 768 : isMobile),
    () => isMobile
  );

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = docHeight > 0 ? window.scrollY / docHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden transition-opacity duration-300"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: isTouchMobile ? 54 : 46 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)]}
        frameloop={isHidden ? 'never' : 'always'}
        gl={{
          antialias: !isTouchMobile,
          alpha: true,
          powerPreference: 'high-performance',
          depth: false,
        }}
      >
        <ambientLight intensity={isDark ? 0.7 : 0.9} />
        <CosmicScene
          isMobile={isTouchMobile}
          reducedMotion={shouldReduceMotion}
          isPaused={isHidden}
          scrollRef={scrollRef}
          isDark={isDark}
        />
      </Canvas>
    </div>
  );
};
