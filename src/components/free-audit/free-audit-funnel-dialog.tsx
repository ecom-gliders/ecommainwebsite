"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { FreeAuditFunnelData } from "@/components/free-audit/free-audit-funnel-context";
import { AuditFunnelWizard } from "@/components/free-audit/audit-funnel-wizard";
import { cn } from "@/lib/utils";

interface FreeAuditFunnelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: FreeAuditFunnelData["form"];
  funnel: FreeAuditFunnelData["funnel"];
}

/**
 * Modal host for the existing AuditFunnelWizard — same steps/fields/actions.
 */
export function FreeAuditFunnelDialog({
  open,
  onOpenChange,
  form,
  funnel,
}: FreeAuditFunnelDialogProps) {
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
                Request a free audit
              </DialogPrimitive.Title>
              <p className="mt-0.5 text-sm font-medium text-primary/75">
                Five short steps. Same intake as before.
              </p>
            </div>
            <DialogPrimitive.Close
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border-2 border-primary bg-background text-primary transition-colors hover:bg-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              aria-label="Close free audit form"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-3 sm:p-5">
            {/* Remount wizard when opened so steps reset cleanly */}
            {open ? (
              <AuditFunnelWizard key="funnel-open" form={form} funnel={funnel} />
            ) : null}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
