"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { FreeAuditFunnelData } from "@/components/free-audit/free-audit-funnel-context";
import {
  AuditFunnelWizard,
  type AuditFunnelSubmitPayload,
} from "@/components/free-audit/audit-funnel-wizard";
import { CalendlyInlineEmbed } from "@/components/free-audit/calendly-inline-embed";
import { cn } from "@/lib/utils";

interface FreeAuditFunnelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: FreeAuditFunnelData["form"];
  funnel: FreeAuditFunnelData["funnel"];
}

type DialogPhase = "funnel" | "booking";

function withCalendlyPrefill(
  baseUrl: string,
  payload: AuditFunnelSubmitPayload,
): string {
  try {
    const parsed = new URL(baseUrl);
    const name = payload.name.trim();
    const email = payload.email.trim();
    if (name) parsed.searchParams.set("name", name);
    if (email) parsed.searchParams.set("email", email);
    return parsed.toString();
  } catch {
    return baseUrl;
  }
}

/**
 * Modal host for the existing AuditFunnelWizard.
 * After a successful submit, replaces the funnel with the strategy Calendly embed.
 */
export function FreeAuditFunnelDialog({
  open,
  onOpenChange,
  form,
  funnel,
}: FreeAuditFunnelDialogProps) {
  const [phase, setPhase] = useState<DialogPhase>("funnel");
  const [bookingUrl, setBookingUrl] = useState(funnel.booking.calendlyUrl);

  useEffect(() => {
    if (!open) {
      setPhase("funnel");
      setBookingUrl(funnel.booking.calendlyUrl);
    }
  }, [open, funnel.booking.calendlyUrl]);

  const handleSubmitted = useCallback(
    (payload: AuditFunnelSubmitPayload) => {
      setBookingUrl(
        withCalendlyPrefill(funnel.booking.calendlyUrl, payload),
      );
      setPhase("booking");
    },
    [funnel.booking.calendlyUrl],
  );

  const isBooking = phase === "booking";

  const title = isBooking
    ? funnel.booking.heading
    : "Request a free audit";
  const subtitle = isBooking
    ? funnel.booking.subheading
    : "Five short steps. Same intake as before.";

  const contentClass = useMemo(
    () =>
      cn(
        "flex min-h-0 flex-1 flex-col",
        isBooking
          ? "overflow-y-auto overscroll-contain p-3 sm:p-5 [scrollbar-color:#131311_#C6FD50] [scrollbar-width:thin]"
          : "overflow-hidden p-3 sm:p-5",
      ),
    [isBooking],
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[80] bg-primary/55 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed inset-x-0 bottom-0 z-[81] flex max-h-[92dvh] w-full flex-col border-2 border-primary bg-background shadow-[0_-8px_0_0_#131311]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[min(90vh,52rem)] sm:w-[min(100%-2rem,40rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:shadow-[8px_8px_0_0_#131311]",
            "sm:data-[state=closed]:fade-out-0 sm:data-[state=open]:fade-in-0 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=open]:slide-in-from-bottom-0",
          )}
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b-2 border-primary bg-accent px-4 py-3 sm:px-5">
            <div className="min-w-0 pr-2">
              <DialogPrimitive.Title className="text-base font-bold tracking-tight text-primary sm:text-lg">
                {title}
              </DialogPrimitive.Title>
              <p className="mt-0.5 text-sm font-medium text-primary/75">
                {subtitle}
              </p>
            </div>
            <DialogPrimitive.Close
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border-2 border-primary bg-background text-primary transition-colors hover:bg-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              aria-label="Close free audit form"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <div className={contentClass}>
            {open && !isBooking ? (
              <AuditFunnelWizard
                key="funnel-open"
                form={form}
                funnel={funnel}
                onSubmitted={handleSubmitted}
              />
            ) : null}

            {open && isBooking ? (
              <div className="mx-auto w-full max-w-[28rem]">
                <p
                  className="mb-3 border-2 border-primary bg-accent px-4 py-3 text-sm font-bold text-primary"
                  role="status"
                  aria-live="polite"
                >
                  Request received. Choose a time for your strategy discussion.
                </p>
                <CalendlyInlineEmbed
                  key={bookingUrl}
                  url={bookingUrl}
                  title={funnel.booking.embedTitle}
                  eyebrow={funnel.booking.eyebrow}
                />
              </div>
            ) : null}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
