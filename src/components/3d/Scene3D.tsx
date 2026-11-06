'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollCamera } from './ScrollCamera';
import { GlobalBackground3D } from './GlobalBackground3D';
import { HeroStage } from './HeroStage';
import { AboutStage } from './AboutStage';
import { SkillsStage } from './SkillsStage';
import { ProjectsStage } from './ProjectsStage';
import { WinsStage } from './WinsStage';
import { ExperienceStage } from './ExperienceStage';
import { ContactStage } from './ContactStage';

interface Scene3DProps {
  scrollProgress: number;
  isMobile?: boolean;
}

export const Scene3D: React.FC<Scene3DProps> = ({ scrollProgress, isMobile = false }) => {
  const [mobileState, setMobileState] = useState(isMobile);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    // Check mobile screen & pointer capability
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setMobileState(isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    // Check WebGL availability
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
    };
  }, []);

  // Fallback gradient if WebGL fails
  if (!webGlSupported) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-gradient-to-b from-[#030712] via-[#09071f] to-[#030712]"
        aria-hidden="true"
      />
    );
  }

  // Optimized particle counts for mobile to maintain 60/120 FPS
  const particleCountHero = mobileState ? 350 : 1100;
  const particleCountContact = mobileState ? 200 : 650;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: mobileState ? 52 : 45 }}
        dpr={mobileState ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: !mobileState,
          alpha: true,
          powerPreference: 'high-performance',
          depth: true,
        }}
      >
        {/* Soft atmospheric depth fog allowing cosmic field & grid to shine */}
        <fogExp2 attach="fog" args={['#030712', mobileState ? 0.02 : 0.016]} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[6, 12, 8]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-6, -10, -6]} intensity={1.6} color="#8b5cf6" />
        <pointLight position={[0, 0, 5]} intensity={1.8} color="#06b6d4" distance={18} />
        <pointLight position={[2, -13.5, 3]} intensity={2.5} color="#f59e0b" distance={12} />

        {/* Scroll-Driven Camera Path & Mouse Parallax */}
        <ScrollCamera
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
          isMobile={mobileState}
        />

        <Suspense fallback={null}>
          {/* Continuous Cosmic Dust Starfield, Cyber Grid & Gutter Relics across entire site */}
          <GlobalBackground3D
            reducedMotion={reducedMotion}
            isMobile={mobileState}
          />

          {/* Section 1: Hero Stage */}
          <HeroStage
            particleCount={particleCountHero}
            reducedMotion={reducedMotion}
            isMobile={mobileState}
          />

          {/* Section 2: About Stage */}
          <AboutStage
            reducedMotion={reducedMotion}
            isMobile={mobileState}
          />

          {/* Section 3: Skills Stage */}
          <SkillsStage
            reducedMotion={reducedMotion}
            isMobile={mobileState}
          />

          {/* Section 4: Projects Stage */}
          <ProjectsStage reducedMotion={reducedMotion} />

          {/* Section 5: Wins Stage */}
          <WinsStage reducedMotion={reducedMotion} />

          {/* Section 6: Experience Stage */}
          <ExperienceStage reducedMotion={reducedMotion} />

          {/* Section 7: Contact Stage */}
          <ContactStage
            particleCount={particleCountContact}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
