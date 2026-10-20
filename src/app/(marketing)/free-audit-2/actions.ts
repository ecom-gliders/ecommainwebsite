"use server";

import { headers } from "next/headers";
import { auditFormSchema } from "@/domain/forms/audit-form.schema";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

const CORE_FORM_KEYS = new Set([
  "name",
  "email",
  "phone",
  "brandName",
  "amazonStoreUrl",
  "monthlyRevenue",
  "message",
  "consent",
  "website",
  "serviceInterest",
  "serviceSlug",
]);

/** Forward researched per-service qualification answers into the notification. */
function collectQualificationFields(
  formData: FormData,
): Record<string, string> {
  const extras: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (CORE_FORM_KEYS.has(key)) continue;
    if (typeof value !== "string") continue;
    if (!/^[a-zA-Z][a-zA-Z0-9_]{1,40}$/.test(key)) continue;

    const trimmed = value.trim().slice(0, 500);
    if (!trimmed) continue;

    const label = key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    extras[label] = trimmed;
  }

  return extras;
}

export async function submitAuditForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "audit");

  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      message: "Too many submissions. Please wait before trying again.",
    };
  }

  if (isHoneypotTriggered(formData.get("website"))) {
    return {
      success: true,
      message: "Your audit request was received. A strategist will contact you within one business day.",
    };
  }

  const parsed = auditFormSchema.safeParse({
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    brandName: getFormString(formData, "brandName"),
    amazonStoreUrl: getFormString(formData, "amazonStoreUrl") ?? "",
    monthlyRevenue: getFormString(formData, "monthlyRevenue"),
    message: getFormString(formData, "message"),
    consent: formData.get("consent") === "true" ? "true" : undefined,
    website: getFormString(formData, "website") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      message: "We could not submit the form. Review the fields below and try again.",
      fieldErrors,
    };
  }

  const { website: _honeypot, consent: _consent, ...fields } = parsed.data;
  const serviceInterest = (getFormString(formData, "serviceInterest") ?? "").trim();
  const serviceSlug = (getFormString(formData, "serviceSlug") ?? "").trim();
  const qualificationFields = collectQualificationFields(formData);

  const delivery = await notifyFormSubmission({
    formType: "audit",
    subject: serviceInterest
      ? `Free audit request (${serviceInterest}): ${fields.name}`
      : `Free audit request: ${fields.name}`,
    fields: {
      Name: fields.name,
      Email: fields.email,
      Phone: fields.phone,
      "Brand name": fields.brandName ?? "",
      "Amazon store URL": fields.amazonStoreUrl ?? "",
      "Monthly revenue": fields.monthlyRevenue ?? "",
      Message: fields.message ?? "",
      ...(serviceInterest ? { Service: serviceInterest } : {}),
      ...(serviceSlug ? { "Service slug": serviceSlug } : {}),
      ...qualificationFields,
    },
  });

  if (!delivery.delivered) {
    return {
      success: false,
      message: "We could not deliver your request. Please call us directly or try again later.",
    };
  }

  return {
    success: true,
    message: "Your audit request was received. A strategist will contact you within one business day.",
  };
}