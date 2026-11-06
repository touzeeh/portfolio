'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';
import { GithubIcon, LinkedinIcon, MailIcon } from '@/components/ui/Icons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website_hp: '', // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      return 'Please share a brief note (at least 10 characters).';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage('');
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to dispatch message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again or reach out directly via email.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          Get in Touch
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight">
          Let's build something together
        </h2>
        <p className="text-slate-400 text-base max-w-xl">
          Whether you have an internship role, an engineering project, or want to discuss 3D web systems, send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form Card (spans 7 cols) */}
        <div className="lg:col-span-7">
          <TiltCard
            className="glass-card p-6 sm:p-8 border border-white/[0.08]"
            maxTilt={3}
            borderRadius="lg"
            glareColor="rgba(139, 92, 246, 0.18)"
          >
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Message Dispatched
                </h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Your message has been received. I'll get back to you at{' '}
                  <span className="text-violet-300 font-mono text-xs">{formData.email}</span> soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', message: '', website_hp: '' });
                  }}
                  className="btn-secondary text-xs mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot Field (Hidden from real users, traps spam bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Website</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_hp}
                    onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-slate-300">
                      Your Name <span className="text-violet-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-[12px] bg-slate-900/90 border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-400/60 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono text-slate-300">
                      Email Address <span className="text-violet-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-[12px] bg-slate-900/90 border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-400/60 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-slate-300">
                    Message <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, idea, or role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-[12px] bg-slate-900/90 border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-400/60 transition resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-400 font-mono">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                >
                  <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </TiltCard>
        </div>

        {/* Small Text Social & Direct Channels (spans 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <TiltCard
            className="glass-card p-6 sm:p-8 h-full flex flex-col justify-between"
            maxTilt={3}
            borderRadius="lg"
            glareColor="rgba(6, 182, 212, 0.15)"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Direct Communication
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Feel free to reach out via direct email or connect through professional networks.
                </p>
              </div>

              {/* Channels as small text links */}
              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-[12px] bg-slate-900/60 border border-white/[0.06] hover:border-violet-400/40 transition group"
                >
                  <div className="p-2 rounded-[12px] bg-violet-600/15 text-violet-400">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Email</span>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-[12px] bg-slate-900/60 border border-white/[0.06] hover:border-white/20 transition group"
                >
                  <div className="p-2 rounded-[12px] bg-slate-800 text-white">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">GitHub</span>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition">
                      github.com/{PERSONAL_INFO.githubHandle}
                    </span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-[12px] bg-slate-900/60 border border-white/[0.06] hover:border-cyan-400/40 transition group"
                >
                  <div className="p-2 rounded-[12px] bg-cyan-600/15 text-cyan-400">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">LinkedIn</span>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition">
                      linkedin.com/in/{PERSONAL_INFO.linkedinHandle}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06] mt-6 text-xs text-slate-400 font-mono">
              Typical turnaround: within 24 hours
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
