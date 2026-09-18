"use client";

import Image from "next/image";
import Link from "next/link";
import { recommendedWriters } from "@/components/writerData";

const exploreCategories = [
  { image: "/images/category-novel.webp", title: "นิยาย", description: "เรื่องราวจินตนาการหลากหลายแนว\nจากนักเขียนอิสระ", action: "เข้าสู่หมวดนิยาย", href: "/read" },
  { image: "/images/category-fanfic.webp", title: "แฟนฟิค", description: "ต่อยอดเรื่องราวที่คุณรัก\nด้วยมุมมองใหม่", action: "เข้าสู่หมวดแฟนฟิค", href: "/read/fanfic" },
  { image: "/images/category-cartoon.webp", title: "การ์ตูน", description: "โลกแห่งภาพเล่าเรื่อง\nที่พาคุณออกเดินทาง", action: "เข้าสู่หมวดการ์ตูน", href: "/read/cartoon" },
];

export default function CommunitySection() {
  return (
    <section aria-label="นักเขียนและชุมชน" className="mx-auto max-w-[1400px] bg-[#0D0F0E] px-2 pb-12 pt-2 text-white">
      <div className="grid grid-cols-[minmax(0,2.4fr)_minmax(300px,1fr)] gap-6 border-t border-white/[0.08] pt-6">
        <div className="min-w-0">
          <div className="mb-8">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[21px] font-medium leading-tight">สำรวจเพิ่มเติม</h2>
                <p className="mt-1 text-[12px] text-white/50">ค้นพบเรื่องราวในแบบที่เป็นคุณ</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {exploreCategories.map((category) => (
                <Link
                  className="group relative h-[140px] overflow-hidden rounded-[9px] border border-[#1eb55d] bg-[#101512] shadow-[0_0_0_1px_rgba(33,194,98,.1),0_8px_18px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:border-[#4af58c]"
                  href={category.href}
                  key={category.title}
                >
                  <Image alt="" className="object-cover object-[center_44%] transition duration-700 group-hover:scale-[1.03]" fill sizes="(max-width: 1400px) 33vw, 467px" src={category.image} />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,6,.9)_0%,rgba(4,8,6,.64)_42%,rgba(4,8,6,.1)_100%)]" />
                  <div className="relative z-10 flex h-full max-w-[230px] flex-col items-start px-5 py-4 text-white">
                    <h3 className="text-[23px] font-medium leading-none tracking-tight">{category.title}</h3>
                    <p className="mt-2 whitespace-pre-line text-[12px] leading-[1.4] text-white/85">{category.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 rounded-full border border-[#12d66f] px-4 py-1.5 text-[11px] font-semibold text-[#12d66f] transition group-hover:bg-[#12d66f] group-hover:text-[#07100b]">
                      {category.action}
                      <span aria-hidden="true" className="text-base leading-none">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[21px] font-medium leading-tight">นักเขียนแนะนำ</h2>
              <p className="mt-1 text-[12px] text-white/50">พบกับนักเขียนคุณภาพจากหลากหลายแนว</p>
            </div>
            <a href="/writers" className="mb-1 inline-flex shrink-0 items-center gap-2 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]">
              ดูทั้งหมด <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="grid grid-cols-6 gap-3" id="writers">
            {recommendedWriters.map((writer) => (
              <Link className="group min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3 text-center transition hover:-translate-y-1 hover:border-[#1ec765]/60 hover:bg-[#12231a] hover:shadow-[0_12px_30px_rgba(0,0,0,.2)]" href={`/writers/${writer.slug}`} key={writer.slug}>
                <div className="relative mx-auto h-[72px] w-[72px] overflow-hidden rounded-full border border-[#1ec765] bg-[#18211d] p-0.5 shadow-[0_0_0_2px_rgba(28,198,101,.15)]">
                  <Image alt={`รูปโปรไฟล์ ${writer.name}`} className="rounded-full object-cover" fill sizes="72px" src={writer.image} />
                </div>
                <h3 className="mt-2 truncate text-[12px] font-medium text-white" title={writer.name}>{writer.name}</h3>
                <p className="truncate text-[11px] text-white/50">{writer.type}</p>
              </Link>
            ))}
          </div>
          </div>
        </div>

        <div className="min-w-0 border-l border-white/[0.08] pl-5">
          <Link aria-label="เข้าสู่ชุมชน ARN SPACE" className="group relative block h-full min-h-[430px] overflow-hidden rounded-[9px] border border-white/[0.1] bg-[#101714] shadow-[0_0_0_1px_rgba(33,194,98,.04),0_10px_24px_rgba(0,0,0,.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]" href="/community" id="community">
            <Image alt="ภูมิทัศน์แฟนตาซีของ ARN SPACE" className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 1400px) 35vw, 520px" src="/images/community-banner.webp" />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,13,.74),rgba(3,20,13,.34),rgba(3,20,13,.76))]" />
            <div className="relative flex h-full items-center justify-center px-8 text-center">
              <div className="text-[17px] font-medium leading-[1.7] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.8)] sm:text-[20px]">
                เพราะทุกคนมีเรื่องราว<br />
                และทุกเรื่องราว...มีที่ของมัน
                <span className="mx-auto mt-3 block w-fit border-t border-b border-white/55 px-4 py-1.5 text-[10px] font-normal tracking-[0.28em] text-[#b5d5c3]">ARN SPACE</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
