import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type DiscussionRow = {
  slug: string;
  title: string;
  excerpt: string;
  user: string;
  age: string;
  avatar: string;
  image: string;
  stats: [string, string, string];
};

type DiscussionSection = {
  icon: string;
  title: string;
  badge: string;
  badgeClass: string;
  rows: DiscussionRow[];
};

const filters = ["ทั้งหมด", "คุยทั่วไป", "รีวิว", "คำถาม", "โหวต", "สปอยล์/ทฤษฎี"];
const sortOptions = [
  { value: "latest", label: "ล่าสุด" },
  { value: "popular", label: "ยอดนิยม" },
  { value: "trending", label: "มาแรง" },
] as const;
type SortOrder = (typeof sortOptions)[number]["value"];

const pinnedThreads: DiscussionRow[] = [
  {
    slug: "clockwork-character",
    title: "กติกาชุมชน ArnSpace ฉบับปิด 2024",
    excerpt: "มาร่วมสร้างพื้นที่ที่ดีสำหรับทุกคนกันนะครับ ♡",
    user: "Admin",
    age: "3 ชั่วโมงที่แล้ว",
    avatar: "/images/writers/akistudio.webp",
    image: "/images/community/community-library.webp",
    stats: ["48", "320", "12.4K"],
  },
  {
    slug: "fantasy-recommendations",
    title: "แนะนำตัวกันหน่อย! มาเป็นเพื่อนนักอ่านกันครับ",
    excerpt: "ไม่ว่าคุณจะอ่านอะไร ยินดีต้อนรับทุกคนเข้ามาพูดคุยกันได้เลย!",
    user: "LunaWriter",
    age: "2 วันที่แล้ว",
    avatar: "/images/writers/purplemoon.webp",
    image: "/images/community/community-portal.webp",
    stats: ["126", "895", "28.1K"],
  },
];

