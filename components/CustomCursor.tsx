"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInServices, setIsInServices] = useState(false);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const inServices = Boolean(target.closest("#services a"));
      setIsInServices(inServices);

      const isInteractive = target.closest(
        "a, button, input, textarea, [role='button'], .cursor-pointer, .interactive-item"
      );
      setIsHovering(Boolean(isInteractive) && !inServices);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible || isInServices) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-[999999] hidden lg:flex items-center justify-center mix-blend-difference"
      aria-hidden="true"
    >
      {/* Outer Ring + Center Dot (Clean minimal dot, no arrow) */}
      <motion.div
        animate={{
          scale: isHovering ? 1.4 : 1,
          borderColor: isHovering ? "#ed1238" : "rgba(255, 255, 255, 0.75)",
          backgroundColor: isHovering ? "rgba(237, 18, 56, 0.12)" : "transparent",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex size-8 items-center justify-center rounded-full border border-white/70 shadow-[0_0_15px_rgba(255,255,255,0.2)] backdrop-blur-[0.5px]"
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.3 : 1,
            backgroundColor: isHovering ? "#ed1238" : "#ffffff",
          }}
          className="size-1.5 rounded-full bg-white transition-colors duration-200"
        />
      </motion.div>
    </motion.div>
  );
}
