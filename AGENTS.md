# Agent Instructions

You are operating on the eCom Gliders website migration project.

## Project

Migrate https://ecomgliders.com/ to custom code.
Current phase: Planning and audit. Do not start development unless explicitly instructed.

## Before any work

1. Inspect repository structure
2. Read relevant `.cursor/rules/` files
3. Read `obsidian/01-Project/Project-Brief.md`
4. Check `docs/ai/SESSION-STATE.md`
5. Search existing docs before researching externally

## Rules location

All rules are project-local in `.cursor/rules/`. Key rules:

| Rule | Scope |
|------|-------|
| 00-project-core | Always apply |
| 01-architecture | SOLID, OOP, patterns |
| 02-clean-code | File size, naming, structure |
| 03-security | Security standards |
| 04-database | Schema and migrations |
| 05-uiux | UI, UX, accessibility |
| 06-seo-aeo-geo | All SEO layers |
| 07-research-mcp | Playwright research |
| 08-testing-verification | Completion criteria |
| 09-assets-downloads | Asset and icon policy |
| 10-web-performance | Performance rules |
| 11-documentation | Docs and Obsidian |
| 12-migration-seo-preservation | Blog URL preservation |
| 13-professional-copy | Copy standards |

## Skills location

Project skills in `.cursor/skills/`:

- research, web-audit, migration-audit, asset-management, competitive-research, `og-social-preview`
- **SEO pack:** `seo-audit`, `seo-aeo-geo`, `seo-meta-tags`, `seo-schema-snippets`, `seo-crawling-indexing`, `seo-performance`, `seo-content-quality`, `seo-core-html`, `seo-llm-context`, `seo-local-seo`, `seo-media`, `seo-url-structure`, `seo-accessibility`, `seo-javascript`, `seo-ecommerce`, `seo-enterprise`, `seo-international`, `seo-security-https`, `seo-youtube-video`

Page SEO passes: follow `docs/seo/PAGE-OPTIMIZATION-STANDARD.md` and update `docs/seo/SITE-SEO-MAP.md`.  
Social previews: `docs/seo/OG-IMAGE-STANDARD.md` + `npm run generate:og`.

## Decision protocol

For substantial decisions, document WHAT, WHY, HOW, EVIDENCE, RISK, VALIDATION.

## Memory

Update `docs/ai/CHAT-SUMMARIES.md` and `docs/project/DECISIONS.md` after material decisions.
Never rely on chat history alone.

## Writing

Professional, factual, concise. No emojis. No Unicode symbols as icons. No AI marketing clichés.

## Completion

Report STATUS, IMPLEMENTED, VERIFIED, DOCUMENTED, REMAINING, NEXT ACTION.
Do not claim complete without verification evidence.
