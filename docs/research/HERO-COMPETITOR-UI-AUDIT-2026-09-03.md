# Hero Competitor UI Audit (Mushahid shortlist)

**Date:** 2026-09-03  
**Method:** Playwright desktop capture 1440x900 + visual read of first viewport  
**Requested URLs:** My Amazon Guy, AMZ Dudes (account management page), Canopy Management, AMZ One Step  
**Also referenced:** Cursor.com (prior pass), current eCom Gliders hero  
**Audience filter:** Clients mostly 30+ (credibility over novelty)

---

## Evidence inventory

| Site | URL | Screenshot |
|------|-----|------------|
| My Amazon Guy | https://myamazonguy.com/ | `docs/qa/competitors/hero-myamazonguy.png` |
| AMZ Dudes | https://amzdudes.com/amazon-account-management-services/ | `docs/qa/competitors/hero-amzdudes-account-mgmt.png` |
| Canopy | https://canopymanagement.com/ | `docs/qa/competitors/hero-canopy.png` |
| AMZ One Step | https://www.amzonestep.com/ | `docs/qa/competitors/hero-amzonestep.png` |
| eCom Gliders (current) | http://localhost:3002/ | `docs/qa/competitors/hero-ecomgliders-current.png` |

Confidence: **High** for visible UI patterns; **Medium** for conversion effectiveness (not A/B tested by us).

---

## Per-site hero scorecard (Observed)

### 1. My Amazon Guy — Tier A personal enterprise

| Attribute | Observed |
|-----------|----------|
| Layout | Split: copy left, founder + phone product proof right |
| H1 | Outcome benefit: products “seen and sold” — **48px / 600** |
| CTAs | Dual filled: yellow primary + orange secondary; tertiary free audit text |
| Visual | Human face + device UI with **hard metrics** ($1.375M, +187%) |
| Trust | Client logo strip immediately under hero |
| Tone for 30+ | Strong (personable founder + results). Dense mega-nav is enterprise-scale, not our size |

**Adopt:** Metric-on-device / proof overlays; dual CTA hierarchy; logo trust handoff below hero.  
**Skip:** Founder-celebrity dependency (we lack that asset); yellow rounded “Fast Quote” youth energy; nav bloat.

### 2. AMZ Dudes (Account Management page) — Tier C conversion enterprise

| Attribute | Observed |
|-----------|----------|
| Layout | Split: copy left, **lead form card** right |
| H1 | Keyword-forward “Best Amazon Account Management Agency” — **59px / 800**; accent color on half of H1 |
| CTAs | Dual: orange audit + outline Explore Services |
| Visual | Form as hero visual (conversion machine) |
| Trust | Rank badge; stats section starts immediately below |
| Tone for 30+ | Mixed: professional form, but Ask AI ribbon + emoji icon assets feel younger / noisier |

**Adopt:** Accent CTA dominance; dual CTA (audit + services); eyebrow badge; stats glued under hero.  
**Skip:** Form-in-hero (forces commit before trust for deliberative 30+ buyers; we already have dedicated `/free-audit-2/`); “#1” unverifiable claims; Ask AI / emoji.

### 3. Canopy Management — Tier A premium enterprise (closest premium bar)

| Attribute | Observed |
|-----------|----------|
| Layout | Split: copy left, professional human + floating platform + **metric cards** right |
| H1 | Outcome + multi-channel; serif display; ~**44px**; color emphasis on key phrase |
| CTAs | Dual: solid Free Audit + outline See the Proof |
| Visual | People + data overlays + channel icons on soft organic shape |
| Trust | Inc. 500 badge + managed revenue claim in body |
| Tone for 30+ | Excellent: calm, executive, proof-dense |

**Adopt:** Metric overlay cards on visual; dual CTA (audit + proof/cases); partner/award badge; larger quieter type; soft branded atmosphere behind visual.  
**Skip:** Copying serif brand system; multi-marketplace claim inflation we cannot match; floating social icons clutter.

### 4. AMZ One Step — Specialist dark cinematic

| Attribute | Observed |
|-----------|----------|
| Layout | Centered dark full-bleed photo + centered copy |
| H1 | ALL CAPS claim “up to 60%” — **63px**; accent word highlight |
| CTAs | Ghost outline primary; header solid Start a Project |
| Visual | Atmosphere photo, not product UI; avatars + short quote |
| Trust | Logo bar (tools / media) under hero |
| Tone for 30+ | Mixed: cinematic premium, but dark + AI pill + aggressive % claim can feel salesy |

**Adopt:** Social proof strip under hero; restrained CTA pairing.  
**Skip:** Dark full-bleed; ALL CAPS; unverified “60%”; AI-powered eyebrow; hand-drawn Unicode-style underlines.

### 5. eCom Gliders current — gap vs enterprise bar

| Attribute | Observed |
|-----------|----------|
| Layout | Split OK; **two** BrowserMockups stacked (busy) |
| H1 | Locked outcome line — only **36px / 600** (below all four competitors) |
| CTAs | Single navy button (low contrast vs brand chrome) |
| Visual | Product mockups without metric overlays / human proof |
| Trust | Pipe-separated text line; no badge image in hero |
| Tone | Credible copy, but under-scaled and visually quieter than Tier A/C |

---

## Enterprise pattern matrix (what “enterprise level” means here)

| Pattern | MAG | AMZ Dudes | Canopy | AMZ One Step | eCom Gliders target |
|---------|-----|-----------|--------|--------------|---------------------|
| H1 size 44px+ | Yes 48 | Yes 59 | Yes 44 | Yes 63 | **Yes 48–56 clamp** |
| Dual CTA | Yes | Yes | Yes | Soft | **Yes** |
| Proof visual (metrics/people/product) | Metrics on device | Form | People + metrics | Atmosphere | **Product mockup + metric overlays** |
| Eyebrow / badge | Soft | Rank badge | Inc / tagline | AI tag | **Verified Partner** (honest) |
| Trust under hero | Logos | Stats | Badge | Logos | **Keep trust bar + stats (existing)** |
| Form in hero | No | Yes | No | No | **No** (audit page) |
| Dark cinematic | No | No | No | Yes | **No** |
| Cursor calm product focus | Partial | No | Partial | No | **Yes** (one mockup, whitespace) |

---

## Decision for eCom Gliders (enterprise + 30+ + Cursor calm)

**Composition:** Light split (Canopy/MAG structure) + **one** Cursor-like product frame (BrowserMockup) with **1–2 metric overlay cards** (Canopy/MAG proof language using only our verified or mock-demo figures already in mockup content).

**Not form-in-hero** (AMZ Dudes) — 30+ buyers get Free Audit page, not a jammed first-screen form.

**Not dark cinematic** (AMZ One Step) — fails brand tokens and prior Design-Inspiration skip list.

**CTA system:** Accent primary Free Audit + secondary text/outline “View case studies” (Canopy “See the Proof” analogue).

**Type:** Raise H1 to competitor band (48–56px fluid); keep locked SEO string.

---

## Sources

| Source | Date | Finding | Confidence |
|--------|------|---------|------------|
| Playwright screenshots (4 URLs + ours) | 2026-09-03 | Layout, H1 sizes, CTA patterns | High |
| Design-Inspiration.md / Competitor-Analysis.md | 2026-09-02 | Tier targets, skip dark hero | High |
| SITE-SEO-MAP.md | 2026-09-02 | Locked H1 | High |
