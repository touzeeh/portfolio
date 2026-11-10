'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { CheckIcon, CopyIcon } from '@/components/ui/Icons';
import { TiltCard } from '@/components/ui/TiltCard';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
  SHARED_EASE,
} from '@/lib/animations';

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Form input state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // (6) Inline validation logic
  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your name (min 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isValid) return;

    setStatus('loading');
    setStatusMessage('Transmitting message...');

    const data = new FormData();
    // Verified Web3Forms Public Access Key
    data.append('access_key', '6efb1fda-7860-4bbc-9978-bf37460a177f');
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    data.append('subject', `Inquiry on touzeeh.xyz from ${formData.name}`);
    data.append('from_name', 'Touzeeh Ahmed Portfolio');
    data.append('botcheck', '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setStatusMessage('Message transmitted successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
      } else {
        setStatus('error');
        setStatusMessage(result.message || `Submission failed. Please email ${PERSONAL_INFO.email} directly.`);
      }
    } catch {
      setStatus('error');
      setStatusMessage(`Network issue. Please email ${PERSONAL_INFO.email} directly.`);
    }
  };

  // (8) Copy-to-clipboard feedback on verified email
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* (1) Section Header Scroll Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-8 sm:mb-14 space-y-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold drop-shadow-sm">
          Get in Touch
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Let's Connect
        </h2>
        <p className="text-[var(--text-muted)] text-base max-w-xl">
          Whether you have an internship opportunity, an engineering project, or want to connect, send a message below.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7"
      >
        {/* Contact Form Card (spans 7 cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-7 h-full">
          <TiltCard
            glareColor="rgba(34, 211, 238, 0.12)"
            className="glass-card p-4 sm:p-8 rounded-[20px] h-full"
          >
            {status === 'success' ? (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: SHARED_EASE }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckIcon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                  Message Transmitted
                </h3>
                <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
                  Thank you! Your message has been sent directly to <span className="text-[var(--text)] font-semibold">{PERSONAL_INFO.email}</span>.
                </p>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setStatus('idle');
                    setStatusMessage('');
                  }}
                  className="btn-secondary text-xs mt-3"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Anti-Spam Honeypot */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-[var(--text)]">
                      Your Name <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      required
                      placeholder="e.g. Alex Smith"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/60 backdrop-blur-md border ${
                        touched.name && errors.name
                          ? 'border-rose-400/80 focus:ring-rose-400/30'
                          : 'border-white/10 border-t-white/15 focus:border-[var(--accent)] focus:ring-[var(--accent)]/30'
                      } text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 transition-all`}
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-rose-400 font-mono mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
                      Email Address <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      required
                      placeholder="alex@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/60 backdrop-blur-md border ${
                        touched.email && errors.email
                          ? 'border-rose-400/80 focus:ring-rose-400/30'
                          : 'border-white/10 border-t-white/15 focus:border-[var(--accent)] focus:ring-[var(--accent)]/30'
                      } text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 transition-all`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-xs text-rose-400 font-mono mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--text)]">
                    Message <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    required
                    rows={4}
                    placeholder="Tell me about your team, role, or project..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/60 backdrop-blur-md border ${
                      touched.message && errors.message
                        ? 'border-rose-400/80 focus:ring-rose-400/30'
                        : 'border-white/10 border-t-white/15 focus:border-[var(--accent)] focus:ring-[var(--accent)]/30'
                    } text-[var(--text)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 transition-all resize-none`}
                  />
                  {touched.message && errors.message && (
                    <p className="text-xs text-rose-400 font-mono mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Status Message */}
                {status === 'error' && (
                  <p className="text-xs text-rose-400 font-mono">
                    {statusMessage}
                  </p>
                )}

                {/* (6) Send button with loading/success/error states, shimmer sweep & spring physics */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  animate={status === 'error' && !shouldReduceMotion ? { x: [-5, 5, -5, 5, 0] } : undefined}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2, ease: SHARED_EASE }}
                  className={`btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-cyan-500/25 ${
                    status === 'loading' ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  {status === 'loading' && (
                    <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                  )}
                  <span>
                    {status === 'loading'
                      ? 'Transmitting...'
                      : status === 'error'
                      ? 'Retry Transmission'
                      : 'Send Message'}
                  </span>
                </motion.button>
              </form>
            )}
          </TiltCard>
        </motion.div>

        {/* Direct Channels (spans 5 cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-5 flex flex-col justify-between space-y-6 h-full">
          <TiltCard
            glareColor="rgba(167, 139, 250, 0.15)"
            className="glass-card p-4 sm:p-8 h-full flex flex-col justify-between rounded-[20px]"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--text)] mb-2">
                  Direct Communication
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Feel free to email directly or copy the address to your clipboard.
                </p>
              </div>

              {/* Channels as clear interactive links */}
              <div className="space-y-3.5">
                {/* (8) Email with Copy-to-Clipboard Feedback */}
                <div className="relative group">
                  <div className="glass-subcard flex items-center justify-between p-3.5 rounded-xl group-hover:border-[var(--accent)]/50 transition-all">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="flex items-center gap-3.5 flex-1 min-w-0"
                    >
                      <div className="p-2.5 rounded-lg bg-cyan-600/15 text-[var(--accent)] shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform flex items-center justify-center">
                        <Image src="/icons/gmail.png" alt="Gmail" width={16} height={16} className="w-4 h-4 object-contain" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-mono text-[var(--text-muted)] block">Email Address</span>
                        <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate block">
                          {PERSONAL_INFO.email}
                        </span>
                      </div>
                    </a>

                    <motion.button
                      type="button"
                      onClick={handleCopyEmail}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="ml-2 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text)] flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <>
                          <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* GitHub Channel */}
                <motion.a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: SHARED_EASE }}
                  className="glass-subcard flex items-center gap-3.5 p-3.5 rounded-xl hover:border-slate-400/40 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform flex items-center justify-center">
                    <Image src="/icons/github.png" alt="GitHub" width={16} height={16} className="w-4 h-4 object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted)] block">GitHub</span>
                    <span className="text-sm font-medium text-[var(--text)] transition-colors">
                      github.com/{PERSONAL_INFO.githubHandle}
                    </span>
                  </div>
                </motion.a>

                {/* LinkedIn Channel */}
                <motion.a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: SHARED_EASE }}
                  className="glass-subcard flex items-center gap-3.5 p-3.5 rounded-xl hover:border-violet-400/50 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-violet-600/15 text-violet-400 shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-transform flex items-center justify-center">
                    <Image src="/icons/linkedin.png" alt="LinkedIn" width={16} height={16} className="w-4 h-4 object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--text-muted)] block">LinkedIn</span>
                    <span className="text-sm font-medium text-[var(--text)] group-hover:text-violet-400 transition-colors">
                      linkedin.com/in/{PERSONAL_INFO.linkedinHandle}
                    </span>
                  </div>
                </motion.a>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>
    </section>
  );
};
