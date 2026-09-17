import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CaseStudyImage from "../../../components/CaseStudyImage";
import MarkdownBody from "../../../components/MarkdownBody";
import { caseStudies } from "../../case-studies/constants";
import { getCaseStudyMarkdownContent } from "../../case-studies/content";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const caseStudy = caseStudies.find((item) => item.slug === params.slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.projectName} — Portfolio | Technostripe`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.projectName} | Technostripe Portfolio`,
      description: caseStudy.description,
      type: "article",
    },
  };
}

export default function PortfolioDetailPage({ params }: Props) {
  const caseStudy = caseStudies.find((item) => item.slug === params.slug);
  if (!caseStudy) notFound();
  const markdownContent = getCaseStudyMarkdownContent(caseStudy);

  // Related portfolio projects
  const related = caseStudies
    .filter((c) => c.slug !== caseStudy.slug)
    .slice(0, 2);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0a0b0a] pt-24 pb-24 sm:pt-32">
        {/* ── Breadcrumbs ─────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-5xl px-4 sm:px-8 mb-8 flex items-center gap-2 text-[0.7rem] font-mono tracking-wider text-white/35"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-white transition-colors">
            Portfolio
          </Link>
          <span>/</span>
          <span className="text-white/60 truncate max-w-[220px]">
            {caseStudy.projectName}
          </span>
        </nav>

        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          {/* ── Header: Category + Project Name ─────────── */}
          <div className="mb-10">
            <span className="inline-block rounded-full border border-[#ed1238]/30 bg-[#ed1238]/10 px-3.5 py-1 text-[0.68rem] font-mono font-bold tracking-[0.16em] uppercase text-[#ff4d6d] mb-4">
              {caseStudy.category}
            </span>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display-family)" }}
            >
              {caseStudy.caseStudyTitle
                ? `${caseStudy.projectName} — ${caseStudy.caseStudyTitle}`
                : caseStudy.projectName}
            </h1>
            <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-3xl font-normal">
              {caseStudy.description}
            </p>
          </div>

          {/* ── Visual Media: keep the project image near the title ── */}
          <div
            className={`mb-14 grid gap-5 sm:gap-6 ${
              caseStudy.mobileImage
                ? "grid-cols-1 lg:grid-cols-[1.6fr_1fr]"
                : "grid-cols-1"
            }`}
          >
            <CaseStudyImage
              src={caseStudy.coverImage}
              alt={`${caseStudy.projectName} homepage screenshot`}
              aspectRatioClass={caseStudy.mobileImage ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/3] sm:aspect-[16/9]"}
              priority
            />

            {caseStudy.mobileImage && (
              <CaseStudyImage
                src={caseStudy.mobileImage}
                alt={`${caseStudy.projectName} Mobile Mockup`}
                aspectRatioClass="aspect-[4/3] lg:aspect-auto lg:h-full"
              />
            )}
          </div>

          {markdownContent ? (
            <section className="mb-14 border-y border-white/10 py-12 lg:py-16">
              <div className="mx-auto max-w-3xl">
                <p className="eyebrow text-[#ed1238]">Project Narrative</p>
                <MarkdownBody content={markdownContent} />
              </div>
            </section>
          ) : caseStudy.story && (
            <section className="mb-14 grid gap-10 border-y border-white/10 py-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="eyebrow text-[#ed1238]">Portfolio Overview</p>
                <h2 className="mt-3 max-w-sm font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  The work behind the result.
                </h2>
              </div>
              <div className="space-y-10">
                {caseStudy.story.map((section) => (
                  <article key={section.heading}>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#ed1238]">
                      {section.heading}
                    </h3>
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-white/70 sm:text-lg">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ── Details Block (Tools, Backend, Stack, Live Link) ─ */}
          {(caseStudy.designTools ||
            caseStudy.backend ||
            caseStudy.programmingLanguage ||
            caseStudy.projectLink) && (
            <section className="mb-12 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#ed1238] mb-6">
                Project Specifications & Tech Stack
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {caseStudy.designTools && (
                  <div>
                    <p className="text-[0.68rem] font-mono uppercase tracking-wider text-white/40 mb-1">
                      Design Tools
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {caseStudy.designTools}
                    </p>
                  </div>
                )}

                {caseStudy.backend && (
                  <div>
                    <p className="text-[0.68rem] font-mono uppercase tracking-wider text-white/40 mb-1">
                      Backend & Platform
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {caseStudy.backend}
                    </p>
                  </div>
                )}

                {caseStudy.programmingLanguage && (
                  <div>
                    <p className="text-[0.68rem] font-mono uppercase tracking-wider text-white/40 mb-1">
                      Tech & Stack
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {caseStudy.programmingLanguage}
                    </p>
                  </div>
                )}

                {caseStudy.projectLink && (
                  <div className="flex flex-col justify-center sm:items-start">
                    <p className="text-[0.68rem] font-mono uppercase tracking-wider text-white/40 mb-1">
                      Live Project
                    </p>
                    <a
                      href={caseStudy.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-wider uppercase text-[#ed1238] hover:text-[#ff4d6d] transition-colors"
                    >
                      Visit Website
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
                        <path d="M5 11L11 5M5 5h6v6" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Key Performance Metrics ─ */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#ed1238] mb-6">
                Key Performance Metrics & Results
              </h2>
              <div
                className={`grid gap-4 sm:gap-6 ${
                  caseStudy.metrics.length === 1
                    ? "grid-cols-1 sm:grid-cols-2 max-w-xl"
                    : caseStudy.metrics.length === 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                    : caseStudy.metrics.length === 3
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {caseStudy.metrics.map((m) => {
                  // Split "5.9x (from 1.3x)" → main: "5.9x", sub: "from 1.3x"
                  const fromIdx = m.value.indexOf(" (from ");
                  const mainVal = fromIdx !== -1 ? m.value.slice(0, fromIdx) : m.value;
                  const subVal  = fromIdx !== -1 ? m.value.slice(fromIdx + 2, -1) : null; // strips ( )
                  const isNumericShort = mainVal.length <= 8 && !mainVal.includes(" ");

                  return (
                    <div
                      key={m.label}
                      className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm flex flex-col justify-between gap-3 min-w-0 overflow-hidden"
                    >
                      <p className="text-[0.65rem] font-mono uppercase tracking-wider text-white/45 truncate">
                        {m.label}
                      </p>
                      <div className="min-w-0">
                        <p
                          className={`${
                            isNumericShort
                              ? "text-2xl sm:text-3xl font-extrabold leading-none whitespace-nowrap"
                              : "text-lg sm:text-xl font-bold leading-snug break-words"
                          } text-white`}
                          style={{ fontFamily: "var(--font-display-family)" }}
                        >
                          {mainVal}
                        </p>
                        {subVal && (
                          <p className="text-[0.68rem] font-mono text-white/40 mt-1.5 break-words">
                            {subVal}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Gallery Section (Optional Extra Screenshots) ── */}
          {caseStudy.gallery && caseStudy.gallery.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#ed1238] mb-6">
                Project Gallery & Mockups
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {caseStudy.gallery.map((img, idx) => (
                  <CaseStudyImage
                    key={idx}
                    src={img}
                    alt={`${caseStudy.projectName} Gallery Slide ${idx + 1}`}
                    aspectRatioClass="aspect-[16/10]"
                  />
                ))}
              </div>
            </section>
          )}

          {/* ── CTA Banner ──────────────────────────────── */}
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 sm:p-12 text-center my-16">
            <p className="eyebrow text-[#ed1238] mb-3">Ready for similar growth?</p>
            <h2
              className="text-2xl sm:text-4xl text-white font-extrabold mb-4"
              style={{ fontFamily: "var(--font-display-family)" }}
            >
              Let's engineer your brand's next milestone
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-md mx-auto mb-8 leading-relaxed">
              Book a free strategy audit with our senior e-commerce architects.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-7 py-3 text-xs font-bold font-mono tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_30px_rgba(237,18,56,0.5)]"
            >
              Book Strategy Call
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-3.5">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </Link>
          </section>

          {/* ── More Projects ───────────────────────── */}
          {related.length > 0 && (
            <section className="pt-10 border-t border-white/10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/40">
                  More Projects
                </h3>
                <Link
                  href="/portfolio"
                  className="text-xs font-mono uppercase tracking-wider text-[#ed1238] hover:underline"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/portfolio/${study.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111211] transition-all duration-300 hover:border-[#ed1238]/40 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(237,18,56,0.12)]"
                  >
                    {/* Cover image with hover overlay */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={study.coverImage}
                        alt={study.projectName}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      {/* Hover: Red branded overlay */}
                      <div className="absolute inset-0 z-20 bg-[#ed1238] p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25 pointer-events-none" />
                        <div className="absolute -top-12 -right-12 size-40 rounded-full bg-white/20 blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex items-center justify-between font-mono text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
                          <span>{study.category.split(" ")[0]}</span>
                          <span className="inline-block size-1.5 rounded-full bg-white/80 animate-pulse" />
                        </div>
                        <div className="pointer-events-none absolute -bottom-4 -right-4 z-0">
                          <Image src="/favicon.png" alt="Technostripe" width={160} height={160} unoptimized className="size-24 object-contain opacity-20 mix-blend-screen" />
                        </div>
                        <div className="relative z-10 pt-4">
                          <h4 className="font-display text-lg font-black text-white leading-[1.1] tracking-tight">
                            {study.projectName}
                          </h4>
                        </div>
                      </div>
                    </div>
                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-5">
                      <span className="text-[0.62rem] font-mono uppercase tracking-widest text-white/35 mb-1.5">
                        {study.projectName}
                      </span>
                      <h4
                        className="text-base sm:text-lg text-white font-bold leading-snug mb-2 group-hover:text-[#ff4d6d] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-display-family)", letterSpacing: "-0.025em" }}
                      >
                        {study.caseStudyTitle ?? study.projectName}
                      </h4>
                      <p className="text-[0.78rem] text-white/50 leading-relaxed line-clamp-2 mb-4 flex-1">
                        {study.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-[0.68rem] font-mono font-bold tracking-[0.12em] uppercase text-white/40 group-hover:text-[#ed1238] transition-colors duration-300 mt-auto pt-1">
                        View Case Study
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1">
                          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
