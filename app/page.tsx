// app/page.tsx
import Footer from "@/components/Footer/Footer";
import EnquiryModal from "@/components/Modal/EnquiryForm";
// import AboutSection from "@/components/landing/AboutSection/AboutSection";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";

// Import all your client components (no issue)

export const metadata: Metadata = {
  metadataBase: new URL("https://alienshubproject.com"),
  title: "Aliens Hub – 700+ Acre Luxury Township on Srisailam Highway | Golf Course Plots",
  description:
    "Welcome to Aliens Hub — a 700+ acre ultra-luxury township on Srisailam Highway featuring an exclusive 18-hole golf course, world-class amenities, DTCP/RERA-approved plots, and seamless access to Hyderabad Airport & ORR. Explore hilltop, forest-view, and golf-facing premium villa plots for refined living and future-ready investment.",
  keywords: [
    "Aliens Hub",
    "Aliens Hub Hyderabad",
    "Aliens Hub Srisailam Highway",
    "luxury township Hyderabad",
    "golf course plots Hyderabad",
    "DTCP approved plots Hyderabad",
    "RERA approved plots Hyderabad",
    "premium villa plots Hyderabad",
    "plots near Hyderabad Airport",
    "open plots in Hyderabad",
    "investment plots Hyderabad",
    "hilltop plots Hyderabad",
    "forest view plots Hyderabad",
    "golf facing plots",
    "real estate Hyderabad"
  ],
  openGraph: {
    title:
      "Aliens Hub – 700+ Acre Luxury Township | 18-Hole Golf Course | Premium Plots",
    description:
      "Discover Aliens Hub, a mega 700+ acre luxury township with an 18-hole golf course, DTCP/RERA approvals, world-class clubhouses, scenic terrains, and excellent Airport & ORR connectivity. Explore premium hilltop, forest-view, and golf-facing plots.",
    url: "https://alienshubproject.com",
    siteName: "Aliens Hub",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Aliens Hub – Premium Golf-Course Township on Srisailam Highway | Luxury Plots",
    description:
      "Experience a 700+ acre world-class township featuring golf-course plots, DTCP/RERA approvals, and unmatched connectivity.",
    images: ["/og.png"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://alienshubproject.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aliens Hub",
    url: "https://alienshubproject.com",
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
