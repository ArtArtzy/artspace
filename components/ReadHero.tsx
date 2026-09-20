"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BookshelfToggleButton from "@/components/BookshelfToggleButton";

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
      className="relative mx-auto w-full max-w-[1400px] overflow-hidden bg-arn-raised text-arn-text"
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
        <BookshelfToggleButton
          className="hidden h-12 w-[250px] items-center justify-center gap-3 rounded-full border-2 border-white/80 bg-[#07100b]/70 px-7 text-base font-semibold text-white shadow-[0_8px_28px_rgba(0,0,0,0.62)] transition hover:border-white hover:bg-[#13231c]/90 focus:outline-none focus:ring-2 focus:ring-[#1be27e] focus:ring-offset-2 focus:ring-offset-[#101411] sm:inline-flex"
          icon={<BookmarkIcon />}
          title={activeSlide.hrefTitle}
        />
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

type ReadBannerIconName = "book" | "sparkle" | "panel";

const readModeBannerContent: Record<ReadModeId, {
  label: string;
  description: string;
  icon: ReadBannerIconName;
  accentClass: string;
  accentBorderClass: string;
  borderClass: string;
  backgroundClass: string;
  shadowClass: string;
}> = {
  novel: {
    label: "นิยาย",
    description: "เรื่องราวดี ๆ จากนักเขียนใน ARN SPACE",
    icon: "book",
    accentClass: "text-[#21D98B]",
    accentBorderClass: "border-[#21D98B]/15",
    borderClass: "border-[#116b4b]",
    backgroundClass: "bg-gradient-to-r from-[#0d2b20] via-[#0d2119] to-[#0b1712]",
    shadowClass: "shadow-[0_0_18px_rgba(33,217,139,.08)]",
  },
  fanfic: {
    label: "แฟนฟิค",
    description: "เรื่องราวจากจักรวาลที่คุณชื่นชอบใน ARN SPACE",
    icon: "sparkle",
    accentClass: "text-[#B86CFF]",
    accentBorderClass: "border-[#B86CFF]/15",
    borderClass: "border-[#70418f]",
    backgroundClass: "bg-gradient-to-r from-[#241533] via-[#1c1527] to-[#111016]",
    shadowClass: "shadow-[0_0_18px_rgba(184,108,255,.1)]",
  },
  cartoon: {
    label: "การ์ตูน",
    description: "เรื่องราวภาพสวยจากนักเขียนใน ARN SPACE",
    icon: "panel",
    accentClass: "text-[#39C7FF]",
    accentBorderClass: "border-[#39C7FF]/15",
    borderClass: "border-[#236c89]",
    backgroundClass: "bg-gradient-to-r from-[#102b38] via-[#10232d] to-[#0d151a]",
    shadowClass: "shadow-[0_0_18px_rgba(57,199,255,.1)]",
  },
};

function ReadBannerIcon({ icon, className }: { icon: ReadBannerIconName; className: string }) {
  if (icon === "sparkle") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <path d="m12 3 1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "panel") {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
        <rect height="15" rx="2" stroke="currentColor" strokeWidth="1.7" width="15" x="4.5" y="4.5" />
        <rect height="6" rx="1" stroke="currentColor" strokeWidth="1.5" width="6" x="9" y="9" />
        <path d="M7.5 7.5h.01M16.5 16.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M4.5 5.5h5.2a2.3 2.3 0 0 1 2.3 2.3v11a2.3 2.3 0 0 0-2.3-2.3H4.5v-11ZM19.5 5.5h-5.2A2.3 2.3 0 0 0 12 7.8v11a2.3 2.3 0 0 1 2.3-2.3h5.2v-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export default function ReadHero({ activeMode }: ReadHeroProps) {
  const activeBanner = readModeBannerContent[activeMode];
  const hero = activeMode === "novel"
    ? <HeroCarousel ariaLabel="นิยายแนะนำ" modePath="/read" slides={novelSlides} />
    : activeMode === "fanfic"
      ? <HeroCarousel ariaLabel="แฟนฟิคแนะนำ" modePath="/read/fanfic" slides={fanficSlides} />
      : <HeroCarousel ariaLabel="การ์ตูนแนะนำ" modePath="/read/cartoon" slides={cartoonSlides} />;

  return (
    <>
      {hero}
      <div className="sticky top-[82px] z-40 mx-auto w-full max-w-[1400px] bg-arn-canvas px-2 pb-1 pt-2">
        <div className={`relative flex min-h-[48px] items-center gap-2.5 overflow-hidden rounded-[8px] border px-3 py-1.5 ${activeBanner.borderClass} ${activeBanner.backgroundClass} ${activeBanner.shadowClass}`}>
          <div aria-hidden="true" className={`pointer-events-none absolute -right-10 top-1/2 h-24 w-48 -translate-y-1/2 rounded-full border blur-[1px] ${activeBanner.accentBorderClass}`} />
          <ReadBannerIcon className={`relative h-8 w-8 shrink-0 ${activeBanner.accentClass}`} icon={activeBanner.icon} />
          <h1 className="relative shrink-0 text-[23px] font-semibold leading-tight text-white sm:text-[25px]">{activeBanner.label}</h1>
          <p className="relative min-w-0 flex-1 truncate text-[10px] text-white/55 sm:text-[11px]">{activeBanner.description}</p>
          <div className="relative ml-auto hidden shrink-0 text-right leading-[1.45] sm:block">
            <p className="text-[10px] text-white/45">“จินตนาการของคุณ</p>
            <p className="text-[10px] text-white/45">อาจเป็นโลกใบใหม่หนึ่งเดียวในคราวหน้า”</p>
          </div>
        </div>
      </div>
    </>
  );
}
