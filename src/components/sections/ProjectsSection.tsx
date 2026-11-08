'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SITE_DATA } from '@/data/site';
import {
  ExternalLinkIcon,
  GithubIcon,
  FileTextIcon,
  TerminalIcon,
  CheckIcon,
  CopyIcon,
} from '@/components/ui/Icons';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from '@/lib/animations';

export const ProjectsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const featuredProject = SITE_DATA.projects.find((p) => p.featured) || SITE_DATA.projects[0];
  const supportingProjects = SITE_DATA.projects.filter((p) => p.id !== featuredProject.id);

  return (
    <section id="projects" className="section-padding max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Numbered Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-12 space-y-2"
      >
        <span className="eyebrow-label">
          01 / Projects
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Selected Engineering Work
        </h2>
        <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
          Interactive 3D web interfaces in Three.js and backend service architectures in Python and TypeScript.
        </p>
      </motion.div>

      {/* 1. Large Featured Card: InnerSight */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-8"
      >
        <div className="site-card p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Media Slot: 16:10 preview with 1px border + radius */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full rounded-[14px] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] group">
                <Image
                  src={featuredProject.media.src}
                  alt={featuredProject.media.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="eyebrow-label text-[var(--accent)]">
                    Featured Project
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
                    {featuredProject.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] font-medium">
                    {featuredProject.tagline}
                  </p>
                </div>

                {/* Problem / Approach / Result in 3 Short Rows */}
                <div className="space-y-3 pt-2 text-sm leading-snug">
                  <div>
                    <span className="eyebrow-label block mb-0.5">Problem</span>
                    <p className="text-[var(--text-muted)]">{featuredProject.problem}</p>
                  </div>
                  <div>
                    <span className="eyebrow-label block mb-0.5">Approach</span>
                    <p className="text-[var(--text)]">{featuredProject.approach}</p>
                  </div>
                  <div>
                    <span className="eyebrow-label block mb-0.5">Result</span>
                    <p className="text-[var(--text)] font-medium">{featuredProject.result}</p>
                  </div>
                </div>

                {/* Measured Metrics with Footnotes */}
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {featuredProject.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-2.5 rounded-[10px] bg-[var(--surface-2)] border border-[var(--border)]"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="font-mono text-sm font-bold text-[var(--accent)]">{m.value}</span>
                          <span className="font-sans text-xs text-[var(--text-muted)]">{m.label}</span>
                        </div>
                        <p className="font-mono text-[11px] text-[var(--text-muted)] mt-1 leading-tight">
                          ↳ {m.howMeasured}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plain Chips (sans 13-14px, max 5) */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredProject.chips.map((chip) => (
                    <span key={chip} className="tech-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions: Live Demo / Code / Case Study (Render ONLY those that exist) */}
              <div className="pt-4 border-t border-[var(--border)] mt-auto flex flex-wrap items-center gap-3">
                {featuredProject.links.liveDemoUrl && (
                  <a
                    href={featuredProject.links.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs"
                  >
                    <span>Live demo</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {featuredProject.links.codeUrl && (
                  <a
                    href={featuredProject.links.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-xs"
                  >
                    <GithubIcon size={14} />
                    <span>Code</span>
                  </a>
                )}
                {featuredProject.links.caseStudyUrl && (
                  <a
                    href={featuredProject.links.caseStudyUrl}
                    className="btn-secondary text-xs"
                  >
                    <FileTextIcon className="w-3.5 h-3.5" />
                    <span>Case study</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Supporting Projects Grid (KarigarKart & RouteGuard) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch"
      >
        {supportingProjects.map((project) => (
          <motion.div key={project.id} variants={staggerItemVariants} className="flex flex-col h-full">
            <div className="site-card p-6 sm:p-7 flex flex-col justify-between h-full">
              <div className="space-y-4">
                {/* Media Slot: 16:10 preview with 1px border + radius */}
                <div className="relative aspect-[16/10] w-full rounded-[12px] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] group">
                  <Image
                    src={project.media.src}
                    alt={project.media.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {project.isDemoData && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded font-mono text-[11px] bg-[var(--surface)]/90 border border-[var(--border)] text-[var(--text-muted)] font-medium">
                      demo data
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--text)]">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">
                    {project.tagline}
                  </p>
                </div>

                {/* Problem / Approach / Result in 3 Short Rows */}
                <div className="space-y-2.5 text-sm leading-snug">
                  <div>
                    <span className="eyebrow-label block mb-0.5">Problem</span>
                    <p className="text-[var(--text-muted)]">{project.problem}</p>
                  </div>
                  <div>
                    <span className="eyebrow-label block mb-0.5">Approach</span>
                    <p className="text-[var(--text)]">{project.approach}</p>
                  </div>
                  <div>
                    <span className="eyebrow-label block mb-0.5">Result</span>
                    <p className="text-[var(--text)] font-medium">{project.result}</p>
                  </div>
                </div>

                {/* Install Command (RouteGuard) with 1-click copy */}
                {project.installCmd && (
                  <div className="p-2.5 rounded-[10px] bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <code className="text-xs font-mono text-[var(--text)] truncate select-all">
                        {project.installCmd}
                      </code>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(project.id, project.installCmd!)}
                      className="p-1.5 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors shrink-0 min-h-[32px] min-w-[32px] flex items-center justify-center"
                      aria-label="Copy clone command"
                      title="Copy clone command"
                    >
                      {copiedId === project.id ? (
                        <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <CopyIcon className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                {/* Measured Metrics with Footnotes */}
                {project.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-2 rounded-[10px] bg-[var(--surface-2)] border border-[var(--border)]"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="font-mono text-xs font-bold text-[var(--accent)]">{m.value}</span>
                          <span className="font-sans text-[11px] text-[var(--text-muted)]">{m.label}</span>
                        </div>
                        <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1 leading-tight">
                          ↳ {m.howMeasured}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Chips (sans 13-14px, max 5) */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.chips.map((chip) => (
                    <span key={chip} className="tech-chip text-xs">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions pinned to bottom with mt-auto */}
              <div className="pt-4 border-t border-[var(--border)] mt-auto flex flex-wrap items-center gap-2.5">
                {project.links.liveDemoUrl && (
                  <a
                    href={project.links.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs"
                  >
                    <span>Live demo</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.links.codeUrl && (
                  <a
                    href={project.links.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-xs"
                  >
                    <GithubIcon size={14} />
                    <span>Code</span>
                  </a>
                )}
                {project.links.caseStudyUrl && (
                  <a
                    href={project.links.caseStudyUrl}
                    className="btn-secondary text-xs"
                  >
                    <FileTextIcon className="w-3.5 h-3.5" />
                    <span>Case study</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
