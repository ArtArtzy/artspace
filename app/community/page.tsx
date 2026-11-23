"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CommunityEvents from "@/components/CommunityEvents";
import CommunityEventsSidebar from "@/components/CommunityEventsSidebar";
import CommunityFeed, { communityThreadsByRoom } from "@/components/CommunityFeed";
import CommunitySidebar from "@/components/CommunitySidebar";
import Footer from "@/components/Footer";
import PageTitleBar from "@/components/PageTitleBar";
import TopMenu from "@/components/TopMenu";
import DesktopOnlyNotice from "@/components/DesktopOnlyNotice";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import useHomeAuth from "@/components/useHomeAuth";
import { communityCreateHref, communityRooms, communitySectionHref } from "@/data/communityRooms";
import { normalizeCommunityTag } from "@/data/communityTags";
import { useLocalCommunityThreads } from "@/data/localCommunityThreads";

function BookIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 6c-2-2-5-2.5-9-2v14c4-.5 7 0 9 2 2-2 5-2.5 9-2V4c-4-.5-7 0-9 2Zm0 0v14" />
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

function HeartIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20s-8.5-4.9-8.5-10.5A4.5 4.5 0 0 1 12 7.4a4.5 4.5 0 0 1 8.5 2.1C20.5 15.1 12 20 12 20Z" />
    </svg>
  );
}

function PanelsIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 11h16m-9 0v9" />
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
  { id: "general", label: communityRooms.general.label, icon: ChatIcon },
  { id: "novel", label: communityRooms.novel.label, icon: BookIcon },
  { id: "fanfic", label: communityRooms.fanfic.label, icon: HeartIcon },
  { id: "cartoon", label: communityRooms.cartoon.label, icon: PanelsIcon },
  { id: "events", label: "กิจกรรม", icon: CalendarIcon },
] as const;

function CommunityPageContent() {
  const searchParams = useSearchParams();
  const requestedSection = searchParams.get("section");
  const isLoggedIn = useHomeAuth();
  const localThreads = useLocalCommunityThreads();
  const activeSection = communityLinks.find(({ id }) => id === requestedSection)?.id
    ?? (requestedSection === "writers" ? "novel" : "general");
  const createHref = activeSection === "events" ? null : communityCreateHref(activeSection);
  const createAction = createHref && (
    <Link
      className="ds-button-primary min-h-11 shrink-0 px-ds-4"
      href={isLoggedIn ? createHref : `/login?returnTo=${encodeURIComponent(createHref)}`}
    >
      + ตั้งกระทู้ใหม่
    </Link>
  );
  const tag = normalizeCommunityTag(searchParams.get("tag") ?? "");
  const requestedPage = Number(searchParams.get("page"));
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const threads = activeSection === "events" ? [] : [
    ...(localThreads ?? []).filter(({ room }) => room === activeSection),
    ...communityThreadsByRoom[activeSection],
  ];

  return (
    <UnbuiltPageGuard>
      <section
        aria-labelledby="community-hero-title"
        className={`relative mx-auto aspect-[10/11] overflow-hidden bg-arn-surface md:aspect-[2/1] xl:aspect-[3/1] ${isLoggedIn ? "max-w-[1400px]" : "max-w-screen-2xl"}`}
        data-community-hero
      >
        <Image
          src="/images/community/community-hero-reading-room.webp"
          alt="นักอ่านแบ่งปันเรื่องราวกันที่โต๊ะหนังสือในห้องสมุด"
          className="object-cover object-[76%_center] md:object-center"
          fill
          preload
          sizes={isLoggedIn ? "(max-width: 1400px) 100vw, 1400px" : "(max-width: 1536px) 100vw, 1536px"}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-arn-canvas via-arn-canvas/20 to-transparent md:bg-gradient-to-r md:from-arn-canvas/80" />
        <div className="absolute inset-0 flex items-end p-ds-6 md:items-center md:px-ds-12">
          <div className="max-w-[34rem]">
            <h2 className="text-3xl font-bold leading-tight text-arn-text sm:text-4xl xl:text-5xl 2xl:text-ds-display" id="community-hero-title">
              ชุมชน <span className="whitespace-nowrap">ARN Space</span>
            </h2>
            <p className="mt-ds-3 text-ds-body text-arn-text">พื้นที่ของคนอ่าน คนเขียน และเรื่องราวที่เราอยากคุยต่อ</p>
          </div>
        </div>
      </section>

      <PageTitleBar variant="community" />

      <div className="sticky top-[142px] z-40 bg-arn-canvas shadow-[0_8px_20px_rgba(0,0,0,.24)]">
        <nav id="community-content" aria-label="เมนูชุมชน" className="mx-auto max-w-[1400px] border-t border-arn-border bg-arn-canvas px-2 pb-[18px] pt-1">
          <div className="grid grid-cols-2 gap-ds-2 md:grid-cols-5 md:gap-ds-3">
            {communityLinks.map(({ id, label, icon: Icon }) => (
              <Link
                key={id}
                href={communitySectionHref(id)}
                scroll={false}
                aria-current={activeSection === id ? "page" : undefined}
                className={`flex h-[58px] min-w-0 items-center justify-center gap-ds-2 rounded-ds-md border px-ds-2 py-ds-2 text-ds-body-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent ${
                  activeSection === id
                    ? "border-section-community bg-arn-raised text-section-community shadow-ds-glow"
                    : "border-arn-border bg-arn-surface-soft text-arn-muted hover:border-arn-border-strong hover:text-arn-text"
                }`}
              >
                <Icon />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <section className="mx-auto grid max-w-[1400px] scroll-mt-[220px] gap-4 px-2 pb-12 pt-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-5" data-community-thread-room={activeSection === "events" ? undefined : activeSection} id="community-room-content">
        <div className="ds-community-content min-w-0">
          {activeSection === "events" ? <CommunityEvents /> : (
            <CommunityFeed headerAction={createAction} page={page} posts={threads} room={activeSection} tag={tag} />
          )}
        </div>
        {activeSection === "events" ? <CommunityEventsSidebar /> : <CommunitySidebar posts={threads} room={activeSection} tag={tag} />}
      </section>

      <Footer />
    </UnbuiltPageGuard>
  );
}

export default function CommunityPage() {
  return (
    <main className="ds-page-shell min-h-screen pt-[82px]">
      <DesktopOnlyNotice />
      <TopMenu fixed initialLoggedIn={false} />
      <Suspense fallback={<div aria-busy="true" />}>
        <CommunityPageContent />
      </Suspense>
    </main>
  );
}
