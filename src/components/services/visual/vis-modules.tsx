import type { ServicePageConfig } from "@/domain/content/schemas";
import { ServiceModules } from "@/components/services/modules/service-modules";

interface VisModulesProps {
  service: ServicePageConfig;
}

/** JSON modules: proof gallery, sequence board, priority chart, A+ spotlight. */
export function VisModules({ service }: VisModulesProps) {
  const modules = service.modules;
  if (!modules?.length) return null;

  return <ServiceModules modules={modules} band="proof-lead" />;
}
