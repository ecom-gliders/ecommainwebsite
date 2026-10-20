# System Architecture

Status: Proposed. Not yet implemented.

## Current state

ecomgliders.com runs on the current platform (to be identified during audit).
No custom code exists in this repository yet.

## Target state (verified Phase 0)

Custom Next.js 15 + TypeScript application. See [[Tech-Stack]] for full stack record.

- Server-rendered pages for SEO
- File-based content (JSON + MDX) with CMS-ready repository abstraction
- Identical URL routing to current site (328 blog URLs preserved)
- Design system approved at `/design-system` (P0-07, 2026-09-02)

## Architecture principles

See `.cursor/rules/01-architecture.mdc` for SOLID, OOP, and design pattern rules.

## Key architectural decisions pending

| Decision | Status | Notes |
|----------|--------|-------|
| Frontend framework | **Decided** | Next.js 15 App Router — see [[Tech-Stack]] |
| Language | **Decided** | TypeScript strict |
| Styling | **Decided** | Tailwind CSS v4 + design tokens |
| CMS approach | **Decided (phased)** | JSON/MDX now; adapter for future CMS |
| Database | Deferred | File-based until CMS requires it |
| Hosting | Proposed | Vercel — requires confirmation |
| Asset pipeline | **Decided** | `public/` + `assets/` with provenance log |

## Content model (draft)

### Page
- slug (URL path)
- title
- meta_title
- meta_description
- content (HTML or markdown)
- template type
- published_at
- updated_at
- status (draft, published)

### BlogPost (extends Page)
- author
- categories
- tags
- featured_image
- excerpt
- canonical_url

## Related notes

- [[Content-Architecture]]
- [[Database-Schema]]
- [[Data-Flow]]
- [[Migration-Strategy]]
