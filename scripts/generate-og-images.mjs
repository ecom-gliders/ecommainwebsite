/**
 * Generate optimized OG image pairs (1200×630 + 1200×1200) and re-point seo.ogImage.
 * Spec: docs/seo/OG-IMAGE-STANDARD.md
 *
 * Usage: node scripts/generate-og-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const matter = require("gray-matter");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OG_DIR = path.join(PUBLIC, "images", "og");

const LANDSCAPE = { width: 1200, height: 630 };
const SQUARE = { width: 1200, height: 1200 };
const JPEG_QUALITY = 78;
const MAX_BYTES = 200 * 1024;

const INK = "#131311";
const LIME = "#C6FD50";

function publicUrl(...parts) {
  return "/" + ["images", "og", ...parts].join("/").replace(/\\/g, "/");
}

function absPublic(urlPath) {
  const clean = urlPath.replace(/^\//, "").replace(/\?.*$/, "");
  return path.join(PUBLIC, ...clean.split("/"));
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeJpeg(buffer, outPath) {
  await ensureDir(path.dirname(outPath));
  let quality = JPEG_QUALITY;
  let out = await sharp(buffer)
    .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer();

  while (out.length > MAX_BYTES && quality > 55) {
    quality -= 5;
    out = await sharp(buffer)
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();
  }

  await fs.writeFile(outPath, out);
  return out.length;
}

async function coverCrop(sourcePath, size) {
  return sharp(sourcePath)
    .rotate()
    .resize(size.width, size.height, {
      fit: "cover",
      position: "centre",
      withoutEnlargement: false,
    })
    .removeAlpha()
    .toBuffer();
}

async function writePair(sourcePath, outBaseName, subdir = "") {
  const dir = subdir ? path.join(OG_DIR, subdir) : OG_DIR;
  await ensureDir(dir);

  const landName = `${outBaseName}-1200x630.jpg`;
  const sqName = `${outBaseName}-1200x1200.jpg`;
  const landPath = path.join(dir, landName);
  const sqPath = path.join(dir, sqName);

  const landBuf = await coverCrop(sourcePath, LANDSCAPE);
  const sqBuf = await coverCrop(sourcePath, SQUARE);

  const landBytes = await writeJpeg(landBuf, landPath);
  const sqBytes = await writeJpeg(sqBuf, sqPath);

  const urlBase = subdir
    ? publicUrl(subdir, landName)
    : publicUrl(landName);

  return {
    landscapeUrl: urlBase,
    squareUrl: urlBase.replace("-1200x630.jpg", "-1200x1200.jpg"),
    landBytes,
    sqBytes,
  };
}

async function createBrandedDefaults() {
  const logoPath = path.join(PUBLIC, "images", "logo.png");
  let logoOverlay = null;

  try {
    const logoMeta = await sharp(logoPath).metadata();
    const targetW = 420;
    const scale = targetW / (logoMeta.width || targetW);
    const w = Math.round((logoMeta.width || targetW) * scale);
    const h = Math.round((logoMeta.height || 80) * scale);
    logoOverlay = await sharp(logoPath)
      .resize(w, h, { fit: "inside" })
      .png()
      .toBuffer();
  } catch {
    // Brand mark optional if logo missing
  }

  async function brandedCanvas(width, height) {
    const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${INK}"/>
  <rect y="${height - 8}" width="100%" height="8" fill="${LIME}"/>
  <rect x="48" y="48" width="6" height="${Math.min(120, height * 0.2)}" fill="${LIME}"/>
</svg>`);

    let canvas = sharp(svg).png();
    if (logoOverlay) {
      const meta = await sharp(logoOverlay).metadata();
      const left = 64;
      const top = Math.round((height - (meta.height || 80)) / 2);
      canvas = sharp(await canvas.toBuffer()).composite([
        { input: logoOverlay, left, top },
      ]);
    }
    return canvas.removeAlpha().toBuffer();
  }

  const landBuf = await brandedCanvas(LANDSCAPE.width, LANDSCAPE.height);
  const sqBuf = await brandedCanvas(SQUARE.width, SQUARE.height);

  await ensureDir(OG_DIR);
  const landBytes = await writeJpeg(
    landBuf,
    path.join(OG_DIR, "default-1200x630.jpg"),
  );
  const sqBytes = await writeJpeg(
    sqBuf,
    path.join(OG_DIR, "default-1200x1200.jpg"),
  );

  console.log(
    `defaults: landscape ${landBytes}B, square ${sqBytes}B`,
  );
}

function slugify(input) {
  return input
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 80);
}

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function replaceOgInJsonFile(filePath, fromTo) {
  let text = await fs.readFile(filePath, "utf8");
  let changed = false;
  for (const [from, to] of fromTo) {
    if (text.includes(`"ogImage": "${from}"`)) {
      text = text.replaceAll(`"ogImage": "${from}"`, `"ogImage": "${to}"`);
      changed = true;
    }
  }
  if (changed) {
    await fs.writeFile(filePath, text);
  }
  return changed;
}

async function collectJsonConfigs() {
  const configs = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(".json")) configs.push(full);
    }
  }
  await walk(path.join(ROOT, "content", "config"));
  return configs;
}

/** Explicit source → output mappings for core pages */
const CORE_MAP = [
  {
    id: "home",
    source: "/images/services/amazon-account-management-service.jpg",
    replace: ["/images/blog/ecomglidersbanner-1024x598-e176afa2.png"],
  },
  {
    id: "about",
    source: "/images/about/hero.png",
    replace: ["/images/about/hero.png"],
  },
  {
    id: "services-hub",
    source: "/images/services/services-hub-hero-browser.jpg",
    replace: ["/images/services/services-hub-hero-browser.jpg"],
  },
  {
    id: "free-audit",
    source: "/images/promo/free-audit-banner.png",
    replace: ["/images/promo/free-audit-banner.png"],
  },
];

