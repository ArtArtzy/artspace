import { faEye, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { ReactNode } from "react";
import CommunityTagLinks from "@/components/CommunityTagLinks";
import { getCommunityReplyCount } from "@/data/communityReplies";
import { communityRooms, getNewRoomThreads, type CommunityRoom } from "@/data/communityRooms";
import { cartoonFeaturedThreads, fanficFeaturedThreads, novelFeaturedThreadSlugs } from "@/data/readThreads";
import { communityRoomHref, communityTagKey } from "@/data/communityTags";
import { communityThreadTime } from "@/data/communityThreadTime";
import { communityPostPreview } from "@/data/communitySpoilers";

export type FeedPost = {
  slug: string;
  user: string;
  avatar: string;
  badge: string;
  badgeClass: string;
  age: string;
  updatedAt?: number;
  title: string;
  body: string;
  tags: string[];
  likes: string;
  views?: number;
  image?: string;
  imageAlt?: string;
  gallery?: { image: string; title: string }[];
  galleryAlt?: string;
};

export const feedPosts: FeedPost[] = [
  {
    slug: "clockwork-character",
    user: "Moonlight",
    avatar: "/images/writers/moonlit.webp",
    badge: "พูดคุย",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "2 ชั่วโมงที่แล้ว",
    title: "ใครเคยรู้สึกว่า “ตัวละครรอง” ดึงดูดใจกว่าพระเอกบ้าง?",
    body: "เรากำลังอ่าน The Clockwork Garden แล้วแบบ...หลงรักคุณโลเวลล์มาก ทั้งที่รู้ไม่ควรนะ 555 อยากมาชวนคุยว่าตัวละครไหนที่ทุกคนรู้สึกว่าโดดเด่นเกินหน้าเอกบ้าง",
    tags: ["#TheClockworkGarden", "#ตัวละครรอง", "#คุยกันน้า"],
    likes: "428",
    views: 1489,
    image: "/images/community/community-portal.webp",
    imageAlt: "ปราสาทแฟนตาซีใต้แสงจันทร์",
  },
  {
    slug: "clockwork-review",
    user: "LunaWriter",
    avatar: "/images/writers/purplemoon.webp",
    badge: "รีวิว",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "5 ชั่วโมงที่แล้ว",
    title: "รีวิว The Clockwork Garden หลังอ่านจบ 30 ตอน",
    body: "เป็นนิยายที่ได้ทั้งรายละเอียดแน่นมาก การวางปมและบรรยากาศคือสุดยอด ชอบการค่อย ๆ เผยปริศนาและการผูกปมเล่น ทำให้น่าติดตามจนหยุดอ่านไม่ได้เลย",
    tags: ["#TheClockworkGarden", "#แฟนตาซี", "#แนะนำให้อ่าน"],
    likes: "512",
    views: 1734,
    image: "/images/community/community-library.webp",
    imageAlt: "ห้องสมุดแฟนตาซีอบอุ่น",
  },
  {
    slug: "fantasy-recommendations",
    user: "ReaderNo.9",
    avatar: "/images/writers/kuroi.webp",
    badge: "แนะนำ",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "8 ชั่วโมงที่แล้ว",
    title: "5 นิยายแฟนตาซีที่ควรอ่านถ้าคุณชอบโลกคอมเมติกแบบละมุน",
    body: "รวมเรื่องที่เราแนะนำให้ทั้งนักเขียน ตัวละครน่ารัก และบรรยากาศชวนฝัน ใครเคยอ่านกันแล้วมาแชร์กันได้นะ",
    tags: ["#แฟนตาซี", "#โลกเวทมนตร์", "#แนะนำ"],
    likes: "1.2K",
    views: 4312,
    gallery: [
      { image: "/images/category-books/fantasy-01.webp", title: "นครลับเหนือม่านหมอก" },
      { image: "/images/category-books/fantasy-02.webp", title: "ผู้พิทักษ์แห่งสวนดาว" },
      { image: "/images/category-books/fantasy-03.webp", title: "คัมภีร์แห่งหุบเขาคราม" },
      { image: "/images/category-books/fantasy-04.webp", title: "เจ้าหญิงกับจิ้งจอกเงิน" },
      { image: "/images/category-books/fantasy-05.webp", title: "หอคอยเวทมนตร์แห่งจันทร์" },
    ],
    galleryAlt: "ภาพบรรยากาศนิยายแฟนตาซี",
  },
  {
    slug: "fantasy-worldbuilding",
    user: "WriteDream",
    avatar: "/images/writers/lunarblack.webp",
    badge: "ห้องนักเขียน",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "10 ชั่วโมงที่แล้ว",
    title: "ถามหน่อยค่ะ การเขียนฉากบรรยายเมืองแฟนตาซี ควรเริ่มจากอะไร?",
    body: "ตอนนี้กำลังเขียนนิยายอยู่แต่ยังไม่มั่นใจว่าจะเริ่มบรรยายเมืองยังไงดี อยากรู้ว่าทุกคนวางโครงเมืองไว้ก่อน มีทริคหรือแหล่งอ้างอิงแนะนำไหมคะ",
    tags: ["#การเขียนนิยาย", "#worldbuilding", "#ห้องนักเขียน"],
    likes: "286",
    views: 1039,
    image: "/images/community/community-library.webp",
    imageAlt: "โต๊ะนักเขียนในห้องสมุด",
  },
  {
    slug: "september-writing-challenge",
    user: "Aria",
    avatar: "/images/writers/akistudio.webp",
    badge: "กิจกรรม",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "1 วันที่แล้ว",
    title: "September Writing Challenge มาเริ่มเขียนไปด้วยกัน! ✨",
    body: "30 วัน 30 บรรทัด ใครอยากลองมาเริ่มเขียนไปด้วยกันนะ มาร่วมทำภารกิจเล็ก ๆ ไปด้วยกันค่ะ ใครว่างช่วงไหนมาแชร์กันได้เลย!",
    tags: ["#SeptemberWritingChallenge", "#เขียนทุกวัน", "#ArnSpace"],
    likes: "884",
    views: 3289,
    image: "/images/community/community-writing-challenge.webp",
    imageAlt: "โต๊ะเขียนหนังสือสำหรับกิจกรรม September Writing Challenge",
  },
];

const interestingThreads: FeedPost[] = [
  {
    slug: "supporting-character-talk",
    user: "Aria",
    avatar: "/images/writers/akistudio.webp",
    badge: "พูดคุย",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "3 ชั่วโมงที่แล้ว",
    title: "ตัวละครรองแบบไหนที่ทำให้คุณจำเรื่องนั้นได้ไม่ลืม?",
    body: "ชวนคุยเรื่องตัวละครที่ไม่ได้เป็นพระเอกหรือนางเอก แต่กลับขโมยซีนทุกครั้งที่ปรากฏตัว",
    tags: ["#ตัวละคร", "#ชวนคุย"],
    likes: "246",
    views: 1200,
  },
  {
    slug: "writing-together",
    user: "Moonlight",
    avatar: "/images/writers/moonlit.webp",
    badge: "กิจกรรม",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "4 ชั่วโมงที่แล้ว",
    title: "ถ้าได้เขียนนิยายกับเพื่อน อยากแบ่งหน้าที่กันแบบไหน?",
    body: "มาแชร์วิธีทำงานร่วมกันสำหรับคนที่อยากเริ่มโปรเจกต์เขียนเรื่องสั้นกับเพื่อน ๆ",
    tags: ["#เขียนด้วยกัน", "#นักเขียน"],
    likes: "189",
    views: 864,
  },
  {
    slug: "reading-recommendations-chat",
    user: "LunaWriter",
    avatar: "/images/writers/purplemoon.webp",
    badge: "แนะนำ",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "6 ชั่วโมงที่แล้ว",
    title: "มีเรื่องไหนที่อ่านแล้วอยากบอกต่อทันทีบ้าง?",
    body: "รวมเรื่องอ่านที่ทำให้ต้องส่งต่อให้เพื่อนทันที ใครมีเรื่องโปรดมาแนะนำกันได้เลย",
    tags: ["#แนะนำให้อ่าน", "#ป้ายยา"],
    likes: "312",
    views: 1500,
  },
  {
    slug: "arnspace-spoiler-free",
    user: "ReaderNo.9",
    avatar: "/images/writers/kuroi.webp",
    badge: "ห้องนักอ่าน",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "8 ชั่วโมงที่แล้ว",
    title: "อ่านเรื่องที่กำลังดังกันถึงตอนไหนแล้ว มาเช็กอินกันครับ",
    body: "ชวนคุยแบบไม่สปอยล์ว่าแต่ละคนกำลังตามอ่านเรื่องไหนอยู่ และชอบช่วงไหนที่สุด",
    tags: ["#นักอ่าน", "#ไม่สปอยล์"],
    likes: "205",
    views: 977,
  },
  {
    slug: "character-arc-question",
    user: "WriteDream",
    avatar: "/images/writers/lunarblack.webp",
    badge: "ห้องนักเขียน",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "12 ชั่วโมงที่แล้ว",
    title: "พัฒนาการตัวละครควรค่อย ๆ เปลี่ยนหรือหักมุมทีเดียวดี?",
    body: "อยากฟังประสบการณ์ของคนที่เขียน character arc ให้คนอ่านรู้สึกอินและเชื่อไปกับการเปลี่ยนแปลง",
    tags: ["#การเขียน", "#ตัวละคร"],
    likes: "174",
    views: 721,
  },
];

const reviewThreads: FeedPost[] = [
  {
    slug: "clockwork-garden-review",
    user: "LunaWriter",
    avatar: "/images/writers/purplemoon.webp",
    badge: "รีวิว",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "1 วันที่แล้ว",
    title: "รีวิว The Clockwork Garden หลังอ่านจบ 30 ตอน",
    body: "รีวิวแบบไม่สปอยล์สำหรับคนที่กำลังมองหาแฟนตาซีบรรยากาศอบอุ่นและมีปริศนาให้ค่อย ๆ แกะ",
    tags: ["#รีวิวนิยาย", "#แฟนตาซี"],
    likes: "132",
    views: 1100,
    image: "/images/community/community-portal.webp",
    imageAlt: "ภาพบรรยากาศแฟนตาซีสำหรับรีวิว The Clockwork Garden",
  },
  {
    slug: "moonlit-city-review",
    user: "WriteDream",
    avatar: "/images/writers/lunarblack.webp",
    badge: "รีวิว",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "2 วันที่แล้ว",
    title: "ความละมุนของ ‘ฤดูกาลที่ฝนตก’ ทำให้ใจอยู่ต่อ",
    body: "เรื่องที่เล่าอารมณ์และความสัมพันธ์ได้ละเอียด อ่านแล้วเหมือนได้พักใจอยู่ในเมืองเล็ก ๆ แห่งนั้น",
    tags: ["#รีวิว", "#โรแมนติก"],
    likes: "88",
    views: 692,
    image: "/images/community/community-library.webp",
    imageAlt: "ภาพห้องสมุดสำหรับรีวิวนิยายโรแมนติก",
  },
  {
    slug: "paper-boat-review",
    user: "ReaderNo.9",
    avatar: "/images/writers/kuroi.webp",
    badge: "รีวิว",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "3 วันที่แล้ว",
    title: "5 นิยายแฟนตาซีที่ควรอ่านถ้าคุณชอบโลกเวทมนตร์แสนละมุน",
    body: "คัดเรื่องที่มีโลกน่าอยู่ ตัวละครน่ารัก และบรรยากาศชวนฝันมาแบ่งปันให้ทุกคน",
    tags: ["#รีวิวรวม", "#แนะนำให้อ่าน"],
    likes: "176",
    views: 1300,
    image: "/images/category-books/fantasy-03.webp",
    imageAlt: "ภาพปกนิยายแฟนตาซีสำหรับรีวิวรวม",
  },
  {
    slug: "novel-ending-review",
    user: "Aria",
    avatar: "/images/writers/akistudio.webp",
    badge: "รีวิว",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "4 วันที่แล้ว",
    title: "อ่านจบแล้วอยากชวนคุย: ตอนจบแบบนี้พอดีกับเรื่องไหม?",
    body: "ชวนแลกเปลี่ยนมุมมองเรื่องจังหวะตอนจบและความรู้สึกหลังวางเรื่องลง โดยคุยแบบไม่สปอยล์",
    tags: ["#รีวิวหลังอ่านจบ", "#ชวนคุย"],
    likes: "104",
    views: 804,
    image: "/images/community/community-tree.webp",
    imageAlt: "ภาพบรรยากาศธรรมชาติสำหรับรีวิวหนังสือ",
  },
  {
    slug: "fantasy-shelf-review",
    user: "Moonlight",
    avatar: "/images/writers/moonlit.webp",
    badge: "รีวิว",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "5 วันที่แล้ว",
    title: "รวมเรื่องอ่านเพลินสำหรับวันหยุดที่อยากอยู่กับตัวเอง",
    body: "รีวิวสั้น ๆ ของนิยายหลายอารมณ์ที่เหมาะกับการอ่านยาว ๆ ในวันสบาย ๆ",
    tags: ["#ชั้นหนังสือ", "#รีวิว"],
    likes: "92",
    views: 648,
    image: "/images/community/community-hood.webp",
    imageAlt: "ภาพปกนิยายสำหรับรวมรีวิวอ่านเพลิน",
  },
];

const feedThreads = [...feedPosts, ...interestingThreads, ...reviewThreads];

export const featuredThreadsByMode = {
  novel: novelFeaturedThreadSlugs.flatMap((slug) => feedThreads.filter((post) => post.slug === slug)),
  fanfic: fanficFeaturedThreads,
  cartoon: cartoonFeaturedThreads,
};

const roomIds = Object.keys(communityRooms) as CommunityRoom[];
const generalThreadSlugs = new Set(["reading-recommendations-chat", "arnspace-spoiler-free"]);

export const communityThreadsByRoom = {
  general: [...getNewRoomThreads("general"), ...interestingThreads.filter((post) => generalThreadSlugs.has(post.slug))],
  novel: [
    ...getNewRoomThreads("novel"),
    ...featuredThreadsByMode.novel,
    ...interestingThreads.filter((post) => !generalThreadSlugs.has(post.slug)),
  ],
  fanfic: [...getNewRoomThreads("fanfic"), ...featuredThreadsByMode.fanfic],
  cartoon: [...getNewRoomThreads("cartoon"), ...featuredThreadsByMode.cartoon],
} satisfies Record<CommunityRoom, FeedPost[]>;

export const communityThreadPosts = [
  ...new Map([...feedThreads, ...roomIds.flatMap((room) => communityThreadsByRoom[room])].map((post) => [post.slug, post])).values(),
];

export function findCommunityThreadRoom(slug: string) {
  return roomIds.find((room) => communityThreadsByRoom[room].some((post) => post.slug === slug));
}

function CommentIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5.5h16v11H9l-5 3v-14Z" /></svg>;
}

