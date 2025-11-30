// ✅ UTM parameters interface
export interface UTMParams {
  utm_campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_term?: string;
  utm_content?: string;
  utm_remarketing?: string;
  utm_campaign_id?: string;
  utm_audience_id?: string;
  utm_audience_name?: string;
  utm_ad_id?: string;
  utm_ad_name?: string;
}

// ✅ Outbrain parameters interface
export interface OutbrainParams {
  secondary_source?: string;
}
