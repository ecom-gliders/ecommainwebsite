import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/**
 * Single CSS rule: `.class` / `#id` with optional descendants + :/: :pseudos.
 * Example: `.bar::after { … }` / `.aam-table tbody tr:nth-child(odd) { … }`
 */
const CSS_RULE =
  /[.#][a-zA-Z_][a-zA-Z0-9_-]*(?::{1,2}[a-zA-Z0-9_-]+(?:\([^)]*\))?)*(?:\s+[.#]?[a-zA-Z0-9_-]+(?::{1,2}[a-zA-Z0-9_-]+(?:\([^)]*\))?)*)*\s*\{[^}]{6,8000}\}/g;

const MEDIA_BLOCK = /@media[^{]+\{(?:[^{}]|\{[^}]*\})*\}/g;

const GLIDER_OR_CTA =
  /\.(?:glider-btn|cta-btn)[\s\S]*?(?=\n#{1,6}\s|\n\n[A-Z*]|\n\[|$)/g;

/**
 * Strip orphan CSS rule dumps including descendants, @media, button chrome.
 * Runs AFTER visual structures have been converted to fences.
 */
export const stripOrphanCss: SanitizePlugin = (content) => {
  const transforms: { id: string; detail?: string }[] = [];
  let next = content;

  if (/\.(?:glider-btn|cta-btn)\s*\{/.test(next)) {
    next = next.replace(GLIDER_OR_CTA, "\n\n");
    transforms.push({ id: "stripGliderBtnCss" });
  }

  if (/@media\s*\(/.test(next)) {
    const before = next.length;
    next = next.replace(MEDIA_BLOCK, "\n");
    if (next.length !== before) {
      transforms.push({ id: "stripMediaCss" });
    }
  }

  CSS_RULE.lastIndex = 0;
  if (CSS_RULE.test(next)) {
    CSS_RULE.lastIndex = 0;
    const before = next.length;
    next = next.replace(CSS_RULE, "");
    if (next.length !== before) {
      transforms.push({ id: "stripOrphanCss" });
    }
  }

  // Escaped comment openers left by Turndown
  if (/\/\\\*|\/\*/.test(next)) {
    next = next.replace(/\/\\\*[\s\S]*?\*\//g, "");
    next = next.replace(/\/\*[\s\S]*?\*\//g, "");
  }

  if (/<style[\s\S]*?<\/style>/i.test(next)) {
    next = next.replace(/<style[\s\S]*?<\/style>/gi, "");
    transforms.push({ id: "stripStyleTags" });
  }

  return { content: next, transforms };
};
