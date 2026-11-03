"use client";

import { useActionState, useEffect, useId, useState } from "react";
import Link from "next/link";
import type { ContactPageConfig } from "@/domain/content/schemas";
import { FormAttributionFields } from "@/components/forms/form-attribution-fields";
import { FormMultiSelect } from "@/components/forms/form-multi-select";
import { FormOptionChips } from "@/components/forms/form-option-chips";
import { PhoneField } from "@/components/forms/phone-field";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { isAmazonStoreOrAsin } from "@/domain/forms/amazon-store-url";
import { isValidLeadPhone } from "@/domain/forms/phone.schema";
import { submitContactIntakeForm } from "@/app/(marketing)/contact/intake-actions";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 5;

const FIELD_TO_STEP: Record<string, number> = {
  name: 1,
  email: 1,
  services: 2,
  brandName: 3,
  amazonStoreUrl: 3,
  marketplaces: 3,
  monthlyRevenue: 4,
  phone: 5,
  note: 5,
  consent: 5,
};

interface ContactIntakeWizardProps {
  wizard: ContactPageConfig["intakeWizard"];
}

interface WizardValues {
  name: string;
  email: string;
  services: string[];
  brandName: string;
  storeOrAsin: string;
  marketplaces: string[];
  monthlyRevenue: string;
  phone: string;
  note: string;
  consent: boolean;
}

const emptyValues: WizardValues = {
  name: "",
  email: "",
  services: [],
  brandName: "",
  storeOrAsin: "",
  marketplaces: [],
  monthlyRevenue: "",
  phone: "",
  note: "",
  consent: false,
};

function progressPercent(step: number): number {
  return Math.round(((step - 1) / TOTAL_STEPS) * 100);
}

function firstFieldError(
  fieldErrors: Record<string, string[]> | undefined,
): { step: number; message: string } | null {
  if (!fieldErrors) return null;
  for (const [field, messages] of Object.entries(fieldErrors)) {
    const message = messages?.[0];
    if (!message) continue;
    return {
      step: FIELD_TO_STEP[field] ?? TOTAL_STEPS,
      message,
    };
  }
  return null;
}

