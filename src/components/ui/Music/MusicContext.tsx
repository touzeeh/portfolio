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
  DEFAULT_LYRIC_LEAD_MS,
  DEFAULT_LYRIC_OFFSET_MS,
  validateLyricsTiming,
} from '@/lib/lyrics';

interface MusicContextType {
  isPlaying: boolean;
  hasStarted: boolean;
  audioError: boolean;
  activeLine: LyricLine | null;
  activeLineIndex: number;
  lyrics: LyricLine[];
  currentTime: number;
  lyricOffsetMs: number;
  isDebug: boolean;
  togglePlay: (e?: React.MouseEvent) => void;
  adjustOffset: (deltaMs: number) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

const STORAGE_MANUAL_PAUSE_KEY = 'portfolio_audio_manual_paused';
const STORAGE_OFFSET_KEY = 'portfolio_lyric_offset';
const TARGET_VOLUME = 0.6;
const FADE_DURATION_MS = 1500;
const INTERACTION_EVENTS = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'] as const;

function getStoredUserPaused(): boolean {
  try {
    return localStorage.getItem(STORAGE_MANUAL_PAUSE_KEY) === 'true';
  } catch {
    return false;
  }
}

function setStoredUserPaused(paused: boolean): void {
  try {
    if (paused) {
      localStorage.setItem(STORAGE_MANUAL_PAUSE_KEY, 'true');
    } else {
      localStorage.removeItem(STORAGE_MANUAL_PAUSE_KEY);
    }
  } catch {
    // Restricted storage fallback
  }
}

function getStoredOffset(): number {
  try {
    const val = localStorage.getItem(STORAGE_OFFSET_KEY);
    return val !== null ? parseInt(val, 10) || DEFAULT_LYRIC_OFFSET_MS : DEFAULT_LYRIC_OFFSET_MS;
  } catch {
    return DEFAULT_LYRIC_OFFSET_MS;
  }
}

export const MusicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [lyricOffsetMs, setLyricOffsetMs] = useState(getStoredOffset);
  const [isDebug] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('debug') === '1' || window.location.hash.includes('debug');
  });

  const isPlayingRef = useRef(false);
  const hasStartedRef = useRef(false);
  const userPausedRef = useRef(false);
  const wasPlayingBeforeHideRef = useRef(false);
  const ignoreNextButtonToggleRef = useRef(false);
  const listenersActiveRef = useRef(true);

  const lyricsRef = useRef<LyricLine[]>([]);
  const activeLineIndexRef = useRef<number>(-1);
  const lyricOffsetMsRef = useRef<number>(getStoredOffset());
  const syncRafRef = useRef<number | null>(null);
  const volumeFadeRafRef = useRef<number | null>(null);

  // Sync refs with state
  useEffect(() => {
    lyricsRef.current = lyrics;
  }, [lyrics]);

  useEffect(() => {
    lyricOffsetMsRef.current = lyricOffsetMs;
  }, [lyricOffsetMs]);

  // Calibration helper
  const adjustOffset = useCallback((deltaMs: number) => {
    setLyricOffsetMs((prev) => {
      const next = prev + deltaMs;
      lyricOffsetMsRef.current = next;
      try {
        localStorage.setItem(STORAGE_OFFSET_KEY, String(next));
      } catch {}
      console.log(`[Music Sync Calibration] Current LYRIC_OFFSET_MS: ${next}ms`);
      return next;
    });
  }, []);

  // Smooth volume fade from 0 to TARGET_VOLUME (0.6) over ~1.5s
  const fadeVolumeIn = useCallback((audio: HTMLAudioElement) => {
    if (volumeFadeRafRef.current) {
      cancelAnimationFrame(volumeFadeRafRef.current);
    }
    audio.volume = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / FADE_DURATION_MS);
      // Natural cubic ease-out
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

  // Dedicated single-source synchronization tick
  const syncCurrentLyric = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Formula: activeTimeMs = audio.currentTime * 1000 + LYRIC_OFFSET_MS + LYRIC_LEAD_MS
    const activeTimeMs = audio.currentTime * 1000 + lyricOffsetMsRef.current + DEFAULT_LYRIC_LEAD_MS;
    const newIndex = findActiveLyricIndex(lyricsRef.current, activeTimeMs);

    if (newIndex !== activeLineIndexRef.current) {
      activeLineIndexRef.current = newIndex;
      setActiveLineIndex(newIndex);
    }
  }, []);

  // Stop sync rAF loop
  const stopSyncLoop = useCallback(() => {
    if (syncRafRef.current) {
      cancelAnimationFrame(syncRafRef.current);
      syncRafRef.current = null;
    }
  }, []);

  // Start continuous rAF sync loop
  const startSyncLoop = useCallback(() => {
    stopSyncLoop();

    const tick = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused || !isPlayingRef.current) {
        return;
      }

      const activeTimeMs = audio.currentTime * 1000 + lyricOffsetMsRef.current + DEFAULT_LYRIC_LEAD_MS;
      const newIndex = findActiveLyricIndex(lyricsRef.current, activeTimeMs);

      if (newIndex !== activeLineIndexRef.current) {
        activeLineIndexRef.current = newIndex;
        setActiveLineIndex(newIndex);
      }

      setCurrentTime(audio.currentTime);
      syncRafRef.current = requestAnimationFrame(tick);
    };

    syncRafRef.current = requestAnimationFrame(tick);
  }, [stopSyncLoop]);

  // Audio start trigger
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

            // Detach all window/document one-time interaction listeners immediately
            removeListenersFn();

            fadeVolumeIn(audio);
            syncCurrentLyric();
            startSyncLoop();
          })
          .catch(() => {
            // Browser autoplay rejection (expected NotAllowedError)
            // Listeners remain attached for the subsequent gesture
          });
      }
    },
    [fadeVolumeIn, startSyncLoop, syncCurrentLyric]
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
        // User wants to Play / Resume
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
              syncCurrentLyric();
              startSyncLoop();
            })
            .catch(() => {});
        }
      } else {
        // User explicitly Paused
        userPausedRef.current = true;
        setStoredUserPaused(true);
        isPlayingRef.current = false;
        setIsPlaying(false);
        audio.pause();
        stopSyncLoop();
        // Immediately lock onto exact paused currentTime
        syncCurrentLyric();
      }
    },
    [startSyncLoop, stopSyncLoop, syncCurrentLyric]
  );

  // Master Setup Effect
  useEffect(() => {
    // 1. Check saved manual pause preference
    if (getStoredUserPaused()) {
      userPausedRef.current = true;
    }

    // 2. Fetch and parse lyrics.lrc
    fetch('/assets/audio/lyrics.lrc')
      .then((res) => {
        if (!res.ok) throw new Error('Lyrics file not found');
        return res.text();
      })
      .then((text) => {
        const parsed = parseLRC(text);
        validateLyricsTiming(parsed, audioRef.current?.duration);
        setLyrics(parsed);
      })
      .catch((err) => {
        console.warn('[Music System] lyrics.lrc missing or unavailable. Floating lyrics disabled gracefully.', err);
        setLyrics([]);
      });

    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.preload = 'auto';

    // 5. Setup immediate event listeners on audio for seamless resync
    const handleSeekedOrTimeUpdate = () => {
      syncCurrentLyric();
    };
    const handleLoadedMetadata = () => {
      validateLyricsTiming(lyricsRef.current, audio.duration);
    };
    audio.addEventListener('seeked', handleSeekedOrTimeUpdate);
    audio.addEventListener('seeking', handleSeekedOrTimeUpdate);
    audio.addEventListener('timeupdate', handleSeekedOrTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // 6. Interaction capture listeners
    listenersActiveRef.current = true;
    const removeInteractionListeners = () => {
      if (!listenersActiveRef.current) return;
      listenersActiveRef.current = false;
      INTERACTION_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, { capture: true });
        document.removeEventListener(evt, handleFirstInteraction, { capture: true });
      });
    };

    const handleFirstInteraction = (e: Event) => {
      if (hasStartedRef.current) {
        removeInteractionListeners();
        return;
      }

      if (userPausedRef.current) {
        removeInteractionListeners();
        return;
      }

      const target = e.target as HTMLElement | null;
      const isButtonClicked = !!target?.closest('[data-music-btn="true"]');

      if (isButtonClicked) {
        ignoreNextButtonToggleRef.current = true;
      }

      startAudioPlayback(removeInteractionListeners);
    };

    // 7. Initial Autoplay Attempt
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
              syncCurrentLyric();
              startSyncLoop();
            })
            .catch(() => {
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

    // 8. Tab Visibility Handling
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
            syncCurrentLyric();
            startSyncLoop();
          }).catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 9. Hotkeys for Live Calibration (?debug=1)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const step = e.shiftKey ? 250 : 50;
      if (e.key === '[') {
        e.preventDefault();
        adjustOffset(-step);
      } else if (e.key === ']') {
        e.preventDefault();
        adjustOffset(step);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      removeInteractionListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyDown);
      stopSyncLoop();
      if (audio) {
        audio.removeEventListener('seeked', handleSeekedOrTimeUpdate);
        audio.removeEventListener('seeking', handleSeekedOrTimeUpdate);
        audio.removeEventListener('timeupdate', handleSeekedOrTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.pause();
      }
      if (volumeFadeRafRef.current) {
        cancelAnimationFrame(volumeFadeRafRef.current);
      }
    };
  }, [adjustOffset, fadeVolumeIn, startAudioPlayback, startSyncLoop, stopSyncLoop, syncCurrentLyric]);

  const activeLine =
    activeLineIndex >= 0 && activeLineIndex < lyrics.length ? lyrics[activeLineIndex] : null;

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        hasStarted,
        audioError,
        activeLine,
        activeLineIndex,
        lyrics,
        currentTime,
        lyricOffsetMs,
        isDebug,
        togglePlay,
        adjustOffset,
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
        onError={() => {
          console.warn('[Music System] song.mp3 failed to load. Music system gracefully disabled.');
          setAudioError(true);
        }}
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
