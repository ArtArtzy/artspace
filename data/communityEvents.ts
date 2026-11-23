export const communityEventTypes = ["การเขียน", "การอ่าน", "พูดคุย / AMA", "เวิร์กช็อป"] as const;
export const communityEventModes = ["ออนไลน์", "ออฟไลน์"] as const;

export const communityEventStatusLabels = {
  open: "เปิดรับสมัคร",
  ongoing: "กำลังจัด",
  upcoming: "เร็ว ๆ นี้",
  ended: "ที่ผ่านมา",
} as const;

export type CommunityEventStatus = keyof typeof communityEventStatusLabels;

export type CommunityEvent = {
  slug: string;
  title: string;
  description: string;
  type: (typeof communityEventTypes)[number];
  mode: (typeof communityEventModes)[number];
  image: string;
  participants: number;
  startsOn: string;
  endsOn: string;
  registration?: { opensOn: string; closesOn: string };
  featured?: boolean;
  time?: string;
  place?: string;
  goal?: { target: number; unit: string; sampleProgress: number };
};

// The mock calendar uses a fixed preview date in Bangkok time.
const demoDay = "2026-11-24";

const eventCatalog = [
  {
    slug: "november-writing-challenge",
    title: "November Writing Challenge",
    description: "เขียนเรื่องที่ค้างไว้ให้เดินหน้าต่อ ตั้งเป้าหมายของตัวเอง แล้วแลกเปลี่ยนแรงบันดาลใจกับเพื่อนนักเขียน",
    type: "การเขียน",
    mode: "ออนไลน์",
    image: "/images/community-events-hero.webp",
    participants: 12438,
    startsOn: "2026-11-01",
    endsOn: "2026-11-30",
    featured: true,
    goal: { target: 30000, unit: "คำ", sampleProgress: 12500 },
  },
  {
    slug: "readathon-november",
    title: "Readathon เดือนพฤศจิกายน",
    description: "ชวนหยิบเรื่องที่อยากอ่าน แล้วตั้งเป้าอ่านให้จบ 5 เล่มไปด้วยกัน",
    type: "การอ่าน",
    mode: "ออนไลน์",
    image: "/images/home-banners/readathon-mobile.webp",
    participants: 942,
    startsOn: "2026-11-15",
    endsOn: "2026-12-05",
    featured: true,
    goal: { target: 5, unit: "เล่ม", sampleProgress: 3 },
  },
  {
    slug: "december-character-workshop",
    title: "เวิร์กช็อปสร้างตัวละครให้มีแรงขับ",
    description: "ฝึกเปลี่ยนเป้าหมายและความกลัวของตัวละครให้เป็นฉากที่ขับเคลื่อนเรื่องได้",
    type: "เวิร์กช็อป",
    mode: "ออนไลน์",
    image: "/images/community/past-character-workshop.png",
    participants: 186,
    startsOn: "2026-12-05",
    endsOn: "2026-12-05",
    registration: { opensOn: "2026-11-20", closesOn: "2026-12-04" },
    time: "14:00 น.",
    featured: true,
  },
  {
    slug: "november-writer-ama",
    title: "AMA กับนักเขียน วางพล็อตอย่างไรให้เขียนจบ",
    description: "ส่งคำถามเรื่องการเขียนและคุยกับนักเขียนถึงวิธีผ่านช่วงที่เขียนต่อไม่ออก",
    type: "พูดคุย / AMA",
    mode: "ออนไลน์",
    image: "/images/community/past-writers-seminar.png",
    participants: 0,
    startsOn: "2026-11-28",
    endsOn: "2026-11-28",
    registration: { opensOn: "2026-11-25", closesOn: "2026-11-27" },
    time: "20:00 น.",
  },
  {
    slug: "december-short-story-window",
    title: "ประกวดเรื่องสั้น «แสงหลังหน้าต่าง»",
    description: "เขียนเรื่องสั้นจากภาพหน้าต่างหนึ่งบาน ความยาว 1,000–3,000 คำ",
    type: "การเขียน",
    mode: "ออนไลน์",
    image: "/images/community/past-short-story-contest.png",
    participants: 123,
    startsOn: "2026-12-08",
    endsOn: "2026-12-20",
    registration: { opensOn: "2026-11-22", closesOn: "2026-12-06" },
  },
  {
    slug: "readathon-december",
    title: "Readathon เดือนธันวาคม",
    description: "อ่านส่งท้ายปีด้วยเรื่องที่ตั้งใจเก็บไว้ แล้วแบ่งปันหนึ่งเรื่องที่อยากแนะนำต่อ",
    type: "การอ่าน",
    mode: "ออนไลน์",
    image: "/images/community/community-library.webp",
    participants: 0,
    startsOn: "2026-12-01",
    endsOn: "2026-12-20",
    registration: { opensOn: "2026-11-28", closesOn: "2026-11-30" },
  },
  {
    slug: "november-review-swap",
    title: "แลกกันอ่าน แลกกันรีวิว",
    description: "จับคู่แลกเรื่องอ่านกับเพื่อนหนึ่งคน และเขียนรีวิวสั้น ๆ ให้กัน",
    type: "การอ่าน",
    mode: "ออนไลน์",
    image: "/images/community/community-hero-reading-room.webp",
    participants: 72,
    startsOn: "2026-11-26",
    endsOn: "2026-11-29",
    registration: { opensOn: "2026-11-19", closesOn: "2026-11-25" },
  },
  {
    slug: "comic-panel-workshop",
    title: "เวิร์กช็อปเล่าเรื่องด้วยช่องการ์ตูน",
    description: "ทดลองจัดภาพสามช่องจากเหตุการณ์เดียว แล้วเทียบว่าจังหวะการอ่านเปลี่ยนไปอย่างไร",
    type: "เวิร์กช็อป",
    mode: "ออฟไลน์",
    image: "/images/community/community-artist.webp",
    participants: 0,
    startsOn: "2026-12-12",
    endsOn: "2026-12-12",
    registration: { opensOn: "2026-11-30", closesOn: "2026-12-10" },
    time: "13:00 น.",
    place: "กรุงเทพฯ",
  },
  {
    slug: "november-reading-hangout",
    title: "นัดพบคนอ่าน วันอาทิตย์",
    description: "พกหนังสือเล่มโปรดมาแนะนำกัน แล้วนั่งอ่านเงียบ ๆ ด้วยกันหนึ่งชั่วโมง",
    type: "การอ่าน",
    mode: "ออฟไลน์",
    image: "/images/community/community-hero-reading-room.webp",
    participants: 34,
    startsOn: "2026-11-29",
    endsOn: "2026-11-29",
    registration: { opensOn: "2026-11-23", closesOn: "2026-11-28" },
    time: "15:00 น.",
    place: "กรุงเทพฯ",
  },
  {
    slug: "character-workshop",
    title: "เวิร์กช็อปการสร้างตัวละคร",
    description: "ลองวางอดีต ความอยาก และจุดอ่อนของตัวละครผ่านเหตุการณ์สั้น ๆ",
    type: "เวิร์กช็อป",
    mode: "ออนไลน์",
    image: "/images/community/past-character-workshop.png",
    participants: 863,
    startsOn: "2026-11-08",
    endsOn: "2026-11-08",
  },
  {
    slug: "short-story-contest",
    title: "ประกวดเรื่องสั้น «ฤดูที่ลมเปลี่ยน»",
    description: "เล่าเรื่องการเปลี่ยนแปลงผ่านสถานที่เดิมที่มองเห็นต่างไป",
    type: "การเขียน",
    mode: "ออนไลน์",
    image: "/images/community/past-short-story-contest.png",
    participants: 1400,
    startsOn: "2026-10-10",
    endsOn: "2026-10-31",
  },
  {
    slug: "independent-writers-seminar",
    title: "เสวนานักเขียนอิสระ",
    description: "คุยเรื่องการจัดเวลาเขียน วางแผนเผยแพร่ และรับฟังความเห็นจากผู้อ่าน",
    type: "พูดคุย / AMA",
    mode: "ออฟไลน์",
    image: "/images/community/past-writers-seminar.png",
    participants: 792,
    startsOn: "2026-10-18",
    endsOn: "2026-10-18",
    place: "กรุงเทพฯ",
  },
  {
    slug: "november-poetry-reading",
    title: "วงอ่านบทกวี ใบไม้หน้าหนาว",
    description: "อ่านบทกวีคนละหนึ่งบท แล้วชวนกันฟังว่าจังหวะ เว้นวรรค และเสียงเปลี่ยนความหมายอย่างไร",
    type: "การอ่าน",
    mode: "ออฟไลน์",
    image: "/images/community/community-hero-reading-room.webp",
    participants: 48,
    startsOn: "2026-11-01",
    endsOn: "2026-11-01",
    place: "กรุงเทพฯ",
  },
  {
    slug: "october-silent-comics",
    title: "เวิร์กช็อปการ์ตูนไร้คำพูด",
    description: "ทดลองเล่าฉากสั้น ๆ ด้วยสีหน้า ท่าทาง และจังหวะระหว่างช่องภาพ",
    type: "เวิร์กช็อป",
    mode: "ออนไลน์",
    image: "/images/community/community-artist.webp",
    participants: 154,
    startsOn: "2026-10-04",
    endsOn: "2026-10-04",
  },
  {
    slug: "september-library-readalong",
    title: "อ่านด้วยกัน คืนวันศุกร์",
    description: "เลือกหนังสือจากชั้นที่ไม่เคยหยิบ แล้วกลับมาแบ่งปันสิ่งที่ค้นพบหลังอ่านจบ",
    type: "การอ่าน",
    mode: "ออนไลน์",
    image: "/images/community/community-library.webp",
    participants: 326,
    startsOn: "2026-09-04",
    endsOn: "2026-09-25",
  },
  {
    slug: "september-fanfic-ama",
    title: "คุยกับนักเขียนแฟนฟิค จากต้นฉบับสู่อีกจักรวาล",
    description: "คุยเรื่องการย้ายตัวละครไปอีกฉากหลังและรักษาเสียงของตัวละครให้คนอ่านจำได้",
    type: "พูดคุย / AMA",
    mode: "ออนไลน์",
    image: "/images/community/past-writers-seminar.png",
    participants: 418,
    startsOn: "2026-09-12",
    endsOn: "2026-09-12",
  },
  {
    slug: "august-first-chapter-challenge",
    title: "ชาเลนจ์เขียนบทแรกใน 7 วัน",
    description: "ร่างฉากเปิดหนึ่งฉาก แล้วกลับมาแก้จากคำถามแรกที่ผู้อ่านอยากรู้คำตอบ",
    type: "การเขียน",
    mode: "ออนไลน์",
    image: "/images/community/community-writing-challenge.webp",
    participants: 617,
    startsOn: "2026-08-24",
    endsOn: "2026-08-30",
  },
  {
    slug: "august-fantasy-worldbuilding",
    title: "เวิร์กช็อปสร้างโลกแฟนตาซีจากหนึ่งเมือง",
    description: "เริ่มจากแผนที่ย่านเล็ก ๆ แล้วใช้ชีวิตประจำวันของตัวละครเล่ากฎของโลก",
    type: "เวิร์กช็อป",
    mode: "ออฟไลน์",
    image: "/images/community/community-portal.webp",
    participants: 72,
    startsOn: "2026-08-15",
    endsOn: "2026-08-15",
    place: "กรุงเทพฯ",
  },
] as const satisfies readonly CommunityEvent[];

