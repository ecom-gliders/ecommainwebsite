# Services pattern register

Tracks unique visual devices claimed by each service page so later pages do not reuse the same primary layout.

## Global rules (all service pages)

1. **Hero form required** — every service hero includes the intake form (no mid-page-only lead band as the primary form).
2. **Shared shell width** — use `ServicePageShell` (`container-page`) so sections do not jump gutters.
3. **No text-only sections** — every section must include a visual (diagram, chart, graph, map, timeline, matrix, sparkline, image, or similar). Vary visual types across sections and across pages so no two sections feel the same.
4. **Brand tokens only** — share color/type; do not clone About / Contact / Free Audit chrome.
5. **Dark sections** — headings and body use `text-text-on-dark` (white / high opacity); never black ink on ink.
6. **Fill-fill hero** — left visual board and right form always stretch to the same height (`items-stretch`). No hollow gap under the shorter column. Grid cells in a row/board must be equal size (no skinny 4th column).
7. **No lime chip strips in FAQs** — readiness/match visuals use equal bordered cards, not scattered accent pills.
8. **Hero left must differ by service** — keep the lime intake form, but do not repeat the same white/gray bordered “ledger box + black header” on every page. Vary background (dark, wash, split) and left device (dials, spine, rings, pulses, etc.).

## Build order (unique pages program)

1. Full-service — **shipped**
2. PPC — **shipped**
3. Listing optimization — **shipped 2026-10-23** (`listingPdpStack`)
4. Content writing — **shipped 2026-10-23** (`contentCopyDesk`)
5. Visual creativity — queued
6. Catalog management — queued
7. DSP management — **shipped 2026-10-23**
8. Reporting and Analytics — **shipped 2026-10-23** (`reportingLedger`)
9. Account Operations — **shipped 2026-10-23** (`accountOpsShift`)
10–20. video → trademark → company reg → sourcing → Shopify → TikTok → email → launch → inventory → Seller Central → account health

| Device | Claimed by | Status |
|--------|------------|--------|
| Compact command-lane / 2x2 board hero + hero form | Full-service | Shipped |
| Ownership ring diagram + manifesto | Full-service | Shipped |
| Ink ticket rail with severity bars | Full-service | Shipped |
| Fit continuum axis + rail lists | Full-service | Shipped |
| Lime issue/fix/verify ops lanes | Full-service | Shipped |
| Coverage station map grid | Full-service | Shipped |
| Growth Seller screenshots strip | Full-service | Shipped |
| Ads cockpit hero (efficiency dials) + hero form | PPC | Shipped |
| Waste-mix pie / radar problem | PPC | Shipped |
| Ranked horizontal fit bars | PPC | Shipped |
| 2x2 differ matrix | PPC | Shipped |
| Conversion funnel stages | PPC | Shipped |
| Channel mix stacked bar + coverage cards | PPC | Shipped |
| Proof sparklines | PPC | Shipped |
| FAQ + match-type ladder | PPC | Shipped |
| DSP reach-lattice hero (funnel rings) + hero form | DSP | Shipped 2026-10-23 |
| Signal-leak waterfall problem | DSP | Shipped |
| Orbital audience cards | DSP | Shipped |
| Lime altitude / flight bands | DSP | Shipped |
| Coverage lattice node grid | DSP | Shipped |
| Readiness gate table | DSP | Shipped |
| DSP vs Sponsored role index bars | DSP | Shipped |
| Area-chart proof cards | DSP | Shipped |
| FAQ + readiness gate chips | DSP | Shipped |
| Decision-ledger hero (KPI pulse bars) + hero form | Reporting | Shipped 2026-10-23 |
| Export-dump stacked sheets problem | Reporting | Shipped |
| Decision-seat audience columns | Reporting | Shipped |
| Dual cadence track (weekly / monthly) | Reporting | Shipped |
| Metric-pack sparkline cards | Reporting | Shipped |
| Weekly decision board sheet table | Reporting | Shipped |
| FAQ + cadence equal cards | Reporting | Shipped |
| Shift-board hero (lime wash + vertical sync spine, no ledger box) + hero form | Account Ops | Shipped 2026-10-23 |
| Vendor tug-of-war problem | Account Ops | Shipped |
| Mix-seat audience columns | Account Ops | Shipped |
| Dark connected pipeline steps | Account Ops | Shipped |
| Runbook status-rail cards | Account Ops | Shipped |
| Ink handoff rail (issue/fix/verify rows) | Account Ops | Shipped |
| Weekly ops ownership sheet | Account Ops | Shipped |
| FAQ + coverage equal cards | Account Ops | Shipped |
| Light SERP→PDP hero (search bar + mini listing mock + index tags) + hero form | Listing | Shipped 2026-10-23 (rebuilt) |
| Dark keyword index heatmap problem | Listing | Shipped |
| Buyer-path chevron stages | Listing | Shipped |
| Zigzag rewrite-layer timeline | Listing | Shipped |
| Keyword→field placement matrix | Listing | Shipped |
| Circular field-strength meters | Listing | Shipped |
| Vertical CVR lift columns | Listing | Shipped |
| Generic vs system split compare rail | Listing | Shipped |
| Index-growth proof tick rows | Listing | Shipped |
| Dark index-status FAQ legend | Listing | Shipped |
| Search-bar close CTA | Listing | Shipped |
| Paper manuscript copy-desk hero (strike→rewrite lines) + hero form | Content | Shipped 2026-10-23 |
| Spec-dump vs shopper-scan split problem | Content | Shipped |
| Binder-tab audience columns | Content | Shipped |
| Horizontal typeset ruler / type rail | Content | Shipped |
| Overlapping paper deliverable sheets | Content | Shipped |
| Publish-gate stamp cards (claim board) | Content | Shipped |
| Before/after paired CVR type blocks | Content | Shipped |
| Quote-block differ + editorial redlines | Content | Shipped |
| Pull-quote proof cards | Content | Shipped |
| Voice-register FAQ legend | Content | Shipped |
| Manuscript submit close | Content | Shipped |
| Ink story-bleed / portrait team | About | Forbidden on services |
| Lime multi-step wizard | Contact | Forbidden on services |
| Scorecard mosaic | Free Audit | Forbidden on services |

Update this file when each service page ships.
