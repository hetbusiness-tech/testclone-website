import { GENERATED_SEO_PAGES } from "./seo-pages-generated";
import { GENERATED_CITIES, GENERATED_CITY_SEO_PAGES } from "./city-pages-generated";

export type ServiceGroup =
  | "Website Development"
  | "E-commerce SEO"
  | "Paid Ads"
  | "Social & Creative"
  | "Brand Positioning & CRO"
  | "Industry";

/** Maps a page's service group to the matching label used in the contact
 * page's service-selector chips, so the hero form can pre-select it. */
export const SERVICE_GROUP_TO_CONTACT_LABEL: Record<ServiceGroup, string> = {
  "Website Development": "Shopify Development & Redesign",
  "Paid Ads": "Paid Ads (Meta & Google)",
  "E-commerce SEO": "E-commerce SEO Services",
  "Social & Creative": "Social Media & UGC Creative",
  "Brand Positioning & CRO": "Brand Positioning & CRO",
  Industry: "Full-Stack E-commerce Scale",
};

export interface SeoPage {
  /** URL slug, e.g. "shopify-development-agency" -> /shopify-development-agency */
  slug: string;
  keyword: string;
  serviceGroup: ServiceGroup;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;

  /** Hero image, reused from real site assets (services page imagery). */
  heroImage: string;
  heroImageAlt: string;

  /** 3-4 short trust stats shown under the hero copy. */
  stats: { label: string; value: string }[];

  /** "What this covers" grid cards. */
  coverage: { title: string; description: string }[];

  /** Build/process standards, shown as a checklist. */
  standards: string[];

  /** Slugs into the real case-studies data, used as proof. */
  proofSlugs: string[];

  /** 4-step process, shown as a grid. */
  process: { step: string; title: string; desc: string }[];

  /** "What to check before hiring" checklist. */
  hiringChecklist: string[];

  /** Short closing paragraph — who this is for. */
  closingParagraph: string;

  faqs: { question: string; answer: string }[];
}

const STANDARD_PROCESS = [
  { step: "01", title: "Audit", desc: "Funnel, tech stack & speed teardown." },
  { step: "02", title: "Design", desc: "High-fidelity, conversion-first store UI." },
  { step: "03", title: "Build", desc: "Clean Shopify development & integrations." },
  { step: "04", title: "Launch", desc: "Rigorous QA, analytics & monitored go-live." },
];

/** Hand-written national SEO pages — fully bespoke, written individually.
 * If a slug also exists in GENERATED_SEO_PAGES, the hand-written version
 * here takes precedence (see SEO_PAGES below). */
