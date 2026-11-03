"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ComponentType,
} from "react";
import PhoneInput, {
  getCountries,
  getCountryCallingCode,
  type Country,
  type Labels,
} from "react-phone-number-input";
import enLabels from "react-phone-number-input/locale/en";
import flags from "react-phone-number-input/flags";
import { Check, ChevronDown, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";

type PhoneValue = ComponentProps<typeof PhoneInput>["value"];

interface PhoneFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** When set, posts E.164 via a hidden input for native form submits */
  name?: string;
  defaultCountry?: Country;
  tone?: "light" | "dark";
  labelClassName?: string;
  className?: string;
  required?: boolean;
  error?: string;
}

interface CountryOption {
  code: Country;
  label: string;
  callingCode: string;
}

function buildCountryOptions(labels: Labels): CountryOption[] {
  return getCountries()
    .map((code) => ({
      code,
      label: labels[code] || code,
      callingCode: getCountryCallingCode(code),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function SearchableCountrySelect({
  value,
  onChange,
  labels,
  iconComponent: Icon,
  disabled,
  tone = "light",
}: {
  value?: Country;
  onChange: (value: Country | undefined) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  options: unknown;
  labels: Labels;
  iconComponent: ComponentType<{ country: Country; label: string }>;
  disabled?: boolean;
  tone?: "light" | "dark";
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isDark = tone === "dark";

  const options = useMemo(() => buildCountryOptions(labels), [labels]);
  const selected = options.find((option) => option.code === value);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.code.toLowerCase().includes(q) ||
        option.callingCode.includes(q.replace(/^\+/, "")),
    );
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!(event.target instanceof Node)) return;
      if (rootRef.current?.contains(event.target)) return;
      setOpen(false);
      setQuery("");
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="PhoneInputCountry relative">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={selected ? `Country: ${selected.label}` : "Select country"}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-12 min-w-[5.5rem] items-center gap-1.5 border-2 px-2.5 text-sm font-bold",
          isDark
            ? "border-text-on-dark/30 bg-background text-text-primary"
            : "border-primary bg-background text-text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        )}
      >
        {value && Icon ? (
          <span className="PhoneInputCountryIcon flex h-4 w-6 overflow-hidden">
            <Icon country={value} label={selected?.label || value} />
          </span>
        ) : null}
        <span className="tabular-nums">+{selected?.callingCode ?? "—"}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 top-[calc(100%+0.35rem)] z-50 w-[min(20rem,calc(100vw-2rem))] border-2 border-primary bg-background shadow-md"
        >
          <div className="flex items-center gap-2 border-b-2 border-primary/15 px-3 py-2">
            <Search
              className="h-4 w-4 shrink-0 text-text-secondary"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country"
              className="h-9 w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-secondary"
              autoFocus
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3.5 py-2.5 text-sm text-text-secondary">
                No countries match.
              </li>
            ) : (
              filtered.map((option) => {
                const checked = option.code === value;
                return (
                  <li key={option.code} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={checked}
                      onClick={() => {
                        onChange(option.code);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-bold",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                        checked
                          ? "bg-accent text-primary"
                          : "text-text-primary hover:bg-surface-muted",
                      )}
                    >
                      <span className="flex h-4 w-6 shrink-0 overflow-hidden">
                        {Icon ? (
                          <Icon country={option.code} label={option.label} />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1 truncate">
                        {option.label}
                      </span>
                      <span className="shrink-0 tabular-nums text-text-secondary">
                        +{option.callingCode}
                      </span>
                      {checked ? (
                        <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      ) : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function PhoneField({
  id,
  label,
  value,
  onChange,
  name,
  defaultCountry = "US",
  tone = "light",
  labelClassName,
  className,
  required,
  error,
}: PhoneFieldProps) {
  const autoId = useId();
  const inputId = id ?? `${autoId}-phone`;
  const isDark = tone === "dark";

  return (
    <div className={cn("eg-phone-field", className)}>
      <Label
        htmlFor={inputId}
        className={cn(isDark ? "text-text-on-dark" : undefined, labelClassName)}
      >
        {label}
        {required ? (
          <span className="sr-only"> (required)</span>
        ) : null}
      </Label>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <PhoneInput
        id={inputId}
        international
        defaultCountry={defaultCountry}
        countries={getCountries()}
        labels={enLabels}
        flags={flags}
        countrySelectComponent={(props) => (
          <SearchableCountrySelect {...props} labels={enLabels} tone={tone} />
        )}
        value={(value || undefined) as PhoneValue}
        onChange={(next) => onChange(typeof next === "string" ? next : "")}
        numberInputProps={{
          id: inputId,
          name: undefined,
          autoComplete: "tel",
          required,
          "aria-invalid": error ? true : undefined,
          className: cn(
            "PhoneInputInput h-12 w-full border-2 bg-background px-3.5 text-base font-medium text-text-primary outline-none",
            "focus-visible:ring-2 focus-visible:ring-accent",
            isDark ? "border-text-on-dark/30" : "border-primary",
          ),
        }}
        className={cn(
          "PhoneInput mt-2 gap-2",
          "[&_.PhoneInputCountry]:m-0 [&_.PhoneInputCountryIcon]:h-4 [&_.PhoneInputCountryIcon]:w-6",
        )}
      />
      {error ? (
        <p className="mt-2 text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
