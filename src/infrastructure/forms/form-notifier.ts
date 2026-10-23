/**
 * All lead forms (contact, strategy intake, free audit / service variants)
 * deliver through this single notifier → Resend `POST /emails` → one inbox
 * (`FORM_NOTIFICATION_EMAIL`, fallback `CONTACT_FORM_TO`).
 *
 * Subjects stay form-specific for inbox filtering. Body layout is shared:
 * plain text, labeled lines, empty fields omitted.
 */
export type FormNotificationType = "contact" | "contact-intake" | "audit";

interface FormNotificationPayload {
  formType: FormNotificationType;
  subject: string;
  fields: Record<string, string>;
}

function sanitizeForLog(fields: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      value.length > 120 ? `${value.slice(0, 120)}…` : value,
    ]),
  );
}

function buildPlainTextBody(payload: FormNotificationPayload): string {
  const bodyLines = Object.entries(payload.fields)
    .filter(([, value]) => value.length > 0)
    .map(([key, value]) => `${key}: ${value}`);

  return [
    `Form: ${payload.formType}`,
    `Subject: ${payload.subject}`,
    "",
    ...bodyLines,
  ].join("\n");
}

export async function notifyFormSubmission(
  payload: FormNotificationPayload,
): Promise<{ delivered: boolean; mode: "email" | "logged" }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FORM_NOTIFICATION_EMAIL ?? process.env.CONTACT_FORM_TO;
  const from = process.env.FORM_FROM_EMAIL ?? "eCom Gliders Website <onboarding@resend.dev>";
  const textBody = buildPlainTextBody(payload);

  if (!apiKey || !to) {
    console.info("[form-submission]", {
      formType: payload.formType,
      subject: payload.subject,
      to: to ?? "(unset)",
      fields: sanitizeForLog(payload.fields),
    });
    return { delivered: true, mode: "logged" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: payload.subject,
      text: textBody,
    }),
  });

  if (!response.ok) {
    console.error("[form-submission] email delivery failed", response.status);
    return { delivered: false, mode: "email" };
  }

  return { delivered: true, mode: "email" };
}
