'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  LyricLine,
  parseLRC,
  findActiveLyricIndex,
  LYRIC_OFFSET_MS,
  updateWordHighlights,
} from '@/lib/lyrics';

interface MusicContextType {
  isPlaying: boolean;
  hasStarted: boolean;
  audioError: boolean;
  activeLine: LyricLine | null;
  lyrics: LyricLine[];
  progressBarRef: React.RefObject<HTMLDivElement | null>;
  wordContainerRef: React.RefObject<HTMLDivElement | null>;
  togglePlay: (e?: React.MouseEvent) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

const STORAGE_KEY = 'portfolio_audio_manual_paused';
const TARGET_VOLUME = 0.6;
const FADE_DURATION_MS = 1500;
const INTERACTION_EVENTS = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'] as const;

function getStoredUserPaused(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function setStoredUserPaused(paused: boolean): void {
  try {
    if (paused) {
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Graceful fallback for privacy sandbox / restricted storage
  }
}

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const wordContainerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(-1);

  const isPlayingRef = useRef(false);
  const hasStartedRef = useRef(false);
  const userPausedRef = useRef(false);
  const wasPlayingBeforeHideRef = useRef(false);
  const ignoreNextButtonToggleRef = useRef(false);
  const listenersActiveRef = useRef(true);

  const lyricsRef = useRef<LyricLine[]>([]);
  const activeLineIndexRef = useRef<number>(-1);
  const syncRafRef = useRef<number | null>(null);
  const volumeFadeRafRef = useRef<number | null>(null);

  // Sync refs with state
  useEffect(() => {
    lyricsRef.current = lyrics;
  }, [lyrics]);

  // Smooth volume fade-in from 0 to TARGET_VOLUME over ~1.5s
  const fadeVolumeIn = useCallback((audio: HTMLAudioElement) => {
    if (volumeFadeRafRef.current) {
      cancelAnimationFrame(volumeFadeRafRef.current);
    }
    audio.volume = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / FADE_DURATION_MS);
      // Ease out cubic
      const currentVol = TARGET_VOLUME * (1 - Math.pow(1 - progress, 3));
      audio.volume = Math.min(TARGET_VOLUME, Math.max(0, currentVol));

      if (progress < 1 && isPlayingRef.current) {
        volumeFadeRafRef.current = requestAnimationFrame(step);
      } else {
        volumeFadeRafRef.current = null;
      }
    };

    volumeFadeRafRef.current = requestAnimationFrame(step);
  }, []);

  // Sync rAF loop
  const stopSyncLoop = useCallback(() => {
    if (syncRafRef.current) {
      cancelAnimationFrame(syncRafRef.current);
      syncRafRef.current = null;
    }
  }, []);

