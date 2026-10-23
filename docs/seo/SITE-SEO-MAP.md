# Site SEO Map

Per-page SEO records for all indexable pages.

**Updated:** 2026-09-02 (competitor keyword research)  
**Status:** Core pages mapped. Blog posts to be populated during SEO audit phase.

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
| URL | https://ecomgliders.com/ |
| Primary keyword | Amazon account management agency |
| Secondary keywords | Full service Amazon agency, Amazon growth agency, Amazon PPC agency |
| Search intent | Commercial (agency selection) |
| Title | Amazon Account Management Agency \| eCom Gliders |
| Meta description | Full-service Amazon account management. PPC, listing optimization, content, and catalog management. 95% retention. Free audit. |
| H1 | Full-service Amazon growth for ambitious FBA brands |
| Canonical | https://ecomgliders.com/ |
| Indexability | Index |
| Schema | Organization, WebSite, FAQPage |
| Internal links | Services, case studies, blog, free audit |
| Audit status | Implemented (P2-05) � `generateMetadata` + JSON-LD `@graph` |
| Verification | Playwright 2026-09-02: title, meta, canonical, 10 FAQ entities in FAQPage schema |

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
| Meta description | Amazon growth services: PPC, account management, listings, creative, catalog, brand ops, Shopify, TikTok Shop ads, and email. Free audit. |
| H1 | Amazon growth services for serious sellers |
| Canonical | https://ecomgliders.com/services/ |
| Indexability | Index |
| Schema | CollectionPage + ItemList + FAQPage |
| Internal links | All 15 root service pages, /free-audit/, /case-studies/, /case-study-9/, /case-study-1/ |
| AEO | FAQ covers only-PPC, one vs full management, complementary channels, marketplaces, free audit |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | Verified site stats + existing case studies only � no invented hub ROI |
| Competitors reviewed | Seller Sage /services/ (Observed); Desverto / AMZcentric stack framing (Observed); live WP /services/ (Verified Playwright 2026-10-05) |
| Config | `content/config/services-index.json` |
| Audit status | Implemented (2026-10-05) |
| Notes | Preserves live WP `/services/` path. Detail pages stay at root `/{slug}/`. Mega View all services and footer All services point here. |

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
| Title | Amazon PPC Management Agency \| Cut ACOS \| eCom Gliders |
| Meta description | Amazon PPC management agency across Sponsored Products, Brands, and Display. Lower ACoS and scale profitably with an Amazon Ads Verified Partner. |
| H1 | Amazon PPC management agency for profitable growth |
| Canonical | https://ecomgliders.com/amazon-ppc-management-agency/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /full-service-amazon-agency/, /amazon-listing-optimization/, /amazon-dsp-management/, /case-study-9/, /case-study-3/ |
| AEO | FAQ covers ad types, timeline, spend, ownership, metrics, marketplaces, collaboration, getting started |
| GEO | Verified partner + since 2018 + 20+ in-house + 95% retention + $112M+ |
| Claims source | case-study-9 ACOS 52%?26.5% and +310% revenue; case-study-3 profitable PPC recovery � Verified in case-studies.json |
| Competitors reviewed | Incrementum Amazon Advertising (2026-10-04); AMZ Dudes PPC guide (2026-10-04); backup WP page |
| Config | `content/config/services/amazon-ppc-management-agency.json` |
| Audit status | Implemented + Verified (A2, 2026-10-04) |

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
| Meta description | Email and retention marketing for Amazon brands. Lifecycle flows that complement marketplace growth with owned-channel relationships. Free audit. |
| H1 | Email and retention marketing for Amazon brands |
| Canonical | https://ecomgliders.com/email-retention-marketing/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets (Amazon client markets; email compliance varies) |
| Internal links | /free-audit/, /shopify-website-development/, /full-service-amazon-agency/, /amazon-content-writing/, /case-study-9/, /case-study-1/ |
| AEO | FAQ covers not replacing Amazon ads, Shopify need, platforms, first flows, measurement, Amazon bestsellers, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | No email ROI invent ($30�$50/$1, 30�50% revenue). Results use brand-retention growth cases (case-study-9 310%; case-study-1 73%) � Verified |
| Competitors reviewed | Chronos retention agency (2026-10-04 Verified); EvolveAMZ Klaviyo for Amazon sellers playbook (2026-10-04 Observed); EG Shopify plugins / algorithm blogs mentioning email (Observed) |
| Config | `content/config/services/email-retention-marketing.json` |
| Audit status | Implemented + Verified (D3, 2026-10-04) |
| Notes | Dedicated WP service HTML not found. No Chronos $400M / 500 brands or EvolveAMZ $30�$50 email ROI claims copied. |

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
| Canonical | https://ecomgliders.com/tiktok-shop-ads/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets (Amazon client markets; TikTok Shop eligibility varies) |
| Internal links | /free-audit/, /amazon-ppc-management-agency/, /amazon-video-creative/, /shopify-website-development/, /case-study-9/, /case-study-1/ |
| AEO | FAQ covers not replacing Amazon, SKU fit, creative, timing, measurement, Amazon insight handoff, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | No TikTok ROAS/GMV invent. Results use advertising-led Amazon cases (case-study-9 ACOS 52% to 26.5%; case-study-1 73%) with complementary framing � Verified |
| Competitors reviewed | Viral Brand Works Amazon-to-TikTok Shop agency (2026-10-04 Verified); Sequence Amazon�TikTok program (2026-10-04 Observed); Desverto TikTok Shop for Amazon sellers (Observed search; Cloudflare blocked Playwright); EG blogs on TikTok external traffic (Observed) |
| Config | `content/config/services/tiktok-shop-ads.json` |
| Audit status | Implemented + Verified (D2, 2026-10-04) |
| Notes | Dedicated WP service HTML not found. No competitor $50k+/mo, 500+ creators, $500M, or 285% claims copied. |

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
| Meta description | Shopify website development for Amazon brands. Owned-channel storefronts that complement marketplace growth. Free audit. |
| H1 | Shopify website development for Amazon brands |
| Canonical | https://ecomgliders.com/shopify-website-development/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets (Amazon client markets; Shopify scope separate) |
| Internal links | /free-audit/, /email-retention-marketing/, /full-service-amazon-agency/, /amazon-visual-creativity/, /case-study-9/, /case-study-1/ |
| AEO | FAQ covers not replacing Amazon, rebuilds, content alignment, plans, ongoing updates, email, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | No Shopify CVR invent. Results use brand-channel growth cases (case-study-9 310%; case-study-1 73%) with complementary framing � Verified |
| Competitors reviewed | Velocity Sellers Shopify DTC (2026-10-04); Krolog Grow on Shopify (2026-10-04 Observed); EG services-2 Website Development + WooCommerce vs Shopify blog (Verified backup) |
| Config | `content/config/services/shopify-website-development.json` |
| Audit status | Implemented + Verified (D1, 2026-10-04) |
| Notes | Dedicated WP slug HTML not found; services-2 #s-6 Website Development used as backup. No competitor 27% CVR / Shop Pay 50% / pricing tiers copied. |

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
| Meta description | Amazon product sourcing support with supplier research, sample evaluation, and launch readiness for new ASINs. Free audit. |
| H1 | Amazon product sourcing for new ASINs |
| Canonical | https://ecomgliders.com/amazon-product-sourcing/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-catalog-management/, /amazon-listing-optimization/, /full-service-amazon-agency/, /case-study-8/, /case-study-9/ |
| AEO | FAQ covers manufacturing boundary, categories, supplier evaluation, compliance, launch handoff, first-timers, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | No sourcing cost-cut invent. Results use catalog-expansion cases (case-study-8 7-figure; case-study-9 310%) with launch-support framing � Verified |
| Competitors reviewed | AMZ Verse manufacturing/sourcing (2026-10-04); NexoFetch Amazon FBA sourcing agent (2026-10-04); EG services #service_7 Product Sourcing & Shipping (Verified backup) |
| Config | `content/config/services/amazon-product-sourcing.json` |
| Audit status | Implemented + Verified (C4, 2026-10-04) |
| Notes | Dedicated WP slug HTML not found; services/#service_7 used as backup. No 35% cost-reduction or 100% FBA compliant claims copied. |

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
| Meta description | US company registration support for Amazon sellers, with clear setup guidance and handoff into Brand Registry and account growth. Free audit. |
| H1 | US company registration support for Amazon sellers |
| Canonical | https://ecomgliders.com/amazon-company-registration/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-trademark-brand-registry/, /full-service-amazon-agency/, /amazon-product-sourcing/, /case-study-1/, /case-study-9/ |
| AEO | FAQ covers audience, not legal/tax advice, Amazon relation, post-formation help, timelines, necessity, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | No formation-approval invent. Results use foundation-ready growth cases (case-study-1 73%; case-study-9 310%) � Verified. Backup India PAN/TAN/100% compliant copy replaced � Verified |
| Competitors reviewed | StarterX Amazon LLC formation (2026-10-04); StartGlobal Amazon FBA LLC (2026-10-04); EG services-2 Company Registration (Verified backup) |
| Config | `content/config/services/amazon-company-registration.json` |
| Audit status | Implemented + Verified (C3, 2026-10-04) |
| Notes | Dedicated WP slug HTML not found; services-2 #services_1 used as backup. US-entity framing retained; India-specific PAN/TAN claims removed. |

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
| Meta description | Amazon Brand Registry and trademark pathway support for sellers who need protection tools, A+ Content access, and clearer enrollment guidance. Free audit. |
| H1 | Amazon Brand Registry and trademark pathway support |
| Canonical | https://ecomgliders.com/amazon-trademark-brand-registry/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-company-registration/, /amazon-content-writing/, /amazon-catalog-management/, /case-study-8/, /case-study-1/ |
| AEO | FAQ covers trademark requirement, not-a-law-firm boundary, timelines, unlocks, rejections, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | No trademark-approval-rate invent. Results use brand-ready growth cases (case-study-8 7-figure + brand defense; case-study-1 73%) with foundation framing � Verified |
| Competitors reviewed | Seller Interactive brand protection (2026-10-04); Global Trademark Company Brand Registry filing (2026-10-04); Amazon Brand Registry eligibility (Observed); EG services-2 USPTO + Brand Registry sections (Verified backup) |
| Config | `content/config/services/amazon-trademark-brand-registry.json` |
| Audit status | Implemented + Verified (C2, 2026-10-04) |
| Notes | Dedicated WP slug HTML not found; services-2 #services_3/#services_4 + Brand Registry benefits blog used as backup. |

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
| Meta description | Amazon video creative for listings and advertising. Product demos and brand cuts built for Amazon shoppers. Free audit. |
| H1 | Amazon video creative for listings and ads |
| Canonical | https://ecomgliders.com/amazon-video-creative/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-visual-creativity/, /tiktok-shop-ads/, /amazon-ppc-management-agency/, /case-study-4/, /case-study-9/ |
| AEO | FAQ covers placements, scripting, footage reuse, length, copy alignment, DSP, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | No video-attributed case metrics in config. Results use creative conversion cases (case-study-4 2X; case-study-9 CVR) with reinforcement framing � Verified |
| Competitors reviewed | Canopy photography/video (2026-10-04); Seller Interactive storefront/video coordination (2026-10-04); Amazon Ads SB video guidance (Observed) |
| Config | `content/config/services/amazon-video-creative.json` |
| Audit status | Implemented + Verified (C1, 2026-10-04) |
| Notes | Dedicated WP service HTML for slug not found in backup. |

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
| Meta description | Amazon reporting and analytics with clear weekly and monthly metrics for sales, advertising efficiency, and catalog priorities. Free audit. |
| H1 | Amazon reporting and analytics for clear decisions |
| Canonical | https://ecomgliders.com/amazon-reporting-analytics/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-ppc-management-agency/, /full-service-amazon-agency/, /amazon-listing-optimization/, /case-study-9/, /case-study-1/ |
| AEO | FAQ covers data sources, cadence, scope beyond ads, internal teams, dashboards, service connection, marketplaces, getting started |
| GEO | Aligns with homepage: specialists + reporting tied to sales/ACOS/catalog; measure success KPIs |
| Claims source | Homepage FAQ measure-success + process reporting claims; case-study-9 ACOS; case-study-1 73% � Verified. No proprietary BI product claimed. |
| Competitors reviewed | Incrementum DataOwl (2026-10-04); SalesDuo BI dashboard (2026-10-04); EG profit-analytics blog backup |
| Config | `content/config/services/amazon-reporting-analytics.json` |
| Audit status | Implemented + Verified (B2, 2026-10-04) |
| Notes | Dedicated WP service HTML for slug not found. Differentiated vs software-dashboard agencies per homepage positioning. |

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
| Meta description | Amazon DSP management for upper-funnel reach and retargeting, aligned with Sponsored Ads and Amazon sales goals. Free audit. |
| H1 | Amazon DSP management for brand growth beyond Sponsored Ads |
| Canonical | https://ecomgliders.com/amazon-dsp-management/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets (DSP inventory varies by market) |
| Internal links | /free-audit/, /amazon-ppc-management-agency/, /amazon-video-creative/, /full-service-amazon-agency/, /case-study-9/, /case-study-3/ |
| AEO | FAQ covers what DSP is, Brand Registry, Sponsored Ads relation, budget, measurement, creative, marketplaces, getting started |
| GEO | Amazon Ads Verified Partner; since 2018; 20+ in-house; 95% retention; $112M+ |
| Claims source | No DSP-attributed case metrics in config. Results use advertising foundation cases (GoSports ACOS; VoltTech PPC recovery) with explicit full-funnel-readiness framing � Verified |
| Competitors reviewed | Sequence DSP agency (2026-10-04); Canopy DSP page (2026-10-04); EG Sponsored Display blog as related backup |
| Config | `content/config/services/amazon-dsp-management.json` |
| Audit status | Implemented + Verified (B1, 2026-10-04) |
| Notes | No dedicated WP DSP service HTML in backup. Did not claim AMC-as-standard or competitor min-spend/ROAS figures. |

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
| Meta description | Amazon catalog management for listing health, variation setup, suppressions, and attribute quality at scale. Free audit. |
| H1 | Amazon catalog management for healthy, scalable listings |
| Canonical | https://ecomgliders.com/amazon-catalog-management/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-listing-optimization/, /full-service-amazon-agency/, /amazon-trademark-brand-registry/, /case-study-1/, /case-study-8/ |
| AEO | FAQ covers scope, suppressions, variations, PPC link, catalog size, marketplaces, cadence, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | case-study-1 catalog optimization + 73%; case-study-8 catalog expansion to 7-figure � Verified |
| Competitors reviewed | Olifant account audit/catalog (2026-10-04); Sequence Amazon account ops (2026-10-04); EG suppression/error blogs as backup |
| Config | `content/config/services/amazon-catalog-management.json` |
| Audit status | Implemented + Verified (A6, 2026-10-04) |
| Notes | Dedicated WP service HTML for this slug not found; listing-errors + suppressed-listings blogs used as backup. No reinstatement guarantee. |

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
| Title | Amazon Visual Creativity and A+ Design \| eCom Gliders |
| Meta description | Amazon visual creativity for product photography, lifestyle imagery, and A+ design that support listing conversion. Free audit. |
| H1 | Amazon visual creativity and A+ design that convert |
| Canonical | https://ecomgliders.com/amazon-visual-creativity/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-video-creative/, /amazon-content-writing/, /amazon-listing-optimization/, /case-study-4/, /case-study-9/ |
| AEO | FAQ covers assets, samples, Amazon requirements, refresh vs reshoot, conversion role, video handoff, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | case-study-4 2X conversion (visual + A+); case-study-9 lifestyle/A+ + CVR � Verified |
| Competitors reviewed | Seller Interactive storefront/A+ design (2026-10-04); Canopy photography/A+ listing package (2026-10-04 prior); EG image/A+ blogs as backup |
| Config | `content/config/services/amazon-visual-creativity.json` |
| Audit status | Implemented + Verified (A5, 2026-10-04) |
| Notes | Dedicated WP service HTML for this slug not found in backup; customer-image + A+ blogs used as evidence. |

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
| Meta description | Amazon content writing for titles, bullets, descriptions, and A+ Content. Conversion-focused copy for growing sellers. Free audit. |
| H1 | Amazon content writing for titles, bullets, and A+ |
| Canonical | https://ecomgliders.com/amazon-content-writing/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-listing-optimization/, /amazon-visual-creativity/, /full-service-amazon-agency/, /case-study-9/, /case-study-4/ |
| AEO | FAQ covers deliverables, keywords, voice, claims, Store/Brand Story, vs listing SEO, marketplaces, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | case-study-9 CVR + benefit-first copy; case-study-4 2X conversion with A+ content � Verified |
| Competitors reviewed | Olifant listing optimization/copy (2026-10-04); Canopy listing copywriting package (2026-10-04); EG A+ SEO blog backup |
| Config | `content/config/services/amazon-content-writing.json` |
| Audit status | Implemented + Verified (A4, 2026-10-04) |
| Notes | Dedicated WP service HTML for this slug not found in backup; A+ SEO blog used as content evidence. |

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
| Title | Amazon Listing Optimization and SEO \| eCom Gliders |
| Meta description | Amazon listing optimization and SEO with keyword research, conversion copy, and ongoing ranking improvements. Free audit for priority ASINs. |
| H1 | Amazon listing optimization and SEO for ranking and conversion |
| Canonical | https://ecomgliders.com/amazon-listing-optimization/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-content-writing/, /amazon-ppc-management-agency/, /amazon-visual-creativity/, /case-study-9/, /case-study-1/ |
| AEO | FAQ covers scope, timeline, prioritization, PPC impact, A+, marketplaces, metrics, getting started |
| GEO | since 2018, 20+ in-house, 95% retention, $112M+ |
| Claims source | case-study-9 CVR 9.8%?26.7% + 310% revenue; case-study-1 73% growth (listing optimization) � Verified |
| Competitors reviewed | Canopy product listing optimization (2026-10-04); SalesDuo listing optimization agency (2026-10-04); EG listing blogs as backup |
| Config | `content/config/services/amazon-listing-optimization.json` |
| Audit status | Implemented + Verified (A3, 2026-10-04) |
| Notes | Dedicated WP service HTML for this slug not found in backup; service route is new-site canonical. Backup evidence from listing SEO blog posts. |

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
| Title | Full Service Amazon Agency \| Account Management \| eCom Gliders |
| Meta description | Full-service Amazon agency for account management, PPC, listing optimization, content, and catalog management. 95% client retention. Free audit. |
| H1 | Full-service Amazon account management for growing brands |
| Canonical | https://ecomgliders.com/full-service-amazon-agency/ |
| Indexability | Index |
| Schema | Service, FAQPage; areaServed = 23 Seller Central markets |
| Internal links | /free-audit/, /amazon-ppc-management-agency/, /amazon-listing-optimization/, /amazon-reporting-analytics/, /case-study-9/, /case-study-1/ |
| AEO | FAQ covers scope, ownership, PPC vs full-service, marketplaces, pricing, getting started |
| GEO | Consistent claims: since 2018, 20+ in-house, 95% retention, $112M+ revenue managed |
| Claims source | Homepage FAQ + case-studies.json (GoSports 310%, Kitchen 73%) � Verified in config |
| Competitors reviewed | Canopy full-service AM (2026-10-04); Sequence Commerce Amazon (2026-10-04); backup WP page |
| Config | `content/config/services/full-service-amazon-agency.json` |
| Audit status | Implemented + Verified (A1, 2026-10-04) |

---

### Free Audit

| Field | Value |
|-------|-------|
| URL | https://ecomgliders.com/free-audit/ |
| Primary keyword | Free Amazon account audit |
| Secondary keywords | Amazon PPC audit, Amazon account review |
| Search intent | Transactional |
| Title | Free Amazon Account Audit \| eCom Gliders |
| Meta description | Get a free audit of your Amazon account. PPC performance review, listing optimization opportunities, and actionable recommendations. No obligation. |
| H1 | Free Amazon audit |
| Canonical | https://ecomgliders.com/free-audit/ |
| Indexability | Index |
| Schema | WebPage, FAQPage |
| Sections | Lime hero + score tiles; ink/canvas scope mosaic; ink findings tickets; lime turnaround ribbon; open split form; proof strip + FAQ |
| Audit status | Redesigned (2026-10-23); URL cleaned from /free-audit/ (301) |
| Redirect | /free-audit/ ? /free-audit/ (301) |

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
