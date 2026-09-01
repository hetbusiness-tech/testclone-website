"use client";

import { useState } from "react";
import Image from "next/image";

interface CaseStudyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  priority?: boolean;
}

export default function CaseStudyImage({
  src,
  alt,
  className = "",
  aspectRatioClass = "aspect-[16/10]",
  priority = false,
}: CaseStudyImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-[#121412] ${aspectRatioClass} ${className}`}
    >
      {!hasError && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          onError={() => setHasError(true)}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        /* Fallback dashed placeholder box */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-white/15 bg-white/[0.02] rounded-2xl">
          <div className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-5 text-white/40"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p className="text-[0.72rem] font-mono uppercase tracking-wider text-white/60 mb-1">
            Image Placeholder
          </p>
          <p className="text-[0.68rem] font-mono text-white/35 max-w-xs break-all">
            Add image at <span className="text-[#ed1238]">/public{src}</span>
          </p>
        </div>
      )}
    </div>
  );
}
