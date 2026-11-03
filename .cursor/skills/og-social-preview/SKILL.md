---
title: OG Social Preview
description: Generate and verify Open Graph / Twitter social preview images for eCom Gliders pages.
version: 1.0.0
---

# OG Social Preview

## When to use

- New or redesigned pages need social link previews
- Discord / LinkedIn / Facebook / Slack show wrong, cropped, or old-site images
- OG files are heavy or missing width/height/alt
- After adding blog posts or services with new featured/hero art

## Read first

1. `docs/seo/OG-IMAGE-STANDARD.md`
2. `.cursor/rules/14-og-social-preview.mdc`
3. `src/lib/seo/og-images.ts` and `src/lib/seo/page-metadata.ts`

## Procedure

1. Confirm page `seo.ogImage` (or pass `featuredImage` into `pageSeoToMetadata`).
2. Prefer sources under `public/images/` that represent the page (hero / featured), not legacy WP banners.
3. Run `npm run generate:og` to write landscape + square JPEGs under `public/images/og/` and re-point configs/MDX.
4. Confirm companion square exists (`-1200x1200.jpg` next to `-1200x630.jpg`).
5. Spot-check rendered `<head>`: absolute URLs, dual images, dimensions, `summary_large_image`.
6. File weight: each OG JPEG under ~200 KB.
7. After production deploy / DNS cutover, refresh Facebook Sharing Debugger and LinkedIn Post Inspector.

## Do not

- Re-download magnetoid SEO skills for this work (`seo-meta-tags` / `seo-performance` already in-repo)
- Use emoji or Unicode as preview art
- Claim cache cleared without debugger evidence
