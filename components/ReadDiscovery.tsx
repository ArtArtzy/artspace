"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryBooks, fanficFandomByCategory, type CategoryBook } from "@/data/categoryBooks";
import type { ReadModeId } from "@/components/ReadSubMenu";
import BookCard from "@/components/BookCard";
import CategoryFilter, { selectableGenreLabels } from "@/components/CategoryFilter";
import { featuredThreadsByMode } from "@/components/CommunityFeed";
import { getCommunityReplyCount } from "@/data/communityReplies";
import useReadingHistory from "@/components/useReadingHistory";
import { findCatalogBook, getCatalogBookMode, getCatalogBooksByMode } from "@/data/novelDetails";
import { isWriterFollowed, subscribeWriterFollows } from "@/data/writer-follows";
import homeStyles from "@/app/GuestHome.module.css";

const modeLabels: Record<ReadModeId, string> = {
  novel: "นิยาย",
  fanfic: "แฟนฟิค",
  cartoon: "การ์ตูน",
};

const modePaths: Record<ReadModeId, string> = {
  novel: "/read",
  fanfic: "/read/fanfic",
  cartoon: "/read/cartoon",
};

const staffPicks: Record<ReadModeId, string[]> = {
  novel: ["The Clockwork Garden", "Lemon Days", "The Starless Archive", "แสงระหว่างบรรทัด", "Blood Moon", "Sky of Tomorrow"],
  fanfic: ["Not Just Friends (BTS)", "Love in Parallel (Harry Potter)", "Our Classroom (SEVENTEEN)", "Kissed by the Stars (TWICE)", "The Villain's Side (Harry Potter)"],
  cartoon: ["การ์ตูนแฟนตาซี: มังกรเหนือเมฆา", "การ์ตูนไซไฟ: นครโฮโลแกรม", "การ์ตูนคอมเมดี้: ปาร์ตี้พันสายรุ้ง", "การ์ตูนลึกลับ: หอนาฬิกาคืนฝน", "การ์ตูนเกิดใหม่: ปราสาทบนฟ้า"],
};

type ReadBook = CategoryBook & { linkTitle?: string; resumeEpisode?: number };

function ReadBookCard({ book, mode, rank }: { book: ReadBook; mode: ReadModeId; rank?: number }) {
  const title = displayBookTitle(book.title, book.category, mode);
  const storyTitle = encodeURIComponent(book.linkTitle ?? book.title);
  const episode = book.resumeEpisode;
  return (
    <BookCard
      ariaLabel={rank ? `อันดับ ${rank} เปิดเรื่อง ${title}` : episode ? `อ่าน ${title} ต่อ ตอนที่ ${episode}` : undefined}
      book={book}
      coverSizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, (max-width: 1399px) 15vw, 200px"
      displayTitle={title}
      href={episode ? `/read/episode?title=${storyTitle}&episode=${episode}&mode=${mode}` : `${modePaths[mode]}?title=${storyTitle}`}
      mode={mode}
      rank={rank}
    >
      {episode && <p className="mt-ds-1 text-ds-body-sm text-arn-accent-soft">อ่านต่อ ตอนที่ {episode}</p>}
    </BookCard>
  );
}

