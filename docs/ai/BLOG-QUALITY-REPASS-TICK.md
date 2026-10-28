# Blog quality re-pass — one tick

**Queue:** `docs/ai/BLOG-TEMPLATE-LOOP-QUEUE.json`  
**Order:** `docs/ai/BLOG-TEMPLATE-LOOP-ORDER.md`  
**Advance:** `node scripts/migration/advance-blog-loop.mjs <slug> "<notes>"`

## Rules

1. Read queue. If `status !== "active"`, stop.
2. Take `order[cursor]` only. Never skip. Never parallel.
3. Read full `content/blog/{slug}.mdx`.
4. Apply checklist below with judgment. Preserve factual claims; do not invent metrics.
5. Write the fixed MDX.
6. Advance queue with notes summarizing changes.
7. Stop after one post unless the operator asked to continue the loop in the same session.

## Checklist

- [ ] Required frontmatter: slug, title, excerpt, publishedAt, updatedAt, author, categories, tags, featuredImage, seo
- [ ] Excerpt: no WP chrome (`View Calculator`, title echo spam, Ultimate Guide pollution except legitimate Prime Day post)
- [ ] `seo.metaDescription`: clean, ~150–160 chars intent, no pollution
- [ ] `seo.canonical`: `https://ecomgliders.com/{slug}/`
- [ ] No first `##` equal to title
- [ ] No Google search junk links; no `http://www.ecomgliders.com`
- [ ] Replace `* * *` HR spam with paragraph breaks
- [ ] Fix escaped heading numbers (`1\.` → `1.`)
- [ ] Allowlisted fences only (`BLOG-BLOCKS.md`)
- [ ] Professional copy (rule 13): no “dominate”, “next level”, “invaluable” padding where easy to tighten
- [ ] Keep existing `tip` + `TITLE: Impact on Sellers` when already present; do not invent takeaways
- [ ] Keep publish dates and URL slug unchanged

## Evidence language

Mark notes with what changed. Do not claim “complete” for posts you did not open.
