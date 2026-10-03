export type ReaderReply = { id: string; author: string; text: string; writer?: boolean };
export type ReaderComment = { id: string; project: string; author: string; avatar: string; text: string; hoursAgo: number; chapter: number; likes: number; sentiment: "positive" | "neutral" | "negative"; question: boolean; badge?: string; replies: ReaderReply[] };
export const commentProjects = [
  { id: "moon", title: "จันทร์เหนือวังหลวง", cover: "/images/category-books/china-01.webp", tags: ["นิยายรัก", "ดราม่า", "Coming of Age"] },
  { id: "sky", title: "Sky of Tomorrow", cover: "/images/book-sky-tomorrow.webp", tags: ["แฟนตาซี", "ผจญภัย", "ไซไฟ"] },
  { id: "rain", title: "ภาพถ่ายในสายฝน", cover: "/images/book-photographs-rain.webp", tags: ["โรแมนติก", "ชีวิต"] },
  { id: "fog", title: "เสียงในม่านหมอก", cover: "/images/book-between-lines.webp", tags: ["ลึกลับ", "เหนือธรรมชาติ"] },
  { id: "castle", title: "ปราสาทในห้วงฝัน", cover: "/images/book-parallel-world.webp", tags: ["แฟนตาซี", "โรแมนติก"] },
  { id: "lemon", title: "วันสีเลมอน", cover: "/images/book-lemon-days.webp", tags: ["ชีวิตวัยรุ่น", "อบอุ่น"] },
] as const;
const entries: [string, string, string, number, number, number, ReaderComment["sentiment"], boolean][] = [
  ["moon", "Moonlit", "คือตอนนี้เข้มข้นมากเลยค่ะ ฉากที่นางเอกกลับไปเห็นดอกเหมยแล้วเจอจดหมายคือใจสั่นเลย อยากรู้ว่าจดหมายฉบับนั้นจะเกี่ยวกับอะไร จะมีตอนพิเศษไหมคะ?", 2, 32, 24, "positive", true],
  ["moon", "Sora", "ชอบพัฒนาการของตัวละครหลินเยว่ในตอนนี้มาก จากที่เคยอ่อนแอ ตอนนี้ดูเข้มแข็งขึ้นเยอะเลย อยากให้พระเอกยอมบอกความจริงเร็ว ๆ หน่อยค่ะ ลุ้นมาก!", 3, 32, 18, "positive", false],
  ["moon", "Maple", "สงสัยนิดนึงค่ะ ทำไมจากตำหนักเหนือถึงเลือกกลับวัง ทั้งที่รู้ว่าอันตราย? มีเหตุผลลึกกว่านั้นไหมคะ หรือจะเฉลยในตอนต่อไป?", 5, 31, 9, "neutral", true],
  ["moon", "Krit_Reader", "ภาษาสวยมากครับ โดยเฉพาะตอนบรรยายบรรยากาศหิมะกับดอกเหมย อ่านแล้วเห็นภาพเลย ขอบคุณสำหรับตอนดี ๆ แบบนี้ครับ", 7, 31, 15, "positive", false],
  ["moon", "RainyMew", "ตอนนี้อ่านแล้วอบอุ่นใจมาก ชอบฉากบทสนทนาระหว่างหลินเยว่กับชินอวี่ อยากเห็นทั้งคู่ได้คุยกันมากขึ้นค่ะ", 26, 30, 21, "positive", false],
  ["moon", "PurpleMoon", "จดหมายที่ซ่อนไว้เป็นของใครคะ อ่านวนสองรอบแล้วก็ยังเดาไม่ออกเลย", 48, 29, 7, "positive", true],
  ["moon", "Felix", "จังหวะการเล่าเรื่องดีมาก ปมเรื่องลาดตระเวนทำให้ต้องกดอ่านตอนต่อทันที", 75, 28, 12, "positive", false],
  ["moon", "LunarBlack", "บางฉากเปลี่ยนสถานที่เร็วไปนิด อยากให้เพิ่มคำอธิบายเชื่อมฉากจะเข้าใจง่ายขึ้นครับ", 120, 27, 4, "negative", false],
  ["moon", "Aki", "พัฒนาการตัวละครรองน่าสนใจมาก อ่านแล้วเริ่มเข้าใจการตัดสินใจของทุกคน", 200, 26, 16, "positive", false],
  ["moon", "Booklover", "ตอนจบทำเอานอนไม่หลับเลยค่ะ รอติดตามตอนใหม่อยู่นะคะ", 280, 25, 10, "positive", false],
  ["sky", "Sora", "โลกของเรื่องสวยมากค่ะ อยากรู้ว่าประตูที่ปรากฏตอนท้ายเชื่อมไปที่ไหน", 4, 18, 14, "positive", true],
  ["sky", "Kuroi", "ชอบรายละเอียดของเทคโนโลยีในเรื่อง อ่านแล้วจินตนาการตามได้ง่ายมาก", 12, 17, 8, "positive", false],
  ["sky", "Felix", "ตอนหน้าจะได้เห็นเมืองบนฟ้าไหมครับ? รออ่านเลย", 50, 16, 6, "positive", true],
  ["sky", "Aki", "อ่านครบแล้วครับ รอการผจญภัยครั้งต่อไป", 160, 15, 5, "neutral", false],
  ["rain", "RainyMew", "ชอบภาพถ่ายใบเก่าที่เชื่อมความทรงจำของทั้งสองคนมากค่ะ", 8, 9, 11, "positive", false],
  ["rain", "Maple", "เพลงที่พูดถึงในตอนนี้ชื่อเพลงอะไรคะ? อยากเปิดฟังตอนอ่าน", 56, 8, 3, "neutral", true],
  ["fog", "LunarBlack", "หักมุมได้ดีมาก ไม่คิดเลยว่าคนในรูปจะเป็นตัวละครนี้", 24, 25, 17, "positive", false],
  ["fog", "Krit_Reader", "เรื่องนี้จะมีภาคต่อไหมครับ ยังอยากรู้เรื่องของหมู่บ้านอีก", 190, 24, 9, "positive", true],
  ["castle", "PurpleMoon", "ปราสาทในความฝันมีเสน่ห์มาก อ่านแล้วเหมือนได้เข้าไปอยู่ในโลกนั้น", 30, 12, 12, "positive", false],
  ["castle", "Moonlit", "ตอนใหม่เผยแพร่วันไหนคะ? รอติดตามอยู่ค่ะ", 300, 11, 5, "positive", true],
  ["lemon", "Booklover", "เรื่องเล็ก ๆ ในวันธรรมดาอ่านแล้วรู้สึกดีมากค่ะ", 10, 6, 13, "positive", false],
  ["lemon", "Kuroi", "ตัวละครเพื่อนในห้องน่ารักทุกคนเลย อยากเห็นเรื่องราวของแต่ละคนมากขึ้น", 260, 5, 7, "positive", false],
];
const avatars = ["moonlit", "sorayoru", "rainymew", "akistudio", "rainymew", "purplemoon", "felixs", "lunarblack"];
export const initialComments: ReaderComment[] = entries.map(([project, author, text, hoursAgo, chapter, likes, sentiment, question], i) => ({
  id: `reader-${i + 1}`, project, author, avatar: `/images/writers/${avatars[i % avatars.length]}.webp`, text, hoursAgo, chapter, likes, sentiment, question,
  badge: i === 0 ? "แฟนพันธุ์แท้" : i === 2 ? "ผู้ติดตามนาน" : undefined,
  replies: i === 0 ? [{ id: "reply-1", author: "HanYue", text: "ขอบคุณมาก ๆ ครับ ดีใจที่ชอบครับ ตอนหน้าจะเริ่มเฉลยที่มาของจดหมายแล้ว ฝากติดตามด้วยนะครับ", writer: true }] : i === 1 ? [{ id: "reply-2", author: "RainyMew", text: "เห็นด้วยเลยค่ะ ลุ้นทุกตอน" }, { id: "reply-3", author: "HanYue", text: "ขอบคุณครับ จะค่อย ๆ เปิดเผยความจริงในตอนถัดไป", writer: true }] : i % 3 === 0 ? [{ id: `reply-${i + 4}`, author: "HanYue", text: "ขอบคุณที่ติดตามและส่งความคิดเห็นมานะครับ", writer: true }] : [],
}));
