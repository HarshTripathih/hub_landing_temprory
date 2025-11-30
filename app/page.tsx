// app/page.tsx
import Footer from "@/components/Footer/Footer";
import EnquiryModal from "@/components/Modal/EnquiryForm";
import AboutSection from "@/components/landing/AboutSection/AboutSection";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";

// Import all your client components (no issue)

export const metadata: Metadata = {
  metadataBase: new URL("https://alienshub.in"),
  title: "Aliens Hub",
  description: "Invest in premium plots at Aliens Hub — Hyderabad’s most luxurious integrated township with unmatched connectivity and amenities.",
  keywords: [
    "Aliens Hub",
    "realestate",
    "plots in hyderabad",
    "luxury villa plots",
  ],
  openGraph: {
    title: "Aliens Hub",
    description: "Invest in premium plots at Aliens Hub — Hyderabad’s most luxurious integrated township with unmatched connectivity and amenities.",
    url: "https://alienshub.in",
    siteName: "Aliens Hub",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aliens Hub ",
    images: ["/og.png"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://alienshubproject.com",
  },
  icons: {
    icon: "/favicon.ico",         // default icon
    shortcut: "/favicon.ico",        // alternative
    apple: "/apple-touch-icon.png",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aliens Hub",
    url: "https://alienshub.in",
    logo: "https://alienshub.in/logo.png",
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* SEO-Friendly Sections (Client or Server both fine) */}
      <main>
        <Navbar/>
        <HeroSection/>
        <EnquiryModal />
        {/* <AboutSection/> */}
        <Footer/>
      </main>
    </>
  );
}
