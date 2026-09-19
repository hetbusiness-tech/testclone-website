"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden mr-[0.26em] last:mr-0 align-top"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0, filter: "blur(4px)" }}
              animate={
                isInView
                  ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                  : { y: "110%", opacity: 0, filter: "blur(4px)" }
              }
              transition={{
                duration: 0.55,
                delay: delay + index * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}

// ───────────────────────────────────────────────────────────────────────
// Variant config — unique content & visual style per page
// ───────────────────────────────────────────────────────────────────────
const variantConfig = {
  home: {
    eyebrow: "( START SCALING )",
    heading: "Ready to scale your e-commerce brand?",
    subtext:
      "Let's build a growth system designed for profitable scale. Book a free growth call with our team and let's map your roadmap.",
    button: "Book Free Growth Call",
  },
  services: {
    eyebrow: "( FIND YOUR LEVERAGE )",
    heading: "Which service will move the needle?",
    subtext:
      "Tell us where you want to grow. We will match the right service system to your next measurable win.",
    button: "Book a Service Consultation",
  },
  about: {
    eyebrow: "( LET'S CONNECT )",
    heading: "We'd love to hear your story.",
    subtext:
      "Whether you're starting fresh or scaling past ₹1 Cr/month — let's talk about where you want to go and how we can help.",
    button: "Start a Conversation",
  },
  portfolio: {
    eyebrow: "( YOUR TURN )",
    heading: "Want results like these?",
    subtext:
      "Every case study starts with a single call. Book your free 30-minute strategy audit — we'll map what's possible for your brand.",
    button: "Book Strategy Audit",
  },
  insights: {
    eyebrow: "( STOP READING, START DOING )",
    heading: "Put these insights to work.",
    subtext:
      "Enough theory — let's apply it to your store. Get a free teardown of your funnel, ads, or site speed from our senior team.",
    button: "Get a Free Teardown",
  },
};

type CTAVariant = keyof typeof variantConfig;

type CTASectionProps = {
  variant?: CTAVariant;
  /** @deprecated Use `variant` instead */
  buttonLabel?: string;
};

export default function CTASection({
  variant = "home",
  buttonLabel,
}: CTASectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px 0px" });
  const cfg = variantConfig[variant];
  const btnLabel = buttonLabel ?? cfg.button;

  // ─── HOME: gradient border + floating logo ────────────────────────
  if (variant === "home") {
    return (
      <section className="relative z-10 overflow-hidden bg-ink py-12 sm:py-16">
        <div className="max-w-6xl px-6 mx-auto">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#ed1238] bg-gradient-to-br from-ink-soft via-[#121412] to-ink p-8 shadow-[0_0_60px_-10px_rgba(237,18,56,0.4)] backdrop-blur-xl sm:p-14 lg:p-20"
          >
            <motion.div
              animate={{ rotate: [-12, -8, -12], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 opacity-35 mix-blend-screen sm:opacity-45"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 scale-125 transform rounded-full bg-[#ed1238]/30 blur-2xl" />
                <Image src="/favicon.png" width={280} height={280} unoptimized alt="Technostripe" className="h-48 w-48 object-contain sm:h-72 sm:w-72" />
              </div>
            </motion.div>
            <div className="relative z-10 max-w-2xl">
              <motion.span
                className="eyebrow font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238] sm:text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {cfg.eyebrow}
              </motion.span>
              <h2 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
                <AnimatedWords text={cfg.heading} delay={0.1} stagger={0.06} />
              </h2>
              <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-paper/70 sm:text-lg">
                <AnimatedWords text={cfg.subtext} delay={0.35} stagger={0.03} />
              </p>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                <Link href="https://calendly.com/techno-stripe/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-8 py-4 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_35px_rgba(237,18,56,0.6)] cursor-pointer">
                  {btnLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── SERVICES: red glass card ─────────────────────────────────────
  if (variant === "services") {
    return (
      <section className="relative z-10 overflow-hidden bg-ink py-12 sm:py-16">
        <div className="max-w-7xl px-6 mx-auto">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-[2rem] border border-[#ed1238]/70 bg-[linear-gradient(110deg,rgba(237,18,56,0.28),rgba(10,11,10,0.72)_48%,rgba(237,18,56,0.12))] px-8 py-14 shadow-[0_0_90px_-18px_rgba(237,18,56,0.9),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:px-14 sm:py-20 lg:px-20"
          >
            <motion.div
              animate={{ rotate: [-12, -8, -12], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 opacity-25 mix-blend-screen"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 scale-125 transform rounded-full bg-[#ed1238]/30 blur-2xl" />
                <Image src="/favicon.png" width={280} height={280} unoptimized alt="Technostripe" className="h-48 w-48 object-contain opacity-35 sm:h-72 sm:w-72" />
              </div>
            </motion.div>
            <div className="relative z-10 max-w-2xl">
              <motion.span
                className="eyebrow font-mono text-xs font-bold uppercase tracking-widest text-[#ff6b82] sm:text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                {cfg.eyebrow}
              </motion.span>
              <h2 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
                <AnimatedWords text={cfg.heading} delay={0.1} stagger={0.06} />
              </h2>
              <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-paper/75 sm:text-lg">
                <AnimatedWords text={cfg.subtext} delay={0.35} stagger={0.03} />
              </p>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                <Link href="https://calendly.com/techno-stripe/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-8 py-4 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_35px_rgba(237,18,56,0.75)] cursor-pointer">
                  {btnLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── ABOUT: modern tech-studio card with value highlights & booking box ───
  if (variant === "about") {
    return (
      <section className="relative z-10 overflow-hidden bg-ink py-10 sm:py-20">
        <div className="max-w-7xl px-4 sm:px-6 mx-auto">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-[#0d0e0d] p-5 sm:p-12 lg:p-16 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Background ambient lighting and dot pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[#ed1238]/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-[#ed1238]/20 blur-[100px]" />
            
            {/* Subtle floating logo watermark */}
            <motion.div
              animate={{ rotate: [-6, -2, -6], y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-10 right-10 opacity-10 hidden sm:block"
            >
              <Image
                src="/favicon.png"
                width={320}
                height={320}
                unoptimized
                alt=""
                className="h-64 w-64 object-contain"
              />
            </motion.div>

            {/* Top Status Bar */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 sm:pb-8 border-b border-white/10">
              <motion.span
                className="eyebrow font-mono text-[11px] sm:text-sm font-bold uppercase tracking-widest text-[#ed1238] flex items-center gap-2"
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block size-2 rounded-full bg-[#ed1238]" />
                {cfg.eyebrow}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] sm:text-xs font-mono text-emerald-400"
              >
                <span className="size-1.5 sm:size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Now Accepting New Brand Partnerships</span>
              </motion.div>
            </div>

            {/* Main 2-Column Content */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-6 sm:pt-10 items-center">
              {/* Left Column: Heading + Story + Value Pills */}
              <div className="lg:col-span-7">
                <h2 className="font-display text-2xl sm:text-4xl lg:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight text-white">
                  <AnimatedWords
                    text="Ready to write the next chapter of your brand's growth?"
                    delay={0.1}
                    stagger={0.045}
                  />
                </h2>
                <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/65 leading-relaxed max-w-xl font-normal">
                  <AnimatedWords
                    text="We don't operate like a conventional agency. We integrate directly as your high-velocity growth partners — data-driven, creative-first, and relentlessly focused on your bottom line."
                    delay={0.3}
                    stagger={0.02}
                  />
                </p>

                {/* Value Pillars */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3"
                >
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium text-white/80 backdrop-blur-sm">
                    <span className="text-[#ed1238]">⚡</span> Direct Founder Access
                  </div>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium text-white/80 backdrop-blur-sm">
                    <span className="text-[#ed1238]">🎯</span> Custom Scaling Roadmap
                  </div>
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium text-white/80 backdrop-blur-sm">
                    <span className="text-[#ed1238]">📈</span> 100% Performance Focused
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Interactive Booking Card */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(237,18,56,0.15)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-full bg-[#ed1238]/20 border border-[#ed1238]/40 flex items-center justify-center text-[#ed1238] shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4 sm:size-5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base sm:text-lg leading-[1.3] sm:leading-[1.25]">
                        Let&apos;s Start a Conversation
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/50 font-mono mt-1">
                        30-Min Strategy Consultation
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-5 sm:mb-6">
                    Tell us where your store is at, what bottlenecks you are facing, and let&apos;s map out a tailored roadmap for your brand.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="https://calendly.com/techno-stripe/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#ed1238] px-5 py-3.5 sm:px-6 sm:py-4 text-xs sm:text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_35px_rgba(237,18,56,0.6)] cursor-pointer"
                    >
                      <span className="leading-normal">{btnLabel}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>

                    <Link
                      href="/portfolio"
                      className="flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-white/15 bg-white/[0.02] px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-tight text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white cursor-pointer"
                    >
                      <span className="leading-normal">Explore Case Studies & Results</span>
                    </Link>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      Avg. Response &lt; 4 Hours
                    </span>
                    <span>No Obligations</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── PORTFOLIO: full-width red banner ─────────────────────────────
  if (variant === "portfolio") {
    return (
      <section className="relative z-10 overflow-hidden bg-ink py-12 sm:py-16">
        <div className="max-w-7xl px-6 mx-auto">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-[2.5rem] bg-[#ed1238] px-8 py-14 sm:px-14 sm:py-20 lg:px-20"
          >
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute -top-20 -left-20 size-60 rounded-full bg-white/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 size-52 rounded-full bg-black/25 blur-3xl pointer-events-none" />
            {/* Favicon watermark */}
            <motion.div
              animate={{ rotate: [8, 12, 8], scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-10 -right-10 sm:-bottom-14 sm:-right-14 opacity-15"
            >
              <Image src="/favicon.png" width={300} height={300} unoptimized alt="" className="h-52 w-52 sm:h-72 sm:w-72 object-contain" />
            </motion.div>
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.span
                className="eyebrow font-mono text-xs font-bold uppercase tracking-widest text-white/80 sm:text-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                {cfg.eyebrow}
              </motion.span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.98] tracking-tight text-white">
                <AnimatedWords text={cfg.heading} delay={0.1} stagger={0.06} />
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed max-w-xl mx-auto">
                <AnimatedWords text={cfg.subtext} delay={0.3} stagger={0.025} />
              </p>
              <motion.div
                className="mt-10 flex justify-center gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link href="https://calendly.com/techno-stripe/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold tracking-tight text-[#ed1238] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer">
                  {btnLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── INSIGHTS: minimal centered dark card ─────────────────────────
  return (
    <section className="relative z-10 overflow-hidden bg-ink py-12 sm:py-16">
      <div className="max-w-5xl px-6 mx-auto">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#161816] to-[#0e100e] px-8 py-14 sm:px-12 sm:py-16 text-center"
        >
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#ed1238]/50 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-16 bg-[#ed1238]/8 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.span
              className="eyebrow font-mono text-xs font-bold uppercase tracking-widest text-[#ed1238] sm:text-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {cfg.eyebrow}
            </motion.span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1] tracking-tight text-white">
              <AnimatedWords text={cfg.heading} delay={0.1} stagger={0.06} />
            </h2>
            <p className="mt-5 text-sm sm:text-base text-white/50 leading-relaxed max-w-lg mx-auto">
              <AnimatedWords text={cfg.subtext} delay={0.3} stagger={0.025} />
            </p>
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <Link href="https://calendly.com/techno-stripe/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-7 py-3.5 text-sm font-bold tracking-tight text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_30px_rgba(237,18,56,0.5)] cursor-pointer">
                {btnLabel}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="size-4"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

