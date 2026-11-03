import {
  getFormNotificationMeta,
  normalizeFormType,
  type AnyFormNotificationType,
  type FormNotificationType,
} from "@/infrastructure/forms/form-notification-meta";

export type { FormNotificationType, AnyFormNotificationType };

const BRAND = {
  name: "eCom Gliders",
  lime: "#C6FD50",
  ink: "#131311",
  muted: "#5c5c57",
  line: "#e6e6e0",
  canvas: "#f4f4f1",
  phone: "+1 (360) 660-1210",
  email: "info@ecomgliders.com",
  site: "https://ecomgliders.com",
} as const;

function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    process.env.SITE_URL?.replace(/\/$/, "") ||
    BRAND.site
  );
}

function logoHtml(): string {
  return `<span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:900;letter-spacing:-0.03em;line-height:1;color:#ffffff;">eCom&nbsp;<span style="color:${BRAND.lime};">Gliders</span></span>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldRowsHtml(fields: Record<string, string>): string {
  const rows = Object.entries(fields).filter(([, value]) => value.trim().length > 0);
  return rows
    .map(([key, value], index) => {
      const border =
        index === rows.length - 1 ? "none" : `1px solid ${BRAND.line}`;
      return `
      <tr>
        <td style="padding:12px 0;border-bottom:${border};font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:${BRAND.muted};width:32%;vertical-align:top;text-transform:uppercase;letter-spacing:0.04em;">${escapeHtml(key)}</td>
        <td style="padding:12px 0;border-bottom:${border};font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${BRAND.ink};line-height:1.5;white-space:pre-wrap;word-break:break-word;">${escapeHtml(value)}</td>
      </tr>`;
    })
    .join("");
}

function shellHtml(options: {
  eyebrow: string;
  title: string;
  intro: string;
  bodyHtml: string;
  footerNote: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(options.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.canvas};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.canvas};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${BRAND.line};">
          <tr>
            <td style="background:${BRAND.ink};padding:20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    ${logoHtml()}
                  </td>
                  <td align="right" style="vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.55);">
                    ${escapeHtml(options.eyebrow)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="height:3px;background:${BRAND.lime};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 24px 8px;font-family:Arial,Helvetica,sans-serif;">
              <h1 style="margin:0;font-size:22px;line-height:1.25;font-weight:700;color:${BRAND.ink};">${escapeHtml(options.title)}</h1>
              <p style="margin:12px 0 0;font-size:15px;line-height:1.55;color:${BRAND.muted};">${escapeHtml(options.intro)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 24px 28px;font-family:Arial,Helvetica,sans-serif;">
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid ${BRAND.line};padding:18px 24px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.muted};">
              ${escapeHtml(options.footerNote)}
              <br />
              <a href="${siteOrigin()}" style="color:${BRAND.ink};text-decoration:underline;">ecomgliders.com</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="mailto:${BRAND.email}" style="color:${BRAND.ink};text-decoration:underline;">${BRAND.email}</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="tel:+13606601210" style="color:${BRAND.ink};text-decoration:underline;">${BRAND.phone}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildTeamNotificationHtml(input: {
  formType: AnyFormNotificationType;
  subject: string;
  fields: Record<string, string>;
}): { html: string; text: string } {
  const meta = getFormNotificationMeta(input.formType);
  const rows = fieldRowsHtml(input.fields);
  const html = shellHtml({
    eyebrow: meta.teamEyebrow,
    title: meta.label,
    intro: input.subject,
    bodyHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`,
    footerNote: "Internal notification from the eCom Gliders website.",
  });

  const text = [
    `${BRAND.name} — ${meta.label}`,
    input.subject,
    "",
    ...Object.entries(input.fields)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${k}: ${v}`),
    "",
    `${BRAND.email} · ${BRAND.phone}`,
  ].join("\n");

  return { html, text };
}

export function buildUserConfirmationHtml(input: {
  formType: AnyFormNotificationType;
  recipientName?: string;
}): { html: string; text: string; subject: string } {
  const name = input.recipientName?.trim() || "there";
  const meta = getFormNotificationMeta(input.formType);
  const intro = meta.confirmationIntro(name);

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.canvas};border-left:3px solid ${BRAND.lime};">
      <tr>
        <td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:${BRAND.ink};">
          ${escapeHtml(meta.confirmationNext)}
        </td>
      </tr>
    </table>
    <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${BRAND.muted};">
      If you did not submit this form, reply to this email and we will remove your details.
    </p>`;

  const html = shellHtml({
    eyebrow: meta.confirmationEyebrow,
    title: meta.confirmationSubject.replace(" — eCom Gliders", ""),
    intro,
    bodyHtml,
    footerNote: "eCom Gliders · Amazon agency since 2018.",
  });

  const text = [
    meta.confirmationSubject,
    "",
    intro,
    meta.confirmationNext,
    "",
    `${BRAND.email} · ${BRAND.phone}`,
    siteOrigin(),
  ].join("\n");

  return { html, text, subject: meta.confirmationSubject };
}

export function formTypeLabel(formType: AnyFormNotificationType): string {
  return getFormNotificationMeta(formType).label;
}

export { normalizeFormType };
