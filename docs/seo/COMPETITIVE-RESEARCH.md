# Competitive Research: Amazon Agency Websites

**Research date:** 2026-09-02  
**Status:** Verified (live site fetch, Playwright snapshots, eCom Gliders backup HTML)  
**Purpose:** Inform eCom Gliders custom site migration design, positioning, SEO, and UX decisions.

---

## Executive summary

Research covered 10+ Amazon agency websites across user-provided competitors and industry-ranked benchmarks. eCom Gliders occupies a mid-market position between conversion-focused agencies (AMZ Dudes) and boutique premium agencies (Olifant Digital). The primary design target is Tier B boutique premium with Tier C conversion patterns.

**Key advantages for eCom Gliders:**
- 328 blog posts (content moat)
- 95% client retention (competitive with top agencies)
- Amazon Ads Verified Partner badge
- GoSports 310% case study
- In-house team of 20+ specialists

**Critical gaps to close:**
- No header CTA button
- Duplicate navigation systems
- Service pages use blog template instead of dedicated layout
- Footer service links use anchor hashes, not dedicated URLs
- Only one case study prominently featured

---

## Research methodology

| Step | Method | Evidence |
|------|--------|----------|
| 1 | Review existing project docs and backup | `backup/metadata/manifest.json`, `backup/pages/homepage.html` |
| 2 | Live site fetch of competitor homepages | 2026-09-02 |
| 3 | Playwright browser snapshots | Header, nav, footer, detail page patterns |
| 4 | Clutch and industry review lists | ALFI, Kyzenn, agency ranking articles |
| 5 | eCom Gliders backup HTML analysis | WPR mega menu, Elementor nav, footer structure |

Confidence levels used: Verified, Observed, Assumed, Proposed.

---

## Tiered competitor landscape

### Tier 1 - User-provided (direct inspiration)

| Agency | URL | Primary angle | Scale signals | Design strength |
|--------|-----|---------------|---------------|-----------------|
| My Amazon Guy | https://myamazonguy.com/ | Full-service at scale | 430+ brands, $1.2B, 400+ staff | Trust density, FAQ depth, YouTube education |
| AMZ Dudes | https://amzdudes.com/ | Account management | $50M+, 500+ brands, 65% ACoS cut | Stat cards, lead modal, numbered services |
| Canopy Management | https://canopymanagement.com/ | Premium partner | $3.2B, 1000+ brands, Inc 500 #325 | Video case studies, awards wall, category selector |
| AMZ One Step | https://www.amzonestep.com/ | Creatives + PPC | Before/after in days | Portfolio galleries, result data cards |

### Tier 1 - Industry benchmark

| Agency | URL | Primary angle | Scale signals | Design strength |
|--------|-----|---------------|---------------|-----------------|
| Olifant Digital | https://olifantdigital.com/ | Boutique premium | $10B+ client revenue, 93% retention, Clutch 5.0 | Revenue ticker, video testimonials, guarantee badge |
| Sequence Commerce | https://sequencecommerce.com/ | Enterprise growth + AI SEO | $500M+, 285% avg lift, 280+ reviews | Comparison tables, vertical playbooks, reporting UI |
| SalesDuo | https://salesduo.com/ | AI-powered full-service | 300+ brands, $3B+ managed | Agency-type tabs, service segmentation |
| Incrementum Digital | https://incrementumdigital.com/ | Advertising specialist | DataOwl platform, 121 Trustpilot reviews | Proprietary tech showcase, founder story |

### Tier 2 - Niche reference

| Agency | URL | Primary angle | Notes |
|--------|-----|---------------|-------|
| Evolve Media Agency | https://evolveamz.com/ | Creative + content | 200+ free guides, content library homepage |
| Trivium Group | - | PPC performance | Site returned 500 during fetch; noted from ALFI review |
| AMZ Pathfinder | - | PPC specialist | 5-step process model |
| Channel Key | - | Enterprise marketplace ops | Enterprise positioning reference |
| Buy Box Experts | - | Listing and catalog | Catalog-heavy service model |
| Marknology | - | Performance marketing | $2B+ managed |
| eStore Factory | - | Budget SMB | Lower-tier design reference (avoid) |

