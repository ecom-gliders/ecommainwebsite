# Decisions Log

Record material project decisions here.

## Template

```
Date: YYYY-MM-DD
Decision: What was decided
Context: Why it was needed
Options: A, B, C
Chosen: Selected option
Why: Rationale with evidence
Tradeoffs: What becomes harder
Impact: What needs updating
```

---

## 2026-11-03 — Dual-aspect optimized OG images

**WHAT:** Site-wide Open Graph / Twitter images use optimized JPEG pairs (1200×630 + 1200×1200) under `/images/og/`, emitted with width/height/alt via `pageSeoToMetadata`. Generator: `npm run generate:og`.

**WHY:** Meta previews still showed migrated WP banner / heavy about hero (~1 MB); social cards cropped poorly; previews were slow.

**CHOSEN:** Static optimized derivatives + resolver fallback (ogImage → featured → defaults). Not per-request `ImageResponse` for 328 blogs.

**TRADEOFFS:** Must re-run generator when heroes change; Discord/Facebook cache still needs manual refresh after cutover.

**IMPACT:** `og-images.ts`, `page-metadata.ts`, `scripts/generate-og-images.mjs`, content `seo.ogImage` paths, `docs/seo/OG-IMAGE-STANDARD.md`, rule `14-og-social-preview`, skill `og-social-preview`.

---

## 2026-10-29 — Footer newsletter + Hostinger SMTP + Discord

**WHAT:** Footer newsletter + unified lead pipeline: Hostinger SMTP to `info@ecomgliders.com` (team + user confirmation) and Discord webhook embeds. Channels run in parallel; one failure does not block the other.

**WHY:** Use existing Hostinger mailbox; dual delivery for ops reliability.

**CHOSEN:** `nodemailer` → `smtp.hostinger.com:465`; `DISCORD_FORM_WEBHOOK_URL`; no Resend.

**IMPACT:** `smtp-mailer.ts`, `form-notifier.ts`, `.env.example` (`SMTP_*`); Vercel needs `SMTP_PASS` + Discord URL.

---

## 2026-10-28 — Free Audit funnel popup + Calendly page

**WHAT:** Multi-step Free Audit intake (`AuditFunnelWizard`) opens in a site-wide modal. `/free-audit/` keeps the Calendly embed for direct booking. Contact, header, pre-footer, and other `/free-audit/` CTAs open the popup (click intercept).

**WHY:** Spec: funnel in popup from Contact + service/landing CTAs; Calendly stays on the Free Audit page; do not rebuild fields.

**CHOSEN:** `FreeAuditFunnelProvider` in marketing layout; Radix dialog (bottom sheet mobile / centered desktop); reuse existing wizard + `submitAuditForm`. Direct URL `/free-audit/` still loads Calendly (no auto-popup).

**IMPACT:** `free-audit-funnel-*` components; `form`/`funnel` restored in `free-audit-page.json`; marketing layout host.

---

## 2026-10-28 — Free Audit page uses Calendly booking (page)

**WHAT:** `/free-audit/` embeds Calendly event `https://calendly.com/ecomgliders-llc/30min` inline.

**CHOSEN:** Official Calendly inline widget; funnel moved to popup (see decision above).

---

## 2026-10-28 — Site-wide typography readability (Tailwind remap)

**WHAT:** Remap Tailwind `text-xs`→14px, `text-sm`→16px, `text-base`→18px, `text-lg`→20px, `text-xl`→22px in `globals.css` `@theme`; nudge design-token h3/h4; codemod sub-14px arbitrary sizes to `text-xs`.

**WHY:** Design tokens already set body 18 / small 16, but most UI used default Tailwind 12/14px and many `text-[10px]`/`text-[11px]` labels. File-by-file class rewrites would be thousands of edits and still drift.

**CHOSEN:** Theme remapping (labels lift more than hero) + mechanical tiny-size cleanup. Not a uniform +Npx on every step.

