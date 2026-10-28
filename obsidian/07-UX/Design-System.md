# Design System

**Status:** Updated 2026-09-02 with competitor-informed patterns  
**Related:** [[Design-Inspiration]], [[Navigation-Footer-Spec]], [[Page-Templates]], [[Accessibility]]

---

## Source

Design tokens informed by competitor analysis (Olifant Digital, AMZ Dudes, Canopy Management, Sequence Commerce) and eCom Gliders brand assets from current site backup.

Current brand colors to be extracted from `backup/assets/` during implementation phase. Values below are proposed defaults pending brand audit.

---

## Color palette

### Brand colors (extract from current site)

| Token | Usage | Notes |
|-------|-------|-------|
| `--color-primary` | Headers, nav, key UI elements | Extract from current logo and header |
| `--color-accent` | CTA buttons, links, highlights | Single accent for all CTAs |
| `--color-background` | Page background | White or near-white |
| `--color-surface` | Cards, sections | Light gray or white with shadow |
| `--color-text-primary` | Body text, headings | Dark gray or navy |
| `--color-text-secondary` | Meta text, captions | Medium gray |
| `--color-border` | Dividers, card borders | Light gray |

### Competitor reference

| Agency | Primary | Accent | Background |
|--------|---------|--------|------------|
| Olifant Digital | Navy | Blue CTA | White |
| AMZ Dudes | Dark text | Orange CTA | White |
| Canopy Management | Dark green | Green CTA | White/dark hero |
| Sequence Commerce | Dark text | Blue links | White |
| eCom Gliders | TBD (from backup) | One consistent accent | White |

### Rules
- One accent color for all CTAs (no mixed button colors)
- WCAG AA contrast minimum: 4.5:1 for text, 3:1 for large text
- No color-only information conveyance (add icons or text)

---

## Typography

### Font families (proposed)

| Role | Font | Fallback |
|------|------|----------|
| Headings | Extract from current site or Inter | system-ui, sans-serif |
| Body | Extract from current site or Inter | system-ui, sans-serif |

### Type scale (design tokens + Tailwind remap)

Canonical values live in `content/config/design-system.json` and `src/app/globals.css` `@theme`.

| Token / utility | Size | Weight | Line height | Usage |
|-----------------|------|--------|-------------|-------|
| `--text-display` / `.text-display` | 48px | 900 | 1.08 | Large display |
| `.text-hero` | clamp ~2.15–4.75rem | 900 | ~1.02 | Marketing hero H1 |
| `--text-h1` / `.text-h1` | 40px | 900 | 1.12 | Page titles |
| `--text-h2` / `.text-h2` | 32px | 700 | 1.18 | Section headings |
| `--text-h3` / `.text-h3` | 26px | 700 | 1.22 | Subsection / card titles |
| `--text-h4` / `.text-h4` | 22px | 700 | 1.28 | Smaller card titles |
| `--text-body` / `.text-body` / `text-base` | **18px** | 500 | 1.65 | Body copy |
| `--text-small` / `.text-small` / `text-sm` | **16px** | 500 | 1.55 | Supporting copy, labels |
| `text-xs` (Tailwind remapped) | **14px** | — | 1.45 | Eyebrows, tags, meta, numbering |
| `--text-stat` / `.text-stat` | 40px | 900 | 1.1 | Stat numbers |

### Rules
- Prefer design-token utilities (`.text-body`, `.text-small`, `.text-h*`) or remapped Tailwind (`text-sm`/`text-base`); do not invent `text-[10px]`-class sizes below 14px
- Body remains comfortable without zoom for seller audience ~35–40
- Maximum line length: 65-75 characters for body text
- No more than 3 font weights in use (loaded faces: 400/500/700/900)

---

## Spacing scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight gaps |
| `--space-sm` | 8px | Icon gaps, inline spacing |
| `--space-md` | 16px | Card padding, form gaps |
| `--space-lg` | 24px | Section internal spacing |
| `--space-xl` | 32px | Between components |
| `--space-2xl` | 48px | Section padding (mobile) |
| `--space-3xl` | 64px | Section padding (desktop) |
| `--space-4xl` | 96px | Large section gaps |

### Section padding
- Mobile: `--space-2xl` top and bottom (48px)
- Desktop: `--space-3xl` to `--space-4xl` (64-96px)

Reference: Olifant generous whitespace, Canopy larger section padding.

---

