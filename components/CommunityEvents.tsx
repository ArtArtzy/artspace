"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type EventItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  participants: string;
  image: string;
  status: "กำลังเปิดรับ" | "เร็ว ๆ นี้";
  mode: "ออนไลน์" | "ออฟไลน์";
  statusClass: string;
  action: "เข้าร่วม" | "ดูรายละเอียด";
};

const eventFilters = ["ทั้งหมด", "กำลังเปิดรับ", "เร็ว ๆ นี้", "กิจกรรมออนไลน์", "กิจกรรมออฟไลน์"] as const;

const eventItems: EventItem[] = [
  {
    slug: "september-writing-challenge",
    title: "September Writing Challenge",
    description: "มาเริ่มต้นเขียนเรื่องราวของเราไปด้วยกันทุกวัน",
    date: "1 - 30 กันยายน 2568",
    participants: "1.2K คนเข้าร่วม",
    image: "/images/community/community-writing-challenge.webp",
    status: "กำลังเปิดรับ",
    mode: "ออนไลน์",
    statusClass: "bg-[#087e59] text-[#83f6bd]",
    action: "เข้าร่วม",
  },
  {
    slug: "readathon-september",
    title: "Readathon เดือนกันยายน",
    description: "อ่านด้วยกัน... ไปไกลกว่าที่คิด",
    date: "1 - 30 กันยายน 2568",
    participants: "942 คนเข้าร่วม",
    image: "/images/community/community-tree.webp",
    status: "กำลังเปิดรับ",
    mode: "ออนไลน์",
    statusClass: "bg-[#087e59] text-[#83f6bd]",
    action: "เข้าร่วม",
  },
  {
    slug: "favorite-writer-vote",
    title: "โหวตนักเขียนที่คุณรัก",
    description: "เปิดโหวตนักเขียนคนโปรดของคุณ",
    date: "15 - 25 กันยายน 2568",
    participants: "568 คนเข้าร่วม",
    image: "/images/community/community-portal.webp",
    status: "เร็ว ๆ นี้",
    mode: "ออนไลน์",
    statusClass: "bg-[#075c9b] text-[#8fd4ff]",
    action: "ดูรายละเอียด",
  },
  {
    slug: "monthly-review-event",
    title: "กิจกรรมรีวิวประจำเดือน",
    description: "มาเล่าเรื่องดี ๆ ที่ได้จากการอ่าน",
    date: "1 - 30 กันยายน 2568",
    participants: "723 คนเข้าร่วม",
    image: "/images/community/community-library.webp",
    status: "เร็ว ๆ นี้",
    mode: "ออนไลน์",
    statusClass: "bg-[#075c9b] text-[#8fd4ff]",
    action: "ดูรายละเอียด",
  },
  {
    slug: "writer-ama",
    title: "AMA กับนักเขียน",
    description: "ถามได้ทุกเรื่อง ตอบแบบไม่กั๊ก",
    date: "28 กันยายน 2568 20:00 น.",
    participants: "1.1K คนเข้าร่วม",
    image: "/images/community/community-mage.webp",
    status: "เร็ว ๆ นี้",
    mode: "ออนไลน์",
    statusClass: "bg-[#34434b] text-[#d4dde0]",
    action: "ดูรายละเอียด",
  },
];

const pastEvents = [
  { title: "Workshop การสร้างตัวละคร", date: "12 สิงหาคม 2568", participants: "863 คนเข้าร่วม", image: "/images/community/community-artist.webp" },
  { title: "ประกวดเรื่องสั้น ‘ฤดูที่ลม...’", date: "1 - 31 กรกฎาคม 2568", participants: "1.4K คนเข้าร่วม", image: "/images/community/community-writing-challenge.webp" },
  { title: "เสวนานักเขียนอิสระ", date: "21 มิถุนายน 2568", participants: "792 คนเข้าร่วม", image: "/images/community/community-cat.webp" },
];

function CalendarIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M8 3.5v4M16 3.5v4M4 10h16" /></svg>;
}

function PeopleIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.4-3 2.2-4.8 5.5-4.8s5.1 1.8 5.5 4.8M16 11a2.5 2.5 0 1 0 0-5M16.2 14.3c2.5.1 4 1.7 4.3 4.2" /></svg>;
}

function EventRow({ event }: { event: EventItem }) {
  return (
    <article className="grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-white/[0.08] py-2.5 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-[#14221c]">
        <Image alt={`ภาพกิจกรรม ${event.title}`} className="object-cover" fill sizes="88px" src={event.image} />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-[13px] font-semibold text-white sm:text-[14px]">{event.title}</h3>
          <span className={`hidden shrink-0 rounded-full px-2 py-1 text-[10px] font-medium sm:inline-flex ${event.statusClass}`}>{event.status}</span>
        </div>
        <p className="mt-0.5 truncate text-[10px] text-white/55 sm:text-[11px]">{event.description}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-white/55 sm:text-[11px]">
          <span className="inline-flex items-center gap-1"><CalendarIcon />{event.date}</span>
          <span className="inline-flex items-center gap-1"><PeopleIcon />{event.participants}</span>
        </div>
      </div>
      <a className={`hidden h-9 shrink-0 items-center gap-2 rounded-md border px-3 text-[10px] transition sm:inline-flex ${event.action === "เข้าร่วม" ? "border-[#10df8c] text-[#5bf2aa] hover:bg-[#10df8c] hover:text-[#04150d]" : "border-white/40 text-white/80 hover:border-[#10df8c] hover:text-[#5bf2aa]"}`} href={`/community/events/${event.slug}`}>
        {event.action} <span aria-hidden="true" className="text-sm">→</span>
      </a>
    </article>
  );
}

