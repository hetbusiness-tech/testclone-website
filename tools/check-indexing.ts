import fs from "fs";
import path from "path";
import { google } from "googleapis";
import { GENERATED_SEO_PAGES } from "../lib/seo-pages-generated.js";
import { GENERATED_CITIES, GENERATED_CITY_SEO_PAGES } from "../lib/city-pages-generated.js";
import { CASE_STUDIES } from "../app/case-studies/constants.js";
import { BLOG_POSTS } from "../app/insights/constants.js";
import { transformServiceSlug } from "./generate-seo-spintax.js";

const SITE_URL = "https://technostripe.com";
const GSC_SITE_URL = "https://technostripe.com/";
const CREDENTIALS_FILE = path.join(process.cwd(), "service-account.json");

interface UrlRecord {
  originalUrl: string;
  originalPath: string;
  recreatedUrl: string;
  category: "Core" | "Portfolio" | "Insights" | "National Service" | "City Hub" | "City Service";
}

function getAllSiteUrlRecords(): UrlRecord[] {
  const records: UrlRecord[] = [];
  const seen = new Set<string>();

  const add = (
    originalPath: string,
    recreatedPath: string,
    category: UrlRecord["category"]
  ) => {
    const originalUrl = `${SITE_URL}${originalPath === "/" ? "" : originalPath}`;
    if (seen.has(originalUrl)) return;
    seen.add(originalUrl);
    records.push({
      originalUrl,
      originalPath,
      recreatedUrl: `${SITE_URL}${recreatedPath === "/" ? "" : recreatedPath}`,
      category,
    });
  };

  // Core routes
  for (const p of [
    "/",
    "/contact",
    "/portfolio",
    "/services",
    "/about",
    "/insights",
    "/locations",
    "/privacy-policy",
    "/terms",
  ]) {
    add(p, p, "Core");
  }

  // Portfolio
  for (const cs of CASE_STUDIES) {
    add(`/portfolio/${cs.slug}`, `/portfolio/${cs.slug}`, "Portfolio");
  }

  // Insights
  for (const b of BLOG_POSTS) {
    add(`/insights/${b.slug}`, `/insights/${b.slug}`, "Insights");
  }

  // National SEO pages (3 hand-written + 197 generated)
  const handWrittenNational = [
    "shopify-development-agency",
    "shopify-web-design-company",
    "shopify-plus-agency",
  ];
  for (const s of handWrittenNational) {
    add(`/${s}`, `/${transformServiceSlug(s)}`, "National Service");
  }
  for (const p of GENERATED_SEO_PAGES) {
    const orig = p.legacySlug ?? p.slug;
    add(`/${orig}`, `/${transformServiceSlug(orig)}`, "National Service");
  }

  // City hubs (3 hand-written + generated)
  const allCitySlugs = Array.from(
    new Set([
      "london",
      "dubai",
      "mumbai",
      ...GENERATED_CITIES.map((c) => c.legacyHubSlug ?? c.slug),
    ])
  );
  for (const cSlug of allCitySlugs) {
    add(`/${cSlug}`, `/${cSlug}-ecommerce-agency`, "City Hub");
  }

  // City + Service pages (3 hand-written + generated)
  for (const hwCity of ["london", "dubai", "mumbai"]) {
    const origSvc = "shopify-development-agency";
    add(
      `/${hwCity}/${origSvc}`,
      `/${hwCity}/${transformServiceSlug(origSvc)}`,
      "City Service"
    );
  }
  for (const c of GENERATED_CITY_SEO_PAGES) {
    const origSvc = c.legacyServiceSlug ?? c.baseSlug;
    add(
      `/${c.citySlug}/${origSvc}`,
      `/${c.citySlug}/${transformServiceSlug(origSvc)}`,
      "City Service"
    );
  }

  return records;
}

