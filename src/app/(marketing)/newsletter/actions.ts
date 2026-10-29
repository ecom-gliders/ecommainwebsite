"use server";

import { headers } from "next/headers";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { newsletterFormSchema } from "@/domain/forms/newsletter-form.schema";
import { subscribeToBeehiiv } from "@/infrastructure/forms/beehiiv-subscribe";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

export async function submitNewsletterForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "newsletter");

  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      message: "Too many submissions. Please wait before trying again.",
    };
  }

  if (isHoneypotTriggered(formData.get("website"))) {
    return {
      success: true,
      message: "You are subscribed. Check your inbox for confirmation.",
    };
  }

  const parsed = newsletterFormSchema.safeParse({
    email: getFormString(formData, "email"),
    website: getFormString(formData, "website") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Enter a valid email address to subscribe.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { website: _honeypot, ...fields } = parsed.data;

  // Beehiiv + team notify run independently — one failure must not block the other.
  const [beehiivOk, delivery] = await Promise.all([
    subscribeToBeehiiv(fields.email),
    notifyFormSubmission({
      formType: "newsletter",
      subject: `Newsletter subscribe: ${fields.email}`,
      fields: {
        Email: fields.email,
        Source: "Site pre-footer",
      },
    }),
  ]);

  if (!beehiivOk && !delivery.delivered) {
    return {
      success: false,
      message: "We could not complete the subscription. Please try again shortly.",
    };
  }

  return {
    success: true,
    message: "You are subscribed. Check your inbox for confirmation.",
  };
}
