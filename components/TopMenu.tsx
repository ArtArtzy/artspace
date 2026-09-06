"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="m20 20-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path
        d="M6.75 16.25h10.5l-1.1-1.67a3.75 3.75 0 0 1-.62-2.07V9.75a3.53 3.53 0 0 0-7.06 0v2.76c0 .73-.21 1.45-.62 2.07l-1.1 1.67ZM10.25 19.25h3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

const links = [
 { label: "หน้าหลัก", href: "/" },
  { label: "อ่าน", href: "/read" },
 { label: "เขียน", href: "/write" },
  { label: "นักเขียน", href: "/writers" },
  { label: "ชุมชน", href: "/community" },
];

type TopMenuProps = {
  fixed?: boolean;
};

export default function TopMenu({ fixed = false }: TopMenuProps) {
  const pathname = usePathname();
  const isLinkActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`${fixed ? "fixed inset-x-0 top-0 z-50" : ""} border-b border-white/[0.06] bg-[#0c0e0d] text-white`}>
      <div className="mx-auto flex h-[82px] max-w-[1400px] items-center gap-8 px-8">
        <a aria-label="ARN SPACE หน้าหลัก" className="flex shrink-0 items-center" href="/">
          <Image
            alt="ARN SPACE — Read Write Belong"
            className="h-auto w-[238px]"
            height={80}
            priority
            src="/images/arnspace-logo.webp"
            width={238}
          />
        </a>

        <nav aria-label="เมนูหลัก" className="flex h-full items-center gap-2">
          {links.map((link) => (
            <a
              aria-current={isLinkActive(link.href) ? "page" : undefined}
              className={`relative flex h-full min-w-[88px] flex-col items-center justify-center gap-2 px-3 pt-1 text-[15px] font-semibold transition-colors ${
                isLinkActive(link.href) ? "text-[#0ed77e]" : "text-white/85 hover:text-white"
              }`}
              href={link.href}
              key={link.label}
            >
              {link.label}
              <span className={`block h-0.5 w-full rounded-full ${isLinkActive(link.href) ? "bg-[#0ed77e]" : "opacity-0"}`} />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex min-w-0 items-center gap-6">
          <label className="flex h-10 w-[316px] items-center gap-2 rounded-[9px] border border-[#1f4e32] bg-[#141917] px-3 text-white/55 shadow-[inset_0_0_14px_rgba(20,215,126,0.05)] focus-within:border-[#0ecb78]">
            <span className="shrink-0"><SearchIcon /></span>
            <input
              aria-label="ค้นหา"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              placeholder="ค้นหาเรื่อง ปากกา เรื่องที่คุณสนใจ..."
              type="search"
            />
          </label>

         <button aria-label="การแจ้งเตือน" className="relative text-white/90 transition hover:text-[#0ed77e]">
            <BellIcon />
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ef4a4f] text-[9px] font-bold text-white">1</span>
          </button>
         <button
           aria-label="โปรไฟล์"
            className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#ccebbf] bg-[#967260] p-0 shadow-[0_0_0_3px_rgba(81,164,109,0.3)] transition hover:scale-105"
         >
            <Image alt="โปรไฟล์" className="h-full w-full object-cover" height={44} src="/images/profile-arn.webp" width={44} />
         </button>
        </div>
      </div>
    </header>
  );
}