async function checkIndexing() {
  if (!fs.existsSync(CREDENTIALS_FILE)) {
    console.error("❌ Missing service-account.json in the project root.");
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_FILE,
    scopes: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/webmasters",
    ],
  });

  const sc = google.searchconsole({ version: "v1", auth });

  console.log("========================================");
  console.log("🔍 Google Search Console Full-Site Audit");
  console.log("========================================");
  console.log(`📡 Fetching all Google Search Analytics pages for ${GSC_SITE_URL}...`);

  const saRes = await sc.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate: "2024-01-01",
      endDate: new Date().toISOString().slice(0, 10),
      dimensions: ["page"],
      rowLimit: 25000,
    },
  });

  const rows = saRes.data.rows || [];
  const googlePagesMap = new Map<
    string,
    { clicks: number; impressions: number; ctr: number; position: number }
  >();

  for (const row of rows) {
    const rawUrl = (row.keys?.[0] || "").replace(/\/$/, "");
    if (rawUrl) {
      googlePagesMap.set(rawUrl, {
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      });
    }
  }

  const allRecords = getAllSiteUrlRecords();
  const indexedRecords: (UrlRecord & {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  })[] = [];
  const notIndexedRecords: UrlRecord[] = [];

  for (const rec of allRecords) {
    const metrics = googlePagesMap.get(rec.originalUrl);
    if (metrics) {
      indexedRecords.push({ ...rec, ...metrics });
    } else {
      notIndexedRecords.push(rec);
    }
  }

  // Write tools/not-indexed-urls.txt (original URLs not present on Google)
  const notIndexedTxtPath = path.join(process.cwd(), "tools", "not-indexed-urls.txt");
  fs.writeFileSync(
    notIndexedTxtPath,
    notIndexedRecords.map((r) => r.originalUrl).join("\n") + "\n",
    "utf-8"
  );

  // Write tools/not-indexed-urls.csv (detailed mapping of Original URL -> New Recreated URL)
  const notIndexedCsvPath = path.join(process.cwd(), "tools", "not-indexed-urls.csv");
  const csvHeader = "Original_Unindexed_URL,New_Recreated_URL,Category,Google_Status\n";
  const csvBody = notIndexedRecords
    .map((r) => {
      const targetUrl =
        r.category === "Core" || r.category === "Portfolio" || r.category === "Insights"
          ? r.originalUrl
          : r.recreatedUrl;
      return `${r.originalUrl},${targetUrl},${r.category},Not Present on Google`;
    })
    .join("\n");
  fs.writeFileSync(notIndexedCsvPath, csvHeader + csvBody + "\n", "utf-8");

  // Write tools/recreated-urls-to-index.txt (canonical URLs to submit to Indexing API)
  const recreatedTxtPath = path.join(
    process.cwd(),
    "tools",
    "recreated-urls-to-index.txt"
  );
  fs.writeFileSync(
    recreatedTxtPath,
    notIndexedRecords
      .map((r) =>
        r.category === "Core" || r.category === "Portfolio" || r.category === "Insights"
          ? r.originalUrl
          : r.recreatedUrl
      )
      .join("\n") + "\n",
    "utf-8"
  );

  // Write tools/indexed-urls.csv (all pages present on Google with metrics)
  const indexedCsvPath = path.join(process.cwd(), "tools", "indexed-urls.csv");
  const indexedHeader = "URL,Category,Clicks,Impressions,CTR,Avg_Position\n";
  const indexedBody = indexedRecords
    .map(
      (r) =>
        `${r.originalUrl},${r.category},${r.clicks},${r.impressions},${(
          r.ctr * 100
        ).toFixed(2)}%,${r.position.toFixed(1)}`
    )
    .join("\n");
  fs.writeFileSync(indexedCsvPath, indexedHeader + indexedBody + "\n", "utf-8");

  // Category breakdown
  const byCategory: Record<string, { indexed: number; notIndexed: number }> = {};
  for (const r of allRecords) {
    if (!byCategory[r.category]) {
      byCategory[r.category] = { indexed: 0, notIndexed: 0 };
    }
    if (googlePagesMap.has(r.originalUrl)) {
      byCategory[r.category].indexed++;
    } else {
      byCategory[r.category].notIndexed++;
    }
  }

  console.log(`\n📊 FULL SITE INDEXING SUMMARY (${allRecords.length} Total Pages):`);
  console.log(`----------------------------------------`);
  console.log(`✅ Present on Google:     ${indexedRecords.length} URLs`);
  console.log(`❌ NOT Present on Google: ${notIndexedRecords.length} URLs`);
  console.log(`----------------------------------------`);
  for (const [cat, counts] of Object.entries(byCategory)) {
    console.log(
      `  • ${cat.padEnd(18)} | Indexed: ${String(counts.indexed).padStart(4)} | Not Indexed: ${String(counts.notIndexed).padStart(4)}`
    );
  }
  console.log(`----------------------------------------`);
  console.log(`📁 Saved files:`);
  console.log(`  1. tools/not-indexed-urls.csv        (${notIndexedRecords.length} unindexed URLs + new recreated URLs)`);
  console.log(`  2. tools/not-indexed-urls.txt        (${notIndexedRecords.length} plain unindexed URLs)`);
  console.log(`  3. tools/recreated-urls-to-index.txt (${notIndexedRecords.length} new canonical URLs for Indexing API)`);
  console.log(`  4. tools/indexed-urls.csv            (${indexedRecords.length} indexed URLs with GSC impressions/clicks)`);

  // Optional live URL Inspection API check if --inspect flag is passed
  const inspectFlagIdx = process.argv.indexOf("--inspect");
  if (inspectFlagIdx !== -1) {
    const limit = Number(process.argv[inspectFlagIdx + 1]) || 10;
    console.log(`\n🔬 Running live URL Inspection API on ${limit} sample unindexed URLs...`);
    for (const rec of notIndexedRecords.slice(0, limit)) {
      try {
        const res = await sc.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: rec.originalUrl,
            siteUrl: GSC_SITE_URL,
          },
        });
        const status = res.data.inspectionResult?.indexStatusResult;
        console.log(
          `  • ${rec.originalUrl} -> Verdict: ${status?.verdict} | State: ${status?.coverageState}`
        );
      } catch (err: any) {
        console.error(`  • ${rec.originalUrl} -> Error: ${err?.message}`);
      }
    }
  }
}

checkIndexing().catch(console.error);

