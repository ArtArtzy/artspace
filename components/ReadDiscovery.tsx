"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categoryBooks, type CategoryBook } from "@/data/categoryBooks";
import type { ReadModeId } from "@/components/ReadSubMenu";

const modeLabels: Record<ReadModeId, string> = {
  novel: "นิยาย",
  fanfic: "แฟนฟิค",
  cartoon: "การ์ตูน",
};

const modePaths: Record<ReadModeId, string> = {
  novel: "/read",
  fanfic: "/read/fanfic",
  cartoon: "/read/cartoon",
};

const bookSections = [
  { title: "นิยายแนะนำ", subtitle: "รวมเรื่องยอดนิยมจากหลากหลายแนวที่กำลังได้รับความสนใจ", category: "__trending__" },
  { title: "อัปเดตล่าสุด", subtitle: "เรื่องใหม่จากหลากหลายแนวที่เพิ่งอัปเดต พร้อมให้คุณเปิดอ่าน", category: "__latest__" },
  { title: "วาย", subtitle: "เรื่องราวความสัมพันธ์ที่ชวนให้ติดตาม", category: "วาย" },
  { title: "ยูริ", subtitle: "เรื่องราวอบอุ่นหัวใจจากมุมมองที่หลากหลาย", category: "ยูริ" },
  { title: "ลึกลับ", subtitle: "คดีและความลับที่รอให้คุณค้นหาคำตอบ", category: "ลึกลับ" },
  { title: "สยองขวัญ", subtitle: "เรื่องชวนขนลุกสำหรับคนที่ชอบความท้าทาย", category: "สยองขวัญ" },
];

const readerReviews = [
  { quote: "อ่านเพลินมาก ภาษาสวยจนวางไม่ลงเลย", name: "MildlyMoon", book: "จดหมายใต้แสงดาว" },
  { quote: "ชอบที่มีเรื่องใหม่ให้ค้นพบทุกวัน เหมือนได้เปิดประตูไปโลกใหม่", name: "paperplane", book: "ผู้พิทักษ์ประตูหมอก" },
  { quote: "รวมเรื่องได้ตรงใจมาก โดยเฉพาะหมวดลึกลับกับสยองขวัญ", name: "NightReader", book: "บ้านเงียบหลังเที่ยงคืน" },
  { quote: "พล็อตสนุกและจังหวะเล่าเรื่องดีมาก อ่านต่อเนื่องจนลืมเวลา", name: "BookWorm", book: "มังกรแห่งเกาะลอยฟ้า" },
  { quote: "บรรยากาศชวนติดตามทุกตอน เดาทางไม่ได้เลยจนถึงบทสุดท้าย", name: "MidnightInk", book: "จดหมายจากห้องปิดตาย" },
  { quote: "ตัวละครมีมิติและความสัมพันธ์ค่อยๆ เติบโต อ่านแล้วอบอุ่นหัวใจมาก", name: "PeachPages", book: "สวนดอกไม้ของเรา" },
  { quote: "ปริศนาวางไว้ละเอียดมาก ทุกเบาะแสมีความหมายและชวนให้คิดตาม", name: "ClueHunter", book: "คดีเงาในคฤหาสน์หมอก" },
  { quote: "บรรยากาศหลอนกำลังดี มีหลายฉากที่ยังติดอยู่ในหัวหลังอ่านจบ", name: "Moonless", book: "เสียงเรียกจากป่าจันทร์" },
];

const badgeColors: Record<string, string> = {
  โรแมนติก: "bg-[#e84b9b]",
  วาย: "bg-[#478fff]",
  แฟนตาซี: "bg-[#9b5cff]",
  ลึกลับ: "bg-[#64748b]",
  สยองขวัญ: "bg-[#bc79ff]",
  แอ๊กชั่น: "bg-[#ff6d55]",
  คอมเมดี้: "bg-[#f4cf4e]",
};

function EyeIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M2.7 12s3.3-5.4 9.3-5.4 9.3 5.4 9.3 5.4-3.3 5.4-9.3 5.4S2.7 12 2.7 12Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>;
}

function HeartIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M12 19.3S4.2 14.9 4.2 9.4a3.7 3.7 0 0 1 6.6-2.3L12 8.4l1.2-1.3a3.7 3.7 0 0 1 6.6 2.3c0 5.5-7.8 9.9-7.8 9.9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}

function EpisodeIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M6.5 4.5h8.8a2.2 2.2 0 0 1 2.2 2.2v12.8H8.7a2.2 2.2 0 0 1-2.2-2.2V4.5Z" stroke="currentColor" strokeWidth="1.7" /><path d="M9.5 8h5M9.5 11.3h5M9.5 14.6h3.2M17.5 19.5h2V6.7a2.2 2.2 0 0 0-2.2-2.2h-.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>;
}

function BookCard({ book, mode }: { book: CategoryBook; mode: ReadModeId }) {
  return (
    <Link
      aria-label={`เปิดเรื่อง ${book.title}`}
      className="group block min-w-0 rounded-[9px] border border-transparent p-1 transition duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.025] hover:shadow-[0_12px_26px_rgba(19,230,104,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
      href={`${modePaths[mode]}?title=${encodeURIComponent(book.title)}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-[7px] bg-[#18201c]">
        <Image alt={`ปกหนังสือ ${book.title}`} className="object-cover transition duration-500 group-hover:scale-105" fill sizes="(max-width: 1400px) 14vw, 190px" src={book.image} />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07100c]/90 to-transparent" />
        <span className={`absolute right-1.5 top-1.5 rounded-md px-2 py-1 text-[10px] font-medium leading-none text-white shadow-lg ${badgeColors[book.category] ?? "bg-[#1cae68]"}`}>
          {book.category}
        </span>
      </div>
      <h3 className="mt-2 truncate text-[13px] font-medium leading-5 text-white" title={book.title}>{book.title}</h3>
      <p className="truncate text-[11px] text-white/45">{book.author}</p>
      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/55">
        <span className="inline-flex items-center gap-1" title={`จำนวนตอน: ${book.episodes}`}><EpisodeIcon />{book.episodes}</span>
        <span className="inline-flex items-center gap-1" title={`จำนวนวิว: ${book.views}`}><EyeIcon />{book.views}</span>
        <span className="inline-flex items-center gap-1" title={`จำนวนไลก์: ${book.likes}`}><HeartIcon />{book.likes}</span>
      </div>
    </Link>
  );
}

function SectionHeading({ title, subtitle, showAllLink = true, onViewAll }: { title: string; subtitle: string; showAllLink?: boolean; onViewAll?: () => void }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-[21px] font-medium leading-tight text-white">{title}</h2>
        <p className="mt-1 text-[12px] text-white/50">{subtitle}</p>
      </div>
      {showAllLink && (
        <button className="mb-1 inline-flex shrink-0 items-center gap-2 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]" onClick={onViewAll} type="button">
          ดูทั้งหมด <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}

type FollowedCategoriesProps = {
  followed: string[];
  onToggle: (category: string) => void;
};

function FollowedCategories({ followed, onToggle }: FollowedCategoriesProps) {
  const categories = [
    "โรแมนติก",
    "วาย",
    "ยูริ",
    "แฟนตาซี",
    "จีนโบราณ",
    "เกิดใหม่",
    "ลึกลับ",
    "สยองขวัญ",
    "แอ๊กชั่น",
    "ไซไฟ",
    "คอมเมดี้",
  ];
  return (
    <section className="rounded-[9px] border border-white/[0.08] bg-[#121715] p-4" aria-labelledby="followed-categories-title">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-medium text-white" id="followed-categories-title">หมวดของฉัน</h2>
          <p className="mt-1 text-[11px] leading-relaxed text-white/45">เลือกหมวดที่อยากให้แสดงในรายการของคุณ</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isFollowed = followed.includes(category);
          return (
            <button
              aria-pressed={isFollowed}
              className={`rounded-full border px-3 py-1.5 text-[11px] transition ${isFollowed ? "border-[#1fce6c] bg-[#123722] text-[#42ed88]" : "border-white/10 bg-[#18201c] text-white/55 hover:border-white/25 hover:text-white"}`}
              key={category}
              onClick={() => onToggle(category)}
              type="button"
            >
              {isFollowed ? "✓ " : "+ "}{category}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function getReviewBookTitle(book: string, mode: ReadModeId) {
  if (mode === "fanfic") return `${book} — เรื่องราวอีกมุม`;
  if (mode === "cartoon") return `${book} — ฉบับภาพ`;
  return book;
}

function ReaderReviews({ mode }: { mode: ReadModeId }) {
  const contentLabel = modeLabels[mode];

  return (
    <section className="rounded-[9px] border border-white/[0.08] bg-[#121715] p-4" aria-labelledby="reader-reviews-title" id="reader-reviews">
      <div className="mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[18px] font-medium text-white" id="reader-reviews-title">รีวิวจากผู้อ่าน</h2>
          <a className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]" href="#reader-reviews">
            ดูทั้งหมด <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className="mt-1 text-[11px] text-white/45">เสียงจากคนที่ชอบ{contentLabel}</p>
      </div>
      <div className="space-y-3">
        {readerReviews.map((review) => (
          <Link
            aria-label={`เปิดรีวิวเรื่อง ${getReviewBookTitle(review.book, mode)} โดย ${review.name}`}
            className="group block rounded-[7px] border-b border-white/[0.07] px-2 pb-3 pt-1 transition hover:border-[#1ccf70]/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82] last:border-0 last:pb-1"
            href={`${modePaths[mode]}?title=${encodeURIComponent(getReviewBookTitle(review.book, mode))}#reader-reviews`}
            key={review.name}
          >
            <p className="text-[13px] leading-relaxed text-white/80">“{review.quote}”</p>
            <div className="mt-2 flex items-center justify-between gap-2 text-[10px]">
              <span className="text-[#36e77e]">{review.name}</span>
              <span className="min-w-0 truncate text-right text-white/45 transition group-hover:text-white/65" title={getReviewBookTitle(review.book, mode)}>เรื่อง: {getReviewBookTitle(review.book, mode)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

type SortOption = "popular" | "liked" | "trending" | "newest" | "oldest";

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "popular", label: "ความนิยมสูงสุด" },
  { value: "liked", label: "ถูกใจสูงสุด" },
  { value: "trending", label: "กำลังมาแรง" },
  { value: "newest", label: "ใหม่ล่าสุดก่อน" },
  { value: "oldest", label: "เก่าสุดก่อน" },
];

function BooksHeading({ title, subtitle, value, onChange }: { title: string; subtitle: string; value: SortOption; onChange: (value: SortOption) => void }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-[21px] font-medium leading-tight text-white">{title}</h2>
        <p className="mt-1 text-[12px] text-white/50">{subtitle}</p>
      </div>
      <label className="flex shrink-0 items-center gap-2 text-[11px] text-white/50">
        <span>เรียงตาม</span>
        <select
          aria-label="เรียงรายการตาม"
          className="h-9 min-w-[154px] cursor-pointer rounded-[7px] border border-white/10 bg-[#151a17] px-3 text-[12px] text-white/80 outline-none transition hover:border-[#1ed873]/50 focus:border-[#1ed873] focus:ring-1 focus:ring-[#1ed873]/30"
          onChange={(event) => onChange(event.target.value as SortOption)}
          value={value}
        >
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </div>
  );
}

function getMixedBooks(limit: number, mode: ReadModeId) {
  const categoryLists = Object.keys(categoryBooks).map((category) => getBooksByCategory(category, mode));
  const longestCategory = Math.max(...categoryLists.map((books) => books.length));

  return Array.from({ length: longestCategory })
    .flatMap((_, bookIndex) => categoryLists.map((books) => books[bookIndex]).filter(Boolean))
    .slice(0, limit);
}

function metricValue(metric: string) {
  const value = Number.parseFloat(metric);
  if (metric.endsWith("M")) return value * 1_000_000;
  if (metric.endsWith("K")) return value * 1_000;
  return value;
}

function sortBooks(books: CategoryBook[], option: SortOption) {
  const sorted = [...books];

  if (option === "popular") return sorted.sort((a, b) => metricValue(b.views) - metricValue(a.views));
  if (option === "liked") return sorted.sort((a, b) => metricValue(b.likes) - metricValue(a.likes));
  if (option === "trending") return sorted.sort((a, b) => (metricValue(b.views) + metricValue(b.likes) * 12) - (metricValue(a.views) + metricValue(a.likes) * 12));
  if (option === "newest") return sorted.reverse();
  return sorted;
}

function normalizeBookTitle(title: string, category: string) {
  const categoryPrefix = `${category} · `;
  const fanficPrefix = `แฟนฟิค${category}: `;
  const cartoonPrefix = `การ์ตูน${category}: `;

  if (title.startsWith(categoryPrefix)) return title.slice(categoryPrefix.length);
  if (title.startsWith(fanficPrefix)) return title.slice(fanficPrefix.length);
  if (title.startsWith(cartoonPrefix)) return title.slice(cartoonPrefix.length);
  return title;
}

function getBooksByCategory(category: string, mode: ReadModeId) {
  const sourceBooks = categoryBooks[category] ?? [];
  const books = mode === "novel"
    ? sourceBooks
        .filter((book) => !book.title.startsWith("แฟนฟิค") && !book.title.startsWith("การ์ตูน"))
        .map((book) => ({ ...book, title: normalizeBookTitle(book.title, category) }))
    : sourceBooks.map((book) => {
        const title = normalizeBookTitle(book.title, category);
        const isOriginalMode = mode === "fanfic" ? book.title.startsWith("แฟนฟิค") : book.title.startsWith("การ์ตูน");

        return {
          ...book,
          title: isOriginalMode ? title : `${title} — ${mode === "fanfic" ? "เรื่องราวอีกมุม" : "ฉบับภาพ"}`,
        };
      });

  if ((category !== "วาย" && category !== "ยูริ") || books.length === 0) return books;

  const expandedBooks = [...books];
  const storyEditions = ["บทพิเศษ", "ฤดูใหม่", "ความทรงจำอีกด้าน", "หลังวันนั้น"];

  while (expandedBooks.length < 72) {
    const extraIndex = expandedBooks.length - books.length;
    const source = books[extraIndex % books.length];
    const edition = storyEditions[Math.floor(extraIndex / books.length) % storyEditions.length];
    const views = 140 + (extraIndex * 37) % 760;
    const likes = 6 + (extraIndex * 1.7) % 28;

    expandedBooks.push({
      ...source,
      title: `${source.title} · ${edition}`,
      episodes: String(14 + (extraIndex * 5) % 38),
      views: `${views}K`,
      likes: `${likes.toFixed(1)}K`,
    });
  }

  return expandedBooks;
}

function Pagination({ pageCount, contentLabel }: { pageCount: number; contentLabel: string }) {
  const pages: Array<number | "ellipsis"> = pageCount <= 7
    ? Array.from({ length: pageCount }, (_, index) => index + 1)
    : [1, 2, 3, 4, 5, "ellipsis", pageCount];

  return (
    <nav aria-label={`เปลี่ยนหน้า${contentLabel}`} className="flex items-center justify-center gap-2 pt-2">
      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return <span aria-hidden="true" className="px-1 text-[12px] text-white/35" key={`ellipsis-${index}`}>…</span>;
        }

        const isCurrent = page === 1;

        return (
          <button
            aria-current={isCurrent ? "page" : undefined}
            aria-label={`หน้าที่ ${page}`}
            className={`flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md border px-2 text-[12px] font-medium transition ${
              isCurrent
                ? "border-[#1ed873] bg-[#123722] text-[#48ee91] shadow-[0_0_10px_rgba(30,216,115,.18)]"
                : "border-white/10 bg-[#151a17] text-white/55 hover:border-[#1ed873]/60 hover:text-white"
            }`}
            key={page}
            type="button"
          >
            {page}
          </button>
        );
      })}
    </nav>
  );
}

