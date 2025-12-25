"use client";

import { useEffect, useRef, useState } from "react";
import { pushGTMEvent } from "@/utmTracker/gtm";
import { useWebsiteUTMCampaign } from "@/utils/utmHelper";
import Image from "next/image";
import { X } from "lucide-react";

const POPUP_SESSION_KEY = "year_end_offer_seen";

const YearEndOfferModal = () => {
  const [open, setOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const campaign = useWebsiteUTMCampaign();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // -----------------------------
  // 🔹 Auto Open (Once per session)
  // -----------------------------
  useEffect(() => {
    if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;

    timerRef.current = setTimeout(() => {
      setOpen(true);
    //   sessionStorage.setItem(POPUP_SESSION_KEY, "true");

      window.dispatchEvent(new Event("hide-bottom-cta"));

      pushGTMEvent({
        event: "yearEndOfferPopupView",
        location: "Auto Popup",
      });
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // -----------------------------
  // 🔹 Lock body scroll
  // -----------------------------
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // -----------------------------
  // 🔹 Close Modal
  // -----------------------------
  const closeModal = () => {
    setOpen(false);
    window.dispatchEvent(new Event("show-bottom-cta"));

    if (timerRef.current) clearTimeout(timerRef.current);

    pushGTMEvent({
      event: "yearEndOfferPopupClose",
    });
  };

  // -----------------------------
  // 🔹 Brochure Access
  // -----------------------------
  useEffect(() => {
    const checkCookie = () => {
      setHasAccess(document.cookie.includes("brochure_filled=yes"));
    };

    checkCookie();
    window.addEventListener("brochure-updated", checkCookie);
    return () => window.removeEventListener("brochure-updated", checkCookie);
  }, []);

  // -----------------------------
  // 🔹 CTA Handlers
  // -----------------------------
  const handleDownload = () => {
    if (hasAccess) {
      window.open("/Hub-Brochure.pdf", "_blank");

      pushGTMEvent({
        event: "OfferbrochureDirectDownload",
        source: "Offer Modal",
      });
    } else {
      pushGTMEvent({
        event: "OfferEnquireClick",
        location: "Year End Offer Modal",
      });

      window.dispatchEvent(
        new CustomEvent("open-enquiry-modal", {
          detail: {
            utm_medium: "Popup",
            utm_content: "Year End Offer",
            utm_source: "Hub Landing",
            utm_campaign: campaign,
          },
        })
      );

      document.getElementById("enquiryModal")?.classList.remove("hidden");
    }
  };

  const handleCallClick = () => {
    pushGTMEvent({
      event: "OfferCallClick",
      location: "Year End Offer Modal",
      phone: "917330640040",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-t-xl">

        {/* ❌ Close */}
        <button
          onClick={closeModal}
          className="cursor-pointer absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow"
        >
          <X size={22} />
        </button>

        {/* 🖼 Images */}
        <div className="relative w-full rounded-t-xl">
            {/* Desktop Image */}
            <div className="hidden md:block relative w-full h-[420px] lg:h-[480px] xl:h-[520px] rounded-t-xl">
                <Image
                src="https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/offers/yearend_offer_flex_desktop.jpeg"
                alt="Year End Offer"
                fill
                priority
                className="object-cover rounded-t-xl"
                sizes="(min-width: 1024px) 900px, (min-width: 768px) 800px, 100vw"
                />
            </div>

            {/* Mobile Image */}
            <div className="md:hidden relative w-full aspect-[4/5] rounded-t-xl">
                <Image
                src="https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/offers/yearend_offer_phone.jpeg"
                alt="Year End Offer"
                fill
                priority
                className="object-cover rounded-t-xl"
                sizes="100vw"
                />
            </div>
        </div>


        {/* 📞 Mobile CTA (inside modal) */}
        <div className="flex gap-x-1 border-t rounded-b-xl">
          <a
            href="tel:917330640040"
            onClick={handleCallClick}
            className="border border-slate-100 rounded-b-xl bg-[#3b3f03] w-1/2 flex justify-center items-center h-[8vh] text-white"
          >
            <img src="/icons/call.svg" className="w-5 h-5 mr-2" />
            Call
          </a>

          <button
            onClick={handleDownload}
            className="cursor-pointer border border-slate-100 rounded-b-xl bg-[#3b3f03] w-1/2 flex justify-center items-center h-[8vh] text-white"
          >
            <img src="/icons/enquire.svg" className="w-6 h-6 mr-2" />
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
};

export default YearEndOfferModal;
