import Image from "next/image";
import Link from "next/link";

const trendingTopics = [
  { tag: "#TheClockworkGarden", slug: "the-clockwork-garden", posts: "12.4K" },
  { tag: "#SeptemberWritingChallenge", slug: "september-writing-challenge", posts: "8.7K" },
  { tag: "#ตัวละครรอง", slug: "supporting-character", posts: "6.1K" },
  { tag: "#แนะนำให้อ่าน", slug: "reading-recommendations", posts: "5.9K" },
  { tag: "#ArnSpace", slug: "arnspace", posts: "5.1K" },
];

const events = [
  { slug: "september-writing-challenge", title: "September Writing Challenge", date: "1 - 30 กันยายน 2568", participants: "3.1K เข้าร่วมแล้ว", image: "/images/community/community-writing-challenge.webp" },
  { slug: "readathon-september", title: "Readathon เดือนกันยายน", date: "1 - 30 กันยายน 2568", participants: "942 คนเข้าร่วม", image: "/images/community/community-tree.webp" },
  { slug: "writer-ama", title: "คุยกับนักเขียน AltStudio", date: "28 กันยายน 2568 20:00 น.", participants: "41 คนสนใจ", image: "/images/community/community-library.webp" },
];

type RecentCommentedThread = { slug: string; title: string; category: string; comments: string; views: string };

const recentReplyTimesByFilter: Record<string, string[]> = {
  "ทั้งหมด": ["5 นาทีที่แล้ว", "12 นาทีที่แล้ว", "18 นาทีที่แล้ว", "26 นาทีที่แล้ว", "34 นาทีที่แล้ว"],
  "คุยทั่วไป": ["5 นาทีที่แล้ว", "18 นาทีที่แล้ว", "31 นาทีที่แล้ว", "44 นาทีที่แล้ว", "58 นาทีที่แล้ว"],
  "รีวิว": ["7 นาทีที่แล้ว", "15 นาทีที่แล้ว", "28 นาทีที่แล้ว", "41 นาทีที่แล้ว"],
  "คำถาม": ["9 นาทีที่แล้ว", "22 นาทีที่แล้ว", "36 นาทีที่แล้ว", "52 นาทีที่แล้ว"],
  "โหวต": ["11 นาทีที่แล้ว", "24 นาทีที่แล้ว", "39 นาทีที่แล้ว", "55 นาทีที่แล้ว"],
  "สปอยล์/ทฤษฎี": ["8 นาทีที่แล้ว", "19 นาทีที่แล้ว", "33 นาทีที่แล้ว", "47 นาทีที่แล้ว"],
};

