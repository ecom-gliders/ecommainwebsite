/**
 * Phase 3: Backup MDX, restore matched_damaged posts from live export.
 * Preserves featuredImage and local /images/blog/ paths. No image downloads.
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { blogPostFrontmatterSchema } from "../../src/domain/content/schemas/blog-post.schema";
import { buildFrontmatter } from "./lib/build-frontmatter";
import { extractPostBodyHtml } from "./lib/extract-post-html";
import { htmlToMarkdown } from "./lib/html-to-markdown";

const ROOT = path.resolve(import.meta.dirname, "../..");
const EXPORT_POSTS = path.join(ROOT, "wordpress-blog-export/posts-all.json");
const MAPPING = path.join(ROOT, "docs/qa/WP-BLOG-MAPPING-REPORT.json");
const BLOG_DIR = path.join(ROOT, "content/blog");
const CATEGORIES_PATH = path.join(ROOT, "backup/metadata/api/categories-all.json");
const TAGS_PATH = path.join(ROOT, "backup/metadata/api/tags-all.json");
const USERS_PATH = path.join(ROOT, "backup/metadata/api/users-all.json");
const MEDIA_PATH = path.join(ROOT, "backup/metadata/api/media-all.json");
const REPORT_PATH = path.join(ROOT, "docs/qa/WP-BLOG-RESTORE-RUN.json");

interface WordPressEntity {
  id: number;
  name: string;
}

interface WordPressMedia {
  id: number;
  source_url: string;
}

interface WordPressPost {
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  author: number;
  categories: number[];
  tags: number[];
  featured_media: number;
  yoast_head_json?: Record<string, unknown>;
}

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await fs.readFile(filePath, "utf8")) as T;
}

function buildNameMap(items: WordPressEntity[]): Map<number, string> {
  return new Map(items.map((item) => [item.id, item.name]));
}

function buildMediaMap(items: WordPressMedia[]): Map<number, string> {
  return new Map(items.map((item) => [item.id, item.source_url]));
}

function collectLocalImageMap(markdown: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /!\[[^\]]*]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown))) {
    const src = match[1];
    if (src.startsWith("/images/blog/")) {
      const base = path.basename(src).replace(/-[a-f0-9]{8}(?=\.[a-z]+$)/i, "");
      map.set(base.toLowerCase(), src);
      map.set(path.basename(src).toLowerCase(), src);
    }
  }
  return map;
}

function preferLocalImages(markdown: string, localMap: Map<string, string>): string {
  return markdown.replace(/!\[[^\]]*]\(([^)]+)\)/g, (full, src: string) => {
    if (src.startsWith("/images/blog/")) return full;
    try {
      const url = new URL(src, "https://ecomgliders.com");
      const base = path.basename(url.pathname);
      const withoutHash = base.replace(/-[a-f0-9]{8}(?=\.[a-z]+$)/i, "");
      const local =
        localMap.get(base.toLowerCase()) ??
        localMap.get(withoutHash.toLowerCase());
      if (local) {
        return full.replace(src, local);
      }
    } catch {
      /* keep remote */
    }
    return full;
  });
}

function cleanBodyMarkdown(markdown: string, title: string): string {
  const lines = markdown.split("\n");
  const cleaned: string[] = [];
  let skippedTitle = false;

  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const text = heading[2].trim();
      if (!skippedTitle && text.toLowerCase() === title.toLowerCase()) {
        skippedTitle = true;
        continue;
      }
      // Demote body H1 to H2
      if (heading[1].length === 1) {
        cleaned.push(`## ${text}`);
        continue;
      }
    }
    cleaned.push(line);
  }

  return cleaned.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function copyDir(src: string, dest: string): Promise<void> {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(from, to);
    } else {
      await fs.copyFile(from, to);
    }
  }
}

async function main(): Promise<void> {
  const mapping = await readJson<{
    matched_damaged: Array<{ slug: string; reasons: string[] }>;
  }>(MAPPING);
  const damagedSlugs = mapping.matched_damaged.map((d) => d.slug);
  if (damagedSlugs.length === 0) {
    console.log("No damaged posts to restore.");
    return;
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(
    ROOT,
    "wordpress-blog-export/mdx-backup-before-restore",
    stamp,
  );
  console.log(`Backing up content/blog → ${backupDir}`);
  await copyDir(BLOG_DIR, backupDir);

  const [posts, categories, tags, users, media] = await Promise.all([
    readJson<WordPressPost[]>(EXPORT_POSTS),
    readJson<WordPressEntity[]>(CATEGORIES_PATH),
    readJson<WordPressEntity[]>(TAGS_PATH),
    readJson<WordPressEntity[]>(USERS_PATH),
    readJson<WordPressMedia[]>(MEDIA_PATH),
  ]);

  const postsBySlug = new Map(posts.map((p) => [p.slug, p]));
  const maps = {
    authors: buildNameMap(users),
    categories: buildNameMap(categories),
    tags: buildNameMap(tags),
    media: buildMediaMap(media),
  };

  const results: Array<Record<string, unknown>> = [];

  for (const slug of damagedSlugs) {
    const post = postsBySlug.get(slug);
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!post) {
      results.push({ slug, status: "skipped", reason: "missing_in_export" });
      continue;
    }

    const existingRaw = await fs.readFile(mdxPath, "utf8");
    const existing = matter(existingRaw);
    const preservedFeaturedImage = String(existing.data.featuredImage ?? "");
    const localImageMap = collectLocalImageMap(existing.content);

    const bodyHtml = extractPostBodyHtml(post.content.rendered);
    if (!bodyHtml.trim()) {
      results.push({ slug, status: "failed", reason: "empty_extract" });
      continue;
    }

    let markdownBody = htmlToMarkdown(bodyHtml);
    markdownBody = preferLocalImages(markdownBody, localImageMap);
    const title =
      String(existing.data.title ?? "").trim() ||
      post.title.rendered.replace(/<[^>]+>/g, "").trim();
    markdownBody = cleanBodyMarkdown(markdownBody, title);

    if (!markdownBody.trim()) {
      results.push({ slug, status: "failed", reason: "empty_markdown" });
      continue;
    }

    const frontmatter = buildFrontmatter(
      post as Parameters<typeof buildFrontmatter>[0],
      maps,
      markdownBody,
    );

    // Force-preserve localized featured image
    if (preservedFeaturedImage) {
      frontmatter.featuredImage = preservedFeaturedImage;
      if (frontmatter.seo) {
        frontmatter.seo.ogImage = preservedFeaturedImage;
      }
    }

    const parsed = blogPostFrontmatterSchema.safeParse(frontmatter);
    if (!parsed.success) {
      results.push({
        slug,
        status: "failed",
        reason: `validation: ${parsed.error.message}`,
      });
      continue;
    }

    const fileContents = matter.stringify(markdownBody, parsed.data);
    await fs.writeFile(mdxPath, fileContents, "utf8");
    results.push({
      slug,
      status: "restored",
      beforeLen: existing.content.trim().length,
      afterLen: markdownBody.length,
      extractHtmlLen: bodyHtml.length,
    });
    console.log(
      `Restored ${slug}: ${existing.content.trim().length} → ${markdownBody.length} chars`,
    );
  }

  await fs.writeFile(
    REPORT_PATH,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        backupDir,
        restored: results.filter((r) => r.status === "restored").length,
        failed: results.filter((r) => r.status !== "restored").length,
        results,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(`Done. Report: ${REPORT_PATH}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
