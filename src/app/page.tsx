'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SmoothScroll, useScrollProgress } from '@/components/ui/SmoothScroll';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

// Dynamic import with ssr: false for Three.js Canvas per performance budget
const Scene3D = dynamic(
  () => import('@/components/3d/Scene3D').then((m) => m.Scene3D),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 -z-10 pointer-events-none w-full h-full bg-[#030712] flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-6 h-6 border-2 border-violet-500/20 border-t-violet-400 rounded-full animate-spin" />
      </div>
    ),
  }
);

function PortfolioContent() {
  const { progress, isMobile } = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      {/* ONE fixed full-screen Canvas behind all content */}
      <Scene3D scrollProgress={progress} isMobile={isMobile} />

      {/* Desktop Custom Glowing Cursor (automatically hidden on mobile) */}
      <CustomCursor />

      {/* Sticky Blurred Navbar */}
      <Navbar />

      {/* Main Scroll Content */}
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
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