**EVIDENCE:** Playwright probes: `text-xs` tracks 0.875rem, `text-sm` 1rem, body remains 18px via `--text-body-size`. Homepage, PPC service, case studies load without content overflow (sr-only/truncate only).

**TRADEOFF:** Components that relied on 12px density feel roomier; chart mocks using `text-xs` are larger (acceptable for readability).

**IMPACT:** `globals.css`, `design-system.json`, ~280 component files via codemod; Design-System.md type table.

---

## 2026-10-23 — Service pages: no text-only sections + hero form + shell width

**WHAT:** Every service section must include a distinct visual (diagram, chart, graph, map, timeline, matrix, sparkline, or image). Hero must include the intake form. Sections share `ServicePageShell` gutters. Applied first to Full-Service (`fullServiceCommand`) and PPC (`ppcCockpit`); remaining 18 follow the same rules as each dedicated template ships.

**WHY:** Text-only blocks read as template clones; mid-page-only forms hide conversion; inconsistent max-widths made sections jump.

**CHOSEN:** Per-page visual vocabulary + shared shell + hero form. Pattern register forbids repeating primary devices across services.

**IMPACT:** `ServicePageShell`; Full-Service and PPC dedicated templates; `SERVICES-PATTERN-REGISTER.md` global rules.

---

## 2026-10-23 — Services unique pages program

**WHAT:** Redesign all 20 root service pages one at a time so each has a unique section composition. Start with Full-Service Account Management (`layout: fullServiceCommand` + dedicated template). Shared template variants alone are not enough.

**WHY:** About and Contact proved each marketing page can own a standout look. Current service pages still read as one stack with light layout toggles. Visitor removing the H1 should not confuse one service page for another (or for About/Contact/Free Audit).

**OPTIONS:** (A) Global shared template polish (B) Per-slug dedicated compositions with a pattern register

**CHOSEN:** B

**TRADEOFFS:** More components and longer calendar; slower than a single template pass.

**IMPACT:** `service-page.schema.ts` layout enum; per-service templates under `src/components/services/`; JSON content blocks; SESSION-STATE pattern register; SITE-SEO-MAP status per page as completed.

---

## 2026-10-23 — Strip WordPress -2 suffixes (audit, privacy, terms)

**WHAT:** Canonical URLs become `/free-audit/`, `/privacy-policy/`, and `/terms-conditions/`. Permanent redirects from live WordPress paths `/free-audit-2/`, `/privacy-policy-2/`, and `/terms-conditions-2/`.

**WHY:** WordPress duplicate-slug suffixes are unprofessional and weaken brand URL quality. Stakeholder approved cleaning these three paths only (with 301s).

**OPTIONS:** (A) Keep `-2` forever for exact path parity (B) Clean slugs + 301 from old paths

**CHOSEN:** B

**TRADEOFFS:** Brief SEO crawl lag until Google consolidates; old bookmarks still work via 301.

**IMPACT:** `next.config.ts` redirects; route folders; all internal hrefs; sitemap; SITE-SEO-MAP; URL-INVENTORY; consent/footer links; Privacy + Terms pages implemented on clean paths.

---

## 2026-10-23 — Global typography denser (AMZ Dudes-like)

**WHAT:** Raise sitewide Satoshi scale and default body weight so copy no longer reads thin: body **18px / 500**, small **16px / 500**, headings larger with display/h1/stat at **900** (Fontshare-available weights only).

**WHY:** Stakeholder feedback that body/text sizes felt too fine; council (Brand-SEO, A11y, Pragmatist) voted SHIP WITH CHANGES referencing AMZ Dudes density and existing `/services/` 18px demographic research — without changing font family or colors.

**OPTIONS:** (A) Hub-only bump (B) Switch to Inter/system (C) Global token pass on Satoshi

**CHOSEN:** C

**TRADEOFFS:** Long blog posts and dense chrome may need spacing follow-ups; services-hub type overrides largely inherit globals now.

