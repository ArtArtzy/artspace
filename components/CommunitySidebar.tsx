import Image from "next/image";
import Link from "next/link";

const trendingTags = [
  "#TheClockworkGarden",
  "#SeptemberWritingChallenge",
  "#ตัวละครรอง",
  "#แนะนำให้อ่าน",
  "#ห้องนักเขียน",
  "#นิยายแฟนตาซี",
  "#worldbuilding",
  "#นักเขียนมือใหม่",
  "#อ่านอะไรดี",
  "#แรงบันดาลใจ",
];

const hotThreads = [
  { user: "Moonlight", title: "ใครเคยรู้สึกว่าตัวละครรองดึงดูดใจกว่า...", avatar: "/images/writers/moonlit.webp", comments: "121" },
  { user: "LunaWriter", title: "รีวิว The Clockwork Garden...", avatar: "/images/writers/purplemoon.webp", comments: "98" },
  { user: "WriteDream", title: "ถามหน่อยค่ะ การเขียนฉากบรรยาย...", avatar: "/images/writers/lunarblack.webp", comments: "86" },
  { user: "ReaderNo.9", title: "5 นิยายแฟนตาซีที่ควรอ่านถ้าคุณชอบ...", avatar: "/images/writers/kuroi.webp", comments: "74" },
  { user: "Aria", title: "การสร้างตัวละครที่น่าจดจำ ทำยังไง?", avatar: "/images/writers/akistudio.webp", comments: "68" },
];

const events = [
  { title: "September Writing Challenge", date: "1 - 30 กันยายน 2568", participants: "3.1K เข้าร่วมแล้ว", image: "/images/community/community-writing-challenge.webp" },
  { title: "Readathon เดือนกันยายน", date: "1 - 30 กันยายน 2568", participants: "942 คนเข้าร่วม", image: "/images/community/community-tree.webp" },
  { title: "คุยกับนักเขียน AltStudio", date: "28 กันยายน 2568 20:00 น.", participants: "41 คนสนใจ", image: "/images/community/community-library.webp" },
];

function SidebarCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-[#1c332a] bg-[linear-gradient(140deg,#101e18_0%,#0b1512_100%)] p-3 ${className}`}>{children}</section>;
}

function CardHeader({ icon, title, showAll = true }: { icon: string; title: string; showAll?: boolean }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span aria-hidden="true" className="text-base leading-none">{icon}</span>
      <h2 className="sidebar-title">{title}</h2>
      {showAll && <Link href="#community-feed-title" className="sidebar-link ml-auto transition hover:text-[#8affc0]">ดูทั้งหมด →</Link>}
    </div>
  );
}

function CommunitySidebar() {
  return (
    <aside aria-label="ข้อมูลชุมชนเพิ่มเติม" className="space-y-3">
      <SidebarCard>
        <CardHeader icon="🔥" showAll={false} title="กำลังพูดถึง" />
        <div className="flex flex-wrap gap-1.5">
          {trendingTags.map((tag) => <Link key={tag} href="#community-feed-title" className="sidebar-meta rounded-full border border-white/15 px-2 py-1 text-white/70 transition hover:border-[#1de38b] hover:text-[#8affc0]">{tag}</Link>)}
        </div>
      </SidebarCard>

      <SidebarCard>
        <CardHeader icon="💬" title="กระทู้กำลังฮิต" />
        <div className="space-y-2.5">
          {hotThreads.map((thread, index) => (
            <Link key={thread.user} href="#community-feed-title" className="flex items-center gap-2 transition hover:bg-white/[0.03]">
              <span className="sidebar-meta flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#163027] font-semibold text-[#61e9aa]">{index + 1}</span>
              <Image alt={`รูปโปรไฟล์ ${thread.user}`} className="h-7 w-7 shrink-0 rounded-full border border-white/20 object-cover" height={28} src={thread.avatar} width={28} />
              <span className="min-w-0 flex-1">
                <span className="sidebar-item-title block truncate text-white/85">{thread.title}</span>
                <span className="sidebar-meta block truncate text-white/40">{thread.user}</span>
              </span>
              <span className="sidebar-caption inline-flex shrink-0 items-center gap-1 text-white/45"><span aria-hidden="true">◯</span>{thread.comments}</span>
            </Link>
          ))}
        </div>
      </SidebarCard>

      <SidebarCard>
        <CardHeader icon="🗓️" title="กิจกรรม" />
        <div className="space-y-2.5">
          {events.map((event) => (
            <div key={event.title} className="flex gap-2">
              <Image alt={`ภาพกิจกรรม ${event.title}`} className="h-12 w-[68px] shrink-0 rounded border border-white/10 object-cover" height={48} src={event.image} width={68} />
              <div className="min-w-0 flex-1">
                <p className="sidebar-item-title truncate text-white/90">{event.title}</p>
                <p className="sidebar-caption text-white/45">{event.date}</p>
                <p className="sidebar-meta text-white/55">♙ {event.participants}</p>
              </div>
            </div>
          ))}
        </div>
      </SidebarCard>

      <div className="grid grid-cols-2 gap-2">
        <Link href="#community-feed-title" className="rounded-lg border border-[#1c332a] bg-[#0c1914] p-3 transition hover:border-[#1de38b]">
          <span className="block text-base text-[#1de38b]">▣</span>
          <span className="sidebar-item-title mt-1 block text-white/85">กติกาชุมชน</span>
          <span className="sidebar-caption mt-1 block text-white/45">พื้นที่ปลอดภัยสำหรับทุกคน</span>
        </Link>
        <Link href="#community-feed-title" className="rounded-lg border border-[#1c332a] bg-[#0c1914] p-3 transition hover:border-[#1de38b]">
          <span className="block text-base text-[#1de38b]">⚠</span>
          <span className="sidebar-item-title mt-1 block text-white/85">รายงานปัญหา</span>
          <span className="sidebar-caption mt-1 block text-white/45">แจ้งเรื่องที่ไม่เหมาะสม</span>
        </Link>
      </div>
    </aside>
  );
}

export default CommunitySidebar;
