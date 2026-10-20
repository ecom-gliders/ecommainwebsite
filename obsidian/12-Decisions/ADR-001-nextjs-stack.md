# ADR-001: Next.js 15 TypeScript Stack

**Date:** 2026-09-02  
**Status:** Accepted  
**Deciders:** Project (P0-07 user approval + P1-04 formal record)

## Context

ecomgliders.com must migrate from WordPress to custom code while preserving 328 root-level blog URLs, improving performance, and supporting interactive marketing components (browser mockup hero). A stack decision was required before Phase 1 foundation work.

## Decision

Adopt **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4** with JSON/MDX content and Repository + Adapter pattern for CMS readiness.

## Consequences

### Positive

- SSR/SSG/ISR for SEO-critical blog and service pages
- Single codebase for marketing site, blog, forms, and future admin
- Phase 0 validated: design system approved, tokens pipeline works
- shadcn/ui and Motion already integrated

### Negative

- Heavier than static-site generators for pure content pages
- Build tooling issues on Windows require CI verification
- Blog migration script required before content goes live

## Alternatives rejected

- Astro — insufficient for interactive components + unified admin
- React SPA — SEO risk for 328 indexed URLs
- Continue WordPress — contradicts migration goal

## References

- [[Tech-Stack]]
- [[Content-Architecture]]
- `docs/project/DECISIONS.md` (2026-09-02 Q3)
- `.cursor/plans/typescript_web_stack_e4470b1d.plan.md`
