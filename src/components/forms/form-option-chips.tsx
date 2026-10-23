"use client";

import { cn } from "@/lib/utils";

export interface FormOptionChip {
  value: string;
  label: string;
}

interface FormOptionChipsProps {
  options: FormOptionChip[];
  selected: string[];
  onToggle: (value: string) => void;
  name: string;
  columns?: "2" | "3";
  tone?: "light" | "dark";
}

export function FormOptionChips({
  options,
  selected,
  onToggle,
  name,
  columns = "2",
  tone = "light",
}: FormOptionChipsProps) {
  const isDark = tone === "dark";

  return (
    <ul
      className={cn(
        "grid gap-2.5",
        columns === "3" ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <li key={option.value}>
            <label
              className={cn(
                "flex min-h-12 cursor-pointer items-center border-2 px-3.5 py-3 text-sm font-bold leading-snug transition-colors",
                checked
                  ? isDark
                    ? "border-accent bg-accent text-primary"
                    : "border-primary bg-accent text-primary"
                  : isDark
                    ? "border-text-on-dark/30 bg-primary text-text-on-dark hover:border-accent"
                    : "border-primary/25 bg-background text-text-primary hover:border-primary",
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                value={option.value}
                checked={checked}
                // UI-only: do not put name= here — avoids mid-funnel form pollution /
                // accidental submits. Persisted values use hidden inputs in the parent.
                data-option-group={name}
                onChange={() => onToggle(option.value)}
              />
              {option.label}
            </label>
          </li>
        );
      })}
    </ul>
  );
}
