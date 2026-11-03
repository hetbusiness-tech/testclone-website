import React from "react";
import type { DeepContentPayload } from "../lib/deep-seo-content";

interface Props {
  content: DeepContentPayload;
  cityName: string;
  keyword: string;
  serviceGroup: string;
}

export default function DeepSeoContentSection({
  content,
  cityName,
  keyword,
  serviceGroup,
}: Props) {
  return (
    <div className="space-y-16 sm:space-y-24 mt-16 sm:mt-24 border-t border-black/10 pt-16 sm:pt-24">
      {/* ── 1. STRATEGIC EXECUTIVE ANALYSIS ── */}
      <section className="relative rounded-3xl border border-black/10 bg-black/[0.02] p-8 sm:p-12 lg:p-16">
        <div className="max-w-4xl space-y-6">
          <p className="text-[0.65rem] font-mono tracking-[0.25em] uppercase text-[#ed1238]">
            Executive Strategic Analysis · {cityName}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black">
            Scaling Modern D2C Storefronts: The Reality of {keyword} in {cityName}
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-black/75 leading-relaxed font-sans whitespace-pre-line">
            {content.executiveSummary}
          </div>
        </div>
      </section>

      {/* ── 2. TECHNICAL ARCHITECTURE PILLARS ── */}
      <section className="space-y-10">
        <div className="max-w-3xl">
          <p className="text-[0.65rem] font-mono tracking-[0.25em] uppercase text-[#ed1238] mb-3">
            Core Engineering Standard
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black">
            4 Technical Pillars Powering Our {keyword} Architecture
          </h2>
          <p className="mt-4 text-base text-black/60 leading-relaxed">
            Every store we touch is engineered from the protocol layer up. We avoid off-the-shelf theme bloat in favor of sub-second execution, conversion rigor, and deterministic analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.architecturePillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-black/10 bg-white p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:border-[#ed1238]/30 transition-colors"
            >
              <div>
                <span className="font-mono text-xs text-[#ed1238] font-bold tracking-wider">
                  PILLAR 0{idx + 1}
                </span>
                <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-black tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs font-mono text-black/40">
                  {pillar.subtitle}
                </p>
                <p className="mt-4 text-sm sm:text-base text-black/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-black/8 space-y-2.5">
                {pillar.points.map((pt) => (
                  <div key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-black/80">
                    <span className="text-[#ed1238] font-bold shrink-0">✦</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. LOCAL MARKET DYNAMICS ── */}
      <section className="rounded-3xl border border-black/10 bg-gradient-to-br from-black/[0.03] to-transparent p-8 sm:p-12 lg:p-14">
        <div className="max-w-4xl space-y-5">
          <div className="flex items-center gap-3">
            <span className="size-2.5 rounded-full bg-[#ed1238] animate-pulse" />
            <p className="text-[0.65rem] font-mono tracking-[0.25em] uppercase text-black/50">
              Regional Commercial Teardown · {cityName}
            </p>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black">
            Consumer Behavior & Commercial Dynamics in {cityName}
          </h2>
          <p className="text-base sm:text-lg text-black/75 leading-relaxed font-sans">
            {content.localMarketDynamics}
          </p>
        </div>
      </section>

      {/* ── 4. 6-PHASE EXECUTION ROADMAP ── */}
      <section className="space-y-8">
        <div className="max-w-3xl">
          <p className="text-[0.65rem] font-mono tracking-[0.25em] uppercase text-[#ed1238] mb-3">
            Deployment Methodology
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black">
            Our 6-Phase {keyword} Execution Roadmap
          </h2>
          <p className="mt-3 text-base text-black/60 leading-relaxed">
            From Day 1 audit through post-launch conversion rate optimization, every sprint is managed with complete transparency, version-controlled code, and weekly milestone demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.executionRoadmap.map((stage) => (
            <div
              key={stage.phase}
              className="rounded-2xl border border-black/10 bg-white p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#ed1238] tracking-widest uppercase">
                    {stage.phase}
                  </span>
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded-full bg-black/5 text-black/60">
                    {stage.duration}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-black tracking-tight">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm text-black/65 leading-relaxed">
                  {stage.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. HIRING EVALUATION MATRIX ── */}
      <section className="rounded-3xl border border-black/10 bg-black/[0.02] p-8 sm:p-12 lg:p-14 space-y-8">
        <div className="max-w-3xl">
          <p className="text-[0.65rem] font-mono tracking-[0.25em] uppercase text-[#ed1238] mb-2">
            Procurement & Diligence
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black">
            What to Demand When Hiring for {keyword} in {cityName}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-black/60">
            Before retaining any digital or engineering agency in {cityName}, ensure their scope passes these 4 non-negotiable standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.hiringGuide.map((item) => (
            <div
              key={item.criterion}
              className="rounded-2xl border border-black/10 bg-white p-6 sm:p-7 space-y-3"
            >
              <h3 className="font-display text-base sm:text-lg font-bold text-black">
                {item.criterion}
              </h3>
              <p className="text-xs sm:text-sm text-black/65 leading-relaxed">
                <strong className="text-black/90">Why it matters:</strong> {item.whyItMatters}
              </p>
              <div className="rounded-xl bg-black/[0.03] p-3.5 text-xs text-black/80 font-mono leading-relaxed border border-black/5">
                {item.whatToAsk}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

