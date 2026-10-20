# Redirect Map

Only for URLs that cannot preserve identical paths on the new site.
Prefer identical paths over redirects.

## Status

Service-path notes updated 2026-10-05: `/services/` KEEP as Next.js hub. Legacy `#service_*` / `services-2` mappings Proposed only — no production redirects implemented yet unless approved.

## Template

```
From: /old-path/
To: /new-path/
Status: 301
Reason: Why path could not be preserved
Approved: yes | no
Verified in staging: yes | no
```

## Rules

- 301 for permanent moves only
- Document every redirect before implementation
- Verify in staging before production
- Monitor Search Console after cutover

## Service pages (Master Program)

Prefer identical root paths. Do not invent redirects for paths that already match.

| From | To | Status | Reason | Approved | Verified in staging |
|------|-----|--------|--------|----------|---------------------|
| `/#services` (homepage anchor) | `/` + `#services` or first service CTA | Soft (same page) | Anchor, not a separate URL | n/a | n/a |
| `/services/` | `/services/` | KEEP | Live WP services index preserved as Next.js hub (Verified Playwright 2026-10-05) | yes | no |
| `/services/{slug}/` | `/{slug}/` | Proposed | Only if Search Console / crawl shows `/services/` prefix; new app uses root slugs | no | no |
| `/services/#service_2` | `/amazon-content-writing/` | Proposed | Legacy WP in-page content writing anchor | no | no |
| `/services/#service_4` | `/amazon-visual-creativity/` | Proposed | Legacy WP visual creativity anchor | no | no |
| `/services/#service_5` | `/amazon-listing-optimization/` | Proposed | Legacy WP search ranking / listing SEO anchor | no | no |
| `/services/#service_6` | `/amazon-catalog-management/` | Proposed | Legacy WP catalog management anchor | no | no |
| `/services/#service_7` | `/amazon-product-sourcing/` | Proposed | Legacy WP product sourcing anchor | no | no |
| `/services/#service_8` | `/amazon-reporting-analytics/` | Proposed | Legacy WP reporting analytics anchor | no | no |
| `/services-2/` | `/services/` | Proposed | Secondary WP services page; consolidate to hub | no | no |
| `/services-2/#services_1` | `/amazon-company-registration/` | Proposed | Legacy company registration anchor | no | no |
| `/services-2/#services_2` | `/email-retention-marketing/` | Proposed | Legacy product email marketing anchor | no | no |
| `/services-2/#services_3` | `/amazon-trademark-brand-registry/` | Proposed | Legacy USPTO trademark anchor | no | no |
| `/services-2/#services_4` | `/amazon-trademark-brand-registry/` | Proposed | Legacy Brand Registry anchor (same destination) | no | no |
| `/services-2/#services_6` | `/shopify-website-development/` | Proposed | Legacy website development anchor | no | no |

**New hub category anchors (soft continuity, no redirect required):**

- `/services/#advertising-growth`
- `/services/#catalog-content`
- `/services/#brand-operations`
- `/services/#channels-dtc`
- Per-service anchors on hub match root slug ids (e.g. `/services/#amazon-ppc-management-agency`)

**Canonical service destinations (no redirect needed when inbound already matches):**

- `/full-service-amazon-agency/`
- `/amazon-ppc-management-agency/`
- `/amazon-listing-optimization/`
- `/amazon-content-writing/`
- `/amazon-visual-creativity/`
- `/amazon-catalog-management/`
- `/amazon-dsp-management/`
- `/amazon-reporting-analytics/`
- `/amazon-video-creative/`
- `/amazon-trademark-brand-registry/`
- `/amazon-company-registration/`
- `/amazon-product-sourcing/`
- `/shopify-website-development/`
- `/tiktok-shop-ads/`
- `/email-retention-marketing/`

**Requires confirmation:** Export Search Console + crawl of ecomgliders.com for any `/services/*` or alternate service slugs before implementing 301s.
