/**
 * Split markdown into plain segments and allowlisted visual blocks.
 * Fence languages come from content/config/blog-blocks.json.
 */
import { getFenceLanguageAlternation } from "@/lib/blog/blocks/allowlist";
import type { BlogContentSegment } from "@/lib/blog/blocks/types";

export type { BlogContentSegment } from "@/lib/blog/blocks/types";

export function splitBlogBlocks(markdown: string): BlogContentSegment[] {
  const alt = getFenceLanguageAlternation();
  if (!alt) {
    return [{ type: "markdown", content: markdown }];
  }

  const fenceRe = new RegExp("```(" + alt + ")\\r?\\n([\\s\\S]*?)```", "g");
  const directiveRe = new RegExp(
    ":::(" + alt + ")(?:\\s+([^\\n]*))?\\r?\\n([\\s\\S]*?):::",
    "g",
  );

  const normalized = markdown.replace(
    directiveRe,
    (_m, kind: string, title: string | undefined, body: string) => {
      if (
        (kind === "callout" || kind === "tip" || kind === "warning") &&
        title?.trim()
      ) {
        return `\n\n\`\`\`${kind}\nTITLE: ${title.trim()}\n${body.trim()}\n\`\`\`\n\n`;
      }
      return `\n\n\`\`\`${kind}\n${body.trim()}\n\`\`\`\n\n`;
    },
  );

  const segments: BlogContentSegment[] = [];
  let lastIndex = 0;
  fenceRe.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = fenceRe.exec(normalized)) !== null) {
    const before = normalized.slice(lastIndex, match.index);
    if (before.trim()) {
      segments.push({ type: "markdown", content: before });
    }

    segments.push({
      type: "block",
      language: match[1],
      body: match[2].trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  const rest = normalized.slice(lastIndex);
  if (rest.trim() || segments.length === 0) {
    segments.push({ type: "markdown", content: rest });
  }

  return segments;
}
