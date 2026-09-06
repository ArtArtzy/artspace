"use client";

import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import ReadDiscovery from "@/components/ReadDiscovery";
import ReadHero from "@/components/ReadHero";
import ReadSubMenu, { type ReadModeId } from "@/components/ReadSubMenu";
import TopMenu from "@/components/TopMenu";

type ReadModePageProps = {
  mode: ReadModeId;
};

export default function ReadModePage({ mode }: ReadModePageProps) {
  const [followedCategories, setFollowedCategories] = useState(["วาย", "ยูริ", "ลึกลับ", "สยองขวัญ"]);
  const [selectedCategory, setSelectedCategory] = useState("หมวดของฉัน");

  const toggleFollowedCategory = (category: string) => {
    setFollowedCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  };

  return (
    <main className="min-h-screen bg-[#0D0F0E] pt-[146px]">
      <TopMenu fixed />
      <ReadSubMenu activeMode={mode} fixed />
      <ReadHero activeMode={mode} />
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} myCategoryCount={followedCategories.length} showMyCategory />
      <ReadDiscovery
        followedCategories={followedCategories}
        mode={mode}
        onSelectCategory={setSelectedCategory}
        onToggleCategory={toggleFollowedCategory}
        selectedCategory={selectedCategory}
      />
      <CommunitySection />
      <Footer />
    </main>
  );
}
