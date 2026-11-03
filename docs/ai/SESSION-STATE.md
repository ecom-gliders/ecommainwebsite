## Latest (2026-11-03) — Homepage alts + Lighthouse CWV done

**Homepage image alts:** Fixed. Playwright localhost: 0/76 missing. Lighthouse `image-alt` Pass.

**Contrast/a11y follow-ups in same pass:** Promo CTA red darkened; inactive seller-journey CTAs hidden (not opacity-faded); testimonial captions use `text-text-secondary`; pain bubbles dark green + white text; decorative footer watermark removed.

**Lighthouse lab (localhost:3002):**
- Home: Perf 87 / A11y 91 / BP 100 / SEO 100 — LCP ~2.6–2.9s, CLS 0.002
- PPC service: 94 / 100 / 100 / 100
- Blog sample: 94 / 100 / 96 / 100

**Still remaining (user):**
1. DNS cutover (Hostinger)
2. Production GSC submit after cutover
3. Optional: homepage Perf 87 → 90+ (LCP/Speed Index)
