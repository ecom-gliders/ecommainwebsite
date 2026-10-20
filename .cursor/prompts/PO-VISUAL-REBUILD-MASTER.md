# PO Visual Rebuild — Master Prompt

Paste as the session protocol for one-section visual rebuilds matching Project One UI language with eCom Gliders content only.

## Goal

Restyle https://ecomgliders.com/ (local `http://localhost:3000`) to match **Project One** visual system:

- Palette: ink `#131311`, lime `#C6FD50`, canvas `#FAFAFA`
- Type: **Satoshi** (Fontshare)
- Chrome: soft-rect ~10px, hard solid offset shadows (no soft blur maze)
- Layout language: centered hero + orbit media, hard panels, staggered process, lime marquees, bento trust, lime FAQ

**Content stays eCom Gliders.** Never copy PO pricing, KHULA, Framer Expert, or unverified claims.

## Locks

| Lock | Rule |
|------|------|
| Content | eCom copy, claims, URLs, CTAs only |
| Visual | PO lime/ink/Satoshi + layout patterns |
| Claims | Use only verified eCom claims (e.g. since 2018, 20+ pros, 95% retention, $112M+ only if already verified in repo) |
| Scope | One section per pass; stop for approve |

## Queue

0 Foundation (tokens, font, PrimaryButton, nav)  
1 Hero + orbit Polaroids (preserve `#hero-lead-form` path)  
2 Pain strip  
3 Brand values 3×2  
4 Staggered process  
5 Lime USP marquee  
6 Dark mid CTA  
7 Free audit (pricing-chrome layout, eCom offer)  
8 See Work (creative + case studies)  
9 Comparison  
10 Trust / bento  
11 Testimonials  
12 Lime FAQ  
13 Final CTA  
14 Footer  

## Pass protocol

1. **Screenshot-first** — Project One reference fold + our before (1440)
2. Gap list — layout / type / color / chrome only (no content rewrite unless broken)
3. Implement that section only
4. Verify 1440 + 390 — screenshots, overflow, no PO copy leakage
5. Log `docs/qa/VERIFICATION-LOG.md` + update `docs/ai/SESSION-STATE.md`
6. **Stop** — await `approve` / `next`

## Reference

- Live: https://www.projectone.website/
- Plan: `.cursor/plans/2026-09-15-po-visual-rebuild.md`
- ADR: `docs/project/DECISIONS.md` (2026-09-15 PO visual system unlock)
