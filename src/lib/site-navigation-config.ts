import siteJson from "../../content/config/site.json";
import navigationJson from "../../content/config/navigation.json";
import {
  navigationConfigSchema,
  siteConfigSchema,
  type NavigationConfig,
  type SiteConfig,
} from "@/domain/content/schemas";

/**
 * @deprecated Use `getContentRepository()` from `@/infrastructure/content/get-content-repository`
 * for server components. Kept for synchronous access during early Phase 1 work.
 */
export const siteConfig: SiteConfig = siteConfigSchema.parse(siteJson);
export const navigationConfig: NavigationConfig =
  navigationConfigSchema.parse(navigationJson);

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getNavigationConfig(): NavigationConfig {
  return navigationConfig;
}
