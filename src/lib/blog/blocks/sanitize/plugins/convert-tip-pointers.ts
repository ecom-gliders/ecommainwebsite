import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/** Convert "👉 …" lines into tip callout fences (keep words). */
export const convertTipPointers: SanitizePlugin = (content) => {
  const transforms: { id: string; detail?: string }[] = [];
  let count = 0;

  const next = content.replace(
    /^[ \t]*👉[ \t]*(.+)$/gm,
    (_m, body: string) => {
      count += 1;
      return `\n\`\`\`tip\n${body.trim()}\n\`\`\`\n`;
    },
  );

  if (count > 0) {
    transforms.push({ id: "tipBox", detail: `${count}` });
  }

  return { content: next, transforms };
};
