import { normalizeMarkdownNewlines } from "./normalize-markdown-newlines";
import { createHeadingId } from "./slugify-heading";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3 | 4 | 5;
  /** 0 = main section, 1+ = nested sub-point */
  depth: 0 | 1 | 2;
}

const SKIP_HEADINGS =
  /^recent posts$|^conclusion:?$|^introduction:?$|^final thoughts?:?$|^final perspective:?$|^for more insights\b|^related (articles|posts|resources)\b|helpful links$/i;
/** Leading outline markers like `1. ` / `2) ` (after MD escape normalization). */
const NUMBERED = /^\d+[.)]\s+/;

/**
 * Strip a leading `1.` / `2)` outline prefix from TOC label text.
 * Used when the TOC renders its own index badge so entries do not double-number.
 */
export function stripLeadingOutlineNumber(text: string): string {
  const stripped = text.replace(NUMBERED, "").trim();
  return stripped.length >= 3 ? stripped : text;
}

function cleanHeadingLabel(raw: string): string {
  return raw
    .replace(/\\([.])/g, "$1")
    .replace(/\*\*/g, "")
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}\u{200D}\u{20E3}]/gu,
      "",
    )
    .replace(/\s{2,}/g, " ")
    .replace(/:+\s*$/, "")
    .trim();
}

/**
 * Full outline: major sections + nested numbered sub-points.
 * Skips title-duplicate intro headings only.
 */
export function extractTableOfContents(markdown: string): TocItem[] {
  const raw: Omit<TocItem, "depth">[] = [];
  const usedIds = new Map<string, number>();

  for (const line of normalizeMarkdownNewlines(markdown).split("\n")) {
    const match = line.match(/^(#{2,5})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3 | 4 | 5;
    if (level > 4) continue;

    const text = cleanHeadingLabel(match[2]);

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

  // Depth: numbered H3/H4 tips nest under the nearest prior non-numbered section.
  // (Previously only H4+ nested, so numbered H3 tips became top-level and
  // double-numbered with the TOC index badge.)
  const items: TocItem[] = raw.map((item) => {
    const isSub = NUMBERED.test(item.text) && item.level >= 3;
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
