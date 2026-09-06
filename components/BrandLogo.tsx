"use client";

import Link from "next/link";
import Image from "next/image";

type BrandLogoProps = {
  height?: number;
  className?: string;
  priority?: boolean;
};

const INTRINSIC_WIDTH = 958;
const INTRINSIC_HEIGHT = 207;

export default function BrandLogo({
  height = 36,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const width = Math.round((INTRINSIC_WIDTH / INTRINSIC_HEIGHT) * height);

  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Technostripe Solutions home"
    >
      <Image
        src="/header.png"
        alt="Technostripe Solutions"
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className="h-auto w-auto object-contain object-left"
        style={{ height: `${height}px`, width: "auto", maxHeight: "100%" }}
      />
    </Link>
  );
}