const viewCountFormatter = new Intl.NumberFormat("th-TH");

export function formatThreadViews(views = 0) {
  return viewCountFormatter.format(views);
}

export function ThreadMetrics({ post }: { post: FeedPost }) {
  const replyCount = getCommunityReplyCount(post.slug);
  const views = formatThreadViews(post.views);

  return (
    <div className="flex flex-col items-end gap-1 text-ds-meta text-arn-muted sm:flex-row sm:items-center sm:gap-ds-3">
      <span aria-label={`ความคิดเห็น ${replyCount}`} className="inline-flex items-center gap-1">
        <CommentIcon />{replyCount}
      </span>
      <span aria-label={`ยอดเข้าชม ${views}`} className="inline-flex items-center gap-1">
        <FontAwesomeIcon aria-hidden="true" className="h-4 w-4" icon={faEye} />{views}
      </span>
    </div>
  );
}

function RoomThreadRow({ post, room }: { post: FeedPost; room: CommunityRoom }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-ds-3 px-ds-4 py-ds-4">
      <div className="min-w-0 space-y-ds-2">
        <div>
          <h4 className="text-ds-body font-semibold">
            <Link className="rounded-ds-sm text-arn-text transition hover:text-arn-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arn-accent" href={`/community/posts/${post.slug}`}>{post.title}</Link>
          </h4>
          <p className="mt-ds-1 line-clamp-2 break-words text-ds-body-sm text-arn-muted">{communityPostPreview(post.body)}</p>
        </div>
        <CommunityTagLinks room={room} tags={post.tags} />
        <p className="flex flex-wrap gap-x-ds-2 text-ds-meta text-arn-subtle">
          <span>{post.user}</span>
          <span>อัปเดตล่าสุด {communityThreadTime(post)}</span>
        </p>
      </div>
      <ThreadMetrics post={post} />
    </li>
  );
}

