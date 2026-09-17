"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Only show loader on the very first page load (not on client-side navigations)
let hasLoadedOnce = false;

const DURATION = 900; // 0.9s — snappy but still satisfying

export default function PageLoader() {
  const [phase, setPhase] = useState<"fill" | "fade" | "done">(() => {
    // If already loaded once in this session, skip the loader entirely
    if (hasLoadedOnce) return "done";
    return "fill";
  });
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Skip if already shown once (client-side navigation)
    if (phase === "done") return;

    let animFrame: number;
    const startTime = performance.now();

    const dismiss = () => {
      setPercent(100);
      setPhase("fade");
    };

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION);

      // Smooth ease-out quad curve
      const eased = 1 - Math.pow(1 - progress, 2);
      const currentPercent = Math.min(100, Math.floor(eased * 100));
      setPercent(currentPercent);

      if (progress < 1) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        dismiss();
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    // Hard safety fallback — always dismisses after DURATION + 200ms
    const fallbackTimer = setTimeout(dismiss, DURATION + 200);

    // Unmount after fade animation completes
    const doneTimer = setTimeout(() => {
      setPhase("done");
      hasLoadedOnce = true; // Mark as loaded so navigations skip loader
    }, DURATION + 700);

    // Also listen for chunk errors and dismiss immediately
    const handleError = (e: ErrorEvent) => {
      if (e.message?.includes("ChunkLoadError") || e.message?.includes("Loading chunk")) {
        dismiss();
      }
    };
    window.addEventListener("error", handleError);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(fallbackTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("error", handleError);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      onClick={() => setPhase("fade")}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: phase === "fade" ? "rgba(10, 11, 10, 0)" : "rgba(10, 11, 10, 0.95)",
        backdropFilter: phase === "fade" ? "blur(0px)" : "blur(24px)",
        WebkitBackdropFilter: phase === "fade" ? "blur(0px)" : "blur(24px)",
        transition:
          "opacity 400ms ease, background 400ms ease, backdrop-filter 400ms ease, -webkit-backdrop-filter 400ms ease, visibility 400ms ease",
        opacity: phase === "fade" ? 0 : 1,
        visibility: phase === "fade" ? "hidden" : "visible",
        pointerEvents: phase === "fade" ? "none" : "all",
      }}
    >
      {/* Favicon icon */}
      <Image
        src="/favicon.png"
        alt="Technostripe"
        width={72}
        height={72}
        priority
        unoptimized
        style={{
          width: "72px",
          height: "72px",
          objectFit: "contain",
          borderRadius: "14px",
          marginBottom: "28px",
          animation: "pl-icon-in 0.45s ease both",
        }}
      />

      {/* Loading / 0-100% row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "300px",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: "#ed1238",
            letterSpacing: "0.08em",
            animation: "pl-label-in 0.4s 0.15s ease both",
          }}
        >
          Loading
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: "#ed1238",
            letterSpacing: "0.08em",
            animation: "pl-label-in 0.4s 0.15s ease both",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {percent}%
        </span>
      </div>

      {/* Bar — outlined rectangle with fill */}
      <div
        style={{
          width: "300px",
          height: "18px",
          border: "1.5px solid #ed1238",
          borderRadius: "3px",
          padding: "2px",
          boxSizing: "border-box",
          background: "transparent",
          animation: "pl-bar-in 0.4s 0.1s ease both",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "2px",
            background: "#ed1238",
            width: `${percent}%`,
            transition: "width 40ms linear",
          }}
        />
      </div>

      <style>{`
        @keyframes pl-icon-in {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pl-label-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pl-bar-in {
          from { opacity: 0; transform: scaleX(0.92); }
          to   { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
