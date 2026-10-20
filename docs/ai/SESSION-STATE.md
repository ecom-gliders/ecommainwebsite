## Current objective

GitHub backup of full project; DNS cutover still pending Hostinger DNS.

## Current phase

Pushed to https://github.com/faizanMayo786/ecomgliders-site (`main`). Staging: https://ecom-gliders.vercel.app. DNS cutover: see `docs/seo/DNS-CUTOVER.md`.

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
