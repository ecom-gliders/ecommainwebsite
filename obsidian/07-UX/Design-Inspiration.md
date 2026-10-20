# Design Inspiration

**Research date:** 2026-09-02  
**Status:** Complete  
**Related:** [[Competitor-Analysis]], [[Design-System]], [[Navigation-Footer-Spec]], [[Page-Templates]]

---

## Purpose

Section patterns, component references, and mood notes from researched Amazon agency websites, grouped by design tier. Informs eCom Gliders homepage, service pages, and global layout decisions.

---

## Design tier overview

| Tier | Agencies | Mood | Visual traits |
|------|----------|------|---------------|
| A - Enterprise premium | Canopy, Sequence, MAG | Authoritative, global, high-trust | Dark heroes, dense awards, video cases |
| B - Boutique premium | Olifant Digital | Confident, clean, personal | White space, guarantee badges, named quotes |
| C - Conversion-optimized | AMZ Dudes, SalesDuo | Direct, energetic, action-oriented | Stat cards, orange accents, modals |
| D - Specialist | AMZ One Step, Evolve, Incrementum | Focused, portfolio-driven | Galleries, tools, content libraries |
| E - Basic | Budget SMB | Generic, low-trust | Stock imagery, vague copy. Avoid. |

**eCom Gliders target:** Tier B mood (Olifant) with Tier C conversion patterns (AMZ Dudes).

---

## Section patterns by tier

### Tier A - Enterprise premium

**Reference agencies:** Canopy Management, Sequence Commerce, My Amazon Guy

| Section | Pattern | Example |
|---------|---------|---------|
| Hero | Dark full-width, bold outcome headline, single CTA | Canopy: "Scale your Amazon brand" |
| Trust bar | Logo marquee + 10+ certification badges | MAG: Amazon SPN, Clutch, Stevie |
| Awards | Dedicated grid, 4 columns, 17+ badges | Canopy awards wall |
| Case studies | 3 featured with video embed + 3 metrics each | Canopy: sales %, CVR %, ACoS % |
| Segmentation | 8+ industry verticals | Sequence: health, beauty, home, etc. |
| Comparison | 3-column agency vs in-house vs generalist | Sequence comparison table |
| Reviews | 280+ review count displayed prominently | Sequence Clutch score |
| Global | Multi-office addresses in footer | Sequence: 12 offices |

**Adopt for eCom Gliders:** Comparison table, trust bar density, FAQ depth.  
**Skip:** Enterprise scale claims, 12-office footer, dark hero (unless brand direction changes).

---

### Tier B - Boutique premium

**Reference agency:** Olifant Digital (primary)

| Section | Pattern | Example |
|---------|---------|---------|
| Hero | Left-text outcome copy + right trust visual | "Grow your Amazon revenue" |
| Top bar | Announcement strip above header | "Rated 5.0 on Clutch. $100M+ managed." |
| Revenue ticker | Scrolling client win amounts | $305K, $688K, $1.2M |
| Guarantee | Badge or line below hero | "60-day money-back guarantee" |
| Case studies | 15+ cards, metric headline + "Be Our Next Success Story" | +211% revenue, Pet Supplies |
| Testimonials | Named CEO quotes with company and role | Video + metric overlay |
| Process | 3-4 numbered steps with icons | Audit, Strategy, Execute |
| Footer | 5 columns with offices, services, tools | TACoS calculator, ACOS calculator |
| Onboarding | Application form, not just contact | "Get your free marketing plan" |

**Adopt for eCom Gliders:** Mega menu with CTA panel, header CTA, case study cards, guarantee line (if policy exists), named testimonials.

---

### Tier C - Conversion-optimized

**Reference agencies:** AMZ Dudes, SalesDuo

| Section | Pattern | Example |
|---------|---------|---------|
| Hero | Outcome headline + immediate stat cards below | $50M+ managed, 65% ACoS cut |
| Stat cards | 4 large numbers in row, above fold | Revenue, ACoS, ROI, brands |
| Services | Numbered list 01-09 for scannability | AMZ Dudes service list |
| Segmentation | Seller-type tabs | New, growing, enterprise, wholesale |
| Lead capture | Scroll-triggered or exit-intent modal | Phone + form in modal |
| Sticky CTA | Header button always visible | "Get Free Consultation" |
| Float button | WhatsApp or live chat | Bottom-right corner |
| Forms | Short (name, email, phone), no spam promise | 3-4 fields max |

**Adopt for eCom Gliders:** Stat cards, sticky header CTA, seller segmentation, short forms.  
**Avoid:** Emoji in UI, exit-intent as primary contact method.

---

### Tier D - Specialist/portfolio

**Reference agencies:** AMZ One Step, Evolve Media, Incrementum Digital

| Section | Pattern | Example |
|---------|---------|---------|
| Portfolio | Before/after creative galleries | AMZ One Step: 12-day results |
| Data cards | Days-to-result metrics | 114% sessions in 12 days |
| Tools | Proprietary platform showcase | Incrementum DataOwl |
| Content library | Homepage as content hub | Evolve: 200+ free guides |
| Founder letter | CEO addressing pain points | AMZ One Step CEO letter |
| Blog | Category-filtered content grid | Evolve content categories |

**Adopt for eCom Gliders:** Blog prominence (328 posts), Visual Creativity gallery if assets exist.  
**Skip:** Proprietary tool section (no equivalent exists).

---

## Component references by element

### Hero

| Reference | Layout | Copy pattern |
|-----------|--------|----------------|
| Olifant | Split: text left, visual right | Outcome + CTA + trust line |
| Canopy | Full-width dark | Bold headline + "Talk with expert" |
| AMZ Dudes | Centered + stat cards below | Headline + 4 stat cards |
| eCom Gliders (proposed) | Split, Olifant-style | "Full-service Amazon growth for ambitious FBA brands" |

