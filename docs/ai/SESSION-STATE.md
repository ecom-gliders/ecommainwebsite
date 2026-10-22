## Current objective

Blog detail editorial shell + config-driven block registry shipped. DNS cutover still pending Hostinger DNS.

## Latest (2026-10-23) — Secondary copy thickened sitewide

- Case cards + ~60 components: `font-normal` secondary → `font-medium`
- SectionHeading / CardDescription default medium
- textSecondary darkened `#4F4F4A` → `#3F3F3A`
- Prior: global body 18/500 scale (AMZ Dudes-like)

## Prior (2026-10-22) — Canonical media locked + deployed

- Canonical: `blog-blocks.json#canonical` + `design-system.json#blogEditorial`
- Charts: `chart-cards` = column bars + notes; figures = ink frame; video = YT/Vimeo embed
- Build: clean (`next build` exit 0)
- Deploy: https://ecomgliders-site.vercel.app (READY; Vercel auth protection on)
- Inspect: https://vercel.com/faizanmayo786s-projects/ecomgliders-site/7jSYmBX3tAeTPF1E2myZoLqki6Ts

## Prior (2026-10-22) — Blog shell v2 + design catalog

- Rail: Share first → Ask AI (article prompt) → 3 compact takeaways
- TOC: major sections when many numbered subs; nested when sparse
- Charts: `chart-cards` / `chart-ranked` / `metric-bars` / `stat-row` / `compare-columns`
- Related articles: editorial list (not card grid)
- Catalog (noindex): `/design-system/blog`
- Free consultation page: deferred; CTAs stay Contact/Free Audit
- Sample: http://localhost:3003/2025-amazon-algorithm-updates-what-sellers-need-to-know/

## Prior (2026-10-22) — Blog convert-all + editorial shell

- Config: `content/config/blog-blocks.json` + `src/lib/blog/blocks/` registry
- Sanitize plugins (convert-first): feature-grid, steps, tips, CSS strip, emoji cleanup; batch on 328 MDX
- Shell: editorial hero, smooth TOC, sticky share rail
- Docs: `BLOG-BLOCKS.md`, updated `BLOG-TEMPLATES.md`

## Prior (2026-10-22) — Blog body sanitize / themed blocks

- Inventory: `scripts/migration/inventory-dirty-mdx.mjs` → `docs/qa/BLOG-DIRTY-MDX-INVENTORY.json`
- Sanitize lib + batch: `sanitizeBlogMarkdown` + `sanitize-blog-mdx.ts --write` (backup under `backup/blog-mdx-sanitize/`)
- Renderer: GFM tables, `BlogFeatureGrid`, `BlogCallout`; no `rehype-raw`
- Verified: production build; Playwright spot-check FBA / fee / strategic-leverage posts

## Prior (2026-10-22) — Footer recent content

- Footer keeps 4 service columns unchanged
- Injects **Latest articles** (3 recent posts + All articles) and **Latest case studies** (featured/newest 3 + All case studies) before Company/Contact
- Driven from `getRecentBlogPosts` + `getCaseStudies` via `select-footer-recent-links.ts`

## Prior (2026-10-22) — Footer redesign

- Brand band (logo, tagline, Free Audit, partner, social) + directory columns
- Groups: Advertising, Catalog, Launch & Ops, Brand & Channels, Company, Contact
- Legal in bottom bar; mobile stack with hairline dividers and min 44px tap targets

## Prior (2026-10-21) — Service depth + mega menu balance

- Services mega: 4 columns × 5 links; column 3 = Launch and Operations (council middle)
- Depth upgrades: launch, inventory, seller-central, account-health, account-operations (proof + board + opsLanes + FAQ 6–7 + case cards)
- Inventory layout moved to `account-ops`; slug-specific FAQ/related tails on account-ops template

## Prior (2026-10-21) — Accent contrast (council)

- Light metrics: ink + accent left rule (case outcomes, featured case, depth numbers, service grid light tiles)
- Lime text kept on dark punch cards / ink sections
- Documented in `design-system.json` + `DECISIONS.md`

## Prior (2026-10-21) — Missing subservice pages (AMZ Dudes-style)

Created dedicated service pages for previously missing includes / hub rail items:
- `/amazon-product-launch-services/`
- `/amazon-inventory-management/`
- `/amazon-seller-central-services/`
- `/amazon-account-operations/` (cross-service alignment)
- `/amazon-account-health/`
Wired into nav mega-menu, services hub capability rail 05–08, full-service relatedServices, SITE-SEO-MAP.
- Parallel blocker: Hostinger DNS for apex cutover

## Current phase

Pushed to https://github.com/faizanMayo786/ecomgliders-site (`main`). Staging: https://ecom-gliders.vercel.app. DNS cutover: see `docs/seo/DNS-CUTOVER.md`.

## Completed (cutover)

- Attached `ecomgliders.com` + `www.ecomgliders.com` to project (API)
- WWW → apex 308 redirect configured
- Cutover runbook: `docs/seo/DNS-CUTOVER.md` with exact TXT / A / CNAME values

## Blocker

Hostinger hPanel login required to publish DNS. Current NS Observed: `ns1.dns-parking.com` / `ns2.dns-parking.com`. Live WP still serves apex until A/CNAME change.

## User action (required)

In Hostinger DNS for `ecomgliders.com`, add records from `docs/seo/DNS-CUTOVER.md`, then reply **verify dns** so we can:

1. `vercel domains verify` apex + www  
2. Set `NEXT_PUBLIC_SITE_URL=https://ecomgliders.com`  
3. Redeploy production  
4. Smoke-check live URLs  

## Live

- Staging / current prod alias: https://ecom-gliders.vercel.app
- Apex cutover: pending DNS
