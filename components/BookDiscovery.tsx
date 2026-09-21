"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getCategorySections } from "@/data/categoryBooks";
import StoryMetadata from "@/components/StoryMetadata";
import type { StoryStatus } from "@/data/storyStatus";
import { recommendedWriters, type RecommendedWriter } from "@/components/writerData";

type Book = {
  title: string;
  author: string;
  category: string;
  episodes: string;
  views: string;
  likes: string;
  image: string;
  status?: StoryStatus;
};

type DiscoverySection = {
  title: string;
  subtitle: string;
  books?: Book[];
  writers?: RecommendedWriter[];
};

const followedContentWriters: RecommendedWriter[] = [
  ...recommendedWriters,
  { slug: "rainymew", name: "rainymew", type: "นิยาย", image: "/images/writers/rainymew.webp", bio: "เรื่องราวอบอุ่นที่อยากชวนคุณมาอ่านด้วยกัน", followers: "4.8K", works: "12" },
  { slug: "sorayoru", name: "sorayoru", type: "แฟนฟิค", image: "/images/writers/sorayoru.webp", bio: "เรื่องราวแฟนตาซีจากมุมมองที่ไม่เหมือนใคร", followers: "4.2K", works: "10" },
];

const sections: DiscoverySection[] = [
  {
    title: "คัดมาให้คุณ",
    subtitle: "เรื่องที่เลือกมาให้เข้ากับความสนใจของคุณ",
    books: [
      { title: "Not Just Friends (BTS)", author: "purplemoon", category: "วาย", episodes: "58", views: "1.8M", likes: "32.1K", image: "/images/book-not-just-friends.webp" },
      { title: "Sky of Tomorrow", author: "AkiStudio", category: "แฟนตาซี", episodes: "26", views: "620K", likes: "14.1K", image: "/images/book-sky-tomorrow.webp" },
      { title: "Pixel Heart", author: "Mochi", category: "คอมเมดี้", episodes: "22", views: "430K", likes: "10.4K", image: "/images/book-pixel-heart.webp" },
      { title: "Love in Parallel (Harry Potter)", author: "felixs", category: "แฟนตาซี", episodes: "44", views: "1.1M", likes: "24.3K", image: "/images/book-love-parallel.webp" },
      { title: "The Villain's Side (Harry Potter)", author: "sorayoru", category: "ลึกลับ", episodes: "39", views: "780K", likes: "18.7K", image: "/images/book-villains-side.webp" },
      { title: "พันธนาการทิวลิป", author: "Krittanai", category: "แฟนตาซี", episodes: "36", views: "980K", likes: "18.6K", image: "/images/book-tulip-bound.webp" },
    ],
  },
  {
    title: "เพราะคุณอ่าน...",
    subtitle: "เรื่องราวที่คัดสรรจากแนวและสไตล์ที่คุณสนใจ",
    books: [
      { title: "แสงระหว่างบรรทัด", author: "LunarBlack", category: "โรแมนติก", episodes: "42", views: "1.2M", likes: "24.5K", image: "/images/book-between-lines.webp" },
      { title: "สอนใจในหน้าร้อน", author: "Moonlit", category: "โรแมนติก", episodes: "28", views: "856K", likes: "18.2K", image: "/images/book-summer-lessons.webp" },
      { title: "พันธนาการทิวลิป", author: "Krittanai", category: "แฟนตาซี", episodes: "36", views: "980K", likes: "18.6K", image: "/images/book-tulip-bound.webp" },
      { title: "ภาพถ่ายในสายฝน", author: "mebell", category: "โรแมนติก", episodes: "19", views: "620K", likes: "12.4K", image: "/images/book-photographs-rain.webp" },
      { title: "บ้านหลังสุดท้าย", author: "NaowWriter", category: "ลึกลับ", episodes: "31", views: "540K", likes: "11.8K", image: "/images/book-last-house.webp" },
      { title: "กุหลาบในเงาไฟ", author: "Aris", category: "โรแมนติก", episodes: "24", views: "430K", likes: "9.4K", image: "/images/book-roses-fire.webp" },
    ],
  },
  {
    title: "เรื่องที่น่าจะชอบ",
    subtitle: "เรื่องราวที่คัดมาให้คุณลองเปิดใจทำความรู้จัก",
    books: [
      { title: "Not Just Friends (BTS)", author: "purplemoon", category: "วาย", episodes: "58", views: "1.8M", likes: "32.1K", image: "/images/book-not-just-friends.webp" },
      { title: "Our Classroom (SEVENTEEN)", author: "rainymew", category: "วาย", episodes: "33", views: "920K", likes: "20.5K", image: "/images/book-our-classroom.webp" },
      { title: "Kissed by the Stars (TWICE)", author: "seriian", category: "แฟนตาซี", episodes: "27", views: "660K", likes: "15.2K", image: "/images/book-kissed-stars.webp" },
      { title: "Rewrite the End (NCT)", author: "felixs", category: "แอ๊กชั่น", episodes: "21", views: "410K", likes: "11.4K", image: "/images/book-rewrite-end.webp" },
      { title: "Love in Parallel (Harry Potter)", author: "felixs", category: "แฟนตาซี", episodes: "44", views: "1.1M", likes: "24.3K", image: "/images/book-love-parallel.webp" },
      { title: "The Villain's Side (Harry Potter)", author: "sorayoru", category: "ลึกลับ", episodes: "39", views: "780K", likes: "18.7K", image: "/images/book-villains-side.webp" },
    ],
  },
  {
    title: "อ่านต่อ",
    subtitle: "กลับไปอ่านเรื่องที่คุณกำลังติดตามต่อได้ทันที",
    books: [
      { title: "Sky of Tomorrow", author: "AkiStudio", category: "แฟนตาซี", episodes: "26", views: "620K", likes: "14.1K", image: "/images/book-sky-tomorrow.webp", status: "completed" },
      { title: "Lemon Days", author: "sorani", category: "โรแมนติก", episodes: "32", views: "950K", likes: "18.9K", image: "/images/book-lemon-days.webp", status: "completed" },
      { title: "Blood Moon", author: "Kuroi", category: "สยองขวัญ", episodes: "18", views: "520K", likes: "22.7K", image: "/images/book-blood-moon.webp", status: "completed" },
      { title: "City of Echoes", author: "Panthera", category: "ลึกลับ", episodes: "29", views: "480K", likes: "11.9K", image: "/images/book-city-echoes.webp", status: "completed" },
      { title: "Pixel Heart", author: "Mochi", category: "คอมเมดี้", episodes: "22", views: "430K", likes: "10.4K", image: "/images/book-pixel-heart.webp", status: "completed" },
      { title: "Parallel World", author: "Nagi", category: "แฟนตาซี", episodes: "25", views: "390K", likes: "9.8K", image: "/images/book-parallel-world.webp", status: "completed" },
    ],
  },
];

const forYouSections: DiscoverySection[] = [
  { ...sections[0], books: sections[3].books },
  { ...sections[1], title: 'เพราะคุณอ่าน "Sky of Tomorrow"' },
  sections[2],
  { ...sections[3], books: sections[0].books },
];

const forYouSectionIcons: Record<string, SimpleTitleIconName> = {
  "คัดมาให้คุณ": "sparkle",
  'เพราะคุณอ่าน "Sky of Tomorrow"': "bookmark",
  "เรื่องที่น่าจะชอบ": "star",
  "อ่านต่อ": "play",
};

const continueSectionIcons: Record<string, SimpleTitleIconName> = {
  "อ่านต่อจากที่ค้างไว้": "bookmark",
  "อัปเดตจากเรื่องที่กำลังอ่าน": "bell",
  "ใกล้อ่านจบ": "clock",
  "กลับไปเรื่องโปรด": "star",
};

const trendingSectionIcons: Record<string, SimpleTitleIconName> = {
  "กำลังมาแรง": "flame",
  "มาแรงในหมวดที่คุณชอบ": "star",
  "มาแรงประจำสัปดาห์": "chart",
};

const followingSectionIcons: Record<string, SimpleTitleIconName> = {
  "อัปเดตใหม่จากที่ติดตาม": "bell",
  "นักเขียนที่ติดตาม": "users",
  "เรื่องที่ติดตาม": "books",
  "ยังไม่ได้อ่านจากที่ติดตาม": "bookmark",
};

type SimpleTitleIconName = "sparkle" | "star" | "bookmark" | "play" | "clock" | "flame" | "users" | "books" | "check" | "bell" | "note" | "chart" | "community" | "news" | "library" | "book" | "gear";

const completedSectionIcons: Record<string, SimpleTitleIconName> = {
  "เรื่องจบครบแล้วสำหรับคุณ": "check",
  "จบใหม่": "clock",
  "ยอดนิยม": "star",
  "อ่านรวดเดียวจบ": "play",
};

const continueSections: DiscoverySection[] = [
  {
    ...sections[0],
    title: "อ่านต่อจากที่ค้างไว้",
    subtitle: "กลับไปอ่านเรื่องที่คุณกำลังติดตามต่อได้ทันที",
  },
  {
    ...sections[1],
    title: "อัปเดตจากเรื่องที่กำลังอ่าน",
    subtitle: "ตอนใหม่จากเรื่องที่คุณกำลังอ่านอยู่",
    books: sections[2].books,
  },
  {
    ...sections[2],
    title: "ใกล้อ่านจบ",
    subtitle: "อีกไม่กี่ตอนก็จะเดินทางไปถึงบทสุดท้าย",
    books: ["โรแมนติก", "วาย", "ยูริ", "แฟนตาซี", "ลึกลับ", "คอมเมดี้"].flatMap((category) => getCategorySections(category)[0]?.books.slice(0, 1) ?? []),
  },
  {
    ...sections[3],
    title: "กลับไปเรื่องโปรด",
    subtitle: "เรื่องที่คุณชื่นชอบและอยากกลับมาอ่านอีกครั้ง",
    books: ["โรแมนติก", "แฟนตาซี", "จีนโบราณ", "สยองขวัญ", "แอ๊กชั่น", "ไซไฟ"].flatMap((category) => getCategorySections(category)[0]?.books.slice(0, 1) ?? []),
  },
];

