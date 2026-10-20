# All Services Hub Page Plan

Date: 2026-10-05  
Status: Implemented (pending Playwright verification + staging APPROVE)

## Summary

Build `/services/` hub listing all 15 root service pages in mega-menu taxonomy. Preserve live WordPress `/services/` path. Replace fake mega “View all services” link.

## Locked decisions

- URL: `/services/`
- Detail URLs stay root `/{slug}/`
- Taxonomy: Advertising and Growth; Catalog and Content; Brand and Operations; Channels and DTC
- Claims: verified site stats + existing case studies only

## Sections

1. Hero
2. Capability jump nav
3. Flagship full-service band
4–7. Four category catalogs
8. How the stack works
9. Proof strip
10. Featured results
11. FAQ
12. Final CTA

## Key files

- `content/config/services-index.json`
- `src/app/(marketing)/services/page.tsx`
- `src/components/services/services-index-*.tsx`
- `src/lib/seo/services-index-json-ld.ts`
- Nav/homepage/sitemap/SITE-SEO-MAP/REDIRECT-MAP updates

## Verification

Playwright desktop + mobile after local load; staging redeploy Requires APPROVE.
