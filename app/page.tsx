"use client";

import HeroCarousel from "@/components/HeroCarousel";
import { HomeBookDiscovery } from "@/components/BookDiscovery";
import Footer from "@/components/Footer";
import PageTitleBar from "@/components/PageTitleBar";
import TopMenu from "@/components/TopMenu";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import useHomeAuth from "@/components/useHomeAuth";
import styles from "./GuestHome.module.css";

export default function Home() {
  const isGuest = !useHomeAuth();

  return (
    <main className={`ds-page-shell min-h-screen pt-[82px] ${isGuest ? styles.page : styles.memberPage}`} data-home-page data-guest-home={isGuest ? "true" : undefined}>
      <TopMenu fixed initialLoggedIn={false} />
      <UnbuiltPageGuard>
        <HeroCarousel includeDesktopAction={isGuest} />
        <PageTitleBar variant="home" />
        <HomeBookDiscovery isGuest={isGuest} />
        <Footer responsive />
      </UnbuiltPageGuard>
    </main>
  );
}
