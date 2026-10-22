import fs from "node:fs";

const path = "docs/ai/BLOG-TEMPLATE-LOOP-QUEUE.json";
let s = fs.readFileSync(path, "utf8");

// Ends with `]}}\n` or `]\n}}\n` — one extra `}`
s = s.replace(/\](\r?\n)\}\}(\r?\n)?$/, "]$1}$2");
s = s.replace(/\}\}(\r?\n)?$/, "}$1");

if (!s.endsWith("\n")) s += "\n";
fs.writeFileSync(path, s);

const q = JSON.parse(fs.readFileSync(path, "utf8"));
console.log(
  JSON.stringify(
    {
      completed: q.completed.length,
      cursor: q.cursor,
      next: q.posts[q.cursor]?.slug,
      total: q.posts.length,
      tail: [...Buffer.from(s.slice(-15))],
    },
    null,
    2,
  ),
);
