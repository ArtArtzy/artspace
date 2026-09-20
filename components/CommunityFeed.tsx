import Image from "next/image";
import Link from "next/link";

export type FeedPost = {
  slug: string;
  user: string;
  avatar: string;
  badge: string;
  badgeClass: string;
  age: string;
  title: string;
  body: string;
  tags: string[];
  stats: [string, string, string];
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
    badgeClass: "bg-[#13bfa4] text-[#031611]",
    age: "2 ชั่วโมงที่แล้ว",
    title: "ใครเคยรู้สึกว่า “ตัวละครรอง” ดึงดูดใจกว่าพระเอกบ้าง?",
    body: "เรากำลังอ่าน The Clockwork Garden แล้วแบบ...หลงรักคุณโลเวลล์มาก ทั้งที่รู้ไม่ควรนะ 555 อยากมาชวนคุยว่าตัวละครไหนที่ทุกคนรู้สึกว่าโดดเด่นเกินหน้าเอกบ้าง",
    tags: ["#TheClockworkGarden", "#ตัวละครรอง", "#คุยกันน้า"],
    stats: ["428", "156", "89"],
    image: "/images/community/community-portal.webp",
    imageAlt: "ปราสาทแฟนตาซีใต้แสงจันทร์",
  },
  {
    slug: "clockwork-review",
    user: "LunaWriter",
    avatar: "/images/writers/purplemoon.webp",
    badge: "รีวิว",
    badgeClass: "bg-[#20b7bc] text-[#031619]",
    age: "5 ชั่วโมงที่แล้ว",
    title: "รีวิว The Clockwork Garden หลังอ่านจบ 30 ตอน",
    body: "เป็นนิยายที่ได้ทั้งรายละเอียดแน่นมาก การวางปมและบรรยากาศคือสุดยอด ชอบการค่อย ๆ เผยปริศนาและการผูกปมเล่น ทำให้น่าติดตามจนหยุดอ่านไม่ได้เลย",
    tags: ["#TheClockworkGarden", "#แฟนตาซี", "#แนะนำให้อ่าน"],
    stats: ["512", "79", "134"],
    image: "/images/community/community-library.webp",
    imageAlt: "ห้องสมุดแฟนตาซีอบอุ่น",
  },
  {
    slug: "fantasy-recommendations",
    user: "ReaderNo.9",
    avatar: "/images/writers/kuroi.webp",
    badge: "แนะนำ",
    badgeClass: "bg-[#6f58e9] text-white",
    age: "8 ชั่วโมงที่แล้ว",
    title: "5 นิยายแฟนตาซีที่ควรอ่านถ้าคุณชอบโลกคอมเมติกแบบละมุน",
    body: "รวมเรื่องที่เราแนะนำให้ทั้งนักเขียน ตัวละครน่ารัก และบรรยากาศชวนฝัน ใครเคยอ่านกันแล้วมาแชร์กันได้นะ",
    tags: ["#แฟนตาซี", "#โลกเวทมนตร์", "#แนะนำ"],
    stats: ["1.2K", "243", "312"],
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
    badgeClass: "bg-[#12a9b5] text-[#031519]",
    age: "10 ชั่วโมงที่แล้ว",
    title: "ถามหน่อยค่ะ การเขียนฉากบรรยายเมืองแฟนตาซี ควรเริ่มจากอะไร?",
    body: "ตอนนี้กำลังเขียนนิยายอยู่แต่ยังไม่มั่นใจว่าจะเริ่มบรรยายเมืองยังไงดี อยากรู้ว่าทุกคนวางโครงเมืองไว้ก่อน มีทริคหรือแหล่งอ้างอิงแนะนำไหมคะ",
    tags: ["#การเขียนนิยาย", "#worldbuilding", "#ห้องนักเขียน"],
    stats: ["286", "102", "39"],
    image: "/images/community/community-library.webp",
    imageAlt: "โต๊ะนักเขียนในห้องสมุด",
  },
  {
    slug: "september-writing-challenge",
    user: "Aria",
    avatar: "/images/writers/akistudio.webp",
    badge: "กิจกรรม",
    badgeClass: "bg-[#f3a51c] text-[#211503]",
    age: "1 วันที่แล้ว",
    title: "September Writing Challenge มาเริ่มเขียนไปด้วยกัน! ✨",
    body: "30 วัน 30 บรรทัด ใครอยากลองมาเริ่มเขียนไปด้วยกันนะ มาร่วมทำภารกิจเล็ก ๆ ไปด้วยกันค่ะ ใครว่างช่วงไหนมาแชร์กันได้เลย!",
    tags: ["#SeptemberWritingChallenge", "#เขียนทุกวัน", "#ArnSpace"],
    stats: ["884", "176", "289"],
    image: "/images/community/community-writing-challenge.webp",
    imageAlt: "โต๊ะเขียนหนังสือสำหรับกิจกรรม September Writing Challenge",
  },
];

function HeartIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 8.7c0 5.3-8.8 10.3-8.8 10.3S3.2 14 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" /></svg>;
}

function CommentIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5.5h16v11H9l-5 3v-14Z" /></svg>;
}

function BookmarkIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 4.5h12v16l-6-3.7-6 3.7v-16Z" /></svg>;
}

function PostStats({ stats }: { stats: FeedPost["stats"] }) {
  return (
    <div className="mt-3 flex items-center gap-5 text-[11px] text-white/55">
      <span className="inline-flex items-center gap-1.5"><HeartIcon />{stats[0]}</span>
      <span className="inline-flex items-center gap-1.5"><CommentIcon />{stats[1]}</span>
      <span className="inline-flex items-center gap-1.5"><BookmarkIcon />{stats[2]}</span>
    </div>
  );
}

function FeedCard({ post }: { post: FeedPost }) {
  return (
    <Link aria-label={`เปิดโพสต์ ${post.title}`} className="group block cursor-pointer" href={`/community/posts/${post.slug}`}>
      <article className="ds-card p-3 transition hover:-translate-y-0.5 hover:border-arn-accent sm:p-4">
      <header className="flex items-center gap-2.5">
        <Image alt={`รูปโปรไฟล์ ${post.user}`} className="h-8 w-8 rounded-full border border-white/20 object-cover" height={32} src={post.avatar} width={32} />
        <span className="text-xs font-medium text-white">{post.user}</span>
        <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${post.badgeClass}`}>{post.badge}</span>
        <span className="text-[10px] text-white/45">{post.age}</span>
      </header>

      <div className={`mt-2.5 ${post.image ? "grid gap-4 sm:grid-cols-[minmax(0,1fr)_112px]" : ""}`}>
        <div className="min-w-0">
          <h2 className="text-[16px] font-semibold leading-[1.35] text-white sm:text-[17px]">{post.title}</h2>
          <p className="mt-1.5 line-clamp-3 text-[12px] leading-[1.45] text-white/60">{post.body}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => <span key={tag} className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/65">{tag}</span>)}
          </div>
          <PostStats stats={post.stats} />
        </div>

        {post.image && (
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-md border border-white/10 bg-[#14221c] sm:block">
            <Image alt={post.imageAlt ?? "ภาพประกอบโพสต์"} className="object-cover" fill sizes="112px" src={post.image} />
          </div>
        )}
      </div>

      {post.gallery && (
        <div className="mt-3 grid grid-cols-5 gap-1.5 sm:gap-2">
          {post.gallery.map((item, index) => (
            <div className="min-w-0" key={item.image}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-[#14221c]">
                <Image alt={`${post.galleryAlt ?? "ภาพปกนิยาย"} ${index + 1}`} className="object-cover" fill sizes="(max-width: 640px) 18vw, 150px" src={item.image} />
              </div>
              <p className="mt-1.5 line-clamp-2 text-center text-[10px] leading-[1.35] text-white/75">{item.title}</p>
            </div>
          ))}
        </div>
      )}
      </article>
    </Link>
  );
}

export default function CommunityFeed() {
  return (
    <div className="min-w-0">
      <div className="w-full" id="community-feed-title">
        <div className="space-y-3">
          {feedPosts.map((post) => <FeedCard key={`${post.user}-${post.title}`} post={post} />)}
        </div>
      </div>
    </div>
  );
}
