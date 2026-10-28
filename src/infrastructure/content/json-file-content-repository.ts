import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import type { ZodType } from "zod";
import {
  aboutPageConfigSchema,
  agencyPartnershipPageConfigSchema,
  careersPageConfigSchema,
  contactPageConfigSchema,
  freeAuditPageConfigSchema,
  legalPageConfigSchema,
  caseStudiesConfigSchema,
  faqConfigSchema,
  homepageConfigSchema,
  navigationConfigSchema,
  servicePageConfigSchema,
  servicesIndexConfigSchema,
  siteConfigSchema,
  testimonialsConfigSchema,
  type AboutPageConfig,
  type AgencyPartnershipPageConfig,
  type CareersPageConfig,
  type ContactPageConfig,
  type FreeAuditPageConfig,
  type LegalPageConfig,
  type CaseStudyDetail,
  type CaseStudiesConfig,
  type FaqItem,
  type HomepageConfig,
  type NavigationConfig,
  type ServicePageConfig,
  type ServicesIndexConfig,
  type SiteConfig,
  type TestimonialConfig,
} from "@/domain/content/schemas";
import {
  ContentNotFoundError,
  ContentValidationError,
} from "@/domain/content/errors";

type CacheEntry = {
  mtimeMs: number;
  value: unknown;
};

export class JsonFileContentRepository {
  private readonly cache = new Map<string, CacheEntry>();

  constructor(
    private readonly configDir: string = join(process.cwd(), "content", "config"),
  ) {}

  async getSiteConfig(): Promise<SiteConfig> {
    return this.loadRequiredJson("site.json", siteConfigSchema);
  }

  async getNavigation(): Promise<NavigationConfig> {
    return this.loadRequiredJson("navigation.json", navigationConfigSchema);
  }

  async getHomepage(): Promise<HomepageConfig> {
    return this.loadRequiredJson("homepage.json", homepageConfigSchema);
  }

  async getService(slug: string): Promise<ServicePageConfig | null> {
    const filename = join("services", `${slug}.json`);
    const config = await this.loadOptionalJson(
      filename,
      servicePageConfigSchema,
    );
    return config;
  }

  async getAllServiceSlugs(): Promise<string[]> {
    const servicesDir = join(this.configDir, "services");
    if (!existsSync(servicesDir)) {
      return [];
    }

    return readdirSync(servicesDir)
      .filter((filename) => filename.endsWith(".json"))
      .map((filename) => filename.replace(/\.json$/, ""))
      .sort();
  }

  async getServicesIndex(): Promise<ServicesIndexConfig | null> {
    return this.loadOptionalJson("services-index.json", servicesIndexConfigSchema);
  }

  async getCaseStudies(): Promise<CaseStudyDetail[]> {
    const config = await this.loadCaseStudiesConfig();
    return config?.caseStudies ?? [];
  }

  async getCaseStudy(slug: string): Promise<CaseStudyDetail | null> {
    const config = await this.loadCaseStudiesConfig();
    return config?.caseStudies.find((study) => study.slug === slug) ?? null;
  }

  async getAllCaseStudySlugs(): Promise<string[]> {
    const studies = await this.getCaseStudies();
    return studies.map((study) => study.slug).sort();
  }

  async getCaseStudiesIndex(): Promise<CaseStudiesConfig["index"] | null> {
    const config = await this.loadCaseStudiesConfig();
    return config?.index ?? null;
  }

  async getCaseStudiesFilters(): Promise<string[]> {
    const config = await this.loadCaseStudiesConfig();
    return config?.filters ?? ["All"];
  }

  private async loadCaseStudiesConfig(): Promise<CaseStudiesConfig | null> {
    return this.loadOptionalJson("case-studies.json", caseStudiesConfigSchema);
  }

  async getContactPage(): Promise<ContactPageConfig> {
    return this.loadRequiredJson("contact-page.json", contactPageConfigSchema);
  }

  async getFreeAuditPage(): Promise<FreeAuditPageConfig> {
    return this.loadRequiredJson("free-audit-page.json", freeAuditPageConfigSchema);
  }

  async getAboutPage(): Promise<AboutPageConfig> {
    return this.loadRequiredJson("about-page.json", aboutPageConfigSchema);
  }

  async getAgencyPartnershipPage(): Promise<AgencyPartnershipPageConfig> {
    return this.loadRequiredJson(
      "agency-partnership-page.json",
      agencyPartnershipPageConfigSchema,
    );
  }

  async getCareersPage(): Promise<CareersPageConfig> {
    return this.loadRequiredJson("careers-page.json", careersPageConfigSchema);
  }

  async getPrivacyPage(): Promise<LegalPageConfig> {
    return this.loadRequiredJson("privacy-page.json", legalPageConfigSchema);
  }

  async getTermsPage(): Promise<LegalPageConfig> {
    return this.loadRequiredJson("terms-page.json", legalPageConfigSchema);
  }

  async getTestimonials(): Promise<TestimonialConfig[]> {
    const config = await this.loadOptionalJson(
      "testimonials.json",
      testimonialsConfigSchema,
    );
    return config?.testimonials ?? [];
  }

  async getFaq(scope?: string): Promise<FaqItem[]> {
    const config = await this.loadOptionalJson("faq.json", faqConfigSchema);
    if (!config) {
      return [];
    }

    if (scope && config.scopes?.[scope]) {
      return config.scopes[scope];
    }

    return config.items;
  }

  private loadRequiredJson<T>(filename: string, schema: ZodType<T>): T {
    const parsed = this.loadOptionalJson(filename, schema);
    if (!parsed) {
      throw new ContentNotFoundError(`Required config file not found: ${filename}`);
    }
    return parsed;
  }

  private loadOptionalJson<T>(
    filename: string,
    schema: ZodType<T>,
  ): T | null {
    const filePath = join(this.configDir, filename);
    if (!existsSync(filePath)) {
      return null;
    }

    const cached = this.cache.get(filePath);
    const mtimeMs = this.getMtimeMs(filePath);

    if (cached && cached.mtimeMs === mtimeMs) {
      return cached.value as T;
    }

    try {
      const raw = JSON.parse(readFileSync(filePath, "utf-8")) as unknown;
      const parsed = schema.parse(raw);
      this.cache.set(filePath, { mtimeMs, value: parsed });
      return parsed;
    } catch (error) {
      throw new ContentValidationError(
        `Invalid config file: ${filename}`,
        error,
      );
    }
  }

  private getMtimeMs(filePath: string): number {
    return statSync(filePath).mtimeMs;
  }
}
