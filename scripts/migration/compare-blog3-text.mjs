import fs from "node:fs";
import { execSync } from "node:child_process";

const after = fs.readFileSync(
  "content/blog/how-to-reduce-acos-and-grow-sales-for-your-ecommerce-business-2.mdx",
  "utf8",
);
const before = execSync(
  "git show HEAD:content/blog/how-to-reduce-acos-and-grow-sales-for-your-ecommerce-business-2.mdx",
  { encoding: "utf8" },
);

function body(s) {
  return s.replace(/^---[\s\S]*?---\s*/, "");
}

function plain(s) {
  return s
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#|*_>`\[\]|]/g, " ")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const pb = plain(body(before));
const pa = plain(body(after));

const phrases = [
  "Target high-intent keywords",
  "Add negative keywords",
  "Use long-tail keywords",
  "Lower bids on low-performers",
  "Increase bids on top keywords",
  "Dynamic Bidding",
  "Generic campaigns",
  "Data-driven, customized",
  "Rarely shared",
  "Case studies page",
  "42% → 19%",
  "68%",
  "120%",
  "22%",
  "High ACOS (30%+)",
  "Optimal ACOS (15-25%)",
  "View Our Full Case Studies",
];

const report = phrases.map((p) => ({
  phrase: p,
  inBefore: body(before).includes(p) || body(before).includes(p.replace("→", "->")),
  inAfter: body(after).includes(p),
  inAfterPlain: pa.includes(p.toLowerCase().replace("→", "→")),
}));

console.log(
  JSON.stringify(
    {
      beforeLen: body(before).length,
      afterLen: body(after).length,
      afterHasFormulaFence: after.includes("```formula"),
      afterHasTables: (after.match(/^\|/gm) || []).length,
      afterHasCaseSnapshot: (after.match(/```case-snapshot/g) || []).length,
      phrases: report,
    },
    null,
    2,
  ),
);
