"use client";

import Link from "next/link";
import HeroInteractive, { AnimatedHeroTitle } from "./HeroInteractive";

export default function HeroSection() {
  return (
    <HeroInteractive>
      <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 flex-col justify-between px-4 sm:px-8 lg:px-12 pt-2 pb-4">

        {/* Top & Main Content Block */}
        <div className="flex flex-col gap-3 sm:gap-4 my-auto">
          {/* Row 1: Eyebrow Badge */}
          <div>
            <span className="eyebrow inline-block text-[#ed1238] font-mono tracking-widest uppercase font-bold text-[10px] sm:text-xs md:text-sm">
              ( E-COMMERCE GROWTH PARTNER )
            </span>
          </div>

          {/* Row 2: 2-Line Hero Title */}
          <div>
            <AnimatedHeroTitle />
          </div>

          {/* Row 3: Description & Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl pt-1">
            <p className="hero-copy text-sm sm:text-base md:text-lg leading-relaxed text-paper/80 font-normal max-w-xs sm:max-w-xl">
              Technostripe helps modern DTC brands grow through conversion-focused Shopify experiences, paid ads, creative systems, and brand positioning.
            </p>

            <div className="hero-actions flex flex-row flex-wrap items-center gap-3 sm:gap-4 pt-0.5">
              <Link
                href="https://calendly.com/techno-stripe/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-5 py-2.5 sm:px-7 sm:py-3.5 text-sm sm:text-base font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_30px_rgba(237,18,56,0.6)] cursor-pointer whitespace-nowrap"
              >
                Book Free Strategy Call
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4 sm:size-5">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>

              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-transparent px-5 py-2.5 sm:px-7 sm:py-3.5 text-sm sm:text-base font-bold tracking-tight text-paper transition-all duration-300 hover:border-white/50 hover:bg-white/5 whitespace-nowrap"
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
          className="group/scroll flex items-end justify-between pt-2 pb-1 cursor-pointer select-none opacity-80 transition-all duration-300 hover:opacity-100"
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