---

## Individual agency profiles

### Olifant Digital (primary design reference)

**Positioning:** Boutique premium Amazon and e-commerce growth agency.

**Header:**
- Top announcement bar: Clutch 5.0 rating, $100M+ managed revenue
- Mega dropdown nav with 2 columns + inline CTA panel per dropdown
- Primary CTA: "Free marketing plan" button, always visible
- Sticky header on scroll

**Homepage sections:**
- Hero with outcome headline and application CTA
- Scrolling revenue ticker ($305K, $688K client wins)
- 60-day money-back guarantee badge
- 15+ case study cards with metrics
- Video testimonials with named CEOs
- Multi-city office addresses (NY, LA, London, Berlin, Sofia)

**Footer:** 5 columns (offices, agency links, Amazon services, e-commerce services, tools/calculators)

**Takeaway for eCom Gliders:** Best reference for mega menu structure, header CTA, and case study presentation.

---

### AMZ Dudes (conversion reference)

**Positioning:** Amazon account management for growing sellers.

**Header:**
- Simple horizontal nav with modal-trigger CTA
- "Get Free Consultation" with phone in modal
- Sticky header

**Homepage sections:**
- Stat cards immediately below hero ($50M+, 65% ACoS reduction, 180% ROI)
- Numbered service list (01-09)
- Seller-type tabs (new, growing, enterprise, wholesale)
- Exit-intent or scroll-triggered lead modal
- WhatsApp float button

**Takeaway for eCom Gliders:** Adopt stat cards, sticky CTA, and seller segmentation. Avoid emoji in UI.

---

### Canopy Management (enterprise premium reference)

**Positioning:** Premium Amazon partner for large brands.

**Header:**
- Clean horizontal nav, services dropdown
- "Talk with expert" CTA
- Sticky header

**Homepage sections:**
- Dark high-contrast hero
- Awards wall (17+ badges: Inc 500, Amazon Preferred Partner, Clutch, Stevie)
- Featured case studies with video embeds and founder quotes
- Category/vertical segmentation (8+ industries)
- Stats row repeated in footer

**Case studies page:**
- Filterable grid by service type
- Metric headline + brand category + description per card
- 3 metrics per featured case (sales %, CVR %, ACoS %)

**Takeaway for eCom Gliders:** Case study filter grid and awards presentation. Not competing on enterprise scale.

---

### My Amazon Guy (full-service scale reference)

**Positioning:** Largest full-service Amazon agency.

**Header:**
- Standard dropdown nav
- "Free listing audit" CTA
- Sticky header

**Homepage sections:**
- Trust density (logos, reviews, certifications)
- 4-pillar service grid
- 10+ FAQ items with FAQPage schema
- YouTube education integration
- Long-form service content (3000+ words, blog-style)

**Takeaway for eCom Gliders:** FAQ depth and trust bar density. Do not compete on 400+ staff scale.

---

### Sequence Commerce (enterprise + AEO reference)

**Positioning:** Enterprise growth agency with AI SEO leadership.

**Header:**
- Awards badge strip above nav
- Multi-level services mega menu
- "Free audit" CTA

**Homepage sections:**
- Comparison table (agency vs in-house vs generalist)
- Vertical playbooks by industry
- AIO/GEO section for answer engine optimization
- 280+ review scores displayed
- Multi-office global presence (12 offices)

**Takeaway for eCom Gliders:** Agency vs DIY comparison table for AEO. Blog/insights prominence.

---

### SalesDuo (segmentation reference)

**Positioning:** AI-powered full-service Amazon agency.

**Header:**
- Tabbed agency-type selector on page
- Contact CTA in header

**Homepage sections:**
- Agency-type tabs (Amazon, Walmart, etc.)
- Service segmentation by channel
- $3B+ managed, 300+ brands stats

