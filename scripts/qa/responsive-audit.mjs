/**
 * Sitewide overflow + chrome audit at key breakpoints.
 * Usage: node scripts/qa/responsive-audit.mjs
 * Requires: npx playwright, server at PLAYWRIGHT_BASE_URL or http://localhost:3000
 */
import { chromium, devices } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.join("docs", "qa", "screenshots", "responsive-2026-10-29");
const REPORT = path.join("docs", "qa", "responsive-audit-2026-10-29.json");

const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "mobile-lg", width: 430, height: 932 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "wide", width: 1440, height: 900 },
];

const CORE_PAGES = [
  "/",
  "/about-us/",
  "/contact/",
  "/free-audit/",
  "/services/",
  "/faq/",
  "/careers/",
  "/agency-partnership/",
  "/privacy-policy/",
  "/terms-conditions/",
  "/site-map/",
  "/blog/",
  "/case-studies/",
  "/free-amazon-tools/",
];

const SERVICES = [
  "amazon-account-health",
  "amazon-account-operations",
  "amazon-catalog-management",
  "amazon-company-registration",
  "amazon-content-writing",
  "amazon-dsp-management",
  "amazon-inventory-management",
  "amazon-listing-optimization",
  "amazon-ppc-management-agency",
  "amazon-product-launch-services",
  "amazon-product-sourcing",
  "amazon-reporting-analytics",
  "amazon-seller-central-services",
  "amazon-trademark-brand-registry",
  "amazon-video-creative",
  "amazon-visual-creativity",
  "email-retention-marketing",
  "full-service-amazon-agency",
  "shopify-website-development",
  "tiktok-shop-ads",
].map((s) => `/${s}/`);

const CASES = Array.from({ length: 9 }, (_, i) => `/case-study-${i + 1}/`);

const TOOLS = [
  "amazon-fba-fee-profit-calculator",
  "amazon-pnl-calculator",
  "amazon-ppc-conversion-cost-calculator",
  "dispatch-check",
  "gst-calculator",
  "invoice-generator",
  "label-invoice-splitter",
  "monthly-seller-closeout",
  "ppc-performance-dashboard",
  "product-catalog",
  "returns-rto-diagnostic",
  "sku-profitability-leaderboard",
  "tcs-tds-reconciliation",
].map((s) => `/free-amazon-tools/${s}/`);

/** Plan Wave 6: 12 samples — newest / oldest / long / short / code / image-heavy. */
const BLOG_SAMPLES = [
  "/amazon-ppc-hack-slash-acos/",
  "/beyond-optimization-systematic-amazon-growth/",
  "/hidden-architecture-successful-amazon-brands-2026/",
  "/agency-vs-diy-amazon-ppc-hidden-costs/",
  "/ai-for-amazon-sellers-2026/",
  "/a-sellers-guide-to-understanding-demand-pricing-and-competition/",
  "/when-should-you-use-sponsored-display-ads/",
  "/amazon-ppc-hacks-that-actually-increase-profit/",
  "/amazon-ppc-formula-that-scales-without-wasting-budget/",
  "/amazon-ppc-draining-your-wallet/",
  "/reduce-amazon-ad-spend-with-seo-2026/",
  "/amazon-ppc-marketing-services-in-nevada-nv-a-path-to-maximizing-your-sales/",
];

async function pickBlogSamples(page) {
  const fixed = [];
  for (const path of BLOG_SAMPLES) {
    try {
      const res = await page.goto(`${BASE}${path}`, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
      if (res && res.status() < 400) fixed.push(path);
    } catch {
      /* skip missing */
    }
  }
  if (fixed.length >= 8) return fixed.slice(0, 12);
  try {
    await page.goto(`${BASE}/blog/`, { waitUntil: "domcontentloaded", timeout: 60000 });
    const hrefs = await page.$$eval('a[href^="/"]', (as) =>
      [...new Set(as.map((a) => a.getAttribute("href") || ""))]
        .filter(
          (h) =>
            h &&
            h !== "/blog/" &&
            !h.includes("?") &&
            h.split("/").filter(Boolean).length === 1,
        )
        .slice(0, 12),
    );
    return [...new Set([...fixed, ...hrefs.map((h) => (h.endsWith("/") ? h : `${h}/`))])].slice(
      0,
      12,
    );
  } catch {
    return fixed.length ? fixed : BLOG_SAMPLES;
  }
}

async function measureOverflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = doc.clientWidth;
    const overflowX = scrollWidth - clientWidth;
    const offenders = [];
    if (overflowX > 1) {
      const all = Array.from(document.querySelectorAll("body *"));
      for (const el of all) {
        const rect = el.getBoundingClientRect();
        if (rect.width > clientWidth + 2 && rect.right > clientWidth + 2) {
          const tag = el.tagName.toLowerCase();
          const cls = (el.className && typeof el.className === "string"
            ? el.className
            : ""
          )
            .split(/\s+/)
            .slice(0, 3)
            .join(".");
          offenders.push({
            tag,
            id: el.id || "",
            class: cls,
            width: Math.round(rect.width),
            right: Math.round(rect.right),
          });
          if (offenders.length >= 8) break;
        }
      }
    }
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const newsletter = document.querySelector('[data-test-id="beehiiv-embed"], #pre-footer-cta iframe');
    return {
      overflowX: Math.max(0, overflowX),
      scrollWidth,
      clientWidth,
      offenders,
      hasHeader: Boolean(header),
      hasFooter: Boolean(footer),
      hasNewsletterIframe: Boolean(newsletter),
    };
  });
}

