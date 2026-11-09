'use client';

import { useEffect, useRef } from 'react';

const DEFAULT_VOLUME = 0.85; // A little bit higher than normal (normal ~0.5)

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element with GTA IV theme music
    const audio = new Audio('/gta_iv_theme.mp3');
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    const startAudio = () => {
      audio.play().catch(() => {});
    };

    // Attempt autoplay immediately
    audio.play().catch(() => {
      // Browser blocked unmuted autoplay policy.
      // Listen for the first user interaction anywhere on the window to start automatically!
      const onUserGesture = () => {
        startAudio();
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

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Zero visual output - plays purely in the background without any options or controls
  return null;
};
