export type ScheduleStatus = "ready" | "scheduled" | "draft" | "published" | "cancelled";
export type Publication = { id: string; project: string; chapter: number; title: string; date: string; time: string; status: ScheduleStatus; access: "public" | "members"; views: number; comments: number; updatedAt?: string };
export const scheduleToday = "2026-10-04";
export const scheduleStatuses: Record<ScheduleStatus, string> = { ready: "รอตั้งเวลา", scheduled: "กำหนดเผยแพร่", draft: "ร่างอยู่", published: "เผยแพร่แล้ว", cancelled: "ยกเลิก" };
export const scheduleProjects = [
  { id: "moon", title: "จันทร์เหนือวังหลวง", cover: "/images/category-books/china-01.webp", tone: "green" },
  { id: "sky", title: "Sky of Tomorrow", cover: "/images/book-sky-tomorrow.webp", tone: "violet" },
  { id: "rain", title: "ภาพถ่ายในสายฝน", cover: "/images/book-photographs-rain.webp", tone: "gold" },
  { id: "fog", title: "เสียงในม่านหมอก", cover: "/images/book-between-lines.webp", tone: "gold" },
  { id: "castle", title: "ปราสาทในห้วงฝัน", cover: "/images/book-parallel-world.webp", tone: "blue" },
  { id: "stars", title: "ความลับของดวงดาว", cover: "/images/book-parallel-world.webp", tone: "blue" },
  { id: "summer", title: "ฤดูที่เราเคยพบกัน", cover: "/images/book-summer-lessons.webp", tone: "gold" },
  { id: "sakura", title: "กลับจากฤดูในสายลม", cover: "/images/category-books/china-03.webp", tone: "green" },
  { id: "lemon", title: "วันสีเลมอน", cover: "/images/book-lemon-days.webp", tone: "gold" },
  { id: "winter", title: "ปลายทางของฤดูหนาว", cover: "/images/book-sky-tomorrow.webp", tone: "violet" },
  { id: "city", title: "เสียงในความว่างเปล่า", cover: "/images/book-city-echoes.webp", tone: "blue" },
] as const;
export const initialPublications: Publication[] = [
  { id: "p1", project: "moon", chapter: 32, title: "เมื่อดอกเหมยผลิบาน", date: "2026-09-28", time: "20:00", status: "published", access: "public", views: 32400, comments: 48 },
  { id: "p2", project: "sky", chapter: 18, title: "ใต้ฟ้าเดียวกัน", date: "2026-10-01", time: "19:00", status: "published", access: "public", views: 18600, comments: 36 },
  { id: "p3", project: "rain", chapter: 9, title: "ภาพในความทรงจำ", date: "2026-10-03", time: "10:00", status: "published", access: "public", views: 4200, comments: 18 },
  { id: "p4", project: "castle", chapter: 12, title: "ประตูแห่งห้วงฝัน", date: "2026-10-07", time: "20:00", status: "scheduled", access: "public", views: 0, comments: 0 },
  { id: "p5", project: "moon", chapter: 33, title: "ใต้เงาบุปผา", date: "2026-10-10", time: "20:00", status: "scheduled", access: "public", views: 0, comments: 0 },
  { id: "p6", project: "castle", chapter: 13, title: "คำตอบของดวงดาว", date: "2026-10-13", time: "19:00", status: "draft", access: "public", views: 0, comments: 0 },
  { id: "p7", project: "fog", chapter: 26, title: "เสียงที่รอคอย", date: "2026-10-16", time: "20:00", status: "draft", access: "members", views: 0, comments: 0 },
  { id: "p8", project: "moon", chapter: 34, title: "เส้นทางใหม่", date: "2026-10-22", time: "20:00", status: "draft", access: "public", views: 0, comments: 0 },
  { id: "p9", project: "sky", chapter: 19, title: "ปีกของวันพรุ่งนี้", date: "2026-10-25", time: "19:00", status: "scheduled", access: "public", views: 0, comments: 0 },
  { id: "p10", project: "fog", chapter: 27, title: "คืนที่หมอกจาง", date: "2026-10-28", time: "20:00", status: "draft", access: "members", views: 0, comments: 0 },
  { id: "p11", project: "moon", chapter: 35, title: "คำสัญญาครั้งใหม่", date: "2026-11-01", time: "20:00", status: "draft", access: "public", views: 0, comments: 0 },
  { id: "p12", project: "rain", chapter: 10, title: "ฝนที่ผ่านไป", date: "2026-10-18", time: "10:00", status: "cancelled", access: "public", views: 0, comments: 0 },
];
// Completed chapter fixtures for the publishing workspace. Writing drafts
// remain in initialPublications for the overview editor and are excluded here.
export const scheduleWorkspaceToday = "2026-10-13";
const readyChapters = [
  ["moon", 20, "ความจริงที่ซ่อนอยู่", "2026-10-13", "15:24"],
  ["stars", 13, "เสียงที่ก้องจากปลายฟ้า", "2026-10-12", "21:10"],
  ["summer", 9, "ใต้แสงดาวในวันนั้น", "2026-10-10", "18:05"],
  ["rain", 7, "คำตอบในความเงียบ", "2026-10-10", "14:20"],
  ["sakura", 11, "จุดหมายของการรอคอย", "2026-10-08", "12:11"],
  ["lemon", 6, "รสชาติของการเริ่มใหม่", "2026-10-06", "11:40"],
  ["winter", 4, "แสงสุดท้ายก่อนจากลา", "2026-10-05", "22:35"],
  ["city", 3, "คนที่ยังไม่ลืม", "2026-10-04", "20:18"],
] as const;
export const initialSchedulePublications: Publication[] = [
  ...readyChapters.map(([project, chapter, title, day, time], index): Publication => ({
    id: `ready-${index}`, project, chapter, title, date: "", time: "",
    status: "ready", access: "public", views: 0, comments: 0, updatedAt: `${day}T${time}`,
  })),
  ...Array.from({ length: 6 }, (_, index): Publication => ({
    id: `scheduled-demo-${index}`, project: scheduleProjects[index % 5].id,
    chapter: 40 + index, title: ["รอยต่อของเรื่องราว", "ประตูบานใหม่", "จดหมายที่รอคอย"][index % 3],
    date: `2026-10-${22 + index}`, time: "20:00", status: "scheduled",
    access: "public", views: 0, comments: 0, updatedAt: "2026-10-12T14:00",
  })),
  ...Array.from({ length: 18 }, (_, index): Publication => ({
    id: `published-demo-${index}`, project: scheduleProjects[index % 5].id,
    chapter: index + 1, title: ["จุดเริ่มต้น", "เรื่องราวระหว่างทาง", "คำสัญญา"][index % 3],
    date: `2026-10-${String(index % 12 + 1).padStart(2, "0")}`, time: "19:00",
    status: "published", access: "public", views: 1000 + index * 250,
    comments: index * 2, updatedAt: `2026-10-${String(index % 12 + 1).padStart(2, "0")}T18:00`,
  })),
];
export function parseDay(value: string) { return new Date(`${value}T12:00:00Z`); }
export function dayKey(value: Date) { return value.toISOString().slice(0, 10); }
export function addDays(value: string, days: number) { const date = parseDay(value); date.setUTCDate(date.getUTCDate() + days); return dayKey(date); }
export function scheduleDate(value: string, monthOnly = false) { return new Intl.DateTimeFormat("th-TH-u-ca-gregory", { ...(monthOnly ? {} : { day: "numeric" as const }), month: monthOnly ? "long" : "short", year: "numeric", timeZone: "UTC" }).format(parseDay(value)); }
