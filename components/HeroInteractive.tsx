"use client";

import { useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";

export default function HeroInteractive({ children }: { children: ReactNode }) {
  const [pointer, setPointer] = useState({ x: 50, y: 40 });

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  }

  const style = {
    "--mouse-x": `${pointer.x}%`,
    "--mouse-y": `${pointer.y}%`,
  } as CSSProperties;

  return (
    <section
      id="top"
      style={style}
      onMouseMove={handlePointerMove}
      className="hero-interactive relative flex h-auto min-h-[100vh] min-h-[100svh] max-h-none flex-col overflow-x-clip overflow-y-visible bg-ink pt-24 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:pt-28 sm:pb-12 md:pt-32"
    >
      <div className="hero-spotlight pointer-events-none absolute inset-0" />

      {/* Background image: mobile par hidden, sirf tablet (sm) aur desktop par visible */}
      <Image
        src="/background.png"
        width={900}
        height={180}
        alt="ecommerce"
        unoptimized
        aria-hidden="true"
        className="hero-hover-image pointer-events-none absolute left-1/2 top-1/2 hidden w-[min(72rem,88vw)] -translate-x-1/2 -translate-y-1/2 object-contain sm:block"
      />

      <div
        className={[
          "relative z-[1] flex flex-1 flex-col",
          // ---- MOBILE ONLY: content poori screen me vertically spread ----
          "max-sm:justify-center max-sm:px-5",
          // Description (p): bada font, readable
          "max-sm:[&_p]:text-[1.1rem] max-sm:[&_p]:leading-[1.65] max-sm:[&_p]:max-w-none",
          // Buttons (a/button): full width, broad, taller, text center
          "max-sm:[&_a]:flex max-sm:[&_a]:w-full max-sm:[&_a]:min-h-[60px] max-sm:[&_a]:items-center max-sm:[&_a]:justify-center max-sm:[&_a]:text-base",
          "max-sm:[&_button]:w-full max-sm:[&_button]:min-h-[60px]",
        ].join(" ")}
      >
        {children}
      </div>
    </section>
  );
}

export function AnimatedHeroTitle() {
  const lines = [
    {
      words: [
        { text: "Your ", accent: false },
        { text: "E-commerce", accent: false },
      ],
    },
    {
      words: [
        { text: "Growth ", accent: false },
        { text: "Partner.", accent: true },
      ],
    },
  ];

  // Desktop size same as before. Mobile size alag (bada) — 4 lines me stack hota hai.
  const titleStyle = {
    "--title-desktop":
      "clamp(2.15rem, calc(min(100vw - 2rem, 72rem) / 7.8), 8.8rem)",
    "--title-mobile": "clamp(2.2rem, calc((100vw - 2.5rem) / 6.6), 4rem)",
    lineHeight: "0.95",
  } as CSSProperties;

  const accessibleText = lines
    .map((line) => line.words.map((word) => word.text).join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <h1
      style={titleStyle}
      className="hero-title max-w-none font-display font-extrabold tracking-[-0.04em] text-paper text-[length:var(--title-mobile)] sm:text-[length:var(--title-desktop)] sm:leading-[0.92]"
      aria-label={accessibleText}
    >
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="hero-title-line block whitespace-nowrap">
            {line.words.map((word) => (
              <span
                key={word.text}
                // Mobile: har word apni line me (Your / E-commerce / Growth / Partner.)
                // sm+: pehle jaisa inline-block
                className={`hero-title-word max-sm:block sm:inline-block ${word.accent ? "text-lime" : "text-paper"
                  }`}
              >
                {Array.from(word.text).map((character, index) => (
                  <span
                    key={`${word.text}-${index}`}
                    className="hero-title-character inline-block"
                  >
                    {character === " " ? "\u00a0" : character}
                  </span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}