**IMPACT:** `design-system.json` typography.scale + accessibility.minBodyFontSize; `globals.css` body + `.text-*` utilities; Fontshare still `400,500,700,900`.

---

## 2026-10-22 — Canonical blog chart / figure / video

**WHAT:** Lock three media patterns as the single canonical approach for blog templates: (1) `chart-cards` renders column bars + notes when percentages exist, (2) figures use ink-border 16:9 frames (fence + markdown images), (3) `video-card` embeds YouTube/Vimeo in-page; other hosts use link+poster.

**WHY:** Chart captions were rendering as text-only cards; figure/video treatment was inconsistent between DS catalog and live posts.

**OPTIONS:** (A) Ad-hoc per-post HTML (B) Third-party chart library (C) Config-driven SVG/EG-token components + allowlisted embeds

**CHOSEN:** C

**TRADEOFFS:** No arbitrary iframe hosts; advanced charts stay SVG (no Recharts). Writers must use fences, not Elementor widgets.

**IMPACT:** `blog-blocks.json#canonical`, `design-system.json#blogEditorial`, `BlogChartCards`, `BlogVideoCard`, `BlogMarkdown` img, `/design-system/blog`, sample post `2025-amazon-algorithm-updates-what-sellers-need-to-know`.

---

## 2026-10-21 — Accent contrast pairing (lime vs ink)

**WHAT:** Ban `#C6FD50` (`text-accent`) as body/metric text on light surfaces. Light metrics use `text-primary` plus an accent left rule or chip fill (`bg-accent` + `text-primary`). Keep lime text on dark/ink stages.

**WHY:** Lime on white fails WCAG (~1.3:1). Users reported unreadable green metrics and weak heading/body hierarchy on case cards. Reckap-style council (Brand-SEO, Architect, Pragmatist) all voted SHIP WITH CHANGES — prefer ink metrics over overloading `success`.

**OPTIONS:** (A) Recolor accent darker sitewide (B) `text-success` for all light metrics (C) Surface pairing: accent = fill/border/dark-text only; light metrics = primary + accent cue

**CHOSEN:** C

**TRADEOFFS:** Some decorative lime type removed from light panels; brand punch shifts to chips/rules. Remaining light `text-accent` kickers should be audited as they appear.

**IMPACT:** `design-system.json` usage notes; `service-case-outcomes`, services grid, depth band, case-studies featured/KPI, mega-menu metric, FAQ open state, Featured badges.

---

## 2026-10-17 — Service graphics P0 + body layouts + early visuals

**WHAT:** Fix broken InfographicSpotlight (quality allowlist); ContainedMedia spotlight variant; distinct body section layouts; split earlyVisuals / lateOps; second niche diagrams on dry ops; teaching diagrams on mid paid pages.

**WHY:** Staging showed q=90 spotlights returning 400 (blur-only); Problem≡Solution geometry; all graphics late after Differ so mid-narrative felt empty.

**OPTIONS:** (A) Expand qualities allowlist to 90 (B) Clamp to 85 + no-blur spotlight + body grammars + early modules (C) Per-point image schema

**CHOSEN:** B — quality 85; Wave D grammars; early visual modules after Solution; Wave A/B AI teaching diagrams with honest captions.

**TRADEOFFS:** Results thumbs deferred; listing/video stay at module cap 4 (D2 split only).

**IMPACT:** ContainedMedia, InfographicSpotlight, service template/sections, 10 service JSONs + art, SERVICE-LAYOUT-RECIPES.

---

## 2026-10-16 — Services niche visual density (spotlight + unfilter)

**WHAT:** Unfilter process/checklist modules; always render `stats` strip; add `infographicSpotlight` and hero atmosphere; thicken metricChart; migrate dry single-diagram services out of 33vw gallery stamps.

