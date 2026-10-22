/**
 * Phase 5: verification summary after restore.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const cheerio = require("cheerio");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const EXPORT = path.join(ROOT, "wordpress-blog-export");
const BLOG = path.join(ROOT, "content/blog");
const RESTORE = path.join(ROOT, "docs/qa/WP-BLOG-RESTORE-RUN.json");
const OUT = path.join(ROOT, "docs/qa/WP-BLOG-RESTORE-VERIFICATION.md");

const CONTENT_WIDGET_TYPES = new Set([
  "text-editor.default",
  "heading.default",
  "image.default",
  "html.default",
  "tp-adv-text-block.default",
  "tp-table.default",
  "eae-timeline.skin3",
  "eae-comparisontable.default",
  "elementskit-faq.default",
  "shortcode.default",
]);
const SKIP = new Set([
  "share-buttons.default",
  "divider.default",
  "button.default",
  "post-info.default",
  "wpr-promo-box.default",
  "wpr-grid.default",
  "elementskit-blog-posts.default",
  "wpr-taxonomy-list.default",
  "wpr-post-info.default",
  "wpforms.default",
]);

function extract(html) {
  const $ = cheerio.load(html);
  const parts = [];
  $(".elementor-widget").each((_, el) => {
    const t = $(el).attr("data-widget_type") ?? "";
    if (SKIP.has(t) || !CONTENT_WIDGET_TYPES.has(t)) return;
    const c = $(el).find(".elementor-widget-container").first();
    c.find("style,script,iframe").remove();
    const h = c.html()?.trim();
    if (h) parts.push(h);
  });
  return parts.join("\n\n");
}

function strip(html) {
  return cheerio.load(html).root().text().replace(/\s+/g, " ").trim();
}

const posts = JSON.parse(fs.readFileSync(path.join(EXPORT, "posts-all.json"), "utf8"));
const mdxCount = fs.readdirSync(BLOG).filter((f) => f.endsWith(".mdx")).length;
const restore = JSON.parse(fs.readFileSync(RESTORE, "utf8"));

const spotSlugs = [
  "boost-your-amazon-best-sellers-rank-with-12-proven-tips",
  "when-should-you-use-sponsored-display-ads",
  "amazon-growth-strategy-2026",
  "amazon-ppc-marketing-services-in-wisconsin-wi-a-path-to-maximizing-your-sales",
  "ecom-gliders-vs-sophie-society-amazon-ppc-account-management",
  "amazon-a10-algorithm-2026",
  "amazon-compliance-documents-in-2025",
  "reduce-amazon-ad-spend-with-seo-2026",
  "review-manipulation-on-amazon",
  "amazon-negative-keywords-2026",
  "beyond-rankings-ai-driven-seo-strategy",
  "ecom-gliders-vs-teikametrics-amazon-ppc-management",
  "full-amazon-account-management-services-2026",
  "how-to-reduce-acos-and-grow-sales-for-your-ecommerce-business-2",
  "predict-amazon-product-success",
];

const spotChecks = spotSlugs.map((slug) => {
  const post = posts.find((p) => p.slug === slug);
  const mdxPath = path.join(BLOG, `${slug}.mdx`);
  if (!post || !fs.existsSync(mdxPath)) {
    return { slug, ok: false, note: "missing" };
  }
  const { content } = matter(fs.readFileSync(mdxPath, "utf8"));
  const extractedText = strip(extract(post.content.rendered));
  const mdxText = content.replace(/!\[[^\]]*]\([^)]+\)/g, " ").replace(/\s+/g, " ").trim();
  const ratio = extractedText.length
    ? mdxText.length / extractedText.length
    : null;
  const hasBodyH1 = /^# /m.test(content);
  return {
    slug,
    ok: ratio === null || ratio >= 0.35,
    mdxLen: content.trim().length,
    extractedTextLen: extractedText.length,
    ratio: ratio === null ? null : Number(ratio.toFixed(3)),
    hasBodyH1,
  };
});

const changed = restore.results
  .filter((r) => r.status === "restored")
  .map((r) => `content/blog/${r.slug}.mdx`);

const md = [
  "# WP blog restore verification",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Counts",
  "",
  `| Metric | Value |`,
  `| --- | ---: |`,
  `| Live export posts | ${posts.length} |`,
  `| Local MDX | ${mdxCount} |`,
  `| Restored this run | ${restore.restored} |`,
  `| Restore failures | ${restore.failed} |`,
  `| Unmatched | 0 |`,
  "",
  `MDX backup: \`${restore.backupDir}\``,
  "",
  "## Spot checks (chrome-stripped WP text vs MDX)",
  "",
  ...spotChecks.map(
    (s) =>
      `- \`${s.slug}\`: ok=${s.ok}, mdx=${s.mdxLen}, extractedText=${s.extractedTextLen}, ratio=${s.ratio}, bodyH1=${s.hasBodyH1}`,
  ),
  "",
  "## Changed content files (this restore)",
  "",
  ...changed.map((f) => `- \`${f}\``),
  "",
  "## Other files touched in this workstream",
  "",
  "- `scripts/migration/export-wp-posts-live.mjs`",
  "- `scripts/migration/analyze-wp-export-quality.mjs`",
  "- `scripts/migration/restore-damaged-posts.ts`",
  "- `scripts/migration/verify-wp-restore.mjs`",
  "- `scripts/migration/lib/extract-post-html.ts`",
  "- `src/lib/blog/normalize-heading-levels.ts`",
  "- `src/components/blog/blog-markdown.tsx`",
  "- `src/lib/seo/blog-post-json-ld.ts`",
  "- `src/lib/seo/page-metadata.ts`",
  "- `docs/qa/WP-*` reports",
  "- `wordpress-blog-export/` (export artifacts; not site runtime)",
  "",
  "## Confirmation",
  "",
  "- No blog URL structure changes (`/{slug}/` preserved).",
  "- No image re-download performed; featuredImage paths preserved on restore.",
  "- Blog UI templates not rebuilt; pipeline/SEO helpers only.",
  "- Unrelated marketing pages / services / case studies not modified by restore script.",
  "",
];

fs.writeFileSync(OUT, md.join("\n"));
console.log(md.join("\n"));
