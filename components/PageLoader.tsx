"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import Image from "next/image";

// Only show loader on the very first page load in this browser session.
// Persisted via sessionStorage so page refreshes and internal links in the same session
// will NOT show the loader. A new browser session/tab will show the loader once.

const STORAGE_KEY = "technostripe_loader_v1";

const emptySubscribe = () => () => {};

function useIsFirstVisit() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return sessionStorage.getItem(STORAGE_KEY) !== "1";
      } catch {
        return false;
      }
    },
    () => false // on server (SSR), render nothing
  );
}

export default function PageLoader() {
  const isFirstVisit = useIsFirstVisit();
  const [phase, setPhase] = useState<"fill" | "fade" | "done">("fill");
  const [percent, setPercent] = useState(0);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (!isFirstVisit) return;

    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore storage errors
      }
      setPercent(100);
      setPhase("fade");
      setTimeout(() => {
        setPhase("done");
      }, 400);
    };

    // Smooth counter from 0% to 100% (~0.85s)
    const duration = 850;
    const intervalTime = 17;
    const step = 100 / (duration / intervalTime);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(timer);
        setTimeout(dismiss, 120);
      } else {
        setPercent(Math.floor(current));
      }
    }, intervalTime);

    // Hard fallback safety
    const fallbackTimer = setTimeout(dismiss, 1400);

    const handleError = (e: ErrorEvent) => {
      if (e.message?.includes("ChunkLoadError") || e.message?.includes("Loading chunk")) {
        dismiss();
      }
    };
    window.addEventListener("error", handleError);

    return () => {
      clearInterval(timer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("error", handleError);
    };
  }, [isFirstVisit]);

  if (!isFirstVisit || phase === "done") return null;

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
            transition: "width 20ms linear",
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
