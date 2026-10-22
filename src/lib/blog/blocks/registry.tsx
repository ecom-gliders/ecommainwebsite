import type { ReactNode } from "react";
import {
  BlogBarChart,
  parseBarChartBody,
} from "@/components/blog/blog-bar-chart";
import {
  BlogCallout,
  parseCalloutBody,
} from "@/components/blog/blog-callout";
import {
  BlogCaseSnapshot,
  parseCaseSnapshotBody,
} from "@/components/blog/blog-case-snapshot";
import {
  BlogChartCards,
  parseChartCardsBody,
} from "@/components/blog/blog-chart-cards";
import {
  BlogChartRanked,
  parseChartRankedBody,
} from "@/components/blog/blog-chart-ranked";
import {
  BlogChecklist,
  parseChecklistBody,
} from "@/components/blog/blog-checklist";
import {
  BlogCompareColumns,
  parseCompareColumnsBody,
} from "@/components/blog/blog-compare-columns";
import {
  BlogCtaBlock,
  parseCtaBlockBody,
} from "@/components/blog/blog-cta-block";
import {
  BlogDefinitionList,
  parseDefinitionListBody,
} from "@/components/blog/blog-definition-list";
import {
  BlogFeatureGrid,
  parseFeatureGridBody,
} from "@/components/blog/blog-feature-grid";
import { BlogFigure, parseFigureBody } from "@/components/blog/blog-figure";
import {
  BlogFormula,
  parseFormulaBody,
} from "@/components/blog/blog-formula";
import {
  BlogHistogram,
  parseHistogramBody,
} from "@/components/blog/blog-histogram";
import {
  BlogInsightChip,
  parseInsightChipBody,
} from "@/components/blog/blog-insight-chip";
import {
  BlogLineChart,
  parseLineChartBody,
} from "@/components/blog/blog-line-chart";
import {
  BlogMarketplaceChips,
  parseMarketplaceChipsBody,
} from "@/components/blog/blog-marketplace-chips";
import {
  BlogMediaCompare,
  parseMediaCompareBody,
} from "@/components/blog/blog-media-compare";
import {
  BlogMetricBars,
  parseMetricBarsBody,
} from "@/components/blog/blog-metric-bars";
import {
  BlogPersonaTabs,
  parsePersonaTabsBody,
} from "@/components/blog/blog-persona-tabs";
import {
  BlogPieChart,
  parsePieChartBody,
} from "@/components/blog/blog-pie-chart";
import {
  BlogProsCons,
  parseProsConsBody,
} from "@/components/blog/blog-pros-cons";
import {
  BlogPullQuote,
  parsePullQuoteBody,
} from "@/components/blog/blog-pull-quote";
import {
  BlogRadialGauge,
  parseRadialGaugeBody,
} from "@/components/blog/blog-radial-gauge";
import {
  BlogResourceLink,
  parseResourceLinkBody,
} from "@/components/blog/blog-resource-link";
import {
  BlogSparkline,
  parseSparklineBody,
} from "@/components/blog/blog-sparkline";
import { BlogStatRow, parseStatRowBody } from "@/components/blog/blog-stat-row";
import { BlogSteps, parseStepsBody } from "@/components/blog/blog-steps";
import {
  BlogTimeline,
  parseTimelineBody,
} from "@/components/blog/blog-timeline";
import {
  BlogVideoCard,
  parseVideoCardBody,
} from "@/components/blog/blog-video-card";
import { loadBlogBlocksConfig } from "@/lib/blog/blocks/load-blog-blocks-config";
import type { CalloutVariant } from "@/lib/blog/blocks/types";

export interface BlockRenderContext {
  markdownRenderer: (markdown: string) => ReactNode;
}

type BlockRenderer = (
  body: string,
  ctx: BlockRenderContext,
  componentProps?: Record<string, string>,
) => ReactNode;

