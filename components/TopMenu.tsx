"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { unbuiltPages, type UnbuiltPage } from "@/data/unbuilt-pages";
import UnbuiltPageModal from "@/components/UnbuiltPageModal";
import UnbuiltPageGuard from "@/components/UnbuiltPageGuard";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m20 20-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg aria-hidden="true" className="h-[19px] w-[19px]" fill="none" viewBox="0 0 24 24">
      <path d="m14.5 5.5 4 4M4 20l1.4-5.2L15.8 4.4a2.1 2.1 0 0 1 3 3L8.4 17.8 4 20Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M13 7.5 16.5 11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
      <path d="M6.75 16.25h10.5l-1.1-1.67a3.75 3.75 0 0 1-.62-2.07V9.75a3.53 3.53 0 0 0-7.06 0v2.76c0 .73-.21 1.45-.62 2.07l-1.1 1.67ZM10.25 19.25h3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24">
      <path d="M12 19.2S4.2 14.8 4.2 9.3a3.7 3.7 0 0 1 6.6-2.3L12 8.3l1.2-1.3a3.7 3.7 0 0 1 6.6 2.3c0 5.5-7.8 9.9-7.8 9.9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function MenuBookIcon() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24">
      <path d="M4.5 5.5h5.2a2.3 2.3 0 0 1 2.3 2.3v11a2.3 2.3 0 0 0-2.3-2.3H4.5v-11ZM19.5 5.5h-5.2A2.3 2.3 0 0 0 12 7.8v11a2.3 2.3 0 0 1 2.3-2.3h5.2v-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

type NotificationItem = {
  title: string;
  description: string;
  time: string;
  image?: string;
  icon?: "sparkle" | "trophy" | "users" | "settings";
};

const notifications: NotificationItem[] = [
  { title: "'เธอไม่ใช่ตัวของเรา' อัปเดตตอนที่ 21 แล้ว", description: "BlueOrbit เพิ่มตอนใหม่", time: "5 นาทีที่แล้ว", image: "/images/book-city-echoes.webp" },
  { title: "MildyMoon ตอบกลับคอมเมนต์ของคุณ", description: "\"ชอบประโยคนี้มากเลยค่ะ\"", time: "18 นาทีที่แล้ว", image: "/images/writers/moonlit.webp" },
  { title: "เรื่องใหม่ในหมวดแฟนตาซีที่คุณอาจชอบ", description: "แนะนำตามหมวดโปรดของคุณ", time: "1 ชั่วโมงที่แล้ว", icon: "sparkle" },
  { title: "คุณอ่านครบ 100 ตอนแล้ว", description: "ปลดล็อกบันทึกประจำวัน", time: "2 ชั่วโมงที่แล้ว", icon: "trophy" },
  { title: "กิจกรรมเขียนเรื่องสั้นเดือนนี้ปิดแล้ว", description: "เข้าร่วมและส่งผลงานได้วันนี้", time: "วันนี้", icon: "users" },
  { title: "เพิ่มฟีเจอร์หมวดโปรดของคุณแล้ว", description: "เลือกหมวดที่อยากให้แสดงบนหน้าแรกได้", time: "เมื่อวาน", icon: "settings" },
];

