# Services Pages Master CONTINUE

Paste this prompt (or say CONTINUE) to advance one service page after Phase 0 foundation.

## RULES

- Project: migrate/build service pages for https://ecomgliders.com/ custom Next.js site.
- Read AGENTS.md + `.cursor/rules` 00, 06, 08, 12, 13 + skills seo-audit + competitive-research + research.
- Evidence language only: Verified / Observed / Assumed / Proposed / Requires confirmation.
- Do not invent metrics, case results, or marketplace claims. Align with homepage markets + FAQ.
- Keep URLs identical to `content/config/services/{slug}.json` filenames (root `/{slug}/`).
- Professional copy. No emoji icons. PO visual system (ink/lime/hard chrome).
- One service page per CONTINUE unless the user says WAVE FOUNDATION.

## QUEUE ORDER (skip completed)

| ID | Slug |
|----|------|
| A1 | full-service-amazon-agency |
| A2 | amazon-ppc-management-agency |
| A3 | amazon-listing-optimization |
| A4 | amazon-content-writing |
| A5 | amazon-visual-creativity |
| A6 | amazon-catalog-management |
| B1 | amazon-dsp-management |
| B2 | amazon-reporting-analytics |
| C1 | amazon-video-creative |
| C2 | amazon-trademark-brand-registry |
| C3 | amazon-company-registration |
| C4 | amazon-product-sourcing |
| D1 | shopify-website-development |
| D2 | tiktok-shop-ads |
| D3 | email-retention-marketing |

## ON EACH CONTINUE

1. Read `docs/ai/SESSION-STATE.md` + `docs/seo/SITE-SEO-MAP.md`; pick next incomplete slug.
2. If Phase 0 foundation incomplete, finish that first.
3. Research gate (backup + 2 competitors + keyword/intent).
4. Update SITE-SEO-MAP row for that URL.
5. Rewrite `content/config/services/{slug}.json` to full conversion architecture.
6. Adjust shared template/schema only if required for this page type.
7. Verify: Playwright desktop+mobile, title/meta/H1, Service+FAQ schema, internal links, no PO copy leak, no fake claims.
8. Log `docs/qa/VERIFICATION-LOG.md` + update SESSION-STATE.
9. STOP and report: STATUS / IMPLEMENTED / VERIFIED / REMAINING / NEXT ACTION.
10. Do not start the next service until the user says CONTINUE or APPROVE.

## DONE definition for a service

- JSON complete for all required sections (including optional `audience` + `differ` when used)
- SEO map row filled
- Schema valid
- Related links work
- Visual PO-aligned
- Verification evidence recorded

## Phase 0 foundation checklist

- [x] This CONTINUE prompt file
- [x] URL inventory service rows
- [x] Redirect notes for service paths
- [x] Service schema `audience` + `differ` (optional)
- [x] PO hard-chrome service page template
- [x] Multi-market `areaServed` in Service JSON-LD
