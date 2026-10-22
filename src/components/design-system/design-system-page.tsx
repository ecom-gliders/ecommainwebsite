import { ArrowRight, Menu } from "lucide-react";
import { designSystem } from "@/lib/design-tokens";
import {
  browserMockupConfig,
  designSystemReviewConfig,
  getColorTokensForCopy,
  getReviewSections,
  interpolateTokens,
} from "@/lib/content-config";
import { getIcon } from "@/lib/icon-registry";
import { BrowserMockup } from "@/components/browser-mockup";
import { HomepageSectionsPreview } from "@/components/sections/homepage-sections-preview";
import { Badge } from "@/components/ui/badge";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ElegantCard } from "@/components/ui/elegant-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DesignSystemSection } from "./design-system-section";
import { DesignSystemMobileNav } from "./design-system-mobile-nav";
import { A11yTestingGuide } from "./a11y-testing-guide";
import { BrandLogo } from "./brand-logo";
import { OnPageReviewPanel } from "./on-page-review-panel";
import {
  ColorThemePreviewProvider,
  ColorThemeSwitcher,
  ColorThemeSwitcherMobile,
} from "./color-theme-switcher";
import {
  GradientSwatches,
  ProposedCards,
} from "./proposed-elements";
import { ColorBalanceGuide } from "./color-balance-guide";
import { GalaxyButton } from "./galaxy-button";
import { TypographyPairSwitcher } from "./typography-pair-switcher";

const sections = getReviewSections();
const reviewCopy = designSystemReviewConfig.copy;
const colorTokens = getColorTokensForCopy();

type CopyRecord = Record<string, unknown>;

function copySection(key: string): CopyRecord {
  return (reviewCopy[key] as CopyRecord) ?? {};
}

