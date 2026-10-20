import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function decode(s: string): string {
  return s
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#038;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function stripHtml(html: string): string {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function extractChallenge(html: string): string[] {
  const idx = html.search(/The Challenge:?/i);
  if (idx === -1) {
    return ["Content migrated from the prior site."];
  }

  const chunk = stripHtml(html.slice(idx, idx + 1200));
  const text = chunk
    .replace(/^The Challenge:?/i, "")
    .replace(/<\/?[^>]+$/g, "")
    .replace(/Key issues:?.*$/i, "")
    .trim();
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const paras: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).length > 280 && current) {
      paras.push(current.trim());
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
    if (paras.length >= 2) break;
  }

  if (current && paras.length < 2) {
    paras.push(current.trim());
  }

  return paras.length ? paras : [text.slice(0, 400)];
}

const studiesMeta = [
  {
    slug: "case-study-1",
    client: "Kitchen brand",
    metric: "73%",
    metricLabel: "Sales growth",
    category: "Home and kitchen",
    service: "Account Management + Listing Optimization",
    serviceFilter: "Account Management",
    excerpt:
      "From stagnant sales to sustained growth through catalog optimization and targeted PPC restructuring.",
  },
  {
    slug: "case-study-2",
    client: "Supplement launch",
    metric: "500 units",
    metricLabel: "Sold in 30 days",
    category: "Health and wellness",
    service: "Product launch + PPC",
    serviceFilter: "Product Launch",
    excerpt:
      "Ranked in three weeks and sold 500 units in the first 30 days in a high-competition supplement category.",
  },
  {
    slug: "case-study-3",
    client: "VoltTech",
    metric: "Profitable",
    metricLabel: "PPC recovery",
    category: "Electronics",
    service: "Amazon PPC",
    serviceFilter: "PPC",
    excerpt:
      "Restructured campaigns, eliminated keyword overlap, and replaced wasted ad spend with profitable traffic.",
  },
  {
    slug: "case-study-4",
    client: "Pet grooming brand",
    metric: "2X",
    metricLabel: "Conversion rate",
    category: "Pet supplies",
    service: "Visual Creative + Listing Optimization",
    serviceFilter: "Visual Creative",
    excerpt:
      "Full visual rebrand with premium main images and A+ content that doubled listing conversion.",
  },
  {
    slug: "case-study-5",
    client: "Focus Design",
    metric: "Sell-out",
    metricLabel: "Seasonal inventory",
    category: "Travel and outdoor",
    service: "Account Management + PPC",
    serviceFilter: "Account Management",
    excerpt:
      "Turned delayed summer inventory into a seasonal sell-out with compressed launch strategy and targeted ads.",
  },
  {
    slug: "case-study-6",
    client: "US brand (EU expansion)",
    metric: "EU growth",
    metricLabel: "Market expansion",
    category: "Consumer goods",
    service: "International expansion",
    serviceFilter: "International",
    excerpt:
      "Localized listings and keyword strategy unlocked sales in Germany and France after automated translations failed.",
  },
  {
    slug: "case-study-7",
    client: "Safefine",
    metric: "3X",
    metricLabel: "Conversion rate",
    category: "Beauty and skincare",
    service: "Listing Optimization",
    serviceFilter: "Listing Optimization",
    excerpt:
      "Premium positioning and listing optimization tripled conversion in a price-competitive serum category.",
  },
  {
    slug: "case-study-8",
    client: "FocusForm",
    metric: "7-figure",
    metricLabel: "Brand in 9 months",
    category: "Office products",
    service: "Full account management",
    serviceFilter: "Account Management",
    excerpt:
      "Scaled from a single ASIN to a multi-product 7-figure brand with catalog expansion and brand defense.",
  },
  {
    slug: "case-study-9",
    client: "GoSports",
    metric: "310%",
    metricLabel: "Sales increase",
    category: "Sports and outdoor",
    service: "PPC + Account Management",
    serviceFilter: "PPC",
    excerpt:
      "Strategic listing optimization, data-driven advertising, and improved brand positioning delivered a 310% increase in Amazon sales.",
  },
];

const root = join(process.cwd());
const backupDir = join(root, "backup/pages");

