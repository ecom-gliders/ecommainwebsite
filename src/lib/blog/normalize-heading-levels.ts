import { normalizeMarkdownNewlines } from "@/lib/blog/normalize-markdown-newlines";

/**
 * Remaps migrated WordPress heading depths so content under the page H1
 * starts at H2 and never skips levels (WCAG 2.4.10 / Lighthouse heading-order).
 */
export function normalizeHeadingLevels(content: string): string {
  // Page template already renders a single H1 from frontmatter — demote body H1s first.
  const withoutBodyH1 = normalizeMarkdownNewlines(content)
    .split("\n")
    .map((line) => {
      const match = line.match(/^#(\s+.*)$/);
      return match ? `##${match[1]}` : line;
    })
    .join("\n");

  const lines = withoutBodyH1.split("\n");
  const headingLevels: number[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+/);
    if (match) {
      headingLevels.push(match[1].length);
    }
  }

  if (headingLevels.length === 0) {
    return withoutBodyH1;
  }

  const uniqueLevels = [...new Set(headingLevels)].sort((a, b) => a - b);
  const levelMap = new Map(
    uniqueLevels.map((level, index) => [level, Math.min(6, index + 2)]),
  );

  return lines
    .map((line) => {
      const match = line.match(/^(#{1,6})(\s+.*)$/);
      if (!match) {
        return line;
      }

      const sourceLevel = match[1].length;
      const mappedLevel = levelMap.get(sourceLevel) ?? 2;
      return `${"#".repeat(mappedLevel)}${match[2]}`;
    })
    .join("\n");
}
