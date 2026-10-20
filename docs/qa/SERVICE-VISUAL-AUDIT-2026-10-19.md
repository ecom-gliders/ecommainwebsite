# Service visual audit (staging) — 2026-10-19

Method: Playwright 1440×900 · https://ecom-gliders.vercel.app/  
Evidence folder: `.playwright-mcp/service-audit/counsel-*.png`  
Mode: Counsel only until user picks FIX list.

## Counsel board (all 15)

| # | Service | Staging | Body layout | Graphics | Counsel |
|---|---------|---------|-------------|----------|---------|
| 1 | Catalog | [/amazon-catalog-management/](https://ecom-gliders.vercel.app/amazon-catalog-management/) | Problem/Solution distinct | 2 dense spotlights, sharp | **KEEP** |
| 2 | Trademark | [/amazon-trademark-brand-registry/](https://ecom-gliders.vercel.app/amazon-trademark-brand-registry/) | OK | Pathway + tools matrix dense | **KEEP** |
| 3 | Company reg | [/amazon-company-registration/](https://ecom-gliders.vercel.app/amazon-company-registration/) | OK | Doc gates matrix has **wrong cell labels** (e.g. bank column shows Passport/W-9) | **FIX art** |
| 4 | Sourcing | [/amazon-product-sourcing/](https://ecom-gliders.vercel.app/amazon-product-sourcing/) | OK | Landed-cost waterfall **sparse** (5 bars only) | **IMPROVE density** |
| 5 | Shopify | [/shopify-website-development/](https://ecom-gliders.vercel.app/shopify-website-development/) | OK | Sync diagram **sparse** vs catalog density | **IMPROVE density** |
| 6 | Email | [/email-retention-marketing/](https://ecom-gliders.vercel.app/email-retention-marketing/) | OK | Day 0–45 timeline **sparse** | **IMPROVE density** |
| 7 | PPC | [/amazon-ppc-management-agency/](https://ecom-gliders.vercel.app/amazon-ppc-management-agency/) | OK | Browser proof strong; architecture spotlight present | **KEEP** (spot-check architecture detail) |
| 8 | Reporting | [/amazon-reporting-analytics/](https://ecom-gliders.vercel.app/amazon-reporting-analytics/) | OK | Browser + decision stack | **KEEP** |
| 9 | DSP | [/amazon-dsp-management/](https://ecom-gliders.vercel.app/amazon-dsp-management/) | OK | Browser + audience layers | **KEEP** |
| 10 | Full-service | [/full-service-amazon-agency/](https://ecom-gliders.vercel.app/full-service-amazon-agency/) | OK | Browser + pod map | **KEEP** |
| 11 | Listing | [/amazon-listing-optimization/](https://ecom-gliders.vercel.app/amazon-listing-optimization/) | OK | Spotlight + gallery | **KEEP** |
| 12 | Content | [/amazon-content-writing/](https://ecom-gliders.vercel.app/amazon-content-writing/) | OK | Spotlight + gallery | **KEEP** |
| 13 | Visual | [/amazon-visual-creativity/](https://ecom-gliders.vercel.app/amazon-visual-creativity/) | OK | 5-tile gallery rich | **KEEP** |
| 14 | Video | [/amazon-video-creative/](https://ecom-gliders.vercel.app/amazon-video-creative/) | OK | Spotlight + gallery | **KEEP** |
| 15 | TikTok | [/tiktok-shop-ads/](https://ecom-gliders.vercel.app/tiktok-shop-ads/) | OK | Spotlight + gallery (creative honesty captions) | **KEEP** |

## FIX / IMPROVE shortlist (counsel recommendation)

1. **#3 Company reg** — regenerate doc-gates matrix with correct document types per column  
2. **#5 Shopify** — denser sync mechanics (lanes, notes, edge cases)  
3. **#6 Email** — denser day journey (subject lines / goals under each day)  
4. **#4 Sourcing** — denser waterfall (sub-bullets, no fake %)  

Body layouts (Problem/Solution/Audience) across all 15: **KEEP** as shared system.

## User reply format

Example: `FIX 3,4,5,6` or `FIX 5 only` or `KEEP all`
