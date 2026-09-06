"use client";

import { useRef } from "react";

const testimonials = [
  {
    name: "James Whitaker",
    stars: 5,
    quote:
      "Technostripe completely transformed our Shopify Plus store and ad strategy. The store feels luxury, our mobile conversion rate jumped by 3.2%, and paid ads became much more scalable.",
  },
  {
    name: "Emily Harrington",
    stars: 5,
    quote:
      "Their UGC creative pipeline and Meta ad funnels are unmatched. We scaled from $40k/mo to over $350k/mo in profitable revenue within 5 months.",
  },
  {
    name: "Oliver Bennett",
    stars: 5,
    quote:
      "Unlike generic IT companies, Technostripe truly understands DTC metrics, AOV, and customer funnels. Best growth agency we’ve partnered with.",
  },
  {
    name: "Charlotte Hayes",
    stars: 5,
    quote:
      "From custom Recharge subscription setup to high-converting product pages, they executed with extreme speed and zero bloat.",
  },
  {
    name: "William Parker",
    stars: 5,
    quote:
      "Our store speed score went from 42 to 99, and cart abandonment dropped by 38%. The revenue results speak for themselves.",
  },
];

export default function TestimonialsMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

      <div
        ref={scrollerRef}
        className="flex w-max gap-6 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]"
      >
        {[...testimonials, ...testimonials].map((item, idx) => (
          <div
            key={idx}
            className="w-[min(86vw,360px)] sm:w-[420px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 backdrop-blur-sm transition-colors hover:border-[#ed1238]/40 hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-1 text-[#ed1238]">
              {Array.from({ length: item.stars }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-paper/80 font-normal italic">
              &ldquo;{item.quote}&rdquo;
            </p>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="font-display text-sm font-bold text-white">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
