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
      className="hero-interactive relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-20 sm:pt-24"
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
    { text: "Your ", accent: false },
    { text: "E-commerce", accent: false },
    { text: "Growth", accent: false },
    { text: "Partner.", accent: true },
  ];

  return (
    <h1 className="hero-title font-display text-[clamp(2.8rem,10vw,9.5rem)] font-extrabold tracking-[-0.04em] leading-[0.88] text-paper">
      {lines.map((line) => (
        <span
          key={line.text}
          className={`hero-title-line block ${line.accent ? "text-lime" : "text-paper"}`}
        >
          {Array.from(line.text).map((character, index) => (
            <span
              key={`${line.text}-${index}`}
              className="hero-title-character inline-block"
            >
              {character === " " ? "\u00a0" : character}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}