"use server";

import { headers } from "next/headers";
import { auditFormSchema } from "@/domain/forms/audit-form.schema";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { resolveFormAttribution } from "@/infrastructure/forms/form-attribution";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import {
  getFormNotificationMeta,
  resolveLeadFormType,
} from "@/infrastructure/forms/form-notification-meta";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

function getFormStringArray(formData: FormData, name: string): string[] {
  return formData
    .getAll(name)
    .flatMap((value) => (typeof value === "string" ? [value.trim()] : []))
    .filter((value) => value.length > 0);
}

const CORE_FORM_KEYS = new Set([
  "name",
  "email",
  "phone",
  "brandName",
  "amazonStoreUrl",
  "services",
  "marketplaces",
  "monthlyRevenue",
  "message",
  "consent",
  "website",
  "serviceInterest",
  "serviceSlug",
  "leadChannel",
  "pageUrl",
  "pagePath",
  "pageReferrer",
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
  const formType = resolveLeadFormType(getFormString(formData, "leadChannel"));
  const copy = getFormNotificationMeta(formType);
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, formType);

  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      message: copy.rateLimited,
    };
  }

  if (isHoneypotTriggered(formData.get("website"))) {
    return {
      success: true,
      message: copy.submitSuccess,
    };
  }

  const serviceInterest = (getFormString(formData, "serviceInterest") ?? "").trim();
  const serviceSlug = (getFormString(formData, "serviceSlug") ?? "").trim();
  let services = getFormStringArray(formData, "services");
  if (services.length === 0 && serviceInterest) {
    services = [serviceInterest];
  }

  const parsed = auditFormSchema.safeParse({
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    brandName: getFormString(formData, "brandName"),
    amazonStoreUrl: getFormString(formData, "amazonStoreUrl") ?? "",
    services,
    marketplaces: getFormStringArray(formData, "marketplaces"),
    monthlyRevenue: getFormString(formData, "monthlyRevenue"),
    message: getFormString(formData, "message"),
    consent: formData.get("consent") === "true" ? "true" : undefined,
    website: getFormString(formData, "website") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      success: false,
      message: copy.validationFailed,
      fieldErrors,
    };
  }

  const { website: _honeypot, consent: _consent, ...fields } = parsed.data;
  const qualificationFields = collectQualificationFields(formData);
  const attribution = await resolveFormAttribution(formData);
  const channelLabel =
    formType === "audit-funnel"
      ? "Full funnel"
      : formType === "get-in-touch"
        ? "Get in Touch"
        : "Service form";

  const delivery = await notifyFormSubmission({
    formType,
    subject: serviceInterest
      ? `${copy.label} (${serviceInterest}): ${fields.name}`
      : `${copy.label}: ${fields.name}`,
    fields: {
      Name: fields.name,
      Email: fields.email,
      Phone: fields.phone,
      "Brand name": fields.brandName ?? "",
      "Amazon store URL": fields.amazonStoreUrl,
      Services: fields.services.join(", "),
      Marketplaces: fields.marketplaces.join(", "),
      "Monthly revenue": fields.monthlyRevenue ?? "",
      Message: fields.message ?? "",
      Channel: channelLabel,
      ...(serviceInterest ? { Service: serviceInterest } : {}),
      ...(serviceSlug ? { "Service slug": serviceSlug } : {}),
      ...attribution,
      ...qualificationFields,
    },
  });

  if (!delivery.delivered) {
    return {
      success: false,
      message: copy.deliveryFailed,
    };
  }

  return {
    success: true,
    message: copy.submitSuccess,
  };
}
