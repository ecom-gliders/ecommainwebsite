/**
 * Phase 1B + Phase 2: breakage catalog, extraction quality, MDX mapping/damage score.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import matter from "gray-matter";

const require = createRequire(import.meta.url);
// Use cheerio CJS from node_modules for widget extraction (mirror extract-post-html.ts)
const cheerio = require("cheerio");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const EXPORT = path.join(ROOT, "wordpress-blog-export");
const POSTS_ALL = path.join(EXPORT, "posts-all.json");
const BLOG_DIR = path.join(ROOT, "content/blog");
const QA = path.join(ROOT, "docs/qa");

const CONTENT_WIDGET_TYPES = new Set([
  "text-editor.default",
  "heading.default",
  "image.default",
  "html.default",
]);
const SKIP_WIDGET_TYPES = new Set([
  "share-buttons.default",
  "divider.default",
  "button.default",
  "post-info.default",
  "wpr-promo-box.default",
]);
const STOP_WIDGET_TYPES = new Set([
  "wpr-grid.default",
  "elementskit-blog-posts.default",
  "wpr-taxonomy-list.default",
  "wpr-post-info.default",
]);

function isSocialShareBlock(html) {
  const normalized = html.toLowerCase();
  return (
    normalized.includes("contact us") &&
    (normalized.includes("facebook") ||
      normalized.includes("linkedin") ||
      normalized.includes("whatsapp"))
  );
}

function extractPostBodyHtml(elementorHtml) {
  const $ = cheerio.load(elementorHtml);
  const fragments = [];
  $(".elementor-widget").each((_, element) => {
    const widgetType = $(element).attr("data-widget_type") ?? "";
    if (STOP_WIDGET_TYPES.has(widgetType)) return false;
    if (SKIP_WIDGET_TYPES.has(widgetType) || !CONTENT_WIDGET_TYPES.has(widgetType)) {
      return;
    }
    const container = $(element).find(".elementor-widget-container").first();
    if (!container.length) return;
    const html = container.html()?.trim();
    if (!html) return;
    if (isSocialShareBlock(html)) return;
    fragments.push(html);
  });
  return fragments.join("\n\n");
}

function stripHtml(html) {
  return cheerio.load(html).root().text().replace(/\s+/g, " ").trim();
}

function countTags(html, tag) {
  const re = new RegExp(`<${tag}\\b`, "gi");
  return (html.match(re) || []).length;
}

function mdxBodyLength(slug) {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  return { bodyLen: content.trim().length, data, content: content.trim() };
}

function pathFromLink(link) {
  try {
    return new URL(link).pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

function main() {
  const posts = JSON.parse(fs.readFileSync(POSTS_ALL, "utf8"));
  const mdxSlugs = new Set(
    fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, "")),
  );

  const breakage = {
    withStyle: 0,
    withIframe: 0,
    withElementorWidget: 0,
    withShareChrome: 0,
    headingCounts: { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 },
    letterSpacedHeading: 0,
  };

  const qualityRows = [];
  const mapping = {
    matched_ok: [],
    matched_damaged: [],
    wp_only: [],
    mdx_only: [],
    url_mismatch: [],
    seo_gap: [],
  };

  const widgetTypeCounts = {};

  for (const post of posts) {
    const html = post.content?.rendered ?? "";
    if (/<style\b/i.test(html)) breakage.withStyle += 1;
    if (/<iframe\b/i.test(html)) breakage.withIframe += 1;
    if (/elementor-widget/i.test(html)) breakage.withElementorWidget += 1;
    if (/share-buttons|Contact us/i.test(html)) breakage.withShareChrome += 1;
    for (const tag of ["h1", "h2", "h3", "h4", "h5", "h6"]) {
      breakage.headingCounts[tag] += countTags(html, tag);
    }
    if (/>(?:[A-Za-z]\s+){3,}[A-Za-z]</.test(html)) breakage.letterSpacedHeading += 1;

    const $ = cheerio.load(html);
    $(".elementor-widget").each((_, el) => {
      const t = $(el).attr("data-widget_type") ?? "(none)";
      widgetTypeCounts[t] = (widgetTypeCounts[t] || 0) + 1;
    });

    const extracted = extractPostBodyHtml(html);
    const extractedText = stripHtml(extracted);
    const renderedLen = html.length;
    const extractedLen = extracted.length;
    const extractedTextLen = extractedText.length;
    const mdx = mdxBodyLength(post.slug);

    const ratioExtracted =
      renderedLen > 0 ? extractedLen / renderedLen : 0;
    const ratioMdx =
      extractedTextLen > 0 && mdx ? mdx.bodyLen / extractedTextLen : null;

    qualityRows.push({
      slug: post.slug,
      renderedLen,
      extractedLen,
      extractedTextLen,
      mdxBodyLen: mdx?.bodyLen ?? null,
      ratioExtracted: Number(ratioExtracted.toFixed(3)),
      ratioMdxVsExtractedText:
        ratioMdx === null ? null : Number(ratioMdx.toFixed(3)),
      hasMdx: Boolean(mdx),
    });

    // Mapping
    if (!mdx) {
      mapping.wp_only.push(post.slug);
      continue;
    }

    const expectedPath = `/${post.slug}`;
    const actualPath = pathFromLink(post.link);
    if (actualPath && actualPath !== expectedPath) {
      mapping.url_mismatch.push({
        slug: post.slug,
        link: post.link,
        expectedPath,
        actualPath,
      });
    }

    const yoast = post.yoast_head_json ?? {};
    const seo = mdx.data.seo ?? {};
    const seoGaps = [];
    if (yoast.title && seo.metaTitle && yoast.title.trim() !== String(seo.metaTitle).trim()) {
      seoGaps.push("metaTitle");
    }
    if (
      yoast.canonical &&
      seo.canonical &&
      yoast.canonical.replace(/\/$/, "") !== String(seo.canonical).replace(/\/$/, "")
    ) {
      seoGaps.push("canonical");
    }
    if (seoGaps.length) {
      mapping.seo_gap.push({ slug: post.slug, fields: seoGaps });
    }

    const bodyH1 = /^# /m.test(mdx.content);
    const shortBody = mdx.bodyLen < 2500;
    const truncated =
      extractedTextLen > 4000 && mdx.bodyLen < extractedTextLen * 0.45;
    const weakExtract = renderedLen > 20000 && ratioExtracted < 0.08;
    const wpModified = post.modified ? new Date(post.modified).getTime() : 0;
    const mdxUpdated = mdx.data.updatedAt
      ? new Date(mdx.data.updatedAt).getTime()
      : 0;
    const stale =
      wpModified && mdxUpdated && wpModified - mdxUpdated > 7 * 24 * 3600 * 1000;

    const reasons = [];
    if (shortBody) reasons.push("short_body");
    if (truncated) reasons.push("mdx_much_shorter_than_extracted");
    if (weakExtract) reasons.push("weak_extract_vs_rendered");
    if (bodyH1) reasons.push("body_h1");
    if (stale) reasons.push("wp_newer_than_mdx");

    // Damaged if truncation/short/weak extract; body_h1 alone is soften-fix not full restore
    const needsRestore =
      shortBody || truncated || weakExtract || (stale && (shortBody || truncated));

    if (needsRestore) {
      mapping.matched_damaged.push({
        slug: post.slug,
        reasons,
        mdxBodyLen: mdx.bodyLen,
        extractedTextLen,
        renderedLen,
      });
    } else {
      mapping.matched_ok.push({
        slug: post.slug,
        notes: reasons,
        mdxBodyLen: mdx.bodyLen,
      });
    }
  }

  for (const slug of mdxSlugs) {
    if (!posts.some((p) => p.slug === slug)) mapping.mdx_only.push(slug);
  }

  // Priority: worst ratioMdx
  const restorePriority = [...qualityRows]
    .filter((r) => r.hasMdx && r.extractedTextLen > 0)
    .sort((a, b) => (a.ratioMdxVsExtractedText ?? 99) - (b.ratioMdxVsExtractedText ?? 99))
    .slice(0, 40);

  const extractionQuality = {
    generatedAt: new Date().toISOString(),
    postCount: posts.length,
    breakage,
    topWidgetTypes: Object.entries(widgetTypeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)
      .map(([type, count]) => ({ type, count })),
    restorePriority,
    summary: {
      matched_ok: mapping.matched_ok.length,
      matched_damaged: mapping.matched_damaged.length,
      wp_only: mapping.wp_only.length,
      mdx_only: mapping.mdx_only.length,
      url_mismatch: mapping.url_mismatch.length,
      seo_gap: mapping.seo_gap.length,
    },
    rows: qualityRows,
  };

  fs.mkdirSync(QA, { recursive: true });
  fs.writeFileSync(
    path.join(QA, "WP-EXTRACTION-QUALITY.json"),
    `${JSON.stringify(extractionQuality, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(QA, "WP-BLOG-MAPPING-REPORT.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), ...mapping, summary: extractionQuality.summary }, null, 2)}\n`,
  );

  const catalogMd = [
    "# WP breakage catalog",
    "",
    `Generated: ${extractionQuality.generatedAt}`,
    `Posts: ${posts.length}`,
    "",
    "## Corpus signals (content.rendered)",
    "",
    `| Signal | Count |`,
    `| --- | ---: |`,
    `| Contains \`<style\` | ${breakage.withStyle} |`,
    `| Contains \`<iframe\` | ${breakage.withIframe} |`,
    `| Contains elementor-widget | ${breakage.withElementorWidget} |`,
    `| Share / Contact chrome | ${breakage.withShareChrome} |`,
    `| Letter-spaced heading pattern | ${breakage.letterSpacedHeading} |`,
    "",
    "### Heading tag counts (raw HTML)",
    "",
    ...Object.entries(breakage.headingCounts).map(([k, v]) => `- \`${k}\`: ${v}`),
    "",
    "## Top Elementor widget types",
    "",
    ...extractionQuality.topWidgetTypes
      .slice(0, 20)
      .map((w) => `- \`${w.type}\`: ${w.count}`),
    "",
    "## Extractor risk",
    "",
    "Current allowlist: text-editor, heading, image, html. Stop widgets: wpr-grid, elementskit-blog-posts, taxonomy/post-info.",
    "",
    `Matched damaged (restore candidates): **${mapping.matched_damaged.length}**`,
    `Matched OK: **${mapping.matched_ok.length}**`,
    "",
    "### Worst MDX vs extracted text ratios (top 15)",
    "",
    ...restorePriority.slice(0, 15).map(
      (r) =>
        `- \`${r.slug}\`: mdx=${r.mdxBodyLen}, extractedText=${r.extractedTextLen}, ratio=${r.ratioMdxVsExtractedText}, rendered=${r.renderedLen}`,
    ),
    "",
  ].join("\n");

  fs.writeFileSync(path.join(EXPORT, "breakage-catalog.md"), catalogMd);

  const mappingMd = [
    "# WP ↔ MDX mapping report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    `| Bucket | Count |`,
    `| --- | ---: |`,
    `| matched_ok | ${mapping.matched_ok.length} |`,
    `| matched_damaged | ${mapping.matched_damaged.length} |`,
    `| wp_only | ${mapping.wp_only.length} |`,
    `| mdx_only | ${mapping.mdx_only.length} |`,
    `| url_mismatch | ${mapping.url_mismatch.length} |`,
    `| seo_gap | ${mapping.seo_gap.length} |`,
    "",
    "## Matched damaged (restore list)",
    "",
    ...mapping.matched_damaged.map(
      (d) =>
        `- \`${d.slug}\` — ${d.reasons.join(", ")} (mdx=${d.mdxBodyLen}, extractedText=${d.extractedTextLen})`,
    ),
    "",
    "## WP only",
    "",
    mapping.wp_only.length
      ? mapping.wp_only.map((s) => `- \`${s}\``).join("\n")
      : "_None_",
    "",
    "## MDX only",
    "",
    mapping.mdx_only.length
      ? mapping.mdx_only.map((s) => `- \`${s}\``).join("\n")
      : "_None_",
    "",
    "## URL mismatches",
    "",
    mapping.url_mismatch.length
      ? mapping.url_mismatch
          .map((u) => `- \`${u.slug}\`: ${u.actualPath} (expected ${u.expectedPath})`)
          .join("\n")
      : "_None_",
    "",
    "## SEO gaps (title/canonical differ from Yoast)",
    "",
    `Count: ${mapping.seo_gap.length} (see JSON for full list)`,
    "",
    "_Gate: review this report before MDX overwrites. Automated restore proceeds for matched_damaged only._",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(QA, "WP-BLOG-MAPPING-REPORT.md"), mappingMd);

  console.log(JSON.stringify(extractionQuality.summary, null, 2));
  console.log(`Damaged: ${mapping.matched_damaged.length}`);
  console.log(`Wrote ${path.join(EXPORT, "breakage-catalog.md")}`);
  console.log(`Wrote ${path.join(QA, "WP-BLOG-MAPPING-REPORT.md")}`);
}

main();
