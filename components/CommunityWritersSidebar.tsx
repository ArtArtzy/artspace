import Image from "next/image";
import Link from "next/link";

const writingResources = [
  ["📄", "Character Sheet", "แบบฟอร์มสร้างตัวละคร"],
  ["🔒", "Worldbuilding Checklist", "เช็กลิสต์สร้างโลก"],
  ["🖌️", "วิธีเขียนคำโปรยให้น่าสนใจ", "เคล็ดลับ · คำโปรย · ดึงดูด"],
  ["📋", "โครงสร้าง 3 Acts", "วางโครงเรื่องให้จับใจ"],
  ["🔮", "คำศัพท์น่าจำในงานเขียน", "รวมคำศัพท์ที่เราแนะนำ"],
];

const writingEvents = [
  { slug: "september-writing-challenge", title: "September Writing Challenge", detail: "เขียนทุกวัน 30 วัน", date: "1 - 30 ก.ย. 2024", image: "/images/community/community-writing-challenge.webp" },
  { slug: "worldbuilding-workshop", title: "Workshop: Worldbuilding", detail: "สร้างโลกให้มีมิติ", date: "14 ก.ย. 2024", image: "/images/community/community-tree.webp" },
  { slug: "writer-ama", title: "AMA นักเขียนกับชุมชน", detail: "ถามได้ทุกเรื่องเกี่ยวกับการเขียน", date: "21 ก.ย. 2024", image: "/images/community/community-library.webp" },
];

function WritersSidebarCard({ children }: { children: React.ReactNode }) {
  return <section className="ds-card p-3">{children}</section>;
}

function WritersSidebarHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <h2 className="sidebar-title">{title}</h2>
      <Link className="sidebar-link ml-auto transition hover:text-[#8affc0]" href={href}>ดูทั้งหมด →</Link>
    </div>
  );
}

export default function CommunityWritersSidebar() {
  return (
    <aside aria-label="เครื่องมือและกิจกรรมสำหรับนักเขียน" className="space-y-3">
      <WritersSidebarCard>
        <WritersSidebarHeader href="/community/writers/resources/overview" title="แหล่งช่วยเขียน" />
        <div className="space-y-1.5">
          {writingResources.map(([icon, title, description]) => (
            <Link className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-2 py-1.5 transition hover:border-[#1de38b]/50 hover:bg-[#12231a]" href={`/community/writers/resources/${encodeURIComponent(title)}`} key={title}>
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#173d2a] text-base">{icon}</span>
              <span className="min-w-0">
                <span className="sidebar-item-title block truncate text-white/90">{title}</span>
                <span className="sidebar-caption block truncate text-white/45">{description}</span>
              </span>
            </Link>
          ))}
        </div>
      </WritersSidebarCard>

      <WritersSidebarCard>
        <WritersSidebarHeader href="/community/events" title="กิจกรรมสำหรับนักเขียน" />
        <div className="space-y-2">
          {writingEvents.map((event) => (
            <Link className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-2 py-1.5 transition hover:border-[#1de38b]/50 hover:bg-[#12231a]" href={`/community/events/${event.slug}`} key={event.title}>
              <Image alt={`ภาพกิจกรรม ${event.title}`} className="h-9 w-9 shrink-0 rounded-md object-cover" height={36} src={event.image} width={36} />
              <span className="min-w-0 flex-1">
                <span className="sidebar-item-title block truncate text-white/90">{event.title}</span>
                <span className="sidebar-caption block truncate text-white/45">{event.detail}</span>
              </span>
              <span className="sidebar-caption shrink-0 text-right text-white/55">{event.date}</span>
            </Link>
          ))}
        </div>
      </WritersSidebarCard>
    </aside>
  );
}
