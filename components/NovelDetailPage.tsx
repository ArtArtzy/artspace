"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";
import BookshelfToggleButton from "@/components/BookshelfToggleButton";
import type { CategoryBook } from "@/data/categoryBooks";
import type { NovelDetails } from "@/data/novelDetails";
import styles from "./NovelDetailPage.module.css";

type IconName =
  | "book"
  | "eye"
  | "heart"
  | "star"
  | "check"
  | "plus"
  | "search"
  | "calendar"
  | "lock"
  | "list"
  | "link"
  | "chevron"
  | "sparkle"
  | "verified"
  | "close";
const paths: Record<IconName, string> = {
  book: "M12 5v15m0-15C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Z",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.9 6.9-1L12 2Z",
  check: "m5 12 4 4L19 6",
  plus: "M12 4v16M4 12h16",
  search: "m21 21-5-5m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  calendar:
    "M5 3v4m14-4v4M3 10h18M4 5h16a1 1 0 0 1 1 1v14H3V6a1 1 0 0 1 1-1Zm3 9h3m4 0h3m-10 3h3m4 0h3",
  lock: "M6 10h12v11H6V10Zm2 0V6a4 4 0 0 1 8 0v4m-4 4v3",
  list: "M6 3h12l2 2v17H4V3h2Zm1 5h10M7 12h10M7 16h7",
  link: "m10 13 4-4m-6 7-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 1 1-1a4 4 0 0 0-6-6l-4 4a4 4 0 0 0 0 6",
  chevron: "m9 5 7 7-7 7",
  sparkle: "m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z",
  verified:
    "m12 2 3 2 3.5.5.5 3.5 2 4-2 3-.5 3.5-3.5.5-3 2-3-2-3.5-.5-.5-3.5-2-3 2-4 .5-3.5L9 4l3-2Zm-4 9 3 3 5-6",
  close: "m6 6 12 12M6 18 18 6",
};

function Icon({
  name,
  className = "",
  filled = false,
}: {
  name: IconName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <span
      aria-label={`${rating} จาก 5 ดาว`}
      className="inline-flex gap-0.5 text-[var(--arn-status-warning)]"
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Icon
          key={value}
          name="star"
          filled={value <= rating}
          className="!h-4 !w-4"
        />
      ))}
    </span>
  );
}

function Dialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const elements = ref.current?.querySelectorAll<HTMLElement>(
        'button, a[href], input, textarea, select, [tabindex="0"]',
      );
      if (!elements?.length) {
        event.preventDefault();
        return;
      }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === ref.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          document.activeElement === ref.current)
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [onClose]);
  return (
    <div className={styles.dialogOverlay} onClick={onClose}>
      <div
        aria-modal="true"
        aria-labelledby="novel-dialog-title"
        className={`ds-card ${styles.dialog}`}
        role="dialog"
        ref={ref}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-6">
          <h2 className="text-ds-h3" id="novel-dialog-title">
            {title}
          </h2>
          <button
            type="button"
            aria-label="ปิดหน้าต่าง"
            onClick={onClose}
            className="rounded-md p-1 text-arn-muted hover:text-arn-text"
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function BookRow({
  books,
  compact = false,
  mode,
}: {
  books: CategoryBook[];
  compact?: boolean;
  mode: NovelDetails["mode"];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const modePath = {
    novel: "/read",
    fanfic: "/read/fanfic",
    cartoon: "/read/cartoon",
  }[mode];
  return (
    <div className="relative">
      <div
        ref={ref}
        className={`${styles.bookRow} ${compact ? styles.compactBooks : ""}`}
      >
        {books.map((book) => (
          <Link
            href={`${modePath}?title=${encodeURIComponent(book.title)}`}
            className={`group ${styles.bookCard}`}
            key={book.title}
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-ds-md border border-arn-border">
              <Image
                src={book.image}
                alt={`ปกเรื่อง ${book.title}`}
                fill
                sizes={compact ? "90px" : "(min-width: 1200px) 180px, 150px"}
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <h3 className="book-card-title mt-2 truncate group-hover:text-arn-accent-soft">
              {book.title}
            </h3>
            <p className="mt-1 text-ds-caption text-arn-subtle">
              {book.category}
            </p>
          </Link>
        ))}
      </div>
      {!compact && books.length > 4 && (
        <>
          <button
            className={`${styles.carouselButton} ${styles.carouselPrevious}`}
            aria-label="ดูนิยายก่อนหน้า"
            onClick={() =>
              ref.current?.scrollBy({
                left: -(ref.current.clientWidth + 20),
                behavior: "smooth",
              })
            }
          >
            <Icon name="chevron" className="rotate-180" />
          </button>
          <button
            className={`${styles.carouselButton} ${styles.carouselNext}`}
            aria-label="ดูนิยายถัดไป"
            onClick={() =>
              ref.current?.scrollBy({
                left: ref.current.clientWidth + 20,
                behavior: "smooth",
              })
            }
          >
            <Icon name="chevron" />
          </button>
        </>
      )}
    </div>
  );
}

type Review = {
  name: string;
  avatar: string;
  text: string;
  rating: number;
  time: string;
};
const initialReviews: Review[] = [
  {
    name: "นักอ่านคนหนึ่ง",
    avatar: "/images/writers/purplemoon.webp",
    text: "ชอบการเล่าเรื่องมากค่ะ รายละเอียดเล็ก ๆ ในตอนแรกกลับมามีความหมายในตอนหลัง อ่านแล้วอยากรู้ต่อว่าตัวละครจะเลือกทางไหน",
    rating: 5,
    time: "2 สัปดาห์ที่แล้ว",
  },
  {
    name: "moonlight",
    avatar: "/images/writers/moonlit.webp",
    text: "ภาษาสวยและเห็นภาพชัดมาก ตัวละครมีเหตุผลของตัวเอง แนะนำให้ลองอ่านสักสามตอน แล้วจะวางไม่ลงครับ",
    rating: 5,
    time: "1 สัปดาห์ที่แล้ว",
  },
];

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("th-TH-u-ca-gregory", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function NovelDetailPage({ novel }: { novel: NovelDetails }) {
  const router = useRouter();
  const [tab, setTab] = useState<"episodes" | "about" | "reviews">("episodes");
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [episode, setEpisode] = useState<
    NovelDetails["episodes"][number] | null
  >(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [notice, setNotice] = useState("");
  const closeEpisode = useCallback(() => setEpisode(null), []);
  const closeReview = useCallback(() => setReviewOpen(false), []);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const stateKey = `arnspace-novel:${novel.storageTitle}`;

  useEffect(() => {
    setLiked(readStored<boolean>(`${stateKey}:liked`, false) === true);
    setFollowed(
      readStored<boolean>(`arnspace-follow-writer:${novel.author}`, false) ===
        true,
    );
    const saved = readStored<unknown>(`${stateKey}:reviews`, []);
    if (Array.isArray(saved))
      setUserReviews(
        saved.filter(
          (item): item is Review =>
            typeof item?.text === "string" &&
            typeof item?.name === "string" &&
            typeof item?.rating === "number" &&
            typeof item?.avatar === "string" &&
            typeof item?.time === "string",
        ),
      );
    if (window.location.hash === "#reader-reviews") setTab("reviews");
  }, [stateKey, novel.author]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const save = (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      setNotice(
        "เบราว์เซอร์ไม่อนุญาตให้บันทึกข้อมูล การเปลี่ยนแปลงจะอยู่ในหน้านี้เท่านั้น",
      );
    }
  };
  const allReviews = [...userReviews, ...initialReviews];
  const filteredEpisodes = novel.episodes
    .filter((item) => `${item.number} ${item.title}`.includes(search.trim()))
    .sort((a, b) =>
      sort === "latest" ? b.number - a.number : a.number - b.number,
    );
  const visibleEpisodes =
    showAll || search ? filteredEpisodes : filteredEpisodes.slice(0, 7);
  const continueEpisode = novel.episodes.find(
    (item) => item.number === novel.continueEpisode,
  )!;
  const openEpisode = (item: NovelDetails["episodes"][number]) => {
    if (item.locked) {
      setEpisode(item);
      return;
    }
    const params = new URLSearchParams({
      title: novel.storageTitle,
      episode: String(item.number),
      mode: novel.mode,
    });
    router.push(`/read/episode?${params.toString()}`);
  };
  const reviewCount = novel.reviewCount + userReviews.length;
  const statusLabel = novel.status === "ongoing" ? "กำลังเขียน" : "จบแล้ว";
  const authorBooks = novel.authorBooks.length
    ? novel.authorBooks
    : novel.relatedBooks;
  const contentLabel = {
    novel: "นิยาย",
    fanfic: "แฟนฟิค",
    cartoon: "การ์ตูน",
  }[novel.mode];
  const contentPath = {
    novel: "/read",
    fanfic: "/read/fanfic",
    cartoon: "/read/cartoon",
  }[novel.mode];

  const showReviews = () => {
    setTab("reviews");
    requestAnimationFrame(() =>
      reviewsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
    );
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("คัดลอกลิงก์เรื่องนี้แล้ว");
    } catch {
      setNotice("คัดลอกลิงก์ไม่ได้ กรุณาคัดลอก URL จากแถบที่อยู่");
    }
  };
  const share = (network: "line" | "x" | "facebook") => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `${novel.title} — มาอ่านด้วยกันที่ ARN SPACE`,
    );
    const destinations = {
      line: `https://social-plugins.line.me/lineit/share?url=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    window.open(
      destinations[network],
      "_blank",
      "noopener,noreferrer,width=640,height=600",
    );
  };

  return (
    <main className={`ds-page-shell min-h-screen pt-[82px] ${styles.page}`}>
      <TopMenu fixed activeReadMode={novel.mode} />
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src={novel.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
          preload
        />
        <div className={styles.backdropShade} />
      </div>
      <UnbuiltPageGuard>
        <div className={styles.body}>
          <nav
            aria-label="เส้นทางนำทาง"
            className="mb-8 flex flex-wrap items-center gap-3 text-ds-meta text-arn-muted"
          >
            <Link href="/">หน้าแรก</Link>
            <Icon name="chevron" className="!h-3 !w-3" />
            <Link href="/read">นิยาย</Link>
            <Icon name="chevron" className="!h-3 !w-3" />
            <Link href={`/read?category=${encodeURIComponent(novel.category)}`}>
              {novel.category}
            </Link>
            <Icon name="chevron" className="!h-3 !w-3" />
            <span aria-current="page" className="text-arn-text">
              {novel.title}
            </span>
          </nav>
          <div className={styles.grid}>
            <div className="min-w-0 space-y-5">
              <section className={styles.hero} aria-labelledby="novel-title">
                <div className={styles.cover}>
                  <Image
                    src={novel.image}
                    alt={`ปกนิยาย ${novel.title}`}
                    fill
                    sizes="(min-width: 1200px) 280px, 240px"
                    className="object-cover"
                    preload
                  />
                </div>
                <div className="flex min-w-0 flex-col items-start justify-center py-2">
                  <span className={styles.status}>{statusLabel}</span>
                  <h1 id="novel-title" className={styles.heroHeading}>
                    {novel.title}
                  </h1>
                  {novel.subtitle && (
                    <p className={styles.subtitle}>{novel.subtitle}</p>
                  )}
                  <Link
                    href={`/writers/${novel.authorSlug}`}
                    className="mt-3 inline-flex items-center gap-2 text-ds-body text-arn-muted"
                  >
                    โดย{" "}
                    <span className="font-medium text-arn-text">
                      {novel.author}
                    </span>
                    <Icon
                      name="verified"
                      className="!h-4 !w-4 text-arn-accent"
                    />
                  </Link>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      novel.category,
                      novel.category === "แฟนตาซี" ? "ผจญภัย" : "ดราม่า",
                      "Coming of Age",
                    ].map((genre) => (
                      <span className="ds-chip px-3 text-ds-meta" key={genre}>
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className={styles.stats}>
                    <button type="button" onClick={showReviews}>
                      <Icon
                        name="star"
                        filled
                        className="text-[var(--arn-status-warning)]"
                      />
                      <span>
                        <strong>{novel.rating}</strong>
                        <small>({reviewCount} รีวิว)</small>
                      </span>
                    </button>
                    <div>
                      <Icon name="eye" />
                      <span>
                        <strong>{novel.views}</strong>
                        <small>อ่าน</small>
                      </span>
                    </div>
                    <div>
                      <Icon
                        name="heart"
                        filled
                        className="text-[var(--arn-status-danger)]"
                      />
                      <span>
                        <strong>{novel.likes}</strong>
                        <small>คนเก็บเรื่องนี้</small>
                      </span>
                    </div>
                  </div>
                  <p className="mt-6 text-ds-body-sm text-arn-muted">
                    {novel.episodes.length} ตอน{" "}
                    <span className="mx-2 text-arn-faint">•</span>
                    {novel.status === "ongoing"
                      ? "อัปเดตล่าสุด 2 วันที่แล้ว"
                      : "จบครบทุกตอน พร้อมอ่าน"}
                  </p>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className="ds-button-primary gap-2 px-5 shadow-ds-glow"
                      onClick={() => openEpisode(continueEpisode)}
                    >
                      <Icon name="book" />
                      อ่านต่อ ตอนที่ {novel.continueEpisode}
                    </button>
                    <BookshelfToggleButton
                      title={novel.storageTitle}
                      icon={<Icon name="plus" />}
                      className="ds-button-secondary gap-2 px-3"
                    />
                    <button
                      type="button"
                      className="ds-button-secondary px-3"
                      aria-label={
                        liked ? "ยกเลิกถูกใจเรื่องนี้" : "ถูกใจเรื่องนี้"
                      }
                      aria-pressed={liked}
                      onClick={() => {
                        setLiked(!liked);
                        save(`${stateKey}:liked`, !liked);
                      }}
                    >
                      <Icon
                        name="heart"
                        filled={liked}
                        className={
                          liked ? "text-[var(--arn-status-danger)]" : ""
                        }
                      />
                    </button>
                  </div>
                  <div className="mt-3 w-60">
                    <progress
                      value={68}
                      max={100}
                      aria-label="ความคืบหน้าตอนที่อ่านล่าสุด"
                      className={styles.progress}
                    />
                    <p className="mt-1 text-ds-caption text-arn-subtle">
                      อ่านล่าสุด: ตอนที่{" "}
                      {Math.max(1, novel.continueEpisode - 1)} · 68%
                    </p>
                  </div>
                </div>
              </section>

              <section className={`ds-card ${styles.card} p-6`}>
                <h2 className="mb-4 flex items-center gap-3 text-ds-h3">
                  <Icon
                    name="sparkle"
                    className="text-[var(--arn-status-warning)]"
                  />
                  เรื่องย่อ
                </h2>
                <p
                  className={`text-ds-body leading-7 text-arn-muted ${expanded ? "" : "line-clamp-3"}`}
                >
                  {novel.synopsis}
                </p>
                {expanded && (
                  <p className="mt-3 text-ds-body leading-7 text-arn-muted">
                    บางการเดินทางไม่ได้เปลี่ยนเพียงปลายทาง
                    แต่เปลี่ยนคนที่ออกเดินทางด้วย เรื่องราวของคำสัญญา การสูญเสีย
                    และความหวังที่ยังเปล่งแสงแม้ในคืนที่มืดที่สุด
                  </p>
                )}
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 text-ds-body-sm font-medium text-section-novel"
                  aria-expanded={expanded}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "อ่านน้อยลง" : "อ่านเพิ่มเติม"}
                  <Icon
                    name="chevron"
                    className={`!h-3 !w-3 ${expanded ? "-rotate-90" : "rotate-90"}`}
                  />
                </button>
                <div className="mt-4 flex flex-wrap gap-2">
                  {novel.tags.map((tag) => (
                    <Link
                      className={styles.tag}
                      href={`/read?tag=${encodeURIComponent(tag)}`}
                      key={tag}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <div className={styles.ageNotice}>
                  <strong className={styles.ageBadge}>{novel.ageRating}</strong>
                  <div>
                    <h3 className="text-ds-body-sm font-medium">
                      เหมาะสำหรับ {novel.ageRating}
                    </h3>
                    <p className="mt-1 text-ds-meta text-arn-muted">
                      มีเนื้อหาเกี่ยวกับความรุนแรง ความสูญเสีย และประเด็นอ่อนไหว
                    </p>
                  </div>
                </div>
              </section>

              <div
                ref={reviewsRef}
                id="reader-reviews"
                className={styles.tabSection}
              >
                <div
                  role="tablist"
                  aria-label="ข้อมูลนิยาย"
                  className={styles.tabs}
                >
                  {(
                    [
                      {
                        id: "episodes",
                        label: `ตอนทั้งหมด ${novel.episodes.length}`,
                      },
                      { id: "about", label: "เกี่ยวกับเรื่อง" },
                      { id: "reviews", label: `รีวิว ${reviewCount}` },
                    ] as const
                  ).map((item, index) => (
                    <button
                      key={item.id}
                      role="tab"
                      type="button"
                      id={`novel-tab-${item.id}`}
                      aria-selected={tab === item.id}
                      aria-controls={`novel-panel-${item.id}`}
                      tabIndex={tab === item.id ? 0 : -1}
                      className={tab === item.id ? styles.activeTab : ""}
                      onClick={() => setTab(item.id)}
                      onKeyDown={(event) => {
                        if (
                          !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                            event.key,
                          )
                        )
                          return;
                        event.preventDefault();
                        const ids = ["episodes", "about", "reviews"] as const;
                        const next =
                          event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? 2
                              : (index + (event.key === "ArrowRight" ? 1 : 2)) %
                                3;
                        setTab(ids[next]);
                        document
                          .getElementById(`novel-tab-${ids[next]}`)
                          ?.focus();
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div
                  role="tabpanel"
                  id={`novel-panel-${tab}`}
                  aria-labelledby={`novel-tab-${tab}`}
                  tabIndex={0}
                  className="mt-4 space-y-4"
                >
                  {tab === "episodes" && (
                    <>
                      <section
                        className={`ds-card ${styles.card} flex flex-wrap items-center gap-5 p-5`}
                      >
                        <Image
                          src={novel.image}
                          alt=""
                          width={56}
                          height={84}
                          className="rounded-md object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <h2 className="text-ds-body font-medium">
                            อ่านต่อจากที่ค้างไว้
                          </h2>
                          <p className="mt-1 text-ds-meta text-arn-muted">
                            ตอนที่ {Math.max(1, novel.continueEpisode - 1)} ·{" "}
                            {
                              novel.episodes.find(
                                (item) =>
                                  item.number ===
                                  Math.max(1, novel.continueEpisode - 1),
                              )?.title
                            }
                          </p>
                          <div className="mt-3 flex items-center gap-3">
                            <progress
                              value={68}
                              max={100}
                              aria-label="อ่านแล้ว 68 เปอร์เซ็นต์"
                              className={styles.progress}
                            />
                            <span className="text-ds-meta text-arn-muted">
                              68%
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ds-button-secondary min-h-11 px-6 text-arn-accent shadow-ds-glow"
                          onClick={() => openEpisode(continueEpisode)}
                        >
                          อ่านต่อ ตอนที่ {novel.continueEpisode}
                        </button>
                      </section>
                      <section
                        className={`ds-card ${styles.card} overflow-hidden`}
                      >
                        <div className={styles.episodeToolbar}>
                          <h2 className="flex items-center gap-2 text-ds-h3">
                            <Icon
                              name="sparkle"
                              className="!h-4 !w-4 text-[var(--arn-status-warning)]"
                            />
                            ตอนทั้งหมด
                          </h2>
                          <label className="ds-input flex items-center gap-2 px-3 py-2">
                            <Icon
                              name="search"
                              className="!h-4 !w-4 text-arn-subtle"
                            />
                            <input
                              aria-label="ค้นหาชื่อตอนหรือเลขตอน"
                              placeholder="ค้นหาตอน..."
                              value={search}
                              onChange={(event) =>
                                setSearch(event.target.value)
                              }
                              className="w-full min-w-0 bg-transparent text-ds-meta outline-none"
                            />
                          </label>
                          <select
                            aria-label="เรียงลำดับตอน"
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                            className="ds-input px-3 py-2 text-ds-meta"
                          >
                            <option value="latest">เรียง: ล่าสุด</option>
                            <option value="first">เรียง: ตอนแรก</option>
                          </select>
                        </div>
                        <ol className="px-5">
                          {visibleEpisodes.map((item) => (
                            <li key={item.number} className={styles.episodeRow}>
                              <span className="text-ds-meta text-arn-muted">
                                {item.number}
                              </span>
                              <button
                                type="button"
                                onClick={() => openEpisode(item)}
                                className="flex min-w-0 items-center gap-3 text-left text-ds-body-sm hover:text-arn-accent-soft"
                              >
                                <span className="truncate">{item.title}</span>
                                {item.isNew && (
                                  <span className={styles.newBadge}>ใหม่</span>
                                )}
                              </button>
                              <time
                                dateTime={item.date}
                                className="text-ds-caption text-arn-subtle"
                              >
                                {formatDate(item.date)}
                              </time>
                              <span
                                aria-label={
                                  item.locked
                                    ? "ตอนล่วงหน้า ยังไม่เปิดให้อ่าน"
                                    : "เปิดให้อ่านแล้ว"
                                }
                              >
                                <Icon
                                  name={item.locked ? "lock" : "check"}
                                  className={`!h-4 !w-4 ${item.locked ? "text-arn-subtle" : "text-section-novel"}`}
                                />
                              </span>
                              <button
                                type="button"
                                aria-label={`ดูตอนที่ ${item.number}: ${item.title}`}
                                className="px-2 text-arn-subtle hover:text-arn-text"
                                onClick={() => openEpisode(item)}
                              >
                                •••
                              </button>
                            </li>
                          ))}
                        </ol>
                        {!visibleEpisodes.length && (
                          <p className="p-8 text-center text-ds-body-sm text-arn-muted">
                            ไม่พบตอนที่ตรงกับ “{search}”
                            ลองค้นหาด้วยเลขตอนหรือคำอื่น
                          </p>
                        )}
                        {!search && filteredEpisodes.length > 7 && (
                          <button
                            type="button"
                            className="w-full border-t border-arn-border py-3 text-ds-meta text-section-novel hover:bg-arn-raised"
                            aria-expanded={showAll}
                            onClick={() => setShowAll(!showAll)}
                          >
                            {showAll
                              ? "แสดงน้อยลง"
                              : `ดูตอนทั้งหมด ${novel.episodes.length} ตอน`}
                          </button>
                        )}
                      </section>
                    </>
                  )}
                  {tab === "about" && (
                    <section className={`ds-card ${styles.card} p-6`}>
                      <h2 className="text-ds-h3">เกี่ยวกับ {novel.title}</h2>
                      <p className="mt-4 text-ds-body leading-7 text-arn-muted">
                        {novel.synopsis}
                      </p>
                      <dl className="mt-6 grid grid-cols-2 gap-5 text-ds-body-sm">
                        <div>
                          <dt className="text-arn-subtle">ผู้เขียน</dt>
                          <dd className="mt-1">{novel.author}</dd>
                        </div>
                        <div>
                          <dt className="text-arn-subtle">ประเภท</dt>
                          <dd className="mt-1">{novel.category}</dd>
                        </div>
                        <div>
                          <dt className="text-arn-subtle">สถานะ</dt>
                          <dd className="mt-1 text-section-novel">
                            {statusLabel}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-arn-subtle">เผยแพร่ล่าสุด</dt>
                          <dd className="mt-1">
                            {formatDate(novel.episodes[0].date)}
                          </dd>
                        </div>
                      </dl>
                      <p className="mt-6 border-t border-arn-border pt-5 text-ds-body-sm text-arn-subtle">
                        ผลงานต้นฉบับสงวนลิขสิทธิ์โดย {novel.author}{" "}
                        กรุณาไม่คัดลอกหรือเผยแพร่ซ้ำโดยไม่ได้รับอนุญาต
                      </p>
                    </section>
                  )}
                  {tab === "reviews" && (
                    <section className={`ds-card ${styles.card} p-6`}>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h2 className="text-ds-h3">เสียงจากนักอ่าน</h2>
                          <div className="mt-3 flex items-center gap-3">
                            <span className="text-ds-h1">{novel.rating}</span>
                            <Stars />
                            <span className="text-ds-meta text-arn-muted">
                              จาก {reviewCount} รีวิว
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ds-button-secondary px-4"
                          onClick={() => setReviewOpen(true)}
                        >
                          เขียนรีวิว
                        </button>
                      </div>
                      {allReviews.map((review, index) => (
                        <ReviewItem
                          key={`${review.name}-${index}`}
                          review={review}
                        />
                      ))}
                    </section>
                  )}
                </div>
              </div>

              {authorBooks.length > 0 && (
                <section className={`ds-card ${styles.card} p-6`}>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="flex items-center gap-3 text-ds-h3">
                      <Icon
                        name="sparkle"
                        className="text-[var(--arn-status-warning)]"
                      />
                      {novel.authorBooks.length
                        ? `${contentLabel}เรื่องอื่นของนักเขียน`
                        : `${contentLabel}ที่คัดมาให้คุณ`}
                    </h2>
                    <Link
                      href={
                        novel.authorBooks.length
                          ? `/writers/${novel.authorSlug}`
                          : `${contentPath}?category=${encodeURIComponent(novel.category)}`
                      }
                      className="sidebar-link inline-flex items-center gap-1 text-section-novel"
                    >
                      ดูทั้งหมด
                      <Icon name="chevron" className="!h-3 !w-3" />
                    </Link>
                  </div>
                  <BookRow books={authorBooks} mode={novel.mode} />
                </section>
              )}
            </div>

            <aside
              className={styles.sidebar}
              aria-label="ข้อมูลเพิ่มเติมของนิยาย"
            >
              <section className={`ds-card ${styles.card} p-5`}>
                <h2 className="sidebar-title mb-5">เกี่ยวกับนักเขียน</h2>
                <div className="flex items-center gap-4">
                  <Image
                    src={novel.authorAvatar}
                    alt={`รูปโปรไฟล์ ${novel.author}`}
                    width={76}
                    height={76}
                    className="rounded-full border-2 border-[var(--arn-status-warning)] object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 text-ds-body font-medium">
                      {novel.author}
                      <Icon
                        name="verified"
                        className="!h-4 !w-4 text-arn-accent"
                      />
                    </h3>
                    <p className="mt-2 text-ds-meta text-arn-muted">
                      {novel.authorWorks} เรื่อง · ผู้ติดตาม{" "}
                      {novel.authorFollowers}
                    </p>
                  </div>
                </div>
                <p className="sidebar-body my-5 text-arn-muted">
                  {novel.authorBio}
                </p>
                <button
                  type="button"
                  aria-pressed={followed}
                  className="ds-button-secondary w-full gap-2 text-arn-accent"
                  onClick={() => {
                    setFollowed(!followed);
                    save(`arnspace-follow-writer:${novel.author}`, !followed);
                  }}
                >
                  {followed && <Icon name="check" className="!h-4 !w-4" />}
                  {followed ? "กำลังติดตาม" : "ติดตาม"}
                </button>
                <Link
                  href={`/writers/${novel.authorSlug}`}
                  className="mt-4 flex justify-center gap-1 text-ds-meta font-medium text-section-novel"
                >
                  ดูผลงานทั้งหมด
                  <Icon name="chevron" className="!h-4 !w-4" />
                </Link>
              </section>
              <section className={`ds-card ${styles.card} p-5`}>
                <h2 className="sidebar-title mb-5">ข้อมูลเพิ่มเติม</h2>
                <dl className="space-y-4">
                  {(
                    [
                      { icon: "list", label: "สถานะ", value: statusLabel },
                      {
                        icon: "calendar",
                        label: "อัปเดต",
                        value:
                          novel.status === "ongoing"
                            ? "ทุกอังคารและศุกร์"
                            : "จบครบทุกตอน",
                      },
                      {
                        icon: "book",
                        label: "จำนวนตอน",
                        value: `${novel.episodes.length} ตอน`,
                      },
                      {
                        icon: "eye",
                        label: "ยอดอ่าน",
                        value: `${novel.views} ครั้ง`,
                      },
                      {
                        icon: "heart",
                        label: "คนเก็บเรื่องนี้",
                        value: `${novel.likes} คน`,
                      },
                      {
                        icon: "star",
                        label: "คะแนนเฉลี่ย",
                        value: `${novel.rating} จาก ${reviewCount} รีวิว`,
                      },
                    ] as const
                  ).map((item, index) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 text-ds-meta"
                    >
                      <Icon
                        name={item.icon}
                        className="!h-4 !w-4 text-arn-muted"
                      />
                      <dt className="text-arn-muted">{item.label}</dt>
                      <dd
                        className={`ml-auto text-right ${index === 0 ? "text-section-novel" : "text-arn-text"}`}
                      >
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
              <section className={`ds-card ${styles.card} p-5`}>
                <h2 className="sidebar-title mb-4">แชร์เรื่องนี้</h2>
                <div className="flex gap-4">
                  <button
                    type="button"
                    aria-label="แชร์ผ่าน LINE"
                    className={styles.shareButton}
                    onClick={() => share("line")}
                  >
                    LINE
                  </button>
                  <button
                    type="button"
                    aria-label="แชร์ผ่าน X"
                    className={styles.shareButton}
                    onClick={() => share("x")}
                  >
                    <span className="text-xl">𝕏</span>
                  </button>
                  <button
                    type="button"
                    aria-label="แชร์ผ่าน Facebook"
                    className={styles.shareButton}
                    onClick={() => share("facebook")}
                  >
                    <span className="text-xl font-semibold">f</span>
                  </button>
                  <button
                    type="button"
                    aria-label="คัดลอกลิงก์นิยาย"
                    className={styles.shareButton}
                    onClick={copyLink}
                  >
                    <Icon name="link" />
                  </button>
                </div>
              </section>
              <section className={`ds-card ${styles.card} p-5`}>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="sidebar-title">เสียงจากนักอ่าน</h2>
                  <button
                    type="button"
                    onClick={showReviews}
                    className="sidebar-link text-section-novel"
                  >
                    ดูรีวิวทั้งหมด ›
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-ds-h1">{novel.rating}</span>
                  <Stars />
                  <span className="text-ds-caption text-arn-muted">
                    จาก {reviewCount} รีวิว
                  </span>
                </div>
                {allReviews.slice(0, 2).map((review, index) => (
                  <ReviewItem key={index} review={review} compact />
                ))}
                <button
                  type="button"
                  className="ds-button-secondary mt-4 w-full text-arn-accent"
                  onClick={() => setReviewOpen(true)}
                >
                  เขียนรีวิว
                </button>
              </section>
              {novel.relatedBooks.length > 0 && (
                <section className={`ds-card ${styles.card} p-4`}>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h2 className="sidebar-title">ถ้าชอบเรื่องนี้ คุณอาจชอบ</h2>
                    <Link
                      href={`/read?category=${encodeURIComponent(novel.category)}`}
                      className="sidebar-link shrink-0 text-section-novel"
                    >
                      ดูทั้งหมด ›
                    </Link>
                  </div>
                  <BookRow
                    books={novel.relatedBooks.slice(0, 4)}
                    compact
                    mode={novel.mode}
                  />
                </section>
              )}
            </aside>
          </div>
        </div>
        <Footer />
      </UnbuiltPageGuard>
      <div
        aria-live="polite"
        role="status"
        className={notice ? styles.toast : "sr-only"}
      >
        {notice}
      </div>
      {episode && (
        <Dialog
          title={`ตอนที่ ${episode.number} · ${episode.title}`}
          onClose={closeEpisode}
        >
          <div className="text-center">
            <Icon
              name="lock"
              className="mx-auto !h-10 !w-10 text-[var(--arn-status-warning)]"
            />
            <p className="mt-4 text-ds-body">ตอนนี้ยังไม่เปิดให้อ่าน</p>
            <p className="mt-2 text-ds-body-sm text-arn-muted">
              นักเขียนกำลังเตรียมตอนนี้ให้สมบูรณ์ ติดตามเรื่องไว้เพื่อกลับมาอ่านเมื่อเปิดเผยแพร่
            </p>
            <button
              type="button"
              className="ds-button-primary mt-6 px-6"
              onClick={() => setEpisode(null)}
            >
              กลับไปหน้ารายละเอียด
            </button>
          </div>
        </Dialog>
      )}      {reviewOpen && (
        <Dialog title="เขียนรีวิวเรื่องนี้" onClose={closeReview}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!reviewText.trim()) return;
              const next = [
                {
                  name: "คุณ",
                  avatar: "/images/profile-arn.webp",
                  text: reviewText.trim(),
                  rating: reviewRating,
                  time: "เมื่อสักครู่",
                },
                ...userReviews,
              ];
              setUserReviews(next);
              save(`${stateKey}:reviews`, next);
              setReviewText("");
              setReviewOpen(false);
              setNotice("บันทึกรีวิวของคุณในเบราว์เซอร์นี้แล้ว");
            }}
          >
            <p className="text-ds-body-sm text-arn-muted">{novel.title}</p>
            <fieldset className="my-5">
              <legend className="mb-3 text-ds-body-sm">
                คุณให้เรื่องนี้กี่ดาว?
              </legend>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={reviewRating === rating}
                      onChange={() => setReviewRating(rating)}
                      className="peer sr-only"
                    />
                    <span className="block rounded-md p-1 text-[var(--arn-status-warning)] peer-focus-visible:ring-2 peer-focus-visible:ring-arn-accent">
                      <Icon
                        name="star"
                        filled={rating <= reviewRating}
                        className="!h-7 !w-7"
                      />
                    </span>
                    <span className="sr-only">{rating} ดาว</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label htmlFor="novel-review" className="text-ds-body-sm">
              แบ่งปันความรู้สึกหลังอ่าน
            </label>
            <textarea
              id="novel-review"
              required
              minLength={5}
              maxLength={1000}
              rows={5}
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              placeholder="ชอบอะไรในเรื่องนี้? หลีกเลี่ยงการสปอยล์เนื้อหาสำคัญนะครับ"
              className="ds-input mt-2 w-full resize-y p-3 text-ds-body-sm"
            />
            <p className="mt-1 text-right text-ds-caption text-arn-subtle">
              {reviewText.length}/1,000
            </p>
            <button type="submit" className="ds-button-primary mt-5 w-full">
              บันทึกรีวิว
            </button>
          </form>
        </Dialog>
      )}
    </main>
  );
}

function ReviewItem({
  review,
  compact = false,
}: {
  review: Review;
  compact?: boolean;
}) {
  return (
    <article className="mt-5 flex gap-3 border-t border-arn-border pt-5">
      <Image
        src={review.avatar}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <h3 className="sidebar-item-title">{review.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Stars rating={review.rating} />
          <span className="text-ds-caption text-arn-subtle">
            · {review.time}
          </span>
        </div>
        <p
          className={`sidebar-body mt-2 text-arn-muted ${compact ? "line-clamp-3" : ""}`}
        >
          “{review.text}”
        </p>
      </div>
    </article>
  );
}
