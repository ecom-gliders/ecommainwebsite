import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const posts = JSON.parse(
  fs.readFileSync(path.join(root, "backup/metadata/api/posts-all.json"), "utf8"),
);

const hrefRe = /href=["']([^"']+)["']/gi;

function bucketHref(h) {
  if (!h || h.startsWith("#")) return "anchor";
  if (h.startsWith("mailto:") || h.startsWith("tel:")) return "mailto";
  if (h.includes("wp-content/uploads") || /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(h))
    return "image";
  if (/ecomgliders\.com/i.test(h) || h.startsWith("/")) return "internal";
  if (/^https?:/i.test(h) || h.startsWith("//")) return "external";
  return "other";
}

const scored = posts.map((p) => {
  const html = p.content?.rendered || "";
  const hrefs = [...html.matchAll(hrefRe)].map((m) => m[1]);
  const buckets = {};
  for (const h of hrefs) {
    const k = bucketHref(h);
    buckets[k] = (buckets[k] || 0) + 1;
  }
  return { slug: p.slug, total: hrefs.length, buckets, hrefs };
}).sort((a, b) => b.total - a.total);

console.log("WP top5", scored.slice(0, 5).map((x) => ({ slug: x.slug, total: x.total, buckets: x.buckets })));
console.log(
  "WP avg total",
  (scored.reduce((s, x) => s + x.total, 0) / scored.length).toFixed(1),
);
console.log(
  "WP avg internal",
  (
    scored.reduce((s, x) => s + (x.buckets.internal || 0), 0) / scored.length
  ).toFixed(1),
);

const top = scored[0];
const internals = top.hrefs.filter((h) => bucketHref(h) === "internal");
console.log("\nTop post", top.slug);
console.log("internal sample (30):", internals.slice(0, 30));

// Frequency of internal path patterns across all WP
const pathCounts = {};
for (const p of scored) {
  for (const h of p.hrefs) {
    if (bucketHref(h) !== "internal") continue;
    let pathname = h;
    try {
      if (/^https?:/i.test(h)) pathname = new URL(h).pathname;
    } catch {
      /* keep */
    }
    pathname = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
    pathCounts[pathname] = (pathCounts[pathname] || 0) + 1;
  }
}
console.log(
  "\nTop WP internal paths:",
  Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25),
);

// Compare top slug MDX
const mdxPath = path.join(root, "content/blog", `${top.slug}.mdx`);
if (fs.existsSync(mdxPath)) {
  const body = fs.readFileSync(mdxPath, "utf8").replace(/^---[\s\S]*?---\n/, "");
  const md = [...body.matchAll(/\[([^\]]*)\]\(([^)\s]+)/g)].map((m) => m[2]);
  const html = [...body.matchAll(/href=["']([^"']+)/gi)].map((m) => m[1]);
  const all = [...md, ...html];
  console.log("\nMDX link count", all.length);
  console.log("MDX sample", all.slice(0, 30));
}

// Per-post: how many WP internal CTA-like paths appear in MDX
const ctaPaths = new Set([
  "/request-a-quote",
  "/contact",
  "/get-in-touch",
  "/free-audit-2",
  "/services",
  "/case-studies",
  "/about-us",
  "/blog",
]);

let postsMissingAllCtas = 0;
let postsWithSomeCta = 0;
let wpInternalInBody = 0;
let mdxInternalInBody = 0;

for (const p of posts) {
  const html = p.content?.rendered || "";
  const wpHrefs = [...html.matchAll(hrefRe)].map((m) => m[1]);
  const wpInternal = wpHrefs.filter((h) => bucketHref(h) === "internal");
  wpInternalInBody += wpInternal.length;

  const mdxFile = path.join(root, "content/blog", `${p.slug}.mdx`);
  if (!fs.existsSync(mdxFile)) continue;
  const body = fs.readFileSync(mdxFile, "utf8").replace(/^---[\s\S]*?---\n/, "");
  const mdxLinks = [
    ...[...body.matchAll(/\[([^\]]*)\]\(([^)\s]+)/g)].map((m) => m[2]),
    ...[...body.matchAll(/href=["']([^"']+)/gi)].map((m) => m[1]),
  ].filter((h) => bucketHref(h) === "internal");
  mdxInternalInBody += mdxLinks.length;

  const hasCta = mdxLinks.some((h) => {
    let pathname = h;
    try {
      if (/^https?:/i.test(h)) pathname = new URL(h).pathname;
    } catch {
      /* */
    }
    pathname = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
    return ctaPaths.has(pathname);
  });
  if (hasCta) postsWithSomeCta++;
  else postsMissingAllCtas++;
}

console.log("\nTotals WP internal hrefs", wpInternalInBody);
console.log("Totals MDX internal links", mdxInternalInBody);
console.log("Posts with at least one CTA-like internal link in MDX", postsWithSomeCta);
console.log("Posts with zero CTA-like internal links in MDX", postsMissingAllCtas);
