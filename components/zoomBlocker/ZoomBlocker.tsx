"use client";

import { useEffect } from "react";

export default function ZoomBlocker() {
  useEffect(() => {
    const preventZoomWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const preventZoomKeys = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "_" || e.key === "0")
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventZoomWheel, { passive: false });
    window.addEventListener("keydown", preventZoomKeys, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventZoomWheel);
      window.removeEventListener("keydown", preventZoomKeys);
    };
  }, []);

  return null; // no UI needed
}
