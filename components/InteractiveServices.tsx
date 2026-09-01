"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const servicesList = [
  {
    number: "01",
    title: "Website Development",
    label: "SERVICE",
    description:
      "Fast, responsive, SEO-friendly websites engineered to turn visitors into customers.",
    href: "/services#ecommerce-website-development",
  },
  {
    number: "02",
    title: "Branding & Strategy",
    label: "SERVICE",
    description:
      "Brand identity, positioning, digital strategy, and growth planning.",
    href: "/services#branding-strategy",
  },
  {
    number: "03",
    title: "SEO Services",
    label: "SERVICE",
    description:
      "Improve search rankings, increase visibility, and generate qualified leads.",
    href: "/services#ecommerce-seo-services",
  },
  {
    number: "04",
    title: "Social Media & Creative Content",
    label: "SERVICE",
    description:
      "Content that grabs attention and ads that convert.",
    href: "/services#social-media-creative",
  },
  {
    number: "05",
    title: "Paid Advertising",
    label: "SERVICE",
    description:
      "Google Ads and Meta Ads managemnet focused relentlessly on ROI.",
    href: "/services#paid-advertising",
  },
];

function DiagonalArrow({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function InteractiveServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hoveredService = hoveredIndex !== null ? servicesList[hoveredIndex] : null;

  return (
    <div className="relative z-10 w-full overflow-hidden bg-ink py-20 sm:py-28">
      {/* Floating Red Preview Card on Hover (Straight, no tilt) */}
      <AnimatePresence>
        {hoveredService && (
          <motion.div
            key={hoveredService.number}
            initial={{ opacity: 0, scale: 0.92, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="pointer-events-none fixed z-[9999]"
            style={{
              left: mouse.x - 120,
              top: mouse.y - 95,
            }}
          >
            <div className="relative flex h-[180px] w-[250px] flex-col justify-between overflow-hidden rounded-2xl bg-[#ed1238] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/90 uppercase">
                {hoveredService.number} / {hoveredService.label}
              </span>
              <Image
                src="/header.png"
                alt=""
                aria-hidden="true"
                width={220}
                height={48}
                className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-25 mix-blend-screen"
              />
              <p className="font-display text-lg font-black leading-tight tracking-tight text-white">
                {hoveredService.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto mb-14 flex max-w-[90rem] items-end justify-between gap-6 px-6 sm:mb-16 sm:px-10 lg:px-16">
        <div>
          <span className="eyebrow mb-3 block text-[#ed1238] font-mono tracking-widest uppercase font-bold text-xs">
            ( SERVICES )
          </span>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-black tracking-tight text-white leading-[0.94]">
            Full-stack
            <br />
            digital growth
          </h2>
        </div>
        <Link
          href="/services"
          className="mb-2 hidden shrink-0 items-center rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:border-[#ed1238] hover:text-[#ed1238] sm:inline-flex"
        >
          All services
        </Link>
      </div>

      <div className="w-full border-t border-white/10">
        {servicesList.map((service, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <Link
              key={service.number}
              href={service.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative flex w-full items-center justify-between gap-6 border-b border-white/10 px-6 py-6 sm:px-10 sm:py-7 lg:px-16 lg:py-8 transition-colors duration-200 ${
                isHovered ? "bg-white text-black" : "bg-transparent text-white"
              }`}
            >
              <div className="flex min-w-0 items-baseline gap-5 sm:gap-8 lg:gap-12">
                <span
                  className={`w-8 shrink-0 font-mono text-sm tracking-wider ${
                    isHovered ? "text-black/40" : "text-white/40"
                  }`}
                >
                  {service.number}
                </span>
                <h3
                  className={`font-display text-[clamp(1.35rem,2.8vw,2.75rem)] font-extrabold tracking-tight leading-[1.05] transition-colors duration-200 ${
                    isHovered ? "text-black" : "text-white"
                  }`}
                >
                  {service.title}
                </h3>
              </div>

              <div className="hidden max-w-sm items-center gap-8 lg:flex xl:max-w-md">
                <p
                  className={`text-[13.5px] leading-relaxed transition-colors duration-200 ${
                    isHovered ? "text-black/75 font-medium" : "text-white/60 font-normal"
                  }`}
                >
                  {service.description}
                </p>
                <DiagonalArrow
                  className={`size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    isHovered ? "text-black" : "text-white"
                  }`}
                />
              </div>

              <DiagonalArrow
                className={`size-5 shrink-0 lg:hidden transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                  isHovered ? "text-black" : "text-white"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}


