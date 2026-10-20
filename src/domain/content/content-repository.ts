import type { BlogPost, BlogPostFrontmatter } from "./schemas/blog-post.schema";
import type {
  CaseStudyDetail,
  CaseStudiesConfig,
} from "./schemas/case-study.schema";
import type { FaqItem } from "./schemas/faq.schema";
import type { HomepageConfig } from "./schemas/homepage.schema";
import type { NavigationConfig } from "./schemas/navigation.schema";
import type { ServicePageConfig } from "./schemas/service-page.schema";
import type { ServicesIndexConfig } from "./schemas/services-index.schema";
import type { SiteConfig } from "./schemas/site-config.schema";
import type { TestimonialConfig } from "./schemas/testimonial.schema";
import type { AboutPageConfig } from "./schemas/about-page.schema";
import type {
  ContactPageConfig,
  FreeAuditPageConfig,
} from "./schemas/form-page.schema";

export interface ContentRepository {
  getSiteConfig(): Promise<SiteConfig>;
  getNavigation(): Promise<NavigationConfig>;
  getHomepage(): Promise<HomepageConfig>;
  getService(slug: string): Promise<ServicePageConfig | null>;
  getAllServiceSlugs(): Promise<string[]>;
  getServicesIndex(): Promise<ServicesIndexConfig | null>;
  getCaseStudies(): Promise<CaseStudyDetail[]>;
  getCaseStudy(slug: string): Promise<CaseStudyDetail | null>;
  getAllCaseStudySlugs(): Promise<string[]>;
  getCaseStudiesIndex(): Promise<CaseStudiesConfig["index"] | null>;
  getCaseStudiesFilters(): Promise<string[]>;
  getContactPage(): Promise<ContactPageConfig>;
  getFreeAuditPage(): Promise<FreeAuditPageConfig>;
  getAboutPage(): Promise<AboutPageConfig>;
  getTestimonials(): Promise<TestimonialConfig[]>;
  getFaq(scope?: string): Promise<FaqItem[]>;
  getBlogPost(slug: string): Promise<BlogPost | null>;
  getAllBlogSlugs(): Promise<string[]>;
  getAllBlogPostFrontmatter(): Promise<BlogPostFrontmatter[]>;
  getRecentBlogPosts(limit: number): Promise<BlogPost[]>;
  getRelatedBlogPosts(slug: string, limit?: number): Promise<BlogPost[]>;
}
