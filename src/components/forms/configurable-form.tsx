"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormActionState } from "@/domain/forms/form-action-state";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";

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
      className={cn(compact ? "space-y-2.5" : "space-y-6", className)}
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
        {hiddenFields
          ? Object.entries(hiddenFields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))
          : null}
      </div>

      <div
        className={cn(
          columns === 2
            ? cn(
                "grid grid-cols-1 sm:grid-cols-2",
                compact ? "gap-x-2.5 gap-y-2.5" : "gap-x-3 gap-y-3.5",
              )
            : compact
              ? "space-y-2.5"
              : "space-y-6",
        )}
      >
        {fields.map((field) => {
          const fieldId = `${formId}-${field.name}`;
          const error = state.fieldErrors?.[field.name]?.[0];
          const errorId = error ? `${fieldId}-error` : undefined;
          const spansFull =
            columns === 2 &&
            (field.type === "textarea" || field.name === "message");

          return (
            <div
              key={field.name}
              className={cn(
                compact ? "space-y-1" : "space-y-1.5",
                spansFull && "sm:col-span-2",
              )}
            >
              <Label
                htmlFor={fieldId}
                className={cn(
                  "text-text-primary",
                  compact ? "text-xs font-medium" : "text-sm",
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
                  rows={compact ? 2 : 5}
                  className={cn(
                    fieldControlClass,
                    compact && "min-h-14 py-2 text-sm",
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
                  className={cn(controlHeight, error && "border-error")}
                  options={field.options ?? []}
                />
              ) : (
                <Input
                  id={fieldId}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  aria-invalid={Boolean(error)}
                  aria-describedby={errorId}
                  className={cn(
                    fieldControlClass,
                    controlHeight,
                    error && "border-error",
                  )}
                />
              )}

              {error ? (
                <p id={errorId} className="text-xs text-error" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={cn(compact ? "space-y-1.5" : "space-y-2")}>
        <div className="flex items-start gap-2.5">
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            value="true"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-primary"
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
              "font-normal leading-snug text-text-secondary",
              compact ? "text-xs" : "text-small",
            )}
          >
            {consentLabel}{" "}
            <Link
              href="/privacy-policy-2/"
              className="text-primary underline underline-offset-2 hover:text-accent"
            >
              Privacy policy
            </Link>
          </Label>
        </div>
        {state.fieldErrors?.consent ? (
          <p
            id={`${formId}-consent-error`}
            className="text-xs text-error"
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
              "rounded-sm border px-3 py-2 text-xs sm:text-small",
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
