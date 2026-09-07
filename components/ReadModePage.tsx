"use client";

import { useEffect, useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import ReadDiscovery from "@/components/ReadDiscovery";
import ReadHero from "@/components/ReadHero";
import ReadSubMenu, { type ReadModeId } from "@/components/ReadSubMenu";
import TopMenu, { authStateChangedEvent } from "@/components/TopMenu";

type ReadModePageProps = {
  mode: ReadModeId;
};

export default function ReadModePage({ mode }: ReadModePageProps) {
  const [followedCategories, setFollowedCategories] = useState(["วาย", "ยูริ", "ลึกลับ", "สยองขวัญ"]);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const syncAuthState = () => {
      const loggedIn = window.localStorage.getItem("arnspace-authenticated") !== "false";
      setIsLoggedIn(loggedIn);
      setSelectedCategory(loggedIn ? "หมวดของฉัน" : "ทั้งหมด");
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener(authStateChangedEvent, syncAuthState);
    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener(authStateChangedEvent, syncAuthState);
    };
  }, []);

  const toggleFollowedCategory = (category: string) => {
    setFollowedCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  };

  return (
    <main className="min-h-screen bg-[#0D0F0E] pt-[146px]">
      <TopMenu fixed />
      <ReadSubMenu activeMode={mode} fixed />
      <ReadHero activeMode={mode} />
      <div className={isLoggedIn === null ? "invisible" : undefined}>
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} myCategoryCount={followedCategories.length} showMyCategory={isLoggedIn === true} />
        <ReadDiscovery
          followedCategories={followedCategories}
          mode={mode}
          onSelectCategory={setSelectedCategory}
          onToggleCategory={toggleFollowedCategory}
          selectedCategory={selectedCategory}
          showFollowedCategories={isLoggedIn === true}
        />
      </div>
      <CommunitySection />
      <Footer />
    </main>
  );
}
