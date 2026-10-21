export const A11Y_STORAGE_KEY = "eg-a11y-prefs";

export type TextLevel = 0 | 1 | 2 | 3 | 4;
export type SpacingLevel = 0 | 1 | 2 | 3;
export type LineHeightLevel = 0 | 1 | 2 | 3;
export type AlignMode = 0 | 1 | 2 | 3 | 4;
export type ContrastMode = 0 | 1 | 2 | 3 | 4;
export type SaturationMode = 0 | 1 | 2 | 3;
export type CursorMode = 0 | 1 | 2 | 3;

export interface A11yPrefs {
  text: TextLevel;
  spacing: SpacingLevel;
  lineHeight: LineHeightLevel;
  align: AlignMode;
  contrast: ContrastMode;
  saturation: SaturationMode;
  cursor: CursorMode;
  highlightLinks: boolean;
  reduceMotion: boolean;
  hideImages: boolean;
  dyslexia: boolean;
  tooltips: boolean;
}

export const DEFAULT_A11Y_PREFS: A11yPrefs = {
  text: 0,
  spacing: 0,
  lineHeight: 0,
  align: 0,
  contrast: 0,
  saturation: 0,
  cursor: 0,
  highlightLinks: false,
  reduceMotion: false,
  hideImages: false,
  dyslexia: false,
  tooltips: false,
};

export type A11yProfileId =
  | "low-vision"
  | "dyslexia"
  | "adhd"
  | "seizure"
  | "color-blind"
  | "cognitive";

export const A11Y_PROFILES: Record<
  A11yProfileId,
  { label: string; prefs: Partial<A11yPrefs> }
> = {
  "low-vision": {
    label: "Low vision",
    prefs: { text: 3, contrast: 1, cursor: 1, highlightLinks: true },
  },
  dyslexia: {
    label: "Dyslexia",
    prefs: { dyslexia: true, spacing: 2, lineHeight: 2, text: 1 },
  },
  adhd: {
    label: "ADHD",
    prefs: { cursor: 2, reduceMotion: true, hideImages: false },
  },
  seizure: {
    label: "Seizure safe",
    prefs: { reduceMotion: true, saturation: 3, contrast: 0 },
  },
  "color-blind": {
    label: "Color blind",
    prefs: { saturation: 3, highlightLinks: true, contrast: 1 },
  },
  cognitive: {
    label: "Cognitive",
    prefs: { spacing: 2, lineHeight: 2, reduceMotion: true, hideImages: true },
  },
};

function clampLevel(value: unknown, max: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(max, Math.trunc(n)));
}

/** Migrate legacy dock prefs (`text: md|lg|xl`, `contrast: boolean`). */
export function normalizePrefs(raw: unknown): A11yPrefs {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_A11Y_PREFS };
  const parsed = raw as Record<string, unknown>;

  let text: TextLevel = 0;
  if (parsed.text === "lg") text = 1;
  else if (parsed.text === "xl") text = 2;
  else text = clampLevel(parsed.text, 4) as TextLevel;

  let contrast: ContrastMode = 0;
  if (typeof parsed.contrast === "boolean") contrast = parsed.contrast ? 1 : 0;
  else contrast = clampLevel(parsed.contrast, 4) as ContrastMode;

  return {
    text,
    spacing: clampLevel(parsed.spacing, 3) as SpacingLevel,
    lineHeight: clampLevel(parsed.lineHeight, 3) as LineHeightLevel,
    align: clampLevel(parsed.align, 4) as AlignMode,
    contrast,
    saturation: clampLevel(parsed.saturation, 3) as SaturationMode,
    cursor: clampLevel(parsed.cursor, 3) as CursorMode,
    highlightLinks: Boolean(parsed.highlightLinks),
    reduceMotion: Boolean(parsed.reduceMotion),
    hideImages: Boolean(parsed.hideImages),
    dyslexia: Boolean(parsed.dyslexia),
    tooltips: Boolean(parsed.tooltips),
  };
}

export function readA11yPrefs(): A11yPrefs {
  if (typeof window === "undefined") return { ...DEFAULT_A11Y_PREFS };
  try {
    const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_A11Y_PREFS };
    return normalizePrefs(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_A11Y_PREFS };
  }
}

export function persistA11yPrefs(prefs: A11yPrefs) {
  try {
    window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore quota */
  }
}

function setOrClear(root: HTMLElement, name: string, value: string | null) {
  if (!value) root.removeAttribute(name);
  else root.setAttribute(name, value);
}

export function applyA11yPrefs(prefs: A11yPrefs) {
  const root = document.documentElement;
  setOrClear(root, "data-a11y-text", prefs.text ? String(prefs.text) : null);
  setOrClear(
    root,
    "data-a11y-spacing",
    prefs.spacing ? String(prefs.spacing) : null,
  );
  setOrClear(
    root,
    "data-a11y-line-height",
    prefs.lineHeight ? String(prefs.lineHeight) : null,
  );
  setOrClear(root, "data-a11y-align", prefs.align ? String(prefs.align) : null);
  setOrClear(
    root,
    "data-a11y-contrast",
    prefs.contrast ? String(prefs.contrast) : null,
  );
  setOrClear(
    root,
    "data-a11y-saturation",
    prefs.saturation ? String(prefs.saturation) : null,
  );
  setOrClear(root, "data-a11y-cursor", prefs.cursor ? String(prefs.cursor) : null);
  setOrClear(root, "data-a11y-links", prefs.highlightLinks ? "on" : null);
  setOrClear(root, "data-a11y-motion", prefs.reduceMotion ? "reduce" : null);
  setOrClear(root, "data-a11y-images", prefs.hideImages ? "hide" : null);
  setOrClear(root, "data-a11y-dyslexia", prefs.dyslexia ? "on" : null);
  setOrClear(root, "data-a11y-tooltips", prefs.tooltips ? "on" : null);
}

export function cycleLevel<T extends number>(
  current: T,
  max: number,
): T {
  return ((current + 1) % (max + 1)) as T;
}

export function activeFeatureCount(prefs: A11yPrefs): number {
  let count = 0;
  if (prefs.text) count += 1;
  if (prefs.spacing) count += 1;
  if (prefs.lineHeight) count += 1;
  if (prefs.align) count += 1;
  if (prefs.contrast) count += 1;
  if (prefs.saturation) count += 1;
  if (prefs.cursor) count += 1;
  if (prefs.highlightLinks) count += 1;
  if (prefs.reduceMotion) count += 1;
  if (prefs.hideImages) count += 1;
  if (prefs.dyslexia) count += 1;
  if (prefs.tooltips) count += 1;
  return count;
}
