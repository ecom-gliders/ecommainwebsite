# Lead Forms (agent reference)

Last updated: 2026-11-04

Shared patterns for every seller-facing lead capture surface on the site.

## Surfaces

| Surface | Component / entry | Notes |
|---------|-------------------|--------|
| Homepage Get in Touch | `ConfigurableForm` in hero (`density="compact"`) | Lime shell; `[&_input]:border-2` |
| Service hero lead | `ConfigurableForm` via service hero | Same border shell pattern |
| Contact strategy intake | `ContactIntakeWizard` | 5 steps; dark card on accent section |
| Free audit funnel | `AuditFunnelWizard` | Popup / page funnel |
| Careers / partnership | Dedicated forms using `PhoneField` | Same phone schema |

## Phone (required pattern)

**UI:** `src/components/forms/phone-field.tsx`  
**Schema:** `src/domain/forms/phone.schema.ts` → `phoneE164Schema`, `isValidLeadPhone`, `toE164Phone`

### Behavior

1. International display with searchable country list (flag + chevron; dial code lives in the number input).
2. `countryCallingCodeEditable` enabled so sellers can type `+CC`.
3. **Country sync rule (council C):** keep last known country until parse trusts a new one.
   - Unique calling code (e.g. `+92`) → switch flag.
   - Shared codes (`+1`, etc.) → stay sticky until `parsed.isValid()` (or last country not in that code set).
   - Dropdown selection is always explicit and wins immediately.
4. Compact forms pass `size="sm"` (`h-10`) so Phone aligns with Company / Name.
5. CSS class `eg-phone-field` in `globals.css` clears library chrome and beats parent `[&_input]:border-*`.

### Portal + focus (mandatory)

Country list renders via `createPortal(document.body)` with `position: fixed`.

- Place panel in `useLayoutEffect` from the trigger `getBoundingClientRect`.
- Render panel only after style is known (avoids a flash at document end).
- Focus search with `focus({ preventScroll: true })`.
- **Do not** use HTML `autoFocus` on portaled inputs — first open scrolls the page to the bottom.

## FormMultiSelect

**File:** `src/components/forms/form-multi-select.tsx`

Same portal rules as phone country panel. Used for marketplaces on contact + audit.

Selected values also render as removable chips under the trigger (height can grow after selection; that is expected content growth, not step CLS).

## Array fields in FormData

Hidden inputs must repeat the field name:

```tsx
{values.marketplaces.map((market) => (
  <input key={market} type="hidden" name="marketplaces" value={market} />
))}
```

Server parsers expect `marketplaces` / `services` arrays. A single string or `marketplaces[]` name breaks Zod / Discord payloads.

## Multi-step wizards

**Contact:** `src/components/contact/contact-intake-wizard.tsx`  
**Audit:** `src/components/free-audit/audit-funnel-wizard.tsx`

### Height / CLS

- Mount **only the active step**.
- Rejected approach: CSS grid stacking every step with `invisible` so height = tallest step. That removed jump but left huge empty space on short steps (e.g. Step 1 name/email). Product rejected it.
- Mild height change between steps is acceptable. Prefer portaled menus over scroll panes that clip menus.

### Errors

Map server `fieldErrors` to step via `FIELD_TO_STEP` (contact) or equivalent.

## Logging

Redact phone and email in form notification sanitizers before structured logs.

## Verification checklist

1. `npx tsc --noEmit`
2. Open country flag on homepage Get in Touch — no scroll jump; panel below (or above) trigger, not inside the phone border
3. Type `+92300…` — flag becomes Pakistan when code is trusted
4. Contact Step 3 marketplaces — options visible without scrolling the wizard card to “discover” them
5. Step 1 card height tracks content (no large empty band above Next)
6. Junk phone rejected; valid numbers normalize to E.164 on submit path

## Related

- Rule: `.cursor/rules/15-lead-forms.mdc`
- Skill: `.cursor/skills/lead-forms/SKILL.md`
- Discord routing: keep channel separation documented in form-notifier / env (get-in-touch vs full-funnel vs service-lead)
