import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { blogPostFrontmatterSchema } from "../../src/domain/content/schemas/blog-post.schema";
import { buildFrontmatter } from "./lib/build-frontmatter";
import { extractPostBodyHtml } from "./lib/extract-post-html";
import { htmlToMarkdown } from "./lib/html-to-markdown";

const ROOT = path.resolve(import.meta.dirname, "../..");
const POSTS_PATH = path.join(ROOT, "backup/metadata/api/posts-all.json");
const INVENTORY_PATH = path.join(ROOT, "backup/metadata/blog-inventory.json");
const CATEGORIES_PATH = path.join(ROOT, "backup/metadata/api/categories-all.json");
const TAGS_PATH = path.join(ROOT, "backup/metadata/api/tags-all.json");
const USERS_PATH = path.join(ROOT, "backup/metadata/api/users-all.json");
const MEDIA_PATH = path.join(ROOT, "backup/metadata/api/media-all.json");
const OUTPUT_DIR = path.join(ROOT, "content/blog");
const REPORT_PATH = path.join(ROOT, "docs/qa/blog-migration-report.json");

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

interface InventoryEntry {
  slug: string;
}

interface MigrationFailure {
  slug: string;
  reason: string;
}

interface MigrationReport {
  generatedAt: string;
  source: string;
  expectedCount: number;
  writtenCount: number;
  skippedCount: number;
  failures: MigrationFailure[];
}

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

function buildNameMap(items: WordPressEntity[]): Map<number, string> {
  return new Map(items.map((item) => [item.id, item.name]));
}

function buildMediaMap(items: WordPressMedia[]): Map<number, string> {
  return new Map(items.map((item) => [item.id, item.source_url]));
}

async function main(): Promise<void> {
  const [posts, inventory, categories, tags, users, media] = await Promise.all([
    readJson<WordPressPost[]>(POSTS_PATH),
    readJson<InventoryEntry[]>(INVENTORY_PATH),
    readJson<WordPressEntity[]>(CATEGORIES_PATH),
    readJson<WordPressEntity[]>(TAGS_PATH),
    readJson<WordPressEntity[]>(USERS_PATH),
    readJson<WordPressMedia[]>(MEDIA_PATH),
  ]);

  const postsBySlug = new Map(posts.map((post) => [post.slug, post]));
  const expectedSlugs = inventory.map((entry) => entry.slug);
  const maps = {
    authors: buildNameMap(users),
    categories: buildNameMap(categories),
    tags: buildNameMap(tags),
    media: buildMediaMap(media),
  };

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const failures: MigrationFailure[] = [];
  let writtenCount = 0;

  for (const slug of expectedSlugs) {
    const post = postsBySlug.get(slug);
    if (!post) {
      failures.push({ slug, reason: "Post not found in posts-all.json" });
      continue;
    }

    const bodyHtml = extractPostBodyHtml(post.content.rendered);
    if (!bodyHtml.trim()) {
      failures.push({ slug, reason: "No article body extracted from Elementor content" });
      continue;
    }

    const markdownBody = htmlToMarkdown(bodyHtml);
    if (!markdownBody.trim()) {
      failures.push({ slug, reason: "HTML-to-Markdown conversion produced empty body" });
      continue;
    }

    const frontmatter = buildFrontmatter(post, maps, markdownBody);
    const parsed = blogPostFrontmatterSchema.safeParse(frontmatter);
    if (!parsed.success) {
      failures.push({
        slug,
        reason: `Frontmatter validation failed: ${parsed.error.message}`,
      });
      continue;
    }

    const fileContents = matter.stringify(markdownBody, parsed.data);
    const outputPath = path.join(OUTPUT_DIR, `${slug}.mdx`);
    await fs.writeFile(outputPath, fileContents, "utf8");
    writtenCount += 1;
  }

  const report: MigrationReport = {
    generatedAt: new Date().toISOString(),
    source: "backup/metadata/api/posts-all.json",
    expectedCount: expectedSlugs.length,
    writtenCount,
    skippedCount: failures.length,
    failures,
  };

  await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log(`Migration complete: ${writtenCount}/${expectedSlugs.length} MDX files written`);
  if (failures.length > 0) {
    console.log(`Failures: ${failures.length}`);
    for (const failure of failures.slice(0, 10)) {
      console.log(`  - ${failure.slug}: ${failure.reason}`);
    }
    if (failures.length > 10) {
      console.log(`  ... and ${failures.length - 10} more (see ${REPORT_PATH})`);
    }
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
