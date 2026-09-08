"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
 {
  image: "/images/hero-1.webp",
  width: 1400,
  height: 560,
  ctaPosition: { left: "calc(24% + 10px)", bottom: "11%" },
  alt: "ในคืนที่มนตราเริ่มตื่น — สองหัวใจออกเดินทางสู่ดินแดนลี้ลับ",
 },
 {
  image: "/images/hero-2.webp",
  width: 1400,
  height: 560,
  ctaPosition: { left: "calc(27% - 10px)", bottom: "13%" },
  alt: "คืนที่แสงดาวผลิบาน — สองหัวใจตัวน้อยออกเดินทางสู่สวนเวทลับ",
 },
 {
  image: "/images/hero-3.webp",
  width: 1400,
  height: 560,
  ctaPosition: { left: "25%", bottom: "10%" },
  alt: "เสียงกลองศึกแห่งสวรรค์ — เมื่อเทพสงครามก้าวลงสู่สนามรบเพื่อชี้ชะตาอาณาจักร",
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
      />

      <Link
        className="absolute z-30 inline-flex w-[220px] -translate-x-1/2 items-center justify-center rounded-full bg-[#1be27e] px-8 py-3 text-sm font-semibold text-[#07100b] shadow-[0_8px_28px_rgba(0,0,0,0.72)] ring-2 ring-black/45 transition hover:-translate-x-1/2 hover:scale-105 hover:bg-[#66f5ad] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#101411]"
        href="/read"
        style={{ left: activeSlide.ctaPosition.left, bottom: activeSlide.ctaPosition.bottom }}
      >
        อ่านนิยาย
      </Link>

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
