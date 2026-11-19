type WriterProfile = {
  slug: string;
  name: string;
  type: string;
  image: string;
  bio: string;
  followers?: string;
  works?: string;
};

export type RecommendedWriter = Required<WriterProfile>;

export const recommendedWriters: RecommendedWriter[] = [
  { slug: "lunarblack", name: "LunarBlack", type: "นิยาย", image: "/images/writers/lunarblack.webp", bio: "เล่าเรื่องลึกลับและความสัมพันธ์ผ่านบรรยากาศที่ชวนติดตาม", followers: "12.4K", works: "18" },
  { slug: "purplemoon", name: "purplemoon", type: "แฟนฟิค", image: "/images/writers/purplemoon.webp", bio: "พื้นที่เล็ก ๆ สำหรับแฟนฟิคและเรื่องราวที่อยากให้คุณได้อ่าน", followers: "9.8K", works: "24" },
  { slug: "akistudio", name: "AkiStudio", type: "การ์ตูน", image: "/images/writers/akistudio.webp", bio: "สร้างโลกแฟนตาซีสีสันสดใสให้ทุกคนได้เข้ามาค้นพบ", followers: "8.1K", works: "11" },
  { slug: "moonlit", name: "Moonlit", type: "นิยาย", image: "/images/writers/moonlit.webp", bio: "นิยายอบอุ่นหัวใจสำหรับคืนที่อยากหยุดเวลาไว้กับเรื่องราวดี ๆ", followers: "7.6K", works: "15" },
  { slug: "felixs", name: "felixs", type: "แฟนฟิค", image: "/images/writers/felixs.webp", bio: "เขียนเรื่องราวสนุก ๆ ที่พาคุณไปพบมุมใหม่ของตัวละครที่รัก", followers: "6.9K", works: "20" },
  { slug: "kuroi", name: "Kuroi", type: "การ์ตูน", image: "/images/writers/kuroi.webp", bio: "ภาพและเรื่องเล่าจากจินตนาการที่เต็มไปด้วยปริศนา", followers: "5.3K", works: "9" },
];

export const followedContentWriters: RecommendedWriter[] = [
  ...recommendedWriters,
  { slug: "rainymew", name: "rainymew", type: "นิยาย", image: "/images/writers/rainymew.webp", bio: "เรื่องราวอบอุ่นที่อยากชวนคุณมาอ่านด้วยกัน", followers: "4.8K", works: "12" },
  { slug: "sorayoru", name: "sorayoru", type: "แฟนฟิค", image: "/images/writers/sorayoru.webp", bio: "เรื่องราวแฟนตาซีจากมุมมองที่ไม่เหมือนใคร", followers: "4.2K", works: "10" },
];

export const guestRecommendedWriters: WriterProfile[] = [
  ...followedContentWriters,
  { slug: "mirae", name: "Mirae", type: "นิยาย", image: "/images/writers/mirae.webp", bio: "ผู้เขียนนิยายโรแมนติกเรื่อง จดหมายใต้แสงดาว" },
  { slug: "velvetnote", name: "VelvetNote", type: "แฟนฟิค", image: "/images/writers/velvetnote.webp", bio: "ผู้เขียนแฟนฟิคเรื่อง ตั๋วเที่ยวเดียว (Harry Potter)" },
  { slug: "sunpanel", name: "SunPanel", type: "การ์ตูน", image: "/images/writers/sunpanel.webp", bio: "ผู้สร้างการ์ตูนเรื่อง ประภาคารสีส้ม" },
  { slug: "cloudletter", name: "CloudLetter", type: "การ์ตูน", image: "/images/writers/cloudletter.webp", bio: "ผู้สร้างการ์ตูนแบบแชทเรื่อง ทางกลับบ้านใต้ฝนดาว" },
];

export function getWriterProfile(slug: string) {
  return guestRecommendedWriters.find(writer => writer.slug === slug);
}
