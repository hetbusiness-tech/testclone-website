"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FILL_DURATION = 2000; // ms the bar takes to go 0→100%
const FADE_START   = FILL_DURATION + 100; // start fade-out right after fill
const UNMOUNT_AT   = FADE_START + 600;    // fully unmount after fade

export default function PageLoader() {
  const [phase, setPhase]     = useState<"fill" | "fade" | "done">("fill");
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setPercent((current) => {
        const next = Math.min(100, current + 5);
        if (next === 100) window.clearInterval(progressTimer);
        return next;
      });
    }, FILL_DURATION / 20);

    const fadeTimer = window.setTimeout(() => {
      setPercent(100);
      setPhase("fade");
    }, FADE_START);
    const unmountTimer = setTimeout(() => setPhase("done"), UNMOUNT_AT);

    return () => {
      window.clearInterval(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0b0a",
        transition: "opacity 600ms ease, visibility 600ms ease",
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
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: "#ed1238",
          letterSpacing: "0.08em",
          animation: "pl-label-in 0.4s 0.15s ease both",
        }}>
          Loading
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: "#ed1238",
          letterSpacing: "0.08em",
          animation: "pl-label-in 0.4s 0.15s ease both",
          fontVariantNumeric: "tabular-nums",
        }}>
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
            transition: "width 80ms linear",
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
