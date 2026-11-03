import fs from "fs";
import path from "path";
import { google } from "googleapis";
import { SEO_PAGES, getAllCityPageParams, CITIES, getCityHubSlug } from "../lib/seo-pages.js";
import { LEGACY_REDIRECT_MAP } from "../lib/seo-redirects.js";
import { CASE_STUDIES } from "../app/case-studies/constants.js";
import { BLOG_POSTS } from "../app/insights/constants.js";

// Configuration
const SITE_URL = "https://technostripe.com";
const BATCH_SIZE = 200; // Google Indexing API daily limit per project
const STATE_FILE = path.join(process.cwd(), "tools", "indexing-state.json");
const CREDENTIALS_FILE = path.join(process.cwd(), "service-account.json");

interface IndexingState {
  submitted: string[];
}

/**
 * Searches for pending URL files exported from Google Search Console:
 * - Table.csv (default GSC export)
 * - pending-urls.txt or pending-urls.csv
 * - tools/pending-urls.txt or tools/pending-urls.csv
 */
function getPendingUrlsFromFile(): string[] | null {
  const possiblePaths = [
    path.join(process.cwd(), "tools", "recreated-urls-to-index.txt"),
    path.join(process.cwd(), "tools", "pending-urls.txt"),
    path.join(process.cwd(), "pending-urls.txt"),
    path.join(process.cwd(), "tools", "pending-urls.csv"),
    path.join(process.cwd(), "pending-urls.csv"),
    path.join(process.cwd(), "Table.csv"),
    path.join(process.cwd(), "tools", "Table.csv"),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      console.log(`📂 Found pending URLs file: ${path.relative(process.cwd(), filePath)}`);
      const raw = fs.readFileSync(filePath, "utf-8");
      
      // Match all URLs starting with SITE_URL
      const urlRegex = new RegExp(`${SITE_URL}[^\\s,;"'\\r\\n]+`, "g");
      const matches = raw.match(urlRegex) || [];

      if (matches.length > 0) {
        // Normalize: convert /case-studies to /portfolio and map any legacy URLs to new canonical URLs
        const normalized = matches.map((u) => {
          let clean = u.trim().replace(/\/$/, "");
          if (clean === `${SITE_URL}/case-studies`) return `${SITE_URL}/portfolio`;
          if (clean.startsWith(`${SITE_URL}/case-studies/`)) {
            return clean.replace(`${SITE_URL}/case-studies/`, `${SITE_URL}/portfolio/`);
          }
          const urlPath = clean.slice(SITE_URL.length);
          if (urlPath && LEGACY_REDIRECT_MAP[urlPath]) {
            return `${SITE_URL}${LEGACY_REDIRECT_MAP[urlPath]}`;
          }
          return clean;
        });

        const unique = Array.from(new Set(normalized));
        console.log(`🎯 Loaded ${unique.length} unique pending URLs from file!\n`);
        return unique;
      }
    }
  }

  return null;
}

// Default fallback list ordered by priority
function getDefaultPrioritizedUrls(): string[] {
  const coreUrls = [
    SITE_URL,
    `${SITE_URL}/contact`,
    `${SITE_URL}/portfolio`,
    `${SITE_URL}/services`,
    `${SITE_URL}/about`,
    `${SITE_URL}/insights`,
    `${SITE_URL}/locations`,
    `${SITE_URL}/privacy-policy`,
    `${SITE_URL}/terms`,
  ];

  const portfolioUrls = CASE_STUDIES.map((cs) => `${SITE_URL}/portfolio/${cs.slug}`);
  const blogUrls = BLOG_POSTS.map((b) => `${SITE_URL}/insights/${b.slug}`);
  const seoPageUrls = SEO_PAGES.map((page) => `${SITE_URL}/${page.slug}`);
  const cityHubUrls = CITIES.map((c) => `${SITE_URL}/${getCityHubSlug(c)}`);
  const citySeoPageUrls = getAllCityPageParams().map((p) => `${SITE_URL}/${p.slug}/${p.service}`);

  return Array.from(
    new Set([
      ...coreUrls,
      ...portfolioUrls,
      ...blogUrls,
      ...seoPageUrls,
      ...cityHubUrls,
      ...citySeoPageUrls,
    ])
  );
}

