"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
 {
  image: "/images/hero-home-full-1.webp",
  alt: "ในคืนที่มนตราเริ่มตื่น — สองหัวใจออกเดินทางสู่ดินแดนลี้ลับ",
 },
 {
  image: "/images/hero-home-full-2.webp",
  alt: "คืนที่แสงดาวผลิบาน — สองหัวใจตัวน้อยออกเดินทางสู่สวนเวทลับ",
 },
 {
  image: "/images/hero-home-full-3.webp",
  alt: "เสียงกลองศึกแห่งสวรรค์ — เมื่อเทพสงครามก้าวลงสู่สนามรบเพื่อชี้ชะตาอาณาจักร",
 },
 {
  image: "/images/hero-home-full-4.webp",
  alt: "ประตูสู่โลกใบใหม่ — ทุกหน้ากระดาษคือการผจญภัย",
 },
 {
  image: "/images/hero-home-full-5.webp",
  alt: "เรื่องเล่าที่รอคุณค้นพบ — เปิดหน้าต่อไป แล้วออกเดินทางด้วยกัน",
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

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M6.75 4.75A1.75 1.75 0 0 1 8.5 3h7a1.75 1.75 0 0 1 1.75 1.75v16l-5.25-3.25-5.25 3.25v-16Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
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
      className="relative w-full bg-[#101411]"
     onMouseEnter={() => setIsPaused(true)}
     onMouseLeave={() => setIsPaused(false)}
   >
      <Image
        alt={activeSlide.alt}
        className="block h-auto w-full object-contain"
        height={380}
        key={activeSlide.image}
        priority={activeIndex === 0}
        sizes="100vw"
        src={activeSlide.image}
        unoptimized
        width={1400}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
      />

      <div
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 lg:bottom-[12%] lg:left-[calc(24%+10px)]"
      >
        <Link
          className="inline-flex h-9 w-[130px] items-center justify-center gap-2 rounded-full bg-[#1be27e] px-3 text-sm font-semibold text-[#07100b] shadow-[0_8px_28px_rgba(0,0,0,0.72)] ring-2 ring-black/45 transition hover:scale-105 hover:bg-[#66f5ad] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#101411] lg:h-12 lg:w-[220px] lg:px-8 lg:text-base"
          href="/read"
        >
          อ่านเลย <span aria-hidden="true" className="text-xl leading-none">→</span>
        </Link>
        <button
          className="hidden h-12 w-[250px] items-center justify-center gap-3 rounded-full border-2 border-white/80 bg-[#07100b]/70 px-7 text-base font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.62)] transition hover:border-white hover:bg-[#13231c]/90 focus:outline-none focus:ring-2 focus:ring-[#1be27e] focus:ring-offset-2 focus:ring-offset-[#101411] lg:inline-flex"
          type="button"
        >
          <BookmarkIcon />
          เพิ่มเข้าชั้นหนังสือ
        </button>
      </div>

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
