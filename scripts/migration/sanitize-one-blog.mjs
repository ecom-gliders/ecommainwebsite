import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/migration/sanitize-one-blog.mjs <slug>");
  process.exit(1);
}

// Prefer tsx runner path via dynamic import of compiled logic — use child approach
const file = path.resolve("content/blog", `${slug}.mdx`);
const raw = fs.readFileSync(file, "utf8");
const parsed = matter(raw);

const { sanitizeBlogMarkdown } = await import(
  "../../src/lib/blog/sanitize-blog-markdown.ts"
);

const result = sanitizeBlogMarkdown(parsed.content);
const next = matter.stringify(result.content, parsed.data);
fs.writeFileSync(file, next.endsWith("\n") ? next : `${next}\n`, "utf8");
console.log(
  JSON.stringify(
    {
      slug,
      changed: result.changed,
      transforms: result.transforms,
    },
    null,
    2,
  ),
);
