# Navigation and Footer Specification

**Research date:** 2026-09-02  
**Status:** Approved (implemented in `content/config/navigation.json`)  
**Updated:** 2026-09-02 — compact panels; Case Studies + Blog megas; underline nav triggers  
**Related:** [[Design-Inspiration]], [[Page-Templates]], [[Competitor-Analysis]]

---

## Purpose

Complete specification for eCom Gliders header, mega menu, mobile navigation, and footer on the new custom site.

---

## Design principles

1. Single navigation system (no duplicates)
2. Header CTA always visible
3. Dedicated page URLs for all service links (no anchor hashes)
4. Logo links to homepage (no "Home" nav item)
5. Mobile-first responsive behavior
6. WCAG AA accessibility minimum
7. Amazon remains the brand hero; multi-channel lives in a dedicated mega column

---

## Header structure

### Desktop layout

```
[Announcement bar - Verified Partner | $112M+ | 95% retention]
[Logo]  Services v  |  Case Studies  |  About  |  Blog  |  Contact  |  [Free Audit button]
```

### Top announcement bar (enabled)

```
Rated Amazon Ads Verified Partner | $112M+ revenue managed | 95% client retention
```

- Full-width strip above main header
- Link to case studies
- Config: `site.json` → `announcementBar.enabled: true`

### Main header

| Element | Specification |
|---------|---------------|
| Logo | Left-aligned, links to `/` |
| Nav items | Services (mega), Case Studies, About, Blog, Contact |
| CTA button | Free Audit → `/free-audit-2/` |
| Sticky | Yes |
| Only one mega | Services |

---

## Mega menu specification

### Trigger

- Nav item: Services
- Opens on hover (desktop) or accordion (mobile)
- Full-width panel below header (`max-w-7xl` inner)

### Layout (4 service columns + CTA rail)

```
Advertising and Growth | Catalog and Content | Brand and Operations | Channels and DTC | CTA
```

Levels:

1. Header: Services
2. Category column titles
3. Individual services with icon, title, outcome description

### Column 1 — Advertising and Growth

| Service | URL | Notes |
|---------|-----|-------|
| Amazon Account Management | `/full-service-amazon-agency/` | Featured / Flagship |
| Amazon PPC Management | `/amazon-ppc-management-agency/` | Live page |
| Amazon DSP | `/amazon-dsp-management/` | Proposed page |
| Reporting and Analytics | `/amazon-reporting-analytics/` | Proposed page |

### Column 2 — Catalog and Content

| Service | URL |
|---------|-----|
| Listing Optimization and SEO | `/amazon-listing-optimization/` |
| Content Writing | `/amazon-content-writing/` |
| Visual Creativity | `/amazon-visual-creativity/` |
| Video Creative | `/amazon-video-creative/` |
| Catalog Management | `/amazon-catalog-management/` |

### Column 3 — Brand and Operations

| Service | URL |
|---------|-----|
| Trademark and Brand Registry | `/amazon-trademark-brand-registry/` |
| Company Registration | `/amazon-company-registration/` |
| Product Sourcing | `/amazon-product-sourcing/` |

### Column 4 — Channels and DTC

| Service | URL |
|---------|-----|
| Shopify and Website Development | `/shopify-website-development/` |
| TikTok Shop Ads | `/tiktok-shop-ads/` |
| Email and Retention Marketing | `/email-retention-marketing/` |

### CTA rail

- Eyebrow: Amazon Ads Verified Partner
- Metric: $112M+ revenue managed
- Title: Free Amazon account audit
- Button: Get Free Audit (accent on primary panel)
- Phone: +1 (360) 660-1210

### Panel footer

- View all services → `/full-service-amazon-agency/`

### Backlog (not in mega v1)

Walmart Marketplace, Meta Ads, Google Shopping — add only after delivery confirmation.

---

## Mobile navigation

- Sheet drawer from right (`max-width` 22rem)
- Header: brand logo + close control
- Services / Case Studies / Blog accordions; About and Contact as peer links
- Service links compact (label only; Featured badge where set)
- Sticky drawer footer: accent Free Audit CTA, phone, email (lucide icons)
- No nested mega CTA panel in mobile (avoids duplicate audit block)

---

## Footer

Four columns: Brand | Services (flagship Amazon + Channels highlights) | Company | Contact  
Legal: Privacy Policy, Terms and Conditions

---

## Config source of truth

- [`content/config/navigation.json`](../../content/config/navigation.json)
- Schema: `src/domain/content/schemas/navigation.schema.ts`
- UI: `src/components/layout/mega-menu-panel.tsx`, `nav-link-item.tsx`, `mobile-nav.tsx`
