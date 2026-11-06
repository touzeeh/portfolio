'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { TiltCard } from '@/components/ui/TiltCard';
import { GithubIcon, LinkedinIcon, MailIcon } from '@/components/ui/Icons';

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('Transmitting message...');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Web3Forms Public Access Key
    formData.append('access_key', '6efb1fda-7860-4bbc-9978-bf37460a177f');
    formData.append('subject', `New Inquiry on touzeeh.xyz from ${formData.get('name') || 'Visitor'}`);
    formData.append('from_name', 'touzeeh.xyz Portfolio');

    const name = (formData.get('name') as string) || '';
    setSenderName(name);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage(data.message || 'Message sent successfully!');
        form.reset();
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Failed to dispatch message. Please try again.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network connection error. Please try again or reach out via email directly.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-14 space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Get in Touch
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Let's build something together
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
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
                  Thank you, <span className="text-white font-medium">{senderName || 'there'}</span>! Your message has been sent directly to Touzeeh's inbox.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setStatusMessage('');
                  }}
                  className="btn-secondary text-xs mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot Botcheck (Hidden from humans, traps spam bots) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-slate-300">
                      Your Name <span className="text-violet-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
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
                      name="email"
                      required
                      placeholder="you@example.com"
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
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, idea, or role..."
                    className="w-full px-4 py-2.5 rounded-[12px] bg-slate-900/90 border border-white/[0.08] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-400/60 transition resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-rose-400 font-mono">
                    {statusMessage}
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
