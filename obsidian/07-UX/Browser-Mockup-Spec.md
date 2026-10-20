# Browser Mockup Specification

**Status:** Verified (Phase 0 static implementation, P0-07 approved 2026-09-02)  
**Related:** [[Design-System]], [[Page-Templates]], [[Content-Architecture]], [[Design-Inspiration]]

---

## Purpose

Reusable in-house browser chrome component that displays Amazon Seller Central-style dashboard previews inside macOS or iOS Safari frames. Used on homepage hero, service pages, case studies, and `/design-system` section 13.

**Not a third-party dependency.** Built from design tokens and JSON config — no iframe, no external mockup library.

---

## Design decision (approved)

| Mode | Status | Rationale |
|------|--------|-----------|
| **Static preview** | **Active (Phase 0)** | Fixed tab per variant; decorative chrome; no click/hover/auto-rotate. Avoids user confusion on review and marketing pages. |
| Interactive tabs | Deferred | Optional future enhancement via `staticPreview: false` in config. Requires explicit approval before enabling on production pages. |
| Auto-rotate | Rejected for Phase 0 | Distracting; paused-on-hover complexity not needed for agency positioning. |

---

## Component location

```
src/components/browser-mockup/
  browser-mockup.tsx          # Main export — chrome + layout
  browser-mockup-content.tsx    # Stats grid + table panel
  browser-mockup-chart.tsx      # Static SVG area chart
  browser-mockup-data.ts        # Re-exports from content-config (deprecated direct use)
  index.ts                      # Public API

content/config/browser-mockup.json   # All tab data, variant defaults, copy
src/lib/content-config.ts            # Zod schema + loaders
```

---

## Public API

### Export

```typescript
// src/components/browser-mockup/index.ts
export { BrowserMockup } from "./browser-mockup";
export type { BrowserVariant } from "./browser-mockup-data";
```

### BrowserMockupProps

```typescript
interface BrowserMockupProps {
  /** Additional Tailwind classes on the figure wrapper */
  className?: string;
  /** Browser chrome variant. Default: "macos" */
  variant?: BrowserVariant;
  /** Optional figcaption above the frame (e.g. "macOS Desktop") */
  label?: string;
}

type BrowserVariant = "macos" | "ios";
```

### Usage

```tsx
import { BrowserMockup } from "@/components/browser-mockup";

// Desktop — shows PPC Dashboard tab (from config)
<BrowserMockup variant="macos" label="macOS Desktop" />

// Mobile — shows Account Analytics tab (from config)
<div className="mx-auto max-w-md">
  <BrowserMockup variant="ios" label="iOS Safari" />
</div>
```

**Config keys:** `components.browserMockup` in `design-system.json`; data in `browser-mockup.json`.

---

## Variants

| Variant | Frame | Chrome | Default tab | Content density |
|---------|-------|--------|-------------|-----------------|
| `macos` | `rounded-xl`, full width | Traffic lights + nav buttons + tab bar + URL bar | `ppc` | Standard padding |
| `ios` | `rounded-[2rem]`, max-w-md | Status bar + Dynamic Island + Safari bar + segmented tabs | `analytics` | Compact (`compact={true}`) |

Default tab per variant is set in `browser-mockup.json`:

```json
{
  "defaultTabByVariant": {
    "macos": "ppc",
    "ios": "analytics"
  }
}
```

---

## Config schema

**File:** `content/config/browser-mockup.json`  
**Validator:** `browserMockupConfigSchema` in `src/lib/content-config.ts`

### Root fields

| Field | Type | Description |
|-------|------|-------------|
| `defaultTabByVariant` | `{ macos: string, ios: string }` | Tab `id` shown per variant |
| `previewDescription` | `string` | Copy on `/design-system` section 13 |
| `variants` | `Record<string, { label: string }>` | Figcaption labels |
| `tabs` | `BrowserTab[]` | Full tab definitions |

### BrowserTab

```typescript
interface BrowserTab {
  id: string;              // "ppc" | "seo" | "analytics"
  label: string;           // Full tab label (macOS bar)
  shortLabel: string;      // Abbreviated (iOS segmented control)
  url: string;             // URL bar text (no protocol)
  chartLabel: string;      // Chart header
  stats: {
    label: string;
    value: string;
    progress: number;      // 0–100, progress bar width
  }[];
  chart: number[];         // Normalized values for SVG path
  chartPoints: {
    label: string;         // X-axis label
    value: string;         // Display value (header badge)
    raw: number;           // Numeric for path calculation
  }[];
  table: {
    label: string;
    value: string;
    change: string;
    positive?: boolean;    // true = success color, false = error
    detail?: string;       // Reserved for expandable rows (not used in static mode)
  }[];
}
```

### Built-in tabs (Phase 0)

| id | label | url | Use case |
|----|-------|-----|----------|
| `ppc` | PPC Dashboard | sellercentral.amazon.com/ppc/campaigns | macOS default — ad performance |
| `seo` | Listing SEO | sellercentral.amazon.com/listing/optimizer | Listing optimization |
| `analytics` | Account Analytics | sellercentral.amazon.com/analytics/overview | iOS default — revenue overview |

**To change any value:** edit `browser-mockup.json` only — no component changes required.

---

## Subcomponents (internal)

