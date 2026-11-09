'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMusic } from './MusicContext';
import { SHARED_EASE } from '@/lib/animations';

interface LyricLineDisplayProps {
  text: string;
  isMobileStrip?: boolean;
}

const LyricLineDisplay: React.FC<LyricLineDisplayProps> = ({ text, isMobileStrip = false }) => {
  return (
    <div
      className={`relative min-w-0 overflow-hidden whitespace-nowrap ${
        isMobileStrip ? 'max-w-[80vw]' : 'w-full'
      }`}
      style={{
        maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
      }}
    >
      <span
        className={`font-sans font-medium tracking-[0.01em] text-[var(--text)]/50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] select-none whitespace-nowrap block truncate ${
          isMobileStrip ? 'text-[12px]' : 'text-[13px]'
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export const MusicDock: React.FC = () => {
  const {
    isPlaying,
    hasStarted,
    audioError,
    activeLine,
    activeLineIndex,
    currentTime,
    lyricOffsetMs,
    isDebug,
    audioLevel,
    togglePlay,
    adjustOffset,
  } = useMusic();

  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (audioError) {
    return null;
  }

  const isVocalsActive =
    hasStarted &&
    activeLine !== null &&
    !activeLine.isInstrumental &&
    activeLine.text.trim().length > 0;

  return (
    <>
      {/* Live Calibration Debug HUD (?debug=1 in URL) */}
      {isDebug && (
        <aside
          aria-label="Audio Calibration HUD"
          className="fixed top-18 left-4 sm:left-6 z-[60] px-3 py-1.5 rounded-lg bg-[var(--surface-2)]/95 border border-[var(--accent)]/40 text-[11px] font-mono text-[var(--accent)] shadow-2xl flex items-center gap-3 backdrop-blur-md select-none"
        >
          <span>
            {currentTime.toFixed(2)}s | Line #{activeLineIndex >= 0 ? activeLineIndex : '-'} | Offset:{' '}
            <strong className="text-white">{lyricOffsetMs}ms</strong>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => adjustOffset(-50)}
              className="px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--text)] hover:text-[var(--accent)] border border-[var(--border)]"
              title="Hotkey: ["
            >
              -50ms [
            </button>
            <button
              type="button"
              onClick={() => adjustOffset(50)}
              className="px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--text)] hover:text-[var(--accent)] border border-[var(--border)]"
              title="Hotkey: ]"
            >
              +50ms ]
            </button>
          </div>
        </aside>
      )}

      {/* Main Music Dock: Left slot of Header grid */}
      <div className="flex items-center gap-2.5 min-w-0 max-w-full select-none">
        {/* 28px Play/Pause Button: thin cyan ring, no filled background */}
        <div className="relative flex items-center shrink-0">
          {/* Pre-start ripple pulse ring */}
          {mounted && !hasStarted && !shouldReduceMotion && (
            <span
              className="absolute -inset-1 rounded-full bg-[var(--accent)]/25 animate-ping pointer-events-none"
              aria-hidden="true"
            />
          )}

          {/* Dynamic Audio-Reactive Pulsing Glow Ring (Web Audio AnalyserNode) */}
          {mounted && isPlaying && !shouldReduceMotion && audioLevel > 0.05 && (
            <motion.div
              animate={{
                scale: 1 + audioLevel * 0.45,
                opacity: 0.35 + audioLevel * 0.55,
              }}
              transition={{ duration: 0.08, ease: 'linear' }}
              className="absolute -inset-1 rounded-full border border-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.7)] pointer-events-none"
              aria-hidden="true"
            />
          )}

          {/* While playing: very slow rotating glow ring */}
          {mounted && isPlaying && !shouldReduceMotion && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
              className="absolute -inset-0.5 rounded-full border border-dashed border-[var(--accent)]/30 pointer-events-none"
              aria-hidden="true"
            />
          )}

          <motion.button
            type="button"
            data-music-btn="true"
            data-cursor-hover="true"
            onClick={togglePlay}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className={`relative w-7 h-7 rounded-full flex items-center justify-center bg-transparent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
              isPlaying
                ? 'border border-[var(--accent)]/60 text-[var(--accent)] shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                : 'border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/50 opacity-60'
            }`}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            aria-pressed={isPlaying}
          >
            {/* Morphing Play/Pause Icon (~250ms) */}
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
                  className="w-2.5 h-2.5 fill-current"
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
                  className="w-2.5 h-2.5 fill-current translate-x-[0.5px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* 3 tiny equalizer bars inside ring while playing */}
            {mounted && isPlaying && !shouldReduceMotion && (
              <div
                className="absolute bottom-0.5 flex items-end justify-center gap-[1px] h-1.5 pointer-events-none"
                aria-hidden="true"
              >
                <span className="w-[1.2px] bg-[var(--accent)] rounded-full animate-music-bar-1" />
                <span className="w-[1.2px] bg-[var(--accent)] rounded-full animate-music-bar-2" />
                <span className="w-[1.2px] bg-[var(--accent)] rounded-full animate-music-bar-3" />
              </div>
            )}
          </motion.button>

          {/* Hint text before music starts: "tap anywhere to play ♪" */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.25 }}
                className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 font-sans font-medium text-xs text-[var(--accent)] whitespace-nowrap pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              >
                tap anywhere to play ♪
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover Tooltip when started */}
          <AnimatePresence>
            {hasStarted && isHovered && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 px-2 py-0.5 rounded bg-[var(--surface-2)]/95 border border-[var(--border)] text-[var(--text)] text-[11px] font-sans whitespace-nowrap shadow-md pointer-events-none z-50"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Inline Lyric Line (Shown on viewports >= 1100px) */}
        <div
          className="hidden min-[1100px]:flex relative h-6 items-center min-w-0 flex-1 overflow-hidden pointer-events-none"
          aria-live="off"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isVocalsActive && activeLine && (
              <motion.div
                key={activeLine.id}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 6, filter: 'blur(3px)' }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, filter: 'blur(3px)' }
                }
                transition={{
                  duration: 0.35,
                  ease: 'easeInOut',
                  opacity: { duration: 0.25 },
                }}
                className="flex items-center min-w-0 w-full"
              >
                <LyricLineDisplay text={activeLine.text} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive Sub-Header Lyric Strip (Shown below 1100px, left-aligned right under header) */}
      <div
        className="block min-[1100px]:hidden fixed top-[60px] sm:top-[68px] left-4 sm:left-6 z-40 pointer-events-none select-none max-w-[80vw]"
        aria-live="off"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isVocalsActive && activeLine && (
            <motion.div
              key={activeLine.id}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 4, filter: 'blur(3px)' }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, filter: 'blur(3px)' }
              }
              transition={{
                duration: 0.35,
                ease: 'easeInOut',
                opacity: { duration: 0.25 },
              }}
              className="flex items-center min-w-0"
            >
              <LyricLineDisplay text={activeLine.text} isMobileStrip />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
