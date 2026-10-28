/**
 * Extract key takeaways from existing article wording only (no invented claims).
 * Prefers Impact-on-Sellers lines (plain or tip fences), then numbered strategy
 * headings, then main section titles.
 * Kept short for the sticky rail (share stays reachable).
 */

import { normalizeMarkdownNewlines } from "@/lib/blog/normalize-markdown-newlines";
import { normalizeHeadingLevels } from "@/lib/blog/normalize-heading-levels";
import { stripLeadingOutlineNumber } from "@/lib/blog/extract-table-of-contents";

const IMPACT_BOLD = /\*\*Impact on Sellers\*\*\s*:?\s*([^\n]+)/gi;

const IMPACT_TIP_TITLE =
  /```tip\s*\nTITLE:\s*Impact on Sellers\s*\n([^\n`]+)/gi;

const SKIP_SECTION =
  /^recent posts$|^conclusion:?$|^introduction:?$|^final thoughts?:?$|^final perspective:?$|^how ecom gliders can help|^why choose|^next steps|^faq$|^for more insights\b|^related (articles|posts|resources)\b|helpful links$/i;

const MAX = 3;
const MIN_LEN = 18;
const MAX_LEN = 120;

export function extractKeyTakeaways(markdown: string): string[] {
  const source = normalizeHeadingLevels(normalizeMarkdownNewlines(markdown));
  const items: string[] = [];
  const seen = new Set<string>();

  collect(IMPACT_TIP_TITLE, source, items, seen);
  collect(IMPACT_BOLD, source, items, seen);

  if (items.length >= 2) {
    return items.slice(0, MAX);
  }

  for (const line of source.split("\n")) {
    const h = line.match(/^#{3,4}\s+\d+[.)]\s+(.+)$/);
    if (!h) continue;
    const title = clean(stripLeadingOutlineNumber(h[1].replace(/\\([.])/g, "$1")));
    if (isValid(title) && !SKIP_SECTION.test(title) && !seen.has(title.toLowerCase())) {
      seen.add(title.toLowerCase());
      items.push(shorten(title));
    }
    if (items.length >= MAX) break;
  }

  if (items.length >= 2) {
    return items.slice(0, MAX);
  }

  // Fallback: main H2 section titles already in the article.
  for (const line of source.split("\n")) {
    const h = line.match(/^##\s+(.+)$/);
    if (!h) continue;
    const title = clean(stripLeadingOutlineNumber(h[1]));
    if (
      !isValid(title) ||
      SKIP_SECTION.test(title) ||
      seen.has(title.toLowerCase())
    ) {
      continue;
    }
    seen.add(title.toLowerCase());
    items.push(shorten(title));
    if (items.length >= MAX) break;
  }

  return items.slice(0, MAX);
}

function collect(
  pattern: RegExp,
  markdown: string,
  items: string[],
  seen: Set<string>,
) {
  pattern.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(markdown)) !== null) {
    const text = shorten(clean(match[1]));
    if (isValid(text) && !seen.has(text.toLowerCase())) {
      seen.add(text.toLowerCase());
      items.push(text);
    }
  }
}

/** Truncate at a word boundary — still the article’s own wording. */
function shorten(value: string): string {
  if (value.length <= MAX_LEN) return value;
  const cut = value.slice(0, MAX_LEN);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 48 ? lastSpace : MAX_LEN).trimEnd()}…`;
}

function clean(value: string): string {
  return value
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/:+\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isValid(text: string): boolean {
  return text.length >= MIN_LEN && text.length <= MAX_LEN + 1;
}
