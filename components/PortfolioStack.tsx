"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface PortfolioProject {
  id: number;
  category: string;
  year: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  badge: string;
  accent: string;
  clientName: string;
}

const projects: PortfolioProject[] = [
  {
    id: 0,
    category: "Shopify Plus & CRO",
    year: "2024",
    title: "Scaling fashion DTC revenue with a bespoke conversion engine",
    tagline: "LuxeAura Fashion",
    description:
      "Engineered a high-speed Shopify Plus experience with bespoke one-click checkout, dynamic bundle builder, and mobile CRO that increased revenue by 310%.",
    tags: ["Shopify Plus", "Mobile CRO", "Bundle Engine", "Speed Score 99"],
    metric: "+310%",
    metricLabel: "Revenue Growth",
    badge: "Shopify Plus",
    accent: "#ed1238",
    clientName: "LuxeAura",
  },
  {
    id: 1,
    category: "Paid Acquisition & Funnels",
    year: "2025",
    title: "Scaling skincare brand to $4.2M through creative performance ads",
    tagline: "GlowBotanics Skincare",
    description:
      "Deployed high-converting UGC creative pipelines and multi-channel Meta & Google shopping funnels that reduced customer acquisition cost by 42%.",
    tags: ["Meta Ads", "Google Shopping", "UGC Creative", "Landing Pages"],
    metric: "$4.2M+",
    metricLabel: "Scaled Revenue",
    badge: "4.6x ROAS",
    accent: "#059669",
    clientName: "GlowBotanics",
  },
  {
    id: 2,
    category: "Creative & Brand CRO",
    year: "2025",
    title: "Higher conversions & higher AOV for premium luxury jewelry",
    tagline: "Aura Jewelry DTC",
    description:
      "Crafted founder-led video storytelling, interactive product visualizers, and seamless cart upsells that lifted average order value by $68.",
    tags: ["UGC Strategy", "AOV Optimization", "Reels & Ads", "Cart Upsells"],
    metric: "+48%",
    metricLabel: "AOV Lift",
    badge: "High AOV",
    accent: "#6d28d9",
    clientName: "Aura Jewelry",
  },
  {
    id: 3,
    category: "Subscriptions & Retention",
    year: "2025",
    title: "Automated subscription engine and retention workflows",
    tagline: "Vitalis Wellness DTC",
    description:
      "Integrated automated Recharge subscription flows, seamless customer portals, and SMS lifecycle campaigns delivering consistent compounding revenue.",
    tags: ["Recharge Subscriptions", "Email & SMS", "Retention CRO", "Shopify App"],
    metric: "18k+",
    metricLabel: "Monthly Subscribers",
    badge: "Recurring Scale",
    accent: "#c2410c",
    clientName: "Vitalis Wellness",
  },
];

function CardVisual({ project }: { project: PortfolioProject }) {
  return (
    <div className="relative flex h-full min-h-[200px] w-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-black/25 p-6 backdrop-blur-sm border border-white/10">
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-wider text-white">{project.badge}</span>
        </div>
        <span className="rounded-full bg-black/30 px-2.5 py-0.5 font-mono text-[11px] text-white/80">{project.year}</span>
      </div>

      <div className="relative z-10 my-4">
        <p className="text-xs uppercase tracking-wider text-white/70 font-mono">{project.metricLabel}</p>
        <p className="mt-1 font-display text-4xl sm:text-5xl font-extrabold text-white">{project.metric}</p>
      </div>

      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] text-white/70">
        <span>{project.tagline}</span>
        <span className="font-bold text-white/90">● Active Scaling</span>
      </div>
    </div>
  );
}

function StackCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: PortfolioProject;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const nextStart = (index + 1) * step;

  // Slide up into view
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), Math.min(1, start + step * 0.7)],
    [index === 0 ? "0%" : "105%", "0%"]
  );

  // When next cards stack on top, slightly scale down to show the "bunch" tab rim at top
  const scale = useTransform(
    scrollYProgress,
    [nextStart, Math.min(1, nextStart + step * 0.8)],
    [1, 0.94 - (total - 1 - index) * 0.02]
  );

  // Only fade content for cards that have a next card stacking on top.
  // Last card (index === total - 1) should ALWAYS stay fully visible.
  const isLastCard = index === total - 1;
  const contentOpacity = useTransform(
    scrollYProgress,
    isLastCard
      ? [0, 1] // last card: never fade — always 1
      : [nextStart, Math.min(0.99, nextStart + step * 0.35)],
    isLastCard
      ? [1, 1] // last card: locked at 1
      : [1, 0] // other cards: fade to 0 as next card covers them
  );

  return (
    <motion.article
      style={{
        y,
        scale,
        zIndex: index + 1,
        top: `${index * 16}px`,
      }}
      className="absolute inset-x-0 bottom-0 top-0 flex origin-top will-change-transform"
    >
      <div
        className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85)] border border-white/20"
        style={{ backgroundColor: project.accent, opacity: 1 }}
      >
        <motion.div
          style={{ opacity: contentOpacity }}
          className="grid h-full min-h-0 grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
        >
          <div className="flex min-h-0 flex-col justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-mono font-bold tracking-wider text-white">
                  {project.category}
                </span>
                <span className="font-mono text-[11px] font-bold text-white/90">
                  0{project.id + 1} / 0{total}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.1]">
                {project.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-white font-normal">
                {project.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/25 px-3 py-1 text-[11px] font-medium text-white shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/case-studies/${["luxeaura", "glowbotanics", "aura-jewelry", "vitalis-wellness"][project.id] || "luxeaura"}`}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold tracking-tight text-black transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
              >
                View Case Study
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-4">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="hidden min-h-[220px] lg:block h-full">
            <CardVisual project={project} />
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function PortfolioStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative z-10 bg-ink"
      style={{ height: `${projects.length * 115}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[4.25rem]">
        <div className="mx-auto mb-4 flex w-full max-w-5xl shrink-0 items-end justify-between gap-6 px-6 pt-4">
          <div>
            <span className="eyebrow text-[#ed1238] font-mono font-bold tracking-widest uppercase text-xs">
              ( PORTFOLIO )
            </span>
            <h2 className="mt-1 font-display text-3xl sm:text-5xl font-black tracking-tight text-paper">
              Work that delivers real growth.
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-paper/60 font-normal">
              High-conversion Shopify Plus builds, creative ad systems, and scalable e-commerce infrastructure.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden shrink-0 items-center rounded-full border border-white/25 px-5 py-2 text-xs font-medium text-white transition-all duration-200 hover:border-[#ed1238] hover:text-[#ed1238] sm:inline-flex"
          >
            View all work
          </Link>
        </div>

        <div className="relative mx-auto min-h-0 w-full max-w-5xl flex-1 px-6 pb-8">
          {projects.map((project, index) => (
            <StackCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

