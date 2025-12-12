"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomButton } from "@/uiComponents/Button";
import IconGridComponent from "@/components/IconGrid/iconGridComponent";
import { useWebsiteUTMCampaign } from "@/utils/utmHelper";
import { pushGTMEvent } from "@/utmTracker/gtm";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };


  // -----------------------------
  // 🎬 VIDEO SWITCHING LOGIC
  // -----------------------------
  const videos = {
    video1: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/Videos/hero_hub_landing.mp4",
    video2: "https://d1b9peg0jj5bry.cloudfront.net/videos/globalsummit/global_summit1.mp4",
    video3: "https://d1b9peg0jj5bry.cloudfront.net/videos/globalsummit/global_summit2.mp4",
  };

  const [mainVideo, setMainVideo] = useState(videos.video1);
  const [smallVideos, setSmallVideos] = useState([
    videos.video2,
    videos.video3,
  ]);

  const handleSmallVideoClick = (index: number) => {
    const clickedVideo = smallVideos[index];

    // If clicking again → restore default main video
    if (mainVideo === clickedVideo) {
      setMainVideo(videos.video1);
      setSmallVideos([videos.video2, videos.video3]);
      return;
    }

    // Swap logic
    const newSmall = [...smallVideos];
    newSmall[index] = mainVideo;

    setMainVideo(clickedVideo);
    setSmallVideos(newSmall);
  };

  // -----------------------------

  const campaign = useWebsiteUTMCampaign();

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
          utm_medium: "Hero Section",
          utm_content: "Download Brochure",
          utm_source: "Hub Landing",
          utm_campaign: campaign,
        },
      });

      window.dispatchEvent(utmEvent);
      document.getElementById("enquiryModal")?.classList.remove("hidden");
    }
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    isPlaying ? video.pause() : video.play();
    setIsPlaying(!isPlaying);
  };

  useGSAP(() => {
    gsap.from(".hero-title", { y: 30, opacity: 0, duration: 1 });
    gsap.from(".hero-desc", { y: 30, opacity: 0, delay: 0.3, duration: 1 });
    gsap.from(".hero-video-wrapper", { scale: 0.95, opacity: 0, delay: 0.6, duration: 1.2 });
  }, []);

  return (
    <section
      className="relative pt-26 md:pt-40 pb-20 text-center text-white p-4 md:p-0 md:h-[220vh]
      bg-[url('https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/images/hero_bg-min.jpg')]
      bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <h1 className="relative z-10 hero-title text-2xl md:text-4xl font-semibold text-[#E5C27A] leading-snug">
        Hyderabad’s Only <br /> Premium Hilltop Villa Plots
      </h1>

      <p
        className="relative z-10 hero-desc max-w-4xl mx-auto mt-4 md:mt-8 text-lg md:text-2xl text-white leading-snug text-justify
          bg-white/10 backdrop-blur-md p-4 rounded-xl font-cormorant"
      >
        Welcome to Aliens Hub — a 700+ acre luxury township on Srisailam Highway,
        built around an exclusive 18-hole golf course, world-class amenities, and breathtaking natural terrains.
      </p>

      <IconGridComponent />

      {/* ------------------------ */}
      {/* MAIN VIDEO */}
      {/* ------------------------ */}
      <div className="hero-video-wrapper max-w-6xl mx-auto mt-10 rounded-xl overflow-hidden shadow-2xl relative">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-[350px] md:h-[650px] object-cover md:object-contain"
          key={mainVideo}
        >
          <source src={mainVideo} type="video/mp4" />
        </video>

        {/* BUTTON GROUP LEFT SIDE */}
        <div className="absolute bottom-4 left-4 flex flex-row gap-3">
          
          {/* Play / Pause */}
          <button
            onClick={toggleVideo}
            className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>

          {/* Mute / Unmute */}
          <button
            onClick={toggleMute}
            className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

        </div>
      </div>



      {/* ------------------------ */}
      {/* SMALL VIDEO CONTAINERS */}
      {/* ------------------------ */}

      <div className="flex justify-center gap-6 mt-6">
        {smallVideos.map((vid, index) => (
          <div
            key={index}
            className="w-[180px] h-[120px] md:w-[250px] md:h-[150px] bg-black/40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
            onClick={() => handleSmallVideoClick(index)}
          >
            <video
              src={vid}
              muted
              loop
              autoPlay
              className="w-full h-full object-cover"
            />
          </div>
        ))}
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
