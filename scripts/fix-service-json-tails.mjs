import fs from "fs";
import path from "path";

const dir = "content/config/services";
const files = [
  "amazon-catalog-management.json",
  "amazon-dsp-management.json",
  "amazon-ppc-management-agency.json",
  "amazon-reporting-analytics.json",
  "full-service-amazon-agency.json",
];

const literalBackslashN = String.fromCharCode(92, 110); // \n as two chars

for (const file of files) {
  const p = path.join(dir, file);
  let raw = fs.readFileSync(p, "utf8");
  const badSuffix = "}" + literalBackslashN;
  if (raw.endsWith(badSuffix)) {
    raw = raw.slice(0, -literalBackslashN.length) + "\n";
  } else {
    const idx = raw.lastIndexOf("}");
    raw = raw.slice(0, idx + 1) + "\n";
  }
  JSON.parse(raw);
  fs.writeFileSync(p, raw);
  console.log("fixed", file);
}
