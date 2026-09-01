"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CTASection from "../../components/CTASection";

interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  description: string;
  imageUrl: string; // User can manually add image URLs here
  keyBenefits: string[];
  processSteps: { step: string; title: string; desc: string }[];
  deliverables: string[];
}

const servicesData: ServiceDetail[] = [
  {
    id: "ecommerce-website-development",
    number: "01",
    title: "E-commerce Website Development",
    description:
      "We design and develop high-converting Shopify experiences focused on user experience, lightning-fast load times, and long-term brand scalability.",
    imageUrl: "/services/service1.png", // Place custom image URL here
    keyBenefits: [
      "Sub-second Shopify speed & 95+ Lighthouse score",
      "Mobile-first CRO UX designed to maximize conversion",
      "Custom product bundle & subscription recharge setups",
      "Headless & custom Liquid architecture without template bloat",
    ],
    processSteps: [
      { step: "01", title: "Audit", desc: "Funnel, tech stack & speed teardown." },
      { step: "02", title: "Design", desc: "High-fidelity, conversion-first store UI." },
      { step: "03", title: "Build", desc: "Clean Shopify development & integrations." },
      { step: "04", title: "Launch", desc: "Rigorous QA, analytics & monitored go-live." },
    ],
    deliverables: [
      "Custom Shopify Store",
      "Shopify Redesigns",
      "CRO-Focused UX",
      "Landing Page Builder",
      "Speed & Mobile Optimization",
    ],
  },
  {
    id: "paid-ads",
    number: "02",
    title: "Paid Ads (Performance Marketing)",
    description:
      "Performance marketing systems designed to acquire DTC customers profitably and scale revenue consistently across Meta & Google Ads.",
    imageUrl: "/services/service1.png", // Place custom image URL here
    keyBenefits: [
      "High-intent Google Shopping & Search campaigns",
      "Multi-stage Meta (FB & IG) acquisition & retargeting",
      "Data-backed ROAS and CPA targets that compound",
      "Weekly performance dashboards tied directly to revenue",
    ],
    processSteps: [
      { step: "01", title: "Audit", desc: "Ad account teardown & unit economics." },
      { step: "02", title: "Funnel", desc: "Pixel setup & high-converting landing pages." },
      { step: "03", title: "Launch", desc: "Rapid creative testing & angle validation." },
      { step: "04", title: "Scale", desc: "Reallocate spend to top-performing ad sets." },
    ],
    deliverables: [
      "Meta Ads Management",
      "Google Shopping & Search",
      "Retargeting Campaigns",
      "Creative Testing Matrix",
      "Performance Analytics",
    ],
  },
  {
    id: "ecommerce-seo-services",
    number: "03",
    title: "E-commerce SEO Services",
    description:
      "Technical, collection-level, and product-intent SEO engineered specifically for modern Shopify stores. We fix crawl bottlenecks, rank commercial keywords, and build compounding organic revenue.",
    imageUrl: "/services/service1.png", // Place custom image URL here
    keyBenefits: [
      "Sub-second collection & product crawlability fixes",
      "High-intent commercial keyword & category ranking",
      "Automated schema, rich snippets & faceted indexing",
      "Compounding organic revenue reducing paid ad reliance",
    ],
    processSteps: [
      { step: "01", title: "Audit", desc: "Technical Shopify architecture & crawl indexation." },
      { step: "02", title: "Strategy", desc: "High-intent commercial keyword & collection map." },
      { step: "03", title: "Optimize", desc: "On-page, structured data & collection optimization." },
      { step: "04", title: "Scale", desc: "High-authority digital PR & compounding rank." },
    ],
    deliverables: [
      "Technical Shopify SEO Audit",
      "Commercial Keyword Architecture",
      "Collection & Product Optimization",
      "Rich Snippet & Schema Setup",
      "Monthly Organic Revenue Reports",
    ],
  },
  {
    id: "social-media-creative",
    number: "04",
    title: "Social Media & Creative",
    description:
      "Conversion-focused social content, performance ad creatives, UGC direction, and product storytelling built to capture attention and convert.",
    imageUrl: "/services/service1.png", // Place custom image URL here
    keyBenefits: [
      "Thumb-stopping video creative built to perform in-feed",
      "Full UGC creator pipeline & creative direction",
      "Product storytelling that builds emotional connection",
      "Continuous creative testing iterations based on ad metrics",
    ],
    processSteps: [
      { step: "01", title: "Strategy", desc: "Audience psychology & hook matrix." },
      { step: "02", title: "Script", desc: "High-converting UGC & video frameworks." },
      { step: "03", title: "Produce", desc: "Batch creative production & editing." },
      { step: "04", title: "Iterate", desc: "Double down on winning ad creative angles." },
    ],
    deliverables: [
      "Ad Creatives & Hooks",
      "UGC Video Direction",
      "Short-form Reels & TikToks",
      "Product Storytelling",
      "Founder-Led Content",
    ],
  },
  {
    id: "brand-positioning-cro",
    number: "05",
    title: "Brand Positioning & CRO",
    description:
      "We optimize your customer journey to increase conversion rate, average order value (AOV), and customer lifetime value.",
    imageUrl: "/services/service1.png", // Place custom image URL here
    keyBenefits: [
      "High-converting product page & cart upsell architecture",
      "Data-driven friction reduction and heat map analysis",
      "Compelling offer positioning and value stack messaging",
      "Continuous A/B testing that extracts more revenue from traffic",
    ],
    processSteps: [
      { step: "01", title: "Analyze", desc: "Heatmaps, drop-off points & user sessions." },
      { step: "02", title: "Hypothesize", desc: "Data-backed CRO & offer improvements." },
      { step: "03", title: "Execute", desc: "Deploy high-converting tests & redesigns." },
      { step: "04", title: "Scale", desc: "Lock in conversion gains and scale traffic." },
    ],
    deliverables: [
      "Product Page Optimization",
      "Cart & Checkout CRO",
      "Offer & Bundle Positioning",
      "AOV Enhancement Strategy",
      "A/B Testing Framework",
    ],
  },
];

