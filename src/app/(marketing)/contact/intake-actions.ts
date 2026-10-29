"use server";

import { headers } from "next/headers";
import { contactIntakeFormSchema } from "@/domain/forms/contact-intake-form.schema";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { resolveFormAttribution } from "@/infrastructure/forms/form-attribution";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { getFormNotificationMeta } from "@/infrastructure/forms/form-notification-meta";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

function getFormStringArray(formData: FormData, name: string): string[] {
  return formData
    .getAll(name)
    .flatMap((value) => (typeof value === "string" ? [value.trim()] : []))
    .filter((value) => value.length > 0);
}

export async function submitContactIntakeForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const copy = getFormNotificationMeta("contact-intake");
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "contact-intake");

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

  const parsed = contactIntakeFormSchema.safeParse({
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    services: getFormStringArray(formData, "services"),
    brandName: getFormString(formData, "brandName"),
    amazonStoreUrl:
      getFormString(formData, "amazonStoreUrl") ||
      getFormString(formData, "storeOrAsin") ||
      "",
    marketplaces: getFormStringArray(formData, "marketplaces"),
    monthlyRevenue: getFormString(formData, "monthlyRevenue"),
    phone: getFormString(formData, "phone"),
    note: getFormString(formData, "note") ?? "",
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
  const attribution = await resolveFormAttribution(formData);

  const delivery = await notifyFormSubmission({
    formType: "contact-intake",
    subject: `Strategy intake: ${fields.name}`,
    fields: {
      Intent: "strategy_intake",
      Name: fields.name,
      Email: fields.email,
      Services: fields.services.join(", "),
      Brand: fields.brandName,
      "Amazon store URL": fields.amazonStoreUrl,
      Marketplaces: fields.marketplaces.join(", "),
      "Monthly revenue": fields.monthlyRevenue,
      Phone: fields.phone,
      Note: fields.note ?? "",
      ...attribution,
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
