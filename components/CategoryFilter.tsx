"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Category = {
  label: string;
  lines?: readonly string[];
  special?: boolean;
  genreMenu?: boolean;
  menuOnly?: boolean;
  requiresVerification?: boolean;
  color: string;
  icon: "all" | "more" | "heart" | "double-heart" | "spark" | "bookmark" | "trending" | "flame" | "book" | "check" | "bl" | "gl" | "fantasy" | "china" | "isekai" | "romance-fantasy" | "drama" | "detective" | "mystery" | "horror" | "action" | "sci-fi" | "life" | "comedy" | "anime" | "game" | "tv" | "other";
};

const genreCategories: Category[] = [
  { label: "ทั้งหมด", color: "text-[#45ee83]", icon: "all" },
  { label: "โรแมนติก", color: "text-[#f04d9b]", icon: "double-heart" },
  { label: "วาย", color: "text-[#478fff]", icon: "bl" },
  { label: "ยูริ", color: "text-[#fc6680]", icon: "gl" },
  { label: "แฟนตาซี", color: "text-[#9869ff]", icon: "fantasy" },
  { label: "จีนโบราณ", color: "text-[#f2b84b]", icon: "china" },
  { label: "เกิดใหม่", color: "text-[#31d6c0]", icon: "isekai" },
  { label: "ลึกลับ", color: "text-[#c7ccd0]", icon: "mystery" },
  { label: "สยองขวัญ", color: "text-[#bc79ff]", icon: "horror" },
  { label: "แอ๊กชั่น", color: "text-[#ff6d55]", icon: "action" },
  { label: "ไซไฟ", color: "text-[#42e7e0]", icon: "sci-fi" },
  { label: "คอมเมดี้", color: "text-[#f4cf4e]", icon: "comedy" },
  { label: "รักผู้ใหญ่", color: "text-[#f28baf]", icon: "romance-fantasy", menuOnly: true, requiresVerification: true },
  { label: "วายห้องลับ", color: "text-[#76a9ff]", icon: "bl", menuOnly: true, requiresVerification: true },
  { label: "ยูริห้องลับ", color: "text-[#ff91ae]", icon: "gl", menuOnly: true, requiresVerification: true },
  { label: "ดราม่าเข้มข้น", color: "text-[#ff8d78]", icon: "drama", menuOnly: true },
  { label: "โรแมนซ์แฟนตาซี", color: "text-[#d28cff]", icon: "romance-fantasy", menuOnly: true },
  { label: "เกมและโลกเสมือน", color: "text-[#77b7ff]", icon: "game", menuOnly: true },
  { label: "อนิเมะ", color: "text-[#f5a1ff]", icon: "anime", menuOnly: true },
  { label: "แฟชั่นและไลฟ์สไตล์", color: "text-[#69e6c2]", icon: "life", menuOnly: true },
  { label: "เรทผู้ใหญ่", color: "text-[#ff7899]", icon: "drama", menuOnly: true, requiresVerification: true },
  { label: "โรแมนติกผู้ใหญ่", color: "text-[#f28baf]", icon: "romance-fantasy", menuOnly: true, requiresVerification: true },
  { label: "อนิเมะผู้ใหญ่", color: "text-[#f5a1ff]", icon: "anime", menuOnly: true, requiresVerification: true },
];

const categories: Category[] = [
  ...genreCategories.filter((category) => !category.menuOnly && category.label !== "ไซไฟ" && category.label !== "คอมเมดี้"),
  { label: "หมวดทั้งหมด", color: "text-[#45ee83]", icon: "more", special: true, genreMenu: true },
];

export const defaultGenreSelection = genreCategories
  .filter((category) => category.label !== "ทั้งหมด")
  .slice(0, 10)
  .map((category) => category.label);

const orderGenresWithProtectedLast = (labels: string[]) => {
  const regularGenres: string[] = [];
  const protectedGenres: string[] = [];

  labels.forEach((label) => {
    const category = genreCategories.find((item) => item.label === label);
    if (category?.requiresVerification) {
      protectedGenres.push(label);
    } else {
      regularGenres.push(label);
    }
  });

  return [...regularGenres, ...protectedGenres];
};