export type CommunityEventSlug = (typeof eventCatalog)[number]["slug"];

export const communityEvents: readonly (CommunityEvent & { slug: CommunityEventSlug })[] = eventCatalog;

export function getCommunityEventStatus(event: CommunityEvent): CommunityEventStatus {
  if (demoDay > event.endsOn) return "ended";
  if (demoDay >= event.startsOn) return "ongoing";
  if (event.registration && demoDay >= event.registration.opensOn && demoDay <= event.registration.closesOn) return "open";
  return "upcoming";
}

export function canJoinCommunityEvent(event: CommunityEvent) {
  const status = getCommunityEventStatus(event);
  return status === "open" || status === "ongoing";
}

export const pastCommunityEvents = communityEvents
  .filter(event => getCommunityEventStatus(event) === "ended")
  .sort((a, b) => b.endsOn.localeCompare(a.endsOn));

export const communityEventsHref = "/community?section=events";
export const pastCommunityEventsHref = "/community/events/past";
export const pastCommunityEventsPreviewHref = `${communityEventsHref}#community-past-events`;

export function communityEventHref(slug: string) {
  return `/community/events/${slug}`;
}

const longDate = new Intl.DateTimeFormat("th-TH", { dateStyle: "long", timeZone: "Asia/Bangkok" });
const shortDate = new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short", timeZone: "Asia/Bangkok" });
const dayNumber = new Intl.DateTimeFormat("th-TH", { day: "numeric", timeZone: "Asia/Bangkok" });
const shortMonth = new Intl.DateTimeFormat("th-TH", { month: "short", timeZone: "Asia/Bangkok" });
const eventDate = (date: string) => new Date(`${date}T12:00:00+07:00`);

