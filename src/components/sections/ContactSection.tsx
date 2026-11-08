'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SITE_DATA } from '@/data/site';
import { MailIcon, CopyIcon, CheckIcon, ArrowUpRightIcon } from '@/components/ui/Icons';
import {
  scrollRevealVariants,
  staggerGridVariants,
  staggerItemVariants,
  VIEWPORT_CONFIG,
} from '@/lib/animations';

interface FormState {
  name: string;
  email: string;
  message: string;
  website_hp: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    website_hp: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [emailCopied, setEmailCopied] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_DATA.personal.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. I will get back to you shortly.');
        setFormData({ name: '', email: '', message: '', website_hp: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to send message. Please try again or use direct email.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error occurred. Please use direct email to contact me.');
    }
  };

  return (
    <section id="contact" className="section-padding max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header with Numbered Eyebrow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={scrollRevealVariants}
        className="mb-12 space-y-2"
      >
        <span className="eyebrow-label">
          05 / Contact
        </span>
        <h2 className="font-display text-section-fluid text-[var(--text)] tracking-tight">
          Initiate Conversation
        </h2>
        <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
          Open for Summer 2027 internship discussions, technical collaboration, or engineering inquiries.
        </p>
      </motion.div>

      {/* Grid: Direct Contact Info (Left) + Form (Right) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerGridVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Direct Inquiries & Copy Email (5 Cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-5 space-y-6">
          <div className="site-card p-6 sm:p-7 space-y-5">
            <div>
              <span className="eyebrow-label text-[var(--accent)]">
                Direct Channel
              </span>
              <h3 className="font-display text-xl font-bold text-[var(--text)] mt-1">
                Reach Me Directly
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-2">
                Prefer email over forms? Copy my direct email address or send a quick mailto request.
              </p>
            </div>

            {/* Email Address Row with Copy & Mailto Buttons */}
            <div className="p-3.5 rounded-[12px] bg-[var(--surface-2)] border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="font-mono text-sm text-[var(--text)] font-semibold select-all break-all">
                  {SITE_DATA.personal.email}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {/* 1-Click Copy Email Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn-secondary text-xs flex-1 justify-center min-h-[38px]"
                  aria-label="Copy email address to clipboard"
                >
                  {emailCopied ? (
                    <>
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                {/* Direct Mailto Fallback */}
                <a
                  href={`mailto:${SITE_DATA.personal.email}`}
                  className="btn-ghost text-xs min-h-[38px] px-3 flex items-center gap-1"
                  aria-label="Open default mail client"
                >
                  <span>Mailto</span>
                  <ArrowUpRightIcon className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Location & Response Expectation */}
            <div className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-1">
              <div className="flex items-center justify-between">
                <span>Location:</span>
                <span className="text-[var(--text)]">{SITE_DATA.personal.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hiring Window:</span>
                <span className="text-[var(--accent)]">Summer 2027</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Accessible Form with Visible Labels (7 Cols) */}
        <motion.div variants={staggerItemVariants} className="lg:col-span-7">
          <div className="site-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Visible Live Status Message for Screen Readers */}
              <div aria-live="polite" className="min-h-[1.5rem]">
                {status === 'success' && (
                  <p className="p-3 rounded-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                    {statusMessage}
                  </p>
                )}
                {status === 'error' && (
                  <p className="p-3 rounded-[10px] bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium">
                    {statusMessage}
                  </p>
                )}
              </div>

              {/* Honeypot Field (Spam bot trap, completely hidden from humans) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_hp">Leave this empty</label>
                <input
                  id="website_hp"
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                />
              </div>

              {/* Full Name Field: Visible Label */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-[var(--text)] tracking-wide uppercase"
                >
                  Your Name <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-[10px] bg-[var(--surface-2)] border text-sm text-[var(--text)] placeholder-[var(--text-muted)]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                    errors.name ? 'border-red-500' : 'border-[var(--border)]'
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs font-mono text-red-500 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field: Visible Label */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold text-[var(--text)] tracking-wide uppercase"
                >
                  Email Address <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="name@organization.com"
                  className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-[10px] bg-[var(--surface-2)] border text-sm text-[var(--text)] placeholder-[var(--text-muted)]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                    errors.email ? 'border-red-500' : 'border-[var(--border)]'
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs font-mono text-red-500 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field: Visible Label */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[var(--text)] tracking-wide uppercase"
                >
                  Message <span className="text-[var(--accent)]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Details regarding your team, role requirements, or collaboration..."
                  className={`w-full px-3.5 py-2.5 rounded-[10px] bg-[var(--surface-2)] border text-sm text-[var(--text)] placeholder-[var(--text-muted)]/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-y ${
                    errors.message ? 'border-red-500' : 'border-[var(--border)]'
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs font-mono text-red-500 mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button with Spinner & Disabled State */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full sm:w-auto min-w-[160px]"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[var(--btn-primary-text)] border-t-transparent rounded-full animate-spin" />
                      <span>Sending message...</span>
                    </span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