**Takeaway for eCom Gliders:** Service segmentation patterns. Avoid "AI-powered" marketing clichés unless genuinely earned.

---

### Incrementum Digital (advertising specialist reference)

**Positioning:** Amazon advertising agency with proprietary DataOwl platform.

**Homepage sections:**
- Proprietary tool showcase (DataOwl)
- Founder story
- 121 Trustpilot reviews
- Advertising-led service focus

**Takeaway for eCom Gliders:** Only showcase proprietary tools if they exist. eCom Gliders has no equivalent; skip this section.

---

### AMZ One Step (creative specialist reference)

**Positioning:** Amazon creatives and PPC specialist.

**Homepage sections:**
- Before/after creative galleries
- Data cards with days-to-result (12 days, 114% sessions)
- CEO letter addressing seller pain points
- Portfolio-focused layout

**Takeaway for eCom Gliders:** Visual creativity service page can adopt before/after gallery pattern if assets exist.

---

### Evolve Media Agency (content library reference)

**Positioning:** Creative-first agency for $1M-$10M brands.

**Homepage sections:**
- Content library as homepage (200+ free guides)
- Split-test focus
- Category-based content navigation

**Takeaway for eCom Gliders:** eCom Gliders has 328 blog posts; link blog prominently in nav and homepage.

---

## Design tier framework

| Tier | Examples | Characteristics |
|------|----------|-----------------|
| A - Enterprise premium | Canopy, Sequence, MAG | Dark hero, 10+ awards, 3+ video case studies, global offices, 280+ reviews |
| B - Boutique premium | Olifant Digital | Clean white layout, revenue ticker, guarantee badge, 15+ case cards, named CEO quotes |
| C - Conversion-optimized | AMZ Dudes, SalesDuo | Stat cards above fold, lead modal, numbered services, sticky CTA, WhatsApp float |
| D - Specialist/portfolio | AMZ One Step, Evolve, Incrementum | Before/after galleries, proprietary tools, content library, founder letters |
| E - Basic/functional | Budget SMB agencies | Generic imagery, vague headlines, footer-only contact. Avoid. |

**eCom Gliders current:** Between Tier C and Tier E on design polish.  
**eCom Gliders target:** Tier B (Olifant) + Tier C (AMZ Dudes) mix.

---

## eCom Gliders positioning

### Sweet spot

Between AMZ Dudes (mid-market hands-on) and Olifant Digital (boutique premium). Not enterprise scale like Canopy/MAG, but more personal than call-center agencies.

### Differentiation statement (proposed)

"Full-service Amazon account management with an in-house team of specialists. Not a call center. Not a software dashboard. Real people who treat your brand like their own."

### Honest metric comparison

| Metric | eCom Gliders | Olifant | Canopy | AMZ Dudes |
|--------|-------------|---------|--------|-----------|
| Revenue managed | $112M+ | $10B+ client | $3.2B | $50M+ |
| Retention | 95% | 93% | 99.1% | Not stated |
| Team size | 20+ | Senior-only | 1000+ brands | Not stated |
| Since | 2018 | - | 2015 | - |
| Blog posts | 328 | Moderate | Moderate | Low |

Present metrics honestly. 95% retention is competitive. $112M managed is credible for mid-market.

---

## Navigation and UX gaps (eCom Gliders vs competitors)

| Issue | Current eCom Gliders | Competitor standard | Priority |
|-------|---------------------|---------------------|----------|
| No header CTA button | Missing | All have one | Critical |
| Duplicate nav systems | 2 menus on same page | Single nav | High |
| Mega menu hidden headings | "Inactive" H2s | None | High |
| Footer links use anchors | #s-1, #service_2 | Dedicated page URLs | High |
| Menu typos | "Advertisment", "Shiping" | Clean copy | Medium |
| No top announcement bar | Missing | Olifant, Sequence | Medium |
| Blog not in primary nav | Footer only | Olifant, Sequence in nav | Medium |
| Service pages as blog posts | Article schema | Service layout | High |

---

## Keyword landscape

### Primary terms (all top agencies target)

