import Link from "next/link";
import { BlogBarChart } from "@/components/blog/blog-bar-chart";
import { BlogCallout } from "@/components/blog/blog-callout";
import { BlogCaseSnapshot } from "@/components/blog/blog-case-snapshot";
import { BlogChartCards } from "@/components/blog/blog-chart-cards";
import { BlogChartRanked } from "@/components/blog/blog-chart-ranked";
import { BlogChecklist } from "@/components/blog/blog-checklist";
import { BlogCompareColumns } from "@/components/blog/blog-compare-columns";
import { BlogCtaBlock } from "@/components/blog/blog-cta-block";
import { BlogDefinitionList } from "@/components/blog/blog-definition-list";
import { BlogFeatureGrid } from "@/components/blog/blog-feature-grid";
import { BlogFigure } from "@/components/blog/blog-figure";
import { BlogFormula } from "@/components/blog/blog-formula";
import { BlogHistogram } from "@/components/blog/blog-histogram";
import { BlogInsightChip } from "@/components/blog/blog-insight-chip";
import { BlogKeyTakeaways } from "@/components/blog/blog-key-takeaways";
import { BlogLineChart } from "@/components/blog/blog-line-chart";
import { BlogMarketplaceChips } from "@/components/blog/blog-marketplace-chips";
import { BlogMediaCompare } from "@/components/blog/blog-media-compare";
import { BlogMetricBars } from "@/components/blog/blog-metric-bars";
import { BlogPersonaTabs } from "@/components/blog/blog-persona-tabs";
import { BlogPieChart } from "@/components/blog/blog-pie-chart";
import { BlogProsCons } from "@/components/blog/blog-pros-cons";
import { BlogPullQuote } from "@/components/blog/blog-pull-quote";
import { BlogRadialGauge } from "@/components/blog/blog-radial-gauge";
import { BlogResourceLink } from "@/components/blog/blog-resource-link";
import { BlogSparkline } from "@/components/blog/blog-sparkline";
import { BlogStatRow } from "@/components/blog/blog-stat-row";
import { BlogSteps } from "@/components/blog/blog-steps";
import { BlogTimeline } from "@/components/blog/blog-timeline";
import { BlogVideoCard } from "@/components/blog/blog-video-card";
import { getCanonicalBlogMedia } from "@/lib/blog/blocks/canonical-media";

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "shell", label: "Editorial shell" },
  { id: "typography", label: "Typography" },
  { id: "callouts", label: "Callouts" },
  { id: "grids", label: "Feature grids" },
  { id: "steps", label: "Steps & timeline" },
  { id: "tables", label: "Tables" },
  { id: "charts", label: "Charts & stats" },
  { id: "advanced-charts", label: "Advanced charts" },
  { id: "compare", label: "Compare layouts" },
  { id: "editorial", label: "Editorial extras" },
  { id: "media", label: "Figure & video" },
  { id: "cta", label: "CTAs & resources" },
  { id: "rails", label: "TOC / Share / AI" },
  { id: "related", label: "Related articles" },
  { id: "fences", label: "Fence cheat sheet" },
  { id: "rules", label: "Content rules" },
] as const;

function Fence({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto border border-border bg-surface-muted p-3 text-[11px] leading-relaxed text-text-primary">
      <code>{children}</code>
    </pre>
  );
}

