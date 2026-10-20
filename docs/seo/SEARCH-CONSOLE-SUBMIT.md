# Google Search Console — Sitemap Submission

**Task:** P4-05  
**Updated:** 2026-09-02

---

## Sitemap URLs

| Environment | Property URL | Sitemap to submit |
|---------------|--------------|-------------------|
| Staging (now) | `https://ecom-gliders.vercel.app` | `https://ecom-gliders.vercel.app/sitemap.xml` |
| Production (cutover) | `https://ecomgliders.com` | `https://ecomgliders.com/sitemap.xml` |

Submit only after the Search Console property matches the live site URL.

---

## Pre-submission checklist (automated)

Run:

```bash
npm run verify:gsc-readiness
# Staging default; or:
npm run verify:gsc-readiness -- https://ecomgliders.com
```

Report: `docs/qa/search-console-readiness.json`

Requirements:

- `/robots.txt` HTTP 200 and references sitemap
- `/sitemap.xml` HTTP 200, valid urlset, 340+ URLs
- Sitemap `<loc>` host matches the property URL
- Property verified in Google Search Console

---

## Manual submission steps

1. Open [Google Search Console](https://search.google.com/search-console).
2. Select or add the property (Domain or URL prefix).
   - Staging: URL prefix `https://ecom-gliders.vercel.app`
   - Production: Domain `ecomgliders.com` (recommended) or URL prefix `https://ecomgliders.com`
3. Go to **Sitemaps** in the left menu.
4. Enter `sitemap.xml` (or the full sitemap URL).
5. Click **Submit**.
6. Confirm status shows **Success** (may take minutes to hours for first fetch).

---

## Production cutover

Before submitting `https://ecomgliders.com/sitemap.xml`:

1. Point DNS to Vercel (or hosting).
2. Set Vercel env `NEXT_PUBLIC_SITE_URL=https://ecomgliders.com`.
3. Redeploy: `npm run deploy:vercel:prod`
4. Re-run `npm run verify:gsc-readiness -- https://ecomgliders.com`
5. Submit sitemap in the `ecomgliders.com` property.

Do not submit the staging sitemap under the production property, or vice versa.

---

## After submission

- Monitor **Sitemaps** for "Success" and discovered URL count (~343).
- Monitor **Pages** and **Indexing** for errors after cutover.
- Copy `docs/qa/search-console-submission.template.json` to `docs/qa/search-console-submission.json` and fill in your confirmation.
- Run `npm run verify:gsc-submission` to validate the record and mark P4-05 complete.

---

## Confirmation record template

After manual submit, copy the template and save to `docs/qa/search-console-submission.json`:

Template: `docs/qa/search-console-submission.template.json`

```json
{
  "submittedAt": "ISO-8601",
  "property": "https://ecomgliders.com",
  "sitemapUrl": "https://ecomgliders.com/sitemap.xml",
  "searchConsoleStatus": "Success",
  "discoveredUrls": 343,
  "submittedBy": "name or email"
}
```

---

## Blockers

| ID | Issue | Owner |
|----|-------|-------|
| Q6 | Search Console property access not confirmed in repo | User / client |

Requires confirmation: Google account with Owner or Full user access to the target property.
