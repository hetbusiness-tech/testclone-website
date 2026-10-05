import fs from "fs";
import path from "path";
import { GENERATED_SEO_PAGES } from "../lib/seo-pages-generated.js";
import { GENERATED_CITIES, GENERATED_CITY_SEO_PAGES } from "../lib/city-pages-generated.js";

function spinText(spintax) {
  let spun = spintax;
  const regex = /\{([^{}]+)\}/g;
  let match;
  while ((match = regex.exec(spun)) !== null) {
    const options = match[1].split("|");
    const choice = options[Math.floor(Math.random() * options.length)];
    spun = spun.substring(0, match.index) + choice + spun.substring(match.index + match[0].length);
    regex.lastIndex = 0; // Reset regex to catch nested or subsequent matches properly
  }
  return spun;
}

function calculateWordCount(text) {
  return (text.match(/\b\w+\b/g) || []).length;
}

function injectKeyword(text, keyword, targetCount) {
  let currentCount = (text.match(new RegExp(keyword, "gi")) || []).length;
  if (currentCount >= targetCount) return text;
  
  let sentences = text.split(". ");
  if (sentences.length <= 1) return text + ` — especially when looking for ${keyword}.`;

  // Avoid infinite loop by only attempting to inject up to the number of sentences available
  let attempts = 0;
  let maxAttempts = sentences.length * 2;
  
  while (currentCount < targetCount && attempts < maxAttempts) {
    const randIndex = Math.floor(Math.random() * (sentences.length - 1));
    if (!sentences[randIndex].toLowerCase().includes(keyword.toLowerCase())) {
        sentences[randIndex] = sentences[randIndex] + ` — especially when looking for ${keyword}`;
        currentCount++;
    }
    attempts++;
  }
  return sentences.join(". ");
}

