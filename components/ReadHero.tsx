"use client";

import Image from "next/image";

export type ReadModeId = "novel" | "fanfic" | "cartoon";

type ReadMode = {
  id: ReadModeId;
  label: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const modes: ReadMode[] = [
  {
    id: "novel",
    label: "นิยาย",
    title: "เรื่องราวมากมาย รอให้คุณค้นพบ",
    description: "หลากหลายเรื่องราวและจินตนาการจากนักเขียนอิสระ",
    image: "/images/category-novel.webp",
    alt: "นักอ่านกำลังนั่งอ่านหนังสือท่ามกลางชั้นหนังสือ",
  },
  {
    id: "fanfic",
    label: "แฟนฟิค",
    title: "ต่อยอดเรื่องราวที่คุณรัก",
    description: "เปิดมุมมองใหม่ให้เรื่องโปรดและตัวละครที่อยู่ในใจ",
    image: "/images/category-fanfic.webp",
    alt: "คู่รักยืนชมวิวเมืองในช่วงเวลาพระอาทิตย์ตก",
  },
  {
    id: "cartoon",
    label: "การ์ตูน",
    title: "โลกแห่งภาพเล่าเรื่อง",
    description: "สนุกไปกับเรื่องราวและตัวละครที่พาคุณออกเดินทาง",
    image: "/images/category-cartoon.webp",
    alt: "นักวาดการ์ตูนกำลังสร้างสรรค์ผลงานในสตูดิโอ",
  },
];

type ReadHeroProps = {
  activeMode: ReadModeId;
};

export default function ReadHero({ activeMode }: ReadHeroProps) {
  const mode = modes.find((item) => item.id === activeMode) ?? modes[0];

  return (
    <section aria-label="เลือกโหมดการอ่าน" className="relative mx-auto aspect-[1400/560] w-full max-w-[1400px] overflow-hidden bg-[#101411] text-white">
      <Image
        alt={mode.alt}
        className="object-cover object-center transition-opacity duration-300"
        fill
        key={mode.image}
        priority
        sizes="100vw"
        src={mode.image}
        unoptimized
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,8,.94)_0%,rgba(3,10,8,.82)_30%,rgba(3,10,8,.28)_65%,rgba(3,10,8,.05)_100%)]" />

      <div className="relative z-10 flex h-full max-w-[570px] flex-col justify-center px-10 py-10 sm:px-14">
        <h1 className="text-[42px] font-semibold leading-none tracking-tight sm:text-[50px]">{mode.title}</h1>
        <p className="mt-4 max-w-[470px] text-[18px] leading-relaxed text-white/90">{mode.description}</p>

      </div>
    </section>
  );
}
