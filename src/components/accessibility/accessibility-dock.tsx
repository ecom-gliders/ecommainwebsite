"use client";

import {
  Accessibility,
  AlignLeft,
  ArrowUp,
  Contrast,
  Droplets,
  EyeOff,
  Link2,
  ListTree,
  Move,
  Pause,
  RotateCcw,
  Scan,
  Type,
  Underline,
  X,
} from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { A11yFeatureTile } from "@/components/accessibility/a11y-feature-tile";
import {
  A11yImageTooltips,
  A11yPageStructurePanel,
  A11yReadingOverlays,
} from "@/components/accessibility/a11y-overlays";
import {
  A11Y_PROFILES,
  type A11yPrefs,
  type A11yProfileId,
  DEFAULT_A11Y_PREFS,
  activeFeatureCount,
  applyA11yPrefs,
  cycleLevel,
  persistA11yPrefs,
  readA11yPrefs,
} from "@/lib/a11y/prefs";
import { cn } from "@/lib/utils";

/* Fixed px so root text-scale prefs do not resize the dock launchers. */
const FAB_CLASS =
  "inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[10px] border-2 border-primary shadow-[3px_3px_0_0_#131311] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const TEXT_LABELS = ["Off", "Larger", "Large", "X-Large", "XX-Large"] as const;
const SPACING_LABELS = ["Off", "Light", "Moderate", "Heavy"] as const;
const LINE_LABELS = ["Off", "Comfort", "Relaxed", "Spacious"] as const;
const ALIGN_LABELS = ["Off", "Left", "Center", "Right", "Justify"] as const;
const CONTRAST_LABELS = ["Off", "High", "Dark", "Light", "Invert"] as const;
const SAT_LABELS = ["Off", "Low", "High", "Mono"] as const;
const CURSOR_LABELS = ["Off", "Big cursor", "Reading guide", "Reading mask"] as const;

