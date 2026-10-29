# Site SEO Map

Per-page SEO records for all indexable pages.

**Updated:** 2026-10-30 (homepage SEO/AEO pass; Phase 0 standards)  
**Status:** Core pages mapped. Homepage re-audited 2026-10-30. Blog posts to be populated during SEO audit phase.  
**Standard:** [PAGE-OPTIMIZATION-STANDARD.md](PAGE-OPTIMIZATION-STANDARD.md)

---

## Keyword strategy summary

### Primary commercial terms (homepage and service pages)

| Keyword | Intent | Competitors ranking | eCom Gliders target page |
|---------|--------|-------------------|--------------------------|
| Amazon account management agency | Commercial | AMZ Dudes, MAG, Olifant | Homepage, /full-service-amazon-agency/ |
| Full service Amazon agency | Commercial | Canopy, SalesDuo, Sequence | Homepage, /full-service-amazon-agency/ |
| Amazon PPC management agency | Commercial | Incrementum, Trivium, eCom Gliders | /amazon-ppc-management-agency/ |
| Amazon growth agency | Commercial | Olifant | Homepage |
| Amazon advertising agency | Commercial | Sequence, Incrementum | /amazon-ppc-management-agency/ |

### Long-tail terms (service and blog pages)

| Keyword | Intent | Target page |
|---------|--------|-------------|
| Amazon account management services | Commercial | /full-service-amazon-agency/ |
| Amazon PPC management services | Commercial | /amazon-ppc-management-agency/ |
| Amazon listing optimization services | Commercial | Dedicated service page |
| Amazon catalog management services | Commercial | Dedicated service page |
| Amazon content writing services | Commercial | Dedicated service page |
| Amazon A+ content design | Commercial | Visual Creativity service page |
| Free Amazon account audit | Transactional | /free-audit/ |

### 2026 emerging terms

| Keyword | Intent | Target page |
|---------|--------|-------------|
| AI SEO for Amazon | Informational/Commercial | Blog posts, future service page |
| AEO for ecommerce | Informational | Blog posts |
| Amazon DSP management | Commercial | DSP service page |
| Amazon account management cost | Informational | FAQ, blog post |

### Blog URL rule

All 328 blog post URLs must preserve identical root-level paths. See `backup/metadata/blog-inventory.json` for full inventory.

---

## Core pages

