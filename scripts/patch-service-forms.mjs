/**
 * Inject researched per-service hero.form configs into content/config/services/*.json
 * Run: node scripts/patch-service-forms.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "content/config/services");

const contact = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    required: true,
    placeholder: "201-555-0123",
  },
  {
    name: "brandName",
    label: "Brand / company",
    type: "text",
    required: false,
    placeholder: "Enter brand name",
  },
];

const revenue = {
  name: "monthlyRevenue",
  label: "Monthly Amazon revenue",
  type: "select",
  required: false,
  options: [
    { value: "", label: "Please select" },
    { value: "new", label: "New on Amazon, no sales yet" },
    { value: "under-10k", label: "$1 to $10,000" },
    { value: "10k-25k", label: "$10,000 to $25,000" },
    { value: "25k-50k", label: "$25,000 to $50,000" },
    { value: "50k-250k", label: "$50,000 to $250,000" },
    { value: "250k-plus", label: "$250,000+" },
  ],
};

const storeUrl = {
  name: "amazonStoreUrl",
  label: "Amazon store URL",
  type: "url",
  required: false,
  placeholder: "https://www.amazon.com/stores/...",
};

const adSpend = {
  name: "monthlyAdSpend",
  label: "Monthly ad spend",
  type: "select",
  required: false,
  options: [
    { value: "", label: "Please select" },
    { value: "under-3k", label: "Under $3,000" },
    { value: "3k-10k", label: "$3,000 to $10,000" },
    { value: "10k-25k", label: "$10,000 to $25,000" },
    { value: "25k-75k", label: "$25,000 to $75,000" },
    { value: "75k-plus", label: "$75,000+" },
  ],
};

const forms = {
  "full-service-amazon-agency": {
    heading: "Request a full-account audit",
    subheading:
      "Tell us where the account stands. A strategist follows up within one business day.",
    submitLabel: "Request a free audit",
    fields: [
      ...contact,
      storeUrl,
      revenue,
      {
        name: "priorityFocus",
        label: "Primary focus",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "ppc", label: "Advertising / PPC" },
          { value: "listings", label: "Listings and conversion" },
          { value: "catalog", label: "Catalog and operations" },
          { value: "full", label: "Full account management" },
        ],
      },
    ],
  },
  "amazon-ppc-management-agency": {
    heading: "Get a free PPC audit",
    subheading:
      "Share spend and efficiency context so we can review Sponsored Ads structure and opportunities.",
    submitLabel: "Request a free PPC audit",
    fields: [
      ...contact,
      storeUrl,
      adSpend,
      {
        name: "currentAcos",
        label: "Current ACOS range",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "under-20", label: "Under 20%" },
          { value: "20-35", label: "20% to 35%" },
          { value: "35-50", label: "35% to 50%" },
          { value: "50-plus", label: "50%+" },
          { value: "unknown", label: "Not sure yet" },
        ],
      },
    ],
  },
  "amazon-listing-optimization": {
    heading: "Request a listing review",
    subheading:
      "Share catalog size and store context so we can prioritize SEO and conversion fixes.",
    submitLabel: "Request a listing review",
    fields: [
      ...contact,
      storeUrl,
      {
        name: "asinCount",
        label: "Active ASINs to optimize",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "1-5", label: "1 to 5" },
          { value: "6-20", label: "6 to 20" },
          { value: "21-50", label: "21 to 50" },
          { value: "50-plus", label: "50+" },
        ],
      },
      {
        name: "listingPriority",
        label: "Priority need",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "keywords", label: "Keyword / SEO research" },
          { value: "copy", label: "Title and bullet copy" },
          { value: "conversion", label: "Conversion rate lift" },
          { value: "full", label: "Full listing rebuild" },
        ],
      },
    ],
  },
  "amazon-content-writing": {
    heading: "Request Amazon copy support",
    subheading:
      "Tell us what content you need so writers can scope titles, bullets, and A+ copy.",
    submitLabel: "Request content support",
    fields: [
      ...contact,
      storeUrl,
      {
        name: "contentType",
        label: "Content needed",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "title-bullets", label: "Titles and bullets" },
          { value: "aplus-copy", label: "A+ Content copy" },
          { value: "brand-story", label: "Brand story / Store copy" },
          { value: "full", label: "Full listing copy set" },
        ],
      },
      {
        name: "asinCount",
        label: "Products needing copy",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "1-3", label: "1 to 3" },
          { value: "4-10", label: "4 to 10" },
          { value: "11-25", label: "11 to 25" },
          { value: "25-plus", label: "25+" },
        ],
      },
    ],
  },
  "amazon-visual-creativity": {
    heading: "Request visual creative support",
    subheading:
      "Share what assets you need so the design team can scope imagery and A+ modules.",
    submitLabel: "Request creative support",
    fields: [
      ...contact,
      storeUrl,
      {
        name: "creativeNeed",
        label: "Creative need",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "main-images", label: "Main and secondary images" },
          { value: "aplus", label: "A+ Content design" },
          { value: "storefront", label: "Brand Store modules" },
          { value: "full", label: "Full visual package" },
        ],
      },
      {
        name: "asinCount",
        label: "Products in scope",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "1-3", label: "1 to 3" },
          { value: "4-10", label: "4 to 10" },
          { value: "11-plus", label: "11+" },
        ],
      },
    ],
  },
  "amazon-catalog-management": {
    heading: "Request a catalog health review",
    subheading:
      "Share catalog size and the issue type so we can prioritize listing health work.",
    submitLabel: "Request catalog review",
    fields: [
      ...contact,
      storeUrl,
      {
        name: "catalogSize",
        label: "Catalog size",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "under-25", label: "Under 25 ASINs" },
          { value: "25-100", label: "25 to 100 ASINs" },
          { value: "100-500", label: "100 to 500 ASINs" },
          { value: "500-plus", label: "500+ ASINs" },
        ],
      },
      {
        name: "catalogIssue",
        label: "Main catalog issue",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "suppressed", label: "Suppressed / detail page issues" },
          { value: "variations", label: "Variation structure" },
          { value: "attributes", label: "Attributes and compliance" },
          { value: "ongoing", label: "Ongoing catalog ops" },
        ],
      },
    ],
  },
  "amazon-dsp-management": {
    heading: "Request a DSP strategy review",
    subheading:
      "Share budget and Brand Registry status so we can assess DSP readiness.",
    submitLabel: "Request DSP review",
    fields: [
      ...contact,
      storeUrl,
      {
        name: "dspBudget",
        label: "Planned monthly DSP budget",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "under-10k", label: "Under $10,000" },
          { value: "10k-30k", label: "$10,000 to $30,000" },
          { value: "30k-75k", label: "$30,000 to $75,000" },
          { value: "75k-plus", label: "$75,000+" },
          { value: "exploring", label: "Still exploring" },
        ],
      },
      {
        name: "brandRegistry",
        label: "Brand Registry status",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "enrolled", label: "Enrolled" },
          { value: "in-progress", label: "In progress" },
          { value: "not-yet", label: "Not yet" },
        ],
      },
    ],
  },
  "amazon-reporting-analytics": {
    heading: "Request a reporting setup review",
    subheading:
      "Tell us how you report today so we can propose clearer Amazon decision dashboards.",
    submitLabel: "Request reporting review",
    fields: [
      ...contact,
      storeUrl,
      {
        name: "reportFrequency",
        label: "Reporting frequency needed",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Biweekly" },
          { value: "monthly", label: "Monthly" },
          { value: "custom", label: "Custom cadence" },
        ],
      },
      {
        name: "reportFocus",
        label: "Primary metrics focus",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "ads", label: "Advertising efficiency" },
          { value: "sales", label: "Sales and growth" },
          { value: "catalog", label: "Catalog health" },
          { value: "executive", label: "Executive summary" },
        ],
      },
    ],
  },
  "amazon-video-creative": {
    heading: "Request Amazon video creative",
    subheading:
      "Share video use-case and product count so we can scope listing and ad creative.",
    submitLabel: "Request video support",
    fields: [
      ...contact,
      storeUrl,
      {
        name: "videoNeed",
        label: "Video needed for",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "listing", label: "Listing / A+ video" },
          { value: "ads", label: "Sponsored Brands / video ads" },
          { value: "lifestyle", label: "Lifestyle / brand film" },
          { value: "full", label: "Multiple video types" },
        ],
      },
      {
        name: "asinCount",
        label: "Products in scope",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "1", label: "1 product" },
          { value: "2-5", label: "2 to 5 products" },
          { value: "6-plus", label: "6+ products" },
        ],
      },
    ],
  },
  "amazon-trademark-brand-registry": {
    heading: "Request Brand Registry guidance",
    subheading:
      "Share trademark status so we can outline the Brand Registry pathway for your brand.",
    submitLabel: "Request Brand Registry help",
    fields: [
      ...contact,
      {
        name: "trademarkStatus",
        label: "Trademark status",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "registered", label: "Registered trademark" },
          { value: "pending", label: "Application pending" },
          { value: "not-started", label: "Not started" },
          { value: "unsure", label: "Not sure" },
        ],
      },
      {
        name: "registryGoal",
        label: "Primary goal",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "enroll", label: "Enroll in Brand Registry" },
          { value: "aplus", label: "Unlock A+ / Brand Store" },
          { value: "protection", label: "Brand protection tools" },
          { value: "full", label: "Full pathway support" },
        ],
      },
      storeUrl,
    ],
  },
  "amazon-company-registration": {
    heading: "Request company registration support",
    subheading:
      "Share your seller situation so we can guide US entity setup for Amazon readiness.",
    submitLabel: "Request registration help",
    fields: [
      ...contact,
      {
        name: "sellerLocation",
        label: "Current seller location",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "us", label: "United States" },
          { value: "non-us", label: "Outside the United States" },
          { value: "planning", label: "Planning to sell on Amazon" },
        ],
      },
      {
        name: "entityGoal",
        label: "Entity goal",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "llc", label: "Form a US LLC" },
          { value: "corporation", label: "Form a corporation" },
          { value: "unsure", label: "Need guidance on entity type" },
        ],
      },
      {
        name: "amazonIntent",
        label: "Amazon intent",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "new-account", label: "New Seller Central account" },
          { value: "brand-registry", label: "Brand Registry readiness" },
          { value: "both", label: "Account + Brand Registry path" },
        ],
      },
    ],
  },
  "amazon-product-sourcing": {
    heading: "Request product sourcing support",
    subheading:
      "Share category and launch market so we can scope supplier research correctly.",
    submitLabel: "Request sourcing support",
    fields: [
      ...contact,
      {
        name: "productCategory",
        label: "Product category",
        type: "text",
        required: false,
        placeholder: "e.g. kitchen, outdoors, beauty",
      },
      {
        name: "launchMarket",
        label: "Target launch market",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "us", label: "United States" },
          { value: "uk-eu", label: "UK / EU" },
          { value: "multi", label: "Multiple marketplaces" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
      {
        name: "sourcingStage",
        label: "Sourcing stage",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "idea", label: "Idea / research stage" },
          { value: "samples", label: "Evaluating samples" },
          { value: "reorder", label: "Need new suppliers" },
        ],
      },
    ],
  },
  "shopify-website-development": {
    heading: "Request a Shopify project consult",
    subheading:
      "Share store status and goals so we can scope a conversion-focused Shopify build.",
    submitLabel: "Request Shopify consult",
    fields: [
      ...contact,
      {
        name: "shopifyStatus",
        label: "Shopify status",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "none", label: "No store yet" },
          { value: "existing", label: "Existing store needs rebuild" },
          { value: "migrate", label: "Migrating from another platform" },
        ],
      },
      {
        name: "shopifyGoal",
        label: "Primary goal",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "brand-site", label: "Brand website" },
          { value: "dtc", label: "Direct-to-consumer sales" },
          { value: "amazon-support", label: "Support Amazon brand presence" },
          { value: "full", label: "Full storefront build" },
        ],
      },
      {
        name: "websiteUrl",
        label: "Current website (if any)",
        type: "url",
        required: false,
        placeholder: "https://",
      },
    ],
  },
  "tiktok-shop-ads": {
    heading: "Request a TikTok Shop ads review",
    subheading:
      "Share Shop status and budget so we can assess a complementary ads plan beside Amazon.",
    submitLabel: "Request TikTok ads review",
    fields: [
      ...contact,
      storeUrl,
      {
        name: "tiktokShopStatus",
        label: "TikTok Shop status",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "live", label: "Shop is live" },
          { value: "setup", label: "Setting up Shop" },
          { value: "exploring", label: "Exploring TikTok Shop" },
        ],
      },
      adSpend,
    ],
  },
  "email-retention-marketing": {
    heading: "Request an email retention review",
    subheading:
      "Share platform and list context so we can scope lifecycle flows for your brand.",
    submitLabel: "Request email review",
    fields: [
      ...contact,
      {
        name: "emailPlatform",
        label: "Email platform",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "klaviyo", label: "Klaviyo" },
          { value: "mailchimp", label: "Mailchimp" },
          { value: "other", label: "Other / not sure" },
          { value: "none", label: "No platform yet" },
        ],
      },
      {
        name: "listStatus",
        label: "List / audience status",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "none", label: "No list yet" },
          { value: "under-5k", label: "Under 5,000 contacts" },
          { value: "5k-25k", label: "5,000 to 25,000" },
          { value: "25k-plus", label: "25,000+" },
        ],
      },
      {
        name: "retentionGoal",
        label: "Primary retention goal",
        type: "select",
        required: false,
        options: [
          { value: "", label: "Please select" },
          { value: "flows", label: "Welcome / post-purchase flows" },
          { value: "repeat", label: "Repeat purchase" },
          { value: "owned", label: "Owned-channel growth" },
          { value: "full", label: "Full retention program" },
        ],
      },
    ],
  },
};

const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
let updated = 0;

for (const file of files) {
  const slug = file.replace(/\.json$/, "");
  const form = forms[slug];
  if (!form) {
    console.warn("No form config for", slug);
    continue;
  }
  const path = join(dir, file);
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.hero = { ...data.hero, form };
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  updated += 1;
  console.log("Updated", slug, `(${form.fields.length} fields)`);
}

console.log(`Done. Updated ${updated}/${files.length} service configs.`);
