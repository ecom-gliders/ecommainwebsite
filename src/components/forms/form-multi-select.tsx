"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormMultiSelectOption {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  id?: string;
  label: string;
  options: FormMultiSelectOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  className?: string;
}

const PANEL_MAX_HEIGHT = 224; // max-h-56
const PANEL_GAP = 6;

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

/**
 * Compact multi-select. Panel portals to document.body so parent overflow
 * (wizard step panes) cannot clip or hide options.
 */
export function FormMultiSelect({
  id,
  label,
  options,
  selected,
  onChange,
  placeholder = "Select options",
  className,
}: FormMultiSelectProps) {
  const autoId = useId();
  const triggerId = id ?? `${autoId}-trigger`;
  const listboxId = `${autoId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

  const selectedLabels = options
    .filter((option) => selected.includes(option.value))
    .map((option) => option.label);

  const summary =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length <= 2
        ? selectedLabels.join(", ")
        : `${selectedLabels.length} selected`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;

    function placePanel() {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const openUp =
        spaceBelow < PANEL_MAX_HEIGHT + PANEL_GAP && spaceAbove > spaceBelow;

      setPanelStyle({
        position: "fixed",
        left: rect.left,
        width: rect.width,
        zIndex: 80,
        maxHeight: PANEL_MAX_HEIGHT,
        ...(openUp
          ? { bottom: window.innerHeight - rect.top + PANEL_GAP, top: "auto" }
          : { top: rect.bottom + PANEL_GAP, bottom: "auto" }),
      });
    }

    placePanel();
    window.addEventListener("resize", placePanel);
    // Capture scroll on any ancestor so panel stays aligned while open.
    window.addEventListener("scroll", placePanel, true);
    return () => {
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", placePanel, true);
    };
  }, [open, selected.length]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!(event.target instanceof Node)) return;
      if (rootRef.current?.contains(event.target)) return;
      if (panelRef.current?.contains(event.target)) return;
      setOpen(false);
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  const panel =
    open && mounted
      ? createPortal(
          <div
            ref={panelRef}
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            aria-label={label}
            style={panelStyle}
            className="overflow-y-auto border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]"
          >
            <ul className="py-1">
              {options.map((option) => {
                const checked = selected.includes(option.value);
                return (
                  <li key={option.value} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={checked}
                      onClick={() =>
                        onChange(toggleValue(selected, option.value))
                      }
                      className={cn(
                        "flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-bold",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                        checked
                          ? "bg-accent text-primary"
                          : "text-text-primary hover:bg-surface-muted",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center border-2 border-primary",
                          checked ? "bg-primary text-accent" : "bg-background",
                        )}
                        aria-hidden="true"
                      >
                        {checked ? (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        ) : null}
                      </span>
                      {option.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-3 border-2 border-primary bg-background px-3.5 text-left text-base font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          selectedLabels.length === 0
            ? "text-text-secondary"
            : "text-text-primary",
        )}
      >
        <span className="min-w-0 truncate">{summary}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-text-secondary transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {selectedLabels.length > 0 ? (
        <ul
          className="mt-2.5 flex flex-wrap gap-2"
          aria-label="Selected marketplaces"
        >
          {selectedLabels.map((itemLabel) => {
            const option = options.find((entry) => entry.label === itemLabel);
            if (!option) return null;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => onChange(toggleValue(selected, option.value))}
                  className="inline-flex max-w-full items-center gap-1.5 border-2 border-primary bg-accent px-2.5 py-1 text-xs font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`Remove ${option.label}`}
                >
                  <span className="truncate">{option.label}</span>
                  <X className="h-3 w-3 shrink-0" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {panel}
    </div>
  );
}
