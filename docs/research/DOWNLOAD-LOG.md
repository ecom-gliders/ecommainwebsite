# Download Log

Record of all assets downloaded for this project.

## 2026-09-01 - Full site backup scrape

Script: `scripts/research-tools/scrape-site.py`
Source: https://ecomgliders.com/
Method: WordPress REST API + sitemap crawl + HTML download + asset extraction

Totals:
- Blog posts: 328
- Pages: 26
- Media files: 370
- HTML snapshots: 453 (0 failed)
- Extracted assets: 645
- Backup size: ~665 MB

Location: `backup/`

## 2026-09-02 - eCom Gliders logo

Date: 2026-09-02
Source URL: https://ecomgliders.com/wp-content/uploads/2025/04/asset-109-removebg-preview-1.png
Asset name: ecom-gliders-logo.png
Type: image
License: eCom Gliders brand asset (owned)
Used on page: header, footer, design-system brand section
Checksum: not computed
Validated: yes
Production path: `public/images/logo.png`
Source copy: `assets/source/ecom-gliders-logo.png`
Dimensions: 729x216

## 2026-09-03 - AI assistant marks (announcement bar)

Date: 2026-09-03
Source URL: https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/{openai,claude,googlegemini,perplexity}.svg
Method: Playwright `fetch` validation from live browser context, then saved to disk
Asset names: chatgpt.svg, claude.svg, gemini.svg, perplexity.svg
Type: icon
License: Simple Icons CC0 1.0 (see `assets/licenses/ai-assistant-marks.md`)
Used on page: announcement bar Ask AI chips
Validated: yes
Production path: `public/images/ai/`
Source copy: `assets/source/ai/`
Icons copy: `assets/icons/ai/`

## 2026-09-03 - Homepage Wave A asset ingest (from site backup)

