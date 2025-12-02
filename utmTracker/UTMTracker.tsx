'use client';

import { useEffect } from 'react';
import { getWithExpiry, setWithExpiry } from '@/utils/localstorage';
import type { UTMParams, OutbrainParams } from '@/interfaces/marketing.interface';


const UTMTracker: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);

    // ✅ Capture UTM params
    const utmData: UTMParams = {
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      utm_remarketing: urlParams.get('utm_remarketing') || undefined,
      utm_campaign_id: urlParams.get('utm_campaign_id') || undefined,
      utm_audience_id: urlParams.get('utm_audience_id') || undefined,
      utm_audience_name: urlParams.get('utm_audience_name') || undefined,
      utm_ad_id: urlParams.get('utm_ad_id') || undefined,
      utm_ad_name: urlParams.get('utm_ad_name') || undefined,
    };

    if (Object.values(utmData).some(Boolean)) {
      setWithExpiry('utmParams', utmData, 24 * 60 * 60 * 1000); // 1 day
    } else {
      const savedUTM = getWithExpiry('utmParams') as UTMParams | null;
      if (savedUTM) setWithExpiry('utmParams', savedUTM, 24 * 60 * 60 * 1000);
    }

    // ✅ Capture Outbrain params
    const outbrainData: OutbrainParams = {
      secondary_source: urlParams.get('secondary_source') || undefined,
    };

    if (outbrainData.secondary_source) {
      setWithExpiry('outbrainParams', outbrainData, 24 * 60 * 60 * 1000);
    } else {
      const savedOutbrain = getWithExpiry('outbrainParams') as OutbrainParams | null;
      if (savedOutbrain) setWithExpiry('outbrainParams', savedOutbrain, 24 * 60 * 60 * 1000);
    }
  }, []);

  return null;
};

export default UTMTracker;
