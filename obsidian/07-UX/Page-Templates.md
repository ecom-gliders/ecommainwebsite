# Page Templates

**Research date:** 2026-09-02  
**Status:** Proposed (pending approval before implementation)  
**Related:** [[Navigation-Footer-Spec]], [[Design-Inspiration]], [[Blog-URL-Preservation]]

---

## Purpose

Wireframe specifications for all major page types on the new eCom Gliders site. Each template defines section order, content requirements, SEO elements, and schema markup.

Global elements (header, footer) defined in [[Navigation-Footer-Spec]].

---

## Template index

| Template | URL pattern | Priority |
|----------|-------------|----------|
| Homepage | `/` | Critical |
| Service page | `/amazon-ppc-management-agency/`, etc. | Critical |
| Case study index | `/case-studies/` | High |
| Case study detail | `/case-studies/{slug}/` | High |
| Blog index | `/blog/` | High |
| Blog post | `/{slug}/` (root-level, 328 URLs) | Critical |
| About | `/about-us/` | Medium |
| Contact | `/contact/` | Medium |
| Free audit | `/free-audit-2/` | Critical |
| Legal | `/privacy-policy-2/`, `/terms-conditions-2/` | Low |

---

## 1. Homepage

See `.cursor/plans/2026-09-02-homepage-redesign-brief.md` for full 12-section wireframe.

**Summary sections:**
1. Hero
2. Trust bar
3. Stats row
4. Services (6 pillars)
5. Who we serve
6. Case studies
7. Process
8. Agency vs DIY
9. Testimonials
10. Blog/insights
11. FAQ
12. Final CTA

**SEO:**
- Title: "Amazon Account Management Agency | eCom Gliders"
- H1: Outcome-focused headline
- Schema: Organization, WebSite

---

## 2. Service page

### URL examples
- `/amazon-ppc-management-agency/` (preserve)
- `/full-service-amazon-agency/` (preserve)
- New dedicated pages for each core service

### Section order

```
1. Breadcrumb: Home > Services > [Service Name]
2. Hero
3. Stats row (service-specific)
4. Problem section
5. Solution (numbered steps)
6. What's included (deliverables)
7. Results (case study cards)
8. FAQ (5-8 questions)
9. Related services (3 cards)
10. CTA band
```

### Section specifications

#### Hero
| Element | Specification |
|---------|---------------|
| H1 | Service-specific (e.g. "Amazon PPC Management Services") |
| Subheadline | 2-line value proposition |
| CTA | "Get Free Audit" button |
| Background | Light or brand accent |

#### Stats row
| Card | Example (PPC) |
|------|----------------|
| 1 | 65% average ACoS reduction |
| 2 | $112M+ ad spend managed |
| 3 | 95% client retention |
| 4 | Amazon Ads Verified Partner |

Use verified metrics only. Adjust per service.

#### Problem section
- H2: "Why sellers struggle with [service]"
- 3-4 pain points in bullet or card format
- Reference competitor pattern: AMZ Dudes audience tabs

#### Solution section
- H2: "How eCom Gliders manages your [service]"
- 4-6 numbered steps with icon and short description
- Reference: Olifant 4-step process

#### What's included
- H2: "What is included"
- Bullet list of deliverables (8-12 items)
- Checkmark or icon per item

#### Results
- H2: "Results for our clients"
- 1-2 case study cards with metric + brand + link
- Minimum one card required per service page

#### FAQ
- H2: "Frequently asked questions"
- 5-8 service-specific questions
- Accordion or expandable format
- FAQPage schema markup

#### Related services
- 3 cards linking to other core services
- Icon, title, short description, link

#### CTA band
- "Ready to improve your [service]?"
- Form or button to `/free-audit-2/`
- Phone number visible

### Content requirements

| Property | Value |
|----------|-------|
| Word count | 1200-1800 words |
| Schema | Service (not Article/BlogPosting) |
| Internal links | 3+ to related services and blog posts |
| Images | 1-2 relevant, with alt text |

### Current issue
`/amazon-ppc-management-agency/` uses blog post template with Article schema (962 words). Migration must switch to dedicated service layout while preserving URL.

---

## 3. Case study index

### URL
`/case-studies/` (preserve)

### Section order

```
1. Hero: "Client success stories"
2. Filter bar (by service type)
3. Case study grid
4. CTA band
```

### Filter options
- All
- PPC Management
- Account Management
- Listing Optimization
- Visual Creativity

Reference: Canopy Management filterable grid.

### Case study card

| Element | Content |
|---------|---------|
| Metric headline | "310% sales increase" |
| Brand/category | "Sports and Outdoors" |
| Service type | Tag (PPC, Account Mgmt, etc.) |
| Short description | 1-2 sentences |
| Link | "Read case study" to detail page |

### Grid layout
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

### Current state
- Index page exists
- 9 case study pages in backup (case-study-1 through case-study-9)
- GoSports 310% featured on homepage only
- Migration should create proper detail page URLs

---

## 4. Case study detail

### URL pattern
`/case-studies/{brand-slug}/` (proposed; verify against existing URLs)

Existing backup pages: `case-study-1` through `case-study-9`. Map to brand names during content migration.

### Section order

```
1. Breadcrumb: Home > Case Studies > [Brand Name]
2. Hero: Brand name + primary metric
3. Challenge
4. Solution (numbered steps)
5. Results (3-4 metrics, before/after)
6. Client quote (named, with role)
7. Related case studies (2 cards)
8. CTA band
```

### Hero
| Element | Example |
|---------|---------|
| H1 | "GoSports: 310% sales increase" |
| Subheadline | "How eCom Gliders scaled a sports brand on Amazon" |
| Primary metric | Large display: "310%" |

