export type UnbuiltPage = {
  code: string;
  name: string;
  url: string;
  trigger: string;
  status: "ยังไม่ได้ทำ";
};

/**
 * รายการหน้าที่ยังไม่ได้ทำจริง
 * เพิ่มรายการใหม่ได้ที่ไฟล์นี้ แล้วนำ route ไปผูกกับ UnbuiltPageGuard เมื่อพร้อม
 */
export const unbuiltPages: readonly UnbuiltPage[] = [
  {
    code: "SEARCH-001",
    name: "หน้าผลการค้นหา",
    url: "/search?q=:query",
    trigger: "กด Enter หลังพิมพ์ข้อความในช่องค้นหา",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "NOTIFICATIONS-LIST-001",
    name: "หน้าการแจ้งเตือนทั้งหมด",
    url: "/notifications",
    trigger: "กดอ่านทั้งหมดในเมนูกระดิ่ง",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "NOTIFICATION-ITEM-001",
    name: "หน้ารายละเอียดการแจ้งเตือน",
    url: "/notifications/:id",
    trigger: "กดรายการ Notification ในเมนูกระดิ่ง",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "PROFILE-001",
    name: "หน้าจัดการโปรไฟล์ของฉัน",
    url: "/profile",
    trigger: "กด Block โปรไฟล์ของฉันในเมนู Profile",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOLLOWING-001",
    name: "หน้าจัดการการติดตาม",
    url: "/following",
    trigger: "กดกำลังติดตามในเมนู Profile",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "VERIFY-IDENTITY-001",
    name: "หน้ายืนยันตัวตน",
    url: "/verify-identity",
    trigger: "ปุ่มยืนยันตัวตนเพิ่มใน Popup เลือกหมวดที่คุณสนใจ",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-NOVEL-001",
    name: "หน้าสำหรับอ่านนิยาย",
    url: "/read?title=:title",
    trigger: "อ่านเลย หรือกดปกนิยาย",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-FANFIC-001",
    name: "หน้าสำหรับอ่านแฟนฟิค",
    url: "/read/fanfic?title=:title",
    trigger: "อ่านเลย หรือกดปกแฟนฟิค",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-CARTOON-001",
    name: "หน้าสำหรับอ่านการ์ตูน",
    url: "/read/cartoon?title=:title",
    trigger: "อ่านเลย หรือกดปกการ์ตูน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-TAG-MANAGE-NOVEL-001",
    name: "หน้าจัดการแท็กนิยาย",
    url: "/read?tag-settings=manage",
    trigger: "จัดการแท็กที่คุณสนใจใน Sidebar นิยาย",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-TAG-MANAGE-FANFIC-001",
    name: "หน้าจัดการแท็กแฟนฟิค",
    url: "/read/fanfic?tag-settings=manage",
    trigger: "จัดการแท็กที่คุณสนใจใน Sidebar แฟนฟิค",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-TAG-MANAGE-CARTOON-001",
    name: "หน้าจัดการแท็กการ์ตูน",
    url: "/read/cartoon?tag-settings=manage",
    trigger: "จัดการแท็กที่คุณสนใจใน Sidebar การ์ตูน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-TAG-NOVEL-001",
    name: "หน้ารวมเรื่องตามแท็กนิยาย",
    url: "/read?tag=:tag",
    trigger: "กดแท็กใน Sidebar นิยาย",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-TAG-FANFIC-001",
    name: "หน้ารวมเรื่องตามแท็กแฟนฟิค",
    url: "/read/fanfic?tag=:tag",
    trigger: "กดแท็กใน Sidebar แฟนฟิค",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-TAG-CARTOON-001",
    name: "หน้ารวมเรื่องตามแท็กการ์ตูน",
    url: "/read/cartoon?tag=:tag",
    trigger: "กดแท็กใน Sidebar การ์ตูน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "READ-BOOKSHELF-001",
    name: "ชั้นหนังสือของคุณ",
    url: "/read?bookshelf=all",
    trigger: "ดูทั้งหมดใน Sidebar หรือชั้นหนังสือของฉันใน Profile",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "HOME-CONTINUE-001",
    name: "หน้ารวมเรื่องอ่านต่อ",
    url: "/read?category=อ่านต่อ",
    trigger: "ดูทั้งหมดใน Section อ่านต่อจากที่ค้างไว้ หน้าแรก",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "HOME-NEW-EPISODES-001",
    name: "หน้ารวมตอนใหม่",
    url: "/read?section=new-episodes",
    trigger: "ดูทั้งหมดใน Sidebar มีตอนใหม่ หน้าแรก",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "WRITER-PROFILE-001",
    name: "หน้าโปรไฟล์นักเขียน",
    url: "/writers/:slug",
    trigger: "กดการ์ดนักเขียนใน Section นักเขียนแนะนำ",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "WRITERS-LIST-001",
    name: "หน้ารวมนักเขียน",
    url: "/writers",
    trigger: "เมนูนักเขียน หรือดูทั้งหมดใน Section นักเขียนแนะนำ",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "WRITE-001",
    name: "หน้าสร้างผลงาน",
    url: "/write",
    trigger: "ปุ่มเขียนเรื่อง หรือเริ่มต้นเขียน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-ABOUT-001",
    name: "หน้าเกี่ยวกับ ARN SPACE",
    url: "/about",
    trigger: "Footer: ARN SPACE",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-VISION-001",
    name: "หน้าวิสัยทัศน์",
    url: "/vision",
    trigger: "Footer: วิสัยทัศน์",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-CAREERS-001",
    name: "หน้าร่วมงานกับเรา",
    url: "/careers",
    trigger: "Footer: ร่วมงานกับเรา",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-GUIDE-001",
    name: "หน้าคู่มือการใช้งาน",
    url: "/help/guide",
    trigger: "Footer: คู่มือการใช้งาน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-RULES-001",
    name: "หน้ากฎและข้อตกลง",
    url: "/rules",
    trigger: "Footer: กฎและข้อตกลง",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-HELP-001",
    name: "หน้าศูนย์ช่วยเหลือ",
    url: "/help",
    trigger: "Footer: ศูนย์ช่วยเหลือ",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-CONTACT-001",
    name: "หน้าติดต่อเรา",
    url: "/contact",
    trigger: "Footer: ติดต่อเรา",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-PRIVACY-001",
    name: "หน้านโยบายความเป็นส่วนตัว",
    url: "/privacy",
    trigger: "Footer: นโยบายความเป็นส่วนตัว",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "FOOTER-TERMS-001",
    name: "หน้าเงื่อนไขการใช้งาน",
    url: "/terms",
    trigger: "Footer: เงื่อนไขการใช้งาน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "SOCIAL-LINK-001",
    name: "หน้าลิงก์โซเชียลของ ARN SPACE",
    url: "/social/:network",
    trigger: "ไอคอน Social ใน Footer",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "COMMUNITY-CREATE-POST-001",
    name: "หน้าสร้างโพสต์ชุมชน",
    url: "/community/create-post",
    trigger: "ปุ่มสร้างโพสต์ใน Hero ชุมชน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "COMMUNITY-EVENTS-LIST-001",
    name: "หน้ารวมกิจกรรมชุมชน",
    url: "/community/events",
    trigger: "ดูรายละเอียดหรือดูทั้งหมดของกิจกรรม",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "COMMUNITY-EVENT-RULES-001",
    name: "หน้ากติกาการเข้าร่วมกิจกรรม",
    url: "/community/events/rules",
    trigger: "ดูรายละเอียดกติกาการเข้าร่วมกิจกรรม",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "COMMUNITY-EVENT-001",
    name: "หน้ารายละเอียดกิจกรรมชุมชน",
    url: "/community/events/:slug",
    trigger: "ปุ่มเข้าร่วม/ดูรายละเอียดกิจกรรม หรือกิจกรรมใน Sidebar",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "COMMUNITY-WRITER-TOPICS-001",
    name: "หน้ารวมกระทู้ห้องนักเขียน",
    url: "/community/writers/topics?filter=:filter",
    trigger: "ดูทั้งหมดในแต่ละ Section ของห้องนักเขียน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "COMMUNITY-WRITER-RESOURCES-001",
    name: "หน้ารวมแหล่งช่วยเขียน",
    url: "/community/writers/resources/:slug",
    trigger: "แหล่งช่วยเขียนใน Sidebar ห้องนักเขียน",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "COMMUNITY-TOPIC-001",
    name: "หน้ารายละเอียดกระทู้ชุมชน",
    url: "/community/topics/:slug",
    trigger: "กดกระทู้ใน Sidebar ชุมชนที่คุณสนใจ",
    status: "ยังไม่ได้ทำ",
  },
  {
    code: "ARN-NEWS-001",
    name: "หน้ารายละเอียดข่าว ARN SPACE",
    url: "/community/news/:slug",
    trigger: "กดรายการข่าวใน Sidebar ข่าวจาก ARN SPACE",
    status: "ยังไม่ได้ทำ",
  },
];

export function findUnbuiltPage(pathname: string, searchParams: URLSearchParams) {
  return unbuiltPages.find((page) => {
    const [pagePathname, pageQuery = ""] = page.url.split("?");
    const expectedPathParts = pagePathname.split("/").filter(Boolean);
    const actualPathParts = pathname.split("/").filter(Boolean);
    if (expectedPathParts.length !== actualPathParts.length) return false;
    if (!expectedPathParts.every((part, index) => part.startsWith(":") || part === actualPathParts[index])) return false;

    const expectedParams = new URLSearchParams(pageQuery);
    for (const [key, expectedValue] of expectedParams.entries()) {
      const actualValue = searchParams.get(key);
      if (expectedValue.startsWith(":")) {
        if (!actualValue) return false;
      } else if (actualValue !== expectedValue) {
        return false;
      }
    }

    return true;
  });
}
