"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ScrollMarqueeProps = {
  text?: string;
  subtitle?: string;
  children?: ReactNode;
};

// ── 14 shards with more centre cuts ─────────────────────────────────────────
const SHARDS = [
  // ── Top-left ──────────────────────────────────────────────────────────────
  { id: 0, clip: "polygon(0% 0%, 44% 0%, 32% 44%, 0% 40%)", tiltX: "-8px", tiltY: "-6px", tiltR: "-6deg", fallX: "-60px", fallR: "-14deg" },
  // ── Top-centre-left ───────────────────────────────────────────────────────
  { id: 1, clip: "polygon(44% 0%, 56% 0%, 46% 46%, 32% 44%)", tiltX: "4px", tiltY: "-8px", tiltR: "5deg", fallX: "-20px", fallR: "10deg" },
  // ── Top-centre (The split at "s/b" boundary) ─────────────────────────────
  { id: 2, clip: "polygon(56% 0%, 68% 0%, 58% 44%, 46% 46%)", tiltX: "-5px", tiltY: "-7px", tiltR: "-5deg", fallX: "20px", fallR: "-10deg" },
  // ── Top-right ─────────────────────────────────────────────────────────────
  { id: 3, clip: "polygon(68% 0%, 100% 0%, 100% 36%, 58% 44%)", tiltX: "10px", tiltY: "-5px", tiltR: "7deg", fallX: "65px", fallR: "16deg" },

  // ── Mid-left ──────────────────────────────────────────────────────────────
  { id: 4, clip: "polygon(0% 40%, 32% 44%, 24% 62%, 0% 58%)", tiltX: "-12px", tiltY: "2px", tiltR: "-8deg", fallX: "-80px", fallR: "-18deg" },
  // ── Mid-centre-left ───────────────────────────────────────────────────────
  { id: 5, clip: "polygon(32% 44%, 46% 46%, 38% 64%, 24% 62%)", tiltX: "6px", tiltY: "3px", tiltR: "6deg", fallX: "-30px", fallR: "12deg" },
  // ── Mid-centre (key break at middle ─ "s" top / "b" top pivot here) ──────
  { id: 6, clip: "polygon(46% 46%, 58% 44%, 50% 66%, 38% 64%)", tiltX: "-4px", tiltY: "4px", tiltR: "-4deg", fallX: "10px", fallR: "-8deg" },
  // ── Mid-centre-right ──────────────────────────────────────────────────────
  { id: 7, clip: "polygon(58% 44%, 100% 36%, 100% 58%, 64% 66%)", tiltX: "8px", tiltY: "2px", tiltR: "8deg", fallX: "50px", fallR: "18deg" },
  // ── Mid-right extra split ─────────────────────────────────────────────────
  { id: 8, clip: "polygon(58% 44%, 64% 66%, 50% 66%, 38% 64%)", tiltX: "3px", tiltY: "3px", tiltR: "3deg", fallX: "15px", fallR: "6deg" },

  // ── Lower-left ────────────────────────────────────────────────────────────
  { id: 9, clip: "polygon(0% 58%, 24% 62%, 18% 80%, 0% 76%)", tiltX: "-10px", tiltY: "8px", tiltR: "-10deg", fallX: "-90px", fallR: "-20deg" },
  // ── Lower-centre-left ─────────────────────────────────────────────────────
  { id: 10, clip: "polygon(24% 62%, 38% 64%, 30% 82%, 18% 80%)", tiltX: "7px", tiltY: "7px", tiltR: "7deg", fallX: "-40px", fallR: "15deg" },
  // ── Lower-centre ──────────────────────────────────────────────────────────
  { id: 11, clip: "polygon(38% 64%, 50% 66%, 44% 84%, 30% 82%)", tiltX: "-6px", tiltY: "8px", tiltR: "-6deg", fallX: "5px", fallR: "-12deg" },
  // ── Lower-centre-right ────────────────────────────────────────────────────
  { id: 12, clip: "polygon(50% 66%, 100% 58%, 100% 78%, 58% 86%)", tiltX: "9px", tiltY: "6px", tiltR: "9deg", fallX: "55px", fallR: "20deg" },

  // ── Bottom strip ──────────────────────────────────────────────────────────
  { id: 13, clip: "polygon(0% 76%, 18% 80%, 30% 82%, 44% 84%, 58% 86%, 100% 78%, 100% 100%, 0% 100%)", tiltX: "0px", tiltY: "10px", tiltR: "1deg", fallX: "0px", fallR: "2deg" },
];

