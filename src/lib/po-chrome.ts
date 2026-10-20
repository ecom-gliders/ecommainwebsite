/**
 * Project One layout chrome — soft-rect controls, hard panels.
 * Visual system: lime #C6FD50 + ink #131311; eCom content only.
 */
export const poChrome = {
  /** Primary CTA / chip / small control */
  control: "rounded-[10px]",
  /** Icon square inside CTA */
  iconChip: "rounded-[8px]",
  /** Cards, tiles, checklist rows */
  tile: "rounded-[10px]",
  /** Large section panels / frames */
  panel: "rounded-[10px]",
  /** Hard ink border */
  hardBorder: "border-2 border-primary",
  /** Neo-brutal offset (PO ink) */
  hardShadow: "shadow-[6px_6px_0_0_#131311]",
  /** Soft lift reserved — prefer hardShadow for PO fidelity */
  softLift: "shadow-[0_18px_50px_rgba(19,19,17,0.12)]",
} as const;
