"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type WriterTopic = {
  slug: string;
  title: string;
  excerpt: string;
  user: string;
  age: string;
  avatar: string;
  image: string;
  tags: string[];
  stats: [string, string, string];
  action?: string;
};

type WriterTopicSection = {
  icon: string;
  title: string;
  filter: string;
  badge: string;
  badgeClass: string;
  rows: WriterTopic[];
};

const filters = ["ทั้งหมด", "ขอ Feedback", "หา Beta Reader", "เทคนิคการเขียน", "บท / ชื่อเรื่อง / คำโปรย"];

const sections: WriterTopicSection[] = [
  {
    icon: "💬",
    title: "ต้องการความคิดเห็นล่าสุด",
    filter: "ขอ Feedback",
    badge: "Feedback",
    badgeClass: "bg-[#314ee5] text-white",
    rows: [
      { slug: "fantasy-worldbuilding", title: "คำโปรยแบบนี้ดึงดูดพอไหมครับ?", excerpt: "กำลังปรับคำโปรยเรื่องใหม่ อยากได้ความคิดเห็นจากนักอ่านครับ", user: "Sky of Tomorrow", age: "3 ชั่วโมงที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-portal.webp", tags: ["แฟนตาซี", "คำโปรย"], stats: ["24", "56", "1.2K"], action: "รอความคิดเห็น" },
      { slug: "clockwork-review", title: "บทแรกแบบนี้ชวนอ่านต่อไหมคะ?", excerpt: "ลองเขียนฉากเปิดใหม่ อยากรู้ว่าจังหวะเรื่องเป็นอย่างไรบ้าง", user: "LunaWriter", age: "5 ชั่วโมงที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-library.webp", tags: ["โรแมนติก", "บทแรก"], stats: ["18", "42", "892"] },
      { slug: "clockwork-character", title: "ช่วยดูตอนจบให้หน่อยครับ", excerpt: "อยากให้ตอนจบมีน้ำหนักขึ้น ควรเพิ่มรายละเอียดตรงไหนไหมครับ", user: "WriteDream", age: "8 ชั่วโมงที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-tree.webp", tags: ["แฟนตาซี", "ฉากจบ"], stats: ["31", "68", "1.4K"] },
      { slug: "fantasy-recommendations", title: "ช่วยวิจารณ์การเปิดเรื่องหน่อยครับ", excerpt: "เปิดเรื่องด้วยบทสนทนาแบบนี้จะทำให้คนอ่านเข้าใจไหมครับ", user: "InkSora", age: "12 ชั่วโมงที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-hood.webp", tags: ["ไซไฟ", "โครงเรื่อง"], stats: ["12", "35", "776"] },
      { slug: "september-writing-challenge", title: "ตัวละครจะสลับมุมมองกันดีไหมคะ?", excerpt: "กำลังลองเล่าเรื่องจากหลายมุมมอง อยากฟังความเห็นนักอ่านค่ะ", user: "MapleWrite", age: "1 วันที่แล้ว", avatar: "/images/writers/akistudio.webp", image: "/images/community/community-mage.webp", tags: ["ดราม่า", "ตัวละคร"], stats: ["28", "71", "1.9K"], action: "รอความคิดเห็น" },
    ],
  },
  {
    icon: "👥",
    title: "หา Beta Reader",
    filter: "หา Beta Reader",
    badge: "Beta",
    badgeClass: "bg-[#e73585] text-white",
    rows: [
      { slug: "fantasy-worldbuilding", title: "หา Beta Reader นิยายแฟนตาซี 10 ตอนแรก", excerpt: "อยากได้คนช่วยดูจังหวะเรื่องและความต่อเนื่องครับ", user: "NewReader", age: "3 ชั่วโมงที่แล้ว", avatar: "/images/writers/kuroi.webp", image: "/images/community/community-portal.webp", tags: ["แฟนตาซี", "ยาว 40K คำ"], stats: ["15", "48", "1.1K"], action: "ต้องการ 3 คน" },
      { slug: "clockwork-character", title: "หา Beta Reader ช่วยดูพล็อตโรแมนติก", excerpt: "อยากได้ feedback เรื่องความสัมพันธ์ของตัวละครค่ะ", user: "Moonlight", age: "7 ชั่วโมงที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-library.webp", tags: ["โรแมนติก", "ยาว 25K คำ"], stats: ["9", "26", "620"], action: "รับแล้ว 1/3" },
      { slug: "clockwork-review", title: "หา Beta Reader นิยายสืบสวน", excerpt: "ช่วยดูเบาะแสและความสมเหตุสมผลของคดีหน่อยครับ", user: "Kaito", age: "1 วันที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-hood.webp", tags: ["สืบสวน", "ยาว 30K คำ"], stats: ["12", "38", "980"], action: "ต้องการ 2 คน" },
      { slug: "fantasy-recommendations", title: "เปิดรับ Beta Reader ภาคต่อ (เล่ม 1)", excerpt: "มีเรื่องเดิมให้อ่านประกอบ ใครชอบแฟนตาซีมาคุยกันได้ครับ", user: "ReadAgain", age: "1 วันที่แล้ว", avatar: "/images/writers/akistudio.webp", image: "/images/community/community-tree.webp", tags: ["แฟนตาซี", "ยาว 50K คำ"], stats: ["20", "52", "1.8K"], action: "รับแล้ว 2/5" },
      { slug: "september-writing-challenge", title: "หา Beta Reader ที่ชอบแนววาย ๆ ครับ", excerpt: "อยากได้คนช่วยดูเคมีตัวละครและบทสนทนา", user: "NightWriter", age: "2 วันที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-mage.webp", tags: ["วาย", "ยาว 28K คำ"], stats: ["17", "41", "1.2K"], action: "ต้องการ 4 คน" },
    ],
  },
  {
    icon: "💡",
    title: "เทคนิคการเขียน",
    filter: "เทคนิคการเขียน",
    badge: "เทคนิค",
    badgeClass: "bg-[#2c9c4a] text-white",
    rows: [
      { slug: "fantasy-worldbuilding", title: "มีวิธี Plot Hole ช่วงกลางเรื่องอย่างไรบ้าง?", excerpt: "กำลังวางโครงเรื่องและอยากป้องกันจุดหลุดตั้งแต่แรก", user: "LunaWriter", age: "4 ชั่วโมงที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-tree.webp", tags: ["โครงเรื่อง", "ปัญหาเรื่อง"], stats: ["32", "89", "1.6K"] },
      { slug: "clockwork-review", title: "การบรรยายฉากต่อสู้ที่ดีควรเป็นแบบไหน?", excerpt: "ขอเทคนิคการเขียนให้เห็นภาพและไม่ยืดเยื้อเกินไปครับ", user: "Sky of Tomorrow", age: "8 ชั่วโมงที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-library.webp", tags: ["ฉากต่อสู้", "การบรรยาย"], stats: ["18", "54", "980"] },
      { slug: "clockwork-character", title: "จะเขียนตัวละครหลายมิติได้ไม่เสียเสน่ห์ยังไง?", excerpt: "อยากให้ตัวละครมีข้อดีข้อเสียที่น่าเชื่อและจำได้ครับ", user: "WriteDream", age: "1 วันที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-portal.webp", tags: ["เทคนิคการเล่าเรื่อง", "POV"], stats: ["22", "61", "1.4K"] },
      { slug: "fantasy-recommendations", title: "วิธีสร้างโลกแฟนตาซีให้สมจริงและน่าเชื่อถือ", excerpt: "ใครมีวิธีวางระบบโลกหรือเวทมนตร์ที่ใช้แล้วเวิร์กบ้างครับ", user: "InkSora", age: "2 วันที่แล้ว", avatar: "/images/writers/kuroi.webp", image: "/images/community/community-hood.webp", tags: ["Worldbuilding", "การตั้งโลก"], stats: ["28", "77", "2.1K"] },
      { slug: "september-writing-challenge", title: "เขียนฉากอารมณ์ยังไงให้กระแทกคนอ่าน?", excerpt: "อยากฝึกถ่ายทอดความรู้สึกของตัวละครให้จับใจมากขึ้น", user: "MapleWrite", age: "2 วันที่แล้ว", avatar: "/images/writers/akistudio.webp", image: "/images/community/community-mage.webp", tags: ["การเขียนอารมณ์", "ตัวละคร"], stats: ["16", "49", "1.1K"] },
    ],
  },
  {
    icon: "🖋️",
    title: "บท / ชื่อเรื่อง / คำโปรย",
    filter: "บท / ชื่อเรื่อง / คำโปรย",
    badge: "บท",
    badgeClass: "bg-[#6644df] text-white",
    rows: [
      { slug: "clockwork-character", title: "ชื่อเรื่อง ‘กลางคืนในเมืองกระจก’ ดีไหมครับ", excerpt: "กำลังลังเลระหว่างชื่อนี้กับอีกชื่อหนึ่ง ช่วยโหวตให้หน่อยครับ", user: "Kaito", age: "6 ชั่วโมงที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-portal.webp", tags: ["นักเขียน", "แฟนตาซี"], stats: ["41", "102", "2.4K"], action: "A/B โหวต" },
      { slug: "fantasy-worldbuilding", title: "ชื่อนี้โอเคไหม? ‘เสียงกระซิบของภูต’", excerpt: "อยากได้ชื่อที่สื่อถึงบรรยากาศลึกลับและอบอุ่นไปพร้อมกัน", user: "ReadAgain", age: "1 วันที่แล้ว", avatar: "/images/writers/akistudio.webp", image: "/images/community/community-tree.webp", tags: ["ชื่อเรื่อง", "แฟนตาซี"], stats: ["27", "68", "1.3K"] },
      { slug: "clockwork-review", title: "คำโปรยแบบนี้สั้นไปหรือเปล่าคะ?", excerpt: "ลองเขียนให้กระชับขึ้น แต่อยากให้ยังมีอารมณ์ของเรื่องอยู่", user: "Moonlight", age: "1 วันที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-library.webp", tags: ["คำโปรย", "โรแมนติก"], stats: ["33", "91", "1.8K"] },
      { slug: "fantasy-recommendations", title: "ขอไอเดียบทเปิดเรื่องแนวสืบสวนหน่อยครับ", excerpt: "อยากเปิดด้วยเหตุการณ์ที่ดึงคนอ่านเข้าเรื่องตั้งแต่หน้าแรก", user: "NewReader", age: "2 วันที่แล้ว", avatar: "/images/writers/kuroi.webp", image: "/images/community/community-hood.webp", tags: ["นักเขียน", "สืบสวน"], stats: ["18", "46", "980"] },
      { slug: "september-writing-challenge", title: "ชื่อตัวละครไหนฟังแล้วจำง่ายกว่ากัน?", excerpt: "มีสองตัวเลือกที่ชอบพอ ๆ กัน อยากฟังความเห็นทุกคนครับ", user: "NightWriter", age: "3 วันที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-mage.webp", tags: ["ชื่อเรื่อง", "การตลาด"], stats: ["21", "52", "1.1K"] },
    ],
  },
];

