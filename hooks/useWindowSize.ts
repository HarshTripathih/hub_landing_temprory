// hooks/useWindowSize.ts
"use client";
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
    device: "desktop" as "mobile" | "tablet" | "desktop",
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let device: "mobile" | "tablet" | "desktop" = "desktop";
      if (width <= 480) device = "mobile";
      else if (width <= 1024) device = "tablet";

      setSize({ width, height: window.innerHeight, device });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
