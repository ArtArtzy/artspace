"use client";

import { useEffect, useState } from "react";
import CategoryFilter, { defaultGenreSelection } from "@/components/CategoryFilter";
import Footer from "@/components/Footer";
import ReadDiscovery from "@/components/ReadDiscovery";
import ReadHero from "@/components/ReadHero";
import type { ReadModeId } from "@/components/ReadSubMenu";
import TopMenu, { authStateChangedEvent } from "@/components/TopMenu";
import { categoryBooks } from "@/data/categoryBooks";

type ReadModePageProps = {
  mode: ReadModeId;
};

const selectedGenresStorageKey = "arnspace-selected-genres";

function readStoredGenres() {
  if (typeof window === "undefined") return defaultGenreSelection;

  try {
    const storedValue = window.localStorage.getItem(selectedGenresStorageKey);
    if (!storedValue) return defaultGenreSelection;

    const parsedValue: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) return defaultGenreSelection;

    const availableCategories = new Set(Object.keys(categoryBooks));
    const storedGenres = parsedValue
      .filter((category): category is string => typeof category === "string" && availableCategories.has(category))
      .filter((category, index, genres) => genres.indexOf(category) === index)
      .slice(0, 10);

    return storedGenres.length > 0 ? storedGenres : defaultGenreSelection;
  } catch {
    return defaultGenreSelection;
  }
}

export default function ReadModePage({ mode }: ReadModePageProps) {
  const [followedCategories, setFollowedCategories] = useState(["วาย", "ยูริ", "ลึกลับ", "สยองขวัญ"]);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(defaultGenreSelection);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const syncAuthState = () => {
      const loggedIn = window.localStorage.getItem("arnspace-authenticated") !== "false";
      const requestedCategory = new URLSearchParams(window.location.search).get("category");
      const hasRequestedCategory = requestedCategory === "ทั้งหมด"
        || (requestedCategory !== null && Object.prototype.hasOwnProperty.call(categoryBooks, requestedCategory));
      const nextCategory = hasRequestedCategory && requestedCategory
        ? requestedCategory
        : loggedIn
          ? "หมวดของฉัน"
          : "ทั้งหมด";

      setIsLoggedIn(loggedIn);
      setSelectedCategory(nextCategory);
      setSelectedGenres(readStoredGenres());
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

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const selectGenres = (categories: string[]) => {
    setSelectedCategory("หมวดของฉัน");
    const availableCategories = new Set(Object.keys(categoryBooks));
    const nextGenres = categories
      .filter((category) => availableCategories.has(category))
      .filter((category, index, genres) => genres.indexOf(category) === index)
      .slice(0, 10);

    setSelectedGenres(nextGenres);
    window.localStorage.setItem(selectedGenresStorageKey, JSON.stringify(nextGenres));
  };

  return (
    <main className="min-h-screen bg-[#0D0F0E] pt-[82px]">
      <TopMenu fixed />
      <ReadHero activeMode={mode} />
      <div className={isLoggedIn === null ? "invisible" : undefined}>
        <CategoryFilter onSelect={selectCategory} onSelectGenres={selectGenres} selected={selectedCategory} selectedGenres={selectedGenres} myCategoryCount={followedCategories.length} showMyCategory={isLoggedIn === true} />
        <ReadDiscovery
          followedCategories={followedCategories}
          mode={mode}
          onSelectCategory={selectCategory}
          onToggleCategory={toggleFollowedCategory}
          selectedCategory={selectedCategory}
          selectedGenres={selectedGenres}
          showFollowedCategories={isLoggedIn === true}
        />
      </div>
      <Footer />
    </main>
  );
}