export function AccessibilityDock() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [structureOpen, setStructureOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(DEFAULT_A11Y_PREFS);
  const [activeProfile, setActiveProfile] = useState<A11yProfileId | null>(null);

  useEffect(() => {
    const initial = readA11yPrefs();
    setPrefs(initial);
    applyA11yPrefs(initial);
  }, []);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setStructureOpen(false);
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const commit = useCallback((next: A11yPrefs, profile: A11yProfileId | null = null) => {
    setPrefs(next);
    setActiveProfile(profile);
    applyA11yPrefs(next);
    persistA11yPrefs(next);
  }, []);

  function applyProfile(id: A11yProfileId) {
    if (activeProfile === id) {
      commit(DEFAULT_A11Y_PREFS, null);
      return;
    }
    commit({ ...DEFAULT_A11Y_PREFS, ...A11Y_PROFILES[id].prefs }, id);
  }

  const activeCount = activeFeatureCount(prefs);

  return (
    <>
      <A11yReadingOverlays cursor={prefs.cursor} />
      <A11yImageTooltips enabled={prefs.tooltips} />
      <A11yPageStructurePanel
        open={structureOpen}
        onClose={() => setStructureOpen(false)}
      />

      <div
        data-a11y-chrome="true"
        className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <div
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-labelledby={`${panelId}-title`}
            className="pointer-events-auto flex max-h-[min(78vh,40rem)] w-[min(100vw-2rem,22.5rem)] flex-col overflow-hidden rounded-[12px] border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]"
          >
            <div className="flex items-start justify-between gap-3 border-b-2 border-primary/15 px-4 py-3">
              <div>
                <p
                  id={`${panelId}-title`}
                  className="text-small font-bold uppercase tracking-wide text-primary"
                >
                  Accessibility
                </p>
                <p className="mt-1 text-xs leading-snug text-text-secondary">
                  Personalize reading and vision. Settings stay on this device.
                  {activeCount > 0 ? ` ${activeCount} active.` : ""}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border-2 border-primary text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close accessibility settings"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              <section>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-text-secondary">
                  Profiles
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(A11Y_PROFILES) as A11yProfileId[]).map((id) => {
                    const selected = activeProfile === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={selected}
                        className={cn(
                          "rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                          selected
                            ? "border-primary bg-accent text-primary"
                            : "border-primary/30 text-primary hover:border-primary hover:bg-surface-muted",
                        )}
                        onClick={() => applyProfile(id)}
                      >
                        {A11Y_PROFILES[id].label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-text-secondary">
                  Content and reading
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <A11yFeatureTile
                    label="Bigger text"
                    icon={Type}
                    active={prefs.text > 0}
                    detail={TEXT_LABELS[prefs.text]}
                    onClick={() =>
                      commit(
                        { ...prefs, text: cycleLevel(prefs.text, 4) },
                        null,
                      )
                    }
                  />
                  <A11yFeatureTile
                    label="Text spacing"
                    icon={Scan}
                    active={prefs.spacing > 0}
                    detail={SPACING_LABELS[prefs.spacing]}
                    onClick={() =>
                      commit(
                        { ...prefs, spacing: cycleLevel(prefs.spacing, 3) },
                        null,
                      )
                    }
                  />
                  <A11yFeatureTile
                    label="Line height"
                    icon={AlignLeft}
                    active={prefs.lineHeight > 0}
                    detail={LINE_LABELS[prefs.lineHeight]}
                    onClick={() =>
                      commit(
                        {
                          ...prefs,
                          lineHeight: cycleLevel(prefs.lineHeight, 3),
                        },
                        null,
                      )
                    }
                  />
                  <A11yFeatureTile
                    label="Text align"
                    icon={AlignLeft}
                    active={prefs.align > 0}
                    detail={ALIGN_LABELS[prefs.align]}
                    onClick={() =>
                      commit(
                        { ...prefs, align: cycleLevel(prefs.align, 4) },
                        null,
                      )
                    }
                  />
                  <A11yFeatureTile
                    label="Dyslexia friendly"
                    icon={Type}
                    active={prefs.dyslexia}
                    detail={prefs.dyslexia ? "On" : "Off"}
                    onClick={() =>
                      commit({ ...prefs, dyslexia: !prefs.dyslexia }, null)
                    }
                  />
                  <A11yFeatureTile
                    label="Hide images"
                    icon={EyeOff}
                    active={prefs.hideImages}
                    detail={prefs.hideImages ? "On" : "Off"}
                    onClick={() =>
                      commit({ ...prefs, hideImages: !prefs.hideImages }, null)
                    }
                  />
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-text-secondary">
                  Vision and color
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <A11yFeatureTile
                    label="Contrast"
                    icon={Contrast}
                    active={prefs.contrast > 0}
                    detail={CONTRAST_LABELS[prefs.contrast]}
                    onClick={() =>
                      commit(
                        { ...prefs, contrast: cycleLevel(prefs.contrast, 4) },
                        null,
                      )
                    }
                  />
                  <A11yFeatureTile
                    label="Highlight links"
                    icon={Link2}
                    active={prefs.highlightLinks}
                    detail={prefs.highlightLinks ? "On" : "Off"}
                    onClick={() =>
                      commit(
                        { ...prefs, highlightLinks: !prefs.highlightLinks },
                        null,
                      )
                    }
                  />
                  <A11yFeatureTile
                    label="Saturation"
                    icon={Droplets}
                    active={prefs.saturation > 0}
                    detail={SAT_LABELS[prefs.saturation]}
                    onClick={() =>
                      commit(
                        {
                          ...prefs,
                          saturation: cycleLevel(prefs.saturation, 3),
                        },
                        null,
                      )
                    }
                  />
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-text-secondary">
                  Motion and focus
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <A11yFeatureTile
                    label="Pause animations"
                    icon={Pause}
                    active={prefs.reduceMotion}
                    detail={prefs.reduceMotion ? "On" : "Off"}
                    onClick={() =>
                      commit(
                        { ...prefs, reduceMotion: !prefs.reduceMotion },
                        null,
                      )
                    }
                  />
                  <A11yFeatureTile
                    label="Cursor tools"
                    icon={Move}
                    active={prefs.cursor > 0}
                    detail={CURSOR_LABELS[prefs.cursor]}
                    onClick={() =>
                      commit(
                        { ...prefs, cursor: cycleLevel(prefs.cursor, 3) },
                        null,
                      )
                    }
                  />
                  <A11yFeatureTile
                    label="Image tooltips"
                    icon={Underline}
                    active={prefs.tooltips}
                    detail={prefs.tooltips ? "On" : "Off"}
                    onClick={() =>
                      commit({ ...prefs, tooltips: !prefs.tooltips }, null)
                    }
                  />
                  <A11yFeatureTile
                    label="Page structure"
                    icon={ListTree}
                    active={structureOpen}
                    detail={structureOpen ? "Open" : "View"}
                    onClick={() => setStructureOpen((value) => !value)}
                  />
                </div>
              </section>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-primary px-3 py-2.5 text-small font-semibold text-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => {
                  setStructureOpen(false);
                  commit(DEFAULT_A11Y_PREFS, null);
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset all
              </button>
            </div>
          </div>
        ) : null}

        <div className="pointer-events-auto flex flex-col items-end gap-2">
          {showTop ? (
            <button
              type="button"
              className={cn(FAB_CLASS, "bg-background text-primary hover:bg-accent")}
              aria-label="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
          ) : null}

          <button
            type="button"
            className={cn(
              FAB_CLASS,
              open
                ? "bg-accent text-primary"
                : "bg-primary text-text-on-dark hover:bg-primary-dark",
            )}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={
              open ? "Close accessibility settings" : "Open accessibility settings"
            }
            onClick={() => setOpen((value) => !value)}
          >
            <Accessibility className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
