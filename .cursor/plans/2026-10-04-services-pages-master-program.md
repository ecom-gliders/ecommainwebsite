# Services Pages Master Program

Date: 2026-10-04  
Status: COMPLETE locally — Phase 0 + Waves A–D (15/15) + cross-link audit; staging deploy Requires confirmation

## Goal

Rewrite all 15 service pages as conversion-focused, SEO-complete pages on root `/{slug}/` URLs with PO visual system and verified claims only.

## Phase 0 (foundation)

| Deliverable | Path | Status |
|-------------|------|--------|
| Master CONTINUE prompt | `.cursor/prompts/SERVICES-MASTER-CONTINUE.md` | Done |
| URL inventory services | `docs/seo/URL-INVENTORY.md` | Done |
| Redirect notes | `docs/seo/REDIRECT-MAP.md` | Done |
| Schema audience + differ | `src/domain/content/schemas/service-page.schema.ts` | Done |
| PO service template | `src/components/services/service-page-template.tsx` | Done |
| Multi-market Service JSON-LD | `src/lib/seo/service-page-json-ld.ts` | Done |

## Waves

| Wave | Slugs | Status |
|------|-------|--------|
| A | A1–A6 core Amazon | Done (2026-10-04) |
| B | B1 DSP, B2 Reporting | Done (2026-10-04) |
| C | C1–C4 ops | Done (2026-10-04) |
| D | D1 Shopify, D2 TikTok, D3 Email | Done (2026-10-04) |

## Closeout

| Item | Status |
|------|--------|
| Cross-link audit | Done — TikTok inbound orphan fixed via video creative related link |
| Local HTTP 200 matrix (15 services + free-audit + case studies) | Done |
| Staging deploy | Requires confirmation |
| Production cutover | Not started |

## Execution rule

One service per CONTINUE after foundation. Research → SEO map → JSON → verify → stop.

## Non-negotiables

- Identical root slugs from JSON filenames
- No invented metrics; align markets with homepage FAQ (23 Seller Central markets)
- Professional copy; no emoji icons; PO ink/lime hard chrome