**WHY:** Case studies felt rich while services felt empty despite dense JSON/art — root cause was renderer filter + ProofGalleryGrid desktop stamps, not missing diagrams.

**OPTIONS:** (A) Generate new art for all dry pages (B) Fix presentation scale + unlock existing modules (C) Copy competitor logo walls

**CHOSEN:** B — spotlight existing enterprise infographics; niche stats only from Verified case/growth captions; atmosphere from unused hub assets.

**TRADEOFFS:** Shared agency stats remain on ops pages; comparison tables still hidden when Differ exists.

**IMPACT:** `service-page.schema.ts`, all 15 service JSONs, service template/modules/hero, `SERVICE-LAYOUT-RECIPES.md`.

---

## 2026-10-15 — Case studies as layout-variant proof product

**WHAT:** Extend case-study schema and rebuild hub/detail UI with layout variants; reconcile JSON to live ecomgliders.com narratives and hard metrics; mirror featured images locally.

**WHY:** Staging JSON was templated and anonymized while live pages already had enterprise-depth content; soft chrome on stub bodies looked untrustworthy.

**HOW:** `layout` enum + structured fields (`keyIssues`, `strategyStages`, `beforeAfter`, meta); hub featured + PO hard cards; flagship sticky KPI; Free Audit CTA; preserve `/case-study-N/`.

**EVIDENCE:** Live hub/detail Playwright/fetch 2026-10-15; Zod 9/9; localhost + Vercel staging alias verified.

**RISK:** Trademark display of named brands Assumes continued authorization from live site publication.

**VALIDATION:** VERIFICATION-LOG 2026-10-15 case studies enterprise entry; https://ecom-gliders.vercel.app/case-studies/

---

## 2026-10-15 — Homepage video reviews as Favrick-style reels

**WHAT:** Add `videoReviews` homepage section — portrait reel strip with remote Vumbnail posters; click opens Radix lightbox with Vimeo iframe + pager. Keep text `testimonials`.

**WHY:** Favrick-style social proof; reuse owned Vimeo IDs from live site without inline autoplay (Vimeo privacy blocks background loops).

**HOW:** Content JSON + Zod enum; `VideoReviewsSection` + `VideoPreviewDialog`; place after `case-studies` before testimonials in page flow.

**EVIDENCE:** Six live IDs verified in backup/live audit; Playwright strip + lightbox on localhost:3002.

**RISK:** Poster CDN (vumbnail) availability; unknown speaker names for four carousel clips remain generic until confirmed.

**VALIDATION:** VERIFICATION-LOG 2026-10-15 video reviews entry; staging redeploy after APPROVE.

---

## 2026-10-04 — Services Master Program local completion

**WHAT:** Mark Services Pages Master Program A1–D3 complete locally (15 conversion JSON pages + cross-link audit). Staging/production deploy held until explicit approval.

**WHY:** Queue finished; closeout must not invent deploy success. Staging is a separate approval gate.

**HOW:** Each slug: research gate → SITE-SEO-MAP → full conversion JSON → Playwright verify → VERIFICATION-LOG. Closeout: link inventory, HTTP 200 matrix, TikTok relatedServices inbound fix.

**EVIDENCE:** SITE-SEO-MAP status table all Implemented; VERIFICATION-LOG A1–D3 + cross-link entries; local curl 200 for 15 services.

**RISK:** Staging/production not verified; `/services/` prefix redirects still unconfirmed on live domain.

**VALIDATION:** Staging smoke after APPROVE; then production cutover checklist.

---

## 2026-10-04 — Services pages conversion architecture

**WHAT:** Standardize all 15 service pages on root `/{slug}/` with PO hard-chrome template; optional `audience` and `differ` JSON sections; Service JSON-LD `areaServed` = 23 Seller Central markets.

**WHY:** Soft Card template did not match homepage PO system; schema lacked who-for / differentiation blocks needed for conversion SEO; single-country areaServed contradicted homepage market claims.

