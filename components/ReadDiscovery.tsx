"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryBooks, fanficFandomByCategory, type CategoryBook } from "@/data/categoryBooks";
import type { ReadModeId } from "@/components/ReadSubMenu";
import StoryMetadata from "@/components/StoryMetadata";

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

const modeSectionCoverOverrides: Record<"fanfic" | "cartoon", Record<string, string>> = {
  fanfic: {
    __trending__: "/images/mode-covers/fanfic-recommended.png",
    __latest__: "/images/mode-covers/fanfic-latest.png",
    วาย: "/images/mode-covers/fanfic-y.png",
    ยูริ: "/images/mode-covers/fanfic-yuri.png",
    ลึกลับ: "/images/mode-covers/fanfic-mystery.png",
    สยองขวัญ: "/images/mode-covers/fanfic-horror.png",
  },
  cartoon: {
    __trending__: "/images/mode-covers/cartoon-recommended.png",
    __latest__: "/images/mode-covers/cartoon-latest.png",
    วาย: "/images/mode-covers/cartoon-y.png",
    ยูริ: "/images/mode-covers/cartoon-yuri.png",
    ลึกลับ: "/images/mode-covers/cartoon-mystery.png",
    สยองขวัญ: "/images/mode-covers/cartoon-horror.png",
  },
};

type ReaderReview = { quote: string; name: string; book: string; avatar?: string; time?: string };

const readerReviewTemplates: Record<ReadModeId, ReaderReview[]> = {
  novel: [
    { quote: "เรื่องนี้ละมุนมาก อ่านแล้ววางไม่ลงเลยค่ะ", name: "MintyMoon", book: "จดหมายใต้แสงดาว", avatar: "/images/writers/purplemoon.webp", time: "4 วันที่แล้ว" },
    { quote: "โลกแฟนตาซีที่สวยสดมาก อ่านแล้วเหมือนได้ออกมาเดินเล่นในโลกนั้น", name: "BlueWhale", book: "ผู้พิทักษ์ประตูหมอก", avatar: "/images/writers/rainymew.webp", time: "1 สัปดาห์ที่แล้ว" },
    { quote: "เป็นนิยายที่อบอุ่นและมีชีวิตชีวามาก อ่านแล้วรู้สึกดีสุด ๆ", name: "CloudyDay", book: "บ้านเงียบหลังเที่ยงคืน", avatar: "/images/writers/moonlit.webp", time: "2 สัปดาห์ที่แล้ว" },
    { quote: "ชอบจังหวะการเล่าเรื่องมาก อ่านต่อแล้วหยุดไม่ได้เลย", name: "StarryNight", book: "มังกรแห่งเกาะลอยฟ้า", avatar: "/images/writers/lunarblack.webp", time: "3 สัปดาห์ที่แล้ว" },
    { quote: "รายละเอียดของตัวละครดีมาก รู้สึกผูกพันไปกับทุกบท", name: "PageTurner", book: "จดหมายจากห้องปิดตาย", avatar: "/images/writers/felixs.webp", time: "1 เดือนที่แล้ว" },
  ],
  fanfic: [
    { quote: "การตีความตัวละครใน{context}ทำออกมาได้เป็นธรรมชาติมาก", name: "FicFinder", book: "จดหมายใต้แสงดาว" },
    { quote: "ชอบมุมมองใหม่ของ{context} เหมือนได้เห็นเรื่องเดิมในอีกด้าน", name: "ShipSailor", book: "ผู้พิทักษ์ประตูหมอก" },
    { quote: "เคมีของตัวละครใน{context}ดีมาก อ่านแล้วอินทุกฉาก", name: "PlotTwister", book: "บ้านเงียบหลังเที่ยงคืน" },
    { quote: "รายละเอียดเล็กๆ ใน{context}ทำให้แฟนตัวจริงยิ้มได้ตลอดเรื่อง", name: "CanonKeeper", book: "มังกรแห่งเกาะลอยฟ้า" },
    { quote: "จังหวะดราม่าของ{context}กำลังดี ทั้งสนุกและยังคงกลิ่นอายต้นฉบับ", name: "ArchiveReader", book: "จดหมายจากห้องปิดตาย" },
  ],
  cartoon: [
    { quote: "ภาพและจังหวะเล่าเรื่องของ{context}สวยจนอ่านเพลินมาก", name: "PanelPop", book: "จดหมายใต้แสงดาว" },
    { quote: "สีหน้าและท่าทางตัวละครใน{context}เล่าเรื่องได้ดีมาก", name: "FrameHunter", book: "ผู้พิทักษ์ประตูหมอก" },
    { quote: "โลกของ{context}มีรายละเอียดให้หยุดดูในทุกช่องจริงๆ", name: "BubbleTea", book: "บ้านเงียบหลังเที่ยงคืน" },
    { quote: "การจัดช่องของ{context}ทำให้ฉากแอ็กชันและฉากอารมณ์ไหลลื่นมาก", name: "PanelTurner", book: "มังกรแห่งเกาะลอยฟ้า" },
    { quote: "อ่าน{context}แล้วรู้สึกเหมือนได้เดินทางไปกับตัวละครจริงๆ", name: "InkWatcher", book: "จดหมายจากห้องปิดตาย" },
  ],
};

