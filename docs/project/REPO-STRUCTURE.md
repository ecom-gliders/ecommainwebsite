# Repository structure

Last updated: 2026-11-04

Canonical layout for humans and AI agents. Keep the **repository root lean**.

## Root (allowed)

| Path | Purpose |
|------|---------|
| `AGENTS.md` | Agent entrypoint and dual-push remotes |
| `README.md` | Human project overview |
| `MASTER_PROMPT.md` | Thin pointer → `docs/ai/MASTER-PROMPT.md` |
| `cursor_project_prompt_cookbook.md` | Thin pointer → `docs/ai/cursor-project-prompt-cookbook.md` |
| `package.json` / lockfile / configs | Next.js, ESLint, Playwright, Vercel, TS |
| `.env.example` | Documented env keys only (no secrets) |
| `.cursor/` | Rules, skills, plans, MCP |
| `src/` | Application source |
| `content/` | JSON + MDX content |
| `public/` | Static assets served by Next |
| `assets/` | Source / approved / licenses (not all public) |
| `docs/` | Project documentation (source of truth with obsidian) |
| `obsidian/` | Long-form knowledge vault |
| `scripts/` | Maintainable utilities (not scratch `_` batches) |
| `tests/` | Automated tests |
| `backup/` | Local migration backup (mostly gitignored payloads) |

## Do not leave at root

- One-off PNGs / downloads → `assets/source/...`
- Scratch `tmp-*.js` → delete or `tmp/` (gitignored)
- Long prompt corpora → `docs/ai/`
- WP export dumps → `wordpress-blog-export/` (gitignored)
- Ad-hoc QA screenshots → `docs/qa/screenshots/` (gitignored)

## Application (`src/`)

Feature-oriented Next.js App Router code. Prefer kebab-case directories. See `obsidian/04-Development/Folder-Structure.md`.

## Forms

See `docs/project/LEAD-FORMS.md`. Shared UI lives under `src/components/forms/`.

## Agent docs map

| Need | Read |
|------|------|
| Current work | `docs/ai/SESSION-STATE.md` |
| Decisions | `docs/project/DECISIONS.md` |
| Verification | `docs/qa/VERIFICATION-LOG.md` |
| Lead forms | `docs/project/LEAD-FORMS.md` + skill `lead-forms` |
| OG images | `docs/seo/OG-IMAGE-STANDARD.md` + skill `og-social-preview` |
| SEO pages | `docs/seo/PAGE-OPTIMIZATION-STANDARD.md` |

## Cleanup rule for agents

Before finishing a session that created scratch files: delete them, move assets to `assets/source/`, or ensure `.gitignore` covers them. Do not commit root media dumps or `_batch-*.json` tick files.