const discussionSections: DiscussionSection[] = [
  {
    icon: "💬",
    title: "คุยทั่วไป",
    badge: "พูดคุย",
    badgeClass: "bg-[#0b9b7b] text-[#e2fff5]",
    rows: [
      { slug: "clockwork-character", title: "ฤดูไหนเหมาะกับการอ่านนิยายที่สุด?", excerpt: "ส่วนตัวชอบหน้าหนาวมาก อ่านนิยายแล้วบรรยากาศดีสุด ๆ", user: "MapleWrite", age: "2 ชั่วโมงที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-tree.webp", stats: ["24", "86", "1.7K"] },
      { slug: "clockwork-review", title: "มีนิยายเรื่องไหนที่อ่านแล้ววางไม่ลงบ้างครับ", excerpt: "ช่วงนี้ติดมากจนแทบไม่ได้นอน มาแชร์กันหน่อยครับ", user: "Sky of Tomorrow", age: "5 ชั่วโมงที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-mage.webp", stats: ["31", "102", "2.1K"] },
      { slug: "fantasy-worldbuilding", title: "วันหยุดนี้อ่านอะไรอยู่?", excerpt: "มาแชร์กันหน่อย ตอนนี้กำลังอ่านเรื่องอะไรสนุก ๆ กันบ้าง", user: "ReadAgain", age: "7 ชั่วโมงที่แล้ว", avatar: "/images/writers/akistudio.webp", image: "/images/community/community-portal.webp", stats: ["68", "214", "3.4K"] },
      { slug: "fantasy-recommendations", title: "แนะนำบ้านนักเขียน ของคุณหน่อย", excerpt: "ใครมีพื้นที่เล็ก ๆ สำหรับพูดคุยเรื่องงานเขียน แนะนำกันได้นะครับ", user: "InkSora", age: "10 ชั่วโมงที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-hood.webp", stats: ["52", "178", "2.8K"] },
      { slug: "september-writing-challenge", title: "เพื่อน ๆ ฟังเพลงตอนอ่านนิยายไหม? เพลงแนวไหน?", excerpt: "ตอนอ่านนิยายทุกคนชอบเปิดเพลงคลอแบบไหนกันบ้างครับ", user: "Moonlight", age: "1 วันที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-library.webp", stats: ["39", "111", "1.9K"] },
    ],
  },
  {
    icon: "⭐",
    title: "รีวิว",
    badge: "รีวิว",
    badgeClass: "bg-[#f0a51a] text-[#241704]",
    rows: [
      { slug: "clockwork-review", title: "รีวิว: The Clockwork Garden - มากกว่านิยายแฟนตาซีทั่วไป", excerpt: "อ่านแล้วอบอุ่นหัวใจมาก เป็นเรื่องที่อยากบอกต่อให้ทุกคนลองอ่าน", user: "Sky of Tomorrow", age: "4 ชั่วโมงที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-library.webp", stats: ["62", "310", "4.8K"] },
      { slug: "fantasy-recommendations", title: "รีวิว: แฟนตาซีในสวน", excerpt: "ภาพสวยมาก อ่านเพลินและมีรายละเอียดของโลกที่ทำให้เราอิน", user: "WriteDream", age: "1 วันที่แล้ว", avatar: "/images/writers/akistudio.webp", image: "/images/community/community-tree.webp", stats: ["28", "142", "2.3K"] },
      { slug: "fantasy-worldbuilding", title: "รีวิว: เมืองที่มีโคมไฟ", excerpt: "บรรยากาศดีมาก อ่านตอนกลางคืนยิ่งเข้ากับเรื่อง", user: "LunaWriter", age: "2 วันที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-portal.webp", stats: ["41", "198", "3.1K"] },
      { slug: "clockwork-character", title: "รีวิว: สถานีลับกลางหมอก", excerpt: "เป็นเล่มที่อ่านแล้วอยากตามหาผลงานเรื่องอื่นต่อเลย", user: "MapleWrite", age: "2 วันที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-hood.webp", stats: ["36", "164", "2.7K"] },
    ],
  },
  {
    icon: "❓",
    title: "คำถาม",
    badge: "คำถาม",
    badgeClass: "bg-[#5b42e9] text-white",
    rows: [
      { slug: "fantasy-worldbuilding", title: "อยากเริ่มเขียนนิยาย ต้องเตรียมตัวอย่างไรบ้าง?", excerpt: "ไม่มีประสบการณ์เลย แต่อยากลองเริ่มต้นดูครับ", user: "NewReader", age: "4 ชั่วโมงที่แล้ว", avatar: "/images/writers/kuroi.webp", image: "/images/community/community-portal.webp", stats: ["45", "73", "2.1K"] },
      { slug: "clockwork-character", title: "การตั้งชื่อตัวละครที่ดูยังไงก็ไม่ซ้ำ?", excerpt: "คิดชื่อไม่ค่อยออกเลย มีวิธีช่วยจำหรือไอเดียแนะนำไหมคะ", user: "InkSora", age: "1 วันที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-tree.webp", stats: ["32", "88", "1.6K"] },
      { slug: "september-writing-challenge", title: "แนะนำเว็บไซต์หาข้อมูลโลกแฟนตาซีหน่อยครับ", excerpt: "กำลังเขียนเรื่องที่มีโลกกว้าง ๆ อยากได้แหล่งข้อมูลช่วยค้นคว้า", user: "WorldBuilder", age: "2 วันที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-library.webp", stats: ["27", "64", "1.3K"] },
      { slug: "clockwork-review", title: "นิยายที่เขียนจบแล้ว ควรทำยังไงต่อ?", excerpt: "อยากรู้ว่าควรลงขายหรือส่งสำนักพิมพ์ดี มีคำแนะนำไหมคะ", user: "MapleWrite", age: "3 วันที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-mage.webp", stats: ["51", "96", "2.0K"] },
    ],
  },
  {
    icon: "📊",
    title: "โหวต",
    badge: "โหวต",
    badgeClass: "bg-[#5140e9] text-white",
    rows: [
      { slug: "fantasy-recommendations", title: "คุณชอบตอนจบแบบไหนมากที่สุด?", excerpt: "สุขสมจบ เศร้าจบ หรือปลายเปิด ให้ทุกคนโหวตกันได้เลย!", user: "ReaderNo.9", age: "1 วันที่แล้ว", avatar: "/images/writers/kuroi.webp", image: "/images/community/community-library.webp", stats: ["89", "120", "4.1K"] },
      { slug: "clockwork-character", title: "กำลังเลือกพล็อตเรื่องใหม่ให้ตัวละคร คุณจะเลือกอะไร?", excerpt: "มาช่วยกันโหวตหน่อยครับ อยากได้มุมมองจากนักอ่าน", user: "Moonlight", age: "2 วันที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-portal.webp", stats: ["72", "98", "3.6K"] },
      { slug: "clockwork-review", title: "คุณอ่านนิยายผ่านช่องทางไหนมากที่สุด?", excerpt: "โทรศัพท์ แท็บเล็ต หรือคอมพิวเตอร์ มาแชร์กันครับ", user: "Sky of Tomorrow", age: "2 วันที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-hood.webp", stats: ["41", "67", "2.4K"] },
      { slug: "september-writing-challenge", title: "แนวไหนกำลังมาแรงใน ArnSpace มากที่สุด?", excerpt: "ลองโหวตจากแนวที่คุณอ่านเป็นประจำกันนะครับ", user: "ReadAgain", age: "3 วันที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-tree.webp", stats: ["58", "91", "3.0K"] },
    ],
  },
  {
    icon: "🏷️",
    title: "สปอยล์/ทฤษฎี",
    badge: "สปอยล์",
    badgeClass: "bg-[#c23b77] text-white",
    rows: [
      { slug: "clockwork-character", title: "ทฤษฎีตัวละครลับใน The Clockwork Garden", excerpt: "คิดว่าคนที่อยู่เบื้องหลังหอนาฬิกาอาจเป็นตัวละครที่เราเจอแล้วหรือเปล่า?", user: "Mirae", age: "3 ชั่วโมงที่แล้ว", avatar: "/images/writers/moonlit.webp", image: "/images/community/community-portal.webp", stats: ["96", "248", "5.7K"] },
      { slug: "clockwork-review", title: "[สปอยล์] ตอนจบที่ทุกคนรอคอย มีใครสังเกตเหมือนกันไหม", excerpt: "เตือนก่อนอ่าน: กระทู้นี้มีรายละเอียดสำคัญของตอนล่าสุดนะครับ", user: "LunaWriter", age: "8 ชั่วโมงที่แล้ว", avatar: "/images/writers/purplemoon.webp", image: "/images/community/community-library.webp", stats: ["74", "189", "4.2K"] },
      { slug: "fantasy-recommendations", title: "เดาทฤษฎีบทต่อไปจากสัญลักษณ์บนแผนที่", excerpt: "ลองเอารายละเอียดเล็ก ๆ ในบทก่อน ๆ มาต่อกันดูครับ", user: "ReaderNo.9", age: "1 วันที่แล้ว", avatar: "/images/writers/kuroi.webp", image: "/images/community/community-tree.webp", stats: ["53", "137", "3.6K"] },
      { slug: "fantasy-worldbuilding", title: "สปอยล์แฟนตาซีเรื่องโปรด: ใครคือผู้พิทักษ์ตัวจริง?", excerpt: "มาแลกเปลี่ยนเบาะแสกันได้ แต่อย่าลืมติดคำเตือนสปอยล์นะครับ", user: "WriteDream", age: "2 วันที่แล้ว", avatar: "/images/writers/lunarblack.webp", image: "/images/community/community-hood.webp", stats: ["42", "116", "2.9K"] },
    ],
  },
];

