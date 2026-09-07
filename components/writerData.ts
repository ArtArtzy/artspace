export type RecommendedWriter = {
  slug: string;
  name: string;
  type: string;
  image: string;
  bio: string;
  followers: string;
  works: string;
};

export const recommendedWriters: RecommendedWriter[] = [
  { slug: "lunarblack", name: "LunarBlack", type: "นิยาย", image: "/images/writers/lunarblack.webp", bio: "เล่าเรื่องลึกลับและความสัมพันธ์ผ่านบรรยากาศที่ชวนติดตาม", followers: "12.4K", works: "18" },
  { slug: "purplemoon", name: "purplemoon", type: "แฟนฟิค", image: "/images/writers/purplemoon.webp", bio: "พื้นที่เล็ก ๆ สำหรับแฟนฟิคและเรื่องราวที่อยากให้คุณได้อ่าน", followers: "9.8K", works: "24" },
  { slug: "akistudio", name: "AkiStudio", type: "การ์ตูน", image: "/images/writers/akistudio.webp", bio: "สร้างโลกแฟนตาซีสีสันสดใสให้ทุกคนได้เข้ามาค้นพบ", followers: "8.1K", works: "11" },
  { slug: "moonlit", name: "Moonlit", type: "นิยาย", image: "/images/writers/moonlit.webp", bio: "นิยายอบอุ่นหัวใจสำหรับคืนที่อยากหยุดเวลาไว้กับเรื่องราวดี ๆ", followers: "7.6K", works: "15" },
  { slug: "felixs", name: "felixs", type: "แฟนฟิค", image: "/images/writers/felixs.webp", bio: "เขียนเรื่องราวสนุก ๆ ที่พาคุณไปพบมุมใหม่ของตัวละครที่รัก", followers: "6.9K", works: "20" },
  { slug: "kuroi", name: "Kuroi", type: "การ์ตูน", image: "/images/writers/kuroi.webp", bio: "ภาพและเรื่องเล่าจากจินตนาการที่เต็มไปด้วยปริศนา", followers: "5.3K", works: "9" },
];
