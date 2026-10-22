import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

const EMOJI_LINE =
  /^(?:[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}]|[\u2600-\u27BF])+$/u;

/** Remove standalone decorative emoji lines left after feature-grid conversion. */
export const stripLoneEmojiLines: SanitizePlugin = (content) => {
  let count = 0;
  const next = content
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed && trimmed.length <= 8 && EMOJI_LINE.test(trimmed)) {
        count += 1;
        return false;
      }
      return true;
    })
    .join("\n");

  return {
    content: next,
    transforms: count ? [{ id: "stripLoneEmoji", detail: `${count}` }] : [],
  };
};
