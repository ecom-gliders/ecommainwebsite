import { existsSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { loadBlogInventory } from "./helpers/blog-inventory";

interface UrlFailure {
  slug: string;
  status: number;
  reason: string;
}

interface VerificationReport {
  generatedAt: string;
  baseUrl: string;
  expectedCount: number;
  passedCount: number;
  failedCount: number;
  failures: UrlFailure[];
}

const inventory = loadBlogInventory();
const blogDir = join(process.cwd(), "content/blog");
const BATCH_SIZE = 16;

async function verifyBlogUrl(
  request: import("@playwright/test").APIRequestContext,
  entry: { slug: string },
): Promise<UrlFailure | null> {
  const response = await request.get(`/${entry.slug}`);
  const status = response.status();

  if (status !== 200) {
    return {
      slug: entry.slug,
      status,
      reason: `Unexpected HTTP status ${status}`,
    };
  }

  const body = await response.text();

  if (!body.includes('id="main-content"')) {
    return {
      slug: entry.slug,
      status,
      reason: "Missing main content landmark",
    };
  }

  if (!body.includes("<h1")) {
    return {
      slug: entry.slug,
      status,
      reason: "Missing H1 heading",
    };
  }

  if (!body.includes("eCom Gliders")) {
    return {
      slug: entry.slug,
      status,
      reason: "Missing site branding in response",
    };
  }

  return null;
}

test.describe("P3-04 blog URL preservation", () => {
  test("inventory contains 328 blog posts", () => {
    expect(inventory.length).toBe(328);
  });

  test("each inventory slug has a matching MDX file", () => {
    const mdxSlugs = new Set(
      readdirSync(blogDir)
        .filter((filename) => filename.endsWith(".mdx"))
        .map((filename) => filename.replace(/\.mdx$/, "")),
    );

    const missingMdx = inventory
      .filter((entry) => !mdxSlugs.has(entry.slug))
      .map((entry) => entry.slug);

    expect(missingMdx, `Missing MDX for: ${missingMdx.join(", ")}`).toEqual([]);
  });

  test("all 328 blog URLs return HTTP 200 with article markup", async ({
    request,
  }) => {
    test.setTimeout(600_000);

    const failures: UrlFailure[] = [];

    for (let index = 0; index < inventory.length; index += BATCH_SIZE) {
      const batch = inventory.slice(index, index + BATCH_SIZE);
      const results = await Promise.all(
        batch.map((entry) => verifyBlogUrl(request, entry)),
      );

      for (const result of results) {
        if (result) {
          failures.push(result);
        }
      }
    }

    const passedCount = inventory.length - failures.length;
    const report: VerificationReport = {
      generatedAt: new Date().toISOString(),
      baseUrl: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3002",
      expectedCount: inventory.length,
      passedCount,
      failedCount: failures.length,
      failures,
    };

    const reportDir = join(process.cwd(), "docs/qa");
    if (!existsSync(reportDir)) {
      mkdirSync(reportDir, { recursive: true });
    }
    writeFileSync(
      join(reportDir, "blog-url-verification-report.json"),
      `${JSON.stringify(report, null, 2)}\n`,
      "utf-8",
    );

    expect(failures, JSON.stringify(failures, null, 2)).toEqual([]);
    expect(passedCount).toBe(328);
  });

  test("sample blog posts render in browser with expected title", async ({
    page,
  }) => {
    const samples = [
      inventory[0],
      inventory[Math.floor(inventory.length / 2)],
      inventory[inventory.length - 1],
    ];

    for (const entry of samples) {
      await page.goto(`/${entry.slug}`);
      await expect(page.locator("main#main-content h1")).toBeVisible();
      await expect(page).toHaveTitle(new RegExp(entry.title.slice(0, 30), "i"));
    }
  });
});
