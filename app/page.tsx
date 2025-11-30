// app/page.tsx
import Footer from "@/components/Footer/Footer";
import EnquiryModal from "@/components/Modal/EnquiryForm";
import AboutSection from "@/components/landing/AboutSection/AboutSection";
import ContactSection from "@/components/landing/ContactSection/ContactSection";
import HeroSection from "@/components/landing/HeroSection/HeroSection";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";

// Import all your client components (no issue)

export const metadata: Metadata = {
  metadataBase: new URL("https://alienshub.in"),
  title: "Aliens Hub — Web Development, IT Solutions & SaaS Services",
  description:
    "Aliens Hub provides web development, SaaS products, AI automation, and IT services. Empowering businesses with modern tech solutions.",
  keywords: [
    "Aliens Hub",
    "web development",
    "Next.js agency",
    "SaaS development",
    "IT solutions",
    "website development India",
  ],
  openGraph: {
    title: "Aliens Hub — Premium Web Development Agency",
    description:
      "Modern websites, SaaS apps, cloud solutions and automation — built for speed, scale, and performance.",
    url: "https://alienshub.in",
    siteName: "Aliens Hub",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aliens Hub — Web Development & SaaS Services",
    images: ["/og.png"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://alienshub.in",
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
        <AboutSection/>
        <ContactSection/>
        <Footer/>
      </main>
    </>
  );
}
