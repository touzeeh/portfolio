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
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { BackgroundMusic } from '@/components/ui/Music';
import { WayfindingRouteLine } from '@/components/ui/WayfindingRouteLine';

// Dynamic import with ssr: false for Three.js Canvas (untouched)
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
      {/* 3D Scene (Untouched) */}
      <Scene3D isMobile={isMobile} />

      {/* Stage 1 Foundation: Sticky Header with Wordmark, Pill Nav, Theme Toggle & Focus-trapped Mobile Menu */}
      <Navbar />

      {/* Vertical Wayfinding Route Line Track (draws on scroll with glowing nodes) */}
      <WayfindingRouteLine />

      {/* Main Content (Untouched section content for Stage 1) */}
      <main id="main-content" className="relative z-10 pb-16">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <WinsSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Stage 1 Foundation: Minimal Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop />

      {/* Floating Background Music & Synced Lyrics System */}
      <BackgroundMusic />

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
