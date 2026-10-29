/**
 * Wave 0–1: homepage section overflow + chrome at all 5 breakpoints.
 * Usage: node scripts/qa/responsive-chrome-home-sections.mjs
 */
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const OUT = path.join("docs", "qa", "screenshots", "responsive-2026-10-29");
const REPORT = path.join("docs", "qa", "responsive-home-sections-2026-10-29.json");

const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "mobile-lg", width: 430, height: 932 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "wide", width: 1440, height: 900 },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = { base: BASE, generatedAt: new Date().toISOString(), breakpoints: [] };

  for (const bp of BREAKPOINTS) {
    const ctx = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(600);

    const data = await page.evaluate(() => {
      const clientWidth = document.documentElement.clientWidth;
      const overflowX =
        Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - clientWidth;
      const sections = Array.from(
        document.querySelectorAll("main section, main [data-section], #pre-footer-cta, footer"),
      ).map((el, i) => {
        const rect = el.getBoundingClientRect();
        const id = el.id || el.getAttribute("data-section") || el.tagName.toLowerCase();
        const wide = rect.width > clientWidth + 2 || rect.right > clientWidth + 2;
        return {
          index: i,
          id,
          tag: el.tagName.toLowerCase(),
          width: Math.round(rect.width),
          right: Math.round(rect.right),
          overflows: wide,
          class: (typeof el.className === "string" ? el.className : "")
            .split(/\s+/)
            .slice(0, 4)
            .join("."),
        };
      });
      return {
        overflowX: Math.max(0, overflowX),
        sectionCount: sections.length,
        overflowingSections: sections.filter((s) => s.overflows),
        sectionIds: sections.map((s) => s.id),
        hasHeader: Boolean(document.querySelector("header")),
        hasPreFooter: Boolean(document.querySelector("#pre-footer-cta")),
        hasNewsletter: Boolean(
          document.querySelector('[data-test-id="beehiiv-embed"], #pre-footer-cta iframe'),
        ),
        freeAuditLinks: Array.from(
          document.querySelectorAll('a[href*="free-audit"]'),
        ).map((a) => a.getAttribute("href")),
      };
    });

    await page.screenshot({
      path: path.join(OUT, `home-sections__${bp.name}.png`),
      fullPage: false,
    });

    // Scroll mid-page + footer for secondary shots
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4));
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(OUT, `home-mid__${bp.name}.png`),
      fullPage: false,
    });
    await page.locator("#pre-footer-cta, footer").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(OUT, `home-footer__${bp.name}.png`),
      fullPage: false,
    });

    const status =
      data.overflowX > 2 || data.overflowingSections.length > 0 ? "FAIL" : "OK";
    report.breakpoints.push({ ...bp, status, ...data });
    console.log(
      `${status} home @${bp.name} overflowX=${data.overflowX} sections=${data.sectionCount} offenders=${data.overflowingSections.length}`,
    );
    await ctx.close();
  }

  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
  const fails = report.breakpoints.filter((b) => b.status === "FAIL");
  console.log(`\nHome sections report: ${REPORT}. Fails: ${fails.length}`);
  await browser.close();
  process.exit(fails.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