function DiscussionStats({ stats }: { stats: DiscussionRow["stats"] }) {
  return (
    <div className="flex shrink-0 items-center gap-3 text-[10px] text-white/55 sm:gap-4">
      <span className="inline-flex items-center gap-1">◯ {stats[0]}</span>
      <span className="inline-flex items-center gap-1">♡ {stats[1]}</span>
      <span className="hidden items-center gap-1 sm:inline-flex">◉ {stats[2]}</span>
    </div>
  );
}

function DiscussionRowView({ row, pinned = false, badge, badgeClass }: { row: DiscussionRow; pinned?: boolean; badge?: string; badgeClass?: string }) {
  return (
    <Link href={`/community/posts/${row.slug}`} className="group flex min-w-0 items-center gap-2 border-t border-white/[0.07] py-2 transition hover:bg-white/[0.025] sm:gap-2.5">
      <div className={`relative shrink-0 overflow-hidden rounded ${pinned ? "h-12 w-[92px] sm:h-12 sm:w-[112px]" : "h-10 w-14 sm:h-11 sm:w-[68px]"}`}>
        <Image alt={`ภาพประกอบ ${row.title}`} className="object-cover" fill sizes={pinned ? "112px" : "68px"} src={row.image} />
      </div>
      <Image alt={`รูปโปรไฟล์ ${row.user}`} className={`${pinned ? "h-7 w-7" : "h-7 w-7"} shrink-0 rounded-full border border-white/20 object-cover`} height={28} src={row.avatar} width={28} />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-[13px] font-medium leading-tight text-white/90 group-hover:text-[#7cf3b2]">{row.title}</p>
          {!pinned && badge && <span className={`hidden shrink-0 rounded px-2 py-1 text-[10px] font-semibold sm:inline-flex ${badgeClass}`}>{badge}</span>}
        </div>
        <p className="mt-1 truncate text-[11px] leading-tight text-white/55">{row.excerpt}</p>
        <div className="mt-1 flex min-w-0 items-center gap-2 text-[10px] text-white/50">
          <span className="truncate">{row.user}</span>
          <span className="shrink-0">· {row.age}</span>
        </div>
      </div>
      <DiscussionStats stats={row.stats} />
    </Link>
  );
}

function DiscussionCard({ section }: { section: DiscussionSection }) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#1c332a] bg-[linear-gradient(135deg,#0f2119_0%,#0b1512_100%)] px-3 sm:px-4" aria-labelledby={`discussion-${section.title}`}>
      <div className="flex items-center gap-2 py-2.5">
        <span aria-hidden="true" className="text-base leading-none">{section.icon}</span>
        <h2 id={`discussion-${section.title}`} className="text-[16px] font-semibold leading-tight text-white">{section.title}</h2>
        <Link href="#community-discussion" className="ml-auto text-[10px] font-medium text-[#1de38b] transition hover:text-[#8affc0]">ดูทั้งหมด →</Link>
      </div>
      {section.rows.map((row) => <DiscussionRowView badge={section.badge} badgeClass={section.badgeClass} key={`${section.title}-${row.title}`} row={row} />)}
    </section>
  );
}

