import { writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const studies = [
  {
    slug: "case-study-1",
    title: "From Stagnant Sales to 73% Growth – Kitchen Brand Transformation",
    client: "FARBERWARE",
    clientDisplayName: "FARBERWARE",
    metric: "73%",
    metricLabel: "Sales growth",
    secondaryMetric: "90 days",
    secondaryMetricLabel: "Engagement",
    excerpt:
      "Strategic overhaul of listings, creatives, and PPC cut ACOS and boosted conversions across Home and Kitchen ASINs.",
    featuredImage: "/images/cases/case-study-1.png",
    featuredImageAlt: "FARBERWARE kitchen brand case study",
    href: "/case-study-1/",
    category: "Home and kitchen",
    service: "Listing Optimization + PPC",
    serviceFilter: "Account Management",
    layout: "expansion",
    market: "Amazon US",
    duration: "90 Days",
    servicesDelivered: ["Listing Optimization", "PPC", "A+ Content", "Brand Store"],
    heroSubheadline:
      "From stagnant sales to sustained growth through catalog optimization and targeted PPC restructuring.",
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "The brand had been selling on Amazon for 14 months but faced stagnation. Product reviews averaged 4.4 stars, conversion rates had plateaued below 11%, and PPC campaigns were inefficient with average ACOS around 51%.",
        "Visuals were generic, listings were keyword-stuffed, and the brand had no cohesive identity on Amazon.",
      ],
    },
    keyIssues: [
      "Underwhelming click-through rate (0.7%) on key listings",
      "Poor indexing for mid- and long-tail keywords",
      "Inconsistent A+ content across parent listings",
      "Lack of post-purchase funnel or review collection strategy",
    ],
    solution: {
      heading: "Our approach",
      steps: [
        {
          title: "Listing overhaul and SEO layering",
          description:
            "Keyword gap analysis and semantic mapping balanced TOFU and BOFU terms; titles and bullets emphasized clear USPs.",
        },
        {
          title: "Visual identity and A+ redesign",
          description:
            "Hero imagery, comparison modules, and a cohesive brand story improved CTR and A+ engagement.",
        },
        {
          title: "Ad account restructure",
          description:
            "SKAG structure with discovery, ranking, and retention phases plus time-of-day bid modifiers.",
        },
        {
          title: "Review funnel and brand store",
          description:
            "Compliant review requests, inserts, and storefront cross-sell pages increased reviews and multi-ASIN sales.",
        },
      ],
    },
    strategyStages: [
      {
        title: "Listing overhaul and SEO layering",
        bullets: [
          "Keyword gap analysis with Helium 10 and Brand Analytics",
          "Semantic keyword mapping across TOFU and BOFU terms",
          "Titles and bullets rewritten around clear USPs",
        ],
        outcome: "Indexed for 142 new keywords; 38 ranking on page 1 after 30 days.",
      },
      {
        title: "Visual identity and A+ content redesign",
        bullets: [
          "Hero images with size indicators and mobile contrast",
          "Lifestyle A+ modules and competitor comparison charts",
          "Why Choose Us story using voice-of-customer language",
        ],
        outcome: "CTR improved from 0.7% to 1.6%; A+ scroll depth up 48%.",
      },
      {
        title: "Ad account restructure (PPC 2.0)",
        bullets: [
          "SKAGs for granular control",
          "Discovery, ranking, and retention campaign phases",
          "Peak-hour bid modifiers (Mon–Fri, 6–9 PM EST)",
        ],
        outcome: "ACOS 51% to 34%; TACoS 19.8%; PPC-driven sales +37%.",
      },
      {
        title: "Post-purchase review funnel and inserts",
        bullets: [
          "Request a Review API flow across three touchpoints",
          "Branded insert with compliant bonus content offer",
          "VOC phrases fed back into listings and FAQs",
        ],
        outcome: "Review rate 2.1% to 3.6%; 212 verified reviews in 45 days.",
      },
      {
        title: "Brand store and cross-sell strategy",
        bullets: [
          "Store rebuilt around bestsellers and bundles",
          "Collection sub-pages for baking and eco-friendly kitchen",
          "Sponsored Brand Video to curated storefront sections",
        ],
        outcome: "Brand Store CVR 4.8% to 9.2%; 14.7% of sales from cross-ASIN navigation.",
      },
    ],
    results: {
      heading: "Results",
      metrics: [
        { label: "Monthly revenue", value: "$23,150 to $40,060 (+73%)" },
        { label: "Conversion rate", value: "10.6% to 17.1%" },
        { label: "ACOS", value: "51% to 34%" },
        { label: "Page 1 keyword rankings", value: "19 to 57" },
        { label: "CTR (main ASIN)", value: "0.7% to 1.6%" },
        { label: "Review count", value: "418 to 630" },
      ],
    },
    beforeAfter: [
      { label: "Monthly revenue", before: "$23,150", after: "$40,060", change: "+73%" },
      { label: "Conversion rate", before: "10.6%", after: "17.1%", change: "+61%" },
      { label: "ACOS", before: "51%", after: "34%", change: "-33%" },
      { label: "CTR (main ASIN)", before: "0.7%", after: "1.6%", change: "+128%" },
    ],
    relatedSlugs: ["case-study-7", "case-study-4", "case-study-9"],
    quote: {
      text: "This wasn't just a quick optimization, it was a full brand reset. Every piece of the puzzle aligned. Our Amazon business now looks, performs, and sells like a premium brand.",
      author: "FARBERWARE",
    },
    seo: {
      metaTitle: "From Stagnant Sales to 73% Growth – Kitchen Brand Transformation | eCom Gliders",
      metaDescription:
        "FARBERWARE Home and Kitchen case study: 73% sales growth in 90 days through listing, creative, and PPC restructuring.",
      canonical: "/case-study-1/",
      ogImage: "/images/cases/case-study-1.png",
      schema: "Article",
    },
  },
  {
    slug: "case-study-2",
    title: "Ranked in 3 Weeks, 500 Units Sold in 30 Days – High-Competition Supplement Launch",
    client: "CULTURELLE",
    clientDisplayName: "CULTURELLE",
    metric: "502",
    metricLabel: "Units in 30 days",
    secondaryMetric: "19.2%",
    secondaryMetricLabel: "Conversion rate",
    excerpt:
      "Pre-launch demand and precise PPC drove a zero-review plant-based sleep supplement to page 1 rankings fast.",
    featuredImage: "/images/cases/case-study-2.png",
    featuredImageAlt: "CULTURELLE supplement launch case study",
    href: "/case-study-2/",
    category: "Health and wellness",
    service: "Product launch + PPC",
    serviceFilter: "Product Launch",
    layout: "launch",
    market: "Amazon US",
    duration: "30 Days Post-Launch",
    servicesDelivered: ["Product Launch", "PPC", "A+ Content", "Listing Optimization"],
    heroSubheadline:
      "Ranked in three weeks and sold 502 units in the first 30 days in a high-competition supplement category.",
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "CULTURELLE was launching a plant-based sleep support supplement in a market saturated with melatonin products. The formula was clean-label and clinically supported, but the ASIN had no reviews, no brand presence, and a limited launch budget.",
      ],
    },
    keyIssues: [
      "Category dominated by established players with 5K+ reviews",
      "Low initial trust factor for a health product",
      "Tightly regulated ad copy with limited claims allowed",
      "No Brand Registry at launch, limiting creative control",
    ],
    solution: {
      heading: "Our approach",
      steps: [
        {
          title: "Pre-launch validation and audience targeting",
          description:
            "White-space research, audience segmentation, and a quiz funnel collected 1,163 leads before launch.",
        },
        {
          title: "Visual identity and soft launch",
          description:
            "Premium A+ modules and a friends-and-family micro-launch built early reviews without fake giveaways.",
        },
        {
          title: "High-intent PPC and trust layering",
          description:
            "Exact-match and auto campaigns with strict negatives, plus compliant listing psychology for conversion.",
        },
      ],
    },
    strategyStages: [
      {
        title: "Pre-launch validation and audience targeting",
        bullets: [
          "Analyzed top-seller review gaps",
          "Segmented clean-label sleep aid audiences",
          "Quiz funnel landing page for high-intent leads",
        ],
        outcome: "1,163 leads collected; 364 opted into launch notifications.",
      },
      {
        title: "Visual identity and soft launch",
        bullets: [
          "Premium A+ comparison modules",
          "Five-day friends-and-family micro-launch",
          "Request a Review API within 48–72 hours",
        ],
        outcome: "11 reviews in first 7 days; 27% early order-to-review rate.",
      },
      {
        title: "High-intent PPC campaigns",
        bullets: [
          "Exact match on bottom-of-funnel terms",
          "Auto campaigns with strict negatives",
          "Product targeting against weaker competitors",
        ],
        outcome: "CTR 1.9%; ACOS 38% at launch; 13 page-1 keywords by day 18.",
      },
      {
        title: "Listing psychology and trust layering",
        bullets: [
          "Ingredient spotlights and compliance imagery",
          "Customer-first bullet copy",
          "Post-sale engagement insert",
        ],
        outcome: "Conversion rate 19.2% within 30 days.",
      },
    ],
    results: {
      heading: "Results",
      metrics: [
        { label: "Units sold", value: "502" },
        { label: "Conversion rate", value: "19.2%" },
        { label: "Total revenue", value: "$9,850" },
        { label: "Reviews gained", value: "38" },
        { label: "Page 1 keyword rankings", value: "13" },
        { label: "ACOS", value: "38%" },
      ],
    },
    beforeAfter: [
      { label: "Units sold (30 days)", before: "0", after: "502" },
      { label: "Page 1 keywords", before: "0", after: "13" },
      { label: "Conversion rate", before: "—", after: "19.2%" },
    ],
    relatedSlugs: ["case-study-5", "case-study-7", "case-study-9"],
    quote: {
      text: "We launched in a red ocean, but still carved out our space. It wasn't hype—it was strategy. People bought into the brand before they ever saw the bottle.",
      author: "CULTURELLE",
    },
    seo: {
      metaTitle:
        "Ranked in 3 Weeks, 500 Units Sold in 30 Days – High-Competition Supplement Launch | eCom Gliders",
      metaDescription:
        "CULTURELLE supplement launch: 502 units in 30 days, 19.2% CVR, and 13 page-1 keywords without fake giveaways.",
      canonical: "/case-study-2/",
      ogImage: "/images/cases/case-study-2.png",
      schema: "Article",
    },
  },
];