- Amazon account management agency
- Full service Amazon agency
- Amazon PPC management agency
- Amazon growth agency
- Amazon advertising agency

### 2026 emerging terms

- AI SEO for Amazon / AEO for ecommerce
- Amazon DSP management
- Amazon account management services (long-tail)

### eCom Gliders SEO rule

Preserve all 328 blog URLs with identical paths. Add homepage and service page optimization for account management terms.

---

## What to adopt vs avoid

### Adopt

- Header CTA button (Olifant, AMZ Dudes)
- Mega menu with inline CTA panel (Olifant)
- Stat cards above fold (AMZ Dudes)
- Case study cards with metrics (Olifant, Canopy)
- Agency vs DIY comparison table (Sequence)
- FAQ with FAQPage schema (MAG)
- Blog prominence in nav (Evolve, Sequence)
- Named testimonials with role and company (Olifant)

### Avoid

- Copying competitor copy, layouts, or assets
- Emoji in UI (AMZ Dudes uses some)
- "AI-powered" clichés without genuine capability
- Fake ChatGPT recommendation blocks
- Inflating metrics to match enterprise agencies
- Multi-office footer unless addresses are accurate

---

## Related documents

- [obsidian/09-Research/Competitor-Analysis.md](../../obsidian/09-Research/Competitor-Analysis.md)
- [obsidian/09-Research/Niche-Website-Standards.md](../../obsidian/09-Research/Niche-Website-Standards.md)
- [obsidian/07-UX/Design-Inspiration.md](../../obsidian/07-UX/Design-Inspiration.md)
- [obsidian/07-UX/Navigation-Footer-Spec.md](../../obsidian/07-UX/Navigation-Footer-Spec.md)
- [docs/seo/SITE-SEO-MAP.md](SITE-SEO-MAP.md)
- [backup/research/competitors/](../../backup/research/competitors/)

---

## Evidence log

| Date | Source | Finding | Confidence |
|------|--------|---------|------------|
| 2026-09-02 | Live fetch | Olifant header CTA and mega menu structure | Verified |
| 2026-09-02 | Live fetch | AMZ Dudes stat cards and lead modal | Verified |
| 2026-09-02 | Live fetch | Canopy case study filter grid | Verified |
| 2026-09-02 | backup/pages/homepage.html | eCom Gliders duplicate nav systems | Verified |
| 2026-09-02 | backup/metadata/manifest.json | 328 blog posts, 26 pages | Verified |
| 2026-09-02 | Trivium Group fetch | Site returned 500 | Observed |
| 2026-10-04 | backup/pages/full-service-amazon-agency.meta.json | Live WP title/meta/H1 for A1; FAQ themes include ownership, PPC vs full-service, marketplaces | Verified |
| 2026-10-04 | canopymanagement.com/services/full-service-account-management/ | H1 “Full service Amazon account management”; under-one-roof service grid; audit CTA pattern | Verified |
| 2026-10-04 | sequencecommerce.com/amazon/ | Full-funnel Amazon agency; account management as listings+ads+inventory+CS; FAQ/definition blocks | Verified |

---

## A1 gate — Full-service Amazon agency (2026-10-04)

**QUESTION:** How should `/full-service-amazon-agency/` position vs Canopy and Sequence without inventing metrics?

**EVIDENCE:**
- Backup WP: commercial intent around full account management; FAQ set covers ownership, PPC-only vs full-service, marketplaces (Verified)
- Canopy: “under one roof” AM checklist + free-audit style CTA (Verified)
- Sequence: definitional AEO (“What does an Amazon agency do?”) + senior operator framing (Verified)
- eCom Gliders verified claims only: since 2018, 20+, 95% retention, $112M+, GoSports 310%, Kitchen 73% (Verified in site config)

**CONCLUSION (Proposed):** Lead with full-service account management keyword; differentiate on in-house coordination of ads + listings + catalog; keep markets FAQ identical to homepage; link case studies by slug.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Do not copy Canopy “84% YoY” or Sequence “$500M+” claims
- Emphasize audit-first + 95% retention + Amazon Ads Verified Partner
- Add audience + differ sections for conversion architecture

