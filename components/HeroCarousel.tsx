"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
 {
  image: "/images/hero-reading.webp",
  width: 1400,
  height: 560,
  alt: "พื้นที่เล็ก ๆ ของทุกเรื่องราวใหญ่ ๆ — อ่าน เขียน แบ่งปัน และเป็นส่วนหนึ่งของชุมชนนักอ่าน",
 },
 {
  image: "/images/hero-writing.webp",
  width: 1400,
  height: 560,
  alt: "เปิดหน้าถัดไป แล้วออกเดินทางไปด้วยกัน — ค้นพบเรื่องราวใหม่ ๆ จากนักเขียนที่มีบางอย่างอยากเล่า",
 },
 {
  image: "/images/hero-community.webp",
  width: 1400,
  height: 560,
  alt: "ทุกเสียงมีความหมาย เมื่อเราได้แบ่งปันกัน — พบผู้คนที่รักการอ่านและการเล่าเรื่อง ในพื้นที่ที่เป็นของคุณ",
 },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d={direction === "left" ? "m14.5 5-7 7 7 7" : "m9.5 5 7 7-7 7"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <section
      aria-label="เรื่องราวแนะนำ"
      className="relative mx-auto w-full max-w-[1400px] bg-[#101411]"
     onMouseEnter={() => setIsPaused(true)}
     onMouseLeave={() => setIsPaused(false)}
   >
      <Image
        alt={activeSlide.alt}
        className="block h-auto w-full max-w-full object-contain"
        height={activeSlide.height}
        key={activeSlide.image}
        priority={activeIndex === 0}
        sizes="100vw"
        src={activeSlide.image}
        unoptimized
        width={activeSlide.width}
      />

      <button
        aria-label="สไลด์ก่อนหน้า"
        className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 transition hover:bg-[#12d66f] hover:text-[#07100b]"
        onClick={() => goTo(activeIndex - 1)}
        type="button"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        aria-label="สไลด์ถัดไป"
        className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 transition hover:bg-[#12d66f] hover:text-[#07100b]"
        onClick={() => goTo(activeIndex + 1)}
        type="button"
      >
        <ArrowIcon direction="right" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur-sm">
        {slides.map((item, index) => (
          <button
            aria-label={`ไปยังสไลด์ที่ ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? "w-7 bg-[#1be27e]" : "w-2 bg-white/45 hover:bg-white/80"
            }`}
            key={item.image}
            onClick={() => goTo(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
