# Draft template: `/services/` hub redesign

**Status:** Approved and implemented (2026-10-20)  
**Date:** 2026-10-20  
**Inputs:** AMZ Dudes audit (`docs/research/AMZDUDES-SERVICES-PAGE-AUDIT-2026-10-20.md`) + Brand-SEO Consultant ([Name](e26c1fd4-0db3-40f2-bf7f-b382cfc19fb9))  
**Scope:** Services **index** (`/services/`) only. Individual service detail pages stay separate unless a later pass extends the parent rail pattern.

---

## Design goals (from user pain + consultant)

1. Hub must help buyers **choose a path**, not dump equal cards.
2. **Full-Service** is the parent container; Amazon sub-services nest under it.
3. **Results** are visual climax: large green outcome text, short factual copy, real case links.
4. Cut AI-ish essays; demote unrelated / complementary channels off the main spine.
5. Steal AMZ Dudes **IA patterns** only — never their metrics, wording, or footer SEO spam.

---

## Proposed section order

| # | Section ID | Purpose | Content rules |
|---|------------|---------|---------------|
| 1 | `hero` | Orient + convert | H1 + one supporting sentence + thin trust strip (re-verify: since 2018 · 20+ · 95% · $112M+) + dual CTAs (Free Audit + phone). Optional browser mockup. **No long essay.** |
| 2 | `audience` | Self-qualify | 3–4 short “who it’s for” checklists (e.g. scale PPC, stalled listings, multi-vendor chaos). Max one line each. |
| 3 | `flagship-parent` | Sell the container | Full-Service Amazon Account Management: 2–3 coordination bullets + primary link to `/full-service-amazon-agency/`. Render heading/body from existing `flagship` JSON (currently unused in UI). |
| 4 | `capability-rail` | Parent → sub-services | Numbered `01–N` Amazon capabilities nested under Full-Service. Each: title, 1–2 sentence scope, href. Label: “Included in full-service; also available as focused workstreams.” |
| 5 | `focused-paths` | Entry for specialists | Quiet chips/links: PPC-only, Listing, Creative — not a second equal grid. |
| 6 | `engagement` | How work starts | 4-step stack only (Audit → Plan → Execute → Report). Short labels; kill “operating system” fluff. |
| 7 | `results` | Proof climax | 2–3 **asymmetric rows** (see layout below). Verified cases only. |
| 8 | `also-available` | Demoted add-ons | Brand ops + Channels/DTC: one line + link each. Collapsed visual weight. |
| 9 | `faq` | Objections | Amazon-first answers; do not lead with Shopify/TikTok. |
| 10 | `cta` | Close | Free Audit + phone. Single story. |

**Removed / not on hub:** Four equal category pillars as the primary IA; company-stat block as the main “proof” story; keyword-stuffed footer H3 spam.

---

## Parent → sub-service rail (draft content map)

**Parent:** Full-Service Amazon Account Management → `/full-service-amazon-agency/`

| # | Sub-service | Path | Scope (draft — edit for professional tone) |
|---|-------------|------|-----------------------------------------------|
| 01 | Amazon PPC Management | `/amazon-ppc-management-agency/` | Sponsored Products, Brands, and Display structured for profitable growth. |
| 02 | Listing Optimization and SEO | `/amazon-listing-optimization/` | Keyword research and listing content aligned to search and conversion. |
| 03 | Content Writing | `/amazon-content-writing/` | Titles, bullets, A+ narrative for Amazon shoppers. |
| 04 | Visual Creativity | `/amazon-visual-creativity/` | Main and secondary images, infographics, A+ layouts. |
| 05 | Video Creative | `/amazon-video-creative/` | Listing and ad video for Amazon placements. |
| 06 | Catalog Management | `/amazon-catalog-management/` | Suppressions, variations, and catalog health. |
| 07 | Amazon DSP | `/amazon-dsp-management/` | Upper-funnel and retargeting when foundations support it. |
| 08 | Reporting and Analytics | `/amazon-reporting-analytics/` | Weekly and monthly metrics tied to decisions. |
| 09 | Trademark and Brand Registry | `/amazon-trademark-brand-registry/` | Brand Registry readiness as an ops adjunct. |

