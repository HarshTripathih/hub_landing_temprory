"use client";

import { useCallback, useEffect, useState } from "react";

const COOKIE_NAME = "brochure_access";

/**
 * Read cookie safely on client
 */
function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );

  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Parse project list from cookie
 */
function getProjectsFromCookie(): string[] {
  const value = getCookie(COOKIE_NAME);
  if (!value) return [];
  return value.split(",").map(p => p.trim());
}

export function useBrochureAccess(projectSlug: string) {
  const [hasAccess, setHasAccess] = useState(false);

  const checkAccess = useCallback(() => {
    const projects = getProjectsFromCookie();
    setHasAccess(projects.includes(projectSlug));
  }, [projectSlug]);

  useEffect(() => {
    checkAccess();

    // 🔔 Listen for updates after form submit
    window.addEventListener("brochure-updated", checkAccess);

    return () => {
      window.removeEventListener("brochure-updated", checkAccess);
    };
  }, [checkAccess]);

  return {
    hasAccess,
  };
}