### Stat cards

| Reference | Count | Metrics shown |
|-----------|-------|---------------|
| AMZ Dudes | 4 | $50M+, 65% ACoS, 180% ROI, 500+ brands |
| Olifant | Ticker | Client win amounts |
| Canopy | 3 per case | Sales %, CVR %, ACoS % |
| eCom Gliders (proposed) | 4 | $112M+, 95% retention, 20+ team, since 2018 |

### Service cards

| Reference | Layout | Content |
|-----------|--------|---------|
| MAG | 4-pillar grid | Icon, title, 2-line description, link |
| SalesDuo | Tabbed panels | Agency type tabs, service lists |
| eCom Gliders (proposed) | 3x2 grid | 6 pillars: Account Mgmt, PPC, SEO, Content, Creative, Catalog |

### Case study cards

| Reference | Card content | CTA |
|-----------|-------------|-----|
| Olifant | Metric + brand category | "Be Our Next Success Story" |
| Canopy | Metric + video quote + 3 stats | "Read case study" |
| eCom Gliders (proposed) | Metric + brand + service type | "Read case study" |

### Testimonial blocks

| Reference | Format | Requirements |
|-----------|--------|-------------|
| Olifant | Carousel, named CEO + company | Video optional, metric overlay |
| Canopy | Video embed + quote | Founder on camera |
| eCom Gliders (proposed) | 6-8 static quotes | Name, role, company required. No anonymous. |

### Comparison tables

| Reference | Columns | Use case |
|-----------|---------|----------|
| Sequence | Agency vs in-house vs generalist | AEO + conversion |
| eCom Gliders (proposed) | Agency vs DIY | "Why hire an agency" section |

### FAQ sections

| Reference | Count | Schema |
|-----------|-------|--------|
| MAG | 10+ | FAQPage |
| Sequence | 8 detailed | FAQPage |
| eCom Gliders (proposed) | 10-12 | FAQPage on homepage and service pages |

### Navigation

| Reference | Style | CTA |
|-----------|-------|-----|
| Olifant | Mega dropdown + CTA panel | "Free marketing plan" button |
| AMZ Dudes | Simple + modal | "Get Free Consultation" |
| MAG | Dropdown | "Free listing audit" |
| eCom Gliders (proposed) | Mega menu 3-column + button | "Free Audit" |

### Footer

| Reference | Columns | Special features |
|-----------|---------|-----------------|
| Olifant | 5 | Offices, tools, CEO email |
| Sequence | 4+ | Multi-channel service links |
| eCom Gliders (proposed) | 4 | Logo, services, company, contact |

### Forms

| Reference | Fields | Placement |
|-----------|--------|-----------|
| AMZ Dudes | Name, email, phone (modal) | Scroll-triggered |
| Olifant | Application flow | Dedicated page |
| eCom Gliders (proposed) | Name, email, phone, service interest | Hero, header, /free-audit-2/ |

---

## Color and typography mood notes

### Olifant Digital
- Navy and white palette
- Large bold H1 (48-64px range observed)
- Generous whitespace between sections
- Subtle card shadows on hover

### AMZ Dudes
- Orange accent for CTAs
- High contrast stat numbers
- Dense but scannable service lists
- White background, dark text

### Canopy Management
- Dark green and white
- Premium feel, video-heavy
- Awards badges in muted grid
- Larger section padding

### Sequence Commerce
- Clean sans-serif throughout
- Blue accent for links and CTAs
- Data visualization in reporting sections
- Professional, corporate tone

### eCom Gliders direction
- Keep existing brand colors from current site
- One accent color for all CTAs (consistent)
- Increase H1 size to match Olifant scale
- Reduce body text density (shorter paragraphs)
- WCAG AA contrast minimum on all text

---

## Motion and interaction

| Pattern | All agencies | eCom Gliders rule |
|---------|-------------|-------------------|
| Card hover | Subtle lift or shadow | Yes |
| Scroll animations | Minimal or none | Avoid heavy parallax |
| Modals | AMZ Dudes only | Supplementary, not primary |
| Video autoplay | Canopy case studies | Only with user interaction |
| Ticker scroll | Olifant revenue | Optional, performance-tested |

---

## Homepage section order (proposed)

Based on cross-agency patterns, optimized for eCom Gliders:

1. Hero (Olifant layout + AMZ Dudes CTA urgency)
2. Trust bar (MAG density)
3. Stats row (AMZ Dudes cards)
4. Services (MAG 6-pillar grid)
5. Who we serve (AMZ Dudes tabs)
6. Case studies (Olifant cards + Canopy metrics)
7. Process (Olifant 4-step)
8. Agency vs DIY (Sequence table)
9. Testimonials (Olifant named quotes)
10. Blog/insights (Evolve library link)
11. FAQ (MAG depth)
12. Final CTA (AMZ Dudes form + Olifant phone)

See [[Page-Templates]] and `.cursor/plans/2026-09-02-homepage-redesign-brief.md` for wireframe detail.

---

## Strictly avoid

- Copying competitor layouts, copy, or assets
- Emoji or Unicode symbols as UI icons
- "AI-powered" or "magic" marketing language
- Fake ChatGPT/Perplexity recommendation blocks
- Anonymous testimonials
- Inflated metrics
- Stock imagery that does not represent actual work

---

## Related notes

- [[Competitor-Analysis]]
- [[Design-System]]
- [[Navigation-Footer-Spec]]
- [[Page-Templates]]
- [[Niche-Website-Standards]]
