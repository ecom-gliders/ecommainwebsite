import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { FreeAuditFunnelProvider } from "@/components/free-audit/free-audit-funnel-context";

/**
 * Server host — loads funnel config and mounts the site-wide popup provider.
 */
export async function FreeAuditFunnelHost({
  children,
}: {
  children: React.ReactNode;
}) {
  const repository = getContentRepository();
  const page = await repository.getFreeAuditPage();

  return (
    <FreeAuditFunnelProvider form={page.form} funnel={page.funnel}>
      {children}
    </FreeAuditFunnelProvider>
  );
}
