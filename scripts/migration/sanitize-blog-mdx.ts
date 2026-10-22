/**
 * Dry-run or write-sanitize all blog MDX bodies via sanitizeBlogMarkdown.
 *
 * Usage:
 *   npx tsx scripts/migration/sanitize-blog-mdx.ts --dry-run
 *   npx tsx scripts/migration/sanitize-blog-mdx.ts --write
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { sanitizeBlogMarkdown } from "../../src/lib/blog/sanitize-blog-markdown";

const ROOT = path.resolve(import.meta.dirname, "../..");
const BLOG_DIR = path.join(ROOT, "content/blog");
const REPORT_PATH = path.join(ROOT, "docs/qa/BLOG-SANITIZE-REPORT.json");
const BACKUP_ROOT = path.join(ROOT, "backup/blog-mdx-sanitize");

const write = process.argv.includes("--write");
const dryRun = !write || process.argv.includes("--dry-run");

interface Row {
  slug: string;
  changed: boolean;
  transforms: string[];
  beforeLen: number;
  afterLen: number;
}

async function main() {
  const files = (await fs.readdir(BLOG_DIR))
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  let backupDir: string | null = null;
  if (write && !dryRun) {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    backupDir = path.join(BACKUP_ROOT, stamp);
    await fs.mkdir(backupDir, { recursive: true });
  }

  const rows: Row[] = [];
  let changedCount = 0;

  // Priority order: elementor-heavy first (by scanning flags quickly)
  const ordered = [...files].sort((a, b) => {
    const score = (name: string) => {
      // Will score after read; keep alpha for now, process all
      void name;
      return 0;
    };
    return score(a) - score(b) || a.localeCompare(b);
  });

  for (const file of ordered) {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(BLOG_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const parsed = matter(raw);
    const before = parsed.content;
    const result = sanitizeBlogMarkdown(before);

    rows.push({
      slug,
      changed: result.changed,
      transforms: result.transforms.map((t) =>
        t.detail ? `${t.id}:${t.detail}` : t.id,
      ),
      beforeLen: before.length,
      afterLen: result.content.length,
    });

    if (!result.changed) continue;
    changedCount += 1;

    if (write && !dryRun && backupDir) {
      await fs.writeFile(path.join(backupDir, file), raw, "utf8");
      const next = matter.stringify(result.content, parsed.data);
      await fs.writeFile(fullPath, next.endsWith("\n") ? next : `${next}\n`, "utf8");
    }
  }

  const transformCounts: Record<string, number> = {};
  for (const row of rows) {
    for (const t of row.transforms) {
      const id = t.split(":")[0];
      transformCounts[id] = (transformCounts[id] || 0) + 1;
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: write && !dryRun ? "write" : "dry-run",
    total: files.length,
    changedCount,
    backupDir,
    transformCounts,
    priorityChanged: rows
      .filter(
        (r) =>
          r.changed &&
          r.transforms.some((t) =>
            /elementor|featureGrid|stripGlider|stripOrphan|htmlTable|stripResidual/.test(
              t,
            ),
          ),
      )
      .sort((a, b) => b.beforeLen - a.beforeLen),
    allChanged: rows.filter((r) => r.changed),
  };

  await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);

  console.log(
    JSON.stringify(
      {
        mode: report.mode,
        total: report.total,
        changedCount,
        transformCounts,
        backupDir,
        report: REPORT_PATH,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
