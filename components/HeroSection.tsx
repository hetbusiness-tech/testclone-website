"use client";

import Link from "next/link";
import HeroInteractive, { AnimatedHeroTitle } from "./HeroInteractive";

export default function HeroSection() {
  return (
    <HeroInteractive>
      <div className="mx-auto flex h-auto min-h-0 w-full max-w-6xl flex-none flex-col justify-between px-4 pt-0 pb-0 sm:h-full sm:flex-1 sm:px-8 sm:pt-2 sm:pb-4 lg:px-12">

        {/* Top & Main Content Block */}
        <div className="flex flex-col gap-4 pt-0 sm:gap-4 sm:pt-0 sm:my-auto">
          {/* Row 1: Eyebrow Badge */}
          <div>
            <span className="eyebrow inline-block text-[#ed1238] font-mono tracking-widest uppercase font-bold text-[10px] sm:text-xs md:text-sm">
              ( E-COMMERCE GROWTH PARTNER )
            </span>
          </div>

          {/* Row 2: 2-Line Hero Title */}
          <div className="mt-0.5 sm:mt-0">
            <AnimatedHeroTitle />
          </div>

          {/* Row 3: Description & Buttons */}
          <div className="flex max-w-4xl flex-col gap-4 pt-1 sm:gap-4">
            <p className="hero-copy max-w-xs text-[0.95rem] leading-[1.55] text-paper/80 font-normal sm:max-w-xl sm:text-base sm:leading-relaxed md:text-lg">
              Technostripe helps modern D2C brands grow through conversion-focused Shopify experiences, paid ads, creative systems, and brand positioning.
            </p>

            <div className="hero-actions flex flex-col items-start gap-3 pt-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="https://calendly.com/techno-stripe/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-[14.5rem] items-center justify-center gap-2 rounded-full bg-[#ed1238] px-6 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_30px_rgba(237,18,56,0.6)] cursor-pointer whitespace-nowrap sm:h-auto sm:w-auto sm:px-7 sm:py-3.5 sm:text-base"
              >
                Book Free Strategy Call
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4 sm:size-5">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex h-12 w-[11.5rem] items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent px-6 text-sm font-bold tracking-tight text-paper transition-all duration-300 hover:border-white/50 hover:bg-white/5 whitespace-nowrap sm:h-auto sm:w-auto sm:px-7 sm:py-3.5 sm:text-base"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator with Hover Reveal Effect */}
        <div
          onClick={() => {
            const el = document.getElementById("work");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group/scroll mt-10 flex items-end justify-between pt-1 pb-2 cursor-pointer select-none opacity-80 transition-all duration-300 hover:opacity-100 sm:mt-0 sm:pt-2 sm:pb-1"
        >
          <p className="text-xs sm:text-sm font-mono tracking-wide text-[#ed1238] transition-all duration-300 group-hover/scroll:text-[#ff3658] group-hover/scroll:translate-x-1">
            scroll to explore
          </p>
          <div className="text-[#ed1238] transition-all duration-300 group-hover/scroll:text-[#ff3658] group-hover/scroll:translate-y-1 animate-bounce" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 sm:size-6 text-[#ed1238] group-hover/scroll:text-[#ff3658]"
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

