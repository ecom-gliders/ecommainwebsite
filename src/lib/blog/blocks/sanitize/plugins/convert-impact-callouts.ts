import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/**
 * Wrap standalone “Impact on Sellers” lines in tip fences (wording unchanged).
 * Title uses the existing label; body keeps the original sentence.
 */
export const convertImpactCallouts: SanitizePlugin = (content) => {
  // Already-converted tip blocks that still embed the bold label in the body
  let next = content.replace(
    /```tip\n\*\*Impact on Sellers\*\*\s*:?\s*([^\n]+)\n```/g,
    "```tip\nTITLE: Impact on Sellers\n$1\n```",
  );

  next = next.replace(
    /^(?:\*\*Impact on Sellers\*\*\s*:?\s*(.+))$/gm,
    "\n```tip\nTITLE: Impact on Sellers\n$1\n```\n",
  );

  if (next === content) {
    return { content, transforms: [] };
  }

  return {
    content: next,
    transforms: [{ id: "impactToTipCallout" }],
  };
};
