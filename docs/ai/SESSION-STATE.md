## Latest (2026-11-04) — Contact funnel phone + multi-select

**Done:** Contact intake marketplaces FormData bug fixed (`marketplaces[]`); FormMultiSelect + FormOptionChips; step pane height capped to reduce CLS; shared `PhoneField` + E.164 Zod across lead forms; log redaction for phone/email.

**Verified locally:** tsc clean; phone schema accepts valid US E.164 / formatted and rejects junk; `/contact/` renders phone widget.

**Still remaining (user):**
1. Manual submit smoke on contact + free-audit popup
2. Deploy / dual-push when ready
3. DNS cutover when ready
