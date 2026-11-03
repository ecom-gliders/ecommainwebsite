"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { FormActionState } from "@/domain/forms/form-action-state";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormAttributionFields } from "@/components/forms/form-attribution-fields";
import { PhoneField } from "@/components/forms/phone-field";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

function ConfigurablePhoneField({
  id,
  name,
  label,
  required,
  error,
  size = "md",
  className,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const [value, setValue] = useState("");
  return (
    <PhoneField
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={setValue}
      required={required}
      error={error}
      size={size}
      className={className}
    />
  );
}

interface FormFieldOption {
  value: string;
  label: string;
}

interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "select";
  required: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
}

interface ConfigurableFormProps {
  formId: string;
  fields: FormFieldConfig[];
  submitLabel: string;
  consentLabel: string;
  action: (
    state: FormActionState,
    formData: FormData,
  ) => FormActionState | Promise<FormActionState>;
  initialState: FormActionState;
  density?: "default" | "compact";
  columns?: 1 | 2;
  submitVariant?: "primary" | "accent";
  submitFullWidth?: boolean;
  /** Extra hidden inputs (e.g. service slug) included in FormData */
  hiddenFields?: Record<string, string>;
  className?: string;
}

const fieldControlClass =
  "border-border bg-background text-text-primary placeholder:text-text-secondary focus-visible:ring-primary";

export function ConfigurableForm({
  formId,
  fields,
  submitLabel,
  consentLabel,
  action,
  initialState,
  density = "default",
  columns = 1,
  submitVariant = "primary",
  submitFullWidth = false,
  hiddenFields,
  className,
}: ConfigurableFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const compact = density === "compact";
  const controlHeight = compact ? "h-10" : "h-11";

  return (
    <form
      id={formId}
      action={formAction}
      noValidate
      className={cn(compact ? "space-y-4" : "space-y-6", className)}
      aria-describedby={`${formId}-status`}
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
        {/* leadChannel must be set explicitly via hiddenFields:
            get-in-touch (homepage only) | service-lead | full-funnel */}
        {hiddenFields
          ? Object.entries(hiddenFields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))
          : null}
        <FormAttributionFields />
      </div>

      <div
        className={cn(
          columns === 2
            ? cn(
                // items-start keeps labels top-aligned across the row.
                "grid grid-cols-1 items-start sm:grid-cols-2",
                compact ? "gap-x-3 gap-y-3.5" : "gap-x-4 gap-y-4",
              )
            : compact
              ? "space-y-3.5"
              : "space-y-6",
        )}
      >
        {fields.map((field) => {
          const fieldId = `${formId}-${field.name}`;
          const error = state.fieldErrors?.[field.name]?.[0];
          const errorId = error ? `${fieldId}-error` : undefined;
          const isStoreUrl =
            field.name === "amazonStoreUrl" || field.type === "url";
          // Long fields need full row width in 2-col layouts — half-columns
          // leave empty gaps (store URL) or clip select option labels.
          const spansFull =
            columns === 2 &&
            (field.type === "textarea" ||
              field.type === "select" ||
              field.type === "url" ||
              isStoreUrl ||
              field.name === "message");

          if (field.name === "phone" || field.type === "tel") {
            return (
              <ConfigurablePhoneField
                key={field.name}
                id={fieldId}
                name={field.name}
                label={field.label}
                required={field.required}
                error={error}
                size={compact ? "sm" : "md"}
                className={cn(spansFull && "sm:col-span-2")}
              />
            );
          }

          return (
            <div
              key={field.name}
              className={cn(
                "flex min-w-0 flex-col",
                compact ? "gap-1.5" : "gap-2",
                spansFull && "sm:col-span-2",
              )}
            >
              <Label
                htmlFor={fieldId}
                className={cn(
                  "block leading-snug text-text-primary",
                  compact ? "text-sm font-semibold" : "text-sm font-medium",
                )}
              >
                {field.label}
                {field.required ? (
                  <span className="text-error" aria-hidden="true">
                    {" "}
                    *
                  </span>
                ) : null}
              </Label>

              {field.type === "textarea" ? (
                <Textarea
                  id={fieldId}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(error)}
                  aria-describedby={errorId}
                  rows={compact ? 3 : 5}
                  className={cn(
                    fieldControlClass,
                    compact ? "min-h-[5.5rem] px-3.5 py-2.5 text-sm" : "px-3.5 py-3",
                    error && "border-error",
                  )}
                />
              ) : field.type === "select" ? (
                <FormSelect
                  id={fieldId}
                  name={field.name}
                  required={field.required}
                  aria-invalid={Boolean(error)}
                  aria-describedby={errorId}
                  className={cn(controlHeight, "w-full", error && "border-error")}
                  options={field.options ?? []}
                />
              ) : (
                <Input
                  id={fieldId}
                  name={field.name}
                  type={isStoreUrl ? "text" : field.type}
                  inputMode={isStoreUrl ? "url" : undefined}
                  autoComplete={
                    isStoreUrl
                      ? "url"
                      : field.name === "name"
                        ? "name"
                        : field.name === "email"
                          ? "email"
                          : field.name === "phone"
                            ? "tel"
                            : field.name === "brandName"
                              ? "organization"
                              : undefined
                  }
                  required={field.required}
                  placeholder={
                    isStoreUrl
                      ? field.placeholder ||
                        "amazon.com/stores/... or B0XXXXXXXXX"
                      : field.placeholder
                  }
                  aria-invalid={Boolean(error)}
                  aria-describedby={errorId}
                  className={cn(
                    fieldControlClass,
                    controlHeight,
                    "min-w-0 px-3.5",
                    error && "border-error",
                  )}
                />
              )}

              {error ? (
                <p id={errorId} className="text-sm text-error" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={cn(compact ? "space-y-2" : "space-y-2")}>
        <div className="flex items-start gap-3">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            value="true"
            required
            className="mt-1 h-5 w-5 shrink-0 rounded-[4px] border-2 border-primary bg-background accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-invalid={Boolean(state.fieldErrors?.consent)}
            aria-describedby={
              state.fieldErrors?.consent
                ? `${formId}-consent-error`
                : `${formId}-consent-label`
            }
          />
          <Label
            id={`${formId}-consent-label`}
            htmlFor={`${formId}-consent`}
            className={cn(
              "cursor-pointer font-medium leading-relaxed text-primary/85",
              compact ? "text-sm" : "text-small",
            )}
          >
            {consentLabel}{" "}
            <Link
              href="/privacy-policy/"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary/70"
            >
              Privacy policy
            </Link>
          </Label>
        </div>
        {state.fieldErrors?.consent ? (
          <p
            id={`${formId}-consent-error`}
            className="text-sm text-error"
            role="alert"
          >
            {state.fieldErrors.consent[0]}
          </p>
        ) : null}
      </div>

      <div id={`${formId}-status`} aria-live="polite">
        {state.message ? (
          <p
            className={cn(
              "rounded-sm border px-3 py-2 text-sm",
              state.success
                ? "border-success/30 bg-success/10 text-text-primary"
                : "border-error/30 bg-error/10 text-text-primary",
            )}
            role={state.success ? "status" : "alert"}
          >
            {state.message}
          </p>
        ) : null}
      </div>

      <PrimaryButton
        type="submit"
        disabled={pending}
        variant={submitVariant}
        size={compact ? "sm" : "default"}
        className={cn(submitFullWidth && "w-full justify-center")}
      >
        {pending ? "Submitting..." : submitLabel}
      </PrimaryButton>
    </form>
  );
}
