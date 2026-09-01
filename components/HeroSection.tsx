"use client";

import Link from "next/link";
import HeroInteractive, { AnimatedHeroTitle } from "./HeroInteractive";

export default function HeroSection() {
  return (
    <HeroInteractive>
      <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 flex-col px-6 pt-2 sm:pt-3">
        <span className="eyebrow mb-2 text-[#ed1238] font-mono tracking-widest uppercase font-bold text-xs">
          ( E-COMMERCE GROWTH PARTNER )
        </span>

        <AnimatedHeroTitle />

        <p className="hero-copy mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-paper/75">
          Technostripe helps modern DTC brands grow through conversion-focused Shopify experiences, paid ads, creative systems, and brand positioning.
        </p>

        <div className="hero-actions mt-7 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-7 py-3.5 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_30px_rgba(237,18,56,0.6)] cursor-pointer"
          >
            Book Free Strategy Call
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>

          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-transparent px-7 py-3.5 text-sm font-bold tracking-tight text-paper transition-all duration-300 hover:border-white/50 hover:bg-white/5"
          >
            View Our Work
          </Link>
        </div>

        <div className="mt-auto flex items-end justify-between pb-6 pt-8">
          <p className="text-xs sm:text-sm font-mono tracking-wide text-[#ed1238] opacity-90">
            scroll to explore
          </p>
          <div className="text-[#ed1238] animate-bounce" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 text-[#ed1238]"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </HeroInteractive>
  );
}

