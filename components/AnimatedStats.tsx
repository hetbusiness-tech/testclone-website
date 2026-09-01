"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  numericValue: number;
  suffix: string;
  prefix?: string;
  isDecimal?: boolean;
  label: string;
}

const statsData: StatItem[] = [
  { numericValue: 10, suffix: "+", label: "Projects delivered" },
  { numericValue: 95, suffix: "+", label: "Avg. Lighthouse score" },
  { numericValue: 4.9, suffix: "/5", isDecimal: true, label: "Client satisfaction" },
  { numericValue: 3, suffix: "yrs", label: "Driving growth" },
];

function StatCounter({ item, inView }: { item: StatItem; inView: boolean }) {
  const [current, setCurrent] = useState(0);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!inView || hasPlayed.current) return;
    hasPlayed.current = true;

    const duration = 1600;
    const startTime = performance.now();

    const update = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(item.numericValue * ease);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCurrent(item.numericValue);
      }
    };

    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [inView, item.numericValue]);

  const display = item.isDecimal
    ? current.toFixed(1)
    : Math.floor(current).toString();

  return (
    <div className="space-y-2">
      <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#ed1238] tracking-tight tabular-nums">
        {item.prefix}
        {display}
        <span>{item.suffix}</span>
      </div>
      <p className="text-sm text-white/45">
        {item.label}
      </p>
    </div>
  );
}

export default function AnimatedStats() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
      {statsData.map((stat, idx) => (
        <StatCounter key={idx} item={stat} inView={inView} />
      ))}
    </div>
  );
}
