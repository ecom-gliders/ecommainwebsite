import type { CaseStudyDetail } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { caseStudyHardPanel } from "../case-study-hard-panel";

export function CredentialsBar({ study }: { study: CaseStudyDetail }) {
  const items = [
    { label: "Client", value: study.clientDisplayName ?? study.client },
    { label: "Category", value: study.category },
    { label: "Market", value: study.market },
    { label: "Duration", value: study.duration },
  ].filter((item) => Boolean(item.value));

  if (items.length === 0) return null;

  return (
    <dl className={cn(caseStudyHardPanel, "grid gap-4 bg-[#F4F4F4] p-5 sm:grid-cols-2 lg:grid-cols-4")}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
            {item.label}
          </dt>
          <dd className="mt-1 text-body font-semibold text-text-primary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ServicesChips({
  study,
  onDark = false,
}: {
  study: CaseStudyDetail;
  onDark?: boolean;
}) {
  const services = study.servicesDelivered?.length
    ? study.servicesDelivered
    : [study.service];

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Services delivered">
      {services.map((service) => (
        <li key={service}>
          <Badge
            variant="outline"
            className={cn(
              "border-2 font-semibold",
              onDark
                ? "border-accent/60 bg-primary/30 text-accent"
                : "border-primary bg-background text-primary",
            )}
          >
            {service}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

export function KeyIssuesList({ study }: { study: CaseStudyDetail }) {
  if (!study.keyIssues?.length) return null;

  return (
    <ul className="mt-4 space-y-3">
      {study.keyIssues.map((issue, index) => (
        <li
          key={issue}
          className={cn(caseStudyHardPanel, "flex gap-3 bg-background px-4 py-3 text-body font-medium text-text-secondary")}
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border-2 border-primary bg-primary text-[11px] font-bold text-text-on-dark"
          >
            {index + 1}
          </span>
          <span>{issue}</span>
        </li>
      ))}
    </ul>
  );
}

export function StrategyStages({ study }: { study: CaseStudyDetail }) {
  const stages = study.strategyStages?.length
    ? study.strategyStages
    : study.solution.steps.map((step) => ({
        title: step.title,
        bullets: [step.description],
        outcome: undefined as string | undefined,
      }));

  return (
    <SectionShell id="case-study-solution" ariaLabelledBy="case-study-solution-heading">
      <SectionHeading heading={study.solution.heading} headingId="case-study-solution-heading" />
      <ol className="mt-8 grid gap-4 lg:grid-cols-2">
        {stages.map((stage, index) => (
          <li key={stage.title} className={cn(caseStudyHardPanel, "bg-[#F4F4F4] p-6")}>
            <div className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border-2 border-primary bg-primary text-small font-bold text-text-on-dark"
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-h4">{stage.title}</h3>
                {stage.bullets.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-body font-medium text-text-secondary">
                    {stage.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 48)}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {stage.outcome ? (
                  <p className="mt-3 rounded-[8px] border border-primary/15 bg-background px-3 py-2 text-small font-semibold text-text-primary">
                    {stage.outcome}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

export function BeforeAfterBand({ study }: { study: CaseStudyDetail }) {
  if (!study.beforeAfter?.length) return null;

  return (
    <SectionShell id="case-study-before-after" tone="muted" ariaLabelledBy="case-study-before-after-heading">
      <SectionHeading heading="Before and after" headingId="case-study-before-after-heading" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {study.beforeAfter.map((row) => (
          <li key={row.label} className={cn(caseStudyHardPanel, "bg-background p-5")}>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
              {row.label}
            </p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-text-secondary">Before</p>
                <p className="text-lg font-bold text-text-secondary line-through decoration-primary/30">
                  {row.before}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-secondary">After</p>
                <p className="text-2xl font-black text-primary">{row.after}</p>
              </div>
            </div>
            {row.change ? (
              <p className="mt-3 inline-flex rounded-[6px] border-2 border-primary bg-accent px-2 py-1 text-xs font-black text-primary">
                {row.change}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

export function ResultsGrid({ study }: { study: CaseStudyDetail }) {
  return (
    <SectionShell id="case-study-results" tone="muted" ariaLabelledBy="case-study-results-heading">
      <SectionHeading heading={study.results.heading} headingId="case-study-results-heading" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {study.results.metrics.map((metric) => (
          <li key={`${metric.label}-${metric.value}`} className={cn(caseStudyHardPanel, "bg-background p-6")}>
            <p className="text-small font-medium text-text-secondary">{metric.label}</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-primary">{metric.value}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

export function StickyKpiAside({
  study,
  tone = "light",
}: {
  study: CaseStudyDetail;
  tone?: "light" | "dark";
}) {
  const facts = [
    { term: "Market", detail: study.market },
    { term: "Duration", detail: study.duration },
    { term: "Category", detail: study.category },
  ].filter((fact): fact is { term: string; detail: string } => Boolean(fact.detail));
  const isDark = tone === "dark";

  return (
    <aside
      className={cn(
        caseStudyHardPanel,
        "p-6 lg:sticky lg:top-28 lg:self-start",
        isDark ? "border-accent bg-background text-primary" : "bg-[#F4F4F4]",
      )}
    >
      <h2
        className={cn(
          "text-[11px] font-bold uppercase tracking-[0.14em]",
          isDark ? "text-text-secondary" : "text-text-secondary",
        )}
      >
        Results at a glance
      </h2>
      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
        {study.results.metrics.slice(0, 4).map((metric) => (
          <div key={`${metric.label}-${metric.value}`}>
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="block border-l-[3px] border-accent pl-2 text-xl font-black tracking-tight text-primary sm:text-2xl">
                {metric.value}
              </span>
              <span className="mt-1 block text-xs leading-snug text-text-secondary">{metric.label}</span>
            </dd>
          </div>
        ))}
      </dl>
      {facts.length > 0 ? (
        <>
          <hr className="my-6 border-primary/20" />
          <dl className="space-y-3">
            {facts.map((fact) => (
              <div key={fact.term} className="flex items-baseline justify-between gap-4 text-sm">
                <dt className="text-text-secondary">{fact.term}</dt>
                <dd className="text-right font-medium text-text-primary">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : null}
    </aside>
  );
}

export function LaunchTimeline({ study }: { study: CaseStudyDetail }) {
  if (study.layout !== "launch") return null;

  const milestones = [
    { label: "Engagement", value: study.duration ?? "Launch window" },
    { label: "Primary outcome", value: `${study.metric} ${study.metricLabel}` },
    ...(study.secondaryMetric
      ? [{ label: study.secondaryMetricLabel ?? "Secondary", value: study.secondaryMetric }]
      : []),
  ];

  return (
    <SectionShell id="case-study-timeline" ariaLabelledBy="case-study-timeline-heading">
      <SectionHeading heading="Launch timeline" headingId="case-study-timeline-heading" />
      <ol className="mt-8 grid gap-4 sm:grid-cols-3">
        {milestones.map((item, index) => (
          <li key={item.label} className={cn(caseStudyHardPanel, "bg-[#F4F4F4] p-5")}>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
              Step {index + 1}
            </p>
            <p className="mt-2 text-h4">{item.value}</p>
            <p className="mt-1 text-small font-medium text-text-secondary">{item.label}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

export function MarketChips({
  study,
  onDark = false,
}: {
  study: CaseStudyDetail;
  onDark?: boolean;
}) {
  if (study.layout !== "expansion" || !study.market) return null;

  const markets = study.market.split(/[,+]/).map((part) => part.trim()).filter(Boolean);

  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Markets">
      {markets.map((market) => (
        <li key={market}>
          <Badge
            className={cn(
              "border-2 font-semibold",
              onDark
                ? "border-accent bg-accent text-primary"
                : "border-primary bg-primary text-text-on-dark",
            )}
          >
            {market}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
