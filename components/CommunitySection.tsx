import Image from "next/image";

const writers = [
  { name: "LunarBlack", type: "นิยาย", image: "/images/writers/lunarblack.webp" },
  { name: "purplemoon", type: "แฟนฟิค", image: "/images/writers/purplemoon.webp" },
  { name: "AkiStudio", type: "การ์ตูน", image: "/images/writers/akistudio.webp" },
  { name: "Moonlit", type: "นิยาย", image: "/images/writers/moonlit.webp" },
  { name: "felixs", type: "แฟนฟิค", image: "/images/writers/felixs.webp" },
  { name: "Kuroi", type: "การ์ตูน", image: "/images/writers/kuroi.webp" },
];

const posts = [
  { title: "มาแนะนำเรื่องที่อ่านแล้วประทับใจกันหน่อย!", count: "128 โพสต์", image: "/images/community/community-cat.webp" },
  { title: "ถ้าเจอตัวละครได้ด้วยกัน คุณอยากให้เกิดอะไรขึ้น?", count: "94 โพสต์", image: "/images/community/community-artist.webp" },
  { title: "รีวิวอนิเม/นิยายที่ชอบ", count: "76 โพสต์", image: "/images/community/community-pink.webp" },
  { title: "มุมมองการเขียน สำหรับนักเขียนมือใหม่", count: "112 โพสต์", image: "/images/community/community-hood.webp" },
];

export default function CommunitySection() {
  return (
    <section aria-label="นักเขียนและชุมชน" className="mx-auto max-w-[1400px] bg-[#0D0F0E] px-2 pb-12 pt-2 text-white">
      <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(350px,1fr)] gap-6 border-t border-white/[0.08] pt-6">
        <div className="min-w-0">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[21px] font-medium leading-tight">นักเขียนแนะนำ</h2>
              <p className="mt-1 text-[12px] text-white/50">พบกับนักเขียนคุณภาพจากหลากหลายแนว</p>
            </div>
            <a href="#writers" className="mb-1 inline-flex shrink-0 items-center gap-2 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]">
              ดูทั้งหมด <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="grid grid-cols-6 gap-3" id="writers">
            {writers.map((writer) => (
              <article className="min-w-0 text-center" key={writer.name}>
                <div className="relative mx-auto h-[88px] w-[88px] overflow-hidden rounded-full border border-[#1ec765] bg-[#18211d] p-0.5 shadow-[0_0_0_2px_rgba(28,198,101,.15)]">
                  <Image alt={`รูปโปรไฟล์ ${writer.name}`} className="rounded-full object-cover" fill sizes="88px" src={writer.image} />
                </div>
                <h3 className="mt-2 truncate text-[12px] font-medium text-white" title={writer.name}>{writer.name}</h3>
                <p className="truncate text-[11px] text-white/50">{writer.type}</p>
                <button className="mx-auto mt-3 block h-7 w-[82%] rounded-full border border-[#18bd55] text-[11px] font-medium text-[#26df70] transition hover:bg-[#18bd55] hover:text-[#07100b]" type="button">
                  ติดตาม
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="min-w-0 border-l border-white/[0.08] pl-5">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[21px] font-medium leading-tight">ชุมชนกำลังพูดถึง</h2>
              <p className="mt-1 text-[12px] text-white/50">มาพบปะเรื่องที่น่าอ่านและประทับใจกันหน่อย!</p>
            </div>
            <a href="#community" className="mb-1 inline-flex shrink-0 items-center gap-2 text-[11px] font-medium text-[#2ee77b] transition hover:text-[#9bffc0]">
              ดูทั้งหมด <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="space-y-1" id="community">
            {posts.map((post) => (
              <a className="flex min-w-0 items-center gap-3 rounded-lg p-1 transition hover:bg-white/[0.04]" href="#community" key={post.title}>
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#18211d]">
                  <Image alt="" className="object-cover" fill sizes="40px" src={post.image} />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-[12px] font-medium text-white/90" title={post.title}>{post.title}</h3>
                  <p className="mt-0.5 text-[11px] text-white/45">{post.count}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
