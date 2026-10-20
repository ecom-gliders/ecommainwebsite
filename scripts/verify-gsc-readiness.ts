import { writeFileSync } from "node:fs";
import { join } from "node:path";

interface ReadinessCheck {
  id: string;
  status: "pass" | "fail";
  detail: string;
}

const DEFAULT_BASE_URL = "https://ecom-gliders.vercel.app";

async function fetchStatus(url: string): Promise<number> {
  const response = await fetch(url, { redirect: "follow" });
  return response.status;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.text();
}

function countSitemapUrls(xml: string): number {
  return (xml.match(/<loc>/g) ?? []).length;
}

async function main() {
  const baseUrl = (process.argv[2] ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  const checks: ReadinessCheck[] = [];

  const robotsUrl = `${baseUrl}/robots.txt`;
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  const homepageUrl = `${baseUrl}/`;

  const [robotsStatus, sitemapStatus, homepageStatus] = await Promise.all([
    fetchStatus(robotsUrl),
    fetchStatus(sitemapUrl),
    fetchStatus(homepageUrl),
  ]);

  checks.push({
    id: "robots-http-200",
    status: robotsStatus === 200 ? "pass" : "fail",
    detail: `${robotsUrl} → HTTP ${robotsStatus}`,
  });

  checks.push({
    id: "sitemap-http-200",
    status: sitemapStatus === 200 ? "pass" : "fail",
    detail: `${sitemapUrl} → HTTP ${sitemapStatus}`,
  });

  checks.push({
    id: "homepage-http-200",
    status: homepageStatus === 200 ? "pass" : "fail",
    detail: `${homepageUrl} → HTTP ${homepageStatus}`,
  });

  const robots = await fetchText(robotsUrl);
  const sitemapReference = robots.includes("Sitemap:") && robots.includes("/sitemap.xml");
  checks.push({
    id: "robots-references-sitemap",
    status: sitemapReference ? "pass" : "fail",
    detail: sitemapReference
      ? "robots.txt includes Sitemap directive"
      : "robots.txt missing Sitemap directive",
  });

  const sitemapXml = await fetchText(sitemapUrl);
  const urlCount = countSitemapUrls(sitemapXml);
  const validXml =
    sitemapXml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') &&
    urlCount >= 340;

  checks.push({
    id: "sitemap-xml-valid",
    status: validXml ? "pass" : "fail",
    detail: `urlset namespace present; ${urlCount} <loc> entries`,
  });

  checks.push({
    id: "sitemap-blog-count",
    status: urlCount >= 340 ? "pass" : "fail",
    detail: `Expected at least 340 URLs (328 blog + static); found ${urlCount}`,
  });

  const sitemapUsesBaseUrl = sitemapXml.includes(`<loc>${baseUrl}/`);
  checks.push({
    id: "sitemap-canonical-host",
    status: sitemapUsesBaseUrl ? "pass" : "fail",
    detail: sitemapUsesBaseUrl
      ? `Sitemap loc URLs use ${baseUrl}`
      : `Sitemap loc URLs do not match ${baseUrl}`,
  });

  const failed = checks.filter((check) => check.status === "fail");

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    sitemapSubmitUrl: sitemapUrl,
    robotsUrl,
    urlCount,
    checks,
    readyForSearchConsole: failed.length === 0,
    submissionNote:
      "Submit sitemapSubmitUrl in Google Search Console → Sitemaps after property verification.",
  };

  const reportPath = join(process.cwd(), "docs/qa/search-console-readiness.json");
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));

  if (failed.length > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
