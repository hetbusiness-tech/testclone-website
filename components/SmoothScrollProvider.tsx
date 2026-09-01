"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (lenisRef.current) return;

    let lenis: Lenis;
    let refreshFrame = 0;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.8,
        syncTouch: true,
      });
      lenisRef.current = lenis;

      const onScroll = () => {
        ScrollTrigger.update();
      };
      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      const onResize = () => {
        lenis.resize();
        ScrollTrigger.refresh();
      };

      lenis.on("scroll", onScroll);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      window.addEventListener("resize", onResize, { passive: true });

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        window.removeEventListener("resize", onResize);
        gsap.ticker.remove(onTick);
        lenis.off("scroll", onScroll);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (error) {
      lenisRef.current = null;
      console.error("Failed to initialize smooth scrolling.", error);
    }
  }, []);

  return <>{children}</>;
}

