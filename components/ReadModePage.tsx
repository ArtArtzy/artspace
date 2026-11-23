"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryFilter, { defaultGenreSelection } from "@/components/CategoryFilter";
import Footer from "@/components/Footer";
import ReadDiscovery from "@/components/ReadDiscovery";
import ReadHero from "@/components/ReadHero";
import type { ReadModeId } from "@/components/ReadSubMenu";
import TopMenu from "@/components/TopMenu";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import useHomeAuth from "@/components/useHomeAuth";
import { categoryBooks } from "@/data/categoryBooks";
import { maxSelectedGenres, readStoredGenres, selectedGenresStorageKey } from "@/data/reader-preferences";
import styles from "@/app/GuestHome.module.css";

type ReadModePageProps = {
  mode: ReadModeId;
  category?: string;
};

export default function ReadModePage({ mode, category }: ReadModePageProps) {
  const router = useRouter();
  const requestedCategory = category && (category === "ทั้งหมด" || Object.prototype.hasOwnProperty.call(categoryBooks, category))
    ? category
    : undefined;
  const basePath = mode === "novel" ? "/read" : `/read/${mode}`;
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const isLoggedIn = useHomeAuth();

  useEffect(() => {
    const syncGenres = () => {
      const storedGenres = readStoredGenres()?.filter((genre) => Object.hasOwn(categoryBooks, genre));
      setSelectedGenres(storedGenres?.slice(0, maxSelectedGenres) ?? []);
    };
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key === selectedGenresStorageKey || event.key === null) syncGenres();
    };
    syncGenres();
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("pageshow", syncGenres);
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("pageshow", syncGenres);
    };
  }, [mode, requestedCategory, isLoggedIn]);

  const selectGenres = (categories: string[]) => {
    const nextGenres = [...new Set(categories)].filter((genre) => Object.hasOwn(categoryBooks, genre)).slice(0, maxSelectedGenres);

    setSelectedGenres(nextGenres);
    try {
      window.localStorage.setItem(selectedGenresStorageKey, JSON.stringify(nextGenres));
    } catch {
      // The selected rows can still update on this page.
    }
  };

  const isGuest = isLoggedIn !== true;

  return (
    <main className={`ds-page-shell min-h-screen pt-[82px] ${isGuest ? styles.page : styles.memberPage}`} data-read-catalog>
      <TopMenu fixed initialLoggedIn={false} showMobileMenu />
      <UnbuiltPageGuard>
        <ReadHero activeMode={mode} />
        {requestedCategory && (
          <CategoryFilter
            onSelect={(genre) => router.push(`${basePath}?category=${encodeURIComponent(genre)}#read-discovery`)}
            onSelectGenres={(genres) => {
              selectGenres(genres);
              router.push(`${basePath}#read-favorites`);
            }}
            selected={requestedCategory}
            selectedGenres={[...new Set([...(requestedCategory === "ทั้งหมด" ? [] : [requestedCategory]), ...(selectedGenres.length ? selectedGenres : defaultGenreSelection)])]}
            stickyOffset="read"
          />
        )}
        <ReadDiscovery
          isLoggedIn={isLoggedIn === true}
          mode={mode}
          onSelectGenres={selectGenres}
          selectedCategory={requestedCategory}
          selectedGenres={selectedGenres}
        />
        <Footer responsive={!isGuest} />
      </UnbuiltPageGuard>
    </main>
  );
}
