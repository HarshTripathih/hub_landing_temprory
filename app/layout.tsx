import type { Metadata } from "next";
import "./globals.css";
import { allFontVariables } from "@/utils/fonts";
import Script from "next/script";
import UTMTracker from "@/utmTracker/UTMTracker";
import ZoomBlocker from "@/components/zoomBlocker/ZoomBlocker";
import ToastProvider from "@/uiComponents/ToastProvider";


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

      {/* Google Analytics 4 (GA4) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GGA4_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
        `}
      </Script>

      {/* Microsoft Clarity Script */}
      <Script id="ms-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
        `}
      </Script>


      <body
        className={allFontVariables.join(" ")}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        <UTMTracker />
        <ZoomBlocker />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
