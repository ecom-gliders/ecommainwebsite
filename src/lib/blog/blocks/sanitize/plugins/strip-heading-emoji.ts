import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

const EMOJI_IN_HEADING =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}\u{200D}\u{20E3}\u{FE0F}]/gu;

export const stripHeadingEmoji: SanitizePlugin = (content) => {
  let count = 0;
  const next = content
    .split("\n")
    .map((line) => {
      const match = line.match(/^(#{1,6}\s+)(.+)$/);
      if (!match) return line;
      const cleaned = match[2]
        .replace(EMOJI_IN_HEADING, "")
        .replace(/\s{2,}/g, " ")
        .trim();
      if (cleaned !== match[2].trim()) {
        count += 1;
        return `${match[1]}${cleaned}`;
      }
      return line;
    })
    .join("\n");

  return {
    content: next,
    transforms: count
      ? [{ id: "stripHeadingEmoji", detail: `${count}` }]
      : [],
  };
};
