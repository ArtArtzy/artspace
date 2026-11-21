"use client";

import { useEffect, useState } from "react";
import CategoryFilter, { defaultGenreSelection } from "@/components/CategoryFilter";
import Footer from "@/components/Footer";
import ReadDiscovery from "@/components/ReadDiscovery";
import ReadHero from "@/components/ReadHero";
import type { ReadModeId } from "@/components/ReadSubMenu";
import TopMenu from "@/components/TopMenu";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import useHomeAuth from "@/components/useHomeAuth";
import { categoryBooks } from "@/data/categoryBooks";
import styles from "@/app/GuestHome.module.css";

type ReadModePageProps = {
  mode: ReadModeId;
  category?: string;
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

export default function ReadModePage({ mode, category }: ReadModePageProps) {
  const requestedCategory = category && (category === "ทั้งหมด" || Object.prototype.hasOwnProperty.call(categoryBooks, category))
    ? category
    : undefined;
  const [followedCategories, setFollowedCategories] = useState(["วาย", "ยูริ", "ลึกลับ", "สยองขวัญ"]);
  const [selectedCategory, setSelectedCategory] = useState(requestedCategory ?? "ทั้งหมด");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(defaultGenreSelection);
  const isLoggedIn = useHomeAuth();

  useEffect(() => {
    setSelectedCategory(requestedCategory ?? (isLoggedIn ? "หมวดของฉัน" : "ทั้งหมด"));
    setSelectedGenres(readStoredGenres());
  }, [isLoggedIn, requestedCategory]);

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

  const isGuest = isLoggedIn !== true;

  return (
    <main className={`ds-page-shell min-h-screen pt-[82px] ${isGuest ? styles.page : styles.memberPage}`} data-read-catalog data-guest-read={isGuest ? "true" : undefined}>
      <TopMenu fixed showMobileMenu />
      <UnbuiltPageGuard>
        <ReadHero activeMode={mode} />
        <div className={isLoggedIn === null && !requestedCategory ? "invisible" : undefined}>
          <CategoryFilter onSelect={selectCategory} onSelectGenres={selectGenres} selected={selectedCategory} selectedGenres={selectedGenres} myCategoryCount={followedCategories.length} showMyCategory={isLoggedIn === true} stickyOffset="read" />
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
        <Footer responsive={!isGuest} />
      </UnbuiltPageGuard>
    </main>
  );
}
