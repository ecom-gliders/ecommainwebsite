import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeaderShell } from "@/components/layout/site-header-shell";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";

export async function SiteHeader() {
  const repository = getContentRepository();
  const [navigation, site] = await Promise.all([
    repository.getNavigation(),
    repository.getSiteConfig(),
  ]);

  return (
    <>
      <AnnouncementBar site={site} />
      <SiteHeaderShell navigation={navigation} site={site} />
    </>
  );
}
