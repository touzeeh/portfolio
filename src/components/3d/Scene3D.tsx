'use client';

import React, { useEffect, useRef, useMemo, useState, useSyncExternalStore } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { ANIMATION_FLAGS } from '@/config/animations';

interface InnerSightBuildingProps {
  isMobile: boolean;
  reducedMotion: boolean;
  scrollRef: React.MutableRefObject<number>;
  pointerPos: React.MutableRefObject<{ x: number; y: number }>;
  isLight: boolean;
}

// 1. Hero Object: InnerSight 3-Floor Blueprint with A* Path Routing
const InnerSightBuilding: React.FC<InnerSightBuildingProps> = ({
  isMobile,
  reducedMotion,
  scrollRef,
  pointerPos,
  isLight,
}) => {
  const buildingGroup = useRef<THREE.Group>(null!);
  const pulseNodeRef = useRef<THREE.Mesh>(null!);
  const wireframeMatRef = useRef<THREE.LineBasicMaterial>(null!);

  // A* path coordinates across 3 floors (L1 Entrance -> L1 Elevator -> L2 Hall -> L2 Stairs -> L3 Clinic)
  const waypoints = useMemo(
    () => [
      new THREE.Vector3(-1.5, -1.3, 1.0),
      new THREE.Vector3(-0.6, -1.3, 1.0),
      new THREE.Vector3(-0.6, -1.3, -0.4),
      new THREE.Vector3(-0.1, -1.3, -0.4), // Elevator L1
      new THREE.Vector3(-0.1, 0.0, -0.4),  // Elevator L2
      new THREE.Vector3(0.8, 0.0, -0.4),
      new THREE.Vector3(0.8, 0.0, 0.6),
      new THREE.Vector3(1.1, 0.0, 0.6),   // Stairs L2
      new THREE.Vector3(1.1, 1.3, 0.6),   // Stairs L3
      new THREE.Vector3(0.2, 1.3, 0.6),
      new THREE.Vector3(-0.8, 1.3, -0.5), // Destination Clinic
    ],
    []
  );

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.15),
    [waypoints]
  );

  const pathGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(curve.getPoints(100)),
    [curve]
  );

  // Floor plate perimeter & corridor segments
  const floorGridSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const floors = [-1.3, 0.0, 1.3];
    const width = 3.8;
    const depth = 2.8;
    const halfW = width / 2;
    const halfD = depth / 2;

    floors.forEach((y) => {
      // Outer Perimeter
      points.push(new THREE.Vector3(-halfW, y, -halfD), new THREE.Vector3(halfW, y, -halfD));
      points.push(new THREE.Vector3(halfW, y, -halfD), new THREE.Vector3(halfW, y, halfD));
      points.push(new THREE.Vector3(halfW, y, halfD), new THREE.Vector3(-halfW, y, halfD));
      points.push(new THREE.Vector3(-halfW, y, halfD), new THREE.Vector3(-halfW, y, -halfD));

      // Major Corridor Grid
      points.push(new THREE.Vector3(-halfW, y, 0), new THREE.Vector3(halfW, y, 0));
      points.push(new THREE.Vector3(0, y, -halfD), new THREE.Vector3(0, y, halfD));

      // Sub-grids for architectural feel
      points.push(new THREE.Vector3(-halfW * 0.5, y, -halfD), new THREE.Vector3(-halfW * 0.5, y, halfD));
      points.push(new THREE.Vector3(halfW * 0.5, y, -halfD), new THREE.Vector3(halfW * 0.5, y, halfD));
    });

    // Vertical Structural Shafts (Corner Columns + Elevator/Stair Cores)
    const columns = [
      [-halfW, -halfD], [halfW, -halfD], [halfW, halfD], [-halfW, halfD],
      [-0.1, -0.4], [1.1, 0.6],
    ];
    columns.forEach(([x, z]) => {
      points.push(new THREE.Vector3(x, -1.3, z), new THREE.Vector3(x, 1.3, z));
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const pathLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: isLight ? '#0284c7' : '#22d3ee',
      transparent: true,
      opacity: 0.95,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    return new THREE.Line(pathGeometry, mat);
  }, [pathGeometry, isLight]);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    // 1. Moving Packet along A* path
    if (pulseNodeRef.current) {
      const scrollInfluence = (scrollRef.current * 3.5) % 1;
      const progress = (t * 0.16 + scrollInfluence * 0.3) % 1;
      const pos = curve.getPoint(progress);
      pulseNodeRef.current.position.copy(pos);
    }

    // 2. Parallax & Scroll camera drift
    if (buildingGroup.current) {
      const baseOffsetY = isMobile ? 0.35 : 0.05;
      const targetY = baseOffsetY - scrollRef.current * 20;
      buildingGroup.current.position.y = THREE.MathUtils.lerp(
        buildingGroup.current.position.y,
        targetY,
        0.08
      );

      // Lerped pointer parallax rotation (fine pointer max +-0.08 rad ~4.5 deg)
      const targetRotY = -0.62 + Math.sin(t * 0.2) * 0.03 + pointerPos.current.x * 0.08;
      const targetRotX = 0.52 + Math.cos(t * 0.16) * 0.02 - pointerPos.current.y * 0.06;

      buildingGroup.current.rotation.y = THREE.MathUtils.lerp(
        buildingGroup.current.rotation.y,
        targetRotY,
        0.06
      );
      buildingGroup.current.rotation.x = THREE.MathUtils.lerp(
        buildingGroup.current.rotation.x,
        targetRotX,
        0.06
      );

      // Fade out building as user scrolls down past hero
      const scrollFade = Math.max(0, 1 - scrollRef.current * 4.2);
      if (wireframeMatRef.current) {
        const baseOpacity = isLight ? 0.75 : 0.62;
        wireframeMatRef.current.opacity = THREE.MathUtils.lerp(
          wireframeMatRef.current.opacity,
          baseOpacity * scrollFade,
          0.1
        );
      }
    }
  });

  const basePos: [number, number, number] = isMobile ? [0, 0.35, -3.2] : [0, 0.05, -2.4];
  const scale = isMobile ? 0.62 : 0.98;

  return (
    <group ref={buildingGroup} position={basePos} scale={scale} rotation={[0.52, -0.62, 0]}>
      {/* Structural Wireframe Grid */}
      <lineSegments geometry={floorGridSegments}>
        <lineBasicMaterial
          ref={wireframeMatRef}
          color={isLight ? '#0284c7' : '#06b6d4'}
          transparent
          opacity={isLight ? 0.75 : 0.62}
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Translucent Floor Slabs */}
      {[-1.3, 0.0, 1.3].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 2.8]} />
          <meshBasicMaterial
            color={isLight ? '#bae6fd' : '#083344'}
            transparent
            opacity={isLight ? 0.35 : 0.14}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Static Junction Nodes along A* Path */}
      {waypoints.map((pt, idx) => (
        <mesh key={idx} position={pt}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial
            color={
              idx === waypoints.length - 1
                ? isLight ? '#7c3aed' : '#a78bfa'
                : isLight ? '#0284c7' : '#22d3ee'
            }
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}

      {/* Target Destination Clinic Beacon */}
      <mesh position={[-0.8, 1.3, -0.5]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={isLight ? '#7c3aed' : '#c084fc'} />
        <pointLight color={isLight ? '#7c3aed' : '#c084fc'} intensity={isLight ? 1.5 : 2.0} distance={3} />
      </mesh>

      {/* Active Glowing A* Path Line */}
      <primitive object={pathLine} />

      {/* Traveling Waypoint Packet */}
      <mesh ref={pulseNodeRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={isLight ? '#0284c7' : '#ffffff'} />
        <pointLight color={isLight ? '#0284c7' : '#22d3ee'} intensity={2.4} distance={3.5} />
      </mesh>
    </group>
  );
};

// 2. Ambient Stardust Field
interface CosmicSceneProps {
  isMobile: boolean;
  reducedMotion: boolean;
  scrollRef: React.MutableRefObject<number>;
  pointerPos: React.MutableRefObject<{ x: number; y: number }>;
  isLight: boolean;
}

const CosmicScene: React.FC<CosmicSceneProps> = ({
  isMobile,
  reducedMotion,
  scrollRef,
  pointerPos,
  isLight,
}) => {
  const particleCount = isMobile ? 80 : 200;

  const [dustPositions, dustColors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const darkPalette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#ffffff'),
    ];
    const lightPalette = [
      new THREE.Color('#0284c7'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#2563eb'),
      new THREE.Color('#0f172a'),
    ];
    const palette = isLight ? lightPalette : darkPalette;

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
  }, [particleCount, isLight]);

  return (
    <group>
      {/* Hero Visual: InnerSight 3-Floor Blueprint */}
      <InnerSightBuilding
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        scrollRef={scrollRef}
        pointerPos={pointerPos}
        isLight={isLight}
      />

      {/* Ambient Stardust Field */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[dustColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.028 : 0.035}
          vertexColors
          transparent
          opacity={isLight ? 0.45 : 0.32}
          sizeAttenuation
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export const Scene3D: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const scrollRef = useRef(0);
  const pointerPos = useRef({ x: 0, y: 0 });
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Detect theme live
  const isLight = useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const observer = new MutationObserver(callback);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme'],
      });
      return () => observer.disconnect();
    },
    () => (typeof document !== 'undefined' ? document.documentElement.classList.contains('light') : false),
    () => false
  );

  // Performance Guard 1: Detect WebGL support with static fallback
  const webGlSupported = useSyncExternalStore(
    () => () => {},
    () => {
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
    },
    () => true
  );

  // Performance Guard 2: Pause frameloop when tab is hidden
  const isHidden = useSyncExternalStore(
    (callback) => {
      if (typeof document === 'undefined') return () => {};
      document.addEventListener('visibilitychange', callback);
      return () => document.removeEventListener('visibilitychange', callback);
    },
    () => (typeof document !== 'undefined' ? document.hidden : false),
    () => false
  );

  // Performance Guard 3: Resize check
  const isTouchMobile = useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => (typeof window !== 'undefined' ? window.innerWidth < 768 : isMobile),
    () => isMobile
  );

  // Track pointer for 3D parallax on fine pointers
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    const handlePointerMove = (e: MouseEvent) => {
      if (!ANIMATION_FLAGS.hero3DParallax) return;
      pointerPos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  // Performance Guard 4: IntersectionObserver to pause rendering when hero is offscreen
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = docHeight > 0 ? window.scrollY / docHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Static Fallback for WebGL failure or reduced motion: clean CSS blueprint poster
  if (!webGlSupported || shouldReduceMotion) {
    return (
      <div
        className={`fixed inset-0 -z-10 pointer-events-none w-full h-full opacity-40 transition-colors duration-300 ${
          isLight
            ? 'bg-[radial-gradient(ellipse_60%_40%_at_50%_25%,rgba(2,132,199,0.12),transparent_75%)]'
            : 'bg-[radial-gradient(ellipse_60%_40%_at_50%_25%,var(--blueprint-line),transparent_75%)]'
        }`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden transition-opacity duration-300"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: isTouchMobile ? 54 : 45 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        frameloop={isHidden || !isHeroVisible ? 'never' : 'always'}
        gl={{
          antialias: !isTouchMobile,
          alpha: true,
          powerPreference: 'high-performance',
          depth: true,
        }}
      >
        <ambientLight intensity={isLight ? 1.2 : 0.8} />
        <pointLight position={[0, 0, 6]} intensity={isLight ? 1.4 : 1.8} color={isLight ? '#0284c7' : '#22d3ee'} distance={20} />
        <pointLight position={[6, -4, 4]} intensity={isLight ? 0.9 : 1.2} color={isLight ? '#7c3aed' : '#a78bfa'} distance={18} />
        <CosmicScene
          isMobile={isTouchMobile}
          reducedMotion={shouldReduceMotion}
          scrollRef={scrollRef}
          pointerPos={pointerPos}
          isLight={isLight}
        />
      </Canvas>
    </div>
  );
};
