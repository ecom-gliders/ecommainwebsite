"use client";

import Link from "next/link";
import { useActionState, useId, type ReactNode } from "react";
import { submitAgencyPartnerForm } from "@/app/(marketing)/agency-partnership/actions";
import type { AgencyPartnershipPageConfig } from "@/domain/content/schemas";
import {
  initialFormActionState,
  type FormActionState,
} from "@/domain/forms/form-action-state";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ApplicationConfig = AgencyPartnershipPageConfig["application"];

interface PartnerApplicationFormProps {
  application: ApplicationConfig;
}

function fieldError(
  state: FormActionState,
  key: string,
): string | undefined {
  return state.fieldErrors?.[key]?.[0];
}

export function PartnerApplicationForm({
  application,
}: PartnerApplicationFormProps) {
  const formId = useId();
  const liveId = `${formId}-live`;
  const [state, formAction, pending] = useActionState(
    submitAgencyPartnerForm,
    initialFormActionState,
  );

  if (state.success) {
    return (
      <div
        className="border-2 border-primary bg-accent p-6 shadow-[6px_6px_0_0_#131311] sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          Application received
        </p>
        <p className="mt-3 max-w-xl text-lg font-medium leading-relaxed text-primary">
          {state.message || application.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="relative space-y-6" noValidate>
      <div
        id={liveId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.message}
      </div>

      {state.message && !state.success ? (
        <p
          className="border-2 border-primary bg-background px-4 py-3 text-sm font-medium text-primary"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Your name"
          error={fieldError(state, "name")}
        >
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(fieldError(state, "name"))}
            className="border-2 border-primary"
          />
        </Field>
        <Field
          id={`${formId}-email`}
          label="Work email"
          error={fieldError(state, "email")}
        >
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(fieldError(state, "email"))}
            className="border-2 border-primary"
          />
        </Field>
        <Field
          id={`${formId}-phone`}
          label="Phone"
          error={fieldError(state, "phone")}
        >
          <Input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(fieldError(state, "phone"))}
            className="border-2 border-primary"
          />
        </Field>
        <Field
          id={`${formId}-agency`}
          label="Agency name"
          error={fieldError(state, "agencyName")}
        >
          <Input
            id={`${formId}-agency`}
            name="agencyName"
            required
            aria-invalid={Boolean(fieldError(state, "agencyName"))}
            className="border-2 border-primary"
          />
        </Field>
      </div>

      <Field
        id={`${formId}-website`}
        label="Agency website"
        error={fieldError(state, "agencyWebsite")}
      >
        <Input
          id={`${formId}-website`}
          name="agencyWebsite"
          type="url"
          placeholder="https://"
          required
          aria-invalid={Boolean(fieldError(state, "agencyWebsite"))}
          className="border-2 border-primary"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-lane`}
          label="Partnership lane"
          error={fieldError(state, "partnershipLane")}
        >
          <Select
            id={`${formId}-lane`}
            name="partnershipLane"
            required
            defaultValue=""
            aria-invalid={Boolean(fieldError(state, "partnershipLane"))}
            className="border-2 border-primary"
          >
            <option value="" disabled>
              Select a lane
            </option>
            {application.laneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          id={`${formId}-volume`}
          label="Approximate client volume"
          error={fieldError(state, "volumeIntent")}
        >
          <Select
            id={`${formId}-volume`}
            name="volumeIntent"
            required
            defaultValue=""
            aria-invalid={Boolean(fieldError(state, "volumeIntent"))}
            className="border-2 border-primary"
          >
            <option value="" disabled>
              Select volume intent
            </option>
            {application.volumeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id={`${formId}-services`}
        label="Services you offer today"
        error={fieldError(state, "servicesOffered")}
      >
        <Textarea
          id={`${formId}-services`}
          name="servicesOffered"
          rows={3}
          required
          aria-invalid={Boolean(fieldError(state, "servicesOffered"))}
          className="border-2 border-primary"
        />
      </Field>

      <Field
        id={`${formId}-gap`}
        label="Amazon work your clients need that you do not staff"
        error={fieldError(state, "amazonGap")}
      >
        <Textarea
          id={`${formId}-gap`}
          name="amazonGap"
          rows={3}
          required
          aria-invalid={Boolean(fieldError(state, "amazonGap"))}
          className="border-2 border-primary"
        />
      </Field>

      <Field
        id={`${formId}-fit`}
        label="Short fit note"
        error={fieldError(state, "fitNote")}
      >
        <Textarea
          id={`${formId}-fit`}
          name="fitNote"
          rows={3}
          required
          aria-invalid={Boolean(fieldError(state, "fitNote"))}
          className="border-2 border-primary"
          placeholder="Why this partnership fits your agency and clients"
        />
      </Field>

      <div className="flex items-start gap-3">
        <input
          id={`${formId}-consent`}
          name="consent"
          type="checkbox"
          value="true"
          required
          className="mt-1 h-4 w-4 border-2 border-primary accent-accent"
          aria-invalid={Boolean(fieldError(state, "consent"))}
        />
        <Label htmlFor={`${formId}-consent`} className="text-sm leading-relaxed">
          {application.consentLabel}{" "}
          <Link
            href="/privacy-policy/"
            className="font-semibold underline underline-offset-2 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </Label>
      </div>
      {fieldError(state, "consent") ? (
        <p className="text-sm font-medium text-red-700" role="alert">
          {fieldError(state, "consent")}
        </p>
      ) : null}

      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-hp`}>Website</label>
        <input
          id={`${formId}-hp`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <PrimaryButton type="submit" variant="accent" size="lg" disabled={pending}>
        {pending ? "Submitting…" : application.submitLabel}
      </PrimaryButton>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className={cn("text-sm font-medium text-red-700")} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
