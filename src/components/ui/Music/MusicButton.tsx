'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMusic } from './MusicContext';
import { SHARED_EASE } from '@/lib/animations';

export const MusicButton: React.FC = () => {
  const { isPlaying, hasStarted, audioError, togglePlay } = useMusic();
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  if (audioError) {
    return null; // Gracefully hidden if audio asset fails completely
  }

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 select-none">
      <div className="relative flex items-center">
        {/* Pre-start gentle ripple ring */}
        {!hasStarted && !shouldReduceMotion && (
          <span
            className="absolute -inset-1.5 rounded-full bg-[var(--accent)]/25 animate-ping pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* While playing: rotating circular equalizer border ring */}
        {isPlaying && !shouldReduceMotion && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            className="absolute -inset-1.5 rounded-full border border-dashed border-[var(--accent)]/40 pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Interactive Play/Pause Button */}
        <motion.button
          type="button"
          data-music-btn="true"
          onClick={togglePlay}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
          transition={{ duration: 0.18, ease: SHARED_EASE }}
          className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
            isPlaying
              ? 'bg-[var(--surface-2)]/90 border border-[var(--accent)]/60 text-[var(--accent)] shadow-[0_0_18px_rgba(34,211,238,0.35)]'
              : 'bg-[var(--surface-2)]/80 border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/50 shadow-md'
          }`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          aria-pressed={isPlaying}
        >
          {/* Smooth Icon Morph (crossfade with scale/rotate ~250ms) */}
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.svg
                key="pause-icon"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { scale: 0.6, rotate: -25, opacity: 0 }
                }
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { scale: 0.6, rotate: 25, opacity: 0 }
                }
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="5" width="4" height="14" rx="1.5" />
                <rect x="14" y="5" width="4" height="14" rx="1.5" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play-icon"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { scale: 0.6, rotate: 25, opacity: 0 }
                }
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { scale: 0.6, rotate: -25, opacity: 0 }
                }
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-3.5 h-3.5 fill-current translate-x-[1px]"
                viewBox="0 0 24 24"
              >
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Mini Equalizer Bars inside button when playing */}
          {isPlaying && !shouldReduceMotion && (
            <div
              className="absolute bottom-1.5 flex items-end justify-center gap-[2px] h-2 pointer-events-none"
              aria-hidden="true"
            >
              <span className="w-[1.5px] bg-[var(--accent)] rounded-full animate-music-bar-1" />
              <span className="w-[1.5px] bg-[var(--accent)] rounded-full animate-music-bar-2" />
              <span className="w-[1.5px] bg-[var(--accent)] rounded-full animate-music-bar-3" />
            </div>
          )}
        </motion.button>

        {/* Before first interaction: Tooltip "tap anywhere to play ♪" */}
        <AnimatePresence>
          {!hasStarted && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.25 }}
              className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-[var(--surface-2)]/95 backdrop-blur-md border border-[var(--accent)]/40 text-[var(--accent)] text-[11px] font-mono whitespace-nowrap shadow-lg shadow-black/30 pointer-events-none flex items-center gap-1.5"
            >
              <span>tap anywhere to play</span>
              <span className="text-xs">♪</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Tooltip when started */}
        <AnimatePresence>
          {hasStarted && isHovered && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-[var(--surface-2)]/95 backdrop-blur-md border border-[var(--border)] text-[var(--text)] text-[11px] font-mono whitespace-nowrap shadow-md pointer-events-none"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
