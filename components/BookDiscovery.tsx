import Image from "next/image";
import Link from "next/link";
import { getCategorySections } from "@/data/categoryBooks";

type Book = {
  title: string;
  author: string;
  category: string;
  episodes: string;
  views: string;
  likes: string;
  image: string;
};

const sections: { title: string; subtitle: string; books: Book[] }[] = [
  {
    title: "นิยายแนะนำ",
    subtitle: "เรื่องราวน่าอ่านที่คัดมาให้ในตอนนี้",
    books: [
      { title: "แสงระหว่างบรรทัด", author: "LunarBlack", category: "โรแมนติก", episodes: "42", views: "1.2M", likes: "24.5K", image: "/images/book-between-lines.webp" },
      { title: "สอนใจในหน้าร้อน", author: "Moonlit", category: "โรแมนติก", episodes: "28", views: "856K", likes: "18.2K", image: "/images/book-summer-lessons.webp" },
      { title: "พันธนาการทิวลิป", author: "Krittanai", category: "แฟนตาซี", episodes: "36", views: "980K", likes: "18.6K", image: "/images/book-tulip-bound.webp" },
      { title: "ภาพถ่ายในสายฝน", author: "mebell", category: "โรแมนติก", episodes: "19", views: "620K", likes: "12.4K", image: "/images/book-photographs-rain.webp" },
      { title: "บ้านหลังสุดท้าย", author: "NaowWriter", category: "ลึกลับ", episodes: "31", views: "540K", likes: "11.8K", image: "/images/book-last-house.webp" },
      { title: "กุหลาบในเงาไฟ", author: "Aris", category: "โรแมนติก", episodes: "24", views: "430K", likes: "9.4K", image: "/images/book-roses-fire.webp" },
    ],
  },
  {
    title: "แฟนฟิคน่าอ่าน",
    subtitle: "ต่อยอดเรื่องราวที่คุณรัก จากมุมมองของนักเขียนทั่วโลก",
    books: [
      { title: "Not Just Friends (BTS)", author: "purplemoon", category: "วาย", episodes: "58", views: "1.8M", likes: "32.1K", image: "/images/book-not-just-friends.webp" },
      { title: "Love in Parallel (Harry Potter)", author: "felixs", category: "แฟนตาซี", episodes: "44", views: "1.1M", likes: "24.3K", image: "/images/book-love-parallel.webp" },
      { title: "Our Classroom", author: "rainymew", category: "วาย", episodes: "33", views: "920K", likes: "20.5K", image: "/images/book-our-classroom.webp" },
      { title: "Kissed by the Stars", author: "seriian", category: "แฟนตาซี", episodes: "27", views: "660K", likes: "15.2K", image: "/images/book-kissed-stars.webp" },
      { title: "Rewrite the End", author: "felixs", category: "แอ๊กชั่น", episodes: "21", views: "410K", likes: "11.4K", image: "/images/book-rewrite-end.webp" },
      { title: "The Villain's Side", author: "sorayoru", category: "ลึกลับ", episodes: "39", views: "780K", likes: "18.7K", image: "/images/book-villains-side.webp" },
    ],
  },
  {
    title: "การ์ตูนมาแรง",
    subtitle: "เรื่องราวที่ได้ใจ…และกำลังถูกพูดถึงในวงกว้าง",
    books: [
      { title: "Sky of Tomorrow", author: "AkiStudio", category: "แฟนตาซี", episodes: "26", views: "620K", likes: "14.1K", image: "/images/book-sky-tomorrow.webp" },
      { title: "Lemon Days", author: "sorani", category: "โรแมนติก", episodes: "32", views: "950K", likes: "18.9K", image: "/images/book-lemon-days.webp" },
      { title: "Blood Moon", author: "Kuroi", category: "สยองขวัญ", episodes: "18", views: "520K", likes: "22.7K", image: "/images/book-blood-moon.webp" },
      { title: "City of Echoes", author: "Panthera", category: "ลึกลับ", episodes: "29", views: "480K", likes: "11.9K", image: "/images/book-city-echoes.webp" },
      { title: "Pixel Heart", author: "Mochi", category: "คอมเมดี้", episodes: "22", views: "430K", likes: "10.4K", image: "/images/book-pixel-heart.webp" },
      { title: "Parallel World", author: "Nagi", category: "แฟนตาซี", episodes: "25", views: "390K", likes: "9.8K", image: "/images/book-parallel-world.webp" },
    ],
  },
];

const badgeColors: Record<string, string> = {
  โรแมนติก: "bg-[#e84b9b]",
  วาย: "bg-[#478fff]",
  แฟนตาซี: "bg-[#9b5cff]",
  ลึกลับ: "bg-[#64748b]",
  สยองขวัญ: "bg-[#bc79ff]",
  แอ๊กชั่น: "bg-[#ff6d55]",
  คอมเมดี้: "bg-[#f4cf4e]",
};

function EyeIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M2.7 12s3.3-5.4 9.3-5.4 9.3 5.4 9.3 5.4-3.3 5.4-9.3 5.4S2.7 12 2.7 12Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>;
}

function HeartIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M12 19.3S4.2 14.9 4.2 9.4a3.7 3.7 0 0 1 6.6-2.3L12 8.4l1.2-1.3a3.7 3.7 0 0 1 6.6 2.3c0 5.5-7.8 9.9-7.8 9.9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}

