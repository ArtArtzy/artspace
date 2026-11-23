import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import BookCardInfo, { BookCompletedBadge } from "@/components/BookCardInfo";
import type { ReadModeId } from "@/components/ReadSubMenu";
import type { CategoryBook } from "@/data/categoryBooks";

const hoverDescriptions: Record<string, string> = {
  โรแมนติก: "เมื่อโชคชะตาพาคนสองคนกลับมาเจอกัน ความลับในอดีตและความรู้สึกที่ยังไม่จางจะเปลี่ยนเรื่องราวครั้งนี้ไปอย่างไร",
  วาย: "ความสัมพันธ์ที่ค่อย ๆ เติบโตท่ามกลางความเข้าใจผิดและช่วงเวลาที่หัวใจไม่กล้าพูดความจริง",
  ยูริ: "เรื่องราวอบอุ่นหัวใจของคนสองคนที่เรียนรู้จะเปิดใจให้กัน ผ่านวันธรรมดาที่มีความหมายกว่าที่คิด",
  แฟนตาซี: "ออกเดินทางสู่โลกกว้างที่เต็มไปด้วยเวทมนตร์ มิตรภาพ และคำทำนายที่อาจเปลี่ยนชะตาของทุกคน",
  จีนโบราณ: "กลิ่นอายตำนานและชะตาที่ผูกพันผู้คนต่างแคว้น เมื่อความจริงใต้เงาจันทร์กำลังจะถูกเปิดเผย",
  เกิดใหม่: "เริ่มต้นชีวิตบทใหม่พร้อมความทรงจำจากอดีต และความลับที่อาจทำให้เส้นทางครั้งนี้ไม่เหมือนเดิม",
  ลึกลับ: "ทุกเบาะแสพาคุณเข้าใกล้ความจริงอีกก้าว แต่ยิ่งค้นหากลับยิ่งพบว่าความลับนี้อันตรายกว่าที่คิด",
  สยองขวัญ: "ความเงียบที่ซ่อนเรื่องราวชวนขนลุกเอาไว้ และเสียงบางอย่างที่ดังขึ้นทุกครั้งเมื่อพระอาทิตย์ลับฟ้า",
  แอ๊กชั่น: "การผจญภัยเข้มข้นที่พาทุกคนฝ่าศัตรูและอุปสรรค เพื่อไปให้ถึงความจริงที่ไม่มีใครอยากเผชิญ",
  ไซไฟ: "เรื่องราวจากอนาคตที่พาคุณออกไปไกลกว่าดวงดาว เมื่อภารกิจครั้งนี้อาจเปลี่ยนอนาคตของมนุษยชาติ",
  คอมเมดี้: "ความวุ่นวายชวนยิ้มที่เติมสีสันให้ทุกวัน เมื่อแผนธรรมดากลับพาทุกคนไปเจอเรื่องวุ่นเกินคาด",
};

type BookCardProps = {
  book: CategoryBook;
  displayTitle: string;
  mode: ReadModeId;
  href: string;
  ariaLabel?: string;
  coverTitle?: string;
  coverSizes?: string;
  statusTitle?: string;
  rank?: number;
  children?: ReactNode;
};

export default function BookCard({
  book,
  displayTitle,
  mode,
  href,
  ariaLabel = `เปิดเรื่อง ${displayTitle}`,
  coverTitle = displayTitle,
  coverSizes = "(max-width: 767px) 50vw, (max-width: 1279px) 33vw, (max-width: 1400px) 17vw, 220px",
  statusTitle = book.title,
  rank,
  children,
}: BookCardProps) {
  return (
    <Link
      aria-label={ariaLabel}
      className="ds-book-card group relative block min-w-0 cursor-pointer rounded-[9px] border border-transparent p-1 transition duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.025] hover:shadow-[0_12px_26px_rgba(19,230,104,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
      href={href}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-[7px] bg-[#18201c]">
        <Image src={book.image} alt={`ปกหนังสือ ${coverTitle}`} fill sizes={coverSizes} className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07100c]/90 to-transparent" />
        {rank !== undefined && (
          <span aria-hidden="true" data-book-rank={rank} className="absolute left-ds-2 top-ds-2 z-30 inline-grid min-w-6 place-items-center rounded-ds-sm border border-arn-border-strong bg-arn-canvas px-ds-1 py-ds-1 text-ds-meta font-semibold tabular-nums text-arn-text">{rank}</span>
        )}
        <BookCompletedBadge book={{ title: statusTitle, episodes: book.episodes, status: book.status }} />
      </div>
      <BookCardInfo title={displayTitle} author={book.author} mode={mode} format={book.format} stats={book} />
      {children}
      <div data-book-overlay className="ds-book-overlay pointer-events-none absolute inset-1 z-20 flex flex-col justify-end rounded-[7px] bg-gradient-to-t from-[#07100c] via-[#07100c]/90 to-transparent p-3 opacity-0 transition duration-300 group-hover:opacity-100">
        <h3 className="break-words text-[14px] font-semibold leading-5 text-white">{displayTitle}</h3>
        <p className="mt-0.5 line-clamp-6 text-[11px] leading-[1.45] text-white/70">{hoverDescriptions[book.category] ?? "เรื่องราวที่คัดสรรมาให้คุณได้ออกเดินทาง พร้อมความลับและตัวละครมากมายที่รอให้คุณทำความรู้จัก"}</p>
        <span className="mt-2 inline-flex h-8 items-center justify-center rounded-[7px] bg-[#1be27e] text-[11px] font-semibold text-[#07100b] shadow-[0_5px_16px_rgba(0,0,0,.25)]">อ่านเลย <span aria-hidden="true" className="ml-2 text-sm">→</span></span>
      </div>
    </Link>
  );
}
