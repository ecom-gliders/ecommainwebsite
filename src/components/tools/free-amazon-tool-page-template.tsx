import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FreeAmazonToolPageConfig } from "@/domain/content/schemas";
import { FbaFeeProfitCalculator } from "@/components/tools/fba-fee-profit-calculator";
import { PpcConversionCostCalculator } from "@/components/tools/ppc-conversion-cost-calculator";
import { GstCalculator } from "@/components/tools/gst-calculator";
import { AmazonPnlCalculator } from "@/components/tools/amazon-pnl-calculator";
import { InvoiceGenerator } from "@/components/tools/invoice-generator";
import { ProductCatalog } from "@/components/tools/product-catalog";
import { LabelInvoiceSplitter } from "@/components/tools/label-invoice-splitter";
import { DispatchCheck } from "@/components/tools/dispatch-check";
import { SkuProfitabilityLeaderboard } from "@/components/tools/sku-profitability-leaderboard";
import { ReturnsRtoDiagnostic } from "@/components/tools/returns-rto-diagnostic";
import { MonthlySellerCloseout } from "@/components/tools/monthly-seller-closeout";
import { TcsTdsReconciliation } from "@/components/tools/tcs-tds-reconciliation";
import { PpcPerformanceDashboard } from "@/components/tools/ppc-performance-dashboard";
import { PrimaryButton } from "@/components/ui/primary-button";

interface FreeAmazonToolPageTemplateProps {
  tool: FreeAmazonToolPageConfig;
}

function ToolInteractive({
  kind,
}: {
  kind: FreeAmazonToolPageConfig["toolKind"];
}) {
  switch (kind) {
    case "fba-fee-profit-calculator":
      return <FbaFeeProfitCalculator />;
    case "ppc-conversion-cost-calculator":
      return <PpcConversionCostCalculator />;
    case "gst-calculator":
      return <GstCalculator />;
    case "amazon-pnl-calculator":
      return <AmazonPnlCalculator />;
    case "invoice-generator":
      return <InvoiceGenerator />;
    case "product-catalog":
      return <ProductCatalog />;
    case "label-invoice-splitter":
      return <LabelInvoiceSplitter />;
    case "dispatch-check":
      return <DispatchCheck />;
    case "sku-profitability-leaderboard":
      return <SkuProfitabilityLeaderboard />;
    case "returns-rto-diagnostic":
      return <ReturnsRtoDiagnostic />;
    case "monthly-seller-closeout":
      return <MonthlySellerCloseout />;
    case "tcs-tds-reconciliation":
      return <TcsTdsReconciliation />;
    case "ppc-performance-dashboard":
      return <PpcPerformanceDashboard />;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

function InfoBlocks({
  headingId,
  heading,
  items,
}: {
  headingId: string;
  heading: string;
  items: Array<{ title: string; body: string }>;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <h2
        id={headingId}
        className="text-lg font-bold tracking-tight text-text-primary"
      >
        {heading}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.title}
            className="border-2 border-primary/20 bg-background p-4"
          >
            <p className="text-sm font-bold text-text-primary">{item.title}</p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FreeAmazonToolPageTemplate({
  tool,
}: FreeAmazonToolPageTemplateProps) {
  return (
    <>
      <section
        id="tool-hero"
        aria-labelledby="tool-hero-heading"
        className="border-b-2 border-primary bg-surface-muted"
      >
        <div className="container-page py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-small text-text-secondary">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/free-amazon-tools/" className="hover:text-primary">
                  Free Amazon Tools
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-primary">{tool.hero.title}</li>
            </ol>
          </nav>
          <p className="mt-6 inline-flex border border-primary/30 bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-primary">
            {tool.badge}
          </p>
          <h1
            id="tool-hero-heading"
            className="mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight text-text-primary"
          >
            {tool.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary sm:text-lg">
            {tool.hero.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-text-secondary">
            {tool.intro}
          </p>
        </div>
      </section>

      <section
        id="tool-workspace"
        aria-labelledby="tool-workspace-heading"
        className="py-12 sm:py-16"
      >
        <div className="container-page">
          <h2 id="tool-workspace-heading" className="sr-only">
            Tool workspace
          </h2>
          <div className="mx-auto max-w-5xl">
            <ToolInteractive kind={tool.toolKind} />
          </div>

          <InfoBlocks
            headingId="tool-instructions-heading"
            heading="How to use this tool"
            items={tool.instructions}
          />
          <InfoBlocks
            headingId="tool-assumptions-heading"
            heading="Assumptions and limits"
            items={tool.assumptions}
          />
          <InfoBlocks
            headingId="tool-tips-heading"
            heading="How to use the results"
            items={tool.tips}
          />
        </div>
      </section>

      <section
        id="tool-cta"
        aria-labelledby="tool-cta-heading"
        className="border-t-2 border-primary bg-primary py-12 text-text-on-dark sm:py-16"
      >
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="tool-cta-heading"
            className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {tool.cta.heading}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton asChild variant="accent" size="lg">
              <Link href={tool.cta.primaryCta.href}>
                {tool.cta.primaryCta.label}
              </Link>
            </PrimaryButton>
            <Link
              href={tool.cta.secondaryCta.href}
              className="inline-flex min-h-11 items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-accent hover:opacity-90"
            >
              {tool.cta.secondaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