Date: 2026-09-03
Source: Local migration backup `backup/assets/images/uploads/` (originally scraped from https://ecomgliders.com/ on 2026-09-01)
Method: Copy + rename for production paths (no new remote download)
Type: image
License: eCom Gliders site / client brand marks used on owned marketing site — see `assets/licenses/homepage-wave-a-assets.md`
Used on page: Homepage trust, cases, creative, press (Wave B+ wiring)
Validated: yes (files present, non-zero size)
Assumed: Client brand names for alts deferred (Part C2: Client brand logo 01–10)

| Production path | Backup source |
|-----------------|---------------|
| `public/images/clients/client-01.png` … `client-10.png` | `uploads/2025/04/1st-brand.png`, `2-1`…`8-1`, `9.png`, `10.png` |
| `public/images/reviews/trustpilot.png` | `uploads/2025/03/Trustpilot-1.png` |
| `public/images/reviews/google-reviews.webp` | `uploads/2025/03/Google-reviews2webp.webp` |
| `public/images/press/featured-designrush.png` | `uploads/2025/09/Top-Digital-Marketing-Agencies-3.png` |
| `public/images/press/featured-jbms360.png` | `uploads/2025/09/Featured-on-JBMS360.png` |
| `public/images/press/featured-news-break.png` | `uploads/2025/09/Featured-on-NEWS-BREAK.png` |
| `public/images/press/featured-vents-magazine.png` | `uploads/2025/09/Featured-on-Vents-Magazine.png` |
| `public/images/cases/gosports.png` | `uploads/2025/04/gosports.png` |
| `public/images/cases/case-kitchen-mark.png` | `uploads/2025/04/1-4.png` (case-study-1 featured; logo-style mark — Requires QA in Wave D) |
| `public/images/cases/case-supplement-mark.png` | `uploads/2025/04/2-3.png` (case-study-2 featured; logo-style mark — Requires QA in Wave D) |
| `public/images/creative/les-plaisirs-cutting-boards.png` | `uploads/2026/02/Client-feedback-for-eCom-Gliders-a-Full-service-amazon-account-management-agency.png` |

Notes:
- Trustpilot/Google badges: static only (no profile href) until URLs confirmed (Part C2).
- Creative: stills-only seed (1 QA-passed product shot); Vimeo deferred.
- No newsletter or unverified award assets ingested.

## 2026-09-03 - AI marks restored to production from local source

Date: 2026-09-03
Source: `assets/source/ai/` (Simple Icons CC0 copies already logged above)
Action: Copied chatgpt/claude/gemini/perplexity.svg back to `public/images/ai/` and `assets/icons/ai/` after a bad Gemini overwrite
Validated: yes
License: unchanged — `assets/licenses/ai-assistant-marks.md`

## 2026-09-03 - Client logo alts identified (no new remote download)

Date: 2026-09-03
Source: Existing Wave A PNGs from ecomgliders.com backup (already in `public/images/clients/`)
Action: Updated homepage.json labels/alts to Verified brand names from asset inspection:
Hanycony, Van Den Heuvel, Totsy Baby, 365 Whole Foods Market, SNEMEEY, 2nd Springs Wellness, GoSports, SAFE FINE, piklohas, Creative HOME
Note: Did not scrape third-party trademark logos from the open web (license risk). Higher-res client marks require client-approved exports.
Validated: yes (names from PNG content)

## 2026-09-03 - Homepage visual polish creative stills

Date: 2026-09-03
Source: Local migration backup `backup/assets/images/uploads/2025/04/`
Method: Copy + rename for creative showcase gallery expansion
Type: image
License: Same as Wave A — owned-site marketing graphics; see `assets/licenses/homepage-wave-a-assets.md`
Used on page: Homepage `creative-showcase`
Validated: yes (visual QA via Read tool — listing/infographic style stills, not ChatGPT stock)

| Production path | Backup source |
|-----------------|---------------|
| `public/images/creative/search-ranking-optimization.png` | `uploads/2025/04/3-1024x1024.png` |
| `public/images/creative/listing-image-before-after.png` | `uploads/2025/04/4-1024x1024.png` |

Notes: Gallery now 3 stills (Les Plaisirs + ranking infographic + before/after listing imagery). Vimeo still deferred.

## 2026-09-08 - Homepage services card imagery

Date: 2026-09-08
Source: Local migration backup `backup/assets/images/uploads/2025/04/` (+ creative before/after already ingested)
Method: Copy + rename for Services section media cards
Type: image
License: Owned-site marketing graphics from ecomgliders.com backup; see `assets/licenses/homepage-wave-a-assets.md`
Used on page: Homepage `services`
Validated: yes (1024×1024 PNG; Amazon Seller Central / SERP / listing mockups)

| Production path | Backup / source |
|-----------------|-----------------|
| `public/images/services/account-management.png` | `uploads/2025/04/1-1024x1024.png` |
| `public/images/services/ppc-management.png` | `uploads/2025/04/6-1024x1024.png` |
| `public/images/services/listing-seo.png` | `uploads/2025/04/3-1024x1024.png` |
| `public/images/services/content-writing.png` | `uploads/2025/04/8-1024x1024.png` |
| `public/images/services/visual-creativity.png` | `public/images/creative/listing-image-before-after.png` (from `4-1024x1024.png`) |
| `public/images/services/catalog-management.png` | `uploads/2025/04/5-1024x1024.png` |

## 2026-09-08 - Services AI editorial imagery (replace mockups)

Date: 2026-09-08
Source: Cursor GenerateImage (project AI image tool), user-requested for Services cards
Method: Generate 4:3 editorial stills → copy to `public/images/services/` + archive in `assets/source/services-ai-2026-09-08/`
Type: image
License: Generated for eCom Gliders project use; source archive under `assets/source/services-ai-2026-09-08/`
Used on page: Homepage `services`
Validated: yes (1536×1024 PNG; layout switched to horizontal media+copy)

| Production path | Concept |
|-----------------|---------|
| `account-management.png` | Desk + laptop analytics |
| `ppc-management.png` | Tablet ad performance charts |
| `listing-seo.png` | Product + magnifier (SEO focus) |
| `content-writing.png` | Notebook + pen writing desk |
| `visual-creativity.png` | Studio product photography |
| `catalog-management.png` | Inventory shelves + tablet |

Notes: Replaces prior backup Amazon UI mockups on Services cards. Prefer real client creative later when available.

## 2026-09-08 - Creative showcase AI-refined gallery

Date: 2026-09-08
Source: Cursor GenerateImage with references from existing `public/images/creative/` stills
Method: Generate 5× 4:3 refined portfolio frames → `public/images/creative/*-v2.png`; archive `assets/source/creative-ai-2026-09-08/`
Type: image
License: Generated for eCom Gliders project use; references are owned-site backup creative
Used on page: Homepage `creative-showcase`
Validated: yes (1536×1024 PNG)

| Production path | Intent | Reference |
|-----------------|--------|-----------|
| `creative-hero-product-v2.png` | Listing main-image hero | `les-plaisirs-cutting-boards.png` |
| `creative-infographic-v2.png` | Secondary/infographic | `search-ranking-optimization.png` |
| `creative-before-after-v2.png` | Photo refinement | `listing-image-before-after.png` |
| `creative-aplus-v2.png` | A+ / brand story | Les Plaisirs + ranking |
| `creative-lifestyle-v2.png` | Lifestyle supporting | Les Plaisirs |

Notes: Old stills retained on disk for provenance; homepage JSON points at v2 set only. Vimeo still deferred.

## 2026-09-08 - Services AI imagery v2 + contain fill

Date: 2026-09-08
Source: Cursor GenerateImage v2 (user-requested recreate)
Method: New filenames `*-v2.png` for cache bust; archive `assets/source/services-ai-2026-09-08-v2/`
Type: image
License: Generated for eCom Gliders project use
Used on page: Homepage `services`
Validated: yes
Notes: Card media uses `object-contain` with blurred image backdrop + navy multiply wash for letterbox fill.

## 2026-09-08 - Seller segments AI stage imagery

Date: 2026-09-08
Source: Cursor GenerateImage (user-requested replace Lucide icons)
Method: 3× 1:1 editorial stills → resize 768 JPEG q82 → `public/images/segments/*.jpg`; archive `assets/source/segments-ai-2026-09-08/`
Type: image
License: Generated for eCom Gliders project use
Used on page: Homepage `seller-segments`
Validated: yes (768×768 JPEG, ~63–86 KB)

| Production path | Segment | Intent |
|-----------------|---------|--------|
| `new-sellers.jpg` | New sellers | Desk + packing boxes + listing setup |
| `scaling-brands.jpg` | Scaling brands | Dual monitors + growth charts |
| `multi-asin.jpg` | Multi-ASIN catalogs | Warehouse shelves + catalog tablet |

Notes: Lucide icons retained in JSON as fallback when `image` is absent.

## 2026-09-08 - Case studies AI atmosphere scenes

Date: 2026-09-08
Source: Cursor GenerateImage (user-requested blur/zoom atmosphere proof cards)
Method: 3× 4:3 category scenes → 1200×900 JPEG q82 → `public/images/cases/*-atmosphere.jpg`; archive `assets/source/cases-ai-2026-09-08/`
Type: image
License: Generated for eCom Gliders project use (no brand logos in AI frames)
Used on page: Homepage `case-studies`
Validated: yes (~83–161 KB)

| Production path | Case | Intent |
|-----------------|------|--------|
| `gosports-atmosphere.jpg` | GoSports | Outdoor backyard sports lifestyle |
| `kitchen-atmosphere.jpg` | Kitchen brand | Home kitchen cookware lifestyle |
| `supplement-atmosphere.jpg` | Supplement launch | Clean wellness lifestyle |

Notes: Existing brand marks stay as sharp badges; AI fills media with blur depth + hover zoom.

## 2026-09-08 - Trustpilot wordmark visibility fix

Date: 2026-09-08
Source: Existing `public/images/reviews/trustpilot.png` (from backup Trustpilot-1.png)
Method: Recolor white wordmark pixels to near-black; keep Trustpilot green star. TrustLogo tiles use blur fill + rounded contain plate sitewide in trust bar.
Type: image
License: Existing project asset (display fix only)
Used on page: Homepage `trust-bar`
Validated: yes (green star + dark wordmark visible on white)

Notes: Original asset was white-on-transparent — invisible on light UI.

## 2026-09-08 - Brand values AI principle stills

Date: 2026-09-08
Source: Cursor GenerateImage (user: Lucide icons felt weak/boring)
Method: 4× 1:1 editorial stills → 768 JPEG → `public/images/values/*.jpg`; archive `assets/source/values-ai-2026-09-08/`
Type: image
License: Generated for eCom Gliders project use
Used on page: Homepage `brand-values`
Validated: yes (~64–66 KB)

| File | Principle |
|------|-----------|
| `strategy.jpg` | Strategy beyond isolated tactics |
| `collaboration.jpg` | Collaboration with your team |
| `systems.jpg` | Systems that sustain growth |
| `execution.jpg` | Clear, accountable execution |

Notes: Keep B8 locked titles/descriptions; Lucide remains JSON fallback when image missing.





## 2026-10-04 - Marketplace flag PNGs

Date: 2026-10-04
Source URL: https://flagcdn.com/w80/{us,gb,ca,de,fr,it,es,nl}.png
Asset name: public/images/flags/*.png
Type: image
License: FlagCDN free CDN for national flags (flags are national symbols; used for marketplace identification)
Used on page: homepage `#markets`
Validated: yes (PNG 80px-wide variants)

## 2026-10-04 - Remaining Amazon marketplace flags

Date: 2026-10-04
Source URL: https://flagcdn.com/w80/{mx,br,ie,be,se,za,pl,eg,tr,sa,ae,in,sg,au,jp}.png
Asset name: public/images/flags/*.png
Type: image
License: FlagCDN free CDN for national flags
Used on page: homepage `#markets` (full Amazon Seller Central list)
Validated: yes
Source of marketplace list: https://developer-docs.amazon.com/sp-api/docs/seller-central-urls

## 2026-10-04 - growth.ecomgliders.com sales proofs

Date: 2026-10-04
Source URL: https://growth.ecomgliders.com/_astro/sales-*.avif (+ wa-1…3)
Asset name: public/images/growth/*.avif (also assets/source/growth, assets/approved/growth)
Type: image
License: eCom Gliders owned marketing assets (first-party growth funnel)
Used on page: service visual modules (starting A1 full-service)
Validated: yes (files downloaded; alt captions inventoried in GROWTH-PROOF-INVENTORY.md)

## 2026-10-04 - C4 amazon-product-sourcing (no growth asset)

Date: 2026-10-04
Source URL: n/a — no product-sourcing crop in GROWTH-PROOF-INVENTORY
Asset name: none downloaded
Type: provenance note
Used on page: `/amazon-product-sourcing/` visual modules (processSteps, checklistMatrix, comparisonTable)
Validated: yes — structural modules only; existing verified case claims (FocusForm / GoSports) remain in results section

## 2026-10-04 - D1 shopify-website-development (no growth asset)

Date: 2026-10-04
Source URL: n/a — no Shopify storefront crop in GROWTH-PROOF-INVENTORY
Asset name: none downloaded
Type: provenance note
Used on page: `/shopify-website-development/` visual modules (processSteps, checklistMatrix, comparisonTable)
Validated: yes — structural modules only; existing verified brand-channel case claims (GoSports / kitchen) remain in results section

## 2026-10-04 - D2 tiktok-shop-ads (no growth asset; reuse local creative)

Date: 2026-10-04
Source URL: n/a — no TikTok Shop ads crop in GROWTH-PROOF-INVENTORY
Asset name: reused `public/images/creative/creative-*-v2.png` (existing showcase assets; provenance under assets/source/creative-ai-2026-09-08)
Type: provenance note
Used on page: `/tiktok-shop-ads/` proofGallery as visual-demo / hook contexts (not TikTok ad screenshots)
Validated: yes — Playwright image HTTP 200 + naturalWidth > 0 after gallery scroll; no GMV/ROAS invent

## 2026-10-05 - Services hub card images (AI generated, full set)

Date: 2026-10-05
Source: Cursor GenerateImage (project AI asset generation)
Asset names (15):
- amazon-account-management-service.jpg
- amazon-ppc-management-service.jpg
- amazon-dsp-management-service.jpg
- amazon-reporting-analytics-service.jpg
- amazon-listing-optimization-service.jpg
- amazon-content-writing-service.jpg
- amazon-visual-creativity-service.jpg
- amazon-video-creative-service.jpg
- amazon-catalog-management-service.jpg
- amazon-trademark-brand-registry-service.jpg
- amazon-company-registration-service.jpg
- amazon-product-sourcing-service.jpg
- shopify-website-development-service.jpg
- tiktok-shop-ads-service.jpg
- email-retention-marketing-service.jpg
Type: image
License: Generated for eCom Gliders project use
Used on page: `/services/` hub category cards only (no legacy `*-v2.png` reuse)
Production path: `public/images/services/`
Source copies: `assets/source/services-hub-ai-2026-10-05/`, `assets/approved/services-hub-ai-2026-10-05/`
Validated: yes (SEO filenames + descriptive alt in services-index.json)

## 2026-10-05 - E-wave service infographics (AI)

Date: 2026-10-05
Source URL: Cursor GenerateImage (AI-generated for project)
Assets:
- amazon-catalog-management/catalog-health-system.jpg
- amazon-trademark-brand-registry/brand-registry-flow.jpg
- amazon-company-registration/company-registration-flow.jpg
- amazon-product-sourcing/product-sourcing-flow.jpg
- email-retention-marketing/email-retention-lifecycle.jpg
- shopify-website-development/shopify-amazon-stack.jpg
- tiktok-shop-ads/tiktok-shop-flow.jpg
- amazon-listing-optimization/listing-anatomy.jpg
- amazon-content-writing/content-writing-structure.jpg
- amazon-video-creative/video-creative-storyboard.jpg
Type: image (conceptual system diagrams)
License: Generated for eCom Gliders project use
Used on page: respective `/{slug}/` proofGallery modules
Production path: `public/images/services/{slug}/`
Source/approved: `assets/source/e-wave-infographics/`, `assets/approved/e-wave-infographics/`
Validated: yes — captions labeled illustrative/conceptual; no invented metrics

## 2026-10-05 - Services hub hero browser visual

Date: 2026-10-05
Source URL: Cursor GenerateImage (AI-generated for project)
Asset name: services-hub-hero-browser.jpg
Type: image
License: Generated for eCom Gliders project use
Used on page: `/services/` hero macOS browser mockup
Production path: `public/images/services/services-hub-hero-browser.jpg`
Source copies: `assets/source/services-hub-hero-browser.jpg`, `assets/approved/services-hub-hero-browser.jpg`
Dimensions: 1280x720
Validated: yes

## 2026-10-04 - D3 email-retention-marketing (no growth asset)

Date: 2026-10-04
Source URL: n/a — no email/Klaviyo crop in GROWTH-PROOF-INVENTORY (wa-* is WhatsApp PPC chat, not retention)
Asset name: none downloaded
Type: provenance note
Used on page: `/email-retention-marketing/` visual modules (processSteps, checklistMatrix, comparisonTable)
Validated: yes — structural modules only; existing verified brand-retention case claims (GoSports / kitchen) remain in results section

## 2026-10-15 - Promo top-bar banner assets

Date: 2026-10-15
Source URL: Live site GIF https://ecomgliders.com/wp-content/uploads/2025/09/AMAZON_BIG_PRIME_IS_COMING-amazon-fba-business-amazon-business-amazon-seller-central.gif; Cursor workspace reference screenshot of Free Audit banner; project-generated AUDIT stamp SVG
Asset names: banner-team.png, banner-packages-clean.png, audit-stamp.png, free-audit-banner.png, live-top-banner.gif
Type: image
License: eCom Gliders brand assets (owned) + generated stamp for project use
Used on page: Site announcement / promo top bar (`site.json` → `announcementBar.promo`)
Production path: `public/images/promo/`
Source: `assets/source/promo/`, `assets/approved/promo/`
Validated: yes — modular images for event-configurable top bar

## 2026-10-15 - Promo team + AI packages refresh

Date: 2026-10-15
Source URL: https://ecomgliders.com/wp-content/uploads/2025/09/Amazon-FBA-Amazon-Private-Label-Amazon-seller-Amazon-PPC-1024x853.png
Asset name: promo-team.png
Type: image
License: eCom Gliders brand asset (owned)
Used on page: Promo top bar left visual
Production path: `public/images/promo/promo-team.png`
Validated: yes

Date: 2026-10-15
Source URL: Cursor GenerateImage (AI-generated for project)
Asset name: promo-amazon-packages.png
Type: image
License: Generated for eCom Gliders project use
Used on page: Promo top bar right rail (cutout on ink)
Production path: `public/images/promo/promo-amazon-packages.png` (active); `.jpg` / `-dark.jpg` retained as source
Validated: yes — studio gray keyed; packages cropped to right stack; illustrative only

Notes: Team PNG flood-fill cutout removes yellow/black stripe plate for ink stage. Packages cutout for mirrored rails. AI regen of team rejected (likeness drift + no alpha).

## 2026-10-15 - AI video review cover images

Date: 2026-10-15
Source: Cursor GenerateImage from Vumbnail reference frames (`assets/source/video-reviews/frame-ref-*.jpg`)
Asset names: `cover-{vimeoId}.jpg` for IDs `1168263614`, `1079374516`, `1079374584`, `1079374772`, `1079372332`, `1076971749`
Type: image (AI-enhanced portrait covers; agency reel is branded composite)
License: Generated for eCom Gliders from owned Vimeo client footage frames
Used on page: Homepage `#video-reviews` reel strip
Production path: `public/images/video-reviews/`
Approved copy: `assets/approved/video-reviews/`
Validated: files present; wired in homepage.json `coverImage`
Notes: Direct Vimeo MP4 download blocked (login/403). Hover preview uses muted Vimeo background player iframe, not local clips.

## 2026-10-15 - Client video review posters (remote; not downloaded)

Date: 2026-10-15
Source URL: `https://vumbnail.com/{vimeoId}.jpg` (same poster host used on live PPC pages)
Vimeo IDs (owned, from live ecomgliders.com): `1168263614`, `1079374516`, `1079374584`, `1079374772`, `1079372332`, `1076971749`
Asset name: none local — Next Image remotePatterns allow `vumbnail.com`, `i.vimeocdn.com`
Type: remote poster images for homepage `#video-reviews`
License: eCom Gliders owned Vimeo content; thumbnail via Vumbnail
Used on page: Homepage `videoReviews` reel strip
Validated: yes — Playwright strip + lightbox iframe on localhost:3002
Companion (not blocking): Trustpilot crops `tp-1…4` and WhatsApp `wa-1…3` on growth.ecomgliders.com remain inventoried in `GROWTH-PROOF-INVENTORY.md` for a future written-reviews strip

## 2026-10-15 - Campaign GIF banner (live site)

Date: 2026-10-15
Source URL: https://ecomgliders.com/wp-content/uploads/2025/09/AMAZON_BIG_PRIME_IS_COMING-amazon-fba-business-amazon-business-amazon-seller-central.gif
Asset name: amazon-big-prime-is-coming.gif
Type: image (GIF banner, 1935x159)
License: eCom Gliders brand asset (owned)
Used on page: Homepage `promoCampaignSlider` image slide
Production path: `public/images/promo/amazon-big-prime-is-coming.gif`
Source copy: `assets/source/promo/amazon-big-prime-is-coming.gif`
Validated: yes — wide campaign GIF from live homepage; Next Image uses unoptimized for GIF animation


## 2026-10-15 - Case study featured images (hub/detail)

Date: 2026-10-15
Source URLs:
- https://ecomgliders.com/wp-content/uploads/2025/04/1-4.png → case-study-1.png
- https://ecomgliders.com/wp-content/uploads/2025/04/2-3.png → case-study-2.png
- https://ecomgliders.com/wp-content/uploads/2025/04/3-3.png → case-study-3.png
- https://ecomgliders.com/wp-content/uploads/2025/04/4-3.png → case-study-4.png
- https://ecomgliders.com/wp-content/uploads/2025/04/5-3.png → case-study-5.png
- https://ecomgliders.com/wp-content/uploads/2025/04/6-3.png → case-study-6.png
- https://ecomgliders.com/wp-content/uploads/2025/04/7-3.png → case-study-7.png
- https://ecomgliders.com/wp-content/uploads/2025/04/8-4.png → case-study-8.png
Asset names: case-study-1.png … case-study-8.png
Type: image (PNG brand/case marks from live WP)
License: eCom Gliders site assets (owned / previously published)
Used on page: `/case-studies/`, `/case-study-1/`–`/case-study-8/`, homepage case strip (1–2)
Production path: `public/images/cases/case-study-{1..8}.png`
Source copy: `assets/source/cases/case-study-{1..8}.png`
Validated: yes — curl download from live WP CDN; GoSports already local as `gosports.png`

## 2026-10-17 - Service second-wave niche infographics (AI)

Date: 2026-10-17
Source: Cursor GenerateImage (AI teaching diagrams), brand style matched to existing `*-flow.jpg` / `catalog-health-system.jpg`
License: Generated for eCom Gliders project use
Type: image (JPEG, ~16:9)
Source archive: `assets/source/services-infographics-2026-10-17/`
Production paths:
- `public/images/services/amazon-catalog-management/catalog-suppression-triage.jpg`
- `public/images/services/amazon-trademark-brand-registry/brand-tools-matrix.jpg`
- `public/images/services/amazon-company-registration/company-doc-gates.jpg`
- `public/images/services/amazon-product-sourcing/sourcing-landed-cost.jpg`
- `public/images/services/shopify-website-development/shopify-sync-mechanics.jpg`
- `public/images/services/email-retention-marketing/email-day-journey.jpg`
- `public/images/services/amazon-ppc-management-agency/ppc-campaign-architecture.jpg`
- `public/images/services/amazon-reporting-analytics/reporting-decision-stack.jpg`
- `public/images/services/amazon-dsp-management/dsp-audience-layers.jpg`
- `public/images/services/full-service-amazon-agency/full-service-pod-map.jpg`
Used on page: corresponding service detail `infographicSpotlight` modules
Validated: yes — files on disk; captions mark conceptual / not Seller Central UI
Notes: No invented % claims; legal/compliance pages include “not legal advice” where relevant

## 2026-10-17 - Creative reuse (already local)

Date: 2026-10-17
Asset: `public/images/creative/search-ranking-optimization.png`
Action: Wired into listing + content `proofGallery` (replaced weaker duplicate stills)
Provenance: prior creative bank (already in repo)
Validated: yes — file present before wire-up

## 2026-10-21 � Full-service audience AI images

Date: 2026-10-21
Source: Cursor GenerateImage (AI-generated, original)
Asset names:
- audience-fba-brands-ready-to-scale.jpg
- audience-ppc-only-agency-limit.jpg
- audience-multi-marketplace-sellers.jpg
- audience-founders-accountable-specialists.jpg
Type: image
License: generated for eCom Gliders project use
Used on page: /full-service-amazon-agency/ (Who full-service management is for)
Paths: public/images/services/audience/ ; assets/source/audience/
Validated: yes (copied; wired via audience.image in JSON)


## 2026-10-23 - About page team portraits

Date: 2026-10-23
Source URL: https://ecomgliders.com/about-us/ (WP uploads / Elementor thumbs for Muneeb)
Asset names: rizwan.jpg, mushahid.jpg, ubaid.jpg, umair.jpeg, muneeb.png, madrigal.png
Type: image
License: eCom Gliders first-party brand assets (see assets/licenses/about-team-portraits.md)
Used on page: /about-us/
Paths: public/images/about/team/ ; assets/source/about-team/ ; assets/approved/about-team/
Validated: yes � files on disk and wired in about-page.json
Notes: Muneeb full-size upload 404; Elementor thumb used as production source.

## 2026-10-23 - About hero image
Date: 2026-10-23
Source: https://ecomgliders.com/wp-content/uploads/2025/04/about-us-page-main-image.png
Asset: about/hero.png
License: eCom Gliders first-party
Used on: /about-us/ hero
Validated: yes

## 2026-10-23 - About team Aalyshan
Date: 2026-10-23
Source URL: https://ecomgliders.com/wp-content/uploads/2025/04/og-website-image-modified.jpg
Asset name: about/team/aalyshan.jpg
Type: image
License: eCom Gliders first-party
Used on page: /about-us/ team
Validated: yes (166369 bytes)
Note: Replaces Madrigal portrait on About team grid

## 2026-10-27 - Email retention cadence stage stills
Date: 2026-10-27
Source: Cursor GenerateImage
Assets: eml-stage-welcome.jpg, eml-stage-winback.jpg
Type: image (AI-generated)
License: assets/licenses/ai-generated-email-retention.md
Used on page: /email-retention-marketing/ cadence stage rail
Paths: public/images/services/email-retention-marketing/
Validated: yes (files on disk, wired in eml-cadence-stages.tsx)
Notes: Text-free editorial stills; no inbox UI chrome or metrics

## 2026-10-28 - Case study category atmospheres
Date: 2026-10-28
Source: Cursor GenerateImage
Assets: volttech-atmosphere.jpg, nikketta-atmosphere.jpg, timetimer-atmosphere.jpg, focusform-atmosphere.jpg, focusdesign-atmosphere.jpg
Type: image (AI-generated)
License: original work for eCom Gliders case study heroes
Used on pages: /case-study-3/, /case-study-4/, /case-study-5/, /case-study-6/, /case-study-8/
Production path: public/images/cases/
Approved copy: assets/approved/cases-atmospheres-2026-10-28/
Validated: yes (1200x900 JPEG q82; wired in case-studies.json)
Notes: Replaces mismatched kitchen/cutting-board and generic package atmospheres
