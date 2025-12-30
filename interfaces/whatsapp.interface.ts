export interface WhatsAppSession {
  _id: string;
  userId: string;
  clickCount: number;

  utmParams?: {
    utm_campaign?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_content?: string;
  };

  outbrainParams?: Record<string, any>;
  utmWebContext?: Record<string, any>;

  firstClickedAt: string;
  lastClickedAt: string;
  createdAt: string;
}
