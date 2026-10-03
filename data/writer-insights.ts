// Demo analytics until the Writer Studio analytics service is connected.
export const insightProjects = [
  { id: "moon", title: "จันทร์เหนือวังหลวง", cover: "/images/category-books/china-01.webp", chapters: 32, total: 421000, readers: 12000, followers: 1200, likes: 17900, comments: 326, completion: 68 },
  { id: "sky", title: "Sky of Tomorrow", cover: "/images/book-sky-tomorrow.webp", chapters: 18, total: 128000, readers: 4600, followers: 286, likes: 6400, comments: 142, completion: 61 },
  { id: "draft", title: "ร่างใหม่ของฉัน", cover: "/images/book-between-lines.webp", chapters: 0, total: 0, readers: 0, followers: 0, likes: 0, comments: 0, completion: 0 },
] as const;
export const periods = [{ days: 7, label: "7 วัน", factor: .233 }, { days: 30, label: "30 วัน", factor: 1 }, { days: 90, label: "90 วัน", factor: 2.8 }, { days: 180, label: "ทั้งหมด", factor: 4.6 }] as const;
export const chapterTitles = ["รอยร้าวในวังหลวง", "คำสัญญาใต้แสงจันทร์", "เสียงกระซิบจากตำหนัก", "ความลับของจดหมาย", "เงาในสวนเหมย", "คำสัญญาที่ไม่เลือน", "เงาในแสงปีติ", "เมื่อดอกเหมยผลิบาน"];
export const sources = [{ label: "หน้าแรก", value: 38 }, { label: "ค้นหา", value: 24 }, { label: "แท็ก / หมวดหมู่", value: 18 }, { label: "จากชั้นหนังสือ", value: 12 }, { label: "ลิงก์แชร์", value: 6 }, { label: "อื่น ๆ", value: 2 }];
export const formatCount = (value: number) => value >= 1000 ? `${new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(value / 1000)}K` : value.toLocaleString("en");
export function dateLabel(date: Date) { return new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Bangkok" }).format(date); }
export function insightDates(days: number) {
  const end = new Date("2026-01-30T12:00:00+07:00");
  const start = new Date(end); start.setUTCDate(start.getUTCDate() - days + 1);
  return { start, end };
}
