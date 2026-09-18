import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import CaseStudyImage from "../../../components/CaseStudyImage";
import MarkdownBody from "../../../components/MarkdownBody";
import { caseStudies } from "../constants";
import { getCaseStudyMarkdownContent } from "../content";

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
    title: `${caseStudy.projectName} — Case Study | Technostripe`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.projectName} | Technostripe Case Study`,
      description: caseStudy.description,
      type: "article",
    },
  };
}

export default function CaseStudyDetailPage({ params }: Props) {
  const caseStudy = caseStudies.find((item) => item.slug === params.slug);
  if (!caseStudy) notFound();
  const markdownContent = getCaseStudyMarkdownContent(caseStudy);

  // Related case studies
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
          <Link href="/case-studies" className="hover:text-white transition-colors">
            Case Studies
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

          {/* ── Visual Media: keep the project image near the case-study title ── */}
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
              <div className="mx-auto w-full max-w-5xl">
                <p className="eyebrow text-[#ed1238]">Case Study Narrative</p>
                <MarkdownBody content={markdownContent} />
              </div>
            </section>
          ) : caseStudy.story && (
            <section className="mb-14 grid gap-10 border-y border-white/10 py-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="eyebrow text-[#ed1238]">Case Study</p>
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

          {/* ── Key Performance Metrics (Performance Marketing / Growth) ─ */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <section className="mb-14">
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#ed1238] mb-6">
                Key Performance Metrics & Results
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {caseStudy.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
                  >
                    <p className="text-[0.7rem] font-mono uppercase tracking-wider text-white/45 mb-2">
                      {m.label}
                    </p>
                    <p
                      className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-none"
                      style={{ fontFamily: "var(--font-display-family)" }}
                    >
                      {m.value}
                    </p>
                  </div>
                ))}
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

          {/* ── More Case Studies ───────────────────────── */}
          {related.length > 0 && (
            <section className="pt-10 border-t border-white/10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/40">
                  More Case Studies
                </h3>
                <Link
                  href="/case-studies"
                  className="text-xs font-mono uppercase tracking-wider text-[#ed1238] hover:underline"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/case-studies/${study.slug}`}
                    className="group p-5 rounded-2xl border border-white/8 bg-white/[0.02] transition-all duration-300 hover:border-[#ed1238]/30 hover:bg-white/[0.04]"
                  >
                    <span className="text-[0.62rem] font-mono font-bold uppercase tracking-wider text-[#ed1238]">
                      {study.category}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#ff4d6d] transition-colors mt-1 mb-2">
                      {study.projectName}
                    </h4>
                    <p className="text-xs text-white/50 line-clamp-2">
                      {study.description}
                    </p>
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
