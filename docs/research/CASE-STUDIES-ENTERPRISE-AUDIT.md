# Case Studies Enterprise Audit

**Date:** 2026-10-15  
**Status:** Verified research + implementation brief  
**Scope:** Hub `/case-studies/` and details `/case-study-1/`–`/case-study-9/`

## Verdict

Live ecomgliders.com already has enterprise-grade case content for all nine studies. Staging/migration JSON and a single linear template are the gap. Content reconcile (with Elementor contamination cleanup) is the critical path before layout chrome.

## Competitor pattern summary (Observed)

| Pattern | AgentsUp | Olifant | Canopy | Sellexio | EG live | EG staging (pre-fix) |
|---------|----------|---------|--------|----------|---------|------------------------|
| KPI-first cards | Strong | Strong | Strong | Strong | Strong | Weak |
| Timeframe on card | Medium | Weak | Medium | Strong | Present in meta | Missing |
| Named vs withheld honesty | Strong | Named | Mixed | Named | Named | Often anonymized |
| Before/after pairs | Strong | Medium | Medium | Strong | Strong | Only GoSports deep |
| Unique method per study | Strong | Strong | Strong | Strong | Strong | Weak (templated) |
| Separate SEO detail URLs | Anchor | Yes | Yes | Long page | Yes | Yes (keep) |

EG fit: boutique premium proof (Olifant/Canopy cues) + AgentsUp honesty labels when needed + Sellexio before/after depth. Do not invent awards or competitor-scale aggregates.

## Live vs migrated gap (Verified)

| Slug | Live client | Live primary metrics | Migrated issue |
|------|-------------|----------------------|----------------|
| 1 | FARBERWARE | Revenue $23.1K→$40K (+73%); CVR; ACOS | Anonymized; generic 3 steps |
| 2 | CULTURELLE | 502 units; CVR 19.2%; $9,850 | 500 units; generic steps |
| 3 | VoltTech Accessories | ACOS 76→37%; spend −32% | Metric "Profitable"; stub results |
| 4 | NIKKETTA | CVR 11.3→22.1% | Soft "2X"; stub results |
| 5 | FOCUS DESIGN | 1,038 units / 17 days | Soft "Sell-out"; contaminated strategy on live |
| 6 | TIME TIMER | €18,450; ROAS 4.8x | Soft "EU growth" |
| 7 | Safefine | CVR 10.1→28.9% | Soft "3X"; stub results |
| 8 | FocusForm | $19K→$118K; 1→7 SKUs | Soft "7-figure"; stub results |
| 9 | GoSports | 310%; full KPI set | Challenge truncated after "due to:" |

## Elementor contamination (Risk)

- Detail pages may show wrong H1 fragments from other studies.
- case-study-5 includes Culturelle/supplement strategy blocks under Focus Design; metrics table is correct.
- Extraction rule: trust `Client:` / `Market:` / `Duration:` meta + results tables; drop cross-vertical paste; do not trust polluted H1 alone.
- Migration generator `extractChallenge` strips after `Key issues:` — do not re-run as sole source.

## Live hub hierarchy (north star)

1. Proof-led hero copy  
2. Logo / trusted-by strip (licensed marks only)  
3. Featured 310% outcome (GoSports)  
4. Named KPI cards + service filters  
5. Since-2018 proof band (verified claims only)  
6. Free Audit CTA  

## Layout map

| Slug | Layout | Notes |
|------|--------|-------|
| case-study-9 | flagship | Sticky KPI aside (desktop) |
| case-study-3 | efficiency | Before/after ACOS band |
| case-study-4, 7 | creative | CVR before/after; gallery optional |
| case-study-2, 5 | launch | Units + duration timeline |
| case-study-1, 6, 8 | expansion | Markets / multi-metric |

URLs stay `/case-study-N/` (no brand-slug rename in v1).

## SEO / assets gaps

- `docs/seo/URL-INVENTORY.md` lacked case-study table — added with this work.
- SITE-SEO-MAP hub title: align JSON metaTitle to map.
- Featured images on WP CDN — mirror to `public/images/cases/`.
- JSON-LD: CollectionPage + Article; add `dateModified` when known.
- Homepage strip: sync brand names/metrics to live when authorized.

## Acceptance criteria (Niche standards)

- Filterable index  
- Detail: before/after or ≥3 hard metrics  
- Named client quote when available from live Client Feedback  
- Related studies + Free Audit CTA  
- No invented metrics; no emoji in UI chrome  

## Sources

- Live: ecomgliders.com hub + case-study-1…9 (Playwright/fetch 2026-10-15)  
- Competitors: AgentsUp, Olifant, Canopy, Sellexio, AMZ Dudes, My Amazon Guy, Sequence  
- Repo: case-studies.json, generate-case-studies-config.ts, Page-Templates.md, SITE-SEO-MAP.md  