  const startSyncLoop = useCallback(() => {
    stopSyncLoop();

    const tick = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused || !isPlayingRef.current) {
        return;
      }

      const effectiveSec = audio.currentTime + LYRIC_OFFSET_MS / 1000;
      const newIndex = findActiveLyricIndex(lyricsRef.current, effectiveSec);

      if (newIndex !== activeLineIndexRef.current) {
        activeLineIndexRef.current = newIndex;
        setActiveLineIndex(newIndex);
      }

      // Update progress bar ratio directly via transform scaleX (zero React re-render overhead)
      if (newIndex >= 0 && newIndex < lyricsRef.current.length) {
        const line = lyricsRef.current[newIndex];
        const duration = Math.max(0.1, line.endTime - line.time);
        const ratio = Math.max(0, Math.min(1, (effectiveSec - line.time) / duration));

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${ratio})`;
        }

        // If enhanced word-level data exists, illuminate active words in real time
        if (line.words && line.words.length > 0 && wordContainerRef.current) {
          updateWordHighlights(wordContainerRef.current, line.words, effectiveSec);
        }
      }

      syncRafRef.current = requestAnimationFrame(tick);
    };

    syncRafRef.current = requestAnimationFrame(tick);
  }, [stopSyncLoop]);

  // Main playback initiator
  const startAudioPlayback = useCallback(
    (removeListenersFn: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (!hasStartedRef.current) {
        audio.volume = 0;
      }

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStartedRef.current = true;
            setHasStarted(true);
            isPlayingRef.current = true;
            setIsPlaying(true);
            userPausedRef.current = false;
            setStoredUserPaused(false);

            // Remove all one-time interaction listeners immediately upon successful start
            removeListenersFn();

            fadeVolumeIn(audio);
            startSyncLoop();
          })
          .catch(() => {
            // Browser autoplay rejection (NotAllowedError)
            // Listeners stay registered for the next interaction attempt
          });
      }
    },
    [fadeVolumeIn, startSyncLoop]
  );

  // Manual Toggle Handler
  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();

      // Guard against the double-handling bug when first click lands on button
      if (ignoreNextButtonToggleRef.current) {
        ignoreNextButtonToggleRef.current = false;
        return;
      }

      const audio = audioRef.current;
      if (!audio) return;

      if (!isPlayingRef.current) {
        // Play / Resume
        userPausedRef.current = false;
        setStoredUserPaused(false);
        audio.volume = TARGET_VOLUME;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              hasStartedRef.current = true;
              setHasStarted(true);
              isPlayingRef.current = true;
              setIsPlaying(true);
              startSyncLoop();
            })
            .catch(() => {});
        }
      } else {
        // Manual Pause
        userPausedRef.current = true;
        setStoredUserPaused(true);
        isPlayingRef.current = false;
        setIsPlaying(false);
        audio.pause();
        stopSyncLoop();
      }
    },
    [startSyncLoop, stopSyncLoop]
  );

  // Master setup effect
  useEffect(() => {
    // 1. Check user preference from localStorage
    const savedPaused = getStoredUserPaused();
    if (savedPaused) {
      userPausedRef.current = true;
    }

    // 2. Fetch and parse LRC lyrics (graceful fallback if 404 or fails)
    fetch('/assets/audio/lyrics.lrc')
      .then((res) => {
        if (!res.ok) throw new Error('Lyrics file not found');
        return res.text();
      })
      .then((text) => {
        const parsed = parseLRC(text);
        setLyrics(parsed);
      })
      .catch(() => {
        // Keep empty lyrics; pill remains hidden without errors
        setLyrics([]);
      });

    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.preload = 'auto';

    // 3. Remove interaction listeners helper
    listenersActiveRef.current = true;
    const removeInteractionListeners = () => {
      if (!listenersActiveRef.current) return;
      listenersActiveRef.current = false;
      INTERACTION_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, { capture: true });
        document.removeEventListener(evt, handleFirstInteraction, { capture: true });
      });
    };

    // 4. One-time first interaction capture listener
    const handleFirstInteraction = (e: Event) => {
      if (hasStartedRef.current) {
        removeInteractionListeners();
        return;
      }

      // If user had manually paused on previous visit, respect it and don't auto-start
      if (userPausedRef.current) {
        removeInteractionListeners();
        return;
      }

      // Check if clicked element is the music button
      const target = e.target as HTMLElement | null;
      const isButtonClicked = !!target?.closest('[data-music-btn="true"]');

      if (isButtonClicked) {
        ignoreNextButtonToggleRef.current = true;
      }

      startAudioPlayback(removeInteractionListeners);
    };

    // 5. Attempt immediate autoplay on page load inside try/catch
    try {
      if (!userPausedRef.current) {
        const initialPlay = audio.play();
        if (initialPlay !== undefined) {
          initialPlay
            .then(() => {
              hasStartedRef.current = true;
              setHasStarted(true);
              isPlayingRef.current = true;
              setIsPlaying(true);
              fadeVolumeIn(audio);
              startSyncLoop();
            })
            .catch(() => {
              // Browser autoplay policy rejected as expected; wait for user gesture
              attachListeners();
            });
        }
      } else {
        listenersActiveRef.current = false;
      }
    } catch {
      attachListeners();
    }

    function attachListeners() {
      if (userPausedRef.current) return;
      INTERACTION_EVENTS.forEach((evt) => {
        window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
        document.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
      });
    }

    // 6. Tab Visibility handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlayingRef.current) {
          wasPlayingBeforeHideRef.current = true;
          audio.pause();
          stopSyncLoop();
        }
      } else {
        if (wasPlayingBeforeHideRef.current && !userPausedRef.current) {
          wasPlayingBeforeHideRef.current = false;
          audio.play().then(() => {
            isPlayingRef.current = true;
            setIsPlaying(true);
            startSyncLoop();
          }).catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 7. Cleanup
    return () => {
      removeInteractionListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopSyncLoop();
      if (volumeFadeRafRef.current) {
        cancelAnimationFrame(volumeFadeRafRef.current);
      }
      if (audio) {
        audio.pause();
      }
    };
  }, [fadeVolumeIn, startAudioPlayback, startSyncLoop, stopSyncLoop]);

  const activeLine =
    activeLineIndex >= 0 && activeLineIndex < lyrics.length ? lyrics[activeLineIndex] : null;

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        hasStarted,
        audioError,
        activeLine,
        lyrics,
        progressBarRef,
        wordContainerRef,
        togglePlay,
      }}
    >
      <audio
        ref={audioRef}
        src="/assets/audio/song.mp3"
        preload="auto"
        loop
        playsInline
        style={{ display: 'none' }}
        aria-hidden="true"
        onError={() => setAudioError(true)}
      />
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