const badgeColors: Record<string, string> = {
  โรแมนติก: "bg-[#9d174d]",
  วาย: "bg-[#1d4ed8]",
  ยูริ: "bg-[#be123c]",
  แฟนตาซี: "bg-[#6d28d9]",
  จีนโบราณ: "bg-[#854d0e]",
  เกิดใหม่: "bg-[#0f766e]",
  ลึกลับ: "bg-[#155e75]",
  สยองขวัญ: "bg-[#7e22ce]",
  แอ๊กชั่น: "bg-[#c2410c]",
  ไซไฟ: "bg-[#0e7490]",
  คอมเมดี้: "bg-[#b45309]",
  รักผู้ใหญ่: "bg-[#9f1239]",
  วายห้องลับ: "bg-[#1e40af]",
  ยูริห้องลับ: "bg-[#9f1239]",
  ดราม่าเข้มข้น: "bg-[#9f1239]",
  โรแมนซ์แฟนตาซี: "bg-[#7e22ce]",
  เกมและโลกเสมือน: "bg-[#1e40af]",
  อนิเมะ: "bg-[#a21caf]",
  แฟชั่นและไลฟ์สไตล์: "bg-[#0f766e]",
  เรทผู้ใหญ่: "bg-[#9f1239]",
  โรแมนติกผู้ใหญ่: "bg-[#9f1239]",
  อนิเมะผู้ใหญ่: "bg-[#a21caf]",
};

const hoverDescriptions: Record<string, string> = {
  โรแมนติก: "เมื่อโชคชะตาพาคนสองคนกลับมาเจอกัน ความลับในอดีตและความรู้สึกที่ยังไม่จางจะเปลี่ยนเรื่องราวครั้งนี้ไปอย่างไร",
  วาย: "ความสัมพันธ์ที่ค่อย ๆ เติบโตท่ามกลางความเข้าใจผิดและช่วงเวลาที่หัวใจไม่กล้าพูดความจริง",
  ยูริ: "เรื่องราวอบอุ่นหัวใจของคนสองคนที่เรียนรู้จะเปิดใจให้กัน ผ่านวันธรรมดาที่มีความหมายกว่าที่คิด",
  แฟนตาซี: "ออกเดินทางสู่โลกกว้างที่เต็มไปด้วยเวทมนตร์ มิตรภาพ และคำทำนายที่อาจเปลี่ยนชะตาของทุกคน",
  จีนโบราณ: "กลิ่นอายตำนานและชะตาที่ผูกพันผู้คนต่างแคว้น เมื่อความจริงใต้เงาจันทร์กำลังจะถูกเปิดเผย",
  เกิดใหม่: "เริ่มต้นชีวิตบทใหม่พร้อมความทรงจำจากอดีต และความลับที่อาจทำให้เส้นทางครั้งนี้ไม่เหมือนเดิม",
  ลึกลับ: "ทุกเบาะแสพาคุณเข้าใกล้ความจริงอีกก้าว แต่ยิ่งค้นหากลับยิ่งพบว่าความลับนี้อันตรายกว่าที่คิด",
  สยองขวัญ: "ความเงียบที่ซ่อนเรื่องราวชวนขนลุกเอาไว้ และเสียงบางอย่างที่ดังขึ้นทุกครั้งเมื่อพระอาทิตย์ลับฟ้า",
  แอ๊กชั่น: "การผจญภัยเข้มข้นที่พาทุกคนฝ่าศัตรูและอุปสรรค เพื่อไปให้ถึงความจริงที่ไม่มีใครอยากเผชิญ",
  ไซไฟ: "เรื่องราวจากอนาคตที่พาคุณออกไปไกลกว่าดวงดาว เมื่อภารกิจครั้งนี้อาจเปลี่ยนอนาคตของมนุษยชาติ",
  คอมเมดี้: "ความวุ่นวายชวนยิ้มที่เติมสีสันให้ทุกวัน เมื่อแผนธรรมดากลับพาทุกคนไปเจอเรื่องวุ่นเกินคาด",
};

