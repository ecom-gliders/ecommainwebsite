# TikTok Shop Ads — spark rail polish (council v2)

**Date:** 2026-10-27  
**Route:** `/tiktok-shop-ads/` · layout `tiktokSparkRail`  
**Counsel:** Architect / Brand-SEO / Pragmatist — all SHIP WITH CHANGES

## Why

Unique page exists but reads unfinished: no sticky underlap, empty CSS phones, zero interactivity, mid-page boards OK but hero/problem need commercial clarity. Apply Shopify counsel lessons (interaction budget, no fake metrics).

## What (final)

| Area | Decision |
|------|----------|
| Hero | Sticky underlap; H1 above; phone rail + form equal height; stages **presentational** (not a 4th tab system); 3–4 text-free stills in phone slots |
| Interactive (max 2) | (1) Organic vs paid toggle — both panels stay in DOM; (2) Stage rail click-to-inspect (owns Test/Scale/Refresh/Handoff) |
| Static | Format cards, fit board table, focus bars (priority not ROAS), lanes, differ, proof (verified cases only), close |
| FAQ | Accordion OK (expected pattern) |
| Not | Shopify storefront clone; invent GMV/ROAS; photo-jam; hero stage tabs + format picker |

## How

1. Rewrite `ttk-spark-hero.tsx` (underlap, layout, stills)  
2. Client island: `ttk-organic-problem.tsx` toggle  
3. Client island: `ttk-stage-rail.tsx` inspect  
4. Fit board → table; proof strip decorative fake charts if any  
5. Generate/wire stills + license + SESSION-STATE  

## Risks

Stage metaphor collision (mitigated: hero presentational). Image gen delay (ship CSS first if blocked). CLS on equal-height.

## Done when

Page loads `/tiktok-shop-ads/`; hero height matches form; organic toggle works with both sides crawlable; stage rail inspect works; no console errors; SESSION-STATE updated.