### Homepage

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/ (preview Verified: https://ecom-gliders.vercel.app/) |
| Primary keyword | Amazon account management agency |
| Secondary keywords | Full service Amazon agency, Amazon growth agency, Amazon PPC agency |
| Search intent | Commercial (agency selection) |
| Title | Amazon Account Management Agency \| eCom Gliders |
| Meta description | Full-service Amazon account management: PPC, listings, content, and catalog health. Helping sellers since 2018. 95% retention. Get in Touch or request a free audit. |
| H1 | Full-service Amazon growth for ambitious FBA brands |
| Canonical | `/` → absolute via `SITE_URL` / `NEXT_PUBLIC_SITE_URL` (preview host Observed on Vercel) |
| Indexability | Index |
| OG image | `/images/blog/ecomglidersbanner-1024x598-e176afa2.png` |
| Schema | Organization, WebSite, FAQPage (Verified on Vercel preview 2026-10-30) |
| Internal links | Services, case studies, blog posts, Get in Touch / free audit CTAs |
| Audit status | Re-optimized 2026-10-30 — title/meta/OG + AI-vibe copy pass |
| Verification | Playwright preview 2026-10-30: 1 H1; OG/Twitter present after deploy of ogImage; schema @graph Organization+WebSite+FAQPage. Live ecomgliders.com still Observed as legacy WordPress until DNS cutover. |

---

### All Services Hub

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/services/ |
| Purpose | Convert commercial Amazon agency / services discovery into free-audit leads and route to the correct root service page |
| Audience | Sellers comparing agency capabilities; brands choosing full-service vs focused workstreams |
| Search intent | Commercial |
| Primary keyword | Amazon growth services |
| Secondary keywords | Amazon agency services, Amazon account management services, Amazon PPC services, Amazon listing services |
| Entity | eCom Gliders; Amazon Ads; Seller Central; Shopify; TikTok Shop; email retention |
| Title | Amazon Growth Services \| eCom Gliders |
| Meta description | Amazon growth services: full-service account management with PPC, listings, catalog, A+, launches, and operations. Free audit. Call +1 (360) 660-1210. |
| H1 | Amazon growth services for ads, listings, and operations |
| Canonical | `/services/` |
| Indexability | Index |
| OG image | `/images/services/services-hub-hero-browser.jpg` |
| Schema | CollectionPage (ItemList nested) + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | Full-service + capability rail + also-available + `/free-audit/` + case studies |
| AEO | FAQ: only-PPC, one vs full management, full-service scope, marketplaces, free audit |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ (trust strip) |
| Claims source | Verified site stats + published case studies only — no invented hub ROI |
| Config | `content/config/services-index.json` |
| Audit status | Re-optimized 2026-10-30 — H1 keyword align, meta lead, ogImage |
| Notes | Preserves `/services/` path. Detail pages stay at root `/{slug}/`. Preview Verified on ecom-gliders.vercel.app; live DNS may still be WP until cutover. |

---

### Amazon PPC Management

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-ppc-management-agency/ |
| Purpose | Convert commercial PPC-agency search into free-audit leads |
| Audience | Sellers with wasted spend; DIY teams past ceiling; launch/seasonal advertisers; multi-marketplace sellers |
| Search intent | Commercial |
| Primary keyword | Amazon PPC management agency |
| Secondary keywords | Amazon PPC management services, Amazon advertising agency, Amazon Sponsored Products management |
| Entity | eCom Gliders; Amazon Ads; Sponsored Products/Brands/Display; Amazon Ads Verified Partner |
| Title | Amazon PPC Management Agency \| eCom Gliders |
| Meta description | Amazon PPC management agency for Sponsored Products, Brands, and Display. Structure ads for efficiency with an Amazon Ads Verified Partner. Free audit. |
| H1 | Amazon PPC management agency for profitable growth |
| Canonical | `/amazon-ppc-management-agency/` |
| Indexability | Index |
| OG image | `/images/services/amazon-ppc-management-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, full-service, listing optimization, DSP, case studies |
| AEO | FAQ covers ad types, timeline, spend, ownership, metrics, marketplaces, getting started |
| GEO | Verified Partner + since 2018 + retention claims on page |
| Config | `content/config/services/amazon-ppc-management-agency.json` |
| Audit status | Re-optimized 2026-10-30 — H1 includes agency KW; cleaner title; ogImage; relative canonical |

---

### Amazon Account Health

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-account-health/ |
| Purpose | Convert commercial account health / policy notice / suspension-risk search into free-audit leads |
| Audience | Scaling sellers; open notices; catalog-heavy operators; full-service accounts |
| Search intent | Commercial |
| Primary keyword | Amazon account health |
| Secondary keywords | Amazon account health services, Amazon account health monitoring, Amazon policy notices, Amazon performance metrics |
| Entity | eCom Gliders; Account Health; policy notices; performance metrics; Seller Central |
| Title | Amazon Account Health Services \| eCom Gliders |
| Meta description | Amazon account health services for policy notices, performance metrics, and documented case response. No false reinstatement guarantees. Free audit. |
| H1 | Amazon account health monitoring and response |
| Canonical | `/amazon-account-health/` |
| Indexability | Index |
| OG image | `/images/services/amazon-account-health/ahl-ops-desk-v2.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, Seller Central, catalog management, full-service |
| AEO | FAQ covers monitoring scope, no reinstatement guarantee, notices, vs Seller Central ops |
| GEO | Amazon decides account status; no invented outcome guarantees |
| Config | `content/config/services/amazon-account-health.json` |
| Audit status | Re-optimized 2026-10-30 — created SITE-SEO-MAP row; title/meta “services”; ogImage; relative canonical; strip em dashes |

---

### Amazon Account Operations

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-account-operations/ |
| Purpose | Convert commercial cross-service Amazon ops / vendor alignment search into free-audit leads |
| Audience | Multi-vendor brands; in-house plus agency mixes; scaling multi-ASIN catalogs; full-service candidates |
| Search intent | Commercial |
| Primary keyword | Amazon account operations |
| Secondary keywords | Amazon account operations services, Amazon cross-service alignment, Amazon vendor coordination, Amazon account ops |
| Entity | eCom Gliders; PPC; listings; catalog; analytics; priority board |
| Title | Amazon Account Operations \| eCom Gliders |
| Meta description | Amazon account operations services for cross-service alignment across PPC, listings, catalog, and analytics under one priority board. Free audit. |
| H1 | Amazon account operations across ads, listings, and catalog |
| Canonical | `/amazon-account-operations/` |
| Indexability | Index |
| OG image | `/images/services/amazon-account-management-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, full-service, Seller Central, reporting |
| AEO | FAQ covers priority board, vs full-service, vendors, reporting, marketplaces |
| GEO | Verified outcomes only; weekly operating board framing |
| Config | `content/config/services/amazon-account-operations.json` |
| Audit status | Re-optimized 2026-10-30 — created SITE-SEO-MAP row; shorter title; meta “services”; ogImage; relative canonical |

---

### Amazon Seller Central Services

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-seller-central-services/ |
| Purpose | Convert commercial Seller Central ops / day-to-day ownership search into free-audit leads |
| Audience | Founders without ops bench; ticket chaos; PPC-led teams missing ops; full-service clients |
| Search intent | Commercial |
| Primary keyword | Amazon Seller Central services |
| Secondary keywords | Amazon Seller Central management, Amazon seller account ops, Amazon promotions management, Seller Central case management |
| Entity | eCom Gliders; Seller Central; cases; promotions; listing ops |
| Title | Amazon Seller Central Services \| eCom Gliders |
| Meta description | Amazon Seller Central services for cases, promotions, listing ops tasks, and day-to-day account ownership. You keep the account. Free audit. |
| H1 | Amazon Seller Central services for day-to-day ownership |
| Canonical | `/amazon-seller-central-services/` |
| Indexability | Index |
| OG image | `/images/services/amazon-seller-central-services/sc-hero-ops.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, full-service, account health, account operations |
| AEO | FAQ covers ownership, cases, promotions, vs full-service, marketplaces |
| GEO | You keep account ownership; no ownership-transfer myths |
| Config | `content/config/services/amazon-seller-central-services.json` |
| Audit status | Re-optimized 2026-10-30 — created SITE-SEO-MAP row; ogImage; relative canonical; strip em dashes |

---

### Amazon Inventory Management

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-inventory-management/ |
| Purpose | Convert commercial FBA inventory / restock / stockout-prevention search into free-audit leads |
| Audience | Brands scaling paid media; multi-ASIN catalogs; launch-heavy sellers; full-service accounts |
| Search intent | Commercial |
| Primary keyword | Amazon inventory management |
| Secondary keywords | Amazon inventory management services, Amazon FBA inventory, Amazon restock management, Amazon stockout prevention |
| Entity | eCom Gliders; FBA; restock; inventory; Amazon advertising demand |
| Title | Amazon Inventory Management Services \| eCom Gliders |
| Meta description | Amazon inventory management services for FBA stock signals, restock follow-through, and launch timing tied to advertising demand. Free audit. |
| H1 | Amazon inventory management that protects ad spend |
| Canonical | `/amazon-inventory-management/` |
| Indexability | Index |
| OG image | `/images/services/amazon-inventory-management/inv-close-pack.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, product launch, PPC, full-service |
| AEO | FAQ covers scope, ads sync, restock process, launches, marketplaces |
| GEO | No invented stockout savings; no fixed stockout guarantee |
| Config | `content/config/services/amazon-inventory-management.json` |
| Audit status | Re-optimized 2026-10-30 — created SITE-SEO-MAP row; meta “services”; ogImage; relative canonical; strip em dashes |

---

### Amazon Product Launch Services

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-product-launch-services/ |
| Purpose | Convert commercial new-ASIN / relaunch search into free-audit leads |
| Audience | New ASIN launches; relaunches after weak starts; seasonal windows; full-service accounts adding SKUs |
| Search intent | Commercial |
| Primary keyword | Amazon product launch services |
| Secondary keywords | Amazon product launch, Amazon ASIN launch, Amazon launch advertising, Amazon launch inventory |
| Entity | eCom Gliders; Amazon ASINs; launch advertising; listing readiness; FBA inventory |
| Title | Amazon Product Launch Services \| eCom Gliders |
| Meta description | Amazon product launch services with listing readiness, launch advertising, and inventory coordination under one plan. Free audit. |
| H1 | Amazon product launch services under one plan |
| Canonical | `/amazon-product-launch-services/` |
| Indexability | Index |
| OG image | `/images/services/amazon-product-launch-services/lnc-close-pack.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, full-service, PPC, inventory management |
| AEO | FAQ covers scope, timeline, ads readiness, inventory role, marketplaces |
| GEO | No fixed 30-day sales guarantee; verified case language only |
| Config | `content/config/services/amazon-product-launch-services.json` |
| Audit status | Re-optimized 2026-10-30 — created SITE-SEO-MAP row; ogImage; relative canonical; strip em dashes |

---

### Email Retention Marketing

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/email-retention-marketing/ |
| Purpose | Convert commercial email / lifecycle retention intent from Amazon brands into free-audit leads |
| Audience | Amazon brands building owned audiences; weak-flow Shopify operators; ASIN launch warm lists; Amazon�retention aligners |
| Search intent | Commercial |
| Primary keyword | email retention marketing |
| Secondary keywords | email marketing for Amazon brands, lifecycle email ecommerce, retention email Amazon sellers, post-purchase email flows |
| Entity | eCom Gliders; lifecycle email; retention marketing; Amazon brands; owned channel |
| Title | Email and Retention Marketing for Amazon Brands \| eCom Gliders |
| Meta description | Email retention marketing for Amazon brands. Lifecycle flows that complement marketplace growth with owned-channel relationships. Free audit. |
| H1 | Email and retention marketing for Amazon brands |
| Canonical | `/email-retention-marketing/` |
| Indexability | Index |
| OG image | `/images/services/email-retention-marketing-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, Shopify, full-service, content writing, case studies |
| AEO | FAQ covers not replacing Amazon ads, Shopify need, platforms, first flows, measurement |
| GEO | Owned opt-in only; no invented email ROI |
| Config | `content/config/services/email-retention-marketing.json` |
| Audit status | Re-optimized 2026-10-30 — H1 KW align; meta primary KW; ogImage; relative canonical; strip em dashes |

---

### TikTok Shop Ads

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/tiktok-shop-ads/ |
| Purpose | Convert commercial TikTok Shop ads / Amazon-to-TikTok intent into free-audit leads |
| Audience | Amazon brands testing complementary discovery; visual-demo SKUs; weak native creative; Amazon+TikTok coordination teams |
| Search intent | Commercial |
| Primary keyword | TikTok Shop ads |
| Secondary keywords | TikTok Shop ads management, TikTok Shop advertising, Amazon TikTok Shop, Spark Ads Amazon brands |
| Entity | eCom Gliders; TikTok Shop; Shop ads; Amazon brands; complementary discovery |
| Title | TikTok Shop Ads for Amazon Brands \| eCom Gliders |
| Meta description | TikTok Shop ads management for Amazon-led brands. Complementary product discovery without replacing marketplace growth. Free audit. |
| H1 | TikTok Shop ads for Amazon-led brands |
| Canonical | `/tiktok-shop-ads/` |
| Indexability | Index |
| OG image | `/images/services/tiktok-shop-ads-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, PPC, video creative, Shopify, case studies |
| AEO | FAQ covers not replacing Amazon, SKU fit, creative, timing, measurement, Amazon insight handoff |
| GEO | Complementary to Amazon; no invented TikTok ROAS/GMV |
| Config | `content/config/services/tiktok-shop-ads.json` |
| Audit status | Re-optimized 2026-10-30 — H1 KW align; ogImage; relative canonical; strip em dashes |

---

### Shopify Website Development

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/shopify-website-development/ |
| Purpose | Convert commercial Shopify / DTC storefront intent from Amazon brands into free-audit leads |
| Audience | Amazon brands launching DTC; conversion rebuilds; Amazon�DTC messaging aligners; retention-ready operators |
| Search intent | Commercial |
| Primary keyword | Shopify website development |
| Secondary keywords | Shopify for Amazon brands, Shopify DTC storefront, Shopify store development, Amazon to Shopify |
| Entity | eCom Gliders; Shopify; DTC; Amazon brands; owned channel |
| Title | Shopify Website Development for Amazon Brands \| eCom Gliders |
| Meta description | Shopify website development services for Amazon brands. Owned-channel storefronts that complement marketplace growth. Free audit. |
| H1 | Shopify website development for Amazon brands |
| Canonical | `/shopify-website-development/` |
| Indexability | Index |
| OG image | `/images/services/shopify-website-development-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, email retention, full-service, visual creativity, case studies |
| AEO | FAQ covers not replacing Amazon, rebuilds, content alignment, plans, email |
| GEO | Complementary to Amazon; no invented Shopify CVR |
| Config | `content/config/services/shopify-website-development.json` |
| Audit status | Re-optimized 2026-10-30 — H1 KW align; meta “services”; ogImage; relative canonical; strip em dashes |

---

### Amazon Product Sourcing

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-product-sourcing/ |
| Purpose | Convert commercial Amazon product sourcing / private-label supplier intent into free-audit leads |
| Audience | Multi-ASIN expanders; private-label with clear brief; sample-decision stalls; launch-handoff sellers |
| Search intent | Commercial |
| Primary keyword | Amazon product sourcing |
| Secondary keywords | Amazon product sourcing services, Amazon private label sourcing, Amazon supplier research, Amazon FBA sourcing |
| Entity | eCom Gliders; Amazon ASINs; private label; supplier shortlist; FBA launch readiness |
| Title | Amazon Product Sourcing Services \| eCom Gliders |
| Meta description | Amazon product sourcing services with supplier shortlists, sample evaluation, and launch readiness for new ASINs. Free audit. |
| H1 | Amazon product sourcing for new ASINs |
| Canonical | `/amazon-product-sourcing/` |
| Indexability | Index |
| OG image | `/images/services/amazon-product-sourcing-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, catalog management, listing optimization, full-service, case studies |
| AEO | FAQ covers manufacturing boundary, categories, supplier evaluation, compliance, launch handoff |
| GEO | No sourcing cost-cut invent; we do not manufacture |
| Config | `content/config/services/amazon-product-sourcing.json` |
| Audit status | Re-optimized 2026-10-30 — H1 already KW-aligned; meta “services”; ogImage; relative canonical; strip em dashes |

---

### Amazon Company Registration

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-company-registration/ |
| Purpose | Convert commercial US entity / Amazon seller company setup intent into free-audit leads |
| Audience | US-entity prep sellers; international US readiness; entity-before-Brand-Registry teams; agency-led growth handoff |
| Search intent | Commercial |
| Primary keyword | US company registration for Amazon sellers |
| Secondary keywords | Amazon seller company registration, Amazon LLC formation, US entity Amazon sellers, company registration Amazon FBA |
| Entity | eCom Gliders; US business entity; Seller Central; Amazon Brand Registry |
| Title | US Company Registration for Amazon Sellers \| eCom Gliders |
| Meta description | US company registration services for Amazon sellers, with document readiness guidance and handoff into Brand Registry and account growth. Free audit. |
| H1 | US company registration support for Amazon sellers |
| Canonical | `/amazon-company-registration/` |
| Indexability | Index |
| OG image | `/images/services/amazon-company-registration-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, Brand Registry, full-service, product sourcing, case studies |
| AEO | FAQ covers audience, not legal/tax advice, Amazon relation, post-formation help, timelines |
| GEO | Process guidance only; no formation-approval invent |
| Config | `content/config/services/amazon-company-registration.json` |
| Audit status | Re-optimized 2026-10-30 — H1 already KW-aligned; meta “services”; ogImage; relative canonical |

---

### Amazon Trademark and Brand Registry

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-trademark-brand-registry/ |
| Purpose | Convert commercial Brand Registry / USPTO trademark intent into free-audit leads |
| Audience | Private-label without Brand Registry; A+/Store-blocked brands; hijack/listing-abuse cases; entity+brand setup teams |
| Search intent | Commercial |
| Primary keyword | Amazon Brand Registry |
| Secondary keywords | Amazon brand registry services, USPTO trademark Amazon, Amazon trademark registration, Brand Registry enrollment |
| Entity | eCom Gliders; Amazon Brand Registry; USPTO; A+ Content; Brand Stores |
| Title | Amazon Brand Registry and Trademark Support \| eCom Gliders |
| Meta description | Amazon Brand Registry services and trademark pathway support for protection tools, A+ access, and enrollment guidance. Free audit. |
| H1 | Amazon Brand Registry and trademark pathway support |
| Canonical | `/amazon-trademark-brand-registry/` |
| Indexability | Index |
| OG image | `/images/services/amazon-trademark-brand-registry-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, company registration, content writing, catalog management, case studies |
| AEO | FAQ covers trademark requirement, not-a-law-firm boundary, timelines, unlocks, rejections |
| GEO | Process guidance only; no approval-rate invent |
| Config | `content/config/services/amazon-trademark-brand-registry.json` |
| Audit status | Re-optimized 2026-10-30 — H1 primary KW; meta “services”; ogImage; relative canonical |

---

### Amazon Video Creative

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-video-creative/ |
| Purpose | Convert commercial Amazon product/ad video search into free-audit leads |
| Audience | Weak listing education; SB/DSP advertisers; launches needing demos; teams aligning video with stills |
| Search intent | Commercial |
| Primary keyword | Amazon video creative |
| Secondary keywords | Amazon product video, Amazon listing video, Sponsored Brands video creative, Amazon advertising video |
| Entity | eCom Gliders; Amazon listings; Sponsored Brands video; Amazon DSP |
| Title | Amazon Video Creative Services \| eCom Gliders |
| Meta description | Amazon video creative services for listings and advertising. Product demos and brand cuts built for Amazon shoppers. Free audit. |
| H1 | Amazon video creative for listings and ads |
| Canonical | `/amazon-video-creative/` |
| Indexability | Index |
| OG image | `/images/services/amazon-video-creative-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, visual creativity, TikTok Shop ads, PPC, case studies |
| AEO | FAQ covers placements, scripting, footage reuse, length, copy alignment, DSP |
| GEO | since 2018 / in-house claims on page |
| Config | `content/config/services/amazon-video-creative.json` |
| Audit status | Re-optimized 2026-10-30 — H1 KW align; meta “services”; ogImage; relative canonical |

---

### Amazon Reporting and Analytics

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-reporting-analytics/ |
| Purpose | Convert commercial reporting/analytics intent into free-audit leads for decision-ready Amazon metrics |
| Audience | Owners needing verifiable updates; teams with raw exports; ACoS-only advertisers; hybrid in-house + agency teams |
| Search intent | Commercial |
| Primary keyword | Amazon reporting analytics |
| Secondary keywords | Amazon reporting and analytics, Amazon advertising reporting, Amazon KPI reporting, Amazon profit analytics |
| Entity | eCom Gliders; Seller Central; Amazon Ads; ACoS; TACoS |
| Title | Amazon Reporting and Analytics \| eCom Gliders |
| Meta description | Amazon reporting and analytics services with clear weekly and monthly metrics for sales, advertising efficiency, and catalog priorities. Free audit. |
| H1 | Amazon reporting and analytics for clear decisions |
| Canonical | `/amazon-reporting-analytics/` |
| Indexability | Index |
| OG image | `/images/services/amazon-reporting-analytics-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, PPC, full-service, listing optimization, case studies |
| AEO | FAQ covers data sources, cadence, scope beyond ads, internal teams, dashboards |
| GEO | Specialist reporting tied to sales/ACOS/catalog; no proprietary BI product claimed |
| Config | `content/config/services/amazon-reporting-analytics.json` |
| Audit status | Re-optimized 2026-10-30 — H1 KW align; meta “services”; ogImage; relative canonical; strip em dash |

---

### Amazon DSP Management

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-dsp-management/ |
| Purpose | Convert commercial DSP-agency search into free-audit leads for brands ready beyond Sponsored Ads |
| Audience | Stable Sponsored Ads accounts; Brand Registry advertisers; launch/defense brands; P&L-minded operators |
| Search intent | Commercial |
| Primary keyword | Amazon DSP management |
| Secondary keywords | Amazon DSP agency, Amazon Demand-Side Platform, Amazon programmatic advertising |
| Entity | eCom Gliders; Amazon DSP; Amazon Ads; Brand Registry; Sponsored Ads |
| Title | Amazon DSP Management Agency \| eCom Gliders |
| Meta description | Amazon DSP management agency for upper-funnel reach and retargeting, aligned with Sponsored Ads and Amazon sales goals. Free audit. |
| H1 | Amazon DSP management for brand growth beyond Sponsored Ads |
| Canonical | `/amazon-dsp-management/` |
| Indexability | Index |
| OG image | `/images/services/amazon-dsp-management-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, PPC, video creative, full-service, case studies |
| AEO | FAQ covers what DSP is, Brand Registry, Sponsored Ads relation, budget, measurement, creative |
| GEO | Amazon Ads Verified Partner framing; no invented DSP ROAS |
| Config | `content/config/services/amazon-dsp-management.json` |
| Audit status | Re-optimized 2026-10-30 — H1 KW align; meta “agency”; ogImage; relative canonical |

---

### Amazon Catalog Management

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-catalog-management/ |
| Purpose | Convert commercial catalog/suppression/variation search into free-audit leads |
| Audience | Suppressed/stranded ASINs; broken variations; fast-growing catalogs; advertisers needing listing stability |
| Search intent | Commercial |
| Primary keyword | Amazon catalog management services |
| Secondary keywords | Amazon catalog management, Amazon suppressed listings fix, Amazon variation management |
| Entity | eCom Gliders; Seller Central; ASIN catalog; Brand Registry |
| Title | Amazon Catalog Management Services \| eCom Gliders |
| Meta description | Amazon catalog management services for suppressions, variations, and attribute quality. Coordinated with PPC and listing work. Free audit. |
| H1 | Amazon catalog management for healthy, scalable listings |
| Canonical | `/amazon-catalog-management/` |
| Indexability | Index |
| OG image | `/images/services/catalog-management-v2.png` — Verified on preview 2026-10-30 |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, listing optimization, full-service, brand registry, case studies |
| AEO | FAQ covers scope, suppressions, variations, PPC link, catalog size, marketplaces |
| GEO | since 2018 / in-house claims on page |
| Config | `content/config/services/amazon-catalog-management.json` |
| Audit status | Re-optimized 2026-10-30 — H1 align; meta “services”; relative canonical (OG already present) |
| Notes | No reinstatement guarantee in copy. |

---

### Amazon Visual Creativity

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-visual-creativity/ |
| Purpose | Convert commercial A+/photography creative search into free-audit leads |
| Audience | Weak CTR heroes; incomplete galleries; Brand Registry A+ upgrades; launch creative packages |
| Search intent | Commercial |
| Primary keyword | Amazon A+ content design |
| Secondary keywords | Amazon visual creativity, Amazon product photography, Amazon listing images, Amazon infographic design |
| Entity | eCom Gliders; Amazon A+ Content; Brand Registry; product photography |
| Title | Amazon A+ Content Design \| eCom Gliders |
| Meta description | Amazon A+ content design plus product photography, lifestyle imagery, and listing visuals that support conversion. Free audit. |
| H1 | Amazon visual creativity and A+ design that convert |
| Canonical | `/amazon-visual-creativity/` |
| Indexability | Index |
| OG image | `/images/services/amazon-visual-creativity-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, video creative, content writing, listing optimization, case studies |
| AEO | FAQ covers assets, samples, Amazon requirements, refresh vs reshoot, conversion role, video handoff |
| GEO | since 2018 / in-house claims on page |
| Config | `content/config/services/amazon-visual-creativity.json` |
| Audit status | Re-optimized 2026-10-30 — title primary KW; H1 align; ogImage; relative canonical |

---

### Amazon Content Writing

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-content-writing/ |
| Purpose | Convert commercial Amazon copywriting / A+ copy search into free-audit leads |
| Audience | Inconsistent listing copy; launches; Brand Registry A+ builders; SEO/PPC-aligned operators |
| Search intent | Commercial |
| Primary keyword | Amazon content writing services |
| Secondary keywords | Amazon product copywriting, Amazon A+ Content copy, Amazon title and bullet writing |
| Entity | eCom Gliders; Amazon A+ Content; Brand Registry; Seller Central |
| Title | Amazon Content Writing Services \| eCom Gliders |
| Meta description | Amazon content writing services for titles, bullets, descriptions, and A+ Content. Clear copy for growing sellers. Free audit. |
| H1 | Amazon content writing for titles, bullets, and A+ |
| Canonical | `/amazon-content-writing/` |
| Indexability | Index |
| OG image | `/images/services/amazon-content-writing-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, listing optimization, visual creativity, full-service, case studies |
| AEO | FAQ covers deliverables, keywords, voice, claims, Store/Brand Story, vs listing SEO |
| GEO | since 2018 / in-house claims on page |
| Config | `content/config/services/amazon-content-writing.json` |
| Audit status | Re-optimized 2026-10-30 — H1 KW align; meta “services”; ogImage; relative canonical |

---

### Amazon Listing Optimization

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/amazon-listing-optimization/ |
| Purpose | Convert commercial listing SEO search into free-audit leads |
| Audience | Low-CVR catalogs; keyword-stuffed listings; advertisers with unready pages; multi-marketplace sellers |
| Search intent | Commercial |
| Primary keyword | Amazon listing optimization services |
| Secondary keywords | Amazon listing optimization, Amazon listing SEO, Amazon product listing optimization |
| Entity | eCom Gliders; Amazon SEO; Brand Registry / A+; Seller Central |
| Title | Amazon Listing Optimization Services \| eCom Gliders |
| Meta description | Amazon listing optimization services: keyword research, conversion copy, and listing SEO maintenance for priority ASINs. Free audit. |
| H1 | Amazon listing optimization and SEO for ranking and conversion |
| Canonical | `/amazon-listing-optimization/` |
| Indexability | Index |
| OG image | `/images/services/amazon-listing-optimization-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, content writing, PPC, visual creativity, case studies |
| AEO | FAQ covers scope, timeline, prioritization, PPC impact, A+, marketplaces, metrics |
| GEO | since 2018 / in-house claims on page |
| Config | `content/config/services/amazon-listing-optimization.json` |
| Audit status | Re-optimized 2026-10-30 — H1 keyword align; title uses “services”; ogImage; relative canonical |

---

### Full Service Amazon Agency

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/full-service-amazon-agency/ |
| Purpose | Convert commercial search for full-service / account management into free-audit leads |
| Audience | Growing FBA/Seller Central brands; brands limited by PPC-only vendors; multi-marketplace sellers |
| Search intent | Commercial |
| Primary keyword | Full service Amazon agency |
| Secondary keywords | Amazon account management agency, Amazon account management services, Amazon full account management |
| Entity | eCom Gliders; Amazon Seller Central; Amazon PPC; Amazon Ads Verified Partner |
| Title | Full Service Amazon Agency \| eCom Gliders |
| Meta description | Full service Amazon agency for account management, PPC, listings, content, and catalog health. Helping sellers since 2018. 95% retention. Free audit. |
| H1 | Full-service Amazon account management for growing brands |
| Canonical | `/full-service-amazon-agency/` |
| Indexability | Index |
| OG image | `/images/services/amazon-account-management-service.jpg` |
| Schema | Service + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | `/free-audit/`, related services rail, case studies |
| AEO | FAQ covers scope, ownership, PPC vs full-service, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Config | `content/config/services/full-service-amazon-agency.json` |
| Audit status | Re-optimized 2026-10-30 — shorter title, H1 secondary KW, ogImage, relative canonical |

---

### Free Audit

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/free-audit/ |
| Purpose | Convert transactional free-audit demand into booked calls and qualified leads |
| Audience | Sellers seeking ads/listings/catalog priorities before agency engagement |
| Primary keyword | Free Amazon account audit |
| Secondary keywords | Amazon PPC audit, Amazon account review, free Amazon audit |
| Search intent | Transactional |
| Entity | eCom Gliders; Amazon account audit; ads; listings; catalog |
| Title | Free Amazon Account Audit \| eCom Gliders |
| Meta description | Free Amazon account audit from eCom Gliders. Ads, listings, and catalog notes with clear priorities. Book a call. No obligation. |
| H1 | Free Amazon account audit |
| Canonical | `/free-audit/` |
| Indexability | Index |
| OG image | `/images/promo/free-audit-banner.png` |
| Schema | WebPage + FAQPage — Verified Playwright preview 2026-10-30 |
| Internal links | Funnel/booking CTA; related services via site nav |
| AEO | FAQ covers deliverables, timing, who calls, obligation |
| GEO | In-house Amazon team; no invented audit score guarantees |
| Config | `content/config/free-audit-page.json` |
| Audit status | Re-optimized 2026-10-30 — H1 primary KW; ogImage; meta CTA; strip em dashes |

---

### Case Studies

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/case-studies/ |
| Primary keyword | Amazon agency case studies |
| Secondary keywords | Amazon PPC results, Amazon account management results |
| Search intent | Commercial (social proof) |
| Title | Amazon Agency Case Studies \| Client Results \| eCom Gliders |
| Meta description | See how eCom Gliders helped Amazon sellers achieve measurable growth. Case studies with real metrics including 310% sales increase. |
| H1 | Turning goals into growth |
| Canonical | https://ecomgliders.com/case-studies/ |
| Indexability | Index |
| Schema | CollectionPage |
| Audit status | Implemented (2026-09-02) |

**Detail pages:** `/case-study-1/` through `/case-study-9/` � root-level URLs preserved. Article JSON-LD per page. Config: `content/config/case-studies.json`.

---

### About

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/about-us/ |
| Primary keyword | eCom Gliders Amazon agency |
| Secondary keywords | Amazon account management team |
| Search intent | Navigational/Informational |
| Title | About eCom Gliders \| Amazon Account Management Agency |
| Meta description | eCom Gliders is a full-service Amazon agency with 20+ in-house specialists. Helping sellers since 2018. 95% client retention. Amazon Ads Verified Partner. |
| H1 | About eCom Gliders |
| Canonical | https://ecomgliders.com/about-us/ |
| Indexability | Index |
| Schema | AboutPage, Organization, BreadcrumbList, Person, FAQPage |
| Sections | Hero+CTA, proof stats+partner, story+timeline, values, growth framework (service links), markets, team photos, case outcomes, certifications, FAQ, CTA |
| Audit status | Redesigned (2026-10-23) |

---

### Careers

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/careers/ |
| Purpose | Recruit for open in-house roles; filter agencies and brand service requests to other URLs |
| Audience | Candidates for Brand Manager and Junior PPC Specialist |
| Search intent | Navigational / recruitment |
| Primary keyword | eCom Gliders careers |
| Secondary keywords | Amazon agency jobs, Brand Manager Amazon, Junior PPC Specialist |
| Title | Careers \| Brand Manager and Junior PPC Specialist \| eCom Gliders |
| Meta description | Join eCom Gliders in-house Amazon team. Open roles: Brand Manager and Junior PPC Specialist. Remote with US business-hours collaboration. Apply on this page. |
| H1 | Two seats on an in-house Amazon bench |
| Canonical | https://ecomgliders.com/careers/ |
| Indexability | Index, follow |
| Schema | WebPage, BreadcrumbList, FAQPage, JobPosting x2 |
| Sections | Hero For/Not for, how the bench works, open role cards, role craft JDs, hiring process, fit filter, FAQ, application, close |
| Internal links | Agency Partnership, Free Audit, Contact, Privacy |
| Audit status | Implemented (2026-10-28) |

---

### FAQ

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/faq/ |
| Purpose | Central FAQ for agency services, audits, marketplaces, and engagement |
| Search intent | Informational |
| Primary keyword | eCom Gliders FAQ |
| Title | FAQ \| Amazon Agency Questions Answered \| eCom Gliders |
| Meta description | Answers about eCom Gliders Amazon account management, free audits, PPC, marketplaces, pricing, and how our in-house team works with sellers. |
| H1 | Frequently asked questions |
| Canonical | https://ecomgliders.com/faq/ |
| Indexability | Index, follow |
| Schema | FAQPage, BreadcrumbList |
| Content source | `content/config/faq.json` (homepage FAQ preserved + about unique items) |
| Audit status | Implemented (2026-10-28) |

---

### Sitemap (HTML)

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/site-map/ |
| Purpose | Visitor-facing directory of public routes (home, services, case studies, Contact Us, partnership, careers, FAQ, Free Amazon Tools, legal). Links to `/sitemap.xml` for crawlers. Path is `/site-map/` to avoid Next.js conflict with `app/sitemap.ts`. Footer Resources → Sitemap. |
| Title | Sitemap \| eCom Gliders |
| Canonical | https://ecomgliders.com/site-map/ |
| Indexability | Index, follow |
| XML counterpart | `https://ecomgliders.com/sitemap.xml` via `src/app/sitemap.ts` + `buildSitemapEntries` (deduped; skips `robots.index === false`; excludes `/design-system`) |
| Audit status | Implemented (2026-10-28) |

---

### Free Amazon Tools (directory)

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/free-amazon-tools/ |
| Purpose | Scalable directory of free Amazon tools; each tool has its own page under `/free-amazon-tools/{slug}/` |
| Audience | Amazon sellers investigating unit economics, PPC cost, GST, invoices, and ops utilities |
| Search intent | Informational / commercial investigation |
| Primary keyword | free Amazon tools |
| Secondary keywords | Amazon FBA calculator, Amazon seller tools, Amazon PPC calculator |
| Entity | eCom Gliders; free Amazon tools; FBA; PPC; browser calculators |
| Title | Free Amazon Tools for Sellers \| eCom Gliders |
| Meta description | Free Amazon tools from eCom Gliders: FBA fee and profit, PPC conversion cost, P&L, GST, and more. Browser-based. No account required. |
| H1 | Free Amazon tools for sellers |
| Canonical | `/free-amazon-tools/` |
| Indexability | Index, follow |
| OG image | `/images/services/services-hub-hero-browser.jpg` |
| Schema | CollectionPage + BreadcrumbList + ItemList — Verified Playwright preview 2026-10-30 |
| Structure | Directory JSON lists cards by slug; tool pages in `content/config/tools/{slug}.json` |
| Config | `content/config/free-amazon-tools-page.json` |
| Audit status | Re-optimized 2026-10-30 — shorter title/meta; H1 KW align; ogImage; strip em dashes |

### Free tool: Amazon FBA fee and profit calculator

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/free-amazon-tools/amazon-fba-fee-profit-calculator/ |
| Purpose | Interactive FBA unit-economics calculator; all fees seller-entered (no invented Amazon fee schedule) |
| Audience | Sellers modeling FBA unit profit before launch or repricing |
| Search intent | Informational / commercial investigation |
| Primary keyword | Amazon FBA fee calculator |
| Secondary keywords | FBA profit calculator, Amazon FBA margin calculator |
| Entity | eCom Gliders; Amazon FBA; referral fee; Seller Central fee estimates |
| Title | Amazon FBA Fee Calculator \| Free Tool \| eCom Gliders |
| Meta description | Amazon FBA fee calculator for profit and margin. Enter sale price, COGS, referral, and FBA fulfillment. Free browser tool. No account required. |
| H1 | Amazon FBA fee and profit calculator |
| Canonical | `/free-amazon-tools/amazon-fba-fee-profit-calculator/` |
| Indexability | Index, follow |
| OG image | `/images/services/services-hub-hero-browser.jpg` |
| Schema | WebApplication + WebPage + BreadcrumbList + HowTo — Verified Playwright preview 2026-10-30 |
| Config | `content/config/tools/amazon-fba-fee-profit-calculator.json` |
| Audit status | Re-optimized 2026-10-30 — title primary KW; shorter meta; ogImage; relative canonical |

### Free tool: PPC conversion cost calculator

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/free-amazon-tools/amazon-ppc-conversion-cost-calculator/ |
| Purpose | Interactive unit-economics calculator for Amazon PPC spend efficiency |
| Audience | Advertisers modeling CPC-to-conversion cost and net profit after ads |
| Search intent | Informational / commercial investigation |
| Primary keyword | Amazon PPC conversion cost calculator |
| Secondary keywords | Amazon PPC cost calculator, cost per conversion Amazon, Amazon advertising unit economics |
| Entity | eCom Gliders; Amazon PPC; Sponsored Ads; conversion cost |
| Title | Amazon PPC Conversion Cost Calculator \| eCom Gliders |
| Meta description | Amazon PPC conversion cost calculator. Estimate cost per session, cost per conversion, and net profit after ad spend. Free browser tool. |
| H1 | Amazon PPC conversion cost calculator |
| Canonical | `/free-amazon-tools/amazon-ppc-conversion-cost-calculator/` |
| Indexability | Index, follow |
| OG image | `/images/services/services-hub-hero-browser.jpg` |
| Schema | WebApplication + WebPage + BreadcrumbList — Verified Playwright preview 2026-10-30 |
| Config | `content/config/tools/amazon-ppc-conversion-cost-calculator.json` |
| Audit status | Re-optimized 2026-10-30 — shorter title/meta; ogImage; relative canonical; strip em dash |

### Free tool: Amazon P&L calculator

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/free-amazon-tools/amazon-pnl-calculator/ |
| Purpose | Interactive Amazon profit-and-loss estimate after fees, ads, and COGS |
| Audience | Sellers checking unit profit before scaling ads or changing price |
| Search intent | Informational / commercial investigation |
| Primary keyword | Amazon P&L calculator |
| Secondary keywords | Amazon profit and loss calculator, Amazon seller P&L, Amazon unit economics |
| Entity | eCom Gliders; Amazon P&L; GST; referral fee; FBA fulfillment |
| Title | Amazon P&L Calculator \| Free Tool \| eCom Gliders |
| Meta description | Amazon P&L calculator for sellers. Estimate profit after GST, referral, fulfillment, ads, packaging, and COGS. Free browser tool. |
| H1 | Amazon P&L calculator |
| Canonical | `/free-amazon-tools/amazon-pnl-calculator/` |
| Indexability | Index, follow |
| OG image | `/images/services/services-hub-hero-browser.jpg` |
| Schema | WebApplication + WebPage + BreadcrumbList — Verified Playwright preview 2026-10-30 |
| Config | `content/config/tools/amazon-pnl-calculator.json` |
| Audit status | Re-optimized 2026-10-30 — created SITE-SEO-MAP row; meta polish; ogImage |

### Free tool: GST calculator

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/free-amazon-tools/gst-calculator/ |
| Purpose | Interactive GST add/remove calculator for India supply scenarios |
| Audience | Amazon sellers needing CGST/SGST or IGST splits for invoices |
| Search intent | Informational / commercial investigation |
| Primary keyword | GST calculator for Amazon sellers |
| Secondary keywords | GST calculator, CGST SGST calculator, IGST calculator, Amazon GST |
| Entity | eCom Gliders; GST; CGST; SGST; IGST; India supply |
| Title | GST Calculator for Amazon Sellers \| Free Tool \| eCom Gliders |
| Meta description | GST calculator for Amazon sellers. Add or remove GST with CGST/SGST or IGST split for India supply. Free browser tool. No account required. |
| H1 | GST calculator for Amazon sellers |
| Canonical | `/free-amazon-tools/gst-calculator/` |
| Indexability | Index, follow |
| OG image | `/images/services/services-hub-hero-browser.jpg` |
| Schema | WebApplication + WebPage + BreadcrumbList — Verified Playwright preview 2026-10-30 |
| Config | `content/config/tools/gst-calculator.json` |
| Notes | Not tax advice; calculation is browser-side |
| Audit status | Re-optimized 2026-10-30 — created SITE-SEO-MAP row; Amazon-seller KW in title/H1; meta length; ogImage |

### Free tools: remaining directory entries

Additional indexable tool pages (same SEO pattern: unique title/meta/canonical, WebApplication JSON-LD, XML sitemap):

- `/free-amazon-tools/invoice-generator/`
- `/free-amazon-tools/product-catalog/`
- `/free-amazon-tools/label-invoice-splitter/`
- `/free-amazon-tools/dispatch-check/`
- `/free-amazon-tools/sku-profitability-leaderboard/`
- `/free-amazon-tools/returns-rto-diagnostic/`
- `/free-amazon-tools/monthly-seller-closeout/`
- `/free-amazon-tools/tcs-tds-reconciliation/`
- `/free-amazon-tools/ppc-performance-dashboard/`

---

### Agency Partnership

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/agency-partnership/ |
| Purpose | Invite complementary agencies into white-label, referral, or co-managed Amazon collaboration; filter sellers and unrelated vendor pitches |
| Audience | Digital, creative, web, PR, 3PL, finance, and similar agencies with Amazon demand they do not staff |
| Search intent | Navigational / B2B partnership |
| Primary keyword | Amazon agency partnership |
| Secondary keywords | white-label Amazon agency, Amazon referral partner, co-manage Amazon agency |
| Title | Agency Partnership \| Amazon Collaboration for Agencies \| eCom Gliders |
| Meta description | Apply to partner with eCom Gliders. White-label, referral, and co-managed Amazon delivery for complementary agencies—not an open vendor pitch inbox. |
| H1 | Amazon delivery capacity for agencies that already own the relationship |
| Canonical | https://ecomgliders.com/agency-partnership/ |
| Indexability | Index, follow |
| Schema | WebPage, BreadcrumbList, FAQPage |
| Sections | Hero For/Not for, demand signal, three lanes, complement map, client protection, operating cadence, fit criteria, partner FAQ, application, close |
| Internal links | Free Audit (seller redirect), linked Amazon service pages, Privacy, Contact |
| Audit status | Implemented (2026-10-28) |

---

### Contact

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/contact/ |
| Primary keyword | Contact eCom Gliders |
| Search intent | Navigational/Transactional |
| Title | Contact eCom Gliders \| Amazon Agency |
| Meta description | Contact eCom Gliders for Amazon account management, PPC, and listing optimization. Call +1 (360) 660-1210 or send a message. |
| H1 | Contact eCom Gliders |
| Canonical | https://ecomgliders.com/contact/ |
| Indexability | Index |
| Schema | ContactPage, Organization (@id), ContactPoint, BreadcrumbList, FAQPage |
| Sections | Hero + hours/SLA; path cards (message / strategy intake / free audit); short message form + NAP; 5-step strategy intake wizard; process; FAQ; internal links |
| Internal links | Free Audit, About, Services, Case Studies, Privacy |
| Audit status | Redesigned (2026-10-23) � AMZ contact + book-a-call patterns on one URL |

---

### Blog Index

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/blog/ |
| Primary keyword | Amazon seller blog |
| Secondary keywords | Amazon PPC tips, Amazon SEO guides |
| Search intent | Informational |
| Title | Amazon Seller Blog \| PPC, SEO and Growth Tips \| eCom Gliders |
| Meta description | 328 articles on Amazon PPC, listing optimization, account management, and seller growth strategies from eCom Gliders. |
| H1 | Amazon Seller Insights |
| Canonical | https://ecomgliders.com/blog/ |
| Indexability | Index |
| Schema | CollectionPage, Blog |
| Audit status | Mapped |

---

## Service pages (Master Program queue)

Canonical URLs are root `/{slug}/` matching `content/config/services/{slug}.json`.  
Phase 0 foundation (2026-10-04): PO template + optional audience/differ schema + multi-market Service JSON-LD.  
Content rewrite status: incomplete until each wave CONTINUE pass.

| Page | Primary keyword | URL | Status |
|------|----------------|-----|--------|
| Full Service / Account Management | Full service Amazon agency | /full-service-amazon-agency/ | Unique composition shipped (fullServiceCommand, 2026-10-23) |
| Amazon PPC Management | Amazon PPC management agency | /amazon-ppc-management-agency/ | Implemented (A2, 2026-10-04) |
| Listing Optimization and SEO | Amazon listing optimization services | /amazon-listing-optimization/ | Implemented (A3, 2026-10-04) |
| Content Writing | Amazon content writing services | /amazon-content-writing/ | Implemented (A4, 2026-10-04) |
| Visual Creativity | Amazon A+ content design | /amazon-visual-creativity/ | Implemented (A5, 2026-10-04) |
| Catalog Management | Amazon catalog management services | /amazon-catalog-management/ | Implemented (A6, 2026-10-04) |
| DSP Platforms | Amazon DSP management | /amazon-dsp-management/ | Implemented (B1, 2026-10-04) |
| Reporting and Analytics | Amazon reporting analytics | /amazon-reporting-analytics/ | Implemented (B2, 2026-10-04) |
| Video Creative | Amazon video creative | /amazon-video-creative/ | Implemented (C1, 2026-10-04) |
| Trademark and Brand Registry | Amazon Brand Registry | /amazon-trademark-brand-registry/ | Implemented (C2, 2026-10-04) |
| Company Registration | US company registration for Amazon sellers | /amazon-company-registration/ | Implemented (C3, 2026-10-04) |
| Product Sourcing | Amazon product sourcing | /amazon-product-sourcing/ | Implemented (C4, 2026-10-04) |
| Shopify Website Development | Shopify website development | /shopify-website-development/ | Implemented (D1, 2026-10-04) |
| TikTok Shop Ads | TikTok Shop ads | /tiktok-shop-ads/ | Implemented (D2, 2026-10-04) |
| Email Retention Marketing | Email retention marketing | /email-retention-marketing/ | Implemented (D3, 2026-10-04) |
| Product Launch Services | Amazon product launch services | /amazon-product-launch-services/ | Implemented (2026-10-21) |
| Inventory Management | Amazon inventory management | /amazon-inventory-management/ | Implemented (2026-10-21) |
| Seller Central Services | Amazon Seller Central services | /amazon-seller-central-services/ | Implemented (2026-10-21) |
| Account Operations | Amazon account operations | /amazon-account-operations/ | Implemented (2026-10-21) |
| Account Health | Amazon account health | /amazon-account-health/ | Implemented (2026-10-21) |

---

## Legal pages

| URL | Indexability | Audit status |
|-----|-------------|-------------|
| /privacy-policy/ | Index | Implemented (2026-10-23); 301 from /privacy-policy-2/ |
| /terms-conditions/ | Index | Implemented (2026-10-23); 301 from /terms-conditions-2/ |

### Privacy Policy

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/privacy-policy/ |
| Title | Privacy Policy \| eCom Gliders |
| H1 | Privacy Policy |
| Canonical | https://ecomgliders.com/privacy-policy/ |
| Schema | WebPage, BreadcrumbList |
| Redirect | /privacy-policy-2/ ? /privacy-policy/ (301) |

### Terms and Conditions

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/terms-conditions/ |
| Title | Terms and Conditions \| eCom Gliders |
| H1 | Terms and Conditions |
| Canonical | https://ecomgliders.com/terms-conditions/ |
| Schema | WebPage, BreadcrumbList |
| Redirect | /terms-conditions-2/ ? /terms-conditions/ (301) |

---

## Blog posts

| Count | URL pattern | Status |
|-------|-------------|--------|
| 328 | Root-level /{slug}/ | Verified 328/328 HTTP 200 (P3-04); route + template (P3-02/P3-03); per-post audit pending |

Per-post SEO audit to be completed during SEO audit phase. All URLs must preserve identical paths.

**Critical rule:** No URL changes without documented approval and 301 redirect mapping in docs/seo/URL-INVENTORY.md.

---

## Competitor keyword gaps (opportunities)

| Keyword | eCom Gliders coverage | Competitor leader | Action |
|---------|----------------------|-------------------|--------|
| Amazon account management agency | Homepage target | AMZ Dudes, Olifant | Optimize homepage H1 and title |
| Full service Amazon agency | /full-service-amazon-agency/ | Canopy, Sequence | Strengthen service page |
| Amazon PPC management agency | /amazon-ppc-management-agency/ | Incrementum | Migrate to Service schema |
| Amazon growth agency | Weak | Olifant | Add to homepage secondary keywords |
| Agency vs DIY | None | Sequence | Add comparison table (AEO) |
| AI SEO for Amazon | Blog potential | Sequence | Future blog content |

---

## Internal linking strategy

| From | Link to |
|------|---------|
| Homepage | All 6 service pages, case studies, blog, free audit |
| Service pages | Related services (3 cards), free audit, relevant blog posts |
| Case studies | Related services, free audit |
| Blog posts | Relevant services, free audit, related posts |
| Free audit | Services, case studies |

---

## Schema requirements by page type

| Page type | Required schema |
|-----------|----------------|
| Homepage | Organization, WebSite, FAQPage |
| Service page | Service, FAQPage |
| Case study | Article or CreativeWork |
| Blog post | Article, BlogPosting |
| About | AboutPage, Organization |
| Contact | ContactPage |
| Free audit | WebPage, FAQPage |

---

## Audit template

For per-page SEO audit, use `.cursor/skills/seo-audit/SKILL.md`.

Fields to verify per page:
- Search intent alignment
- Primary and secondary keywords
- Title (under 60 characters)
- Meta description (under 160 characters)
- H1 (one per page, keyword-aligned)
- Heading hierarchy (H2, H3)
- Internal links (minimum 3 per page)
- Canonical URL
- Indexability and robots
- Sitemap inclusion
- Structured data validation
- Image alt text
- URL slug
- Page speed
- Mobile usability

---

## Related documents

- [COMPETITIVE-RESEARCH.md](COMPETITIVE-RESEARCH.md)
- [URL-INVENTORY.md](URL-INVENTORY.md)
- [obsidian/08-SEO/Keyword-Research.md](../../obsidian/08-SEO/Keyword-Research.md)
- [obsidian/08-SEO/Blog-URL-Preservation.md](../../obsidian/08-SEO/Blog-URL-Preservation.md)
- [backup/metadata/blog-inventory.json](../../backup/metadata/blog-inventory.json)
