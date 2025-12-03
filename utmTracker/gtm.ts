// utmTracker/gtm.ts

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Push event to Google Tag Manager dataLayer
 */
export const pushGTMEvent = (data: Record<string, any>) => {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(data);

      console.log("📩 GTM Event Pushed:", data);
    }
  } catch (err) {
    console.error("❌ GTM push error:", err);
  }
};