**Also available (demoted, section 8):** Company Registration, Product Sourcing, Shopify, TikTok Shop Ads, Email Retention — one line each, not numbered peers.

---

## Results / proof layout template

### Trust strip (hero only)

Four compact verified facts — no paragraph heading. Example labels only (re-verify before ship):

`$112M+` revenue managed · `95%` retention · `20+` in-house · since `2018`

### Case result row (repeat ×2–3)

```
┌─────────────────────────────────────────────────────────────┐
│  LEFT (~45–55%)              │  RIGHT                       │
│  LARGE GREEN METRIC          │  Brand / category            │
│  e.g. 310%                   │  One factual sentence        │
│  unit label (sales increase) │  Link: Read case study       │
│  color: success #067D62      │  No AI adjectives            │
│  (or brand lime if approved) │                              │
└─────────────────────────────────────────────────────────────┘
```

**Copy rules**

- Metric = the hero; body ≤ 25 words; verified from case-study content only.
- Heading example: “Verified results” — not “Results from connected Amazon growth work.”
- Do not invent ACOS/revenue beyond what case pages support.
- Contrast: green on light surface; avoid green-on-navy failures.

**Draft rows (from existing verified hub JSON — re-check pages before ship)**

| Metric (green) | Brand | Body seed |
|----------------|-------|-----------|
| 310% | GoSports | Monthly revenue $22.1K → $90.7K via listing, creative, and advertising work. |
| 73% | Kitchen brand | Catalog + listing + PPC restructuring for sustained growth. |
| 52% → 26.5% ACOS | GoSports | PPC + listing improvements while revenue scaled. |

---

## JSON / schema shape (proposed — not implemented)

Extend `services-index` conceptually:

```ts
{
  hero: { title, subtitle, primaryCta, secondaryCta, browser?, trustStrip: [{ value, label }] },
  audience: { heading, items: [{ title, points: string[] }] },
  flagship: { eyebrow, heading, body, bullets?: string[], cta },
  capabilityRail: {
    heading,
    subheading, // "Included in full-service…"
    items: [{ number, title, description, href }]
  },
  focusedPaths: [{ label, href }],
  engagement: { heading, steps: [{ title, description }] }, // max 4
  results: {
    heading, // short
    cta,
    items: [{ metric, metricUnit?, brand, description, href }]
  },
  alsoAvailable: [{ title, description, href }],
  faq: [...],
  cta: {...},
  seo: {...}
}
```

Deprecate equal `categories[]` as the primary rendering model (keep data migration path if needed).

---

## Component map (implementation sketch — later)

| Section | Likely component |
|---------|------------------|
| Hero + trust | `ServicesIndexHero` (extend) |
| Audience | new `ServicesIndexAudience` |
| Flagship parent | new `ServicesIndexFlagship` (wire existing JSON) |
| Capability rail | new `ServicesIndexCapabilityRail` |
| Focused paths | small chip row in template |
| Engagement | slim `ServicesIndexStack` |
| Results | rewrite `ServicesIndexResults` → asymmetric green metric rows |
| Also available | new compact list |
| FAQ / CTA | existing |

---

## Copy discipline checklist

- [ ] No “operating system,” “serious sellers” clichés without concrete meaning
- [ ] No competitor metrics or AMZ Dudes case numbers
- [ ] No emoji / Unicode icons
- [ ] Re-verify company claims before publish
- [ ] Meta title/description stay Amazon-first

---

## Priority

**P0 (ship spine):** Hero trust strip · Flagship parent section · Numbered Amazon rail · Results green metric rows · Demote Channels/Reg/Sourcing  

**P1:** Audience checklists · Focused-path chips · Stack/FAQ trim · Optional anonymized screenshot strip (only with approved assets)

---

## Explicit non-goals

- Do not clone AMZ Dudes hero lead form as mandatory for v1
- Do not add keyword-stuffed related-service H3 walls
- Do not rebuild all 15 detail pages in this pass
- Do not invent Seller/Vendor or Day-1 timelines unless ops-verified

---

## Approval gate

Reply **approve services template** to start implementation, or note edits to section order / rail list / green token choice (`success` `#067D62` vs lime accent `#C6FD50`).
