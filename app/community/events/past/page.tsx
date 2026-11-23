import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import Link from "next/link";
import CommunityPastEventCard from "@/components/CommunityPastEventCard";
import TopMenu from "@/components/TopMenu";
import { pastCommunityEvents, pastCommunityEventsPreviewHref } from "@/data/communityEvents";

export const metadata: Metadata = {
  title: "กิจกรรมที่ผ่านมา | ARN SPACE",
  description: "รวมสรุปกิจกรรมและผลงานจากชุมชน ARN SPACE",
};

export default function PastCommunityEventsPage() {
  return (
    <div className="ds-page-shell min-h-screen pt-[82px]">
      <TopMenu fixed initialLoggedIn={false} showMobileMenu />
      <main className="mx-auto max-w-[1400px] px-ds-4 pb-ds-12 pt-ds-4 text-sm md:px-ds-6">
        <Link href={pastCommunityEventsPreviewHref} className="inline-flex min-h-11 items-center gap-ds-2 font-medium text-arn-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-arn-accent">
          <FontAwesomeIcon icon={faArrowLeft} className="size-3.5 shrink-0" /> กลับไปที่กิจกรรมชุมชน
        </Link>
        <header className="mb-ds-6 mt-ds-4 space-y-ds-2">
          <h1 className="text-ds-h2 md:text-ds-h1">กิจกรรมที่ผ่านมา</h1>
          <p className="text-ds-body text-arn-muted">ย้อนดูไฮไลต์ ผลงาน และบทสรุปจากกิจกรรมชุมชน</p>
        </header>
        {pastCommunityEvents.length ? (
          <ul aria-label="กิจกรรมที่ผ่านมา เรียงจากล่าสุด" className="grid gap-ds-4 sm:grid-cols-2 lg:grid-cols-3">
            {pastCommunityEvents.map(event => (
              <li key={event.slug}><CommunityPastEventCard event={event} showDescription /></li>
            ))}
          </ul>
        ) : <p className="ds-card p-ds-5 text-arn-muted">ยังไม่มีกิจกรรมที่ผ่านมา</p>}
      </main>
    </div>
  );
}
