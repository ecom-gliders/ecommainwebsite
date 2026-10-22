# Blog template sequential loop (armed / paused)

**Created:** 2026-10-23  
**Status:** `completed` — all 328 posts processed (layout-only). Helpers: `apply-geo-ppc-layout.mjs`, `apply-guide-layout-basics.mjs`, `strip-wp-form-chrome.mjs`, `advance-blog-template-loop.mjs`. Queue: `docs/ai/BLOG-TEMPLATE-LOOP-QUEUE.json`  
**Queue:** [`docs/ai/BLOG-TEMPLATE-LOOP-QUEUE.json`](../../docs/ai/BLOG-TEMPLATE-LOOP-QUEUE.json)  
**Full order:** [`docs/ai/BLOG-TEMPLATE-LOOP-ORDER.md`](../../docs/ai/BLOG-TEMPLATE-LOOP-ORDER.md)

## Totals

| Field | Value |
|-------|--------|
| Blogs in loop | **328** |
| First | `amazon-ppc-conversion-cost-calculator` (2024-12-15) |
| Last | `when-should-you-use-sponsored-display-ads` (2026-07-20) |
| Sort | `publishedAt` ascending, then `slug` ascending |
| Mode | Sequential only (never parallel) |

## Standards (apply every tick)

1. [`docs/project/BLOG-TEMPLATES.md`](../../docs/project/BLOG-TEMPLATES.md) — post shell / frontmatter / URL / image policy  
2. [`docs/project/BLOG-BLOCKS.md`](../../docs/project/BLOG-BLOCKS.md) — fence allowlist + canonical chart/figure/video  
3. [`content/config/blog-blocks.json`](../../content/config/blog-blocks.json) — config source of truth  
4. Professional copy rule (`.cursor/rules/13-professional-copy.mdc`) when wording is unprofessional  
5. SEO URL preservation — keep root `/{slug}/` paths

## Per-tick protocol (when activated)

1. Read queue JSON → current `cursor` item.  
2. Read that post’s MDX + frontmatter end-to-end.  
3. Context-aware apply: adapt template/blocks to **this** post’s structure (do not blind-paste fences or invent metrics).  
4. Verify frontmatter schema + body conventions.  
5. Mark item `completed` (or `failed` with reason), increment `cursor`, write queue.  
6. Stop until next tick. One blog per wake.

## Activation

Set `status` from `armed_paused` → `active` in the queue JSON (or explicit user go-ahead). Then wake one post at a time.

## Rebuild order

```bash
node scripts/migration/build-blog-template-queue.mjs
```

Re-running rebuilds the pending queue from disk (resets cursor). Prefer manual edits to status fields once the loop has started.
