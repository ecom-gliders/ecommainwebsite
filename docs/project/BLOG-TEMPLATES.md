# Blog templates

**Status:** Verified in code (2026-10-22)  
**Source of truth for posts:** `content/blog/*.mdx` (328 posts from WP export)

## Index template (`/blog/`)

Editorial magazine layout (Forbes / HubSpot / Stripe patterns). Detail pages unchanged.

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

| Element | Spec |
|---------|------|
| Breadcrumb | Home / Blog / Title |
| Header | H1, date · reading time · author |
| Featured image | Aspect-video, object-cover; required in frontmatter |
| Body | Markdown via `BlogMarkdown` (h2–h5 TOC anchors, lists, tables, images) |
| TOC | Desktop left rail from h2/h3 |
| FAQ | Extracted FAQ section when present in MDX |
| Author | `BlogAuthorBox` from author registry |
| Related | Up to 3 related posts |
| CTA | Site pre-footer style band (`BlogPostCta`) |
| SEO | Article schema; canonical = preserved root URL |

## Frontmatter schema

Required: `slug`, `title`, `excerpt`, `publishedAt`, `updatedAt`, `author`, `categories`, `tags`, `featuredImage`, `seo`  
Optional: `readingTimeMinutes`

## URL rule

Every post serves at `https://ecomgliders.com/{slug}/` (identical to WordPress). No `/blog/{slug}/` prefix.

## Image policy

- Prefer local paths under `/images/blog/` after localization.
- Remote `ecomgliders.com` URLs allowed via `next.config` `remotePatterns` until assets are fully localized.
