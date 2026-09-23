"use client";

import { useState } from "react";
import Link from "next/link";

export default function RelatedLinksSection({
  title,
  items,
  initialCount = 6,
}: {
  title: string;
  items: { label: string; href: string }[];
  initialCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const visible = expanded ? items : items.slice(0, initialCount);
  const remaining = items.length - initialCount;

  return (
    <div>
      <p className="text-[0.65rem] font-mono tracking-[0.2em] uppercase text-[#ed1238] mb-4">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {visible.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs text-white/70 transition-colors hover:border-[#ed1238]/40 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
      {!expanded && remaining > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#ed1238] transition-colors hover:text-white"
        >
          View {remaining} More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