const recentCommentedThreadsByFilter: Record<string, RecentCommentedThread[]> = {
  ทั้งหมด: [
    { slug: "clockwork-character", title: "ฤดูไหนเหมาะกับการอ่านนิยายที่สุด?", category: "พูดคุย", comments: "24", views: "1.7K" },
    { slug: "clockwork-review", title: "รีวิว: The Clockwork Garden - มากกว่านิยายแฟนตาซีทั่วไป", category: "รีวิว", comments: "62", views: "4.8K" },
    { slug: "fantasy-worldbuilding", title: "อยากเริ่มเขียนนิยาย ต้องเตรียมตัวอย่างไรบ้าง?", category: "คำถาม", comments: "45", views: "2.1K" },
    { slug: "fantasy-recommendations", title: "คุณชอบตอนจบแบบไหนมากที่สุด?", category: "โหวต", comments: "89", views: "4.1K" },
    { slug: "clockwork-character", title: "ทฤษฎีตัวละครลับใน The Clockwork Garden", category: "สปอยล์", comments: "96", views: "5.7K" },
  ],
  คุยทั่วไป: [
    { slug: "clockwork-character", title: "ฤดูไหนเหมาะกับการอ่านนิยายที่สุด?", category: "พูดคุย", comments: "24", views: "1.7K" },
    { slug: "clockwork-review", title: "มีนิยายเรื่องไหนที่อ่านแล้ววางไม่ลงบ้างครับ", category: "พูดคุย", comments: "31", views: "2.1K" },
    { slug: "fantasy-worldbuilding", title: "วันหยุดนี้อ่านอะไรอยู่?", category: "พูดคุย", comments: "68", views: "3.4K" },
    { slug: "fantasy-recommendations", title: "แนะนำบ้านนักเขียนของคุณหน่อย", category: "พูดคุย", comments: "52", views: "2.8K" },
    { slug: "september-writing-challenge", title: "เพื่อน ๆ ฟังเพลงตอนอ่านนิยายไหม?", category: "พูดคุย", comments: "39", views: "1.9K" },
  ],
  รีวิว: [
    { slug: "clockwork-review", title: "รีวิว: The Clockwork Garden - มากกว่านิยายแฟนตาซีทั่วไป", category: "รีวิว", comments: "62", views: "4.8K" },
    { slug: "fantasy-recommendations", title: "รีวิว: แฟนตาซีในสวน", category: "รีวิว", comments: "28", views: "2.3K" },
    { slug: "fantasy-worldbuilding", title: "รีวิว: เมืองที่มีโคมไฟ", category: "รีวิว", comments: "41", views: "3.1K" },
    { slug: "clockwork-character", title: "รีวิว: สถานีลับกลางหมอก", category: "รีวิว", comments: "36", views: "2.7K" },
  ],
  คำถาม: [
    { slug: "fantasy-worldbuilding", title: "อยากเริ่มเขียนนิยาย ต้องเตรียมตัวอย่างไรบ้าง?", category: "คำถาม", comments: "45", views: "2.1K" },
    { slug: "clockwork-character", title: "การตั้งชื่อตัวละครที่ดูยังไงก็ไม่ซ้ำ?", category: "คำถาม", comments: "32", views: "1.6K" },
    { slug: "september-writing-challenge", title: "แนะนำเว็บไซต์หาข้อมูลโลกแฟนตาซีหน่อยครับ", category: "คำถาม", comments: "27", views: "1.3K" },
    { slug: "clockwork-review", title: "นิยายที่เขียนจบแล้ว ควรทำยังไงต่อ?", category: "คำถาม", comments: "51", views: "2.0K" },
  ],
  โหวต: [
    { slug: "fantasy-recommendations", title: "คุณชอบตอนจบแบบไหนมากที่สุด?", category: "โหวต", comments: "89", views: "4.1K" },
    { slug: "clockwork-character", title: "กำลังเลือกพล็อตเรื่องใหม่ให้ตัวละคร คุณจะเลือกอะไร?", category: "โหวต", comments: "72", views: "3.6K" },
    { slug: "clockwork-review", title: "คุณอ่านนิยายผ่านช่องทางไหนมากที่สุด?", category: "โหวต", comments: "41", views: "2.4K" },
    { slug: "september-writing-challenge", title: "แนวไหนกำลังมาแรงใน ArnSpace มากที่สุด?", category: "โหวต", comments: "58", views: "3.0K" },
  ],
  "สปอยล์/ทฤษฎี": [
    { slug: "clockwork-character", title: "ทฤษฎีตัวละครลับใน The Clockwork Garden", category: "สปอยล์", comments: "96", views: "5.7K" },
    { slug: "clockwork-review", title: "[สปอยล์] ตอนจบที่ทุกคนรอคอย", category: "สปอยล์", comments: "74", views: "4.2K" },
    { slug: "fantasy-recommendations", title: "เดาทฤษฎีบทต่อไปจากสัญลักษณ์บนแผนที่", category: "สปอยล์", comments: "53", views: "3.6K" },
    { slug: "fantasy-worldbuilding", title: "สปอยล์แฟนตาซีเรื่องโปรด: ใครคือผู้พิทักษ์ตัวจริง?", category: "สปอยล์", comments: "42", views: "2.9K" },
  ],
};

function SidebarCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`ds-card p-3 ${className}`}>{children}</section>;
}

function CardHeader({ title, showAll = true, href = "#community-feed-title" }: { title: string; showAll?: boolean; href?: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <h2 className="sidebar-title">{title}</h2>
      {showAll && <Link href={href} className="sidebar-link ml-auto transition hover:text-[#8affc0]">ดูทั้งหมด →</Link>}
    </div>
  );
}

