# Page Optimization Standard

Canonical rules for every indexable eCom Gliders page: SEO, AEO, GEO/LLM SEO, local SEO, meta/OG, schema, and AI-vibe cleanup.

**Updated:** 2026-10-30  
**Use with:** `.cursor/skills/seo-audit`, `seo-aeo-geo`, `seo-meta-tags`, `seo-schema-snippets`, `seo-content-quality`, `seo-llm-context`, `seo-local-seo`, `seo-performance`  
**Record:** `docs/seo/SITE-SEO-MAP.md` (per page) · `docs/project/CONTENT-AUDIT-LOG.md` (copy changes)

---

## Non-negotiables

1. Preserve URL paths (especially blog root slugs). No URL change without inventory + approval + 301.
2. Evidence language only: Verified, Observed, Assumed, Proposed, Requires confirmation, Not yet tested.
3. Verified claims only (since 2018, 20+ in-house, 95% retention, $112M+ revenue managed — re-verify before reuse).
4. Professional Amazon-agency tone. No AI marketing fluff. No decorative Unicode as UI/copy ornaments.

---

## Meta tags

| Element | Rule |
|---------|------|
| Title | Unique. Prefer under ~60 characters. Format: `Primary keyword — context \| eCom Gliders` (or brand-led on home). |
| Meta description | Unique. ~120–160 characters. Specific outcome + CTA without hype. |
| Canonical | Absolute HTTPS matching the live path (trailing slash policy consistent with site). |
| Robots | Index,follow for public pages; noindex for private/utility if any. |
| H1 | Exactly one. Aligns with primary intent. Must not duplicate title blindly if awkward. |

## Open Graph / Twitter

Full rules: `docs/seo/OG-IMAGE-STANDARD.md` · skill `og-social-preview`.

| Element | Rule |
|---------|------|
| og:title | Match or slight shorten of title |
| og:description | Match meta description intent |
| og:url | Canonical URL |
| og:type | `website` (core/home/service) or `article` (blog) |
| og:image | Absolute URL under `/images/og/*-1200x630.jpg`; width 1200 height 630 alt set; optional second square 1200×1200 |
| og:image weight | Under ~200 KB JPEG; never raw 1 MB heroes |
| twitter:card | `summary_large_image` with landscape image |
| Fallback | `seo.ogImage` → featured/hero → `/images/og/default-1200x630.jpg` |

## Heading hierarchy

- One H1.
- H2 = major sections / answerable questions.
- H3 = sub-points under that H2.
- Do not skip levels for style.
- Avoid AI outline dumps (“Introduction”, “Conclusion”, “Final Thoughts”) unless the section earns it.

## AEO (Answer Engine Optimization)

- Under question-style H2s: first 1–3 sentences = direct answer (plain SVO).
- Real FAQs only — no inventing Q&A to pad schema.
- Prefer semantic lists/tables for comparisons when content warrants it.
- Explicit entity names: **eCom Gliders**, service names as used on service pages.

## GEO / LLM SEO

- Consistent company identity and service descriptions across pages.
- Machine-readable summaries via clear headings + schema.
- No keyword stuffing; no contradictory facts.
- Citeable, specific statements over vague superlatives.

## Local SEO

- Office NAP (Albuquerque, NM) consistent on Contact / About / footer.
- `LocalBusiness` / NAP schema only where the page is truly local/entity — **do not** attach fake LocalBusiness to every US-state blog post.
- Location blogs: unique local intro + useful local modifiers; avoid thin spun duplicates.

## Schema by page type

| Page type | Required / expected |
|-----------|---------------------|
| Homepage | Organization, WebSite, FAQPage (if real FAQs) |
| Service | Service (or OfferCatalog pattern), FAQPage if real FAQs, BreadcrumbList |
| Blog post | BlogPosting / Article, BreadcrumbList; FAQPage only if real FAQs |
| Case study | Article or CreativeWork + BreadcrumbList |
| About | AboutPage, Organization |
| Contact | ContactPage (+ Organization / LocalBusiness as appropriate) |
| Free audit | WebPage, FAQPage if real FAQs |
| Tools | WebApplication or SoftwareApplication + BreadcrumbList as documented |

Validate JSON-LD after edits. Prefer `@graph` when multiple types share a page.

## Internal linking

Minimum useful set per page:

- Related service(s)
- Free Audit (`/free-audit/`) when commercial intent
- Blog hub or a related post when topical
- Avoid orphan sections with zero outbound context links

## AI-vibe and forbidden symbols

**Strip from user-facing copy (UI, MDX, JSON content):**

- Decorative Unicode arrows: `→` `➜` `⇒` `⟶` and similar
- Fancy bullets used as ornaments: `•` `▪` `▸` `●` (use real HTML/Markdown lists)
- Emoji in body/headings/CTAs
- Em-dash spam and “smart” separator lines used as decoration

**Rewrite patterns:**

| Avoid | Prefer |
|-------|--------|
| unlock / dive in / leverage / comprehensive suite | Specific capability |
| game-changer / cutting-edge / seamless | Plain description |
| Oops / Get started now!!! | Exact professional wording |
| Fake urgency | Clear next step |

Log material replacements in `docs/project/CONTENT-AUDIT-LOG.md`.

## Per-page workflow

1. DISCOVER (Playwright) — title, meta, canonical, robots, OG/Twitter, H1–H3, schema, CTA, links  
2. AUDIT — intent, keywords, AEO/GEO gaps, schema, thin/duplicate, AI symbols  
3. PLAN — WHAT / WHY / HOW; exact edits; no URL change without approval  
4. IMPLEMENT — content/components only for that page  
5. VERIFY — re-render; STATUS / IMPLEMENTED / VERIFIED / REMAINING  
6. DOCUMENT — SITE-SEO-MAP, CONTENT-AUDIT-LOG, VERIFICATION-LOG, SESSION-STATE  

One URL per agent turn unless the user assigns a batch.

## Related

- [SITE-SEO-MAP.md](SITE-SEO-MAP.md)
- [TECHNICAL-SEO-AUDIT.md](TECHNICAL-SEO-AUDIT.md)
- [URL-INVENTORY.md](URL-INVENTORY.md)
- Rule: `.cursor/rules/06-seo-aeo-geo.mdc`, `.cursor/rules/13-professional-copy.mdc`
