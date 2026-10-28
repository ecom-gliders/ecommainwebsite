import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/**
 * Elementor migrations repeatedly injected Prime Day / “Ultimate Guide…”
 * titles into unrelated post bodies and excerpts. Strip those headings.
 */
const POLLUTED_HEADING =
  /^#{2,4}\s+(?:Amazon Prime Day 2025:\s*)?The Ultimate Guide to Maximizing Your Sales and Amazon Account Performance\s*$/gim;

export const stripMigratedTitlePollution: SanitizePlugin = (content) => {
  if (!/Ultimate Guide to Maximizing Your Sales/i.test(content)) {
    return { content, transforms: [] };
  }

  const next = content.replace(POLLUTED_HEADING, "").replace(/\n{3,}/g, "\n\n");

  if (next === content) {
    return { content, transforms: [] };
  }

  return {
    content: next,
    transforms: [
      {
        id: "strip-migrated-title-pollution",
        detail: "Removed migrated Ultimate Guide / Prime Day title headings",
      },
    ],
  };
};
