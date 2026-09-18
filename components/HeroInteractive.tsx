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
      className="hero-interactive relative flex h-auto min-h-0 max-h-none flex-col overflow-hidden bg-ink pt-[6.25rem] sm:h-screen sm:min-h-[640px] sm:max-h-[100vh] sm:pt-24 md:pt-28"
    >
      <div className="hero-spotlight pointer-events-none absolute inset-0" />
      <div className="hero-cursor pointer-events-none absolute" aria-hidden="true" />
      <div className="hero-pointer pointer-events-none absolute" aria-hidden="true" />
      <Image
        src="/background.png"
        width={900}
        height={180}
        alt="ecommerce"
        unoptimized
        aria-hidden="true"
        className="hero-hover-image pointer-events-none absolute left-1/2 top-1/2 w-[min(72rem,88vw)] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
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

  // Significantly larger font size to fill vertical and horizontal space
  const titleStyle = {
    fontSize: "clamp(3.6rem, calc(min(100vw - 2rem, 72rem) / 7.8), 8.8rem)",
    lineHeight: "0.92",
  } as CSSProperties;

  return (
    <h1
      style={titleStyle}
      className="hero-title max-w-none font-display font-extrabold tracking-[-0.04em] text-paper"
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="hero-title-line block whitespace-nowrap">
          {line.words.map((word) => (
            <span
              key={word.text}
              className={`hero-title-word inline-block ${word.accent ? "text-lime" : "text-paper"}`}
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
    </h1>
  );
}