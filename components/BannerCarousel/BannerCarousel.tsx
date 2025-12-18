'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface BannerImage {
  desktop: string;
  mobile: string;
  alt: string;
}

interface BannerCarouselProps {
  banners: BannerImage[];
  interval?: number; // default 3000 ms
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = banners.length;

  // ✅ Auto slide logic with seamless looping
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSlides, interval, isPaused]);

  // ✅ Reset position instantly after reaching clone
  useEffect(() => {
    if (currentIndex === totalSlides) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700); // same as CSS transition duration
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalSlides]);

  if (!banners || totalSlides === 0) return null;

  // ✅ Manual dot click
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsTransitioning(true);
  };

  return (
    <div
      className="relative w-full overflow-hidden cursor-pointer"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Slide container (with first slide cloned at end) */}
      <div
        className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {[...banners, banners[0]].map((banner, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {/* Desktop banner */}
            <div className="hidden md:block xxs:h-[80vh] xs:h-[60vh] md:h-[84vh] lgxx:h-auto 2xl:h-[92vh]">
              <Image
                src={banner.desktop}
                alt={banner.alt}
                className="w-full h-full object-cover lgxx:object-contain 2xl:object-cover"
                width={1600}
                height={900}
                priority
                unoptimized
              />
            </div>

            {/* Mobile banner */}
            <div className="block md:hidden xxs:h-[78vh] xs:h-[80vh] w-full relative">
              <Image
                src={banner.mobile}
                alt={banner.alt}
                className="w-full h-full object-fill"
                fill
                priority
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      {totalSlides > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === (currentIndex % totalSlides)
                  ? 'bg-white scale-110'
                  : 'bg-gray-400 opacity-70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