function EpisodeIcon() {
  return <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><path d="M6.5 4.5h8.8a2.2 2.2 0 0 1 2.2 2.2v12.8H8.7a2.2 2.2 0 0 1-2.2-2.2V4.5Z" stroke="currentColor" strokeWidth="1.7" /><path d="M9.5 8h5M9.5 11.3h5M9.5 14.6h3.2M17.5 19.5h2V6.7a2.2 2.2 0 0 0-2.2-2.2h-.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" /></svg>;
}

function BookCard({ book }: { book: Book }) {
  return (
    <Link
      aria-label={`เปิดเรื่อง ${book.title}`}
      className="group block min-w-0 cursor-pointer rounded-[9px] border border-transparent p-1 transition duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.025] hover:shadow-[0_12px_26px_rgba(19,230,104,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
      href={`/read?title=${encodeURIComponent(book.title)}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-[7px] bg-[#18201c]">
        <Image src={book.image} alt={`ปกหนังสือ ${book.title}`} fill sizes="(max-width: 1400px) 14vw, 190px" className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07100c]/90 to-transparent" />
        <span className={`absolute right-1.5 top-1.5 rounded-md px-2 py-1 text-[10px] font-medium leading-none text-white shadow-lg ${badgeColors[book.category] ?? "bg-[#1cae68]"}`}>
          {book.category}
        </span>
      </div>
      <h3 className="mt-2 truncate text-[13px] font-medium leading-5 text-white" title={book.title}>{book.title}</h3>
      <p className="truncate text-[11px] text-white/45">{book.author}</p>
      <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/55">
        <span aria-label={`จำนวนตอน ${book.episodes}`} className="inline-flex cursor-help items-center gap-1" title={`จำนวนตอน: ${book.episodes}`}><EpisodeIcon />{book.episodes}</span>
        <span aria-label={`จำนวนวิว ${book.views}`} className="inline-flex cursor-help items-center gap-1" title={`จำนวนวิว: ${book.views}`}><EyeIcon />{book.views}</span>
        <span aria-label={`จำนวนไลก์ ${book.likes}`} className="inline-flex cursor-help items-center gap-1" title={`จำนวนไลก์: ${book.likes}`}><HeartIcon />{book.likes}</span>
      </div>
    </Link>
  );
}

function PromoCard({ image, eyebrow, quote, action, href }: { image: string; eyebrow: string; quote: string; action: string; href: string }) {
  return (
    <Link
      aria-label={action}
      className="group relative block min-h-0 flex-1 cursor-pointer overflow-hidden rounded-[8px] border border-white/15 bg-[#18211d] shadow-[0_0_0_1px_rgba(33,194,98,.06),0_8px_18px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-0.5 hover:border-[#4af58c] hover:shadow-[0_10px_24px_rgba(19,230,104,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29ef82]"
      href={href}
    >
      <Image src={image} alt="" fill sizes="290px" className="object-cover opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07100c]/75 via-[#07100c]/30 to-transparent" />
      <div className="relative flex h-full min-h-[198px] flex-col justify-end p-5">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#25dc77]">{eyebrow}</p>
        <p className="max-w-[220px] text-[20px] font-medium leading-tight text-white">“{quote}”</p>
        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#19d96a] px-4 py-2 text-[11px] font-medium text-[#32e87e] transition group-hover:bg-[#12d66f] group-hover:text-[#07100b]">{action}<span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}

export default function BookDiscovery({ selectedCategory }: { selectedCategory: string }) {
  const visibleSections = selectedCategory === "ทั้งหมด" ? sections : getCategorySections(selectedCategory);

  return (
    <section className="mx-auto max-w-[1400px] bg-[#0D0F0E] px-2 pb-12 pt-7 text-white" id="discover">
      <div className="grid grid-cols-[minmax(0,1fr)_290px] gap-6">
        <div className="space-y-8">
          {visibleSections.map((section) => (
            <div key={section.title}>
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <h2 className="text-[21px] font-medium leading-tight text-white">{section.title}</h2>
                  <p className="mt-1 text-[12px] text-white/50">{section.subtitle}</p>
                </div>
                {selectedCategory !== "ทั้งหมด" && (
                  <a href="/read" className="mb-1 inline-flex items-center gap-2 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]">ดูทั้งหมด <span aria-hidden="true">→</span></a>
                )}
              </div>
              <div className="grid grid-cols-6 gap-3">
                {section.books.map((book) => <BookCard key={book.title} book={book} />)}
              </div>
            </div>
          ))}
        </div>
        <aside className="flex h-full flex-col gap-3 pt-1">
          <PromoCard href="/read" image="/images/promo-discover-v2.webp" eyebrow="DISCOVER" quote="บางเรื่องราว อาจเป็นของคุณ..." action="เริ่มค้นหาเรื่องของคุณ" />
          <PromoCard href="/read/fanfic" image="/images/promo-fanfiction-v2.webp" eyebrow="FANFICTION" quote="เรื่องเดิม ในมุมที่ไม่เคยเห็น..." action="สำรวจแฟนฟิค" />
          <PromoCard href="/community" image="/images/promo-community-v2.webp" eyebrow="COMMUNITY" quote="ทุกบทที่คุณเล่า ได้ด้วยจินตนาการ" action="เข้าสู่หน้าชุมชน" />
        </aside>
      </div>
    </section>
  );
}
