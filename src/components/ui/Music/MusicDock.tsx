'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useMusic } from './MusicContext';
import { SHARED_EASE } from '@/lib/animations';

interface AutoScalingTextProps {
  text: string;
}

const AutoScalingText: React.FC<AutoScalingTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);
  const [hasOverflow, setHasOverflow] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Reset temporarily to measure raw natural width
    textRef.current.style.transform = 'none';
    const cWidth = containerRef.current.clientWidth;
    const tWidth = textRef.current.scrollWidth;

    if (cWidth > 0 && tWidth > cWidth) {
      const computedScale = Math.max(0.85, cWidth / tWidth);
      setScale(computedScale);
      // If even at 85% it exceeds available width, enable soft edge fade mask
      setHasOverflow(tWidth * computedScale > cWidth);
    } else {
      setScale(1);
      setHasOverflow(false);
    }
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="relative max-w-[min(520px,80vw)] max-sm:max-w-[75vw] overflow-hidden whitespace-nowrap"
      style={{
        maskImage: hasOverflow
          ? 'linear-gradient(to right, black 85%, transparent 100%)'
          : undefined,
        WebkitMaskImage: hasOverflow
          ? 'linear-gradient(to right, black 85%, transparent 100%)'
          : undefined,
      }}
    >
      <span
        ref={textRef}
        style={{
          display: 'inline-block',
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'left center',
        }}
        className="font-sans font-medium text-[clamp(14px,1.1vw,18px)] max-sm:text-[13px] tracking-[0.01em] text-[var(--text)]/50 drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] select-none whitespace-nowrap"
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
    togglePlay,
    adjustOffset,
  } = useMusic();

  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  if (audioError) {
    return null; // Gracefully hidden if audio asset fails completely
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
          className="fixed bottom-20 left-6 z-50 px-3 py-1.5 rounded-lg bg-[var(--surface-2)]/95 border border-[var(--accent)]/40 text-[11px] font-mono text-[var(--accent)] shadow-xl flex items-center gap-3 backdrop-blur-md select-none"
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

      {/* Main Music Dock: fixed bottom-left, horizontal layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: !hasStarted ? 1 : isPlaying ? 1 : 0.7, // Dims to 0.7 when paused
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 flex items-center gap-3 select-none pointer-events-auto"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
        }}
      >
        {/* Play/Pause Button: ~34px circle, thin cyan ring, no filled background */}
        <div className="relative flex items-center shrink-0">
          {/* Pre-start gentle ripple pulse */}
          {!hasStarted && !shouldReduceMotion && (
            <span
              className="absolute -inset-1.5 rounded-full bg-[var(--accent)]/20 animate-ping pointer-events-none"
              aria-hidden="true"
            />
          )}

          {/* While playing: slow rotating glow ring */}
          {isPlaying && !shouldReduceMotion && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute -inset-1 rounded-full border border-dashed border-[var(--accent)]/30 pointer-events-none"
              aria-hidden="true"
            />
          )}

          <motion.button
            type="button"
            data-music-btn="true"
            onClick={togglePlay}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
            transition={{ duration: 0.18, ease: SHARED_EASE }}
            className={`relative w-[34px] h-[34px] rounded-full flex items-center justify-center bg-transparent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer ${
              isPlaying
                ? 'border border-[var(--accent)]/60 text-[var(--accent)] shadow-[0_0_14px_rgba(34,211,238,0.3)]'
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
                  className="w-3 h-3 fill-current"
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
                  className="w-3 h-3 fill-current translate-x-[0.5px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* 3 Tiny Equalizer Bars inside the ring while playing */}
            {isPlaying && !shouldReduceMotion && (
              <div
                className="absolute bottom-1 flex items-end justify-center gap-[1.5px] h-2 pointer-events-none"
                aria-hidden="true"
              >
                <span className="w-[1.5px] bg-[var(--accent)] rounded-full animate-music-bar-1" />
                <span className="w-[1.5px] bg-[var(--accent)] rounded-full animate-music-bar-2" />
                <span className="w-[1.5px] bg-[var(--accent)] rounded-full animate-music-bar-3" />
              </div>
            )}
          </motion.button>

          {/* Hint text before first interaction: "tap anywhere to play ♪" */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.25 }}
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 font-sans font-medium text-xs text-[var(--accent)] whitespace-nowrap pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
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
                className="absolute left-0 bottom-full mb-2 px-2 py-0.5 rounded bg-[var(--surface-2)]/90 border border-[var(--border)] text-[var(--text)] text-[11px] font-sans whitespace-nowrap shadow-md pointer-events-none"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Lyric Line: NO box, NO border, NO background, NO blur panel */}
        <div
          className="relative h-7 flex items-center min-w-0 pointer-events-none overflow-hidden"
          aria-live="off"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {isVocalsActive && activeLine && (
              <motion.div
                key={activeLine.id}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 6, filter: 'blur(4px)' }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, filter: 'blur(4px)' }
                }
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { duration: 0.25 },
                }}
                className="flex items-center min-w-0"
              >
                <AutoScalingText text={activeLine.text} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};
