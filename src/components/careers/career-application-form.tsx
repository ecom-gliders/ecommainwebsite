"use client";

import Link from "next/link";
import { useActionState, useId, type ReactNode } from "react";
import { submitCareerApplicationForm } from "@/app/(marketing)/careers/actions";
import type { CareersPageConfig } from "@/domain/content/schemas";
import { FormAttributionFields } from "@/components/forms/form-attribution-fields";
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

type ApplicationConfig = CareersPageConfig["application"];

interface CareerApplicationFormProps {
  application: ApplicationConfig;
  defaultRole?: string;
}

function fieldError(state: FormActionState, key: string): string | undefined {
  return state.fieldErrors?.[key]?.[0];
}

export function CareerApplicationForm({
  application,
  defaultRole,
}: CareerApplicationFormProps) {
  const formId = useId();
  const liveId = `${formId}-live`;
  const [state, formAction, pending] = useActionState(
    submitCareerApplicationForm,
    initialFormActionState,
  );

  const initialRole =
    defaultRole &&
    application.roleOptions.some((option) => option.value === defaultRole)
      ? defaultRole
      : "";

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
      <FormAttributionFields />
      <div id={liveId} className="sr-only" aria-live="polite" aria-atomic="true">
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
        <Field id={`${formId}-name`} label="Your name" error={fieldError(state, "name")}>
          <Input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(fieldError(state, "name"))}
            className="border-2 border-primary"
          />
        </Field>
        <Field id={`${formId}-email`} label="Email" error={fieldError(state, "email")}>
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
        <Field id={`${formId}-phone`} label="Phone" error={fieldError(state, "phone")}>
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
        <Field id={`${formId}-role`} label="Role" error={fieldError(state, "role")}>
          <Select
            id={`${formId}-role`}
            name="role"
            required
            defaultValue={initialRole}
            aria-invalid={Boolean(fieldError(state, "role"))}
            className="border-2 border-primary"
          >
            <option value="" disabled>
              Select a role
            </option>
            {application.roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-linkedin`}
          label="LinkedIn profile URL"
          error={fieldError(state, "linkedinUrl")}
        >
          <Input
            id={`${formId}-linkedin`}
            name="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/..."
            required
            aria-invalid={Boolean(fieldError(state, "linkedinUrl"))}
            className="border-2 border-primary"
          />
        </Field>
        <Field
          id={`${formId}-resume`}
          label="Resume or portfolio URL"
          error={fieldError(state, "resumeUrl")}
        >
          <Input
            id={`${formId}-resume`}
            name="resumeUrl"
            type="url"
            placeholder="https://"
            required
            aria-invalid={Boolean(fieldError(state, "resumeUrl"))}
            className="border-2 border-primary"
          />
        </Field>
      </div>

      <Field
        id={`${formId}-experience`}
        label="Amazon or ecommerce experience"
        error={fieldError(state, "amazonExperience")}
      >
        <Select
          id={`${formId}-experience`}
          name="amazonExperience"
          required
          defaultValue=""
          aria-invalid={Boolean(fieldError(state, "amazonExperience"))}
          className="border-2 border-primary"
        >
          <option value="" disabled>
            Select experience
          </option>
          {application.experienceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id={`${formId}-fit`}
        label="Relevant Amazon experience"
        error={fieldError(state, "fitNote")}
      >
        <Textarea
          id={`${formId}-fit`}
          name="fitNote"
          rows={4}
          required
          aria-invalid={Boolean(fieldError(state, "fitNote"))}
          className="border-2 border-primary"
          placeholder="Briefly describe relevant Amazon, advertising, or brand work"
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

      <div
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
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
