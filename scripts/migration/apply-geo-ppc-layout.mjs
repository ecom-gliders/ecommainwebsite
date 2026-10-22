/**
 * Layout-only transform for geo Amazon PPC / account-management posts.
 * Strips WP form/HQ/subscribe chrome; promotes headings; checklists for key bullets.
 * Does not invent or rewrite prose.
 */
import fs from "node:fs";
import matter from "gray-matter";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node apply-geo-ppc-layout.mjs <path.mdx>");
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8");
const { data, content } = matter(raw);
let body = content.replace(/\r\n/g, "\n").trim();

const title = typeof data.title === "string" ? data.title.trim() : "";
if (title) {
  const esc = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  body = body.replace(new RegExp(`^##\\s+${esc}\\s*\\n+`, "i"), "");
}

// Strip WP lead form / HQ / hours chrome through article start markers
body = body.replace(
  /^[\s\S]*?(?=(?:#{2,6}\s+)?\*{0,2}Introduction\*{0,2}\s*$|#{2,6}\s+\*{0,2}What is Amazon|^\*{0,2}Introduction\*{0,2}\s*$)/im,
  "",
);

// If HQ chrome still present, cut from See the Difference / Ready to Grow / Headquarters
// through the line before Introduction / first real ### article heading after HQ block
if (/##\s+Headquarters/i.test(body)) {
  body = body.replace(
    /^[\s\S]*?(?=^(?:#{2,6}\s+)?\*{0,2}Introduction\*{0,2}\s*$|#{2,6}\s+\*{0,2}What is )/im,
    "",
  );
}

// Normalize Introduction heading variants
body = body.replace(
  /^(?:#{2,6}\s+)?\*{0,2}Introduction\*{0,2}\s*$/im,
  "### Introduction",
);

// Normalize What is Amazon headings that include bold markers
body = body.replace(
  /^#{2,6}\s+\*{0,2}(What is Amazon[^*\n]+?)\*{0,2}\s*$/gim,
  "### $1",
);

// Key Elements bullets → checklist
body = body.replace(
  /(### Key Elements of Amazon PPC Marketing Services[^\n]*\n\n[^\n]+\n\n)((?:\*\s{1,3}.+\n(?:\s*\n)?)+)/,
  (_, head, bullets) => {
    const items = bullets
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("*"))
      .map((l) => l.replace(/^\*\s+/, "").trim());
    return `${head}\`\`\`checklist\n${items.map((i) => `- ${i}`).join("\n")}\n\`\`\`\n\n`;
  },
);

body = body.replace(/^(?:#{2,6}\s+)?\*{0,2}Conclusion\*{0,2}\s*$/im, "### Conclusion");

body = body.replace(/^\*\*Call to Action \(CTA\)\*\*:\s*/im, "");

body = body.replace(/\n##\s+Subscribe for updates\.[\s\S]*$/i, "\n");
body = body.replace(/\n##\s+Subscribe for Growth[\s\S]*$/i, "\n");

// Drop leftover form chrome fragments if still at top
body = body.replace(
  /^[\s\S]*?(?=### Introduction|### What is Amazon)/,
  (lead) => (/Headquarters|Office Hours|action-packed steps/i.test(lead) ? "" : lead),
);

body = body.replace(/\n{3,}/g, "\n\n").trim() + "\n";

const fmMatch = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
const frontmatter = fmMatch ? fmMatch[0].replace(/\r\n/g, "\n") : "---\n---\n";
fs.writeFileSync(file, `${frontmatter}${body}`, "utf8");
console.log(
  JSON.stringify(
    {
      file,
      chars: body.length,
      stillHasHQ: /Headquarters/i.test(body),
    },
    null,
    2,
  ),
);
