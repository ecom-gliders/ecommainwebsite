# Services Visual Differentiation CONTINUE

Paste this prompt (or say CONTINUE) to advance one service visual layout after Phase 0 foundation.

## RULES

- Project: custom Next.js service pages for https://ecomgliders.com/
- Read AGENTS.md + `.cursor/rules` 00, 06, 08, 09, 12, 13 + skills research + seo-audit + competitive-research + asset-management.
- Evidence language only: Verified / Observed / Assumed / Proposed / Requires confirmation.
- Do not invent metrics or case results. Prefer growth.ecomgliders.com proofs + existing verified site claims.
- Keep root URLs identical to `content/config/services/{slug}.json`.
- Professional copy. No emoji icons. PO ink/lime/hard chrome.
- Hybrid model: hero+form+FAQ+related+CTA stay; differentiate mid-page with modules.
- One service per CONTINUE unless the user says WAVE FOUNDATION.

## QUEUE (skip completed visual layouts)

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

1. Read `docs/ai/SESSION-STATE.md` + `docs/project/SERVICE-LAYOUT-RECIPES.md`; pick next incomplete visual slug.
2. If Phase 0 incomplete (module schema/renderers + growth inventory + recipes doc + this prompt), finish Phase 0 first.
3. Full research gate for THIS slug only:
   - current page JSON + live local page
   - 2 competitor service-page layout patterns
   - growth.ecomgliders.com proof inventory match
   - decide best modules from catalog
4. Write a short counsel recipe in SESSION-STATE (modules + assets + why). Then implement in the same turn unless the user said RECIPE ONLY.
5. Update `content/config/services/{slug}.json` `modules[]`; download/map growth assets with DOWNLOAD-LOG provenance.
6. Extend shared module components only if this page type needs a new module type.
7. Verify Playwright desktop+mobile: modules visible, claims valid, form intact, SEO/H1/schema ok, no PO leak.
8. Log `docs/qa/VERIFICATION-LOG.md`; mark visual status in SERVICE-LAYOUT-RECIPES; update SESSION-STATE.
9. STOP. Report STATUS / IMPLEMENTED / VERIFIED / REMAINING / NEXT ACTION.
10. Do not start the next service until the user says CONTINUE or APPROVE.

## DONE for a service (visual wave)

- Layout recipe documented
- `modules[]` complete and rendered
- Growth/local proof assets provenance logged (or explicit “no growth asset; used existing verified claim”)
- Visual differentiation vs generic stack is obvious
- Verification evidence recorded

## Phase 0 foundation checklist

- [x] Growth proof inventory + downloads
- [x] Module schema + `ServiceModules` renderers + template wiring
- [x] `docs/project/SERVICE-LAYOUT-RECIPES.md`
- [x] This CONTINUE prompt file