function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);

  return (
    <main className="min-h-screen bg-ink text-paper selection:bg-[#ed1238] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section with Ambient Red Shadow */}
      <section className="relative z-10 bg-ink pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[800px] max-w-full rounded-full bg-[#ed1238]/15 blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ed1238]/10 via-transparent to-transparent" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <span className="eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold">
            ( SERVICES )
          </span>
          <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] max-w-5xl">
            Services designed<br />for e-commerce<br />growth.
          </h1>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-paper/70 font-normal">
            We help DTC brands scale through Shopify experiences, paid acquisition systems, e-commerce SEO, creative strategy, and conversion optimization.
          </p>
        </div>
      </section>

      {/* Quick Sub-Navigation Bar */}
      <nav className="sticky top-20 z-40 border-y border-white/10 bg-[#0a0b0a]/95 backdrop-blur-xl py-4 px-6">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 text-xs font-mono tracking-wide">
          {servicesData.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              onClick={() => setActiveTab(service.id)}
              className={`transition-colors duration-200 hover:text-white flex items-center ${activeTab === service.id ? "text-[#ed1238] font-bold" : "text-paper/70"
                }`}
            >
              <span className="text-paper/40 font-mono mr-2">{service.number}</span>
              <span className="truncate">{service.title}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Detailed Services Sections (Top-Aligned Image & 2x2 Process Table) */}
      <section className="relative z-10 bg-ink py-16 lg:py-24 space-y-24 lg:space-y-36">
        {servicesData.map((service, index) => {
          const isImageLeft = index % 2 === 0;

          return (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-36 mx-auto max-w-6xl px-6"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${isImageLeft ? "" : "lg:grid-flow-dense"
                  }`}
              >
                {/* ── IMAGE / VISUAL SHOWCASE CARD (Top-Aligned) ─────────────── */}
                <div className={`${isImageLeft ? "" : "lg:col-start-2"} sticky top-36`}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/15 bg-[#101210] p-6 sm:p-8 shadow-2xl flex flex-col justify-between group">
                    {service.imageUrl ? (
                      <>
                        <Image
                          src={service.imageUrl}
                          alt={service.title}
                          fill
                          unoptimized
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/80" />
                        <div className="absolute inset-0 bg-dots opacity-20" />

                        <div className="absolute inset-x-6 top-6 bottom-20 font-mono text-[10px] text-paper/20 overflow-hidden leading-relaxed pointer-events-none select-none">
                          <p>&lt;?php // Technostripe {service.title} engine ?&gt;</p>
                          <p>class {service.id.replace(/-/g, "_")} &#123;</p>
                          <p>&nbsp;&nbsp;public function scaleDTC() &#123;</p>
                          <p>&nbsp;&nbsp;&nbsp;&nbsp;return roas_and_conversions();</p>
                          <p>&nbsp;&nbsp;&#125;</p>
                          <p>&#125;</p>
                        </div>
                      </>
                    )}

                    <div className="relative z-10 font-mono text-xs font-bold tracking-widest text-paper/70 uppercase">
                      {service.number} / CORE SERVICE
                    </div>

                    <div className="relative z-10">
                      <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* ── CONTENT BOX (Starts from Title) ────────────────────── */}
                <div className={isImageLeft ? "" : "lg:col-start-1"}>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-base sm:text-lg leading-relaxed text-paper/75 font-normal">
                    {service.description}
                  </p>

                  {/* KEY BENEFITS */}
                  <div className="mt-8">
                    <p className="font-mono text-xs font-bold tracking-[0.25em] text-[#ed1238] uppercase mb-4">
                      KEY BENEFITS
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.keyBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-paper/85">
                          <span className="text-[#ed1238] font-bold shrink-0 mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PROCESS 2x2 Table */}
                  <div className="mt-10">
                    <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#ed1238] uppercase mb-4 block">
                      PROCESS
                    </span>
                    <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
                      <div className="grid grid-cols-1 sm:grid-cols-2">
                        {service.processSteps.map((step, idx) => {
                          const isTopRow = idx < 2;
                          const isLeftCol = idx % 2 === 0;

                          return (
                            <div
                              key={step.step}
                              className={`p-6 sm:p-7 ${isTopRow ? "sm:border-b border-white/10" : ""
                                } ${isLeftCol ? "sm:border-r border-white/10" : ""
                                } border-b last:border-b-0 sm:last:border-b-0 border-white/10`}
                            >
                              <span className="font-mono text-xs text-paper/40 font-medium">
                                {step.step}
                              </span>
                              <h4 className="mt-2 font-display text-xl font-bold text-white tracking-tight">
                                {step.title}
                              </h4>
                              <p className="mt-2 text-sm text-paper/60 leading-relaxed font-normal">
                                {step.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* DELIVERABLES */}
                  <div className="mt-8">
                    <p className="font-mono text-xs font-bold tracking-[0.25em] text-[#ed1238] uppercase mb-3">
                      DELIVERABLES
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-paper/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-9">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-7 py-3.5 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.5)] cursor-pointer"
                    >
                      Start this project
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Pre-Footer CTA */}
      <CTASection />

      {/* Shared Footer */}
      <Footer />
    </main>
  );
}
