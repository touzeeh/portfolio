/**
 * Robust LRC Parser and Binary Search Synchronization Engine
 *
 * Synchronization Formula:
 *   activeTimeMs = audio.currentTime * 1000 + LYRIC_OFFSET_MS + LYRIC_LEAD_MS;
 *
 * - LYRIC_LEAD_MS (default: 120ms):
 *   Gives a slight perceptual lead so the text crossfade animation (~450ms)
 *   completes exactly as the vocal syllable begins, ensuring the user reads the line
 *   in sync with the singing.
 *
 * - LYRIC_OFFSET_MS (default: 0ms):
 *   Manual calibration offset.
 *   Positive values (e.g. +200ms) make lyrics appear EARLIER.
 *   Negative values (e.g. -200ms) make lyrics appear LATER.
 *   Can also be tuned live in-browser using ?debug=1 and keys [ and ].
 */

export interface LyricLine {
  id: number;
  timeMs: number; // Start time in milliseconds
  endTimeMs: number; // Start of next line or estimated end
  text: string;
  isInstrumental: boolean;
}

export const DEFAULT_LYRIC_LEAD_MS = 120;
export const DEFAULT_LYRIC_OFFSET_MS = 0;

/**
 * Parses fractional seconds safely without centisecond / millisecond confusion.
 * E.g.:
 *  "34"  -> 0.34s (340ms)
 *  "340" -> 0.34s (340ms)
 *  "5"   -> 0.5s  (500ms)
 */
export function parseSecondsWithFraction(secStr: string, fractionStr?: string): number {
  const sec = parseInt(secStr, 10) || 0;
  if (!fractionStr) return sec;
  const fraction = parseFloat(`0.${fractionStr}`) || 0;
  return sec + fraction;
}

/**
 * Parses an LRC string into a sorted array of LyricLine objects.
 * Handles:
 * - UTF-8 BOM
 * - CRLF and LF
 * - Minutes > 59 or 3-digit minutes ([120:05.20])
 * - Multiple timestamps per line ([00:10.00][00:20.00]Chorus)
 * - [offset:+/-ms] tag
 * - Instrumental empty lines
 * - Metadata skipping
 */
export function parseLRC(lrcText: string): LyricLine[] {
  if (!lrcText || typeof lrcText !== 'string') return [];

  // Strip BOM and clean CRLF
  const cleanContent = lrcText.replace(/^\uFEFF/, '');
  const rawLines = cleanContent.split(/\r?\n/);

  let fileOffsetMs = 0;
  const parsedItems: Array<{ timeMs: number; text: string; isInstrumental: boolean }> = [];

  // Matches timestamps: [mm:ss.xx] or [m:ss.xxx] with unlimited minute digits
  const timeRegex = /\[(\d+):(\d{2})(?:\.(\d+))?\]/g;
  // Metadata check: e.g. [ti:Song], [ar:Artist], [offset:+100]
  const offsetTagRegex = /^\[offset:\s*([+-]?\d+)\s*\]/i;
  const metaRegex = /^\[[a-zA-Z]+:[^\]]*\]/;

  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    // Check for [offset:+/-ms]
    const offsetMatch = offsetTagRegex.exec(trimmed);
    if (offsetMatch) {
      fileOffsetMs = parseInt(offsetMatch[1], 10) || 0;
      continue;
    }

    // Ignore non-timestamp metadata
    if (metaRegex.test(trimmed) && !timeRegex.test(trimmed)) {
      continue;
    }

    timeRegex.lastIndex = 0;
    const timestampsMs: number[] = [];
    let match: RegExpExecArray | null;
    let lastMatchEnd = 0;

    while ((match = timeRegex.exec(trimmed)) !== null) {
      const minutes = parseInt(match[1], 10) || 0;
      const secondsWithFraction = parseSecondsWithFraction(match[2], match[3]);
      const totalMs = Math.round((minutes * 60 + secondsWithFraction) * 1000);
      timestampsMs.push(totalMs);
      lastMatchEnd = timeRegex.lastIndex;
    }

    if (timestampsMs.length === 0) continue;

    // Everything following timestamps is the line text
    const textContent = trimmed.slice(lastMatchEnd).trim();
    const isInstrumental = textContent.length === 0;

    for (const tMs of timestampsMs) {
      parsedItems.push({
        timeMs: tMs,
        text: textContent,
        isInstrumental,
      });
    }
  }

  if (parsedItems.length === 0) {
    return [];
  }

  // Apply file offset and sort ascending
  parsedItems.sort((a, b) => a.timeMs - b.timeMs);

  // Validate timing sanity: last timestamp shouldn't exceed 30 minutes
  const lastTimeMs = parsedItems[parsedItems.length - 1].timeMs;
  if (lastTimeMs > 30 * 60 * 1000) {
    console.warn('[LRC Parser] Timestamp exceeds reasonable song length (>30min). Skipping invalid lyrics.');
    return [];
  }

  return parsedItems.map((item, index) => {
    const nextItem = parsedItems[index + 1];
    // Default duration to next line, or +4 seconds for the final line
    const endTimeMs = nextItem ? nextItem.timeMs : item.timeMs + 4000;
    return {
      id: index,
      timeMs: Math.max(0, item.timeMs + fileOffsetMs),
      endTimeMs: Math.max(0, endTimeMs + fileOffsetMs),
      text: item.text,
      isInstrumental: item.isInstrumental,
    };
  });
}

/**
 * Fast binary search to find the active lyric line index.
 * Returns the index of the latest line with line.timeMs <= activeTimeMs.
 * Returns -1 if before the first lyric line or if lyrics list is empty.
 */
export function findActiveLyricIndex(
  lines: LyricLine[],
  activeTimeMs: number
): number {
  if (!lines || lines.length === 0 || activeTimeMs < lines[0].timeMs) {
    return -1;
  }

  let low = 0;
  let high = lines.length - 1;
  let result = 0;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (lines[mid].timeMs <= activeTimeMs) {
      result = mid;
      low = mid + 1; // Seek later timestamp that is still <= activeTimeMs
    } else {
      high = mid - 1;
    }
  }

  return result;
}
