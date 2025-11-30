"use client";

import { useState, useEffect } from "react";
import HUBForm from "../Forms/hubform";
import { X } from "lucide-react";
import { useWebsiteUTMCampaign } from "@/utils/utmHelper";

export default function EnquiryModal() {
  const closeModal = () => {
    document.getElementById("enquiryModal")?.classList.add("hidden");
  };

  const campaign = useWebsiteUTMCampaign();

  // UTM state
  const [utmWebContext, setWebUtmContext] = useState<{
    utm_medium: string;
    utm_content: string;
    utm_source: string;
  } | null>(null);

  // ❗ FIX: set UTM only once after component mounts
  useEffect(() => {
    setWebUtmContext({
      utm_medium: "Hero Section",
      utm_content: "Enquire Now",
      utm_source: "Hub Landing",
    });
  }, []);

  return (
    <div
      id="enquiryModal"
      className="hidden fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="bg-white/30 backdrop-blur-md w-[90%] max-w-md max-h-[90vh] overflow-y-auto rounded-lg p-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="border border-[#D5C9B3] hover:border-white rounded-full p-1 absolute top-6 right-6 text-[#D5C9B3] hover:text-white"
          onClick={closeModal}
        >
          <X size={24} />
        </button>

        {/* Only render form once UTM is ready */}
        {utmWebContext && (
          <HUBForm
            utmWebContext={{ ...utmWebContext, utm_campaign: campaign }}
          />
        )}
      </div>
    </div>
  );
}
