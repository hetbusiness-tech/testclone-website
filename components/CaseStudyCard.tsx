import Link from "next/link";
import CaseStudyImage from "./CaseStudyImage";
import type { CaseStudy } from "../lib/case-studies";

export default function CaseStudyCard({
  caseStudy,
  featured = false,
}: {
  caseStudy: CaseStudy;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className={`group flex flex-col h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0e100e]/90 backdrop-blur-md transition-all duration-500 hover:border-[#ed1238]/40 hover:bg-white/[0.04] hover:shadow-[0_16px_50px_rgba(237,18,56,0.16)] hover:-translate-y-1.5 ${
        featured ? "md:col-span-2 lg:col-span-3 lg:flex-row lg:items-stretch" : ""
      }`}
    >
      {/* Cover Image */}
      <div className={`${featured ? "lg:w-1/2 shrink-0 p-4" : "p-4"}`}>
        <CaseStudyImage
          src={caseStudy.coverImage}
          alt={caseStudy.projectName}
          aspectRatioClass={featured ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[220px] sm:min-h-[260px]" : "aspect-[4/3] sm:aspect-[16/10]"}
        />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-col flex-1 p-5 sm:p-8 justify-between">
        <div>
          {/* Category Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block rounded-full border border-[#ed1238]/30 bg-[#ed1238]/10 px-3 py-0.5 text-[0.68rem] font-mono font-bold tracking-[0.15em] uppercase text-[#ff4d6d]">
              {caseStudy.category}
            </span>
          </div>

          {/* Project Name */}
          <h3
            className="font-display text-2xl sm:text-3xl text-white leading-tight transition-colors duration-300 group-hover:text-[#ff4d6d] mb-3"
            style={{
              fontFamily: "var(--font-display-family)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            {caseStudy.projectName}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/55 leading-relaxed line-clamp-3 mb-6 font-normal">
            {caseStudy.description}
          </p>

          {/* Key Metrics preview if available */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/8">
              {caseStudy.metrics.slice(0, 2).map((m) => (
                <div key={m.label}>
                  <p className="text-[0.65rem] font-mono uppercase tracking-wider text-white/40">
                    {m.label}
                  </p>
                  <p className="text-lg font-display font-extrabold text-white mt-0.5">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Case Study Button Link */}
        <div className="pt-4 border-t border-white/8 flex items-center justify-between mt-auto">
          <span
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono tracking-[0.12em] uppercase text-white transition-all duration-300 group-hover:text-[#ed1238]"
          >
            View Case Study
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
