"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ✅ Register plugin if not already done
if (typeof window !== "undefined" && !(gsap as any).plugins?.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Centralized reusable GSAP + ScrollTrigger hook
 * @param animationFn Function that receives gsap and ScrollTrigger
 */
export const useGsapAnimations = (
  animationFn: (gsapInstance: typeof gsap, ScrollTriggerInstance: typeof ScrollTrigger) => void
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      animationFn(gsap, ScrollTrigger);
    });

    return () => {
      ctx.revert(); // ✅ Safe cleanup on unmount
    };
  }, [animationFn]);
};
