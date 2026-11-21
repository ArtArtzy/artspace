"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { faBookOpen, faChevronRight, faHeart, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GenreIcon } from "@/components/CategoryFilter";
import HomeViewAllLink from "@/components/HomeViewAllLink";
import type { ReadModeId } from "@/components/ReadSubMenu";
import { categoryBooks } from "@/data/categoryBooks";
import { getCatalogBookMode } from "@/data/novelDetails";
import homeStyles from "@/app/GuestHome.module.css";
import styles from "./QuickExplore.module.css";

const exploreModes = {
  novel: {
    label: "นิยาย",
    href: "/read",
    icon: faBookOpen,
    genres: ["โรแมนติก", "แฟนตาซี", "ลึกลับ", "วาย", "ยูริ", "จีนโบราณ", "ดราม่าเข้มข้น", "เกิดใหม่", "โรแมนซ์แฟนตาซี", "สยองขวัญ", "ไซไฟ", "คอมเมดี้"],
  },
  fanfic: {
    label: "แฟนฟิค",
    href: "/read/fanfic",
    icon: faHeart,
    genres: ["วาย", "ยูริ", "อนิเมะ", "ดราม่าเข้มข้น", "เกมและโลกเสมือน", "คอมเมดี้", "แฟนตาซี", "โรแมนติก", "แฟชั่นและไลฟ์สไตล์", "ไซไฟ", "แอ๊กชั่น", "ลึกลับ"],
  },
  cartoon: {
    label: "การ์ตูน",
    href: "/read/cartoon",
    icon: faImage,
    genres: ["แอ๊กชั่น", "เกิดใหม่", "ไซไฟ", "แฟนตาซี", "โรแมนซ์แฟนตาซี", "สยองขวัญ", "คอมเมดี้", "เกมและโลกเสมือน", "วาย", "อนิเมะ", "จีนโบราณ", "โรแมนติก"],
  },
};

const modeIds: ReadModeId[] = ["novel", "fanfic", "cartoon"];

export default function QuickExplore() {
  const [selectedMode, setSelectedMode] = useState<ReadModeId>("novel");
  const mode = exploreModes[selectedMode];
  const catalogHref = (genre: string) => `${mode.href}?category=${encodeURIComponent(genre)}#read-discovery`;

  return (
    <section id="quick-explore" aria-labelledby="quick-explore-title" className={`ds-section p-ds-3 md:p-ds-5 xl:p-ds-6 ${styles.explore}`} data-mode={selectedMode}>
      <div className="mb-ds-3 flex items-start justify-between gap-ds-2">
        <div className="min-w-0">
          <h2 className="text-ds-h3 md:text-ds-h2" id="quick-explore-title">สำรวจเพิ่มเติม</h2>
          <p className="mt-ds-1 text-ds-body-sm text-arn-muted">เลือกประเภทงาน แล้วเลือกแนวที่สนใจ</p>
        </div>
        <HomeViewAllLink href={catalogHref("ทั้งหมด")} title={mode.label} />
      </div>

      <div className="grid grid-cols-3 gap-ds-1 sm:gap-ds-3" role="group" aria-label="เลือกประเภทงาน">
        {modeIds.map((id) => (
          <button
            aria-controls="quick-explore-genres"
            aria-pressed={selectedMode === id}
            className={`${styles.modeButton} flex min-h-11 min-w-0 items-center justify-center gap-ds-1 rounded-ds-md border border-arn-border bg-arn-soft px-ds-1 text-ds-body-sm font-semibold text-arn-muted transition-colors sm:gap-ds-2 sm:px-ds-3`}
            data-mode={id}
            key={id}
            onClick={() => setSelectedMode(id)}
            type="button"
          >
            <FontAwesomeIcon aria-hidden="true" className="h-4 w-4 shrink-0" icon={exploreModes[id].icon} />
            {exploreModes[id].label}
          </button>
        ))}
      </div>

      <div className="mt-ds-4 border-t border-arn-border pt-ds-4" id="quick-explore-genres">
        <h3 aria-live="polite" className={`${styles.genresHeading} mb-ds-3 border-l-2 pl-ds-2 text-ds-body font-semibold`}>
          หมวดแนะนำสำหรับ{mode.label}
        </h3>
        <ul className={`${homeStyles.swipeRow} ${styles.genreList} gap-ds-3 xl:grid xl:grid-cols-4 2xl:grid-cols-6`} key={selectedMode}>
          {mode.genres.map((genre) => {
            const artwork = categoryBooks[genre]?.find((book) => getCatalogBookMode(book) === selectedMode)?.image;
            return (
              <li className="min-w-0" key={genre}>
                <Link className={`${styles.genreLink} ds-card group relative isolate flex h-full min-h-16 items-center gap-ds-2 overflow-hidden p-ds-2 text-ds-body-sm font-medium text-arn-text transition-colors sm:p-ds-3 xl:min-h-32 xl:flex-col xl:items-stretch xl:justify-between xl:text-ds-body`} href={catalogHref(genre)}>
                  {artwork && <Image alt="" className={`${styles.artwork} object-cover object-[center_32%] transition-transform duration-300 motion-safe:group-hover:scale-[1.04]`} fill sizes="(min-width: 1536px) 240px, (min-width: 768px) 25vw, 170px" src={artwork} />}
                  <span aria-hidden="true" className={`relative ${styles.genreIcon} grid h-7 w-7 shrink-0 place-items-center self-center rounded-ds-sm sm:h-8 sm:w-8 xl:self-start`}>
                    <GenreIcon label={genre} />
                  </span>
                  <span className="relative flex min-w-0 flex-1 items-end justify-between gap-ds-2">
                    <span className="min-w-0 break-words">{genre}</span>
                    <FontAwesomeIcon aria-hidden="true" className="mb-ds-1 hidden h-3 w-3 shrink-0 text-arn-subtle sm:block" icon={faChevronRight} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
