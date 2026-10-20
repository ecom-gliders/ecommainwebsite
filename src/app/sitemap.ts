import type { MetadataRoute } from "next";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildSitemapEntries } from "@/lib/seo/build-sitemap-entries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repository = getContentRepository();
  return buildSitemapEntries(repository);
}
