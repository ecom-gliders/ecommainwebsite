## Current objective

GitHub backup push to `faizanMayo786/ecomgliders-site` (full project + Obsidian + Cursor transcripts).

## Current phase

Preparing initial git commit and push. DNS cutover still blocked on Hostinger DNS (see `docs/seo/DNS-CUTOVER.md`). Staging: https://ecom-gliders.vercel.app

## Completed (cutover)

- Attached `ecomgliders.com` + `www.ecomgliders.com` to project (API)
- WWW → apex 308 redirect configured
- Cutover runbook: `docs/seo/DNS-CUTOVER.md` with exact TXT / A / CNAME values

## Blocker

Hostinger hPanel login required to publish DNS. Current NS Observed: `ns1.dns-parking.com` / `ns2.dns-parking.com`. Live WP still serves apex until A/CNAME change.

## User action (required)

In Hostinger DNS for `ecomgliders.com`, add records from `docs/seo/DNS-CUTOVER.md`, then reply **verify dns** so we can:

1. `vercel domains verify` apex + www  
2. Set `NEXT_PUBLIC_SITE_URL=https://ecomgliders.com`  
3. Redeploy production  
4. Smoke-check live URLs  

## Live

- Staging / current prod alias: https://ecom-gliders.vercel.app
- Apex cutover: pending DNS
