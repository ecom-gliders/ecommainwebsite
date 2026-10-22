/**
 * Phase 1A: Paginate live WP REST and write wordpress-blog-export/.
 * Resume-safe: skips posts/{slug}.json that already exist unless --force.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "wordpress-blog-export");
const POSTS_DIR = path.join(OUT, "posts");
const BACKUP_POSTS = path.join(ROOT, "backup/metadata/api/posts-all.json");
const BASE = "https://ecomgliders.com/wp-json/wp/v2/posts";
const PER_PAGE = 100;
const FORCE = process.argv.includes("--force");

function stripHtml(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

async function fetchPage(page) {
  const url = `${BASE}?per_page=${PER_PAGE}&page=${page}&status=publish`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "ecomgliders-site-export/1.0",
    },
  });
  const total = Number(res.headers.get("X-WP-Total") ?? "0");
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "0");
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} page ${page}: ${text.slice(0, 200)}`);
  }
  const posts = await res.json();
  return { posts, total, totalPages, status: res.status };
}

async function loadBackupBySlug() {
  try {
    const raw = await fs.readFile(BACKUP_POSTS, "utf8");
    const posts = JSON.parse(raw);
    return new Map(posts.map((p) => [p.slug, p]));
  } catch {
    return new Map();
  }
}

async function main() {
  await fs.mkdir(POSTS_DIR, { recursive: true });

  const notes = [];
  let expectedTotal = null;
  let expectedPages = null;
  const allPosts = [];
  const sources = { live: 0, backup: 0, skippedExisting: 0 };
  const backupMap = await loadBackupBySlug();

  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    try {
      const { posts, total, totalPages: pages, status } = await fetchPage(page);
      if (expectedTotal === null) {
        expectedTotal = total;
        expectedPages = pages;
        totalPages = Math.max(pages, 1);
        notes.push(`First page HTTP ${status}; X-WP-Total=${total}; X-WP-TotalPages=${pages}`);
      }

      if (!Array.isArray(posts) || posts.length === 0) {
        notes.push(`Page ${page} empty; stopping.`);
        break;
      }

      for (const post of posts) {
        const slug = post.slug;
        const perPath = path.join(POSTS_DIR, `${slug}.json`);
        if (!FORCE) {
          try {
            await fs.access(perPath);
            sources.skippedExisting += 1;
            const existing = JSON.parse(await fs.readFile(perPath, "utf8"));
            allPosts.push(existing);
            continue;
          } catch {
            /* write new */
          }
        }
        await fs.writeFile(perPath, `${JSON.stringify(post, null, 2)}\n`, "utf8");
        allPosts.push(post);
        sources.live += 1;
      }

      console.log(`Fetched page ${page}/${totalPages} (${posts.length} posts)`);
      page += 1;
    } catch (error) {
      notes.push(`Live fetch failed on page ${page}: ${error.message}`);
      console.warn(notes.at(-1));
      break;
    }
  }

  const bySlug = new Map(allPosts.map((p) => [p.slug, p]));

  // Fill gaps from backup if live incomplete
  if (expectedTotal && bySlug.size < expectedTotal) {
    for (const [slug, post] of backupMap) {
      if (bySlug.has(slug)) continue;
      const perPath = path.join(POSTS_DIR, `${slug}.json`);
      const stamped = { ...post, _exportSource: "backup" };
      await fs.writeFile(perPath, `${JSON.stringify(stamped, null, 2)}\n`, "utf8");
      bySlug.set(slug, stamped);
      sources.backup += 1;
      notes.push(`Filled missing slug from backup: ${slug}`);
    }
  }

  // If live never started, load all from per-file or backup
  if (bySlug.size === 0 && backupMap.size > 0) {
    for (const [slug, post] of backupMap) {
      const stamped = { ...post, _exportSource: "backup" };
      await fs.writeFile(
        path.join(POSTS_DIR, `${slug}.json`),
        `${JSON.stringify(stamped, null, 2)}\n`,
        "utf8",
      );
      bySlug.set(slug, stamped);
      sources.backup += 1;
    }
    notes.push("Used full backup/metadata/api/posts-all.json (live unavailable).");
  }

  const posts = [...bySlug.values()].sort((a, b) =>
    String(a.slug).localeCompare(String(b.slug)),
  );

  await fs.writeFile(
    path.join(OUT, "posts-all.json"),
    `${JSON.stringify(posts, null, 2)}\n`,
    "utf8",
  );

  const csvLines = [
    "original_url,slug,title,wp_id,date,modified",
    ...posts.map((p) =>
      [
        csvEscape(p.link ?? `https://ecomgliders.com/${p.slug}/`),
        csvEscape(p.slug),
        csvEscape(stripHtml(p.title?.rendered ?? "")),
        csvEscape(p.id),
        csvEscape(p.date ?? ""),
        csvEscape(p.modified ?? ""),
      ].join(","),
    ),
  ];
  await fs.writeFile(path.join(OUT, "url-inventory.csv"), `${csvLines.join("\n")}\n`, "utf8");

  const manifest = [
    "# WordPress blog export manifest",
    "",
    `- Generated: ${new Date().toISOString()}`,
    `- Expected X-WP-Total: ${expectedTotal ?? "n/a"}`,
    `- Expected pages: ${expectedPages ?? "n/a"}`,
    `- Posts written: ${posts.length}`,
    `- Sources: live=${sources.live}, backup=${sources.backup}, skippedExisting=${sources.skippedExisting}`,
    "",
    "## Notes",
    ...notes.map((n) => `- ${n}`),
    "",
  ].join("\n");

  await fs.writeFile(path.join(OUT, "EXPORT-MANIFEST.md"), manifest, "utf8");

  console.log(`Export complete: ${posts.length} posts → ${OUT}`);
  if (expectedTotal && posts.length !== expectedTotal) {
    console.warn(`WARNING: expected ${expectedTotal}, got ${posts.length}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