### Challenge
- H2: "The challenge"
- 2-3 paragraphs describing client situation before engagement

### Solution
- H2: "Our approach"
- 4-6 numbered steps with what eCom Gliders did

### Results
- H2: "The results"
- 3-4 metric cards with before/after values
- Example: Sales +310%, ACoS -45%, Revenue +$X

### Client quote
- Blockquote with named person, role, and company
- No anonymous testimonials

---

## 5. Blog index

### URL
`/blog/` (preserve)

### Section order

```
1. Hero: "Amazon seller insights"
2. Category filter (optional)
3. Post grid (latest first)
4. Pagination
5. CTA band
```

### Post card
| Element | Content |
|---------|---------|
| Featured image | Post thumbnail |
| Title | Post H1 |
| Excerpt | 2-3 lines |
| Meta | Date, reading time, category |
| Link | To root-level post URL |

Reference: Evolve content library, Sequence research desk.

---

## 6. Blog post

### URL
Root-level: `/{slug}/` (328 URLs, must preserve exactly)

Example: `/amazon-ppc-hacks/`, `/why-your-amazon-ppc-is-wasting-money-in-2026/`

### Section order

```
1. Breadcrumb: Home > Blog > [Post title]
2. H1 title
3. Meta line: Date | Reading time | Author
4. Featured image
5. TOC (sticky sidebar on desktop)
6. Article body
7. FAQ section (if present in original)
8. Author box
9. Related posts (3 cards)
10. CTA band
```

### Requirements

| Property | Specification |
|----------|---------------|
| URL | Identical to current (root-level, no /blog/ prefix) |
| Schema | Article + BlogPosting (preserve) |
| TOC | Sticky sidebar on desktop, collapsible on mobile |
| FAQ | Preserve if present (SEO value) |
| Related posts | 3 cards, same category preferred |
| Internal links | Preserve all existing internal links |
| Images | Preserve all images with alt text |
| Publish date | Preserve original dates |
| Author | Preserve author attribution |

### Critical migration rule
All 328 blog URLs recorded in `backup/metadata/blog-inventory.json` must resolve with identical paths. No 301 redirects unless explicitly approved and documented.

---

## 7. About page

### URL
`/about-us/` (preserve)

### Section order

```
1. Hero: Company mission statement
2. Company story (since 2018, registered 2022)
3. Stats row ($112M+, 95%, 20+, since 2018)
4. Values and differentiation
5. Team overview (20+ specialists, no individual photos unless available)
6. Certifications and partner badges
7. CTA band
```

### Content notes
- Merge "Who We Are" content from current nav
- Professional tone, specific outcomes
- Amazon Ads Verified Partner badge prominent

---

## 8. Contact page

### URL
`/contact/` (preserve)

### Section order

```
1. Hero: "Get in touch"
2. Contact form
3. Contact details (phone, email, address)
4. Business hours (if documented)
5. Map embed (optional)
```

### Form fields

| Field | Type | Required |
|-------|------|----------|
| Name | Text | Yes |
| Email | Email | Yes |
| Phone | Tel | Yes |
| Service interest | Dropdown | No |
| Message | Textarea | Yes |

### Contact details
| Element | Value |
|---------|-------|
| Phone | +1 (360) 660-1210 |
| Email | info@ecomgliders.com |
| Address | 1209 Mountain Rd NE, Albuquerque, NM |

### Requirements
- Server-side validation
- CSRF protection
- Not modal-only (AMZ Dudes modal is supplementary pattern only)

---

## 9. Free audit page

### URL
`/free-audit-2/` (preserve)

### Priority
Critical. Primary conversion page. Treat as important as homepage.

### Section order

```
1. Hero: Value proposition for free audit
2. What you get (3-5 bullet points)
3. Audit form
4. Trust signals (stats, badges, testimonial)
5. FAQ (5-8 questions about the audit process)
6. Phone and email fallback
```

### What you get (example)
- Comprehensive account health review
- PPC performance analysis
- Listing optimization opportunities
- Actionable recommendations report
- No obligation consultation

### Form fields
| Field | Type | Required |
|-------|------|----------|
| Name | Text | Yes |
| Email | Email | Yes |
| Phone | Tel | Yes |
| Amazon store URL | URL | No |
| Monthly revenue range | Dropdown | No |
| Message | Textarea | No |

### Trust signals
- $112M+ managed
- 95% retention
- Amazon Ads Verified Partner
- 1 named testimonial

---

## 10. Legal pages

### URLs (preserve)
- `/privacy-policy-2/`
- `/terms-conditions-2/`

### Requirements
- Clean typography, no marketing sections
- Last updated date
- Linked from footer bottom bar
- Noindex not required (standard legal pages)

---

## Schema markup summary

| Page type | Schema types |
|-----------|-------------|
| Homepage | Organization, WebSite |
| Service page | Service, FAQPage |
| Case study detail | Article or CreativeWork |
| Blog post | Article, BlogPosting |
| Blog index | CollectionPage |
| About | AboutPage, Organization |
| Contact | ContactPage |
| Free audit | WebPage, FAQPage |
| FAQ sections | FAQPage (on any page with FAQ) |

---

## Responsive breakpoints (proposed)

| Breakpoint | Width | Layout changes |
|------------|-------|----------------|
| Mobile | Under 768px | Single column, hamburger nav |
| Tablet | 768-1024px | 2-column grids |
| Desktop | Over 1024px | Full layout, mega menu on hover |

---

## Related notes

- [[Navigation-Footer-Spec]]
- [[Design-Inspiration]]
- [[Design-System]]
- [[Blog-URL-Preservation]]
- [[SEO-Architecture]]