export function ContactIntakeWizard({ wizard }: ContactIntakeWizardProps) {
  const formId = useId();
  const headingId = `${formId}-step-heading`;
  const liveId = `${formId}-live`;
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<WizardValues>(emptyValues);
  const [stepError, setStepError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    submitContactIntakeForm,
    initialFormActionState,
  );

  useEffect(() => {
    if (state.success) {
      setStep(1);
      setValues(emptyValues);
      setStepError(null);
      return;
    }
    if (!state.message && !state.fieldErrors) return;
    const mapped = firstFieldError(state.fieldErrors);
    if (mapped) {
      setStep(mapped.step);
      setStepError(mapped.message);
    }
  }, [state]);

  function validateStep(current: number): string | null {
    if (current === 1) {
      if (values.name.trim().length < 2) return "Enter your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        return "Enter a valid email address.";
      }
    }
    if (current === 2 && values.services.length === 0) {
      return "Select at least one service area.";
    }
    if (current === 3) {
      if (values.brandName.trim().length < 2) {
        return "Enter your brand or company name.";
      }
      if (
        values.storeOrAsin.trim() &&
        !isAmazonStoreOrAsin(values.storeOrAsin.trim())
      ) {
        return "Use an Amazon storefront URL, product link, or ASIN (B0…).";
      }
      if (values.marketplaces.length === 0) {
        return "Select at least one marketplace.";
      }
    }
    if (current === 4 && !values.monthlyRevenue) {
      return "Select your monthly Amazon revenue range.";
    }
    if (current === 5) {
      if (!isValidLeadPhone(values.phone)) {
        return "Enter a valid phone number with country code.";
      }
      if (!values.consent) {
        return "Please confirm you agree to the privacy policy.";
      }
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

  function toggleService(value: string) {
    setValues((prev) => {
      const exists = prev.services.includes(value);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((item) => item !== value)
          : [...prev.services, value],
      };
    });
  }

  const percent = progressPercent(step);
  const stepTitles = [
    "Your details",
    "How can we help?",
    "Your brand",
    "Catalog scale",
    "Reach you",
  ];

  return (
    <div className="border-2 border-primary bg-primary p-5 text-text-on-dark shadow-[6px_6px_0_0_#C6F135] sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-small font-bold text-accent">
            Step {String(step).padStart(2, "0")} /{" "}
            {String(TOTAL_STEPS).padStart(2, "0")}
          </p>
          <p
            className="mt-1 text-sm font-medium text-text-on-dark/70"
            aria-hidden="true"
          >
            {percent}% complete
          </p>
        </div>
        <div
          className="h-2 w-full max-w-xs overflow-hidden border border-text-on-dark/20 bg-primary sm:w-48"
          aria-hidden="true"
        >
          <div
            className="h-full bg-accent transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div
        id={liveId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {`Step ${step} of ${TOTAL_STEPS}: ${stepTitles[step - 1]}`}
      </div>

      <form
        id={`${formId}-intake`}
        action={formAction}
        noValidate
        className="mt-8"
        aria-describedby={`${formId}-status`}
        onSubmit={(event) => {
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
          <FormAttributionFields />
        </div>

        <input type="hidden" name="name" value={values.name} />
        <input type="hidden" name="email" value={values.email} />
        {values.services.map((service) => (
          <input key={service} type="hidden" name="services" value={service} />
        ))}
        <input type="hidden" name="brandName" value={values.brandName} />
        <input type="hidden" name="storeOrAsin" value={values.storeOrAsin} />
        {values.marketplaces.map((market) => (
          <input key={market} type="hidden" name="marketplaces" value={market} />
        ))}
        <input
          type="hidden"
          name="monthlyRevenue"
          value={values.monthlyRevenue}
        />
        <input type="hidden" name="phone" value={values.phone} />
        <input type="hidden" name="note" value={values.note} />
        {values.consent ? (
          <input type="hidden" name="consent" value="true" />
        ) : null}

        {/* Active step only — height follows content. Dropdowns portal outside. */}
        <div>
          {step === 1 ? (
            <fieldset className="space-y-5">
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-on-dark"
                >
                  {stepTitles[0]}
                </h3>
                <p className="mt-2 text-body font-medium text-text-on-dark/75">
                  Takes about a minute. We use this to prep your conversation.
                </p>
              </legend>
              <div>
                <Label htmlFor={`${formId}-name`} className="text-text-on-dark">
                  Full name
                </Label>
                <Input
                  id={`${formId}-name`}
                  value={values.name}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="mt-2 border-text-on-dark/30 bg-background text-text-primary"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`${formId}-email`} className="text-text-on-dark">
                  Email
                </Label>
                <Input
                  id={`${formId}-email`}
                  type="email"
                  value={values.email}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  className="mt-2 border-text-on-dark/30 bg-background text-text-primary"
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
                  className="text-2xl font-bold tracking-tight text-text-on-dark"
                >
                  {stepTitles[1]}
                </h3>
                <p className="mt-2 text-body font-medium text-text-on-dark/75">
                  Select as many as apply.
                </p>
              </legend>
              <div className="mt-6">
                <FormOptionChips
                  name={`${formId}-services`}
                  options={wizard.services}
                  selected={values.services}
                  onToggle={toggleService}
                  tone="dark"
                />
              </div>
            </fieldset>
          ) : null}

          {step === 3 ? (
            <fieldset className="space-y-5">
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-on-dark"
                >
                  {stepTitles[2]}
                </h3>
                <p className="mt-2 text-body font-medium text-text-on-dark/75">
                  Store URL or ASIN is optional if you are brand new.
                </p>
              </legend>
              <div>
                <Label htmlFor={`${formId}-brand`} className="text-text-on-dark">
                  Brand or company name
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
                  className="mt-2 border-text-on-dark/30 bg-background text-text-primary"
                  required
                />
              </div>
              <div>
                <Label htmlFor={`${formId}-store`} className="text-text-on-dark">
                  Amazon store URL or ASIN (optional)
                </Label>
                <Input
                  id={`${formId}-store`}
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  value={values.storeOrAsin}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      storeOrAsin: event.target.value,
                    }))
                  }
                  className="mt-2 border-text-on-dark/30 bg-background text-text-primary"
                  placeholder="amazon.com/stores/... or B0XXXXXXXXX"
                />
              </div>
              <div>
                <Label
                  htmlFor={`${formId}-markets`}
                  className="text-text-on-dark"
                >
                  Marketplaces
                </Label>
                <FormMultiSelect
                  id={`${formId}-markets`}
                  label="Marketplaces"
                  className="mt-2"
                  options={wizard.marketplaces}
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
            <fieldset>
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-on-dark"
                >
                  {stepTitles[3]}
                </h3>
                <p className="mt-2 text-body font-medium text-text-on-dark/75">
                  Helps us scope the right conversation for your catalog.
                </p>
              </legend>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {wizard.revenueOptions.map((option) => {
                  const checked = values.monthlyRevenue === option.value;
                  return (
                    <li key={option.value}>
                      <label
                        className={cn(
                          "flex min-h-14 cursor-pointer items-center border-2 px-4 py-3 text-sm font-bold",
                          checked
                            ? "border-accent bg-accent text-primary"
                            : "border-text-on-dark/25 text-text-on-dark hover:border-accent",
                        )}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name={`${formId}-revenue-ui`}
                          checked={checked}
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
            </fieldset>
          ) : null}

          {step === 5 ? (
            <fieldset className="space-y-5">
              <legend>
                <h3
                  id={headingId}
                  className="text-2xl font-bold tracking-tight text-text-on-dark"
                >
                  {stepTitles[4]}
                </h3>
                <p className="mt-2 text-body font-medium text-text-on-dark/75">
                  So a strategist can reach you to schedule the conversation.
                </p>
              </legend>
              <PhoneField
                id={`${formId}-phone`}
                label="Phone number"
                value={values.phone}
                onChange={(phone) =>
                  setValues((prev) => ({ ...prev, phone }))
                }
                tone="dark"
                labelClassName="text-text-on-dark"
              />
              <div>
                <Label htmlFor={`${formId}-note`} className="text-text-on-dark">
                  Additional note (optional)
                </Label>
                <Textarea
                  id={`${formId}-note`}
                  value={values.note}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      note: event.target.value,
                    }))
                  }
                  className="mt-2 min-h-24 border-text-on-dark/30 bg-background text-text-primary"
                  placeholder="Anything we should know before we talk."
                />
              </div>
              <label className="flex items-start gap-3 text-sm font-medium text-text-on-dark/90">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 border-primary"
                  checked={values.consent}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      consent: event.target.checked,
                    }))
                  }
                />
                <span>
                  {wizard.consentLabel}{" "}
                  <Link
                    href="/privacy-policy/"
                    className="underline underline-offset-2 hover:text-accent"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </fieldset>
          ) : null}
        </div>

        {stepError ? (
          <p
            className="mt-5 border-2 border-accent bg-accent px-4 py-3 text-sm font-bold text-primary"
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
                "border-2 px-4 py-3",
                state.success
                  ? "border-accent bg-accent text-primary"
                  : "border-accent/80 bg-primary text-accent",
              )}
            >
              {state.message}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={goPrevious}
              className="inline-flex min-h-11 items-center border-2 border-text-on-dark/40 px-5 text-small font-bold uppercase tracking-[0.06em] text-text-on-dark hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Previous
            </button>
          ) : null}
          {step < TOTAL_STEPS ? (
            <PrimaryButton
              type="button"
              variant="accent"
              size="lg"
              onClick={goNext}
            >
              Next
            </PrimaryButton>
          ) : (
            <PrimaryButton
              type="submit"
              variant="accent"
              size="lg"
              disabled={pending}
            >
              {pending ? "Submitting…" : wizard.submitLabel}
            </PrimaryButton>
          )}
        </div>
      </form>
    </div>
  );
}
