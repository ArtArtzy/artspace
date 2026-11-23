import type { FeedPost } from "@/components/CommunityFeed";
import type { ReadModeId } from "@/components/ReadSubMenu";

export const novelFeaturedThreadSlugs = [
  "fantasy-recommendations",
  "clockwork-review",
  "clockwork-character",
  "fantasy-worldbuilding",
  "novel-ending-review",
];

type ThreadTopic = { slug: string; title: string; body: string; tag: string; likes: FeedPost["likes"]; views: number };

const topics = {
  fanfic: [
    { slug: "fanfic-favorite-au", title: "ถ้าเลือกอ่านได้หนึ่ง AU จะเลือกโลกแบบไหนกัน?", body: "เราชอบ AU ร้านกาแฟที่ตัวละครค่อย ๆ รู้จักกันผ่านเมนูประจำ ใครมี AU ที่เจอชื่อแล้วต้องกดอ่านทันที มาแลกกันได้เลย", tag: "#FavoriteAU", likes: "182", views: 716 },
    { slug: "fanfic-canon-divergence", title: "จุดเดียวในเรื่องต้นฉบับที่อยากเปลี่ยนคือฉากไหน?", body: "ถ้าเปลี่ยนการตัดสินใจของตัวละครได้หนึ่งครั้ง คุณอยากให้เรื่องเดินไปทางไหน? ฝากเตือนก่อนเล่าฉากสำคัญด้วยนะ", tag: "#CanonDivergence", likes: "157", views: 621 },
    { slug: "fanfic-short-reads", title: "ป้ายยาแฟนฟิคตอนเดียวจบที่อ่านแล้วอยากบอกต่อ", body: "ขอเรื่องที่ใช้เวลาไม่นานแต่ทิ้งความรู้สึกไว้ได้นาน จะเป็นเรื่องอบอุ่นหรือหน่วง ๆ ก็ได้ ฝากบอกอารมณ์เรื่องไว้ให้เลือกกันด้วย", tag: "#OneShot", likes: "138", views: 574 },
    { slug: "fanfic-slow-burn", title: "โมเมนต์เล็ก ๆ แบบไหนทำให้แฟนฟิค Slow Burn น่าติดตาม?", body: "เราชอบตอนที่ตัวละครเริ่มจำรายละเอียดเล็ก ๆ ของอีกคนได้ ใครมีจังหวะความสัมพันธ์ที่เคยอ่านแล้วรู้สึกว่าพอดี มาแชร์กัน", tag: "#SlowBurn", likes: "117", views: 456 },
    { slug: "fanfic-writing-voice", title: "เขียนแฟนฟิคยังไงให้เสียงของตัวละครยังเป็นคนเดิม?", body: "ตอนย้ายตัวละครไปอีกจักรวาล เรามักเก็บวิธีพูดกับนิสัยเวลาเจอปัญหาไว้ อยากฟังว่านักเขียนคนอื่นเลือกเก็บอะไรเป็นอย่างแรก", tag: "#เขียนแฟนฟิค", likes: "94", views: 352 },
  ],
  cartoon: [
    { slug: "cartoon-dragon-clouds", title: "คุยเรื่อง มังกรเหนือเมฆา ฉากบินฉากไหนที่ชอบที่สุด?", body: "ชอบตอนที่เมฆเปิดให้เห็นเมืองเป็นครั้งแรก เพราะภาพช่องกว้างทำให้รู้เลยว่าการเดินทางเพิ่งเริ่ม ใครมีฉากโปรดมาเล่าแบบไม่สปอยล์กัน", tag: "#มังกรเหนือเมฆา", likes: "201", views: 784 },
    { slug: "cartoon-favorite-panels", title: "ช่องภาพแบบไหนทำให้คุณหยุดเลื่อนแล้วกลับไปมองอีกครั้ง?", body: "บางตอนมีช่องเงียบที่ไม่มีบทพูด แต่ทำให้เข้าใจความรู้สึกตัวละครมากขึ้น อยากชวนแชร์ว่าการจัดช่องแบบไหนให้ความรู้สึกนี้กับคุณ", tag: "#ช่องการ์ตูน", likes: "168", views: 659 },
    { slug: "cartoon-hologram-color", title: "ชวนคุยเรื่องการใช้สีใน นครโฮโลแกรม", body: "แสงป้ายกับสีในเงาตึกทำให้รู้ว่าเราอยู่คนละย่านแม้ยังไม่เห็นชื่อสถานที่ มีจุดไหนที่คุณชอบการเล่าเรื่องด้วยสีเป็นพิเศษไหม", tag: "#นครโฮโลแกรม", likes: "151", views: 592 },
    { slug: "cartoon-scroll-pacing", title: "ช่องว่างในเว็บตูนช่วยสร้างจังหวะการอ่านยังไง?", body: "ตอนทำฉากเฉลย เราลองเว้นช่วงให้ต้องเลื่อนก่อนจะเห็นคำตอบ อยากรู้ว่านักวาดคนอื่นลองวัดจังหวะบนมือถือกันยังไง", tag: "#วาดเว็บตูน", likes: "119", views: 443 },
    { slug: "cartoon-weekend-reads", title: "แนะนำการ์ตูนอ่านสบายสำหรับวันหยุด", body: "กำลังหาเรื่องที่จบหนึ่งตอนได้ในเวลาพัก ชอบแนวตลกหรือชีวิตประจำวันเป็นพิเศษ ใครมีเรื่องโปรดฝากชื่อไว้ได้เลย", tag: "#แนะนำการ์ตูน", likes: "101", views: 387 },
  ],
} satisfies Record<Exclude<ReadModeId, "novel">, ThreadTopic[]>;

function toPosts(mode: keyof typeof topics, user: string): FeedPost[] {
  return topics[mode].map(({ tag, ...topic }, index) => ({
    ...topic,
    user,
    avatar: `/images/writers/${user.toLowerCase()}.webp`,
    badge: "พูดคุย",
    badgeClass: "border border-arn-accent/35 bg-arn-surface text-arn-accent-soft",
    age: `${index + 1} วันที่แล้ว`,
    tags: [mode === "fanfic" ? "#แฟนฟิค" : "#การ์ตูน", tag],
  }));
}

export const fanficFeaturedThreads = toPosts("fanfic", "purplemoon");
export const cartoonFeaturedThreads = toPosts("cartoon", "Kuroi");