async function main() {
  console.log("Generating OG images…");
  await ensureDir(OG_DIR);
  await createBrandedDefaults();

  const replacements = new Map();

  // Core pages
  for (const item of CORE_MAP) {
    const src = absPublic(item.source);
    if (!(await pathExists(src))) {
      console.warn(`skip core ${item.id}: missing ${item.source}`);
      continue;
    }
    const result = await writePair(src, item.id);
    console.log(`core ${item.id}: ${result.landscapeUrl} (${result.landBytes}B)`);
    for (const old of item.replace) {
      replacements.set(old, result.landscapeUrl);
    }
  }

  // Services: each unique ogImage in services/*.json
  const servicesDir = path.join(ROOT, "content", "config", "services");
  const serviceFiles = (await fs.readdir(servicesDir)).filter((f) =>
    f.endsWith(".json"),
  );

  for (const file of serviceFiles) {
    const full = path.join(servicesDir, file);
    const data = JSON.parse(await fs.readFile(full, "utf8"));
    const og = data?.seo?.ogImage;
    if (!og || typeof og !== "string") continue;
    if (og.startsWith("/images/og/")) {
      console.log(`service ${file}: already optimized`);
      continue;
    }
    if (replacements.has(og)) {
      data.seo.ogImage = replacements.get(og);
      await fs.writeFile(full, JSON.stringify(data, null, 2) + "\n");
      continue;
    }
    const src = absPublic(og);
    if (!(await pathExists(src))) {
      console.warn(`skip service ${file}: missing ${og}`);
      continue;
    }
    const id = slugify(path.basename(file, ".json"));
    const result = await writePair(src, id, "services");
    replacements.set(og, result.landscapeUrl);
    data.seo.ogImage = result.landscapeUrl;
    await fs.writeFile(full, JSON.stringify(data, null, 2) + "\n");
    console.log(`service ${id}: ${result.landscapeUrl} (${result.landBytes}B)`);
  }

  // Case studies index + entries (keys: index.seo, caseStudies[])
  const casesPath = path.join(ROOT, "content", "config", "case-studies.json");
  const cases = JSON.parse(await fs.readFile(casesPath, "utf8"));
  if (cases?.index?.seo?.ogImage) {
    const og = cases.index.seo.ogImage;
    if (!replacements.has(og) && !String(og).startsWith("/images/og/")) {
      const src = absPublic(og);
      if (await pathExists(src)) {
        const result = await writePair(src, "case-studies-index", "cases");
        replacements.set(og, result.landscapeUrl);
        console.log(`cases index: ${result.landscapeUrl}`);
      }
    }
    if (replacements.has(og)) cases.index.seo.ogImage = replacements.get(og);
  }
  const studyList = Array.isArray(cases.caseStudies) ? cases.caseStudies : [];
  for (const study of studyList) {
    const og = study?.seo?.ogImage || study?.featuredImage;
    if (!og) continue;
    const srcPath = study.featuredImage || og;
    if (String(study?.seo?.ogImage || "").startsWith("/images/og/")) continue;
    const src = absPublic(srcPath);
    if (!(await pathExists(src))) continue;
    const id = slugify(study.slug || srcPath);
    let landscapeUrl = replacements.get(srcPath);
    if (!landscapeUrl) {
      const result = await writePair(src, id, "cases");
      landscapeUrl = result.landscapeUrl;
      replacements.set(srcPath, landscapeUrl);
      if (og !== srcPath) replacements.set(og, landscapeUrl);
      console.log(`case ${id}: ${landscapeUrl} (${result.landBytes}B)`);
    }
    if (study.seo) study.seo.ogImage = landscapeUrl;
  }
  await fs.writeFile(casesPath, JSON.stringify(cases, null, 2) + "\n");

  // Remaining JSON configs: apply replacements for known old paths
  const configs = await collectJsonConfigs();
  const fromTo = [...replacements.entries()];
  let jsonUpdated = 0;
  for (const file of configs) {
    if (file.includes(`${path.sep}services${path.sep}`)) continue;
    if (file.endsWith("case-studies.json")) continue;
    const changed = await replaceOgInJsonFile(file, fromTo);
    if (changed) jsonUpdated += 1;
  }
  // Homepage / blog banner already in CORE_MAP replacements — ensure homepage updated
  const homePath = path.join(ROOT, "content", "config", "homepage.json");
  if (await replaceOgInJsonFile(homePath, fromTo)) jsonUpdated += 1;

  console.log(`json configs updated (non-service batch): ${jsonUpdated}`);

  // Blog MDX — generate from featuredImage, set seo.ogImage
  const blogDir = path.join(ROOT, "content", "blog");
  const blogFiles = (await fs.readdir(blogDir)).filter((f) => f.endsWith(".mdx"));
  let blogOk = 0;
  let blogSkip = 0;
  const featuredCache = new Map();

  for (const file of blogFiles) {
    const full = path.join(blogDir, file);
    const raw = await fs.readFile(full, "utf8");
    const parsed = matter(raw);
    const featured = parsed.data.featuredImage;
    if (!featured || typeof featured !== "string") {
      blogSkip += 1;
      continue;
    }

    // Already on optimized OG path
    const currentOg = parsed.data.seo?.ogImage;
    if (
      typeof currentOg === "string" &&
      currentOg.startsWith("/images/og/") &&
      currentOg.includes("-1200x630.")
    ) {
      featuredCache.set(featured, currentOg);
      blogSkip += 1;
      continue;
    }

    let landscapeUrl = featuredCache.get(featured);
    if (!landscapeUrl) {
      const src = absPublic(featured);
      if (!(await pathExists(src))) {
        blogSkip += 1;
        continue;
      }
      const cacheKey = slugify(featured);
      const existingLand = path.join(
        OG_DIR,
        "blog",
        `${cacheKey}-1200x630.jpg`,
      );
      if (await pathExists(existingLand)) {
        landscapeUrl = publicUrl("blog", `${cacheKey}-1200x630.jpg`);
      } else {
        const result = await writePair(src, cacheKey, "blog");
        landscapeUrl = result.landscapeUrl;
      }
      featuredCache.set(featured, landscapeUrl);
    }

    // Replace seo.ogImage only (handle CRLF + folded YAML)
    let next = raw.replace(
      /(^[ \t]*ogImage:[ \t]*)(?:>-[ \t]*\r?\n[ \t]+)?[^\r\n]+(\r?\n)/m,
      `$1${landscapeUrl}$2`,
    );
    // Folded ogImage spanning two lines after >-
    if (next === raw) {
      next = raw.replace(
        /(^[ \t]*ogImage:[ \t]*>-[ \t]*\r?\n)[ \t]+[^\r\n]+(\r?\n)/m,
        `$1  ${landscapeUrl}$2`,
      );
    }

    if (next !== raw) {
      await fs.writeFile(full, next);
      blogOk += 1;
    } else {
      blogSkip += 1;
    }
  }

  console.log(`blog posts updated: ${blogOk}, skipped: ${blogSkip}`);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
