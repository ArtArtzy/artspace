"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="m20 20-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path d="M6.75 16.25h10.5l-1.1-1.67a3.75 3.75 0 0 1-.62-2.07V9.75a3.53 3.53 0 0 0-7.06 0v2.76c0 .73-.21 1.45-.62 2.07l-1.1 1.67ZM10.25 19.25h3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
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

function NotificationMenu({ onClose }: { onClose: () => void }) {
  return (
    <div aria-label="รายการแจ้งเตือน" className="absolute right-0 top-[calc(100%+28px)] z-50 w-[410px] overflow-hidden rounded-[10px] border border-white/[0.12] bg-[#111715] text-white shadow-[0_18px_50px_rgba(0,0,0,.55)]" role="dialog">
      <div className="flex items-center justify-between border-b border-white/[0.09] px-5 py-4">
        <h2 className="text-[17px] font-semibold">การแจ้งเตือน</h2>
        <button className="text-[11px] text-[#31e985] transition hover:text-white" onClick={onClose} type="button">อ่านทั้งหมด</button>
      </div>
      <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
        {notifications.map((notification) => (
          <button className="group flex w-full items-center gap-4 border-b border-white/[0.08] px-4 py-3 text-left transition last:border-b-0 hover:bg-white/[0.04]" key={notification.title} onClick={onClose} type="button">
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

function ProfileMenu({ onClose, onRequestLogout }: { onClose: () => void; onRequestLogout: () => void }) {
  return (
    <div aria-label="เมนูโปรไฟล์" className="absolute right-0 top-[calc(100%+18px)] z-50 w-[270px] overflow-hidden rounded-[10px] border border-white/[0.12] bg-[#111715] p-2 text-white shadow-[0_18px_50px_rgba(0,0,0,.55)]" role="menu">
      <div className="flex items-center gap-3 border-b border-white/[0.09] px-3 pb-3 pt-2">
        <Image alt="โปรไฟล์" className="h-10 w-10 rounded-full object-cover ring-1 ring-[#27e982]" height={40} src="/images/profile-arn.webp" width={40} />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">โปรไฟล์ของฉัน</p>
          <p className="text-[11px] text-white/40">จัดการบัญชีของคุณ</p>
        </div>
      </div>

      <div className="pt-2">
        <button className="flex w-full items-center gap-3 rounded-[7px] px-3 py-2.5 text-left transition hover:bg-white/[0.06]" onClick={onClose} role="menuitem" type="button">
          <span aria-hidden="true" className="text-[17px] text-[#41e993]">▤</span>
          <span className="text-[13px]">ชั้นหนังสือของฉัน</span>
        </button>
        <button className="flex w-full items-center justify-between gap-3 rounded-[7px] px-3 py-2.5 text-left transition hover:bg-white/[0.06]" onClick={onClose} role="menuitem" type="button">
          <span className="flex items-center gap-3"><span aria-hidden="true" className="text-[17px] text-[#f4c84e]">◈</span><span className="text-[13px]">จำนวนเหรียญ</span></span>
          <span className="text-[12px] font-semibold text-[#f4c84e]">1,250</span>
        </button>
        <button className="flex w-full items-center justify-between gap-3 rounded-[7px] px-3 py-2.5 text-left transition hover:bg-white/[0.06]" onClick={onClose} role="menuitem" type="button">
          <span className="flex items-center gap-3"><span aria-hidden="true" className="text-[18px] text-[#e96ba6]">♡</span><span className="text-[13px]">กำลังติดตาม</span></span>
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
      <div className="w-full max-w-[390px] overflow-hidden rounded-[14px] border border-[#1ed873]/30 bg-[#101714] shadow-[0_22px_70px_rgba(0,0,0,.65)]" onClick={(event) => event.stopPropagation()}>
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
  { label: "อ่าน", href: "/read" },
  { label: "เขียน", href: "/write" },
  { label: "นักเขียน", href: "/writers" },
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
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const isLinkActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

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
    <header className={`${fixed ? "fixed inset-x-0 top-0 z-50" : ""} border-b border-white/[0.06] bg-[#0c0e0d] text-white`}>
      <div className="mx-auto flex h-[82px] max-w-[1400px] items-center gap-8 px-8">
        <a aria-label="ARN SPACE หน้าหลัก" className="flex shrink-0 items-center" href="/">
          <Image alt="ARN SPACE — Read Write Belong" className="h-auto w-[238px]" height={80} priority src="/images/arnspace-logo.webp" width={238} />
        </a>

        <nav aria-label="เมนูหลัก" className="flex h-full items-center gap-2">
          {links.map((link) => (
            <a aria-current={isLinkActive(link.href) ? "page" : undefined} className={`relative flex h-full min-w-[88px] flex-col items-center justify-center gap-2 px-3 pt-1 text-[15px] font-semibold transition-colors ${isLinkActive(link.href) ? "text-[#0ed77e]" : "text-white/85 hover:text-white"}`} href={link.href} key={link.label}>
              {link.label}
              <span className={`block h-0.5 w-full rounded-full ${isLinkActive(link.href) ? "bg-[#0ed77e]" : "opacity-0"}`} />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-6">
          <label className="flex h-10 w-[316px] items-center gap-2 rounded-[9px] border border-[#1f4e32] bg-[#141917] px-3 text-white/55 shadow-[inset_0_0_14px_rgba(20,215,126,0.05)] focus-within:border-[#0ecb78]">
            <span className="shrink-0"><SearchIcon /></span>
            <input aria-label="ค้นหา" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35" placeholder="ค้นหาเรื่อง ปากกา เรื่องที่คุณสนใจ..." type="search" />
          </label>

          {isLoggedIn ? (
            <>
              <div className="relative" ref={notificationRef}>
                <button aria-expanded={isNotificationsOpen} aria-haspopup="dialog" aria-label="การแจ้งเตือน" className="relative text-white/90 transition hover:text-[#0ed77e]" onClick={() => { setIsNotificationsOpen((open) => !open); setIsProfileOpen(false); }} type="button">
                  <BellIcon />
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ef4a4f] text-[9px] font-bold text-white">6</span>
                </button>
                {isNotificationsOpen && <NotificationMenu onClose={() => setIsNotificationsOpen(false)} />}
              </div>

              <div className="relative" ref={profileRef}>
                <button aria-expanded={isProfileOpen} aria-haspopup="menu" aria-label="โปรไฟล์" className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#ccebbf] bg-[#967260] p-0 shadow-[0_0_0_3px_rgba(81,164,109,0.3)] transition hover:scale-105" onClick={() => { setIsProfileOpen((open) => !open); setIsNotificationsOpen(false); }} type="button">
                  <Image alt="โปรไฟล์" className="h-full w-full object-cover" height={44} src="/images/profile-arn.webp" width={44} />
                </button>
                {isProfileOpen && <ProfileMenu onClose={() => setIsProfileOpen(false)} onRequestLogout={() => { setIsProfileOpen(false); setIsLogoutConfirmOpen(true); }} />}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <a className="flex h-10 items-center rounded-[8px] border border-[#20d976] px-4 text-[13px] font-semibold text-[#41ee91] transition hover:bg-[#123722]" href="/login">เข้าสู่ระบบ</a>
              <a className="flex h-10 items-center rounded-[8px] border border-[#20d976] bg-[#16c96b] px-4 text-[13px] font-semibold text-[#07100b] transition hover:bg-[#36ed88]" href="/register">สมัครสมาชิก</a>
            </div>
          )}
        </div>
      </div>
      {isLogoutConfirmOpen && <LogoutConfirmModal onCancel={() => setIsLogoutConfirmOpen(false)} onConfirm={() => { setIsLogoutConfirmOpen(false); setIsNotificationsOpen(false); setIsProfileOpen(false); setIsLoggedIn(false); window.localStorage.setItem(authStorageKey, "false"); window.dispatchEvent(new Event(authStateChangedEvent)); }} />}
    </header>
  );
}
