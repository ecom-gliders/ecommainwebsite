# OG Image and Social Preview Standard

Canonical rules for Open Graph / Twitter / Discord / LinkedIn / Slack link previews on eCom Gliders.

**Updated:** 2026-11-03  
**Code:** `src/lib/seo/og-images.ts`, `src/lib/seo/page-metadata.ts`  
**Assets:** `public/images/og/`  
**Generator:** `npm run generate:og` → `scripts/generate-og-images.mjs`  
**Skill:** `.cursor/skills/og-social-preview/SKILL.md`

---

## Non-negotiables

1. Every indexable page emits at least one absolute `og:image` URL on the **new** site (never bare WordPress CDN URLs).
2. Prefer dedicated optimized crops under `/images/og/`, not raw 1 MB heroes as social files.
3. Emit width, height, and alt on Open Graph images.
4. Do not paste brand chrome over blog/case photography unless the asset is a site-default card.
5. After DNS cutover, refresh Facebook Sharing Debugger / LinkedIn inspector / Discord unfurl — crawlers cache old previews.

---

## Dual aspect

| Role | Size | Path suffix | Use |
|------|------|-------------|-----|
| Primary (large card) | **1200×630** | `-1200x630.jpg` | Facebook, LinkedIn, Discord, Slack, `twitter:summary_large_image` |
| Square companion | **1200×1200** | `-1200x1200.jpg` | Platforms that crop square; second `og:image` |

Composition: `cover` crop, center gravity, keep subject in the center safe zone (avoid edge text).

---

## Weight budget

- Target: **under 200 KB** per OG JPEG (mozjpeg ~quality 55–78).
- Do not point `og:image` at multi-megabyte PNG heroes (example failure: `/images/about/hero.png` ~1 MB).
- On-page UI may keep higher-quality sources; social uses the OG derivative.

---

## Resolution order

1. Explicit `seo.ogImage` (should be a `-1200x630.jpg` under `/images/og/`).
2. Page primary / `featuredImage` (blog, case study) via `pageSeoToMetadata({ featuredImage })`.
3. Site defaults: `/images/og/default-1200x630.jpg` + `default-1200x1200.jpg`.

Square companion is inferred by replacing `-1200x630.` with `-1200x1200.` when that file exists.

---

## Naming

```
/images/og/default-1200x630.jpg
/images/og/home-1200x630.jpg
/images/og/about-1200x630.jpg
/images/og/services-hub-1200x630.jpg
/images/og/free-audit-1200x630.jpg
/images/og/services/{service-slug}-1200x630.jpg
/images/og/cases/{case-slug}-1200x630.jpg
/images/og/blog/{source-slug}-1200x630.jpg
```

Each landscape file must have a matching square sibling.

---

## Metadata emission

`pageSeoToMetadata` always sets:

- `openGraph.images[]` — landscape first, square second when available (url, width, height, alt)
- `twitter.card` = `summary_large_image`
- `twitter.images` = landscape URL
- Root `metadataBase` from `getSiteUrl()`

---

## Page-type sources

| Page type | Source for OG crop |
|-----------|-------------------|
| Homepage / blog index | Branded home crop (not WP banner) |
| Service | Service hero / prior service art |
| Services hub / tools | Services hub browser hero |
| Free Audit | Promo audit banner |
| About / contact / FAQ / careers / legal / partnership | About crop (not raw 1 MB PNG) |
| Case study | Featured case art |
| Blog post | Featured image → optimized OG pair; keep `featuredImage` for on-page UI |

---

## Regeneration

When adding a page or changing a hero:

1. Place or update the source image under `public/images/…`.
2. Run `npm run generate:og` (idempotent for paths already under `/images/og/`).
3. Confirm `seo.ogImage` points at the new `-1200x630.jpg`.
4. Spot-check HTML head on staging.

---

## Cache note

Live `ecomgliders.com` may still show WordPress previews until DNS cutover. Staging and the custom codebase use these OG assets immediately after deploy.
