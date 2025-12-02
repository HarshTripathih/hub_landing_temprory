'use client';

import { useEffect, useState } from "react";
import { useWebsiteUTMCampaign } from "@/utils/utmHelper";
import HUBForm from "../Forms/hubform";

export default function FooterFormComponent({ onSuccess }: { onSuccess: () => void }) {
  const campaign = useWebsiteUTMCampaign();

  const [utmWebContext, setWebUtmContext] = useState<{
    utm_medium: string;
    utm_content: string;
    utm_source: string;
  } | null>(null);

  useEffect(() => {
    setWebUtmContext({
      utm_medium: "Hero Section",
      utm_content: "Enquire Now",
      utm_source: "Hub Landing",
    });
  }, []);

  return (
    <>
      {utmWebContext && (
        <HUBForm
          onSuccess={() => {
            onSuccess();   // 👈 send signal to parent (FooterWrapper)
          }}
          utmWebContext={{ ...utmWebContext, utm_campaign: campaign }}
        />
      )}
    </>
  );
}