async function submitUrls() {
  const isDryRun = process.argv.includes("--dry-run");

  if (!fs.existsSync(CREDENTIALS_FILE)) {
    console.error("❌ Missing service-account.json in the project root.");
    console.error(
      "Please add your Google Cloud service account key as 'service-account.json' to use the Indexing API."
    );
    return;
  }

  // 1. Determine which URLs to submit:
  const pendingFileUrls = getPendingUrlsFromFile();
  const targetUrls = pendingFileUrls || getDefaultPrioritizedUrls();

  // Read state to know which URLs are already submitted
  let state: IndexingState = { submitted: [] };
  if (fs.existsSync(STATE_FILE)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as IndexingState;
    } catch {
      state = { submitted: [] };
    }
  }

  // Find unsubmitted URLs from the target list
  const unsubmittedUrls = targetUrls.filter((url) => !state.submitted.includes(url));

  console.log(`========================================`);
  console.log(`🌐 Google Indexing API Automation`);
  console.log(`========================================`);
  if (pendingFileUrls) {
    console.log(`🎯 Mode: Pending URLs Only (from GSC Export / File)`);
  } else {
    console.log(`🎯 Mode: Full Site Prioritized Queue`);
  }
  console.log(`📊 Target URLs in queue: ${targetUrls.length}`);
  console.log(`✅ Already submitted: ${state.submitted.length}`);
  console.log(`⏳ Remaining unsubmitted: ${unsubmittedUrls.length}`);
  console.log(`========================================\n`);

  if (unsubmittedUrls.length === 0) {
    console.log("🎉 All targeted pending URLs have already been submitted!");
    return;
  }

  // Get the batch of URLs for today (max 200 per Google's daily quota)
  const batch = unsubmittedUrls.slice(0, Math.min(BATCH_SIZE, unsubmittedUrls.length));

  if (isDryRun) {
    console.log(`[DRY RUN] Would submit the following ${batch.length} URLs today:`);
    batch.slice(0, 25).forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
    if (batch.length > 25) {
      console.log(`  ... and ${batch.length - 25} more.`);
    }
    return;
  }

  console.log(`🚀 Submitting batch of ${batch.length} URLs to Google Indexing API...`);

  // Auth with Google
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_FILE,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  const indexing = google.indexing({ version: "v3", auth });

  let successCount = 0;
  let failCount = 0;
  let permissionDenied = false;

  for (const url of batch) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: "URL_UPDATED",
        },
      });

      state.submitted.push(url);
      successCount++;
      console.log(`[SUCCESS] (${successCount}/${batch.length}) ${url}`);
      // Small pause to be polite to Google API rate limits
      await new Promise((r) => setTimeout(r, 200));
    } catch (error: any) {
      failCount++;
      const message = error?.message || String(error);
      console.error(`[ERROR] Failed to submit: ${url}`);
      console.error(`        Reason: ${message}`);

      if (message.includes("Permission denied") || message.includes("403")) {
        permissionDenied = true;
        console.error(`\n⚠️  PERMISSION ERROR DETECTED:`);
        console.error(
          `Please make sure the Service Account email is added as an OWNER in Google Search Console:`
        );
        const creds = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, "utf-8"));
        console.error(`👉 Service Account Email: ${creds.client_email}`);
        console.error(`👉 GSC Property: ${SITE_URL}`);
        console.error(
          `👉 Steps: GSC > Settings > Users and permissions > Add User (Email: ${creds.client_email}, Permission: Owner)\n`
        );
        break; // Stop loop if permission is missing
      }

      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // Save state
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));

  console.log(`\n========================================`);
  console.log(`Batch Summary:`);
  console.log(`✅ Successfully submitted: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📈 Total Submitted to date: ${state.submitted.length} / ${targetUrls.length}`);
  console.log(`========================================`);

  if (!permissionDenied && successCount > 0) {
    console.log(
      `Next run: you can run 'npm run indexing' again tomorrow to submit the next batch!`
    );
  }
}

submitUrls().catch(console.error);
