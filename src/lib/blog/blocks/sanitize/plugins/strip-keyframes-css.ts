import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/** Strip @keyframes dumps and trailing orphan animation/hover CSS. */
const KEYFRAMES =
  /@keyframes\s+[a-zA-Z0-9_-]+\s*\{(?:[^{}]|\{[^}]*\})*\}/gi;

const HOVER_RULE =
  /(?:^|\n)\s*(?:[a-z]+\s+)*[a-z]+(?::hover|:focus|:active)?\s*\{[^}]{8,2000\}\s*/gi;

export const stripKeyframesCss: SanitizePlugin = (content) => {
  const transforms: { id: string; detail?: string }[] = [];
  let next = content;

  if (/@keyframes/i.test(next)) {
    const before = next.length;
    next = next.replace(KEYFRAMES, "\n");
    if (next.length !== before) {
      transforms.push({ id: "stripKeyframes" });
    }
  }

  if (/:(?:hover)\s*\{/.test(next) || /\ba:hover\s*\{/.test(next)) {
    const before = next.length;
    next = next.replace(HOVER_RULE, "\n");
    if (next.length !== before) {
      transforms.push({ id: "stripHoverCss" });
    }
  }

  return { content: next, transforms };
};
