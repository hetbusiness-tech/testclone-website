/* Browser console analyzer for Navbar Digital and its clone. */
(() => {
  const getName = (element) => {
    if (!element) return "unknown";
    if (typeof element.className === "string" && element.className) {
      return element.className;
    }
    return element.id || element.tagName?.toLowerCase() || "unknown";
  };

  const analyzeCssAnimations = () => {
    const animations = [];
    document.querySelectorAll("*").forEach((element) => {
      const style = getComputedStyle(element);
      if (style.animationName === "none") return;
      animations.push({
        element: getName(element),
        animationName: style.animationName,
        duration: style.animationDuration,
        delay: style.animationDelay,
        iterationCount: style.animationIterationCount,
        timingFunction: style.animationTimingFunction,
      });
    });
    return animations;
  };

  const analyzeGsapAnimations = () => {
    if (!window.gsap?.globalTimeline) return [];

    return window.gsap.globalTimeline
      .getChildren(true, true, true)
      .flatMap((animation) => {
        const targets = animation.targets?.() ?? [];
        return [{
          type: animation.data || animation.constructor?.name || "gsap",
          targets: targets.map(getName),
          duration: animation.duration?.(),
          progress: animation.progress?.(),
          paused: animation.paused?.(),
          vars: animation.vars
            ? {
                ease: animation.vars.ease,
                repeat: animation.vars.repeat,
                stagger: animation.vars.stagger,
              }
            : undefined,
        }];
      });
  };

  const analyzeScrollTriggers = () => {
    if (!window.ScrollTrigger?.getAll) return [];
    return window.ScrollTrigger.getAll().map((trigger) => ({
      trigger: getName(trigger.trigger),
      start: trigger.vars.start ?? "not set",
      end: trigger.vars.end ?? "not set",
      scrub: trigger.vars.scrub ?? false,
      once: trigger.vars.once ?? false,
      pinned: Boolean(trigger.pin),
    }));
  };

  const analyzeSections = () => {
    const selectors = {
      hero: ".hero-interactive, [class*='hero']",
      services: ".service-card, [class*='service']",
      work: ".work-card, [class*='work']",
      testimonial: ".testimonial-card, blockquote",
      marquee: ".marquee-track, [class*='marquee']",
    };

    return Object.fromEntries(
      Object.entries(selectors).map(([name, selector]) => {
        const element = document.querySelector(selector);
        if (!element) return [name, null];
        const style = getComputedStyle(element);
        return [name, {
          element: getName(element),
          opacity: style.opacity,
          transform: style.transform,
          transition: style.transition,
          width: element.offsetWidth,
          height: element.offsetHeight,
        }];
      }),
    );
  };

  const analyze = () => ({
    timestamp: new Date().toISOString(),
    url: window.location.href,
    gsapAnimations: analyzeGsapAnimations(),
    cssAnimations: analyzeCssAnimations(),
    scrollTriggers: analyzeScrollTriggers(),
    sections: analyzeSections(),
    performance: {
      elementCount: document.querySelectorAll("*").length,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    },
  });

  const data = analyze();
  window.navbarAnimationData = data;
  console.log("Navbar animation analysis", data);
  console.log("Saved as window.navbarAnimationData");

  window.saveNavbarAnimationData = (label = "YOUR_CLONE") => {
    window[label] = data;
    console.log(`Saved animation data as window.${label}`);
    return data;
  };

  window.exportNavbarAnimationData = (label = "site") => {
    const payload = JSON.stringify(data, null, 2);
    const output = `=== ${label.toUpperCase()} ANIMATION DATA ===\n${payload}`;
    console.log(output);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(output).catch(() => {});
    }
    return output;
  };

  window.compareNavbarAnimationData = (original, clone) => {
    const sections = ["hero", "services", "work", "testimonial", "marquee"];
    const sectionDiffs = Object.fromEntries(
      sections.map((section) => {
        const originalSection = original?.sections?.[section];
        const cloneSection = clone?.sections?.[section];
        if (!originalSection || !cloneSection) {
          return [section, { status: "missing", original: Boolean(originalSection), clone: Boolean(cloneSection) }];
        }

        const differences = Object.keys(originalSection).filter(
          (key) => JSON.stringify(originalSection[key]) !== JSON.stringify(cloneSection[key]),
        );
        return [section, { status: differences.length ? "different" : "match", differences }];
      }),
    );

    const comparison = {
      originalUrl: original?.url,
      cloneUrl: clone?.url,
      gsapAnimationCount: [original?.gsapAnimations?.length ?? 0, clone?.gsapAnimations?.length ?? 0],
      cssAnimationCount: [original?.cssAnimations?.length ?? 0, clone?.cssAnimations?.length ?? 0],
      scrollTriggerCount: [original?.scrollTriggers?.length ?? 0, clone?.scrollTriggers?.length ?? 0],
      sections: sectionDiffs,
    };
    console.table(comparison.sections);
    return comparison;
  };
})();