const mixCategoryBooks = (categories: string[], startingSection = 0) => categories.flatMap((category, index) => {
  const sectionIndex = (startingSection + index) % 2;
  return getCategorySections(category)[sectionIndex]?.books.slice(0, 1) ?? [];
});

const trendingSections: DiscoverySection[] = [
  {
    title: "กำลังมาแรง",
    subtitle: "เรื่องที่ผู้อ่านกำลังพูดถึงมากที่สุดตอนนี้",
    books: mixCategoryBooks(["แฟนตาซี", "โรแมนติก", "วาย", "ลึกลับ", "แอ๊กชั่น", "ไซไฟ"]),
  },
  {
    title: "มาแรงในหมวดที่คุณชอบ",
    subtitle: "เรื่องเด่นจากหมวดหมู่ที่คุณติดตามเป็นประจำ",
    books: mixCategoryBooks(["โรแมนติก", "ยูริ", "จีนโบราณ", "คอมเมดี้", "แฟนตาซี", "สยองขวัญ"], 1),
  },
  {
    title: "มาแรงประจำสัปดาห์",
    subtitle: "เรื่องที่กำลังได้รับความสนใจเพิ่มขึ้นในสัปดาห์นี้",
    books: mixCategoryBooks(["วาย", "แฟนตาซี", "เกิดใหม่", "ลึกลับ", "โรแมนติก", "แอ๊กชั่น"], 2),
  },
];

const followingSections: DiscoverySection[] = [
  {
    title: "อัปเดตใหม่จากที่ติดตาม",
    subtitle: "ตอนใหม่จากเรื่องและนักเขียนที่คุณติดตาม",
    books: sections[2].books,
  },
  {
    title: "นักเขียนที่ติดตาม",
    subtitle: "ผลงานจากนักเขียนที่คุณกดติดตามไว้",
    writers: followedContentWriters,
  },
  {
    title: "เรื่องที่ติดตาม",
    subtitle: "รวมเรื่องที่คุณกำลังติดตามอยู่ในที่เดียว",
    books: mixCategoryBooks(["วาย", "โรแมนติก", "แฟนตาซี", "ยูริ", "ลึกลับ", "คอมเมดี้"], 2),
  },
  {
    title: "ยังไม่ได้อ่านจากที่ติดตาม",
    subtitle: "เรื่องที่คุณติดตามไว้และยังมีตอนรอให้เปิดอ่าน",
    books: mixCategoryBooks(["แฟนตาซี", "โรแมนติก", "วาย", "ลึกลับ", "แอ๊กชั่น", "ไซไฟ"], 1),
  },
];

