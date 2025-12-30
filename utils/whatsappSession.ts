import { v4 as uuidv4 } from "uuid";
import { getWithExpiry } from "@/utils/localstorage";
import type { UTMParams, OutbrainParams } from "@/interfaces/marketing.interface";

const SESSION_KEY = "userId";

export const handleWhatsAppSession = async () => {
  let userId = sessionStorage.getItem(SESSION_KEY);
  const isNewSession = !userId;

  if (!userId) {
    userId = uuidv4();
    sessionStorage.setItem(SESSION_KEY, userId);
  }

  const storedUTM = getWithExpiry<UTMParams>("utmParams");
  const storedOutbrain = getWithExpiry<OutbrainParams>("outbrainParams");

  const payload: any = { userId };

  // ✅ Only attach attribution on FIRST click
  if (isNewSession) {

    // 1️⃣ Paid campaigns
    if (storedUTM && Object.values(storedUTM).some(Boolean)) {
      payload.utmParams = storedUTM;
    }

    // 2️⃣ Outbrain
    else if (storedOutbrain && storedOutbrain.secondary_source) {
      payload.outbrainParams = storedOutbrain;
    }

    // 3️⃣ Website / Organic / Direct (dynamic)
    else if (typeof window !== "undefined") {
      payload.utmWebContext = {
        utm_source: "website",
        utm_medium: "organic",
        utm_campaign: "direct",
        utm_content: window.location.pathname,
      };
    }
  }

  // 🔥 Fire & forget
  fetch("/api/whatsapp/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
};