**HOW:** Extend Zod schema (optional fields so legacy JSON keeps validating); rewrite `ServicePageTemplate`; align JSON-LD markets with homepage FAQ; execute content rewrites one slug per CONTINUE.

**EVIDENCE:** Playwright on `/full-service-amazon-agency/` — Service+FAQPage, 23 areaServed, hard chrome panels, mobile no overflow.

**RISK:** `/services/` prefix redirects unconfirmed until live crawl / Search Console export.

**VALIDATION:** Per-slug Playwright + SITE-SEO-MAP row + VERIFICATION-LOG before marking each service done.

---

## 2026-09-02 - Project setup

Decision: Create project-local Cursor rules, skills, MCP config, Obsidian vault, and docs before any development.

Context: User requested full project operating system for AI-assisted migration work.

Chosen: All configuration in repository (.cursor/, obsidian/, docs/) not global Cursor settings.

Why: Keeps project knowledge portable and version-controlled.

Impact: Development blocked until audit phase completes.

---

## 2026-09-02 - Q3: Custom code tech stack (P1-04)

**WHAT:** Adopt Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 as the production stack for ecomgliders.com migration.

**WHY:** 328 root-level blog URLs require SSR/SSG with identical paths. Interactive browser mockup, forms, and future CMS admin need a single React application. Phase 0 implementation and user design approval (P0-07) validate the stack in practice.

**HOW:**
- Framework: Next.js 15 App Router, React 19, TypeScript strict
- Styling: Tailwind v4 with tokens from `content/config/design-system.json`
- UI: shadcn/ui (owned Radix primitives), Lucide icons, Motion for minimal animations
- Content: JSON config now (`content/config/*.json`), MDX for blog (`content/blog/`), `ContentRepository` + adapter pattern for future CMS
- SEO: `next/metadata`, `schema-dts` (P2+), catch-all `app/[slug]/page.tsx` for blog
- Forms (P3): React Hook Form + Zod + Server Actions
- Deployment (proposed): Vercel — requires confirmation at P4-04

**EVIDENCE:**
- Phase 0 scaffold runs: `package.json` (Next 15.5.x, React 19, Tailwind 4.3.x, Zod 4.x)
- `tsc --noEmit` passes; `/design-system` renders and approved by user
- `backup/metadata/blog-inventory.json` — 328 posts at root slugs, fits catch-all routing
- Competitor research and stack plan in `.cursor/plans/typescript_web_stack_e4470b1d.plan.md`

**OPTIONS CONSIDERED:**

| Option | Rejected because |
|--------|------------------|
| Astro | Weaker for interactive browser mockup + future CMS admin in same app |
| Plain React SPA | SEO penalty for 328 indexed posts; no built-in metadata/SSG |
| WordPress (keep) | Migration goal is custom code; current platform is audit source only |
| Framer export | Not maintainable; poor SEO control |
| Paid block libraries | Build custom in-house per brand and budget rules |

**CHOSEN:** Next.js 15 + TypeScript + Tailwind v4 + shadcn + JSON/MDX content layer.

**TRADEOFFS:**
- Higher bundle complexity than Astro for static-only pages
- Vercel coupling if chosen for hosting (mitigated: Next.js is portable)
- File-based content requires migration scripts before blog goes live (P3-01)
- No database until CMS phase — content edits via JSON/MDX in repo

**RISK:**
- Windows `npm run build` EISDIR observed in Phase 0 — verify on CI/Linux before P4-04
- `next lint` deprecated in Next.js 16 — migrate to ESLint CLI before upgrade

**VALIDATION:**
- P0-07 design system approval
- P3-04: 328 blog URLs resolve identically
- P4-02: Lighthouse 90+ all categories
- Stack doc: `obsidian/03-Architecture/Tech-Stack.md`
- Content architecture: `obsidian/03-Architecture/Content-Architecture.md`

