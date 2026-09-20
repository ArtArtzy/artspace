import Image from "next/image";
import Link from "next/link";

const hotThreads = [
  { title: "มีนิยายสนุก ๆ แนะนำไหม?", user: "ToadReadAgain", avatar: "/images/writers/moonlit.webp", comments: "68" },
  { title: "รีวิว The Clockwork Garden...", user: "Sky of Tomorrow", avatar: "/images/writers/purplemoon.webp", comments: "62" },
  { title: "อยากเริ่มเขียนนิยาย ต้องเตรียม...", user: "NewReader", avatar: "/images/writers/kuroi.webp", comments: "45" },
  { title: "คุณชอบตอนจบแบบไหนมากที่สุด?", user: "ReaderNo.9", avatar: "/images/writers/akistudio.webp", comments: "89" },
  { title: "แชร์มุมมองเรื่องรอบตัว ของคุณ...", user: "InkSora", avatar: "/images/writers/lunarblack.webp", comments: "52" },
];

const popularTags = [
  ["#TheClockworkGarden", "12.4K โพสต์"],
  ["#แฟนตาซี", "8.7K โพสต์"],
  ["#รีวิว", "6.1K โพสต์"],
  ["#แนะนำ", "4.2K โพสต์"],
  ["#คำถาม", "3.9K โพสต์"],
  ["#สปอยล์", "3.1K โพสต์"],
  ["#โลกเวทมนตร์", "2.8K โพสต์"],
  ["#เขียนนิยาย", "2.1K โพสต์"],
  ["#ตัวละคร", "1.9K โพสต์"],
];

const popularRooms = [
  ["คุยทั่วไป", "คุยเรื่องหนังสือ ชีวิต และทุกเรื่องที่อยากคุย", "48.2K กระทู้", "💬"],
  ["รีวิว", "มาแชร์ความประทับใจหลังอ่าน", "28.1K กระทู้", "🌸"],
  ["คำถาม", "ถามได้ทุกเรื่อง เพื่อน ๆ ช่วยตอบ", "18.9K กระทู้", "❔"],
  ["แนะนำ", "แนะนำนิยาย นักเขียน และสิ่งดี ๆ", "16.4K กระทู้", "📣"],
  ["โหวต", "มาร่วมโหวตเรื่องสนุก ๆ กัน", "12.7K กระทู้", "💬"],
  ["สปอยล์/ทฤษฎี", "คุยเรื่องเนื้อหาและทฤษฎีต่าง ๆ", "9.1K กระทู้", "🏷️"],
];

const recommendedWriters = [
  ["LunaWriter", "ผู้เขียนนิยายแฟนตาซีอบอุ่น", "/images/writers/purplemoon.webp"],
  ["Sky of Tomorrow", "รวมเรื่องสั้นและรีวิวหนังสือ", "/images/writers/lunarblack.webp"],
  ["WriteDream", "นักเขียนมือใหม่ที่ชวนคุยสนุก", "/images/writers/moonlit.webp"],
  ["MapleWrite", "นักอ่านสายอบอุ่นและการเขียน", "/images/writers/akistudio.webp"],
  ["InkSora", "โลกแฟนตาซี ตัวละคร และความฝัน", "/images/writers/kuroi.webp"],
];

function DiscussionSidebarCard({ children }: { children: React.ReactNode }) {
  return <section className="ds-card p-3">{children}</section>;
}

function DiscussionSidebarHeader({ icon, title, showAll = true }: { icon: string; title: string; showAll?: boolean }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span aria-hidden="true" className="text-base leading-none">{icon}</span>
      <h2 className="sidebar-title">{title}</h2>
      {showAll && <Link href="#community-discussion" className="sidebar-link ml-auto transition hover:text-[#8affc0]">ดูทั้งหมด →</Link>}
    </div>
  );
}

