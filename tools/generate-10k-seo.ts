import fs from "fs";
import path from "path";
import type { CityInfo, CityOverride, SeoPage } from "../lib/seo-pages";
import { GENERATED_SEO_PAGES } from "../lib/seo-pages-generated";
import { GENERATED_CITIES } from "../lib/city-pages-generated";

const SITE_URL = "https://technostripe.com";

export function transformServiceSlug(oldSlug: string): string {
  const customMap: Record<string, string> = {
    "ugc-ad-creative-agency": "d2c-ugc-ad-creative-agency",
    "ecommerce-seo-services": "d2c-ecommerce-seo-services",
    "ecommerce-cro-audit": "ecommerce-conversion-rate-audit",
    "shopify-migration-services": "shopify-store-migration-services",
    "hire-shopify-cro-expert": "hire-shopify-conversion-expert",
    "shopify-redesign-agency": "shopify-store-redesign-agency",
    "product-video-ads-agency": "ecommerce-product-video-ads-agency",
    "technical-shopify-seo-services": "shopify-technical-seo-services",
    "ecommerce-content-seo-services": "d2c-ecommerce-content-seo-services",
    "ecommerce-ab-testing-agency": "d2c-ecommerce-ab-testing-agency",
    "ecommerce-web-design-agency": "d2c-ecommerce-web-design-agency",
    "hire-ecommerce-seo-consultant": "hire-d2c-ecommerce-seo-consultant",
    "technical-ecommerce-seo-services": "d2c-technical-ecommerce-seo-services",
    "shopify-aov-optimization-services": "shopify-average-order-value-optimization",
    "ecommerce-product-page-seo-services": "d2c-product-page-seo-services",
    "shopify-subscription-setup-services": "shopify-recurring-subscription-setup",
    "tiktok-content-agency-for-d2c-brands": "d2c-tiktok-content-creation-agency",
    "tiktok-ads-management-for-d2c-brands": "d2c-tiktok-ads-management-agency",
    "ecommerce-category-page-seo-services": "d2c-category-page-seo-services",
    "ecommerce-roas-optimization-services": "d2c-roas-optimization-services",
    "shopify-theme-customization-services": "custom-shopify-theme-customization",
    "magento-to-shopify-migration-services": "magento-to-shopify-store-migration",
    "ecommerce-social-media-management-services": "d2c-social-media-management-services",
    "shopify-product-page-optimization-services": "shopify-pdp-conversion-optimization",
    "google-performance-max-agency-for-ecommerce": "ecommerce-google-pmax-ads-agency",
    "shopify-conversion-rate-optimization-services": "shopify-store-cro-optimization-services",
  };
  if (customMap[oldSlug]) return customMap[oldSlug];

  if (oldSlug.endsWith("-agency")) return oldSlug.replace(/-agency$/, "-growth-agency");
  if (oldSlug.endsWith("-services")) return oldSlug.replace(/-services$/, "-solutions");
  if (oldSlug.endsWith("-company")) return oldSlug.replace(/-company$/, "-studio");
  if (oldSlug.endsWith("-expert")) return oldSlug.replace(/-expert$/, "-specialist");
  if (oldSlug.endsWith("-consultant")) return oldSlug.replace(/-consultant$/, "-advisor");
  if (oldSlug.endsWith("-audit")) return oldSlug.replace(/-audit$/, "-teardown-audit");
  if (oldSlug.endsWith("-freelancer")) return oldSlug.replace(/-freelancer$/, "-independent-specialist");
  if (oldSlug.endsWith("-developers")) return oldSlug.replace(/-developers$/, "-engineers");
  if (oldSlug.endsWith("-for-hire")) return oldSlug.replace(/-for-hire$/, "-on-demand");
  if (oldSlug.endsWith("-d2c-brands")) return oldSlug.replace(/-d2c-brands$/, "-d2c-ecommerce-brands");
  if (oldSlug.endsWith("-brands")) return oldSlug.replace(/-brands$/, "-d2c-brands");
  if (oldSlug.endsWith("-stores")) return oldSlug.replace(/-stores$/, "-storefronts");
  if (oldSlug.endsWith("-ecommerce")) return oldSlug.replace(/-ecommerce$/, "-d2c-ecommerce");
  if (oldSlug.endsWith("-shopify")) return oldSlug.replace(/-shopify$/, "-shopify-stores");
  if (oldSlug.endsWith("-development")) return oldSlug.replace(/-development$/, "-engineering");
  if (oldSlug.endsWith("-management")) return oldSlug.replace(/-management$/, "-growth-management");
  if (oldSlug.endsWith("-cro")) return oldSlug.replace(/-cro$/, "-conversion-optimization");
  return `d2c-${oldSlug}`;
}

