"use client";

import { useEffect, useState } from "react";
import { getCatalogBookOrFallback } from "@/data/novelDetails";
import { readReadingHistory, readingHistoryChangedEvent, readingHistoryKey, sampleReadingHistory } from "@/data/readingHistory";

function toBooks(history: ReturnType<typeof readReadingHistory>) {
  return history.map(({ title, openedTitle, mode }) => ({
    ...getCatalogBookOrFallback(title, mode),
    linkTitle: openedTitle,
    readMode: mode,
  }));
}

const sampleBooks = toBooks(sampleReadingHistory);

export default function useReadingHistory(enabled = true) {
  const [books, setBooks] = useState(sampleBooks);

  useEffect(() => {
    if (!enabled) return;
    const sync = () => setBooks(toBooks(readReadingHistory()));
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key === readingHistoryKey || event.key === null) sync();
    };
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(readingHistoryChangedEvent, sync);
    window.addEventListener("pageshow", sync);
    sync();
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener(readingHistoryChangedEvent, sync);
      window.removeEventListener("pageshow", sync);
    };
  }, [enabled]);

  return books;
}
