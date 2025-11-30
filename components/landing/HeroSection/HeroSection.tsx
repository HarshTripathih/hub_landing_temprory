"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomButton } from "@/uiComponents/Button";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkCookie = () => {
      const cookie = document.cookie.includes("brochure_filled=yes");
      setHasAccess(cookie);
    };

    checkCookie();
    window.addEventListener("brochure-updated", checkCookie);

    return () => window.removeEventListener("brochure-updated", checkCookie);
  }, []);

  const handleDownload = () => {
    if (hasAccess) {
      window.open("/Hub-Brochure.pdf", "_blank");
    } else {
      document.getElementById("enquiryModal")?.classList.remove("hidden");
    }
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // GSAP Animations
  useGSAP(() => {
    gsap.from(".hero-title", { y: 30, opacity: 0, duration: 1 });
    gsap.from(".hero-desc", { y: 30, opacity: 0, delay: 0.3, duration: 1 });
    gsap.from(".hero-video-wrapper", { scale: 0.95, opacity: 0, delay: 0.6, duration: 1.2 });
  }, []);

  return (
    <section className="pt-40 md:pt-40 pb-20 text-center text-white p-4 md:p-0 md:h-[160vh]
        bg-[url('https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/images/hero_bg-min.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Title */}
      <h1 className="hero-title text-3xl md:text-4xl font-semibold text-[#E5C27A] leading-snug">
        A Premium Riverside Golfing & Living Destination
      </h1>

      {/* Subtitle */}
      <p
        className="hero-desc max-w-4xl mx-auto mt-4 text-sm md:text-xl text-gray-100 leading-snug text-justify
                  bg-white/10 backdrop-blur-md p-4 rounded-xl font-cormorant"
      >
        Welcome to Aliens Hub — a 700+ acre luxury township on Srisailam Highway, 
        built around an exclusive 18-hole golf course, world-class amenities, 
        and breathtaking natural terrains. With DTCP/RERA approvals, 
        superior infrastructure, and seamless access to the Airport and ORR, 
        the community offers unmatched trust, lifestyle, and long-term value. 
        Explore hilltop, forest-view, and golf-facing plots designed for those who seek refinement and future-ready investment. 
        Visit us to experience the scale and serenity in person.
      </p>


      {/* VIDEO BLOCK */}
      <div className="hero-video-wrapper max-w-7xl mx-auto mt-10 rounded-xl overflow-hidden shadow-2xl relative">

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[350px] md:h-[650px] object-cover"
        >
          <source src="https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/Videos/hero_hub_landing.mp4" type="video/mp4" />
        </video>

        {/* Play / Pause Button */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <CustomButton
          onClick={handleDownload}
          text="Enquire Now"
          className="px-6 py-3 text-white bg-[#1F4F59] border border-white  hover:bg-[#183E45] transition-all"
        />
      </div>
    </section>
  );
}
