'use client';

import { useState, useEffect } from 'react';
import { useWebsiteUTMCampaign } from '@/utils/utmHelper';
import { pushGTMEvent } from '@/utmTracker/gtm';

const BottomCtaStrip = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [hidden, setHidden] = useState(false);
  const campaign = useWebsiteUTMCampaign();


  // 🔹 Listen to modal open / close
  useEffect(() => {
    const hide = () => setHidden(true);
    const show = () => setHidden(false);

    window.addEventListener("hide-bottom-cta", hide);
    window.addEventListener("show-bottom-cta", show);

    return () => {
      window.removeEventListener("hide-bottom-cta", hide);
      window.removeEventListener("show-bottom-cta", show);
    };
  }, []);

  // 🔹 Brochure access check
  useEffect(() => {
    const checkCookie = () => {
      const cookie = document.cookie.includes("brochure_filled=yes");
      setHasAccess(cookie);
    };

    checkCookie();
    window.addEventListener("brochure-updated", checkCookie);

    return () => window.removeEventListener("brochure-updated", checkCookie);
  }, []);

  // ✅ IMPORTANT: hide CTA when modal is open
  if (hidden) return null;

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
    <div className="md:hidden fixed bottom-0 left-0 w-full text-white flex justify-around gap-x-1 py-1 px-1 z-40">
      <a
        href="tel:917330640040"
        onClick={handleCallClick}
        className='border border-slate-100 bg-[#3b3f03] w-1/2 flex justify-center items-center h-[6vh]'
      >
        <div className="flex items-center gap-x-2 text-sm">
          <img src="/icons/call.svg" className="w-5 h-5" />
          <span className="font-inter text-[16px]">Call</span>
        </div>
      </a>

      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-x-2 text-sm border border-slate-100 w-1/2 bg-[#3b3f03]"
      >
        <img src="/icons/enquire.svg" className="w-6 h-6" />
        <span className="font-inter text-[16px]">Enquire</span>
      </button>
    </div>
  );
};

export default BottomCtaStrip;
