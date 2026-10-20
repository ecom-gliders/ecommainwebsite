# Migration Plan

Status: Draft. Phase 1 in progress.

## Overview

Migrate ecomgliders.com from current platform to custom code.

## Phase 1 - Discovery and Audit (current)

| Task | Status | Owner |
|------|--------|-------|
| URL inventory | Not started | |
| Blog content export plan | Not started | |
| Asset inventory | Not started | |
| Technical stack identification | Not started | |
| SEO baseline per page | Not started | |
| Performance baseline | Not started | |
| UX audit | Not started | |
| Competitor research | Not started | |
| Current site audit | Not started | |

## Phase 2 - Architecture and Planning

Blocked until Phase 1 complete.

- Tech stack selection
- Database and content model
- URL routing strategy
- Migration pipeline
- Staging environment
- Cutover and rollback plan

## Phase 3 - Implementation

Not started. Blocked until Phase 2 approved.

## Phase 4 - Verification and Cutover

Not started.

## Blog migration rules

See `obsidian/08-SEO/Blog-URL-Preservation.md`

Every blog URL path must be preserved exactly on the new site.

## Risk register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Blog URL changes break rankings | High | Identical path routing, redirect map for exceptions |
| Content loss during export | High | Multiple export methods, staging verification |
| Cloudflare blocks automated audit | Medium | Manual export, sitemap, REST API fallback |
| Performance regression | Medium | Baseline metrics before migration |

## See also

- `obsidian/01-Project/Migration-Strategy.md`
- `.cursor/skills/migration-audit/SKILL.md`
