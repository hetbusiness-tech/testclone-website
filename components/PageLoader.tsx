"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Only show loader on the very first page load (persisted via sessionStorage)
// On page refresh or internal navigation, sessionStorage prevents it from showing again.
// When the browser/tab is closed and opened afresh, the loader plays smoothly once.

export default function PageLoader() {
  const [phase, setPhase] = useState<"fill" | "fade" | "done">("done");
  const [percent, setPercent] = useState(0);
  const dismissedRef = useRef(false);

  useEffect(() => {
    // Check if loader has already been shown in this browser session
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem("technostripe_loader_seen") === "1") {
        return;
      }
    } catch {
      // Ignore storage errors
    }

    try {
      sessionStorage.setItem("technostripe_loader_seen", "1");
    } catch {
      // Ignore storage errors
    }

    // Schedule appearance and progress smoothly
    let timer: NodeJS.Timeout;
    const initTimer = setTimeout(() => {
      setPhase("fill");
      setPercent(0);

      const startTime = Date.now();
      const duration = 850; // 0.85s fill time

      timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Smooth ease-out quad curve
        const eased = 1 - Math.pow(1 - progress, 2);
        const current = Math.min(100, Math.round(eased * 100));

        setPercent(current);

        if (progress >= 1) {
          clearInterval(timer);
          setTimeout(dismiss, 100); // brief pause at 100% before fading out
        }
      }, 20);
    }, 0);

    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setPercent(100);
      setPhase("fade");
      setTimeout(() => {
        setPhase("done");
      }, 450);
    };

    // Hard fallback: never stay visible for more than 1.4 seconds
    const fallbackTimer = setTimeout(dismiss, 1400);

    // Chunk load error handler to dismiss immediately
    const handleError = (e: ErrorEvent) => {
      if (e.message?.includes("ChunkLoadError") || e.message?.includes("Loading chunk")) {
        dismiss();
      }
    };
    window.addEventListener("error", handleError);

    return () => {
      clearTimeout(initTimer);
      if (timer) clearInterval(timer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      data-nosnippet
      onClick={() => setPhase("fade")}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: phase === "fade" ? "rgba(255, 250, 250, 0)" : "rgba(255, 250, 250, 0.98)",
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
            fontWeight: 600,
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
            fontWeight: 600,
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
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "2px",
            background: "#ed1238",
            width: `${percent}%`,
            transition: "width 25ms linear",
          }}
        />
      </div>

      <style>{`
        @keyframes pl-icon-in {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
