import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface SubmissionRecord {
  submittedAt: string;
  property: string;
  sitemapUrl: string;
  searchConsoleStatus: string;
  discoveredUrls?: number;
  submittedBy?: string;
}

interface VerificationCheck {
  id: string;
  status: "pass" | "fail" | "skip";
  detail: string;
}

const SUBMISSION_PATH = join(process.cwd(), "docs/qa/search-console-submission.json");
const TEMPLATE_PATH = join(process.cwd(), "docs/qa/search-console-submission.template.json");

function isValidIsoDate(value: string): boolean {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed);
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

async function fetchSitemapUrlCount(sitemapUrl: string): Promise<number | null> {
  try {
    const response = await fetch(sitemapUrl, { redirect: "follow" });
    if (!response.ok) {
      return null;
    }
    const xml = await response.text();
    return (xml.match(/<loc>/g) ?? []).length;
  } catch {
    return null;
  }
}

async function main() {
  const checks: VerificationCheck[] = [];

  if (!existsSync(SUBMISSION_PATH)) {
    checks.push({
      id: "submission-file-exists",
      status: "fail",
      detail: `Missing ${SUBMISSION_PATH}. Copy ${TEMPLATE_PATH}, submit sitemap in Search Console, then save confirmation.`,
    });

    const report = {
      generatedAt: new Date().toISOString(),
      submissionVerified: false,
      checks,
      nextStep: "Submit sitemap in Google Search Console per docs/seo/SEARCH-CONSOLE-SUBMIT.md",
    };

    console.log(JSON.stringify(report, null, 2));
    process.exit(1);
  }

  checks.push({
    id: "submission-file-exists",
    status: "pass",
    detail: SUBMISSION_PATH,
  });

  let record: SubmissionRecord;
  try {
    record = JSON.parse(readFileSync(SUBMISSION_PATH, "utf8")) as SubmissionRecord;
  } catch (error) {
    checks.push({
      id: "submission-json-valid",
      status: "fail",
      detail: `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
    });
    process.exit(1);
  }

  checks.push({
    id: "submission-json-valid",
    status: "pass",
    detail: "JSON parsed successfully",
  });

  const requiredFields: Array<keyof SubmissionRecord> = [
    "submittedAt",
    "property",
    "sitemapUrl",
    "searchConsoleStatus",
  ];

  for (const field of requiredFields) {
    const value = record[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      checks.push({
        id: `field-${field}`,
        status: "fail",
        detail: `Missing or empty required field: ${field}`,
      });
    } else {
      checks.push({
        id: `field-${field}`,
        status: "pass",
        detail: `${field} present`,
      });
    }
  }

  if (record.submittedAt && !isValidIsoDate(record.submittedAt)) {
    checks.push({
      id: "submitted-at-iso",
      status: "fail",
      detail: "submittedAt must be ISO-8601",
    });
  } else if (record.submittedAt) {
    checks.push({
      id: "submitted-at-iso",
      status: "pass",
      detail: record.submittedAt,
    });
  }

  if (record.property && !isValidHttpUrl(record.property)) {
    checks.push({
      id: "property-url",
      status: "fail",
      detail: "property must be a valid URL",
    });
  } else if (record.property) {
    checks.push({
      id: "property-url",
      status: "pass",
      detail: record.property,
    });
  }

  if (record.sitemapUrl && !isValidHttpUrl(record.sitemapUrl)) {
    checks.push({
      id: "sitemap-url",
      status: "fail",
      detail: "sitemapUrl must be a valid URL",
    });
  } else if (record.sitemapUrl) {
    checks.push({
      id: "sitemap-url",
      status: "pass",
      detail: record.sitemapUrl,
    });
  }

  const statusNormalized = record.searchConsoleStatus?.trim().toLowerCase() ?? "";
  if (statusNormalized === "success" || statusNormalized === "submitted") {
    checks.push({
      id: "search-console-status",
      status: "pass",
      detail: record.searchConsoleStatus,
    });
  } else {
    checks.push({
      id: "search-console-status",
      status: "fail",
      detail: `Expected searchConsoleStatus "Success" or "Submitted"; got "${record.searchConsoleStatus ?? ""}"`,
    });
  }

  if (record.sitemapUrl && record.property) {
    try {
      const sitemapHost = new URL(record.sitemapUrl).origin;
      const propertyOrigin = new URL(record.property).origin;
      if (sitemapHost === propertyOrigin || record.property.includes(sitemapHost.replace("https://", ""))) {
        checks.push({
          id: "property-sitemap-host-match",
          status: "pass",
          detail: "Sitemap host matches property",
        });
      } else {
        checks.push({
          id: "property-sitemap-host-match",
          status: "fail",
          detail: `Property ${propertyOrigin} does not match sitemap host ${sitemapHost}`,
        });
      }
    } catch {
      checks.push({
        id: "property-sitemap-host-match",
        status: "skip",
        detail: "Could not compare property and sitemap hosts",
      });
    }
  }

  if (record.sitemapUrl) {
    const liveCount = await fetchSitemapUrlCount(record.sitemapUrl);
    if (liveCount === null) {
      checks.push({
        id: "sitemap-live-fetch",
        status: "fail",
        detail: `Could not fetch live sitemap at ${record.sitemapUrl}`,
      });
    } else {
      checks.push({
        id: "sitemap-live-fetch",
        status: "pass",
        detail: `Live sitemap has ${liveCount} URLs`,
      });

      if (typeof record.discoveredUrls === "number") {
        const delta = Math.abs(record.discoveredUrls - liveCount);
        if (delta <= 5) {
          checks.push({
            id: "discovered-url-count",
            status: "pass",
            detail: `Reported ${record.discoveredUrls} vs live ${liveCount}`,
          });
        } else {
          checks.push({
            id: "discovered-url-count",
            status: "fail",
            detail: `Reported ${record.discoveredUrls} differs from live ${liveCount} by more than 5`,
          });
        }
      }
    }
  }

  const failed = checks.filter((check) => check.status === "fail");
  const submissionVerified = failed.length === 0;

  const reportPath = join(process.cwd(), "docs/qa/search-console-submission-verification.json");
  const report = {
    generatedAt: new Date().toISOString(),
    submissionVerified,
    record: {
      submittedAt: record.submittedAt,
      property: record.property,
      sitemapUrl: record.sitemapUrl,
      searchConsoleStatus: record.searchConsoleStatus,
      discoveredUrls: record.discoveredUrls,
      submittedBy: record.submittedBy,
    },
    checks,
  };

  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
  process.exit(submissionVerified ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