export const eventNumber = new Intl.NumberFormat("th-TH");

export function formatCommunityEventDate(date: string, compact = false) {
  return (compact ? shortDate : longDate).format(eventDate(date));
}

export function formatCommunityEventPeriod({ startsOn, endsOn }: CommunityEvent) {
  if (startsOn === endsOn) return formatCommunityEventDate(startsOn);
  const start = startsOn.slice(0, 7) === endsOn.slice(0, 7) ? dayNumber.format(eventDate(startsOn)) : formatCommunityEventDate(startsOn, true);
  return `${start} – ${formatCommunityEventDate(endsOn)}`;
}

export function formatCommunityEventDay(date: string) {
  const parsed = eventDate(date);
  return { day: dayNumber.format(parsed), month: shortMonth.format(parsed) };
}

export function getNextCommunityEventMilestones() {
  return communityEvents.flatMap((event) => {
    const milestones = [
      { day: event.startsOn, label: "เริ่มกิจกรรม", event, time: event.time },
      { day: event.endsOn, label: event.goal ? "วันสุดท้ายของกิจกรรม" : "สิ้นสุดกิจกรรม", event },
    ];
    if (event.registration) {
      milestones.push({ day: event.registration.opensOn, label: "เปิดรับสมัคร", event });
      milestones.push({ day: event.registration.closesOn, label: "ปิดรับสมัคร", event });
    }
    const next = milestones.sort((a, b) => a.day.localeCompare(b.day)).find(milestone => milestone.day >= demoDay);
    return next ? [next] : [];
  }).sort((a, b) => a.day.localeCompare(b.day));
}
