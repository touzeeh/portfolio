'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMusic } from './MusicContext';

export const LyricsPill: React.FC = () => {
  const { isPlaying, hasStarted, activeLine, progressBarRef, wordContainerRef } = useMusic();
  const shouldReduceMotion = useReducedMotion();

  // Visibility conditions:
  // - Must have started playing
  // - Active line must exist and NOT be an empty instrumental break
  const isVisible = hasStarted && activeLine !== null && !activeLine.isInstrumental && activeLine.text.trim().length > 0;

  return (
    <div
      className="fixed top-[84px] sm:top-[94px] left-3 sm:left-6 z-30 pointer-events-none max-w-[min(420px,70vw)] max-sm:max-w-[85vw] select-none"
      aria-live="off"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`relative px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[var(--surface-2)]/90 backdrop-blur-md border border-[var(--accent)]/35 shadow-lg flex items-center gap-2 sm:gap-2.5 overflow-hidden transition-shadow duration-300 ${
              isPlaying && !shouldReduceMotion ? 'animate-music-glow' : 'shadow-[0_0_14px_rgba(34,211,238,0.15)]'
            }`}
          >
            {/* Left Waveform / Music Note Icon */}
            <div
              className="flex items-center gap-[2px] h-3.5 shrink-0 text-[var(--accent)]"
              aria-hidden="true"
            >
              <span
                className={`w-[2px] bg-[var(--accent)] rounded-full transition-all duration-200 ${
                  isPlaying && !shouldReduceMotion ? 'animate-music-bar-1' : 'h-2'
                }`}
              />
              <span
                className={`w-[2px] bg-[var(--accent)] rounded-full transition-all duration-200 ${
                  isPlaying && !shouldReduceMotion ? 'animate-music-bar-2' : 'h-3'
                }`}
              />
              <span
                className={`w-[2px] bg-[var(--accent)] rounded-full transition-all duration-200 ${
                  isPlaying && !shouldReduceMotion ? 'animate-music-bar-3' : 'h-1.5'
                }`}
              />
            </div>

            {/* Fixed-height container for smooth line-switch animation */}
            <div className="relative h-5 sm:h-5.5 overflow-hidden flex items-center min-w-0 flex-1">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeLine.id}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 12, filter: 'blur(4px)' }
                  }
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -12, filter: 'blur(4px)' }
                  }
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full flex items-center min-w-0 truncate leading-none"
                >
                  {/* Case 1: Enhanced word-level LRC data (<mm:ss.xx>) */}
                  {activeLine.words && activeLine.words.length > 0 ? (
                    <div
                      ref={wordContainerRef}
                      className="flex items-center flex-wrap truncate font-mono text-[11px] sm:text-xs leading-normal"
                    >
                      {activeLine.words.map((w, idx) => (
                        <span
                          key={`${activeLine.id}-w-${idx}`}
                          data-word-idx={idx}
                          className="transition-colors duration-150 text-white/40 mr-1.5"
                        >
                          {w.text}
                        </span>
                      ))}
                    </div>
                  ) : (
                    /* Case 2: Standard line-level LRC with 30-35ms word reveal stagger */
                    <div className="flex items-center flex-wrap truncate font-mono text-[11px] sm:text-xs text-white/95 leading-normal">
                      {activeLine.text.split(' ').map((word, idx) => (
                        <motion.span
                          key={`${activeLine.id}-s-${idx}`}
                          initial={
                            shouldReduceMotion
                              ? { opacity: 1 }
                              : { opacity: 0.25, filter: 'blur(2px)' }
                          }
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          transition={{
                            delay: shouldReduceMotion ? 0 : idx * 0.035,
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="inline-block mr-1"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Story-Style 2px Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden rounded-b-full">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-[var(--accent)] origin-left transform scale-x-0 will-change-transform shadow-[0_0_8px_var(--accent)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
