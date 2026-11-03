"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ComponentType,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import PhoneInput, {
  getCountries,
  getCountryCallingCode,
  type Country,
  type Labels,
} from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import enLabels from "react-phone-number-input/locale/en";
import flags from "react-phone-number-input/flags";
import { Check, ChevronDown, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";

const COUNTRY_PANEL_GAP = 8;
const COUNTRY_PANEL_WIDTH = 352;

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
  /** sm matches compact form controls (h-10); md matches default inputs (h-11) */
  size?: "sm" | "md";
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

/**
 * Council C: update flag only when typed value resolves to a trusted country;
 * otherwise keep last known (shared codes like +1 stay sticky until valid).
 */
function resolveCountryFromTypedValue(
  value: string,
  lastCountry: Country,
): Country | undefined {
  const parsed = parsePhoneNumberFromString(value);
  if (!parsed?.country) return undefined;

  const callingCode = parsed.countryCallingCode;
  const matches = getCountries().filter(
    (code) => getCountryCallingCode(code) === callingCode,
  );

  if (matches.length === 1) {
    return matches[0];
  }

  if (parsed.isValid()) {
    return parsed.country;
  }

  if (matches.includes(lastCountry)) {
    return undefined;
  }

  return parsed.country;
}

function SearchableCountrySelect({
  value,
  onChange,
  labels,
  iconComponent: Icon,
  disabled,
  tone = "light",
  size = "md",
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
  size?: "sm" | "md";
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [panelStyle, setPanelStyle] = useState<CSSProperties | null>(null);
  const isDark = tone === "dark";
  const compact = size === "sm";

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
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setPanelStyle(null);
      return;
    }

    function placePanel() {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(COUNTRY_PANEL_WIDTH, window.innerWidth - 16);
      let left = rect.left;
      if (left + width > window.innerWidth - 8) {
        left = Math.max(8, window.innerWidth - width - 8);
      }
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < 320 && rect.top > spaceBelow;

      setPanelStyle({
        position: "fixed",
        left,
        width,
        zIndex: 80,
        ...(openUp
          ? { bottom: window.innerHeight - rect.top + COUNTRY_PANEL_GAP, top: "auto" }
          : { top: rect.bottom + COUNTRY_PANEL_GAP, bottom: "auto" }),
      });
    }

    placePanel();
    window.addEventListener("resize", placePanel);
    window.addEventListener("scroll", placePanel, true);
    return () => {
      window.removeEventListener("resize", placePanel);
      window.removeEventListener("scroll", placePanel, true);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !panelStyle) return;
    searchRef.current?.focus({ preventScroll: true });
  }, [open, panelStyle]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!(event.target instanceof Node)) return;
      if (rootRef.current?.contains(event.target)) return;
      if (panelRef.current?.contains(event.target)) return;
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

  const panel =
    open && mounted && panelStyle
      ? createPortal(
          <div
            ref={panelRef}
            id={listId}
            role="listbox"
            style={panelStyle}
            className="overflow-hidden rounded-[10px] border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]"
          >
            <div className="border-b-2 border-primary p-3.5">
              <label className="relative block">
                <span className="sr-only">Search country</span>
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-text-secondary"
                  aria-hidden="true"
                />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search country"
                  className={cn(
                    "eg-phone-search box-border h-12 w-full rounded-[8px] border-2 border-primary bg-background",
                    "py-3 pl-11 pr-4 text-sm font-medium leading-none text-text-primary",
                    "placeholder:text-text-secondary",
                    "outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    "appearance-none [-webkit-appearance:none]",
                  )}
                />
              </label>
            </div>
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-text-secondary">
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
                          "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-bold",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
                          checked
                            ? "bg-accent text-primary"
                            : "text-text-primary hover:bg-surface-muted",
                        )}
                      >
                        <span className="flex h-4 w-6 shrink-0 overflow-hidden rounded-[2px]">
                          {Icon ? (
                            <Icon country={option.code} label={option.label} />
                          ) : null}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {option.label}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 tabular-nums",
                            checked ? "text-primary/70" : "text-text-secondary",
                          )}
                        >
                          +{option.callingCode}
                        </span>
                        {checked ? (
                          <Check
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={rootRef} className="PhoneInputCountry relative shrink-0 self-stretch">
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={
          selected
            ? `Country: ${selected.label} (+${selected.callingCode})`
            : "Select country"
        }
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-full items-center gap-1.5 border-0 border-r-2 bg-transparent px-2.5 text-sm font-bold",
          compact ? "min-h-10" : "min-h-11",
          isDark ? "border-r-text-on-dark/30" : "border-r-primary",
          "text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
        )}
      >
        {value && Icon ? (
          <span className="flex h-3.5 w-5 overflow-hidden rounded-[2px]">
            <Icon country={value} label={selected?.label || value} />
          </span>
        ) : null}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {panel}
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
  size = "md",
  labelClassName,
  className,
  required,
  error,
}: PhoneFieldProps) {
  const autoId = useId();
  const inputId = id ?? `${autoId}-phone`;
  const isDark = tone === "dark";
  const compact = size === "sm";
  const controlHeight = compact ? "h-10" : "h-11";
  const [country, setCountry] = useState<Country>(defaultCountry);
  const explicitCountryRef = useRef(false);

  return (
    <div
      className={cn(
        "eg-phone-field flex min-w-0 flex-col",
        compact ? "gap-1.5" : "gap-2",
        className,
      )}
    >
      <Label
        htmlFor={inputId}
        className={cn(
          "block leading-snug",
          compact ? "text-sm font-semibold" : "text-sm font-medium",
          isDark ? "text-text-on-dark" : "text-text-primary",
          labelClassName,
        )}
      >
        {label}
        {required ? (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </Label>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <PhoneInput
        id={inputId}
        international
        countryCallingCodeEditable
        country={country}
        defaultCountry={defaultCountry}
        countries={getCountries()}
        labels={enLabels}
        flags={flags}
        onCountryChange={(next) => {
          if (!next) return;
          // Dropdown pick is marked explicit; library typing inference is ignored
          // so shared codes (+1) stay on last known until parse trusts a country.
          if (explicitCountryRef.current) {
            explicitCountryRef.current = false;
            setCountry(next);
          }
        }}
        countrySelectComponent={(props) => (
          <SearchableCountrySelect
            {...props}
            labels={enLabels}
            tone={tone}
            size={size}
            onChange={(next) => {
              explicitCountryRef.current = true;
              props.onChange(next);
            }}
          />
        )}
        value={(value || undefined) as PhoneValue}
        onChange={(next) => {
          const str = typeof next === "string" ? next : "";
          onChange(str);
          if (!str) return;
          const resolved = resolveCountryFromTypedValue(str, country);
          if (resolved && resolved !== country) {
            setCountry(resolved);
          }
        }}
        numberInputProps={{
          id: inputId,
          name: undefined,
          autoComplete: "tel",
          required,
          "aria-invalid": error ? true : undefined,
          className: cn(
            "PhoneInputInput eg-phone-number min-w-0 flex-1 bg-transparent px-3.5 text-sm font-medium text-text-primary outline-none",
            controlHeight,
            // Parent shells (hero/service) force [&_input]:border-2 — beat that
            // so the control reads as one field, not two stacked boxes.
            "!m-0 !h-full !rounded-none !border-0 !py-0 !shadow-none",
            "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
          ),
        }}
        className={cn(
          "PhoneInput !mt-0 flex w-full items-stretch overflow-hidden rounded-[10px] border-2 bg-background",
          controlHeight,
          isDark ? "border-text-on-dark/30" : "border-primary",
        )}
      />
      {error ? (
        <p className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
