import fs from "fs";
import path from "path";

const fixes = {
  "full-service-amazon-agency.json": {
    metric: "$24.8M+",
    metricLabel: "Multi-year brand sales on Amazon",
    points: [
      "Ordered product sales and YoY movement from live Seller tools",
      "Account work spans advertising, listings, and catalog health",
      "Examples vary by catalog; not a guarantee for every account",
    ],
  },
  "amazon-ppc-management-agency.json": {
    metric: "+152%",
    metricLabel: "Peak-window sales vs prior year",
    points: [
      "Seller app sales windows from managed accounts",
      "PPC structure and query work tied to profitable growth",
      "Not a guarantee of ACoS or ROAS",
    ],
  },
  "amazon-catalog-management.json": {
    metric: "$51.3M+",
    metricLabel: "Ordered product sales scale catalog must support",
    points: [
      "Catalog health keeps pages buyable under traffic",
      "Suppressions and variations cleared before spend scales",
      "Account examples; results vary",
    ],
  },
  "amazon-dsp-management.json": {
    metric: "$24.8M+",
    metricLabel: "Scale context before upper-funnel DSP",
    points: [
      "DSP considered when Brand Registry, listings, and PPC foundations are ready",
      "Growth snapshots as context—not DSP-only attribution claims",
    ],
  },
  "amazon-reporting-analytics.json": {
    metric: "$51.3M+",
    metricLabel: "Decision-ready sales views from live tools",
    points: [
      "Shared metric definitions across advertising and catalog work",
      "Weekly and monthly packs stakeholders can act on",
    ],
  },
};

for (const [file, callout] of Object.entries(fixes)) {
  const p = path.join("content/config/services", file);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  const mod = (data.modules || []).find((m) => m.type === "browserProof");
  if (!mod) continue;
  mod.callout = callout;
  fs.writeFileSync(p, `${JSON.stringify(data, null, 2)}\n`);
  console.log("fixed callout", file, callout.metric);
}
