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
    statusClass: "bg-[#075c9b] text-[#8fd4ff]",
    action: "ดูรายละเอียด",
  },
];

const pastEvents = [
  { slug: "character-workshop", title: "Workshop การสร้างตัวละคร", date: "12 สิงหาคม 2568", participants: "863 คนเข้าร่วม", image: "/images/community/past-character-workshop.png" },
  { slug: "short-story-contest", title: "ประกวดเรื่องสั้น ‘ฤดูที่ลม...’", date: "1 - 31 กรกฎาคม 2568", participants: "1.4K คนเข้าร่วม", image: "/images/community/past-short-story-contest.png" },
  { slug: "independent-writers-seminar", title: "เสวนานักเขียนอิสระ", date: "21 มิถุนายน 2568", participants: "792 คนเข้าร่วม", image: "/images/community/past-writers-seminar.png" },
];

function CalendarIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M8 3.5v4M16 3.5v4M4 10h16" /></svg>;
}

function PeopleIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.4-3 2.2-4.8 5.5-4.8s5.1 1.8 5.5 4.8M16 11a2.5 2.5 0 1 0 0-5M16.2 14.3c2.5.1 4 1.7 4.3 4.2" /></svg>;
}

function EventRow({ event }: { event: EventItem }) {
  return (
    <article className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-white/[0.08] py-2.5 sm:grid-cols-[minmax(0,1.55fr)_120px_92px_92px_86px] sm:gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative h-12 w-[68px] shrink-0 overflow-hidden rounded-md border border-white/10 bg-arn-surface">
          <Image alt={`ภาพกิจกรรม ${event.title}`} className="object-cover" fill sizes="68px" src={event.image} />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[12px] font-semibold text-white sm:text-[13px]">{event.title}</h3>
          <p className="mt-0.5 line-clamp-2 text-[10px] leading-[1.35] text-white/55">{event.description}</p>
        </div>
      </div>
      <div className="hidden min-w-0 text-[10px] text-white/65 sm:block sm:text-[11px]"><span className="inline-flex items-start gap-1"><CalendarIcon />{event.date}</span></div>
      <div className="hidden text-[10px] text-white/65 sm:block sm:text-[11px]"><span>{event.status === "เร็ว ๆ นี้" ? "-" : event.participants}</span></div>
      <div className="hidden sm:block"><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${event.statusClass}`}>{event.status}</span></div>
      <a aria-label={`ดูรายละเอียด ${event.title}`} className="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-section-community px-2.5 text-[10px] font-medium text-section-community transition hover:bg-section-community hover:text-arn-accent-ink sm:h-8" href={`/community/events/${event.slug}`}>
        รายละเอียด
      </a>
    </article>
  );
}

export default function CommunityEvents() {
  const [selectedFilter, setSelectedFilter] = useState<(typeof eventFilters)[number]>("ทั้งหมด");

  const visibleEvents = useMemo(() => {
    if (selectedFilter === "ทั้งหมด") return eventItems;
    if (selectedFilter === "กำลังเปิดรับ") return eventItems.filter((event) => event.status === "กำลังเปิดรับ");
    if (selectedFilter === "เร็ว ๆ นี้") return eventItems.filter((event) => event.status === "เร็ว ๆ นี้");
    if (selectedFilter === "กิจกรรมออนไลน์") return eventItems.filter((event) => event.mode === "ออนไลน์");
    return eventItems.filter((event) => event.mode === "ออฟไลน์");
  }, [selectedFilter]);

  return (
    <div className="min-w-0" id="community-events">
      <section className="ds-community-surface overflow-hidden rounded-lg border border-arn-border">
        <div className="grid min-h-[300px] lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative min-h-[220px] overflow-hidden sm:min-h-[300px]">
            <Image alt="บรรยากาศกิจกรรม September Writing Challenge" className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 55vw" src="/images/community-events-hero.webp" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,11,.08)_20%,rgba(4,14,11,.9)_100%)]" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md bg-section-community px-2.5 py-1 text-[10px] font-bold text-arn-accent-ink"><span aria-hidden="true">★</span> กิจกรรมแนะนำ</span>
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-5">
              <p className="font-sans text-[22px] font-semibold leading-[1.15] text-white sm:text-[28px]">“ทุกเรื่องราว<br />เริ่มต้นได้เสมอ”</p>
              <p className="mt-2 text-[10px] text-white/65 sm:text-[11px]">แค่เริ่มเขียนวันนี้ ให้เรื่องราวได้ออกเดินทาง</p>
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-arn-border bg-arn-surface px-5 py-6 sm:px-7 lg:border-l lg:border-t-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-section-community">เขียนไปด้วยกัน</p>
            <h1 className="mt-2 text-[25px] font-bold leading-[1.08] tracking-tight text-white sm:text-[32px]">September<br className="sm:hidden" /> Writing Challenge</h1>
            <p className="mt-2 text-[13px] font-medium text-arn-accent-soft sm:text-[15px]">ทุกเรื่องราวเริ่มต้นได้เสมอ</p>
            <div className="mt-4 space-y-2 text-[11px] text-white/70 sm:text-[12px]">
              <p className="inline-flex items-center gap-1.5"><CalendarIcon />1 - 30 กันยายน 2568</p>
              <p className="inline-flex items-center gap-1.5"><PeopleIcon />1.2K คนเข้าร่วม</p>
            </div>
            <p className="mt-4 max-w-[320px] text-[11px] leading-5 text-white/60">มาร่วมเขียนไปด้วยกันตลอดเดือนกันยายน ไม่ว่าจะเป็นมือใหม่หรือคนที่เขียนมานาน</p>
            <div className="mt-5 flex items-center gap-2">
              <a className="inline-flex h-9 items-center gap-2 rounded-full bg-section-community px-5 text-[11px] font-semibold text-arn-accent-ink transition hover:bg-arn-accent-soft" href="/community/events/september-writing-challenge">เข้าร่วมเลย <span aria-hidden="true" className="text-sm">→</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4" aria-labelledby="all-events-title">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[21px] font-semibold text-white sm:text-[23px]" id="all-events-title">กิจกรรมทั้งหมด</h2>
        </div>

        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1">
          {eventFilters.map((filter) => (
            <button aria-pressed={selectedFilter === filter} className={`shrink-0 rounded-full border px-4 py-1.5 text-[10px] transition ${selectedFilter === filter ? "border-[#12df8a] bg-[#12df8a] font-semibold text-[#03150d]" : "border-white/10 bg-arn-canvas text-white/70 hover:border-[#12df8a] hover:text-white"}`} key={filter} onClick={() => setSelectedFilter(filter)} type="button">{filter}</button>
          ))}
        </div>

        <div className="ds-section mt-1 px-3 sm:px-4">
          <div className="hidden grid-cols-[minmax(0,1.55fr)_120px_92px_92px_86px] items-center gap-3 border-b border-white/[0.08] py-2 text-[10px] text-white/50 sm:grid">
            <span>กิจกรรม</span>
            <span>วันที่จัด</span>
            <span>ผู้เข้าร่วม</span>
            <span>สถานะ</span>
            <span>การจัดการ</span>
          </div>
          {visibleEvents.length > 0 ? visibleEvents.map((event) => <EventRow event={event} key={event.title} />) : <p className="py-10 text-center text-sm text-white/50">ยังไม่มีกิจกรรมในหมวดนี้</p>}
        </div>
      </section>

      <section className="mt-4 border-t border-white/[0.08] pt-3" aria-labelledby="past-events-title">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[20px] font-semibold text-white sm:text-[22px]" id="past-events-title">กิจกรรมที่ผ่านมา</h2>
          <a className="text-[11px] font-medium text-[#1de38b] transition hover:text-[#8affc0]" href="/community/events">ดูทั้งหมด →</a>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {pastEvents.map((event) => (
            <a className="ds-card block overflow-hidden transition hover:border-arn-accent" href={`/community/events/${event.slug}`} key={event.title}>
              <div className="relative aspect-[3.4/1] overflow-hidden bg-arn-surface">
                <Image alt={`ภาพกิจกรรมที่ผ่านมา ${event.title}`} className="object-cover" fill sizes="(max-width: 640px) 100vw, 260px" src={event.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute left-2 top-2 rounded-md bg-white/85 px-2 py-1 text-[10px] font-medium text-arn-canvas">จบแล้ว</span>
              </div>
              <div className="p-2.5">
                <h3 className="line-clamp-2 text-[12px] font-medium leading-[1.35] text-white/90">{event.title}</h3>
                <p className="mt-1 text-[10px] text-white/50">{event.date}</p>
                <p className="mt-1 inline-flex items-center gap-1 whitespace-nowrap text-[10px] text-white/55"><PeopleIcon />{event.participants}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
