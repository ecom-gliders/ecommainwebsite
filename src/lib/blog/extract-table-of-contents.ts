import { createHeadingId } from "./slugify-heading";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3 | 4 | 5;
  /** 0 = main section, 1+ = nested sub-point */
  depth: 0 | 1 | 2;
}

const SKIP_HEADINGS = /^recent posts$|^conclusion:?$/i;
const NUMBERED = /^\d+[.)]\s+/;

/**
 * Full outline: major sections + nested numbered sub-points.
 * Skips title-duplicate intro headings only.
 */
export function extractTableOfContents(markdown: string): TocItem[] {
  const raw: Omit<TocItem, "depth">[] = [];
  const usedIds = new Map<string, number>();

  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,5})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3 | 4 | 5;
    if (level > 4) continue;

    const text = match[2]
      .replace(/\\([.])/g, "$1")
      .replace(/\*\*/g, "")
      .replace(
        /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}\u{200D}\u{20E3}]/gu,
        "",
      )
      .replace(/\s{2,}/g, " ")
      .trim();

    if (text.length < 3 || SKIP_HEADINGS.test(text)) continue;

    raw.push({
      id: createHeadingId(text, usedIds),
      text,
      level,
    });
  }

  if (raw.length === 0) return [];

  if (
    raw.length > 2 &&
    raw[0].level === 2 &&
    raw[0].text.length > 48 &&
    raw.some((item) => item.level >= 3)
  ) {
    raw.shift();
  }

  if (
    raw.length > 2 &&
    raw[0].level === 3 &&
    /updates?:?\s*$/i.test(raw[0].text) &&
    raw[0].text.length < 48
  ) {
    raw.shift();
  }

  // Depth: numbered H4s nest under the nearest prior non-numbered section
  const items: TocItem[] = raw.map((item) => {
    const isSub = NUMBERED.test(item.text) && item.level >= 4;
    return {
      ...item,
      depth: isSub ? 1 : 0,
    };
  });

  // Soft cap: keep all mains + their subs; if > 28, keep mains + first 4 subs each
  if (items.length <= 28) {
    return items;
  }

  const trimmed: TocItem[] = [];
  let subsUnderCurrent = 0;
  for (const item of items) {
    if (item.depth === 0) {
      trimmed.push(item);
      subsUnderCurrent = 0;
      continue;
    }
    if (subsUnderCurrent < 4) {
      trimmed.push(item);
      subsUnderCurrent += 1;
    }
  }
  return trimmed;
}
