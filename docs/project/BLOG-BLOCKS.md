# Blog body blocks (configurable)

**Status:** Implemented 2026-10-22  
**Config:** [`content/config/blog-blocks.json`](../../content/config/blog-blocks.json)  
**Registry:** [`src/lib/blog/blocks/`](../../src/lib/blog/blocks/)  
**Sanitize:** `npx tsx scripts/migration/sanitize-blog-mdx.ts --write`  
**Canonical media:** `blog-blocks.json` → `canonical` (also mirrored in `design-system.json` → `blogEditorial`)

## Rules

1. Convert WordPress visual structures into allowlisted fences or GFM — do not delete card/step/timeline copy.
2. No `rehype-raw`. Unknown fences are not rendered as HTML.
3. Wording stays the same; only layout chrome is standardized to eCom Gliders tokens.
4. New WP class: add `wpMatchers` in JSON + optional sanitize plugin under `src/lib/blog/blocks/sanitize/plugins/`, then re-run sanitize.

## Canonical chart / figure / video (required)

| Pattern | Fence | Rule |
|---------|-------|------|
| Multi-column chart with % | `chart-cards` | Column bars + secondary notes (cost/impact). Canonical for `**Chart:**` captions. |
| Explicit numeric series | `bar-chart` | `ORIENTATION: vertical` or `horizontal` |
| Figure / in-body image | `figure` or markdown `![alt](src "caption")` | Ink border, 16:9 frame, hard shadow |
| Video | `video-card` | YouTube/Vimeo in-page embed (`MODE: embed`). Other hosts: `MODE: link` + poster. No raw iframes in MDX. |

Do not ship text-only card grids for Chart captions when percentages exist. Advanced chart fences (`pie-chart`, `histogram`, `line-chart`, `radial-gauge`, `sparkline`) are allowed when the data shape requires them — still only with article-sourced values.

## Allowlisted fences

| Fence | Lines | Component |
|-------|-------|-----------|
| `feature-grid` | `Title \| Description` | `BlogFeatureGrid` |
| `callout` / `tip` / `warning` | optional `TITLE:` then markdown | `BlogCallout` |
| `steps` | `Title \| Description` or `1. Title \| …` | `BlogSteps` |
| `timeline` | `Label \| Body` | `BlogTimeline` |
| `metric-bars` | `Label \| 95` | `BlogMetricBars` |
| `chart-cards` | headers + pipe rows | `BlogChartCards` |
| `chart-ranked` | `Label \| detail \| pct` | `BlogChartRanked` |
| `bar-chart` | `TITLE` + `ORIENTATION` + rows | `BlogBarChart` |
| `pie-chart` | `TITLE` + `VARIANT: pie\|donut` + rows | `BlogPieChart` |
| `histogram` | `TITLE` + `Y:` + bins | `BlogHistogram` |
| `line-chart` | `TITLE` + `VARIANT: line\|area` + points | `BlogLineChart` |
| `radial-gauge` | `TITLE` + `Label \| pct` | `BlogRadialGauge` |
| `sparkline` | `TITLE` + `Label \| v1, v2…` | `BlogSparkline` |
| `stat-row` | `value \| label` | `BlogStatRow` |
| `compare-columns` / `pros-cons` / `media-compare` | markdown H2 sections | compare components |
| `definition-list` / `checklist` / `pull-quote` / `insight` | term/list/quote | editorial |
| `figure` | `src \| alt \| caption` | `BlogFigure` |
| `video-card` | `title \| href \| poster \| caption` | `BlogVideoCard` |
| `formula` / `markets` / `case-snapshot` / `persona-tabs` / `resource` | see DS page | editorial |
| `cta` | `Title \| Desc \| Label \| href` | `BlogCtaBlock` |

Catalog with live previews (noindex): `/design-system/blog`

Inline markdown links to audit/contact/quote paths also render as primary buttons (label + ArrowRight).

Also supported: `:::feature-grid` … `:::` directives (normalized to fences at render).

Comparison tables and CTA buttons become GFM tables / markdown links (no custom fence).

Values in charts must already exist in the article — components never invent metrics.

## Adding a pattern

1. Append a block object to `blog-blocks.json` (`patternId`, `fenceLanguage`, `componentId`, `sanitizeRuleId`, `wpMatchers`).
2. If new UI: add component under `src/components/blog/` and wire it in `registry.tsx`.
3. If new convert logic: add plugin and register it in `CONVERT_THEN_CLEAN_PLUGINS`.
4. Dry-run sanitize, then `--write`. Spot-check sample slugs.
