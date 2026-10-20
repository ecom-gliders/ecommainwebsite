"use client";

/**
 * Visual guide for balanced color division on /design-system.
 * Rule of thumb: ~60% neutrals, ~30% primary, ~10% accent.
 */
export function ColorBalanceGuide() {
  return (
    <div className="mb-8 rounded-md border border-border bg-background/90 p-5">
      <p className="text-small font-semibold text-text-primary">
        Color balance (60 / 30 / 10)
      </p>
      <p className="text-small mt-1 max-w-2xl text-text-secondary">
        Enough color to feel branded, not so much that the page feels loud or
        washed. Neutrals carry most of the UI; primary builds structure; accent
        is reserved for CTAs, focus, and small highlights.
      </p>

      <div
        className="mt-4 flex h-10 overflow-hidden rounded-md border border-border"
        aria-hidden="true"
      >
        <div
          className="flex w-[60%] items-center justify-center text-[11px] font-medium text-text-secondary"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          60% Neutrals
        </div>
        <div
          className="flex w-[30%] items-center justify-center text-[11px] font-medium text-text-on-dark"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          30% Primary
        </div>
        <div
          className="flex w-[10%] items-center justify-center text-[10px] font-semibold"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-primary)",
          }}
        >
          10%
        </div>
      </div>

      <ul className="mt-4 grid gap-3 text-small text-text-secondary sm:grid-cols-3">
        <li>
          <span className="font-medium text-text-primary">Neutrals</span>
          <br />
          Background, surfaces, borders, body text. Keep near white / soft gray
          so content stays calm.
        </li>
        <li>
          <span className="font-medium text-text-primary">Primary</span>
          <br />
          Headings, nav, dark buttons, footer, structure. Most of the brand
          weight lives here.
        </li>
        <li>
          <span className="font-medium text-text-primary">Accent</span>
          <br />
          Free Audit CTA, beam stroke, badges, hover. One punch per view — not
          large fills.
        </li>
      </ul>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-surface/60 p-3">
          <p className="text-xs font-semibold text-text-primary">Avoid (too loud)</p>
          <p className="mt-1 text-xs text-text-secondary">
            Accent-tinted full backgrounds, half-button accent fills, mesh orbs
            over ~15% opacity, lime/pink page washes.
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface/60 p-3">
          <p className="text-xs font-semibold text-text-primary">Avoid (too flat)</p>
          <p className="mt-1 text-xs text-text-secondary">
            Gray-only UI with no accent on primary CTA, no beam/highlight, no
            soft atmosphere, identical surfaces everywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
