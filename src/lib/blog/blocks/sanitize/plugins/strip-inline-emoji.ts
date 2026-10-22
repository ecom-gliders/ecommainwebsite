import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

const EMOJI =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}\u{200D}\u{20E3}\uFE0F]/gu;

/**
 * Strip decorative emoji from link labels and leading line markers.
 * Keeps wording; Lucide icons are used in the UI instead.
 */
export const stripInlineEmoji: SanitizePlugin = (content) => {
  let count = 0;

  let next = content.replace(
    /\[([^\]]*)]\(([^)]+)\)/g,
    (_m, label: string, href: string) => {
      const cleaned = label.replace(EMOJI, "").replace(/\s{2,}/g, " ").trim();
      if (cleaned !== label.trim()) count += 1;
      return `[${cleaned || label.trim()}](${href})`;
    },
  );

  next = next
    .split("\n")
    .map((line) => {
      // Leading emoji before bold/text (not inside code fences)
      if (line.trimStart().startsWith("```")) return line;
      const cleaned = line
        .replace(
          /^(\s*(?:[-*+]\s+|#{1,6}\s+|\d+[.)]\s+)?)(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}]+\s*)+/u,
          "$1",
        )
        .replace(
          /^(\s*)(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]+\s*)+(\*\*|__)/u,
          "$1$2",
        );
      if (cleaned !== line) count += 1;
      return cleaned;
    })
    .join("\n");

  // Trailing sentence emoji
  next = next.replace(
    /([.!?])\s*[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]+\s*$/gmu,
    "$1",
  );

  return {
    content: next,
    transforms: count ? [{ id: "stripInlineEmoji", detail: `${count}` }] : [],
  };
};
