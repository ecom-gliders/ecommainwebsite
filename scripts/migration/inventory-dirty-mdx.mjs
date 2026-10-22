/**
 * Inventory MDX posts with residual HTML/CSS/grids/FAQ scripts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = path.join(ROOT, "content/blog");
const OUT = path.join(ROOT, "docs/qa/BLOG-DIRTY-MDX-INVENTORY.json");

const files = fs.readdirSync(BLOG).filter((f) => f.endsWith(".mdx"));
const rows = [];

for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG, file), "utf8");
  const { content } = matter(raw);
  const flags = [];
  if (/^# /m.test(content)) flags.push("bodyH1");
  if (/^##### |^###### /m.test(content)) flags.push("h5h6");
  if (/elementor-|vamtam-|wpr-grid|elementskit/i.test(content)) flags.push("elementor");
  if (/<style|<\/style>|\.glider-btn\s*\{|display\s*:\s*grid/i.test(content)) {
    flags.push("css");
  }
  if (/style\s*=/i.test(content)) flags.push("inlineStyle");
  if (/<\/?[a-zA-Z][^>]*>/.test(content)) flags.push("htmlTags");
  if (/<table/i.test(content)) flags.push("htmlTable");
  if (/application\/ld\+json|elementskit-faq/i.test(content)) flags.push("faqScript");
  if (/beehiiv|share-btn|Recent Posts/i.test(content)) flags.push("chrome");
  if (/<iframe/i.test(content)) flags.push("iframe");
  if (flags.length) {
    rows.push({ slug, flags, bodyLen: content.length });
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  totalMdx: files.length,
  dirtyCount: rows.length,
  byFlag: {},
};
for (const row of rows) {
  for (const f of row.flags) {
    summary.byFlag[f] = (summary.byFlag[f] || 0) + 1;
  }
}

const report = {
  ...summary,
  priority: rows
    .filter((r) =>
      r.flags.some((f) =>
        ["elementor", "css", "htmlTags", "faqScript", "chrome"].includes(f),
      ),
    )
    .sort((a, b) => b.bodyLen - a.bodyLen),
  allDirty: rows.sort((a, b) => a.slug.localeCompare(b.slug)),
};

fs.writeFileSync(OUT, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
console.log(`Wrote ${OUT}`);
