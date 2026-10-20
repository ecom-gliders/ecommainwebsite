# DNS cutover — ecomgliders.com → Vercel

**Status:** Domains attached to project `ecom-gliders` (Verified via API). Ownership TXT + traffic DNS still pending at registrar (Hostinger / dns-parking).

**Date opened:** 2026-10-20

## Vercel project

- Project: `ecom-gliders` (`prj_mPq1xrmyVqhxaILHNqrLkRCaxhar`)
- Team: `faizanmayo786s-projects`
- Staging alias (live now): https://ecom-gliders.vercel.app
- Apex: `ecomgliders.com` (attached, not verified)
- WWW: `www.ecomgliders.com` → 308 redirect to `ecomgliders.com` (configured)

## Required DNS records (Hostinger DNS / current NS)

Current nameservers Observed: `ns1.dns-parking.com`, `ns2.dns-parking.com` (parking). Update DNS where those NS are managed (usually Hostinger hPanel → Domains → DNS).

| Type | Name / Host | Value | Purpose |
|------|-------------|-------|---------|
| TXT | `_vercel` | `vc-domain-verify=ecomgliders.com,ef96fa1e4ad6caaaffaf` | Apex ownership verify |
| TXT | `_vercel` | `vc-domain-verify=www.ecomgliders.com,351607863dab3209a7af` | WWW ownership verify (add second TXT on same host if UI allows) |
| A | `@` | `216.198.79.1` | Apex → Vercel |
| A | `@` | `64.29.17.1` | Apex → Vercel (second) |
| CNAME | `www` | `b45d56265277c879.vercel-dns-017.com.` | WWW → Vercel |

Fallback (also accepted by Vercel verify):

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com.` |

Remove Hostinger parking / `cdn.hstgr.net` A/CNAME records that conflict with the above.

## After DNS propagates

```bash
npx vercel domains verify ecomgliders.com --project ecom-gliders --scope faizanmayo786s-projects
npx vercel domains verify www.ecomgliders.com --project ecom-gliders --scope faizanmayo786s-projects
```

Then set production site URL and redeploy:

```bash
# Set NEXT_PUBLIC_SITE_URL=https://ecomgliders.com on Production
npx vercel env rm NEXT_PUBLIC_SITE_URL production --scope faizanmayo786s-projects
echo https://ecomgliders.com | npx vercel env add NEXT_PUBLIC_SITE_URL production --scope faizanmayo786s-projects
npm run deploy:vercel:prod
```

## Post-cutover checks

1. https://ecomgliders.com/ and https://www.ecomgliders.com/ (www → apex 308)
2. Spot-check `/amazon-catalog-management/`, `/amazon-ppc-management-agency/`, `/blog/`, sitemap
3. Search Console: submit `https://ecomgliders.com/sitemap.xml`
4. Confirm `NEXT_PUBLIC_SITE_URL` canonicals use `ecomgliders.com`

## Risk

Changing A/CNAME takes the live WordPress site offline for that hostname. Only apply when the Vercel staging site is approved for production.