---

## A2 gate — Amazon PPC management agency (2026-10-04)

**QUESTION:** How should `/amazon-ppc-management-agency/` convert commercial PPC intent vs Incrementum and AMZ Dudes content?

**EVIDENCE:**
- Backup WP: title/meta/H1 target “Amazon PPC Management Agency”; FAQ themes include ad types, rebuild vs existing, budget, multi-marketplace (Verified)
- Incrementum `/services/amazon-advertising/`: first-party audience / advertising positioning; audit CTA pattern (Verified via Playwright)
- AMZ Dudes PPC guide: defines management vs running ads; SP/SB/SD/DSP; ACoS vs TACoS; weekly optimization (Observed via fetch 2026-10-04)
- Case claims: GoSports ACOS 52%→26.5% + 310% revenue; VoltTech profitable PPC recovery (Verified in case-studies.json)

**CONCLUSION (Proposed):** Lead with primary keyword in H1; emphasize structure + search-term discipline + listing alignment; keep DSP as related service not oversold on this page; use only verified case metrics.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Verified Partner + in-house specialists
- Profit framing via ACoS/TACoS without inventing average efficiency claims
- Link PPC case studies by slug (`/case-study-9/`, `/case-study-3/`)

---

## A3 gate — Amazon listing optimization (2026-10-04)

**QUESTION:** How should `/amazon-listing-optimization/` convert listing SEO intent vs Canopy and SalesDuo?

**EVIDENCE:**
- Backup: no dedicated WP HTML for `/amazon-listing-optimization/` in scrape inventory (Observed). Related blogs: `amazon-listing-optimization-2026`, ranking-factor posts (Verified)
- Canopy `/services/product-listing-optimization/`: H1 product listing optimization; copy+creative+A+ packaging; calculator CTA (Verified Playwright)
- SalesDuo listing agency: continuous optimization + FAQ depth; third-party growth metrics (Observed fetch) — not copied
- Case claims: GoSports CVR 9.8%→26.7% + 310%; Kitchen 73% with listing optimization (Verified case-studies.json)

**CONCLUSION (Proposed):** Lead with listing optimization + SEO keyword; emphasize ranking+conversion together and PPC alignment; use only verified case metrics; markets FAQ matches homepage.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- No CVR guarantee or competitor YOY averages
- ASIN prioritization via free audit
- Related links to content writing + visual + PPC

---

## A4 gate — Amazon content writing (2026-10-04)

**QUESTION:** How should `/amazon-content-writing/` position Amazon copy vs Olifant and Canopy listing/copy packages?

**EVIDENCE:**
- Backup: no dedicated WP HTML for `/amazon-content-writing/` (Observed). Related: `amazon_a_plus_content_seo_2026` blog (Verified meta)
- Olifant listing optimization: conversion copywriting + A+/titles/bullets as listing system (Verified Playwright)
- Canopy listing optimization: in-house copywriters for title/bullets/description + A+; 90-day CVR guarantee / ~38% avg claim (Observed fetch) — not copied
- Case claims: GoSports benefit-first copy + CVR lift; case-study-4 2X conversion with A+ content (Verified)

**CONCLUSION (Proposed):** Lead with content writing services keyword; separate writing from listing SEO and visual design via related links; claim discipline in FAQ; markets FAQ aligned.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- No guarantee or average CVR lift claims from competitors
- Explicit voice + claim review process
- Case links that mention copy/A+ honestly (`/case-study-9/`, `/case-study-4/`)

---

## A5 gate — Amazon visual creativity (2026-10-04)

**QUESTION:** How should `/amazon-visual-creativity/` convert A+/photography intent vs Seller Interactive and Canopy creative packages?