const caseStudies = studiesMeta.map((meta) => {
  const htmlPath = join(backupDir, `${meta.slug}.html`);
  if (!existsSync(htmlPath)) {
    throw new Error(`Missing backup HTML: ${htmlPath}`);
  }

  const html = readFileSync(htmlPath, "utf-8");
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  let title = titleMatch
    ? decode(titleMatch[1].replace(/ - eCom Gliders$/, "").replace(/ Focus Design- eCom Gliders$/, ""))
    : meta.client;
  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1] ?? "";
  const challengeParas = extractChallenge(html);

  let resultsMetrics: { label: string; value: string }[];

  if (meta.slug === "case-study-9") {
    resultsMetrics = [
      { label: "Monthly revenue", value: "$22.1K to $90.7K (+310%)" },
      { label: "Conversion rate", value: "9.8% to 26.7%" },
      { label: "ACOS", value: "52% to 26.5%" },
      { label: "TACoS", value: "21% to 13.7%" },
      { label: "Branded traffic", value: "8% to 24%" },
    ];
  } else if (meta.slug === "case-study-1") {
    resultsMetrics = [
      { label: "Sales growth", value: "73%" },
      { label: "Conversion rate", value: "Improved from sub-11% baseline" },
      { label: "PPC efficiency", value: "Restructured for profitable scale" },
    ];
  } else if (meta.slug === "case-study-2") {
    resultsMetrics = [
      { label: "Ranking timeline", value: "Page 1 within 3 weeks" },
      { label: "Units sold", value: "500 in first 30 days" },
      { label: "Launch category", value: "High-competition supplements" },
    ];
  } else {
    resultsMetrics = [
      { label: "Primary outcome", value: `${meta.metric} ${meta.metricLabel}` },
      { label: "Service focus", value: meta.service },
      { label: "Category", value: meta.category },
    ];
  }

  const solutionSteps =
    meta.slug === "case-study-9"
      ? [
          {
            title: "Visual identity upgrade",
            description:
              "Lifestyle imagery, product detail shots, and A+ content repositioned the listing from commodity to premium backyard experience.",
          },
          {
            title: "Listing optimization",
            description:
              "Benefit-first copy, objection-handling bullets, and review-driven overlays improved click-through and conversion.",
          },
          {
            title: "PPC restructure and seasonal scaling",
            description:
              "Segmented keywords by utility, gift intent, and competitor conquest with tiered seasonal budgets.",
          },
          {
            title: "Post-purchase social proof",
            description:
              "Insert cards, UGC campaigns, and automated review follow-up built 237 new reviews in 45 days.",
          },
        ]
      : [
          {
            title: "Audit and diagnosis",
            description:
              "Reviewed catalog health, advertising structure, and competitive positioning to identify the highest-impact fixes.",
          },
          {
            title: "Targeted execution",
            description: `Applied ${meta.service.toLowerCase()} changes aligned to the client's category and growth stage.`,
          },
          {
            title: "Measurement and iteration",
            description:
              "Tracked conversion, ad efficiency, and revenue weekly, then refined campaigns and listings based on performance data.",
          },
        ];

  return {
    slug: meta.slug,
    title,
    client: meta.client,
    metric: meta.metric,
    metricLabel: meta.metricLabel,
    excerpt: meta.excerpt,
    featuredImage: ogImage,
    href: `/${meta.slug}/`,
    category: meta.category,
    service: meta.service,
    serviceFilter: meta.serviceFilter,
    heroSubheadline: meta.excerpt,
    challenge: { heading: "The challenge", paragraphs: challengeParas },
    solution: { heading: "Our approach", steps: solutionSteps },
    results: { heading: "Results", metrics: resultsMetrics },
    seo: {
      metaTitle: `${title} | eCom Gliders`,
      metaDescription: meta.excerpt,
      canonical: `/${meta.slug}/`,
      ogImage,
      schema: "Article" as const,
    },
  };
});

const config = {
  index: {
    hero: {
      title: "Client Success Stories",
      subtitle:
        "Real results from Amazon brands across categories. See how structured account management, PPC, and listing optimization drive measurable growth.",
    },
    seo: {
      metaTitle: "Amazon Case Studies and Client Results | eCom Gliders",
      metaDescription:
        "Real results from real brands: 310% sales growth, lower ACOS, stronger rankings. See how we scale Amazon brands across competitive niches.",
      canonical: "/case-studies/",
      ogImage: "https://ecomgliders.com/wp-content/uploads/2025/04/1st-brand.png",
      schema: "Organization" as const,
    },
  },
  filters: [
    "All",
    "PPC",
    "Account Management",
    "Listing Optimization",
    "Visual Creative",
    "Product Launch",
    "International",
  ],
  caseStudies,
};

writeFileSync(
  join(root, "content/config/case-studies.json"),
  `${JSON.stringify(config, null, 2)}\n`,
);

console.log(`Generated ${caseStudies.length} case studies`);