export function DesignSystemPage() {
  const header = designSystemReviewConfig.header;
  const colorsCopy = copySection("colors");
  const typographyCopy = copySection("typography");
  const buttonsCopy = copySection("buttons");
  const cardsCopy = copySection("cards");
  const formsCopy = copySection("forms");
  const navigationCopy = copySection("navigation");
  const footerCopy = copySection("footer");
  const containersCopy = copySection("containers");
  const motionCopy = copySection("motion");
  const animationCopy = copySection("animationCatalog");
  const accessibilityCopy = copySection("accessibility");
  const typographySamples = (typographyCopy.samples as CopyRecord) ?? {};
  const badgeLabels = (reviewCopy.badges as string[]) ?? [];
  const navLinks = (navigationCopy.links as string[]) ?? [];
  const footerColumns = (footerCopy.columns as string[]) ?? [];
  const contrastSamples = (accessibilityCopy.contrastSamples as CopyRecord) ?? {};

  return (
    <ColorThemePreviewProvider>
      <div className="relative min-h-screen bg-transparent">
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md shadow-header">
          <div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-small font-medium text-text-secondary">{header.subtitle}</p>
              <h1 className="text-h3">{header.title}</h1>
            </div>
            <Badge variant="accent" className="w-fit shrink-0">
              {header.badge}
            </Badge>
          </div>
        </header>

        <div className="container-page flex gap-6 py-6 sm:gap-8 sm:py-8 lg:gap-8">
          <nav
            className="hidden w-48 shrink-0 lg:block xl:w-52"
            aria-label="Design system sections"
          >
            <p className="text-small mb-4 font-medium text-text-secondary">
              Sections
            </p>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-small block text-text-secondary transition-colors hover:text-accent"
                  >
                    {section.number}. {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <main id="main-content" className="min-w-0 flex-1">
            <OnPageReviewPanel />
            <DesignSystemMobileNav />
            <ColorThemeSwitcherMobile />
            <DesignSystemSection
              id="brand"
              number={1}
              title="Brand Identity"
              configKey="brand"
              usedOn={["header", "footer", "homepage.hero"]}
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <BrandLogo width={240} height={71} className="h-auto w-60" />
                <div>
                <h3 className="text-h3">{designSystem.brand.name}</h3>
                <p className="text-body mt-2 text-text-secondary">
                  {designSystem.brand.tagline}
                </p>
              </div>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="colors"
            number={2}
            title="Color Palette"
            configKey="colors"
            usedOn={["site-wide"]}
          >
            <p className="text-small mb-6 text-text-secondary">
              {interpolateTokens(String(colorsCopy.description ?? ""), colorTokens)}
            </p>
            <ColorBalanceGuide />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(designSystem.colors).map(([key, token]) => (
                <div
                  key={key}
                  className="overflow-hidden rounded-md border border-border"
                >
                  <div
                    className="h-20"
                    style={{ backgroundColor: token.value }}
                  />
                  <div className="p-4">
                    <p className="text-small font-medium">{key}</p>
                    <p className="font-mono text-xs text-text-secondary">
                      {token.value}
                    </p>
                    <p className="text-small mt-1 text-text-secondary">
                      {token.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <GradientSwatches />
          </DesignSystemSection>

          <DesignSystemSection
            id="typography"
            number={3}
            title="Typography"
            configKey="typography"
            usedOn={["site-wide"]}
          >
            <p className="text-small mb-6 text-text-secondary">
              {String(typographyCopy.description ?? "")}
            </p>
            <TypographyPairSwitcher />
            <div className="space-y-6">
              <p className="text-display">{String(typographySamples.display ?? "")}</p>
              <h1 className="text-h1">{String(typographySamples.h1 ?? "")}</h1>
              <h2 className="text-h2">{String(typographySamples.h2 ?? "")}</h2>
              <h3 className="text-h3">{String(typographySamples.h3 ?? "")}</h3>
              <h4 className="text-h4">{String(typographySamples.h4 ?? "")}</h4>
              <p className="text-body max-w-prose">{String(typographySamples.body ?? "")}</p>
              <p className="text-small font-medium text-text-secondary">
                {String(typographySamples.small ?? "")}
              </p>
              <p className="text-stat text-text-primary">{String(typographySamples.stat ?? "")}</p>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="spacing"
            number={4}
            title="Spacing and Radius"
            configKey="spacing, radius"
            usedOn={["components.container", "cards", "sections"]}
          >
            <div className="space-y-8">
              <div>
                <p className="text-small mb-4 font-medium">Spacing scale</p>
                <div className="space-y-3">
                  {Object.entries(designSystem.spacing).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4">
                      <span className="text-small w-12 font-mono">{key}</span>
                      <div
                        className="h-4 bg-accent"
                        style={{ width: value }}
                      />
                      <span className="text-small font-medium text-text-secondary">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-small mb-4 font-medium">Radius tokens</p>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(designSystem.radius).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex h-16 w-16 items-center justify-center border border-border bg-surface text-xs"
                      style={{ borderRadius: value }}
                    >
                      {key}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="shadows"
            number={5}
            title="Shadows"
            configKey="shadows"
            usedOn={["cards", "header", "browser-mockup"]}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {Object.entries(designSystem.shadows).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-md bg-background p-6"
                  style={{ boxShadow: value }}
                >
                  <p className="text-small font-medium">{key}</p>
                  <p className="font-mono text-xs text-text-secondary">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="buttons"
            number={6}
            title="Buttons"
            configKey="components.button"
            usedOn={designSystem.usage.Button}
          >
            <p className="text-small mb-6 text-text-secondary">
              {String(buttonsCopy.description ?? "")}
            </p>
            <p className="text-small mb-3 font-medium">Current (sitewide PrimaryButton)</p>
            <div className="flex flex-wrap items-center gap-6">
              <PrimaryButton>{String(buttonsCopy.primary ?? "")}</PrimaryButton>
              <PrimaryButton variant="accent">Free Audit</PrimaryButton>
              <Button variant="secondary">{String(buttonsCopy.secondary ?? "")}</Button>
              <Button variant="link">
                {String(buttonsCopy.link ?? "")} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button disabled>{String(buttonsCopy.disabled ?? "")}</Button>
            </div>

            <div className="mt-10 rounded-md border border-border bg-surface/50 p-6">
              <p className="text-small font-medium text-accent">
                Active — PrimaryButton (sitewide)
              </p>
              <p className="text-small mt-1 max-w-2xl text-text-secondary">
                Solid primary fill. Hover → secondary (accent). Trailing mark is
                a fixed slot: idle shows a filled dot; hover bounces to a
                lucide-animated arrow (no layout shift).
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <PrimaryButton>
                  Get your free audit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </PrimaryButton>
                <PrimaryButton>
                  Free Audit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </PrimaryButton>
                <PrimaryButton>
                  Talk to a strategist
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </PrimaryButton>
              </div>
              <p className="text-small mt-4 text-text-secondary">
                Hover to see accent fill + icon reveal.
              </p>
            </div>

            <div className="mt-10 rounded-md border border-dashed border-accent/40 bg-primary/5 p-6">
              <p className="text-small font-medium text-accent">
                Proposed — Galaxy hover (from scratch)
              </p>
              <p className="text-small mt-1 max-w-2xl text-text-secondary">
                Inspired by the Framer University Crazy Galaxy button (layered
                colored drop-shadows + hover particles). Built in CSS + canvas —
                no Framer dependency. Uses active theme primary / cyan / accent.
                Hover or focus to see the glow and particles.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-8 py-6">
                <GalaxyButton label="Generate" />
                <GalaxyButton label="Free Audit" />
                <GalaxyButton label="Get your free audit" />
              </div>
              <p className="text-small mt-2 text-text-secondary">
                Reduced motion: static glow only, particles off. Preview only —
                not sitewide (production CTA is PrimaryButton).
              </p>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="badges"
            number={7}
            title="Badges and Tags"
            configKey="components.badge"
            usedOn={["service cards", "trust bar"]}
          >
            <div className="flex flex-wrap gap-3">
              <Badge>{badgeLabels[0]}</Badge>
              <Badge variant="accent">{badgeLabels[1]}</Badge>
              <Badge variant="outline">{badgeLabels[2]}</Badge>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="cards"
            number={8}
            title="Cards"
            configKey="components.card"
            usedOn={[
              ...designSystem.usage.StatCard,
              ...designSystem.usage.ServiceCard,
            ]}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{String(cardsCopy.statTitle ?? "")}</CardTitle>
                  <CardDescription>{String(cardsCopy.statDescription ?? "")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-stat text-text-primary">{String(typographySamples.stat ?? "")}</p>
                </CardContent>
              </Card>
              <ElegantCard
                title={String(cardsCopy.serviceTitle ?? "")}
                description={String(cardsCopy.serviceDescription ?? "")}
              >
                <p className="text-body font-medium text-text-secondary">
                  {String(cardsCopy.serviceBody ?? "")}
                </p>
                <Button variant="link" className="mt-4">
                  {String(buttonsCopy.link ?? "")} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </ElegantCard>
            </div>

            <div className="mt-10 rounded-md border border-dashed border-accent/40 bg-surface/50 p-6">
              <p className="text-small mb-4 font-medium text-accent">
                Proposed card treatments
              </p>
              <ProposedCards />
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="forms"
            number={9}
            title="Forms"
            configKey="components.form"
            usedOn={["contact.form", "free-audit.form"]}
          >
            <div className="max-w-md space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{String(formsCopy.nameLabel ?? "")}</Label>
                <Input id="name" placeholder={String(formsCopy.namePlaceholder ?? "")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{String(formsCopy.emailLabel ?? "")}</Label>
                <Input id="email" type="email" placeholder={String(formsCopy.emailPlaceholder ?? "")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{String(formsCopy.messageLabel ?? "")}</Label>
                <Textarea id="message" placeholder={String(formsCopy.messagePlaceholder ?? "")} />
              </div>
              <Button type="button">{String(formsCopy.submit ?? "")}</Button>
              <p className="text-small text-success">{String(formsCopy.success ?? "")}</p>
              <p className="text-small text-error">{String(formsCopy.error ?? "")}</p>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="navigation"
            number={10}
            title="Navigation"
            configKey="components.navigation"
            usedOn={designSystem.usage.MegaMenu}
          >
            <div className="overflow-hidden rounded-md border border-border">
              <div className="flex h-[72px] items-center justify-between bg-background px-6 shadow-header">
                <BrandLogo width={140} height={42} className="h-8 w-auto" />
                <div className="hidden items-center gap-6 md:flex">
                  {navLinks.map((link) => (
                    <span key={link} className="text-small text-text-primary">
                      {link}
                    </span>
                  ))}
                  <Button size="sm">
                    {designSystem.components.navigation &&
                    typeof designSystem.components.navigation === "object" &&
                    "ctaLabel" in designSystem.components.navigation
                      ? String(
                          (
                            designSystem.components.navigation as {
                              ctaLabel: string;
                            }
                          ).ctaLabel,
                        )
                      : "Free Audit"}
                  </Button>
                </div>
                <Menu className="h-5 w-5 text-text-primary md:hidden" />
              </div>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="footer"
            number={11}
            title="Footer"
            configKey="components.footer"
            usedOn={designSystem.usage.Footer}
          >
            <p className="text-small mb-6 text-text-secondary">
              {String(footerCopy.description ?? "")}
            </p>
            <div className="overflow-hidden rounded-md border border-border">
              <div className="bg-primary px-6 py-8 text-center text-text-on-dark">
                <p className="text-h3">{String(footerCopy.ctaTitle ?? "")}</p>
                <Button className="mt-4" variant="outlineOnDark">
                  {String(footerCopy.ctaButton ?? "")}
                </Button>
              </div>
              <div className="grid gap-6 bg-surface p-6 sm:grid-cols-4">
                {footerColumns.map((col) => (
                  <div key={col}>
                    <p className="text-small mb-2 font-medium">{col}</p>
                    <p className="text-small font-medium text-text-secondary">{String(footerCopy.linkPlaceholder ?? "")}</p>
                    <p className="text-small font-medium text-text-secondary">{String(footerCopy.linkPlaceholder ?? "")}</p>
                  </div>
                ))}
              </div>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="containers"
            number={12}
            title="Containers"
            configKey="components.container"
            usedOn={["all page sections"]}
          >
            <div className="space-y-4">
              <div className="rounded-md border border-dashed border-border p-8 text-center">
                <p className="text-small">{String(containersCopy.sectionLabel ?? "")}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="rounded-md bg-surface p-4 text-center text-small"
                  >
                    Col {n}
                  </div>
                ))}
              </div>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="browser-mockup"
            number={13}
            title="Browser Mockup"
            configKey="components.browserMockup"
            usedOn={designSystem.usage.BrowserMockup}
          >
            <p className="text-small mb-6 text-text-secondary">
              {browserMockupConfig.previewDescription}
            </p>
            <div className="flex flex-col gap-12">
              <BrowserMockup variant="macos" label={browserMockupConfig.variants.macos.label} />
              <div className="mx-auto w-full max-w-md">
                <BrowserMockup variant="ios" label={browserMockupConfig.variants.ios.label} />
              </div>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="motion"
            number={14}
            title="Motion"
            configKey="motion"
            usedOn={["browser-mockup", "cards", "hero"]}
          >
            <p className="text-small mb-6 text-text-secondary">
              {String(motionCopy.description ?? "")}
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <ElegantCard
                title={String(motionCopy.cardTitle ?? "")}
                description={String(motionCopy.cardDescription ?? "")}
              />
              <div className="flex flex-col items-start justify-center gap-4 rounded-md border border-border p-6">
                <p className="text-h4">{String(motionCopy.primaryTitle ?? "")}</p>
                <p className="text-small font-medium text-text-secondary">
                  {String(motionCopy.primaryDetail ?? "")}
                </p>
                <PrimaryButton>{String(motionCopy.primaryCta ?? "")}</PrimaryButton>
              </div>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="icons"
            number={15}
            title="Icons"
            configKey="icons"
            usedOn={["navigation", "service cards", "forms"]}
          >
            <div className="flex flex-wrap gap-6">
              {designSystemReviewConfig.icons.map(({ icon, label }) => {
                const Icon = getIcon(icon);
                if (!Icon) return null;
                return (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 text-small"
                  >
                    <Icon className="h-6 w-6 text-text-primary" />
                    {label}
                  </div>
                );
              })}
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="usage"
            number={16}
            title="Usage Map"
            configKey="usage"
            usedOn={["documentation reference"]}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-small">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 pr-4 font-medium">Component</th>
                    <th className="py-3 font-medium">Used on</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(designSystem.usage).map(
                    ([component, pages]) => (
                      <tr key={component} className="border-b border-border">
                        <td className="py-3 pr-4 font-medium">{component}</td>
                        <td className="py-3 text-text-secondary">
                          {pages.join(", ")}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="accessibility"
            number={17}
            title="Accessibility"
            configKey="accessibility"
            usedOn={["site-wide — WCAG 2.1 AA target"]}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-md border border-border p-6">
                <p className="text-h4 mb-4">Implemented (Phase 0)</p>
                <ul className="text-body space-y-2 text-text-secondary">
                  {((accessibilityCopy.implemented as string[]) ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-md border border-dashed border-border p-6">
                <p className="text-h4 mb-4">Planned (Phase 1 / P4-03)</p>
                <ul className="text-body space-y-2 text-text-secondary">
                  {((accessibilityCopy.planned as string[]) ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-md bg-surface p-4">
              <p className="text-small font-medium">Contrast samples</p>
              <div className="mt-3 flex flex-wrap gap-4">
                <div className="rounded-sm bg-primary px-4 py-2 text-text-on-dark text-small">
                  {String(contrastSamples.navy ?? "")}
                </div>
                <div className="rounded-sm bg-accent px-4 py-2 text-text-on-dark text-small">
                  {String(contrastSamples.accent ?? "")}
                </div>
                <div className="text-small font-medium text-text-secondary">
                  {String(contrastSamples.secondary ?? "")}
                </div>
              </div>
            </div>
            <A11yTestingGuide />
          </DesignSystemSection>

          <DesignSystemSection
            id="animation-catalog"
            number={18}
            title="Motion Decision"
            configKey="motion"
            usedOn={["site-wide motion contract"]}
          >
            <p className="text-small mb-6 text-text-secondary">
              {String(animationCopy.description ?? "")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {((animationCopy.active as { label: string; detail: string }[]) ?? []).map((item) => (
                <div key={item.label} className="rounded-md border border-accent/30 bg-surface p-4">
                  <Badge variant="accent" className="mb-2">Active</Badge>
                  <p className="text-small font-medium">{item.label}</p>
                  <p className="text-small mt-1 text-text-secondary">{item.detail}</p>
                </div>
              ))}
              <div className="rounded-md border border-border p-4 sm:col-span-2">
                <Badge className="mb-2">Rejected</Badge>
                <p className="text-small font-medium text-text-secondary">
                  {String(animationCopy.rejected ?? "")}
                </p>
              </div>
            </div>
          </DesignSystemSection>

          <DesignSystemSection
            id="homepage-sections"
            number={19}
            title="Homepage Sections"
            configKey="homepage.json"
            usedOn={["/"]}
          >
            <HomepageSectionsPreview />
          </DesignSystemSection>
        </main>

          <ColorThemeSwitcher />
        </div>
      </div>
    </ColorThemePreviewProvider>
  );
}
