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
    accent: "#8ea889",
    clientName: "Mor Matcha",
    imageUrl: "/portfolio/mor-matcha.png",
    textColor: "#173326",
    mutedTextColor: "rgba(23,51,38,0.72)",
    surfaceColor: "rgba(23,51,38,0.14)",
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
    accent: "#d7c7ad",
    clientName: "Linen Way",
    imageUrl: "/portfolio/linen-way.png",
    textColor: "#30281f",
    mutedTextColor: "rgba(48,40,31,0.68)",
    surfaceColor: "rgba(48,40,31,0.12)",
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
    accent: "#e8dfd2",
    clientName: "Matilda Jewellery",
    imageUrl: "/portfolio/matilda-jewellery.png",
    textColor: "#211d19",
    mutedTextColor: "rgba(33,29,25,0.68)",
    surfaceColor: "rgba(33,29,25,0.1)",
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
    accent: "#b7d6c8",
    clientName: "Babo Botanicals",
    imageUrl: "/portfolio/babo-botanicals.png",
    textColor: "#173b35",
    mutedTextColor: "rgba(23,59,53,0.72)",
    surfaceColor: "rgba(23,59,53,0.13)",
    caseStudySlug: "babo-botanicals",
  },
];

function CardVisual({ project }: { project: PortfolioProject }) {
  return (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[1.5rem] border p-3 backdrop-blur-sm sm:p-4" style={{ borderColor: project.surfaceColor, backgroundColor: project.surfaceColor }}>
      <img
        src={project.imageUrl}
        alt={`${project.clientName} homepage screenshot`}
        className="relative z-10 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
      />
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
    isLastCard ? [0, 0] : [0, 0.4]
  );

  // Fade body content when next card covers it, but keep the top tab bar always visible in the bunch!
  const bodyOpacity = useTransform(
    scrollYProgress,
    isLastCard ? [0, 1] : [nextStart, Math.min(0.99, nextStart + step * 0.28)],
    isLastCard ? [1, 1] : [1, 0]
  );

  // Keep the cards equal in height while leaving a compact visible stack.
  const stackOffset = 14;
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
        className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] border p-5 shadow-[0_-12px_35px_rgba(0,0,0,0.55),0_30px_90px_-15px_rgba(0,0,0,0.85)] sm:p-7 lg:p-9"
        style={{ backgroundColor: project.accent }}
      >
        {/* Top Tab Strip - ALWAYS VISIBLE when stacked in the bunch behind */}
        <div className="relative z-20 flex shrink-0 items-center justify-between border-b pb-3 font-mono text-xs" style={{ borderColor: project.surfaceColor, color: project.textColor }}>
          <div className="flex items-center gap-2.5">
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wider" style={{ color: project.textColor, backgroundColor: project.surfaceColor }}>
              0{project.id + 1} / 0{total}
            </span>
            <span className="font-bold tracking-wide text-sm" style={{ color: project.textColor }}>{project.clientName}</span>
            <span className="hidden sm:inline opacity-50">•</span>
            <span className="hidden text-xs font-medium opacity-75 sm:inline">{project.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ color: project.textColor, backgroundColor: project.surfaceColor }}>
              {project.badge}
            </span>
            <span className="rounded-full px-2 py-0.5 text-[11px] opacity-80" style={{ color: project.textColor, backgroundColor: project.surfaceColor }}>{project.year}</span>
          </div>
        </div>

        {/* Card Main Body */}
        <motion.div
          style={{ opacity: bodyOpacity }}
          className="relative z-10 grid flex-1 min-h-0 grid-cols-1 gap-6 pt-4 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:items-center"
        >
          <div className="flex min-h-0 min-w-0 flex-col justify-between gap-5 overflow-hidden">
            <div>
              <span className="inline-block rounded-full px-3 py-1 text-[11px] font-mono font-bold tracking-wider" style={{ color: project.textColor, backgroundColor: project.surfaceColor }}>
                {project.category}
              </span>
              <h3 className="mt-3 min-w-0 font-display text-2xl font-extrabold leading-[1.12] tracking-tight sm:text-3xl lg:text-4xl" style={{ color: project.textColor }}>
                {project.title}
              </h3>
              <p className="mt-2.5 max-w-xl text-sm font-normal leading-relaxed sm:text-base" style={{ color: project.mutedTextColor }}>
                {project.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-xs font-medium shadow-sm" style={{ color: project.textColor, backgroundColor: project.surfaceColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/case-studies/${project.caseStudySlug}`}
                className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold tracking-tight transition-all duration-200 hover:shadow-lg"
                style={{ color: project.accent, backgroundColor: project.textColor }}
              >
                View Case Study
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-4">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="hidden min-h-[200px] min-w-0 h-full lg:block">
            <CardVisual project={project} />
          </div>
        </motion.div>

        {/* Dimming overlay when card is behind in the stack */}
        <motion.div
          style={{ opacity: dimOpacity }}
          className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] bg-black/40 transition-colors"
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

