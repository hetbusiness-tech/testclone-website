import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "../app/insights/types";

/* ─── Category pill colours ───────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  "E-commerce Growth": "bg-[#ed1238]/12 text-[#c01030] border-[#ed1238]/25",
  "Shopify Plus": "bg-purple-100 text-purple-700 border-purple-300/60",
  "Performance Marketing": "bg-blue-100 text-blue-700 border-blue-300/60",
  CRO: "bg-amber-100 text-amber-700 border-amber-300/60",
  SEO: "bg-emerald-100 text-emerald-700 border-emerald-300/60",
  Branding: "bg-pink-100 text-pink-700 border-pink-300/60",
};

function getCategoryColor(category: string): string {
  return (
    CATEGORY_COLORS[category] ??
    "bg-black/10 text-black/60 border-black/15"
  );
}

/* ─── Format date ──────────────────────────────────────── */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ─── Blog Card Component ──────────────────────────────── */
export default function BlogCard({
  blog,
  featured = false,
}: {
  blog: BlogPost;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/insights/${blog.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-2xl border border-black/10 bg-[#ffffff]/80 backdrop-blur-sm transition-all duration-500 hover:border-[#ed1238]/40 hover:bg-black/[0.05] hover:shadow-[0_12px_40px_rgba(237,18,56,0.16)] hover:-translate-y-1"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#fffafa]">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.coverImageAlt || blog.title}
            fill
            unoptimized
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          /* Fallback gradient */
          <div className="absolute inset-0 bg-gradient-to-br from-[#ed1238]/25 via-[#fffafa] to-purple-950/40 flex items-center justify-center">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-black/30">
              {blog.category}
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Category + Read Time Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span
            className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.62rem] font-mono tracking-[0.14em] uppercase ${getCategoryColor(
              blog.category
            )}`}
          >
            {blog.category}
          </span>
          <span className="text-[0.68rem] font-mono text-black/60 tracking-[0.08em]">
            {blog.readTime}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-display text-[1.05rem] sm:text-lg lg:text-xl text-black leading-[1.38] transition-colors duration-300 group-hover:text-[#ed1238] mb-3 pb-0.5"
          style={{
            fontFamily: "var(--font-display-family)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-black/70 leading-relaxed line-clamp-3 mb-5">
          {blog.excerpt}
        </p>

        {/* Platform Tags */}
        {blog.platformTags && blog.platformTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
            {blog.platformTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md border border-black/20 bg-black/[0.07] px-2.5 py-1 text-[0.62rem] font-mono tracking-wider text-black/70 uppercase font-semibold"
              >
                <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ed1238', opacity: 0.8 }} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Author + Date + Read indicator */}
        <div className="flex items-center justify-between pt-4 border-t border-black/8 mt-auto">
          <div className="flex flex-col">
            <span className="text-[0.72rem] font-semibold text-black/70">
              {blog.author}
            </span>
            <span className="text-[0.65rem] text-black/35 font-mono">
              {formatDate(blog.publishDate)}
            </span>
          </div>

          <span className="flex items-center gap-1.5 text-[0.72rem] font-mono text-[#ed1238] transition-transform duration-300 group-hover:translate-x-1">
            Read
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-3"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
