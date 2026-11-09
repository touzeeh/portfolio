'use client';

import React, { useEffect, useRef } from 'react';

const TARGET_VOLUME = 0.28; // Pleasant low background volume (audible without being loud)

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = TARGET_VOLUME;
    audio.loop = true;

    let hasStarted = false;

    // Helper to resume AudioContext (browser audio subsystem unlock)
    const unlockAudioContext = () => {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
        }
      } catch {
        // Safe fallback
      }
    };

    const tryPlay = () => {
      if (hasStarted || !audio) return;

      unlockAudioContext();
      audio.volume = TARGET_VOLUME;
      audio.muted = false;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStarted = true;
            removeUserInteractionListeners();
          })
          .catch(() => {
            // Browser autoplay policy blocked this attempt.
            // Keep listeners attached so the next click/tap will play!
          });
      }
    };

    // 1. Try immediate autoplay on page load
    tryPlay();

    // 2. User interaction events recognized by Chrome/Edge/Safari transient activation rules
    // Note: Do NOT include 'scroll' or 'mousemove' because browsers reject them as user gestures!
    const interactionEvents = ['pointerdown', 'mousedown', 'click', 'keydown', 'touchstart', 'touchend'];

    const onUserInteraction = () => {
      tryPlay();
    };

    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
      document.addEventListener(evt, onUserInteraction, { capture: true, passive: true });
    });

    const removeUserInteractionListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserInteraction, { capture: true });
        document.removeEventListener(evt, onUserInteraction, { capture: true });
      });
    };

    // If audio loops or pauses unexpectedly, ensure it resumes
    const handleEnded = () => {
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };
    audio.addEventListener('ended', handleEnded);

    return () => {
      removeUserInteractionListeners();
      if (audio) {
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
      }
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/natural.mp3"
      loop
      preload="auto"
      playsInline
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
};
