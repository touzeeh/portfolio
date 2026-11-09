'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SHARED_EASE } from '@/lib/animations';

const DEFAULT_VOLUME = 0.85; // A little bit higher than normal (normal ~0.5)

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Initialize audio element with GTA IV theme music
    const audio = new Audio('/gta_iv_theme.mp3');
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    const attemptAutoplay = () => {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without user gesture.
          // Listen for the first user interaction to start immediately!
          setIsPlaying(false);
          const onUserGesture = () => {
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {});
            // Remove listeners once triggered
            window.removeEventListener('click', onUserGesture);
            window.removeEventListener('pointerdown', onUserGesture);
            window.removeEventListener('keydown', onUserGesture);
            window.removeEventListener('scroll', onUserGesture);
            window.removeEventListener('touchstart', onUserGesture);
          };

          window.addEventListener('click', onUserGesture, { once: true });
          window.addEventListener('pointerdown', onUserGesture, { once: true });
          window.addEventListener('keydown', onUserGesture, { once: true });
          window.addEventListener('scroll', onUserGesture, { once: true });
          window.addEventListener('touchstart', onUserGesture, { once: true });
        });
    };

    attemptAutoplay();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: SHARED_EASE }}
      className="fixed bottom-6 left-6 z-40 select-none"
      aria-label="Background Soundtrack Player"
    >
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.2, ease: SHARED_EASE }}
        className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-400 shadow-xl shadow-cyan-950/40 backdrop-blur-xl group transition-colors"
      >
        {/* Equalizer Waveform Animation */}
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-end gap-[3px] h-5 w-6 cursor-pointer focus:outline-none"
          title={isPlaying ? 'Pause GTA IV Theme' : 'Play GTA IV Theme'}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          <motion.span
            animate={
              isPlaying && !shouldReduceMotion
                ? { height: [4, 18, 8, 20, 6, 16, 4] }
                : { height: 4 }
            }
            transition={{
              repeat: Infinity,
              duration: 0.85,
              ease: 'easeInOut',
            }}
            className="w-1 bg-cyan-400 rounded-full"
          />
          <motion.span
            animate={
              isPlaying && !shouldReduceMotion
                ? { height: [12, 6, 20, 8, 22, 10, 12] }
                : { height: 6 }
            }
            transition={{
              repeat: Infinity,
              duration: 0.75,
              ease: 'easeInOut',
              delay: 0.1,
            }}
            className="w-1 bg-violet-400 rounded-full"
          />
          <motion.span
            animate={
              isPlaying && !shouldReduceMotion
                ? { height: [6, 22, 10, 16, 8, 20, 6] }
                : { height: 8 }
            }
            transition={{
              repeat: Infinity,
              duration: 0.9,
              ease: 'easeInOut',
              delay: 0.2,
            }}
            className="w-1 bg-cyan-300 rounded-full"
          />
          <motion.span
            animate={
              isPlaying && !shouldReduceMotion
                ? { height: [18, 8, 22, 6, 16, 10, 18] }
                : { height: 5 }
            }
            transition={{
              repeat: Infinity,
              duration: 0.8,
              ease: 'easeInOut',
              delay: 0.15,
            }}
            className="w-1 bg-amber-400 rounded-full"
          />
        </button>

        {/* Track Details */}
        <div className="flex flex-col cursor-pointer" onClick={togglePlay}>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              GTA IV Theme
            </span>
            <span className="relative flex h-1.5 w-1.5">
              {isPlaying && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                  isPlaying ? 'bg-cyan-400' : 'bg-slate-500'
                }`}
              />
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {isPlaying ? 'Soviet Connection • Vol: 85%' : 'Click to Resume'}
          </span>
        </div>

        {/* Play/Pause Toggle Pill */}
        <button
          type="button"
          onClick={togglePlay}
          className="ml-1 w-7 h-7 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400/60 text-cyan-400 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-sm"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>
      </motion.div>
    </motion.aside>
  );
};
