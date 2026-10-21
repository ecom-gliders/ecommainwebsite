# Blog migration status (2026-10-22)

## Counts

| Source | Count | Confidence |
|--------|------:|------------|
| WordPress backup inventory (`backup/metadata/blog-inventory.json`) | 328 | Verified |
| WordPress API dump (`backup/metadata/api/posts-all.json`) | 328 | Verified |
| Local MDX (`content/blog/*.mdx`) | 328 | Verified |
| Prior migration report (`docs/qa/blog-migration-report.json`, 2026-09-02) | 328 written, 0 failures | Verified |
| Live WP REST (`/wp-json/wp/v2/posts`) | Blocked (Cloudflare 403) | Observed 2026-10-22 |

**Missing posts vs inventory:** 0  
**Extra local posts:** 0  
**Short-body posts (&lt;200 chars):** 0  

## Templates

Documented in `docs/project/BLOG-TEMPLATES.md`.

Implemented:

- Post template: breadcrumb, H1, meta, featured image, TOC, markdown body, FAQ, author, related, CTA
- Index template: card grid with featured images + `?page=` pagination (24/page)

## Images

- Localization complete (`docs/qa/blog-image-localization-report.json`):
  - Unique remote URLs: **227**
  - Downloaded: **219**
  - MDX files rewritten to local `/images/blog/…`: **328**
  - Failures (404 on WP): **8** (escaped underscore URL variants / missing originals — listed in report)
- Next.js still allows remote `ecomgliders.com` via `remotePatterns` as fallback for any remaining remote refs.

## Links (verified 2026-10-22)

Source of truth: WordPress backup `backup/metadata/api/posts-all.json` (not live GitHub scrape). Full reports: `docs/qa/blog-link-audit-report.json`, `docs/qa/blog-body-link-gap-report.json`.

| Layer | Result | Confidence |
|-------|--------|------------|
| Post count / URLs | 328/328 MDX; URL check 328 pass (`blog-url-verification-report.json`) | Verified |
| External links in article body | WP **705** hrefs → MDX **682** (~23 gaps; see below) | Verified |
| Internal article-to-article links in body | Mostly preserved; **1** bad target slug in MDX: `/reduce-amazo-acos-2025` | Verified |
| WP theme chrome in `content.rendered` | **~9,459** hrefs (categories, authors, date archives, related-post strip) | Verified — intentionally not in MDX; related/CTA live in post template |
| Site CTAs still inside some MDX bodies | `/request-a-quote` (219), `/get-in-touch` (59), `/contact`, `/services`, etc. | Observed — several target pages not built yet or need redirects |
| Privacy/terms in WP body | `/privacy-policy-2` + `/terms-conditions-2` missing from MDX (**115** posts each) | Verified gap |

**External gaps (sample):** Calendly CTAs, a few citation URLs, Font Awesome CDN stylesheet hrefs (noise). Full list in `blog-body-link-gap-report.json`.

**Internal links that will 404 until routes/redirects exist:** `/request-a-quote`, `/get-in-touch`, `/amazon-ppc-management-agency`, `/full-service-amazon-agency`, `/case-study-1`, `/services-2`, `/category/*`, `/author/*`, `/tag/*`, date archives. Existing Next routes that do resolve when linked: `/`, `/blog`, `/contact`, `/about-us`, `/services`, `/case-studies`, `/free-audit-2`, and blog `[slug]` posts.

## Gaps / notes

1. Live site re-crawl blocked by Cloudflare — inventory is from backup export, not live re-verify today.
2. **8** image URLs returned 404 from WordPress during localization (see report `failures`).
3. Sitewide non-blog broken-image audit was **cancelled** per user request (2026-10-22).
4. Link remediation (redirect map for CTAs, privacy/terms, fix typo slug) not started — report only.

