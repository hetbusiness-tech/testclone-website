import fs from "fs";
import path from "path";
import type { CityInfo, CityOverride, SeoPage } from "../lib/seo-pages";
import { GENERATED_SEO_PAGES } from "../lib/seo-pages-generated.js";
import { GENERATED_CITIES, GENERATED_CITY_SEO_PAGES } from "../lib/city-pages-generated.js";

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

function buildRichCoverageDescription(title: string, keyword: string, serviceGroup: string, seed: string): string {
  const templates = [
    `We execute end-to-end ${title.toLowerCase()} as a core pillar of our ${keyword} methodology — eliminating technical bottlenecks, tightening user journeys, and compounding organic and paid efficiency across your storefront.`,
    `Our approach to ${title.toLowerCase()} within ${keyword} focuses on measurable revenue lift: auditing your current baseline, shipping clean production-grade changes, and validating every improvement against real shopper behavior.`,
    `Most D2C stores leak conversions because ${title.toLowerCase()} is treated as an afterthought. Through our ${keyword} framework, we engineer this layer from the ground up for sub-second speed and high-intent buyer conversion.`,
    `Built specifically for scaling merchants seeking ${keyword}, our ${title.toLowerCase()} workflow pairs deep platform diagnostics with rigorous post-launch QA so your team scales without accumulating technical debt.`,
  ];
  return pick(templates, `${seed}:${title}:${serviceGroup}`);
}

function buildNationalIntro(keyword: string, serviceGroup: string, seed: string): string {
  const intros = [
    `Technostripe is a specialized ${serviceGroup.toLowerCase()} partner delivering ${keyword} for ambitious D2C and Shopify brands. Rather than relying on bloated templates or generic playbooks, we engineer fast, conversion-first systems backed by real funnel telemetry and clean execution.`,
    `Scaling a modern e-commerce brand requires more than surface-level tweaks — it demands ${keyword} built around unit economics, site speed, and buyer psychology. Our in-house specialists audit, architect, and scale high-performing storefronts that turn existing traffic into compounding revenue.`,
    `When growth stalls, the bottleneck is rarely a lack of effort — it is structural friction across your store and acquisition funnel. Our ${keyword} practice combines technical precision, conversion-first UX, and data-backed testing to unlock sustainable D2C scale.`,
    `We partner with growth-stage merchants who need ${keyword} executed at an engineering standard. From sub-second mobile performance to high-converting merchandising and acquisition architecture, every deliverable is scoped around measurable ROI.`,
  ];
  return pick(intros, seed, 1);
}

