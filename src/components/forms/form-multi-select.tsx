"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
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

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

/**
 * Compact multi-select dropdown for long option lists.
 * Closed state stays one control tall (no in-form scrollbar).
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
  const [open, setOpen] = useState(false);

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
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!(event.target instanceof Node)) return;
      if (rootRef.current?.contains(event.target)) return;
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

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
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
        <ul className="mt-2.5 flex flex-wrap gap-2" aria-label="Selected marketplaces">
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

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-multiselectable="true"
          aria-label={label}
          className="absolute left-0 right-0 z-50 mt-1.5 max-h-56 overflow-y-auto border-2 border-primary bg-background shadow-md"
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
                    onClick={() => onChange(toggleValue(selected, option.value))}
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
                      {checked ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                    </span>
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