export default function CommunityDiscussionSidebar() {
  return (
    <aside aria-label="ข้อมูลห้องพูดคุยเพิ่มเติม" className="space-y-3">
      <DiscussionSidebarCard>
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-4xl leading-none text-[#1de38b]">✎</span>
          <div className="min-w-0">
            <h2 className="sidebar-title">ตั้งกระทู้ใหม่</h2>
            <p className="sidebar-body mt-1 text-white/60">เริ่มบทสนทนา แชร์ความคิดเห็น หรือถามคำถามกับเพื่อน ๆ ใน ArnSpace</p>
          </div>
          <span aria-hidden="true" className="ml-auto text-xl text-[#1de38b]">→</span>
        </div>
      </DiscussionSidebarCard>

      <DiscussionSidebarCard>
        <DiscussionSidebarHeader icon="🔥" title="กระทู้กำลังฮิต" />
        <div className="space-y-2">
          {hotThreads.map((thread, index) => (
            <Link key={thread.title} href="/community/posts/clockwork-character" className="flex items-center gap-2 transition hover:bg-white/[0.03]">
              <span className="sidebar-meta flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#163027] font-semibold text-[#61e9aa]">{index + 1}</span>
              <Image alt={`รูปโปรไฟล์ ${thread.user}`} className="h-7 w-7 shrink-0 rounded-full border border-white/20 object-cover" height={28} src={thread.avatar} width={28} />
              <span className="min-w-0 flex-1">
                <span className="sidebar-item-title block truncate text-white/90">{thread.title}</span>
                <span className="sidebar-caption block truncate text-white/45">โดย {thread.user}</span>
              </span>
              <span className="sidebar-meta shrink-0 text-white/60">♡ {thread.comments}</span>
            </Link>
          ))}
        </div>
      </DiscussionSidebarCard>

      <DiscussionSidebarCard>
        <DiscussionSidebarHeader icon="#" title="แฮชแท็กกำลังนิยม" />
        <div className="grid grid-cols-3 gap-1.5">
          {popularTags.map(([tag, count]) => (
            <Link key={tag} href="#community-discussion" className="rounded border border-white/10 bg-white/[0.02] px-2 py-1.5 transition hover:border-[#1de38b]">
              <span className="sidebar-meta block truncate text-white/80">{tag}</span>
              <span className="sidebar-caption mt-0.5 block text-white/45">{count}</span>
            </Link>
          ))}
        </div>
      </DiscussionSidebarCard>

      <DiscussionSidebarCard>
        <DiscussionSidebarHeader icon="🏆" title="ห้องยอดนิยม" />
        <div className="space-y-2">
          {popularRooms.map(([title, description, count, icon]) => (
            <Link key={title} href="#community-discussion" className="flex items-center gap-2 transition hover:bg-white/[0.03]">
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#163027] text-sm">{icon}</span>
              <span className="min-w-0 flex-1">
                <span className="sidebar-item-title block truncate text-white/90">{title}</span>
                <span className="sidebar-caption block truncate text-white/45">{description}</span>
              </span>
              <span className="sidebar-meta shrink-0 text-white/55">{count}</span>
            </Link>
          ))}
        </div>
      </DiscussionSidebarCard>

      <DiscussionSidebarCard>
        <DiscussionSidebarHeader icon="👑" title="นักเขียนแนะนำ" />
        <div className="space-y-2.5">
          {recommendedWriters.map(([name, description, avatar]) => (
            <div key={name} className="flex items-center gap-2">
              <Image alt={`รูปโปรไฟล์ ${name}`} className="h-8 w-8 shrink-0 rounded-full border border-white/20 object-cover" height={32} src={avatar} width={32} />
              <div className="min-w-0 flex-1">
                <p className="sidebar-item-title truncate text-white/90">{name}</p>
                <p className="sidebar-caption truncate text-white/45">{description}</p>
              </div>
              <button className="sidebar-button shrink-0 rounded border border-[#1de38b] px-2 py-1 text-[#1de38b] transition hover:bg-[#1de38b] hover:text-[#04140d]" type="button">+ ติดตาม</button>
            </div>
          ))}
        </div>
      </DiscussionSidebarCard>
    </aside>
  );
}
