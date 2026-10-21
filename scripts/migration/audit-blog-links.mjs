/**
 * Audit markdown/HTML links in content/blog/*.mdx vs WP backup.
 * Writes docs/qa/blog-link-audit-report.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const blogDir = path.join(root, "content/blog");
const apiPath = path.join(root, "backup/metadata/api/posts-all.json");
const outPath = path.join(root, "docs/qa/blog-link-audit-report.json");
const appDir = path.join(root, "src/app");

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
const slugs = new Set(files.map((f) => f.replace(/\.mdx$/, "")));

function walkRoutes(dir, base = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "api") continue;
    if (e.isDirectory()) {
      // Route groups like (marketing) do not appear in the URL
      if (e.name.startsWith("(") && e.name.endsWith(")")) {
        out.push(...walkRoutes(path.join(dir, e.name), base));
        continue;
      }
      if (e.name.startsWith("[")) continue; // dynamic [slug] handled via blog slugs
      out.push(...walkRoutes(path.join(dir, e.name), `${base}/${e.name}`));
    } else if (/^page\.(tsx|ts|jsx|js)$/.test(e.name)) {
      out.push(base || "/");
    }
  }
  return out;
}

const siteRoutes = new Set(
  walkRoutes(appDir).map((r) => r.replace(/\/$/, "") || "/"),
);

const mdLink = /\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
const htmlHref = /href=["']([^"']+)["']/gi;

const external = [];
const ecomBlogInternal = [];
const ecomNonBlog = [];
const brokenInternal = [];
const anchors = [];
const mailto = [];
const images = [];
const wpUploads = [];
const other = [];
let totalMdLinks = 0;
let totalHtml = 0;

function isImageHref(h) {
  return (
    /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(h) ||
    h.includes("/images/blog/") ||
    h.includes("/wp-content/uploads/")
  );
}

function classify(href, file) {
  const h = href.trim();
  if (!h || h.startsWith("#")) {
    anchors.push({ file, href: h });
    return;
  }
  if (h.startsWith("mailto:") || h.startsWith("tel:")) {
    mailto.push({ file, href: h });
    return;
  }
  if (isImageHref(h)) {
    images.push({ file, href: h });
    if (h.includes("/wp-content/uploads/")) wpUploads.push({ file, href: h });
    return;
  }

  try {
    let pathname = h;
    if (/^https?:\/\//i.test(h)) {
      const url = new URL(h);
      if (url.hostname.replace(/^www\./, "") === "ecomgliders.com") {
        pathname = url.pathname;
      } else {
        external.push({ file, href: h });
        return;
      }
    } else if (h.startsWith("//")) {
      external.push({ file, href: h });
      return;
    } else if (h.startsWith("/")) {
      pathname = h.split("?")[0].split("#")[0];
    } else {
      pathname = `/${h.split("?")[0].split("#")[0]}`;
    }

    pathname = pathname.replace(/\/$/, "") || "/";
    const slug = pathname.replace(/^\//, "");

    if (slugs.has(slug)) {
      ecomBlogInternal.push({ file, href: h, slug });
      return;
    }
    if (siteRoutes.has(pathname)) {
      ecomNonBlog.push({ file, href: h, path: pathname });
      return;
    }
    brokenInternal.push({ file, href: h, path: pathname });
  } catch (e) {
    other.push({ file, href: h, err: String(e) });
  }
}

for (const f of files) {
  const text = fs.readFileSync(path.join(blogDir, f), "utf8");
  const body = text.replace(/^---[\s\S]*?---\n/, "");
  let m;
  mdLink.lastIndex = 0;
  while ((m = mdLink.exec(body))) {
    totalMdLinks++;
    classify(m[2], f);
  }
  htmlHref.lastIndex = 0;
  while ((m = htmlHref.exec(body))) {
    totalHtml++;
    classify(m[1], f);
  }
}

let wpLinkStats = null;
if (fs.existsSync(apiPath)) {
  const posts = JSON.parse(fs.readFileSync(apiPath, "utf8"));
  let wpHrefs = 0;
  let wpInternal = 0;
  let wpExternal = 0;
  const hrefRe = /href=["']([^"']+)["']/gi;
  for (const p of posts) {
    const html = p.content?.rendered || "";
    let hm;
    hrefRe.lastIndex = 0;
    while ((hm = hrefRe.exec(html))) {
      const href = hm[1];
      if (isImageHref(href)) continue;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
        continue;
      wpHrefs++;
      try {
        if (/^https?:\/\//i.test(href)) {
          const u = new URL(href);
          if (u.hostname.replace(/^www\./, "") === "ecomgliders.com") wpInternal++;
          else wpExternal++;
        } else if (href.startsWith("/")) wpInternal++;
        else wpExternal++;
      } catch {
        wpExternal++;
      }
    }
  }
  wpLinkStats = { posts: posts.length, wpHrefs, wpInternal, wpExternal };
}

const uniq = (arr) => [...new Set(arr.map((x) => x.href))];

const mdxInternalTotal = ecomBlogInternal.length + ecomNonBlog.length + brokenInternal.length;
const mdxExternalTotal = external.length;

const report = {
  generatedAt: new Date().toISOString(),
  postsScanned: files.length,
  markdownLinks: totalMdLinks,
  htmlHrefsInMdx: totalHtml,
  mdx: {
    externalTotal: mdxExternalTotal,
    externalUnique: uniq(external).length,
    internalBlogTotal: ecomBlogInternal.length,
    internalBlogUnique: uniq(ecomBlogInternal).length,
    internalKnownSitePages: ecomNonBlog.length,
    internalKnownSiteUnique: uniq(ecomNonBlog).length,
    unresolvedInternalTotal: brokenInternal.length,
    unresolvedInternalUnique: uniq(brokenInternal).length,
    anchors: anchors.length,
    mailto: mailto.length,
    imageRefs: images.length,
    remainingWpUploadHrefRefs: wpUploads.length,
  },
  wpSource: wpLinkStats,
  comparison: wpLinkStats
    ? {
        note: "WP counts are hrefs in content.rendered (images/mailto/# excluded). MDX may use markdown links after HTML→MD conversion.",
        wpInternal: wpLinkStats.wpInternal,
        mdxInternalResolvedOrUnresolved: mdxInternalTotal,
        wpExternal: wpLinkStats.wpExternal,
        mdxExternal: mdxExternalTotal,
        internalDelta: mdxInternalTotal - wpLinkStats.wpInternal,
        externalDelta: mdxExternalTotal - wpLinkStats.wpExternal,
      }
    : null,
  samples: {
    unresolvedInternal: uniq(brokenInternal).slice(0, 40),
    unresolvedByPath: Object.entries(
      brokenInternal.reduce((acc, x) => {
        acc[x.path] = (acc[x.path] || 0) + 1;
        return acc;
      }, {}),
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([pathName, count]) => ({ path: pathName, count })),
    external: uniq(external).slice(0, 20),
    internalBlog: uniq(ecomBlogInternal).slice(0, 15),
    sitePages: uniq(ecomNonBlog).slice(0, 15),
  },
};

fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
