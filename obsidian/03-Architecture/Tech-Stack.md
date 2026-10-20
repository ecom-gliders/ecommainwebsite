# Tech Stack

**Status:** Verified (Phase 0 implementation + user approval P0-07, 2026-09-02)  
**Related:** [[System-Architecture]], [[Content-Architecture]], [[Folder-Structure]], [[Design-System]]

---

## Summary

Custom TypeScript Next.js application replacing ecomgliders.com. Content is JSON- and MDX-driven with a CMS-ready repository abstraction. Design tokens live in `content/config/design-system.json` and are approved via `/design-system`.

---

## Core stack

| Layer | Choice | Version (observed) | Why |
|-------|--------|-------------------|-----|
| Framework | Next.js (App Router) | 15.5.x | SSR/SSG/ISR for SEO, metadata API, image optimization, catch-all routes for 328 blog URLs |
| Language | TypeScript (strict) | 6.x | Type-safe config, components, Zod schemas |
| Runtime | React | 19.x | Server Components + client islands where needed |
| Styling | Tailwind CSS v4 | 4.3.x | `@theme` tokens, design-system CSS variables, fast iteration |
| UI primitives | shadcn/ui (owned code) | Radix-based | Accessible primitives, no vendor lock-in, copied into repo |
| Validation | Zod | 4.x | JSON config schemas, form validation, content contracts |
| Animations | Motion (`motion/react`) | 13.x | PrimaryButton, ElegantCard — minimal in-house motion only |
| Icons | Lucide React | 1.x | Professional icons; no Unicode symbols as UI icons |
| Fonts | IBM Plex Sans + IBM Plex Mono | Google Fonts via `next/font` | Enterprise-readable single-family system (approved Phase 0) |

---

## Content and data

| Concern | Phase 1 choice | Future option |
|---------|----------------|---------------|
| Site config | `content/config/*.json` | Keystatic or Payload via adapter |
| Blog posts | MDX in `content/blog/` | Same adapter swap |
| Design tokens | `content/config/design-system.json` | Unchanged — source of truth |
| Blog URL inventory | `backup/metadata/blog-inventory.json` | Migration reference only |
| Database | None (file-based) | Optional if CMS requires it later |

**Pattern:** Repository + Adapter — UI and services depend on `ContentRepository` interface, not file format.

---

## SEO and metadata

| Tool | Purpose |
|------|---------|
| `next/metadata` | Per-page title, description, robots, Open Graph |
| `schema-dts` (planned P2+) | FAQPage, Organization, Service structured data |
| `docs/seo/SITE-SEO-MAP.md` | Indexable page SEO records (required per page) |
| Identical blog paths | Catch-all `app/[slug]/page.tsx` — no URL changes without documented 301 |

---

## Forms (planned P3-07)

| Layer | Choice |
|-------|--------|
| Client | React Hook Form |
| Validation | Zod (shared schemas server + client) |
| Submit | Next.js Server Actions |
| Security | Server-side validation, CSRF on state-changing requests |

Not yet installed — add when contact/audit forms are implemented.

---

## Testing and quality

| Tool | Status |
|------|--------|
| TypeScript `tsc --noEmit` | Verified — passes |
| ESLint + eslint-config-next | Installed; `next lint` deprecated in Next.js 16 |
| Playwright (MCP) | Used for site audit and `/design-system` verification |
| axe-core / Lighthouse | Planned P4-02, P4-03 |

---

## Deployment (proposed)

| Item | Choice | Notes |
|------|--------|-------|
| Hosting | Vercel | Native Next.js, preview deploys, ISR — **live** at https://ecom-gliders.vercel.app |
| CI | TBD | Lint + typecheck on PR |
| Staging | Vercel preview URL | P4-04 |

Requires confirmation before production cutover.

---

## Explicitly not used

| Rejected | Reason |
|----------|--------|
| Framer.com export as production code | Poor SEO control, not maintainable |
| Paid block libraries (Tailark Pro, Aceternity Pro) | Build custom in-house per brand |
| Astro | Weaker for interactive components + future admin in same app |
| Plain React SPA | SEO penalty for 328 indexed posts |
| WordPress (current platform) | Migration target is custom code |
| Heavy Framer motion effects | Rejected in Phase 0 — enterprise positioning |

---

## Repository layout (application)

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # shadcn primitives + PrimaryButton, ElegantCard
│   ├── layout/             # Header, footer, skip link (P1-07+)
│   ├── sections/           # Homepage sections (P2-03+)
│   ├── browser-mockup/     # Static browser chrome (Phase 0)
│   └── design-system/      # /design-system review page
├── domain/                 # ContentRepository, services (P1-06+)
├── infrastructure/         # JsonFileAdapter, MdxAdapter (P1-06+)
└── lib/
    ├── design-tokens.ts    # Zod + CSS variable builder
    ├── content-config.ts   # browser-mockup + review page config
    └── icon-registry.ts    # Lucide name → component map

content/
├── config/                 # JSON site content (design-system, site, nav, homepage)
└── blog/                   # MDX posts (P3-01+)
```

---

## Environment and secrets

- Secrets via environment variables only — never in source, JSON, or client bundles
- `.env.local` for local dev (gitignored)
- Vercel environment variables for staging/production

---

## Version policy

- Pin major versions in `package.json`; review before major upgrades
- Next.js 15 LTS line until Phase 4 launch verified
- New dependencies: verify maintenance, license, bundle impact per cookbook Section 55

---

## Decision record

Formal stack decision logged in `docs/project/DECISIONS.md` under P1-04 (Q3).
