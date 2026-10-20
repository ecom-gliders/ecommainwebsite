import { createHeadingId } from "./slugify-heading";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3 | 4 | 5;
}

const SKIP_HEADINGS = /^recent posts$|^conclusion:?$/i;

export function extractTableOfContents(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  const usedIds = new Map<string, number>();

  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,5})\s+(.+)$/);
    if (!match) {
      continue;
    }

    const level = match[1].length as 2 | 3 | 4 | 5;
    const text = match[2].replace(/\*\*/g, "").trim();

    if (text.length < 3 || SKIP_HEADINGS.test(text)) {
      continue;
    }

    items.push({
      id: createHeadingId(text, usedIds),
      text,
      level,
    });
  }

  return items;
}
