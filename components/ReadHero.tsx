"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type ReadModeId = "novel" | "fanfic" | "cartoon";

type HeroSlide = {
  title: string;
  hrefTitle: string;
  author: string;
  image: string;
  alt: string;
};

const novelSlides: HeroSlide[] = [
  {
    title: "Sky of Tomorrow",
    hrefTitle: "Sky of Tomorrow",
    author: "AkiStudio",
    image: "/images/read-hero-novel-full-1.webp",
    alt: "ภาพโปรโมตนิยาย Sky of Tomorrow ในโลกแฟนตาซีเหนือหมู่เกาะลอยฟ้า",
  },
  {
    title: "Lemon Days",
    hrefTitle: "Lemon Days",
    author: "sorani",
    image: "/images/read-hero-novel-full-2.webp",
    alt: "ภาพโปรโมตนิยาย Lemon Days บนสวนดาดฟ้าที่เต็มไปด้วยต้นเลมอน",
  },
  {
    title: "Blood Moon",
    hrefTitle: "Blood Moon",
    author: "Kuroi",
    image: "/images/read-hero-novel-full-3.webp",
    alt: "ภาพโปรโมตนิยาย Blood Moon ใต้แสงจันทร์สีเลือด",
  },
  {
    title: "The Starless Archive",
    hrefTitle: "The Starless Archive",
    author: "Moonlit",
    image: "/images/read-hero-novel-full-4-new.webp",
    alt: "ภาพโปรโมตนิยาย The Starless Archive ในหอดูดาวกลางทะเล",
  },
  {
    title: "The Clockwork Garden",
    hrefTitle: "The Clockwork Garden",
    author: "AkiStudio",
    image: "/images/read-hero-novel-full-5-new.webp",
    alt: "ภาพโปรโมตนิยาย The Clockwork Garden ในสวนจักรกลกลางหุบเขา",
  },
];

const fanficSlides: HeroSlide[] = [
  {
    title: "Not Just Friends (BTS)",
    hrefTitle: "Not Just Friends (BTS)",
    author: "purplemoon",
    image: "/images/read-hero-fanfic-full-1.webp",
    alt: "ภาพโปรโมตแฟนฟิค Not Just Friends (BTS) ในเมืองยามค่ำคืน",
  },
  {
    title: "Echoes of Us (Stray Kids)",
    hrefTitle: "Echoes of Us (Stray Kids)",
    author: "velvetnote",
    image: "/images/read-hero-fanfic-full-2.webp",
    alt: "ภาพโปรโมตแฟนฟิค Echoes of Us (Stray Kids) หลังเวทีคอนเสิร์ต",
  },
  {
    title: "Moonlit Promise (BTS)",
    hrefTitle: "Moonlit Promise (BTS)",
    author: "purplemoon",
    image: "/images/read-hero-fanfic-full-3.webp",
    alt: "ภาพโปรโมตแฟนฟิค Moonlit Promise (BTS) บนสวนดาดฟ้ายามค่ำคืน",
  },
  {
    title: "The Last Spell (Fantasy AU)",
    hrefTitle: "The Last Spell (Fantasy AU)",
    author: "RunePage",
    image: "/images/read-hero-fanfic-full-4.webp",
    alt: "ภาพโปรโมตแฟนฟิค The Last Spell (Fantasy AU) ในหอจดหมายเหตุเวทมนตร์",
  },
  {
    title: "Midnight Signal (ENHYPEN)",
    hrefTitle: "Midnight Signal (ENHYPEN)",
    author: "AkiMoon",
    image: "/images/read-hero-fanfic-full-5.webp",
    alt: "ภาพโปรโมตแฟนฟิค Midnight Signal (ENHYPEN) บนดาดฟ้ายามค่ำคืน",
  },
];

