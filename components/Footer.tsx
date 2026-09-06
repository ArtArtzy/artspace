import Image from "next/image";

const linkGroups = [
  {
    title: "เกี่ยวกับเรา",
    links: ["ARN SPACE", "วิสัยทัศน์", "ร่วมงานกับเรา"],
  },
  {
    title: "สำรวจเรื่องอ่าน",
    links: ["นิยาย", "แฟนฟิค", "การ์ตูน"],
  },
  {
    title: "สำหรับนักเขียน",
    links: ["เริ่มต้นเขียน", "คู่มือการใช้งาน", "กฎและข้อตกลง"],
  },
  {
    title: "ชุมชน",
    links: ["ฟอรั่ม", "กิจกรรม", "ประกาศ"],
  },
  {
    title: "ช่วยเหลือ",
    links: ["ศูนย์ช่วยเหลือ", "ติดต่อเรา", "นโยบายความเป็นส่วนตัว", "เงื่อนไขการใช้งาน"],
  },
];

function SocialIcon({ type }: { type: "chat" | "x" | "facebook" | "instagram" | "youtube" | "tiktok" }) {
  if (type === "x") return <span aria-hidden="true" className="text-[18px] leading-none">𝕏</span>;
  if (type === "facebook") return <span aria-hidden="true" className="text-[17px] font-bold leading-none">f</span>;
  if (type === "tiktok") return <span aria-hidden="true" className="text-[17px] font-bold leading-none">♪</span>;

  return (
    <svg aria-hidden="true" className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24">
      {type === "chat" && <path d="M5 6.5h14v9H11l-4.5 3v-3H5v-9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />}
      {type === "instagram" && <><rect height="14" rx="4" stroke="currentColor" strokeWidth="1.7" width="14" x="5" y="5" /><circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" /><circle cx="16.7" cy="7.5" fill="currentColor" r="0.8" /></>}
      {type === "youtube" && <><path d="M4.5 8.2a2 2 0 0 1 1.8-1.7c3.8-.4 7.6-.4 11.4 0a2 2 0 0 1 1.8 1.7 30 30 0 0 1 0 7.6 2 2 0 0 1-1.8 1.7c-3.8.4-7.6.4-11.4 0a2 2 0 0 1-1.8-1.7 30 30 0 0 1 0-7.6Z" stroke="currentColor" strokeWidth="1.7" /><path d="m10.5 9.7 4.5 2.3-4.5 2.3V9.7Z" fill="currentColor" /></>}
    </svg>
  );
}

function BrandSocialIcon({ type }: { type: "chat" | "x" | "facebook" | "instagram" | "youtube" | "tiktok" }) {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24">
      {type === "chat" && <><path d="M12 3.5c5.25 0 9.5 3.35 9.5 7.5s-4.25 7.5-9.5 7.5c-.86 0-1.7-.09-2.49-.28L5.3 20.5l.58-3.1C3.5 16.06 2.5 13.7 2.5 11c0-4.15 4.25-7.5 9.5-7.5Z" fill="#06c755" /><text fill="#07100b" fontSize="4.5" fontWeight="700" textAnchor="middle" x="12" y="12.5">LINE</text></>}
      {type === "x" && <path d="M5 4h3.15l3.36 4.5L15.3 4H19l-5.72 6.87L19.5 20h-3.16l-3.77-5.05L8.3 20H4.6l5.92-7.23L5 4Z" fill="currentColor" />}
      {type === "facebook" && <><circle cx="12" cy="12" fill="#1877f2" r="9.5" /><path d="M13.45 20v-6.85h2.3l.35-2.68h-2.65V8.76c0-.78.22-1.3 1.34-1.3h1.43V5.05c-.25-.03-1.1-.1-2.08-.1-2.06 0-3.47 1.26-3.47 3.57v1.95H8.35v2.68h2.32V20h2.78Z" fill="white" /></>}
      {type === "instagram" && <><defs><linearGradient id="footer-instagram-gradient" x1="0" x2="1" y1="1" y2="0"><stop offset="0" stopColor="#ffdc80" /><stop offset=".45" stopColor="#e1306c" /><stop offset="1" stopColor="#833ab4" /></linearGradient></defs><rect fill="url(#footer-instagram-gradient)" height="19" rx="5" width="19" x="2.5" y="2.5" /><circle cx="12" cy="12" fill="none" r="4.1" stroke="white" strokeWidth="1.8" /><circle cx="17" cy="7" fill="white" r="1.1" /></>}
      {type === "youtube" && <><path d="M21.1 7.3a2.5 2.5 0 0 0-1.76-1.77C17.8 5.1 12 5.1 12 5.1s-5.8 0-7.34.43A2.5 2.5 0 0 0 2.9 7.3 26 26 0 0 0 2.5 12a26 26 0 0 0 .4 4.7 2.5 2.5 0 0 0 1.76 1.77c1.54.43 7.34.43 7.34.43s5.8 0 7.34-.43a2.5 2.5 0 0 0 1.76-1.77 26 26 0 0 0 .4-4.7 26 26 0 0 0-.4-4.7Z" fill="#ff0033" /><path d="m10 9 5.2 3-5.2 3V9Z" fill="white" /></>}
      {type === "tiktok" && <><path d="M14.2 4h2.7c.2 1.7 1.2 3.1 2.8 3.8v2.7a8.3 8.3 0 0 1-2.8-1V15a5 5 0 1 1-5-5c.35 0 .7.04 1.03.1v2.75a2.35 2.35 0 1 0 1.27 2.08V4Z" fill="#25f4ee" /><path d="M16 4h1.4c.25 1.52 1.1 2.58 2.3 3.16v1.63a7.5 7.5 0 0 1-2.3-.87V15a5 5 0 0 1-5 5 5 5 0 0 1-4.7-6.7 5 5 0 0 0 7.8 3.54V4H16Z" fill="#fe2c55" opacity=".75" /></>}
    </svg>
  );
}

const socials: { label: string; image: string }[] = [
  { label: "LINE", image: "/images/sc1.svg" },
  { label: "X", image: "/images/sc2.svg" },
  { label: "Facebook", image: "/images/sc3.svg" },
  { label: "Instagram", image: "/images/sc4.svg" },
  { label: "YouTube", image: "/images/sc5.svg" },
  { label: "TikTok", image: "/images/sc6.svg" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1f5134] bg-[#0b0e0d] text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[210px_repeat(5,minmax(0,1fr))_240px] gap-6 px-2 py-6">
        <div className="flex items-start">
          <Image alt="ARN SPACE — Read Write Belong" className="h-auto w-[166px]" height={80} src="/images/arnspace-logo.webp" width={238} />
        </div>

        {linkGroups.map((group) => (
          <div className="min-w-0" key={group.title}>
            <h2 className="mb-2 text-[12px] font-semibold text-white/90">{group.title}</h2>
            <nav aria-label={group.title} className="space-y-1">
              {group.links.map((link) => (
                <a className="block truncate text-[11px] leading-4 text-white/55 transition hover:text-[#2ee77b]" href="#" key={link}>
                  {link}
                </a>
              ))}
            </nav>
          </div>
        ))}

        <div className="flex min-w-0 flex-col items-end">
          <div className="flex items-center gap-4 text-white/80">
            {socials.map((social) => (
              <a aria-label={social.label} className="transition hover:text-[#2ee77b]" href="#" key={social.label}>
                <Image alt="" className="h-[18px] w-[18px] object-contain transition-transform hover:scale-110" height={18} src={social.image} unoptimized width={18} />
              </a>
            ))}
          </div>
          <p className="mt-5 text-right text-[10px] text-white/45">© 2026 ARN SPACE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