// ── Concentric Circular Shockwave Rings ─────────────────────────────────────
const SHOCKWAVE_CIRCLES = [
  { id: 1, size: "size-[220px] sm:size-[300px] md:size-[360px]", maxScale: 1.08 },
  { id: 2, size: "size-[380px] sm:size-[500px] md:size-[600px]", maxScale: 1.12 },
  { id: 3, size: "size-[580px] sm:size-[740px] md:size-[880px]", maxScale: 1.16 },
  { id: 4, size: "size-[800px] sm:size-[1020px] md:size-[1200px]", maxScale: 1.22 },
];

function ShockwaveCircleItem({
  circle,
  index,
  scrollYProgress,
}: {
  circle: (typeof SHOCKWAVE_CIRCLES)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const scale = useTransform(
    scrollYProgress,
    [0.22 + index * 0.015, 0.28 + index * 0.02, 0.42, 0.48],
    [0.35, 1, circle.maxScale, 1.25]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.22 + index * 0.015, 0.28 + index * 0.02, 0.42, 0.48],
    [0, 0.85 - index * 0.15, 0.85 - index * 0.15, 0]
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className={`absolute ${circle.size} rounded-full border border-[#ed1238]/60 shadow-[0_0_30px_rgba(237,18,56,0.35)] pointer-events-none flex items-center justify-center`}
    />
  );
}

function ShardPiece({
  shard,
  scrollYProgress,
  firstWord,
  secondWord,
}: {
  shard: (typeof SHARDS)[number];
  scrollYProgress: MotionValue<number>;
  firstWord: string;
  secondWord: string;
}) {
  const x = useTransform(
    scrollYProgress,
    [0.44, 0.52, 0.88],
    ["0px", shard.tiltX, shard.fallX]
  );
  const y = useTransform(
    scrollYProgress,
    [0.44, 0.52, 0.88],
    ["0vh", shard.tiltY, "115vh"]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0.44, 0.52, 0.88],
    ["0deg", shard.tiltR, shard.fallR]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.43, 0.445, 0.80, 0.88],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{ clipPath: shard.clip, x, y, rotate, opacity, zIndex: 10 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none px-4"
    >
      <div className="flex items-center justify-center select-none whitespace-nowrap">
        <span className="collision-word collision-word-left font-display text-paper inline-block">
          {firstWord}
        </span>
        <span className="collision-word collision-word-right font-display text-[#ed1238] inline-block">
          {secondWord}
        </span>
      </div>
    </motion.div>
  );
}