const roomPageSize = 10;

export default function CommunityFeed({ room, posts = communityThreadsByRoom[room], tag = "", page = 1, headerAction }: { room: CommunityRoom; posts?: FeedPost[]; tag?: string; page?: number; headerAction?: ReactNode }) {
  const { label, description, pinnedThreadSlugs } = communityRooms[room];
  const pinnedSlugs = new Set<string>(pinnedThreadSlugs);
  const tagKey = communityTagKey(tag);
  const matchingPosts = posts.filter((post) => !tagKey || post.tags.some((value) => communityTagKey(value) === tagKey));
  const shownPins = matchingPosts.filter((post) => pinnedSlugs.has(post.slug));
  const filteredPosts = matchingPosts.filter((post) => !pinnedSlugs.has(post.slug));
  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / roomPageSize));
  const currentPage = Math.min(page, pageCount);
  const shownPosts = filteredPosts.slice((currentPage - 1) * roomPageSize, currentPage * roomPageSize);

  return (
    <section aria-labelledby="community-feed-title" className="min-w-0 space-y-ds-6">
      <header>
        <div className="flex items-center justify-between gap-ds-3">
          <div className="min-w-0">
            <h2 className="text-ds-h2" id="community-feed-title">{label}</h2>
            <p className="mt-ds-1 text-ds-body-sm text-arn-muted">{description}</p>
          </div>
          {headerAction}
        </div>
        {tag && (
          <div className="mt-ds-3 flex flex-wrap items-center gap-ds-2 text-ds-body-sm">
            <span className="text-arn-accent-soft">แท็ก #{tag}</span>
            <Link className="ds-button-secondary px-ds-3" href={communityRoomHref(room)}>ล้างตัวกรอง</Link>
          </div>
        )}
      </header>
      {shownPins.length > 0 && (
        <section aria-labelledby="community-pinned-title" className="ds-section border-arn-border-strong">
          <h3 className="flex items-center gap-ds-2 border-b border-arn-border-strong bg-arn-raised px-ds-4 py-ds-3 text-ds-h3 text-section-community" id="community-pinned-title">
            <FontAwesomeIcon aria-hidden="true" className="h-4 w-4" icon={faThumbtack} />
            กระทู้ปักหมุด
          </h3>
          <ul className="divide-y divide-arn-border">
            {shownPins.map((post) => <RoomThreadRow key={post.slug} post={post} room={room} />)}
          </ul>
        </section>
      )}
      <section aria-labelledby="community-room-threads-title" className="ds-section">
        <h3 className="border-b border-arn-border px-ds-4 py-ds-3 text-ds-h3" id="community-room-threads-title">{room === "general" ? "กระทู้ทั่วไป" : "กระทู้ในห้อง"}</h3>
        {shownPosts.length ? (
          <ul className="divide-y divide-arn-border">
            {shownPosts.map((post) => <RoomThreadRow key={post.slug} post={post} room={room} />)}
          </ul>
        ) : (
          <p className="p-ds-4 text-ds-body-sm text-arn-muted">ไม่พบกระทู้{tag ? `ในแท็ก #${tag}` : "ในห้องนี้"}</p>
        )}
        {pageCount > 1 && (
          <nav aria-label="หน้ารายการกระทู้" className="flex flex-wrap justify-center gap-ds-2 border-t border-arn-border px-ds-4 py-ds-3">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <Link
                aria-current={currentPage === number ? "page" : undefined}
                aria-label={`หน้า ${number}`}
                className={`min-w-10 px-ds-2 ${currentPage === number ? "ds-button-primary" : "ds-button-secondary"}`}
                href={communityRoomHref(room, { tag, page: number })}
                key={number}
              >
                {number}
              </Link>
            ))}
          </nav>
        )}
      </section>
    </section>
  );
}