**IMPACT:**
- `docs/project/OPEN-QUESTIONS.md` Q3 → Resolved
- Phase 1+ implementation proceeds per SESSION-STATE-BUILD.md
- Folder structure per `obsidian/04-Development/Folder-Structure.md` (update pending)

---

## 2026-09-02 - Q3 related: Content architecture pattern

**WHAT:** Repository + Adapter pattern for all page content; design tokens separate from `ContentRepository`.

**WHY:** User requirement — JSON-configurable now, CMS-swappable later without rewriting pages.

**HOW:** `ContentRepository` interface in `src/domain/content/`; `JsonFileContentRepository` adapter reads `content/config/*.json`; future `MdxBlogRepository` and CMS adapter implement same interface.

**EVIDENCE:** Documented in `obsidian/03-Architecture/Content-Architecture.md`; Phase 0 already uses JSON config for design-system, browser-mockup, review page via `src/lib/content-config.ts`.

**CHOSEN:** Repository + Adapter with Zod validation at adapter boundary.

**TRADEOFFS:** More boilerplate than direct JSON imports; pays off at CMS migration.

**IMPACT:** P1-06 implements interface; P1-05 creates `site.json` + `navigation.json`.

---

## 2026-09-02 - Homepage section type: comparison

**WHAT:** Add `comparison` to `homepageSectionTypeSchema` for Agency vs DIY table (redesign brief section 8).

**WHY:** Brief wireframe section 8 is a comparison table, not a contact teaser. Final CTA uses existing `cta` type.

**HOW:** Extend Zod enum in `homepage.schema.ts`; populate `comparison` section in `homepage.json` with feature rows.

**EVIDENCE:** `.cursor/plans/2026-09-02-homepage-redesign-brief.md` section 8; validated via `getHomepage()` parse.

**RISK:** P2-03 must implement comparison component; `contactTeaser` remains in schema unused.

**VALIDATION:** Zod parse of homepage.json; 12 enabled sections match brief order.

**IMPACT:** `Content-Architecture.md` SectionType union updated.

---

## 2026-09-02 - Homepage SEO module (no schema-dts)

**WHAT:** Add `src/lib/seo/` with `pageSeoToMetadata`, `buildHomepageJsonLd`, and `JsonLdScript`.

**WHY:** P2-05 requires homepage metadata and Organization/WebSite/FAQPage schema without adding dependencies.

**HOW:** `generateMetadata` in `(marketing)/page.tsx`; JSON-LD built from `homepage.json` + `site.json`; FAQ entities sourced from faq section data.

**EVIDENCE:** Playwright verified title, meta, canonical, and three schema types with 10 FAQ entities.

**RISK:** Local dev canonical uses production URL default; override via env on staging.

**VALIDATION:** SITE-SEO-MAP homepage record updated; Rich Results Test pending public deploy.

**IMPACT:** Reusable SEO helpers for service pages in P3-05+.

---

## 2026-09-02 - Native Next.js sitemap (not next-sitemap)

**WHAT:** Implement `app/sitemap.ts` and `app/robots.ts` using Next.js `MetadataRoute` APIs.

**WHY:** Plan listed `next-sitemap`, but built-in routes integrate with ContentRepository, avoid an extra dependency, and regenerate dynamically at request time in dev/staging.

**HOW:** `buildSitemapEntries()` merges static routes, service slugs, case study slugs, and blog MDX frontmatter (with `robots.index` respect).

**EVIDENCE:** `npm run verify:sitemap` — 343 URLs; curl `/sitemap.xml` and `/robots.txt` HTTP 200.

**RISK:** Sitemap generation reads all blog frontmatter on each request; acceptable at 328 posts; consider caching if build time grows.

**VALIDATION:** `docs/qa/sitemap-verification-report.json`.

**IMPACT:** Unimplemented routes excluded until pages exist (`/blog/`, legal pages, nav-only service URLs).

---

## 2026-09-02 - Sitemap/robots as route handlers + trailingSlash

