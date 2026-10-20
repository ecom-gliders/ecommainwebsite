# Header Nav, Ribbon Bar, and CTA Research

**Date:** 2026-09-02  
**Method:** Live Playwright inspection + existing `docs/seo/COMPETITIVE-RESEARCH.md` / Competitor-Analysis  
**Confidence:** High for nav labels observed; Medium for conversion lift of any single pattern

---

## QUESTION

1. Which primary nav tabs do Tier A–C Amazon agencies use that eCom Gliders may be missing?
2. What makes a professional announcement / ribbon bar?
3. How do competitors style the header CTA (vs our navy “Free Audit” block)?

---

## EVIDENCE — Nav tabs (Observed 2026-09-02)

| Agency | Primary nav pattern | Header CTA |
|--------|---------------------|------------|
| Olifant Digital | Services mega (Amazon Services…), Case Studies, Tools | “Free Marketing Plan” (text + underline, not solid box) |
| Sequence Commerce | Solutions mega, Marketplaces, deep channel links | “Get a free audit” / “Book a strategy call” |
| Canopy Management | Services, The Team, The Tech, The Results, Resources | “Get In Touch” / free audit |
| My Amazon Guy | Resources hub (News, Articles, Webinars), Careers, Partnership | “Free Audit” / account audit |
| AMZ Dudes | Large Services mega only (Account, Marketing, Design…) | “Get my audit” |
| SalesDuo | Services, Solutions, Resources (Customers, Cases, Blog, About) | “Book Your 1:1 Growth Call” |

**eCom Gliders today:** Services · Case Studies · About · Blog · Contact + Free Audit

### Tabs often present elsewhere, missing for us

| Tab / pattern | Who has it | Add now? | Why |
|---------------|------------|----------|-----|
| Resources hub | Canopy, MAG, SalesDuo, Sequence | Later | Needs landing page grouping Blog + tools; Blog already in nav |
| Tools / calculators | Olifant, Sequence | Later | No live tools yet; empty tab hurts trust |
| The Team (top-level) | Canopy | No | Covered by About; avoid nav bloat |
| The Results | Canopy | No | Case Studies already covers |
| Solutions (separate from Services) | Sequence, SalesDuo | No | Duplicates Services mega for our scale |
| Careers / Events | MAG | No | No career/events product yet |
| Phone in header (utility) | AMZ Dudes, many mid-market | Yes (utility) | Conversion path without new page |
| Ask AI strip | AMZ Dudes | No | Novelty; not our brand |

**Conclusion (nav):** Current 5 items + CTA is aligned with Tier B “5–7 items max” (`Niche-Website-Standards`). Do **not** add Resources/Tools/Solutions until pages exist. Highest-value gap: **desktop phone link** beside CTA, not another tab.

---

## EVIDENCE — Ribbon / announcement bar

| Agency | Pattern | Takeaway |
|--------|---------|----------|
| Olifant | One line: rating · revenue metric · “See client results →” | Single sentence, middot separators, arrow link — not pipe soup |
| Sequence | Awards strip above nav | Social proof strip is expected at Tier A |
| eCom Gliders | Three claims + `\|` + “View case studies” | Correct content; separators and CTA affordance can match Olifant |

**Conclusion (ribbon):** Keep Verified Partner + $112M+ + 95%. Use CSS hairline separators (no Unicode middots/pipes/emoji); lead with lucide BadgeCheck; case-studies link uses lucide ArrowRight.

---

## EVIDENCE — Header CTA styling

| Pattern | Agencies | Look |
|---------|----------|------|
| Text / underline CTA | Olifant | Premium, not “blocky” |
| Filled high-contrast CTA | AMZ Dudes, SalesDuo, Canopy | Conversion-first |
| eCom Gliders | Solid navy PrimaryButton | Matches logo navy → CTA does not stand out; reads as a heavy box |

Design system already documents secondary as underline-text (Amazon/Microsoft/Apple) and primary as navy with accent hover. For **header conversion CTA**, industry mid-market uses a distinct accent fill so the action is not confused with chrome.

**Conclusion (CTA):** Header Free Audit → accent fill + lucide `ArrowRight` + refined padding. Keep navy primary for forms/secondary bands where brand weight matters.

---

## IMPLEMENTED (same session)

- Accent header CTA with ArrowRight
- Announcement bar: BadgeCheck, middot separators, ArrowRight on link
- Optional desktop phone with Phone icon beside CTA

## NOT IMPLEMENTED (requires content)

- Resources top-level tab
- Tools tab
- Solutions rename

## NEXT

User review local header; redeploy staging when approved.