function CommunitySidebar({ showDiscussionThreads = false, discussionFilter = "ทั้งหมด" }: { showDiscussionThreads?: boolean; discussionFilter?: string }) {
  const recentCommentedThreads = recentCommentedThreadsByFilter[discussionFilter] ?? recentCommentedThreadsByFilter["ทั้งหมด"];
  const recentReplyTimes = recentReplyTimesByFilter[discussionFilter] ?? recentReplyTimesByFilter["ทั้งหมด"];

  return (
    <aside aria-label="ข้อมูลชุมชนเพิ่มเติม" className="space-y-3">
      <SidebarCard>
        <div className="mb-2.5 flex items-center gap-2">
          <h2 className="sidebar-title">กำลังพูดถึง</h2>
          <Link href="/community/topics" className="sidebar-link ml-auto transition hover:text-arn-accent-soft">ดูทั้งหมด →</Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-arn-border bg-arn-surface">
          {trendingTopics.map((topic, index) => (
            <Link
              key={topic.tag}
              href={`/community/topics/${topic.slug}`}
              className="group flex min-h-8 items-center gap-2 border-b border-arn-border px-2 py-1.5 transition-colors last:border-b-0 hover:bg-arn-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-arn-accent"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-arn-accent/20 text-[11px] font-semibold leading-none text-arn-accent transition-colors group-hover:bg-arn-accent group-hover:text-arn-accent-ink">{index + 1}</span>
              <span className="min-w-0 flex-1 truncate text-[11px] text-arn-muted group-hover:text-arn-text">{topic.tag}</span>
              <span className="shrink-0 text-[10px] text-arn-subtle">{topic.posts} โพสต์</span>
            </Link>
          ))}
        </div>
      </SidebarCard>

      {showDiscussionThreads && (
        <SidebarCard>
          <div className="mb-2.5 flex items-center gap-2">
            <h2 className="sidebar-title">กระทู้ที่คุณตอบล่าสุด</h2>
            <Link href="/community/discussion/recent-replies" className="sidebar-link ml-auto transition hover:text-arn-accent-soft">ดูทั้งหมด →</Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-arn-border bg-arn-surface">
            {recentCommentedThreads.map((thread, index) => (
              <Link
                key={`${thread.slug}-${thread.title}`}
                href={`/community/posts/${thread.slug}?from=community-discussion`}
                className="group flex min-w-0 items-center gap-2 border-b border-arn-border px-2 py-2 transition-colors last:border-b-0 hover:bg-arn-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-arn-accent"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-arn-accent/20 text-[11px] font-semibold leading-none text-arn-accent transition-colors group-hover:bg-arn-accent group-hover:text-arn-accent-ink">{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="sidebar-item-title block line-clamp-2 text-white/90 group-hover:text-arn-text">{thread.title}</span>
                    <span className="sidebar-meta block truncate text-white/55">{recentReplyTimes[index] ?? "วันนี้"}</span>
                  </span>
                </Link>
            ))}
          </div>
        </SidebarCard>
      )}

      <SidebarCard>
        <CardHeader title="กิจกรรม" href={showDiscussionThreads ? "/community?section=events" : undefined} />
        <div className="space-y-2.5">
          {events.map((event) => (
            <Link key={event.title} href={`/community/events/${event.slug}`} className="flex gap-2 rounded-md transition hover:bg-arn-surface-soft">
              <Image alt={`ภาพกิจกรรม ${event.title}`} className="h-12 w-[68px] shrink-0 rounded border border-white/10 object-cover" height={48} src={event.image} width={68} />
              <div className="min-w-0 flex-1">
                <p className="sidebar-item-title truncate text-white/90">{event.title}</p>
                <p className="sidebar-caption text-white/45">{event.date}</p>
                <p className="sidebar-meta text-white/55">♙ {event.participants}</p>
              </div>
            </Link>
          ))}
        </div>
      </SidebarCard>

      <section aria-label="แรงบันดาลใจจากชุมชน" className="ds-card relative aspect-square overflow-hidden">
        <Image alt="เรื่องราวของคุณอาจเป็นแรงบันดาลใจให้ใครบางคนเริ่มต้นเขียนเรื่องราวของตัวเอง" className="object-cover" fill sizes="330px" src="/images/community/inspiration-banner-square-text.png" />
      </section>
    </aside>
  );
}

export default CommunitySidebar;
