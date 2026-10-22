/**
 * Extract key takeaways from existing article wording only (no invented claims).
 * Prefers Impact-on-Sellers lines (plain or tip fences), then strategy headings.
 * Kept short for the sticky rail (share stays reachable).
 */

const IMPACT_BOLD =
  /\*\*Impact on Sellers\*\*\s*:?\s*([^\n]+)/gi;

const IMPACT_TIP_TITLE =
  /```tip\s*\nTITLE:\s*Impact on Sellers\s*\n([^\n`]+)/gi;

const MAX = 3;
const MIN_LEN = 36;
const MAX_LEN = 120;

export function extractKeyTakeaways(markdown: string): string[] {
  const items: string[] = [];
  const seen = new Set<string>();

  collect(IMPACT_TIP_TITLE, markdown, items, seen);
  collect(IMPACT_BOLD, markdown, items, seen);

  if (items.length >= 2) {
    return items.slice(0, MAX);
  }

  for (const line of markdown.split("\n")) {
    const h = line.match(/^#{3,4}\s+\d+[.)]\s+(.+)$/);
    if (!h) continue;
    const title = clean(h[1].replace(/\\([.])/g, "$1"));
    if (isValid(title) && !seen.has(title.toLowerCase())) {
      seen.add(title.toLowerCase());
      items.push(title);
    }
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
    .replace(/\s+/g, " ")
    .trim();
}

function isValid(text: string): boolean {
  return text.length >= MIN_LEN && text.length <= MAX_LEN + 1;
}
