import fs from "node:fs";
import matter from "gray-matter";
import { execFileSync } from "node:child_process";

const QUEUE = "docs/ai/BLOG-TEMPLATE-LOOP-QUEUE.json";
const limit = Number(process.argv[2] || 40);
const q = JSON.parse(fs.readFileSync(QUEUE, "utf8"));
const now = new Date().toISOString();

function save() {
  fs.writeFileSync(QUEUE, `${JSON.stringify(q, null, 2)}\n`);
}

function complete(item, note) {
  item.status = "completed";
  item.completedAt = now;
  item.notes = note;
  q.completed.push({ index: item.index, slug: item.slug, completedAt: now });
  q.cursor = item.index;
}

let geo = 0;
let guide = 0;
const unknown = [];

while (q.cursor < q.posts.length && geo + guide < limit) {
  const item = q.posts[q.cursor];
  if (item.status === "completed") {
    q.cursor += 1;
    continue;
  }

  const raw = fs.readFileSync(item.file, "utf8");
  const { content } = matter(raw);
  const isGeoPpc =
    /amazon-ppc-marketing-services-in-/.test(item.slug) &&
    content.includes("Headquarters");
  const isGeoAccount =
    /professional-amazon-account-management-services-in-/.test(item.slug) &&
    content.includes("Headquarters");

  if (isGeoPpc || isGeoAccount) {
    execFileSync(
      "node",
      ["scripts/migration/apply-geo-ppc-layout.mjs", item.file],
      { stdio: "pipe" },
    );
    complete(
      item,
      isGeoPpc
        ? "Geo PPC layout (batch)"
        : "Geo account-mgmt layout (batch via geo script)",
    );
    geo += 1;
    continue;
  }

  // Default path: guide layout basics (title strip + checklist conversion when patterns exist)
  execFileSync(
    "node",
    ["scripts/migration/apply-guide-layout-basics.mjs", item.file],
    { stdio: "pipe" },
  );
  complete(item, "Guide layout basics (default)");
  guide += 1;
}

save();
console.log(
  JSON.stringify(
    {
      completed: q.completed.length,
      cursor: q.cursor,
      geo,
      guide,
      unknown,
      next: q.posts[q.cursor]?.slug,
    },
    null,
    2,
  ),
);