const COMPONENT_RENDERERS: Record<string, BlockRenderer> = {
  BlogFeatureGrid: (body) => (
    <BlogFeatureGrid cards={parseFeatureGridBody(body)} />
  ),
  BlogCallout: (body, ctx, componentProps) => {
    const parsed = parseCalloutBody(body);
    const variant = (componentProps?.variant ?? "default") as CalloutVariant;
    return (
      <BlogCallout title={parsed.title} variant={variant}>
        {ctx.markdownRenderer(parsed.markdown)}
      </BlogCallout>
    );
  },
  BlogSteps: (body) => <BlogSteps steps={parseStepsBody(body)} />,
  BlogTimeline: (body) => <BlogTimeline items={parseTimelineBody(body)} />,
  BlogMetricBars: (body) => (
    <BlogMetricBars items={parseMetricBarsBody(body)} />
  ),
  BlogChartCards: (body) => {
    const parsed = parseChartCardsBody(body);
    return (
      <BlogChartCards
        rows={parsed.rows}
        headers={parsed.headers}
        title={parsed.title}
      />
    );
  },
  BlogChartRanked: (body) => (
    <BlogChartRanked items={parseChartRankedBody(body)} />
  ),
  BlogBarChart: (body) => {
    const parsed = parseBarChartBody(body);
    return (
      <BlogBarChart
        title={parsed.title}
        orientation={parsed.orientation}
        items={parsed.items}
      />
    );
  },
  BlogPieChart: (body) => {
    const parsed = parsePieChartBody(body);
    return (
      <BlogPieChart
        title={parsed.title}
        variant={parsed.variant}
        items={parsed.items}
      />
    );
  },
  BlogHistogram: (body) => {
    const parsed = parseHistogramBody(body);
    return (
      <BlogHistogram
        title={parsed.title}
        yLabel={parsed.yLabel}
        bins={parsed.bins}
      />
    );
  },
  BlogLineChart: (body) => {
    const parsed = parseLineChartBody(body);
    return (
      <BlogLineChart
        title={parsed.title}
        variant={parsed.variant}
        points={parsed.points}
      />
    );
  },
  BlogRadialGauge: (body) => {
    const parsed = parseRadialGaugeBody(body);
    return <BlogRadialGauge title={parsed.title} items={parsed.items} />;
  },
  BlogSparkline: (body) => {
    const parsed = parseSparklineBody(body);
    return <BlogSparkline title={parsed.title} series={parsed.series} />;
  },
  BlogVideoCard: (body) => {
    const parsed = parseVideoCardBody(body);
    return parsed ? <BlogVideoCard {...parsed} /> : null;
  },
  BlogStatRow: (body) => <BlogStatRow items={parseStatRowBody(body)} />,
  BlogCompareColumns: (body) => (
    <BlogCompareColumns columns={parseCompareColumnsBody(body)} />
  ),
  BlogProsCons: (body) => {
    const data = parseProsConsBody(body);
    return data ? <BlogProsCons data={data} /> : null;
  },
  BlogMediaCompare: (body) => {
    const data = parseMediaCompareBody(body);
    return data ? (
      <BlogMediaCompare left={data.left} right={data.right} />
    ) : null;
  },
  BlogDefinitionList: (body) => (
    <BlogDefinitionList items={parseDefinitionListBody(body)} />
  ),
  BlogChecklist: (body) => {
    const parsed = parseChecklistBody(body);
    return <BlogChecklist title={parsed.title} items={parsed.items} />;
  },
  BlogPullQuote: (body) => {
    const parsed = parsePullQuoteBody(body);
    return (
      <BlogPullQuote quote={parsed.quote} attribution={parsed.attribution} />
    );
  },
  BlogInsightChip: (body) => {
    const parsed = parseInsightChipBody(body);
    return <BlogInsightChip label={parsed.label} text={parsed.text} />;
  },
  BlogFigure: (body) => {
    const parsed = parseFigureBody(body);
    return parsed ? (
      <BlogFigure src={parsed.src} alt={parsed.alt} caption={parsed.caption} />
    ) : null;
  },
  BlogFormula: (body) => {
    const parsed = parseFormulaBody(body);
    return (
      <BlogFormula expression={parsed.expression} note={parsed.note} />
    );
  },
  BlogMarketplaceChips: (body) => (
    <BlogMarketplaceChips markets={parseMarketplaceChipsBody(body)} />
  ),
  BlogCaseSnapshot: (body) => {
    const parsed = parseCaseSnapshotBody(body);
    return parsed ? <BlogCaseSnapshot {...parsed} /> : null;
  },
  BlogResourceLink: (body) => {
    const parsed = parseResourceLinkBody(body);
    return parsed ? <BlogResourceLink {...parsed} /> : null;
  },
  BlogPersonaTabs: (body) => (
    <BlogPersonaTabs tabs={parsePersonaTabsBody(body)} />
  ),
  BlogCtaBlock: (body) => {
    const data = parseCtaBlockBody(body);
    if (!data) return null;
    return <BlogCtaBlock data={data} />;
  },
};

export function renderBlogBlock(
  language: string,
  body: string,
  ctx: BlockRenderContext,
): ReactNode {
  const config = loadBlogBlocksConfig();
  const definition = config.blocks.find(
    (block) => block.fenceLanguage === language,
  );
  if (!definition?.componentId) {
    return null;
  }

  const renderer = COMPONENT_RENDERERS[definition.componentId];
  if (!renderer) {
    return null;
  }

  return renderer(body, ctx, definition.componentProps);
}
