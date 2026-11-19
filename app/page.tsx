"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import HeroCarousel from "@/components/HeroCarousel";
import BookDiscovery from "@/components/BookDiscovery";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import PageTitleBar from "@/components/PageTitleBar";
import TopMenu, { authStateChangedEvent } from "@/components/TopMenu";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import styles from "./GuestHome.module.css";

const authStorageKey = "arnspace-authenticated";
const guestHomeCategory = "กำลังมาแรง";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("สำหรับคุณ");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const syncAuthState = () => {
      const loggedIn = window.localStorage.getItem(authStorageKey) !== "false";
      setIsLoggedIn(loggedIn);
      if (!loggedIn) setSelectedCategory(guestHomeCategory);
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener(authStateChangedEvent, syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener(authStateChangedEvent, syncAuthState);
    };
  }, []);

  const visibleCategory = isLoggedIn === false ? guestHomeCategory : selectedCategory;

  return (
    <main className={`ds-page-shell min-h-screen pt-[82px] ${isLoggedIn === false ? styles.page : ""}`} data-guest-home={isLoggedIn === false ? "true" : undefined}>
      <TopMenu fixed />
      <UnbuiltPageGuard>
        <HeroCarousel includeDesktopAction={isLoggedIn === false} />
        <PageTitleBar variant="home" />
        <div className={isLoggedIn === null ? "invisible" : undefined}>
          {isLoggedIn !== false && <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} stickyOffset="page-banner" variant="home" />}
          <BookDiscovery selectedCategory={visibleCategory} showSidebar={false} isGuest={isLoggedIn === false} />
        </div>
        <CommunitySection isGuest={isLoggedIn === false} />
        <Footer />
      </UnbuiltPageGuard>
    </main>
  );
}
