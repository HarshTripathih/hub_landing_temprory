// src/utils/utmHelper.ts
import { usePathname } from "next/navigation";

export function useWebsiteUTMCampaign() {
  const pathname = usePathname();

  if (pathname === "/") return "Home Page";
  return pathname.replace("/", "") || "Other";
}

export function buildUTMParams(
  utm_campaign: string,
  utm_medium: string,
  utm_content: string,
  utm_source: string,
  extra: Record<string, string> = {}
) {
  return {
    utm_campaign: utm_campaign,
    utm_medium: utm_medium,
    utm_content: utm_content,
    utm_source: utm_source,
  };
}
