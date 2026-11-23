"use client";

import Image from "next/image";
import Link from "next/link";
import { homeRecommendedWriters } from "@/components/writerData";
import { readathonBanner } from "@/data/homeBanners";
import HomeViewAllLink from "@/components/HomeViewAllLink";
import homeStyles from "@/app/GuestHome.module.css";

export function WriterGrid({ showAll = false }: { showAll?: boolean }) {
  return (
    <div className={showAll ? "grid grid-cols-2 gap-ds-3 md:grid-cols-3 xl:grid-cols-6" : `${homeStyles.swipeRow} ${homeStyles.writerGrid} grid-cols-6 gap-3 xl:grid`} id="writers">
      {homeRecommendedWriters.map((writer) => (
        <Link className={`group grid min-w-0 rounded-2xl text-center transition hover:-translate-y-1 ${showAll ? "" : "max-md:border-x max-md:border-transparent max-md:px-ds-1"}`} href={`/writers/${writer.slug}`} key={writer.slug}>
          <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3 transition group-hover:border-[#1ec765]/60 group-hover:bg-[#12231a] group-hover:shadow-[0_12px_30px_rgba(0,0,0,.2)]">
            <div className="relative mx-auto h-[72px] w-[72px] overflow-hidden rounded-full bg-arn-raised">
              <Image alt={`รูปโปรไฟล์ ${writer.name}`} className="rounded-full object-cover" fill sizes="72px" src={writer.image} />
            </div>
            <h3 className="mt-2 truncate text-ds-body font-medium text-white" title={writer.name}>{writer.name}</h3>
            <p className="line-clamp-2 break-words text-ds-body-sm text-arn-muted" title={writer.featuredStory}>{writer.featuredStory}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function CommunitySection() {
  return (
    <section data-home-community aria-label="นักเขียนและชุมชน" className="mx-auto max-w-[1400px] bg-[#0D0F0E] px-2 pb-12 pt-2 text-white">
      <div data-home-community-grid className="grid grid-cols-[minmax(0,2.4fr)_minmax(300px,1fr)] gap-6 border-t border-white/[0.08] pt-6">
        <div className="min-w-0">
          <div className="pt-2">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[21px] font-medium leading-tight">นักเขียนแนะนำ</h2>
              <p className="mt-1 text-[12px] text-white/50">พบกับนักเขียนคุณภาพจากหลากหลายแนว</p>
            </div>
            <HomeViewAllLink href="/writers" title="นักเขียนแนะนำ" />
          </div>
          <WriterGrid />
          </div>
        </div>

        <div data-home-community-promo className="min-w-0 border-l border-white/[0.08] pl-5">
          <Link
            aria-label={`${readathonBanner.actionLabel} ${readathonBanner.title}`}
            className="ds-card group relative grid h-full min-h-80 overflow-hidden transition-colors hover:border-arn-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent xl:min-h-[430px]"
            href={readathonBanner.href}
            id="community"
          >
            <Image alt="" className="object-cover transition duration-700 motion-safe:group-hover:scale-105" fill sizes="(max-width: 1279px) 100vw, 450px" src={`/images/home-banners/${readathonBanner.id}-mobile.webp`} />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-arn-canvas via-arn-canvas/75 to-transparent" />
            <div className="relative self-end p-ds-5 md:p-ds-6">
              <p className="text-ds-body-sm font-medium text-arn-accent-soft">{readathonBanner.category}</p>
              <h3 className="mt-ds-1 text-ds-h2 text-arn-text">{readathonBanner.title}</h3>
              <p className="mt-ds-2 text-ds-body-sm text-arn-muted">{readathonBanner.description}</p>
              <span className="ds-button-primary mt-ds-4 inline-flex min-h-11 items-center gap-ds-2 px-ds-4 text-ds-body-sm font-semibold">
                {readathonBanner.actionLabel} <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
