"use client";

import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomButton } from "@/uiComponents/Button";
import IconGridComponent from "@/components/IconGrid/iconGridComponent";
import { useWebsiteUTMCampaign } from "@/utils/utmHelper";
import { pushGTMEvent } from "@/utmTracker/gtm";

export default function HeroSection() {
  const [hasAccess, setHasAccess] = useState(false);
  const campaign = useWebsiteUTMCampaign();

  // -----------------------------
  // 🍪 BROCHURE ACCESS CHECK
  // -----------------------------
  useEffect(() => {
    const checkCookie = () => {
      const cookie = document.cookie.includes("brochure_filled=yes");
      setHasAccess(cookie);
    };

    checkCookie();
    window.addEventListener("brochure-updated", checkCookie);
    return () => window.removeEventListener("brochure-updated", checkCookie);
  }, []);


  // -----------------------------
  // 📄 BROCHURE DOWNLOAD
  // -----------------------------
  const handleDownload = () => {
    if (hasAccess) {
      window.open("/Hub-Brochure.pdf", "_blank");

      pushGTMEvent({
        event: "brochureDirectDownload",
        source: "Hero Section",
      });
    } else {
      pushGTMEvent({
        event: "enquireClick",
        action: "openModal",
        location: "Hero Section",
        utm_content: "Download Brochure",
      });
      const utmEvent = new CustomEvent("open-enquiry-modal", {
        detail: {
          utm: {
            utm_medium: "Hero Section",
            utm_content: "Download Brochure",
            utm_source: "Hub Landing",
            utm_campaign: campaign,
          },
          cta: {
            event: "brochureleadFormSuccess",
            action: "Brochure Download Enquire Submitted",
            lead_source: "home_download_brochure",
          },
        },
      });

      window.dispatchEvent(utmEvent);
      document.getElementById("enquiryModal")?.classList.remove("hidden");
    }
  };

  // -----------------------------
  // 🎞 GSAP ANIMATIONS
  // -----------------------------
  useGSAP(() => {
    gsap.from(".hero-title", { y: 30, opacity: 0, duration: 1 });
    gsap.from(".hero-desc", { y: 30, opacity: 0, delay: 0.3, duration: 1 });
    gsap.from(".hero-video-wrapper", {
      scale: 0.95,
      opacity: 0,
      delay: 0.6,
      duration: 1.2,
    });
  }, []);

  return (
    <section
      className="relative pt-26 md:pt-40 pb-20 text-center text-white p-4 md:p-0 h-auto
      bg-[url('https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/images/hero_bg-min.jpg')]
      bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/10"></div>

      {/* TITLE */}
      <h1 className="relative z-10 hero-title text-2xl md:text-4xl font-semibold text-[#E5C27A] leading-snug">
        Hyderabad’s Only <br /> Premium Hilltop Villa Plots
      </h1>

      {/* DESCRIPTION */}
      <p
        className="relative z-10 hero-desc max-w-4xl mx-auto mt-4 md:mt-8 text-lg md:text-2xl text-white leading-snug text-justify
        bg-white/10 backdrop-blur-md p-4 rounded-xl font-cormorant"
      >
        Welcome to Aliens Hub — a 700+ acre luxury township on Srisailam Highway,
        built around an exclusive 18-hole golf course, world-class amenities, and breathtaking natural terrains.
      </p>

      <IconGridComponent />

      {/* ------------------------ */}
      {/* 🎥 YOUTUBE HERO VIDEO */}
      {/* ------------------------ */}
      <div className="hero-video-wrapper max-w-6xl mx-auto mt-10 rounded-xl overflow-hidden shadow-2xl relative aspect-video">
        <iframe
          src="https://www.youtube-nocookie.com/embed/KkvG9q98yPM?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=KkvG9q98yPM&playsinline=1"
          title="Aliens Hub Hero Video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* CTA BUTTON */}
      <div className="mt-10 flex justify-center items-center">
        <CustomButton
          onClick={handleDownload}
          text="Download Brochure"
          className="px-6 py-3 text-white bg-[#1F4F59] border border-white hover:bg-[#183E45] transition-all"
        />
      </div>
    </section>
  );
}