const cartoonSlides: HeroSlide[] = [
  {
    title: "มังกรเหนือเมฆา",
    hrefTitle: "การ์ตูนแฟนตาซี: มังกรเหนือเมฆา",
    author: "CloudDragon",
    image: "/images/read-hero-cartoon-full-1.webp",
    alt: "ภาพโปรโมตการ์ตูน มังกรเหนือเมฆา ในโลกเหนือหมู่เมฆ",
  },
  {
    title: "นครโฮโลแกรม",
    hrefTitle: "การ์ตูนไซไฟ: นครโฮโลแกรม",
    author: "NeonPanel",
    image: "/images/read-hero-cartoon-full-2.webp",
    alt: "ภาพโปรโมตการ์ตูน นครโฮโลแกรม ในเมืองแห่งอนาคต",
  },
  {
    title: "ปาร์ตี้พันสายรุ้ง",
    hrefTitle: "การ์ตูนคอมเมดี้: ปาร์ตี้พันสายรุ้ง",
    author: "JoyPanel",
    image: "/images/read-hero-cartoon-full-3.webp",
    alt: "ภาพโปรโมตการ์ตูน ปาร์ตี้พันสายรุ้ง ในเทศกาลสีสันสดใส",
  },
  {
    title: "หอนาฬิกาคืนฝน",
    hrefTitle: "การ์ตูนลึกลับ: หอนาฬิกาคืนฝน",
    author: "NoirPanel",
    image: "/images/read-hero-cartoon-full-4.webp",
    alt: "ภาพโปรโมตการ์ตูน หอนาฬิกาคืนฝน ในเมืองเก่ายามค่ำคืน",
  },
  {
    title: "ปราสาทบนฟ้า",
    hrefTitle: "การ์ตูนเกิดใหม่: ปราสาทบนฟ้า",
    author: "DawnPanel",
    image: "/images/read-hero-cartoon-full-5.webp",
    alt: "ภาพโปรโมตการ์ตูน ปราสาทบนฟ้า เหนือทะเลเมฆ",
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

function HeroCarousel({ ariaLabel, modePath, slides }: { ariaLabel: string; modePath: string; slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <section
      aria-label={ariaLabel}
      className="relative w-full overflow-hidden bg-[#101411] text-white"
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
        className="absolute bottom-[11%] left-[6%] z-30 flex items-center gap-2 sm:gap-3"
      >
        <Link
          className="inline-flex h-8 w-[clamp(90px,15vw,220px)] items-center justify-center gap-2 rounded-full bg-[#1be27e] px-2 text-xs font-semibold text-[#07100b] shadow-[0_8px_28px_rgba(0,0,0,0.72)] ring-2 ring-black/45 transition hover:scale-105 hover:bg-[#66f5ad] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#101411] sm:h-12 sm:text-base"
          href={`${modePath}?title=${encodeURIComponent(activeSlide.hrefTitle)}`}
        >
          อ่านเลย <span aria-hidden="true" className="text-xl leading-none">→</span>
        </Link>
        <button
          className="hidden h-12 w-[250px] items-center justify-center gap-3 rounded-full border-2 border-white/80 bg-[#07100b]/70 px-7 text-base font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.62)] transition hover:border-white hover:bg-[#13231c]/90 focus:outline-none focus:ring-2 focus:ring-[#1be27e] focus:ring-offset-2 focus:ring-offset-[#101411] sm:inline-flex"
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

type ReadHeroProps = {
  activeMode: ReadModeId;
};

export default function ReadHero({ activeMode }: ReadHeroProps) {
  if (activeMode === "novel") {
    return <HeroCarousel ariaLabel="นิยายแนะนำ" modePath="/read" slides={novelSlides} />;
  }

  if (activeMode === "fanfic") {
    return <HeroCarousel ariaLabel="แฟนฟิคแนะนำ" modePath="/read/fanfic" slides={fanficSlides} />;
  }

  return <HeroCarousel ariaLabel="การ์ตูนแนะนำ" modePath="/read/cartoon" slides={cartoonSlides} />;
}
