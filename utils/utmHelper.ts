// src/utils/utmHelper.ts
import { usePathname } from "next/navigation";

export function useWebsiteUTMCampaign() {
  const pathname = usePathname();

  if (pathname === "/") return "Home Page";
  if (pathname.includes("/blogs")) return "Blogs";
  if (pathname.includes("/contactus")) return "Contact Us";
  if (pathname.includes("/residential")) return "Residential";
  if (pathname.includes("/spacestation/overview")) return "Space Station";
  if (pathname.includes("/alienshub/overview")) return "HUB";
  if (pathname.includes("/alienshub/villa-concept")) return "HUB";
  if (pathname.includes("/construction")) return "Construction Main Page";
  if (pathname.includes("/leadership")) return "Leadership";
  if (pathname.includes("/maintenance")) return "Maintenance";
  if (pathname.includes("/construction/spacestation")) return "Construction - Space Station";
  if (pathname.includes("/construction/hub")) return "Construction - HUB";
  if (pathname.includes("/happycustomers")) return "Happy Customers";
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
