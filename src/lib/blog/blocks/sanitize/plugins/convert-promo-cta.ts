import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

const PROMO_TITLE =
  /^(?:Stay Ahead|Ready to|Get Your Free|Book a Call|Free Account|Discover the|Take the Next|Start Growing|Grow Your|Scale Your|Unlock|Boost Your)[^\n]{0,120}$/i;

const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)\s*$/;

/**
 * Convert loose WP promo stacks (title + blurb + markdown link + optional CSS)
 * into a ```cta fence. Preserves title, blurb, label, and href.
 */
export const convertPromoCta: SanitizePlugin = (content) => {
  const lines = content.split("\n");
  const out: string[] = [];
  const transforms: { id: string; detail?: string }[] = [];
  let i = 0;
  let converted = 0;

  while (i < lines.length) {
    const title = lines[i].trim();
    if (!PROMO_TITLE.test(title) || title.startsWith("#") || title.startsWith("[")) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    let j = i + 1;
    while (j < lines.length && !lines[j].trim()) j += 1;

    const descParts: string[] = [];
    while (
      j < lines.length &&
      lines[j].trim() &&
      !LINK_RE.test(lines[j].trim()) &&
      !lines[j].trim().startsWith("#") &&
      !lines[j].includes("{")
    ) {
      descParts.push(lines[j].trim());
      j += 1;
    }
    while (j < lines.length && !lines[j].trim()) j += 1;

    const linkMatch = lines[j]?.trim().match(LINK_RE);
    if (!linkMatch) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    j += 1;
    while (j < lines.length && !lines[j].trim()) j += 1;
    // Swallow following orphan CSS line(s) for this CTA
    while (
      j < lines.length &&
      (/\{[^}]+\}/.test(lines[j]) || /a:hover|@keyframes|section\s+a/i.test(lines[j]))
    ) {
      j += 1;
      while (j < lines.length && !lines[j].trim()) j += 1;
    }

    const description = descParts.join(" ").replace(/\s*\|\s*/g, " / ");
    const label = linkMatch[1].replace(/\s*\|\s*/g, " / ");
    const href = linkMatch[2];
    const safeTitle = title.replace(/\s*\|\s*/g, " / ");

    out.push("");
    out.push("```cta");
    out.push(
      description
        ? `${safeTitle} | ${description} | ${label} | ${href}`
        : `${safeTitle} | ${label} | ${href}`,
    );
    out.push("```");
    out.push("");
    converted += 1;
    i = j;
  }

  if (converted > 0) {
    transforms.push({ id: "promoCta", detail: `${converted}` });
  }

  return { content: out.join("\n"), transforms };
};
