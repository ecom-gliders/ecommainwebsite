# Services hub design — Amazon sellers age 35–40

**Date:** 2026-10-20  
**Purpose:** Pre-build market research for `/services/` typography and layout.

## Sources

| Source | Finding | Confidence |
|--------|---------|------------|
| CHI font-size normalization by age (Suhail et al.) | Readers 40+ weight **character weight** more; character height remains primary for perceived size | High |
| web.dev accessibility typography | Relative units; avoid tiny body; support 200% zoom | High |
| B2B typography guides | Body 16–18px+, line-height ~1.5–1.6, measure 45–75 chars, generous whitespace | Medium |
| Age-related UX (vision / motor) | High contrast, large touch targets (44px+), simple IA, short paragraphs | Medium |

## Design choices for this hub (Applied)

1. **Larger type on `/services/` only** — body ~18px, H2/H3 bumped, result metrics `clamp(2.75rem, 6vw, 4.5rem)`, medium-bold weights.
2. **High contrast** — ink on off-white; outcome metrics in `success` `#067D62` (true green, not lime UI chrome).
3. **Scannable density** — numbered rail, short 1–2 sentence scopes, asymmetric result rows (metric left / fact right).
4. **Touch-friendly CTAs** — Free Audit + phone only; min-height 44px+.
5. **Avoid** — ultra-light text, long AI essays, peer card grids, keyword-stuffed footer H3 walls.
