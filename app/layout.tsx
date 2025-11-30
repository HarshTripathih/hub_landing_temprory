import type { Metadata } from "next";
import "./globals.css";
import { allFontVariables } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Aliens Hub — Premium Plotted Land in Hyderabad",
  description: "Invest in premium plots at Aliens Hub — Hyderabad’s most luxurious integrated township with unmatched connectivity and amenities.",
  openGraph: {
    title: "Aliens Hub — Premium Plotted Land in Hyderabad",
    description: "Explore premium plotted developments by Aliens Group.",
    url: "https://alienshub.com",
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
    title: "Aliens Hub — Premium Plotted Land",
    description: "Your investment destination at Hyderabad’s fastest-growing hub.",
    images: ["/images/alienshub-og.jpg"],
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
