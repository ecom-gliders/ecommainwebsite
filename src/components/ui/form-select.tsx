"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  options: SelectOption[];
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  className?: string;
}

/**
 * Themed select for forms. Native option lists cannot be branded
 * (OS/browser blue). Radix listbox + hidden input keeps FormData working.
 *
 * Uses position=popper + portal so the menu floats without expanding the
 * form. Sitewide `scrollbar-gutter: stable` limits jump when the list opens.
 */
export function FormSelect({
  id,
  name,
  required,
  defaultValue = "",
  options,
  className,
  ...a11y
}: FormSelectProps) {
  const [value, setValue] = React.useState(defaultValue);
  const placeholder =
    options.find((option) => option.value === "")?.label ?? "Please select";
  const selectable = options.filter((option) => option.value !== "");

  return (
    <div className="relative w-full">
      <input type="hidden" name={name} value={value} required={required} />
      <SelectPrimitive.Root
        value={value || undefined}
        onValueChange={setValue}
      >
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={a11y["aria-invalid"]}
          aria-describedby={a11y["aria-describedby"]}
          className={cn(
            "flex h-11 w-full items-center justify-between gap-2 rounded-sm border border-border bg-background py-2 pl-3 pr-3 text-left text-sm text-text-primary",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !value && "text-text-secondary",
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-text-secondary"
              aria-hidden="true"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            side="bottom"
            align="start"
            sideOffset={4}
            collisionPadding={8}
            className={cn(
              "z-[80] max-h-72 overflow-hidden rounded-sm border border-border bg-background text-text-primary shadow-md",
              "w-[var(--radix-select-trigger-width)]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            )}
          >
            <SelectPrimitive.Viewport className="max-h-72 w-full p-1">
              {selectable.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-3 text-sm outline-none",
                    "text-text-primary data-[highlighted]:bg-primary data-[highlighted]:text-text-on-dark data-[state=checked]:bg-primary data-[state=checked]:text-text-on-dark",
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}
