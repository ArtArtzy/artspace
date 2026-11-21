export type HomeBanner = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  actionLabel: string;
};

export const readathonBanner: HomeBanner = {
  id: "readathon",
  title: "อ่านไปด้วยกัน",
  category: "Readathon",
  description: "เปิดหนังสือเล่มใหม่ แล้วแบ่งปันการเดินทางกับเพื่อนนักอ่าน",
  href: "/community/events/readathon-september",
  actionLabel: "ดูกิจกรรม",
};

export const homeBanners: HomeBanner[] = [
  {
    id: "fantasy",
    title: "ผู้พิทักษ์ประตูหมอก",
    category: "แฟนตาซี",
    description: "เมื่อประตูโบราณเปิดออก การเดินทางครั้งใหม่ก็เริ่มต้น",
    href: `/read?title=${encodeURIComponent("ผู้พิทักษ์ประตูหมอก")}`,
    actionLabel: "อ่านเรื่องนี้",
  },
  {
    id: "boylove",
    title: "แรงโน้มถ่วงของเรา",
    category: "Boy Love",
    description: "ท่ามกลางดวงดาวและเมืองใหญ่ หัวใจกลับโคจรมาพบกัน",
    href: `/read?title=${encodeURIComponent("แรงโน้มถ่วงของเรา")}`,
    actionLabel: "อ่านเรื่องนี้",
  },
  {
    id: "girllove",
    title: "สวนดอกไม้ของเรา",
    category: "Girl Love",
    description: "ให้ความรักค่อย ๆ ผลิบาน ในสวนที่มีเราอยู่ด้วยกัน",
    href: `/read?title=${encodeURIComponent("สวนดอกไม้ของเรา")}`,
    actionLabel: "อ่านเรื่องนี้",
  },
  {
    id: "writing",
    title: "เขียนให้โลกได้อ่าน",
    category: "Writing Challenge",
    description: "เริ่มต้นเรื่องราวของคุณ แล้วเติบโตไปพร้อมชุมชนนักเขียน",
    href: "/community/events/september-writing-challenge",
    actionLabel: "ดูกิจกรรม",
  },
  readathonBanner,
];

export const homeEvents = [
  {
    slug: "september-writing-challenge",
    bannerId: "writing",
    title: "Writing Challenge",
    description: "ทุกเรื่องราวเริ่มต้นได้เสมอ มาลองเขียนเรื่องสั้นและแบ่งปันกับชุมชน ARN SPACE",
    steps: [
      "เลือกแนวเรื่องที่คุณสนใจ และตั้งเป้าหมายการเขียนของตัวเอง",
      "เริ่มเขียนเรื่องสั้นหรือตอนใหม่ แล้วเผยแพร่ผลงานผ่านหน้าเขียนเรื่อง",
      "แบ่งปันประสบการณ์และแลกเปลี่ยนความคิดเห็นกับเพื่อนนักเขียนในชุมชน",
    ],
    actionLabel: "เริ่มเขียนเรื่อง",
    actionHref: "/write",
  },
  {
    slug: "readathon-september",
    bannerId: "readathon",
    title: "Readathon",
    description: "ชวนกันอ่านเรื่องใหม่ ตั้งเป้าหมายเล็ก ๆ และแบ่งปันเรื่องราวที่คุณชอบกับชุมชน ARN SPACE",
    steps: [
      "เลือกเรื่องที่อยากอ่านจากหน้าแรกหรือหมวดเรื่องที่คุณสนใจ",
      "ตั้งเป้าหมายจำนวนตอนหรือเวลาอ่านที่เหมาะกับตัวเอง",
      "แบ่งปันเรื่องที่อ่านและพูดคุยกับเพื่อนนักอ่านในชุมชน",
    ],
    actionLabel: "ค้นหาเรื่องอ่าน",
    actionHref: "/read",
  },
];
