'use client';

import React from 'react';
import { PROJECTS } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';
import { ExternalLinkIcon, GithubIcon, ArrowUpRightIcon } from '@/components/ui/Icons';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
          Featured Work
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight">
          Selected Projects & Case Studies
        </h2>
        <p className="text-slate-400 text-base max-w-2xl">
          Detailed case studies of software I have designed, engineered, and published across 3D spatial web, full-stack microservices, and security libraries.
        </p>
      </div>

      {/* 3 Projects Grid — Balanced 1 col on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <TiltCard
            key={project.id}
            className="glass-card flex flex-col justify-between h-full border border-white/[0.08]"
            maxTilt={5}
            borderRadius="lg"
            glareColor={
              project.accent === 'violet'
                ? 'rgba(139, 92, 246, 0.22)'
                : project.accent === 'teal'
                ? 'rgba(6, 182, 212, 0.22)'
                : 'rgba(99, 102, 241, 0.22)'
            }
          >
            {/* Visual Card Header / Media Banner */}
            <div className="relative h-44 w-full bg-slate-950 overflow-hidden border-b border-white/[0.06]">
              {/* Abstract Generative Canvas Gradient */}
              <div
                className={`absolute inset-0 opacity-80 ${
                  project.accent === 'violet'
                    ? 'bg-gradient-to-br from-violet-900/40 via-purple-900/20 to-slate-950'
                    : project.accent === 'teal'
                    ? 'bg-gradient-to-br from-cyan-900/40 via-teal-900/20 to-slate-950'
                    : 'bg-gradient-to-br from-indigo-900/40 via-blue-900/20 to-slate-950'
                }`}
              />

              {/* Decorative Geometric Wireframe Blueprint */}
              <div className="absolute inset-0 flex items-center justify-center p-6 opacity-40 pointer-events-none">
                <svg className="w-full h-full text-slate-400" viewBox="0 0 200 100" fill="none">
                  <path d="M10 50 Q 50 10, 100 50 T 190 50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <rect x="35" y="25" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="1" />
                  <circle cx="150" cy="50" r="25" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-[12px] text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-white/10 backdrop-blur-md">
                  Case Study
                </span>
                {project.featured && (
                  <span className="px-2.5 py-1 rounded-[12px] text-[11px] font-mono bg-violet-600/20 text-violet-300 border border-violet-500/30 backdrop-blur-md">
                    Featured
                  </span>
                )}
              </div>

              {/* Bottom Title on Image */}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium line-clamp-1">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Case Study Content */}
            <div className="p-6 space-y-4 flex-1">
              {/* Problem */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Problem
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Role */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  My Role
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.role}
                </p>
              </div>

              {/* What I Built */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  What I Built
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.whatIBuilt}
                </p>
              </div>

              {/* Result & Learning */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Result & Learning
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.result}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-[12px] text-[11px] font-mono bg-slate-900/90 border border-white/[0.06] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="p-6 pt-0 border-t border-white/[0.06] mt-auto">
              <div className="flex flex-wrap items-center gap-2 pt-4">
                {/* Live Demo Button (if available) */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs py-2.5 px-3 flex-1 min-h-[42px] text-center justify-center"
                    aria-label={`View Live Demo of ${project.title}`}
                  >
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}

                {/* Main Repo Button */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary text-xs py-2.5 px-3 flex-1 min-h-[42px] text-center justify-center"
                  aria-label={`View GitHub repository for ${project.title}`}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>

                {/* Secondary Repo (e.g. Flutter Frontend for KarigarKart) */}
                {project.secondaryGithubUrl && (
                  <a
                    href={project.secondaryGithubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-xs py-2.5 px-3 w-full min-h-[42px] text-center justify-center mt-1"
                    aria-label={`View ${project.secondaryGithubLabel || 'Frontend Repo'}`}
                  >
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    <span>{project.secondaryGithubLabel || 'Frontend Repo'}</span>
                  </a>
                )}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
