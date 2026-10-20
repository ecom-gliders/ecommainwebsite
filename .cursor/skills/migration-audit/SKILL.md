---
name: migration-audit
description: Pre-migration audit and planning for ecomgliders.com to custom code. Inventories URLs, preserves blog SEO, documents content and assets. Use when planning migration, blog transfer, or URL preservation strategy.
---

# Migration Audit Skill

## Current phase

Planning and audit only. No development.

## Migration goals

1. Rebuild ecomgliders.com on custom code
2. Preserve all blog URLs exactly
3. Maintain or improve SEO rankings
4. Improve code quality, performance, and maintainability
5. Replace unprofessional copy where found

## Phase 1 - Discovery (current)

- [ ] Full URL inventory from current site
- [ ] Blog post export with slugs, dates, meta, content
- [ ] Asset inventory (images, logos, fonts)
- [ ] Current technical stack identification
- [ ] Performance baseline
- [ ] SEO baseline per page
- [ ] Form and integration inventory
- [ ] Third-party embeds (analytics, chat, Trustpilot, etc.)

## Phase 2 - Planning (next)

- [ ] Choose tech stack (requires approval)
- [ ] Database schema for blog and pages
- [ ] URL routing strategy (identical paths)
- [ ] Redirect map for any unavoidable changes
- [ ] Content migration pipeline design
- [ ] Staging environment plan
- [ ] Cutover and rollback plan

## Phase 3 - Implementation (not started)

Blocked until Phase 1 and 2 are complete and approved.

## Blog URL preservation rules

1. Export all blog URLs from sitemap or crawl
2. Record in `docs/seo/URL-INVENTORY.md`
3. New site must serve identical paths
4. If CMS export changes slug format, map old to new with 301
5. Verify each URL in staging before production
6. Monitor Search Console after cutover for 404 errors

## Content export sources

Try in order:
1. WordPress REST API (/wp-json/wp/v2/posts)
2. Sitemap XML
3. Playwright crawl of blog index and pagination
4. Manual export from hosting panel

Record which method was used and confidence level.

## Deliverables

- `docs/seo/URL-INVENTORY.md`
- `obsidian/09-Research/Current-Site-Audit.md`
- `docs/project/MIGRATION-PLAN.md`
- `.cursor/plans/YYYY-MM-DD-migration-plan.md`
