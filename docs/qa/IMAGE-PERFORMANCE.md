# Image and asset performance defaults

**Updated:** 2026-09-03  
**Rules:** `.cursor/rules/10-web-performance.mdc`, `.cursor/skills/asset-management/SKILL.md`

## Pipeline (Next.js Image)

Configured in `next.config.ts`:

| Setting | Value | Why |
|---------|--------|-----|
| `formats` | AVIF, WebP | Smaller than PNG/JPEG when browser supports |
| `deviceSizes` | includes **1320** | Matches global content shell |
| `imageSizes` | 16–384 | Logos, badges, AI chips |
| `minimumCacheTTL` | 30 days | Fewer origin image hits |
| `remotePatterns` | ecomgliders.com | Blog / media from current domain |

## Loading policy

| Placement | Strategy |
|-----------|----------|
| Header logo | `priority` (LCP) |
| Hero / blog / case study hero featured | `priority` + `sizes` |
| Trust logos, footer, cards, in-article | `loading="lazy"` (Next default when not priority) |
| Tiny AI SVGs in announcement bar | Native `<img>` + `decoding="async"` + `fetchPriority="low"` (skip next/image) |

## Always set

- Explicit `width` / `height` or `fill` + aspect container (CLS)
- Accurate `sizes` for the rendered slot
- Meaningful `alt` (empty only when decorative)

## Do not

- Lazy-load the primary above-the-fold brand mark
- Use `unoptimized` except when the optimizer cannot help (prefer native img for tiny SVG)
- Ship emoji / Unicode as icons
