/**
 * All lead forms deliver through this notifier:
 * - Branded HTML email to the team inbox via Hostinger SMTP (info@ecomgliders.com)
 * - Branded confirmation email to the submitter when an email is present
 * - Discord webhook embed when DISCORD_FORM_WEBHOOK_URL is set
 *
 * Email and Discord are independent: both always attempt; one failure never blocks the other.
 */
import {
  buildTeamNotificationHtml,
  buildUserConfirmationHtml,
} from "@/infrastructure/forms/form-email-templates";
import { notifyDiscordFormSubmission } from "@/infrastructure/forms/discord-form-webhook";
import {
  getFormNotificationMeta,
  normalizeFormType,
  resolveFormDisplayTitle,
  type AnyFormNotificationType,
  type FormNotificationType,
} from "@/infrastructure/forms/form-notification-meta";
import {
  isSmtpReady,
  sendSmtpEmail,
} from "@/infrastructure/forms/smtp-mailer";

export type { FormNotificationType, AnyFormNotificationType };

interface FormNotificationPayload {
  formType: AnyFormNotificationType;
  subject: string;
  fields: Record<string, string>;
}

function sanitizeForLog(fields: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      if (/e-?mail/i.test(key) || /^phone$/i.test(key) || /phone/i.test(key)) {
        return [key, "[redacted]"];
      }
      return [key, value.length > 120 ? `${value.slice(0, 120)}…` : value];
    }),
  );
}

function extractSubmitterEmail(fields: Record<string, string>): string | undefined {
  const entry = Object.entries(fields).find(([key, value]) => {
    if (!/e-?mail/i.test(key)) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  });
  return entry?.[1]?.trim();
}

function extractSubmitterName(fields: Record<string, string>): string | undefined {
  const entry = Object.entries(fields).find(([key]) => /^name$/i.test(key.trim()));
  return entry?.[1]?.trim() || undefined;
}

function teamInbox(): string {
  return (
    process.env.FORM_NOTIFICATION_EMAIL?.trim() ||
    process.env.CONTACT_FORM_TO?.trim() ||
    "info@ecomgliders.com"
  );
}

async function settledOk(task: Promise<boolean>): Promise<boolean> {
  const result = await Promise.allSettled([task]);
  const first = result[0];
  if (first.status === "fulfilled") return first.value;
  console.error("[form-submission] channel threw", first.reason);
  return false;
}

export async function notifyFormSubmission(
  payload: FormNotificationPayload,
): Promise<{
  delivered: boolean;
  mode: "email" | "discord" | "both" | "logged";
  channels: { email: boolean; discord: boolean };
}> {
  const formType = normalizeFormType(payload.formType);
  const meta = getFormNotificationMeta(formType);
  const displayTitle = resolveFormDisplayTitle(formType, payload.fields);
  const normalized = { ...payload, formType };
  const to = teamInbox();
  const team = buildTeamNotificationHtml(normalized);
  const submitterEmail = extractSubmitterEmail(payload.fields);
  const submitterName = extractSubmitterName(payload.fields);
  const smtpReady = isSmtpReady();
  const emailSubject = `[eCom Gliders] ${displayTitle}: ${payload.subject}`;

  // Always fire Discord + team email in parallel. Failures are isolated.
  const [discordOk, teamEmailOk] = await Promise.all([
    settledOk(notifyDiscordFormSubmission(normalized)),
    settledOk(
      (async () => {
        if (!smtpReady) return false;
        return sendSmtpEmail({
          to: [to],
          subject: emailSubject,
          text: team.text,
          html: team.html,
          replyTo: submitterEmail,
        });
      })(),
    ),
  ]);

  // Confirmation to submitter — best effort; never gates team/discord success.
  if (smtpReady && submitterEmail) {
    const confirmation = buildUserConfirmationHtml({
      formType,
      recipientName: submitterName,
    });
    void settledOk(
      sendSmtpEmail({
        to: [submitterEmail],
        subject: confirmation.subject,
        text: confirmation.text,
        html: confirmation.html,
      }),
    );
  }

  if (!smtpReady) {
    console.info("[form-submission]", {
      formType,
      webhook: meta.webhook,
      subject: payload.subject,
      to,
      smtp: "not configured — set SMTP_USER + SMTP_PASS",
      discord: discordOk,
      fields: sanitizeForLog(payload.fields),
    });
  }

  const delivered = teamEmailOk || discordOk;

  let mode: "email" | "discord" | "both" | "logged";
  if (teamEmailOk && discordOk) mode = "both";
  else if (teamEmailOk) mode = "email";
  else if (discordOk) mode = "discord";
  else mode = smtpReady ? "email" : "logged";

  if (!delivered) {
    console.error("[form-submission] all channels failed", {
      formType: payload.formType,
      subject: payload.subject,
    });
  }

  return {
    delivered,
    mode,
    channels: { email: teamEmailOk, discord: discordOk },
  };
}
