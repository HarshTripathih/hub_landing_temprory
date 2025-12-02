"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const icons = [
  {
    icon: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/icons/rera_dtcp_approved.png",
    title: "RERA / DTCP",
    subtitle: "Approved",
  },
  {
    icon: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/icons/700plus_acres_township.png",
    title: "700+ Acres",
    subtitle: "Township",
  },
  {
    icon: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/icons/18_hole_golfcourse.png",
    title: "18 Hole",
    subtitle: "Golf Course",
  },
  {
    icon: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/icons/mucherla_future_city.png",
    title: "15 mins from",
    subtitle: "Mucherla Future city",
  },
  {
    icon: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/icons/4000plus_acres_of_reserve_forest.png",
    title: "4000+ acres of",
    subtitle: "Reserve Forest",
  },
  {
    icon: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/icons/200_1500sq_yards_plots.png",
    title: "200 - 1500",
    subtitle: "Sq yards Plots",
  },
  {
    icon: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/icons/hilltop_cliff_valleyplots.png",
    title: "Hiiltop + Cliff",
    subtitle: "+ Valley Plots ",
  },
  {
    icon: "https://d1b9peg0jj5bry.cloudfront.net/Aliens_Hub_Landing/icons/60plus_amenities.png",
    title: "60+",
    subtitle: "Amenities",
  },
];

export default function IconGridComponent() {
  const iconsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [activeSlide, setActiveSlide] = useState(0);

  // Desktop GSAP animation
  useGSAP(() => {
  if (window.innerWidth >= 1024) {
    // Desktop animation
    gsap.from(".icon-item", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  } else {
    // Mobile stagger animation
    gsap.from(".mobile-icon", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
    });
  }
}, []);


  // Scroll buttons logic
  const checkScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 5
    );
  };

  // Scroll action
  const handleIconScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 220;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });

    setTimeout(checkScrollButtons, 300);
  };

  // Detect which slide is visible
const detectActiveSlide = () => {
  const container = scrollRef.current;
  if (!container) return;

  const totalSlides = 4; // because your dots = [0,1,2,3]
  const maxScroll = container.scrollWidth - container.clientWidth;

  if (maxScroll <= 0) return;

  const scrollRatio = container.scrollLeft / maxScroll;
  const index = Math.round(scrollRatio * (totalSlides - 1));

  setActiveSlide(index);
};


  // Attach scroll events
useEffect(() => {
  const container = scrollRef.current;
  if (!container) return;

  checkScrollButtons();
  detectActiveSlide();

  container.addEventListener("scroll", () => {
    checkScrollButtons();
    detectActiveSlide();
  });

  window.addEventListener("resize", checkScrollButtons);

  return () => {
    container.removeEventListener("scroll", detectActiveSlide);
    container.removeEventListener("scroll", checkScrollButtons);
    window.removeEventListener("resize", checkScrollButtons);
  };
}, []);

  return (
    <>
      {/* DESKTOP VIEW */}
      <div
        ref={iconsRef}
        className="
          hidden lg:grid 
          mt-14 
          grid-cols-4 
          gap-10 
          max-w-6xl 
          mx-auto 
          px-4
        "
      >
        {icons.map((item, index) => (
          <div
            key={index}
            className="icon-item flex flex-col items-center text-center gap-y-2"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={80}
              height={80}
              unoptimized
              className="object-contain"
            />
            <h4 className="text-white font-medium text-sm md:text-[15px] leading-tight">
              {item.title} <br /> {item.subtitle}
            </h4>
          </div>
        ))}
      </div>

      {/* MOBILE VIEW */}
      <div className="relative w-full overflow-hidden lg:hidden mt-10 px-3">
    <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
    >
        <div className="inline-flex flex-col gap-6 w-max">

        {/* ROW 1 */}
        <div className="flex gap-6">
            {icons.slice(0, 4).map((item, i) => (
            <div
                key={i}
                className="mobile-icon min-w-[140px] flex flex-col items-center text-center"
            >
                <Image src={item.icon} alt={item.title} width={70} height={70} unoptimized />
                <p className="text-white text-sm mt-2">{item.title}</p>
                <p className="text-white text-xs">{item.subtitle}</p>
            </div>
            ))}
        </div>

        {/* ROW 2 */}
        <div className="flex gap-6">
            {icons.slice(4, 8).map((item, i) => (
            <div
                key={i}
                className="mobile-icon min-w-[140px] flex flex-col items-center text-center"
            >
                <Image src={item.icon} alt={item.title} width={70} height={70} unoptimized />
                <p className="text-white text-sm mt-2">{item.title}</p>
                <p className="text-white text-xs">{item.subtitle}</p>
            </div>
            ))}
        </div>

        </div>
    </div>

    {/* LEFT ARROW */}
    {canScrollLeft && (
        <button
        onClick={() => handleIconScroll("left")}
        className="absolute top-1/2 -translate-y-1/2 left-0 text-white bg-black/40 p-2 rounded-full"
        >
        <ChevronLeft size={26} />
        </button>
    )}

    {/* RIGHT ARROW */}
    {canScrollRight && (
        <button
        onClick={() => handleIconScroll("right")}
        className="absolute top-1/2 -translate-y-1/2 right-0 text-white bg-black/40 p-2 rounded-full"
        >
        <ChevronRight size={26} />
        </button>
    )}

    {/* DOTS */}
    <div className="flex justify-center gap-2 mt-4">
        {[0, 1, 2, 3].map((dot) => (
        <span
            key={dot}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
            activeSlide === dot ? "bg-white scale-110" : "bg-gray-500"
            }`}
        ></span>
        ))}
    </div>
      </div>
    </>
  );
}
