# Service page lead form fields

Date: 2026-10-04  
Status: Proposed (implemented locally)  
Confidence: medium (industry form CRO + Amazon agency qualification practice)

## Research summary

Lead forms convert best with short field counts (about 3–5 contact fields, plus 1–2 qualifiers for B2B agency fit). Service pages should ask questions that match the buyer’s intent—not a generic contact form on every page.

Sources reviewed (2026-10-04):
- Search Engine Land — PPC form field length and qualifying questions (Observed)
- Paperform Amazon advertising quote template — ad spend / ACOS / service scope (Observed)
- OrbitForms / CorePPC CRO notes — dropdowns over open text; one disqualifier/qualifier (Observed)

## Shared contact block (all services)

- Name (required)
- Email (required)
- Phone (required)
- Brand / company (optional)

## Per-service qualification (implemented)

| Slug | Heading focus | Qualifiers |
|------|---------------|------------|
| full-service-amazon-agency | Full-account audit | Store URL, monthly revenue, primary focus |
| amazon-ppc-management-agency | Free PPC audit | Store URL, monthly ad spend, ACOS range |
| amazon-listing-optimization | Listing review | Store URL, ASIN count, priority need |
| amazon-content-writing | Copy support | Store URL, content type, product count |
| amazon-visual-creativity | Creative support | Store URL, creative need, product count |
| amazon-catalog-management | Catalog health | Store URL, catalog size, issue type |
| amazon-dsp-management | DSP review | Store URL, DSP budget, Brand Registry status |
| amazon-reporting-analytics | Reporting review | Store URL, frequency, metrics focus |
| amazon-video-creative | Video creative | Store URL, video use-case, product count |
| amazon-trademark-brand-registry | Brand Registry | Trademark status, goal, store URL |
| amazon-company-registration | Company registration | Seller location, entity goal, Amazon intent |
| amazon-product-sourcing | Sourcing support | Category, launch market, sourcing stage |
| shopify-website-development | Shopify consult | Shopify status, goal, current website |
| tiktok-shop-ads | TikTok ads review | Store URL, TikTok Shop status, ad spend |
| email-retention-marketing | Email retention | Platform, list status, retention goal |

## Validation notes

- Core contact fields validated by `auditFormSchema`
- Extra qualifiers forwarded via allowlisted FormData keys in `submitAuditForm`
- No invented ROI or marketplace performance claims in form copy
