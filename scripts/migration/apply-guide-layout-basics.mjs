/**
 * Layout-only basics for guide-style posts:
 * - drop duplicate leading ## title
 * - normalize Introduction heading
 * - convert "**Label:**" + bullet lists into ```checklist
 * - strip raw CSS lines that look like style blocks
 * Does not invent copy.
 */
import fs from "node:fs";
import matter from "gray-matter";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node apply-guide-layout-basics.mjs <path.mdx>");
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8");
const { data, content } = matter(raw);
let body = content.replace(/\r\n/g, "\n").trim();

const title = typeof data.title === "string" ? data.title.trim() : "";
if (title) {
  const esc = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  body = body.replace(new RegExp(`^##\\s+${esc}\\s*\\n+`, "i"), "");
  // secondary short H2 that repeats a shortened title (optional second line)
  body = body.replace(/^##\s+.+\n(?=\*\*?Introduction|###\s|#####\s|Introduction\b)/m, "");
}

body = body.replace(/^\*\*?Introduction\*\*?\s*$/im, "### Introduction");
body = body.replace(/^#{4,6}\s*Introduction\s*$/im, "### Introduction");
body = body.replace(/^Introduction\s*$/im, "### Introduction");

// Strip bare CSS declaration lines (WP leftovers)
body = body.replace(
  /^(?:table|th|td|tr)\s*\{[^}]*\}\s*$/gim,
  "",
);
body = body.replace(
  /^(?:table|th|td)\s*\{[^}]*\}\s*(?:th|td)\s*\{[^}]*\}\s*(?:td|th)\s*\{[^}]*\}\s*$/gim,
  "",
);

// Convert **Label:** / Label: followed by bullet list → checklist
// Allow blank lines between bullets (common in WP exports)
body = body.replace(
  /(?:^|\n)(?:\*\*)([A-Za-z][A-Za-z0-9 /&’'\-]{2,40}):(?:\*\*)\s*\n+((?:(?:\*\s{1,3}.+)\n*(?:\s*\n)*){2,})/g,
  (match, label, bullets) => {
    const items = bullets
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /^\*/.test(l))
      .map((l) => l.replace(/^\*\s+/, "").trim())
      .filter(Boolean);
    if (items.length < 2) return match;
    return `\n\n\`\`\`checklist\nTITLE: ${label.trim()}\n${items.map((i) => `- ${i}`).join("\n")}\n\`\`\`\n\n`;
  },
);

body = body.replace(/\n{3,}/g, "\n\n").trim() + "\n";

const fmMatch = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
const frontmatter = fmMatch ? fmMatch[0].replace(/\r\n/g, "\n") : "---\n---\n";
fs.writeFileSync(file, `${frontmatter}${body}`, "utf8");
console.log(JSON.stringify({ file, chars: body.length }, null, 2));
