import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/**
 * Convert WP-flattened “tables” into GFM or a chart fence chosen by shape.
 * Cell wording is preserved exactly — never invent metrics.
 */
export const convertFlatTables: SanitizePlugin = (content) => {
  const lines = content.split("\n");
  const out: string[] = [];
  const transforms: { id: string; detail?: string }[] = [];
  let i = 0;
  let converted = 0;

  while (i < lines.length) {
    const headers: string[] = [];
    let j = i;

    while (j < lines.length) {
      const trimmed = lines[j].trim();
      if (!trimmed) {
        if (headers.length > 0) {
          j += 1;
          continue;
        }
        break;
      }
      const boldOnly = trimmed.match(/^\*\*([^*]+)\*\*$/);
      if (!boldOnly) break;
      const text = boldOnly[1].trim();
      if (
        /^(?:Example\s+)?(?:Table|Chart)\b/i.test(text) ||
        /:\s*$/.test(text)
      ) {
        break;
      }
      headers.push(text);
      j += 1;
      while (j < lines.length && !lines[j].trim()) j += 1;
    }

    if (headers.length < 2) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    const cells: string[] = [];
    while (j < lines.length) {
      const trimmed = lines[j].trim();
      if (!trimmed) {
        j += 1;
        const peek = lines[j]?.trim() ?? "";
        if (
          !peek ||
          peek.startsWith("#") ||
          peek.startsWith("*") ||
          peek.startsWith("```")
        ) {
          break;
        }
        continue;
      }
      if (
        trimmed.startsWith("#") ||
        trimmed.startsWith("```") ||
        trimmed.startsWith("*") ||
        trimmed.startsWith("-") ||
        /^\*\*[^*]+\*\*$/.test(trimmed)
      ) {
        break;
      }
      cells.push(trimmed);
      j += 1;
    }

    const cols = headers.length;
    if (cells.length < cols || cells.length % cols !== 0) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    const caption = lastCaption(out);
    const isChart = Boolean(caption && /^(?:Example\s+)?Chart\b/i.test(caption));
    const rows = chunkRows(cells, cols);
    const escape = (v: string) => v.replace(/\|/g, "\\|");

    if (isChart) {
      const chartKind = pickChartKind(headers, rows);
      if (chartKind === "chart-cards") {
        out.push("");
        out.push("```chart-cards");
        out.push(`HEADERS: ${headers.map(escape).join(" | ")}`);
        for (const row of rows) {
          out.push(row.map(escape).join(" | "));
        }
        out.push("```");
        out.push("");
        transforms.push({
          id: "flatTableToChartCards",
          detail: `${cols}x${rows.length}`,
        });
      } else if (chartKind === "chart-ranked") {
        out.push("");
        out.push("```chart-ranked");
        for (const row of rows) {
          const pct = extractPct(row.join(" ")) ?? 0;
          const detail = row.slice(1).join(" — ");
          out.push(
            `${escape(row[0])} | ${escape(detail)} | ${pct}`,
          );
        }
        out.push("```");
        out.push("");
        transforms.push({
          id: "flatTableToChartRanked",
          detail: `${cols}x${rows.length}`,
        });
      } else {
        out.push("");
        out.push("```metric-bars");
        for (const row of rows) {
          const pct = extractPct(row.join(" ")) ?? 0;
          out.push(`${row.map(escape).join(" — ")} | ${pct}`);
        }
        out.push("```");
        out.push("");
        transforms.push({
          id: "flatTableToMetricBars",
          detail: `${cols}x${rows.length}`,
        });
      }
    } else {
      out.push("");
      out.push(`| ${headers.map(escape).join(" | ")} |`);
      out.push(`| ${headers.map(() => "---").join(" | ")} |`);
      for (const row of rows) {
        out.push(`| ${row.map(escape).join(" | ")} |`);
      }
      out.push("");
      transforms.push({
        id: "flatTableToGfm",
        detail: `${cols}x${rows.length}`,
      });
    }

    converted += 1;
    i = j;
  }

  if (converted === 0) {
    return { content, transforms: [] };
  }

  return { content: out.join("\n"), transforms };
};

function pickChartKind(
  headers: string[],
  rows: string[][],
): "chart-cards" | "chart-ranked" | "metric-bars" {
  const joined = rows.map((row) => row.join(" ")).join(" ");
  const qualitative = /\b(High|Moderate|Low|Variable|Medium)\b/i.test(joined);
  const allHavePct = rows.every((row) => extractPct(row.join(" ")) != null);

  // 3-col with % + notes (cost/impact) → chart-cards (renders as bars + notes)
  if (headers.length >= 3 && allHavePct) {
    return "chart-cards";
  }
  if (headers.length >= 3 && qualitative) {
    return "chart-cards";
  }
  if (allHavePct && rows.length >= 3) {
    return "chart-ranked";
  }
  if (allHavePct) {
    return "metric-bars";
  }
  return "chart-cards";
}

function lastCaption(out: string[]): string | null {
  for (let k = out.length - 1; k >= 0; k -= 1) {
    const t = out[k].trim();
    if (!t) continue;
    const m = t.match(/^\*\*([^*]+)\*\*$/);
    return m ? m[1].trim() : null;
  }
  return null;
}

function chunkRows(cells: string[], cols: number): string[][] {
  const rows: string[][] = [];
  for (let c = 0; c < cells.length; c += cols) {
    rows.push(cells.slice(c, c + cols));
  }
  return rows;
}

function extractPct(text: string): number | null {
  const range = text.match(/(\d+)\s*[-–]\s*(\d+)\s*%/);
  if (range) return Math.min(100, Number(range[2]));
  const single = text.match(/(\d+)\s*%/);
  if (single) return Math.min(100, Number(single[1]));
  return null;
}
