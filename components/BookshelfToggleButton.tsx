"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const bookshelfStorageKey = "arnspace-bookshelf";
const bookshelfChangedEvent = "arnspace-bookshelf-change";

function readBookshelf() {
  try {
    const storedBooks = window.localStorage.getItem(bookshelfStorageKey);
    const parsedBooks: unknown = storedBooks ? JSON.parse(storedBooks) : [];
    return Array.isArray(parsedBooks) ? parsedBooks.filter((book): book is string => typeof book === "string") : [];
  } catch {
    return [];
  }
}

type BookshelfToggleButtonProps = {
  title: string;
  className: string;
  icon?: ReactNode;
};

export default function BookshelfToggleButton({ title, className, icon }: BookshelfToggleButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const syncSavedState = () => setIsSaved(readBookshelf().includes(title));
    syncSavedState();
    window.addEventListener("storage", syncSavedState);
    window.addEventListener(bookshelfChangedEvent, syncSavedState);
    return () => {
      window.removeEventListener("storage", syncSavedState);
      window.removeEventListener(bookshelfChangedEvent, syncSavedState);
    };
  }, [title]);

  const toggleBookshelf = () => {
    const currentBooks = readBookshelf();
    const nextBooks = currentBooks.includes(title)
      ? currentBooks.filter((book) => book !== title)
      : [...currentBooks, title];

    window.localStorage.setItem(bookshelfStorageKey, JSON.stringify(nextBooks));
    setIsSaved(nextBooks.includes(title));
    window.dispatchEvent(new Event(bookshelfChangedEvent));
  };

  return (
    <button
      aria-label={isSaved ? "เอาออกจากชั้นหนังสือ" : "เพิ่มเข้าชั้นหนังสือ"}
      aria-pressed={isSaved}
      className={`${className} ${isSaved ? "!border-[#ff8d62] !bg-[#3a2118]/95 !text-[#ffd0bd] shadow-[0_8px_28px_rgba(255,111,70,.28)] hover:!border-[#ffb08f] hover:!bg-[#552b20]" : ""}`}
      data-bookshelf-state={isSaved ? "saved" : "empty"}
      onClick={toggleBookshelf}
      title={isSaved ? "เอาออกจากชั้นหนังสือ" : "เพิ่มเข้าชั้นหนังสือ"}
      type="button"
    >
      {icon}
      {isSaved ? "เอาออกจากชั้นหนังสือ" : "เพิ่มเข้าชั้นหนังสือ"}
    </button>
  );
}
