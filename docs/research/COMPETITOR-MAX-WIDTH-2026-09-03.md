# Competitor global content max-width

**Date:** 2026-09-03  
**Method:** Playwright computed `max-width` on above-the-fold / primary containers (viewport 1440px)  
**Confidence:** High for measured CSS max-width; Medium for “primary” container choice when multiple exist

## Results (Verified)

| Site | Primary global / shell max-width | Also seen |
|------|----------------------------------|-----------|
| Canopy Management | **1400px** (`.container`) | 1200px inner, 1112px header strip |
| Olifant Digital | **1320px** (`.navbar_container`) | 960px hero text |
| AMZ Dudes | **1320px** (row / shell) | **1280px** top bar inner; 1180px padded content |
| My Amazon Guy | **1290px** (Elementor container) | — |
| Sequence Commerce | **1440px** body shell; **1340px** hero | 1240px Elementor container |

## Pattern

Industry mid/premium Amazon agencies cluster around **1280–1400px** for the main content shell.

| Too narrow | Typical | Too wide for text shell |
|------------|---------|-------------------------|
| ≤1024px (`max-w-5xl`) | **1280–1320px** | Full 1920px content column |

**1920px** is a viewport/canvas width, not the usual *content* max-width. Competitors keep readable line lengths by capping the shell ~1300–1400px while allowing full-bleed backgrounds.

## Implication for eCom Gliders

**Applied 2026-09-03:** `container-page` set to **1320px** (AMZ Dudes main shell), with responsive side gutters:
- mobile 16px · sm 20px · md 24px · lg 32px · xl 40px

Top-bar-class content at competitors often sits at **1280px**; page shell at **1320px**. Full **1920px** content columns are not used.
