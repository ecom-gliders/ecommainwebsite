# Competitor page background / atmosphere audit

**Date:** 2026-09-03  
**Question:** What gradient style and opacity do Tier A/B Amazon agencies use for light page atmosphere?  
**Method:** Playwright live CSS + SVG source + prior hero screenshots

---

## Evidence

| Source | Finding | Confidence |
|--------|---------|------------|
| Canopy `Gradient-Accent.svg` | Ellipse radial `#DAFF5B` → white transparent, **fill-opacity 0.2** | High |
| Canopy `Gradient-Accent-Tech.svg` | Same radial, **fill-opacity 0.15** | High |
| Canopy hero banner | Single localized SVG blob (`background-size: 888px`, not full-bleed wash) | High |
| Olifant Digital | Soft pastel solids: body `#FFFEF9`, hero `#FEF5DA`, sage `#F1F9E9` linear fades — low chroma, no strong orbs | High |
| Sequence Commerce | Dark cinematic hero radial (skip for our light brand) | High |
| MAG hero screenshot | Near-white base; very faint neutral glow behind visual (~5–10% perceived) | Medium |

## Conclusion

Premium light competitors use **one soft localized blob at ~15–20% opacity**, or pastel solid washes — not multi-color high-opacity global orbs.

## Our change (Applied)

| Layer | Before | After (competitor-matched) |
|-------|--------|----------------------------|
| Wash cyan | color-mix 26% | **12%** |
| Wash accent | 22% | **10%** |
| Wash navy | 12% | **6%** |
| Base falloff | to `#EEF2F6` | to `#F7F8FA` (lighter) |
| Orbs | 4 at /30 /28 /14 /22 | **3** at ~0.12 / 0.10 / 0.07 + blur 90–100px |

Brand colors kept (cyan / accent / navy). Cream Olifant palette not copied (design rule: avoid cream+terracotta AI cliché).

## Uncertainty

Perceived opacity depends on monitor and section surface fills. User visual review required at localhost.
