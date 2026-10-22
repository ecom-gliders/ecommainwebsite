import fs from "node:fs";
import matter from "gray-matter";
import { execFileSync } from "node:child_process";

const files = fs
  .readdirSync("content/blog")
  .filter((f) => f.endsWith(".mdx"));

let css = 0;
let geo = 0;
let hq = 0;

for (const f of files) {
  const p = `content/blog/${f}`;
  let raw = fs.readFileSync(p, "utf8");

  if (/Headquarters/i.test(raw)) {
    execFileSync("node", ["scripts/migration/strip-wp-form-chrome.mjs", p], {
      stdio: "pipe",
    });
    hq += 1;
    raw = fs.readFileSync(p, "utf8");
  }

  if (
    /\.ecom-|border-collapse|background-color:\s*orange/i.test(raw) ||
    /^[a-z.#][^{\n]{0,60}\{[^}\n]*\}\s*$/m.test(matter(raw).content)
  ) {
    const parsed = matter(raw);
    let body = parsed.content.replace(/\r\n/g, "\n");
    body = body.replace(/^.*\{[^}\n]*border-collapse[^}\n]*\}.*$/gim, "");
    body = body.replace(/^.*\.ecom-[a-z0-9_-]+.*$/gim, "");
    body = body.replace(/^[a-z.#][^{\n]{0,60}\{[^}\n]*\}\s*$/gim, "");
    body = body.replace(/\n{3,}/g, "\n\n").trim() + "\n";
    const fmMatch = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
    const fm = fmMatch ? fmMatch[0].replace(/\r\n/g, "\n") : "---\n---\n";
    fs.writeFileSync(p, `${fm}${body}`);
    css += 1;
  }

  if (/amazon-ppc-marketing-services-in-/.test(f)) {
    execFileSync("node", ["scripts/migration/apply-geo-ppc-layout.mjs", p], {
      stdio: "pipe",
    });
    geo += 1;
  }
}

const q = JSON.parse(
  fs.readFileSync("docs/ai/BLOG-TEMPLATE-LOOP-QUEUE.json", "utf8"),
);
q.status = "completed";
q.completedAt = new Date().toISOString();
fs.writeFileSync(
  "docs/ai/BLOG-TEMPLATE-LOOP-QUEUE.json",
  `${JSON.stringify(q, null, 2)}\n`,
);

let stillHQ = 0;
for (const f of files) {
  if (/Headquarters/i.test(fs.readFileSync(`content/blog/${f}`, "utf8"))) {
    stillHQ += 1;
  }
}

console.log(
  JSON.stringify(
    {
      hqStrippedPass: hq,
      cssCleaned: css,
      geoReapplied: geo,
      stillHQ,
      queueStatus: q.status,
      completed: q.completed.length,
    },
    null,
    2,
  ),
);
