# Blog templates

**Status:** Verified in code (2026-10-22)  
**Source of truth for posts:** `content/blog/*.mdx` (328 posts from WP export)

## Index template (`/blog/`)

Editorial magazine layout (Forbes / HubSpot / Stripe patterns).

| Element | Spec |
|---------|------|
| Masthead | Eyebrow “eCom Gliders Insights”, H1 “Amazon Seller Insights”, dek + total count |
| Topic rail | In-page anchors to topic stacks (PPC, SEO, Account management, Guides, Market & news) — page 1 only |
| Featured | Newest post as lead (large image) + next 3 secondary editorial rows — page 1 only |
| Topic stacks | Up to 5 curated buckets × 4 posts each — page 1 only |
| Latest | Card grid of remaining posts; `#latest` anchor |
| Page size | Page 1 latest: 12; page 2+: 24 (featured excluded from latest pool) |
| Pagination | `?page=N` query; prev/next + page indicator |
| CTA | Site pre-footer Free Audit band (`BlogPostCta`) |
| SEO | CollectionPage JSON-LD; canonical `/blog/` |
| Empty | Not expected; inventory locked at 328 |

Data model: `src/lib/blog/build-blog-index-model.ts`

## Post template (`/[slug]/`)

Editorial detail shell (Forbes-like, EG tokens):

| Element | Spec |
|---------|------|
| Breadcrumb | Home / Blog / Title |
| Hero | Category eyebrow, large H1, excerpt dek, meta (date · read time · author), wide featured image (`aspect-[21/9]`, ink border + hard shadow) |
| Share | Mobile: horizontal under meta. Desktop xl+: sticky right rail — LinkedIn, X, Facebook, Copy link |
| TOC | Left rail; smooth scroll (respects `prefers-reduced-motion`); active section highlight |
| Body column | ~65–72ch reading width; markdown via `BlogMarkdown` |
| Body blocks | Config-driven fences — see [`BLOG-BLOCKS.md`](BLOG-BLOCKS.md). No `rehype-raw` |
| FAQ | Extracted `## FAQ` + question headings → `BlogPostFaq` |
| Author / Related / CTA | Unchanged bands |
| SEO | Article schema; canonical = preserved root URL |

Grid (xl+): `200px TOC | article | 56px share`.

## Frontmatter schema

Required: `slug`, `title`, `excerpt`, `publishedAt`, `updatedAt`, `author`, `categories`, `tags`, `featuredImage`, `seo`  
Optional: `readingTimeMinutes`

## URL rule

Every post serves at `https://ecomgliders.com/{slug}/` (identical to WordPress). No `/blog/{slug}/` prefix.

## Body block conventions

See [`BLOG-BLOCKS.md`](BLOG-BLOCKS.md). Do not paste Elementor HTML or WP hex colors — use design tokens (ink `#131311`, lime `#C6FD50`).

Sanitize: `npm run sanitize:blog-mdx -- --write` (backs up under `backup/blog-mdx-sanitize/`).

Reports: `docs/qa/BLOG-SANITIZE-REPORT.json`, residual inventory JSON under `docs/qa/`.

## Canonical media on every post template

Applied by `BlogMarkdown` + block registry (all detail posts, including `2025-amazon-algorithm-updates-what-sellers-need-to-know`):

| Media | Canonical approach |
|-------|--------------------|
| Multi-col chart with % | `chart-cards` → column bars + notes (`BlogChartCards`) |
| Image | Markdown img or `figure` fence → same ink-border figure frame |
| Video | `video-card` → YouTube/Vimeo iframe embed; link+poster fallback |

Catalog: `/design-system/blog` · Config: `blog-blocks.json#canonical` · DS mirror: `design-system.json#blogEditorial`

## Image policy

- Prefer local paths under `/images/blog/` after localization.
- Remote `ecomgliders.com` URLs allowed via `next.config` `remotePatterns` until assets are fully localized.
- In-body images use the figure frame (not unframed `rounded-lg` only).
