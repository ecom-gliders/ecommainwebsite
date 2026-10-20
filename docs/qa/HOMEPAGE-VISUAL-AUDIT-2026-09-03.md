# Homepage visual audit (post Waves A–F)

**Date:** 2026-09-03  
**Method:** Playwright section screenshots at 1440×900 on `http://localhost:3000/`  
**Evidence:** `docs/qa/screenshots/audit-00-fold.png` + `audit-01-*.png` … `audit-14-*.png`

## Verdict

User concern is **fair**. The homepage now has a solid conversion IA and professional copy, but visually it still reads as **text + thin cards + sparse proof**. Old Elementor home and competitors (Canopy / AMZ Dudes / MAG) win on photography, multi-image creative, and metric-on-visual density. New site wins on structure, form, FAQ/schema, comparison — not on “catchiness.”

Confidence: **High** (Observed in screenshots).

## Per-section scorecard

| # | Section | Visual density | Observed | Gap vs old/competitors | Priority |
|---|---------|----------------|----------|------------------------|----------|
| 1 | Hero | Medium | Form-first split; soft atmosphere; partner badge | No people/product hero art; competitors use face + metrics or richer form chrome | P1 |
| 2 | Trust | Medium | Partners + grayscale marquee + badges | Logos too faint (opacity/grayscale); feels empty in user’s browser crop | P1 |
| 3 | Stats | Low | Numbers only, no charts/icons | Competitors often glue metric devices / bars under hero | P2 |
| 4 | Services | Low | Lucide icons + text cards | No service imagery; “flat SaaS grid” | P1 |
| 5 | Creative | Medium–High | **One** Les Plaisirs still | Subhead promises infographics/A+ but gallery is 1 tile; old site had more frames + video | P0 |
| 6 | Segments | Low | Icon cards + CTAs | No stage visuals | P2 |
| 7 | Cases | Medium | Logos + orange metrics | Logo-mark treatment, not result charts / before-after | P1 |
| 8 | Values | Low | Icon + copy pillars | Correctly de-sloganized; visually quiet | P2 |
| 9 | Process | High | Steps + assurances + **BrowserMockup chart** | This is the strongest “infographic” block — under-noticed if user stops at trust | Keep / feature earlier? |
| 10 | Comparison | Low | Table only | Fine for AEO; not visual | OK |
| 11 | Testimonials | Low | Quote cards, no photos | No avatars (by plan); feels text-wall | P2 |
| 12 | Blog | Low | Text-only (ChatGPT thumbs skipped) | Competitors show thumbs | P1 when QA art ready |
| 13 | FAQ | Low | Accordion | OK functional | OK |
| 14 | Final CTA | Medium | Navy band | Clean; no supporting visual | P3 |

## Root causes (not “forgot sections”)

1. **Plan deliberately avoided** Elementor collage, emoji, dark cinematic hero, awards-wall spam.
2. **Creative gallery seeded with 1 still** (C2: QA-only; Vimeo deferred).
3. **Blog thumbs skipped** (AI stock rejected).
4. **Client logos grayscale + low opacity** make trust look “empty” even though assets exist.
5. **Services/segments/values** are icon+copy by lock — competitors use photography or illustrated process.

## Proposed visual polish wave (requires your go-ahead)

Do **not** invent fake metrics. Prefer real assets from backup + process mockup pattern.

1. **Trust** — raise client logo opacity; less aggressive grayscale; slightly larger marks.
2. **Creative** — add 2–4 more QA-passed listing/A+ stills (infographic-style frames if available in backup).
3. **Services** — optional small illustration or muted background motif per card (or one shared capability strip), not stock random photos.
4. **Cases** — prefer result chart / listing screenshot over logo-only where backup has authentic art.
5. **Stats** — light sparkline / divider treatment so numbers don’t float as plain text.
6. Optional: move a **compact proof strip** (mockup crop or creative thumbs) closer under stats so mid-page isn’t all text cards.

## Out of scope unless approved

- Dark hero rebuild  
- Fake infographics / unverified % overlays  
- Restoring unprofessional old slogans  
- Newsletter / WhatsApp / exit-intent  

## Next action

Confirm if you want a **Visual polish wave** starting with Trust + Creative density (highest ROI), then Services/Cases.