function createSimulatedThreadPage(section: DiscussionSection) {
  return Array.from({ length: 50 }, (_, index) => {
    const source = section.rows[index % section.rows.length];
    const round = Math.floor(index / section.rows.length) + 1;

    return {
      ...source,
      title: `${source.title} · กระทู้ที่ ${index + 1}`,
      excerpt: round > 1 ? `${source.excerpt} มาแชร์มุมมองกันต่อได้เลยครับ` : source.excerpt,
      age: index < 5 ? source.age : `${round} วันที่แล้ว`,
      stats: [String(Number.parseInt(source.stats[0], 10) + index), String(Number.parseInt(source.stats[1], 10) + index * 3), `${(Number.parseFloat(source.stats[2]) + index / 10).toFixed(1)}K`] as [string, string, string],
    };
  });
}

function sortDiscussionRows(rows: DiscussionRow[], sortOrder: SortOrder) {
  if (sortOrder === "popular") return [...rows].sort((a, b) => Number.parseInt(b.stats[1], 10) - Number.parseInt(a.stats[1], 10));
  if (sortOrder === "trending") return [...rows].sort((a, b) => Number.parseFloat(b.stats[2]) - Number.parseFloat(a.stats[2]));
  return rows;
}

function DiscussionPagination() {
  return (
    <nav aria-label="หน้ารายการกระทู้" className="flex items-center justify-center gap-1.5 pt-2">
      <button aria-current="page" className="flex h-8 min-w-8 items-center justify-center rounded-md border border-[#12df8a] bg-[#12df8a] px-2 text-[11px] font-semibold text-[#03150d]" type="button">1</button>
      {[2, 3, 4, 5].map((page) => (
        <button key={page} aria-disabled="true" className="flex h-8 min-w-8 cursor-not-allowed items-center justify-center rounded-md border border-white/10 bg-[#101b17] px-2 text-[11px] text-white/35" disabled type="button">{page}</button>
      ))}
      <span aria-hidden="true" className="px-1 text-[11px] text-white/35">…</span>
      <button aria-disabled="true" className="flex h-8 min-w-8 cursor-not-allowed items-center justify-center rounded-md border border-white/10 bg-[#101b17] px-2 text-[11px] text-white/35" disabled type="button">50</button>
    </nav>
  );
}

