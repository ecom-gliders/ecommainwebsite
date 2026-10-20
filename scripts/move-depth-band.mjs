import fs from "fs";

const p = "src/components/services/service-page-template.tsx";
let s = fs.readFileSync(p, "utf8");

// Remove late depth bands (before leadBand)
s = s.replace(
  /<ServiceDepthBand service=\{service\} \/>\r?\n(\s*)\{leadBand\}/g,
  "{leadBand}",
);

// Insert depth band immediately after ServiceHero in custom layouts only
// (default layout keeps its own problem/audience/solution stack)
s = s.replace(
  /(<ServiceHero service=\{service\} site=\{site\} \/>)\r?\n(\s*)(?![\s\S]{0,40}ServiceStatsStrip)/g,
  `$1\n$2<ServiceDepthBand service={service} />\n$2`,
);

// Avoid doubling if already present next to hero
s = s.replace(
  /(<ServiceDepthBand service=\{service\} \/>\r?\n\s*){2,}/g,
  "<ServiceDepthBand service={service} />\n        ",
);

fs.writeFileSync(p, s);
const count = (s.match(/<ServiceDepthBand service=\{service\} \/>/g) || [])
  .length;
console.log("depth band count", count);
