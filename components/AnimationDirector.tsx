"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationDirector() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          ".hero-title-character, .hero-copy, .hero-actions, .service-card, .work-card, .testimonial-card, .testimonial-line, .testimonial-author, .stats-grid, .marquee-band",
          { clearProps: "all" },
        );
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-title-character", {
          autoAlpha: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.05,
        })
        .from(".hero-copy", { autoAlpha: 0, y: 24, duration: 0.6 }, "-=0.25")
        .from(".hero-actions", { autoAlpha: 0, scale: 0.8, duration: 0.4 }, "-=0.3");

      gsap.utils.toArray<HTMLElement>(".service-card, .work-card").forEach(
        (element, index) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 100,
            duration: 0.8,
            ease: "power3.out",
            delay: element.matches(".testimonial-card") ? 0 : (index % 8) * 0.1,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              once: true,
            },
          });
        },
      );

      gsap.from(".testimonial-card", {
        autoAlpha: 0,
        x: -60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-card",
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".testimonial-line", {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".testimonial-card",
          start: "top 75%",
          once: true,
        },
      });
      gsap.from(".testimonial-author", {
        autoAlpha: 0,
        x: 40,
        duration: 0.6,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-card",
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".stats-grid", {
        autoAlpha: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".marquee-band", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".marquee-band",
          start: "top 90%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".work-card .accent-surface").forEach((surface) => {
        gsap.fromTo(
          surface,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: surface,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    return () => context.revert();
  }, []);

  return null;
}