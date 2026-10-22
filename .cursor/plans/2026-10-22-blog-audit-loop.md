# Blog audit loop (format only, no content loss)

## Goal

Walk every MDX post in filename order. Convert residual WP chrome/CSS into standard blocks. Preserve wording and hrefs. Fix CTA/internal/external link presentation.

## Loop (repeat until offset >= 328)

1. `node scripts/migration/audit-blog-batch.mjs --offset=N --limit=10`
2. Review `docs/qa/BLOG-AUDIT-BATCH-N-….json` flags
3. Harden sanitize plugins if new pattern family appears
4. `npx tsx scripts/migration/sanitize-blog-mdx.ts --write` (or targeted slug fix)
5. Spot-check 2–3 URLs in browser
6. Log batch result in `docs/qa/BLOG-AUDIT-LOOP-LOG.md`
7. `N += 10`

## Non-negotiables

- Do not delete prose, FAQs, or link URLs
- Convert → then strip CSS
- CTA promo clusters → `cta` fence / primary button links
- No `rehype-raw`

## Batch 0 (first 10) — in progress

Slugs: see audit JSON `BLOG-AUDIT-BATCH-0-9.json`
Also fix reported residual: `amazon-growth-strategy-2026` (hover CSS + promo CTA).
