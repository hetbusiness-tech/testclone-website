"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CTASection from "../../components/CTASection";

interface StatItem {
  numericValue: number;
  suffix: string;
  isDecimal?: boolean;
  label: string;
}

const statsData: StatItem[] = [
  { numericValue: 52, suffix: "+", label: "Brands" },
  { numericValue: 98, suffix: "%", label: "Avg. Store Speed Score" },
  { numericValue: 4.8, suffix: "/5", isDecimal: true, label: "Client satisfaction" },
  { numericValue: 5, suffix: "+Years", label: "Scaling D2C Brands" },
];

function StatCounter({ item, inView }: { item: StatItem; inView: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1600; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = item.numericValue * ease;
      setCurrent(val);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCurrent(item.numericValue);
      }
    };

    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [inView, item.numericValue]);

  const display = item.isDecimal
    ? current.toFixed(1)
    : Math.floor(current).toString();

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-black text-[#ed1238] tracking-tight tabular-nums whitespace-nowrap flex items-baseline gap-0.5">
        <span>{display}</span>
        <span className={item.suffix.length > 2 ? "text-xl xs:text-2xl sm:text-3xl lg:text-5xl" : ""}>
          {item.suffix}
        </span>
      </div>
      <p className="font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-wider text-paper/60 leading-tight">
        {item.label}
      </p>
    </div>
  );
}

const values = [
  {
    num: "01",
    title: "Innovation",
    desc: "We build with tomorrow's tools, today — so your brand stays ahead, not catching up.",
    highlight: false,
    dark: false,
  },
  {
    num: "02",
    title: "Transparency",
    desc: "Clear reporting, honest timelines, no jargon. You always know exactly where things stand.",
    highlight: true,
    dark: false,
  },
  {
    num: "03",
    title: "Results",
    desc: "Vanity metrics are easy. We optimise for the revenue and ROAS numbers that actually move your business.",
    highlight: false,
    dark: false,
  },
  {
    num: "04",
    title: "Partnership",
    desc: "We work as an extension of your team — invested in your outcomes, not just our deliverables.",
    highlight: false,
    dark: false,
  },
  {
    num: "05",
    title: "Continuous Improvement",
    desc: "Launch is the start. We test, learn, and refine so performance compounds over time.",
    highlight: false,
    dark: false,
  },
  {
    num: "06",
    title: "",
    desc: "",
    highlight: false,
    dark: true,
  },
];

const roadmap = [
  {
    year: "2022",
    title: "Where it all started",
    desc: "Technostripe is founded with a clear mission — help ambitious D2C brands build a powerful digital presence from the ground up.",
    side: "left",
  },
  {
    year: "2023",
    title: "Shopify specialisation",
    desc: "We went all-in on Shopify — building custom storefronts, Shopify Plus migrations, and high-converting theme development for fast-growing brands.",
    side: "right",
  },
  {
    year: "2024",
    title: "Paid ads expansion",
    desc: "Launched full-funnel performance marketing — scaling brands profitably with Meta Ads, Google Ads, and data-driven audience strategy.",
    side: "left",
  },
  {
    year: "2025",
    title: "Creative systems & CRO",
    desc: "Built an in-house UGC creative pipeline, video ad direction, and advanced CRO testing frameworks to compound brand growth.",
    side: "right",
  },
  // {
  //   year: "2026",
  //   title: "Global D2C scaling",
  //   desc: "Now partnering with high-ambition e-commerce brands across India, UK & US — engineering revenue, not just traffic.",
  //   side: "left",
  // },
];