const completedSections: DiscoverySection[] = [
  {
    title: "เรื่องจบครบแล้วสำหรับคุณ",
    subtitle: "เรื่องที่อ่านได้ต่อเนื่องจนจบโดยไม่ต้องรอตอนใหม่",
    books: sections[3].books,
  },
  {
    title: "จบใหม่",
    subtitle: "เรื่องที่เพิ่งเดินทางมาถึงบทสรุป",
    books: mixCategoryBooks(["โรแมนติก", "แฟนตาซี", "ลึกลับ", "วาย", "ยูริ", "คอมเมดี้"]),
  },
  {
    title: "ยอดนิยม",
    subtitle: "เรื่องจบยอดนิยมที่ผู้อ่านชื่นชอบ",
    books: mixCategoryBooks(["วาย", "โรแมนติก", "แฟนตาซี", "ลึกลับ", "แอ๊กชั่น", "ไซไฟ"], 1),
  },
  {
    title: "อ่านรวดเดียวจบ",
    subtitle: "รวมเรื่องจบที่เหมาะกับการอ่านยาว ๆ",
    books: mixCategoryBooks(["แฟนตาซี", "โรแมนติก", "วาย", "สยองขวัญ", "ลึกลับ", "คอมเมดี้"], 2),
  },
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

const featuredReaderReviews = [
  {
    name: "daisyminute",
    quote: "เรื่องนี้ทำให้เราได้คิดถึงความรักที่อบอุ่นและจริงใจ อ่านแล้ววางไม่ลงเลย ทั้งการเล่าเรื่อง ตัวละคร และอารมณ์ที่ค่อย ๆ เติบโตไปด้วยกัน",
    book: "เพียงเธอในฤดูหนาว",
    author: "LuneBlack",
    avatar: "/images/writers/purplemoon.webp",
    cover: "/images/book-summer-lessons.webp",
    likes: "1.2K",
  },
  {
    name: "moonlit",
    quote: "บรรยากาศของเรื่องดีมาก ชอบการค่อย ๆ ทิ้งเบาะแสให้เราเดาตาม อ่านจบแล้วอยากกลับไปอ่านซ้ำอีกครั้ง",
    book: "บ้านหลังสุดท้าย",
    author: "NaowWriter",
    avatar: "/images/writers/moonlit.webp",
    cover: "/images/book-last-house.webp",
    likes: "986",
  },
];

const communityTopics = [
  { slug: "most-emotional-novel-moment", title: "จากไหนในนิยายที่ทำให้คุณร้องไห้ที่สุด?", comments: "1.2K ความคิดเห็น", time: "3 ชั่วโมงที่แล้ว", image: "/images/community/community-cat.webp" },
  { slug: "slow-burn-mood-recommendations", title: "แนะนำมู้ดของ Slow Burn หน่อยค่ะ...", comments: "892 ความคิดเห็น", time: "5 ชั่วโมงที่แล้ว", image: "/images/community/community-hood.webp" },
  { slug: "character-you-want-to-hug", title: "ตัวละครไหนที่คุณอยากให้มากอด?", comments: "645 ความคิดเห็น", time: "1 วันที่แล้ว", image: "/images/community/community-artist.webp" },
  { slug: "story-that-needs-a-hug", title: "ถ้ามีอยากกอดในนิยาย อยากให้เรื่องไหนถูกกอด?", comments: "521 ความคิดเห็น", time: "2 วันที่แล้ว", image: "/images/community/community-pink.webp" },
  { slug: "novel-to-become-series", title: "นิยายเรื่องไหนที่คุณอยากให้ถูกสร้างเป็นซีรีส์?", comments: "438 ความคิดเห็น", time: "2 วันที่แล้ว", image: "/images/community/community-library.webp" },
  { slug: "long-fantasy-novel-recommendations", title: "ช่วยแนะนำนิยายแฟนตาซีอ่านยาว ๆ หน่อยครับ", comments: "367 ความคิดเห็น", time: "3 วันที่แล้ว", image: "/images/community/community-mage.webp" },
  { slug: "best-time-to-read-new-episodes", title: "คุณชอบอ่านตอนใหม่ในช่วงเวลาไหนกันบ้าง?", comments: "294 ความคิดเห็น", time: "4 วันที่แล้ว", image: "/images/community/community-portal.webp" },
  { slug: "favorite-novel-to-reread", title: "มีเรื่องไหนที่อ่านซ้ำแล้วไม่เคยเบื่อบ้าง?", comments: "186 ความคิดเห็น", time: "5 วันที่แล้ว", image: "/images/community/community-tree.webp" },
];

function getSectionHref(title: string, selectedCategory: string) {
  const categoryQuery = `?category=${encodeURIComponent(selectedCategory)}`;

  if (selectedCategory === "สำหรับคุณ" && title === "อ่านต่อ") return "/read?category=อ่านต่อ";

  if (title.startsWith("นิยาย")) return `/read${categoryQuery}`;

  if (title.startsWith("แฟนฟิค")) return `/read/fanfic${categoryQuery}`;
  if (title.startsWith("การ์ตูน")) return `/read/cartoon${categoryQuery}`;
  return `/read${categoryQuery}`;
}

function getDisplayBookTitle(book: Book) {
  const prefixes = [
    `${book.category} · `,
    `แฟนฟิค${book.category}: `,
    `การ์ตูน${book.category}: `,
  ];
  const prefix = prefixes.find((candidate) => book.title.startsWith(candidate));
  const title = prefix ? book.title.slice(prefix.length) : book.title;

  const displayTitle = title.replace(/\s[·—]\s.*$/, "");
  const isFanfic = book.title.startsWith("แฟนฟิค") || /\([^()]+\)\s*$/.test(book.title);

  return isFanfic && !/\([^()]+\)\s*$/.test(displayTitle) ? `${displayTitle} (แฟนฟิค)` : displayTitle;
}

function SimpleTitleIcon({ name, className = "h-5 w-5" }: { name: SimpleTitleIconName; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.7 };

  if (name === "sparkle") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="m12 3.5 1.5 4.2L17.7 9l-4.2 1.3L12 14.5l-1.5-4.2L6.3 9l4.2-1.3L12 3.5ZM18.3 14.4l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.8Z" /></svg>;
  if (name === "star") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="m12 3.8 2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8L12 3.8Z" /></svg>;
  if (name === "bookmark") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M6.5 4.5h11v15l-5.5-3.2-5.5 3.2v-15Z" /></svg>;
  if (name === "play") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><circle {...common} cx="12" cy="12" r="8.5" /><path {...common} d="m10 8.5 5 3.5-5 3.5v-7Z" /></svg>;
  if (name === "clock") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><circle {...common} cx="12" cy="12" r="8.5" /><path {...common} d="M12 7.5v5l3.2 2" /></svg>;
  if (name === "flame") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M12.2 20.2c3.3 0 5.7-2.1 5.7-5.2 0-2.4-1.3-4.2-2.9-5.9-.1 1.8-.8 2.8-2 3.5.1-2.8-1.1-5.4-3.3-7.1.1 2.7-2.3 4.5-2.3 7.6 0 4 2.4 7.1 4.8 7.1Z" /></svg>;
  if (name === "users") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><circle {...common} cx="12" cy="8" r="2.8" /><path {...common} d="M6.5 19v-1.1a4.1 4.1 0 0 1 4.1-4.1h2.8a4.1 4.1 0 0 1 4.1 4.1V19M5.2 11.5a2.2 2.2 0 0 0-2 2.2v.6M18.8 11.5a2.2 2.2 0 0 1 2 2.2v.6" /></svg>;
  if (name === "books") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M5 5.5h5.2A2.8 2.8 0 0 1 13 8.3V19a2.8 2.8 0 0 0-2.8-2.8H5v-10.7ZM19 5.5h-5.2A2.8 2.8 0 0 0 11 8.3V19a2.8 2.8 0 0 1 2.8-2.8H19v-10.7Z" /></svg>;
  if (name === "check") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><circle {...common} cx="12" cy="12" r="8.5" /><path {...common} d="m8.3 12.2 2.4 2.4 5-5" /></svg>;
  if (name === "bell") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M6.5 16.8h11l-1.3-2v-3.2a4.2 4.2 0 0 0-8.4 0v3.2l-1.3 2ZM10.2 19.2h3.6" /></svg>;
  if (name === "note") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M6 4.8h12v10.3l-3.6 3.6H6V4.8Z" /><path {...common} d="M14.4 18.7v-3.6H18M9 9h6M9 12h4" /></svg>;
  if (name === "chart") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M5 18V12M10 18V8M15 18V5M20 18H4" /></svg>;
  if (name === "community") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><circle {...common} cx="12" cy="8" r="2.5" /><circle {...common} cx="5.5" cy="12" r="2" /><circle {...common} cx="18.5" cy="12" r="2" /><path {...common} d="M8.2 18.5v-1a3.8 3.8 0 0 1 3.8-3.8 3.8 3.8 0 0 1 3.8 3.8v1M7.3 14.2l-1.1 1.1M16.7 14.2l1.1 1.1" /></svg>;
  if (name === "news") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M5.5 5.2h13v13.6h-13zM8.5 8.5h7M8.5 11.5h7M8.5 14.5h4" /></svg>;
  if (name === "library") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M5 5.5h3v13H5zM10.5 5.5h3v13h-3zM16 5.5h3v13h-3z" /><path {...common} d="M4 19.5h16" /></svg>;
  if (name === "book") return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><path {...common} d="M4.8 5.5h5.5a2 2 0 0 1 2 2V19a2 2 0 0 0-2-2H4.8v-11.5ZM19.2 5.5h-5.5a2 2 0 0 0-2 2V19a2 2 0 0 1 2-2h5.5v-11.5Z" /></svg>;
  return <svg aria-hidden="true" className={`${className} text-[#2ee77b]`} viewBox="0 0 24 24"><circle {...common} cx="12" cy="12" r="3" /><path {...common} d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" /></svg>;
}

function LibraryIcon() {
  return <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24"><path d="M4.75 5.5h5.5a2 2 0 0 1 2 2v11a2 2 0 0 0-2-2h-5.5v-11ZM19.25 5.5h-5.5a2 2 0 0 0-2 2v11a2 2 0 0 1 2-2h5.5v-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="M7.5 8.5h2M14.5 8.5h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

function MessageBubbleIcon() {
  return <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24"><path d="M4.25 5.5a2 2 0 0 1 2-2h11.5a2 2 0 0 1 2 2v8.25a2 2 0 0 1-2 2H11l-4.25 3.25v-3.25h-.5a2 2 0 0 1-2-2V5.5Z" fill="currentColor" /><path d="m8 10.25 2.25 1.5 2.35-2.65 1.55 1.1 2.1-2.2" stroke="#07100b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" /></svg>;
}

function CommunityIcon() {
  return <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.7" /><path d="M5.5 19.5v-1.1a4.4 4.4 0 0 1 4.4-4.4h4.2a4.4 4.4 0 0 1 4.4 4.4v1.1M4.25 11.5a2.5 2.5 0 0 0-2 2.45v.8M19.75 11.5a2.5 2.5 0 0 1 2 2.45v.8M5 10.2a2.5 2.5 0 1 1 0-5M19 10.2a2.5 2.5 0 1 0 0-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}

function CrownIcon() {
  return <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24"><path d="m4.5 7.5 3.7 3 3.8-5 3.8 5 3.7-3-1.6 10H6.1l-1.6-10Z" fill="currentColor" /><path d="M6.5 19.5h11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

function FlameIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M12.1 21c3.8 0 6.4-2.4 6.4-5.8 0-2.8-1.7-4.8-3.5-6.8-.2 2.1-1.1 3.2-2.4 3.8.2-3.5-1.5-6.7-4-8.7.1 3.3-2.9 5.5-2.9 9.3C5.7 17.9 8.1 21 12.1 21Z" fill="currentColor" /></svg>;
}

function CommentIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M5 5.5h14v10H9.5L5 18.5v-3H5v-10Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="M8 9h8M8 12h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

function HeartOutlineIcon() {
  return <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24"><path d="M12 19.2S4.2 14.8 4.2 9.3a3.7 3.7 0 0 1 6.6-2.3L12 8.3l1.2-1.3a3.7 3.7 0 0 1 6.6 2.3c0 5.5-7.8 9.9-7.8 9.9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
}

function ClockIcon() {
  return <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" /><path d="M12 7.5v5l3.25 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}

function CompletedBookIcon() {
  return <svg aria-hidden="true" className="h-7 w-7 shrink-0" fill="none" viewBox="0 0 24 24"><path d="M4.5 5.5c1.8-.8 3.6-.7 5.4.5v12.5c-1.8-1.2-3.6-1.3-5.4-.5V5.5ZM19.5 5.5c-1.8-.8-3.6-.7-5.4.5v12.5c1.8-1.2 3.6-1.3 5.4-.5V5.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /><path d="M12 6v12.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

function CompletedCalendarIcon() {
  return <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24"><rect height="15" rx="2" stroke="currentColor" strokeWidth="1.6" width="15" x="4.5" y="5.5" /><path d="M8 3.8v3.4M16 3.8v3.4M4.5 9.5h15M8 13h2M12 13h2M8 16.5h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

function CompletedClockIcon() {
  return <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" /><path d="M12 7.8v4.7l3 1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function CompletedReviewIcon() {
  return <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24"><path d="M6 4.8h12v11H10l-4 3.3V4.8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" /><path d="M9 8.5h6M9 11.5h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

function CompletedStarIcon() {
  return <svg aria-hidden="true" className="h-[19px] w-[19px] shrink-0" fill="none" viewBox="0 0 24 24"><path d="m12 4.5 2.3 4.7 5.2.8-3.8 3.7.9 5.2-4.6-2.5-4.6 2.5.9-5.2-3.8-3.7 5.2-.8L12 4.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" /></svg>;
}

const readerStats = [
  { value: "128", label: "เรื่องในชั้นหนังสือ", icon: LibraryIcon },
  { value: "56", label: "เรื่องที่ชอบ", icon: HeartOutlineIcon },
  { value: "320", label: "ชั่วโมงที่อ่าน", icon: ClockIcon },
];

const bookshelfItems = [
  { title: "อ่านต่อ", count: "12", image: "/images/book-between-lines.webp" },
  { title: "เรื่องโปรด", count: "24", image: "/images/book-rewrite-end.webp" },
  { title: "อยากอ่าน", count: "36", image: "/images/book-summer-lessons.webp" },
  { title: "อ่านจบ", count: "56", image: "/images/book-city-echoes.webp" },
];

const latestReading = {
  title: "Not Just Friends (BTS)",
  author: "purplemoon",
  episode: "ตอนที่ 35 / 58",
  lastRead: "อ่านล่าสุด 2 ชั่วโมงที่แล้ว",
  image: "/images/book-not-just-friends.webp",
};

const newEpisodeStories = [
  { title: "Not Just Friends (BTS)", author: "purplemoon", episode: "ตอนที่ 59", time: "1 ชั่วโมงที่แล้ว", image: "/images/book-not-just-friends.webp" },
  { title: "Sky of Tomorrow", author: "AkiStudio", episode: "ตอนที่ 27", time: "3 ชั่วโมงที่แล้ว", image: "/images/book-sky-tomorrow.webp" },
  { title: "Love in Parallel (Harry Potter)", author: "felixs", episode: "ตอนที่ 45", time: "เมื่อวาน", image: "/images/book-love-parallel.webp" },
  { title: "The Villain's Side (Harry Potter)", author: "sorayoru", episode: "ตอนที่ 40", time: "เมื่อวาน", image: "/images/book-villains-side.webp" },
];

const latestReadingNotes = [
  { title: "ดอกไม้ที่หอมหวานกว่าคืน", author: "Pixel Heart", episode: "12", lastRead: "อ่านจบเมื่อ 1 วันที่แล้ว", image: "/images/book-pixel-heart.webp" },
  { title: "บทสนทนาในวันที่ฝนตก", author: "Not Just Friends", episode: "28", lastRead: "อ่านจบเมื่อ 2 วันที่แล้ว", image: "/images/book-not-just-friends.webp" },
  { title: "คำทำนายในคืนดาว", author: "Sky of Tomorrow", episode: "9", lastRead: "อ่านจบเมื่อ 3 วันที่แล้ว", image: "/images/book-sky-tomorrow.webp" },
  { title: "วันที่เรากลับมาพบกัน", author: "Love in Parallel", episode: "20", lastRead: "อ่านจบเมื่อ 5 วันที่แล้ว", image: "/images/book-love-parallel.webp" },
];

type PopularRange = "today" | "week" | "month";

const popularRangeOptions: Array<{ id: PopularRange; label: string }> = [
  { id: "today", label: "วันนี้" },
  { id: "week", label: "7 วัน" },
  { id: "month", label: "30 วัน" },
];

function getUniqueBooks(books: Book[]) {
  const seen = new Set<string>();

  return books.filter((book) => {
    if (seen.has(book.title)) return false;
    seen.add(book.title);
    return true;
  }).slice(0, 10);
}

const popularRankingBooks: Record<PopularRange, Book[]> = {
  today: getUniqueBooks([...sections[0].books ?? [], ...sections[2].books ?? [], ...sections[1].books ?? []]),
  week: getUniqueBooks([...sections[2].books ?? [], ...sections[1].books ?? [], ...sections[0].books ?? []]),
  month: getUniqueBooks([...sections[1].books ?? [], ...sections[3].books ?? [], ...sections[2].books ?? []]),
};

const trendingWriters: RecommendedWriter[] = recommendedWriters.slice(0, 5).map((writer, index) => ({
  ...writer,
  followers: ["12.4K", "9.8K", "8.6K", "7.9K", "6.2K"][index],
}));

function ReaderWelcomeCard() {
  return (
    <section aria-labelledby="reader-welcome-title" className="ds-section">
      <div className="relative overflow-hidden px-4 pb-4 pt-4">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#0f9b64]/20 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <Image alt="โปรไฟล์นักอ่าน" className="h-[66px] w-[66px] shrink-0 rounded-full object-cover ring-2 ring-[#14e69a] ring-offset-2 ring-offset-[#101714]" height={66} src="/images/profile-arn.webp" width={66} />
          <div className="min-w-0">
            <p className="sidebar-caption font-medium text-[#58eaa9]">สวัสดีตอนเย็น</p>
            <h2 className="sidebar-title mt-0.5" id="reader-welcome-title">คุณนักอ่านคนพิเศษ</h2>
            <p className="sidebar-meta mt-1 leading-4 text-white/60">“ทุกเรื่องราวที่ดี<br />เริ่มต้นจากคนที่เชื่อในความฝัน”</p>
          </div>
        </div>
      </div>

      <div className="mx-3 grid grid-cols-3 divide-x divide-white/[0.1] rounded-[9px] border border-white/[0.1] bg-[#121a16]">
        {readerStats.map(({ value, label, icon: Icon }) => (
          <div className="flex min-w-0 flex-col items-center justify-center px-1.5 py-3 text-center text-[#f0fff7]" key={label}>
            <div className="flex items-center gap-1.5">
              <Icon />
              <span className="sidebar-stat-value">{value}</span>
            </div>
            <span className="sidebar-caption mt-1 text-white/55">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative mx-3 mb-3 mt-3 overflow-hidden rounded-[9px] border border-white/[0.1] bg-[#101714] px-3 py-4 text-center">
        <Image alt="" className="object-cover opacity-80" fill sizes="260px" src="/images/reader-welcome-bg.webp" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,13,.78),rgba(3,20,13,.36),rgba(3,20,13,.72))]" />
        <div className="sidebar-body relative font-medium text-white/85">
          ขอบคุณที่อยู่ในพื้นที่<br />ของเรื่องราวดี ๆ เสมอ
          <span className="mt-2 block text-[10px] tracking-[0.28em] text-[#a8cbb8]">— ARN SPACE —</span>
        </div>
      </div>
    </section>
  );
}

function ReadingStatusCard() {
  const statuses = [
    { label: "กำลังอ่าน", value: "12", unit: "เรื่อง" },
    { label: "พักไว้", value: "4", unit: "เรื่อง" },
    { label: "อ่านจบ", value: "56", unit: "เรื่อง" },
  ];

  return (
    <section aria-labelledby="reading-status-title" className="ds-section p-3">
      <div className="flex items-center gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="play" />
          <h2 className="sidebar-title" id="reading-status-title">สถานะการอ่านของคุณ</h2>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {statuses.map((status) => (
          <div className="rounded-[7px] border border-[#1b5944] bg-[#0d1b15] px-1.5 py-2.5 text-center" key={status.label}>
            <p className="sidebar-meta text-white/70">{status.label}</p>
            <p className="sidebar-stat-value mt-1">{status.value}</p>
            <p className="sidebar-caption mt-1 text-white/55">{status.unit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReaderStatsCard() {
  const stats = [
    { label: "อ่าน", value: "128", unit: "ตอน" },
    { label: "บันทึก", value: "56", unit: "เรื่อง" },
    { label: "เวลาอ่าน", value: "320", unit: "นาที" },
  ];

  return (
    <section aria-labelledby="reader-stats-title" className="ds-section p-3">
      <div className="flex items-center gap-[7px]">
        <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="chart" />
        <h2 className="sidebar-title" id="reader-stats-title">สถิติหนังสือของคุณ</h2>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div className="rounded-[7px] border border-[#1b5944] bg-[#0d1b15] px-1.5 py-2.5 text-center" key={stat.label}>
            <p className="sidebar-meta text-white/70">{stat.label}</p>
            <div className="mt-1 flex items-center justify-center text-white">
              <span className="sidebar-stat-value">{stat.value}</span>
            </div>
            <p className="sidebar-caption mt-1 text-white/60">{stat.unit}</p>
          </div>
        ))}
      </div>

      <p className="sidebar-meta mt-3 text-center font-medium text-[#1be27e]">↑ อ่านมากกว่าสัปดาห์ก่อน 18%</p>

      <div className="relative mt-3 overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#101714] px-3 py-3 text-center">
        <Image alt="" className="object-cover opacity-60" fill sizes="260px" src="/images/reader-welcome-bg.webp" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,13,.86),rgba(3,20,13,.5),rgba(3,20,13,.86))]" />
        <p className="sidebar-meta relative leading-5 text-white/80">“ทุกหน้าที่คุณอ่าน<br />คือตัวโลกเก่าที่อ่อนโยน”</p>
      </div>
    </section>
  );
}

function PopularRankingCard() {
  const [selectedRange, setSelectedRange] = useState<PopularRange>("today");
  const rankedBooks = popularRankingBooks[selectedRange];

  return (
    <section aria-labelledby="popular-ranking-title" className="ds-section p-2.5">
      <div className="flex items-center gap-[7px]">
        <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="flame" />
        <h2 className="sidebar-title" id="popular-ranking-title">อันดับยอดนิยม 10 อันดับแรก</h2>
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
        {rankedBooks.map((book, index) => (
          <Link className="group flex min-w-0 items-center gap-1.5 border-b border-white/[0.05] py-1.5 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(book.title)}`} key={book.title}>
            <span className={`sidebar-meta w-4 shrink-0 text-center font-semibold ${index === 0 ? "text-[#f6d86e]" : index === 1 ? "text-white" : index === 2 ? "text-[#f0a65c]" : "text-white/70"}`}>{index + 1}</span>
            <Image alt={`ปกหนังสือ ${book.title}`} className="h-8 w-6 shrink-0 rounded-[3px] object-cover" height={32} src={book.image} width={24} />
            <div className="min-w-0 flex-1">
              <h3 className="sidebar-item-title truncate transition group-hover:text-white" title={getDisplayBookTitle(book)}>{getDisplayBookTitle(book)}</h3>
              <p className="sidebar-meta mt-0.5 truncate text-white/45">{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TrendingWritersCard() {
  return (
    <section aria-labelledby="trending-writers-title" className="ds-section p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-[7px]">
          <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="users" />
          <h2 className="sidebar-title" id="trending-writers-title">นักเขียนมาแรง</h2>
        </div>
        <Link aria-label="ดูนักเขียนมาแรงทั้งหมด" className="sidebar-link inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/writers">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {trendingWriters.map((writer) => (
          <Link className="group flex min-w-0 items-center gap-2.5 py-2 first:pt-1 last:pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/writers/${writer.slug}`} key={writer.slug}>
            <Image alt={`รูปโปรไฟล์ ${writer.name}`} className="h-[40px] w-[40px] shrink-0 rounded-full object-cover" height={40} src={writer.image} width={40} />
            <div className="min-w-0 flex-1">
              <h3 className="sidebar-item-title truncate transition group-hover:text-white">{writer.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CompletedReadingStatsCard() {
  const stats = [
    { label: "จบในเดือนนี้", value: "12", icon: CompletedCalendarIcon },
    { label: "ชั่วโมงที่อ่าน", value: "320", icon: CompletedClockIcon },
    { label: "รีวิวที่เขียน", value: "28", icon: CompletedReviewIcon },
    { label: "คะแนนเฉลี่ย", value: "4.8", icon: CompletedStarIcon },
  ];

  return (
    <section aria-labelledby="completed-reading-stats-title" className="ds-section p-2">
      <div className="flex items-center gap-2 px-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <SimpleTitleIcon className="h-[18px] w-[18px] shrink-0" name="chart" />
          <h2 className="sidebar-title truncate" id="completed-reading-stats-title">สรุปการอ่านของคุณ</h2>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3 rounded-[7px] border border-white/[0.1] bg-[#0a1a14] px-3 py-2.5">
        <span className="text-[#dcebe4]"><CompletedBookIcon /></span>
        <div>
          <p className="sidebar-stat-hero">56</p>
          <p className="sidebar-meta mt-1 text-white/70">เรื่องที่อ่านจบแล้ว</p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {stats.map(({ label, value, icon: Icon }) => (
          <div className="flex min-h-[51px] items-center gap-2 rounded-[7px] border border-white/[0.1] bg-[#0a1a14] px-2 py-1.5" key={label}>
            <span className="text-[#17dc8a]"><Icon /></span>
            <div className="min-w-0">
              <p className="sidebar-stat-value">{value}</p>
              <p className="sidebar-caption mt-1 truncate text-white/60">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LatestCompletedReviewsCard() {
  const completedBooks = completedSections[0].books?.slice(0, 3) ?? [];

  return (
    <section aria-labelledby="latest-completed-reviews-title" className="ds-section p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SimpleTitleIcon className="h-5 w-5 shrink-0" name="star" />
          <h2 className="sidebar-title" id="latest-completed-reviews-title">รอรีวิวจากคุณ</h2>
        </div>
        <Link aria-label="ดูเรื่องที่รอรีวิวจากคุณทั้งหมด" className="sidebar-link inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/read?section=completed-reviews">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {completedBooks.map((book, index) => {
          const displayTitle = getDisplayBookTitle(book);
          const completedAgo = index + 1;

          return (
            <Link aria-label={`เปิดเรื่อง ${displayTitle}`} className="group flex min-w-0 gap-2.5 rounded-[5px] py-2 first:pt-1 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(book.title)}`} key={book.title}>
              <div className="flex min-w-0 gap-2.5">
                <Image alt={`ปกหนังสือ ${displayTitle}`} className="h-[42px] w-[32px] shrink-0 rounded-[4px] object-cover" height={42} src={book.image} width={32} />
                <div className="min-w-0 flex-1">
                  <span className="sidebar-item-title block truncate transition group-hover:text-white" title={displayTitle}>{displayTitle}</span>
                  <p className="sidebar-meta truncate text-white/45">{book.author}</p>
                  <div className="mt-0.5">
                    <p className="sidebar-caption truncate text-white/50">อ่านจบเมื่อ {completedAgo} วันที่แล้ว</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function CompletedSavedCard() {
  const savedBooks = completedSections[0].books?.slice(3, 6) ?? [];

  return (
    <section aria-labelledby="completed-saved-title" className="ds-section p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SimpleTitleIcon className="h-5 w-5 shrink-0" name="bookmark" />
          <h2 className="sidebar-title" id="completed-saved-title">เรื่องจบที่คุณติดตาม</h2>
        </div>
        <Link aria-label="ดูเรื่องจบที่คุณติดตามทั้งหมด" className="sidebar-link inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/read?section=completed-following">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {savedBooks.map((book) => (
          <Link aria-label={`เปิดเรื่อง ${getDisplayBookTitle(book)}`} className="group flex min-w-0 items-center gap-2.5 rounded-[5px] py-2.5 first:pt-2 last:pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(book.title)}`} key={book.title}>
            <Image alt={`ปกหนังสือ ${book.title}`} className="h-[52px] w-[38px] shrink-0 rounded-[4px] object-cover" height={52} src={book.image} width={38} />
            <div className="min-w-0 flex-1">
              <span className="sidebar-item-title block truncate transition group-hover:text-white" title={getDisplayBookTitle(book)}>{getDisplayBookTitle(book)}</span>
              <p className="sidebar-meta mt-1 truncate text-white/45">{book.author}</p>
              <p className="sidebar-caption mt-1 text-white/55">จบแล้ว {book.episodes} ตอน</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BookshelfCard({ useSimpleSidebarIcon = false }: { useSimpleSidebarIcon?: boolean }) {
  return (
    <section aria-labelledby="bookshelf-title" className="ds-section">
      <div className="flex items-center justify-between px-3.5 pb-2.5 pt-3">
        <div className="flex min-w-0 items-center gap-[7px]">
          <SimpleTitleIcon className={useSimpleSidebarIcon ? "h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" : "h-5 w-5 shrink-0 sm:h-[21px] sm:w-[21px]"} name={useSimpleSidebarIcon ? "books" : "library"} />
          <h2 className="sidebar-title truncate" id="bookshelf-title">ชั้นหนังสือของคุณ</h2>
        </div>
        <Link aria-label="ดูชั้นหนังสือทั้งหมด" className="sidebar-link ml-2 inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/read?bookshelf=all">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="grid grid-cols-2 gap-1.5 px-3 pb-3">
        {bookshelfItems.map((book) => (
          <Link className="group flex min-w-0 items-center gap-2 rounded-[6px] border border-[#1b5944] bg-[#0d1b15] p-1.5 transition hover:border-[#2ee27b] hover:bg-[#10251b] hover:shadow-[0_0_12px_rgba(46,231,123,.16)]" href={`/read?title=${encodeURIComponent(book.title)}`} key={book.title}>
            <Image alt={`ปกหนังสือ ${book.title}`} className="h-10 w-8 shrink-0 rounded-[3px] object-cover transition duration-300 group-hover:scale-105" height={40} sizes="32px" src={book.image} width={32} />
            <span className="min-w-0">
              <h3 className="sidebar-item-title truncate group-hover:text-white" title={book.title}>{book.title}</h3>
              <p className="mt-0.5 flex items-baseline gap-1 truncate">
                <span className="sidebar-stat-value">{book.count}</span>
                <span className="sidebar-caption text-white/55">เรื่อง</span>
              </p>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LatestReadingCard() {
  const progress = 60;

  return (
    <section aria-labelledby="latest-reading-title" className="ds-section p-3">
      <div className="flex items-center gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="book" />
          <h2 className="sidebar-title" id="latest-reading-title">อ่านล่าสุด</h2>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[77px_minmax(0,1fr)] gap-2.5 rounded-[8px] bg-[#0d1b15] p-2">
        <Link
          aria-label={`เปิดเรื่อง ${latestReading.title}`}
          className="block self-stretch rounded-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
          href={`/read?title=${encodeURIComponent(latestReading.title)}`}
        >
          <Image alt={`ปกหนังสือ ${latestReading.title}`} className="block h-full w-[77px] rounded-[5px] object-contain" height={90} src={latestReading.image} width={77} />
        </Link>
        <div className="min-w-0">
          <Link className="group block rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(latestReading.title)}`}>
            <h3 className="sidebar-item-title truncate font-semibold text-white transition group-hover:text-[#9bffc0]" title={latestReading.title}>{latestReading.title}</h3>
            <p className="sidebar-meta mt-1 truncate text-white/50">โดย {latestReading.author}</p>
            <p className="sidebar-meta mt-2 font-normal text-white/55">{latestReading.episode}</p>
          </Link>
          <div className="mt-1.5 flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1c4436]"><span className="block h-full rounded-full bg-[#1be27e]" style={{ width: `${progress}%` }} /></span>
          <span className="sidebar-caption text-white/50">{progress}%</span>
          </div>
          <Link className="sidebar-button mt-2 inline-flex w-fit self-start items-center justify-center gap-2 rounded-full bg-[#1be27e] px-3 py-1.5 font-semibold text-[#07100b] transition hover:bg-[#62f5a7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(latestReading.title)}`}>
            อ่านต่อ <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewEpisodesCard() {
  return (
    <section aria-labelledby="new-episodes-title" className="ds-section p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="bell" />
          <h2 className="sidebar-title" id="new-episodes-title">มีตอนใหม่</h2>
        </div>
        <Link aria-label="ดูตอนใหม่ทั้งหมด" className="sidebar-link inline-flex shrink-0 items-center gap-1 text-[#2ee27b] transition hover:text-[#9bffc0]" href="/read?section=new-episodes">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {newEpisodeStories.slice(0, 3).map((story) => (
          <Link className="group flex min-w-0 items-center gap-2.5 py-2.5 first:pt-2 last:pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(story.title)}`} key={story.title}>
            <Image alt={`ปกหนังสือ ${story.title}`} className="h-[58px] w-[43px] shrink-0 rounded-[4px] object-cover" height={58} src={story.image} width={43} />
            <div className="min-w-0 flex-1">
              <h3 className="sidebar-item-title truncate transition group-hover:text-white" title={story.title}>{story.title}</h3>
              <p className="sidebar-meta mt-1 truncate text-white/50">{story.author}</p>
              <p className="sidebar-meta mt-1 truncate text-white/50">{story.episode} · {story.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LatestReadingNotesCard() {
  return (
    <section aria-labelledby="latest-reading-notes-title" className="ds-section p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="note" />
          <h2 className="sidebar-title" id="latest-reading-notes-title">บันทึกล่าสุด</h2>
        </div>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {latestReadingNotes.slice(0, 3).map((note) => (
          <Link className="group flex min-w-0 items-center gap-2.5 py-2.5 first:pt-2 last:pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(note.title)}`} key={note.title}>
            <Image alt={`ปกหนังสือ ${note.title}`} className="h-[52px] w-[38px] shrink-0 rounded-[4px] object-cover" height={52} src={note.image} width={38} />
            <div className="min-w-0 flex-1">
              <h3 className="sidebar-item-title truncate transition group-hover:text-white" title={note.title}>{note.title}</h3>
              <p className="sidebar-meta mt-1 truncate text-white/55">{note.author} · ตอนที่ {note.episode}</p>
              <p className="sidebar-caption mt-1 flex items-center gap-1 truncate text-white/40"><span aria-hidden="true">◷</span>{note.lastRead}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function NewsIcon() {
  return <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24"><path d="M5 5.25h14v13.5H5z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /><path d="M8 8.5h8M8 11.5h8M8 14.5h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>;
}

const arnSpaceNews = [
  { slug: "welcome-new-writers-and-stories", title: "เปิดพื้นที่ต้อนรับนักเขียนและเรื่องราวใหม่บน ARN SPACE", label: "ประกาศจาก ARN SPACE", time: "วันนี้" },
  { slug: "weekly-featured-writers-and-stories", title: "พบกับเรื่องเด่นและนักเขียนแนะนำประจำสัปดาห์", label: "คัดสรรโดย ARN SPACE", time: "เมื่อวาน" },
  { slug: "new-platform-discovery-features", title: "อัปเดตฟีเจอร์ใหม่ ช่วยให้ค้นหาเรื่องที่ชอบได้ง่ายขึ้น", label: "อัปเดตแพลตฟอร์ม", time: "3 วันที่แล้ว" },
];

const latestFollowingUpdates = [
  { writer: "LunarBlack", action: "อัปเดตตอนใหม่", story: "นักล่าจันทรา - ตอนที่ 24", time: "2 ชั่วโมงที่แล้ว", image: "/images/writers/lunarblack.webp", href: "/writers/lunarblack" },
  { writer: "AkiStudio", action: "ออกผลงานใหม่", story: "สายลมคืนที่สาม - ตอนที่ 3", time: "8 ชั่วโมงที่แล้ว", image: "/images/writers/akistudio.webp", href: "/writers/akistudio" },
  { writer: "Kuroi", action: "อัปเดตตอนใหม่", story: "กุหลาบในเงาไฟ - ตอนที่ 17", time: "5 ชั่วโมงที่แล้ว", image: "/images/writers/kuroi.webp", href: "/writers/kuroi" },
  { writer: "Moonlit", action: "เปิดเรื่องใหม่", story: "เขตจันทราของเรา", time: "1 วันที่แล้ว", image: "/images/writers/moonlit.webp", href: "/writers/moonlit" },
  { writer: "purplemoon", action: "อัปเดตตอนใหม่", story: "ร้านกาแฟอิงจันทร์ - บทที่ 8", time: "1 วันที่แล้ว", image: "/images/writers/purplemoon.webp", href: "/writers/purplemoon" },
];

const followedWriterStatuses = [
  { slug: "lunarblack", status: "อัปเดตใหม่", time: "2 ชั่วโมงที่แล้ว" },
  { slug: "kuroi", status: "อัปเดตตอนใหม่", time: "5 ชั่วโมงที่แล้ว" },
  { slug: "akistudio", status: "ลงผลงานใหม่", time: "8 ชั่วโมงที่แล้ว" },
  { slug: "moonlit", status: "เปิดเรื่องใหม่", time: "1 วันที่แล้ว" },
  { slug: "purplemoon", status: "อัปเดตตอนใหม่", time: "1 วันที่แล้ว" },
];

const followedStories = [
  { title: "แสงระหว่างบรรทัด", author: "LunarBlack", episodes: "42 ตอน", image: "/images/book-between-lines.webp" },
  { title: "สอนใจในหน้าร้อน", author: "Moonlit", episodes: "28 ตอน", image: "/images/book-summer-lessons.webp" },
  { title: "The Villain's Side (Harry Potter)", author: "Kuroi", episodes: "39 ตอน", image: "/images/book-villains-side.webp" },
  { title: "ภาพถ่ายในสายฝน", author: "AkiStudio", episodes: "19 ตอน", image: "/images/book-photographs-rain.webp" },
  { title: "Sky of Tomorrow", author: "AkiStudio", episodes: "26 ตอน", image: "/images/book-sky-tomorrow.webp" },
  { title: "City of Echoes", author: "Moonlit", episodes: "29 ตอน", image: "/images/book-city-echoes.webp" },
];

const unreadFollowedStories = [
  { title: "สอนใจในหน้าร้อน", author: "Moonlit", newEpisodes: "+5 ตอนใหม่", image: "/images/book-summer-lessons.webp" },
  { title: "Sky of Tomorrow", author: "AkiStudio", newEpisodes: "+4 ตอนใหม่", image: "/images/book-sky-tomorrow.webp" },
  { title: "The Villain's Side (Harry Potter)", author: "Kuroi", newEpisodes: "+3 ตอนใหม่", image: "/images/book-villains-side.webp" },
  { title: "City of Echoes", author: "Moonlit", newEpisodes: "+2 ตอนใหม่", image: "/images/book-city-echoes.webp" },
  { title: "UnderCity", author: "HannaDawn", newEpisodes: "+1 ตอนใหม่", image: "/images/book-parallel-world.webp" },
];

function FollowedSummaryCard() {
  const stats = [
    { label: "นักเขียน", value: "18", unit: "คน" },
    { label: "เรื่อง", value: "24", unit: "เรื่อง" },
    { label: "ตอนใหม่", value: "7", unit: "ตอน" },
  ];

  return (
    <section aria-labelledby="followed-summary-title" className="ds-section p-2.5">
      <div className="flex items-center gap-[7px]">
        <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="chart" />
        <h2 className="sidebar-title" id="followed-summary-title">สรุปการติดตาม</h2>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {stats.map(({ label, value, unit }) => (
          <div className="rounded-[7px] border border-[#1b5944] bg-[#0d1b15] px-1.5 py-2 text-center" key={label}>
            <p className="sidebar-meta text-white/70">{label}</p>
            <p className="sidebar-stat-value mt-1">{value}</p>
            <p className="sidebar-caption mt-1 text-white/55">{unit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LatestFollowingUpdatesCard() {
  return (
    <section aria-labelledby="latest-following-updates-title" className="ds-section p-2.5">
      <div className="flex items-center gap-[7px]">
        <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="bell" />
        <h2 className="sidebar-title" id="latest-following-updates-title">กิจกรรมล่าสุด</h2>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {latestFollowingUpdates.map((update) => (
          <Link className="group flex min-w-0 items-center gap-2.5 py-2 first:pt-1 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={update.href} key={update.writer}>
            <Image alt={`รูปโปรไฟล์ ${update.writer}`} className="h-9 w-9 shrink-0 rounded-full object-cover" height={36} src={update.image} width={36} />
            <div className="min-w-0 flex-1">
              <p className="sidebar-meta flex min-w-0 items-center gap-1.5 truncate">
                <span className="shrink-0 font-semibold text-white/90 transition group-hover:text-white">{update.writer}</span>
                <span className="truncate text-[#d8fff0]">{update.action}</span>
              </p>
              <p className="sidebar-meta mt-0.5 truncate text-white/60">{update.story}</p>
              <p className="sidebar-caption mt-0.5 truncate text-white/40">{update.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FollowedManagementCard() {
  const actions: Array<{ title: string; icon: "bell" | "writers" | "stories" | "settings"; href: string }> = [
    { title: "การแจ้งเตือน", icon: "bell", href: "/notifications" },
    { title: "จัดการนักเขียนที่ติดตาม", icon: "writers", href: "/writers" },
    { title: "จัดการเรื่องที่ติดตาม", icon: "stories", href: "/read?bookshelf=all" },
    { title: "ตั้งค่าการแนะนำจากที่ติดตาม", icon: "settings", href: "/read?category=จากที่ติดตาม" },
  ];

  return (
    <section aria-labelledby="followed-management-title" className="ds-section p-2.5">
      <div className="flex items-center gap-[7px]">
        <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="gear" />
        <h2 className="sidebar-title" id="followed-management-title">จัดการการติดตาม</h2>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {actions.map((action) => (
          <Link className="group flex min-w-0 items-center gap-2.5 py-2 first:pt-1 last:pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={action.href} key={action.title}>
            <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center text-[#eafff3]"><FollowedActionIcon type={action.icon} /></span>
            <span className="sidebar-item-title block min-w-0 flex-1 truncate transition group-hover:text-white">{action.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FollowedActionIcon({ type }: { type: "bell" | "writers" | "stories" | "settings" }) {
  const common = { "aria-hidden": true, className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24" };

  if (type === "bell") {
    return <svg {...common}><path d="M6 17h12l-1.5-2.5V10a4.5 4.5 0 0 0-9 0v4.5L6 17Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><path d="M10 20h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
  }

  if (type === "writers") {
    return <svg {...common}><circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" /><circle cx="16.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" /><path d="M4.5 18a4.5 4.5 0 0 1 9 0M14 17a3.5 3.5 0 0 1 5.5 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
  }

  if (type === "stories") {
    return <svg {...common}><path d="M6 3.5h9l3 3v14H6z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><path d="M15 3.5v3h3M9 11h6M9 14.5h6M9 18h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
  }

  return <svg {...common}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
}

function FollowingUpdateIcon({ type }: { type: "all" | "novel" | "fanfic" | "cartoon" }) {
  const common = { "aria-hidden": true, className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24" };

  if (type === "all") {
    return <svg {...common}><path d="M6 18V9M12 18V6M18 18V3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
  }

  if (type === "novel") {
    return <svg {...common}><path d="M6 4h9l3 3v13H6z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><path d="M15 4v3h3M9 11h6M9 14h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg>;
  }

  if (type === "fanfic") {
    return <svg {...common}><path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v13l-6.5-3.8-6.5 3.8V6A1.5 1.5 0 0 1 7 4.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
  }

  return <svg {...common}><rect x="5" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="m9 6 1.5 3h3L15 6M8 14h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" /></svg>;
}

function TodayFollowingUpdatesCard() {
  const updateTypes: Array<{ label: string; value: string; icon: "all" | "novel" | "fanfic" | "cartoon"; href: string; highlight?: boolean }> = [
    { label: "ตอนใหม่ทั้งหมด", value: "5", icon: "all", href: "/read?category=จากที่ติดตาม", highlight: true },
    { label: "นิยาย", value: "3", icon: "novel", href: "/read?category=จากที่ติดตาม" },
    { label: "แฟนฟิค", value: "1", icon: "fanfic", href: "/read?category=จากที่ติดตาม" },
    { label: "การ์ตูน", value: "1", icon: "cartoon", href: "/read?category=จากที่ติดตาม" },
  ];

  return (
    <section aria-labelledby="today-following-updates-title" className="ds-section p-2.5">
      <div className="flex items-center gap-[7px]">
        <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="clock" />
        <h2 className="sidebar-title" id="today-following-updates-title">อัปเดตวันนี้</h2>
      </div>

      <div className="mt-2 overflow-hidden rounded-[7px] border border-white/[0.1] bg-[#0d1210]">
          {updateTypes.map((type) => (
            <Link className="flex items-center justify-between gap-2 border-b border-white/[0.08] px-2 py-2 transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#29ef82] last:border-b-0" href={type.href} key={type.label}>
              <span className="sidebar-item-title flex min-w-0 items-center gap-2 text-white/75"><FollowingUpdateIcon type={type.icon} /><span className="truncate">{type.label}</span></span>
              <span className={type.highlight ? "sidebar-item-title shrink-0 font-semibold text-[#1be27e]" : "sidebar-item-title shrink-0 font-normal text-white/75"}>{type.value} ตอน</span>
            </Link>
          ))}
      </div>
    </section>
  );
}

function FollowedWritersCard() {
  return (
    <section aria-labelledby="followed-writers-title" className="ds-section p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="sidebar-title" id="followed-writers-title">นักเขียนที่คุณติดตาม</h2>
        <Link aria-label="ดูนักเขียนที่ติดตามทั้งหมด" className="sidebar-link inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/writers">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 overflow-hidden rounded-[7px] border border-[#1b5944] bg-[#0d1b15]">
        {followedWriterStatuses.map((entry) => {
          const writer = recommendedWriters.find((item) => item.slug === entry.slug);

          if (!writer) return null;

          return (
            <Link className="group flex min-w-0 items-center gap-2.5 border-b border-white/[0.08] px-2.5 py-2 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#29ef82]" href={`/writers/${writer.slug}`} key={writer.slug}>
              <Image alt={`รูปโปรไฟล์ ${writer.name}`} className="h-9 w-9 shrink-0 rounded-full object-cover" height={36} src={writer.image} width={36} />
              <div className="min-w-0 flex-1">
                <p className="sidebar-item-title truncate font-semibold transition group-hover:text-white">{writer.name}</p>
                <p className="sidebar-caption mt-0.5 flex min-w-0 items-center gap-1.5">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1be27e] shadow-[0_0_7px_rgba(27,226,126,.7)]" />
                  <span className="truncate text-[#58eaa9]">{entry.status}</span>
                  <span className="shrink-0 text-white/40">{entry.time}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function FollowedStoriesCard() {
  return (
    <section aria-labelledby="followed-stories-title" className="ds-section p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="sidebar-title" id="followed-stories-title">เรื่องที่คุณติดตาม</h2>
        <Link aria-label="ดูเรื่องที่ติดตามทั้งหมด" className="sidebar-link inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/read">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {followedStories.map((story) => (
          <Link className="group min-w-0 rounded-[6px] p-1 transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(story.title)}`} key={story.title}>
            <div className="relative aspect-[2/3] overflow-hidden rounded-[4px] bg-[#18211d]">
              <Image alt={`ปกหนังสือ ${story.title}`} className="object-contain transition duration-300 group-hover:scale-105" fill sizes="78px" src={story.image} />
            </div>
            <h3 className="sidebar-item-title mt-1 truncate group-hover:text-white" title={story.title}>{story.title}</h3>
            <p className="sidebar-caption mt-0.5 truncate text-white/45">{story.episodes}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function UnreadFollowedStoriesCard() {
  return (
    <section aria-labelledby="unread-followed-stories-title" className="ds-section p-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="sidebar-title" id="unread-followed-stories-title">ยังไม่ได้อ่านจากที่ติดตาม</h2>
        <Link aria-label="ดูเรื่องที่ยังไม่ได้อ่านทั้งหมด" className="sidebar-link inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/read">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08] overflow-hidden rounded-[7px] border border-[#1b5944] bg-[#0d1b15] px-2">
        {unreadFollowedStories.map((story) => (
          <Link className="group flex min-w-0 items-center gap-2 py-2 first:pt-2 last:pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(story.title)}`} key={story.title}>
            <Image alt={`ปกหนังสือ ${story.title}`} className="h-10 w-8 shrink-0 rounded-[3px] object-cover" height={40} src={story.image} width={32} />
            <div className="min-w-0 flex-1">
              <h3 className="sidebar-item-title truncate transition group-hover:text-white" title={story.title}>{story.title}</h3>
              <p className="sidebar-meta mt-0.5 truncate text-white/45">{story.author}</p>
            </div>
            <span className="sidebar-button shrink-0 rounded-full border border-[#1cae68] px-1.5 py-1 text-[#7ef7b5]">{story.newEpisodes}</span>
            <span aria-hidden="true" className="shrink-0 text-[16px] leading-none text-white/45 transition group-hover:translate-x-0.5 group-hover:text-[#2ee77b]">›</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ReaderReviewsCard() {
  return (
    <section aria-labelledby="homepage-reader-reviews-title" className="ds-section p-3" id="homepage-reader-reviews">
      <div className="flex items-center gap-2">
        <span className="text-[#eafff3]"><MessageBubbleIcon /></span>
        <h2 className="sidebar-title" id="homepage-reader-reviews-title">รีวิวจากผู้อ่าน</h2>
        <Link aria-label="ดูรีวิวจากผู้อ่านทั้งหมด" className="sidebar-link ml-auto inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/read#reader-reviews">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-3 space-y-2.5">
        {featuredReaderReviews.map((review) => (
          <Link
            aria-label={`เปิดรีวิวเรื่อง ${review.book} โดย ${review.name}`}
            className="group relative block overflow-hidden rounded-[8px] border border-white/[0.1] bg-[#101714] p-2.5 transition hover:border-[#2ee77b]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
            href={`/read?title=${encodeURIComponent(review.book)}#reader-reviews`}
            key={review.name}
          >
            <Image alt="" className="object-cover opacity-80 transition duration-500 group-hover:scale-105" fill sizes="260px" src="/images/reader-welcome-bg.webp" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,13,.78),rgba(3,20,13,.36),rgba(3,20,13,.72))]" />
            <div className="relative flex items-center gap-2.5">
              <Image alt={`รูปโปรไฟล์ ${review.name}`} className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[#22df91] ring-offset-1 ring-offset-[#0d1915]" height={40} src={review.avatar} width={40} />
              <div className="min-w-0">
                <p className="sidebar-item-title truncate text-white/85">{review.name}</p>
                <div aria-label="ให้คะแนน 5 ดาว" className="mt-0.5 text-[12px] leading-none tracking-[0.1em] text-[#ffd75a]">★★★★★</div>
              </div>
              <span aria-hidden="true" className="ml-auto self-start pt-0.5 text-[30px] font-semibold leading-none text-white/75">“</span>
            </div>

            <p className="sidebar-body relative mt-2.5 line-clamp-3 text-white/80">{review.quote}</p>

            <div className="relative mt-2.5 grid grid-cols-[58px_minmax(0,1fr)_52px] items-center gap-2 rounded-[6px] border border-[#174035] bg-[#0b1512]/85 p-1.5 transition group-hover:border-[#23775b]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-[#18211d]">
                <Image alt={`ปกหนังสือ ${review.book}`} className="object-cover" fill sizes="58px" src={review.cover} />
              </div>
              <div className="min-w-0">
                <p className="sidebar-item-title truncate text-white/90" title={review.book}>{review.book}</p>
                <p className="sidebar-meta mt-0.5 truncate text-white/45">โดย {review.author}</p>
              </div>
              <div className="sidebar-meta flex items-center justify-end gap-1 border-l border-white/[0.08] pl-2 text-white/75">
                <span aria-hidden="true" className="text-[19px] leading-none text-[#ff5276]">♥</span>
                <span>{review.likes}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArnSpaceNewsCard() {
  return (
    <section aria-labelledby="homepage-arn-space-news-title" className="ds-section p-3" id="homepage-arn-space-news">
      <div className="flex items-center gap-[7px]">
        <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="news" />
        <h2 className="sidebar-title" id="homepage-arn-space-news-title">ข่าวจาก ARN SPACE</h2>
        <Link aria-label="ดูข่าวจาก ARN SPACE ทั้งหมด" className="sidebar-link ml-auto inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/community?section=events">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {arnSpaceNews.map((news) => (
          <Link className="group flex min-w-0 items-start gap-2.5 py-3 first:pt-2 last:pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/community/news/${news.slug}`} key={news.title}>
            <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#20e987] shadow-[0_0_10px_rgba(32,233,135,.55)]" />
            <div className="min-w-0 flex-1">
              <h3 className="sidebar-item-title line-clamp-2 transition group-hover:text-white">{news.title}</h3>
              <p className="sidebar-meta mt-1 flex items-center justify-between gap-2 text-white/45">
                <span className="truncate">{news.label}</span>
                <span className="shrink-0">{news.time}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CommunityTopicsCard({ title = "ชุมชนกำลังพูดถึง", limit = 5, compact = false, useSimpleSidebarIcon = false }: { title?: string; limit?: number; compact?: boolean; useSimpleSidebarIcon?: boolean }) {
  return (
    <section aria-labelledby="homepage-community-topics-title" className="ds-section p-3" id="homepage-community-topics">
      <div className="flex items-center gap-[7px]">
        <SimpleTitleIcon className="h-[19px] w-[19px] shrink-0 sm:h-5 sm:w-5" name="community" />
        <h2 className="sidebar-title" id="homepage-community-topics-title">{title}</h2>
        <Link aria-label="ดูหัวข้อชุมชนทั้งหมด" className="sidebar-link ml-auto inline-flex shrink-0 items-center gap-1 transition hover:text-[#9bffc0]" href="/community">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
      </div>

      <div className="mt-2 divide-y divide-white/[0.08]">
        {communityTopics.slice(0, limit).map((topic) => (
          <Link className="group flex min-w-0 items-center gap-2.5 py-2 first:pt-1 last:pb-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/community/topics/${topic.slug}`} key={topic.title}>
            <div className={`relative shrink-0 overflow-hidden rounded-[6px] border border-white/[0.1] bg-[#18211d] ${compact ? "h-[48px] w-[58px]" : "h-[54px] w-[70px]"}`}>
              <Image alt="" className="object-cover transition duration-300 group-hover:scale-105" fill sizes="70px" src={topic.image} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="sidebar-item-title truncate transition group-hover:text-white" title={topic.title}>{topic.title}</h3>
              <div className="sidebar-caption mt-1 flex min-w-0 items-center justify-between gap-2 text-white/45">
                <span className="inline-flex min-w-0 items-center gap-1 truncate"><CommentIcon />{topic.comments}</span>
                <span className="shrink-0">{topic.time}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const initiallyFollowedWriterSlugs = new Set(["purplemoon", "moonlit"]);

function WriterCard({ writer, showFollowButton = false, compact = false }: { writer: RecommendedWriter; showFollowButton?: boolean; compact?: boolean }) {
  const [isFollowing, setIsFollowing] = useState(initiallyFollowedWriterSlugs.has(writer.slug));

  return (
    <div className={`group relative min-w-0 text-center transition duration-300 hover:-translate-y-1 hover:border-[#1ec765]/60 hover:bg-[#12231a] hover:shadow-[0_12px_30px_rgba(0,0,0,.2)] ${compact ? "rounded-[9px] border border-transparent p-1 hover:border-white/[0.12]" : "rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3"}`}>
      <Link
        aria-label={`เปิดโปรไฟล์นักเขียน ${writer.name}`}
        className="block rounded-[7px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
        href={`/writers/${writer.slug}`}
      >
        <div className={`relative mx-auto overflow-hidden rounded-full border-0 bg-[#18211d] shadow-none ring-0 transition ${compact ? "h-[76px] w-[76px]" : "h-[72px] w-[72px]"}`}>
          <Image alt={`รูปโปรไฟล์ ${writer.name}`} className="border-0 object-cover ring-0 transition duration-500 group-hover:scale-105" fill sizes={compact ? "76px" : "(max-width: 640px) 28vw, 150px"} src={writer.image} />
        </div>
        <h3 className={`mt-2 truncate font-medium text-white transition group-hover:text-[#9bffc0] ${compact ? "text-[11px]" : "text-[12px]"}`} title={writer.name}>{writer.name}</h3>
        {compact ? (
          <p className="mt-1 truncate text-[10px] text-white/50">{writer.works} เรื่อง</p>
        ) : (
          <p className="truncate text-[11px] text-white/50">{writer.type}</p>
        )}
      </Link>
      {showFollowButton && (
        <button
          aria-pressed={isFollowing}
          className={`inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82] ${compact ? "mt-3 h-7 px-3 text-[10px]" : "mx-auto mt-3 h-7 w-[82%] pt-1.5 text-[11px]"} ${isFollowing ? "border border-[#2ee77b]/60 bg-transparent text-[#7ef7b5] hover:bg-[#1be27e]/10" : "border border-[#18bd55] text-[#26df70] hover:bg-[#18bd55] hover:text-[#07100b]"}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsFollowing((current) => !current);
          }}
          type="button"
        >
          {isFollowing ? "ติดตามแล้ว" : "ติดตาม"}
        </button>
      )}
    </div>
  );
}

function BookCard({ book, showReadingProgress = false, progressIndex = 0 }: { book: Book; showReadingProgress?: boolean; progressIndex?: number }) {
  const displayTitle = getDisplayBookTitle(book);
  const progressValues = [60, 42, 74, 55, 88, 35];
  const progress = progressValues[progressIndex % progressValues.length];
  const totalEpisodes = Number.parseInt(book.episodes, 10) || 1;
  const currentEpisode = Math.max(1, Math.round(totalEpisodes * (progress / 100)));

  return (
    <Link
      aria-label={`เปิดเรื่อง ${book.title}`}
      className="group relative block min-w-0 cursor-pointer rounded-[9px] border border-transparent p-1 transition duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.025] hover:shadow-[0_12px_26px_rgba(19,230,104,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
      href={`/read?title=${encodeURIComponent(book.title)}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-[7px] bg-[#18201c]">
        <Image src={book.image} alt={`ปกหนังสือ ${book.title}`} fill sizes="(max-width: 1400px) 14vw, 190px" className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07100c]/90 to-transparent" />
        <span className={`absolute right-1.5 top-1.5 z-30 rounded-md px-2 py-1 text-[10px] font-medium leading-none text-white shadow-lg ${badgeColors[book.category] ?? "bg-[#1cae68]"}`}>
          {book.category}
        </span>
      </div>
      <h3 className="mt-2 truncate text-[13px] font-medium leading-5 text-white" title={displayTitle}>{displayTitle}</h3>
      <p className="truncate text-[11px] text-white/45">{book.author}</p>
      {showReadingProgress ? (
        <div className="mt-2.5 space-y-1.5">
          <p className="text-[12px] font-medium text-white/80">ตอนที่ {currentEpisode} / {totalEpisodes}</p>
          <div className="flex items-center gap-2">
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-[#263a35]">
              <div className="h-full rounded-full bg-[#18e89a] shadow-[0_0_10px_rgba(24,232,154,.35)]" style={{ width: `${progress}%` }} />
            </div>
            <span className="shrink-0 text-[12px] font-medium text-white/75">{progress}%</span>
          </div>
        </div>
      ) : (
        <StoryMetadata title={displayTitle} episodes={book.episodes} views={book.views} likes={book.likes} status={book.status} />
      )}
      <div className="pointer-events-none absolute inset-1 z-20 flex flex-col justify-end rounded-[7px] bg-gradient-to-t from-[#07100c] via-[#07100c]/90 to-transparent p-3 opacity-0 transition duration-300 group-hover:opacity-100">
        <h3 className="break-words text-[14px] font-semibold leading-5 text-white">{displayTitle}</h3>
        <p className="mt-0.5 line-clamp-6 text-[11px] leading-[1.45] text-white/70">{hoverDescriptions[book.category] ?? "เรื่องราวที่คัดสรรมาให้คุณได้ออกเดินทาง พร้อมความลับและตัวละครมากมายที่รอให้คุณทำความรู้จัก"}</p>
        <span className="mt-2 inline-flex h-8 items-center justify-center rounded-[7px] bg-[#1be27e] text-[11px] font-semibold text-[#07100b] shadow-[0_5px_16px_rgba(0,0,0,.25)]">อ่านเลย <span aria-hidden="true" className="ml-2 text-sm">→</span></span>
      </div>
    </Link>
  );
}

export default function BookDiscovery({ selectedCategory }: { selectedCategory: string }) {
  const homeFilterLabels = ["สำหรับคุณ", "อ่านต่อ", "กำลังมาแรง", "จากที่ติดตาม", "เรื่องจบแล้ว"];
  const homeSections: Record<string, DiscoverySection[]> = {
    "สำหรับคุณ": forYouSections,
    "อ่านต่อ": continueSections,
    "กำลังมาแรง": trendingSections,
    "จากที่ติดตาม": followingSections,
    "เรื่องจบแล้ว": completedSections,
  };
  const visibleSections: DiscoverySection[] = selectedCategory === "ทั้งหมด"
    ? sections
    : homeFilterLabels.includes(selectedCategory)
      ? homeSections[selectedCategory]
      : getCategorySections(selectedCategory);

  return (
    <section className="mx-auto max-w-[1400px] bg-arn-canvas px-2 pb-12 pt-7 text-arn-text" id="discover">
      <div className="grid grid-cols-[minmax(0,1fr)_290px] gap-6">
        <div className="space-y-8">
          {visibleSections.map((section, sectionIndex) => {
            const sectionIcon = selectedCategory === "สำหรับคุณ"
              ? forYouSectionIcons[section.title]
              : selectedCategory === "อ่านต่อ"
                ? continueSectionIcons[section.title]
                : selectedCategory === "กำลังมาแรง"
                  ? trendingSectionIcons[section.title]
                  : selectedCategory === "จากที่ติดตาม"
                    ? followingSectionIcons[section.title]
                    : selectedCategory === "เรื่องจบแล้ว"
                      ? completedSectionIcons[section.title]
                    : undefined;

            const hideViewAll = selectedCategory === "กำลังมาแรง"
              || (selectedCategory === "สำหรับคุณ" && ["คัดมาให้คุณ", 'เพราะคุณอ่าน "Sky of Tomorrow"', "เรื่องที่น่าจะชอบ"].includes(section.title))
              || (selectedCategory === "อ่านต่อ" && ["ใกล้อ่านจบ", "กลับไปเรื่องโปรด", "อัปเดตจากเรื่องที่กำลังอ่าน"].includes(section.title));

            return (
            <div key={section.title}>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {sectionIcon ? <SimpleTitleIcon className="h-[23px] w-[23px] shrink-0 sm:h-[25px] sm:w-[25px]" name={sectionIcon} /> : null}
                    <h2 className="text-[21px] font-medium leading-tight text-white">{section.title}</h2>
                  </div>
                  <p className="mt-1 text-[12px] text-white/50">{section.subtitle}</p>
                </div>
                {!hideViewAll && <Link href={section.writers ? "/writers" : getSectionHref(section.title, selectedCategory)} className="mb-1 inline-flex items-center gap-2 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]">ดูทั้งหมด <span aria-hidden="true">→</span></Link>}
              </div>
              <div className={section.writers ? "grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8" : "grid grid-cols-6 gap-3"}>
                {section.writers ? (
                  section.writers.map((writer) => <WriterCard compact={section.title === "นักเขียนที่ติดตาม"} key={writer.slug} writer={writer} showFollowButton={selectedCategory !== "กำลังมาแรง" && section.title === "นักเขียนมาแรง"} />)
                ) : (
                  section.books?.map((book, bookIndex) => (
                    <BookCard
                      key={book.title}
                      book={book}
                      progressIndex={bookIndex}
                      showReadingProgress={selectedCategory === "อ่านต่อ" ? sectionIndex === 0 : selectedCategory === "สำหรับคุณ" && section.title === "อ่านต่อ"}
                    />
                  ))
                )}
              </div>
            </div>
            );
          })}
        </div>
        <aside className="flex h-full flex-col gap-3 pt-1">
          {selectedCategory === "อ่านต่อ" ? (
            <>
              <ReadingStatusCard />
              <LatestReadingCard />
              <NewEpisodesCard />
              <LatestReadingNotesCard />
            </>
          ) : (
            <>
              {selectedCategory === "สำหรับคุณ" ? <ReaderStatsCard /> : selectedCategory === "กำลังมาแรง" ? <PopularRankingCard /> : selectedCategory === "เรื่องจบแล้ว" ? <CompletedReadingStatsCard /> : selectedCategory === "จากที่ติดตาม" ? <FollowedSummaryCard /> : <ReaderWelcomeCard />}
              {selectedCategory !== "จากที่ติดตาม" && selectedCategory !== "กำลังมาแรง" && selectedCategory !== "เรื่องจบแล้ว" && <BookshelfCard useSimpleSidebarIcon={selectedCategory === "สำหรับคุณ"} />}
              {selectedCategory === "สำหรับคุณ" ? (
                <>
                  <CommunityTopicsCard limit={4} title="ชุมชนที่คุณสนใจ" />
                  <ArnSpaceNewsCard />
                </>
              ) : selectedCategory === "กำลังมาแรง" ? (
                <>
                  <TrendingWritersCard />
                  <CommunityTopicsCard compact useSimpleSidebarIcon />
                </>
              ) : selectedCategory === "เรื่องจบแล้ว" ? (
                <>
                  <LatestCompletedReviewsCard />
                  <CompletedSavedCard />
                </>
              ) : selectedCategory === "จากที่ติดตาม" ? (
                <>
                  <LatestFollowingUpdatesCard />
                  <FollowedManagementCard />
                  <TodayFollowingUpdatesCard />
                </>
              ) : (
                <>
                  <ReaderReviewsCard />
                  <CommunityTopicsCard />
                </>
              )}
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
