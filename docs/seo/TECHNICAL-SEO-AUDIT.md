# Technical SEO Audit

Live technical SEO baseline for the custom site on staging.

**Audit host:** `https://ecom-gliders.vercel.app`  
**Date:** 2026-11-03  
**Status:** Phase 1 pass complete (staging). Production `ecomgliders.com` DNS cutover still pending; re-run after cutover with production host.

## Status

Phase 1 complete on staging with live evidence. Core Web Vitals (LCP/CLS/INP) not lab-measured this pass; Navigation Timing TTFB/DOM recorded instead. Lighthouse lab run Remains optional follow-up (`npm run audit:lighthouse`).

## Metrics recorded (homepage, Playwright Navigation Timing)

| Metric | Value | Evidence language |
|--------|-------|-------------------|
| TTFB | ~61 ms | Observed (resource timing on preview) |
| DOMContentLoaded | ~1522 ms | Observed |
| Load event | ~1523 ms | Observed |
| Document transferSize | ~61 KB | Observed (HTML document only; not full page weight) |
| Images on homepage | 71 | Observed |
| Images missing alt | 35 | Observed (mostly marketplace flags + case/creative thumbs) |
| LCP / CLS / INP | Not measured | Not yet tested (lab Lighthouse) |

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
| Image alt texts | Partial fail | Homepage 35/71 missing alt (flags + thumbs). IMPROVE backlog |
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
- IMPROVE: add alt (or aria-hidden) for flag icons and proof thumbs

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

1. Optional: Lighthouse CWV lab on homepage + PPC + blog sample
2. IMPROVE: homepage missing image alts (flags / thumbs)
3. After DNS cutover: re-run GSC readiness against `https://ecomgliders.com` and submit sitemap per `docs/seo/SEARCH-CONSOLE-SUBMIT.md`
4. DNS cutover itself still requires Hostinger confirmation (see `docs/seo/DNS-CUTOVER.md`)
