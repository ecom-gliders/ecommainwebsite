import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { ConfigKeyLabel } from "@/components/design-system/config-key-label";
import { HomepageSections } from "./homepage-section-renderer";

export async function HomepageSectionsPreview() {
  const repository = getContentRepository();
  const [homepage, site] = await Promise.all([
    repository.getHomepage(),
    repository.getSiteConfig(),
  ]);

  return (
    <div>
      <p className="text-small mb-6 text-text-secondary">
        Preview of all enabled homepage sections from{" "}
        <code className="font-mono">content/config/homepage.json</code>.
        Full assembly ships in P2-04.
      </p>
      <div className="overflow-hidden rounded-md border border-border">
        <HomepageSections sections={homepage.sections} site={site} />
      </div>
      <ConfigKeyLabel
        configKey="homepage.json → sections[]"
        usedOn={["/", "HomepageSectionRenderer"]}
      />
    </div>
  );
}
