/**
 * Convert emoji-alone + heading + blurb clusters into feature-grid fences.
 * Preserves title/description wording; drops decorative emoji only.
 */
import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";
import { collapseLetterSpacedHeading } from "@/lib/blog/blocks/sanitize/plugins/collapse-letter-spaced";

const EMOJI_LINE =
  /^(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}]|[\u2600-\u27BF])+$/u;

const HEADING_RE = /^(#{2,6})\s+(.+)$/;

function isEmojiOnly(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 8) return false;
  return EMOJI_LINE.test(trimmed);
}

export const convertEmojiFeatureGrid: SanitizePlugin = (content) => {
  const lines = content.split("\n");
  const out: string[] = [];
  const transforms: { id: string; detail?: string }[] = [];
  let i = 0;

  while (i < lines.length) {
    if (!isEmojiOnly(lines[i])) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    // Collect consecutive emoji+heading+blurb cards
    const cards: Array<{ title: string; description: string }> = [];
    let j = i;

    while (j < lines.length && isEmojiOnly(lines[j])) {
      j += 1;
      while (j < lines.length && !lines[j].trim()) j += 1;

      const headingMatch = lines[j]?.match(HEADING_RE);
      if (!headingMatch) break;

      let title = collapseLetterSpacedHeading(headingMatch[2]);
      title = title.replace(/^\*\*|\*\*$/g, "").trim();
      j += 1;
      while (j < lines.length && !lines[j].trim()) j += 1;

      const descParts: string[] = [];
      while (
        j < lines.length &&
        lines[j].trim() &&
        !HEADING_RE.test(lines[j]) &&
        !isEmojiOnly(lines[j]) &&
        !lines[j].trim().startsWith("```")
      ) {
        descParts.push(lines[j].trim());
        j += 1;
      }
      while (j < lines.length && !lines[j].trim()) j += 1;

      const description = descParts.join(" ").trim();
      if (title && description.length > 10) {
        cards.push({ title, description });
      } else {
        break;
      }
    }

    if (cards.length >= 2) {
      out.push("");
      out.push("```feature-grid");
      for (const card of cards) {
        out.push(
          `${card.title.replace(/\s*\|\s*/g, " / ")} | ${card.description.replace(/\s*\|\s*/g, " / ")}`,
        );
      }
      out.push("```");
      out.push("");
      transforms.push({
        id: "featureGrid",
        detail: `emojiStack:${cards.length}`,
      });
      i = j;
      continue;
    }

    out.push(lines[i]);
    i += 1;
  }

  return {
    content: out.join("\n"),
    transforms,
  };
};
