'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';
import { TrophyIcon, CopyIcon, CheckIcon, TerminalIcon } from '@/components/ui/Icons';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

export const ProjectsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [copiedCmd, setCopiedCmd] = useState(false);

  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const supportingProjects = PROJECTS.filter((p) => !p.featured);

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.04,
      transition: { duration: 0.5, ease: SHARED_EASE },
    },
  };

  const handleCopyInstall = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      {/* Section Header Scroll Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="space-y-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold drop-shadow-sm">
          Engineering Showcase
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Selected Projects &amp; Systems
        </h2>
        <p className="text-[var(--text-muted)] text-base max-w-2xl">
          Production-grade applications engineered with TypeScript, Python, Three.js, and FastAPI. Grounded in algorithmic benchmarks and relational schemas.
        </p>
      </motion.div>

      {/* 1. Flagship Featured Project: InnerSight (Hero Architectural Card) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="relative group/flagship"
      >
        {/* Animated Cyber Aura Ring */}
        <div
          className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 opacity-40 group-hover/flagship:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none"
          aria-hidden="true"
        />

        <TiltCard
          glareColor="rgba(6, 182, 212, 0.25)"
          className="glass-card overflow-hidden rounded-[24px] group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8">
            {/* Left: Interactive Media Preview */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                {featuredProject.image && (
                  <motion.div
                    variants={imageVariants}
                    whileHover="hover"
                    className="relative w-full h-full"
                  >
                    <Image
                      src={featuredProject.image}
                      alt={`${featuredProject.title} architectural wayfinding engine preview`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                )}

                {/* Hackathon 1st Place Pill Overlay */}
                <div className="glass-pill absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-md border border-amber-400/50 text-xs font-mono font-bold text-amber-300 shadow-lg">
                  <TrophyIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>1st Place Winner • Spatial Health</span>
                </div>
              </div>

              {/* Verified Benchmarks Grid */}
              {featuredProject.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5">
                  {featuredProject.metrics.map((m) => (
                    <motion.div
                      key={m.label}
                      whileHover={{ y: -4, scale: 1.04 }}
                      transition={{ duration: 0.2, ease: SHARED_EASE }}
                      className="glass-subcard p-2.5 rounded-xl text-center transition-colors cursor-default hover:border-cyan-400/40"
                    >
                      <span className="text-xs font-mono text-cyan-400 font-bold block">
                        {m.value}
                      </span>
                      <span className="text-[11px] text-slate-300 font-medium block mt-0.5">
                        {m.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Technical Architecture & Problem Breakdown */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="glass-pill inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono font-semibold mb-2">
                  Featured Project • Flagship 3D System
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-sm font-mono text-[var(--accent)] font-medium mt-1">
                  {featuredProject.tagline}
                </p>
              </div>

              <div className="space-y-3.5 text-[var(--text)] text-sm sm:text-base leading-relaxed">
                <div>
                  <span className="text-xs font-mono text-[var(--accent)] uppercase font-bold tracking-wider block mb-1">
                    Problem &amp; Motivation
                  </span>
                  <p className="text-[var(--text-muted)]">{featuredProject.problem}</p>
                </div>

                <div>
                  <span className="text-xs font-mono text-[var(--accent)] uppercase font-bold tracking-wider block mb-1">
                    Algorithmic Architecture
                  </span>
                  <p className="text-[var(--text-muted)]">{featuredProject.whatIBuilt}</p>
                </div>

                <div>
                  <span className="text-xs font-mono text-[var(--accent)] uppercase font-bold tracking-wider block mb-1">
                    Measured Result
                  </span>
                  <p className="text-[var(--text)] font-medium">{featuredProject.result}</p>
                </div>
              </div>

              {/* Tech Stack Chips with spring hover */}
              <div className="pt-2 border-t border-[var(--border)] flex flex-wrap gap-2">
                {featuredProject.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -3, scale: 1.08 }}
                    transition={{ duration: 0.18, ease: SHARED_EASE }}
                    className="px-3 py-1 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono font-medium text-[var(--text)] hover:border-[var(--accent)] transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* 2. Supporting Projects Grid (KarigarKart & RouteGuard) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7"
      >
        {supportingProjects.map((project) => (
          <motion.div key={project.id} variants={staggerItemVariants} className="h-full">
            <TiltCard
              glareColor={project.accent === 'violet' ? 'rgba(139, 92, 246, 0.22)' : 'rgba(56, 189, 248, 0.22)'}
              className="glass-card flex flex-col justify-between h-full p-6 border border-white/10 hover:border-white/30 transition-all rounded-[22px] group"
            >
              <div className="space-y-4">
                {/* Thumbnail Preview */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10">
                  {project.image && (
                    <motion.div variants={imageVariants} whileHover="hover" className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={`${project.title} UI preview`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--accent)] font-medium mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-3 text-sm text-[var(--text)] leading-snug">
                  <p>
                    <span className="text-xs font-mono text-[var(--accent)] uppercase font-bold tracking-wider block mb-0.5">
                      Problem:
                    </span>
                    <span className="text-[var(--text-muted)]">{project.problem}</span>
                  </p>
                  <p>
                    <span className="text-xs font-mono text-[var(--accent)] uppercase font-bold tracking-wider block mb-0.5">
                      Solution:
                    </span>
                    <span className="text-[var(--text-muted)]">{project.whatIBuilt}</span>
                  </p>
                </div>

                {/* RouteGuard: Terminal Install Command with 1-Click Copy */}
                {project.installCmd && (
                  <div className="glass-subcard p-2.5 rounded-xl flex items-center justify-between gap-2 shadow-inner">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <code className="text-xs font-mono text-[var(--text)] truncate select-all">
                        {project.installCmd}
                      </code>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => handleCopyInstall(project.installCmd!)}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className="p-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition shrink-0 cursor-pointer"
                      aria-label="Copy install command"
                      title="Copy install command"
                    >
                      {copiedCmd ? (
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <CopyIcon className="w-3.5 h-3.5" />
                      )}
                    </motion.button>
                  </div>
                )}

                {/* Metrics Badges */}
                {project.metrics && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.metrics.map((m) => (
                      <motion.div
                        key={m.label}
                        whileHover={{ y: -3, scale: 1.05 }}
                        transition={{ duration: 0.18, ease: SHARED_EASE }}
                        className="glass-subcard px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-default"
                      >
                        <span className="text-[var(--accent)] font-semibold">{m.value}</span>{' '}
                        <span className="text-[var(--text-muted)]">({m.label})</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)] mt-4">
                {project.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2, scale: 1.06 }}
                    transition={{ duration: 0.15, ease: SHARED_EASE }}
                    className="tech-chip text-xs cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
