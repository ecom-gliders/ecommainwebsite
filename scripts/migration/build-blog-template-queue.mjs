import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const dir = path.join(root, "content/blog");
const outDir = path.join(root, "docs/ai");
const queuePath = path.join(outDir, "BLOG-TEMPLATE-LOOP-QUEUE.json");
const orderPath = path.join(outDir, "BLOG-TEMPLATE-LOOP-ORDER.md");

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

function parseFrontmatter(file) {
  const fileSlug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data } = matter(raw);
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? data.slug.trim()
      : fileSlug;
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const publishedAt =
    typeof data.publishedAt === "string"
      ? data.publishedAt
      : typeof data.date === "string"
        ? data.date
        : "";
  return { slug, title, publishedAt, file };
}

const posts = files.map(parseFrontmatter).sort((a, b) => {
  const da = a.publishedAt || "";
  const db = b.publishedAt || "";
  if (da !== db) return da.localeCompare(db);
  return a.slug.localeCompare(b.slug);
});

const queue = {
  id: "blog-template-sequential-loop",
  status: "armed_paused",
  mode: "sequential",
  startedAt: null,
  completedAt: null,
  standards: [
    "docs/project/BLOG-TEMPLATES.md",
    "docs/project/BLOG-BLOCKS.md",
    "content/config/blog-blocks.json",
  ],
  rules: {
    sequential: true,
    parallel: false,
    contextAware: true,
    doNotBlindPaste: true,
    applyTemplateIntelligentlyPerPost: true,
    startOnlyWhenStatusActive: true,
  },
  cursor: 0,
  total: posts.length,
  completed: [],
  failed: [],
  skipped: [],
  posts: posts.map((p, index) => ({
    index: index + 1,
    slug: p.slug,
    title: p.title,
    publishedAt: p.publishedAt,
    file: `content/blog/${p.file}`,
    status: "pending",
  })),
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(queuePath, `${JSON.stringify(queue, null, 2)}\n`, "utf8");

const lines = [
  "# Blog template sequential loop — order",
  "",
  `**Status:** armed / paused (do not process until activated)`,
  `**Total:** ${posts.length}`,
  `**First:** \`${posts[0]?.slug}\` (${posts[0]?.publishedAt || "no date"})`,
  `**Last:** \`${posts[posts.length - 1]?.slug}\` (${posts[posts.length - 1]?.publishedAt || "no date"})`,
  `**Sort:** \`publishedAt\` ascending, then slug ascending`,
  `**Standards:** \`BLOG-TEMPLATES.md\`, \`BLOG-BLOCKS.md\`, \`blog-blocks.json\``,
  "",
  "## Processing rules",
  "",
  "1. One blog per tick. Never parallel.",
  "2. Read the post MDX + frontmatter before editing.",
  "3. Apply the finalized post template and block rules context-aware to that content.",
  "4. Do not invent metrics; preserve wording unless professional-copy cleanup is required.",
  "5. Mark queue item complete, advance cursor, then stop until next tick.",
  "",
  "## Order",
  "",
  "| # | publishedAt | slug |",
  "|---|-------------|------|",
  ...posts.map(
    (p, i) =>
      `| ${i + 1} | ${p.publishedAt || "—"} | \`${p.slug}\` |`,
  ),
  "",
];

fs.writeFileSync(orderPath, `${lines.join("\n")}\n`, "utf8");

console.log(
  JSON.stringify(
    {
      total: posts.length,
      first: posts[0],
      last: posts[posts.length - 1],
      queuePath: path.relative(root, queuePath).replace(/\\/g, "/"),
      orderPath: path.relative(root, orderPath).replace(/\\/g, "/"),
    },
    null,
    2,
  ),
);