## Border radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Buttons, inputs |
| `--radius-md` | 8px | Cards, dropdowns |
| `--radius-lg` | 12px | Large cards, modals |
| `--radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.07) | Cards default |
| `--shadow-lg` | 0 10px 15px rgba(0,0,0,0.10) | Cards on hover, dropdowns |
| `--shadow-header` | 0 1px 3px rgba(0,0,0,0.08) | Sticky header on scroll |

### Rules
- Subtle hover lift on cards only (competitor pattern: minimal motion)
- No heavy drop shadows

---

## Buttons

### Primary CTA

| Property | Value |
|----------|-------|
| Background | `--color-accent` |
| Text | White or high-contrast |
| Padding | 12px 24px (minimum 44px height) |
| Border radius | `--radius-sm` |
| Font weight | 600 |
| Label | "Free Audit" (header), "Get Free Audit" (sections) |

### States

| State | Change |
|-------|--------|
| Hover | Darken accent 10%, `--shadow-md` |
| Focus | 2px outline, offset 2px |
| Active | Darken accent 15% |
| Disabled | 50% opacity, no pointer |

### Secondary button
- Outlined, accent border and text
- Same size and padding as primary
- Used for "Learn more", "Read case study"

### Rules
- One primary CTA style site-wide
- Minimum 44x44px touch target on mobile
- No emoji in button labels

---

## Cards

### Stat card

| Property | Value |
|----------|-------|
| Layout | Number large top, label below |
| Number style | `--text-stat`, `--color-accent` or primary |
| Label style | `--text-small`, `--color-text-secondary` |
| Padding | `--space-lg` |
| Background | `--color-surface` |
| Border radius | `--radius-md` |
| Hover | `--shadow-lg`, translateY -2px |

Reference: AMZ Dudes 4-card stat row.

### Service card

| Property | Value |
|----------|-------|
| Icon | 32-40px, brand icon set (no Unicode) |
| Title | `--text-h4` |
| Description | `--text-body`, 2 lines max |
| Link | "Learn more" or arrow |
| Grid | 3x2 desktop, 2x3 tablet, 1 column mobile |

Reference: MAG 4-pillar grid.

### Case study card

| Property | Value |
|----------|-------|
| Metric | `--text-stat`, prominent |
| Brand | `--text-h4` |
| Service tag | Pill badge |
| Description | 1-2 lines |
| CTA | "Read case study" link |
| Hover | `--shadow-lg` |

Reference: Olifant case study cards.

### Testimonial card

| Property | Value |
|----------|-------|
| Quote | `--text-body`, italic optional |
| Name | `--text-h4` |
| Role + company | `--text-small` |
| Layout | Quote, then attribution below |

Reference: Olifant named CEO quotes. No anonymous reviews.

---

## Forms

### Input fields

| Property | Value |
|----------|-------|
| Height | 44px minimum |
| Padding | 12px 16px |
| Border | 1px `--color-border` |
| Border radius | `--radius-sm` |
| Focus | Accent border, outline |
| Error | Red border, error message below |

### Form layout
- Short forms: 3-5 fields maximum
- Labels above inputs
- Required field indicator
- Submit button: primary CTA style
- Privacy note near submit button

Reference: AMZ Dudes short modal form, Olifant application flow.

---

## Navigation components

### Header
- Height: 64-80px
- Sticky with `--shadow-header` on scroll
- Logo max height: 40-48px

### Mega menu
- Full-width panel below header
- 3-column layout (see [[Navigation-Footer-Spec]])
- Column gap: `--space-xl`
- Panel padding: `--space-2xl`

### Mobile menu
- Full-screen overlay or slide-in panel
- Item height: 48px minimum
- Focus trap when open

---

## Footer components

### Pre-footer CTA band
- Background: `--color-primary` or accent
- Text: white or high-contrast
- Padding: `--space-2xl`

### Footer columns
- 4 columns desktop, 2 tablet, 1 mobile
- Column gap: `--space-xl`
- Link style: `--text-small`, no underline default, underline on hover

---

## Icons

### Rules
- No emoji or Unicode symbols as UI icons
- Use approved icon library (download to `assets/icons/`)
- Document source and license in `assets/licenses/`
- Size: 24px inline, 32-40px in cards

---

## Motion

| Pattern | Specification |
|---------|---------------|
| Card hover | translateY -2px, shadow increase, 200ms ease |
| Mega menu open | Fade in 200ms |
| Mobile menu | Slide in 300ms |
| Page transitions | None (avoid heavy animation) |
| Scroll animations | None (performance and accessibility) |

---

## Logo usage

- Extract variants from `backup/assets/` during implementation
- Minimum clear space: height of logo on all sides
- Do not stretch or distort
- SVG preferred for header and footer

---

## Accessibility

| Requirement | Standard |
|-------------|----------|
| Color contrast | WCAG AA (4.5:1 text) |
| Touch targets | 44x44px minimum |
| Focus indicators | Visible on all interactive elements |
| Skip link | First focusable element |
| Landmarks | header, nav, main, footer |
| Alt text | All images |
| Form labels | Associated with inputs |

See [[Accessibility]] for full checklist.

---

## Implementation notes

1. Extract exact brand colors from current site assets before coding
2. Define CSS custom properties (or design tokens file) for all values above
3. Build components before page assembly
4. Test contrast ratios with automated tools
5. Validate touch targets on mobile devices

---

## Related notes

- [[Design-Inspiration]]
- [[Navigation-Footer-Spec]]
- [[Page-Templates]]
- [[Accessibility]]
- [[Current-Site-Audit]]
