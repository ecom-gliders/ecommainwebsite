## Latest (2026-11-04) — Lead forms polish + agent docs; dual-push

**Done this session:**
- PhoneField: unified control, compact `size="sm"`, bold labels, council-C country sync, body portal for country list, `focus({ preventScroll: true })` (no first-click page jump)
- FormMultiSelect: body portal + flip-up placement (marketplace options no longer clipped)
- Contact intake: active-step-only height (rejected invisible-grid “CLS fix” that left huge empty Step 1)
- Agent docs: `docs/project/LEAD-FORMS.md`, rule `15-lead-forms`, skill `lead-forms`, AGENTS.md phase + skill table

**Verified locally:**
- `tsc --noEmit` clean
- Phone vs Company height/gap aligned (50px / 7.5px) Observed
- Country portal below trigger; scrollY unchanged on first open Observed
- Marketplace listbox `parentIsBody` + in-viewport Observed

**Do not commit:** root one-off PNGs, ad-hoc `docs/qa` screenshots, `wordpress-blog-export/` dumps, scratch `scripts/migration/_*.mjs` unless explicitly requested.

**Still remaining (user):**
1. Manual Discord/email submit smoke (E.164 on wire)
2. DNS cutover when ready
3. Optional: audit funnel pane CLS if product wants tighter popup height