function BookCard({ book, mode }: { book: CategoryBook; mode: ReadModeId }) {
  const displayTitle = mode === "cartoon" ? stripEditionSuffix(book.title) : book.title;

  return (
    <Link
      aria-label={`เปิดเรื่อง ${displayTitle}`}
      className="group relative block min-w-0 rounded-[9px] border border-transparent p-1 transition duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.025] hover:shadow-[0_12px_26px_rgba(19,230,104,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
      href={`${modePaths[mode]}?title=${encodeURIComponent(book.title)}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-[7px] bg-[#18201c]">
        <Image alt={`ปกหนังสือ ${displayTitle}`} className="object-cover transition duration-500 group-hover:scale-105" fill sizes="(max-width: 1400px) 14vw, 190px" src={book.image} />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07100c]/90 to-transparent" />
        <span className={`absolute right-1.5 top-1.5 z-30 rounded-md px-2 py-1 text-[10px] font-medium leading-none text-white shadow-lg ${badgeColors[book.category] ?? "bg-[#1cae68]"}`}>
          {book.category}
        </span>
      </div>
      <h3 className="mt-2 truncate text-[13px] font-medium leading-5 text-white" title={displayTitle}>{displayTitle}</h3>
      <p className="truncate text-[11px] text-white/45">{book.author}</p>
      <StoryMetadata title={book.title} episodes={book.episodes} views={book.views} likes={book.likes} status={book.status} />
      <div className="pointer-events-none absolute inset-1 z-20 flex flex-col justify-end rounded-[7px] bg-gradient-to-t from-[#07100c] via-[#07100c]/90 to-transparent p-3 opacity-0 transition duration-300 group-hover:opacity-100">
        <h3 className="break-words text-[14px] font-semibold leading-5 text-white">{displayTitle}</h3>
        <p className="mt-0.5 line-clamp-6 text-[11px] leading-[1.45] text-white/70">{hoverDescriptions[book.category] ?? "เรื่องราวที่คัดสรรมาให้คุณได้ออกเดินทาง พร้อมความลับและตัวละครมากมายที่รอให้คุณทำความรู้จัก"}</p>
        <span className="mt-2 inline-flex h-8 items-center justify-center rounded-[7px] bg-[#1be27e] text-[11px] font-semibold text-[#07100b] shadow-[0_5px_16px_rgba(0,0,0,.25)]">อ่านเลย <span aria-hidden="true" className="ml-2 text-sm">→</span></span>
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
    <section className="ds-section p-4" aria-labelledby="followed-categories-title">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="sidebar-title" id="followed-categories-title">หมวดของฉัน</h2>
          <p className="sidebar-meta mt-1 leading-relaxed text-white/45">เลือกหมวดที่อยากให้แสดงในรายการของคุณ</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isFollowed = followed.includes(category);
          return (
            <button
              aria-pressed={isFollowed}
              className={`sidebar-button rounded-full border px-3 py-1.5 transition ${isFollowed ? "border-[#1fce6c] bg-[#123722] text-[#42ed88]" : "border-white/10 bg-[#18201c] text-white/55 hover:border-white/25 hover:text-white"}`}
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

const myShelfBooks = [
  { title: "กุหลาบบนชานชาลา", author: "NanaDraw", episode: "อ่านไป 12/30 ตอน", progress: 40, image: "/images/category-books/romantic-05.webp" },
  { title: "เมืองที่ซ่อนแสง", author: "HiddenGlow", episode: "อ่านไป 28/45 ตอน", progress: 62, image: "/images/book-city-echoes.webp" },
  { title: "คืนที่ดาวตก", author: "StarLit", episode: "อ่านไป 5/28 ตอน", progress: 18, image: "/images/book-kissed-stars.webp" },
];

const interestTagStyles = [
  "border-[#c53b88] bg-[#3a162e] text-[#ff83c5]",
  "border-[#52718a] bg-[#182a35] text-[#a6d2ed]",
  "border-[#2da66c] bg-[#123629] text-[#6df0a8]",
  "border-[#239d7c] bg-[#102f2a] text-[#6ce4c8]",
  "border-[#506b80] bg-[#182b36] text-[#b1c7d3]",
  "border-[#c38a42] bg-[#362916] text-[#ffd18d]",
  "border-[#a2346a] bg-[#35152d] text-[#ff86bb]",
  "border-[#536c83] bg-[#182a35] text-[#b2c9d9]",
  "border-[#416b63] bg-[#15332e] text-[#95ddc8]",
  "border-[#557286] bg-[#192c37] text-[#b7d2df]",
];

function MyBookshelfCard({ mode }: { mode: ReadModeId }) {
  const shelfBooks = mode !== "novel"
    ? getMixedBooks(3, mode).map((book, index) => ({
        title: book.title,
        author: book.author,
        episode: `อ่านไป ${[8, 12, 5][index]}/${[24, 30, 20][index]} ตอน`,
        progress: [34, 48, 22][index],
        image: book.image,
      }))
    : myShelfBooks;

  return (
    <section aria-labelledby="my-bookshelf-title" className="ds-section p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="sidebar-title" id="my-bookshelf-title">จากชั้นหนังสือของคุณ</h2>
          <p className="sidebar-meta mt-1 text-white/45">เรื่องที่คุณกำลังอ่านอยู่</p>
        </div>
        <Link aria-label="ดูชั้นหนังสือของคุณทั้งหมด" className="sidebar-link mt-1 inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href={`${modePaths[mode]}?bookshelf=all`}>
          ดูทั้งหมด <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {shelfBooks.map((book) => (
          <div className="flex min-w-0 gap-2.5 py-2.5 first:pt-2 last:pb-1" key={book.title}>
            <Link aria-label={`เปิดเรื่อง ${book.title}`} className="block h-[58px] w-[43px] shrink-0 overflow-hidden rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`${modePaths[mode]}?title=${encodeURIComponent(book.title)}`}>
              <Image alt={`ปกหนังสือ ${book.title}`} className="h-full w-full object-cover" height={58} src={book.image} width={43} />
            </Link>
            <div className="min-w-0 flex-1">
              <Link className="sidebar-item-title block truncate transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`${modePaths[mode]}?title=${encodeURIComponent(book.title)}`} title={book.title}>{book.title}</Link>
              <p className="sidebar-meta mt-1 truncate text-white/50">{book.author}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="sidebar-caption min-w-0 truncate text-white/55">{book.episode}</span>
                <span className="sidebar-caption shrink-0 text-white/55">{book.progress}%</span>
              </div>
              <div aria-label={`อ่านแล้ว ${book.progress}%`} className="mt-1 h-1 overflow-hidden rounded-full bg-[#1c4436]" role="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={book.progress}>
                <span className="block h-full rounded-full bg-[#1be27e]" style={{ width: `${book.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InterestedTags({ selectedGenres, onSelectCategory }: { selectedGenres: string[]; onSelectCategory: (category: string) => void }) {
  return (
    <section aria-labelledby="interested-tags-title" className="ds-section p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="sidebar-title" id="interested-tags-title">แท็กที่คุณสนใจ</h2>
          <p className="sidebar-meta mt-1 text-white/45">เรื่องราวในแบบที่คุณชอบ</p>
        </div>
        <a className="sidebar-link mt-1 inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="#category-filter">
          จัดการแท็ก <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedGenres.map((tag, index) => (
          <button
            aria-label={`เลือกหมวด ${tag}`}
            className={`rounded-full border px-2.5 py-1 text-[10px] leading-none transition hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82] ${interestTagStyles[index % interestTagStyles.length]}`}
            key={tag}
            onClick={() => onSelectCategory(tag)}
            type="button"
          >
            #{tag}
          </button>
        ))}
      </div>
    </section>
  );
}

function getReviewBookTitle(book: string) {
  return book;
}

function getReviewContextLabel(mode: ReadModeId, selectedCategory: string) {
  const contentLabel = modeLabels[mode];

  if (selectedCategory === "หมวดของฉัน") return `${contentLabel}แบบคุณ`;
  if (selectedCategory === "ทั้งหมด") return `${contentLabel}หลายหมวด`;
  return `${contentLabel}${selectedCategory}`;
}

function getReaderReviews(mode: ReadModeId, selectedCategory: string) {
  const context = getReviewContextLabel(mode, selectedCategory);

  return readerReviewTemplates[mode].map((review) => ({
    ...review,
    quote: review.quote.replaceAll("{context}", context),
  }));
}

function ReaderReviews({ mode, selectedCategory }: { mode: ReadModeId; selectedCategory: string }) {
  const contextLabel = getReviewContextLabel(mode, selectedCategory);
  const reviews = getReaderReviews(mode, selectedCategory);
  const isNovelReviews = mode === "novel";

  return (
    <section className={`ds-section ${isNovelReviews ? "p-3" : "p-4"}`} aria-labelledby="reader-reviews-title" id="reader-reviews">
      <div className="mb-3">
        <div className="flex items-center gap-3">
          <h2 className="sidebar-title" id="reader-reviews-title">รีวิวจากผู้อ่าน</h2>
          <a className="sidebar-link ml-auto inline-flex items-center gap-1 transition hover:text-[#9bffc0]" href="#reader-reviews">
            ดูทั้งหมด <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className="sidebar-meta mt-1 text-white/45">{isNovelReviews ? "เสียงจากนักอ่านที่ประทับใจในนิยายคุณ" : `เสียงจากคนที่ชอบ${contextLabel}`}</p>
      </div>
      <div className={isNovelReviews ? "space-y-0" : "space-y-3"}>
        {reviews.map((review) => isNovelReviews && review.avatar ? (
          <Link
            aria-label={`เปิดรีวิวเรื่อง ${getReviewBookTitle(review.book)} โดย ${review.name}`}
            className="group flex min-w-0 gap-2.5 border-b border-white/[0.07] py-2.5 transition hover:border-[#1ccf70]/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82] last:border-0 last:pb-1"
            href={`${modePaths[mode]}?title=${encodeURIComponent(getReviewBookTitle(review.book))}#reader-reviews`}
            key={review.name}
          >
            <Image alt={`รูปโปรไฟล์ ${review.name}`} className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-white/[0.18]" height={36} src={review.avatar} width={36} />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[11px] leading-[1.35] text-white/80">“{review.quote}”</p>
              <div className="mt-1.5 flex items-center justify-between gap-2 text-[10px] leading-none">
                <span className="truncate text-[#36e77e]">{review.name}</span>
                <span className="shrink-0 text-white/45">{review.time}</span>
              </div>
            </div>
          </Link>
        ) : (
          <Link
            aria-label={`เปิดรีวิวเรื่อง ${getReviewBookTitle(review.book)} โดย ${review.name}`}
            className="group block rounded-[7px] border-b border-white/[0.07] px-2 pb-3 pt-1 transition hover:border-[#1ccf70]/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82] last:border-0 last:pb-1"
            href={`${modePaths[mode]}?title=${encodeURIComponent(getReviewBookTitle(review.book))}#reader-reviews`}
            key={review.name}
          >
            <p className="sidebar-body">“{review.quote}”</p>
            <div className="sidebar-meta mt-2 flex items-center justify-between gap-2">
              <span className="text-[#36e77e]">{review.name}</span>
              <span className="min-w-0 truncate text-right text-white/45 transition group-hover:text-white/65" title={getReviewBookTitle(review.book)}>เรื่อง: {getReviewBookTitle(review.book)}</span>
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

function getSectionBaseBooks(sectionCategory: string, mode: ReadModeId) {
  if (sectionCategory === "__trending__") {
    return Object.keys(categoryBooks).flatMap((category) => getBooksByCategory(category, mode).slice(0, 1));
  }

  if (sectionCategory === "__latest__") {
    return Object.keys(categoryBooks).reverse().flatMap((category) => getBooksByCategory(category, mode).slice(1, 2));
  }

  return getBooksByCategory(sectionCategory, mode);
}

function getBookIdentity(book: CategoryBook, mode: ReadModeId) {
  return mode === "cartoon" ? stripEditionSuffix(book.title).trim() : book.title.trim();
}

function getStoryKey(book: CategoryBook, mode: ReadModeId) {
  return `${book.category}::${getBookIdentity(book, mode)}`;
}

function getSectionBooks(sectionCategory: string, mode: ReadModeId, usedImages: Set<string>, usedStoryKeys: Set<string>) {
  const baseBooks = getSectionBaseBooks(sectionCategory, mode);
  const overrideImage = mode !== "novel" ? modeSectionCoverOverrides[mode][sectionCategory] : undefined;
  const selectedBooks: CategoryBook[] = [];
  const firstBook = baseBooks[0];

  if (overrideImage && firstBook && !usedImages.has(firstBook.image) && !usedStoryKeys.has(getStoryKey(firstBook, mode))) {
    selectedBooks.push({ ...firstBook, image: overrideImage });
    usedImages.add(overrideImage);
    usedImages.add(firstBook.image);
    usedStoryKeys.add(getStoryKey(firstBook, mode));
  }

  const allModeBooks = Object.keys(categoryBooks).flatMap((category) => getBooksByCategory(category, mode));
  const selectedStoryKeys = new Set(selectedBooks.map((book) => getStoryKey(book, mode)));
  for (const book of [...baseBooks, ...allModeBooks]) {
    if (selectedBooks.length >= 6) break;
    if (usedImages.has(book.image)) continue;
    if (usedStoryKeys.has(getStoryKey(book, mode)) || selectedStoryKeys.has(getStoryKey(book, mode))) continue;

    selectedBooks.push(book);
    usedImages.add(book.image);
    usedStoryKeys.add(getStoryKey(book, mode));
    selectedStoryKeys.add(getStoryKey(book, mode));
  }

  return selectedBooks;
}

function getMixedBooks(limit: number, mode: ReadModeId) {
  const categoryLists = Object.keys(categoryBooks).map((category) => getBooksByCategory(category, mode));
  const longestCategory = Math.max(...categoryLists.map((books) => books.length));
  const mixedBooks = Array.from({ length: longestCategory })
    .flatMap((_, bookIndex) => categoryLists.map((books) => books[bookIndex]).filter(Boolean));

  return uniqueBooks(mixedBooks, mode).slice(0, limit);
}

function getBooksByCategories(categories: string[], mode: ReadModeId) {
  return uniqueBooks(categories.flatMap((category) => getBooksByCategory(category, mode)), mode);
}

function uniqueBooks(books: CategoryBook[], mode: ReadModeId) {
  const seen = new Set<string>();

  return books.filter((book) => {
    const identity = getBookIdentity(book, mode);
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
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

type PopularRange = "today" | "week" | "month";

const popularRangeOptions: Array<{ id: PopularRange; label: string }> = [
  { id: "today", label: "วันนี้" },
  { id: "week", label: "7 วัน" },
  { id: "month", label: "30 วัน" },
];

function getPopularBooks(range: PopularRange, mode: ReadModeId) {
  const modeBooks = getMixedBooks(72, mode);
  const sortOption: SortOption = range === "today" ? "trending" : range === "week" ? "popular" : "liked";

  return uniqueBooks(sortBooks(modeBooks, sortOption), mode).slice(0, 10);
}

function PopularRankingCard({ mode }: { mode: ReadModeId }) {
  const [selectedRange, setSelectedRange] = useState<PopularRange>("today");
  const rankedBooks = getPopularBooks(selectedRange, mode);
  const contentLabel = modeLabels[mode];

  return (
    <section aria-labelledby="popular-ranking-title" className="ds-section p-2.5">
      <div className="flex items-center gap-[7px]">
        <svg aria-hidden="true" className="h-[19px] w-[19px] shrink-0 text-[#2ee77b] sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24"><path d="M12.2 20.2c3.3 0 5.7-2.1 5.7-5.2 0-2.4-1.3-4.2-2.9-5.9-.1 1.8-.8 2.8-2 3.5.1-2.8-1.1-5.4-3.3-7.1.1 2.7-2.3 4.5-2.3 7.6 0 4 2.4 7.1 4.8 7.1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>
        <h2 className="sidebar-title" id="popular-ranking-title">10 อันดับ{contentLabel}ยอดนิยม</h2>
      </div>

      <div aria-label="ช่วงเวลาการจัดอันดับ" className="mt-2 grid grid-cols-3 gap-0.5 rounded-[6px] bg-[#0b1512] p-0.5" role="group">
        {popularRangeOptions.map((option) => {
          const isSelected = option.id === selectedRange;

          return (
            <button
              aria-pressed={isSelected}
              className={`sidebar-button h-6 rounded-[4px] border px-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82] ${isSelected ? "border-[#1be27e] bg-[#10352a] text-[#58eaa9]" : "border-transparent text-white/55 hover:bg-white/[0.06] hover:text-white"}`}
              key={option.id}
              onClick={() => setSelectedRange(option.id)}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-1.5">
        {rankedBooks.map((book, index) => {
          const displayTitle = book.title.replace(/\s·\s.*$/, "");

          return (
            <Link className="group flex min-w-0 items-center gap-1.5 border-b border-white/[0.05] py-1.5 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`${modePaths[mode]}?title=${encodeURIComponent(book.title)}`} key={book.title}>
              <span className={`sidebar-meta w-4 shrink-0 text-center font-semibold ${index === 0 ? "text-[#f6d86e]" : index === 1 ? "text-white" : index === 2 ? "text-[#f0a65c]" : "text-white/70"}`}>{index + 1}</span>
              <Image alt={`ปกหนังสือ ${displayTitle}`} className="h-8 w-6 shrink-0 rounded-[3px] object-cover" height={32} src={book.image} width={24} />
              <div className="min-w-0 flex-1">
                <h3 className="sidebar-item-title truncate transition group-hover:text-white" title={displayTitle}>{displayTitle}</h3>
                <p className="sidebar-meta mt-0.5 truncate text-white/45">{book.author}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function TrendingStories({ mode, selectedCategory, selectedCategories }: { mode: ReadModeId; selectedCategory: string; selectedCategories: string[] }) {
  const isMultiCategory = selectedCategory === "ปรับแต่ง" && selectedCategories.length > 0;
  const trendingTitle = selectedCategory === "ทั้งหมด"
    ? `${modeLabels[mode]}มาแรง`
    : isMultiCategory
      ? `${modeLabels[mode]}จากหมวดที่เลือก`
    : `${modeLabels[mode]}${selectedCategory}มาแรง`;
  const sourceBooks = selectedCategory === "ทั้งหมด"
    ? getMixedBooks(30, mode)
    : isMultiCategory
      ? getBooksByCategories(selectedCategories, mode)
    : getBooksByCategory(selectedCategory, mode);
  const trendingBooks = sortBooks(sourceBooks, "trending").slice(0, 5);

  return (
    <section aria-labelledby="trending-stories-title" className="ds-section p-4">
      <div className="mb-3">
        <h2 className="sidebar-title" id="trending-stories-title">{trendingTitle}</h2>
        <p className="sidebar-meta mt-1 leading-relaxed text-white/45">อันดับเรื่องที่กำลังได้รับความสนใจ</p>
      </div>
      <ol className="space-y-2.5">
        {trendingBooks.map((book, index) => (
          <li key={`${book.title}-${index}`}>
            {(() => {
              const displayTitle = book.title
                .replace(/\s+—\s+.*$/, "")
                .replace(/\s·\s.*$/, "");

              return (
            <Link
              aria-label={`อันดับที่ ${index + 1} เรื่อง ${displayTitle}`}
              className="group grid grid-cols-[24px_42px_minmax(0,1fr)] items-center gap-2 rounded-[7px] p-1 transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
              href={`${modePaths[mode]}?title=${encodeURIComponent(book.title)}`}
            >
              <span className={`sidebar-meta text-center font-semibold ${index === 0 ? "text-[#42ed88]" : "text-white/45"}`}>{index + 1}</span>
              <div className="relative aspect-[2/3] overflow-hidden rounded-[5px] bg-[#18201c]">
                <Image alt={`ปกหนังสือ ${displayTitle}`} className="object-cover" fill sizes="42px" src={book.image} />
              </div>
              <div className="min-w-0">
                <p className="sidebar-item-title truncate text-white transition group-hover:text-[#42ed88]" title={displayTitle}>{displayTitle}</p>
                <p className="sidebar-meta truncate text-white/45">{book.author}</p>
                <p className="sidebar-caption mt-0.5 truncate text-white/35">เข้าชม {book.views}</p>
              </div>
            </Link>
              );
            })()}
          </li>
        ))}
      </ol>
    </section>
  );
}

function stripEditionSuffix(title: string) {
  return title.replace(/\s·\s(?:บทพิเศษ|ฤดูใหม่|ความทรงจำอีกด้าน|หลังวันนั้น)$/, "");
}

function normalizeBookTitle(title: string, category: string) {
  const categoryPrefix = `${category} · `;
  const fanficPrefix = `แฟนฟิค${category}: `;
  const cartoonPrefix = `การ์ตูน${category}: `;

  if (title.startsWith(categoryPrefix)) return stripEditionSuffix(title.slice(categoryPrefix.length));
  if (title.startsWith(fanficPrefix)) return stripEditionSuffix(title.slice(fanficPrefix.length));
  if (title.startsWith(cartoonPrefix)) return stripEditionSuffix(title.slice(cartoonPrefix.length));
  return stripEditionSuffix(title);
}

function isFanficTitle(title: string) {
  return title.startsWith("แฟนฟิค") || /\([^()]+\)\s*$/.test(title);
}

function removeFanficLabel(title: string) {
  return title.replace(/\s*\([^()]+\)\s*$/, "");
}

function getBooksByCategory(category: string, mode: ReadModeId) {
  const sourceBooks = (categoryBooks[category] ?? []).filter((book) => book.category === category);
  const modeBooks = mode === "novel"
    ? sourceBooks.filter((book) => !book.title.startsWith("แฟนฟิค") && !book.title.startsWith("การ์ตูน"))
    : mode === "fanfic"
      ? sourceBooks.filter((book) => isFanficTitle(book.title))
      : sourceBooks.filter((book) => book.title.startsWith("การ์ตูน"));
  const books = uniqueBooks(modeBooks.map((book) => {
    const title = normalizeBookTitle(book.title, category);
    return {
      ...book,
      title: mode === "fanfic"
        ? `${removeFanficLabel(title)} (${fanficFandomByCategory[category] ?? "Original Universe"})`
        : title,
    };
  }), mode);

  if (mode === "fanfic" || mode === "cartoon" || (category !== "วาย" && category !== "ยูริ") || books.length === 0) return books;

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

function Pagination({ pageCount, contentLabel, currentPage, onChange }: { pageCount: number; contentLabel: string; currentPage: number; onChange: (page: number) => void }) {
  const pages: Array<number | "ellipsis"> = pageCount <= 7
    ? Array.from({ length: pageCount }, (_, index) => index + 1)
    : [1, 2, 3, 4, 5, "ellipsis", pageCount];

  return (
    <nav aria-label={`เปลี่ยนหน้า${contentLabel}`} className="flex items-center justify-center gap-2 pt-2">
      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return <span aria-hidden="true" className="px-1 text-[12px] text-white/35" key={`ellipsis-${index}`}>…</span>;
        }

        const isCurrent = page === currentPage;

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
            onClick={() => onChange(page)}
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
  selectedGenres: string[];
  showFollowedCategories: boolean;
};

export default function ReadDiscovery({ followedCategories, mode, onToggleCategory, onSelectCategory, selectedCategory, selectedGenres, showFollowedCategories }: ReadDiscoveryProps) {
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [catalogPage, setCatalogPage] = useState(1);
  const contentLabel = modeLabels[mode];
  const isAllBooks = selectedCategory === "ทั้งหมด";
  const isMultiCategory = selectedCategory === "ปรับแต่ง" && selectedGenres.length > 0;
  const isCategoryCatalog = isAllBooks || isMultiCategory || Object.prototype.hasOwnProperty.call(categoryBooks, selectedCategory);
  const catalogBooks = isAllBooks ? getMixedBooks(30, mode) : isMultiCategory ? getBooksByCategories(selectedGenres, mode) : getBooksByCategory(selectedCategory, mode);
  const sortedCatalogBooks = sortBooks(catalogBooks, sortOption);
  const paginationPageCount = Math.max(1, Math.ceil(sortedCatalogBooks.length / 36));
  const activeCatalogPage = Math.min(catalogPage, paginationPageCount);
  const visibleCatalogBooks = sortedCatalogBooks.slice((activeCatalogPage - 1) * 36, activeCatalogPage * 36);
  const usedSectionImages = new Set<string>();
  const usedSectionStoryKeys = new Set<string>();

  useEffect(() => {
    setCatalogPage(1);
  }, [selectedCategory, sortOption]);

  const selectCategoryAndScroll = (category: string) => {
    onSelectCategory(category);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("category-filter")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const myCategorySections = selectedGenres.map((category) => ({
    title: category,
    subtitle: `รวม${contentLabel}หมวด${category}ที่คุณเลือกไว้`,
    category,
  }));
  const visibleSections = selectedCategory === "หมวดของฉัน"
    ? [bookSections[0], bookSections[1], ...myCategorySections]
    : bookSections;

  return (
    <section className="mx-auto max-w-[1400px] bg-arn-canvas px-2 pb-12 pt-7 text-arn-text" id="read-discovery">
      <div className="grid grid-cols-[minmax(0,1fr)_290px] gap-6">
        <div className="min-w-0 space-y-8">
          {isCategoryCatalog ? (
            <>
              <div>
                <BooksHeading
                  onChange={(nextSortOption) => {
                    setSortOption(nextSortOption);
                    setCatalogPage(1);
                  }}
                  subtitle={isAllBooks ? `รวม${contentLabel}หลากหลายหมวดหมู่ไว้ให้คุณค้นพบ` : `รวม${contentLabel}หมวด${selectedCategory}ที่คัดมาให้คุณ`}
                  title={isAllBooks ? `${contentLabel}ทั้งหมด` : isMultiCategory ? `${contentLabel}จากหมวดที่เลือก` : `${contentLabel}${selectedCategory}`}
                  value={sortOption}
                />
                <div className="grid grid-cols-6 gap-x-3 gap-y-6">
                  {visibleCatalogBooks.map((book) => <BookCard book={book} mode={mode} key={book.title} />)}
                </div>
              </div>
              {paginationPageCount > 1 && <Pagination contentLabel={contentLabel} currentPage={activeCatalogPage} onChange={setCatalogPage} pageCount={paginationPageCount} />}
            </>
          ) : visibleSections.map((section) => {
            const sectionBooks = getSectionBooks(section.category, mode, usedSectionImages, usedSectionStoryKeys);

            return (
              <div key={section.title}>
                <SectionHeading
                  onViewAll={section.category.startsWith("__") ? undefined : () => selectCategoryAndScroll(section.category)}
                  showAllLink={!section.category.startsWith("__")}
                  title={section.category === "__trending__" ? `${contentLabel}แนะนำ` : section.title}
                  subtitle={section.subtitle}
                />
                <div className="grid grid-cols-6 gap-3">
                  {sectionBooks.map((book) => <BookCard book={book} mode={mode} key={book.title} />)}
                </div>
              </div>
            );
          })}

        </div>

        <aside className="flex min-w-0 flex-col gap-4 border-l border-white/[0.08] pl-5">
          {!(showFollowedCategories && selectedCategory === "หมวดของฉัน") && (
            selectedCategory === "ทั้งหมด"
              ? <PopularRankingCard mode={mode} />
              : <TrendingStories mode={mode} selectedCategories={selectedGenres} selectedCategory={selectedCategory} />
          )}
          {selectedCategory === "หมวดของฉัน" && (
            <>
              <MyBookshelfCard mode={mode} />
              <InterestedTags onSelectCategory={onSelectCategory} selectedGenres={selectedGenres} />
            </>
          )}
          <ReaderReviews mode={mode} selectedCategory={selectedCategory} />
        </aside>
      </div>
    </section>
  );
}
