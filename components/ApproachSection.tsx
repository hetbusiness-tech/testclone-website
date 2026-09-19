"use client";

import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Strategy first",
    desc: "We start with your business goals, not a template. Every decision traces back to a number that matters.",
  },
  {
    number: "02",
    title: "Designed to convert",
    desc: "Beautiful is table stakes. We engineer experiences that turn attention into action and visitors into customers.",
  },
  {
    number: "03",
    title: "Built to last",
    desc: "Fast, accessible, maintainable code on modern frameworks — so your investment keeps performing for years.",
  },
  {
    number: "04",
    title: "Optimised forever",
    desc: "Launch is the starting line. We test, measure, and refine so your results compound month over month.",
  },
];

export default function ApproachSection() {
  return (
    <section id="about" className="relative z-10 bg-[#f4f3ec] text-[#111111]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-16">
        {/* Pinned / Sticky Left Column */}
        <div className="lg:sticky lg:top-32 lg:self-start lg:max-w-md">
          <span className="eyebrow text-black/50 font-mono tracking-widest uppercase font-bold text-xs">
            ( THE APPROACH )
          </span>
          <h2 className="mt-6 font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-black tracking-tight text-black leading-[0.94]">
            How we{" "}
            <br />
            drive{" "}
            <br />
            growth
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-black/65 font-normal">
            A proven process that turns marketing from a cost centre into your most reliable growth engine.
          </p>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.4)]"
            >
              About the team
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Scrolling Right Column */}
        <div className="flex flex-col">
          {steps.map((step) => (
            <article
              key={step.number}
              className="flex items-start border-t border-black/15 py-10 sm:py-12 first:border-t-0"
            >
              <div className="grid w-full grid-cols-[auto_1fr] gap-6 sm:gap-10">
                <span className="pt-1 font-mono text-sm font-semibold text-black/40">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-black">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-base sm:text-lg leading-relaxed text-black/65 font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


