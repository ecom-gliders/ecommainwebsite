"use client";

import {
  useActionState,
  useEffect,
  useId,
  useState,
  type MouseEvent,
} from "react";
import Link from "next/link";
import type { FreeAuditPageConfig } from "@/domain/content/schemas";
import { FormOptionChips } from "@/components/forms/form-option-chips";
import { FormMultiSelect } from "@/components/forms/form-multi-select";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 5;

const STEP_TITLES = ["You", "Services", "Store", "Scale", "Finish"] as const;

const labelClass = "text-base font-bold text-text-primary";
const inputClass =
  "mt-2.5 h-12 border-2 border-primary bg-background text-base font-medium text-text-primary placeholder:text-text-secondary/80";

export type AuditFunnelSubmitPayload = {
  name: string;
  email: string;
};

interface AuditFunnelWizardProps {
  form: NonNullable<FreeAuditPageConfig["form"]>;
  funnel: NonNullable<FreeAuditPageConfig["funnel"]>;
  /** When set (popup), hide the form after success and hand off to the parent. */
  onSubmitted?: (payload: AuditFunnelSubmitPayload) => void;
}

interface FunnelValues {
  name: string;
  email: string;
  phone: string;
  brandName: string;
  amazonStoreUrl: string;
  services: string[];
  marketplaces: string[];
  monthlyRevenue: string;
  message: string;
  consent: boolean;
}

const emptyValues: FunnelValues = {
  name: "",
  email: "",
  phone: "",
  brandName: "",
  amazonStoreUrl: "",
  services: [],
  marketplaces: [],
  monthlyRevenue: "",
  message: "",
  consent: false,
};

