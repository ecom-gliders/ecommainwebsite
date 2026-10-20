import fs from "fs";
import path from "path";

const callouts = {
  "full-service-amazon-agency.json": {
    metric: "$24.8M+",
    metricLabel: "Scaled on Amazon with one full-account team",
    points: [
      "Ads, listings, and catalog on one plan",
      "Real Seller tool growth—not slide-deck claims",
    ],
  },
  "amazon-ppc-management-agency.json": {
    metric: "+152%",
    metricLabel: "Peak sales vs the prior year",
    points: [
      "PPC built for profitable growth",
      "Live account windows, not mock charts",
    ],
  },
  "amazon-catalog-management.json": {
    metric: "$51.3M+",
    metricLabel: "Sales scale your catalog has to support",
    points: [
      "Pages stay buyable when traffic rises",
      "Fix suppressions before you scale spend",
    ],
  },
  "amazon-dsp-management.json": {
    metric: "$24.8M+",
    metricLabel: "Ready for upper-funnel only when foundations are",
    points: [
      "DSP after Brand Registry, listings, and PPC are set",
      "Scale context—not empty ROAS promises",
    ],
  },
  "amazon-reporting-analytics.json": {
    metric: "$51.3M+",
    metricLabel: "Numbers leaders can decide from",
    points: [
      "Shared definitions across ads and catalog",
      "Weekly packs built for action, not noise",
    ],
  },
};

const shortSubs = {
  "full-service-amazon-agency.json":
    "Live account examples. Results vary by catalog and category.",
  "amazon-ppc-management-agency.json":
    "Live Seller app windows. Not a guarantee of ACoS or ROAS.",
  "amazon-catalog-management.json":
    "Live account examples. Catalog work keeps pages buyable at scale.",
  "amazon-dsp-management.json":
    "Scale context for DSP-ready brands—not DSP-only attribution claims.",
  "amazon-reporting-analytics.json":
    "Live tool views. Examples vary by account.",
};

for (const [file, callout] of Object.entries(callouts)) {
  const p = path.join("content/config/services", file);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  const mod = (data.modules || []).find((m) => m.type === "browserProof");
  if (!mod) continue;
  mod.callout = callout;
  if (shortSubs[file]) mod.subheading = shortSubs[file];
  // Drop per-image captions under the stage (callout carries the story)
  for (const image of mod.images || []) {
    delete image.caption;
  }
  fs.writeFileSync(p, `${JSON.stringify(data, null, 2)}\n`);
  console.log("tightened", file);
}
