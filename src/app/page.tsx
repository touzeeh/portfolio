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

// Dynamic import with ssr: false for Three.js Canvas (No preloader spinner)
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
    <div className="relative min-h-screen cosmic-backdrop text-slate-100 overflow-x-hidden">
      {/* (3D) Single low-opacity ambient layer */}
      <Scene3D isMobile={isMobile} />

      {/* Sticky Blurred Navbar with active-section highlight */}
      <Navbar />

      {/* Main Recruiter-First Scroll Content */}
      <main id="main-content" className="relative z-10 pb-20">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <WinsSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* (7) Floating Back-To-Top button appearing after 600px scroll */}
      <BackToTop />
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
