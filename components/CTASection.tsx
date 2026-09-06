"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Staggered word-by-word fade-up animation component
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
    <span ref={ref} className={className} aria-label={text}>
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
  );
}

type CTASectionProps = {
  buttonLabel?: string;
  variant?: "default" | "services";
};

export default function CTASection({
  buttonLabel,
  variant = "default",
}: CTASectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px 0px" });
  const isServicesVariant = variant === "services";
  const resolvedButtonLabel = buttonLabel ?? (isServicesVariant ? "Book a Service Consultation" : "Book Free Growth Call");

  return (
    <section className="relative z-10 overflow-hidden bg-ink py-20 sm:py-24">
      <div className={`${isServicesVariant ? "max-w-7xl px-6" : "max-w-6xl px-6"} mx-auto`}>
        <div
          ref={containerRef}
          className={`relative overflow-hidden ${isServicesVariant
            ? "rounded-[2rem] border border-[#ed1238]/70 bg-[linear-gradient(110deg,rgba(237,18,56,0.28),rgba(10,11,10,0.72)_48%,rgba(237,18,56,0.12))] px-8 py-14 shadow-[0_0_90px_-18px_rgba(237,18,56,0.9),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:px-14 sm:py-20 lg:px-20"
            : "rounded-[2.5rem] border-2 border-[#ed1238] bg-gradient-to-br from-ink-soft via-[#121412] to-ink p-8 shadow-[0_0_60px_-10px_rgba(237,18,56,0.4)] backdrop-blur-xl sm:p-14 lg:p-20"
            }`}
        >
          {/* Floating animated logo mark */}
          <motion.div
            animate={{
              rotate: [-12, -8, -12],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`pointer-events-none absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 ${isServicesVariant ? "opacity-25 mix-blend-screen" : "opacity-35 mix-blend-screen sm:opacity-45"
              }`}
          >
            <div className="relative flex items-center justify-center">
              <div className={`absolute inset-0 scale-125 transform rounded-full blur-2xl ${isServicesVariant ? "bg-[#ed1238]/30" : "bg-[#ed1238]/30"
                }`} />
              <Image
                src="/favicon.png"
                width={280}
                height={280}
                unoptimized
                alt="Technostripe Mark"
                className={`h-48 w-48 object-contain sm:h-72 sm:w-72 ${isServicesVariant ? "opacity-35" : ""}`}
              />
            </div>
          </motion.div>

          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className={`eyebrow font-mono text-xs font-bold uppercase tracking-widest sm:text-sm ${isServicesVariant ? "text-[#ff6b82]" : "text-[#ed1238]"
                  }`}>
                {isServicesVariant ? "( FIND YOUR LEVERAGE )" : "( START SCALING )"}
              </span>
            </motion.div>

            {/* Heading with word-by-word reveal */}
            <h2 className={`mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl ${isServicesVariant ? "text-white" : "text-white"
              }`}>
              <AnimatedWords
                text={isServicesVariant ? "Which service will move the needle?" : "Ready to scale your e-commerce brand?"}
                delay={0.1}
                stagger={0.06}
              />
            </h2>

            {/* Paragraph with word-by-word reveal */}
            <p className={`mt-6 max-w-2xl text-base font-normal leading-relaxed sm:text-lg ${isServicesVariant ? "text-paper/75" : "text-paper/70"
              }`}>
              <AnimatedWords
                text={isServicesVariant
                  ? "Tell us where you want to grow. We will match the right service system to your next measurable win."
                  : "Let's build a growth system designed for profitable scale. Book a free growth call with our team and let's map your roadmap."}
                delay={0.35}
                stagger={0.03}
              />
            </p>

            {/* CTA Button entrance */}
            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-tight transition-all duration-300 cursor-pointer ${isServicesVariant
                  ? "bg-[#ed1238] text-white hover:bg-[#ff2046] hover:shadow-[0_0_35px_rgba(237,18,56,0.75)]"
                  : "bg-[#ed1238] text-white hover:bg-[#ff2046] hover:shadow-[0_0_35px_rgba(237,18,56,0.6)]"
                  }`}
              >
                {resolvedButtonLabel}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="size-4"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
