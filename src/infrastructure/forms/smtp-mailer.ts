import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export interface SmtpMailAttachment {
  filename: string;
  path: string;
  cid: string;
}

export interface SmtpMailInput {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: SmtpMailAttachment[];
}

function smtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim(),
  );
}

function createTransport() {
  const host = process.env.SMTP_HOST?.trim() || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || "465");
  // Hostinger default: 465 SSL. Set SMTP_SECURE=false + SMTP_PORT=587 for STARTTLS.
  const secure =
    process.env.SMTP_SECURE === "false"
      ? false
      : process.env.SMTP_SECURE === "true"
        ? true
        : port === 465;

  const options: SMTPTransport.Options = {
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER!.trim(),
      pass: process.env.SMTP_PASS!,
    },
  };

  if (!secure && port === 587) {
    options.requireTLS = true;
  }

  return nodemailer.createTransport(options);
}

function fromAddress(): string {
  return (
    process.env.FORM_FROM_EMAIL?.trim() ||
    `eCom Gliders <${process.env.SMTP_USER?.trim() || "info@ecomgliders.com"}>`
  );
}

/**
 * Sends one email via Hostinger SMTP (nodemailer).
 * Returns false when SMTP env is missing or send fails — never throws to callers.
 */
export async function sendSmtpEmail(input: SmtpMailInput): Promise<boolean> {
  if (!smtpConfigured()) {
    return false;
  }

  try {
    const transport = createTransport();
    const info = await transport.sendMail({
      from: fromAddress(),
      to: input.to.join(", "),
      subject: input.subject,
      text: input.text,
      html: input.html,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
      ...(input.attachments?.length
        ? {
            attachments: input.attachments.map((file) => ({
              filename: file.filename,
              path: file.path,
              cid: file.cid,
              contentDisposition: "inline" as const,
            })),
          }
        : {}),
    });

    if (info.rejected && info.rejected.length > 0) {
      console.error("[form-submission] smtp rejected recipients", info.rejected);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[form-submission] smtp send failed", error);
    return false;
  }
}

export function isSmtpReady(): boolean {
  return smtpConfigured();
}
