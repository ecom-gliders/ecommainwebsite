---
name: web-audit
description: Functional responsive and technical audit of ecomgliders.com and competitor sites using MCP Playwright. Captures evidence, tests navigation and forms, records findings. Use before redesign or migration implementation.
---

# Web Audit Skill

## Scope

Audit current ecomgliders.com before custom code migration.

## Audit checklist

1. Branding (logo, colors, typography)
2. Navigation structure (desktop and mobile)
3. Information architecture
4. All service pages
5. Blog section and all post URLs
6. Case studies and testimonials
7. Contact forms and CTAs
8. Footer links and legal pages
9. Performance baseline
10. Accessibility basics
11. Technical SEO (meta, canonical, schema, sitemap)
12. Asset inventory (images, icons, fonts)

## Playwright workflow

1. Navigate to https://ecomgliders.com/
2. If blocked, try /sitemap.xml and /robots.txt
3. Crawl main navigation links
4. For blog section, extract all post URLs and slugs
5. Screenshot each major page template
6. Record meta title, description, H1 for each page
7. Test contact form fields (do not submit with real data)
8. Check mobile viewport at 375px width

## Output

Save to `obsidian/09-Research/Current-Site-Audit.md` with sections:

- KEEP
- REMOVE
- IMPROVE
- REPLACE
- INTRODUCE

Also update `docs/seo/URL-INVENTORY.md` with every discovered URL.

## Do not implement during audit

Audit only. No code changes.
