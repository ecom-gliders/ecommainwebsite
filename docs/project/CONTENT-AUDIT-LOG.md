# Content Audit Log

Track unprofessional wording replacements during migration.

## Template

```
Page/Post: URL or title
Original text: ...
Replacement: ...
Reason: ...
Date: YYYY-MM-DD
Approved: yes | pending
```

---

## 2026-10-28 — Company wordmark plural

| Location | Original | Replacement | Reason | Approved |
|----------|----------|-------------|--------|----------|
| `BrandLogo` header/footer/mobile | eCom Glider | eCom Gliders | Official company name is plural | yes |

Site config, SEO titles, and page copy already used “eCom Gliders”; the visible text wordmark was the remaining singular.

---

## 2026-09-03 — Wave F a11y polish

| Location | Original | Replacement | Reason | Approved |
|----------|----------|-------------|--------|----------|
| Accent PrimaryButton | White text on `#E47911` / `#CC6A00` | Navy (`text-primary`) on accent fill | axe color-contrast fail on Free Audit CTAs | pending |
| Consent privacy link | Underline on hover only | Always underlined | axe link-in-text-block | pending |

---

## 2026-09-03 — Enrich existing sections (Wave D)

| Location | Original | Replacement | Reason | Approved |
|----------|----------|-------------|--------|----------|
| Services descriptions | One-line blurbs | Locked two-sentence capability copy (B4) | Depth without slang | pending |
| Seller segments | One-line bodies; no CTAs | Two-sentence bodies + launch/growth/catalog audit CTAs | Self-segmentation + conversion | pending |
| Process steps | One-line Audit–Report | Locked onboarding-aligned descriptions + assurances | Honesty + clarity | pending |
| Comparison cells | Yes/No/Manual shorthand | Locked clearer Agency vs DIY cells + DIY article footer link | AEO + honesty | pending |
| FAQ marketplaces | Vague US + international | US/UK/CA/EU (DE/FR/IT/ES/NL) with consult note | Match old-site verified list | pending |
| FAQ set | 10 items | 12 items incl. PPC process, account health, A+/storefront | Merge old accordion value | pending |
| Final CTA | Button + phone + email only | Added “Prefer the short form above” → `#hero-lead-form` | Convenience without second form | pending |
| Blog preview thumbs | (none / remote ChatGPT art) | Kept text-only cards | Skip low-quality AI stock per B12/C2 | pending |
| Hero deferredVisual | browserMockup note in hero JSON | Process owns `showMockup` | Superseded placement | pending |

---

## 2026-09-03 — Brand values and creative (Wave C)

| Location | Original | Replacement | Reason | Approved |
|----------|----------|-------------|--------|----------|
| Brand values heading | We're Real. We're Honest… | How we partner with brands | Professional agency voice | pending |
| Brand values support | Clear updates, no sugarcoating… | Direct communication and an in-house team accountable for outcomes. | Remove slang | pending |
| Four pillars | Strategic Brand Engineering, etc. | Strategy beyond isolated tactics; Collaboration with your team; Systems that sustain growth; Clear, accountable execution | Keep ideas; rewrite titles/bodies | pending |
| Creative heading | Get Amazon creative that make… | Amazon creative that helps products stand out | Grammar + professional | pending |

---

| Location | Original | Replacement | Reason | Approved |
|----------|----------|-------------|--------|----------|
| Trust bar | Amazon badge + $112M+ statLine + 3 partner logos | Partners (eLEEVATE, SSP) + client marquee + reviews/press; Amazon badge hero-only; no trust statLine | Deduplicate partner badge; move metrics to stats; restore old-site trust density | pending |
| Trust eyebrow | (none) / OUR Clients | Trusted by Amazon brands | Professional; replace unprofessional old heading | pending |

---

Competitor CTA check (Observed via Playwright): Canopy primary "Get your free audit" / secondary "See the Proof"; AMZ Dudes "Get My Free Account Audit" / "Explore Services"; MAG close CTAs "Request for a quote" / "Book a call to get started".

| Location | Original | Replacement | Reason | Approved |
|----------|----------|-------------|--------|----------|
| Hero subheadline | (prior AI negation / vague lines) | We manage PPC, listing optimization, content, and catalog health so your Amazon brand scales with clear priorities. | Specific services; no unverified claims | pending |
| Hero supportLine | In-house specialists. Not a call center… | Dedicated specialists assigned to your account, with reporting tied to sales, ACOS, and catalog health. | Remove AI-negation pattern; outcome metrics | pending |
| Hero primaryCta | Free Audit / Get Free Audit variants | Get your free audit | Match Canopy wording; sentence case | pending |
| Hero secondaryCta | View case studies variants | See client results | Canopy "See the Proof" analogue; clearer for 30+ buyers | pending |
| Who we serve subheading | Tailored account management for every stage of Amazon growth | Account management matched to catalog stage and growth goals | Less generic marketing | pending |
| New sellers blurb | Launch your Amazon brand with expert guidance from day one | Listings, ads, and catalog foundations set correctly before spend leaks | Concrete outcome | pending |
| Scaling brands blurb | Grow revenue and optimize ACOS with dedicated account management | Revenue growth with ACOS control under a dedicated account team | Tighter | pending |
| Multi-ASIN blurb | Manage complex catalogs with listing health and PPC at scale | Listing health and PPC managed across large, complex catalogs | Active, specific | pending |
| How we work + steps | Soft "custom growth plan" / "metrics that matter" | Audit-to-report language tied to sales, ACOS, catalog health | Align with hero supportLine | pending |
| Testimonials heading | Hear it from the brands we have helped | What our clients say | Avoid MAG-style soft phrasing | pending |
| Final CTA heading | Ready to scale your Amazon brand? | Start with a free Amazon account audit | Specific offer; less generic urgency | pending |
| Final CTA sub + button | Get a free audit… / Get Free Audit | Review PPC, listings, catalog… / Get your free audit | Consistent CTA system sitewide | pending |

Nav chrome keeps short label "Free Audit" (header space).

---

## 2026-09-03 — Hero lead form (conversion)

| Location | Original | Replacement | Reason | Approved |
|----------|----------|-------------|--------|----------|
| Hero visual | BrowserMockup | AMZ Dudes–style 2-col lead form card | Conversion-first homepage; browser deferred | pending |
| Hero primaryCta href | `/free-audit-2/` | `#hero-lead-form` | Scroll to on-page form | pending |

Browser mockup retained in `homepage.json` → `deferredVisual` for a later section/services placement.

---

## 2026-10-22 — Blog body sanitize (WP visual blocks)

| Location | Original | Replacement | Reason | Approved |
|----------|----------|-------------|--------|----------|
| Blog MDX bodies (328) | Elementor HTML, share/Recent Posts/Categories chrome, Beehiiv iframes, FAQ scripts | Stripped or converted via `sanitizeBlogMarkdown` | Safe themed markdown; no `rehype-raw` | yes |
| Feature CSS grids | Inline `display:grid` + WP SVG colors `#0066ff` / `#ff6633` | ` ```feature-grid ` + `BlogFeatureGrid` (ink/lime tokens) | Preserve structure; drop WP hex | yes |
| `.glider-btn` CSS dumps | Royal blue `#2A4FFF` button CSS as plain text | Removed; markdown links + page `BlogPostCta` | No WP color passthrough | yes |
| Colored spans | `style="color: #ff6600"` | Plain markdown links/strong | Design-system tokens only | yes |
