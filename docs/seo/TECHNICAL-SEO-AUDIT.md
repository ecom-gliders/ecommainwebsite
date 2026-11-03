# Technical SEO Audit

Live technical SEO baseline for the custom site on staging.

**Audit host:** `https://ecom-gliders.vercel.app`  
**Date:** 2026-11-03  
**Status:** Phase 1 pass complete (staging). Production `ecomgliders.com` DNS cutover still pending; re-run after cutover with production host.

## Status

Phase 1 complete on staging with live evidence. Homepage missing alts fixed 2026-11-03 (0 missing Observed on localhost). Lighthouse lab CWV recorded 2026-11-03 against `http://localhost:3002`.

## Metrics recorded (homepage)

### Playwright Navigation Timing (preview, earlier pass)

| Metric | Value | Evidence language |
|--------|-------|-------------------|
| TTFB | ~61 ms | Observed (resource timing on preview) |
| DOMContentLoaded | ~1522 ms | Observed |
| Load event | ~1523 ms | Observed |
| Document transferSize | ~61 KB | Observed (HTML document only; not full page weight) |

### Lighthouse lab (localhost:3002, 2026-11-03)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|------|------|------|----------------|-----|-----|-----|-----|
| Home `/` | 87 | 91 | 100 | 100 | ~2.6–2.9 s | 0.002 | ~80–120 ms |
| PPC service | 94 | 100 | 100 | 100 | ~2.4 s | 0 | ~60 ms |
| Blog sample | 94 | 100 | 96 | 100 | varies | 0 | ~30 ms |

Reports: `docs/qa/lighthouse-home.json`, `lighthouse-service.json`, `lighthouse-blog.json`, `lighthouse-summary.json`.

| Metric | Value | Evidence language |
|--------|-------|-------------------|
| Images on homepage | 76 | Observed (localhost after alt fix) |
| Images missing alt | 0 | Observed (Playwright evaluate) |
| Lighthouse image-alt audit | Pass (score 1) | Verified |
| INP | Not reported in this LH run | Not yet tested (field/CrUX) |

## Technical checks

| Check | Result | Notes |
|-------|--------|-------|
| robots.txt | Pass | HTTP 200. `Allow: /`; `Disallow: /api/`, `/design-system`; Sitemap directive present |
| sitemap.xml | Pass | HTTP 200; 384 `<loc>` entries; urlset namespace present |
| Canonical tags | Pass | Homepage and sampled service/tool/case/blog URLs self-canonical to preview host |
| Meta robots | Pass | Homepage `index, follow` Observed |
| Structured data | Pass | Homepage Organization + WebSite + FAQPage Observed |
| Mobile usability | Pass (prior) | Sitewide responsive QA 2026-10-29 Verified; not re-run this pass |
| HTTPS | Pass | Preview HTTPS Observed |
| Redirect chains | Pass (sampled) | `/`, `/services/`, PPC service, tools, cases, Soft Soft FL blog: single 200, no chain Observed |
| Broken links | Spot only | Sampled key hubs HTTP 200; full crawl Not yet tested |
| Image alt texts | Pass (homepage) | 0/76 missing after 2026-11-03 fix; Lighthouse image-alt Pass |
| Heading hierarchy | Pass (homepage) | Single H1; H2/H3 cascade Observed |

## GSC readiness script

Command: `npx tsx scripts/verify-gsc-readiness.ts https://ecom-gliders.vercel.app`

| Check | Status |
|-------|--------|
| robots-http-200 | pass |
| sitemap-http-200 | pass |
| homepage-http-200 | pass |
| robots-references-sitemap | pass |
| sitemap-xml-valid | pass (384 locs) |
| sitemap-blog-count | pass (>=340) |
| sitemap-canonical-host | pass (preview host) |
| readyForSearchConsole | true |

Local `npm run verify:sitemap` reports 384 total URLs / 367 blog URLs with production host sample locs (`https://ecomgliders.com/...`) from build-time site URL Assumed.

## Soft Soft deploy spot-check

| URL | Title Observed | Notes |
|-----|----------------|-------|
| `/amazon-ppc-marketing-services-in-florida-fl-a-path-to-maximizing-your-sales/` | Amazon PPC Services in Florida \| eCom Gliders | Soft Soft map live after 2026-11-03 push |
| `/services/` | (prior Soft Soft verify 2026-10-30) | CollectionPage + FAQ; no re-edit |
| `/amazon-ppc-management-agency/` | Amazon PPC Management Agency \| eCom Gliders | Soft Soft hype scan 0 hits |
| `/full-service-amazon-agency/` | Full Service Amazon Agency \| eCom Gliders | Soft Soft hype scan 0 hits |
| `/amazon-listing-optimization/` | Amazon Listing Optimization Services \| eCom Gliders | Soft Soft hype scan 0 hits |
| `/free-amazon-tools/` | Free Amazon Tools for Sellers \| eCom Gliders | Soft Soft hype scan 0 hits |
| `/free-amazon-tools/amazon-fba-fee-profit-calculator/` | Amazon FBA Fee Calculator \| Free Tool \| eCom Gliders | Soft Soft hype scan 0 hits |
| `/case-studies/` | Amazon Agency Case Studies \| eCom Gliders | Soft Soft hype scan 0 hits |

Hype pattern scan (skyrocket / game-chang / guaranteed results / 10x your / #1 amazon agency / unlock explosive): 0 hits on sampled Soft Soft service, tools, and case URLs.

## Per-page results (sample)

### Homepage `/`

- Title: Amazon Account Management Agency | eCom Gliders
- Meta: Full-service Amazon account management lead with verified claims + CTA
- H1: Full-service Amazon growth for ambitious FBA brands
- Canonical / OG URL: preview host
- Schema: Organization, WebSite, FAQPage
- Image alts: fixed 2026-11-03

### `/robots.txt`

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /design-system
Sitemap: https://ecom-gliders.vercel.app/sitemap.xml
```

### `/sitemap.xml`

384 URLs. Staging host in live sitemap locs Observed.

## Remaining after Phase 1

1. Optional: improve homepage Lighthouse performance from 87 toward 90+ (LCP/Speed Index)
2. After DNS cutover: re-run GSC readiness against `https://ecomgliders.com` and submit sitemap per `docs/seo/SEARCH-CONSOLE-SUBMIT.md`
3. DNS cutover itself still requires Hostinger confirmation (see `docs/seo/DNS-CUTOVER.md`)
4. Optional: field CWV (CrUX / Search Console) after production cutover