const HAND_WRITTEN_SEO_PAGES: SeoPage[] = [
  {
    slug: "shopify-development-agency",
    keyword: "shopify development agency",
    serviceGroup: "Website Development",
    title: "Shopify Development Agency",
    metaDescription:
      "Technostripe is a Shopify development agency building fast, conversion-focused stores for D2C brands — sub-second load times, custom Liquid builds, and CRO built in from day one.",
    h1: "Shopify Development Agency for High-Converting D2C Stores",
    intro:
      "We design and build Shopify storefronts end-to-end — front-end UX, back-end Liquid architecture, app integrations, and the CRO layer that turns traffic into revenue.",
    heroImage: "/services/e-commerce.png",
    heroImageAlt: "Shopify storefront shown across laptop and mobile, built by Technostripe",
    stats: [
      { label: "Lighthouse score", value: "95+" },
      { label: "Load time target", value: "< 1s" },
      { label: "Build process stages", value: "4" },
      { label: "Platform", value: "Shopify & Plus" },
    ],
    coverage: [
      {
        title: "Front-end build",
        description:
          "Turning a design into a working, responsive Shopify theme using Liquid, JSON templates, and Shopify's section/block architecture — without template bloat.",
      },
      {
        title: "Performance engineering",
        description:
          "Image delivery, script loading order, app audits, and Core Web Vitals tuning. Most speed problems come from unused apps, not the theme.",
      },
      {
        title: "Custom functionality",
        description:
          "Product bundles, subscription and recharge flows, gated wholesale sections, custom filtering — anything Shopify doesn't ship out of the box.",
      },
      {
        title: "Headless / hybrid builds",
        description:
          "For brands with complex content needs, decoupling the front end from Shopify's checkout while keeping Shopify as the commerce engine.",
      },
      {
        title: "Migration",
        description:
          "Moving an existing store from WooCommerce, Magento, BigCommerce, or Wix onto Shopify without losing SEO equity or historical order data.",
      },
      {
        title: "CRO built in",
        description:
          "Conversion-first UX decisions made during the build itself, not bolted on afterward as a separate redesign once traffic stops converting.",
      },
    ],
    standards: [
      "Sub-second load times and a 95+ Lighthouse performance score as a baseline",
      "Mobile-first CRO UX — designed mobile-first and adapted up, not the other way around",
      "Clean Liquid architecture without page-builder app bloat",
      "Custom bundle and subscription setups matched to how the brand actually sells",
    ],
    proofSlugs: ["mor-matcha", "linen-way"],
    process: STANDARD_PROCESS,
    hiringChecklist: [
      "Can they show a live store they built, not just a portfolio screenshot?",
      "Do they talk about Core Web Vitals and Lighthouse scores specifically, or just \"we'll make it fast\"?",
      "Is CRO part of the build, or a separate line item you buy later?",
      "Who owns the store after launch — theme, code, and admin access?",
      "What's the plan for redirects and structured data if this is a migration?",
    ],
    closingParagraph:
      "This kind of build makes sense for brands that already have product-market fit and are past the \"just get something live\" stage — where the store itself has become the bottleneck to growth. It's a different scope of work from a quick theme install, and priced accordingly, but for a brand doing meaningful revenue through Shopify, the store is usually the highest-leverage thing to get right.",
    faqs: [
      {
        question: "How long does a custom Shopify build take?",
        answer:
          "Most full builds run 6-10 weeks depending on scope — longer for headless builds or complex migrations, shorter for a focused redesign of an existing store.",
      },
      {
        question: "Do you build on Shopify or Shopify Plus?",
        answer:
          "Both. We scope the build around your order volume, checkout customization needs, and whether you need Shopify Plus features like scripts or multi-currency.",
      },
      {
        question: "Will you work with our existing theme, or does it have to be a rebuild?",
        answer:
          "It depends on the audit. Some stores just need targeted performance and CRO fixes; others have accumulated enough app bloat and template debt that a rebuild is the faster, cheaper path long-term.",
      },
      {
        question: "How much does a custom Shopify build cost?",
        answer:
          "It depends entirely on scope — a focused CRO/performance pass costs far less than a full headless rebuild. We give a fixed quote after the audit, not before, so you're not paying for guesswork.",
      },
      {
        question: "Do you offer headless Shopify development?",
        answer:
          "Yes, for brands with complex content needs or multi-storefront requirements. We scope it carefully though — headless adds real engineering overhead, and it isn't the right call for every store.",
      },
      {
        question: "Will migrating to Shopify hurt our existing SEO rankings?",
        answer:
          "Not if it's planned properly. Redirects, structured data, and indexed URL structure all need a migration plan before the move starts, not after rankings drop. We map that out as part of the audit.",
      },
      {
        question: "Who owns the store and code after the build is finished?",
        answer:
          "You do — theme, code, and admin access, fully in your hands. We build Shopify-native, not on a proprietary stack that makes it hard to leave.",
      },
      {
        question: "Do you provide support after launch?",
        answer:
          "Yes. Launch includes a monitored go-live and QA pass, and we offer ongoing support and maintenance retainers for brands that want a dedicated team on call rather than hiring per-issue.",
      },
      {
        question: "What's the difference between hiring an agency and a freelance Shopify developer?",
        answer:
          "A freelancer is usually one person covering design, development, and QA alone. An agency build means dedicated people for each discipline working in parallel, plus continuity if someone's unavailable mid-project.",
      },
      {
        question: "Do you only work with fashion and beauty brands?",
        answer:
          "No — we work across D2C categories including skincare, supplements, jewellery, home decor, and food & beverage. The build process is the same regardless of category; what changes is the merchandising and content strategy.",
      },
    ],
  },
  {
    slug: "shopify-web-design-company",
    keyword: "shopify web design company",
    serviceGroup: "Website Development",
    title: "Shopify Web Design Company",
    metaDescription:
      "Technostripe is a Shopify web design company for D2C brands that need more than a template — conversion-first layouts, brand-true visual design, and mobile-first UX.",
    h1: "Shopify Web Design Company for Brands That Are Past the Template Stage",
    intro:
      "We design Shopify storefronts around how your specific customers shop — visual identity, layout hierarchy, and UX decisions built for your product, not stretched from a generic theme.",
    heroImage: "/services/e-commerce.png",
    heroImageAlt: "Shopify storefront design shown across laptop and mobile, designed by Technostripe",
    stats: [
      { label: "Design stages", value: "High-fidelity" },
      { label: "Approach", value: "Mobile-first" },
      { label: "Build process stages", value: "4" },
      { label: "Platform", value: "Shopify & Plus" },
    ],
    coverage: [
      {
        title: "Visual identity translation",
        description:
          "Turning brand identity — typography, color, photography style — into a storefront that actually looks like the brand, not a reskinned theme.",
      },
      {
        title: "Information architecture",
        description:
          "Navigation, collection structure, and filtering designed around how customers actually browse the catalog, not a default theme's assumptions.",
      },
      {
        title: "Conversion-first layout",
        description:
          "Product pages, cart, and checkout flow designed with conversion data in mind — not just aesthetics, though it's both.",
      },
      {
        title: "Design systems",
        description:
          "Reusable component libraries (buttons, cards, sections) so new pages and campaigns stay on-brand without a designer needed for every update.",
      },
      {
        title: "Mobile-first UX",
        description:
          "Layouts designed for mobile first and scaled up, since that's where most D2C traffic actually converts.",
      },
      {
        title: "Accessibility & performance",
        description:
          "Designs that hold up under real Lighthouse and accessibility audits, not just look good in a static mockup.",
      },
    ],
    standards: [
      "High-fidelity design files before a single line of Liquid is written",
      "Mobile-first layouts, tested at real breakpoints, not just desktop-then-shrink",
      "A reusable design system, not one-off page layouts",
      "Design decisions backed by the funnel audit, not just visual preference",
    ],
    proofSlugs: ["matilda-jewellery", "the-skin-diary"],
    process: STANDARD_PROCESS,
    hiringChecklist: [
      "Do they show design work across different brand aesthetics, or does everything look the same?",
      "Is there a design system, or just individually designed pages that will drift apart over time?",
      "Do they test designs at real mobile breakpoints before handing off to development?",
      "Who owns the design files after the project — can you take them to another developer?",
      "Is CRO data part of the design process, or is it purely aesthetic?",
    ],
    closingParagraph:
      "This is the right fit for brands whose current store looks like a theme with a logo on it — functional, but not actually representing the brand or converting as well as it should. Design and development happen together here, not as a hand-off between two disconnected teams, so what gets designed is what actually ships.",
    faqs: [
      {
        question: "Do you design in Figma before building in Shopify?",
        answer:
          "Yes — high-fidelity design files first, reviewed and approved, before any Liquid development starts. You see and sign off on the design before it's built.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Yes, that's the default. We design within existing brand identity unless you're specifically looking for a brand refresh alongside the store redesign.",
      },
      {
        question: "Do you provide multiple design concepts to choose from?",
        answer:
          "Typically one strong direction based on the audit and brand brief, refined through review rounds, rather than multiple competing concepts — it keeps the process faster and more focused.",
      },
      {
        question: "How many rounds of design revisions are included?",
        answer:
          "Scoped per project during the proposal stage, but there's always room for structured feedback rounds before anything moves to development.",
      },
      {
        question: "Will the design work well on mobile, not just desktop?",
        answer:
          "Every layout is designed mobile-first and tested at real breakpoints — not designed for desktop and shrunk down afterward, which is where most mobile UX problems come from.",
      },
      {
        question: "Do you design custom icons and illustrations, or use stock assets?",
        answer:
          "Depends on budget and brand needs — some brands want fully custom illustration work, others are well served by a well-chosen, consistent icon system. We scope this during the brief.",
      },
      {
        question: "Can you redesign just specific pages instead of the whole store?",
        answer:
          "Yes. A full redesign isn't always necessary — sometimes the product page or checkout is the real bottleneck, and a focused redesign there is faster and cheaper.",
      },
      {
        question: "Do you handle photography and content, or just layout design?",
        answer:
          "Primarily layout, UX, and visual system design. We can coordinate with a photographer or content team, but content production itself usually sits with our Social & Creative service.",
      },
    ],
  },
  {
    slug: "shopify-plus-agency",
    keyword: "shopify plus agency",
    serviceGroup: "Website Development",
    title: "Shopify Plus Agency",
    metaDescription:
      "Technostripe is a Shopify Plus agency for high-volume D2C brands — checkout scripts, B2B storefronts, multi-currency, and enterprise-grade custom development.",
    h1: "Shopify Plus Agency for High-Volume D2C Brands",
    intro:
      "We build and scale Shopify Plus storefronts — checkout customization, B2B wholesale portals, multi-currency setups, and the engineering that high-order-volume brands actually need.",
    heroImage: "/services/e-commerce.png",
    heroImageAlt: "Shopify Plus storefront shown across laptop and mobile, built by Technostripe",
    stats: [
      { label: "Lighthouse score", value: "95+" },
      { label: "Checkout", value: "Script-ready" },
      { label: "Build process stages", value: "4" },
      { label: "Platform", value: "Shopify Plus" },
    ],
    coverage: [
      {
        title: "Checkout customization",
        description:
          "Shopify Functions and checkout extensibility for custom discount logic, shipping rules, and payment flows Plus merchants need at scale.",
      },
      {
        title: "B2B & wholesale portals",
        description:
          "Gated wholesale catalogs, custom pricing tiers, and net-terms ordering built on Shopify's native B2B tooling.",
      },
      {
        title: "Multi-currency & multi-market",
        description:
          "Localized pricing, currency conversion, and market-specific storefronts for brands selling across multiple countries.",
      },
      {
        title: "High-volume performance",
        description:
          "Architecture and app audits built for order volumes that break a standard Shopify setup — flash sales, high-traffic launches, big catalogs.",
      },
      {
        title: "Custom app integrations",
        description:
          "ERP, WMS, and CRM integrations for brands whose operations have outgrown what off-the-shelf apps can handle.",
      },
      {
        title: "Dedicated launch support",
        description:
          "Monitored go-lives for high-stakes launches, not a standard QA pass — the kind of support Plus-tier order volumes actually need.",
      },
    ],
    standards: [
      "Shopify Functions and checkout extensibility used correctly, not bolted on",
      "Architecture stress-tested for real high-volume traffic, not just standard load",
      "Native Shopify B2B tooling used over fragile third-party workarounds where possible",
      "A migration and rollback plan for every Plus-tier launch, not just a go-live date",
    ],
    proofSlugs: ["mana-yerba-mate", "babo-botanicals"],
    process: STANDARD_PROCESS,
    hiringChecklist: [
      "Have they actually shipped Shopify Plus builds, or just standard Shopify with a bigger price tag?",
      "Do they understand Shopify Functions and checkout extensibility specifically, or just generic apps?",
      "Can they support B2B/wholesale requirements natively, or would it need third-party workarounds?",
      "What's their plan for a high-traffic launch — load testing, rollback plan, monitored go-live?",
      "Do they have experience with multi-currency or multi-market storefronts if that's part of your roadmap?",
    ],
    closingParagraph:
      "This is built for brands that have already outgrown standard Shopify — real order volume, B2B alongside D2C, multiple markets, or checkout requirements standard Shopify apps can't handle cleanly. It's a different scope and a different level of technical depth than a standard store build, and it's priced and staffed accordingly.",
    faqs: [
      {
        question: "What's the actual difference between Shopify and Shopify Plus development?",
        answer:
          "Plus unlocks checkout customization via Shopify Functions, native B2B tooling, higher API limits, and multi-currency/multi-market support — none of which exist on standard Shopify. The development work is genuinely different, not just \"the same thing at a higher tier.\"",
      },
      {
        question: "Do we need Shopify Plus, or is standard Shopify enough?",
        answer:
          "If you need checkout customization, B2B wholesale, multi-currency, or you're hitting real performance limits at high order volume, Plus is worth it. If not, standard Shopify with a strong build is usually the better spend.",
      },
      {
        question: "Can you migrate us from standard Shopify to Shopify Plus?",
        answer:
          "Yes — this is a common migration path as brands scale, and we plan it around minimal downtime and no lost SEO equity.",
      },
      {
        question: "Do you build custom Shopify Functions for checkout logic?",
        answer:
          "Yes, this is core to Plus development — custom discount logic, shipping rules, and payment method conditions that aren't possible on standard Shopify checkout.",
      },
      {
        question: "Can you set up a B2B storefront alongside our existing D2C store?",
        answer:
          "Yes, using Shopify's native B2B tooling — gated catalogs, custom pricing tiers, and net-terms ordering running alongside your consumer storefront.",
      },
      {
        question: "How do you handle a high-traffic product launch without the site going down?",
        answer:
          "Load testing beforehand, app and script audits to remove anything fragile under load, and a monitored go-live with a rollback plan — not just hoping the standard setup holds.",
      },
      {
        question: "Do you support multi-currency and multi-market stores?",
        answer:
          "Yes — localized pricing, currency conversion, and market-specific storefront configuration for brands selling across multiple countries from one Shopify Plus instance.",
      },
    ],
  },
];

