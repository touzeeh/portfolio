'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon, MailIcon, CheckIcon, CopyIcon } from '@/components/ui/Icons';
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
    data.append('access_key', '6efb1fda-7860-4bbc-9978-bf37460a177f');
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    data.append('subject', `Inquiry on touzeeh.xyz from ${formData.name}`);
    data.append('from_name', 'Touzeeh Ahmed Portfolio');

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
        setStatusMessage(result.message || 'Submission failed. Please email touzeeh.dev@gmail.com directly.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network issue. Please email touzeeh.dev@gmail.com directly.');
    }
  };

  // (8) Copy-to-clipboard feedback on email
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: shouldReduceMotion ? 0 : -5,
      transition: {
        duration: 0.25,
        ease: SHARED_EASE,
      },
    },
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* (1) Section Header Scroll Reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-14 space-y-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold drop-shadow-sm">
          Get in Touch
        </span>
        <h2 className="font-display text-section-fluid text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          Let's Connect
        </h2>
        <p className="text-slate-300 text-base max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
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
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            className="glass-card p-6 sm:p-8 border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_16px_36px_-8px_rgba(6,182,212,0.18)] transition-colors rounded-[20px] h-full"
            style={{ willChange: 'transform' }}
          >
            {status === 'success' ? (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: SHARED_EASE }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Message Transmitted
                </h3>
                <p className="text-sm text-slate-200 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your message has been sent directly to Touzeeh's verified inbox.
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
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-slate-200">
                      Your Name <span className="text-cyan-400">*</span>
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
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border ${
                        touched.name && errors.name
                          ? 'border-rose-400/80 focus:ring-rose-400/30'
                          : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/30'
                      } text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition`}
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-rose-400 font-mono mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-slate-200">
                      Email Address <span className="text-cyan-400">*</span>
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
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border ${
                        touched.email && errors.email
                          ? 'border-rose-400/80 focus:ring-rose-400/30'
                          : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/30'
                      } text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition`}
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
                  <label htmlFor="message" className="text-sm font-medium text-slate-200">
                    Message <span className="text-cyan-400">*</span>
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
                    className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border ${
                      touched.message && errors.message
                        ? 'border-rose-400/80 focus:ring-rose-400/30'
                        : 'border-white/20 focus:border-cyan-400 focus:ring-cyan-400/30'
                    } text-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 transition resize-none`}
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

                {/* (6) Send button with loading/success/error states */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  transition={{ duration: 0.2, ease: SHARED_EASE }}
                  className={`btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer ${
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
          </motion.div>
        </motion.div>

        {/* Direct Channels (spans 5 cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-5 flex flex-col justify-between space-y-6 h-full">
          <motion.div
            initial="initial"
            whileHover="hover"
            variants={cardVariants}
            className="glass-card p-6 sm:p-8 h-full flex flex-col justify-between border border-white/10 hover:border-violet-400/40 hover:shadow-[0_16px_36px_-8px_rgba(139,92,246,0.18)] transition-colors rounded-[20px]"
            style={{ willChange: 'transform' }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Direct Communication
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Feel free to email directly or copy the address to your clipboard.
                </p>
              </div>

              {/* Channels as clear links */}
              <div className="space-y-3.5">
                {/* (8) Email with Copy-to-Clipboard Feedback */}
                <div className="relative group">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-white/10 group-hover:border-cyan-400/50 transition">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="flex items-center gap-3.5 flex-1 min-w-0"
                    >
                      <div className="p-2.5 rounded-lg bg-cyan-600/15 text-cyan-400 shrink-0">
                        <MailIcon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-mono text-slate-400 block">Email Address</span>
                        <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition truncate block">
                          {PERSONAL_INFO.email}
                        </span>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="ml-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-400/50 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition shrink-0"
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
                    </button>
                  </div>
                </div>

                {/* GitHub Channel */}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-white/30 transition group"
                >
                  <div className="p-2.5 rounded-lg bg-slate-800 text-white shrink-0">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">GitHub</span>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition">
                      github.com/{PERSONAL_INFO.githubHandle}
                    </span>
                  </div>
                </a>

                {/* LinkedIn Channel */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 hover:border-violet-400/50 transition group"
                >
                  <div className="p-2.5 rounded-lg bg-violet-600/15 text-violet-400 shrink-0">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">LinkedIn</span>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-violet-300 transition">
                      linkedin.com/in/{PERSONAL_INFO.linkedinHandle}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
