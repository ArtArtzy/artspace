"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import BookshelfToggleButton from "@/components/BookshelfToggleButton";
import HomeBannerArt, { type BannerArtSources } from "@/components/HomeBannerArt";
import { homeBanners, type HomeBanner } from "@/data/homeBanners";
import styles from "./HeroCarousel.module.css";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24"><path d={direction === "left" ? "m14.5 5-7 7 7 7" : "m9.5 5 7 7-7 7"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

export type HeroCarouselSlide = HomeBanner & {
  art?: BannerArtSources;
  imageAlt?: string;
  author?: string;
  actionArtId?: string;
  bookmarkTitle?: string;
};

export default function HeroCarousel({ slides = homeBanners, ariaLabel = "เรื่องราวและกิจกรรมแนะนำ" }: {
  slides?: readonly HeroCarouselSlide[];
  ariaLabel?: string;
} = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const descriptionId = useId();
  const activeSlide = slides[activeIndex];
  const reading = Boolean(activeSlide.art);
  const bannerLabel = `${activeSlide.category} · ${activeSlide.title} · ${activeSlide.actionLabel}`;
  const action = (
    <span className={styles.action}>
      <Image alt="" className={styles.actionArt} src={`/images/home-banners/${activeSlide.actionArtId ?? activeSlide.id}-cta.webp`} width={576} height={144} loading="eager" unoptimized />
      <span className={styles.actionLabel}>{activeSlide.actionLabel} <span aria-hidden="true">→</span></span>
    </span>
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setIsPlaying(!reducedMotion.matches);
    updateMotion();
    reducedMotion.addEventListener("change", updateMotion);
    return () => reducedMotion.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!isPlaying || isHovered || isFocused) return;
    const timer = window.setInterval(() => setActiveIndex(current => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [isPlaying, isHovered, isFocused, slides.length]);

  function goTo(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
  }

  return (
    <section
      aria-label={ariaLabel}
      aria-roledescription="สไลด์แบนเนอร์"
      data-home-hero
      data-reading-hero={reading || undefined}
      className={styles.carousel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft") { event.preventDefault(); goTo(activeIndex - 1); }
        if (event.key === "ArrowRight") { event.preventDefault(); goTo(activeIndex + 1); }
      }}
    >
      <div aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">
        <Link href={activeSlide.href} className={reading ? `${styles.banner} ${styles.readingBanner}` : styles.banner} aria-label={bannerLabel} aria-describedby={reading ? descriptionId : undefined} data-hero-slide={activeSlide.id}>
          <HomeBannerArt id={activeSlide.id} alt={activeSlide.imageAlt ?? `${activeSlide.category} · ${activeSlide.title} — ${activeSlide.description}`} className={styles.image} eager sources={activeSlide.art} />
          <h2 className="sr-only">{activeSlide.title}</h2>
          {reading && <p className="sr-only" id={descriptionId}>{activeSlide.description}{activeSlide.author && ` · โดย ${activeSlide.author}`}</p>}
          {action}
        </Link>
      </div>

      {activeSlide.bookmarkTitle && (
        <BookshelfToggleButton className="ds-button-secondary absolute right-ds-4 top-ds-4 z-10 hidden min-h-11 bg-arn-canvas px-ds-4 sm:inline-flex" title={activeSlide.bookmarkTitle} />
      )}

      <button aria-label="สไลด์ก่อนหน้า" className={`${styles.arrow} ${styles.previous}`} onClick={() => goTo(activeIndex - 1)} type="button"><ArrowIcon direction="left" /></button>
      <button aria-label="สไลด์ถัดไป" className={`${styles.arrow} ${styles.next}`} onClick={() => goTo(activeIndex + 1)} type="button"><ArrowIcon direction="right" /></button>

      <div className={styles.controls}>
        <div className={styles.pagination} aria-label="เลือกแบนเนอร์">
          {slides.map((slide, index) => (
            <button aria-label={`แบนเนอร์ ${index + 1} ${slide.title}`} aria-current={index === activeIndex ? "true" : undefined} className={styles.dot} key={slide.id} onClick={() => goTo(index)} type="button" />
          ))}
        </div>
        <button aria-label={isPlaying ? "หยุดการเปลี่ยนแบนเนอร์อัตโนมัติ" : "เปิดการเปลี่ยนแบนเนอร์อัตโนมัติ"} aria-pressed={!isPlaying} className={styles.playback} onClick={() => setIsPlaying(playing => !playing)} type="button">
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            {isPlaying ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="m7 4 14 8-14 8z" />}
          </svg>
        </button>
      </div>
    </section>
  );
}
