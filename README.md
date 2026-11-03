# eCom Gliders Site

Custom Next.js rebuild of [ecomgliders.com](https://ecomgliders.com/), with SEO-preserving blog URL migration.

## Current phase

Active implementation on `main` (forms, SEO, content). DNS / production cutover only when explicitly requested.

## Quick start for AI agents

1. Read `AGENTS.md`
2. Read `.cursor/rules/00-project-core.mdc`
3. Check `docs/ai/SESSION-STATE.md`
4. Use task skills under `.cursor/skills/` (e.g. `lead-forms`, `og-social-preview`, SEO pack)
5. Prefer `docs/` + `obsidian/` over chat history

## Repository map

| Path | Purpose |
|------|---------|
| `src/` | Next.js App Router application |
| `content/` | Config JSON + blog MDX |
| `public/` | Served static files |
| `assets/` | Source / approved assets + licenses |
| `docs/` | Project docs (AI session, SEO, QA, project) |
| `obsidian/` | Long-form knowledge vault |
| `.cursor/rules/` | Project rules (00–15) |
| `.cursor/skills/` | Project skills |
| `scripts/` | Maintainable utilities |
| `tests/` | Automated tests |
| `docs/ai/cursor-project-prompt-cookbook.md` | Full prompt cookbook |
| `docs/project/REPO-STRUCTURE.md` | Structure rules for agents |
| `docs/project/LEAD-FORMS.md` | Phone / multi-select / wizard patterns |

Root stays lean: no scratch PNGs, no `tmp-*.js`, no long prompt dumps (pointers only).

## Critical constraint

All existing blog URL paths must remain identical. See `obsidian/08-SEO/Blog-URL-Preservation.md` and rule `12-migration-seo-preservation`.

## Git remotes

Push `main` to both when asked:

- `origin` → `https://github.com/faizanMayo786/ecomgliders-site.git`
- `ecom` → `https://github.com/ecom-gliders/ecommainwebsite.git`

## Contact

info@ecomgliders.com  
+1 (360) 660-1210
