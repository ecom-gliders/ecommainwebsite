"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/domain/forms/contact-form.schema";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { resolveFormAttribution } from "@/infrastructure/forms/form-attribution";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { getFormNotificationMeta } from "@/infrastructure/forms/form-notification-meta";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

export async function submitContactForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const copy = getFormNotificationMeta("contact");
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "contact");

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

  const parsed = contactFormSchema.safeParse({
    name: getFormString(formData, "name"),
    email: getFormString(formData, "email"),
    phone: getFormString(formData, "phone"),
    serviceInterest: getFormString(formData, "serviceInterest"),
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
  const attribution = await resolveFormAttribution(formData);

  const delivery = await notifyFormSubmission({
    formType: "contact",
    subject: `Contact form: ${fields.name}`,
    fields: {
      Name: fields.name,
      Email: fields.email,
      Phone: fields.phone,
      "Service interest": fields.serviceInterest ?? "",
      Message: fields.message,
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