function BlockSection({
  id,
  title,
  purpose,
  when,
  children,
}: {
  id: string;
  title: string;
  purpose: string;
  when: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-2 border-primary bg-background p-6 shadow-[4px_4px_0_0_#131311] md:p-8"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
        Block
      </p>
      <h2 className="mt-1 text-h2">{title}</h2>
      <dl className="mt-4 grid gap-3 text-small md:grid-cols-2">
        <div className="border-l-2 border-accent pl-3">
          <dt className="font-semibold text-text-primary">Purpose</dt>
          <dd className="mt-1 text-text-secondary">{purpose}</dd>
        </div>
        <div className="border-l-2 border-border pl-3">
          <dt className="font-semibold text-text-primary">Use when</dt>
          <dd className="mt-1 text-text-secondary">{when}</dd>
        </div>
      </dl>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function BlogDesignSystemPage() {
  const canonical = getCanonicalBlogMedia();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FAFAFA_0%,#F3F3F0_100%)]">
      <header className="border-b-2 border-primary bg-primary text-text-on-dark">
        <div className="container-page py-10 md:py-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            Internal · not indexed
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-black tracking-tight md:text-5xl">
            Blog design system
          </h1>
          <p className="mt-4 max-w-2xl text-base text-text-on-dark/80 md:text-lg">
            Catalog of every editorial block we can place inside blog posts.
            Use this page to decide what to add next, brief writers, and give AI
            agents a concrete allowlist. Migrated article wording stays
            unchanged — blocks only restructure presentation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/design-system"
              className="inline-flex border-2 border-text-on-dark/30 bg-text-on-dark px-4 py-2 text-small font-semibold text-primary"
            >
              Site design system
            </Link>
            <Link
              href="/2025-amazon-algorithm-updates-what-sellers-need-to-know/"
              className="inline-flex border-2 border-accent bg-accent px-4 py-2 text-small font-semibold text-primary"
            >
              Live sample post
            </Link>
          </div>
        </div>
      </header>

      <div className="container-page py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav
              aria-label="Blog design system sections"
              className="border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]"
            >
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
                Contents
              </p>
              <ol className="m-0 list-none space-y-1 p-0">
                {NAV.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex gap-2 py-1 text-small font-medium text-text-secondary hover:text-text-primary"
                    >
                      <span className="w-5 shrink-0 text-[10px] font-bold text-text-secondary">
                        {index + 1}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-10">
            <section
              id="overview"
              className="scroll-mt-24 border-2 border-primary bg-surface p-6 shadow-[4px_4px_0_0_#131311] md:p-8"
            >
              <h2 className="text-h2">Overview</h2>
              <p className="mt-3 text-body font-medium text-text-secondary">
                Blog bodies are MDX. Visual patterns become fenced code blocks
                (`feature-grid`, `tip`, `chart-cards`, …) rendered by the blog
                block registry. GFM tables stay markdown tables. No{" "}
                <code className="text-small">rehype-raw</code>. SEO/AEO/GEO
                priority: preserve titles, body claims, dates, URLs, and
                internal links.
              </p>
              <ul className="mt-4 grid gap-2 text-small sm:grid-cols-2">
                {[
                  "Convert WP chrome → themed blocks",
                  "Never invent metrics or claims",
                  "Lucide icons only (no emoji UI)",
                  "EG tokens (accent lime, ink borders)",
                  "Charts: bars, pie, donut, histogram, line, area, gauges, sparklines",
                  "Rails: TOC · Share · Ask AI · Takeaways",
                ].map((item) => (
                  <li
                    key={item}
                    className="border border-border bg-background px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <BlockSection
              id="shell"
              title="Editorial shell"
              purpose="Forbes-like reading frame: hero, sticky TOC, body column, right rail."
              when="Every blog detail page."
            >
              <div className="grid gap-3 border-2 border-dashed border-border p-4 text-small font-medium text-text-secondary md:grid-cols-3">
                <div className="border border-border bg-surface p-3">
                  <p className="font-semibold text-text-primary">Left</p>
                  Compact TOC + free-audit CTA under it (EG theming)
                </div>
                <div className="border border-border bg-surface p-3">
                  <p className="font-semibold text-text-primary">Center</p>
                  MDX body · FAQ · author · related
                </div>
                <div className="border border-border bg-surface p-3">
                  <p className="font-semibold text-text-primary">Right</p>
                  Share → Ask AI → compact takeaways
                </div>
              </div>
            </BlockSection>

            <BlockSection
              id="typography"
              title="Typography & prose"
              purpose="Readable long-form with clear H2–H4 hierarchy."
              when="Default body. Headings get IDs for TOC scroll-spy."
            >
              <div className="blog-content max-w-xl space-y-3">
                <h2 className="text-h2">Section heading (H2)</h2>
                <h3 className="text-h3">Subsection (H3)</h3>
                <h4 className="text-h4">Detail heading (H4)</h4>
                <p className="text-body font-medium text-text-secondary">
                  Body copy uses EG text tokens. Bold lead-ins in lists are fine.
                  Horizontal rules map to subtle dividers.
                </p>
                <blockquote className="border-l-4 border-border-strong pl-4 text-text-secondary italic">
                  Pull quote / emphasis — use sparingly for a single strong line
                  already in the article.
                </blockquote>
              </div>
            </BlockSection>

            <BlockSection
              id="callouts"
              title="Callouts (default · tip · warning)"
              purpose="Highlight impact lines, caveats, or tips without inventing copy."
              when="Standalone Impact on Sellers lines, important caveats, tips."
            >
              <div className="space-y-4">
                <BlogCallout title="Impact on Sellers" variant="tip">
                  <p>
                    Listings optimized for natural, customer-centric language
                    will rank higher.
                  </p>
                </BlogCallout>
                <BlogCallout title="Note" variant="warning">
                  <p>
                    Non-compliant titles may be auto-updated after a grace
                    period.
                  </p>
                </BlogCallout>
                <BlogCallout>
                  <p>Default callout for neutral context boxes.</p>
                </BlogCallout>
              </div>
              <Fence>{`\`\`\`tip
TITLE: Impact on Sellers
Your existing sentence here.
\`\`\``}</Fence>
            </BlockSection>

            <BlockSection
              id="grids"
              title="Feature grid"
              purpose="2-up insight cards with Lucide icons."
              when="Capability lists, framework pillars, multi-point summaries."
            >
              <BlogFeatureGrid
                cards={[
                  {
                    title: "Listing quality",
                    description:
                      "Titles, bullets, and A+ Content aligned to intent.",
                  },
                  {
                    title: "External traffic",
                    description:
                      "Social, search, and email signals that reinforce demand.",
                  },
                  {
                    title: "Customer experience",
                    description:
                      "Reviews, fulfillment speed, and return rate discipline.",
                  },
                  {
                    title: "Advertising data",
                    description:
                      "Conversion paths and ROAS loops sellers can act on.",
                  },
                ]}
              />
              <Fence>{`\`\`\`feature-grid
Listing quality | Titles, bullets, and A+ Content aligned to intent.
External traffic | Social, search, and email signals that reinforce demand.
\`\`\``}</Fence>
            </BlockSection>

            <BlockSection
              id="steps"
              title="Steps & timeline"
              purpose="Ordered process vs chronological history."
              when="Playbooks (steps) or algorithm evolution (timeline)."
            >
              <BlogSteps
                steps={[
                  {
                    title: "Audit titles",
                    description: "Remove special characters and stuffing.",
                  },
                  {
                    title: "Refresh bullets",
                    description: "Lead with benefits customers search for.",
                  },
                  {
                    title: "Measure ranking",
                    description: "Track organic share for priority ASINs.",
                  },
                ]}
              />
              <BlogTimeline
                items={[
                  {
                    label: "A9 era",
                    body: "Sales velocity and keyword relevance dominated.",
                  },
                  {
                    label: "A10 shift",
                    body: "Customer behavior and external traffic gained weight.",
                  },
                  {
                    label: "2025 COSMO",
                    body: "Intent and conversational discovery via Rufus.",
                  },
                ]}
              />
              <Fence>{`\`\`\`steps
Audit titles | Remove special characters and stuffing.
Refresh bullets | Lead with benefits customers search for.
\`\`\`

\`\`\`timeline
A9 era | Sales velocity and keyword relevance dominated.
A10 shift | Customer behavior and external traffic gained weight.
\`\`\``}</Fence>
            </BlockSection>

            <BlockSection
              id="tables"
              title="GFM tables"
              purpose="Structured checklists and comparison matrices."
              when="True tabular data (Element / Best Practice / Tool)."
            >
              <div className="my-2 w-full overflow-x-auto border-2 border-primary shadow-[3px_3px_0_0_#131311]">
                <table className="w-full min-w-[32rem] border-collapse text-left text-small">
                  <thead className="bg-primary text-text-on-dark">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Element</th>
                      <th className="px-4 py-3 font-semibold">Best Practice</th>
                      <th className="px-4 py-3 font-semibold">Tool</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3">Product Title</td>
                      <td className="px-4 py-3">
                        Concise, natural, no special characters
                      </td>
                      <td className="px-4 py-3">Helium 10 Listing Builder</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Bullet Points</td>
                      <td className="px-4 py-3">
                        Highlight benefits, use keywords naturally
                      </td>
                      <td className="px-4 py-3">Jungle Scout Keyword Scout</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Fence>{`| Element | Best Practice | Tool |
| --- | --- | --- |
| Product Title | Concise, natural, no special characters | Helium 10 Listing Builder |`}</Fence>
            </BlockSection>

            <BlockSection
              id="charts"
              title="Charts & stats (pick by data shape)"
              purpose="Visualize figures already in the article — never invent percentages."
              when="Chart captions, uplift ranges, verified agency stats."
            >
              <p className="mb-4 text-small font-semibold text-text-primary">
                1) Chart cards — multi-column with visual bars when % is present
              </p>
              <BlogChartCards
                title="Impact of External Traffic on Rankings"
                headers={[
                  "Traffic Source",
                  "Potential Ranking Boost",
                  "Implementation Cost",
                ]}
                rows={[
                  {
                    title: "Social Media",
                    primary: "High (15-20%)",
                    secondary: "Moderate (Ad spend + content creation)",
                  },
                  {
                    title: "Google Ads",
                    primary: "Moderate (10-15%)",
                    secondary: "High (Ad budget)",
                  },
                  {
                    title: "Influencer Marketing",
                    primary: "High (15-20%)",
                    secondary: "Variable (Partnership fees)",
                  },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                2) Ranked chart — ordered impact with bars
              </p>
              <BlogChartRanked
                items={[
                  {
                    label: "Social Media",
                    detail: "High (15-20%)",
                    percent: 20,
                  },
                  {
                    label: "Influencer Marketing",
                    detail: "High (15-20%)",
                    percent: 20,
                  },
                  {
                    label: "Google Ads",
                    detail: "Moderate (10-15%)",
                    percent: 15,
                  },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                3) Metric bars — simple label → %
              </p>
              <BlogMetricBars
                items={[
                  { label: "Organic share of voice", percent: 42 },
                  { label: "Ad-attributed revenue", percent: 58 },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                4) Stat row — verified big numbers
              </p>
              <BlogStatRow
                items={[
                  { value: "2018", label: "Helping sellers since" },
                  { value: "95%", label: "Client retention" },
                  { value: "$112M+", label: "Revenue managed" },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                5) Column bar chart (vertical)
              </p>
              <BlogBarChart
                title="Illustrative ranking boost ranges from article copy"
                orientation="vertical"
                items={[
                  { label: "Social", value: 20, display: "15–20%" },
                  { label: "Influencer", value: 20, display: "15–20%" },
                  { label: "Google Ads", value: 15, display: "10–15%" },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                6) Horizontal bar chart
              </p>
              <BlogBarChart
                title="Budget share example"
                orientation="horizontal"
                items={[
                  { label: "Sponsored Products", value: 55, display: "55%" },
                  { label: "Sponsored Brands", value: 30, display: "30%" },
                  { label: "DSP / other", value: 15, display: "15%" },
                ]}
              />
              <Fence>{`\`\`\`bar-chart
TITLE: Ranking boost ranges
ORIENTATION: vertical
Social | 20 | 15–20%
Influencer | 20 | 15–20%
Google Ads | 15 | 10–15%
\`\`\``}</Fence>
            </BlockSection>

            <BlockSection
              id="advanced-charts"
              title="Advanced charts (SVG, no chart library)"
              purpose="Pie, donut/radial, histogram, line, area, gauges, sparklines — only with figures already in the article."
              when="Share-of-total, distribution bins, trends over time, KPI rings."
            >
              <p className="mb-4 text-small font-semibold text-text-primary">
                7) Pie chart — share of total
              </p>
              <BlogPieChart
                title="Illustrative traffic mix from article copy"
                variant="pie"
                items={[
                  { label: "Organic", value: 42, display: "42%" },
                  { label: "Paid", value: 35, display: "35%" },
                  { label: "External", value: 23, display: "23%" },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                8) Donut / radial pie — same data, hollow center
              </p>
              <BlogPieChart
                title="Budget allocation (donut)"
                variant="donut"
                items={[
                  { label: "Sponsored Products", value: 55, display: "55%" },
                  { label: "Sponsored Brands", value: 30, display: "30%" },
                  { label: "DSP / other", value: 15, display: "15%" },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                9) Histogram — frequency / distribution bins
              </p>
              <BlogHistogram
                title="Review rating distribution (illustrative)"
                yLabel="Count of SKUs"
                bins={[
                  { label: "1★", value: 4 },
                  { label: "2★", value: 8 },
                  { label: "3★", value: 22 },
                  { label: "4★", value: 48 },
                  { label: "5★", value: 71 },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                10) Line chart — trend over time
              </p>
              <BlogLineChart
                title="Monthly organic sessions (illustrative)"
                variant="line"
                points={[
                  { label: "Jan", value: 12 },
                  { label: "Feb", value: 15 },
                  { label: "Mar", value: 14 },
                  { label: "Apr", value: 19 },
                  { label: "May", value: 24 },
                  { label: "Jun", value: 28 },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                11) Area chart — filled trend
              </p>
              <BlogLineChart
                title="Ad-attributed revenue index"
                variant="area"
                points={[
                  { label: "Q1", value: 40 },
                  { label: "Q2", value: 55 },
                  { label: "Q3", value: 48 },
                  { label: "Q4", value: 72 },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                12) Radial gauges — circular KPI progress
              </p>
              <BlogRadialGauge
                title="Account health signals"
                items={[
                  { label: "Buy Box", percent: 92, display: "92%" },
                  { label: "In-stock", percent: 88, display: "88%" },
                  { label: "ACoS goal", percent: 64, display: "64%" },
                ]}
              />

              <p className="mb-4 mt-8 text-small font-semibold text-text-primary">
                13) Sparklines — compact multi-series trends
              </p>
              <BlogSparkline
                title="Weekly conversion index"
                series={[
                  {
                    label: "Parent ASIN A",
                    values: [2.1, 2.4, 2.2, 2.8, 3.1, 3.0, 3.4],
                  },
                  {
                    label: "Parent ASIN B",
                    values: [1.8, 1.7, 1.9, 2.0, 1.8, 2.2, 2.1],
                  },
                ]}
              />
              <Fence>{`\`\`\`pie-chart
TITLE: Traffic mix
VARIANT: pie
Organic | 42 | 42%
Paid | 35 | 35%
External | 23 | 23%
\`\`\`

\`\`\`pie-chart
TITLE: Budget
VARIANT: donut
SP | 55 | 55%
SB | 30 | 30%
DSP | 15 | 15%
\`\`\`

\`\`\`histogram
TITLE: Rating distribution
Y: Count of SKUs
1★ | 4
2★ | 8
3★ | 22
4★ | 48
5★ | 71
\`\`\`

\`\`\`line-chart
TITLE: Organic sessions
VARIANT: line
Jan | 12
Feb | 15
Mar | 14
\`\`\`

\`\`\`line-chart
TITLE: Revenue index
VARIANT: area
Q1 | 40
Q2 | 55
Q3 | 48
\`\`\`

\`\`\`radial-gauge
TITLE: Account health
Buy Box | 92 | 92%
In-stock | 88 | 88%
\`\`\`

\`\`\`sparkline
TITLE: Weekly CVR
Parent A | 2.1, 2.4, 2.2, 2.8, 3.1
Parent B | 1.8, 1.7, 1.9, 2.0, 1.8
\`\`\``}</Fence>
            </BlockSection>

            <BlockSection
              id="compare"
              title="Compare columns"
              purpose="A vs B layouts without forcing a table."
              when="A9 vs A10, Before/After, Pros/Cons, Plan A/B."
            >
              <p className="mb-3 text-small font-semibold text-text-primary">
                Text vs text columns
              </p>
              <BlogCompareColumns
                columns={[
                  {
                    title: "A9 focus",
                    items: [
                      "Sales velocity",
                      "Keyword relevance",
                      "Listing completeness",
                    ],
                  },
                  {
                    title: "A10 / 2025 focus",
                    items: [
                      "Customer experience",
                      "External traffic",
                      "Intent-led discovery",
                    ],
                  },
                ]}
              />

              <p className="mb-3 mt-8 text-small font-semibold text-text-primary">
                Pros / cons
              </p>
              <BlogProsCons
                data={{
                  prosTitle: "Pros",
                  consTitle: "Cons",
                  pros: [
                    "Higher relevance for natural-language queries",
                    "External traffic can reinforce demand signals",
                  ],
                  cons: [
                    "Keyword stuffing loses effectiveness",
                    "Weak CX metrics can suppress rank",
                  ],
                }}
              />

              <p className="mb-3 mt-8 text-small font-semibold text-text-primary">
                Media compare (text · text, or image · text when assets exist)
              </p>
              <BlogMediaCompare
                left={{
                  label: "Before",
                  text: "Title stuffed with special characters and repeats.",
                }}
                right={{
                  label: "After",
                  text: "Concise, natural title aligned to shopper intent.",
                }}
              />
              <Fence>{`\`\`\`compare-columns
## A9 focus
- Sales velocity

## A10 / 2025 focus
- Customer experience
\`\`\`

\`\`\`pros-cons
## Pros
- Higher relevance for natural-language queries

## Cons
- Keyword stuffing loses effectiveness
\`\`\`

\`\`\`media-compare
## Before
text: Title stuffed with special characters and repeats.
## After
text: Concise, natural title aligned to shopper intent.
\`\`\``}</Fence>
            </BlockSection>

            <BlockSection
              id="editorial"
              title="Editorial extras (shipped)"
              purpose="AEO helpers, glossaries, quotes, personas, markets, formulas."
              when="When the article already contains the wording or verified figures."
            >
              <BlogDefinitionList
                items={[
                  {
                    term: "COSMO",
                    definition:
                      "Amazon’s context-aware ranking layer that prioritizes shopper intent over stuffed keywords.",
                  },
                  {
                    term: "Rufus",
                    definition:
                      "Amazon’s conversational assistant that can surface sponsored recommendations.",
                  },
                ]}
              />
              <BlogChecklist
                title="Listing hygiene checklist"
                items={[
                  "Remove excessive special characters from titles",
                  "Rewrite bullets around customer benefits",
                  "Confirm backend keywords cover long-tail intent",
                ]}
              />
              <BlogPullQuote
                quote="Customer experience is now a core ranking factor — not a soft metric."
                attribution="From this guide’s A10 section"
              />
              <BlogInsightChip
                label="Expert note"
                text="Review AI-generated Enhance My Listing output before publishing so brand voice stays consistent."
              />
              <BlogFormula
                expression="TACOS = Ad spend ÷ Total sales"
                note="Use only with figures already stated in the article or case study."
              />
              <BlogMarketplaceChips markets={["US", "UK", "DE", "AE", "CA"]} />
              <BlogCaseSnapshot
                niche="Home & kitchen brand"
                metric="+20%"
                detail="External traffic campaigns correlated with ranking lift cited in the article narrative."
              />
              <BlogPersonaTabs
                tabs={[
                  {
                    id: "brand",
                    label: "Brand seller",
                    body: "Prioritize listing language, review velocity, and off-Amazon traffic loops.",
                  },
                  {
                    id: "wholesale",
                    label: "Wholesale",
                    body: "Focus on catalog compliance, title rules, and fulfillment reliability.",
                  },
                  {
                    id: "agency",
                    label: "Agency partner",
                    body: "Use Conversion Path reports and Rufus ad tests to brief clients on 2025 shifts.",
                  },
                ]}
              />
              <Fence>{`\`\`\`definition-list
COSMO | Amazon’s context-aware ranking layer…
\`\`\`

\`\`\`checklist
TITLE: Listing hygiene checklist
- Remove excessive special characters from titles
\`\`\`

\`\`\`pull-quote
Customer experience is now a core ranking factor.
— From this guide’s A10 section
\`\`\`

\`\`\`insight
TITLE: Expert note
Review AI-generated Enhance My Listing output before publishing.
\`\`\`

\`\`\`formula
TACOS = Ad spend ÷ Total sales
note: Use only with figures already stated in the article.
\`\`\`

\`\`\`markets
US, UK, DE, AE, CA
\`\`\`

\`\`\`case-snapshot
Home & kitchen brand | +20% | External traffic campaigns correlated with ranking lift.
\`\`\`

\`\`\`persona-tabs
## Brand seller
Prioritize listing language…

## Wholesale
Focus on catalog compliance…
\`\`\``}</Fence>
            </BlockSection>

            <BlockSection
              id="media"
              title="Figure & video"
              purpose="Captioned images and outbound video cards without raw HTML embeds."
              when="Featured diagrams, screenshots, or approved YouTube/Vimeo links already in copy."
            >
              <p className="mb-3 text-small font-semibold text-text-primary">
                Figure — image + caption
              </p>
              <BlogFigure
                src="/images/logo.png"
                alt="eCom Gliders wordmark"
                caption="Sample figure caption — replace with article asset path and alt text."
              />

              <p className="mb-3 mt-8 text-small font-semibold text-text-primary">
                Video embed — YouTube / Vimeo in-page iframe (allowlisted hosts)
              </p>
              <BlogVideoCard
                title="Sample YouTube embed"
                href="https://www.youtube.com/watch?v=aqz-KE-bpKQ"
                caption="MODE: embed (default). Use MODE: link for poster + outbound only."
                mode="embed"
              />
              <p className="mb-3 mt-8 text-small font-semibold text-text-primary">
                Video link card — when URL is not YouTube/Vimeo
              </p>
              <BlogVideoCard
                title="Outbound video link"
                href="https://ecomgliders.com/"
                poster="/images/blog/2025-Amazon-Algorithm-Updates-What-Sellers-Need-to-Know-2-91463d61.png"
                caption="Falls back to poster + play control opening the href."
                mode="link"
              />
              <Fence>{`\`\`\`figure
/images/blog/example.webp | Alt text describing the image | Optional caption
\`\`\`

\`\`\`video-card
MODE: embed
Walkthrough title | https://www.youtube.com/watch?v=VIDEO_ID | | Optional caption
\`\`\`

\`\`\`video-card
MODE: link
Walkthrough title | https://example.com/video | /images/poster.webp | Optional caption
\`\`\`

Markdown images in posts also render as figures (title attribute → caption).`}</Fence>
            </BlockSection>

            <BlockSection
              id="cta"
              title="CTAs & resources"
              purpose="Conversion and downloads without inventing offers."
              when="Existing promo clusters / consultation asks already in copy."
            >
              <BlogCtaBlock
                data={{
                  title: "Ready to act on these updates?",
                  description:
                    "Request a free consultation — dedicated page can ship later.",
                  label: "Contact",
                  href: "/contact/",
                }}
              />
              <BlogResourceLink
                title="Free account audit"
                description="Keep linking to the live audit flow until a consultation page ships."
                label="Open free audit"
                href="/free-audit/"
              />
              <p className="mt-3 text-small font-medium text-text-secondary">
                Free consultation landing page: deferred. Use Contact / Free
                Audit for now.
              </p>
            </BlockSection>

            <BlockSection
              id="rails"
              title="Rails: TOC · Share · Ask AI · Takeaways"
              purpose="Orientation + distribution + AEO helpers beside the article."
              when="Detail template only — extracted from existing headings/claims."
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <BlogKeyTakeaways
                  compact
                  items={[
                    "Optimize listings for natural, customer-centric language…",
                    "Diversify marketing with off-Amazon channels…",
                    "Maintain service quality to avoid ranking penalties…",
                  ]}
                />
                <div className="border-2 border-primary bg-primary p-3 text-text-on-dark shadow-[3px_3px_0_0_#131311]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                    Ask AI about this article
                  </p>
                  <p className="mt-2 text-[11px] text-text-on-dark/75">
                    ChatGPT · Claude · Gemini · Perplexity with article-scoped
                    prompts (title + canonical URL). Same icon set as homepage.
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-small font-medium text-text-secondary">
                <li>
                  <strong className="text-text-primary">TOC:</strong> main
                  sections numbered; numbered sub-points nested underneath.
                </li>
                <li>
                  <strong className="text-text-primary">Share:</strong> icon row
                  only + “…” opens a popup of every network (YouTube-style).
                </li>
                <li>
                  <strong className="text-text-primary">Ask AI:</strong> icon row
                  + “…” popup with labeled providers.
                </li>
                <li>
                  <strong className="text-text-primary">Takeaways:</strong> max
                  3, compact — share stays reachable.
                </li>
              </ul>
            </BlockSection>

            <BlockSection
              id="related"
              title="Related articles"
              purpose="Continue reading without card clutter."
              when="End of every post with related slugs."
            >
              <div className="border-2 border-primary bg-surface shadow-[4px_4px_0_0_#131311]">
                <div className="flex gap-4 border-b border-border p-4">
                  <div className="hidden h-16 w-24 shrink-0 bg-accent/50 sm:block" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary">
                      Guide 2025
                    </p>
                    <p className="font-semibold text-text-primary">
                      Sample related title sits on one editorial row
                    </p>
                    <p className="text-small font-medium text-text-secondary">
                      May 8, 2025 · 8 min read
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4">
                  <div className="hidden h-16 w-24 shrink-0 bg-surface-muted sm:block" />
                  <div>
                    <p className="font-semibold text-text-primary">
                      Second related row — thumb + meta + arrow
                    </p>
                  </div>
                </div>
              </div>
            </BlockSection>

            <section
              id="fences"
              className="scroll-mt-24 border-2 border-primary bg-background p-6 shadow-[4px_4px_0_0_#131311] md:p-8"
            >
              <h2 className="text-h2">Fence cheat sheet (all shipped)</h2>
              <p className="mt-2 text-body font-medium text-text-secondary">
                Allowlisted in{" "}
                <code className="text-small">content/config/blog-blocks.json</code>
                . Deferred only: interactive before/after slider and audio TTS
                (need approved assets / product decision).
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[40rem] border-collapse text-left text-small">
                  <thead className="bg-primary text-text-on-dark">
                    <tr>
                      <th className="px-3 py-2">Fence</th>
                      <th className="px-3 py-2">Component</th>
                      <th className="px-3 py-2">Body shape</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["feature-grid", "BlogFeatureGrid", "title | desc"],
                      ["callout / tip / warning", "BlogCallout", "optional TITLE:"],
                      ["steps", "BlogSteps", "title | desc"],
                      ["timeline", "BlogTimeline", "label | body"],
                      ["metric-bars", "BlogMetricBars", "label | pct"],
                      ["chart-cards", "BlogChartCards", "HEADERS + rows"],
                      ["chart-ranked", "BlogChartRanked", "label | detail | pct"],
                      ["bar-chart", "BlogBarChart", "TITLE + ORIENTATION + rows"],
                      ["pie-chart", "BlogPieChart", "TITLE + VARIANT pie|donut + rows"],
                      ["histogram", "BlogHistogram", "TITLE + Y + label | value"],
                      ["line-chart", "BlogLineChart", "TITLE + VARIANT line|area + rows"],
                      ["radial-gauge", "BlogRadialGauge", "TITLE + label | pct"],
                      ["sparkline", "BlogSparkline", "TITLE + label | v1, v2…"],
                      ["stat-row", "BlogStatRow", "value | label"],
                      ["compare-columns", "BlogCompareColumns", "## col + bullets"],
                      ["pros-cons", "BlogProsCons", "## Pros / ## Cons"],
                      ["media-compare", "BlogMediaCompare", "## side + image/text"],
                      ["definition-list", "BlogDefinitionList", "term | definition"],
                      ["checklist", "BlogChecklist", "TITLE + bullets"],
                      ["pull-quote", "BlogPullQuote", "quote + optional — attr"],
                      ["insight", "BlogInsightChip", "optional TITLE + text"],
                      ["figure", "BlogFigure", "src | alt | caption"],
                      ["video-card", "BlogVideoCard", "title | href | poster | caption"],
                      ["formula", "BlogFormula", "expression + note:"],
                      ["markets", "BlogMarketplaceChips", "US, UK, DE…"],
                      ["case-snapshot", "BlogCaseSnapshot", "niche | metric | detail"],
                      ["resource", "BlogResourceLink", "title | desc | label | href"],
                      ["persona-tabs", "BlogPersonaTabs", "## persona + body"],
                      ["cta", "BlogCtaBlock", "title | desc | label | href"],
                      ["(markdown table)", "GFM table", "pipe table"],
                    ].map(([fence, component, shape]) => (
                      <tr key={fence} className="border-b border-border">
                        <td className="px-3 py-2 font-mono text-[11px]">
                          {fence}
                        </td>
                        <td className="px-3 py-2">{component}</td>
                        <td className="px-3 py-2 text-text-secondary">{shape}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              id="rules"
              className="scroll-mt-24 border-2 border-primary bg-accent/20 p-6 md:p-8"
            >
              <h2 className="text-h2">Non-negotiable content rules</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-body text-text-primary">
                <li>Do not change article claims, numbers, or hrefs.</li>
                <li>Do not invent chart values — only parse what is written.</li>
                <li>Strip authoring notes (Visual Elements) — keep reader prose.</li>
                <li>Preserve URL paths for ranking continuity.</li>
                <li>
                  Prefer convert-to-block over delete when WP chrome appears.
                </li>
                <li>
                  Free consultation dedicated page: later. Current CTAs may use
                  Contact / Free Audit.
                </li>
              </ol>
              <h3 className="mt-8 text-h3">Canonical media (locked)</h3>
              <p className="mt-2 text-small font-medium text-text-secondary">
                Source:{" "}
                <code className="text-[11px]">
                  content/config/blog-blocks.json#canonical
                </code>
              </p>
              <ul className="mt-4 space-y-3 text-body text-text-primary">
                <li>
                  <strong className="font-semibold">Charts:</strong>{" "}
                  {canonical.multiColumnChart?.rule ??
                    "chart-cards → column bars + notes when % present."}{" "}
                  Explicit series use{" "}
                  <code className="text-small">bar-chart</code>.
                </li>
                <li>
                  <strong className="font-semibold">Figure:</strong>{" "}
                  {canonical.figure?.also ??
                    "figure fence and markdown images share the same frame."}
                </li>
                <li>
                  <strong className="font-semibold">Video:</strong>{" "}
                  {canonical.video?.rule ??
                    "video-card embeds YouTube/Vimeo; MODE: link otherwise."}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
