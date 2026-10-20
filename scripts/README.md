# Scripts

## Blog migration

Generate MDX blog posts from WordPress backup metadata:

```bash
npm run migrate:blog
```

- Source: `backup/metadata/api/posts-all.json` (328 posts)
- Output: `content/blog/{slug}.mdx`
- Report: `docs/qa/blog-migration-report.json`

## QA — blog URL verification

Verify all 328 blog URLs resolve on the local dev server (requires server running):

```bash
npm run dev -- --port 3002
npm run test:blog-urls
```

- Inventory: `backup/metadata/blog-inventory.json`
- Report: `docs/qa/blog-url-verification-report.json`

## Research tools

See `scripts/research-tools/` for site scrape utilities.