**EVIDENCE:**
- Backup: no dedicated WP HTML for `/amazon-visual-creativity/` (Observed). Related: customer-image playbook + A+ SEO blog; local creative assets in `public/images/creative/` (Verified)
- Seller Interactive storefront design: A+, Brand Story, listing visuals, conversion framing (Verified Playwright)
- Canopy listing package: photography, A+, video, storefront (Observed prior fetch 2026-10-04)
- Case claims: case-study-4 2X conversion (Visual Creative); GoSports lifestyle/A+ + CVR (Verified)

**CONCLUSION (Proposed):** Lead with A+ design + visual creativity; sequence galleries for conversion; hand off video to dedicated service; use only verified case metrics.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- No competitor “89% order increase” style claims
- Explicit Amazon image-requirement compliance language
- Related links to video, content writing, listing SEO

---

## A6 gate — Amazon catalog management (2026-10-04)

**QUESTION:** How should `/amazon-catalog-management/` convert catalog health intent vs Olifant and Sequence ops positioning?

**EVIDENCE:**
- Backup: no dedicated WP HTML for `/amazon-catalog-management/` (Observed). Related: listing-errors fix guide + suppressed listings blog (Verified meta)
- Olifant account audit: catalog problems, parent-child, stranded/suppressed inventory (Verified Playwright)
- Sequence Amazon page: Seller Central ops, listings, inventory under account management (Observed fetch)
- Case claims: Kitchen catalog optimization 73%; FocusForm catalog expansion 7-figure (Verified)
- Homepage FAQ: account health help without reinstatement guarantee (Verified prior)

**CONCLUSION (Proposed):** Lead with catalog management services; emphasize suppressions + variations + attribute hygiene; no reinstatement guarantee; remove unverified “top seller” claims.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Explicit no-guarantee language on suppressions
- Revenue-first remediation order
- Case links with catalog language (`/case-study-1/`, `/case-study-8/`)

---

## B1 gate — Amazon DSP management (2026-10-04)

**QUESTION:** How should `/amazon-dsp-management/` convert DSP intent without inventing AMC/min-spend/DSP-ROAS claims?

**EVIDENCE:**
- Backup: no dedicated WP HTML for `/amazon-dsp-management/` (Observed). Related: Sponsored Display blog (Verified meta)
- Sequence `/amazon/dsp-agency/`: AMC-native DSP agency positioning (Verified Playwright)
- Canopy `/services/demand-side-platform/`: DSP FAQs, min order figures, ROAS examples (Observed fetch) — not copied
- EG case studies: no DSP-attributed metrics (Verified). Used advertising foundation cases with readiness framing

**CONCLUSION (Proposed):** Lead with DSP management keyword; emphasize readiness + Sponsored Ads alignment; markets FAQ notes DSP inventory varies; no AMC-as-standard claim without EG evidence.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Audit-first “DSP only when ready”
- No competitor $5K/$35K minimums or ROAS multiples
- Results framed as advertising foundation, not DSP causation

---

## B2 gate — Amazon reporting and analytics (2026-10-04)

**QUESTION:** How should `/amazon-reporting-analytics/` convert reporting intent vs proprietary dashboard agencies?

**EVIDENCE:**
- Backup: no dedicated WP HTML for service slug (Observed). Related: profit-analytics KPI blog (Verified meta)
- Incrementum DataOwl reports page: unified ads/DSP/AMC dashboard positioning (Verified Playwright)
- SalesDuo BI dashboard: proprietary competition/forecast dashboard claims (Observed fetch)
- Homepage: “not a software dashboard”; weekly/monthly reporting on sales, ACOS, catalog health; measure-success FAQ (Verified)

**CONCLUSION (Proposed):** Lead with decision-ready specialist reporting; include ACoS/TACoS/catalog; explicitly not a BI product; markets FAQ aligned.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Human specialists + action mapping vs DataOwl/BI product framing
- No invented proprietary platform name
- Case links show data-led outcomes (`/case-study-9/`, `/case-study-1/`)

---

## C1 gate — Amazon video creative (2026-10-04)

**QUESTION:** How should `/amazon-video-creative/` convert listing/ad video intent without inventing video-specific lift metrics?

