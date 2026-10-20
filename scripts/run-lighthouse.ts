import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface AuditTarget {
  id: string;
  path: string;
}

const DEFAULT_BASE_URL = "http://localhost:3002";

const TARGETS: AuditTarget[] = [
  { id: "home", path: "/" },
  { id: "service", path: "/amazon-ppc-management-agency/" },
  {
    id: "blog",
    path: "/when-should-you-use-sponsored-display-ads/",
  },
];

function runLighthouse(url: string, outputPath: string): number {
  const result = spawnSync(
    "npx",
    [
      "lighthouse",
      url,
      "--output=json",
      `--output-path=${outputPath}`,
      "--quiet",
      "--chrome-flags=--headless --no-sandbox --disable-gpu",
      "--only-categories=performance,accessibility,best-practices,seo",
    ],
    {
      encoding: "utf8",
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    return result.status ?? 1;
  }

  return 0;
}

function readScores(outputPath: string): Record<string, number | null> {
  const report = JSON.parse(readFileSync(outputPath, "utf8")) as {
    categories?: Record<string, { score?: number | null }>;
    runtimeError?: { message?: string };
  };

  if (report.runtimeError?.message) {
    console.error(`Runtime error: ${report.runtimeError.message}`);
  }

  const categories = report.categories ?? {};

  return {
    performance: categories.performance?.score ?? null,
    accessibility: categories.accessibility?.score ?? null,
    bestPractices: categories["best-practices"]?.score ?? null,
    seo: categories.seo?.score ?? null,
  };
}

function main() {
  const baseUrl = process.argv[2] ?? DEFAULT_BASE_URL;
  const outputDir = join(process.cwd(), "docs/qa");
  mkdirSync(outputDir, { recursive: true });

  const summary: Array<{
    id: string;
    url: string;
    scores: Record<string, number | null>;
    reportPath: string;
  }> = [];

  let failed = false;

  for (const target of TARGETS) {
    const url = new URL(target.path, baseUrl).toString();
    const reportPath = join(outputDir, `lighthouse-${target.id}.json`);

    console.log(`Auditing ${url}`);
    const exitCode = runLighthouse(url, reportPath);

    if (exitCode !== 0) {
      failed = true;
      continue;
    }

    const scores = readScores(reportPath);
    summary.push({ id: target.id, url, scores, reportPath });

    for (const [category, score] of Object.entries(scores)) {
      const formatted = score === null ? "n/a" : Math.round(score * 100);
      console.log(`  ${category}: ${formatted}`);
    }
  }

  const summaryPath = join(outputDir, "lighthouse-summary.json");
  writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);

  const belowTarget = summary.flatMap((entry) =>
    Object.entries(entry.scores)
      .filter(([, score]) => score !== null && score < 0.9)
      .map(([category, score]) => ({
        id: entry.id,
        category,
        score: Math.round((score ?? 0) * 100),
      })),
  );

  if (belowTarget.length > 0) {
    console.error("Scores below 90:");
    console.error(JSON.stringify(belowTarget, null, 2));
    process.exit(1);
  }

  if (failed) {
    process.exit(1);
  }

  console.log(`Summary written to ${summaryPath}`);
}

main();