function buildNationalClosing(keyword: string, serviceGroup: string, seed: string): string {
  const closings = [
    `Our ${keyword} engagement is built for brands with real product-market fit that are ready to remove technical and conversion bottlenecks. Whether you are consolidating your stack, scaling paid acquisition, or compounding organic search equity, we provide a dedicated senior team focused on profitable growth.`,
    `Don't let slow load times, fragmented creative, or unoptimized funnels cap your store's potential. Partner with Technostripe for ${keyword} and get a transparent, engineering-led roadmap tailored to your catalog, margins, and revenue targets.`,
    `Choosing the right partner for ${keyword} changes the trajectory of your storefront. We work alongside your internal team with clear weekly deliverables, full code and asset ownership, and uncompromising standards across every touchpoint.`,
  ];
  return pick(closings, seed, 2);
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

function loadUnindexedUrlsFromCsv(): Set<string> {
  const paths = new Set<string>();

  const fullTxtPath = path.join(process.cwd(), "tools", "not-indexed-urls.txt");
  if (fs.existsSync(fullTxtPath)) {
    const rawTxt = fs.readFileSync(fullTxtPath, "utf-8");
    for (const line of rawTxt.trim().split(/\r?\n/)) {
      const url = line.trim();
      if (url.startsWith(SITE_URL)) {
        const p = url.slice(SITE_URL.length);
        if (p) paths.add(p);
      }
    }
  }

  const csvPath = path.join(process.cwd(), "tools", "unindexed-gsc-export.csv");
  if (fs.existsSync(csvPath)) {
    const raw = fs.readFileSync(csvPath, "utf-8");
    const lines = raw.trim().split(/\r?\n/).slice(1);
    for (const line of lines) {
      const url = line.split(",")[0]?.trim();
      if (url && url.startsWith(SITE_URL)) {
        const p = url.slice(SITE_URL.length);
        if (p) paths.add(p);
      }
    }
  }

  return paths;
}

async function run() {
  const unindexedPaths = loadUnindexedUrlsFromCsv();
  console.log(`Loaded ${unindexedPaths.size} unindexed paths from tools/unindexed-gsc-export.csv`);

  const legacyRedirects: Record<string, string> = {};

  // 1. Update GENERATED_CITIES (recreate city hub slugs for the 73 cities in CSV)
  const updatedCities: CityInfo[] = GENERATED_CITIES.map((city) => {
    const baseSlug = city.legacyHubSlug ?? city.slug;
    const oldPath = `/${baseSlug}`;
    if (unindexedPaths.has(oldPath)) {
      const newHubSlug = `${baseSlug}-ecommerce-agency`;
      legacyRedirects[oldPath] = `/${newHubSlug}`;
      return {
        slug: baseSlug,
        name: city.name,
        hubSlug: newHubSlug,
        legacyHubSlug: baseSlug,
      };
    }
    return {
      slug: baseSlug,
      name: city.name,
    };
  });

  // Also ensure hand-written cities and national/city-service pages in unindexedPaths are in legacyRedirects
  for (const hwSlug of ["london", "dubai", "mumbai"]) {
    if (unindexedPaths.has(`/${hwSlug}`)) {
      legacyRedirects[`/${hwSlug}`] = `/${hwSlug}-ecommerce-agency`;
    }
  }
  for (const hwNat of ["shopify-development-agency", "shopify-web-design-company"]) {
    if (unindexedPaths.has(`/${hwNat}`)) {
      legacyRedirects[`/${hwNat}`] = `/${transformServiceSlug(hwNat)}`;
    }
  }
  if (unindexedPaths.has("/mumbai/shopify-development-agency")) {
    legacyRedirects["/mumbai/shopify-development-agency"] = `/mumbai/${transformServiceSlug("shopify-development-agency")}`;
  }

  const cityMap = new Map<string, string>();
  cityMap.set("london", "London");
  cityMap.set("dubai", "Dubai");
  cityMap.set("mumbai", "Mumbai");
  for (const c of updatedCities) {
    cityMap.set(c.slug, c.name);
  }

  // 2. Update GENERATED_SEO_PAGES (recreate slugs for the 26 national pages in CSV + enrich all)
  const basePageMap = new Map<string, { keyword: string; serviceGroup: string; title: string }>();
  basePageMap.set("shopify-development-agency", {
    keyword: "shopify development agency",
    serviceGroup: "Website Development",
    title: "Shopify Development Agency",
  });
  basePageMap.set("shopify-web-design-company", {
    keyword: "shopify web design company",
    serviceGroup: "Website Development",
    title: "Shopify Web Design Company",
  });
  basePageMap.set("shopify-plus-agency", {
    keyword: "shopify plus agency",
    serviceGroup: "Website Development",
    title: "Shopify Plus Agency",
  });

  const updatedBasePages: SeoPage[] = GENERATED_SEO_PAGES.map((page) => {
    const originalSlug = page.legacySlug ?? page.slug;
    const isUnindexedNational = unindexedPaths.has(`/${originalSlug}`);
    const newSlug = isUnindexedNational ? transformServiceSlug(originalSlug) : originalSlug;

    if (isUnindexedNational) {
      legacyRedirects[`/${originalSlug}`] = `/${newSlug}`;
    }

    basePageMap.set(originalSlug, {
      keyword: page.keyword,
      serviceGroup: page.serviceGroup,
      title: page.title,
    });
    basePageMap.set(newSlug, {
      keyword: page.keyword,
      serviceGroup: page.serviceGroup,
      title: page.title,
    });

    const seed = `national:${newSlug}`;
    const updatedCoverage = page.coverage.map((c) => ({
      title: c.title,
      description: buildRichCoverageDescription(c.title, page.keyword, page.serviceGroup, seed),
    }));

    const updatedFaqs = page.faqs.map((f, idx) => ({
      question: f.question,
      answer: f.answer.includes("undefined")
        ? `As specialists in ${page.keyword}, we scope every engagement around clear technical deliverables, conversion lift, and full transparency.`
        : f.answer.replace(/^We address this frequently\. When clients ask about [^,]+, our approach is clear:\s*/i, ""),
    }));

    const result: SeoPage = {
      ...page,
      slug: newSlug,
      ...(isUnindexedNational ? { legacySlug: originalSlug } : {}),
      metaDescription: `Technostripe delivers ${page.keyword} for scaling D2C and Shopify brands — combining sub-second engineering, data-backed CRO, and measurable revenue growth.`,
      intro: buildNationalIntro(page.keyword, page.serviceGroup, seed),
      coverage: updatedCoverage,
      closingParagraph: buildNationalClosing(page.keyword, page.serviceGroup, seed),
      faqs: updatedFaqs,
    };

    if (!isUnindexedNational) {
      delete result.legacySlug;
    }

    return result;
  });

  // 3. Update GENERATED_CITY_SEO_PAGES (recreate slugs for the 897 city-service URLs in CSV + fix all 4,800)
  const updatedCityPages: CityOverride[] = GENERATED_CITY_SEO_PAGES.map((page) => {
    const originalBaseSlug = page.legacyServiceSlug ?? page.baseSlug;
    const oldCityServicePath = `/${page.citySlug}/${originalBaseSlug}`;
    const isUnindexedCityService = unindexedPaths.has(oldCityServicePath);

    const baseInfo = basePageMap.get(originalBaseSlug);
    const baseKeyword =
      baseInfo?.keyword ??
      page.title.replace(/\s+in\s+.+$/i, "").trim().toLowerCase();
    const serviceGroup = baseInfo?.serviceGroup ?? "Website Development";
    const cityName = cityMap.get(page.citySlug) ?? page.citySlug;

    const newServiceSlug = isUnindexedCityService
      ? transformServiceSlug(originalBaseSlug)
      : originalBaseSlug;

    if (isUnindexedCityService) {
      legacyRedirects[oldCityServicePath] = `/${page.citySlug}/${newServiceSlug}`;
    }

    const seed = `city:${page.citySlug}:${newServiceSlug}`;
    const cleanTitle = baseInfo?.title
      ? `${baseInfo.title} in ${cityName}`
      : page.title;

    const result: CityOverride = {
      citySlug: page.citySlug,
      baseSlug: originalBaseSlug,
      ...(isUnindexedCityService
        ? {
            serviceSlug: newServiceSlug,
            legacyServiceSlug: originalBaseSlug,
          }
        : {}),
      title: cleanTitle,
      metaDescription: `Looking for ${baseKeyword} in ${cityName}? Technostripe engineers high-converting Shopify storefronts, technical SEO, and profitable paid acquisition for ${cityName} D2C brands.`,
      h1: `${cleanTitle} for High-Growth D2C Brands`,
      intro: buildCityIntro(baseKeyword, cityName, serviceGroup, seed),
      closingParagraph: buildCityClosing(baseKeyword, cityName, seed),
    };

    return result;
  });

  // Write lib/seo-pages-generated.ts
  const baseFile = `// AUTO-GENERATED by tools/generate-seo-spintax.ts\nimport type { SeoPage } from "./seo-pages";\n\nexport const GENERATED_SEO_PAGES: SeoPage[] = ${JSON.stringify(updatedBasePages, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "seo-pages-generated.ts"), baseFile);

  // Write lib/city-pages-generated.ts
  const cityFile = `// AUTO-GENERATED by tools/generate-seo-spintax.ts\nimport type { CityInfo, CityOverride } from "./seo-pages";\n\nexport const GENERATED_CITIES: CityInfo[] = ${JSON.stringify(updatedCities, null, 2)};\n\nexport const GENERATED_CITY_SEO_PAGES: CityOverride[] = ${JSON.stringify(updatedCityPages, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "city-pages-generated.ts"), cityFile);

  // Write lib/seo-redirects.ts
  const redirectsFile = `// AUTO-GENERATED by tools/generate-seo-spintax.ts\n/**\n * Maps legacy unindexed URLs from Google Search Console (Table.csv)\n * to their newly recreated canonical URLs (301 Permanent Redirects).\n */\nexport const LEGACY_REDIRECT_MAP: Record<string, string> = ${JSON.stringify(legacyRedirects, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "seo-redirects.ts"), redirectsFile);

  console.log(`✅ Updated ${updatedBasePages.length} base SEO pages.`);
  console.log(`✅ Updated ${updatedCities.length} city hubs.`);
  console.log(`✅ Updated ${updatedCityPages.length} city-service SEO pages.`);
  console.log(`✅ Generated ${Object.keys(legacyRedirects).length} 301 redirect mappings in lib/seo-redirects.ts.`);
}

if (process.argv[1]?.endsWith("generate-seo-spintax.ts")) {
  run();
}
