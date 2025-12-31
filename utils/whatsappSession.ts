import { v4 as uuidv4 } from "uuid";
import { getWithExpiry } from "@/utils/localstorage";
import type { UTMParams, OutbrainParams } from "@/interfaces/marketing.interface";

const SESSION_KEY = "userId";

interface WhatsAppSessionInput {
  countryCode?: string;
  phone?: string;
}

export const handleWhatsAppSession = async (
  input?: WhatsAppSessionInput
) => {
  let userId = sessionStorage.getItem(SESSION_KEY);
  const isNewSession = !userId;

  if (!userId) {
    userId = uuidv4();
    sessionStorage.setItem(SESSION_KEY, userId);
  }

  const storedUTM = getWithExpiry<UTMParams>("utmParams");
  const storedOutbrain = getWithExpiry<OutbrainParams>("outbrainParams");

  const payload: any = { userId };

  // ✅ Only send phone on FIRST click
  if (isNewSession && input?.countryCode && input?.phone) {
    payload.countryCode = input.countryCode;
    payload.phone = input.phone;
    payload.selectproject = "Aliens Hub";
  }

  // ✅ Attribution only once
  if (isNewSession) {
    if (storedUTM && Object.values(storedUTM).some(Boolean)) {
      payload.utmParams = storedUTM;
    } else if (storedOutbrain && storedOutbrain.secondary_source) {
      payload.outbrainParams = storedOutbrain;
    } else if (typeof window !== "undefined") {
      payload.utmWebContext = {
        utm_source: "website",
        utm_medium: "organic",
        utm_campaign: "direct",
        utm_content: window.location.pathname,
      };
    }
  }

  fetch("/api/whatsapp/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
};
