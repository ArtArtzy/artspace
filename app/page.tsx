"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import HeroCarousel from "@/components/HeroCarousel";
import BookDiscovery from "@/components/BookDiscovery";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import TopMenu, { authStateChangedEvent } from "@/components/TopMenu";

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
    <main className="min-h-screen bg-[#0D0F0E] pt-[82px]">
      <TopMenu fixed />
      <HeroCarousel />
      <div className={isLoggedIn === null ? "invisible" : undefined}>
        {isLoggedIn !== false && <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} variant="home" />}
        <BookDiscovery selectedCategory={visibleCategory} />
      </div>
      <CommunitySection />
      <Footer />
    </main>
  );
}
