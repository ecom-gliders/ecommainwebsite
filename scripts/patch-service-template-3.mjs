import fs from "fs";

const p = "src/components/services/service-page-template.tsx";
let s = fs.readFileSync(p, "utf8");

const before = s;
s = s.replace(
  /\{leadBand\}\r?\n(\s*)<ServiceCustomTail\r?\n(\s*)service=\{service\}\r?\n(\s*)site=\{site\}/g,
  `<ServiceDepthBand service={service} />\n$1{leadBand}\n$1<ServiceCustomTail\n$2service={service}\n$3site={site}\n$3relatedPosts={relatedPosts}`,
);

console.log("replacements", (before.match(/\{leadBand\}/g) || []).length, "-> depth?", s.includes("ServiceDepthBand service"));
console.log("relatedPosts attrs", (s.match(/relatedPosts=\{relatedPosts\}/g) || []).length);

fs.writeFileSync(p, s);
