"use client";

import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import HeroCarousel from "@/components/HeroCarousel";
import BookDiscovery from "@/components/BookDiscovery";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import TopMenu from "@/components/TopMenu";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("สำหรับคุณ");

  return (
    <main className="min-h-screen bg-[#0D0F0E] pt-[82px]">
      <TopMenu fixed />
      <HeroCarousel />
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} variant="home" />
      <BookDiscovery selectedCategory={selectedCategory} />
      <CommunitySection />
      <Footer />
    </main>
  );
}
