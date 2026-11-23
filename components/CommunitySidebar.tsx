import { faChevronRight, faCircleCheck, faShieldHalved, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { communityThreadsByRoom, ThreadMetrics, type FeedPost } from "@/components/CommunityFeed";
import { getCommunityReplyCount } from "@/data/communityReplies";
import { communitySectionHref, type CommunityRoom } from "@/data/communityRooms";
import { communityRules } from "@/data/communityRules";
import { communityRoomHref, communityTagKey, rankCommunityTags } from "@/data/communityTags";

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

function CommunitySidebar({ room, posts, tag = "" }: { room?: CommunityRoom; posts?: FeedPost[]; tag?: string }) {
  const threads = posts ?? (room ? communityThreadsByRoom[room] : []);
  const roomThreads = room && [...threads]
    .sort((a, b) => getCommunityReplyCount(b.slug) - getCommunityReplyCount(a.slug))
    .slice(0, 4);
  const popularTags = room ? rankCommunityTags(threads).slice(0, 8) : [];

  return (
    <aside aria-label="ข้อมูลชุมชนเพิ่มเติม" className="space-y-3">
      {room && popularTags.length > 0 && (
        <SidebarCard>
          <h2 className="sidebar-title mb-ds-2">แท็กยอดนิยม</h2>
          <ul className="divide-y divide-arn-border overflow-hidden rounded-ds-md border border-arn-border bg-arn-surface">
            {popularTags.map(({ label, count }) => {
              const active = communityTagKey(label) === communityTagKey(tag);
              return (
                <li key={label}>
                  <Link
                    aria-current={active ? "true" : undefined}
                    className={`flex min-h-11 items-center justify-between gap-ds-2 px-ds-3 py-ds-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-arn-accent ${active ? "bg-arn-raised text-arn-accent-soft" : "text-arn-muted hover:bg-arn-surface-soft hover:text-arn-text"}`}
                    href={communityRoomHref(room, { tag: active ? undefined : label })}
                  >
                    <span className="min-w-0 break-words text-ds-body-sm font-medium">#{label}</span>
                    <span className="sidebar-meta shrink-0 text-arn-subtle">{count} กระทู้</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </SidebarCard>
      )}
      <SidebarCard>
        <div className="mb-2.5 flex items-center gap-2">
          <h2 className="sidebar-title">{room ? "กระทู้ที่กำลังพูดถึงในห้อง" : "กำลังพูดถึง"}</h2>
          {!room && <Link href="/community/topics" className="sidebar-link ml-auto transition hover:text-arn-accent-soft">ดูทั้งหมด →</Link>}
        </div>
        <div className="overflow-hidden rounded-lg border border-arn-border bg-arn-surface">
          {roomThreads ? roomThreads.map((thread) => (
            <Link
              key={thread.slug}
              href={`/community/posts/${thread.slug}`}
              className="group flex min-h-11 flex-col items-start gap-ds-1 border-b border-arn-border px-ds-3 py-ds-2 transition-colors last:border-b-0 hover:bg-arn-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-arn-accent"
            >
              <span className="sidebar-item-title text-arn-muted group-hover:text-arn-text">{thread.title}</span>
              <ThreadMetrics post={thread} />
            </Link>
          )) : trendingTopics.map((topic, index) => (
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

      {room && (
        <SidebarCard className="border-arn-border-strong">
          <h2 className="sidebar-title flex items-center gap-ds-2 border-b border-arn-border pb-ds-2">
            <FontAwesomeIcon aria-hidden="true" className="h-4 w-4 text-section-community" icon={faShieldHalved} />
            กติกาชุมชน
          </h2>
          <ul className="my-ds-3 space-y-ds-2">
            {communityRules.map(({ title }) => (
              <li className="sidebar-body flex items-start gap-ds-2 text-arn-muted" key={title}>
                <FontAwesomeIcon aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 text-section-community" icon={faCircleCheck} />
                <span>{title}</span>
              </li>
            ))}
          </ul>
          <Link className="ds-button-secondary w-full gap-ds-2 rounded-full border-arn-accent text-arn-accent-soft" href={room === "general" ? "/community/rules" : `/community/rules?room=${room}`}>
            อ่านกติกาแบบเต็ม
            <FontAwesomeIcon aria-hidden="true" className="h-3 w-3" icon={faChevronRight} />
          </Link>
        </SidebarCard>
      )}

      <SidebarCard className={room ? "!p-ds-4" : undefined}>
        <CardHeader title="กิจกรรม" href={communitySectionHref("events")} />
        <div className={room ? "divide-y divide-arn-border" : "space-y-2.5"}>
          {events.map((event) => (
            <Link
              key={event.title}
              href={`/community/events/${event.slug}`}
              className={`flex items-start transition hover:bg-arn-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-arn-accent ${room ? "gap-ds-3 py-ds-3 first:pt-ds-1 last:pb-0" : "gap-ds-2 rounded-ds-md"}`}
            >
              <Image alt="" className={`h-12 shrink-0 rounded border border-arn-border object-cover ${room ? "w-16" : "w-[68px]"}`} height={48} src={event.image} width={room ? 64 : 68} />
              <div className={`min-w-0 flex-1${room ? " space-y-ds-1" : ""}`}>
                <p className={`sidebar-item-title ${room ? "break-words leading-snug" : "truncate text-white/90"}`}>{event.title}</p>
                <p className={`sidebar-caption ${room ? "text-arn-muted" : "text-white/45"}`}>{event.date}</p>
                <p className={`sidebar-meta ${room ? "flex items-center gap-ds-1 text-arn-muted" : "text-white/55"}`}>
                  {room ? <FontAwesomeIcon aria-hidden="true" className="h-3 w-3 shrink-0" icon={faUserGroup} /> : <span aria-hidden="true">♙ </span>}
                  {event.participants}
                </p>
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
