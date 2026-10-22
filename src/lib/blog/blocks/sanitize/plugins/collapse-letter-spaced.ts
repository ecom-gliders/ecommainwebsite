import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/**
 * "R e t a r g e t V i s i t o r" → "Retarget Visitor"
 * Detects headings where most tokens are single letters.
 */
export function collapseLetterSpacedHeading(text: string): string {
  const bold = /^\*\*(.+)\*\*$/.exec(text.trim());
  const bare = (bold ? bold[1] : text).trim();
  const tokens = bare.split(/\s+/).filter(Boolean);

  if (tokens.length < 4) return text;
  const singleLetterCount = tokens.filter((t) => /^[A-Za-z]$/.test(t)).length;
  if (singleLetterCount < tokens.length * 0.75) return text;

  const joined = tokens.join("");
  const withWords = joined.replace(/([a-z])([A-Z])/g, "$1 $2");
  return bold ? `**${withWords}**` : withWords;
}

export const collapseLetterSpacedHeadings: SanitizePlugin = (content) => {
  const transforms: { id: string; detail?: string }[] = [];
  let count = 0;

  const next = content
    .split("\n")
    .map((line) => {
      const match = line.match(/^(#{2,6}\s+)(.+)$/);
      if (!match) return line;
      const collapsed = collapseLetterSpacedHeading(match[2]);
      if (collapsed !== match[2]) {
        count += 1;
        return `${match[1]}${collapsed}`;
      }
      return line;
    })
    .join("\n");

  if (count > 0) {
    transforms.push({ id: "collapseLetterSpaced", detail: `${count}` });
  }

  return { content: next, transforms };
};
