"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/domain/forms/contact-form.schema";
import {
  initialFormActionState,
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

export async function submitContactForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "contact");

  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      message: "Too many submissions. Please wait before trying again.",
    };
  }

  if (isHoneypotTriggered(formData.get("website"))) {
    return {
      success: true,
      message: "Your message was received. We will respond within one business day.",
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
      message: "We could not submit the form. Review the fields below and try again.",
      fieldErrors,
    };
  }

  const { website: _honeypot, consent: _consent, ...fields } = parsed.data;

  const delivery = await notifyFormSubmission({
    formType: "contact",
    subject: `Contact form: ${fields.name}`,
    fields: {
      Name: fields.name,
      Email: fields.email,
      Phone: fields.phone,
      "Service interest": fields.serviceInterest ?? "",
      Message: fields.message,
    },
  });

  if (!delivery.delivered) {
    return {
      success: false,
      message: "We could not deliver your message. Please call us directly or try again later.",
    };
  }

  return {
    success: true,
    message: "Your message was received. We will respond within one business day.",
  };
}