type ReadDiscoveryProps = {
  followedCategories: string[];
  mode: ReadModeId;
  onToggleCategory: (category: string) => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  showFollowedCategories: boolean;
};

export default function ReadDiscovery({ followedCategories, mode, onToggleCategory, onSelectCategory, selectedCategory, showFollowedCategories }: ReadDiscoveryProps) {
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const contentLabel = modeLabels[mode];
  const isAllBooks = selectedCategory === "ทั้งหมด";
  const isCategoryCatalog = isAllBooks || Object.prototype.hasOwnProperty.call(categoryBooks, selectedCategory);
  const catalogBooks = isAllBooks ? getMixedBooks(30, mode) : getBooksByCategory(selectedCategory, mode);
  const visibleCatalogBooks = sortBooks(catalogBooks, sortOption).slice(0, 36);
  const paginationPageCount = isAllBooks ? 27 : Math.ceil(catalogBooks.length / 36);

  const selectCategoryAndScroll = (category: string) => {
    onSelectCategory(category);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("category-filter")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  return (
    <section className="mx-auto max-w-[1400px] bg-[#0D0F0E] px-2 pb-12 pt-7 text-white" id="read-discovery">
      <div className="grid grid-cols-[minmax(0,1fr)_290px] gap-6">
        <div className="min-w-0 space-y-8">
          {isCategoryCatalog ? (
            <>
              <div>
                <BooksHeading
                  onChange={setSortOption}
                  subtitle={isAllBooks ? `รวม${contentLabel}หลากหลายหมวดหมู่ไว้ให้คุณค้นพบ` : `รวม${contentLabel}หมวด${selectedCategory}ที่คัดมาให้คุณ`}
                  title={isAllBooks ? `${contentLabel}ทั้งหมด` : `${contentLabel}${selectedCategory}`}
                  value={sortOption}
                />
                <div className="grid grid-cols-6 gap-x-3 gap-y-6">
                  {visibleCatalogBooks.map((book) => <BookCard book={book} mode={mode} key={book.title} />)}
                </div>
              </div>
              {paginationPageCount > 1 && <Pagination contentLabel={contentLabel} pageCount={paginationPageCount} />}
            </>
          ) : bookSections.map((section) => (
            <div key={section.title}>
              <SectionHeading
                onViewAll={section.category.startsWith("__") ? undefined : () => selectCategoryAndScroll(section.category)}
                showAllLink={!section.category.startsWith("__")}
                title={section.category === "__trending__" ? `${contentLabel}แนะนำ` : section.title}
                subtitle={section.subtitle}
              />
              <div className="grid grid-cols-6 gap-3">
                {(section.category === "__trending__"
                  ? Object.keys(categoryBooks).flatMap((category) => getBooksByCategory(category, mode).slice(0, 1))
                  : section.category === "__latest__"
                    ? Object.keys(categoryBooks).reverse().flatMap((category) => getBooksByCategory(category, mode).slice(1, 2))
                    : getBooksByCategory(section.category, mode)
                ).slice(0, 6).map((book) => <BookCard book={book} mode={mode} key={book.title} />)}
              </div>
            </div>
          ))}

        </div>

        <aside className="flex min-w-0 flex-col gap-4 border-l border-white/[0.08] pl-5">
        {showFollowedCategories && <FollowedCategories followed={followedCategories} onToggle={onToggleCategory} />}
          <ReaderReviews mode={mode} />
        </aside>
      </div>
    </section>
  );
}
