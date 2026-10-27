# Email retention — cadence loop polish (council)

**Date:** 2026-10-27  
**Route:** `/email-retention-marketing/` · layout `lifecycleCadenceLoop`  
**Counsel:** Advocate / Skeptic / Pragmatist / Architect / Brand-SEO — SHIP WITH CHANGES

## Why

Unique page exists but reads unfinished vs Shopify/TikTok polish bar: no sticky underlap, form taller than cadence panel, static problem/stages, always-open FAQ, stills unused.

## What (final)

| Area | Decision |
|------|----------|
| Hero | Lilac wash kept; sticky underlap; compact form; loop panel fills leftover height; presentational stages only |
| Interactive (max 2) | (1) Broadcast vs looped toggle — both panels in DOM; (2) Cadence stage rail click-to-inspect |
| Stills | Wire lifecycle + day-journey; generate Welcome/Winback stage stills |
| Static | Flow cards, day-loop table, build-order, capture gates, proof, close |
| FAQ | Accordion; cadence legend stays |
| Not | Fake open rates/LTV; dark-clone TikTok; hero stage tabs |

## How

1. Rewrite `eml-loop-hero.tsx`
2. Client island: `eml-broadcast-problem.tsx`
3. Client island: `eml-cadence-stages.tsx`
4. FAQ accordion: `eml-faq.tsx`
5. Generate/wire stills + license + SESSION-STATE

## Risks

Lilac underlap vs header contrast. Stills must be text-free. CLS on equal-height — match TikTok flex fill.

## Done when

Page loads; hero flush with form; toggle + stage rail work; FAQ accordion; no console errors; SESSION-STATE updated.
