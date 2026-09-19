import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MarkdownBody from "../../../components/MarkdownBody";
import {
  getBlogBySlug,
  getAllBlogSlugs,
  getAllBlogs,
  type BlogPost,
} from "../../../lib/blogs";
import { getBlogMarkdownContent } from "../content";

const SITE_URL = "https://technostripe.com";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return {};

  const ogImg = blog.seo?.ogImage || blog.coverImage || "/og-image.png";
  const ogImgUrl = ogImg.startsWith("http") ? ogImg : `${SITE_URL}${ogImg}`;

  return {
    title: blog.seo?.metaTitle || blog.seo?.ogTitle || blog.title,
    description: blog.seo?.metaDescription || blog.seo?.ogDescription || blog.excerpt,
    keywords: blog.seo?.keywords,
    alternates: {
      canonical: `${SITE_URL}/insights/${blog.slug}`,
    },
    openGraph: {
      title: blog.seo?.ogTitle || blog.title,
      description: blog.seo?.ogDescription || blog.excerpt,
      url: `${SITE_URL}/insights/${blog.slug}`,
      siteName: "Technostripe Solutions",
      type: "article",
      publishedTime: blog.publishDate,
      tags: blog.platformTags,
      images: [
        {
          url: ogImgUrl,
          width: 1200,
          height: 630,
          alt: blog.coverImageAlt || blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo?.twitterTitle || blog.title,
      description: blog.seo?.twitterDescription || blog.excerpt,
      images: [ogImgUrl],
    },
  };
}

/* ─── Format date ──────────────────────────────────────── */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ─── Related card ─────────────────────────────────────── */
function RelatedCard({ blog }: { blog: BlogPost }) {
  return (
    <Link
      href={`/insights/${blog.slug}`}
      className="group flex gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#ed1238]/30 hover:bg-white/[0.05]"
    >
      {blog.coverImage && (
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-white/5">
          <Image
            src={blog.coverImage}
            alt={blog.coverImageAlt || blog.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[0.6rem] font-mono tracking-[0.15em] uppercase text-[#ed1238]">
          {blog.category}
        </span>
        <h4 className="text-sm text-white/80 leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {blog.title}
        </h4>
        <span className="text-[0.65rem] text-white/30 font-mono mt-auto">
          {blog.readTime}
        </span>
      </div>
    </Link>
  );
}

/* ─── Page ─────────────────────────────────────────────── */
export default function BlogPostPage({ params }: Props) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  const markdownContent = getBlogMarkdownContent(blog);

  // Related posts: same category or other posts, excluding current
  const allBlogs = getAllBlogs();
  const related = allBlogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  // JSON-LD structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    author: {
      "@type": "Person",
      name: blog.author,
      url: blog.authorLink.startsWith("http")
        ? blog.authorLink
        : `${SITE_URL}${blog.authorLink}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Technostripe Solutions",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/header.png`,
      },
    },
    datePublished: blog.publishDate,
    dateModified: blog.publishDate,
    image: blog.coverImage.startsWith("http")
      ? blog.coverImage
      : `${SITE_URL}${blog.coverImage}`,
    keywords: blog.seo?.keywords?.join(", "),
    articleSection: blog.category,
    url: `${SITE_URL}/insights/${blog.slug}`,
  };

  return (
    <>
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main id="main-content" className="min-h-screen bg-[#0a0b0a] pt-24 pb-24 sm:pt-32">
        {/* ── Breadcrumb ──────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 mb-8 flex items-center gap-2 text-[0.7rem] font-mono tracking-wider text-white/30"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/insights" className="hover:text-white transition-colors">
            Insights
          </Link>
          <span>/</span>
          <span className="text-white/55 truncate max-w-[200px]">
            {blog.title}
          </span>
        </nav>

        <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start gap-12 xl:gap-16">
            {/* ── Main Content ──────────────────────────── */}
            <article className="flex-1 min-w-0">
              {/* Meta info */}
              <div className="flex items-center gap-3 flex-wrap mb-5">
                <span className="rounded-full border border-[#ed1238]/30 bg-[#ed1238]/15 px-3 py-0.5 text-[0.65rem] font-mono tracking-[0.15em] uppercase text-[#ff4d6d]">
                  {blog.category}
                </span>
                <span className="text-[0.7rem] font-mono text-white/30">
                  {blog.readTime}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl text-white mb-5 leading-[1.1]"
                style={{
                  fontFamily: "var(--font-display-family)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                {blog.title}
              </h1>

              {/* Author + Date */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                <div className="flex flex-col">
                  <Link
                    href={blog.authorLink}
                    className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
                  >
                    {blog.author}
                  </Link>
                  <span className="text-xs text-white/35 font-mono">
                    Published {formatDate(blog.publishDate)}
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              {blog.coverImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-10 bg-white/5">
                  <Image
                    src={blog.coverImage}
                    alt={blog.coverImageAlt || blog.title}
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              {/* Markdown Body */}
              <MarkdownBody content={markdownContent} />

              {/* Platform Tags */}
              {blog.platformTags && blog.platformTags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-white/30 mb-3">
                    Platform Tags & Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {blog.platformTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/50 tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Action Buttons */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center">
                {blog.ctaBookDemoLink && (
                  <Link
                    href={blog.ctaBookDemoLink}
                    className="inline-flex items-center gap-2 rounded-full bg-[#ed1238] px-6 py-3 text-xs font-bold font-mono tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_25px_rgba(237,18,56,0.6)]"
                  >
                    Book Demo
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      className="size-3.5"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </Link>
                )}

                {blog.ctaWhatsAppLink && (
                  <a
                    href={blog.ctaWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold font-mono tracking-[0.14em] uppercase text-white/90 transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    Chat Now
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="size-3.5"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </a>
                )}
              </div>
            </article>

            {/* ── Sidebar (Sticky) ───────────────────────── */}
            <aside className="lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-24 space-y-6 self-start">
              {/* Back link */}
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-[0.72rem] font-mono tracking-[0.12em] uppercase text-white/40 hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-3"
                >
                  <path d="M13 8H3M7 4L3 8l4 4" />
                </svg>
                All Insights
              </Link>

              {/* Related Posts */}
              {related.length > 0 && (
                <div>
                  <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-white/30 mb-4">
                    Related Posts
                  </p>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <RelatedCard key={r.slug} blog={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Box */}
              <div className="rounded-2xl border border-[#ed1238]/20 bg-[#ed1238]/5 p-6">
                <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-3">
                  Ready to scale?
                </p>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  Book a free strategy call and get a personalised growth roadmap for your store.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ed1238] px-5 py-2.5 text-[0.72rem] font-bold font-mono tracking-[0.14em] uppercase text-white transition-all duration-300 hover:bg-[#ff2046] hover:shadow-[0_0_20px_rgba(237,18,56,0.4)]"
                >
                  Book Strategy Call
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