export default function CommunityEvents() {
  const [selectedFilter, setSelectedFilter] = useState<(typeof eventFilters)[number]>("ทั้งหมด");
  const [sort, setSort] = useState("latest");

  const visibleEvents = useMemo(() => {
    if (selectedFilter === "ทั้งหมด") return eventItems;
    if (selectedFilter === "กำลังเปิดรับ") return eventItems.filter((event) => event.status === "กำลังเปิดรับ");
    if (selectedFilter === "เร็ว ๆ นี้") return eventItems.filter((event) => event.status === "เร็ว ๆ นี้");
    if (selectedFilter === "กิจกรรมออนไลน์") return eventItems.filter((event) => event.mode === "ออนไลน์");
    return eventItems.filter((event) => event.mode === "ออฟไลน์");
  }, [selectedFilter]);

  return (
    <div className="min-w-0" id="community-events">
      <section className="overflow-hidden rounded-lg border border-[#20392f] bg-[#0b1712] shadow-[0_10px_28px_rgba(0,0,0,.18)]">
        <div className="relative min-h-[212px] overflow-hidden sm:min-h-[270px]">
          <Image alt="บรรยากาศกิจกรรม September Writing Challenge" className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 900px" src="/images/community-events-hero.webp" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,14,11,.95)_0%,rgba(4,14,11,.78)_32%,rgba(4,14,11,.24)_69%,rgba(4,14,11,.12)_100%)]" />
          <div className="relative flex min-h-[212px] max-w-[480px] flex-col justify-center px-5 py-5 sm:min-h-[270px] sm:px-7 sm:py-7">
            <span className="w-fit rounded bg-[#12df8a] px-2.5 py-1 text-[10px] font-bold text-[#04160d]">กิจกรรมแนะนำ</span>
            <h1 className="mt-2 text-[25px] font-bold leading-none tracking-tight text-white sm:text-[34px]">September<br className="sm:hidden" /> Writing Challenge</h1>
            <p className="mt-2 text-[13px] font-medium text-[#f7e4bc] sm:text-[16px]">ทุกเรื่องราวเริ่มต้นได้เสมอ</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-white/80 sm:text-[12px]"><CalendarIcon />1 - 30 กันยายน 2568</p>
            <p className="mt-2 max-w-[320px] text-[10px] leading-5 text-white/70 sm:text-[11px] sm:leading-5">มาร่วมเขียนไปด้วยกันตลอดเดือนกันยายน<br className="hidden sm:block" /> ไม่ว่าจะเป็นมือใหม่หรือคนที่เขียนมานาน</p>
            <a className="mt-3 inline-flex h-8 w-fit items-center gap-2 rounded-md bg-[#fff2d7] px-4 text-[10px] font-semibold text-[#1e271f] transition hover:bg-white sm:h-9 sm:text-[11px]" href="/community/events/september-writing-challenge">เข้าร่วมเลย <span aria-hidden="true" className="text-sm">→</span></a>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 border-t border-white/[0.06] py-2">
          <span className="h-2 w-2 rounded-full bg-[#16e59a]" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
      </section>

      <section className="mt-4" aria-labelledby="all-events-title">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[21px] font-semibold text-white sm:text-[23px]" id="all-events-title">กิจกรรมทั้งหมด</h2>
          <label className="relative inline-flex items-center">
            <span className="sr-only">เรียงลำดับกิจกรรม</span>
            <select aria-label="เรียงลำดับกิจกรรม" className="appearance-none rounded-full border border-white/10 bg-[#101b17] py-1.5 pl-3 pr-7 text-[10px] text-white/75 outline-none focus:border-[#12df8a]" onChange={(event) => setSort(event.target.value)} value={sort}>
              <option className="bg-[#101b17]" value="latest">ล่าสุด</option>
              <option className="bg-[#101b17]" value="popular">ยอดนิยม</option>
              <option className="bg-[#101b17]" value="soon">มาแรง</option>
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-2 text-[10px] text-white/60">⌄</span>
          </label>
        </div>

        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1">
          {eventFilters.map((filter) => (
            <button aria-pressed={selectedFilter === filter} className={`shrink-0 rounded-full border px-4 py-1.5 text-[10px] transition ${selectedFilter === filter ? "border-[#12df8a] bg-[#12df8a] font-semibold text-[#03150d]" : "border-white/10 bg-[#101b17] text-white/70 hover:border-[#12df8a] hover:text-white"}`} key={filter} onClick={() => setSelectedFilter(filter)} type="button">{filter}</button>
          ))}
        </div>

        <div className="ds-section mt-1 px-3 sm:px-4">
          {visibleEvents.length > 0 ? visibleEvents.map((event) => <EventRow event={event} key={event.title} />) : <p className="py-10 text-center text-sm text-white/50">ยังไม่มีกิจกรรมในหมวดนี้</p>}
        </div>
        <a className="mx-auto mt-3 flex items-center gap-2 text-[11px] font-medium text-[#1de38b] transition hover:text-[#8affc0]" href="/community/events">ดูกิจกรรมทั้งหมด <span aria-hidden="true" className="text-sm">→</span></a>
      </section>

      <section className="mt-4 border-t border-white/[0.08] pt-3" aria-labelledby="past-events-title">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[20px] font-semibold text-white sm:text-[22px]" id="past-events-title">กิจกรรมที่ผ่านมา</h2>
          <a className="text-[11px] font-medium text-[#1de38b] transition hover:text-[#8affc0]" href="/community/events">ดูทั้งหมด →</a>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {pastEvents.map((event) => (
            <article className="ds-card overflow-hidden transition hover:border-arn-accent" key={event.title}>
              <div className="relative aspect-[16/8] overflow-hidden bg-[#14221c]">
                <Image alt={`ภาพกิจกรรมที่ผ่านมา ${event.title}`} className="object-cover" fill sizes="(max-width: 640px) 100vw, 260px" src={event.image} />
              </div>
              <div className="p-2.5">
                <h3 className="truncate text-[11px] font-medium text-white/90">{event.title}</h3>
                <p className="mt-1 text-[10px] text-white/50">{event.date}</p>
                <p className="mt-1 text-[10px] text-white/55"><PeopleIcon /> <span className="ml-1 align-middle">{event.participants}</span></p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
