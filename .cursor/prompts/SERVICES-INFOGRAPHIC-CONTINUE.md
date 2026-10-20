# SERVICES DETAIL — INFOGRAPHIC + PROOF ENRICHMENT (MASTER CONTINUE)

You are the executing agent for eCom Gliders service DETAIL page visual enrichment.
Project: custom Next.js site migrating https://ecomgliders.com/
Local: http://localhost:3000
Service URLs stay root `/{slug}/` (never move under `/services/{slug}/`).
Blog URLs must remain identical paths. Do not invent redirects.

## MISSION

Service pages already have hybrid mid-page modules from Wave A1–D3
(`browserProof`, `comparisonTable`, `processSteps`, `metricChart`, `proofGallery`, `checklistMatrix`).
User feedback: detail pages still feel too static / lack infographics; `browserProof` twin cards looked weak.

**E0 (shared renderer):** `browserProof` uses Hero Stage + Corroborating Device in
`src/components/services/modules/browser-proof-stage.tsx` — ink stage, desktop dominant,
optional phone overlap, captions/disclaimer outside frames. Do not reintroduce twin equal cards.

**E-wave:** add intent-fit visuals (real proof crops and/or AI system infographics) page by page.
Content JSON + Zod remain source of truth. PO ink/lime/hard chrome.
No purple AI aesthetic. No emoji icons. Professional agency English.

## CONTINUE PROTOCOL

1. On every user message that is CONTINUE / APPROVE / NEXT: do exactly ONE slug from the queue.
2. If E0 not COMPLETE (browserProof still twin cards), finish E0 first.
3. Read before build:
   - `docs/ai/SESSION-STATE.md`
   - `docs/project/SERVICE-LAYOUT-RECIPES.md`
   - `.cursor/prompts/SERVICES-INFOGRAPHIC-CONTINUE.md` (this file)
   - `.cursor/prompts/SERVICES-VISUAL-CONTINUE.md` (prior wave)
   - `content/config/services/{slug}.json`
   - `docs/research/GROWTH-PROOF-INVENTORY.md`
   - `docs/research/DOWNLOAD-LOG.md`
   - rules 00, 06, 08, 09, 12, 13 + skills research, seo-audit, asset-management
4. Research + counsel BEFORE editing (same turn):
   - Load local `/{slug}/` (Playwright)
   - State modules + whether image-bearing module exists
   - Check growth inventory for real crop
   - Decide: REUSE vs GENERATE AI system infographic vs BOTH
   - Write 5–8 line recipe
5. Implement that slug only.
6. Verify, log, update recipes + SESSION-STATE.
7. STOP until user says CONTINUE.
8. When queue COMPLETE, report QUEUE COMPLETE.

## QUEUE (highest visual debt first)

| Order | Slug |
|------:|------|
| 1 | amazon-catalog-management |
| 2 | amazon-trademark-brand-registry |
| 3 | amazon-company-registration |
| 4 | amazon-product-sourcing |
| 5 | email-retention-marketing |
| 6 | shopify-website-development |
| 7 | tiktok-shop-ads |
| 8 | amazon-listing-optimization |
| 9 | amazon-content-writing |
| 10 | amazon-video-creative |
| 11 | amazon-visual-creativity |
| 12 | amazon-dsp-management |
| 13 | full-service-amazon-agency |
| 14 | amazon-ppc-management-agency |
| 15 | amazon-reporting-analytics |

## VISUAL DECISION RULES (LOCKED)

### Intent mapping

- PPC / DSP / reporting / full-service: prefer real `browserProof` + Verified `metricChart`. Never AI-fake dashboards with numbers. Use E0 stage only.
- Listing / content: `proofGallery`; AI listing-anatomy OK with honest caption.
- Creative / video: real showcase first; AI only for missing frame types.
- Ops / catalog / compliance / sourcing: MUST add image-bearing visual (AI system/process infographic default) + keep process/checklist/comparison.
- Channels: complementary-stack or lifecycle diagram; no Amazon-replacement claims; no invented GMV/ROI.

### AI image generation rules

- Generate only when no honest real proof exists for the teaching job.
- Subject = system diagram / workflow / anatomy — not fake metrics.
- Style: ink #131311, lime #C6FD50, hard chrome; no purple, no glow maze, no emoji.
- Captions: illustrative/conceptual when AI.
- Save to `public/images/services/{slug}/`; log `docs/research/DOWNLOAD-LOG.md`.
- Prefer Cursor GenerateImage. Validate visually.

### Anti-patterns

1. Mid-page with zero images
2. Twin equal browserProof cards (use E0 stage)
3. Generic process steps reusable on any service
4. Unrelated creative stills without honest captions
5. Invented ROI, approval timelines, cost-cut %, or rank promises

## CLAIMS AND EVIDENCE

- Evidence language: Verified / Observed / Assumed / Proposed / Requires confirmation / Not yet tested.
- Do not invent metrics or case results.
- Compliance pages: keep “not legal advice” / “no promise of approval”.

## IMPLEMENTATION SCOPE PER TURN

- Update `content/config/services/{slug}.json` modules
- Add assets as decided
- Touch shared components only if required
- Update `docs/project/SERVICE-LAYOUT-RECIPES.md` E-wave note
- Update `docs/ai/SESSION-STATE.md` + `docs/ai/CHAT-SUMMARIES.md`
- Append `docs/qa/VERIFICATION-LOG.md`

## VERIFICATION

- Playwright desktop (~1440) + mobile (~390)
- At least one image-bearing mid-page module
- No invented numeric claims on new visuals
- URL `/{slug}/` intact
- Screenshot evidence

## STATUS BLOCK

STATUS: <IN PROGRESS | COMPLETE | BLOCKED | QUEUE COMPLETE>
IMPLEMENTED: <slug + what changed>
VERIFIED: <checks>
DOCUMENTED: <files>
REMAINING: <next slugs>
NEXT ACTION: CONTINUE → <next-slug> | QUEUE COMPLETE | APPROVE staging

## HARD STOPS

- One slug per CONTINUE (unless user explicitly orders a full queue run).
- No deploy unless APPROVE.
- No blog/service path changes.
- When order 15 COMPLETE → QUEUE COMPLETE and stop.