async function auditUrl(browser, urlPath, breakpoints, screenshot) {
  const results = [];
  for (const bp of breakpoints) {
    const context = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    let status = "ok";
    let error = null;
    let metrics = null;
    try {
      const res = await page.goto(`${BASE}${urlPath}`, {
        waitUntil: "domcontentloaded",
        timeout: 90000,
      });
      if (!res || res.status() >= 400) {
        status = "http_error";
        error = `HTTP ${res?.status()}`;
      } else {
        await page.waitForTimeout(400);
        metrics = await measureOverflow(page);
        if (metrics.overflowX > 2) status = "overflow";
        if (screenshot && (bp.name === "mobile" || bp.name === "laptop")) {
          const safe = urlPath.replace(/\//g, "_").replace(/^_|_$/g, "") || "home";
          const file = path.join(OUT_DIR, `${safe}__${bp.name}.png`);
          await page.screenshot({ path: file, fullPage: false });
        }
      }
    } catch (e) {
      status = "error";
      error = e instanceof Error ? e.message : String(e);
    }
    results.push({ breakpoint: bp.name, width: bp.width, status, error, metrics });
    await context.close();
  }
  return results;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const probe = await browser.newPage();
  const blogSamples = await pickBlogSamples(probe);
  await probe.close();

  const pages = [
    ...CORE_PAGES,
    ...SERVICES,
    ...CASES,
    "/free-amazon-tools/",
    ...TOOLS,
    ...blogSamples.slice(0, 12),
  ];

  const unique = [...new Set(pages)];
  const report = {
    base: BASE,
    generatedAt: new Date().toISOString(),
    pageCount: unique.length,
    findings: [],
  };

  // Inventory: mobile + tablet + laptop; full 5 breakpoints on home (Wave 0/1)
  const inventoryBp = BREAKPOINTS.filter(
    (b) => b.name === "mobile" || b.name === "tablet" || b.name === "laptop",
  );

  for (const urlPath of unique) {
    const screenshot =
      urlPath === "/" ||
      urlPath === "/contact/" ||
      urlPath === "/free-audit/" ||
      urlPath.startsWith("/amazon-ppc") ||
      urlPath === "/free-amazon-tools/" ||
      urlPath === "/when-should-you-use-sponsored-display-ads/";
    const bps = urlPath === "/" ? BREAKPOINTS : inventoryBp;
    const results = await auditUrl(browser, urlPath, bps, screenshot);
    const bad = results.filter((r) => r.status !== "ok");
    report.findings.push({ path: urlPath, results, issueCount: bad.length });
    const flag = bad.length ? "FAIL" : "OK";
    console.log(
      `${flag} ${urlPath} — ${bad.map((b) => `${b.breakpoint}:${b.status}`).join(", ") || "clean"}`,
    );
  }

  // Wave 0 chrome interaction checks (mobile)
  const chromeCtx = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });
  const chromePage = await chromeCtx.newPage();
  const chromeChecks = {
    freeAuditHeaderHref: null,
    mobileNavOpens: false,
    mobileFreeAuditHref: null,
    newsletterVisible: false,
    footerPresent: false,
    overflowX: null,
  };
  try {
    await chromePage.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 90000 });
    await chromePage.waitForTimeout(500);
    chromeChecks.freeAuditHeaderHref = await chromePage
      .locator('header a[href*="free-audit"]')
      .first()
      .getAttribute("href");
    const menuBtn = chromePage.getByRole("button", { name: /menu|open navigation/i }).first();
    if (await menuBtn.count()) {
      await menuBtn.click();
      await chromePage.waitForTimeout(400);
      chromeChecks.mobileNavOpens = await chromePage
        .locator('[role="dialog"], [data-state="open"]')
        .first()
        .isVisible()
        .catch(() => false);
      const sheetAudit = chromePage.locator('[role="dialog"] a[href*="free-audit"]').first();
      if (await sheetAudit.count()) {
        chromeChecks.mobileFreeAuditHref = await sheetAudit.getAttribute("href");
      }
      await chromePage.keyboard.press("Escape");
      await chromePage.waitForTimeout(200);
    }
    await chromePage.locator("#pre-footer-cta").scrollIntoViewIfNeeded();
    chromeChecks.newsletterVisible = await chromePage
      .locator('#pre-footer-cta iframe, [data-test-id="beehiiv-embed"]')
      .first()
      .isVisible();
    chromeChecks.footerPresent = await chromePage.locator("footer").isVisible();
    chromeChecks.overflowX = (await measureOverflow(chromePage)).overflowX;
    await chromePage.screenshot({
      path: path.join(OUT_DIR, "chrome-home__mobile.png"),
      fullPage: false,
    });
  } catch (e) {
    chromeChecks.error = e instanceof Error ? e.message : String(e);
  }
  await chromeCtx.close();
  report.wave0Chrome = chromeChecks;

  await browser.close();
  fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
  const fails = report.findings.filter((f) => f.issueCount > 0);
  const chromeFail =
    chromeChecks.overflowX > 2 ||
    !chromeChecks.newsletterVisible ||
    !String(chromeChecks.freeAuditHeaderHref || "").includes("/free-audit");
  console.log(`\nWave0 chrome: ${JSON.stringify(chromeChecks)}`);
  console.log(`\nDone. Pages: ${unique.length}. Issues: ${fails.length}. Report: ${REPORT}`);
  process.exit(fails.length || chromeFail ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