const handWrittenSlugs = new Set(HAND_WRITTEN_SEO_PAGES.map((p) => p.slug));

/** All national SEO pages: hand-written pages plus generated ones (skipping
 * any slug that already has a hand-written version). */
export const SEO_PAGES: SeoPage[] = [
  ...HAND_WRITTEN_SEO_PAGES,
  ...GENERATED_SEO_PAGES.filter((p) => !handWrittenSlugs.has(p.slug)),
];

export interface CityInfo {
  slug: string;
  name: string;
}

/** Hand-written city entries — takes precedence over generated ones with
 * the same slug. */
const HAND_WRITTEN_CITIES: CityInfo[] = [
  { slug: "london", name: "London" },
  { slug: "dubai", name: "Dubai" },
  { slug: "mumbai", name: "Mumbai" },
];

export interface CityOverride {
  citySlug: string;
  /** References SeoPage.slug — the national page this city variant is based on. */
  baseSlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  closingParagraph: string;
}

/** City-page copy. Structured sections (coverage, standards, process, FAQs)
 * are inherited from the matching national page — only the framing copy
 * (H1, intro, closing) is genuinely city-specific, per the SEO plan's rule
 * against low-effort "swap the city name" pages. */
const HAND_WRITTEN_CITY_SEO_PAGES: CityOverride[] = [
  {
    citySlug: "london",
    baseSlug: "shopify-development-agency",
    title: "Shopify Development Agency in London",
    metaDescription:
      "Technostripe works with London D2C brands on Shopify development — fast, conversion-focused builds for brands scaling past their first store.",
    h1: "Shopify Development Agency in London for High-Converting D2C Stores",
    intro:
      "We work with London-based D2C brands on Shopify builds and redesigns — the UK has one of the most mature D2C markets in Europe, and the bar for store speed and UX is correspondingly high.",
    closingParagraph:
      "London's D2C scene spans everything from beauty and skincare to home goods and fashion — categories where store experience is a genuine differentiator, not an afterthought. If your store is the bottleneck to growth, this is the place to start.",
  },
  {
    citySlug: "dubai",
    baseSlug: "shopify-development-agency",
    title: "Shopify Development Agency in Dubai",
    metaDescription:
      "Technostripe works with Dubai and UAE D2C brands on Shopify development — fast, conversion-focused builds for brands scaling across the Gulf region.",
    h1: "Shopify Development Agency in Dubai for High-Converting D2C Stores",
    intro:
      "We work with Dubai and wider UAE D2C brands on Shopify builds — a fast-growing e-commerce market where mobile-first UX and multi-currency support are usually non-negotiable from day one.",
    closingParagraph:
      "The UAE's D2C market skews mobile-heavy and multi-market, often selling across the GCC from a single storefront. If that's the shape of your business, it changes what a \"good\" build actually needs to handle.",
  },
  {
    citySlug: "mumbai",
    baseSlug: "shopify-development-agency",
    title: "Shopify Development Agency in Mumbai",
    metaDescription:
      "Technostripe works with Mumbai D2C brands on Shopify development — fast, conversion-focused builds for India's fastest-growing e-commerce market.",
    h1: "Shopify Development Agency in Mumbai for High-Converting D2C Stores",
    intro:
      "We work with Mumbai-based D2C brands on Shopify builds — India's D2C market is growing fast, and mobile load times matter even more here given the range of network conditions real customers are browsing on.",
    closingParagraph:
      "Mumbai's D2C brands are competing in one of the most price- and speed-sensitive markets globally. A store that's slow on a mid-range Android phone loses customers before they even see the product.",
  },
];

