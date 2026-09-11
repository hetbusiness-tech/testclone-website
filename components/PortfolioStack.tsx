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
    category: "E-commerce Website Development",
    year: "2024",
    title: "A calmer matcha ritual, built for everyday energy",
    tagline: "Mor Matcha",
    description:
      "A focused storefront for clean matcha energy, with product education and a direct path to the Mor'nin Blend.",
    tags: ["Shopify Build", "Product Storytelling", "CRO", "DTC Growth"],
    metric: "JAPAN",
    metricLabel: "Matcha Ritual",
    badge: "Mor Matcha",
    primaryColor: "#6d8f36",
    secondaryColor: "#e6f2be",
    bgColor: "#e6f2be",
    accent: "#6d8f36",
    clientName: "Mor Matcha",
    domain: "mormatcha.com",
    imageUrl: "/portfolio/mor-matcha.png",
    textColor: "#1c3015",
    mutedTextColor: "rgba(28, 48, 21, 0.72)",
    surfaceColor: "rgba(28, 48, 21, 0.10)",
    caseStudySlug: "mor-matcha",
  },
  {
    id: 1,
    category: "E-commerce Website Development",
    year: "2025",
    title: "Natural texture and quiet luxury for the home",
    tagline: "Linen Way",
    description:
      "A warm, editorial shopping experience that lets sustainable linen, wool, and alpaca textures lead the story.",
    tags: ["Shopify Build", "Editorial UX", "Collection CRO", "Brand System"],
    metric: "2002",
    metricLabel: "Founded In",
    badge: "Linen Way",
    primaryColor: "#386684",
    secondaryColor: "#f4eee6",
    bgColor: "#f2eee7",
    accent: "#386684",
    clientName: "Linen Way",
    domain: "linenway.com",
    imageUrl: "/portfolio/linen-way.png",
    textColor: "#1f2b34",
    mutedTextColor: "rgba(31, 43, 52, 0.72)",
    surfaceColor: "rgba(31, 43, 52, 0.10)",
    caseStudySlug: "linen-way",
  },
  {
    id: 2,
    category: "Creative & Brand CRO",
    year: "2025",
    title: "Meaningful jewellery with an intentionally simple point of view",
    tagline: "Matilda Jewellery",
    description:
      "A refined jewellery storefront rooted in Portuguese craft, small details, and pieces made to stay with you.",
    tags: ["Shopify Build", "Luxury UX", "Product Curation", "CRO"],
    metric: "LOCAL",
    metricLabel: "Made In Portugal",
    badge: "MATILDA",
    primaryColor: "#b88746",
    secondaryColor: "#f4eee5",
    bgColor: "#f4eee5",
    accent: "#b88746",
    clientName: "Matilda Jewellery",
    domain: "matildajewellery.com",
    imageUrl: "/portfolio/matilda-jewellery.png",
    textColor: "#261f18",
    mutedTextColor: "rgba(38, 31, 24, 0.72)",
    surfaceColor: "rgba(38, 31, 24, 0.10)",
    caseStudySlug: "matilda-jewellery",
  },
  {
    id: 3,
    category: "E-commerce Website Development",
    year: "2025",
    title: "Plant-based protection for the whole family",
    tagline: "Babo Botanicals",
    description:
      "A bright, approachable skincare experience that makes mineral SPF and botanical care easy to understand and choose.",
    tags: ["Shopify Build", "Product Education", "Mobile CRO", "Brand Growth"],
    metric: "15 YRS",
    metricLabel: "Rooted In Nature",
    badge: "Babo Botanicals",
    primaryColor: "#187a6c",
    secondaryColor: "#d8efe7",
    bgColor: "#d8efe7",
    accent: "#187a6c",
    clientName: "Babo Botanicals",
    domain: "babobotanicals.com",
    imageUrl: "/portfolio/babo-botanicals.png",
    textColor: "#10352f",
    mutedTextColor: "rgba(16, 53, 47, 0.72)",
    surfaceColor: "rgba(16, 53, 47, 0.10)",
    caseStudySlug: "babo-botanicals",
  },
];