export default function CommunityDiscussion() {
  const [selectedFilter, setSelectedFilter] = useState("ทั้งหมด");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const selectedSection = discussionSections.find((section) => section.title === selectedFilter);
  const simulatedRows = useMemo(() => {
    if (!selectedSection) return [];
    return sortDiscussionRows(createSimulatedThreadPage(selectedSection), sortOrder);
  }, [selectedSection, sortOrder]);
  const displaySections = useMemo(() => {
    if (selectedSection || sortOrder === "latest") return discussionSections;

    return discussionSections.map((section) => ({
      ...section,
      rows: sortDiscussionRows(createSimulatedThreadPage(section), sortOrder).slice(0, section.rows.length),
    }));
  }, [selectedSection, sortOrder]);

  return (
    <div className="min-w-0" id="community-discussion">
      <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-0.5">
        {filters.map((filter, index) => (
          <button key={filter} aria-pressed={selectedFilter === filter} className={`shrink-0 rounded-full border px-4 py-1.5 text-[11px] transition ${selectedFilter === filter ? "border-[#12df8a] bg-[#12df8a] font-semibold text-[#03150d]" : "border-white/10 bg-[#101b17] text-white/70 hover:border-[#12df8a] hover:text-white"}`} onClick={() => setSelectedFilter(filter)} type="button">
            {filter}
          </button>
        ))}
        <label className="relative ml-auto inline-flex shrink-0 items-center">
          <span className="sr-only">เรียงลำดับกระทู้</span>
          <select aria-label="เรียงลำดับกระทู้" className="appearance-none rounded-full border border-white/10 bg-[#101b17] py-1.5 pl-4 pr-8 text-[11px] text-white/75 outline-none transition focus:border-[#12df8a]" onChange={(event) => setSortOrder(event.target.value as (typeof sortOptions)[number]["value"])} value={sortOrder}>
            {sortOptions.map((option) => <option className="bg-[#101b17]" key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute right-3 text-[11px] text-white/60">⌄</span>
        </label>
      </div>

      <div className="space-y-3">
        {selectedSection ? (
          <>
            <DiscussionCard section={{ ...selectedSection, rows: simulatedRows }} />
            <DiscussionPagination />
          </>
        ) : (
          <>
        <section className="overflow-hidden rounded-lg border border-[#1c332a] bg-[linear-gradient(135deg,#0f2119_0%,#0b1512_100%)] px-3 sm:px-4" aria-labelledby="pinned-discussions-title">
          <div className="flex items-center gap-2 py-2.5">
            <span aria-hidden="true" className="text-base leading-none">📌</span>
            <h2 id="pinned-discussions-title" className="text-[16px] font-semibold leading-tight text-white">กระทู้ปักหมุด</h2>
            <Link href="#community-discussion" className="ml-auto text-[10px] font-medium text-[#1de38b] transition hover:text-[#8affc0]">ดูทั้งหมด →</Link>
          </div>
          {pinnedThreads.map((row) => <DiscussionRowView key={row.title} pinned row={row} />)}
        </section>

        {displaySections.map((section) => <DiscussionCard key={section.title} section={section} />)}
          </>
        )}
      </div>
    </div>
  );
}