function TopicStats({ stats }: { stats: WriterTopic["stats"] }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 text-[10px] text-white/55 sm:gap-4">
      <span>◯ {stats[0]}</span>
      <span>♡ {stats[1]}</span>
      <span className="hidden sm:inline">◉ {stats[2]}</span>
    </div>
  );
}

function TopicRow({ topic, section }: { topic: WriterTopic; section: WriterTopicSection }) {
  return (
    <Link href={`/community/posts/${topic.slug}`} className="group grid min-w-0 grid-cols-[52px_minmax(0,1fr)] items-center gap-2 border-t border-white/[0.07] py-2 transition hover:bg-white/[0.025] sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:gap-2.5">
      <div className="relative h-10 w-12 overflow-hidden rounded bg-[#18251f]">
        <Image alt={`ภาพประกอบ ${topic.title}`} className="object-cover" fill sizes="48px" src={topic.image} />
      </div>
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`shrink-0 rounded px-2 py-1 text-[10px] font-semibold ${section.badgeClass}`}>{section.badge}</span>
          <p className="truncate text-[12px] font-medium leading-tight text-white/90 group-hover:text-[#7cf3b2]">{topic.title}</p>
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2 text-[10px] text-white/45">
          <span className="truncate">{topic.user} · {topic.age}</span>
          <span className="hidden truncate sm:inline">{topic.excerpt}</span>
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-1.5 overflow-hidden">
          {topic.tags.map((tag) => <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/60" key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-end">
        <TopicStats stats={topic.stats} />
        {topic.action && <span className="hidden shrink-0 rounded-full border border-[#1de38b]/60 px-2 py-1 text-[10px] text-[#63efaa] sm:inline-flex">{topic.action}</span>}
      </div>
    </Link>
  );
}

function TopicSection({ section }: { section: WriterTopicSection }) {
  return (
    <section className="ds-section px-3 sm:px-4" aria-labelledby={`writer-section-${section.filter}`}>
      <div className="flex items-center gap-2 py-2.5">
        <span aria-hidden="true" className="text-base leading-none">{section.icon}</span>
        <h2 className="text-[16px] font-semibold leading-tight text-white" id={`writer-section-${section.filter}`}>{section.title}</h2>
        <Link className="ml-auto text-[10px] font-medium text-[#1de38b] transition hover:text-[#8affc0]" href={`/community/writers/topics?filter=${encodeURIComponent(section.filter)}`}>ดูทั้งหมด →</Link>
      </div>
      {section.rows.map((topic) => <TopicRow key={topic.title} section={section} topic={topic} />)}
    </section>
  );
}

const writerTopicFollowUps = [
  "มีจุดไหนควรปรับก่อนลงจริงไหมครับ",
  "อยากขอความเห็นจากนักอ่านที่ชอบแนวนี้ครับ",
  "ใครเคยเจอปัญหาแบบนี้ตอนเขียนบ้างคะ",
  "ช่วยแนะนำมุมมองที่ทำให้เรื่องลื่นขึ้นหน่อยครับ",
  "ลองแก้ฉากนี้แล้ว อยากฟังความเห็นเพิ่มเติมค่ะ",
  "อยากรู้ว่าคนอ่านรู้สึกกับประเด็นนี้อย่างไรบ้าง",
  "มีวิธีไหนที่ช่วยให้ฉากนี้ชัดขึ้นไหมครับ",
  "ขอคำแนะนำก่อนส่งต้นฉบับรอบสุดท้ายหน่อยค่ะ",
  "ถ้าเป็นคุณจะเลือกทางไหนให้เรื่องน่าติดตามขึ้นครับ",
  "ช่วยดูอีกมุมหนึ่งให้หน่อยนะครับ",
];

function createSimulatedTopicPage(section: WriterTopicSection) {
  return Array.from({ length: 50 }, (_, index) => {
    const source = section.rows[index % section.rows.length];
    const round = Math.floor(index / section.rows.length) + 1;
    const followUp = writerTopicFollowUps[index % writerTopicFollowUps.length];

    return {
      ...source,
      title: `${source.title} ${followUp}`,
      excerpt: round > 1 ? `${source.excerpt} มาแลกเปลี่ยนความคิดเห็นกันต่อได้เลยครับ` : source.excerpt,
      age: index < 5 ? source.age : `${round} วันที่แล้ว`,
      stats: [String(Number.parseInt(source.stats[0], 10) + index), String(Number.parseInt(source.stats[1], 10) + index * 2), `${(Number.parseFloat(source.stats[2]) + index / 10).toFixed(1)}K`] as [string, string, string],
    };
  });
}

function TopicPagination() {
  return (
    <nav aria-label="หน้ารายการกระทู้ห้องนักเขียน" className="flex items-center justify-center gap-1.5 pt-2">
      <button aria-current="page" className="flex h-8 min-w-8 items-center justify-center rounded-md border border-[#12df8a] bg-[#12df8a] px-2 text-[11px] font-semibold text-[#03150d]" type="button">1</button>
      {[2, 3, 4, 5].map((page) => <button aria-disabled="true" className="flex h-8 min-w-8 cursor-not-allowed items-center justify-center rounded-md border border-white/10 bg-[#101b17] px-2 text-[11px] text-white/35" disabled key={page} type="button">{page}</button>)}
      <span aria-hidden="true" className="px-1 text-[11px] text-white/35">…</span>
      <button aria-disabled="true" className="flex h-8 min-w-8 cursor-not-allowed items-center justify-center rounded-md border border-white/10 bg-[#101b17] px-2 text-[11px] text-white/35" disabled type="button">50</button>
    </nav>
  );
}

export default function CommunityWriters() {
  const [selectedFilter, setSelectedFilter] = useState("ทั้งหมด");
  const selectedSection = sections.find((section) => section.filter === selectedFilter);
  const visibleSections = selectedFilter === "ทั้งหมด"
    ? sections
    : selectedSection ? [{ ...selectedSection, rows: createSimulatedTopicPage(selectedSection) }] : [];

  return (
    <div className="min-w-0" id="community-writers">
      <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-0.5">
        {filters.map((filter) => (
          <button aria-pressed={selectedFilter === filter} className={`shrink-0 rounded-full border px-4 py-1.5 text-[11px] transition ${selectedFilter === filter ? "border-[#12df8a] bg-[#12df8a] font-semibold text-[#03150d]" : "border-white/10 bg-[#101b17] text-white/70 hover:border-[#12df8a] hover:text-white"}`} key={filter} onClick={() => setSelectedFilter(filter)} type="button">{filter}</button>
        ))}
        <label className="relative ml-auto inline-flex shrink-0 items-center">
          <span className="sr-only">เรียงลำดับกระทู้</span>
          <select aria-label="เรียงลำดับกระทู้" className="appearance-none rounded-full border border-white/10 bg-[#101b17] py-1.5 pl-4 pr-8 text-[11px] text-white/75 outline-none focus:border-[#12df8a]" defaultValue="latest">
            <option className="bg-[#101b17]" value="latest">ล่าสุด</option>
            <option className="bg-[#101b17]" value="popular">ยอดนิยม</option>
            <option className="bg-[#101b17]" value="trending">มาแรง</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute right-3 text-[11px] text-white/60">⌄</span>
        </label>
      </div>

      <div className="space-y-3">
        {visibleSections.map((section) => <TopicSection key={section.title} section={section} />)}
        {selectedFilter !== "ทั้งหมด" && <TopicPagination />}
      </div>
    </div>
  );
}
