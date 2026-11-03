## Latest (2026-11-03) — OG social previews + principles

**Done:** Dual-aspect OG system (1200×630 + 1200×1200) under `/images/og/`; metadata emits width/height/alt; homepage/contact/services/blogs no longer use WP banner or 1 MB about hero for social; `npm run generate:og`; standard + rule 14 + skill `og-social-preview`; performance rule expanded.

**Verified locally:** head tags on home, contact, PPC service, sample blog; 368 OG files, 0 over 200 KB; tsc clean.

**Still remaining (user):**
1. Deploy so staging/production serve new OG assets
2. DNS cutover (Hostinger) when ready
3. After cutover: Facebook / LinkedIn / Discord cache refresh
4. Optional: homepage Perf 87 → 90+
