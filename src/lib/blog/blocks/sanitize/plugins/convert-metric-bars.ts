import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/**
 * Recover AAM-style bar chart values from leftover CSS `--val: N%`
 * paired with nearby label text patterns when present in the dump.
 * If only --val values exist without labels, skip (avoid inventing copy).
 */
export const convertMetricBars: SanitizePlugin = (content) => {
  if (!/\.aam-|--val\s*:/.test(content)) {
    return { content, transforms: [] };
  }

  // Prefer explicit markdown-ish rows already in prose; otherwise parse CSS vars
  // Pattern in dumps: .bar { --val: 95%; } near labels is unreliable.
  // Look for lines like: Label text then --val in same CSS neighborhood.
  const vals = [...content.matchAll(/--val\s*:\s*(\d+(?:\.\d+)?)%/gi)].map(
    (m) => Number.parseFloat(m[1]),
  );

  // Known AAM legend labels that appear as prose near the chart in this corpus
  const labelBlock = content.match(
    /Time Saved[\s\S]{0,200}Profit Increase[\s\S]{0,400}/i,
  );

  if (vals.length < 2) {
    return { content, transforms: [] };
  }

  // If we find structured "Label | N%" already, emit fence from those
  const pipeRows = [
    ...content.matchAll(
      /^([A-Za-z][A-Za-z0-9 &/%.'-]{2,60})\s*\|\s*(\d+(?:\.\d+)?)\s*%?\s*$/gm,
    ),
  ];
  if (pipeRows.length >= 2) {
    const fence = [
      "```metric-bars",
      ...pipeRows.map((r) => `${r[1].trim()} | ${r[2]}`),
      "```",
    ].join("\n");
    return {
      content: content.replace(pipeRows[0][0], fence),
      transforms: [{ id: "metricBars", detail: `${pipeRows.length}` }],
    };
  }

  void labelBlock;
  return { content, transforms: [] };
};
