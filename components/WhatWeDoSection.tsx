"use client";

import AnimatedStats from "./AnimatedStats";
import TechTicker from "./TechTicker";

export default function WhatWeDoSection() {
  return (
    <section className="relative z-20 flex min-h-screen flex-col justify-between bg-ink">
      {/* Horizontal Tech/Service Strip from Image 2 */}
      <TechTicker />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16 sm:py-20 lg:py-24">
        <span className="eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold text-xs">
          ( WHAT WE DO )
        </span>
        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.05rem,4.6vw,4rem)] font-extrabold tracking-tight text-white leading-[1.04]">
          We build the websites,
          <br />
          apps, and growth
          <br />
          systems behind
          <br />
          ambitious e-commerce
          <br />
          brands.
        </h2>

        <div className="mt-auto pt-14">
          <div className="border-t border-white/15 pt-10 sm:pt-12">
            <AnimatedStats />
          </div>
        </div>
      </div>
    </section>
  );
}