| Component | File | Responsibility |
|-----------|------|----------------|
| `BrowserMockup` | `browser-mockup.tsx` | Figure wrapper, variant routing, chrome assembly |
| `MacChrome` | `browser-mockup.tsx` | Traffic lights, back/forward/refresh, tab bar, URL bar |
| `IosChrome` | `browser-mockup.tsx` | Status bar, Safari controls, segmented tabs |
| `StaticTabBar` | `browser-mockup.tsx` | Decorative tabs (`aria-hidden="true"`) |
| `BrowserMockupContent` | `browser-mockup-content.tsx` | Chart + 3 stat cards + data table |
| `BrowserMockupChart` | `browser-mockup-chart.tsx` | Static SVG line/area chart, last point in header |

---

## Visual specification

### Design tokens (from `design-system.json`)

| Element | Token |
|---------|-------|
| Frame border | `border-border` |
| macOS chrome bg | `bg-surface-muted` |
| iOS frame | `bg-surface`, `rounded-[2rem]` |
| Active tab | `ring-accent/15` or `ring-accent/20` |
| Chart accent | `var(--color-accent)` gradient |
| Stat card top border | `border-t-accent`, `border-t-brand-cyan`, `border-t-primary` (rotating) |
| Positive change | `text-success` |
| Negative change | `text-error` |
| URL lock icon | `text-success` (macOS), `text-text-secondary` (iOS) |

### macOS traffic lights

System chrome colors only (not brand tokens): `#FF5F57`, `#FFBD2E`, `#28C840`.

### Chart

- Static SVG — no hover, tooltip, or touch handlers
- Shows last data point value in header badge
- Subtle accent glow via `feDropShadow` filter
- `role="img"` with `aria-label` describing chart label and last value

---

## Accessibility

### Static mode (current)

| Requirement | Implementation |
|-------------|----------------|
| Not interactive | Tabs are `<div>` with `aria-hidden="true"` |
| Screen reader | Outer frame `role="img"` + `aria-label` from figcaption/variant |
| No keyboard trap | No focusable elements inside chrome |
| Reduced motion | N/A — no animations |
| Color contrast | Uses approved design tokens |

### Interactive mode (future, if enabled)

| Requirement | Implementation |
|-------------|----------------|
| Tab list | `role="tablist"`, tabs as `<button role="tab">` |
| Panels | `role="tabpanel"`, `aria-labelledby` |
| Keyboard | Arrow Left/Right between tabs |
| Focus | `aria-selected` on active tab |
| Reduced motion | Instant swap, no blur transition |

---

## Page placement

| Page | Section | Variant | Tab(s) | Config source |
|------|---------|---------|--------|---------------|
| `/design-system` | Section 13 | macOS + iOS stacked | ppc + analytics | `browser-mockup.json` |
| Homepage hero | Right visual | macOS desktop / iOS mobile (never both) | ppc / analytics from `homepage.json` | `homepage.json` → hero.visual + metricOverlays |
| Service: PPC | Hero | macOS | ppc | `services/ppc.json` (P3-05) |
| Service: Listing SEO | Hero | macOS | seo | `services/listing-seo.json` |
| Free audit | Preview section | macOS | analytics | `homepage.json` or page JSON |
| Case study detail | Results | macOS | client-specific | `case-studies.json` |

Content for homepage tabs will come from `homepage.json` → `hero.browserTabs[]` (P2-02), referencing same `BrowserTab` shape or subset.

---

## Responsive behavior

| Breakpoint | Layout |
|------------|--------|
| Desktop (lg+) | macOS only in hero split; optional metric overlay cards |
| Tablet / Mobile (below lg) | iOS only; macOS hidden — never stack both on homepage hero |

On `/design-system`: both variants stacked vertically (macOS above, iOS below).

---

## Future: interactive mode contract

If `design-system.json` → `components.browserMockup.staticPreview` becomes `false`:

```typescript
interface BrowserMockupProps {
  className?: string;
  variant?: BrowserVariant;
  label?: string;
  // Future props:
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  autoRotate?: boolean;
  autoRotateInterval?: number; // ms, default 8000
}
```

Animation (Motion, `prefers-reduced-motion` respected):

- Tab switch: opacity 0→1, y 8→0, blur 4px→0, 200ms
- URL bar: crossfade text on tab change
- Auto-rotate: pause on `mouseenter`, resume on `mouseleave`

**Requires user approval** before enabling on indexable marketing pages.

---

## Verification checklist

| Check | Phase | Status |
|-------|-------|--------|
| Renders on `/design-system` section 13 | P0 | Verified |
| Config key label shown | P0 | Verified |
| Edit `browser-mockup.json` → content updates | P0 | Verified (config pipeline) |
| macOS + iOS variants | P0 | Verified |
| No hardcoded brand hex in components | P0 | Verified (traffic lights excepted) |
| Homepage hero integration | P2 | Ready (static component; homepage.json in P2-02) |
| Interactive tabs | Future | Not implemented |

---

## Related config

| File | Keys |
|------|------|
| `content/config/design-system.json` | `components.browserMockup` — chrome height, radius, staticPreview flag, variant usage |
| `content/config/browser-mockup.json` | All tab data and variant defaults |
| `content/config/design-system-review.json` | Section 13 copy |

---

## Implementation phases

| Task | Delivers |
|------|----------|
| P0-06 | Component on `/design-system` |
| P1-03 | This specification |
| P2-01 | Mark component complete for homepage (may reuse as-is if static) |
| P2-02 | `homepage.json` browser tab content |