function SectionHeading({ id, title, href }: { id: string; title: string; href?: string }) {
  return (
    <div className="mb-ds-3 flex min-h-8 items-center justify-between gap-ds-3">
      <h2 className="text-ds-h2" id={id}>{title}</h2>
      {href && (
        <Link className="inline-flex min-h-11 shrink-0 items-center gap-ds-2 rounded-ds-sm text-ds-meta font-medium text-arn-accent-soft hover:text-arn-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={href}>
          ดูทั้งหมด <span className="sr-only">{title}</span> <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

function ReadBookSection({ id, title, books, mode, ranked, href, emptyMessage }: {
  id: string;
  title: string;
  books: ReadBook[];
  mode: ReadModeId;
  ranked?: boolean;
  href?: string;
  emptyMessage?: string;
}) {
  return (
    <section aria-labelledby={id}>
      <SectionHeading href={href} id={id} title={title} />
      {books.length > 0 ? (
        <div data-read-book-grid data-read-preview-row={ranked ? undefined : true} className={`${homeStyles.swipeRow} ds-book-grid gap-ds-3 xl:grid`}>
          {books.map((book, index) => (
            <ReadBookCard book={book} key={book.linkTitle ?? book.title} mode={mode} rank={ranked ? index + 1 : undefined} />
          ))}
        </div>
      ) : <p className="text-ds-body-sm text-arn-muted">{emptyMessage ?? "ยังไม่มีเรื่องในหมวดนี้"}</p>}
    </section>
  );
}

function ReadFeaturedThreads({ mode }: { mode: ReadModeId }) {
  return (
    <section aria-labelledby="read-featured-threads">
      <SectionHeading id="read-featured-threads" title="กระทู้เด่น" />
      <ul className="grid gap-ds-3 md:grid-cols-2 xl:grid-cols-5">
        {featuredThreadsByMode[mode].map((post) => (
          <li key={post.slug} className="min-w-0">
            <Link className="ds-card flex h-full flex-col gap-ds-2 p-ds-3 transition-colors hover:border-arn-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={`/community/posts/${post.slug}`}>
              <p className="text-ds-meta text-arn-accent-soft">{post.badge}</p>
              <h3 className="flex-1 break-words text-ds-body font-medium">{post.title}</h3>
              <p className="text-ds-meta text-arn-muted">{post.user} · {getCommunityReplyCount(post.slug)} ความคิดเห็น</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

type SortOption = "popular" | "liked" | "trending" | "newest" | "oldest";

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "popular", label: "ความนิยมสูงสุด" },
  { value: "liked", label: "ถูกใจสูงสุด" },
  { value: "trending", label: "กำลังมาแรง" },
  { value: "newest", label: "ใหม่ล่าสุดก่อน" },
  { value: "oldest", label: "เก่าสุดก่อน" },
];

function BooksHeading({ title, subtitle, value, onChange }: { title: string; subtitle: string; value: SortOption; onChange: (value: SortOption) => void }) {
  return (
    <div data-read-catalog-heading className="mb-3 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-[21px] font-medium leading-tight text-white">{title}</h2>
        <p className="mt-1 text-[12px] text-white/50">{subtitle}</p>
      </div>
      <label className="flex shrink-0 items-center gap-2 text-[11px] text-white/50">
        <span>เรียงตาม</span>
        <select
          aria-label="เรียงรายการตาม"
          className="h-9 min-w-[154px] cursor-pointer rounded-[7px] border border-white/10 bg-[#151a17] px-3 text-[12px] text-white/80 outline-none transition hover:border-[#1ed873]/50 focus:border-[#1ed873] focus:ring-1 focus:ring-[#1ed873]/30"
          onChange={(event) => onChange(event.target.value as SortOption)}
          value={value}
        >
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    </div>
  );
}

function uniqueBooks(books: CategoryBook[], mode: ReadModeId) {
  const seen = new Set<string>();

  return books.filter((book) => {
    const identity = displayBookTitle(book.title, book.category, mode);
    if (seen.has(identity)) return false;
    seen.add(identity);
    return true;
  });
}

function metricValue(metric: string) {
  const value = Number.parseFloat(metric);
  if (metric.endsWith("M")) return value * 1_000_000;
  if (metric.endsWith("K")) return value * 1_000;
  return value;
}

function sortBooks(books: CategoryBook[], option: SortOption) {
  const sorted = [...books];

  if (option === "popular") return sorted.sort((a, b) => metricValue(b.views) - metricValue(a.views));
  if (option === "liked") return sorted.sort((a, b) => metricValue(b.likes) - metricValue(a.likes));
  if (option === "trending") return sorted.sort((a, b) => (metricValue(b.views) + metricValue(b.likes) * 12) - (metricValue(a.views) + metricValue(a.likes) * 12));
  if (option === "newest") return sorted.reverse();
  return sorted;
}

function stripEditionSuffix(title: string) {
  return title.replace(/\s·\s(?:บทพิเศษ|ฤดูใหม่|ความทรงจำอีกด้าน|หลังวันนั้น)$/, "");
}

function displayBookTitle(title: string, category: string, mode: ReadModeId) {
  const prefix = [`${category} · `, `แฟนฟิค${category}: `, `การ์ตูน${category}: `]
    .find((prefix) => title.startsWith(prefix));
  const name = prefix ? title.slice(prefix.length) : title;
  return mode === "cartoon" ? stripEditionSuffix(name) : name;
}

function removeFanficLabel(title: string) {
  return title.replace(/\s*\([^()]+\)\s*$/, "");
}

function getBooksByCategory(category: string, mode: ReadModeId) {
  const sourceBooks = (categoryBooks[category] ?? []).filter((book) => book.category === category);
  const modeBooks = sourceBooks.filter((book) => getCatalogBookMode(book) === mode);
  const books = uniqueBooks(modeBooks.map((book) => {
    const title = stripEditionSuffix(displayBookTitle(book.title, category, mode));
    return {
      ...book,
      title: mode === "fanfic"
        ? `${removeFanficLabel(title)} (${fanficFandomByCategory[category] ?? "Original Universe"})`
        : title,
    };
  }), mode);

  if (mode === "fanfic" || mode === "cartoon" || (category !== "วาย" && category !== "ยูริ") || books.length === 0) return books;

  const expandedBooks = [...books];
  const storyEditions = ["บทพิเศษ", "ฤดูใหม่", "ความทรงจำอีกด้าน", "หลังวันนั้น"];

  while (expandedBooks.length < 72) {
    const extraIndex = expandedBooks.length - books.length;
    const source = books[extraIndex % books.length];
    const edition = storyEditions[Math.floor(extraIndex / books.length) % storyEditions.length];
    const views = 140 + (extraIndex * 37) % 760;
    const likes = 6 + (extraIndex * 1.7) % 28;

    expandedBooks.push({
      ...source,
      title: `${source.title} · ${edition}`,
      episodes: String(14 + (extraIndex * 5) % 38),
      views: `${views}K`,
      likes: `${likes.toFixed(1)}K`,
    });
  }

  return expandedBooks;
}

function Pagination({ pageCount, contentLabel, currentPage, onChange }: { pageCount: number; contentLabel: string; currentPage: number; onChange: (page: number) => void }) {
  return (
    <nav aria-label={`เปลี่ยนหน้า${contentLabel}`} className="flex flex-wrap items-center justify-center gap-ds-2">
      <button className="ds-button-secondary min-h-11 px-ds-3 text-ds-body-sm" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)} type="button">ก่อนหน้า</button>
      <span aria-live="polite" className="text-ds-body-sm text-arn-muted">หน้า {currentPage} / {pageCount}</span>
      <button className="ds-button-secondary min-h-11 px-ds-3 text-ds-body-sm" disabled={currentPage === pageCount} onClick={() => onChange(currentPage + 1)} type="button">ถัดไป</button>
    </nav>
  );
}

const featuredGenreSet = new Set(selectableGenreLabels);
const readModes: ReadModeId[] = ["novel", "fanfic", "cartoon"];

function previewBooks(books: CategoryBook[], mode: ReadModeId, limit = 8) {
  const images = new Set<string>();
  const titles = new Set<string>();
  return books.filter((book) => {
    const title = displayBookTitle(book.title, book.category, mode);
    if (titles.has(title) || images.has(book.image)) return false;
    titles.add(title);
    images.add(book.image);
    return true;
  }).slice(0, limit);
}

const landingBooks = Object.fromEntries(readModes.map((mode) => {
  const catalog = getCatalogBooksByMode(mode).filter((book) => featuredGenreSet.has(book.category));
  const picked = staffPicks[mode].flatMap((title) => findCatalogBook(title, mode) ?? []);
  return [mode, {
    byNewest: sortBooks(catalog, "newest"),
    trending: previewBooks(sortBooks(catalog, "trending"), mode),
    ranking: uniqueBooks(sortBooks(catalog, "popular"), mode).slice(0, 20),
    picked,
  }];
})) as Record<ReadModeId, {
  byNewest: CategoryBook[];
  trending: CategoryBook[];
  ranking: CategoryBook[];
  picked: CategoryBook[];
}>;

const discoveryClass = "mx-auto max-w-[1400px] min-w-0 space-y-ds-8 bg-arn-canvas px-ds-2 pb-ds-12 pt-ds-8 text-arn-text";

function ReadLanding({ mode, isLoggedIn, selectedGenres, onSelectGenres }: {
  mode: ReadModeId;
  isLoggedIn: boolean;
  selectedGenres: string[];
  onSelectGenres: (genres: string[]) => void;
}) {
  const history = useReadingHistory(isLoggedIn);
  const { byNewest, picked, ranking, trending } = landingBooks[mode];
  const [followedBooks, setFollowedBooks] = useState<CategoryBook[]>([]);
  const modePath = modePaths[mode];
  const categoryHref = (category: string) => `${modePath}?category=${encodeURIComponent(category)}#read-discovery`;

  useEffect(() => {
    if (!isLoggedIn) return;
    const syncFollows = () => {
      const writers = new Set(byNewest.map((book) => book.author).filter(isWriterFollowed));
      setFollowedBooks(previewBooks(byNewest.filter((book) => writers.has(book.author)), mode));
    };
    syncFollows();
    return subscribeWriterFollows(syncFollows);
  }, [byNewest, isLoggedIn, mode]);

  return (
    <div className={discoveryClass} id="read-discovery">
      {isLoggedIn && (
        <ReadBookSection books={history.filter((book) => book.readMode === mode).slice(0, 8)} emptyMessage="เรื่องที่คุณเปิดอ่านจะแสดงที่นี่" id="read-continue" mode={mode} title="อ่านต่อ" />
      )}
      <ReadBookSection books={trending} id="read-trending" mode={mode} title="กำลังมาแรง" />
      <ReadBookSection books={ranking} id="read-top-20" mode={mode} ranked title="Top 20" />
      <ReadFeaturedThreads mode={mode} />
      <ReadBookSection books={picked} id="read-staff-picks" mode={mode} title="ทีมงานคัดสรร" />
      {isLoggedIn && (
        <ReadBookSection books={followedBooks} emptyMessage={`ติดตามนักเขียนจากหน้ารายละเอียดเรื่องเพื่อดูผลงาน${modeLabels[mode]}ของพวกเขาที่นี่`} id="read-followed" mode={mode} title="ผลงานจากนักเขียนที่ติดตาม" />
      )}
      <section aria-labelledby="read-genre-picker" id="read-favorites" className="scroll-mt-24">
        <SectionHeading href={categoryHref("ทั้งหมด")} id="read-genre-picker" title="หมวดที่ชื่นชอบ" />
        <CategoryFilter favoritesLabel="เลือกหมวดที่ชื่นชอบ" onSelectGenres={onSelectGenres} selected="" selectedGenres={selectedGenres} />
        <p className="mt-ds-2 text-ds-body-sm text-arn-muted" aria-live="polite">
          {selectedGenres.length > 0 ? `เลือกแล้ว ${selectedGenres.length} หมวด` : "เลือกได้หลายหมวด แล้วเลื่อนลงเพื่อดูเรื่องในแต่ละหมวด"}
        </p>
      </section>
      {selectedGenres.map((category, index) => (
        <ReadBookSection
          books={previewBooks(byNewest.filter((book) => book.category === category), mode)}
          href={categoryHref(category)}
          id={`read-favorite-${index + 1}`}
          key={category}
          mode={mode}
          title={category}
        />
      ))}
    </div>
  );
}

export default function ReadDiscovery({ mode, isLoggedIn, selectedCategory, selectedGenres, onSelectGenres }: {
  mode: ReadModeId;
  isLoggedIn: boolean;
  selectedCategory?: string;
  selectedGenres: string[];
  onSelectGenres: (genres: string[]) => void;
}) {
  if (!selectedCategory) return <ReadLanding isLoggedIn={isLoggedIn} mode={mode} onSelectGenres={onSelectGenres} selectedGenres={selectedGenres} />;
  return <ReadCategoryCatalog category={selectedCategory} key={`${mode}:${selectedCategory}`} mode={mode} />;
}

function ReadCategoryCatalog({ category, mode }: { category: string; mode: ReadModeId }) {
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [catalogPage, setCatalogPage] = useState(1);
  const contentLabel = modeLabels[mode];
  const isAllBooks = category === "ทั้งหมด";
  const catalogBooks = isAllBooks
    ? uniqueBooks([...landingBooks[mode].byNewest].reverse(), mode)
    : getBooksByCategory(category, mode);
  const sortedCatalogBooks = sortBooks(catalogBooks, sortOption);
  const paginationPageCount = Math.max(1, Math.ceil(sortedCatalogBooks.length / 36));
  const activeCatalogPage = Math.min(catalogPage, paginationPageCount);
  const visibleCatalogBooks = sortedCatalogBooks.slice((activeCatalogPage - 1) * 36, activeCatalogPage * 36);

  return (
    <section className={`${discoveryClass} scroll-mt-[224px]`} id="read-discovery">
      <div>
        <Link className="mb-ds-3 inline-flex min-h-11 items-center gap-ds-2 text-ds-body-sm text-arn-accent-soft hover:text-arn-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={`${modePaths[mode]}#read-favorites`}>
          <span aria-hidden="true">←</span> กลับหน้ารวม{contentLabel}
        </Link>
        <BooksHeading
          onChange={(nextSortOption) => {
            setSortOption(nextSortOption);
            setCatalogPage(1);
          }}
          subtitle={isAllBooks ? `รวม${contentLabel}หลากหลายหมวดหมู่ไว้ให้คุณค้นพบ` : `รวม${contentLabel}หมวด${category}ที่คัดมาให้คุณ`}
          title={isAllBooks ? `${contentLabel}ทั้งหมด` : `${contentLabel}${category}`}
          value={sortOption}
        />
        <div data-read-book-grid className="ds-book-grid grid grid-cols-2 gap-x-ds-3 gap-y-ds-6 md:grid-cols-3">
          {visibleCatalogBooks.map((book) => <ReadBookCard book={book} mode={mode} key={book.title} />)}
        </div>
        {visibleCatalogBooks.length === 0 && <p className="text-ds-body-sm text-arn-muted">ยังไม่มีเรื่องในหมวดนี้</p>}
      </div>
      {paginationPageCount > 1 && <Pagination contentLabel={contentLabel} currentPage={activeCatalogPage} onChange={setCatalogPage} pageCount={paginationPageCount} />}
    </section>
  );
}
