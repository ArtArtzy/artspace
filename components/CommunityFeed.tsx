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
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
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
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
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
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
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
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
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
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: "1 วันที่แล้ว",
    title: "September Writing Challenge มาเริ่มเขียนไปด้วยกัน! ✨",
    body: "30 วัน 30 บรรทัด ใครอยากลองมาเริ่มเขียนไปด้วยกันนะ มาร่วมทำภารกิจเล็ก ๆ ไปด้วยกันค่ะ ใครว่างช่วงไหนมาแชร์กันได้เลย!",
    tags: ["#SeptemberWritingChallenge", "#เขียนทุกวัน", "#ArnSpace"],
    stats: ["884", "176", "289"],
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
    stats: ["246", "74", "1.2K"],
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
    stats: ["189", "53", "864"],
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
    stats: ["312", "96", "1.5K"],
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
    stats: ["205", "61", "977"],
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
    stats: ["174", "48", "721"],
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
    stats: ["132", "48", "1.1K"],
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
    stats: ["88", "32", "692"],
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
    stats: ["176", "65", "1.3K"],
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
    stats: ["104", "37", "804"],
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
    stats: ["92", "29", "648"],
    image: "/images/community/community-hood.webp",
    imageAlt: "ภาพปกนิยายสำหรับรวมรีวิวอ่านเพลิน",
  },
];

type CommunityFeedSectionIcon = "chat" | "pencil" | "star";

export const communityFeedSections = [
  { title: "พูดคุยล่าสุด", description: "อัปเดตบทสนทนาใหม่จากชุมชน", icon: "chat", posts: feedPosts, viewAllHref: "/community?section=discussion&filter=latest" },
  { title: "กระทู้น่าสนใจ", description: "กระทู้ที่กำลังได้รับความสนใจจากนักอ่านและนักเขียน", icon: "pencil", posts: interestingThreads, viewAllHref: "/community?section=discussion&filter=ทั้งหมด" },
  { title: "รีวิวที่น่าสนใจ", description: "มุมมองจากคนอ่านที่อยากชวนคุณไปค้นพบเรื่องใหม่", icon: "star", posts: reviewThreads, viewAllHref: "/community?section=discussion&filter=รีวิว" },
] satisfies Array<{ title: string; description: string; icon: CommunityFeedSectionIcon; posts: FeedPost[]; viewAllHref: string }>;

export const communityThreadPosts = communityFeedSections.flatMap((section) => section.posts);

function CommentIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5.5h16v11H9l-5 3v-14Z" /></svg>;
}

function ViewIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2.8 12s3.2-5.2 9.2-5.2 9.2 5.2 9.2 5.2-3.2 5.2-9.2 5.2S2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.3" /></svg>;
}

function SectionIcon({ icon }: { icon: CommunityFeedSectionIcon }) {
  if (icon === "chat") {
    return <svg aria-hidden="true" className="h-[30px] w-[30px]" viewBox="0 0 24 24"><path d="M4 4.5h16a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-8.8L5.1 19.6l.7-3.6H4a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" fill="currentColor" /><path d="M8 10.25h.01M12 10.25h.01M16 10.25h.01" stroke="var(--arn-color-canvas)" strokeLinecap="round" strokeWidth="2.4" /></svg>;
  }

  if (icon === "pencil") {
    return <svg aria-hidden="true" className="h-[30px] w-[30px]" viewBox="0 0 24 24"><path d="m4.1 15.9-.9 4.9 4.9-.9L19.4 8.6l-3.7-3.7L4.1 15.9Z" fill="currentColor" /><path d="m17.1 3.2 1.1-1.1a1.8 1.8 0 0 1 2.5 0L21 2.4a1.8 1.8 0 0 1 0 2.5l-1.1 1.1-2.8-2.8Z" fill="currentColor" /></svg>;
  }

  return <svg aria-hidden="true" className="h-[30px] w-[30px]" viewBox="0 0 24 24"><path d="m12 2.7 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.7Z" fill="currentColor" /></svg>;
}

function ThreadRow({ post }: { post: FeedPost }) {
  return (
    <Link aria-label={`เปิดกระทู้ ${post.title}`} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 border-t border-white/[0.08] px-3 py-2.5 transition hover:bg-arn-surface-soft sm:gap-3 sm:px-4" href={`/community/posts/${post.slug}?from=community-feed`}>
      <div className="min-w-0">
        <div className="flex min-w-0 items-center">
          <h3 className="min-w-0 truncate text-[12px] font-medium text-white/90 transition group-hover:text-white sm:text-[13px]">{post.title}</h3>
        </div>
        <div className="mt-1 flex min-w-0 items-center gap-2.5 text-[9px] text-white/45 sm:text-[10px]">
          <span className="truncate">{post.user}</span>
          <span className="shrink-0">{post.age}</span>
        </div>
      </div>

      <div className="hidden items-center gap-3 text-[10px] text-white/50 sm:flex">
        <span className="inline-flex items-center gap-1"><CommentIcon />{post.stats[1]}</span>
        <span className="inline-flex items-center gap-1"><ViewIcon />{post.stats[2]}</span>
      </div>
    </Link>
  );
}

function ThreadSection({ title, description, icon, posts, viewAllHref }: (typeof communityFeedSections)[number]) {
  return (
    <section className="ds-section overflow-hidden" aria-labelledby={`community-${title}`}>
      <header className="flex items-start justify-between gap-3 px-3 pb-2 pt-3 sm:px-4">
        <div className="flex min-w-0 items-start gap-3">
          <span aria-hidden="true" className="mt-0.5 flex h-[30px] w-[30px] shrink-0 items-center justify-center text-section-community">
            <SectionIcon icon={icon} />
          </span>
          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold leading-tight text-white" id={`community-${title}`}>{title}</h2>
            <p className="mt-1 truncate text-[10px] text-white/45 sm:text-[11px]">{description}</p>
          </div>
        </div>
        <Link className="shrink-0 pt-1 text-[10px] font-medium text-section-community transition hover:text-arn-accent-soft" href={viewAllHref}>ดูทั้งหมด →</Link>
      </header>
      <div>
        {posts.map((post) => <ThreadRow key={post.slug} post={post} />)}
      </div>
    </section>
  );
}

export default function CommunityFeed() {
  return (
    <div className="min-w-0" id="community-feed-title">
      <div className="space-y-4">
        {communityFeedSections.map((section) => <ThreadSection key={section.title} {...section} />)}
      </div>
    </div>
  );
}