const handWrittenCitySlugs = new Set(HAND_WRITTEN_CITIES.map((c) => c.slug));
export const CITIES: CityInfo[] = [
  ...HAND_WRITTEN_CITIES,
  ...GENERATED_CITIES.filter((c) => !handWrittenCitySlugs.has(c.slug)),
];

const handWrittenCityPageKeys = new Set(
  HAND_WRITTEN_CITY_SEO_PAGES.map((c) => `${c.citySlug}/${c.baseSlug}`)
);
export const CITY_SEO_PAGES: CityOverride[] = [
  ...HAND_WRITTEN_CITY_SEO_PAGES,
  ...GENERATED_CITY_SEO_PAGES.filter(
    (c) => !handWrittenCityPageKeys.has(`${c.citySlug}/${c.baseSlug}`)
  ),
];

export function getAllSeoSlugs(): string[] {
  return SEO_PAGES.map((page) => page.slug);
}

export function getSeoPageBySlug(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}

/** Other national pages in the same service group — for "More [Service]
 * Services" internal-linking blocks. */
export function getRelatedNationalPages(page: SeoPage): SeoPage[] {
  return SEO_PAGES.filter(
    (p) => p.serviceGroup === page.serviceGroup && p.slug !== page.slug
  );
}

/** City variants that exist for a given national keyword slug — for
 * "Also serving these cities" internal-linking blocks. */