**EVIDENCE:**
- Backup: no dedicated WP HTML for `/amazon-video-creative/` (Observed)
- Canopy photography/video service: studio video + listing update process (Verified Playwright)
- Seller Interactive storefront design: listing image/video scripting and coordination (Observed fetch)
- Amazon Ads Sponsored Brands video guidance: placement/format norms (Observed search)
- Case studies: no video-attributed primary metrics (Verified). Used creative conversion cases with reinforcement framing

**CONCLUSION (Proposed):** Lead with Amazon video creative; emphasize placement-ready demos; coordinate with visual/PPC/DSP; no invented CTR/CVR video averages.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Amazon-first placements vs social-first cuts
- Proof-in-first-seconds scripting
- Case links to creative conversion outcomes (`/case-study-4/`, `/case-study-9/`) without false video causation

---

## C2 gate — Amazon trademark and Brand Registry (2026-10-04)

**QUESTION:** How should `/amazon-trademark-brand-registry/` convert Brand Registry / USPTO intent without inventing approval rates or posing as a law firm?

**EVIDENCE:**
- Backup: no dedicated WP HTML for slug; `services-2` USPTO + Brand Registry sections (Verified); Brand Registry benefits blog (Verified meta)
- Seller Interactive brand protection: enrollment + enforcement focus (Verified Playwright)
- Global Trademark Company: marketplace trademark filing + Amazon code handoff (Verified Playwright)
- Amazon Brand Registry eligibility: registered or pending trademark; country-specific rules (Observed official guidance)

**CONCLUSION (Proposed):** Lead with Amazon Brand Registry; include USPTO pathway guidance; explicit not-a-law-firm boundary; activate A+/Stores/catalog after enrollment; no invented approval timelines or competitor fee/claim copy.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Enrollment + post-approval activation vs pure trademark filing (GTC) or pure enforcement ops (Seller Interactive)
- Case links to brand-ready growth (`/case-study-8/`, `/case-study-1/`) without false trademark causation

---

## C3 gate — Amazon company registration (2026-10-04)

**QUESTION:** How should `/amazon-company-registration/` convert US entity setup intent without inventing verification rates or posing as legal/tax counsel?

**EVIDENCE:**
- Backup: no dedicated WP slug HTML; `services-2` Company Registration section includes India-flavored PAN/TAN / 100% compliant claims (Verified) — replace, do not migrate
- StarterX Amazon LLC formation: LLC/EIN/verification prep package (Verified Playwright)
- StartGlobal Amazon FBA LLC: LLC + bank + verification packaging; first-attempt / fee claims (Observed fetch)
- Current JSON already framed as US company support for Amazon sellers (Verified)

**CONCLUSION (Proposed):** Lead with US company registration for Amazon sellers; connect to Brand Registry and growth handoff; explicit not legal/tax advice; no competitor first-attempt / bank-included / timeline guarantees; remove backup India document claims.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Formation guidance + Amazon agency handoff vs pure LLC formation mills
- Case links to foundation-ready growth (`/case-study-1/`, `/case-study-9/`) without false entity-formation causation

---

## C4 gate — Amazon product sourcing (2026-10-04)

**QUESTION:** How should `/amazon-product-sourcing/` convert private-label / supplier research intent without inventing cost-cut metrics or manufacturing claims?

**EVIDENCE:**
- Backup: no dedicated WP slug HTML; `services/#service_7` Product Sourcing & Shipping (Verified) — supplier research, packaging, inspection, certifications, shipping advice themes
- AMZ Verse manufacturing/sourcing: factory vetting + 35% cost-reduction case claim (Verified Playwright) — do not copy
- NexoFetch FBA sourcing agent: China sourcing + 100% compliant FBA labeling claims (Observed fetch) — do not copy
- Case studies: FocusForm multi-ASIN expansion; GoSports revenue growth (Verified config) — frame as catalog-expansion outcomes sourcing supports

