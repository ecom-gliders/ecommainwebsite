# Service layout recipes (Visual Differentiation)

Date: 2026-10-17  
Model: Hybrid — hero/form/FAQ/related/CTA fixed; body sections use distinct grammars; mid-page `modules[]` split early/late.

## Body section grammars (Wave D)

| Section | Layout |
|---|---|
| Stats | Lead ledger — first cell lime fill; others ink + lime top rule |
| Problem | Primary full-width ink rail + satellite compact grid |
| Audience | Title chip anchors (`line-clamp-2`) + divide strip detail |
| Solution | Vertical lime spine (numbered discs + connector) — not Problem twin |
| Deliverables | Spec sheet with `01`… index column |
| Differ | Contrast board + desktop vertical lime column rule |
| FAQ | Hard panel + lime top bar; `FaqAccordion variant="lime"` |
| Results | Metric text cards (no thumbs this wave) |

## Module placement (early / late)

| Bucket | Types | Placement |
|---|---|---|
| `earlyVisuals` | `infographicSpotlight`, `browserProof`, `proofGallery`, `metricChart` | After Solution, before Deliverables |
| `lateOps` | `processSteps`, `checklistMatrix`, `comparisonTable` | After Differ, before Results |

Cap: soft max 4 modules total. `comparisonTable` filtered when `differ` exists.

## Module catalog

| Type | Use when |
|---|---|
| `browserProof` | Seller Central / Ads / Sellerboard dashboard screenshots |
| `comparisonTable` | DIY vs agency (filtered when `differ` exists) |
| `processSteps` | Horizontal chip timeline (lateOps) |
| `metricChart` | Verified numeric series + footnote |
| `proofGallery` | Multi-image creative grids; single item full-width 16/10 |
| `infographicSpotlight` | Full-width niche diagram; ContainedMedia `variant="spotlight"` quality **85** (allowlisted) |
| `checklistMatrix` | Spec-sheet groups (lateOps) |

## Spotlight renderer notes

- Never use `quality={90}` — Next `images.qualities` allowlist is `[70,75,80,85]`.
- Spotlight variant: no blur twin; solid primary panel + object-contain.

## Recipe matrix (2026-10-17)

| ID | Slug | Primary modules | Notes |
|---|---|---|---|
| A1 | full-service-amazon-agency | browserProof + spotlight + checklist | Pod map spotlight |
| A2 | amazon-ppc-management-agency | browserProof + spotlight + metricChart | Campaign architecture |
| A3 | amazon-listing-optimization | spotlight + gallery + process + checklist | Cap 4; D2 split only |
| A4 | amazon-content-writing | spotlight + gallery + checklist | SEO still in gallery |
| A5 | amazon-visual-creativity | gallery + process + checklist | — |
| A6 | amazon-catalog-management | 2× spotlight + process + checklist | Health + suppression triage |
| B1 | amazon-dsp-management | browserProof + spotlight + process + checklist | Audience layers |
| B2 | amazon-reporting-analytics | browserProof + spotlight + metricChart + checklist | Decision stack |
| C1 | amazon-video-creative | spotlight + gallery + process + checklist | Cap 4 |
| C2 | amazon-trademark-brand-registry | 2× spotlight + process + checklist | Pathway + tools matrix |
| C3 | amazon-company-registration | 2× spotlight + process + checklist | Flow + doc gates |
| C4 | amazon-product-sourcing | 2× spotlight + process + checklist | Flow + landed cost |
| D1 | shopify-website-development | 2× spotlight + process + checklist | Stack + sync mechanics |
| D2 | tiktok-shop-ads | spotlight + gallery + process | — |
| D3 | email-retention-marketing | 2× spotlight + process + checklist | Lifecycle + day journey |

## Always-on chrome

| Element | Placement |
|---|---|
| `service.stats` lead ledger | After hero |
| Hero `atmosphere` | Full-bleed under sticky header |

## Evidence

Plan: `.cursor/plans/2026-10-17-per-service-graphics-density.md`  
Downloads: `docs/research/DOWNLOAD-LOG.md`
