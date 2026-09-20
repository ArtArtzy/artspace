"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CommunityDiscussion from "@/components/CommunityDiscussion";
import CommunityDiscussionSidebar from "@/components/CommunityDiscussionSidebar";
import CommunityEvents from "@/components/CommunityEvents";
import CommunityEventsSidebar from "@/components/CommunityEventsSidebar";
import CommunityFeed from "@/components/CommunityFeed";
import CommunitySidebar from "@/components/CommunitySidebar";
import CommunityWriters from "@/components/CommunityWriters";
import CommunityWritersSidebar from "@/components/CommunityWritersSidebar";
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";

function HomeIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9.5V20h14V9.5M9 20v-6h6v6" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5.5h16v10H9l-5 4v-14Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m14.5 5.5 4 4M4 20l1.4-5.2L15.8 4.4a2.1 2.1 0 0 1 3 3L8.4 17.8 4 20Z" />
      <path d="M13 7.5 16.5 11" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16M8 14h3M13 14h3" />
    </svg>
  );
}

const communityLinks = [
  { id: "home", label: "สำหรับคุณ", icon: HomeIcon },
  { id: "discussion", label: "พูดคุย", icon: ChatIcon },
  { id: "writers", label: "ห้องนักเขียน", icon: PenIcon },
  { id: "events", label: "กิจกรรม", icon: CalendarIcon },
] as const;

export default function CommunityPage() {
  const [activeSection, setActiveSection] = useState<(typeof communityLinks)[number]["id"]>("home");

  useEffect(() => {
    const requestedSection = new URLSearchParams(window.location.search).get("section");
    if (communityLinks.some(({ id }) => id === requestedSection)) {
      setActiveSection(requestedSection as (typeof communityLinks)[number]["id"]);
    }
  }, []);

  return (
    <main className="ds-page-shell min-h-screen pt-[82px]">
      <TopMenu fixed />

      <UnbuiltPageGuard>
      <section className="mx-auto max-w-[1400px] overflow-hidden bg-[#101a16]">
        <div className="relative min-h-[300px] sm:min-h-[360px]">
          <Image
            src="/images/community-hero.webp"
            alt="บรรยากาศห้องอ่านหนังสือของชุมชน ArnSpace"
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,10,.88)_0%,rgba(5,13,10,.62)_38%,rgba(5,13,10,.12)_75%,rgba(5,13,10,.42)_100%)]" />
          <div className="relative flex min-h-[300px] items-end px-6 py-8 sm:min-h-[360px] sm:px-10 sm:py-10">
            <div className="max-w-[540px]">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-[#55e7a4]">ARN SPACE</p>
              <h1 className="font-sans text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-6xl">ชุมชน ArnSpace</h1>
              <p className="mt-3 max-w-[500px] text-sm leading-6 text-white/80 sm:text-base">
                พื้นที่ของคนอ่าน คนเขียน และเรื่องราวที่เราอยากคุยต่อ
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/community/create-post"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#12df8a] px-6 text-sm font-semibold text-[#06140e] shadow-[0_8px_24px_rgba(18,223,138,.2)] transition hover:bg-[#39f0a0]"
                >
                  + สร้างโพสต์
                </Link>
                <Link
                  href="#community-content"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 bg-black/20 px-6 text-sm font-medium text-white backdrop-blur-sm transition hover:border-[#12df8a] hover:text-[#75f4ba]"
                >
                  ดูคอมมูนิตี้
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      <div className="sticky top-[82px] z-40 bg-[#0D0F0E] shadow-[0_8px_20px_rgba(0,0,0,.24)]">
        <nav id="community-content" aria-label="เมนูชุมชน" className="mx-auto max-w-[1400px] border-t border-white/[0.08] bg-[#0D0F0E] px-2 pb-[18px] pt-1">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {communityLinks.map(({ id, label, icon: Icon }) => (
              <Link
                key={label}
                href={id === "discussion" ? "#community-discussion" : "#community-content"}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveSection(id);
                }}
                className={`flex h-[58px] min-w-0 items-center justify-center gap-2 rounded-[7px] border px-2 py-2 text-sm transition ${
                  activeSection === id
                    ? "border-[#1cbd55] bg-[linear-gradient(145deg,#102d19,#102017)] text-[#45ee83] shadow-[0_0_12px_rgba(23,213,100,.22)]"
                    : "border-white/[0.08] bg-[#151817] text-white/75 hover:border-white/20 hover:bg-[#1a1f1c] hover:text-white"
                }`}
              >
                <Icon />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-4 px-4 pb-12 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-5 lg:px-8">
        {activeSection === "discussion" ? <CommunityDiscussion /> : activeSection === "writers" ? <CommunityWriters /> : activeSection === "events" ? <CommunityEvents /> : <CommunityFeed />}
        {activeSection === "writers" ? <CommunityWritersSidebar /> : activeSection === "events" ? <CommunityEventsSidebar /> : <CommunitySidebar />}
      </section>

      <Footer />
      </UnbuiltPageGuard>
    </main>
  );
}