**WHAT:** Serve `/sitemap.xml` and `/robots.txt` via `app/sitemap.xml/route.ts` and `app/robots.txt/route.ts`; enable `trailingSlash: true` in `next.config.ts`.

**WHY:** Metadata route files (`app/sitemap.ts`, `app/robots.ts`) triggered EISDIR during webpack trace on Windows exFAT. Trailing slashes required for URL preservation per migration rules.

**HOW:** `buildSitemapXml()` serializes ContentRepository entries; route handlers return XML/plain responses with cache headers.

**EVIDENCE:** Production build on NTFS succeeds; curl `/sitemap.xml` and `/robots.txt` HTTP 200 with trailing slash config.

**RISK:** Route handlers lack Next.js MetadataRoute typing convenience; logic remains in shared `buildSitemapEntries()`.

**VALIDATION:** `npm run verify:sitemap` unchanged; P4-01 verification still valid.

---

## 2026-09-02 - Windows exFAT blocks local production build

**WHAT:** Document that `npm run build` fails on exFAT drives (project on E:); verify builds on NTFS (C:) or CI.

**WHY:** Node.js `readlink` on exFAT returns EISDIR for non-symlink files during Next.js webpack file tracing.

**EVIDENCE:** `fsutil fsinfo volumeinfo E:` reports exFAT; build fails on E: with EISDIR; identical project builds on `C:/temp/ecom-gliders-build`.

**RISK:** Local developers on external exFAT drives cannot run production builds without path change.

**VALIDATION:** P4-02 Lighthouse verified via C: production build; Vercel deploy (P4-04) expected to succeed.

---

## 2026-09-02 - WCAG AA automated axe gate

**WHAT:** Add `tests/accessibility-wcag.spec.ts` with `@axe-core/playwright` scanning 6 key pages for WCAG 2.1 AA tags.

**WHY:** P4-03 requires axe-clean WCAG AA verification before launch.

**HOW:** Playwright navigates each page, runs axe with `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` tags; fails on any violation; writes per-page JSON to `docs/qa/`.

**EVIDENCE:** `npm run test:a11y` — 6/6 pass, 0 total violations.

**RISK:** Dev server audit may differ slightly from production; re-run against staging URL post-deploy.

**VALIDATION:** `docs/qa/accessibility-audit-summary.json`.

---

## 2026-09-02 - Vercel staging hosting confirmed

**WHAT:** Deploy eCom Gliders Next.js site to Vercel; staging alias `https://ecom-gliders.vercel.app`.

**WHY:** P4-04 requires live staging URL; resolves local exFAT build blocker via Vercel CI builds.

**HOW:** `vercel link` + `vercel deploy`; `vercel.json` for Next.js; `.vercelignore` excludes backup and QA artifacts; `NEXT_PUBLIC_SITE_URL` env for staging canonicals.

**EVIDENCE:** Build 350 pages READY; HTTP 200 on key routes; staging axe 6/6 pass.

**RISK:** Staging indexed if linked externally — use `noindex` or robots disallow on staging before public marketing if needed. Production cutover requires DNS + env URL change.

**VALIDATION:** `docs/qa/staging-deployment-report.json`.

---

## 2026-09-02 - Navbar mega menu IA (4 categories + Channels)

**WHAT:** Replace Core/Other mega menu with four capability columns — Advertising and Growth, Catalog and Content, Brand and Operations, Channels and DTC — plus CTA rail with verified metric. Enable announcement bar. Restore Video Creative and Email; add Shopify and TikTok Shop Ads under Channels.

**WHY:** Flat Core/Other taxonomy read as CMS leftover; boutique peers (Olifant/Sequence) use capability grouping + inline CTA. Multi-channel demand (Shopify/TikTok) should not dilute Amazon-hero columns.

