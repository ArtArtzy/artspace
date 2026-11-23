"use client";

import { faCalendarDays, faChevronLeft, faChevronRight, faClockRotateLeft, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CommunityEventStatusBadge from "@/components/CommunityEventStatusBadge";
import CommunityPastEventCard from "@/components/CommunityPastEventCard";
import {
  communityEventHref,
  communityEvents,
  eventNumber,
  formatCommunityEventPeriod,
  getCommunityEventStatus,
  pastCommunityEvents,
  pastCommunityEventsHref,
} from "@/data/communityEvents";

const featuredEvents = communityEvents.filter(event => event.featured);
const explorableEvents = communityEvents.filter(event => getCommunityEventStatus(event) !== "ended");
const pastEventPreview = pastCommunityEvents.slice(0, 3);
const pageSize = 5;
const eventGrid = "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-ds-3 gap-y-ds-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,.85fr)_minmax(0,1.05fr)_minmax(0,.64fr)_124px]";
const iconButton = "inline-flex size-10 shrink-0 items-center justify-center rounded-ds-md border border-arn-border text-arn-text hover:border-arn-accent hover:text-arn-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-arn-accent disabled:opacity-40";

export default function CommunityEvents() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [page, setPage] = useState(1);

  const featured = featuredEvents[featuredIndex];
  const pageCount = Math.ceil(explorableEvents.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleEvents = explorableEvents.slice(start, start + pageSize);

  function moveFeatured(direction: number) {
    setFeaturedIndex(index => (index + direction + featuredEvents.length) % featuredEvents.length);
  }

  return (
    <div className="space-y-ds-8 text-sm">
      <section aria-label="กิจกรรมแนะนำ" className="ds-card relative grid overflow-hidden sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative min-h-56 overflow-hidden">
          <Image src={featured.image} alt="" fill sizes="(min-width: 1101px) 38vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          <div className="absolute left-ds-4 top-ds-4 inline-flex items-center gap-ds-2 rounded-full bg-arn-accent px-3 py-1 font-medium text-arn-accent-ink">
            <FontAwesomeIcon icon={faStar} /> กิจกรรมแนะนำ
          </div>
        </div>
        <div className="min-w-0 space-y-ds-4 self-center p-ds-5 md:p-ds-6">
          {/* Slides share a grid cell so the longest copy sets the height at each viewport width. */}
          <div className="grid" aria-live="polite">
            {featuredEvents.map((event, index) => {
              const isActive = index === featuredIndex;
              return (
                <div key={event.slug} aria-hidden={!isActive} className={`col-start-1 row-start-1 flex min-w-0 flex-col gap-ds-3 ${isActive ? "" : "invisible"}`}>
                  <CommunityEventStatusBadge status={getCommunityEventStatus(event)} />
                  <h2 className="text-ds-h2 tracking-tight lg:text-[28px]">{event.title}</h2>
                  <p className="text-ds-body text-arn-muted">{event.description}</p>
                  <ul className="flex flex-wrap gap-x-ds-4 gap-y-ds-2 text-arn-muted">
                    <li className="flex items-center gap-ds-2"><FontAwesomeIcon icon={faCalendarDays} className="text-arn-accent" />{formatCommunityEventPeriod(event)}</li>
                    {event.participants > 0 && <li className="flex items-center gap-ds-2"><FontAwesomeIcon icon={faUsers} className="text-arn-accent" />{eventNumber.format(event.participants)} คนเข้าร่วม</li>}
                  </ul>
                  <div className="flex flex-wrap gap-ds-2">
                    {[event.type, event.mode].map(label => <span key={label} className="rounded-full border border-arn-border-strong px-2.5 py-0.5 text-arn-muted">{label}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-ds-3">
            <div className="grid min-w-0 justify-items-start">
              {featuredEvents.map((event, index) => {
                const isActive = index === featuredIndex;
                return (
                  <Link key={event.slug} href={communityEventHref(event.slug)} aria-hidden={!isActive} tabIndex={isActive ? undefined : -1}
                    className={`ds-button-primary col-start-1 row-start-1 min-h-10 gap-ds-2 px-ds-4 text-sm ${isActive ? "" : "invisible"}`}
                  >
                    {getCommunityEventStatus(event) === "open" ? "ดูรายละเอียดการสมัคร" : "ดูกิจกรรม"} <FontAwesomeIcon icon={faChevronRight} className="shrink-0" />
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-ds-2 text-arn-muted">
              <button type="button" onClick={() => moveFeatured(-1)} className={iconButton} aria-label="กิจกรรมแนะนำก่อนหน้า"><FontAwesomeIcon icon={faChevronLeft} /></button>
              <span className="min-w-8 text-center tabular-nums" aria-label={`กิจกรรมที่ ${featuredIndex + 1} จาก ${featuredEvents.length}`}>{featuredIndex + 1}/{featuredEvents.length}</span>
              <button type="button" onClick={() => moveFeatured(1)} className={iconButton} aria-label="กิจกรรมแนะนำถัดไป"><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </div>
        </div>
      </section>

      <section id="community-event-explorer" aria-labelledby="community-event-explorer-heading" className="scroll-mt-[236px] space-y-ds-3">
        <h2 id="community-event-explorer-heading" className="text-ds-h2">สำรวจกิจกรรม</h2>
        <div className="ds-card overflow-hidden">
          <div className={`${eventGrid} hidden bg-arn-raised px-ds-4 py-ds-3 font-medium text-arn-muted lg:grid`} aria-hidden="true">
            <span>กิจกรรม</span><span>ประเภท / รูปแบบ</span><span>ช่วงเวลา</span><span>ผู้เข้าร่วม</span><span>สถานะ</span>
          </div>
          {visibleEvents.length > 0 ? (
            <ul className="divide-y divide-arn-border">
              {visibleEvents.map(event => (
                <li key={event.slug}>
                  <Link href={communityEventHref(event.slug)} className={`${eventGrid} px-ds-4 py-ds-3 text-arn-muted hover:bg-arn-raised focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-arn-accent`}>
                    <div className="flex min-w-0 items-center gap-ds-3">
                      <Image src={event.image} alt="" width={60} height={44} className="hidden aspect-[15/11] shrink-0 rounded-ds-sm object-cover sm:block" />
                      <div className="min-w-0">
                        <h3 className="font-semibold leading-snug text-arn-text">{event.title}</h3>
                        <p className="mt-1 line-clamp-1">{event.description}</p>
                      </div>
                    </div>
                    <div className="col-start-1 row-start-2 flex flex-wrap gap-x-2 lg:col-auto lg:row-auto lg:flex-col">
                      <span>{event.type}</span><span className="text-arn-subtle">{event.mode}</span>
                    </div>
                    <div className="col-start-1 row-start-3 lg:col-auto lg:row-auto">
                      <div>{formatCommunityEventPeriod(event)}</div>
                      {event.time && <div className="text-arn-subtle">{event.time}</div>}
                    </div>
                    <div className="col-start-1 row-start-4 lg:col-auto lg:row-auto">
                      <span className="sr-only">ผู้เข้าร่วม </span>
                      <FontAwesomeIcon icon={faUsers} className="mr-1.5 text-arn-subtle" />
                      {event.participants ? eventNumber.format(event.participants) : "—"}
                    </div>
                    <div className="col-start-2 row-start-1 flex items-center justify-end gap-ds-2 lg:col-auto lg:row-auto lg:justify-between">
                      <CommunityEventStatusBadge status={getCommunityEventStatus(event)} />
                      <FontAwesomeIcon icon={faChevronRight} className="text-arn-subtle" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p className="px-ds-4 py-ds-6 text-center text-arn-muted">ยังไม่มีกิจกรรมในขณะนี้</p>}
          <div className="flex flex-wrap items-center justify-between gap-ds-3 border-t border-arn-border px-ds-4 py-ds-3">
            <p aria-live="polite" className="text-arn-muted">
              {explorableEvents.length ? `แสดง ${start + 1}–${start + visibleEvents.length} จาก ${explorableEvents.length} กิจกรรม` : "แสดง 0 กิจกรรม"}
            </p>
            {pageCount > 1 && (
              <nav aria-label="หน้ารายการกิจกรรม" className="flex items-center gap-1.5">
                <button type="button" className={iconButton} aria-label="หน้าก่อนหน้า" disabled={page === 1} onClick={() => setPage(page - 1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(number => (
                  <button key={number} type="button" aria-label={`หน้า ${number}`} aria-current={number === page ? "page" : undefined} onClick={() => setPage(number)} className={`${iconButton} ${number === page ? "border-arn-accent bg-arn-accent !text-arn-accent-ink" : ""}`}>{number}</button>
                ))}
                <button type="button" className={iconButton} aria-label="หน้าถัดไป" disabled={page === pageCount} onClick={() => setPage(page + 1)}><FontAwesomeIcon icon={faChevronRight} /></button>
              </nav>
            )}
          </div>
        </div>
      </section>

      <section id="community-past-events" aria-labelledby="community-past-events-heading" className="scroll-mt-[236px] space-y-ds-3">
        <div className="flex flex-wrap items-center justify-between gap-x-ds-4">
          <div>
            <h2 id="community-past-events-heading" className="flex items-center gap-ds-2 text-ds-h2">
              <FontAwesomeIcon icon={faClockRotateLeft} className="text-[19px] text-arn-accent" /> กิจกรรมที่ผ่านมา
            </h2>
            <p className="mt-1 text-arn-muted">ย้อนดูผลงานและเรื่องเล่าจากกิจกรรมที่ผ่านมา</p>
          </div>
          <Link href={pastCommunityEventsHref} aria-label="ดูกิจกรรมที่ผ่านมาทั้งหมด" className="inline-flex min-h-11 items-center gap-ds-2 font-medium text-arn-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-arn-accent">
            ดูทั้งหมด <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
        <ul className="grid gap-ds-3 sm:grid-cols-3">
          {pastEventPreview.map(event => (
            <li key={event.slug}><CommunityPastEventCard event={event} /></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