function NotificationIcon({ icon }: { icon: NonNullable<NotificationItem["icon"]> }) {
  if (icon === "sparkle") {
    return <svg aria-hidden="true" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" opacity=".7" /></svg>;
  }

  if (icon === "trophy") {
    return <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24"><path d="M8 4h8v4.5a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="1.8" /><path d="M8 6H5.5v1.5A3.5 3.5 0 0 0 9 11M16 6h2.5v1.5A3.5 3.5 0 0 1 15 11M12 12.5V17M8.5 20h7M10 17h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
  }

  if (icon === "users") {
    return <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" /><circle cx="16.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.8" /><path d="M4.5 18a4.5 4.5 0 0 1 9 0M14 17a3.5 3.5 0 0 1 6.5 1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>;
  }

  return <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24"><path d="m12 3 1.25 1.8 2.2-.15.65 2.1 2.05.8-.55 2.15 1.55 1.55-1.55 1.55.55 2.15-2.05.8-.65 2.1-2.2-.15L12 21l-1.25-1.8-2.2.15-.65-2.1-2.05-.8.55-2.15L4.85 12l1.55-1.55-.55-2.15 2.05-.8.65-2.1 2.2.15L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

function NotificationMenu({ onOpenAll, onOpenNotification }: { onOpenAll: () => void; onOpenNotification: (index: number) => void }) {
  return (
    <div aria-label="รายการแจ้งเตือน" className="ds-card absolute right-0 top-[calc(100%+28px)] z-50 w-[410px] overflow-hidden text-arn-text" role="dialog">
      <div className="flex items-center justify-between border-b border-white/[0.09] px-5 py-4">
        <h2 className="text-[17px] font-semibold">การแจ้งเตือน</h2>
        <button className="text-[11px] text-[#31e985] transition hover:text-white" onClick={onOpenAll} type="button">อ่านทั้งหมด</button>
      </div>
      <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
        {notifications.map((notification, index) => (
          <button className="group flex w-full items-center gap-4 border-b border-white/[0.08] px-4 py-3 text-left transition last:border-b-0 hover:bg-white/[0.04]" key={notification.title} onClick={() => onOpenNotification(index)} type="button">
            {notification.image ? (
              <Image alt="" className="h-[58px] w-[58px] shrink-0 rounded-full object-cover ring-1 ring-white/[0.12]" height={58} src={notification.image} width={58} />
            ) : (
              <span className={`flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full ring-1 ${notification.icon === "sparkle" ? "bg-[#241837] text-[#bd55ff] ring-[#753ba0]/50" : notification.icon === "trophy" ? "bg-[#332b15] text-[#f6c42d] ring-[#9e771b]/50" : notification.icon === "users" ? "bg-[#0b3324] text-[#16e986] ring-[#159058]/60" : "bg-[#1b211f] text-[#d4dfda] ring-white/25"}`}>
                <NotificationIcon icon={notification.icon!} />
              </span>
            )}
            <span className="min-w-0 flex-1 py-0.5">
              <span className="block truncate text-[14px] font-semibold leading-6 text-white group-hover:text-[#50f39a]">{notification.title}</span>
              <span className="block truncate text-[12px] leading-5 text-white/55">{notification.description}</span>
              <span className="block text-[11px] leading-5 text-white/35">{notification.time}</span>
            </span>
            <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#15e985] shadow-[0_0_10px_rgba(21,233,133,.5)]" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfileMenu({ onClose, onOpenBookshelf, onOpenFollowing, onOpenProfile, onRequestLogout }: { onClose: () => void; onOpenBookshelf: () => void; onOpenFollowing: () => void; onOpenProfile: () => void; onRequestLogout: () => void }) {
  return (
    <div aria-label="เมนูโปรไฟล์" className="ds-card absolute right-0 top-[calc(100%+18px)] z-50 w-[270px] overflow-hidden p-2 text-arn-text" role="menu">
      <button className="flex w-full items-center gap-3 border-b border-white/[0.09] px-3 pb-3 pt-2 text-left transition hover:bg-white/[0.04]" onClick={onOpenProfile} role="menuitem" type="button">
        <Image alt="โปรไฟล์" className="h-10 w-10 rounded-full object-cover ring-1 ring-[#27e982]" height={40} src="/images/profile-arn.webp" width={40} />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">โปรไฟล์ของฉัน</p>
          <p className="text-[11px] text-white/40">จัดการบัญชีของคุณ</p>
        </div>
      </button>

      <div className="pt-2">
        <button className="flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left transition hover:bg-white/[0.06]" onClick={onOpenBookshelf} role="menuitem" type="button">
          <span aria-hidden="true" className="text-[17px] text-[#41e993]">▤</span>
          <span className="text-[13px]">ชั้นหนังสือของฉัน</span>
        </button>
        <button className="flex w-full items-center justify-between gap-3 rounded-[7px] px-3 py-2.5 text-left transition hover:bg-white/[0.06]" onClick={onOpenFollowing} role="menuitem" type="button">
          <span className="flex items-center gap-3 text-[#e96ba6]"><HeartIcon /><span className="text-[13px] text-white">กำลังติดตาม</span></span>
          <span className="text-[12px] font-semibold text-white/55">24</span>
        </button>
      </div>

      <div className="mt-1 border-t border-white/[0.09] pt-1">
        <button className="flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left text-[#ff7b7f] transition hover:bg-[#ff5f65]/[0.1]" onClick={onRequestLogout} role="menuitem" type="button">
          <span aria-hidden="true" className="text-[17px]">↪</span>
          <span className="text-[13px]">ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );
}

function LogoutConfirmModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div aria-label="ยืนยันการออกจากระบบ" aria-modal="true" className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020504]/75 px-5 backdrop-blur-[3px]" onClick={onCancel} role="dialog">
      <div className="ds-card w-full max-w-[390px] overflow-hidden" onClick={(event) => event.stopPropagation()}>
        <div className="flex justify-center pt-7">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ff7277]/40 bg-[#3a171b] text-[#ff8589] shadow-[0_0_22px_rgba(255,90,97,.14)]">
            <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
              <path d="M10 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H10M14 8l4 4-4 4M9 12h9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
        </div>
        <div className="px-7 pb-7 pt-5 text-center">
          <h2 className="text-[20px] font-semibold text-white">ต้องการออกจากระบบหรือไม่?</h2>
          <p className="mt-2 text-[13px] leading-6 text-white/55">คุณจะต้องเข้าสู่ระบบอีกครั้งเพื่อกลับมาใช้งานบัญชีนี้</p>
          <div className="mt-6 flex gap-3">
            <button className="h-10 flex-1 rounded-[8px] border border-white/[0.16] bg-white/[0.04] text-[13px] font-medium text-white/75 transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white" onClick={onCancel} type="button">ยกเลิก</button>
            <button className="h-10 flex-1 rounded-[8px] border border-[#ff686f]/60 bg-[#a92e38] text-[13px] font-semibold text-white transition hover:bg-[#c63b46]" onClick={onConfirm} type="button">ออกจากระบบ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const links = [
  { label: "หน้าหลัก", href: "/" },
 { label: "นิยาย", href: "/read" },
  { label: "แฟนฟิค", href: "/read/fanfic" },
  { label: "การ์ตูน", href: "/read/cartoon" },
  { label: "ชุมชน", href: "/community" },
];

const authStorageKey = "arnspace-authenticated";
export const authStateChangedEvent = "arnspace-auth-change";

type TopMenuProps = {
  fixed?: boolean;
  initialLoggedIn?: boolean;
};

export default function TopMenu({ fixed = false, initialLoggedIn = true }: TopMenuProps) {
  const pathname = usePathname();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [pendingUnbuiltPage, setPendingUnbuiltPage] = useState<{ page: UnbuiltPage; href: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const isLinkActive = (href: string) => {
    if (href === "/" || href === "/read") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    const page = unbuiltPages.find((item) => item.code === "SEARCH-001");
    if (page) setPendingUnbuiltPage({ page, href: `/search?q=${encodeURIComponent(query)}` });
  };

  useEffect(() => {
    const storedAuthState = window.localStorage.getItem(authStorageKey);
    if (storedAuthState !== null) {
      setIsLoggedIn(storedAuthState === "true");
    } else {
      window.localStorage.setItem(authStorageKey, String(initialLoggedIn));
    }
  }, [initialLoggedIn]);

  useEffect(() => {
    if (!isNotificationsOpen && !isProfileOpen && !isLogoutConfirmOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!notificationRef.current?.contains(target)) setIsNotificationsOpen(false);
      if (!profileRef.current?.contains(target)) setIsProfileOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
        setIsLogoutConfirmOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNotificationsOpen, isProfileOpen, isLogoutConfirmOpen]);

  return (
    <UnbuiltPageGuard>
      <header className={`${fixed ? "fixed inset-x-0 top-0 z-50" : ""} border-b border-arn-border bg-arn-canvas text-arn-text`}>
      <div className="mx-auto flex h-[82px] max-w-[1400px] items-center gap-8 px-8">
        <a aria-label="ARN SPACE หน้าหลัก" className="-ml-4 flex shrink-0 items-center" href="/">
          <Image alt="ARN SPACE — Read Write Belong" className="h-auto w-[238px]" height={80} priority src="/images/arnspace-logo.webp" width={238} />
        </a>

        <nav aria-label="เมนูหลัก" className="flex h-full items-center gap-2">
          {links.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <a aria-current={isActive ? "page" : undefined} className={`relative flex h-[64px] min-w-[88px] items-center justify-center gap-2 rounded-[7px] border px-3 text-[15px] font-semibold transition-colors ${isActive ? "border-arn-border-strong bg-arn-raised text-arn-accent shadow-ds-glow" : "border-transparent text-white/85 hover:text-white"}`} href={link.href} key={link.label}>
                {isActive && <MenuBookIcon />}
                <span>{link.label}</span>
                <span className={`absolute bottom-0.5 left-2 right-2 block h-0.5 rounded-full ${isActive ? "bg-arn-accent" : "opacity-0"}`} />
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-4">
          <form className="w-[270px]" onSubmit={handleSearchSubmit}>
            <label className="ds-input flex h-10 w-full items-center gap-2 px-3 text-white/55">
            <span className="shrink-0"><SearchIcon /></span>
            <input aria-label="ค้นหา" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35" onChange={(event) => setSearchQuery(event.target.value)} placeholder="ค้นหาเรื่อง นามปากกา" type="search" value={searchQuery} />
            </label>
          </form>

          <a aria-label="เขียนเรื่อง" aria-current={pathname === "/write" ? "page" : undefined} className={`group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[#41ee91] transition ${pathname === "/write" ? "border-[#20d976] bg-[#123722] shadow-[0_0_16px_rgba(32,217,118,.2)]" : "border-[#20d976] bg-transparent hover:bg-[#123722]"}`} href="/write" title="เขียนเรื่อง">
            <PenIcon />
          </a>

          {isLoggedIn ? (
            <>
              <div className="relative" ref={notificationRef}>
                <button aria-expanded={isNotificationsOpen} aria-haspopup="dialog" aria-label="การแจ้งเตือน" className="relative text-white/90 transition hover:text-[#0ed77e]" onClick={() => { setIsNotificationsOpen((open) => !open); setIsProfileOpen(false); }} type="button">
                  <BellIcon />
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ef4a4f] text-[10px] font-bold text-white">6</span>
                </button>
                {isNotificationsOpen && (
                  <NotificationMenu
                    onOpenAll={() => {
                      setIsNotificationsOpen(false);
                      const page = unbuiltPages.find((item) => item.code === "NOTIFICATIONS-LIST-001");
                      if (page) setPendingUnbuiltPage({ page, href: page.url });
                    }}
                    onOpenNotification={(index) => {
                      setIsNotificationsOpen(false);
                      const page = unbuiltPages.find((item) => item.code === "NOTIFICATION-ITEM-001");
                      if (page) setPendingUnbuiltPage({ page, href: `/notifications/${index + 1}` });
                    }}
                  />
                )}
              </div>

              <div className="relative" ref={profileRef}>
                <button aria-expanded={isProfileOpen} aria-haspopup="menu" aria-label="โปรไฟล์" className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#ccebbf] bg-[#967260] p-0 shadow-[0_0_0_3px_rgba(81,164,109,0.3)] transition hover:scale-105" onClick={() => { setIsProfileOpen((open) => !open); setIsNotificationsOpen(false); }} type="button">
                  <Image alt="โปรไฟล์" className="h-full w-full object-cover" height={44} src="/images/profile-arn.webp" width={44} />
                </button>
                {isProfileOpen && <ProfileMenu onClose={() => setIsProfileOpen(false)} onOpenBookshelf={() => { setIsProfileOpen(false); const page = unbuiltPages.find((item) => item.code === "READ-BOOKSHELF-001"); if (page) setPendingUnbuiltPage({ page, href: page.url }); }} onOpenFollowing={() => { setIsProfileOpen(false); const page = unbuiltPages.find((item) => item.code === "FOLLOWING-001"); if (page) setPendingUnbuiltPage({ page, href: page.url }); }} onOpenProfile={() => { setIsProfileOpen(false); const page = unbuiltPages.find((item) => item.code === "PROFILE-001"); if (page) setPendingUnbuiltPage({ page, href: page.url }); }} onRequestLogout={() => { setIsProfileOpen(false); setIsLogoutConfirmOpen(true); }} />}
              </div>
            </>
          ) : (
            <div className="flex shrink-0 items-center gap-2">
              <a className="flex h-10 min-w-[100px] shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] border border-[#20d976] px-4 text-[13px] font-semibold text-[#41ee91] transition hover:bg-[#123722]" href="/login">เข้าสู่ระบบ</a>
              <a className="flex h-10 min-w-[108px] shrink-0 items-center justify-center whitespace-nowrap rounded-[8px] border border-[#20d976] bg-[#16c96b] px-4 text-[13px] font-semibold text-[#07100b] transition hover:bg-[#36ed88]" href="/register">สมัครสมาชิก</a>
            </div>
          )}
        </div>
      </div>
      {isLogoutConfirmOpen && <LogoutConfirmModal onCancel={() => setIsLogoutConfirmOpen(false)} onConfirm={() => { setIsLogoutConfirmOpen(false); setIsNotificationsOpen(false); setIsProfileOpen(false); setIsLoggedIn(false); window.localStorage.setItem(authStorageKey, "false"); window.dispatchEvent(new Event(authStateChangedEvent)); }} />}
      {pendingUnbuiltPage && <UnbuiltPageModal href={pendingUnbuiltPage.href} onClose={() => setPendingUnbuiltPage(null)} page={pendingUnbuiltPage.page} />}
      </header>
    </UnbuiltPageGuard>
  );
}