const homeCategories: Category[] = [
  { label: "สำหรับคุณ", lines: ["สำหรับคุณ", "คัดสรรพิเศษเพื่อคุณ"], color: "text-[#20e99a]", icon: "heart" },
  { label: "อ่านต่อ", lines: ["อ่านต่อ", "คลิกไปที่เรื่องที่ค้างไว้"], color: "text-white/80", icon: "bookmark" },
  { label: "กำลังมาแรง", lines: ["กำลังมาแรง", "เรื่องที่เป็นกระแสนิยม"], color: "text-white/80", icon: "trending" },
  { label: "จากที่ติดตาม", lines: ["จากที่ติดตาม", "อัปเดตจากนักเขียนที่คุณติดตาม"], color: "text-white/80", icon: "book" },
  { label: "เรื่องจบแล้ว", lines: ["เรื่องจบแล้ว", "เรื่องที่จบไปแล้ว"], color: "text-white/80", icon: "check" },
];

function CategoryIcon({ type }: { type: Category["icon"] }) {
  const common = {
    "aria-hidden": true,
    className: "h-7 w-7",
    fill: "none",
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "all":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="8" cy="16" r="2.6" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16" cy="16" r="2.6" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "more":
      return (
        <svg {...common}>
          <circle cx="6.5" cy="12" r="1.6" fill="currentColor" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          <circle cx="17.5" cy="12" r="1.6" fill="currentColor" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 19.2S4.2 14.8 4.2 9.3a3.7 3.7 0 0 1 6.6-2.3L12 8.3l1.2-1.3a3.7 3.7 0 0 1 6.6 2.3c0 5.5-7.8 9.9-7.8 9.9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...common}>
          <path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v13l-6.5-3.8-6.5 3.8V6A1.5 1.5 0 0 1 7 4.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
    case "trending":
      return (
        <svg {...common}>
          <path d="m4.5 17.5 4.8-4.7 3.2 2.8 6.9-7.1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          <path d="M15.8 8.5h3.6v3.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M13.7 3.2c.3 3.1-1 4.4-2.4 5.7-1.2 1.1-2.3 2.2-2.3 4.4 0 1.4.9 2.6 2.2 3.1-.7-1.6-.1-3.2 1.1-4.2.2 1.5 1.6 2.2 2.2 3.3.3.5.5 1.1.5 1.8 0 .7-.2 1.4-.6 2 2.1-.8 3.6-2.8 3.6-5.2 0-3.7-2.2-6.8-4.3-10.9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
          <path d="M9.2 20.2a5.2 5.2 0 0 1-1.5-3.6c0-1.2.4-2.2 1.2-3.2-.1 2.1 1 3.2 2.1 4.1.4.4.7.9.8 1.5.2-.8.1-1.5-.2-2.2 1.4.8 2.1 2.1 2.1 3.5 0 .6-.1 1.1-.3 1.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4.5 5.5h5.2a2.3 2.3 0 0 1 2.3 2.3v11a2.3 2.3 0 0 0-2.3-2.3H4.5v-11ZM19.5 5.5h-5.2A2.3 2.3 0 0 0 12 7.8v11a2.3 2.3 0 0 1 2.3-2.3h5.2v-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="m8.3 12.1 2.4 2.4 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      );
    case "double-heart":
      return (
        <svg {...common}>
          <path d="M10.8 13.6S5.2 10.5 5.2 7.2a2.7 2.7 0 0 1 5.1-1.3l.7 1 .7-1a2.7 2.7 0 0 1 5.1 1.3c0 3.3-5.7 6.4-5.7 6.4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" transform="translate(-1.8 -1.5) scale(.8)" />
          <path d="M13.2 18.8S7.6 15.7 7.6 12.4a2.7 2.7 0 0 1 5.1-1.3l.7 1 .7-1a2.7 2.7 0 0 1 5.1 1.3c0 3.3-5.7 6.4-5.7 6.4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" transform="translate(2.4 2.4) scale(.8)" />
        </svg>
      );
    case "spark":
    case "fantasy":
      return (
        <svg {...common}>
          <path d="m12 3 1.5 5.4L19 10l-5.5 1.6L12 17l-1.5-5.4L5 10l5.5-1.6L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
          <path d="m18.5 15 .6 2.1 2.1.6-2.1.6-.6 2.1-.6-2.1-2.1-.6 2.1-.6.6-2.1Z" fill="currentColor" />
        </svg>
      );
    case "bl":
      return (
        <Image alt="" aria-hidden="true" className="h-5 w-5 object-contain" height={737} src="/images/category-bl.png" width={737} />
      );
    case "gl":
      return (
        <Image alt="" aria-hidden="true" className="h-5 w-5 object-contain" height={737} src="/images/category-yuri.png" width={737} />
      );
    case "china":
      return (
        <svg {...common}>
          <rect height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" width="16" x="4" y="4" />
          <text fill="currentColor" fontFamily="serif" fontSize="11" fontWeight="600" textAnchor="middle" x="12" y="16.2">文</text>
        </svg>
      );
    case "isekai":
      return (
        <svg {...common}>
          <path d="M7.5 7.2A7 7 0 1 1 5.2 16M7.5 7.2V3.8M7.5 7.2H4.1M16.5 16.8A7 7 0 1 1 18.8 8M16.5 16.8v3.4M16.5 16.8h3.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
          <path d="m12 8 1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2L12 8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      );
    case "romance-fantasy":
      return (
        <svg {...common}>
          <path d="M12 20s-7.5-4.4-7.5-10a3.7 3.7 0 0 1 6.7-2.2L12 9l.8-1.2a3.7 3.7 0 0 1 6.7 2.2c0 5.6-7.5 10-7.5 10Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
          <path d="m12 3 1 2.7L16 7l-3 1.3L12 11l-1-2.7L8 7l3-1.3L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
        </svg>
      );
    case "drama":
      return (
        <svg {...common}>
          <path d="M6.2 17.9c.8-4.7 4.1-7.8 8.6-7.8 1.5 0 2.3.3 3 .8M7.5 19.5c2.4.7 5.6.2 7.2-1.7 1-1.2 1.4-2.7 1.2-4.2M8.2 7.9a4.1 4.1 0 1 1 7.5 2.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
          <path d="M12.2 7.3h.01M15.2 7.8h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
        </svg>
      );
    case "detective":
    case "mystery":
      return (
        <svg {...common}>
          <circle cx="10.7" cy="10.7" r="5.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="m15 15 4.3 4.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
        </svg>
      );
    case "horror":
      return (
        <svg {...common}>
          <path d="M5.7 18.3V10a6.3 6.3 0 0 1 12.6 0v8.3l-2.1-1.7-2.1 1.7-2.1-1.7-2.1 1.7-2.1-1.7-2.1 1.7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
          <path d="M9.3 10.2h.01M14.7 10.2h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
        </svg>
      );
    case "action":
      return (
        <Image alt="" aria-hidden="true" className="h-5 w-5 object-contain" height={737} src="/images/category-action.png" width={737} />
      );
    case "sci-fi":
      return (
        <svg {...common}>
          <path d="M7 21 15.2 8.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="m15.2 3.2 1.1 2.2 2.2 1.1-2.2 1.1-1.1 2.2-1.1-2.2-2.2-1.1 2.2-1.1 1.1-2.2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5 18.5c1.3.7 2.5.7 3.8 0M17.8 12.7l1.1 1.2 1.5.3-1.5.3-1.1 1.2-.3-1.2-1.2-.3 1.2-.3.3-1.2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
        </svg>
      );
    case "life":
      return (
        <svg {...common}>
          <path d="M7 9h10v6.5a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V9ZM7 11H5.5a2.5 2.5 0 0 0 0 5H7M17 11h1.5a2.5 2.5 0 0 1 0 5H17M9 5.5c1.5.1 2.2 1 2.2 2.5M12 5.5c1.5.1 2.2 1 2.2 2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
    case "comedy":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8.5 10.2h.01M15.5 10.2h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
          <path d="M8.5 14c1.9 2 5.1 2 7 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
        </svg>
      );
    case "anime":
      return (
        <svg {...common}>
          <path d="m12 3 1.4 6.5L19 12l-5.6 2.5L12 21l-1.4-6.5L5 12l5.6-2.5L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
    case "game":
      return (
        <svg {...common}>
          <path d="M7.5 8.2h9a4.5 4.5 0 0 1 4.2 6.2l-1.2 3.1a2.1 2.1 0 0 1-3.6.6L14 15.7h-4l-1.9 2.4a2.1 2.1 0 0 1-3.6-.6l-1.2-3.1a4.5 4.5 0 0 1 4.2-6.2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
          <path d="M7 10.7v4M5 12.7h4M16.5 12h.01M18.5 14h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect height="11" rx="1.5" stroke="currentColor" strokeWidth="1.7" width="16" x="4" y="6" />
          <path d="m9 3 3 3 3-3M9 17h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 4.5a7.5 7.5 0 1 0 7.1 10M12 4.5l3.2 2.3M12 4.5l-.3 3.8M19.1 14.5l-3.6.8M19.1 14.5l-2.2-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      );
  }
}

export type CategoryFilterProps = {
  selected: string;
  onSelect: (category: string) => void;
  onSelectGenres?: (categories: string[]) => void;
  selectedGenres?: string[];
  myCategoryCount?: number;
  showMyCategory?: boolean;
  variant?: "categories" | "home";
};

export default function CategoryFilter({ selected, onSelect, onSelectGenres, selectedGenres = [], myCategoryCount = 0, showMyCategory = false, variant = "categories" }: CategoryFilterProps) {
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);
  const [draftGenres, setDraftGenres] = useState<string[]>(orderGenresWithProtectedLast(selectedGenres.length > 0 ? selectedGenres : defaultGenreSelection));
  const [isVerified, setIsVerified] = useState(false);
  const [draggedGenreIndex, setDraggedGenreIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isGenreMenuOpen) {
      setDraftGenres(orderGenresWithProtectedLast(selectedGenres.length > 0 ? selectedGenres : defaultGenreSelection));
    }
  }, [isGenreMenuOpen, selectedGenres]);

  const visibleCategories: Category[] = variant === "home"
    ? homeCategories
    : showMyCategory
    ? [
        {
          label: "หมวดของฉัน",
          lines: ["หมวดของฉัน"],
          special: true,
          color: "text-[#45ee83]",
          icon: "heart",
        },
        ...categories,
      ]
    : categories;
  const availableGenres = genreCategories.filter((category) => category.label !== "ทั้งหมด");

  const pinnedCategories = visibleCategories.filter((category) => category.label === "หมวดของฉัน" || category.label === "ทั้งหมด");
  const orderedAvailableGenres = [
    ...availableGenres.filter((category) => !category.requiresVerification),
    ...availableGenres.filter((category) => category.requiresVerification),
  ];
  const orderedVisibleCategories = variant === "home"
    ? visibleCategories
    : [
        ...pinnedCategories,
        ...orderGenresWithProtectedLast(selectedGenres)
          .map((label) => visibleCategories.find((category) => category.label === label) ?? genreCategories.find((category) => category.label === label))
          .filter((category): category is Category => {
            if (!category) return false;
            return !pinnedCategories.includes(category);
          }),
        ...visibleCategories.filter((category) => category.genreMenu),
      ];

  const toggleGenre = (category: Category) => {
    if (category.requiresVerification && !isVerified) return;

    setDraftGenres((current) => orderGenresWithProtectedLast(
      current.includes(category.label)
        ? current.filter((label) => label !== category.label)
        : current.length < 10 ? [...current, category.label] : current,
    ));
  };

  const removeGenre = (label: string) => {
    setDraftGenres((current) => orderGenresWithProtectedLast(current.filter((item) => item !== label)));
  };

  const applyGenres = () => {
    if (draftGenres.length === 0) return;
    onSelectGenres?.(orderGenresWithProtectedLast(draftGenres));
    setIsGenreMenuOpen(false);
  };

  const moveGenre = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= draftGenres.length) return;

    setDraftGenres((current) => {
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return orderGenresWithProtectedLast(next);
    });
  };

  const dropGenre = (targetIndex: number) => {
    if (draggedGenreIndex === null || draggedGenreIndex === targetIndex) return;

    setDraftGenres((current) => {
      const next = [...current];
      const [draggedGenre] = next.splice(draggedGenreIndex, 1);
      next.splice(targetIndex, 0, draggedGenre);
      return orderGenresWithProtectedLast(next);
    });
    setDraggedGenreIndex(null);
  };

  return (
    <section aria-label={variant === "home" ? "เลือกการสำรวจ" : "เลือกหมวดหมู่"} className="sticky top-[82px] z-40 mx-auto w-full max-w-[1400px] scroll-mt-[158px] bg-[#0D0F0E] px-2 pb-[18px] pt-1 shadow-[0_8px_20px_rgba(0,0,0,.24)]" id="category-filter">
      <div className={`flex w-full flex-nowrap gap-2 overflow-hidden ${variant === "home" ? "grid grid-cols-5" : ""}`}>
        {orderedVisibleCategories.map((category) => {
          const isSelected = selected === category.label;
          const buttonClass = variant === "home"
            ? [
                "group flex h-[72px] min-w-0 flex-1 items-center justify-center gap-3 rounded-[8px] border px-3 py-2 text-left transition",
                isSelected
                  ? "border-[#10d89a] bg-[linear-gradient(145deg,#0d3028,#10221d)] shadow-[0_0_12px_rgba(23,213,160,.18)]"
                  : "border-[#14332f] bg-[#101a18] hover:border-[#1b5a4c] hover:bg-[#12231f]",
              ].join(" ")
            : [
                "group flex h-[82px] min-w-0 flex-1 flex-col items-center justify-center gap-2 rounded-[7px] border px-1 py-2 transition",
                isSelected
                  ? "border-[#1cbd55] bg-[linear-gradient(145deg,#102d19,#102017)] shadow-[0_0_12px_rgba(23,213,100,.22)]"
                  : category.special
                  ? "border-white/[0.14] bg-[linear-gradient(145deg,#1a1f1c,#141817)] hover:border-white/25 hover:bg-[#1a1f1c]"
                  : "border-white/[0.08] bg-[#151817] hover:border-white/20 hover:bg-[#1a1f1c]",
                category.special && !isSelected ? "text-white/55" : category.color,
              ].join(" ");

          return (
            <button
              aria-label={"เลือกหมวด " + category.label}
              aria-pressed={isSelected}
              className={buttonClass}
              key={category.label}
              onClick={() => category.genreMenu ? setIsGenreMenuOpen(true) : onSelect(category.label)}
              type="button"
            >
              {variant === "home" ? (
                <>
                  <span className={isSelected ? "text-[#20e99a]" : "text-white/80"}><CategoryIcon type={category.icon} /></span>
                  <span className="min-w-0 max-w-full whitespace-pre-line leading-tight">
                    <span className={`block truncate text-[14px] font-semibold ${isSelected ? "text-[#20e99a]" : "text-white/90"}`}>{category.lines?.[0] ?? category.label}</span>
                    <span className="mt-1 block truncate text-[10px] font-normal text-white/45">{category.lines?.[1]}</span>
                  </span>
                </>
              ) : (
                <>
                  <CategoryIcon type={category.icon} />
                  <span className="max-w-full whitespace-pre-line text-center text-[12px] font-medium leading-tight text-white/85 group-hover:text-white">
                    {category.lines ? category.lines.map((line) => <span className="block" key={line}>{line}</span>) : category.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {isGenreMenuOpen && variant !== "home" && (
        <div aria-modal="true" className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020504]/75 px-4 py-6 backdrop-blur-[3px]" role="dialog">
          <div className="max-h-[min(720px,calc(100vh-48px))] w-full max-w-[680px] overflow-y-auto rounded-[14px] border border-[#1d6146] bg-[#0d1512] p-4 shadow-[0_20px_80px_rgba(0,0,0,.55)] sm:p-5" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[20px] font-semibold text-white">เลือกหมวดที่คุณสนใจ</h2>
                <p className="mt-1 text-[12px] text-white/50">เลือกได้สูงสุด 10 หมวด เพื่อปรับรายการนิยายให้ตรงกับคุณ</p>
              </div>
              <button aria-label="ปิดหน้าต่างเลือกหมวด" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-white/60 transition hover:border-white/25 hover:text-white" onClick={() => setIsGenreMenuOpen(false)} type="button">×</button>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-[9px] border border-[#174c3a] bg-[#0b2119] px-3 py-3">
              <svg aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-white/80" fill="none" viewBox="0 0 24 24"><path d="M6.5 10V7.8A5.5 5.5 0 0 1 12 2.3a5.5 5.5 0 0 1 5.5 5.5V10M5 10h14v10.5H5V10Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="M12 14v2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-white">บางหมวดมีเนื้อหาที่ต้องยืนยันตัวตนก่อนเข้าใช้งาน</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/50">เพื่อความปลอดภัยของผู้ใช้งาน กรุณายืนยันตัวตนก่อนเลือกหมวดที่มีการจำกัดอายุ</p>
              </div>
              <button className={`shrink-0 rounded-[6px] border px-2.5 py-1.5 text-[11px] font-medium transition ${isVerified ? "border-[#1be27e] bg-[#123722] text-[#58eaa9]" : "border-[#1be27e] text-[#58eaa9] hover:bg-[#123722]"}`} onClick={() => setIsVerified((current) => !current)} type="button">
                {isVerified ? "ยืนยันแล้ว ✓" : "ยืนยันตัวตนเพิ่ม →"}
              </button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <section aria-labelledby="available-genres-title" className="rounded-[9px] border border-white/[0.08] bg-[#101714] p-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[12px] font-medium text-white/85" id="available-genres-title">หมวดที่มีให้เลือก</h3>
                  <span className="text-[10px] text-white/45">คลิกเพื่อเพิ่ม →</span>
                </div>
                <div className="mt-2 max-h-[330px] space-y-1.5 overflow-y-auto pr-1">
                  {orderedAvailableGenres.filter((category) => !draftGenres.includes(category.label)).map((category) => {
                    const isLocked = Boolean(category.requiresVerification && !isVerified);
                    const isLimitReached = draftGenres.length >= 10;

                    return (
                      <button
                        aria-label={`${isLocked ? "ล็อก " : "เพิ่ม "}${category.label}`}
                        className={`flex min-h-[52px] w-full items-center gap-2 rounded-[7px] border border-white/10 bg-[#121a17] px-2.5 py-2 text-left transition ${isLocked || isLimitReached ? "cursor-not-allowed opacity-50" : "hover:border-[#1be27e]/60 hover:bg-[#17251f]"}`}
                        disabled={isLocked || isLimitReached}
                        key={category.label}
                        onClick={() => toggleGenre(category)}
                        type="button"
                      >
                        <span className={category.color}><CategoryIcon type={category.icon} /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12px] font-medium text-white/90">{category.label}</span>
                          <span className="mt-0.5 block text-[10px] text-white/45">{isLocked ? "ต้องยืนยันตัวตน" : isLimitReached ? "ครบ 10 หมวดแล้ว" : "เพิ่มในรายการที่เลือก"}</span>
                        </span>
                        <span aria-hidden="true" className="shrink-0 text-[16px] text-white/45">{isLocked ? "🔒" : isLimitReached ? "•" : "→"}</span>
                      </button>
                    );
                  })}
                  {availableGenres.every((category) => draftGenres.includes(category.label)) && <p className="py-5 text-center text-[11px] text-white/35">เลือกครบทุกหมวดแล้ว</p>}
                </div>
              </section>

              <section aria-labelledby="selected-genres-title" className="rounded-[9px] border border-[#1b5944] bg-[#0d2118] p-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[12px] font-medium text-white/85" id="selected-genres-title">หมวดที่คุณเลือก</h3>
                  <span className="text-[10px] text-[#58eaa9]">{draftGenres.length}/10 หมวด · ลากเพื่อเรียง</span>
                </div>
                <div className="mt-2 max-h-[330px] space-y-1.5 overflow-y-auto pr-1">
                  {draftGenres.map((label, index) => (
                    <div
                      className={`flex min-w-0 cursor-grab items-center gap-2 rounded-[7px] border border-[#1b5944] bg-[#102a1e] px-2 py-2 transition active:cursor-grabbing ${draggedGenreIndex === index ? "opacity-50" : ""}`}
                      draggable
                      key={label}
                      onDragEnd={() => setDraggedGenreIndex(null)}
                      onDragOver={(event) => event.preventDefault()}
                      onDragStart={() => setDraggedGenreIndex(index)}
                      onDrop={(event) => {
                        event.preventDefault();
                        dropGenre(index);
                      }}
                    >
                      <span aria-hidden="true" className="select-none text-[15px] leading-none text-white/35">⠿</span>
                      <span className="w-5 shrink-0 text-center text-[11px] font-semibold text-[#58eaa9]">{index + 1}</span>
                      <span className="min-w-0 flex-1 truncate text-[12px] text-white/90">{label}</span>
                      <button aria-label={`นำ ${label} ออกจากรายการ`} className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-white/10 text-[15px] text-white/55 transition hover:border-[#ff7697] hover:text-[#ff9db4]" onClick={() => removeGenre(label)} type="button">←</button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
              <p className="text-[11px] text-white/45">เลือกแล้ว {draftGenres.length}/10 หมวด</p>
              <div className="flex gap-2">
                <button className="rounded-[7px] border border-white/10 px-3 py-2 text-[11px] text-white/60 transition hover:border-white/25 hover:text-white" onClick={() => setIsGenreMenuOpen(false)} type="button">ยกเลิก</button>
                <button className="rounded-[7px] bg-[#1be27e] px-4 py-2 text-[11px] font-semibold text-[#07100b] transition hover:bg-[#62f5a7] disabled:cursor-not-allowed disabled:opacity-40" disabled={draftGenres.length === 0} onClick={applyGenres} type="button">ใช้หมวดที่เลือก</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
