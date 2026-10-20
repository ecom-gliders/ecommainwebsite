import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

interface AuditTarget {
  id: string;
  path: string;
  name: string;
}

const AUDIT_TARGETS: AuditTarget[] = [
  { id: "home", path: "/", name: "Homepage" },
  {
    id: "service",
    path: "/amazon-ppc-management-agency/",
    name: "Service page",
  },
  {
    id: "blog",
    path: "/when-should-you-use-sponsored-display-ads/",
    name: "Blog post",
  },
  { id: "contact", path: "/contact/", name: "Contact page" },
  { id: "about", path: "/about-us/", name: "About page" },
  {
    id: "case-studies",
    path: "/case-studies/",
    name: "Case studies index",
  },
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

interface PageAuditSummary {
  id: string;
  name: string;
  path: string;
  violationCount: number;
  violations: Array<{
    id: string;
    impact: string | null | undefined;
    description: string;
    help: string;
    nodes: number;
  }>;
}

const summaries: PageAuditSummary[] = [];

for (const target of AUDIT_TARGETS) {
  test(`WCAG AA axe clean — ${target.name}`, async ({ page }, testInfo) => {
    test.setTimeout(60_000);

    await page.goto(target.path, { waitUntil: "load" });
    await page.locator("main#main-content, main").first().waitFor({
      state: "visible",
      timeout: 15_000,
    });

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    const violations = results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      help: violation.help,
      nodes: violation.nodes.length,
      targets: violation.nodes.map((node) => node.target),
    }));

    summaries.push({
      id: target.id,
      name: target.name,
      path: target.path,
      violationCount: violations.length,
      violations: violations.map(({ targets, ...rest }) => rest),
    });

    const reportDir = join(process.cwd(), "docs/qa");
    mkdirSync(reportDir, { recursive: true });

    writeFileSync(
      join(reportDir, `axe-${target.id}.json`),
      `${JSON.stringify({ target, tags: WCAG_TAGS, violations }, null, 2)}\n`,
    );

    await testInfo.attach(`axe-${target.id}`, {
      body: JSON.stringify(violations, null, 2),
      contentType: "application/json",
    });

    expect(
      violations,
      `${target.name} has ${violations.length} WCAG AA violation(s)`,
    ).toEqual([]);
  });
}

test.afterAll(() => {
  const reportDir = join(process.cwd(), "docs/qa");
  mkdirSync(reportDir, { recursive: true });

  const summary = {
    generatedAt: new Date().toISOString(),
    standard: "WCAG 2.1 Level AA",
    tags: WCAG_TAGS,
    pagesAudited: summaries.length,
    totalViolations: summaries.reduce(
      (total, page) => total + page.violationCount,
      0,
    ),
    pages: summaries,
  };

  writeFileSync(
    join(reportDir, "accessibility-audit-summary.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
  );
});
