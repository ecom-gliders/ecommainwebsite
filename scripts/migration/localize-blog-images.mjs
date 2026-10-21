/**
 * Download remote ecomgliders.com blog images into public/images/blog/
 * and rewrite MDX featuredImage + markdown image URLs to local paths.
 *
 * Usage: node scripts/migration/localize-blog-images.mjs
 */
import { createHash } from "crypto";
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { dirname, extname, join } from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";
import matter from "gray-matter";

const ROOT = process.cwd();
const BLOG_DIR = join(ROOT, "content/blog");
const OUT_DIR = join(ROOT, "public/images/blog");
const REPORT = join(ROOT, "docs/qa/blog-image-localization-report.json");

mkdirSync(OUT_DIR, { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function safeNameFromUrl(url) {
  try {
    const u = new URL(url);
    const base = u.pathname.split("/").filter(Boolean).pop() || "image";
    const clean = base.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 120);
    const hash = createHash("sha1").update(url).digest("hex").slice(0, 8);
    const ext = extname(clean) || ".jpg";
    const stem = clean.replace(ext, "") || "image";
    return `${stem}-${hash}${ext}`;
  } catch {
    return `image-${createHash("sha1").update(url).digest("hex").slice(0, 10)}.jpg`;
  }
}

async function download(url) {
  const fileName = safeNameFromUrl(url);
  const dest = join(OUT_DIR, fileName);
  const publicPath = `/images/blog/${fileName}`;
  if (existsSync(dest)) {
    return { ok: true, publicPath, cached: true };
  }

  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "image/*,*/*" },
    redirect: "follow",
  });
  if (!res.ok) {
    return { ok: false, status: res.status, url };
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  return { ok: true, publicPath, cached: false };
}

function collectUrls(data, content) {
  const urls = new Set();
  const feat = String(data.featuredImage || "").trim();
  if (feat.startsWith("https://ecomgliders.com") || feat.startsWith("https://www.ecomgliders.com")) {
    urls.add(feat);
  }
  for (const m of content.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)]+)\)/g)) {
    if (m[1].includes("ecomgliders.com")) urls.add(m[1]);
  }
  for (const m of content.matchAll(/src=["'](https?:\/\/[^"']+)["']/g)) {
    if (m[1].includes("ecomgliders.com")) urls.add(m[1]);
  }
  return [...urls];
}

const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
const urlMap = new Map();
const failures = [];
let rewrittenFiles = 0;
let downloaded = 0;
let cached = 0;

const allUrls = new Set();
for (const f of files) {
  const raw = readFileSync(join(BLOG_DIR, f), "utf8");
  const { data, content } = matter(raw);
  for (const u of collectUrls(data, content)) allUrls.add(u);
}

console.log(`Unique remote URLs: ${allUrls.size}`);

let i = 0;
for (const url of allUrls) {
  i += 1;
  process.stdout.write(`\r[${i}/${allUrls.size}] ${url.slice(0, 80)}…`);
  try {
    const result = await download(url);
    if (!result.ok) {
      failures.push({ url, status: result.status });
      continue;
    }
    urlMap.set(url, result.publicPath);
    if (result.cached) cached += 1;
    else downloaded += 1;
  } catch (err) {
    failures.push({ url, error: String(err?.message || err) });
  }
}
console.log("\nDownloads done. Rewriting MDX…");

for (const f of files) {
  const path = join(BLOG_DIR, f);
  let raw = readFileSync(path, "utf8");
  let changed = false;
  for (const [remote, local] of urlMap) {
    if (raw.includes(remote)) {
      raw = raw.split(remote).join(local);
      changed = true;
    }
  }
  if (changed) {
    writeFileSync(path, raw, "utf8");
    rewrittenFiles += 1;
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  postsScanned: files.length,
  uniqueUrls: allUrls.size,
  downloaded,
  cached,
  rewrittenFiles,
  failureCount: failures.length,
  failures: failures.slice(0, 50),
};
writeFileSync(REPORT, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
