# eCom Gliders Site

Custom [Next.js 15](https://nextjs.org/) rebuild of [ecomgliders.com](https://ecomgliders.com/).

JSON/MDX-driven marketing site for the Amazon agency: services, case studies, blog (URL-preserving migration), free tools, contact / audit funnels, and lead notifications (email + Discord).

## Status

| Item | State |
|------|--------|
| App | Active development on `main` |
| Blog URLs | Must match legacy paths 1:1 |
| DNS / production cutover | Only when explicitly requested |
| Dual remotes | `origin` + `ecom` (see below) |

## Requirements

- Node.js 20+ (LTS recommended)
- npm

## Setup

```bash
npm install
cp .env.example .env.local
# Fill SMTP / Discord / site URL keys from .env.example — never commit secrets
npm run dev
```

Local app: [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run generate:og` | Dual-aspect OG JPEGs under `public/images/og/` |
| `npm run migrate:blog` | WP backup → MDX |
| `npm run test:blog-urls` | Playwright: blog path preservation |
| `npm run test:a11y` | Playwright + axe smoke |
| `npm run verify:sitemap` | Sitemap checks |
| `npm run verify:gsc-readiness` | GSC readiness checks |
| `npm run audit:lighthouse` | Lighthouse lab run |

## Repository map

| Path | Purpose |
|------|---------|
| `src/` | App Router UI, domain, lib |
| `content/` | Site/service/homepage JSON + blog MDX |
| `public/` | Static files served as-is |
| `assets/` | Source / approved assets + licenses |
| `docs/` | Session state, decisions, SEO, QA |
| `obsidian/` | Long-form knowledge vault |
| `.cursor/rules/` | Project rules `00`–`15` |
| `.cursor/skills/` | Agent skills (`lead-forms`, SEO pack, …) |
| `scripts/` | Maintainable utilities |
| `tests/` | Playwright / automated tests |
| `backup/` | Local migration backup (large payloads gitignored) |

Keep the **root lean**. Detail: [`docs/project/REPO-STRUCTURE.md`](docs/project/REPO-STRUCTURE.md).

Root stubs only (full files under `docs/ai/`):

- `AGENTS.md` — agent entrypoint
- `MASTER_PROMPT.md` → `docs/ai/MASTER-PROMPT.md`
- `cursor_project_prompt_cookbook.md` → `docs/ai/cursor-project-prompt-cookbook.md`

## Docs agents should open first

| Doc | When |
|-----|------|
| [`AGENTS.md`](AGENTS.md) | Every session |
| [`docs/ai/SESSION-STATE.md`](docs/ai/SESSION-STATE.md) | Current work / next action |
| [`docs/project/DECISIONS.md`](docs/project/DECISIONS.md) | Why something was chosen |
| [`docs/project/LEAD-FORMS.md`](docs/project/LEAD-FORMS.md) | Phone, multi-select, wizards |
| [`docs/seo/PAGE-OPTIMIZATION-STANDARD.md`](docs/seo/PAGE-OPTIMIZATION-STANDARD.md) | Per-page SEO |
| [`docs/seo/OG-IMAGE-STANDARD.md`](docs/seo/OG-IMAGE-STANDARD.md) | Social preview images |
| [`docs/qa/VERIFICATION-LOG.md`](docs/qa/VERIFICATION-LOG.md) | What was verified |

## Non-negotiables

1. **Blog URL preservation** — existing post paths must resolve identically (rule `12-migration-seo-preservation`).
2. **No secrets in git** — use `.env.local`; see `.env.example`.
3. **Professional copy** — no emoji UI icons, no AI marketing clichés (rule `13-professional-copy`).
4. **Evidence language** — Verified / Observed / Assumed / Proposed only; update docs after material changes.
5. **Lead forms** — shared `PhoneField` + E.164; portaled country/marketplace menus; see `lead-forms` skill.

## Git remotes

When asked to push `main`, push **both**:

| Remote | URL |
|--------|-----|
| `origin` | https://github.com/faizanMayo786/ecomgliders-site.git |
| `ecom` | https://github.com/ecom-gliders/ecommainwebsite.git |

```bash
git push origin main
git push ecom main
```

## Contact

**eCom Gliders**  
info@ecomgliders.com  
+1 (360) 660-1210
