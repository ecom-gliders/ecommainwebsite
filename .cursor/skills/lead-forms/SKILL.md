---
title: Lead Forms
description: Build and fix eCom Gliders lead forms — PhoneField, E.164, FormMultiSelect, wizards, portals, no page-jump focus.
version: 1.0.0
---

# Lead Forms

## When to use

- Adding or changing contact, free-audit, hero Get in Touch, service lead, careers, or partnership forms
- Phone country picker, marketplace multi-select, or multi-step wizard height / CLS / dropdown clip bugs
- Form submit failures for array fields (`marketplaces`, `services`)

## Read first

1. `docs/project/LEAD-FORMS.md`
2. `.cursor/rules/15-lead-forms.mdc`
3. `src/components/forms/phone-field.tsx`
4. `src/domain/forms/phone.schema.ts`
5. `src/components/forms/form-multi-select.tsx`
6. `src/components/forms/configurable-form.tsx`

## Procedure

1. Reuse `PhoneField` + `phoneE164Schema`. Do not invent a second phone widget.
2. Compact hero/service shells: pass `size="sm"` so height matches `h-10` inputs.
3. Dropdowns that open near the fold or inside scroll panes: portal to `document.body`, position with `getBoundingClientRect`, flip up when space below is short.
4. Focus search inputs with `focus({ preventScroll: true })` after the panel style is set. Never HTML `autoFocus` on portaled nodes.
5. Multi-step wizards: mount only the active step. Do not lock height to the tallest invisible step.
6. Array fields: one hidden `<input name="marketplaces" value={...} />` per selected value (same for `services`).
7. Verify: `tsc --noEmit`; open country/marketplace panels without scroll jump; submit rejects junk phones; Discord/email show E.164 when env is set.

## Anti-patterns

- Stacking all wizard steps with `invisible` to prevent CLS
- Absolute dropdowns inside `overflow-hidden` / `overflow-y-auto` parents
- `countryCallingCodeEditable={false}` when product needs typed `+CC` → flag sync
- Letting parent `[&_input]:border-2` draw a second box around the tel input
