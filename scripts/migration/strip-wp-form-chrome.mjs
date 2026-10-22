/**
 * Strip WP lead form / HQ / office-hours chrome from blog MDX bodies.
 * Cuts through the SMS privacy consent paragraph when present.
 * Layout-only; does not invent copy.
 */
import fs from "node:fs";
import matter from "gray-matter";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node strip-wp-form-chrome.mjs <path.mdx>");
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8");
const { content } = matter(raw);
let body = content.replace(/\r\n/g, "\n");

const before = body;

// Prefer cutting at Introduction / What is Amazon
body = body.replace(
  /^[\s\S]*?(?=(?:^|\n)(?:#{2,6}\s+)?\*{0,2}Introduction\*{0,2}\s*$|(?:^|\n)#{2,6}\s+\*{0,2}What is Amazon)/im,
  "\n",
);

// Account-mgmt style: cut through SMS consent line
if (/Headquarters|Office Hours|action-packed steps/i.test(body)) {
  body = body.replace(
    /^[\s\S]*?Privacy Policy & Terms\.\s*/i,
    "",
  );
}

// Drop residual lead CTAs if still before first ###
if (/Headquarters|Office Hours|See the Difference with Real Growth/i.test(body)) {
  const idx = body.search(/^###\s+/m);
  if (idx > 0) {
    const lead = body.slice(0, idx);
    if (/Headquarters|Office Hours/i.test(lead)) {
      body = body.slice(idx);
    }
  }
}

body = body.replace(/^(?:#{2,6}\s+)?\*{0,2}Introduction\*{0,2}\s*$/im, "### Introduction");
body = body.replace(/\n{3,}/g, "\n\n").trim() + "\n";

const fmMatch = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
const frontmatter = fmMatch ? fmMatch[0].replace(/\r\n/g, "\n") : "---\n---\n";
fs.writeFileSync(file, `${frontmatter}${body}`, "utf8");

console.log(
  JSON.stringify(
    {
      file,
      changed: before !== body,
      stillHasHQ: /Headquarters/i.test(body),
      chars: body.length,
    },
    null,
    2,
  ),
);
