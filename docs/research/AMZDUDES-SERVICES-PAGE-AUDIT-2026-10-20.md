# AMZ Dudes services-page audit

**Date:** 2026-10-20  
**Clarification:** User request said “AMC Dood”; project competitor inventory maps this to **AMZ Dudes** (`https://amzdudes.com/`). No public “AMC Dood” Amazon agency matched.  
**Method:** Playwright (live DOM + screenshots) + WebFetch.  
**Confidence:** High for structure and layout patterns; medium for visual chrome details beyond sampled sections.

## Pages inspected

| URL | Role |
|-----|------|
| https://amzdudes.com/ | Homepage / service overview |
| https://amzdudes.com/amazon-marketing-agency/ | Full-service marketing hub (numbered services) |
| https://amzdudes.com/amazon-account-management-services/ | Parent service with nested sub-capabilities |

Evidence screenshots:
- `docs/research/evidence/amzdudes-account-mgmt-hero.png`
- `docs/research/evidence/amzdudes-account-mgmt-results.png`

---

## QUESTION

How does AMZ Dudes structure services (parent → sub-services), proof/results, and page layout — and what should eCom Gliders borrow for `/services/` without copying claims or wording?

---

## EVIDENCE — Layout and section spine

### Parent service: Account Management

Observed section order (H2 spine):

1. Hero H1 + problem framing + trust strip + **lead form in hero**
2. At-a-Glance summary
3. Who it’s for (buyer checklists)
4. Flat “What it includes” checklist
5. **Numbered 01–08 rail** — each sub-capability under the parent
6. Seller Central vs Vendor Central split
7. Dedicated account manager role
8. Coordination value explanation
9. Pricing models (no dollar amounts)
10. **Results** — three metric-led case cards
11. Team bios
12. Testimonials
13. “Numbers straight from the account” (Seller Central screenshot strip)
14. Reporting visibility + outcome-tracking table
15. Timeline process (Day 1 → Active Management)
16. FAQ + final CTA
17. Weakness: long footer of keyword-stuffed H3 CTAs (do not copy)

### Marketing agency page

Same conversion patterns: hero + form, audience segments, **numbered 01–07 services**, process 01–05, category chips, results, reporting, FAQ.

---

## EVIDENCE — Parent → sub-service model

**Pattern (Verified):** One parent product (Full-Service Account Management / Amazon Marketing Agency) owns a **numbered capability rail**. Each item is a real workstream with 1–2 sentences of scope, not a separate equal-weight category card.

Account Management rail (Observed):

| # | Sub-service |
|---|-------------|
| 01 | Amazon PPC Management (incl. DSP/AMC where appropriate) |
| 02 | Listing optimization and Amazon SEO |
| 03 | Catalog management |
| 04 | A+ Content and Brand Store |
| 05 | Product launches and promotions |
| 06 | FBA inventory and reimbursements |
| 07 | Account health and compliance |
| 08 | Ongoing Amazon operations |

Framing: sub-services are **included under the parent engagement**, not a flat catalog of peers.

---

## EVIDENCE — Proof / results design

| Pattern | Observation | Confidence |
|---------|-------------|------------|
| Metric-led case cards | Large bold outcome text (`11×`, `$7.72M+`, `165%→61%`) as the visual hook; short factual body | High |
| Metric color | Sampled computed color `rgb(255, 122, 0)` (orange accent), weight 800, ~24px — **not green** | High |
| Trust strip | Rating · revenue scaled · brands served near hero | High |
| Screenshot proof | Seller Central / account data strip (“straight from the account”) | High |
| Outcome table | Expectation → measured result → status (Achieved / Measuring) | High |
| Testimonials | Named quotes after results | High |

**Inference (not Verified as design intent):** Large outcome numbers work because they dominate the card; color is brand accent. For eCom Gliders, user preference is **large green outcome text** — map to design-system `success` (`#067D62`) or a dedicated proof accent, not body copy color.

---

## EVIDENCE — Overall design patterns

- Conversion-first: form in hero, month-to-month / no long contracts messaging
- Numbered rails for scannability
- Short paragraphs + checklist density (not essay blocks)
- Proof early and repeated (hero strip + results + screenshots)
- Process as a short timeline, not a long “operating system” essay
- Avoid: emoji-heavy chrome, keyword-stuffed footer CTAs (Observed weakness)

---

## eCom Gliders `/services/` contrast (Observed staging 2026-10-20)

Staging: https://ecom-gliders.vercel.app/services/

Present: hero, four equal category grids, stack process, four company-stat proof tiles, featured results component (JSON has 3 cases), FAQ, CTA.

Gaps vs AMZ Dudes IA (and vs user pain):

- No true **parent → nested sub-service rail**; categories treat PPC, Trademark, Shopify, TikTok as peers
- `flagship` block in JSON is only wired as a hero CTA — **flagship heading/body section not rendered** (Verified in `services-index-template.tsx`)
- Results use equal bordered cards with metric as `text-primary` (ink), not a dominant green/asymmetric layout
- Proof heading copy is long / abstract (“Built for Amazon brands that need accountable operators”)
- Channels/DTC and Brand ops sit as full pillars on the hub (mission dilution)

---

## CONCLUSION

Steal **structure**: parent Full-Service container + numbered Amazon sub-service rail + metric-dominant case rows + thin verified trust strip.  
Do **not** steal: AMZ Dudes metrics, orange branding, hero lead-form as mandatory, screenshot claims, or footer SEO spam.

---

## UNCERTAINTY

- Whether AMZ Dudes has a single `/services/` index equivalent; primary research used account-management + marketing-agency as the services IA models.
- Exact responsive layout of every section beyond hero + results screenshots.

---

## NEXT ACTION

Draft template documented in `.cursor/plans/2026-10-20-services-hub-redesign-template.md`. Implementation only after user approval.
