'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SmoothScroll, useScrollProgress } from '@/components/ui/SmoothScroll';
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { WinsSection } from '@/components/sections/WinsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { WayfindingRouteLine } from '@/components/ui/WayfindingRouteLine';
import { IsometricDivider } from '@/components/ui/IsometricDivider';

// Dynamic import with ssr: false for Three.js Canvas
const Scene3D = dynamic(
  () => import('@/components/3d/Scene3D').then((m) => m.Scene3D),
  {
    ssr: false,
    loading: () => null,
  }
);

function PortfolioContent() {
  const { isMobile } = useScrollProgress();

  return (
    <div className="relative min-h-screen blueprint-background text-[var(--text)] overflow-x-hidden selection:bg-[var(--accent)]/20 selection:text-[var(--accent)]">
      {/* 3D Scene: Hero InnerSight 3-Floor Building with Animated A* Route */}
      <Scene3D isMobile={isMobile} />

      {/* Signature Floor Plan Wayfinding Route Line along Left Edge */}
      <WayfindingRouteLine />

      {/* Sticky Header with Theme Toggle & Contact */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="relative z-10 pb-16">
        <HeroSection />
        <IsometricDivider />
        <ProjectsSection />
        <IsometricDivider />
        <SkillsSection />
        <IsometricDivider />
        <WinsSection />
        <IsometricDivider />
        <AboutSection />
        <IsometricDivider />
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop />

      {/* Custom Desktop Precision Cursor */}
      <CustomCursor />
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <PortfolioContent />
    </SmoothScroll>
  );
}
