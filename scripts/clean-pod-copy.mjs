import fs from "fs";

function walk(obj) {
  if (typeof obj === "string") {
    return obj
      .replace(/under one pod/gi, "under one team")
      .replace(/One pod owns/gi, "One account lead owns")
      .replace(/one pod/gi, "one team")
      .replace(/named in-house pod/gi, "named in-house team")
      .replace(/Cross-pod issues/gi, "Cross-team issues")
      .replace(/across pods/gi, "across workstreams")
      .replace(/Exact pods and cadence/gi, "Exact workstreams and cadence")
      .replace(/\bPod\b/g, "Workstream")
      .replace(/multi-pod ownership/gi, "full-account ownership")
      .replace(/One owner across pods/gi, "One owner across workstreams")
      .replace(/All pods/gi, "All workstreams")
      .replace(/Dashboard captures —/g, "Account examples—")
      .replace(/Dashboard captures —/g, "Account examples—")
      .replace(/^—advertising/g, "Advertising")
      .replace(/captures —/g, "examples—");
  }
  if (Array.isArray(obj)) return obj.map(walk);
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = walk(v);
    return out;
  }
  return obj;
}

for (const file of [
  "content/config/services/full-service-amazon-agency.json",
  "content/config/services/amazon-reporting-analytics.json",
]) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (file.includes("full-service")) {
    data.hero.title = "Full-service Amazon account management";
    data.hero.subtitle =
      "PPC, listings, catalog health, and Seller Central operations under one accountable team—so media, conversion, and inventory stay aligned.";
  }
  const cleaned = walk(data);
  fs.writeFileSync(file, `${JSON.stringify(cleaned, null, 2)}\n`);
  console.log("cleaned", file);
}
