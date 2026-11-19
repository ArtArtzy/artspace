"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HomeBannerArt from "@/components/HomeBannerArt";
import { homeBanners } from "@/data/homeBanners";
import styles from "./HeroCarousel.module.css";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24"><path d={direction === "left" ? "m14.5 5-7 7 7 7" : "m9.5 5 7 7-7 7"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

export default function HeroCarousel({ includeDesktopAction = false }: { includeDesktopAction?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const activeSlide = homeBanners[activeIndex];
  const bannerLabel = includeDesktopAction
    ? `${activeSlide.category} · ${activeSlide.title} · ${activeSlide.actionLabel}`
    : `${activeSlide.category} · ${activeSlide.title}`;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setIsPlaying(!reducedMotion.matches);
    updateMotion();
    reducedMotion.addEventListener("change", updateMotion);
    return () => reducedMotion.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!isPlaying || isHovered || isFocused) return;
    const timer = window.setInterval(() => setActiveIndex(current => (current + 1) % homeBanners.length), 6000);
    return () => window.clearInterval(timer);
  }, [isPlaying, isHovered, isFocused]);

  function goTo(index: number) {
    setActiveIndex((index + homeBanners.length) % homeBanners.length);
  }

  return (
    <section
      aria-label="เรื่องราวและกิจกรรมแนะนำ"
      aria-roledescription="สไลด์แบนเนอร์"
      data-home-hero
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
        <Link href={activeSlide.href} className={styles.banner} aria-label={bannerLabel}>
          <HomeBannerArt id={activeSlide.id} alt={`${activeSlide.category} · ${activeSlide.title} — ${activeSlide.description}`} className={styles.image} eager includeDesktopAction={includeDesktopAction} />
          <h2 className="sr-only">{activeSlide.title}</h2>
        </Link>
      </div>

      <button aria-label="สไลด์ก่อนหน้า" className={`${styles.arrow} ${styles.previous}`} onClick={() => goTo(activeIndex - 1)} type="button"><ArrowIcon direction="left" /></button>
      <button aria-label="สไลด์ถัดไป" className={`${styles.arrow} ${styles.next}`} onClick={() => goTo(activeIndex + 1)} type="button"><ArrowIcon direction="right" /></button>

      <div className={styles.controls}>
        <div className={styles.pagination} aria-label="เลือกแบนเนอร์">
          {homeBanners.map((slide, index) => (
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
