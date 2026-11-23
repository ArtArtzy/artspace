"use client";

import { usePathname } from "next/navigation";
import CompactPageHeader from "@/components/CompactPageHeader";
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";
import useHomeAuth from "@/components/useHomeAuth";
import styles from "@/app/GuestHome.module.css";

export default function ReadLoading() {
  const isEpisode = usePathname() === "/read/episode";
  const isLoggedIn = useHomeAuth();
  const catalogLayout = isLoggedIn ? styles.memberPage : styles.page;

  return (
    <main className={`ds-page-shell min-h-screen ${isEpisode ? "" : `pt-[82px] ${catalogLayout}`}`} data-read-catalog>
      {isEpisode ? (
        <CompactPageHeader backHref="/" backLabel="กลับหน้าหลัก" context="อ่านเรื่อง" title="กำลังโหลด" />
      ) : (
        <TopMenu fixed initialLoggedIn={false} showMobileMenu />
      )}
      <div
        className="mx-auto max-w-[1400px] px-8 py-12"
        role="status"
        aria-live="polite"
      >
        <p className="mb-8 text-ds-body text-arn-muted">
          กำลังเตรียมเรื่องราวให้คุณอ่าน...
        </p>
        <div
          aria-hidden="true"
          className="grid animate-pulse grid-cols-[96px_minmax(0,1fr)] gap-ds-4 motion-reduce:animate-none md:grid-cols-[240px_minmax(0,1fr)] md:gap-ds-8"
        >
          <div className="aspect-[2/3] rounded-ds-lg bg-arn-raised" />
          <div className="space-y-5">
            <div className="h-8 w-3/4 rounded bg-arn-raised" />
            <div className="h-5 w-1/3 rounded bg-arn-raised" />
            <div className="h-32 rounded bg-arn-raised" />
          </div>
        </div>
      </div>
      <Footer responsive />
    </main>
  );
}
