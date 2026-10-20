import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createContentRepository } from "../src/infrastructure/content/create-content-repository";
import { buildSitemapEntries } from "../src/lib/seo/build-sitemap-entries";

async function main() {
  const repository = createContentRepository();
  const entries = await buildSitemapEntries(repository);

  const blogCount = entries.filter((entry) => {
    const path = new URL(entry.url).pathname;
    return (
      !path.startsWith("/case-study-") &&
      ![
        "/",
        "/about-us/",
        "/contact/",
        "/free-audit-2/",
        "/case-studies/",
        "/amazon-ppc-management-agency/",
      ].includes(path)
    );
  }).length;

  const report = {
    generatedAt: new Date().toISOString(),
    totalUrls: entries.length,
    blogUrls: blogCount,
    sampleUrls: entries.slice(0, 5).map((entry) => entry.url),
    lastUrl: entries.at(-1)?.url ?? null,
  };

  const reportPath = join(process.cwd(), "docs/qa/sitemap-verification-report.json");
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(JSON.stringify(report, null, 2));

  if (entries.length < 340) {
    console.error(`Expected at least 340 sitemap URLs, got ${entries.length}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
