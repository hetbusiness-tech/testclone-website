"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue, type MotionStyle } from "framer-motion";
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
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  accent: string;
  clientName: string;
  domain: string;
  imageUrl: string;
  textColor: string;
  mutedTextColor: string;
  surfaceColor: string;
  caseStudySlug: string;
}

const projects: PortfolioProject[] = [
  {
    id: 0,
    category: "Creative & Brand CRO",
    year: "2025",
    title: "A Shopify store designed to let the jewellery speak",
    tagline: "Matilda Jewellery",
    description:
      "A refined jewellery storefront rooted in Portuguese craft, small details, and pieces made to stay with you.",
    tags: ["Shopify Build", "Luxury UX", "Product Curation", "CRO"],
    metric: "LOCAL",
    metricLabel: "Made In Portugal",
    badge: "MATILDA",
    primaryColor: "#b88746",
    secondaryColor: "#f6efe6",
    bgColor: "#f6efe6",
    accent: "#b88746",
    clientName: "Matilda Jewellery",
    domain: "matildajewellery.com",
    imageUrl: "/portfolio/matilda-1.png",
    textColor: "#281e14",
    mutedTextColor: "rgba(40, 30, 20, 0.72)",
    surfaceColor: "rgba(40, 30, 20, 0.10)",
    caseStudySlug: "matilda-jewellery",
  },
  {
    id: 1,
    category: "E-commerce Website Development",
    year: "2025",
    title: "Surviving the biggest day of the year",
    tagline: "Linen Way",
    description:
      "A warm, editorial shopping experience that lets sustainable linen, wool, and alpaca textures lead the story.",
    tags: ["Shopify Build", "Editorial UX", "Collection CRO", "Brand System"],
    metric: "2002",
    metricLabel: "Founded In",
    badge: "Linen Way",
    primaryColor: "#386684",
    secondaryColor: "#f0ebe3",
    bgColor: "#f0ebe3",
    accent: "#386684",
    clientName: "Linen Way",
    domain: "linenway.com",
    imageUrl: "/portfolio/linen-1.png",
    textColor: "#1a2730",
    mutedTextColor: "rgba(26, 39, 48, 0.72)",
    surfaceColor: "rgba(26, 39, 48, 0.10)",
    caseStudySlug: "linen-way",
  },
  {
    id: 2,
    category: "E-commerce Website Development",
    year: "2025",
    title: "Turning questions into confident buyers",
    tagline: "Taneva",
    description:
      "A spray tanning tent brand that needed its store to answer the questions buyers had before they'd feel ready to purchase.",
    tags: ["Shopify Build", "PDP Decision Tools", "Visual Specs", "Conversion CRO"],
    metric: "UK & GLOBAL",
    metricLabel: "Market Reach",
    badge: "TANEVA",
    primaryColor: "#c26d2e",
    secondaryColor: "#f9ede0",
    bgColor: "#f9ede0",
    accent: "#c26d2e",
    clientName: "Taneva",
    domain: "taneva.co.uk",
    imageUrl: "/portfolio/taneva-1.png",
    textColor: "#2f1b0c",
    mutedTextColor: "rgba(47, 27, 12, 0.72)",
    surfaceColor: "rgba(47, 27, 12, 0.10)",
    caseStudySlug: "taneva",
  },
  {
    id: 3,
    category: "E-commerce Website Development",
    year: "2025",
    title: "When a better product still loses",
    tagline: "Experiment Beauty",
    description:
      "A beauty brand with a genuinely stronger product that needed a store fast and polished enough to actually compete.",
    tags: ["Shopify OS 2.0", "Active Skincare", "Under 1.5s Speed", "Frictionless PDP"],
    metric: "< 1.5s",
    metricLabel: "Mobile Speed",
    badge: "EXPERIMENT",
    primaryColor: "#7c3aed",
    secondaryColor: "#efe8fa",
    bgColor: "#efe8fa",
    accent: "#7c3aed",
    clientName: "Experiment Beauty",
    domain: "experimentbeauty.com",
    imageUrl: "/portfolio/exp-beauty-1.png",
    textColor: "#1e1136",
    mutedTextColor: "rgba(30, 17, 54, 0.72)",
    surfaceColor: "rgba(30, 17, 54, 0.10)",
    caseStudySlug: "experiment-beauty",
  },
  {
    id: 4,
    category: "E-commerce Scaling & Operations",
    year: "2025",
    title: "When success starts breaking the business",
    tagline: "Mana Drink",
    description:
      "A fast-growing energy drink brand that needed its backend operations to catch up with explosive order growth.",
    tags: ["Energy Drink", "Automated 3PL", "Real-Time Stock", "Fulfillment CRO"],
    metric: "REAL-TIME",
    metricLabel: "3PL Inventory Sync",
    badge: "MANA DRINK",
    primaryColor: "#228b3a",
    secondaryColor: "#e7f5ea",
    bgColor: "#e7f5ea",
    accent: "#228b3a",
    clientName: "Mana Drink",
    domain: "en.manayerbamate.com",
    imageUrl: "/portfolio/mana-1.png",
    textColor: "#0f2e16",
    mutedTextColor: "rgba(15, 46, 22, 0.72)",
    surfaceColor: "rgba(15, 46, 22, 0.10)",
    caseStudySlug: "mana-yerba-mate",
  },
];

