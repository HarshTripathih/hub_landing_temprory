'use client';

import { useState, useEffect } from 'react';
import { useWebsiteUTMCampaign } from '@/utils/utmHelper';

const BottomCtaStrip = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const campaign = useWebsiteUTMCampaign();

  useEffect(() => {
    const checkCookie = () => {
      const cookie = document.cookie.includes("brochure_filled=yes");
      setHasAccess(cookie);
    };

    checkCookie();
    window.addEventListener("brochure-updated", checkCookie);

    return () => window.removeEventListener("brochure-updated", checkCookie);
  }, []);

  // ------------------------------------------
  // 🔹 GTM PUSH (Reusable)
  // ------------------------------------------
  const pushGTMEvent = (data: Record<string, any>) => {
    try {
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(data);
        console.log("📩 GTM Event Pushed:", data);
      }
    } catch (err) {
      console.error("❌ GTM push error:", err);
    }
  };

  // ------------------------------------------
  // 🔹 Brochure Handler
  // ------------------------------------------
  const handleDownload = () => {
    if (hasAccess) {
      window.open("/Hub-Brochure.pdf", "_blank");

      // GTM: Brochure Direct Download
      pushGTMEvent({
        event: "brochureDirectDownload",
        source: "Bottom CTA Strip",
      });

    } else {
      // GTM: Enquire Click (no access)
      pushGTMEvent({
        event: "enquireClick",
        action: "openModal",
        location: "Bottom CTA Strip",
        utm_content: "Enquire",
      });

      const utmEvent = new CustomEvent("open-enquiry-modal", {
        detail: {
          utm_medium: "Bottom Strip",
          utm_content: "Enquire",
          utm_source: "Hub Landing",
          utm_campaign: campaign,
        },
      });

      window.dispatchEvent(utmEvent);
      document.getElementById("enquiryModal")?.classList.remove("hidden");
    }
  };

  // ------------------------------------------
  // 🔹 Call Handler
  // ------------------------------------------
  const handleCallClick = () => {
    console.log("Call button clicked");

    pushGTMEvent({
      event: "callClick",
      location: "Bottom CTA Strip",
      phone: "917330640040",
    });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#3b3f03] text-white flex justify-around py-4 z-40">
      <a
        href="tel:917330640040"
        onClick={handleCallClick}
        className="flex items-center gap-x-2 text-sm"
      >
        <img src="/icons/call.svg" className="w-5 h-5" />
        <span className="font-inter text-[16px]">Call</span>
      </a>

      <button
        onClick={handleDownload}
        className="flex items-center gap-x-2 text-sm"
      >
        <img src="/icons/enquire.svg" className="w-6 h-6" />
        <span className="font-inter text-[16px]">Enquire</span>
      </button>
    </div>
  );
};

export default BottomCtaStrip;