function progressPercent(step: number): number {
  return Math.round(((step - 1) / TOTAL_STEPS) * 100);
}

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function AuditFunnelWizard({
  form,
  funnel,
  onSubmitted,
}: AuditFunnelWizardProps) {
  const formId = useId();
  const headingId = `${formId}-step-heading`;
  const liveId = `${formId}-live`;
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FunnelValues>(emptyValues);
  const [stepError, setStepError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    submitAuditForm,
    initialFormActionState,
  );

  const revenueField = form.fields.find((field) => field.name === "monthlyRevenue");
  const revenueOptions = (revenueField?.options ?? []).filter(
    (option) => option.value !== "",
  );

  useEffect(() => {
    if (!state.success) return;
    setStepError(null);
    if (onSubmitted) {
      onSubmitted({ name: values.name, email: values.email });
      return;
    }
    setStep(1);
    setValues(emptyValues);
    // Fire only on success transition; capture name/email from that render.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- success transition only
  }, [state.success]);

  function validateStep(current: number): string | null {
    if (current === 1) {
      if (values.name.trim().length < 2) return "Enter your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        return "Enter a valid email address.";
      }
    }
    if (current === 2 && values.services.length === 0) {
      return "Select at least one service.";
    }
    if (current === 3) {
      if (!values.amazonStoreUrl.trim()) {
        return "Enter your Amazon storefront URL.";
      }
      if (!isHttpUrl(values.amazonStoreUrl.trim())) {
        return "Enter a valid Amazon storefront URL.";
      }
      if (values.marketplaces.length === 0) {
        return "Select at least one marketplace.";
      }
    }
    if (current === 4 && values.phone.trim().length < 7) {
      return "Enter a valid phone number.";
    }
    if (current === 5 && !values.consent) {
      return "You must agree to the privacy policy.";
    }
    return null;
  }

  function goNext() {
    const error = validateStep(step);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);
    setStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
  }

  function goPrevious() {
    setStepError(null);
    setStep((prev) => Math.max(1, prev - 1));
  }

  function handlePrimaryAction(event: MouseEvent<HTMLButtonElement>) {
    // Keep this button type="button" on every step. Switching Continue -> Submit
    // under the same pointer click causes an accidental form submit (consent error).
    event.preventDefault();
    if (step < TOTAL_STEPS) {
      goNext();
      return;
    }
    const error = validateStep(step);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);
    const formEl = event.currentTarget.form;
    formEl?.requestSubmit();
  }

  const percent = progressPercent(step);

  return (
    <div className="flex h-full min-h-0 flex-col border-2 border-primary bg-background">
      <div className="shrink-0 border-b-2 border-primary bg-surface-muted px-4 py-2.5 sm:px-5">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.08em] text-text-secondary">
            Step {String(step).padStart(2, "0")} of{" "}
            {String(TOTAL_STEPS).padStart(2, "0")}
          </p>
          <p
            className="text-[0.65rem] font-bold text-text-secondary"
            aria-hidden="true"
          >
            {percent}%
          </p>
        </div>
        <ol className="mt-2 flex gap-1" aria-hidden="true">
          {STEP_TITLES.map((label, index) => {
            const n = index + 1;
            const done = n < step;
            const active = n === step;
            return (
              <li key={label} className="min-w-0 flex-1">
                <div
                  className={cn(
                    "h-1.5 w-full border border-primary/20",
                    done || active ? "bg-accent" : "bg-background",
                  )}
                />
                <p
                  className={cn(
                    "mt-1 truncate text-[0.6rem] font-bold uppercase tracking-[0.04em]",
                    active ? "text-primary" : "text-text-secondary",
                  )}
                >
                  {label}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <div id={liveId} className="sr-only" aria-live="polite" aria-atomic="true">
        {`Step ${step} of ${TOTAL_STEPS}: ${STEP_TITLES[step - 1]}`}
      </div>

      <form
        id={`${formId}-audit-funnel`}
        action={formAction}
        noValidate
        className="flex min-h-0 flex-1 flex-col"
        aria-describedby={`${formId}-status`}
        onSubmit={(event) => {
          // Intermediate steps never submit; Enter advances via goNext.
          if (step < TOTAL_STEPS) {
            event.preventDefault();
            goNext();
            return;
          }
          const error = validateStep(step);
          if (error) {
            event.preventDefault();
            setStepError(error);
          }
        }}
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <input type="hidden" name="name" value={values.name} />
        <input type="hidden" name="email" value={values.email} />
        <input type="hidden" name="phone" value={values.phone} />
        <input type="hidden" name="brandName" value={values.brandName} />
        <input type="hidden" name="amazonStoreUrl" value={values.amazonStoreUrl} />
        {values.services.map((service) => (
          <input key={service} type="hidden" name="services" value={service} />
        ))}
        {values.marketplaces.map((market) => (
          <input key={market} type="hidden" name="marketplaces" value={market} />
        ))}
        <input type="hidden" name="monthlyRevenue" value={values.monthlyRevenue} />
        <input type="hidden" name="message" value={values.message} />
        {values.consent ? (
          <input type="hidden" name="consent" value="true" />
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6 [scrollbar-color:#131311_#C6FD50] [scrollbar-width:thin]">
          {step === 1 ? (
            <fieldset className="space-y-5">
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-primary"
                >
                  Who are you?
                </h3>
              </legend>
              <div>
                <Label htmlFor={`${formId}-name`} className={labelClass}>
                  Full name
                </Label>
                <Input
                  id={`${formId}-name`}
                  value={values.name}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className={inputClass}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`${formId}-email`} className={labelClass}>
                  Email
                </Label>
                <Input
                  id={`${formId}-email`}
                  type="email"
                  value={values.email}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                  }
                  className={inputClass}
                  autoComplete="email"
                  required
                />
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset>
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-primary"
                >
                  What do you need?
                </h3>
                <p className="mt-2 text-sm font-medium text-text-secondary">
                  Select all that apply.
                </p>
              </legend>
              <div className="mt-5">
                <FormOptionChips
                  name={`${formId}-services-ui`}
                  options={funnel.services}
                  selected={values.services}
                  onToggle={(value) =>
                    setValues((prev) => ({
                      ...prev,
                      services: toggleInList(prev.services, value),
                    }))
                  }
                  columns="2"
                />
              </div>
            </fieldset>
          ) : null}

          {step === 3 ? (
            <fieldset className="space-y-5">
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-primary"
                >
                  Store and markets
                </h3>
              </legend>
              <div>
                <Label htmlFor={`${formId}-brand`} className={labelClass}>
                  Brand
                </Label>
                <Input
                  id={`${formId}-brand`}
                  value={values.brandName}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      brandName: event.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor={`${formId}-store`} className={labelClass}>
                  Amazon storefront URL
                </Label>
                <Input
                  id={`${formId}-store`}
                  type="url"
                  value={values.amazonStoreUrl}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      amazonStoreUrl: event.target.value,
                    }))
                  }
                  className={inputClass}
                  placeholder="https://www.amazon.com/stores/..."
                  required
                />
              </div>
              <div>
                <Label htmlFor={`${formId}-markets`} className={labelClass}>
                  Marketplaces
                </Label>
                <p className="mt-1 text-sm font-medium text-text-secondary">
                  Select every marketplace that applies.
                </p>
                <FormMultiSelect
                  id={`${formId}-markets`}
                  label="Marketplaces"
                  className="mt-3"
                  options={funnel.marketplaces}
                  selected={values.marketplaces}
                  placeholder="Select marketplaces"
                  onChange={(marketplaces) =>
                    setValues((prev) => ({ ...prev, marketplaces }))
                  }
                />
              </div>
            </fieldset>
          ) : null}

          {step === 4 ? (
            <fieldset className="space-y-5">
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-primary"
                >
                  Scale and phone
                </h3>
              </legend>
              <div>
                <Label htmlFor={`${formId}-phone`} className={labelClass}>
                  Phone
                </Label>
                <Input
                  id={`${formId}-phone`}
                  type="tel"
                  value={values.phone}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, phone: event.target.value }))
                  }
                  className={inputClass}
                  autoComplete="tel"
                  required
                />
              </div>
              {revenueOptions.length > 0 ? (
                <div>
                  <p className={labelClass}>Monthly Amazon revenue</p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {revenueOptions.map((option) => {
                      const selected = values.monthlyRevenue === option.value;
                      return (
                        <li key={option.value}>
                          <label
                            className={cn(
                              "flex min-h-12 cursor-pointer items-center border-2 px-3.5 py-3 text-sm font-bold",
                              selected
                                ? "border-primary bg-accent text-primary"
                                : "border-primary/25 bg-background text-text-primary hover:border-primary",
                            )}
                          >
                            <input
                              type="radio"
                              className="sr-only"
                              name={`${formId}-revenue`}
                              checked={selected}
                              onChange={() =>
                                setValues((prev) => ({
                                  ...prev,
                                  monthlyRevenue: option.value,
                                }))
                              }
                            />
                            {option.label}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </fieldset>
          ) : null}

          {step === 5 ? (
            <fieldset className="space-y-5">
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-primary"
                >
                  Anything else?
                </h3>
              </legend>
              <div>
                <Label htmlFor={`${formId}-message`} className={labelClass}>
                  Note
                </Label>
                <Textarea
                  id={`${formId}-message`}
                  value={values.message}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      message: event.target.value,
                    }))
                  }
                  className="mt-2.5 min-h-28 border-2 border-primary text-base font-medium"
                />
              </div>
              <label className="flex items-start gap-3 text-base font-medium text-text-primary">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 border-2 border-primary"
                  checked={values.consent}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      consent: event.target.checked,
                    }))
                  }
                />
                <span>
                  {form.consentLabel}{" "}
                  <Link
                    href="/privacy-policy/"
                    className="font-bold text-primary underline underline-offset-2"
                  >
                    Privacy policy
                  </Link>
                </span>
              </label>
            </fieldset>
          ) : null}

          {stepError ? (
            <p
              className="mt-5 border-2 border-primary bg-accent px-4 py-3 text-sm font-bold text-primary"
              role="alert"
            >
              {stepError}
            </p>
          ) : null}

          <div
            id={`${formId}-status`}
            className="mt-4 text-sm font-medium"
            role="status"
            aria-live="polite"
          >
            {state.message ? (
              <p
                className={cn(
                  "border-2 px-4 py-3 font-bold",
                  state.success
                    ? "border-primary bg-accent text-primary"
                    : "border-primary bg-background text-text-primary",
                )}
              >
                {state.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t-2 border-primary bg-background px-5 py-3 sm:px-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={goPrevious}
              className="inline-flex min-h-12 items-center border-2 border-primary px-5 text-small font-bold uppercase tracking-[0.06em] text-text-primary hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Back
            </button>
          ) : (
            <span aria-hidden="true" />
          )}
          <PrimaryButton
            type="button"
            variant="accent"
            size="lg"
            disabled={pending}
            onClick={handlePrimaryAction}
          >
            {step < TOTAL_STEPS
              ? "Continue"
              : pending
                ? "Sending…"
                : form.submitLabel}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
