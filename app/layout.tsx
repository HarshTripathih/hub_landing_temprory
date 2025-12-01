import type { Metadata } from "next";
import "./globals.css";
import { allFontVariables } from "@/utils/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://alienshubproject.com"),
  title: "Aliens Hub — Premium Plotted Land in Hyderabad | 700+ Acre Luxury Township",
  description:
    "Welcome to Aliens Hub — a 700+ acre luxury township on Srisailam Highway featuring an 18-hole golf course, world-class amenities, DTCP/RERA-approved premium plots, and seamless connectivity to Hyderabad Airport and ORR.",
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
      <body
        className={allFontVariables.join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
