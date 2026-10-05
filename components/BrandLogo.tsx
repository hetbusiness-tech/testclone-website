"use client";

import Link from "next/link";
import Image from "next/image";

type BrandLogoProps = {
  height?: number;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  height = 44,
  className = "",
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Technostripe Solutions home"
    >
      <Image
        src="/head-image.png"
        alt="Technostripe Solutions"
        width={179}
        height={40}
        priority={priority}
        unoptimized
        className="h-auto w-auto object-contain object-left"
        style={{ height: `${height}px`, width: "auto", maxHeight: "100%" }}
      />
    </Link>
  );
}
