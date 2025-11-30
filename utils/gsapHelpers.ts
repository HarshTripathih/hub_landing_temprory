"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Register the plugin once
if (typeof window !== "undefined" && !(gsap as any).plugins?.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pin an element during scroll
 */
export const pinElement = (
  target: gsap.DOMTarget,
  start: string = "top top",
  end: string = "+=100%"
) => {
  ScrollTrigger.create({
    trigger: target,
    start,
    end,
    pin: true,
    scrub: true,
  });
};

/**
 * Fade in element on scroll
 */
export const fadeInOnScroll = (
  target: gsap.DOMTarget,
  options: Partial<ScrollTrigger.StaticVars> = {}
) => {
  gsap.fromTo(
    target,
    { autoAlpha: 0, y: 50 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: target,
        start: "top 80%",
        toggleActions: "play none none reverse",
        ...options, // ✅ Typed correctly
      },
    }
  );
};

/**
 * Kill all ScrollTriggers and clear GSAP timelines
 */
export const clearAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.globalTimeline.clear();
};