**CONCLUSION (Proposed):** Lead with Amazon product sourcing for new ASINs; criteria-first supplier shortlists; explicit not-a-manufacturer; compliance via qualified providers; handoff to catalog/listing/ads; no invented MOQ/cost guarantees.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Launch handoff into agency Amazon execution vs pure China sourcing-agent packaging
- Case links to catalog-expansion growth (`/case-study-8/`, `/case-study-9/`) without false sourcing-cost causation

---

## D1 gate — Shopify website development (2026-10-04)

**QUESTION:** How should `/shopify-website-development/` convert Amazon-brand DTC / Shopify intent without inventing storefront CVR metrics?

**EVIDENCE:**
- Backup: no dedicated WP slug HTML; `services-2` Website Development (Verified); WooCommerce vs Shopify DTC blog (Verified meta)
- Velocity Sellers Shopify DTC: CRO + MCF + claimed 27% CVR / Shop Pay 50% figures (Observed fetch) — do not copy
- Krolog Grow on Shopify / pricing tiers (Observed search; Cloudflare blocked live Playwright) — do not copy pricing or $1M+ scale claims
- Byteout Amazon-sellers Shopify URL returned 404 (Verified Playwright)

**CONCLUSION (Proposed):** Lead with Shopify for Amazon brands; complementary owned channel; conversion structure + Amazon messaging alignment; handoff to email/visual/full-service; no invented Shopify lift metrics.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Amazon-agency complementary DTC vs pure Shopify CRO shops
- Case links to brand-channel growth (`/case-study-9/`, `/case-study-1/`) without false Shopify-CVR causation

---

## D2 gate — TikTok Shop ads (2026-10-04)

**QUESTION:** How should `/tiktok-shop-ads/` convert Amazon-to-TikTok Shop ads intent without inventing GMV/ROAS or replacing Amazon positioning?

**EVIDENCE:**
- Backup: no dedicated WP service HTML for slug (Observed); EG blogs mention TikTok as external traffic / diversification (Observed) — do not reuse unverified BSR/referral claims
- Viral Brand Works Amazon-to-TikTok Shop agency: Spark Ads + GMV Max + $50k+/mo / 500+ creators positioning (Verified Playwright) — do not copy
- Sequence Amazon×TikTok program: integrated flywheel + $500M / 285% claims (Observed fetch) — do not copy
- Desverto TikTok Shop for Amazon sellers: MCF + ads packaging (Observed search; Cloudflare blocked Playwright)

**CONCLUSION (Proposed):** Lead with TikTok Shop ads for Amazon-led brands; complementary discovery; creative-before-scale; Amazon insight handoff; no invented TikTok ROAS/GMV; region eligibility noted.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Amazon-first complementary Shop ads vs TikTok-first GMV Max / creator-network mills
- Case links to advertising-led Amazon outcomes (`/case-study-9/`, `/case-study-1/`) without false TikTok causation

---

## D3 gate — Email retention marketing (2026-10-04)

**QUESTION:** How should `/email-retention-marketing/` convert Amazon-brand lifecycle email intent without inventing email ROI benchmarks?

**EVIDENCE:**
- Backup: no dedicated WP service HTML for slug (Observed); EG Shopify plugins blog names Klaviyo (Observed); algorithm blog mentions email as external traffic (Observed)
- Chronos retention agency: Klaviyo Master Elite + 500 brands / $400M attributed revenue claims (Verified Playwright) — do not copy
- EvolveAMZ Klaviyo for Amazon sellers: insert-card capture + $30–$50 per $1 email / 5–15% opt-in claims (Observed fetch) — do not copy
- Structural fact: Amazon does not provide customer emails for marketing; owned opt-in required (Observed industry + EvolveAMZ playbook)

**CONCLUSION (Proposed):** Lead with email/retention for Amazon brands; lifecycle flows + capture readiness; complementary to Amazon ads; Shopify/content handoff; no invented email ROI or partner-badge inflation.

**DIFFERENTIATION FOR ECOM GLIDERS:**
- Amazon-agency retention framing vs pure Klaviyo DTC mills
- Case links to brand growth (`/case-study-9/`, `/case-study-1/`) without false email-attribution causation