// Studies 3-9 imported from companion module
import { studiesPart2 } from "./build-case-studies-enterprise-part2.mjs";

const config = {
  index: {
    hero: {
      title: "Turning goals into growth",
      subtitle:
        "Explore how we partner with Amazon brands to improve visibility, conversions, and brand presence — with measurable outcomes.",
    },
    trustHeading: "Our work speaks for itself — trusted by brands across categories",
    featuredHeading: "Featured result",
    proofHeading: "Helping great brands win bigger, since 2018",
    proofSubheading:
      "20+ in-house professionals. 95% client retention. $112M+ revenue managed across Amazon seller accounts.",
    cta: {
      heading: "Want results like these?",
      body: "Request a free Amazon audit. A strategist reviews PPC, listings, and catalog priorities and follows up within one business day.",
      primaryLabel: "Get your free audit",
      primaryHref: "/free-audit-2/",
      secondaryLabel: "Contact us",
      secondaryHref: "/contact/",
    },
    seo: {
      metaTitle: "Amazon Agency Case Studies | Client Results | eCom Gliders",
      metaDescription:
        "See how eCom Gliders helped Amazon sellers achieve measurable growth. Case studies with real metrics including 310% sales increase.",
      canonical: "/case-studies/",
      ogImage: "/images/cases/gosports.png",
      schema: "Organization",
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
  caseStudies: [...studies, ...studiesPart2],
};

const out = join(root, "content/config/case-studies.json");
writeFileSync(out, `${JSON.stringify(config, null, 2)}\n`);
console.log(`Wrote ${config.caseStudies.length} studies to ${out}`);
