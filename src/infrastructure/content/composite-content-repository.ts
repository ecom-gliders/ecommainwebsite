import type { ContentRepository } from "@/domain/content/content-repository";
import type { BlogPost, BlogPostFrontmatter } from "@/domain/content/schemas";
import { JsonFileContentRepository } from "./json-file-content-repository";
import { MdxBlogRepository } from "./mdx-blog-repository";

export class CompositeContentRepository implements ContentRepository {
  constructor(
    private readonly jsonRepository: JsonFileContentRepository,
    private readonly blogRepository: MdxBlogRepository,
  ) {}

  getSiteConfig() {
    return this.jsonRepository.getSiteConfig();
  }

  getNavigation() {
    return this.jsonRepository.getNavigation();
  }

  getHomepage() {
    return this.jsonRepository.getHomepage();
  }

  getService(slug: string) {
    return this.jsonRepository.getService(slug);
  }

  getAllServiceSlugs() {
    return this.jsonRepository.getAllServiceSlugs();
  }

  getServicesIndex() {
    return this.jsonRepository.getServicesIndex();
  }

  getCaseStudies() {
    return this.jsonRepository.getCaseStudies();
  }

  getCaseStudy(slug: string) {
    return this.jsonRepository.getCaseStudy(slug);
  }

  getAllCaseStudySlugs() {
    return this.jsonRepository.getAllCaseStudySlugs();
  }

  getCaseStudiesIndex() {
    return this.jsonRepository.getCaseStudiesIndex();
  }

  getCaseStudiesFilters() {
    return this.jsonRepository.getCaseStudiesFilters();
  }

  getContactPage() {
    return this.jsonRepository.getContactPage();
  }

  getFreeAuditPage() {
    return this.jsonRepository.getFreeAuditPage();
  }

  getAboutPage() {
    return this.jsonRepository.getAboutPage();
  }

  getAgencyPartnershipPage() {
    return this.jsonRepository.getAgencyPartnershipPage();
  }

  getCareersPage() {
    return this.jsonRepository.getCareersPage();
  }

  getPrivacyPage() {
    return this.jsonRepository.getPrivacyPage();
  }

  getTermsPage() {
    return this.jsonRepository.getTermsPage();
  }

  getTestimonials() {
    return this.jsonRepository.getTestimonials();
  }

  getFaq(scope?: string) {
    return this.jsonRepository.getFaq(scope);
  }

  getBlogPost(slug: string): Promise<BlogPost | null> {
    return this.blogRepository.getBlogPost(slug);
  }

  getAllBlogSlugs(): Promise<string[]> {
    return this.blogRepository.getAllBlogSlugs();
  }

  getAllBlogPostFrontmatter(): Promise<BlogPostFrontmatter[]> {
    return this.blogRepository.getAllBlogPostFrontmatter();
  }

  getRecentBlogPosts(limit: number): Promise<BlogPost[]> {
    return this.blogRepository.getRecentBlogPosts(limit);
  }

  getRelatedBlogPosts(slug: string, limit = 3): Promise<BlogPost[]> {
    return this.blogRepository.getRelatedBlogPosts(slug, limit);
  }
}
