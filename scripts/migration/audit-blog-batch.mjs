/**
 * Audit a batch of blog MDX files for residual dirt / missing CTA patterns.
 * Usage: node scripts/migration/audit-blog-batch.mjs [--offset=0] [--limit=10]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = path.join(ROOT, "content/blog");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const offset = Number(args.offset ?? 0);
const limit = Number(args.limit ?? 10);

const files = fs.readdirSync(BLOG).filter((f) => f.endsWith(".mdx")).sort();
const batch = files.slice(offset, offset + limit);

const CHECKS = [
  { id: "orphanCss", re: /[.#][a-zA-Z_][a-zA-Z0-9_-]*[^{]*\{[^}]{6,}/ },
  { id: "keyframes", re: /@keyframes/i },
  { id: "elementHoverCss", re: /(?:^|\n)\s*(?:section\s+)?a:hover\s*\{/i },
  { id: "emoji", re: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u },
  { id: "letterSpacedH", re: /^#{2,6}\s+(?:[A-Za-z]\s+){3,}[A-Za-z]/m },
  { id: "rawHtml", re: /<\/?(?:div|span|section|iframe|style)\b/i },
  { id: "ctaLink", re: /\[[^\]]+\]\((https?:\/\/[^)]+|\/[^)]+)\)/ },
  {
    id: "promoHeadingLoose",
    re: /(?:^|\n)(?:Stay Ahead|Ready to|Book a Call|Get Your Free|Free Account)[^\n]*\n/i,
  },
];

const rows = [];
for (const file of batch) {
  const slug = file.replace(/\.mdx$/, "");
  const { content: rawContent } = matter(
    fs.readFileSync(path.join(BLOG, file), "utf8"),
  );
  // Ignore fenced blocks when scoring residual dirt
  const content = rawContent.replace(/```[\s\S]*?```/g, "\n");
  const flags = [];
  for (const check of CHECKS) {
    if (check.id === "ctaLink") {
      if (!check.re.test(rawContent)) flags.push("missingCtaOrAnyLink");
      continue;
    }
    if (check.re.test(content)) flags.push(check.id);
  }
  const links = [...rawContent.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(
    (m) => m[1],
  );
  // Also count cta fence hrefs
  const ctaHrefs = [
    ...rawContent.matchAll(/```cta\n([^\n]+)\n```/g),
  ].flatMap((m) => {
    const parts = m[1].split("|").map((p) => p.trim());
    return parts.length >= 3 ? [parts[parts.length - 1]] : [];
  });
  links.push(...ctaHrefs);
  rows.push({
    slug,
    flags,
    linkCount: links.length,
    internalLinks: links.filter((h) => /ecomgliders\.com|^\//.test(h)).length,
    externalLinks: links.filter((h) => /^https?:\/\//.test(h) && !/ecomgliders\.com/.test(h))
      .length,
  });
}

const out = {
  generatedAt: new Date().toISOString(),
  offset,
  limit,
  totalFiles: files.length,
  batch: rows,
};
const outPath = path.join(
  ROOT,
  "docs/qa",
  `BLOG-AUDIT-BATCH-${offset}-${offset + limit - 1}.json`,
);
fs.writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`);
console.log(JSON.stringify(out, null, 2));
console.log(`Wrote ${outPath}`);
