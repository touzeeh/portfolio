'use client';

import React from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';
import { ExternalLinkIcon, GithubIcon, ArrowUpRightIcon } from '@/components/ui/Icons';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Engineering Showcase
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Selected Projects
        </h2>
        <p className="text-slate-300 text-base max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
          Production-grade applications engineered with TypeScript, Python, Three.js, and FastAPI.
        </p>
      </div>

      {/* 3 Projects Grid — Balanced 1 col on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group">
            <TiltCard
              className="glass-card flex flex-col justify-between h-full overflow-hidden border border-white/10 group-hover:border-cyan-400/40 transition-colors"
              maxTilt={4}
              borderRadius="lg"
              glareColor="rgba(6, 182, 212, 0.15)"
            >
              <div>
                {/* Real UI Mockup Thumbnail with Defined Boundary */}
                <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden border-b border-white/10">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} interface preview`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400 font-mono text-xs">
                      Preview Image
                    </div>
                  )}

                  {/* Corner Viewfinder Tech Brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-10 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-10 pointer-events-none" />
                </div>

                {/* Card Content: Concise & Scannable */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 font-medium mt-0.5">
                      {project.tagline}
                    </p>
                  </div>

                  {/* 1-Line Challenge */}
                  <p className="text-sm text-slate-300 leading-snug">
                    <span className="text-xs font-mono text-slate-400 font-semibold uppercase block mb-0.5">
                      Problem:
                    </span>
                    {project.problem}
                  </p>

                  {/* 1-Line What I Built */}
                  <p className="text-sm text-slate-300 leading-snug">
                    <span className="text-xs font-mono text-slate-400 font-semibold uppercase block mb-0.5">
                      Solution:
                    </span>
                    {project.whatIBuilt}
                  </p>

                  {/* 3 Core Tech Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Uniform Action Buttons on Every Card */}
              <div className="p-5 sm:p-6 pt-0 border-t border-white/[0.08] mt-4">
                <div className="grid grid-cols-2 gap-2.5 pt-4">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5 w-full"
                    >
                      <span>Live Demo</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5 w-full opacity-80"
                    >
                      <span>Architecture</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-xs py-2.5 px-3 flex items-center justify-center gap-1.5 w-full"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
};
