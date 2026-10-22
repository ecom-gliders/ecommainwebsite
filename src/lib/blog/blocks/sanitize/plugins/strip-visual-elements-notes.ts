import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/**
 * Strip authoring “Visual Elements” / placeholder image notes (not reader content).
 * Preserves real External Sources and article prose.
 */
export const stripVisualElementsNotes: SanitizePlugin = (content) => {
  const next = content.replace(
    /\n\*\*Visual Elements\*\*\s*:?\s*\n(?:\s*\*\s*\*\*[^*\n]+\*\*\s*:[^\n]*\n?)+/gi,
    "\n",
  );

  if (next === content) {
    return { content, transforms: [] };
  }

  return {
    content: next,
    transforms: [{ id: "stripVisualElementsNotes" }],
  };
};
