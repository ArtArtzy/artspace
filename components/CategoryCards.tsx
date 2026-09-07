import Image from "next/image";

const categories = [
  {
    image: "/images/category-novel.webp",
    title: "นิยาย",
    description: "เรื่องราวจินตนาการหลากหลายแนว\nจากนักเขียนอิสระ",
    action: "เข้าสู่หมวดนิยาย",
  },
  {
    image: "/images/category-fanfic.webp",
    title: "แฟนฟิค",
    description: "ต่อยอดเรื่องราวที่คุณรัก\nด้วยมุมมองใหม่",
    action: "เข้าสู่หมวดแฟนฟิค",
  },
  {
    image: "/images/category-cartoon.webp",
    title: "การ์ตูน",
    description: "โลกแห่งภาพเล่าเรื่อง\nที่พาคุณออกเดินทาง",
    action: "เข้าสู่หมวดการ์ตูน",
  },
];

export default function CategoryCards() {
  return (
    <section aria-label="หมวดหมู่เรื่องราว" className="mx-auto max-w-[1400px] bg-[#0D0F0E] px-2 py-[14px]">
      <div className="grid grid-cols-3 gap-2">
        {categories.map((category) => (
          <a
            className="group relative h-[184px] overflow-hidden rounded-[9px] border border-[#1eb55d] bg-[#101512] shadow-[0_0_0_1px_rgba(33,194,98,.16),0_8px_18px_rgba(0,0,0,.28)] transition hover:-translate-y-0.5 hover:border-[#4af58c]"
            href={category.image.includes("fanfic") ? "/read/fanfic" : category.image.includes("cartoon") ? "/read/cartoon" : "/read"}
            key={category.title}
          >
            <Image
              alt=""
              className="object-cover object-[center_44%] transition duration-700 group-hover:scale-[1.03]"
              fill
              sizes="(max-width: 1400px) 33vw, 467px"
              src={category.image}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,6,.88)_0%,rgba(4,8,6,.62)_39%,rgba(4,8,6,.08)_100%)]" />
            <div className="relative z-10 flex h-full max-w-[255px] flex-col items-start px-6 py-6 text-white">
              <h2 className="text-[28px] font-medium leading-none tracking-tight">{category.title}</h2>
              <p className="mt-3 whitespace-pre-line text-[14px] leading-[1.45] text-white/85">
                {category.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-3 rounded-full border border-[#12d66f] px-5 py-2 text-[13px] font-semibold text-[#12d66f] transition group-hover:bg-[#12d66f] group-hover:text-[#07100b]">
                {category.action}
                <span aria-hidden="true" className="text-lg leading-none">→</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