function optimizePage(page, baseKeyword, city) {
  const fullKeyword = city ? `${baseKeyword} in ${city}` : baseKeyword;

  // Vastly expanded Spintax options for high uniqueness
  const introTemplates = [
    `{We are|Technostripe is|Our team operates as} {a leading|a top-tier|a premium|an elite|a highly specialized} {agency|growth partner|digital expert|e-commerce studio} {dedicated to|focused on|specializing in} ${fullKeyword}. {We don't just build websites|Beyond simple web design|We move past basic templates} — {we architect|we engineer|our goal is to craft} {high-converting|revenue-generating|highly optimized} {experiences|platforms|storefronts} {for D2C brands|for ambitious eCommerce businesses|for scaling retailers}. {If you need|When you are searching for|For brands requiring} ${fullKeyword}, {our expertise is unmatched|we deliver proven results|we bring years of specialized experience to the table|you need a partner who understands the nuances of scale}.`,
    
    `{Looking for|Searching for|In need of} ${fullKeyword}? {Technostripe|Our agency|The team at Technostripe} {delivers|provides|engineers} {custom|bespoke|tailored} {solutions|growth strategies|technical builds} {that drive real revenue|that move the needle|focused on ROI}. {As a trusted|Operating as a premier|Being recognized as a top} {partner|agency|provider} in this space, {we combine|we merge|we fuse} {design excellence|creative strategy|top-tier UX} with {technical performance|robust engineering|blazing fast code}. {Choosing us for|Partnering with us for|When you select us for} ${fullKeyword} {means|guarantees|ensures} {you are poised for scale|your brand gets the foundation it deserves|you outpace the competition}.`,
    
    `{Scaling an e-commerce brand|Growing a D2C business|Taking your store to the next level} requires {more than just good looks|deep technical expertise|a partner who understands both code and conversion}. {That is why|This is precisely why|For this reason} {we offer|we provide|Technostripe specializes in} ${fullKeyword}. {Our methodology|Our approach|Our entire playbook} is {built around|centered on|laser-focused on} {maximizing conversions|driving sustainable growth|increasing your bottom line}. {Trust|Rely on|Partner with} {our team|us|Technostripe} when you need ${fullKeyword}, and {experience the difference|see what true performance looks like|watch your metrics improve}.`
  ];

  const closingTemplates = [
    `{Ready to scale?|Looking for serious growth?|Prepared to dominate your market?} {Contact us|Reach out to our team|Get in touch} today for ${fullKeyword}. {We don't just build stores; we build businesses.|We focus on metrics that matter: revenue and profit.|Stop settling for average conversion rates.}`,
    `{Your brand deserves better than a generic template.|Don't let technical debt hold back your revenue.} {Let's discuss|Book a strategy call to explore|We'd love to chat about} how our ${fullKeyword} can {transform|elevate|supercharge} your store. {The right technical foundation changes everything.|Growth is engineered, not accidental.}`,
    `{Stop losing customers to slow load times and poor UX.|Is your current setup bottlenecking your growth?} {Partner with us|Collaborate with our experts|Join forces with Technostripe} for ${fullKeyword}. {We are ready to build your next milestone.|Let's turn your traffic into loyal customers.}`
  ];

  // Pick a random template for intro and closing
  const spintaxIntro = introTemplates[Math.floor(Math.random() * introTemplates.length)];
  const spintaxClosing = closingTemplates[Math.floor(Math.random() * closingTemplates.length)];

  let optimized = { ...page };
  
  optimized.intro = spinText(spintaxIntro);
  optimized.closingParagraph = spinText(spintaxClosing);
  
  if (optimized.coverage) {
      optimized.coverage = optimized.coverage.map(c => {
          const coverageVariations = [
            `{${c.description}|Our ${c.title} services are tailored for ${fullKeyword}. {We ensure top quality|We guarantee precision|Our team executes this flawlessly}.}`,
            `{When it comes to ${c.title}, we are the experts for ${fullKeyword}. |${c.description}|For ${c.title}, our methodology is proven for ${fullKeyword}.}`
          ];
          return {
              title: c.title,
              description: spinText(coverageVariations[Math.floor(Math.random() * coverageVariations.length)])
          };
      });
  }

  if (optimized.faqs) {
      optimized.faqs = optimized.faqs.map(f => {
          const faqVariations = [
            `{${f.answer}|Yes, absolutely. As experts in ${fullKeyword}, we handle this precisely.|This is a core part of our offering for ${fullKeyword}.}`,
            `{We address this frequently. When clients ask about ${fullKeyword}, our approach is clear: ${f.answer}|${f.answer}}`
          ];
          return {
              question: f.question,
              answer: spinText(faqVariations[Math.floor(Math.random() * faqVariations.length)])
          };
      });
  }

  let fullText = `${optimized.h1} ${optimized.intro} ${optimized.closingParagraph} ` + 
                 (optimized.coverage ? optimized.coverage.map(c => c.description).join(" ") : "") +
                 (optimized.faqs ? optimized.faqs.map(f => f.answer).join(" ") : "");
                 
  let wordCount = calculateWordCount(fullText);
  let targetMentions = Math.max(1, Math.floor(wordCount * 0.05));
  
  optimized.closingParagraph = injectKeyword(optimized.closingParagraph, fullKeyword, targetMentions);

  return optimized;
}

async function run() {
  console.log("Optimizing base SEO pages...");
  const newBasePages = GENERATED_SEO_PAGES.map(page => optimizePage(page, page.keyword, null));
  
  console.log("Optimizing City SEO pages...");
  const newCityPages = GENERATED_CITY_SEO_PAGES.map(page => optimizePage(page, page.keyword, page.cityName));

  const baseFile = `// AUTO-GENERATED by tools/generate-seo-spintax.ts\nimport type { SeoPage } from "./seo-pages";\n\nexport const GENERATED_SEO_PAGES: SeoPage[] = ${JSON.stringify(newBasePages, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "seo-pages-generated.ts"), baseFile);

  const cityFile = `// AUTO-GENERATED by tools/generate-seo-spintax.ts\nimport type { CityInfo, CityOverride } from "./seo-pages";\n\nexport const GENERATED_CITIES: CityInfo[] = ${JSON.stringify(GENERATED_CITIES, null, 2)};\n\nexport const GENERATED_CITY_SEO_PAGES: CityOverride[] = ${JSON.stringify(newCityPages, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), "lib", "city-pages-generated.ts"), cityFile);

  console.log("Done! Optimized 198 base pages and 4801 city pages.");
}

run();