export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const [teamImageUrl] = useState("/about.jpeg");

  return (
    <main className="min-h-screen bg-ink text-paper selection:bg-[#ed1238] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* ── 1. HERO SECTION (Ambient Red Shadow) ──────────────────────────── */}
      <section className="relative z-10 bg-ink pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[800px] max-w-full rounded-full bg-[#ed1238]/15 blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ed1238]/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <span className="eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold">
            ( ABOUT TECHNOSTRIPE )
          </span>
          <h1 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] max-w-5xl">
            Helping modern<br />e-commerce brands<br />grow better.
          </h1>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-paper/70 font-normal">
            Technostripe was built to help ambitious D2C brands scale through better creative, better customer experiences, and better performance systems.
          </p>
        </div>
      </section>

      {/* ── 2. AGENCY OBSESSION & TEAM PHOTO ──────────────────────────────── */}
      <section className="relative z-10 bg-ink py-16 lg:py-24 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">

            <div>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                We&apos;re an e-commerce growth partner obsessed with one thing: turning digital into measurable revenue for modern D2C brands.
              </h2>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] p-6 shadow-2xl flex flex-col justify-end group">
              {teamImageUrl ? (
                <>
                  <Image
                    src={teamImageUrl}
                    alt="Technostripe Team"
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-[#181a18] to-black" />
                  <div className="absolute inset-0 bg-dots opacity-30" />

                  <div className="absolute inset-0 flex items-center justify-center p-8 opacity-40">
                    <div className="w-full h-full border border-white/10 rounded-2xl flex flex-col justify-between p-6">
                      <div className="flex gap-2">
                        <div className="size-3 rounded-full bg-white/20" />
                        <div className="size-3 rounded-full bg-white/20" />
                        <div className="size-3 rounded-full bg-white/20" />
                      </div>
                      <div className="font-mono text-[11px] text-white/40 leading-relaxed">
                        &lt;Technostripe.Commerce /&gt;<br />
                        const team = ["Shopify Architects", "Media Buyers", "Creative Directors"];<br />
                        output.deliver("Profitable D2C Growth &gt; Vanity Metrics");
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="relative z-10 self-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                  D2C GROWTH PARTNER • GLOBAL
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. STATS BAR WITH SMOOTH COUNT-UP ─────────────────────────────── */}
      <section ref={statsRef} className="relative z-10 bg-ink py-10 sm:py-16 border-y border-white/10 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12">
            {statsData.map((stat, i) => (
              <StatCounter key={i} item={stat} inView={isStatsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE STAND FOR / CORE VALUES ─────────────────────────────── */}
      <section className="relative z-10 bg-[#f4f4ec] text-[#0a0b0a] py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14">
            <span className="eyebrow text-[#0a0b0a]/70 font-mono tracking-widest uppercase font-bold">
              ( CORE VALUES )
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0a0b0a] leading-tight">
              What we<br />stand for
            </h2>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item, idx) => {
              if (item.dark) {
                return (
                  <div
                    key={idx}
                    className="p-8 sm:p-10 bg-black text-white flex flex-col justify-center min-h-[220px]"
                  >
                    <p className="font-display text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                      Five principles.{" "}
                      <span className="text-[#ed1238]">One promise:</span> your growth, measured.
                    </p>
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className={`group p-8 sm:p-10 bg-white hover:bg-[#ed1238] transition-all duration-300 border-b border-black/10 ${idx % 3 !== 2 ? "lg:border-r" : ""
                    } ${idx >= 3 ? "lg:border-b-0" : ""} flex flex-col justify-between min-h-[220px] cursor-default`}
                >
                  <span className="font-mono text-xs font-bold text-black/40 group-hover:text-white/70 transition-colors duration-300">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-black text-[#0a0b0a] group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-black/65 group-hover:text-white/90 leading-relaxed font-normal transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. THE ROAD SO FAR / INTERACTIVE ROADMAP ──────────────────────── */}
      <section className="relative z-10 bg-ink py-24 lg:py-36 overflow-hidden border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-20">
            <span className="eyebrow text-[#ed1238] font-mono tracking-widest uppercase font-bold">
              ( OUR JOURNEY )
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
              The road so far
            </h2>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Background track line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/10" />

            {/* Red animated progress line */}
            <motion.div
              style={{ scaleY }}
              className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2.5px] -translate-x-1/2 bg-[#ed1238] origin-top shadow-[0_0_15px_#ed1238]"
            />

            <div className="space-y-12 sm:space-y-28 relative z-10">
              {roadmap.map((item, i) => {
                const isLeft = item.side === "left";

                return (
                  <div
                    key={item.year}
                    className={`flex items-center justify-between gap-6 w-full ${
                      isLeft ? "sm:flex-row-reverse" : "sm:flex-row"
                    }`}
                  >
                    {/* Desktop spacer */}
                    <div className="hidden sm:block w-1/2" />

                    {/* Timeline Dot */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1.1 }}
                        viewport={{ once: false, margin: "-100px" }}
                        className="size-3.5 sm:size-5 rounded-full bg-[#ed1238] ring-4 ring-[#0a0b0a] shadow-[0_0_12px_#ed1238]"
                      />
                    </div>

                    {/* Content Block */}
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`w-full pl-10 text-left ${
                        isLeft
                          ? "sm:w-1/2 sm:text-right sm:pr-12 sm:pl-0"
                          : "sm:w-1/2 sm:text-left sm:pl-12"
                      }`}
                    >
                      <span className="font-mono text-xs font-bold text-[#ed1238] tracking-widest uppercase">
                        {item.year}
                      </span>
                      <h3 className="mt-1 font-display text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p
                        className={`mt-1.5 sm:mt-2 text-xs sm:text-base text-paper/65 leading-relaxed font-normal max-w-sm ${
                          isLeft ? "sm:ml-auto sm:mr-0" : "sm:mr-auto sm:ml-0"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PRE-FOOTER CTA SECTION ──────────────────────────────────────── */}
      <CTASection variant="about" />

      {/* ── 7. FOOTER ──────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