**HOW:** Extend `navLinkSchema` (`featured`, `icon`); extend mega `footerLink` + CTA `eyebrow`/`metric`; rewrite `navigation.json`; rebuild `mega-menu-panel` / `nav-link-item` / `mobile-nav`; Lucide icons via `src/lib/nav-icons.ts`.

**EVIDENCE:** Config + UI implemented; desktop/mobile verification pending screenshots in `docs/qa/`.

**RISK:** Several destination URLs lack service pages yet (404 until built). Shopify/TikTok listed as intended offerings — service page claims must not invent metrics until delivery confirmed.

**VALIDATION:** Zod parse of `navigation.json`; Playwright open Services mega; announcement bar visible.

---

## 2026-09-08 - PrimaryButton + Navy/Orange production lock

**WHAT:** Lock sitewide CTA and brand color settings from `/design-system` into production tokens.

**WHY:** User approved Navy + Orange (`pair-navy-orange`) and PrimaryButton behavior (solid fill, filled-dot idle, bounce to lucide-animated ArrowRight at 18px) and asked to set these as global settings.

**HOW:**
- `content/config/design-system.json` — PrimaryButton as official primary/accent CTA; icon + motion tokens; lucide-animated for CTA trailing mark
- `content/config/color-themes.json` — `defaultThemeId: pair-navy-orange`, `productionLocked: true`
- Production colors already Navy `#0B1B3A` + Amazon Orange `#E47911` (explicit lock)
- Rejected for production CTA: border-beam, body gradient, galaxy, LTR/RTL icon slides, soft-crossfade-only

**CHOSEN:** PrimaryButton sitewide + pair-navy-orange as production color lock.

**IMPACT:** Design-system theme switcher remains preview-only; live site always uses `design-system.json` tokens via `ThemeReset` / `buildCssVariables`.

---

## 2026-09-15 - Unlock navy/orange; adopt Project One visual system

**WHAT:** Replace production visual lock (navy `#0B1B3A` + orange `#E47911` + IBM Plex Sans) with Project One visual system: ink `#131311`, lime `#C6FD50`, canvas `#FAFAFA`, Satoshi (Fontshare). Content remains eCom Gliders only.

**WHY:** User directed full design/layout/fonts/colors to match Project One while keeping eCom copy. Prior “PO fidelity” passes under navy/orange did not read as PO side-by-side.

**HOW:**
- Update `content/config/design-system.json` tokens + page atmosphere + typography notes
- Load Satoshi via Fontshare in `src/app/layout.tsx`; wire `--font-sans` / `--font-display` in `globals.css`
- Remap hardcoded chrome shadows/accents in `src/` to ink/lime
- PrimaryButton + floating nav hard shadows use `#131311`; accent CTA = lime + ink chip
- Section layout rebuilds continue one pass at a time per `.cursor/prompts/PO-VISUAL-REBUILD-MASTER.md`

**OPTIONS CONSIDERED:**

| Option | Rejected because |
|--------|------------------|
| Keep navy/orange + match only layout | User saw no visible PO match; signature is lime/Satoshi |
| Copy PO pricing/copy | Violates content lock / brand integrity |
| Local-only Satoshi files first | Fontshare CDN acceptable for Pass 0; may vendor later |

**CHOSEN:** PO visual system unlocked; eCom content lock retained.

**TRADEOFFS:**
- Amazon partner badge orange may contrast with lime system until Pass assets review
- Theme preview `pair-navy-orange` may diverge from live tokens until themes file updated
- External Fontshare dependency until fonts are vendored

**RISK:** Unverified claim reuse; PO copy leakage during layout ports.

**VALIDATION:** Pass 0 screenshots — accent lime, body Satoshi, ink hard shadows on nav/CTA at 1440 + 390.

**IMPACT:** Supersedes 2026-09-08 navy/orange production color lock for live homepage rebuild. Docs: plan `.cursor/plans/2026-09-15-po-visual-rebuild.md`, prompt `.cursor/prompts/PO-VISUAL-REBUILD-MASTER.md`.

---
