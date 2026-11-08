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

// 1. InnerSight 3D Holographic Multi-Floor Architectural Wayfinding Visualizer (Flagship Hero Scene)
const InnerSightBuilding: React.FC<{ isMobile: boolean; reducedMotion: boolean }> = ({
  isMobile,
  reducedMotion,
}) => {
  const buildingGroup = useRef<THREE.Group>(null!);
  const pulseNodeRef = useRef<THREE.Mesh>(null!);

  // A* path coordinates across 3 floors (L1 -> Elevator -> L2 -> Stairs -> L3 Clinic)
  const pathPoints = useMemo(
    () => [
      new THREE.Vector3(-1.4, -1.3, 1.0),  // L1 Entry
      new THREE.Vector3(-0.6, -1.3, 1.0),  // L1 Corridor Turn
      new THREE.Vector3(-0.6, -1.3, -0.4), // L1 Elevator Approach
      new THREE.Vector3(-0.1, -1.3, -0.4), // L1 Elevator Shaft Base
      new THREE.Vector3(-0.1, 0.0, -0.4),  // L2 Elevator Exit
      new THREE.Vector3(0.8, 0.0, -0.4),   // L2 Corridor Center
      new THREE.Vector3(0.8, 0.0, 0.6),    // L2 Ward Transition
      new THREE.Vector3(1.1, 0.0, 0.6),    // L2 East Stairwell
      new THREE.Vector3(1.1, 1.3, 0.6),    // L3 Stairwell Exit
      new THREE.Vector3(0.2, 1.3, 0.6),    // L3 Surgery Corridor
      new THREE.Vector3(-0.8, 1.3, -0.5),  // L3 Destination Clinic
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

  const pathLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: '#22d3ee',
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Line(pathGeometry, mat);
  }, [pathGeometry]);

  // Static floor waypoints
  const waypointPositions = useMemo(
    () => [
      // Level 1 Nodes
      [-1.4, -1.3, 1.0], [-0.6, -1.3, 1.0], [-0.6, -1.3, -0.4], [1.2, -1.3, 0.8], [-1.2, -1.3, -0.8],
      // Level 2 Nodes
      [-0.1, 0.0, -0.4], [0.8, 0.0, -0.4], [0.8, 0.0, 0.6], [-1.0, 0.0, 0.5], [1.2, 0.0, -0.8],
      // Level 3 Nodes
      [1.1, 1.3, 0.6], [0.2, 1.3, 0.6], [-0.8, 1.3, -0.5], [-1.3, 1.3, 0.8], [0.5, 1.3, -0.8],
    ],
    []
  );

  // Floor Plates (L1, L2, L3) wireframe lines
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

      // Interior Corridors
      points.push(new THREE.Vector3(-halfW, y, 0), new THREE.Vector3(halfW, y, 0));
      points.push(new THREE.Vector3(0, y, -halfD), new THREE.Vector3(0, y, halfD));
    });

    // Vertical Columns (Elevator Shafts & Corner Pillars)
    const corners = [
      [-halfW, -halfD], [halfW, -halfD], [halfW, halfD], [-halfW, halfD],
      [-0.1, -0.4], [1.1, 0.6],
    ];
    corners.forEach(([x, z]) => {
      points.push(new THREE.Vector3(x, -1.3, z), new THREE.Vector3(x, 1.3, z));
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    // Animated A* Routing pulse packet traveling along the multi-floor building
    if (pulseNodeRef.current) {
      const progress = (t * 0.26) % 1;
      const pos = curve.getPoint(progress);
      pulseNodeRef.current.position.copy(pos);
    }

    // Subtle isometric sway
    if (buildingGroup.current) {
      buildingGroup.current.rotation.y = -0.65 + Math.sin(t * 0.4) * 0.05;
      buildingGroup.current.rotation.x = 0.52 + Math.cos(t * 0.3) * 0.025;
    }
  });

  const position: [number, number, number] = isMobile ? [0, 0.8, -3.4] : [0, 0.3, -2.4];
  const scale = isMobile ? 0.65 : 1.05;

  return (
    <group ref={buildingGroup} position={position} scale={scale} rotation={[0.52, -0.65, 0]}>
      {/* Architectural Wireframe Blueprint Lines */}
      <lineSegments geometry={floorGridSegments}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Translucent Floor Slabs */}
      {[-1.3, 0.0, 1.3].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.6, 2.8]} />
          <meshBasicMaterial color="#0891b2" transparent opacity={0.06} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}

      {/* Static Waypoints on the Floors */}
      {waypointPositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <octahedronGeometry args={[0.045, 0]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
        </mesh>
      ))}

      {/* Destination Clinic Beacon (L3 Target) */}
      <mesh position={[-0.8, 1.3, -0.5]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#a855f7" />
        <pointLight color="#c084fc" intensity={1.5} distance={2.5} />
      </mesh>

      {/* Active Glowing A* Path */}
      <primitive object={pathLine} />

      {/* Traveling Energy Packet (Real-Time A* Routing Flow) */}
      <mesh ref={pulseNodeRef}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight color="#22d3ee" intensity={2} distance={3} />
      </mesh>
    </group>
  );
};

// 2. Gyroscopic Cyber Core (Left Margin)
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

  const position: [number, number, number] = isMobile ? [-2.8, 2.5, -4.5] : [-6.4, 0.8, -2.8];
  const scale = isMobile ? 0.6 : 0.95;

  return (
    <group position={position} scale={scale}>
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.7, 0.025, 16, 64]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.65} />
      </mesh>
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.25, 0.02, 16, 64]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.6} />
      </mesh>
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
      <pointLight color="#22d3ee" intensity={1.8} distance={6} />
    </group>
  );
};

// 3. Celestial Geode & Orbiting Satellites (Right Margin)
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

  const position: [number, number, number] = isMobile ? [2.8, -2.8, -4.5] : [6.4, -1.2, -3.2];
  const scale = isMobile ? 0.6 : 0.95;

  return (
    <group ref={geodeRef} position={position} scale={scale}>
      <mesh ref={outerIcosaRef}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.65} />
      </mesh>
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
      <pointLight color="#c084fc" intensity={1.8} distance={6} />
    </group>
  );
};

// 4. Main Cosmic Universe Controller with InnerSight Hologram
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
      new THREE.Color('#06b6d4'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#94a3b8'),
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
  const beaconCount = isMobile ? 18 : 36;
  const [beaconPositions, beaconColors] = useMemo(() => {
    const pos = new Float32Array(beaconCount * 3);
    const col = new Float32Array(beaconCount * 3);

    const palette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#ffffff'),
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
      points.push(new THREE.Vector3(-half, -6, coord));
      points.push(new THREE.Vector3(half, -6, coord));
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

    // Scroll Travel: camera descends through the floors into cosmic depth
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
      {/* Flagship Hero Visual: InnerSight Multi-Floor 3D Building with Animated A* Routing */}
      <InnerSightBuilding isMobile={isMobile} reducedMotion={reducedMotion} />

      {/* Margin Relics */}
      <GyroscopicCore isMobile={isMobile} reducedMotion={reducedMotion} />
      <CelestialGeode isMobile={isMobile} reducedMotion={reducedMotion} />

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
          opacity={0.22}
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
  const particleCount = isTouchMobile ? 260 : 680;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden opacity-85 transition-opacity duration-700"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: isTouchMobile ? 54 : 46 }}
        dpr={isTouchMobile ? [1, 1.25] : [1, 1.5]}
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
