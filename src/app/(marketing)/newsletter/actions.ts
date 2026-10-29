"use server";

import { headers } from "next/headers";
import {
  type FormActionState,
  getFormString,
} from "@/domain/forms/form-action-state";
import { newsletterFormSchema } from "@/domain/forms/newsletter-form.schema";
import { subscribeToBeehiiv } from "@/infrastructure/forms/beehiiv-subscribe";
import { resolveFormAttribution } from "@/infrastructure/forms/form-attribution";
import { notifyFormSubmission } from "@/infrastructure/forms/form-notifier";
import { getFormNotificationMeta } from "@/infrastructure/forms/form-notification-meta";
import { isHoneypotTriggered } from "@/lib/security/honeypot";
import { getRateLimitKey, isRateLimited } from "@/lib/security/rate-limit";

export async function submitNewsletterForm(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const copy = getFormNotificationMeta("newsletter");
  const requestHeaders = await headers();
  const rateLimitKey = getRateLimitKey(requestHeaders, "newsletter");

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

  const parsed = newsletterFormSchema.safeParse({
    email: getFormString(formData, "email"),
    website: getFormString(formData, "website") ?? "",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: copy.validationFailed,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { website: _honeypot, ...fields } = parsed.data;
  const attribution = await resolveFormAttribution(formData);

  // Beehiiv + team notify run independently — one failure must not block the other.
  const [beehiivOk, delivery] = await Promise.all([
    subscribeToBeehiiv(fields.email),
    notifyFormSubmission({
      formType: "newsletter",
      subject: `Newsletter subscribe: ${fields.email}`,
      fields: {
        Email: fields.email,
        Source: "Site pre-footer",
        ...attribution,
      },
    }),
  ]);

  if (!beehiivOk && !delivery.delivered) {
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
