"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CTASection from "../../components/CTASection";
import { caseStudies } from "../case-studies/constants";

// Collect unique categories
const allCategories = ["All", ...Array.from(new Set(caseStudies.map((s) => s.category)))];

// Color map for category tags
const categoryColors: Record<string, string> = {
  "E-commerce Website Development": "#22c55e",
  "Creative & Brand CRO": "#a855f7",
  "E-commerce Scaling & Operations": "#f59e0b",
  "Paid Ads & Conversion Optimization": "#ed1238",
};

function getCategoryColor(category: string) {
  return categoryColors[category] ?? "#ed1238";
}

const SKIP_METRIC_LABELS = new Set([
  "Brand Focus", "Founded", "Made In", "Brand Roots", "Focus",
]);

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = caseStudies[0];
  const filteredStudies = caseStudies.filter((s) =>
    activeCategory === "All" ? true : s.category === activeCategory
  );
  const gridStudies = filteredStudies.slice(activeCategory === "All" ? 1 : 0);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0a0b0a] pt-28 pb-24 sm:pt-36">
        {/* Hero Header */}
        <section className="relative overflow-hidden px-4 sm:px-8 lg:px-12 pb-12">
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(ellipse at center, rgba(237,18,56,0.4) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
          <div className="mx-auto max-w-7xl relative z-10">
            <p className="eyebrow text-[#ed1238] mb-4 tracking-[0.3em]">( Portfolio )</p>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl text-white mb-5 leading-[0.95]"
              style={{ fontFamily: "var(--font-display-family)", fontWeight: 800, letterSpacing: "-0.04em" }}
            >
              Work that delivers<br />
              <span className="text-[#ed1238]">real growth.</span>
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-xl leading-relaxed">
              Explore how we engineer high-converting Shopify stores, deploy profitable ad funnels,
              and scale D2C brands across India, UK &amp; US.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

          {/* Featured Card */}
          {activeCategory === "All" && featured && (
            <Link
              href={`/portfolio/${featured.slug}`}
              className="group mb-10 flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-white/10 bg-[#111211] transition-all duration-300 hover:border-[#ed1238]/40 hover:shadow-[0_0_40px_rgba(237,18,56,0.12)]"
            >
              <div className="relative sm:w-[45%] shrink-0 overflow-hidden">
                <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full w-full overflow-hidden" style={{ minHeight: 260 }}>
                  {/* Default: Image */}
                  <Image
                    src={featured.coverImage}
                    alt={featured.projectName}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 45vw"
                    priority
                  />
                  <div className="absolute top-4 left-4 z-10 font-mono text-[11px] font-bold tracking-widest text-white/90 uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-md">
                    Featured
                  </div>

                  {/* Hover: Red branded card */}
                  <div className="absolute inset-0 z-20 bg-[#ed1238] p-6 sm:p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25 pointer-events-none" />
                    <div className="absolute -top-16 -right-16 size-52 rounded-full bg-white/20 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.45)_0%,transparent_65%)] pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between font-mono text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
                      <span>Featured</span>
                      <span className="inline-block size-2 rounded-full bg-white/80 animate-pulse" />
                    </div>
                    <div className="pointer-events-none absolute -bottom-5 -right-5 sm:-bottom-7 sm:-right-7 z-0">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-black/20 blur-2xl transform scale-110" />
                        <Image src="/favicon.png" alt="Technostripe" width={260} height={260} unoptimized className="size-36 sm:size-48 object-contain opacity-25 mix-blend-screen transition-all duration-700 group-hover:opacity-45 group-hover:scale-110 group-hover:rotate-6" />
                      </div>
                    </div>
                    <div className="relative z-10 max-w-[85%] pt-6">
                      <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-[1.05] tracking-tight drop-shadow-sm">
                        {featured.projectName}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between p-7 sm:p-10 sm:w-[55%]">
                <div>
                  <span
                    className="inline-block rounded-full px-3 py-0.5 text-[0.65rem] font-mono font-bold tracking-widest uppercase mb-4"
                    style={{
                      backgroundColor: `${getCategoryColor(featured.category)}22`,
                      color: getCategoryColor(featured.category),
                    }}
                  >
                    {featured.category}
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold leading-tight mb-4 group-hover:text-[#ff4d6d] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-display-family)", letterSpacing: "-0.03em" }}
                  >
                    {featured.caseStudyTitle ?? featured.projectName}
                  </h2>
                  <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-6 max-w-lg">
                    {featured.description}
                  </p>
                  {featured.metrics && featured.metrics.length > 0 && !SKIP_METRIC_LABELS.has(featured.metrics[0].label) && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {featured.metrics.slice(0, 3).map((m) => (
                        <div key={m.label} className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                          <p className="text-[0.6rem] font-mono uppercase tracking-wider text-white/40">{m.label}</p>
                          <p className="text-sm font-bold text-white mt-0.5">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[0.75rem] font-mono font-bold tracking-[0.14em] uppercase text-[#ed1238] group-hover:text-[#ff4d6d] transition-colors">
                  View Case Study
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-4 transition-transform duration-300 group-hover:translate-x-1.5">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          )}

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allCategories.map((cat) => {
              const isActive = activeCategory === cat;
              const color = cat === "All" ? "#ed1238" : getCategoryColor(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-4 py-1.5 text-[0.7rem] font-mono font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: isActive ? color : "rgba(255,255,255,0.05)",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                    border: `1.5px solid ${isActive ? color : "rgba(255,255,255,0.1)"}`,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Portfolio Grid */}
          {gridStudies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32">
              <p className="text-white/30 font-mono text-sm tracking-widest uppercase">No projects found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridStudies.map((study) => {
                const tagColor = getCategoryColor(study.category);
                const showMetrics =
                  study.metrics &&
                  study.metrics.length > 0 &&
                  !SKIP_METRIC_LABELS.has(study.metrics[0].label);

                return (
                  <Link
                    key={study.slug}
                    href={`/portfolio/${study.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111211] transition-all duration-300 hover:border-[#ed1238]/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(237,18,56,0.12)]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      {/* Default: Image */}
                      <Image
                        src={study.coverImage}
                        alt={study.projectName}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 z-10 font-mono text-[10px] font-bold tracking-widest text-white/90 uppercase px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-md">
                        {study.category.split(" ")[0]}
                      </div>

                      {/* Hover: Red branded card */}
                      <div className="absolute inset-0 z-20 bg-[#ed1238] p-5 sm:p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25 pointer-events-none" />
                        <div className="absolute -top-12 -right-12 size-40 rounded-full bg-white/20 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.45)_0%,transparent_65%)] pointer-events-none" />
                        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
                          <span>{study.category.split(" ")[0]}</span>
                          <span className="inline-block size-1.5 rounded-full bg-white/80 animate-pulse" />
                        </div>
                        <div className="pointer-events-none absolute -bottom-4 -right-4 z-0">
                          <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-black/20 blur-2xl transform scale-110" />
                            <Image src="/favicon.png" alt="Technostripe" width={200} height={200} unoptimized className="size-28 sm:size-32 object-contain opacity-25 mix-blend-screen transition-all duration-700 group-hover:opacity-45 group-hover:scale-110 group-hover:rotate-6" />
                          </div>
                        </div>
                        <div className="relative z-10 max-w-[90%] pt-4">
                          <h3 className="font-display text-lg sm:text-xl font-black text-white leading-[1.1] tracking-tight drop-shadow-sm">
                            {study.projectName}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <span className="text-[0.62rem] font-mono uppercase tracking-widest text-white/35 mb-1.5">
                        {study.projectName}
                      </span>
                      <h3
                        className="text-lg sm:text-xl text-white font-bold leading-snug mb-3 group-hover:text-[#ff4d6d] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-display-family)", letterSpacing: "-0.025em" }}
                      >
                        {study.caseStudyTitle ?? study.projectName}
                      </h3>
                      <p className="text-[0.8rem] text-white/50 leading-relaxed line-clamp-2 mb-4 flex-1">
                        {study.description}
                      </p>
                      {showMetrics && (
                        <div className="flex gap-4 mb-4 pb-4 border-b border-white/[0.08]">
                          {study.metrics!.slice(0, 2).map((m) => (
                            <div key={m.label}>
                              <p className="text-[0.58rem] font-mono uppercase tracking-wider text-white/35">{m.label}</p>
                              <p className="text-sm font-bold text-white">{m.value}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-[0.7rem] font-mono font-bold tracking-[0.12em] uppercase text-white/40 group-hover:text-[#ed1238] transition-colors duration-300 mt-auto pt-1">
                        View Case Study
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1">
                          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-20">
            <CTASection variant="portfolio" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
