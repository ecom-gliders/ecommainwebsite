import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FreeAmazonToolPageTemplate } from "@/components/tools/free-amazon-tool-page-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";

export const dynamicParams = false;

interface ToolSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repository = getContentRepository();
  const slugs = await repository.getAllFreeAmazonToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ToolSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const tool = await repository.getFreeAmazonTool(slug);
  if (!tool) {
    return {};
  }
  return pageSeoToMetadata(tool.seo);
}

export default async function FreeAmazonToolPage({ params }: ToolSlugPageProps) {
  const { slug } = await params;
  const repository = getContentRepository();
  const tool = await repository.getFreeAmazonTool(slug);

  if (!tool || tool.slug !== slug) {
    notFound();
  }

  return (
    <main id="main-content">
      <FreeAmazonToolPageTemplate tool={tool} />
    </main>
  );
}
