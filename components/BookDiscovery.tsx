"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategorySections } from "@/data/categoryBooks";
import StoryMetadata from "@/components/StoryMetadata";
import type { StoryStatus } from "@/data/storyStatus";
import { authStateChangedEvent } from "@/components/TopMenu";

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

const sections: { title: string; subtitle: string; books: Book[] }[] = [
  {
    title: "นิยายแนะนำ",
    subtitle: "เรื่องราวน่าอ่านที่คัดมาให้ในตอนนี้",
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
    title: "แฟนฟิคน่าอ่าน",
    subtitle: "ต่อยอดเรื่องราวที่คุณรัก จากมุมมองของนักเขียนทั่วโลก",
    books: [
      { title: "Not Just Friends (BTS)", author: "purplemoon", category: "วาย", episodes: "58", views: "1.8M", likes: "32.1K", image: "/images/book-not-just-friends.webp" },
      { title: "Love in Parallel (Harry Potter)", author: "felixs", category: "แฟนตาซี", episodes: "44", views: "1.1M", likes: "24.3K", image: "/images/book-love-parallel.webp" },
      { title: "Our Classroom", author: "rainymew", category: "วาย", episodes: "33", views: "920K", likes: "20.5K", image: "/images/book-our-classroom.webp" },
      { title: "Kissed by the Stars", author: "seriian", category: "แฟนตาซี", episodes: "27", views: "660K", likes: "15.2K", image: "/images/book-kissed-stars.webp" },
      { title: "Rewrite the End", author: "felixs", category: "แอ๊กชั่น", episodes: "21", views: "410K", likes: "11.4K", image: "/images/book-rewrite-end.webp" },
      { title: "The Villain's Side", author: "sorayoru", category: "ลึกลับ", episodes: "39", views: "780K", likes: "18.7K", image: "/images/book-villains-side.webp" },
    ],
  },
  {
    title: "การ์ตูนมาแรง",
    subtitle: "เรื่องราวที่ได้ใจ…และกำลังถูกพูดถึงในวงกว้าง",
    books: [
      { title: "Sky of Tomorrow", author: "AkiStudio", category: "แฟนตาซี", episodes: "26", views: "620K", likes: "14.1K", image: "/images/book-sky-tomorrow.webp" },
      { title: "Lemon Days", author: "sorani", category: "โรแมนติก", episodes: "32", views: "950K", likes: "18.9K", image: "/images/book-lemon-days.webp" },
      { title: "Blood Moon", author: "Kuroi", category: "สยองขวัญ", episodes: "18", views: "520K", likes: "22.7K", image: "/images/book-blood-moon.webp" },
      { title: "City of Echoes", author: "Panthera", category: "ลึกลับ", episodes: "29", views: "480K", likes: "11.9K", image: "/images/book-city-echoes.webp" },
      { title: "Pixel Heart", author: "Mochi", category: "คอมเมดี้", episodes: "22", views: "430K", likes: "10.4K", image: "/images/book-pixel-heart.webp" },
      { title: "Parallel World", author: "Nagi", category: "แฟนตาซี", episodes: "25", views: "390K", likes: "9.8K", image: "/images/book-parallel-world.webp" },
    ],
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

const continueReading = [
  { title: "Not Just Friends (BTS)", author: "purplemoon", episode: "ตอนที่ 12", progress: 65, image: "/images/book-not-just-friends.webp" },
  { title: "Sky of Tomorrow", author: "AkiStudio", episode: "ตอนที่ 5", progress: 30, image: "/images/book-sky-tomorrow.webp" },
  { title: "Pixel Heart", author: "Mochi", episode: "ตอนที่ 1", progress: 12, image: "/images/book-pixel-heart.webp" },
  { title: "Love in Parallel (Harry Potter)", author: "felixs", episode: "ตอนที่ 18", progress: 47, image: "/images/book-love-parallel.webp" },
  { title: "The Villain's Side", author: "sorayoru", episode: "ตอนที่ 9", progress: 22, image: "/images/book-villains-side.webp" },
];

const readerReviews = [
  { quote: "อ่านเพลินมาก ภาษาสวยจนวางไม่ลงเลย", name: "MildlyMoon", book: "จดหมายใต้แสงดาว" },
  { quote: "ชอบที่มีเรื่องใหม่ให้ค้นพบทุกวัน เหมือนได้เปิดประตูไปโลกใหม่", name: "paperplane", book: "ผู้พิทักษ์ประตูหมอก" },
  { quote: "รวมเรื่องได้ตรงใจมาก โดยเฉพาะหมวดลึกลับกับสยองขวัญ", name: "NightReader", book: "บ้านเงียบหลังเที่ยงคืน" },
  { quote: "พล็อตสนุกและจังหวะเล่าเรื่องดีมาก อ่านต่อเนื่องจนลืมเวลา", name: "BookWorm", book: "มังกรแห่งเกาะลอยฟ้า" },
  { quote: "บรรยากาศชวนติดตามทุกตอน เดาทางไม่ได้เลยจนถึงบทสุดท้าย", name: "MidnightInk", book: "จดหมายจากห้องปิดตาย" },
  { quote: "ตัวละครมีมิติและความสัมพันธ์ค่อย ๆ เดินเรื่องได้ดีมาก", name: "PeachPages", book: "สวนดอกไม้ของเรา" },
  { quote: "ปริศนาวางไว้ละเอียดมาก ทุกเบาะแสมีความหมายและชวนให้คิดตาม", name: "ClueHunter", book: "คดีเงาในคฤหาสน์หมอก" },
  { quote: "บรรยากาศหลอนกำลังดี มีหลายฉากที่ยังติดอยู่ในหัวหลังอ่านจบ", name: "Moonless", book: "เสียงเรียกจากป่าจันทร์" },
  { quote: "ชอบจังหวะบทสนทนาและการเติบโตของตัวละครมาก อ่านแล้วอินสุด ๆ", name: "LunaReads", book: "หน้าต่างของความทรงจำ" },
  { quote: "อ่านแล้วอบอุ่นใจ เหมือนได้กลับไปเจอคนสำคัญในวันฝนตก", name: "RainyNote", book: "บทสนทนาใต้ฝน" },
];

function getSectionHref(title: string, selectedCategory: string) {
  const categoryQuery = `?category=${encodeURIComponent(selectedCategory)}`;

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

  return title.replace(/\s[·—]\s.*$/, "");
}

function EpisodeIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M6.5 4.5h8.8a2.2 2.2 0 0 1 2.2 2.2v12.8H8.7a2.2 2.2 0 0 1-2.2-2.2V4.5Z" stroke="currentColor" strokeWidth="1.7" /><path d="M9.5 8h5M9.5 11.3h5M9.5 14.6h3.2M17.5 19.5h2V6.7a2.2 2.2 0 0 0-2.2-2.2h-.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>;
}

function FlameIcon() {
  return <svg aria-hidden="true" className="h-6 w-6 text-[#25e77b]" fill="currentColor" viewBox="0 0 24 24"><path d="M13.7 2.4c.3 3.4-1.1 4.8-2.6 6.2-1.2 1.1-2.3 2.2-2.3 4.3 0 1.6 1.2 2.9 2.8 3.2-1.2-1.7-.4-3.7.8-4.8.2 1.9 1.9 2.6 2.7 3.8.4.6.6 1.3.6 2.1 0 1-.4 1.9-1 2.6 2.8-.6 4.9-3.1 4.9-6.1 0-4.4-3.2-7.8-5.9-11.3Z" /><path d="M9.6 20.2a5.2 5.2 0 0 1-2.5-4.5c0-1.7.7-2.9 1.7-4.1-.1 2.8 1.2 4.2 2.5 5.3.3.3.6.7.8 1.1.3-1.2.2-2.3-.5-3.5 2.1 1 3.2 2.8 3.2 4.7 0 .4 0 .7-.1 1H9.6Z" fill="#083116" /></svg>;
}

function ContinueReadingCard() {
  return (
    <section aria-labelledby="continue-reading-title" className="overflow-hidden rounded-[9px] border border-white/[0.1] bg-[#101714] shadow-[0_0_0_1px_rgba(33,194,98,.04),0_10px_24px_rgba(0,0,0,.2)]">
      <div className="flex items-center justify-between px-3.5 pb-2.5 pt-3">
        <div className="flex items-center gap-2">
          <FlameIcon />
          <h2 className="text-[18px] font-medium text-white" id="continue-reading-title">อ่านต่อของคุณ</h2>
        </div>
        <Link aria-label="ดูรายการอ่านต่อทั้งหมด" className="text-[25px] leading-none text-white/60 transition hover:text-white" href="/read">›</Link>
      </div>
      <div className="border-t border-white/[0.08]">
        {continueReading.map((book, index) => (
          <div className={`grid grid-cols-[50px_minmax(0,1fr)_74px] items-center gap-2.5 px-3 py-2.5 ${index > 0 ? "border-t border-white/[0.07]" : ""}`} key={book.title}>
            <Link aria-label={`เปิดเรื่อง ${book.title}`} className="relative aspect-[3/4] overflow-hidden rounded-[6px] border border-white/15 bg-[#18211d]" href={`/read?title=${encodeURIComponent(book.title)}`}>
              <Image alt={`ปกหนังสือ ${book.title}`} className="object-cover" fill sizes="50px" src={book.image} />
            </Link>
            <div className="min-w-0 self-stretch py-0.5">
              <Link className="block truncate text-[13px] font-medium leading-relaxed text-white" href={`/read?title=${encodeURIComponent(book.title)}`} title={book.title}>{book.title}</Link>
              <p className="truncate text-[10px] text-white/50">{book.author}</p>
              <div className="mt-0.5 flex items-center gap-1 text-[10px] text-white/55"><EpisodeIcon />{book.episode}</div>
              <div className="mt-1 flex items-center gap-1.5">
                <div aria-label={`อ่านไปแล้ว ${book.progress}%`} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-[#20df79]" style={{ width: `${book.progress}%` }} />
                </div>
                <span className="text-[10px] text-white/50">{book.progress}%</span>
              </div>
            </div>
            <Link className="inline-flex h-8 items-center justify-center rounded-full border border-[#18c968] px-2 text-[11px] font-medium text-[#35e887] transition hover:bg-[#18c968] hover:text-[#07100b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href={`/read?title=${encodeURIComponent(book.title)}`}>อ่านต่อ</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReaderReviewsCard({ isLoggedIn }: { isLoggedIn: boolean }) {
  const visibleReviews = isLoggedIn ? readerReviews.slice(0, 7) : readerReviews;

  return (
    <section aria-labelledby="homepage-reader-reviews-title" className="rounded-[9px] border border-white/[0.08] bg-[#121715] p-4" id="homepage-reader-reviews">
      <div className="mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[18px] font-medium text-white" id="homepage-reader-reviews-title">รีวิวจากผู้อ่าน</h2>
          <Link className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]" href="/read#reader-reviews">ดูทั้งหมด →</Link>
        </div>
        <p className="mt-1 text-[11px] text-white/45">เสียงจากคนที่ชอบนิยาย</p>
      </div>
      <div className="space-y-3">
        {visibleReviews.map((review) => (
          <Link
            aria-label={`เปิดรีวิวเรื่อง ${review.book} โดย ${review.name}`}
            className="group block rounded-[7px] border-b border-white/[0.07] px-2 pb-3 pt-1 transition hover:border-[#1ccf70]/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82] last:border-0 last:pb-1"
            href={`/read?title=${encodeURIComponent(review.book)}#reader-reviews`}
            key={review.name}
          >
            <p className="text-[13px] leading-relaxed text-white/80">“{review.quote}”</p>
            <div className="mt-2 flex items-center justify-between gap-2 text-[10px]">
              <span className="text-[#36e77e]">{review.name}</span>
              <span className="min-w-0 truncate text-right text-white/45 transition group-hover:text-white/65" title={review.book}>เรื่อง: {review.book}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BookCard({ book }: { book: Book }) {
  const displayTitle = getDisplayBookTitle(book);

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
      <StoryMetadata title={displayTitle} episodes={book.episodes} views={book.views} likes={book.likes} status={book.status} />
      <div className="pointer-events-none absolute inset-1 z-20 flex flex-col justify-end rounded-[7px] bg-gradient-to-t from-[#07100c] via-[#07100c]/90 to-transparent p-3 opacity-0 transition duration-300 group-hover:opacity-100">
        <h3 className="break-words text-[14px] font-semibold leading-5 text-white">{displayTitle}</h3>
        <p className="mt-0.5 line-clamp-6 text-[10px] leading-4 text-white/70">{hoverDescriptions[book.category] ?? "เรื่องราวที่คัดสรรมาให้คุณได้ออกเดินทาง พร้อมความลับและตัวละครมากมายที่รอให้คุณทำความรู้จัก"}</p>
        <span className="mt-2 inline-flex h-8 items-center justify-center rounded-[7px] bg-[#1be27e] text-[11px] font-semibold text-[#07100b] shadow-[0_5px_16px_rgba(0,0,0,.25)]">อ่านเลย <span aria-hidden="true" className="ml-2 text-sm">→</span></span>
      </div>
    </Link>
  );
}

export default function BookDiscovery({ selectedCategory }: { selectedCategory: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const visibleSections = selectedCategory === "ทั้งหมด" ? sections : getCategorySections(selectedCategory);

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(window.localStorage.getItem("arnspace-authenticated") !== "false");
    };

    syncAuthState();
    window.addEventListener(authStateChangedEvent, syncAuthState);
    return () => window.removeEventListener(authStateChangedEvent, syncAuthState);
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] bg-[#0D0F0E] px-2 pb-12 pt-7 text-white" id="discover">
      <div className="grid grid-cols-[minmax(0,1fr)_290px] gap-6">
        <div className="space-y-8">
          {visibleSections.map((section) => (
            <div key={section.title}>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <h2 className="text-[21px] font-medium leading-tight text-white">{section.title}</h2>
                  <p className="mt-1 text-[12px] text-white/50">{section.subtitle}</p>
                </div>
                <Link href={getSectionHref(section.title, selectedCategory)} className="mb-1 inline-flex items-center gap-2 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]">ดูทั้งหมด <span aria-hidden="true">→</span></Link>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {section.books.map((book) => <BookCard key={book.title} book={book} />)}
              </div>
            </div>
          ))}
        </div>
        <aside className="flex h-full flex-col gap-3 pt-1">
          {isLoggedIn === true && <ContinueReadingCard />}
          <ReaderReviewsCard isLoggedIn={isLoggedIn === true} />
        </aside>
      </div>
    </section>
  );
}