function deterministicHash(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function pick<T>(arr: T[], seed: string, offset = 0): T {
  const idx = (deterministicHash(`${seed}:${offset}`) % arr.length + arr.length) % arr.length;
  return arr[idx];
}

function buildCityIntro(baseKeyword: string, cityName: string, serviceGroup: string, seed: string): string {
  const intros = [
    `Technostripe partners with ambitious D2C and retail brands in ${cityName} to deliver high-impact ${baseKeyword}. In a competitive market like ${cityName}, rising acquisition costs mean your store can no longer afford slow mobile load times or leaky conversion funnels — we engineer sub-second, conversion-first systems that turn local and international traffic into profitable revenue.`,
    `Searching for specialized ${baseKeyword} in ${cityName}? Our senior engineering and growth team helps ${cityName} merchants move past generic templates and fragmented agency retainers. By combining ${serviceGroup.toLowerCase()} precision with deep Shopify architecture, we build resilient growth engines designed for scale.`,
    `For e-commerce founders and marketing leaders in ${cityName}, scaling profitably requires ${baseKeyword} grounded in real funnel data rather than guesswork. Technostripe brings an in-house team of Shopify engineers, CRO strategists, and acquisition specialists dedicated to helping ${cityName} brands outperform their category.`,
    `Modern D2C brands in ${cityName} compete on both brand experience and technical execution. Our ${baseKeyword} solutions in ${cityName} are architected from day one around mobile-first UX, Core Web Vitals performance, and high-margin customer acquisition so every click works harder for your bottom line.`,
  ];
  return pick(intros, seed, 3);
}

function buildCityClosing(baseKeyword: string, cityName: string, seed: string): string {
  const closings = [
    `If your ${cityName} brand has outgrown entry-level themes or generalist agencies, our ${baseKeyword} in ${cityName} gives you a dedicated, senior execution partner. Book a strategy audit to get a custom technical and conversion teardown built specifically around your store.`,
    `Stop losing high-intent shoppers in ${cityName} to preventable UX friction and technical debt. Partner with Technostripe for ${baseKeyword} in ${cityName} and compound your store's revenue with clean code, data-backed CRO, and transparent reporting.`,
    `Whether your ${cityName} business sells locally or ships globally, the right foundation for ${baseKeyword} in ${cityName} is the highest-leverage investment you can make this quarter. Reach out to our team for a tailored roadmap and fixed-scope execution plan.`,
  ];
  return pick(closings, seed, 4);
}

async function run() {
  console.log("🚀 Starting 10,000+ SEO Page & URL Matrix Generation...");

  const legacyRedirects: Record<string, string> = {};

  // Hand-written cities and hubs
  const cityMap = new Map<string, string>();
  cityMap.set("london", "London");
  cityMap.set("dubai", "Dubai");
  cityMap.set("mumbai", "Mumbai");

  const cities: CityInfo[] = [
    { slug: "london", name: "London", hubSlug: "london-ecommerce-agency", legacyHubSlug: "london" },
    { slug: "dubai", name: "Dubai", hubSlug: "dubai-ecommerce-agency", legacyHubSlug: "dubai" },
    { slug: "mumbai", name: "Mumbai", hubSlug: "mumbai-ecommerce-agency", legacyHubSlug: "mumbai" },
    ...GENERATED_CITIES.filter((c) => !["london", "dubai", "mumbai"].includes(c.slug)).map((c) => {
      const baseSlug = c.legacyHubSlug ?? c.slug;
      const hubSlug = `${baseSlug}-ecommerce-agency`;
      legacyRedirects[`/${baseSlug}`] = `/${hubSlug}`;
      return {
        slug: baseSlug,
        name: c.name,
        hubSlug,
        legacyHubSlug: baseSlug,
      };
    }),
  ];

  for (const c of cities) {
    cityMap.set(c.slug, c.name);
  }

  // Pick top 66 diverse high-intent services across groups
  const coreServices = GENERATED_SEO_PAGES.slice(0, 66);
  console.log(`Selected ${coreServices.length} high-intent services for all ${cities.length} cities.`);

  const generatedCityOverrides: CityOverride[] = [];

  for (const city of cities) {
    for (const service of coreServices) {
      const originalBaseSlug = service.legacySlug ?? service.slug;
      const transformedSlug = transformServiceSlug(originalBaseSlug);
      const isTransformed = transformedSlug !== originalBaseSlug;

      if (isTransformed) {
        legacyRedirects[`/${city.slug}/${originalBaseSlug}`] = `/${city.slug}/${transformedSlug}`;
      }

      const cleanTitle = `${service.title} in ${city.name}`;
      const seed = `city:${city.slug}:${transformedSlug}`;

      const override: CityOverride = {
        citySlug: city.slug,
        baseSlug: originalBaseSlug,
        serviceSlug: transformedSlug,
        legacyServiceSlug: isTransformed ? originalBaseSlug : undefined,
        title: cleanTitle,
        metaDescription: `Looking for top-rated ${service.keyword} in ${city.name}? Technostripe engineers high-converting storefronts, sub-second speed, and profitable growth for ${city.name} brands.`,
        h1: `${cleanTitle} for Scaling D2C Brands`,
        intro: buildCityIntro(service.keyword, city.name, service.serviceGroup, seed),
        closingParagraph: buildCityClosing(service.keyword, city.name, seed),
      };

      generatedCityOverrides.push(override);
    }
  }

  console.log(`Generated ${generatedCityOverrides.length} City-Service Overrides across ${cities.length} cities!`);

  // Write lib/city-pages-generated.ts
  const cityFile = `// AUTO-GENERATED by tools/generate-seo-spintax.ts\nimport type { CityInfo, CityOverride } from "./seo-pages";\n\nexport const GENERATED_CITIES: CityInfo[] = ${JSON.stringify(cities, null, 2)};\n\nexport const GENERATED_CITY_SEO_PAGES: CityOverride[] = ${JSON.stringify(generatedCityOverrides, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "city-pages-generated.ts"), cityFile);

  // Write lib/seo-redirects.ts
  const redirectsFile = `// AUTO-GENERATED by tools/generate-seo-spintax.ts\n/**\n * Maps legacy unindexed URLs to their newly recreated canonical URLs (301 Permanent Redirects).\n */\nexport const LEGACY_REDIRECT_MAP: Record<string, string> = ${JSON.stringify(legacyRedirects, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "seo-redirects.ts"), redirectsFile);

  // Compile master list of all recreated URLs for indexing
  const allRecreatedUrls: string[] = [
    `${SITE_URL}/`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/portfolio`,
    `${SITE_URL}/services`,
    `${SITE_URL}/locations`,
    `${SITE_URL}/insights`,
    `${SITE_URL}/about`,
    ...cities.map((c) => `${SITE_URL}/${c.hubSlug}`),
    ...coreServices.map((s) => `${SITE_URL}/${s.slug}`),
    ...generatedCityOverrides.map((p) => `${SITE_URL}/${p.citySlug}/${p.serviceSlug}`),
  ];

  fs.writeFileSync(
    path.join(process.cwd(), "tools", "recreated-urls-to-index.txt"),
    allRecreatedUrls.join("\n") + "\n"
  );

  console.log(`✅ Saved ${allRecreatedUrls.length} total URLs into tools/recreated-urls-to-index.txt`);
  console.log(`✅ Generated ${Object.keys(legacyRedirects).length} 301 redirects.`);
}

run();

