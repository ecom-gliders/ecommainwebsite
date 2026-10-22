# WP blog restore verification

Generated: 2026-10-22T00:14:20.073Z

## Counts

| Metric | Value |
| --- | ---: |
| Live export posts | 328 |
| Local MDX | 328 |
| Restored this run | 27 |
| Restore failures | 0 |
| Unmatched | 0 |

MDX backup: `D:\Desktop\Project\ecomgliders-site\wordpress-blog-export\mdx-backup-before-restore\2026-10-22T00-12-59-083Z`

## Spot checks (chrome-stripped WP text vs MDX)

- `boost-your-amazon-best-sellers-rank-with-12-proven-tips`: ok=true, mdx=8278, extractedText=7011, ratio=1.094, bodyH1=false
- `when-should-you-use-sponsored-display-ads`: ok=true, mdx=9070, extractedText=7208, ratio=1.176, bodyH1=false
- `amazon-growth-strategy-2026`: ok=true, mdx=6981, extractedText=6036, ratio=1.074, bodyH1=false
- `amazon-ppc-marketing-services-in-wisconsin-wi-a-path-to-maximizing-your-sales`: ok=true, mdx=9848, extractedText=9184, ratio=1.024, bodyH1=true
- `ecom-gliders-vs-sophie-society-amazon-ppc-account-management`: ok=true, mdx=3863, extractedText=4549, ratio=0.792, bodyH1=false
- `amazon-a10-algorithm-2026`: ok=true, mdx=2104, extractedText=1736, ratio=1.126, bodyH1=false
- `amazon-compliance-documents-in-2025`: ok=true, mdx=6944, extractedText=5373, ratio=1.163, bodyH1=false
- `reduce-amazon-ad-spend-with-seo-2026`: ok=true, mdx=1987, extractedText=1873, ratio=1.011, bodyH1=false
- `review-manipulation-on-amazon`: ok=true, mdx=7263, extractedText=6002, ratio=1.074, bodyH1=true
- `amazon-negative-keywords-2026`: ok=true, mdx=2740, extractedText=2361, ratio=1.086, bodyH1=false
- `beyond-rankings-ai-driven-seo-strategy`: ok=true, mdx=3255, extractedText=3011, ratio=1.042, bodyH1=false
- `ecom-gliders-vs-teikametrics-amazon-ppc-management`: ok=true, mdx=4563, extractedText=4147, ratio=1.059, bodyH1=false
- `full-amazon-account-management-services-2026`: ok=true, mdx=3187, extractedText=2823, ratio=1.086, bodyH1=false
- `how-to-reduce-acos-and-grow-sales-for-your-ecommerce-business-2`: ok=true, mdx=4313, extractedText=3927, ratio=1.04, bodyH1=false
- `predict-amazon-product-success`: ok=true, mdx=3180, extractedText=2707, ratio=1.121, bodyH1=false

## Changed content files (this restore)

- `content/blog/amazon-a10-algorithm-2026.mdx`
- `content/blog/amazon-compliance-documents-in-2025.mdx`
- `content/blog/amazon-full-account-management-maximizes-sales-roi.mdx`
- `content/blog/amazon-full-account-management-worth-it-2026.mdx`
- `content/blog/amazon-keyword-research-2026-guide.mdx`
- `content/blog/amazon-listing-optimization-2026.mdx`
- `content/blog/amazon-negative-keywords-2026.mdx`
- `content/blog/amazon-ppc-draining-your-wallet.mdx`
- `content/blog/amazon-ppc-no-conversions-2026.mdx`
- `content/blog/amazon-seller-management-services-that-actually-work.mdx`
- `content/blog/amazon-seller-support-account-management-services.mdx`
- `content/blog/amazon-seo-2026-keywords-no-longer-matter.mdx`
- `content/blog/amazon-sponsored-brands-vs-products.mdx`
- `content/blog/automation-tools-amazon-account-management.mdx`
- `content/blog/beyond-rankings-ai-driven-seo-strategy.mdx`
- `content/blog/boost-your-amazon-best-sellers-rank-with-12-proven-tips.mdx`
- `content/blog/ecom-gliders-vs-gno-partners-amazon-growth-comparison.mdx`
- `content/blog/ecom-gliders-vs-salesduo-amazon-seller-support.mdx`
- `content/blog/ecom-gliders-vs-teikametrics-amazon-ppc-management.mdx`
- `content/blog/full-amazon-account-management-services-2026.mdx`
- `content/blog/how-to-reduce-acos-and-grow-sales-for-your-ecommerce-business-2.mdx`
- `content/blog/mastering-amazon-account-management-strategies.mdx`
- `content/blog/predict-amazon-product-success.mdx`
- `content/blog/products-research-strategies-used-by-successful-amazon-sellers.mdx`
- `content/blog/reduce-amazon-ad-spend-with-seo-2026.mdx`
- `content/blog/why-your-amazon-organic-rank-dropped-suddenly.mdx`
- `content/blog/why-your-amazon-ppc-is-wasting-money-in-2026.mdx`

## Other files touched in this workstream

- `scripts/migration/export-wp-posts-live.mjs`
- `scripts/migration/analyze-wp-export-quality.mjs`
- `scripts/migration/restore-damaged-posts.ts`
- `scripts/migration/verify-wp-restore.mjs`
- `scripts/migration/lib/extract-post-html.ts`
- `src/lib/blog/normalize-heading-levels.ts`
- `src/components/blog/blog-markdown.tsx`
- `src/lib/seo/blog-post-json-ld.ts`
- `src/lib/seo/page-metadata.ts`
- `docs/qa/WP-*` reports
- `wordpress-blog-export/` (export artifacts; not site runtime)

## Confirmation

- No blog URL structure changes (`/{slug}/` preserved).
- No image re-download performed; featuredImage paths preserved on restore.
- Blog UI templates not rebuilt; pipeline/SEO helpers only.
- Unrelated marketing pages / services / case studies not modified by restore script.
