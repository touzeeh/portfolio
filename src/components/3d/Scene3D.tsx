'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollCamera } from './ScrollCamera';
import { HeroStage } from './HeroStage';
import { AboutStage } from './AboutStage';
import { SkillsStage } from './SkillsStage';
import { ProjectsStage } from './ProjectsStage';
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
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
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
        className="fixed inset-0 -z-10 pointer-events-none w-full h-full bg-gradient-to-b from-[#030712] via-[#09071f] to-[#030712]"
        aria-hidden="true"
      />
    );
  }

  // Optimized particle counts for mobile to maintain 60/120 FPS
  const particleCountHero = mobileState ? 240 : 900;
  const particleCountContact = mobileState ? 140 : 500;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden"
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
        {/* Tuned global fog and ambient lighting */}
        <color attach="background" args={['#030712']} />
        <fogExp2 attach="fog" args={['#030712', mobileState ? 0.05 : 0.055]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 10, 7]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -8, -5]} intensity={1.0} color="#8b5cf6" />

        {/* Scroll-Driven Camera Path & Mouse Parallax */}
        <ScrollCamera
          scrollProgress={scrollProgress}
          reducedMotion={reducedMotion}
          isMobile={mobileState}
        />

        <Suspense fallback={null}>
          {/* Section 1: Hero */}
          <HeroStage
            particleCount={particleCountHero}
            reducedMotion={reducedMotion}
            isMobile={mobileState}
          />

          {/* Section 2: About */}
          <AboutStage
            reducedMotion={reducedMotion}
            isMobile={mobileState}
          />

          {/* Section 3: Skills */}
          <SkillsStage
            reducedMotion={reducedMotion}
            isMobile={mobileState}
          />

          {/* Section 4: Projects */}
          <ProjectsStage reducedMotion={reducedMotion} />

          {/* Section 5: Experience */}
          <ExperienceStage reducedMotion={reducedMotion} />

          {/* Section 6: Contact */}
          <ContactStage
            particleCount={particleCountContact}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
