# Current Site Audit

Status: Homepage migration audit complete (2026-09-03). Broader site pages still open.

## Purpose

Complete audit of https://ecomgliders.com/ before and during custom-code migration.

## Audit checklist

- [x] Homepage (Next rebuild Waves A–F; live old site used as evidence during planning)
- [ ] All service pages
- [ ] Blog index and all blog posts (posts live via `[slug]`; index shipped Wave F; thumbs/pagination open)
- [ ] Case studies (index live; deepen as needed)
- [ ] Testimonials (homepage ships 5 named; sixth Requires confirmation)
- [ ] About page
- [ ] Contact page
- [ ] Footer pages (privacy, terms if present) — `/privacy-policy-2/` still 404 on Next
- [ ] Navigation (desktop and mobile)
- [ ] Forms and CTAs
- [ ] Third-party integrations
- [ ] Performance baseline
- [ ] Technical SEO baseline
- [ ] Asset inventory

## Homepage KEEP / REMOVE / IMPROVE / REPLACE / INTRODUCE

Evidence: plan `homepage_landing_audit` B1–B14 + Waves A–F implementation on localhost (2026-09-03).

### KEEP

- Full-service Amazon account management positioning (H1/meta)
- Verified claims only: since 2018, 20+ specialists, 95% retention, $112M+ revenue managed
- Dual conversion paths: hero lead form + `/free-audit-2/`
- Six core service routes with dedicated URLs (not hash-only)
- Case study paths (`/case-study-1/`, `/case-study-2/`, `/case-study-9/`)
- Agency vs DIY comparison table + FAQPage JSON-LD
- Amazon Ads Verified Partner badge (hero only)
- Ask-AI announcement bar (not merged into trust)
- Trailing-slash URL style for preserved paths

### REMOVE (from rebuild)

- Elementor / theme stack
- Newsletter / subscribe module (this phase)
- WhatsApp float / exit-intent modal
- Duplicate Amazon partner badge noise in trust bar
- Unprofessional slogans (“We’re Real…”, “gives a damn”, ALL-CAPS CTAs, “cut the fluff”)
- Dark cinematic hero / awards-wall spam
- Invented sixth testimonial
- ChatGPT stock blog thumbs on homepage preview

### IMPROVE

- Trust density: partners + client marquee + review/press badges
- Service and process copy depth
- FAQ marketplace / PPC / account-health / A+ answers
- Case cards with images (logo-mark treatment where product art weak)
- Hero fold under announcement + sticky header
- Accent CTA contrast (navy text on accent fill)
- Consent privacy link always underlined

### REPLACE

- Thin trust bar → three-row trust (partners, clients, reviews/press)
- Hero BrowserMockup → compact lead form (mockup moved to process)
- Old PPC-only H1 → account-management H1

### INTRODUCE

- Creative showcase (QA stills; Vimeo deferred)
- Brand values (professional rewrite of old pillars)
- Client logo marquee with reduced-motion fallback
- BrowserMockup under process
- Seller-segment CTAs to `#hero-lead-form`
- Minimal `/blog/` index (recent 24 posts) so homepage CTA resolves
- DIY article footer link when route live

## Known remaining (post Wave F)

- `/privacy-policy-2/` and `/terms-conditions-2/` not yet migrated (backup HTML exists)
- Blog index pagination / full 328 listing UX
- Sixth named testimonial (Requires confirmation)
- Additional creative stills beyond Les Plaisirs seed
- Client logo brand names (currently Client brand logo 01–10 per C2)
- P4-05 Google Search Console login

## Method

Playwright against Next localhost + old-site/backup evidence during planning. Cloudflare blocked some live old-site crawls historically.

## Related notes

- [[Project-Brief]]
- [[Migration-Strategy]]
- [[Blog-URL-Preservation]]
- Plan: `.cursor/plans/homepage_landing_audit_0b7e065e.plan.md`
