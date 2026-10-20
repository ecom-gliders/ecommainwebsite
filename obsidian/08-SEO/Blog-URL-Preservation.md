# Blog URL Preservation

## Rule

Every existing blog URL on ecomgliders.com must resolve on the new site with the identical path.

## Why

Changing blog URLs breaks existing Google rankings, backlinks, and indexed pages.
This is the highest priority constraint for the migration.

## Process

1. Crawl or export all blog URLs from current site
2. Record each URL in `docs/seo/URL-INVENTORY.md`
3. For each post record:
   - Full URL path
   - Post title
   - Publish date
   - Modified date
   - Author
   - Categories and tags
   - Meta title and description
   - Canonical URL
   - Featured image URL
   - Internal links within the post
4. New site routing must match every path exactly
5. If a path cannot be preserved, document reason and create 301 redirect
6. Verify every URL in staging before production cutover
7. Monitor Search Console for 404 errors after launch

## Export methods (try in order)

1. WordPress REST API at `/wp-json/wp/v2/posts`
2. Sitemap XML blog entries
3. Playwright crawl of blog index with pagination
4. Manual export from hosting panel

## Redirect rules

- Prefer identical paths over redirects
- 301 only when path must change
- Never 302 for permanent content moves
- Maintain redirect map in `docs/seo/REDIRECT-MAP.md`

## Verification checklist per blog post

- [ ] URL resolves with 200 status
- [ ] Title matches or improves (not degrades)
- [ ] Meta description present
- [ ] H1 present and correct
- [ ] Content complete (no truncation)
- [ ] Images load
- [ ] Internal links work
- [ ] Canonical is correct
- [ ] Structured data validates
- [ ] Publish date preserved

## Related notes

- [[Migration-Strategy]]
- [[SEO-Architecture]]
- [[URL-Inventory]]
