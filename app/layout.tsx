import type { Metadata } from "next";
import "./globals.css";
import { allFontVariables } from "@/utils/fonts";
import Script from "next/script";
import UTMTracker from "@/utmTracker/UTMTracker";
import ZoomBlocker from "@/components/zoomBlocker/ZoomBlocker";
import ToastProvider from "@/uiComponents/ToastProvider";
import YearEndOfferModal from "@/components/OfferModal/YearEndOfferModal";
import WhatsAppChat from "@/components/AppChat/WhatsAppChat";

export const metadata: Metadata = {
  metadataBase: new URL("https://alienshubproject.com"),
  title: "Aliens Hub — Premium Plotted Land in Hyderabad | 700+ Acre Luxury Township",
  description:
    "Welcome to Aliens Hub — a 700+ acre luxury township on Srisailam Highway featuring an 18-hole golf course, world-class amenities, DTCP/RERA-approved premium plots, and seamless connectivity to Hyderabad Airport and ORR.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  keywords: [
    "Aliens Hub",
    "Aliens Hub Hyderabad",
    "Aliens Hub Srisailam Highway",
    "plots in Hyderabad",
    "premium villa plots Hyderabad",
    "luxury plots in Hyderabad",
    "golf course plots Hyderabad",
    "DTCP approved plots",
    "RERA approved plots",
    "open plots near Hyderabad Airport",
    "real estate Hyderabad",
    "investment plots Hyderabad",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Aliens Hub — Premium Plotted Land in Hyderabad",
    description:
      "Explore Aliens Hub — a 700+ acre premium township featuring hilltop, forest-view, and golf-facing plots with world-class amenities.",
    url: "https://alienshubproject.com",
    siteName: "Aliens Hub",
    type: "website",
    images: [
      {
        url: "/images/alienshub-og.jpg",
        width: 1200,
        height: 630,
        alt: "Aliens Hub Premium Plots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aliens Hub — Premium Plotted Land in Hyderabad",
    description:
      "Your ideal investment destination on Hyderabad’s Srisailam Highway — 700+ acre luxury township with golf-course-facing plots.",
    images: ["/images/alienshub-og.jpg"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://alienshubproject.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `}
        </Script>

        {/* Google Ads gtag.js */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);

            (function(l) {
              if (!l){
                window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>

        {/* Bing UET Script */}
        <Script
          id="bing-uet"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,t,r,u){
                var f,n,i;
                w[u]=w[u]||[];
                f=function(){
                  var o={ti:"${process.env.NEXT_PUBLIC_BING_UET_ID}", enableAutoSpaTracking: true};
                  o.q=w[u];
                  w[u]=new UET(o);
                  w[u].push("pageLoad");
                };
                n=d.createElement(t);
                n.src=r;
                n.async=1;
                n.onload=n.onreadystatechange=function(){
                  var s=this.readyState;
                  s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null);
                };
                i=d.getElementsByTagName(t)[0];
                i.parentNode.insertBefore(n,i);
              })(window,document,"script","https://bat.bing.com/bat.js","uetq");
            `,
          }}
        />
      </head>

      <body className={allFontVariables.join(" ")}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* LinkedIn NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://px.ads.linkedin.com/collect/?pid=${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}&fmt=gif`}
          />
        </noscript>

        <UTMTracker />
        <ZoomBlocker />
          {children}
          <WhatsAppChat
            phone="918977943645"
            message="Hello, I’d like to get more information about Aliens Hub."
          />
        {/* <YearEndOfferModal /> */}
        <ToastProvider />
      </body>
    </html>
  );
}