export default function ScrollMarquee({
  text = "Let's build",
  subtitle = "( WHERE AMBITION MEETS EXECUTION )",
  children,
}: ScrollMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isColliding, setIsColliding] = useState(false);
  const [hasShaken, setHasShaken] = useState(false);
  const [isForwardScroll, setIsForwardScroll] = useState(true);
  const lastProgressRef = useRef(0);

  const [firstWord, secondWord] = text.split(" ");

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const delta = p - lastProgressRef.current;
    if (delta > 0.001) {
      setIsForwardScroll(true);
    } else if (delta < -0.001) {
      setIsForwardScroll(false);
    }
    lastProgressRef.current = p;

    if (p >= 0.26 && p <= 0.44 && !hasShaken && delta >= 0) {
      setIsColliding(true);
      setHasShaken(true);
      setTimeout(() => setIsColliding(false), 900);
    }
  });

  const leftX = useTransform(scrollYProgress, [0, 0.28, 1], ["-50vw", "0vw", "0vw"]);
  const rightX = useTransform(scrollYProgress, [0, 0.28, 1], ["50vw", "0vw", "0vw"]);

  const intactOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.435, 0.445],
    [0, 1, 1, 0]
  );

  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.26, 0.30, 0.43, 0.46],
    [0, 1, 1, 0]
  );
  const subtitleY = useTransform(
    scrollYProgress,
    [0.26, 0.30, 0.43, 0.46],
    ["1.2rem", "0rem", "0rem", "-0.8rem"]
  );

  const keepScrollingOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.24, 0.28],
    [0, 1, 1, 0]
  );
  const keepScrollingY = useTransform(scrollYProgress, [0, 0.28], ["0rem", "0.6rem"]);

  const auraOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.28, 0.36, 0.44, 0.48],
    [0, 0.85, 1, 0.6, 0]
  );
  const auraScale = useTransform(
    scrollYProgress,
    [0.24, 0.28, 0.38, 0.48],
    [0.4, 0.95, 1.15, 0.5]
  );

  return (
    <section
      aria-label={`${text} scroll animation`}
      className="relative z-0 bg-ink overflow-x-clip"
    >
      <div
        ref={containerRef}
        className="relative z-0 h-[400vh] bg-ink"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-ink overflow-hidden">

          {/* Central Aura glow */}
          <motion.div
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "min(65vh, 68vw)",
              height: "min(65vh, 68vw)",
              opacity: auraOpacity,
              scale: auraScale,
              background:
                "radial-gradient(circle, rgba(237,18,56,0.45) 0%, rgba(237,18,56,0.15) 35%, rgba(0,0,0,0) 70%)",
              filter: "blur(2.5rem)",
            }}
          />

          {/* ── CONCENTRIC SHOCKWAVE CIRCLE RINGS (Shown ONLY on forward connect, hidden on reverse scroll) ── */}
          <motion.div
            animate={{ opacity: isForwardScroll ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
          >
            {SHOCKWAVE_CIRCLES.map((circle, i) => (
              <ShockwaveCircleItem
                key={circle.id}
                circle={circle}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>

          {/* ── INTACT LAYER ─────────────────────────────────────────────── */}
          <motion.div
            style={{ opacity: intactOpacity, zIndex: 5 }}
            className={`collision-stage ${isColliding ? "is-colliding" : ""} absolute inset-0 flex flex-col items-center justify-center px-4`}
          >
            <div className="flex items-center justify-center select-none pointer-events-none whitespace-nowrap">
              <motion.span
                style={{ x: leftX }}
                className="collision-word collision-word-left font-display text-paper inline-block"
              >
                {firstWord}
              </motion.span>
              <motion.span
                style={{ x: rightX }}
                className="collision-word collision-word-right font-display text-[#ed1238] inline-block"
              >
                {secondWord}
              </motion.span>
            </div>

            <motion.div
              style={{ opacity: subtitleOpacity, y: subtitleY }}
              className="mt-4 sm:mt-6 px-4 text-center pointer-events-none"
            >
              <p className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-[#ed1238] uppercase font-semibold">
                {subtitle}
              </p>
            </motion.div>
          </motion.div>

          {/* ── 14 DIAGONAL SHARDS — tilt at break, scatter-fall downward ─ */}
          {SHARDS.map((shard) => (
            <ShardPiece
              key={shard.id}
              shard={shard}
              scrollYProgress={scrollYProgress}
              firstWord={firstWord}
              secondWord={secondWord}
            />
          ))}

          {/* Keep scrolling cue */}
          <motion.div
            style={{ opacity: keepScrollingOpacity, y: keepScrollingY, zIndex: 15 }}
            className="absolute bottom-10 flex flex-col items-center gap-2 pointer-events-none select-none"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-paper/70">
              ( Keep scrolling )
            </span>
            <span className="text-[#ed1238] text-base animate-bounce">↓</span>
          </motion.div>
        </div>
      </div>
      {children ? (
        <div className="relative z-20 -mt-[100vh]">
          {children}
        </div>
      ) : null}
    </section>
  );
}
