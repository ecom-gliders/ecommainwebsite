## Latest (2026-11-04) — Repo structure cleanup

**Done:**
- Root cleaned: partner PNGs → `assets/source/partners/`; long prompts → `docs/ai/`; root keeps thin pointers
- Deleted scratch `tmp-blog-*.js`; untracked tick JSON removed from git; `.gitignore` tightened
- Docs: `REPO-STRUCTURE.md`, README + Folder-Structure + SKILLS-CATALOG updated
- Prior: lead-form portals / PhoneField / dual-push `a5c692c`

**Do not commit:** untracked `scripts/migration/blog-*.mjs` batch helpers, `wordpress-blog-export/`, `docs/qa/screenshots/`.

**Still remaining (user):**
1. Manual Discord/email submit smoke
2. DNS cutover when ready