function CardVisual({ project }: { project: PortfolioProject }) {
  return (
    <div className="group relative flex h-full w-full items-center justify-center py-2 px-3">
      {/* Ambient background brand aura */}
      <div
        className="pointer-events-none absolute inset-2 rounded-3xl opacity-20 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${project.primaryColor} 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex w-full max-w-[480px] items-end justify-start">
        {/* 1. Primary Desktop / Monitor Mockup */}
        <div className="relative z-10 w-[85%] overflow-hidden rounded-xl border border-black/15 bg-[#141614] shadow-[0_18px_40px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-[1.015]">
          {/* Monitor Browser Header Bar */}
          <div className="flex h-7 items-center justify-between border-b border-black/10 bg-[#f4f4ee]/95 px-3">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-[#ff5f56]/85" />
              <div className="size-2.5 rounded-full bg-[#ffbd2e]/85" />
              <div className="size-2.5 rounded-full bg-[#27c93f]/85" />
            </div>
            {/* Minimal URL pill */}
            <div className="flex items-center gap-1 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-mono text-black/70 shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-2.5 opacity-60">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-semibold">{project.domain}</span>
            </div>
            <div className="w-8" />
          </div>

          {/* Desktop Website Screen — 16:9 */}
          <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '16/9' }}>
            <img
              src={project.imageUrl}
              alt={`${project.clientName} desktop mockup`}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* 2. Secondary Mobile Phone Mockup */}
        <div
          className="absolute right-0 bottom-[-4px] z-20 shadow-[0_20px_40px_rgba(0,0,0,0.45),0_0_0_1.5px_rgba(255,255,255,0.18)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{
            width: '80px',
            aspectRatio: '9/19',
            borderRadius: '1.2rem',
            background: '#0c0d0c',
            padding: '4px',
          }}
        >
          {/* Phone Screen Frame */}
          <div
            className="relative h-full w-full overflow-hidden bg-white"
            style={{ borderRadius: '0.95rem' }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-1 left-1/2 z-30 h-1.5 w-6 -translate-x-1/2 rounded-full bg-black" />

            {/* Mobile Website Screen Preview */}
            <img
              src={project.imageUrl}
              alt={`${project.clientName} mobile preview`}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />

            {/* Subtle glass shine */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
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

  // Slide up into view
  const y = useTransform(
    scrollYProgress,
    [start, Math.min(1, start + step * 0.65)],
    [index === 0 ? "0%" : "115%", "0%"]
  );

  // When next cards stack on top, dim background to give authentic stacked bunch depth
  const isLastCard = index === total - 1;
  const dimOpacity = useTransform(
    scrollYProgress,
    isLastCard ? [0, 1] : [nextStart, Math.min(1, nextStart + step * 0.4)],
    isLastCard ? [0, 0] : [0, 0.45]
  );

  // Fade body content when next card covers it, but keep the top tab bar always visible in the bunch!
  const bodyOpacity = useTransform(
    scrollYProgress,
    isLastCard ? [0, 1] : [nextStart, Math.min(0.99, nextStart + step * 0.28)],
    isLastCard ? [1, 1] : [1, 0]
  );

  // Keep the cards equal in height while leaving a compact visible stack.
  const stackOffset = 18;
  const topOffset = index * stackOffset;
  const cardHeight = `calc(100% - ${(total - 1) * stackOffset - stackOffset}px)`;

  return (
    <motion.article
      style={{
        y,
        zIndex: index + 1,
        top: `${topOffset}px`,
        height: cardHeight,
      }}
      className="absolute inset-x-0 top-0 flex h-full will-change-transform"
    >
      <div
        className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-4 shadow-[0_-12px_35px_rgba(0,0,0,0.55),0_30px_90px_-15px_rgba(0,0,0,0.85)] sm:rounded-[2rem] sm:p-7 lg:p-9"
        style={{
          backgroundColor: project.bgColor,
          borderColor: project.surfaceColor,
        }}
      >
        {/* Top Tab Strip - ALWAYS VISIBLE when stacked in the bunch behind */}
        <div
          className="relative z-20 flex shrink-0 items-center justify-between border-b pb-2 sm:pb-3 font-mono text-xs"
          style={{ borderColor: project.surfaceColor, color: project.textColor }}
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span
              className="rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider"
              style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
            >
              0{project.id + 1} / 0{total}
            </span>
            <span className="font-bold tracking-wide text-xs sm:text-sm" style={{ color: project.textColor }}>
              {project.clientName}
            </span>
            <span className="hidden sm:inline opacity-50">•</span>
            <span className="hidden text-xs font-medium opacity-75 sm:inline">{project.category}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className="rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold"
              style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
            >
              {project.badge}
            </span>
            <span
              className="rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] opacity-80"
              style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* Card Main Body */}
        <motion.div
          style={{ opacity: bodyOpacity }}
          className="relative z-10 grid flex-1 min-h-0 grid-cols-1 gap-3 sm:gap-6 pt-3 sm:pt-4 lg:grid-cols-[1.1fr_1.15fr] lg:gap-8 lg:items-center"
        >
          {/* Left Side Content */}
          <div className="flex min-h-0 min-w-0 flex-col justify-between gap-3 sm:gap-5 overflow-hidden">
            <div>
              <span
                className="inline-block rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider"
                style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
              >
                {project.category}
              </span>
              <h3
                className="mt-2 sm:mt-3 min-w-0 font-display text-lg font-extrabold leading-[1.15] tracking-tight sm:text-2xl lg:text-4xl"
                style={{ color: project.textColor }}
              >
                {project.title}
              </h3>
              <p
                className="mt-1.5 sm:mt-2.5 max-w-xl text-xs font-normal leading-relaxed sm:text-base line-clamp-2 sm:line-clamp-none"
                style={{ color: project.mutedTextColor }}
              >
                {project.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium shadow-sm"
                    style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/portfolio/${project.caseStudySlug}`}
                className="inline-flex w-fit items-center gap-2 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 hover:shadow-lg"
                style={{ color: "#ffffff", backgroundColor: project.textColor }}
              >
                View Case Study
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5 sm:size-4">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side Showcase - Dual Desktop + Mobile Mockup */}
          <div className="hidden lg:flex min-h-0 h-full min-w-0 items-center justify-center">
            <CardVisual project={project} />
          </div>
          {/* Mobile: show image below text */}
          <div className="lg:hidden w-full overflow-hidden rounded-xl border border-black/10">
            <img
              src={project.imageUrl}
              alt={`${project.clientName} preview`}
              className="w-full object-cover object-top"
              style={{ maxHeight: '140px' }}
            />
          </div>
        </motion.div>

        {/* Dimming overlay when card is behind in the stack */}
        <motion.div
          style={{ opacity: dimOpacity }}
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl sm:rounded-[2rem] bg-black/40 transition-colors"
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
      className="relative z-10 bg-ink"
      style={{ height: `${projects.length * 115}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[4.25rem]">
        <div className="mx-auto mb-3 flex w-full max-w-6xl shrink-0 items-end justify-between gap-6 px-6 pt-3">
          <div>
            <span className="eyebrow text-[#ed1238] font-mono font-bold tracking-widest uppercase text-xs">
              ( PORTFOLIO )
            </span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-paper">
              Work that delivers real growth.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-paper/60 font-normal">
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

        <div className="relative mx-auto min-h-0 w-full max-w-6xl flex-1 px-6 pb-6 sm:pb-8">
          <div className="relative h-full overflow-hidden">
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

