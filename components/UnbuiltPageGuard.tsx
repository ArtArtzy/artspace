"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { findUnbuiltPage, type UnbuiltPage } from "@/data/unbuilt-pages";
import UnbuiltPageModal from "@/components/UnbuiltPageModal";

type PendingPage = {
  page: UnbuiltPage;
  href: string;
};

type UnbuiltPageGuardProps = {
  children: ReactNode;
};

function closeOnEscape(event: KeyboardEvent, close: () => void) {
  if (event.key === "Escape") close();
}

export default function UnbuiltPageGuard({ children }: UnbuiltPageGuardProps) {
  const [pendingPage, setPendingPage] = useState<PendingPage | null>(null);

  useEffect(() => {
    if (!pendingPage) return;

    const handleKeyDown = (event: KeyboardEvent) => closeOnEscape(event, () => setPendingPage(null));
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pendingPage]);

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const anchor = target.closest("a[href]");
    const href = anchor?.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

    const destination = new URL(href, window.location.origin);
    const page = findUnbuiltPage(destination.pathname, destination.searchParams);
    if (!page) return;

    event.preventDefault();
    event.stopPropagation();
    setPendingPage({
      page,
      href: `${destination.pathname}${destination.search}${destination.hash}`,
    });
  };

  return (
    <div className="contents" onClickCapture={handleClickCapture}>
      {children}
      {pendingPage && <UnbuiltPageModal href={pendingPage.href} onClose={() => setPendingPage(null)} page={pendingPage.page} />}
    </div>
  );
}
