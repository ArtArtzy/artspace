import Image from "next/image";
import Link from "next/link";

const schedule = [
  { slug: "september-writing-challenge", date: "วันนี้", title: "September Writing Challenge", detail: "1 - 30 กันยายน 2568", color: "bg-[#12df8a]" },
  { slug: "favorite-writer-vote", date: "15 ก.ย.", title: "โหวตนักเขียนที่คุณรัก", detail: "15 - 25 กันยายน 2568", color: "bg-[#5aa9ff]" },
  { slug: "writer-ama", date: "28 ก.ย.", title: "AMA กับนักเขียน", detail: "28 กันยายน 2568", extra: "เวลา 20:00 น.", color: "bg-white" },
  { slug: "short-story-challenge", date: "1 ต.ค.", title: "ประกวดเรื่องสั้น September Writing Challenge", detail: "1 ตุลาคม 2568", color: "bg-white" },
];

const joinedEvents = [
  { title: "September Writing Challenge", date: "1 - 30 กันยายน 2568", progress: "เขียนแล้ว 12,500 / 30,000 คำ", percent: "42%", width: "42%", image: "/images/community/community-writing-challenge.webp" },
  { title: "Readathon เดือนกันยายน", date: "1 - 30 กันยายน 2568", progress: "อ่านแล้ว 3 / 5 เล่ม", percent: "60%", width: "60%", image: "/images/community/community-tree.webp" },
];

function SidebarCard({ children }: { children: React.ReactNode }) {
  return <section className="ds-card p-3">{children}</section>;
}

function CardHeader({ title, showAll = true }: { title: string; showAll?: boolean }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <h2 className="sidebar-title">{title}</h2>
      {showAll && <Link className="sidebar-link ml-auto transition hover:text-[#8affc0]" href="/community/events">ดูทั้งหมด →</Link>}
    </div>
  );
}

export default function CommunityEventsSidebar() {
  return (
    <aside aria-label="ข้อมูลกิจกรรมเพิ่มเติม" className="space-y-3">
      <SidebarCard>
        <CardHeader showAll={false} title="กำหนดการถัดไป" />
        <div className="relative pl-1">
          <div aria-hidden="true" className="absolute bottom-4 left-[10.5px] top-3 w-px bg-white/20" />
          <div className="space-y-0">
            {schedule.map((item) => (
              <Link className="relative grid grid-cols-[58px_minmax(0,1fr)] gap-2 border-b border-white/[0.06] py-2.5 transition hover:bg-white/[0.025] last:border-b-0" href={`/community/events/${item.slug}`} key={`${item.date}-${item.title}`}>
                <span className={`relative z-10 mt-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0d1a15] shadow-[0_0_0_2px_rgba(255,255,255,.08)] ${item.color}`} />
                <div className="-ml-7 pl-7">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-medium text-white/85">{item.date}</span>
                  </div>
                  <p className="mt-1 text-[11px] font-medium leading-[1.35] text-white/90">{item.title}</p>
                  <p className="mt-0.5 text-[10px] text-white/50">{item.detail}</p>
                  {item.extra && <p className="text-[10px] text-white/50">{item.extra}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SidebarCard>

      <SidebarCard>
        <CardHeader showAll={false} title="กิจกรรมของคุณ" />
        <div className="space-y-3">
          {joinedEvents.map((event) => (
            <div className="flex gap-2.5" key={event.title}>
              <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded border border-white/10 bg-[#14221c]">
                <Image alt={`ภาพกิจกรรม ${event.title}`} className="object-cover" fill sizes="48px" src={event.image} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="sidebar-item-title truncate font-medium text-white/90">{event.title}</p>
                <p className="sidebar-caption mt-1">▣ {event.date}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#12df8a]" style={{ width: event.width }} />
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="sidebar-caption truncate">{event.progress}</span>
                  <span className="sidebar-meta shrink-0 text-white/75">{event.percent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SidebarCard>

    </aside>
  );
}
