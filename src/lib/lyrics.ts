/**
 * LRC parser and binary search synchronization engine
 * Handles standard LRC, enhanced word-level LRC, instrumental breaks, and fine-tuning offset.
 */

export interface LyricWord {
  text: string;
  time: number; // in seconds
}

export interface LyricLine {
  id: number;
  time: number; // in seconds (start time)
  endTime: number; // in seconds (start time of next line or estimated +4s)
  text: string;
  isInstrumental: boolean;
  words?: LyricWord[]; // if word-level timestamps present (<mm:ss.xx>)
}

/**
 * Global timing offset in milliseconds:
 * - Positive nudges lyrics EARLIER (e.g. +200ms appears 0.2s sooner)
 * - Negative delays lyrics (e.g. -200ms appears 0.2s later)
 */
export const LYRIC_OFFSET_MS = 0;

/**
 * Parses timestamp string [mm:ss.xx] or <mm:ss.xx> into fractional seconds
 */
export function parseTimestamp(minStr: string, secStr: string, msStr?: string): number {
  const min = parseInt(minStr, 10) || 0;
  const sec = parseInt(secStr, 10) || 0;
  let fraction = 0;
  if (msStr) {
    if (msStr.length === 1) {
      fraction = parseInt(msStr, 10) / 10;
    } else if (msStr.length === 2) {
      fraction = parseInt(msStr, 10) / 100;
    } else {
      fraction = parseInt(msStr, 10) / 1000;
    }
  }
  return min * 60 + sec + fraction;
}

/**
 * Parses standard and enhanced LRC text into sorted LyricLine array
 */
export function parseLRC(lrcText: string): LyricLine[] {
  if (!lrcText || typeof lrcText !== 'string') return [];

  const rawLines = lrcText.split(/\r?\n/);
  const parsedItems: Array<{
    time: number;
    text: string;
    words?: LyricWord[];
    isInstrumental: boolean;
  }> = [];

  const lineTimeRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
  const metaRegex = /^\[[a-zA-Z]+:[^\]]*\]/;

  for (const rawLine of rawLines) {
    const trimmed = rawLine.trim();
    if (!trimmed || metaRegex.test(trimmed)) continue;

    const timestamps: number[] = [];
    let match: RegExpExecArray | null;
    lineTimeRegex.lastIndex = 0;
    let lastMatchEnd = 0;

    while ((match = lineTimeRegex.exec(trimmed)) !== null) {
      timestamps.push(parseTimestamp(match[1], match[2], match[3]));
      lastMatchEnd = lineTimeRegex.lastIndex;
    }

    if (timestamps.length === 0) continue;

    const content = trimmed.slice(lastMatchEnd).trim();
    const isInstrumental = content.length === 0;

    let words: LyricWord[] | undefined = undefined;

    // Check for enhanced word-level tags: e.g. <00:08.40>Will <00:08.70>you
    if (!isInstrumental && /<\d{1,2}:\d{2}/.test(content)) {
      const extractedWords: LyricWord[] = [];
      const parts = content.split(/(<\d{1,2}:\d{2}(?:\.\d{1,3})?>)/).filter(Boolean);
      let currentWordTime = timestamps[0];

      for (const part of parts) {
        const p = part.trim();
        if (!p) continue;

        const tagMatch = /<(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?>/.exec(p);
        if (tagMatch) {
          currentWordTime = parseTimestamp(tagMatch[1], tagMatch[2], tagMatch[3]);
        } else {
          extractedWords.push({
            text: p,
            time: currentWordTime,
          });
        }
      }

      if (extractedWords.length > 0) {
        words = extractedWords;
      }
    }

    const cleanText = content.replace(/<[^>]+>/g, '').trim();

    for (const time of timestamps) {
      parsedItems.push({
        time,
        text: cleanText,
        words,
        isInstrumental,
      });
    }
  }

  parsedItems.sort((a, b) => a.time - b.time);

  return parsedItems.map((item, index) => {
    const nextItem = parsedItems[index + 1];
    const endTime = nextItem ? nextItem.time : item.time + 4.0;
    return {
      id: index,
      time: item.time,
      endTime,
      text: item.text,
      words: item.words,
      isInstrumental: item.isInstrumental,
    };
  });
}

/**
 * Fast binary search to find the active lyric index for given time + offset
 * Returns -1 if current time is before the first lyric or if lyrics list is empty
 */
export function findActiveLyricIndex(
  lines: LyricLine[],
  currentTime: number,
  offsetMs: number = LYRIC_OFFSET_MS
): number {
  if (!lines || lines.length === 0) return -1;

  const effectiveTime = currentTime + offsetMs / 1000;
  if (effectiveTime < lines[0].time) return -1;

  let low = 0;
  let high = lines.length - 1;
  let activeIndex = 0;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (lines[mid].time <= effectiveTime) {
      activeIndex = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return activeIndex;
}

/**
 * Updates DOM word highlight classes without re-rendering React components
 */
export function updateWordHighlights(
  container: HTMLDivElement,
  words: LyricWord[],
  effectiveSec: number
): void {
  const children = container.children;
  for (let i = 0; i < children.length && i < words.length; i++) {
    const el = children[i] as HTMLElement;
    const wordTime = words[i].time;
    const nextWordTime = words[i + 1] ? words[i + 1].time : Infinity;

    if (effectiveSec >= wordTime) {
      if (effectiveSec < nextWordTime) {
        // Current singing word: glowing cyan accent
        el.className =
          'transition-all duration-150 text-[var(--accent)] font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]';
      } else {
        // Past words in current line: crisp white
        el.className = 'transition-all duration-150 text-white/95 font-medium';
      }
    } else {
      // Upcoming words: dimmed
      el.className = 'transition-all duration-150 text-white/40';
    }
  }
}

