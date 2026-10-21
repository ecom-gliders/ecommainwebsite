/**
 * Compare WP content.rendered vs MDX for "body" links only —
 * exclude theme chrome: categories, authors, date archives, homepage,
 * and the three related-post slugs that appear on nearly every WP post.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const posts = JSON.parse(
  fs.readFileSync(path.join(root, "backup/metadata/api/posts-all.json"), "utf8"),
);
const blogDir = path.join(root, "content/blog");
const slugs = new Set(
  fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, "")),
);

const CHROME = new Set([
  "/",
  "/blog",
  "/get-in-touch",
  "/request-a-quote",
  "/contact",
  "/about-us",
  "/services",
  "/services-2",
  "/case-studies",
  "/case-study-1",
  "/free-audit-2",
  "/full-service-amazon-agency",
  "/amazon-ppc-management-agency",
  // related-post strip that WP embeds on almost every post
  "/when-should-you-use-sponsored-display-ads",
  "/amazon-ppc-formula-that-scales-without-wasting-budget",
  "/launch-new-product-amazon-seo-2026",
]);

function pathnameOf(h) {
  let pathname = h.trim();
  try {
    if (/^https?:\/\//i.test(pathname)) pathname = new URL(pathname).pathname;
  } catch {
    /* keep */
  }
  return pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
}

function isChrome(h) {
  const p = pathnameOf(h);
  if (CHROME.has(p)) return true;
  if (p.startsWith("/category/")) return true;
  if (p.startsWith("/author/")) return true;
  if (p.startsWith("/tag/")) return true;
  if (/^\/\d{4}(\/\d{2})?(\/\d{2})?$/.test(p)) return true; // date archives
  if (p === "/_wp_link_placeholder") return true;
  if (/^https?:\/\/(www\.)?ecomgliders\.com\/?$/i.test(h.trim())) return true;
  return false;
}

function bucket(h) {
  if (!h || h.startsWith("#")) return "skip";
  if (h.startsWith("mailto:") || h.startsWith("tel:")) return "skip";
  if (h.includes("wp-content/uploads") || /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(h))
    return "skip";
  if (isChrome(h)) return "chrome";
  try {
    if (/^https?:\/\//i.test(h)) {
      const host = new URL(h).hostname.replace(/^www\./, "");
      if (host === "ecomgliders.com") return "internal-body";
      return "external";
    }
  } catch {
    return "other";
  }
  if (h.startsWith("/")) return "internal-body";
  return "other";
}

function extractWp(html) {
  return [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
}

function extractMdx(body) {
  return [
    ...[...body.matchAll(/\[([^\]]*)\]\(([^)\s]+)/g)].map((m) => m[2]),
    ...[...body.matchAll(/href=["']([^"']+)/gi)].map((m) => m[1]),
  ];
}

let wpBodyInternal = 0;
let wpBodyExternal = 0;
let wpChrome = 0;
let mdxBodyInternal = 0;
let mdxBodyExternal = 0;

const missingInternal = []; // in WP body, not in MDX for same post
const missingExternal = [];
const brokenBlogTargets = []; // internal body link whose slug is not in migrated set

for (const p of posts) {
  const html = p.content?.rendered || "";
  const wp = extractWp(html);
  const wpBodyInt = new Set();
  const wpBodyExt = new Set();
  for (const h of wp) {
    const b = bucket(h);
    if (b === "chrome") wpChrome++;
    else if (b === "internal-body") {
      wpBodyInternal++;
      wpBodyInt.add(pathnameOf(h));
    } else if (b === "external") {
      wpBodyExternal++;
      wpBodyExt.add(h.split("#")[0].replace(/\/$/, ""));
    }
  }

  const mdxFile = path.join(blogDir, `${p.slug}.mdx`);
  if (!fs.existsSync(mdxFile)) continue;
  const body = fs.readFileSync(mdxFile, "utf8").replace(/^---[\s\S]*?---\n/, "");
  const mdx = extractMdx(body);
  const mdxBodyInt = new Set();
  const mdxBodyExt = new Set();
  for (const h of mdx) {
    const b = bucket(h);
    if (b === "internal-body") {
      mdxBodyInternal++;
      mdxBodyInt.add(pathnameOf(h));
      const slug = pathnameOf(h).replace(/^\//, "");
      if (slug && !slugs.has(slug) && !pathnameOf(h).startsWith("/category")) {
        // may be service page etc — only flag if looks like a post slug candidate
        if (!pathnameOf(h).includes("/") || pathnameOf(h).split("/").length === 2) {
          if (!slugs.has(slug)) brokenBlogTargets.push({ post: p.slug, href: h, path: pathnameOf(h) });
        }
      }
    } else if (b === "external") {
      mdxBodyExternal++;
      mdxBodyExt.add(h.split("#")[0].replace(/\/$/, ""));
    }
  }

  for (const pathName of wpBodyInt) {
    if (!mdxBodyInt.has(pathName)) {
      missingInternal.push({ post: p.slug, path: pathName });
    }
  }
  for (const href of wpBodyExt) {
    const norm = [...mdxBodyExt].some(
      (m) => m.replace(/\/$/, "") === href.replace(/\/$/, "") || m.includes(href.replace(/^https?:\/\//, "")),
    );
    // simpler: check if any mdx external contains same hostname+path
    let found = false;
    try {
      const u = new URL(href.includes("://") ? href : `https://${href}`);
      for (const m of mdxBodyExt) {
        try {
          const mu = new URL(m.includes("://") ? m : `https://${m}`);
          if (mu.hostname === u.hostname && mu.pathname.replace(/\/$/, "") === u.pathname.replace(/\/$/, "")) {
            found = true;
            break;
          }
        } catch {
          /* */
        }
      }
    } catch {
      found = mdxBodyExt.has(href);
    }
    if (!found) missingExternal.push({ post: p.slug, href });
  }
}

const missingIntByPath = Object.entries(
  missingInternal.reduce((a, x) => {
    a[x.path] = (a[x.path] || 0) + 1;
    return a;
  }, {}),
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 40);

const brokenUnique = [...new Set(brokenBlogTargets.map((x) => x.path))];

const report = {
  generatedAt: new Date().toISOString(),
  definition:
    "Body links = hrefs in WP content.rendered / MDX body after excluding theme chrome (categories, authors, dates, related-post strip, common CTAs).",
  wp: {
    chromeHrefs: wpChrome,
    bodyInternalHrefs: wpBodyInternal,
    bodyExternalHrefs: wpBodyExternal,
  },
  mdx: {
    bodyInternalLinks: mdxBodyInternal,
    bodyExternalLinks: mdxBodyExternal,
  },
  gaps: {
    postsWithMissingBodyInternalPath: new Set(missingInternal.map((x) => x.post)).size,
    missingBodyInternalOccurrences: missingInternal.length,
    topMissingInternalPaths: missingIntByPath.map(([pathName, count]) => ({ path: pathName, count })),
    missingBodyExternalOccurrences: missingExternal.length,
    postsWithMissingExternal: new Set(missingExternal.map((x) => x.post)).size,
    sampleMissingExternal: missingExternal.slice(0, 25),
    mdxInternalTargetsNotInBlogSlugs: brokenUnique.slice(0, 40),
    mdxInternalTargetsNotInBlogSlugsCount: brokenUnique.length,
  },
};

fs.writeFileSync(
  path.join(root, "docs/qa/blog-body-link-gap-report.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