function CardVisual({ project }: { project: PortfolioProject }) {
  return (
    <div className="group relative flex h-full w-full items-center justify-center py-1 px-2 xl:px-4">
      {/* Ambient background brand aura */}
      <div
        className="pointer-events-none absolute inset-2 rounded-3xl opacity-20 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${project.primaryColor} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex w-full max-w-[520px] items-center justify-center my-auto">
        <div className="relative w-full overflow-hidden rounded-xl border border-black/15 bg-[#fffafa] shadow-[0_18px_40px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-[1.015] sm:rounded-2xl">
          {/* Monitor Browser Header Bar */}
          <div
            className="flex h-7 items-center justify-between border-b px-3"
            style={{
              borderColor: project.surfaceColor,
              backgroundColor: project.surfaceColor,
            }}
          >
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-[#ff5f56]/85" />
              <div className="size-2.5 rounded-full bg-[#ffbd2e]/85" />
              <div className="size-2.5 rounded-full bg-[#27c93f]/85" />
            </div>
            {/* Minimal URL pill */}
            <div
              className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-mono shadow-sm"
              style={{ color: project.textColor, backgroundColor: project.bgColor }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-2.5 opacity-60">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-semibold">{project.domain}</span>
            </div>
            <div className="w-8" />
          </div>

          {/* Desktop Website Screen */}
          <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "16/10" }}>
            <img
              src={project.imageUrl}
              alt={`${project.clientName} desktop mockup`}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </div>

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

  // Slide up into view (Starts at 130% so other cards are completely hidden below until scroll)
  const y = useTransform(
    scrollYProgress,
    [start, Math.min(1, start + step * 0.65)],
    [index === 0 ? "0%" : "130%", "0%"]
  );

  // When next cards stack on top, dim background on desktop for depth
  const isLastCard = index === total - 1;
  const dimOpacity = useTransform(
    scrollYProgress,
    isLastCard ? [0, 1] : [nextStart, Math.min(1, nextStart + step * 0.4)],
    isLastCard ? [0, 0] : [0, 0.45]
  );

  // Fade body content when next card covers it
  const bodyOpacity = useTransform(
    scrollYProgress,
    isLastCard ? [0, 1] : [nextStart, Math.min(0.99, nextStart + step * 0.28)],
    isLastCard ? [1, 1] : [1, 0]
  );

  // Desktop stack offset: 16px per card.
  // Mobile stack offset: 0px so each card covers previous card with no top peek edges.
  const desktopStackOffset = 16;
  const desktopTopOffset = index * desktopStackOffset;
  const desktopCardHeight = `calc(100% - ${(total - 1) * desktopStackOffset - desktopStackOffset}px)`;

  return (
    <motion.article
      style={
        {
          y,
          zIndex: index + 1,
          "--desktop-top": `${desktopTopOffset}px`,
          "--desktop-height": desktopCardHeight,

        } as MotionStyle
      }
      className="portfolio-stack-card absolute inset-x-0 top-0 md:top-[var(--desktop-top)] h-full md:h-[var(--desktop-height)] flex will-change-transform"
    >
      <div
        className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-[16px] md:p-6 lg:p-8 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.2)] md:rounded-[2rem]"
        style={{
          backgroundColor: project.bgColor,
          borderColor: project.surfaceColor,
        }}
      >
        {/* Top Tab Strip */}
        <div
          className="relative z-20 flex shrink-0 items-center justify-between border-b pb-2 md:pb-3 mb-[14px] md:mb-3 font-mono text-xs"
          style={{ borderColor: project.surfaceColor, color: project.textColor }}
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] md:text-[11px] font-bold tracking-wider"
              style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
            >
              0{project.id + 1} / 0{total}
            </span>
            <span className="font-bold tracking-wide text-xs md:text-sm" style={{ color: project.textColor }}>
              {project.clientName}
            </span>
            <span className="hidden sm:inline opacity-50">•</span>
            <span className="hidden text-xs font-medium opacity-75 sm:inline">{project.category}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] md:text-[11px] font-semibold"
              style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
            >
              {project.badge}
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] md:text-[11px] opacity-80"
              style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* Card Main Body */}
        <motion.div
          style={{ opacity: bodyOpacity }}
          className="portfolio-card-body relative z-10 flex flex-col justify-start flex-1 min-h-0 lg:grid lg:grid-cols-[1.1fr_1.15fr] lg:gap-8 lg:items-center"
        >
          {/* Left Side Content */}
          <div className="flex min-w-0 flex-col shrink-0 justify-start md:shrink md:justify-center md:overflow-hidden">
            <div>
              <span
                className="inline-block rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] md:text-[11px] font-mono font-bold tracking-wider"
                style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
              >
                {project.category}
              </span>
              <h3
                className="mt-[12px] md:mt-3 min-w-0 font-display text-[1rem] md:text-2xl lg:text-3xl font-extrabold leading-[1.2] md:leading-[1.12] tracking-tight"
                style={{ color: project.textColor }}
              >
                {project.title}
              </h3>
              <p
                className="mt-[8px] md:mt-2.5 max-w-xl text-[0.76rem] md:text-sm lg:text-base font-normal leading-[1.5] md:leading-relaxed line-clamp-1 md:line-clamp-none"
                style={{ color: project.mutedTextColor }}
              >
                {project.description}
              </p>
            </div>
            <div className="mt-[16px] md:mt-5 flex flex-wrap items-center justify-between gap-[10px] md:flex-col md:items-start md:gap-3.5">
              <div className="flex flex-wrap gap-[10px] md:gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium shadow-sm"
                    style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/portfolio/${project.caseStudySlug}`}
                className="inline-flex w-fit shrink-0 items-center gap-1.5 md:gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 md:px-6 md:py-2.5 text-xs md:text-sm font-bold tracking-tight transition-all duration-200 hover:shadow-lg"
                style={{ color: "#ffffff", backgroundColor: project.textColor }}
              >
                <span>View Case Study</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3 md:size-4">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side Showcase (Desktop) */}
          <div className="hidden min-h-0 h-full min-w-0 items-center justify-center lg:flex">
            <CardVisual project={project} />
          </div>

          {/* Mobile: exact image aspect ratio (3:2) with zero cropping and 18px top gap */}
          <div className="relative w-full shrink-0 overflow-hidden rounded-xl border border-black/15 shadow-sm mt-[18px] lg:hidden aspect-[3/2]">
            <img
              src={project.imageUrl}
              alt={`${project.clientName} preview`}
              className="block w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>

        {/* Dimming overlay (hidden on mobile to prevent peek artifacts) */}
        <motion.div
          style={{ opacity: dimOpacity }}
          className="portfolio-card-dim pointer-events-none absolute inset-0 z-30 hidden md:block rounded-[2rem] bg-black/40 transition-colors"
        />
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
      className="portfolio-stack-root relative z-10 bg-ink"
      style={{ height: `${projects.length * 115}vh` }}
    >
      <div className="portfolio-stack-shell sticky top-0 flex h-[100dvh] h-[100svh] w-full flex-col justify-between overflow-hidden pt-[72px] pb-4 md:pt-[4.25rem] md:pb-8">
        <div className="mx-auto mb-[18px] md:mb-6 flex w-full max-w-6xl shrink-0 items-end justify-between gap-4 px-4 md:px-6 pt-0 md:pt-3">
          <div>
            <span className="eyebrow text-[#ed1238] font-mono font-bold tracking-widest uppercase text-xs">
              ( PORTFOLIO )
            </span>
            <h2 className="mt-1 font-display text-[1.85rem] md:text-5xl font-black tracking-tight text-paper leading-[1.05] md:leading-none">
              Work that delivers real growth.
            </h2>
            <p className="mt-2 md:mt-1 text-xs md:text-sm text-paper/70 md:text-paper/60 font-normal leading-relaxed md:leading-normal line-clamp-2 md:line-clamp-none">
              High-conversion Shopify Plus builds, creative ad systems, and scalable e-commerce infrastructure.
            </p>
            <div className="mt-3.5 mb-1 md:hidden">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-black/30 bg-black/5 px-5 py-2.5 text-[13px] font-bold text-black shadow-sm transition-all hover:bg-black hover:text-white"
              >
                <span>View all work</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <Link
            href="/portfolio"
            className="hidden shrink-0 items-center rounded-full border border-black/25 px-5 py-2 text-xs font-medium text-black transition-all duration-200 hover:border-[#ed1238] hover:text-[#ed1238] md:inline-flex"
          >
            View all work
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-3 md:px-6 flex-1 min-h-0 max-h-[min(480px,calc(100svh-145px))] md:max-h-none md:flex-1 md:pb-0">
          <div className="relative h-full w-full overflow-hidden">
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
      </div>
    </section>
  );
}