export function getCityVariantsForKeyword(
  baseSlug: string
): { citySlug: string; cityName: string }[] {
  return CITY_SEO_PAGES.filter((c) => c.baseSlug === baseSlug).map((c) => ({
    citySlug: c.citySlug,
    cityName: CITIES.find((city) => city.slug === c.citySlug)?.name ?? c.citySlug,
  }));
}

export function getAllCityPageParams(): { slug: string; service: string }[] {
  return CITY_SEO_PAGES.map((c) => ({ slug: c.citySlug, service: c.baseSlug }));
}

/** Merges a city override with its matching national page's structured
 * sections (coverage, standards, process, FAQs, stats, hero image). */
export function getCityPage(
  citySlug: string,
  baseSlug: string
): (SeoPage & { cityName: string }) | undefined {
  const base = getSeoPageBySlug(baseSlug);
  const override = CITY_SEO_PAGES.find(
    (c) => c.citySlug === citySlug && c.baseSlug === baseSlug
  );
  const city = CITIES.find((c) => c.slug === citySlug);
  if (!base || !override || !city) return undefined;

  return {
    ...base,
    title: override.title,
    metaDescription: override.metaDescription,
    h1: override.h1,
    intro: override.intro,
    closingParagraph: override.closingParagraph,
    cityName: city.name,
  };
}
